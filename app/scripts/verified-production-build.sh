#!/usr/bin/env bash

set -u
set -o pipefail

umask 077

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
APP_DIR="$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(CDPATH= cd -- "$APP_DIR/.." && pwd)"
DOCKERFILE="$APP_DIR/Dockerfile"
COMPOSE_FILE="$REPO_ROOT/docker-compose.yml"

SOURCE="dockerhub"
SCOPE="local"
MODE="docker"
DRY_RUN=false
SOURCE_SEEN=false
SCOPE_SEEN=false
MODE_SEEN=false
DRY_RUN_SEEN=false

SCHEMA_VERSION=1
RUN_ID="${PROMPTFORGE_BUILD_RUN_ID:-}"
STARTED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
FINISHED_AT=""
CANONICAL_REF=""
EFFECTIVE_REF=""
EXPECTED_DIGEST=""
OBSERVED_DIGEST=""
BUILD_ATTEMPT=0
SOURCE_REVISION=""
RELEVANT_WORKTREE_CLEAN=false
IMAGE_TAG=""
IMAGE_ID=""
PLATFORM=""
PROXY_CONFIGURED=false
RECEIPT_PATH=""
MANIFEST_HEADERS=""

usage() {
  printf '%s\n' \
    'usage: verified-production-build.sh --source dockerhub|gcr --scope local|ci|deploy --mode docker|compose [--dry-run]' >&2
}

invalid_argument() {
  printf '%s: %s\n' 'INVALID_ARGUMENT' "$1" >&2
  usage
  exit 2
}

is_valid_run_id() {
  printf '%s' "$1" | grep -Eq '^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$'
}

write_receipt() {
  outcome="$1"
  failed_phase="$2"
  error_code="$3"

  FINISHED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  if [ "$SCOPE" = "deploy" ]; then
    receipt_dir="$REPO_ROOT/.deploy-receipts"
  else
    receipt_dir="$REPO_ROOT/tmp/outputs"
  fi
  mkdir -p "$receipt_dir" || return 1
  chmod 700 "$receipt_dir" || return 1
  RECEIPT_PATH="$receipt_dir/docker-build-receipt-$RUN_ID.json"
  receipt_tmp="$receipt_dir/.docker-build-receipt-$RUN_ID.json.tmp.$$"

  cat > "$receipt_tmp" <<EOF
{
  "schemaVersion": $SCHEMA_VERSION,
  "runId": "$RUN_ID",
  "scope": "$SCOPE",
  "source": "$SOURCE",
  "canonicalRef": "$CANONICAL_REF",
  "effectiveRef": "$EFFECTIVE_REF",
  "expectedDigest": "$EXPECTED_DIGEST",
  "observedDigest": "$OBSERVED_DIGEST",
  "proxyConfigured": $PROXY_CONFIGURED,
  "buildMode": "$MODE",
  "buildAttempt": $BUILD_ATTEMPT,
  "sourceRevision": "$SOURCE_REVISION",
  "relevantWorktreeClean": $RELEVANT_WORKTREE_CLEAN,
  "imageTag": "$IMAGE_TAG",
  "imageId": "$IMAGE_ID",
  "platform": "$PLATFORM",
  "startedAt": "$STARTED_AT",
  "finishedAt": "$FINISHED_AT",
  "outcome": "$outcome",
  "failedPhase": "$failed_phase",
  "errorCode": "$error_code"
}
EOF
  chmod 600 "$receipt_tmp" || {
    rm -f "$receipt_tmp"
    return 1
  }
  mv -f "$receipt_tmp" "$RECEIPT_PATH" || {
    rm -f "$receipt_tmp"
    return 1
  }
  printf 'BUILD_RECEIPT_PATH=%s\n' "$RECEIPT_PATH"
}

fail_build() {
  error_code="$1"
  failed_phase="$2"
  printf '%s: phase=%s\n' "$error_code" "$failed_phase" >&2
  if [ -n "$SCOPE" ] && [ -n "$RUN_ID" ]; then
    if ! write_receipt failed "$failed_phase" "$error_code"; then
      printf '%s\n' 'RECEIPT_WRITE_FAILED: unable to persist build receipt' >&2
    fi
  fi
  exit 1
}

cleanup() {
  if [ -n "$MANIFEST_HEADERS" ]; then
    rm -f "$MANIFEST_HEADERS"
  fi
}

trap cleanup EXIT HUP INT TERM

while [ "$#" -gt 0 ]; do
  case "$1" in
    --source)
      [ "$SOURCE_SEEN" = false ] || invalid_argument 'duplicate --source'
      [ "$#" -ge 2 ] || invalid_argument 'missing value for --source'
      SOURCE="$2"
      SOURCE_SEEN=true
      shift 2
      ;;
    --scope)
      [ "$SCOPE_SEEN" = false ] || invalid_argument 'duplicate --scope'
      [ "$#" -ge 2 ] || invalid_argument 'missing value for --scope'
      SCOPE="$2"
      SCOPE_SEEN=true
      shift 2
      ;;
    --mode)
      [ "$MODE_SEEN" = false ] || invalid_argument 'duplicate --mode'
      [ "$#" -ge 2 ] || invalid_argument 'missing value for --mode'
      MODE="$2"
      MODE_SEEN=true
      shift 2
      ;;
    --dry-run)
      [ "$DRY_RUN_SEEN" = false ] || invalid_argument 'duplicate --dry-run'
      DRY_RUN=true
      DRY_RUN_SEEN=true
      shift
      ;;
    *)
      invalid_argument "unknown argument: $1"
      ;;
  esac
done

case "$SOURCE" in
  dockerhub|gcr) ;;
  *) invalid_argument 'source must be dockerhub or gcr' ;;
esac
case "$SCOPE" in
  local|ci|deploy) ;;
  *) invalid_argument 'scope must be local, ci, or deploy' ;;
esac
case "$MODE" in
  docker|compose) ;;
  *) invalid_argument 'mode must be docker or compose' ;;
esac
if [ "$SCOPE" = "deploy" ]; then
  [ "$MODE" = "compose" ] || invalid_argument 'deploy scope requires compose mode'
else
  [ "$MODE" = "docker" ] || invalid_argument 'local and ci scopes require docker mode'
fi

if [ -z "$RUN_ID" ]; then
  RUN_ID="$(date -u +%Y%m%dT%H%M%SZ)-$$"
fi
is_valid_run_id "$RUN_ID" || invalid_argument 'PROMPTFORGE_BUILD_RUN_ID is invalid'

if [ ! -f "$DOCKERFILE" ]; then
  fail_build DOCKERFILE_CONTRACT_INVALID preflight
fi

node_image_count="$(awk '/^ARG NODE_IMAGE=/{count++} END{print count+0}' "$DOCKERFILE")"
if [ "$node_image_count" -ne 1 ]; then
  fail_build DOCKERFILE_CONTRACT_INVALID preflight
fi
CANONICAL_REF="$(sed -n 's/^ARG NODE_IMAGE=//p' "$DOCKERFILE")"
if ! printf '%s\n' "$CANONICAL_REF" | grep -Eq '^node:[A-Za-z0-9][A-Za-z0-9._-]*@sha256:[a-f0-9]{64}$'; then
  fail_build DOCKERFILE_CONTRACT_INVALID preflight
fi
first_arg="$(awk '/^ARG / {print; exit}' "$DOCKERFILE")"
if [ "$first_arg" != "ARG NODE_IMAGE=$CANONICAL_REF" ]; then
  fail_build DOCKERFILE_CONTRACT_INVALID preflight
fi
EXPECTED_DIGEST="${CANONICAL_REF##*@}"

case "$SOURCE" in
  dockerhub)
    EFFECTIVE_REF="$CANONICAL_REF"
    ;;
  gcr)
    EFFECTIVE_REF="mirror.gcr.io/library/node@$EXPECTED_DIGEST"
    ;;
esac

case "$SCOPE" in
  local)
    IMAGE_TAG="promptforge-app:verified-local"
    ;;
  ci)
    IMAGE_TAG="promptforge-app:ci"
    ;;
  deploy)
    IMAGE_TAG="promptforge_app"
    ;;
esac

if [ "$DRY_RUN" = true ]; then
  printf '%s\n' \
    'dryRun=true' \
    "scope=$SCOPE" \
    "source=$SOURCE" \
    "canonicalRef=$CANONICAL_REF" \
    "effectiveRef=$EFFECTIVE_REF" \
    "expectedDigest=$EXPECTED_DIGEST" \
    "buildMode=$MODE" \
    "imageTag=$IMAGE_TAG"
  exit 0
fi

if [ -n "${PROMPTFORGE_REGISTRY_PROXY:-}" ]; then
  PROXY_CONFIGURED=true
fi

registry_curl() {
  if [ "$PROXY_CONFIGURED" = true ]; then
    curl --connect-timeout 10 --max-time 30 --retry 0 --proxy "$PROMPTFORGE_REGISTRY_PROXY" "$@"
  else
    curl --connect-timeout 10 --max-time 30 --retry 0 "$@"
  fi
}

required_tools='curl docker'
if [ "$SCOPE" != "deploy" ]; then
  required_tools="$required_tools git"
fi
for required_tool in $required_tools; do
  if ! command -v "$required_tool" >/dev/null 2>&1; then
    fail_build TOOL_MISSING preflight
  fi
done

if [ "$SCOPE" = "deploy" ]; then
  SOURCE_REVISION="${PROMPTFORGE_SOURCE_REVISION:-}"
  if ! printf '%s\n' "$SOURCE_REVISION" | grep -Eq '^[a-f0-9]{40}$'; then
    fail_build INVALID_ARGUMENT preflight
  fi
  if [ "${PROMPTFORGE_RELEVANT_WORKTREE_CLEAN:-}" != "true" ]; then
    RELEVANT_WORKTREE_CLEAN=false
    fail_build WORKTREE_NOT_CLEAN preflight
  fi
  RELEVANT_WORKTREE_CLEAN=true
else
  SOURCE_REVISION="$(git -C "$REPO_ROOT" rev-parse HEAD 2>/dev/null || true)"
  if ! printf '%s\n' "$SOURCE_REVISION" | grep -Eq '^[a-f0-9]{40}$'; then
    fail_build INVALID_ARGUMENT preflight
  fi
  relevant_status="$(git -C "$REPO_ROOT" status --porcelain -- app deploy .github/workflows/ci.yml 2>/dev/null || true)"
  if [ -z "$relevant_status" ]; then
    RELEVANT_WORKTREE_CLEAN=true
  fi
fi

MANIFEST_HEADERS="$(mktemp "${TMPDIR:-/tmp}/promptforge-manifest.XXXXXX")" || fail_build MANIFEST_UNREACHABLE preflight

if [ "$SOURCE" = "dockerhub" ]; then
  auth_response="$(registry_curl -fsSL \
    'https://auth.docker.io/token?service=registry.docker.io&scope=repository:library/node:pull' 2>/dev/null)" || \
    fail_build REGISTRY_AUTH_FAILED preflight
  registry_token="$(printf '%s' "$auth_response" | sed -n 's/.*"token"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1)"
  if [ -z "$registry_token" ]; then
    fail_build REGISTRY_AUTH_FAILED preflight
  fi
  if ! registry_curl -fsSLI \
    -D "$MANIFEST_HEADERS" \
    -o /dev/null \
    -H "Authorization: Bearer $registry_token" \
    -H 'Accept: application/vnd.oci.image.index.v1+json, application/vnd.docker.distribution.manifest.list.v2+json, application/vnd.docker.distribution.manifest.v2+json' \
    "https://registry-1.docker.io/v2/library/node/manifests/$EXPECTED_DIGEST" >/dev/null 2>&1; then
    registry_token=''
    auth_response=''
    fail_build MANIFEST_UNREACHABLE preflight
  fi
  registry_token=''
  auth_response=''
else
  if ! registry_curl -fsSLI \
    -D "$MANIFEST_HEADERS" \
    -o /dev/null \
    -H 'Accept: application/vnd.oci.image.index.v1+json, application/vnd.docker.distribution.manifest.list.v2+json, application/vnd.docker.distribution.manifest.v2+json' \
    "https://mirror.gcr.io/v2/library/node/manifests/$EXPECTED_DIGEST" >/dev/null 2>&1; then
    fail_build MANIFEST_UNREACHABLE preflight
  fi
fi

OBSERVED_DIGEST="$(awk 'tolower($1) == "docker-content-digest:" {gsub("\\r", "", $2); print $2; exit}' "$MANIFEST_HEADERS")"
if [ -z "$OBSERVED_DIGEST" ]; then
  fail_build MANIFEST_DIGEST_MISSING preflight
fi
if [ "$OBSERVED_DIGEST" != "$EXPECTED_DIGEST" ]; then
  fail_build DIGEST_MISMATCH manifest_verified
fi

BUILD_ATTEMPT=1
if [ "$MODE" = "docker" ]; then
  if [ "$SCOPE" = "ci" ]; then
    if ! docker build \
      --pull=false \
      --platform linux/amd64 \
      --build-arg "NODE_IMAGE=$EFFECTIVE_REF" \
      --target production \
      -t "$IMAGE_TAG" \
      "$APP_DIR"; then
      fail_build BUILD_FAILED build_started
    fi
  else
    if ! docker build \
      --pull=false \
      --build-arg "NODE_IMAGE=$EFFECTIVE_REF" \
      --target production \
      -t "$IMAGE_TAG" \
      "$APP_DIR"; then
      fail_build BUILD_FAILED build_started
    fi
  fi
else
  if [ ! -f "$COMPOSE_FILE" ]; then
    fail_build BUILD_FAILED build_started
  fi
  if ! docker compose -f "$COMPOSE_FILE" build \
    --build-arg "NODE_IMAGE=$EFFECTIVE_REF" \
    app; then
    fail_build BUILD_FAILED build_started
  fi
fi

inspect_output="$(docker image inspect "$IMAGE_TAG" --format '{{.Id}}|{{.Os}}/{{.Architecture}}' 2>/dev/null)" || \
  fail_build IMAGE_INSPECT_FAILED build_started
IMAGE_ID="${inspect_output%%|*}"
PLATFORM="${inspect_output#*|}"
if ! printf '%s\n' "$IMAGE_ID" | grep -Eq '^sha256:[a-f0-9]{64}$' || \
   ! printf '%s\n' "$PLATFORM" | grep -Eq '^[a-z0-9]+/[A-Za-z0-9._-]+$'; then
  fail_build IMAGE_INSPECT_FAILED build_started
fi

if ! write_receipt built '' ''; then
  printf '%s\n' 'RECEIPT_WRITE_FAILED: unable to persist build receipt' >&2
  exit 1
fi
printf '%s\n' \
  'outcome=built' \
  "source=$SOURCE" \
  "expectedDigest=$EXPECTED_DIGEST" \
  "observedDigest=$OBSERVED_DIGEST" \
  "imageTag=$IMAGE_TAG" \
  "imageId=$IMAGE_ID" \
  "platform=$PLATFORM"
