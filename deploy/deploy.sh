#!/usr/bin/env bash
# PromptForge app-only deployment orchestrator.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
REMOTE_USER=ubuntu
REMOTE_HOST=101.34.52.232
REMOTE_DIR=/opt/promptforge
SSH_KEY="${PROMPTFORGE_SSH_KEY:-$HOME/.ssh/promptforge_ai_video.pem}"
RUN_SMOKE=0
DRY_RUN=0
BUILD_SOURCE=dockerhub
DELIVERY_MODE=build
GHCR_RECEIPT=""
IMAGE_REF=""
NODE_MIRROR_SELECTED=0
HEALTH_TIMEOUT_SECONDS=120

usage() { echo "Usage: ./deploy.sh [--smoke] [--dry-run] [--node-mirror gcr | --ghcr-receipt PATH]" >&2; }
log() { echo "[$(date '+%H:%M:%S')] $*"; }
fail() { error_code="$1"; shift; echo "ERROR [$error_code]: $*" >&2; exit 1; }

read_canonical_image() {
  dockerfile="$PROJECT_ROOT/app/Dockerfile"
  canonical_ref=""
  match_count=0
  [[ -f "$dockerfile" ]] || fail "DOCKERFILE_CONTRACT_INVALID" "Dockerfile not found: $dockerfile"
  while IFS= read -r line || [[ -n "$line" ]]; do
    case "$line" in
      "ARG NODE_IMAGE="*)
        match_count=$((match_count + 1))
        canonical_ref="${line#ARG NODE_IMAGE=}"
        ;;
    esac
  done < "$dockerfile"
  if [[ "$match_count" -ne 1 ]] || [[ ! "$canonical_ref" =~ ^node:[A-Za-z0-9._-]+@sha256:[0-9a-f]{64}$ ]]; then
    fail "DOCKERFILE_CONTRACT_INVALID" "Dockerfile must contain exactly one canonical ARG NODE_IMAGE ref"
  fi
  expected_digest="${canonical_ref##*@}"
  if [[ "$BUILD_SOURCE" == "gcr" ]]; then
    effective_ref="mirror.gcr.io/library/node@$expected_digest"
  else
    effective_ref="$canonical_ref"
  fi
}

while [[ "$#" -gt 0 ]]; do
  case "$1" in
    --smoke) RUN_SMOKE=1; shift ;;
    --dry-run|--preflight) DRY_RUN=1; shift ;;
    --node-mirror)
      [[ "$#" -ge 2 ]] || fail "INVALID_ARGUMENT" "--node-mirror requires the value gcr"
      [[ "$2" == "gcr" ]] || fail "INVALID_ARGUMENT" "--node-mirror only accepts gcr"
      BUILD_SOURCE=gcr
      NODE_MIRROR_SELECTED=1
      shift 2
      ;;
    --ghcr-receipt)
      [[ "$#" -ge 2 ]] || fail "INVALID_ARGUMENT" "--ghcr-receipt requires a path"
      [[ -z "$GHCR_RECEIPT" ]] || fail "INVALID_ARGUMENT" "--ghcr-receipt cannot be repeated"
      GHCR_RECEIPT="$2"
      DELIVERY_MODE=ghcr
      shift 2
      ;;
    --seed) fail "INVALID_ARGUMENT" "--seed is not supported in the static-first production deploy path" ;;
    *) usage; fail "INVALID_ARGUMENT" "unknown argument: $1" ;;
  esac
done

if [[ "$DELIVERY_MODE" == "ghcr" ]]; then
  [[ "$NODE_MIRROR_SELECTED" -eq 0 ]] || fail "INVALID_ARGUMENT" "--ghcr-receipt and --node-mirror are mutually exclusive"
  [[ -f "$GHCR_RECEIPT" ]] || fail "GHCR_RECEIPT_INVALID" "GHCR publish receipt not found: $GHCR_RECEIPT"
  command -v jq >/dev/null 2>&1 || fail "TOOL_MISSING" "jq command not found"
  if ! jq -e '
    .schemaVersion == 1 and
    .outcome == "published" and
    .registry == "ghcr.io" and
    .repository == "zjgulai/ai-pm-library" and
    .platform == "linux/amd64" and
    .pushAttempt == 1 and
    .verificationPullAttempt == 1 and
    .externalWrite == "occurred" and
    .eventName == "push" and
    (.buildRunId | test("^[1-9][0-9]*$")) and
    (.buildRunAttempt | type == "number" and . >= 1) and
    (.sourceRevision | test("^[0-9a-f]{40}$")) and
    (.sourceRef == "refs/heads/main" or .sourceRef == "refs/heads/codex/catalog-plugin-refresh-202608") and
    (.sourceImageId | test("^sha256:[0-9a-f]{64}$")) and
    (.publishedDigest | test("^sha256:[0-9a-f]{64}$")) and
    .runId == ("ghcr-" + .buildRunId + "-" + (.buildRunAttempt | tostring)) and
    .publishedTag == ("ghcr.io/zjgulai/ai-pm-library:sha-" + .sourceRevision + "-run-" + .buildRunId + "-" + (.buildRunAttempt | tostring)) and
    .publishedRef == ("ghcr.io/zjgulai/ai-pm-library@" + .publishedDigest)
  ' "$GHCR_RECEIPT" >/dev/null; then
    fail "GHCR_RECEIPT_INVALID" "GHCR publish receipt contract failed"
  fi
  IMAGE_REF="$(jq -r '.publishedRef' "$GHCR_RECEIPT")"
  GHCR_BUILD_RUN_ID="$(jq -r '.buildRunId' "$GHCR_RECEIPT")"
  GHCR_BUILD_RUN_ATTEMPT="$(jq -r '.buildRunAttempt' "$GHCR_RECEIPT")"
  GHCR_SOURCE_REF="$(jq -r '.sourceRef' "$GHCR_RECEIPT")"
else
  read_canonical_image
fi

if [[ "$DRY_RUN" -eq 1 ]]; then
  log "=== PromptForge Deploy Dry Run ==="
  log "Target: $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
  log "Release scope: app deploy .github/workflows/ci.yml"
  if [[ "$DELIVERY_MODE" == "ghcr" ]]; then
    log "Verified delivery plan: delivery=ghcr receipt=$GHCR_RECEIPT"
    log "Would pull exactly: $IMAGE_REF"
    log "Would verify the successful exact-head GitHub run and signed OCI provenance"
    log "Would replace only app with --no-build"
  else
    log "Verified build plan: source=$BUILD_SOURCE scope=deploy mode=compose"
    log "Canonical ref: $canonical_ref"
    log "Planned effective ref: $effective_ref"
    log "Expected digest: $expected_digest"
  fi
  log "Would validate the release-relevant worktree and bind delivery to its full Git SHA"
  if [[ "$DELIVERY_MODE" == "ghcr" ]]; then
    log "Would verify existing remote Compose scope and .env.prod mode without modifying either"
    log "Would sync only the CI GHCR publish receipt with mode 600"
  else
    log "Would run: rsync app/ to $REMOTE_DIR/app/ with --delete and local excludes"
    log "Would sync app/, docker-compose.yml, and .env.prod with mode 600"
  fi
  log "Would inventory promptforge_app and create a non-overwriting rollback image tag"
  if [[ "$DELIVERY_MODE" == "ghcr" ]]; then
    log "Would require one digest pull and a verified pull receipt before app-only replacement"
  else
    log "Would run remotely: app/scripts/verified-production-build.sh --source $BUILD_SOURCE --scope deploy --mode compose"
    log "Would require a built receipt before app-only replacement"
  fi
  log "Would run a bounded ${HEALTH_TIMEOUT_SECONDS}s direct health gate and no-build app rollback on failure"
  if [[ "$RUN_SMOKE" -eq 1 ]]; then
    log "Would run local production E2E smoke against ${PROMPTFORGE_PUBLIC_URL:-https://kg.lute-tlz-dddd.top/}"
  fi
  log "No SSH, rsync, Registry, Docker, production smoke, or provider call executed."
  log "=== Dry run complete ==="
  exit 0
fi

cd "$PROJECT_ROOT"
source_revision="$(git rev-parse --verify HEAD 2>/dev/null)" || fail "SOURCE_REVISION_INVALID" "cannot resolve Git HEAD"
[[ "$source_revision" =~ ^[0-9a-f]{40}$ ]] || fail "SOURCE_REVISION_INVALID" "Git HEAD is not a full SHA"
if [[ "$DELIVERY_MODE" == "ghcr" ]] && [[ "$(jq -r '.sourceRevision' "$GHCR_RECEIPT")" != "$source_revision" ]]; then
  fail "GHCR_RECEIPT_INVALID" "GHCR receipt source revision does not match Git HEAD"
fi
relevant_status="$(git status --porcelain --untracked-files=all -- app deploy .github/workflows/ci.yml)"
if [[ -n "$relevant_status" ]]; then
  echo "$relevant_status" >&2
  fail "WORKTREE_NOT_CLEAN" "release-relevant paths contain tracked or untracked changes"
fi

if [[ "$DELIVERY_MODE" == "ghcr" ]]; then
  command -v sha256sum >/dev/null 2>&1 || fail "TOOL_MISSING" "sha256sum command not found"
  local_compose_sha256="$(sha256sum "$SCRIPT_DIR/docker-compose.yml" | awk '{print $1}')"
  [[ "$local_compose_sha256" =~ ^[0-9a-f]{64}$ ]] || fail "COMPOSE_INVALID" "cannot hash tracked Compose file"
  command -v gh >/dev/null 2>&1 || fail "TOOL_MISSING" "gh command not found"
  command -v jq >/dev/null 2>&1 || fail "TOOL_MISSING" "jq command not found"
  run_metadata="$(gh api "repos/zjgulai/ai-pm-library/actions/runs/$GHCR_BUILD_RUN_ID")" || \
    fail "GHCR_PROVENANCE_INVALID" "cannot read the claimed GitHub Actions run"
  if ! jq -e --arg revision "$source_revision" --arg sourceRef "$GHCR_SOURCE_REF" \
    --argjson attempt "$GHCR_BUILD_RUN_ATTEMPT" '
      .repository.full_name == "zjgulai/ai-pm-library" and
      .head_repository.full_name == "zjgulai/ai-pm-library" and
      .event == "push" and .status == "completed" and .conclusion == "success" and
      .path == ".github/workflows/ci.yml" and .head_sha == $revision and
      .head_branch == ($sourceRef | sub("^refs/heads/"; "")) and .run_attempt == $attempt
    ' <<<"$run_metadata" >/dev/null; then
    fail "GHCR_PROVENANCE_INVALID" "GitHub Actions run does not match the receipt and exact HEAD"
  fi

  attestation_docker_config="$(mktemp -d "${TMPDIR:-/tmp}/promptforge-attestation-docker.XXXXXX")" || \
    fail "GHCR_PROVENANCE_INVALID" "cannot create an isolated Docker config"
  chmod 700 "$attestation_docker_config"
  printf '%s\n' '{"auths":{}}' > "$attestation_docker_config/config.json"
  chmod 600 "$attestation_docker_config/config.json"
  attestation_verification_path="$PROJECT_ROOT/tmp/outputs/ghcr-attestation-verification-$GHCR_BUILD_RUN_ID-$GHCR_BUILD_RUN_ATTEMPT.json"
  mkdir -p "$(dirname "$attestation_verification_path")"
  attestation_tmp="$attestation_verification_path.tmp.$$"
  set +e
  DOCKER_CONFIG="$attestation_docker_config" gh attestation verify "oci://$IMAGE_REF" \
    --repo zjgulai/ai-pm-library \
    --signer-workflow zjgulai/ai-pm-library/.github/workflows/ci.yml \
    --source-digest "$source_revision" \
    --source-ref "$GHCR_SOURCE_REF" \
    --deny-self-hosted-runners \
    --format json > "$attestation_tmp"
  attestation_status=$?
  set -e
  rm -f -- "$attestation_docker_config/config.json"
  rmdir "$attestation_docker_config"
  if [[ "$attestation_status" -ne 0 ]] || ! jq -e 'type == "array" and length >= 1' "$attestation_tmp" >/dev/null 2>&1; then
    rm -f -- "$attestation_tmp"
    fail "GHCR_PROVENANCE_INVALID" "signed OCI provenance verification failed"
  fi
  chmod 600 "$attestation_tmp"
  mv "$attestation_tmp" "$attestation_verification_path"
fi

[[ -f "$SSH_KEY" ]] || fail "SSH_KEY_MISSING" "SSH key not found: $SSH_KEY"
if [[ "$DELIVERY_MODE" == "build" ]]; then
  [[ -f "$SCRIPT_DIR/.env.prod" ]] || fail "ENV_FILE_MISSING" "deploy/.env.prod not found"
  [[ -x "$PROJECT_ROOT/app/scripts/verified-production-build.sh" ]] || fail "BUILDER_MISSING" "verified production builder is missing or not executable"
  docker_bin="${PROMPTFORGE_DOCKER_BIN:-docker}"
  command -v "$docker_bin" >/dev/null 2>&1 || fail "TOOL_MISSING" "docker command not found"
  services="$($docker_bin compose -f "$SCRIPT_DIR/docker-compose.yml" config --services 2>/dev/null)" || fail "COMPOSE_INVALID" "cannot resolve Compose services"
  [[ "$services" == "app" ]] || fail "COMPOSE_SCOPE_INVALID" "production Compose must contain only the app service"
fi

run_timestamp="$(date -u '+%Y%m%dT%H%M%SZ')"
run_id="${run_timestamp}-${source_revision:0:12}-$$"
build_receipt="$REMOTE_DIR/.deploy-receipts/docker-build-receipt-$run_id.json"
pull_receipt="$REMOTE_DIR/.deploy-receipts/docker-pull-receipt-$run_id.json"
ghcr_publish_receipt="$REMOTE_DIR/.deploy-receipts/ghcr-publish-receipt-$run_id.json"
deploy_receipt="$REMOTE_DIR/.deploy-receipts/deploy-receipt-$run_id.json"
rollback_tag="promptforge_app:rollback-$run_id"
ssh_args=(-i "$SSH_KEY" -o StrictHostKeyChecking=accept-new)
remote_target="$REMOTE_USER@$REMOTE_HOST"

log "=== PromptForge app-only deploy ==="
log "Run ID: $run_id"
log "Source revision: $source_revision"
log "Delivery mode: $DELIVERY_MODE"
if [[ "$DELIVERY_MODE" == "build" ]]; then log "Build source: $BUILD_SOURCE"; else log "Image ref: $IMAGE_REF"; fi

if [[ "$DELIVERY_MODE" == "ghcr" ]]; then
  ssh "${ssh_args[@]}" "$remote_target" bash -s -- "$REMOTE_DIR" "$local_compose_sha256" <<'REMOTE_IMAGE_ONLY_PREFLIGHT'
set -euo pipefail
remote_dir="$1"
expected_compose_sha256="$2"
command -v sha256sum >/dev/null 2>&1 || { echo "ERROR [REMOTE_CONFIG_INVALID]: sha256sum is required" >&2; exit 1; }
[[ -f "$remote_dir/docker-compose.yml" ]] || { echo "ERROR [REMOTE_CONFIG_INVALID]: docker-compose.yml is missing" >&2; exit 1; }
[[ -f "$remote_dir/.env.prod" ]] || { echo "ERROR [REMOTE_CONFIG_INVALID]: .env.prod is missing" >&2; exit 1; }
[[ "$(stat -c '%a' "$remote_dir/.env.prod")" == "600" ]] || { echo "ERROR [REMOTE_CONFIG_INVALID]: .env.prod mode must be 600" >&2; exit 1; }
remote_compose_sha256="$(sha256sum "$remote_dir/docker-compose.yml" | awk '{print $1}')"
[[ "$remote_compose_sha256" == "$expected_compose_sha256" ]] || { echo "ERROR [REMOTE_CONFIG_INVALID]: docker-compose.yml does not match exact HEAD" >&2; exit 1; }
services="$(docker compose -f "$remote_dir/docker-compose.yml" --env-file "$remote_dir/.env.prod" config --services)"
[[ "$services" == "app" ]] || { echo "ERROR [REMOTE_CONFIG_INVALID]: production Compose must contain only app" >&2; exit 1; }
REMOTE_IMAGE_ONLY_PREFLIGHT
  ssh "${ssh_args[@]}" "$remote_target" "umask 077; mkdir -p '$REMOTE_DIR/.deploy-receipts'; chmod 700 '$REMOTE_DIR/.deploy-receipts'"
else
  ssh "${ssh_args[@]}" "$remote_target" "umask 077; mkdir -p '$REMOTE_DIR/app' '$REMOTE_DIR/.deploy-receipts'; chmod 700 '$REMOTE_DIR/.deploy-receipts'"
fi

log "Syncing approved deployment inputs ..."
rsync_ssh="ssh -i $SSH_KEY -o StrictHostKeyChecking=accept-new"
if [[ "$DELIVERY_MODE" == "build" ]]; then
  rsync -az --delete --exclude node_modules --exclude dist --exclude .git --exclude '*.log' \
    -e "$rsync_ssh" "$PROJECT_ROOT/app/" "$remote_target:$REMOTE_DIR/app/"
  rsync -az -e "$rsync_ssh" "$SCRIPT_DIR/docker-compose.yml" "$remote_target:$REMOTE_DIR/docker-compose.yml"
  rsync -az -e "$rsync_ssh" "$SCRIPT_DIR/.env.prod" "$remote_target:$REMOTE_DIR/.env.prod"
  ssh "${ssh_args[@]}" "$remote_target" "chmod 600 '$REMOTE_DIR/.env.prod'"
fi
if [[ "$DELIVERY_MODE" == "ghcr" ]]; then
  rsync -az -e "$rsync_ssh" "$GHCR_RECEIPT" "$remote_target:$ghcr_publish_receipt"
  ssh "${ssh_args[@]}" "$remote_target" "chmod 600 '$ghcr_publish_receipt'"
fi

set +e
remote_output="$(
  ssh "${ssh_args[@]}" "$remote_target" bash -s -- \
    "$REMOTE_DIR" "$run_id" "$source_revision" "$DELIVERY_MODE" "$BUILD_SOURCE" \
    "$build_receipt" "$pull_receipt" "$ghcr_publish_receipt" "$IMAGE_REF" \
    "$deploy_receipt" "$rollback_tag" "$HEALTH_TIMEOUT_SECONDS" <<'REMOTE_ORCHESTRATOR'
set -euo pipefail
remote_dir="$1"
run_id="$2"
source_revision="$3"
delivery_mode="$4"
build_source="$5"
build_receipt="$6"
pull_receipt="$7"
ghcr_publish_receipt="$8"
image_ref="$9"
deploy_receipt="${10}"
rollback_tag="${11}"
HEALTH_TIMEOUT_SECONDS="${12}"
started_at="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
old_container_id=""
old_image_id=""
old_health="unknown"
new_container_id=""
new_image_id=""
artifact_receipt_path="$build_receipt"
delivery_receipt_path="$build_receipt"
build_receipt_field="$build_receipt"
if [[ "$delivery_mode" == "ghcr" ]]; then
  artifact_receipt_path="$ghcr_publish_receipt"
  delivery_receipt_path="$pull_receipt"
  build_receipt_field=""
fi
umask 077

write_deploy_receipt() {
  outcome="$1"
  direct_health="$2"
  smoke_report_path="$3"
  finished_at="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
  receipt_tmp="$deploy_receipt.tmp.$$"
  mkdir -p "$(dirname "$deploy_receipt")"
  chmod 700 "$(dirname "$deploy_receipt")"
  jq -n \
    --arg schemaVersion "1" --arg runId "$run_id" --arg sourceRevision "$source_revision" \
    --arg deliveryMode "$delivery_mode" --arg artifactReceiptPath "$artifact_receipt_path" \
    --arg deliveryReceiptPath "$delivery_receipt_path" \
    --arg buildReceiptPath "$build_receipt_field" --arg imageRef "$image_ref" \
    --arg oldImageId "$old_image_id" --arg newImageId "$new_image_id" \
    --arg oldContainerId "$old_container_id" --arg newContainerId "$new_container_id" \
    --arg oldHealth "$old_health" \
    --arg rollbackTag "$rollback_tag" --arg directHealth "$direct_health" --arg smokeReportPath "$smoke_report_path" \
    --arg outcome "$outcome" --arg startedAt "$started_at" --arg finishedAt "$finished_at" \
    '{schemaVersion:$schemaVersion,runId:$runId,sourceRevision:$sourceRevision,deliveryMode:$deliveryMode,artifactReceiptPath:$artifactReceiptPath,deliveryReceiptPath:$deliveryReceiptPath,buildReceiptPath:$buildReceiptPath,imageRef:$imageRef,oldImageId:$oldImageId,newImageId:$newImageId,oldContainerId:$oldContainerId,newContainerId:$newContainerId,oldHealth:$oldHealth,rollbackTag:$rollbackTag,directHealth:$directHealth,smokeReportPath:$smokeReportPath,outcome:$outcome,startedAt:$startedAt,finishedAt:$finishedAt}' \
    > "$receipt_tmp"
  chmod 600 "$receipt_tmp"
  mv "$receipt_tmp" "$deploy_receipt"
}

pull_attempt=0
expected_digest=""
observed_digest=""
expected_image_id=""
pull_platform=""
anonymous_pull=false

write_pull_receipt() {
  outcome="$1"
  failed_phase="$2"
  error_code="$3"
  finished_at="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
  receipt_tmp="$pull_receipt.tmp.$$"
  mkdir -p "$(dirname "$pull_receipt")"
  chmod 700 "$(dirname "$pull_receipt")"
  jq -n \
    --argjson schemaVersion 1 --arg runId "$run_id" --arg sourceRevision "$source_revision" \
    --arg deliveryMode ghcr --arg imageRef "$image_ref" --arg expectedDigest "$expected_digest" \
    --arg observedDigest "$observed_digest" --arg imageId "$new_image_id" \
    --arg platform "$pull_platform" --argjson pullAttempt "$pull_attempt" --argjson anonymousPull "$anonymous_pull" \
    --arg outcome "$outcome" --arg failedPhase "$failed_phase" --arg errorCode "$error_code" \
    --arg startedAt "$started_at" --arg finishedAt "$finished_at" \
    '{schemaVersion:$schemaVersion,runId:$runId,sourceRevision:$sourceRevision,deliveryMode:$deliveryMode,imageRef:$imageRef,expectedDigest:$expectedDigest,observedDigest:$observedDigest,imageId:$imageId,platform:$platform,pullAttempt:$pullAttempt,anonymousPull:$anonymousPull,outcome:$outcome,failedPhase:$failedPhase,errorCode:$errorCode,startedAt:$startedAt,finishedAt:$finishedAt}' \
    > "$receipt_tmp"
  chmod 600 "$receipt_tmp"
  mv "$receipt_tmp" "$pull_receipt"
}

direct_health_gate() {
  deadline=$(( $(date +%s) + HEALTH_TIMEOUT_SECONDS ))
  while [[ "$(date +%s)" -le "$deadline" ]]; do
    container_status="$(docker inspect --format '{{.State.Status}}' promptforge_app 2>/dev/null || true)"
    health_status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' promptforge_app 2>/dev/null || true)"
    if [[ "$container_status" == "running" ]] && [[ "$health_status" == "healthy" ]] && \
      docker exec promptforge_app node -e "fetch('http://127.0.0.1:3000/api/trpc/ping?batch=1&input=%7B%7D').then(async r=>{const t=await r.text();if(!r.ok||!t.includes('ok'))process.exit(1)}).catch(()=>process.exit(1))" >/dev/null 2>&1; then
      return 0
    fi
    sleep 5
  done
  return 1
}

recover_previous_app() {
  error_code="$1"
  direct_health="$2"
  error_message="$3"
  docker image tag "$rollback_tag" promptforge_app
  set +e
  docker compose up -d --force-recreate --no-build app
  rollback_up_status=$?
  set -e
  if [[ "$rollback_up_status" -eq 0 ]] && direct_health_gate; then
    write_deploy_receipt rolled_back "$direct_health" ""
    echo "ERROR [$error_code]: $error_message; old app was restored" >&2
    exit 1
  fi
  write_deploy_receipt rollback_failed "$direct_health" ""
  echo "ERROR [ROLLBACK_FAILED]: $error_message and automatic rollback did not recover" >&2
  exit 1
}

cd "$remote_dir"
command -v docker >/dev/null 2>&1 || { write_deploy_receipt failed_before_replacement not_run ""; exit 1; }
command -v jq >/dev/null 2>&1 || { echo "ERROR [TOOL_MISSING]: jq is required" >&2; exit 1; }
if [[ "$delivery_mode" == "build" ]]; then
  [[ -x ./app/scripts/verified-production-build.sh ]] || { write_deploy_receipt failed_before_replacement not_run ""; exit 1; }
fi

old_container_id="$(docker inspect --format '{{.Id}}' promptforge_app 2>/dev/null)" || {
  write_deploy_receipt failed_before_replacement not_run ""
  echo "ERROR [ROLLBACK_NOT_READY]: current promptforge_app container is required" >&2
  exit 1
}
old_image_id="$(docker inspect --format '{{.Image}}' promptforge_app)"
old_health="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' promptforge_app)"
if [[ "$old_health" != "healthy" ]]; then
  write_deploy_receipt failed_before_replacement not_run ""
  echo "ERROR [ROLLBACK_NOT_READY]: current promptforge_app is not healthy" >&2
  exit 1
fi
if docker image inspect "$rollback_tag" >/dev/null 2>&1; then
  write_deploy_receipt failed_before_replacement not_run ""
  echo "ERROR [ROLLBACK_TAG_EXISTS]: refusing to overwrite $rollback_tag" >&2
  exit 1
fi
docker image tag "$old_image_id" "$rollback_tag"

if [[ "$delivery_mode" == "build" ]]; then
  set +e
  PROMPTFORGE_SOURCE_REVISION="$source_revision" \
  PROMPTFORGE_RELEVANT_WORKTREE_CLEAN=true \
  PROMPTFORGE_BUILD_RUN_ID="$run_id" \
    ./app/scripts/verified-production-build.sh --source "$build_source" --scope deploy --mode compose
  build_status=$?
  set -e
  if [[ "$build_status" -ne 0 ]]; then
    write_deploy_receipt failed_before_replacement not_run ""
    echo "ERROR [BUILD_FAILED]: verified builder exited nonzero" >&2
    exit 1
  fi
  if ! jq -e --arg revision "$source_revision" --arg runId "$run_id" --arg source "$build_source" \
    '.outcome == "built" and .buildAttempt == 1 and .sourceRevision == $revision and .runId == $runId and .source == $source and .scope == "deploy" and .buildMode == "compose" and .relevantWorktreeClean == true and .expectedDigest == .observedDigest' \
    "$build_receipt" >/dev/null; then
    write_deploy_receipt failed_before_replacement not_run ""
    echo "ERROR [BUILD_RECEIPT_INVALID]: built receipt gate failed" >&2
    exit 1
  fi
  if [[ "$(stat -c '%a' "$build_receipt")" != "600" ]]; then
    write_deploy_receipt failed_before_replacement not_run ""
    echo "ERROR [BUILD_RECEIPT_INVALID]: build receipt permissions must be 600" >&2
    exit 1
  fi

  new_image_id="$(jq -r '.imageId // empty' "$build_receipt")"
  [[ -n "$new_image_id" ]] || {
    write_deploy_receipt failed_before_replacement not_run ""
    echo "ERROR [BUILD_RECEIPT_INVALID]: missing new image ID" >&2
    exit 1
  }
  set +e
  docker compose up -d --force-recreate app
  replacement_status=$?
  set -e
  if [[ "$replacement_status" -ne 0 ]]; then
    recover_previous_app REPLACEMENT_FAILED not_run "new app replacement failed"
  fi
else
  if [[ "$(stat -c '%a' "$ghcr_publish_receipt")" != "600" ]] || \
     ! jq -e --arg revision "$source_revision" --arg ref "$image_ref" \
       '.schemaVersion == 1 and .outcome == "published" and .sourceRevision == $revision and .publishedRef == $ref and
        .registry == "ghcr.io" and .repository == "zjgulai/ai-pm-library" and
        .platform == "linux/amd64" and .pushAttempt == 1 and .verificationPullAttempt == 1 and
        .externalWrite == "occurred" and .eventName == "push" and
        (.sourceRef == "refs/heads/main" or .sourceRef == "refs/heads/codex/catalog-plugin-refresh-202608") and
        (.buildRunId | test("^[1-9][0-9]*$")) and (.buildRunAttempt | type == "number" and . >= 1) and
        .runId == ("ghcr-" + .buildRunId + "-" + (.buildRunAttempt | tostring)) and
        .publishedTag == ("ghcr.io/zjgulai/ai-pm-library:sha-" + .sourceRevision + "-run-" + .buildRunId + "-" + (.buildRunAttempt | tostring)) and
        (.sourceImageId | test("^sha256:[0-9a-f]{64}$")) and
        (.publishedDigest | test("^sha256:[0-9a-f]{64}$")) and
        .publishedRef == ("ghcr.io/zjgulai/ai-pm-library@" + .publishedDigest)' \
       "$ghcr_publish_receipt" >/dev/null; then
    write_pull_receipt failed preflight GHCR_RECEIPT_INVALID
    write_deploy_receipt failed_before_replacement not_run ""
    echo "ERROR [GHCR_RECEIPT_INVALID]: synchronized GHCR receipt gate failed" >&2
    exit 1
  fi

  expected_digest="$(jq -r '.publishedDigest' "$ghcr_publish_receipt")"
  expected_image_id="$(jq -r '.sourceImageId' "$ghcr_publish_receipt")"
  pull_attempt=1
  anonymous_config="$(mktemp -d)"
  chmod 700 "$anonymous_config"
  printf '%s\n' '{"auths":{}}' > "$anonymous_config/config.json"
  chmod 600 "$anonymous_config/config.json"
  anonymous_pull=true
  set +e
  docker --config "$anonymous_config" pull --platform linux/amd64 "$image_ref"
  pull_status=$?
  set -e
  rm -f -- "$anonymous_config/config.json"
  rmdir "$anonymous_config"
  if [[ "$pull_status" -ne 0 ]]; then
    write_pull_receipt failed pull_started PULL_FAILED
    write_deploy_receipt failed_before_replacement not_run ""
    echo "ERROR [PULL_FAILED]: immutable GHCR digest pull exited nonzero" >&2
    exit 1
  fi

  pull_inspect="$(docker image inspect --format '{{.Id}}|{{.Os}}/{{.Architecture}}' "$image_ref")" || {
    write_pull_receipt failed digest_verification PULL_ATTESTATION_MISMATCH
    write_deploy_receipt failed_before_replacement not_run ""
    echo "ERROR [PULL_ATTESTATION_MISMATCH]: pulled image inspect failed" >&2
    exit 1
  }
  new_image_id="${pull_inspect%%|*}"
  pull_platform="${pull_inspect#*|}"
  repo_digests="$(docker image inspect --format '{{json .RepoDigests}}' "$image_ref")" || repo_digests='[]'
  if [[ "$new_image_id" != "$expected_image_id" ]] || [[ "$pull_platform" != "linux/amd64" ]] || \
     ! jq -e --arg ref "$image_ref" 'index($ref) != null' <<<"$repo_digests" >/dev/null; then
    write_pull_receipt failed digest_verification PULL_ATTESTATION_MISMATCH
    write_deploy_receipt failed_before_replacement not_run ""
    echo "ERROR [PULL_ATTESTATION_MISMATCH]: pulled digest, image ID, or platform does not match CI" >&2
    exit 1
  fi
  observed_digest="$expected_digest"
  write_pull_receipt pulled "" ""
  docker image tag "$image_ref" promptforge_app
  set +e
  docker compose up -d --force-recreate --no-build app
  replacement_status=$?
  set -e
  if [[ "$replacement_status" -ne 0 ]]; then
    recover_previous_app REPLACEMENT_FAILED not_run "new app replacement failed"
  fi
fi
new_container_id="$(docker inspect --format '{{.Id}}' promptforge_app)"
if direct_health_gate; then
  printf 'DEPLOY_REMOTE_STATE|%s|%s|%s|%s|%s|%s|%s|%s\n' \
    "$old_container_id" "$old_image_id" "$old_health" "$new_container_id" "$new_image_id" "$rollback_tag" "$delivery_receipt_path" "$started_at"
  exit 0
fi

recover_previous_app DIRECT_HEALTH_FAILED failed "new app failed direct health"
REMOTE_ORCHESTRATOR
)"
remote_status=$?
set -e

printf '%s\n' "$remote_output"
if [[ "$remote_status" -ne 0 ]]; then
  echo "Deploy receipt: $deploy_receipt" >&2
  exit "$remote_status"
fi

remote_state="$(printf '%s\n' "$remote_output" | grep '^DEPLOY_REMOTE_STATE|' | tail -n 1)"
[[ -n "$remote_state" ]] || fail "REMOTE_STATE_INVALID" "remote deploy did not return a state record"
IFS='|' read -r state_marker old_container_id old_image_id old_health new_container_id new_image_id state_rollback_tag state_delivery_receipt deploy_started_at <<EOF
$remote_state
EOF
[[ "$state_marker" == "DEPLOY_REMOTE_STATE" ]] || fail "REMOTE_STATE_INVALID" "invalid remote state marker"
[[ "$state_rollback_tag" == "$rollback_tag" ]] || fail "REMOTE_STATE_INVALID" "rollback tag mismatch"
expected_delivery_receipt="$build_receipt"
artifact_receipt="$build_receipt"
build_receipt_for_receipt="$build_receipt"
if [[ "$DELIVERY_MODE" == "ghcr" ]]; then
  expected_delivery_receipt="$pull_receipt"
  artifact_receipt="$ghcr_publish_receipt"
  build_receipt_for_receipt=""
fi
[[ "$state_delivery_receipt" == "$expected_delivery_receipt" ]] || fail "REMOTE_STATE_INVALID" "delivery receipt path mismatch"

smoke_report_path=""
deploy_outcome=deployed
smoke_status=0
if [[ "$RUN_SMOKE" -eq 1 ]]; then
  smoke_report_path="tmp/outputs/smoke-e2e-report-deploy-$run_id.json"
  log "Running production E2E smoke ..."
  set +e
  (
    cd "$PROJECT_ROOT/app"
    PROMPTFORGE_SMOKE_RUN_ID="deploy-$run_id" \
    PROMPTFORGE_SMOKE_OUTPUT_PATH="$PROJECT_ROOT/$smoke_report_path" \
    PROMPTFORGE_SMOKE_BASE_URL="${PROMPTFORGE_PUBLIC_URL:-https://kg.lute-tlz-dddd.top/}" \
    PROMPTFORGE_SMOKE_CHECK_COHOSTS="${PROMPTFORGE_SMOKE_CHECK_COHOSTS:-1}" npm run smoke:e2e
  )
  smoke_status=$?
  set -e
  if [[ "$smoke_status" -ne 0 ]]; then deploy_outcome=verification_failed; fi
fi

ssh "${ssh_args[@]}" "$remote_target" bash -s -- \
  "$deploy_receipt" "$run_id" "$source_revision" "$DELIVERY_MODE" "$artifact_receipt" "$expected_delivery_receipt" "$IMAGE_REF" "$build_receipt_for_receipt" \
  "$old_image_id" "$new_image_id" "$old_container_id" "$new_container_id" "$old_health" \
  "$rollback_tag" "$smoke_report_path" "$deploy_outcome" "$deploy_started_at" <<'REMOTE_FINALIZE'
set -euo pipefail
deploy_receipt="$1"; run_id="$2"; source_revision="$3"; delivery_mode="$4"
artifact_receipt="$5"; delivery_receipt="$6"; image_ref="$7"; build_receipt="$8"
old_image_id="$9"; new_image_id="${10}"; old_container_id="${11}"; new_container_id="${12}"; old_health="${13}"
rollback_tag="${14}"; smoke_report_path="${15}"; outcome="${16}"; started_at="${17}"
finished_at="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
umask 077
receipt_tmp="$deploy_receipt.tmp.$$"
mkdir -p "$(dirname "$deploy_receipt")"
chmod 700 "$(dirname "$deploy_receipt")"
jq -n \
  --arg schemaVersion "1" --arg runId "$run_id" --arg sourceRevision "$source_revision" \
  --arg deliveryMode "$delivery_mode" --arg artifactReceiptPath "$artifact_receipt" \
  --arg deliveryReceiptPath "$delivery_receipt" --arg imageRef "$image_ref" \
  --arg buildReceiptPath "$build_receipt" --arg oldImageId "$old_image_id" --arg newImageId "$new_image_id" \
  --arg oldContainerId "$old_container_id" --arg newContainerId "$new_container_id" \
  --arg oldHealth "$old_health" \
  --arg rollbackTag "$rollback_tag" --arg directHealth "passed" --arg smokeReportPath "$smoke_report_path" \
  --arg outcome "$outcome" --arg startedAt "$started_at" --arg finishedAt "$finished_at" \
  '{schemaVersion:$schemaVersion,runId:$runId,sourceRevision:$sourceRevision,deliveryMode:$deliveryMode,artifactReceiptPath:$artifactReceiptPath,deliveryReceiptPath:$deliveryReceiptPath,buildReceiptPath:$buildReceiptPath,imageRef:$imageRef,oldImageId:$oldImageId,newImageId:$newImageId,oldContainerId:$oldContainerId,newContainerId:$newContainerId,oldHealth:$oldHealth,rollbackTag:$rollbackTag,directHealth:$directHealth,smokeReportPath:$smokeReportPath,outcome:$outcome,startedAt:$startedAt,finishedAt:$finishedAt}' \
  > "$receipt_tmp"
chmod 600 "$receipt_tmp"
mv "$receipt_tmp" "$deploy_receipt"
REMOTE_FINALIZE

if [[ "$DELIVERY_MODE" == "ghcr" ]]; then
  log "Pull receipt: $expected_delivery_receipt"
else
  log "Build receipt: $expected_delivery_receipt"
fi
log "Deploy receipt: $deploy_receipt"
log "Rollback tag retained: $rollback_tag"
log "Manual rollback: docker image tag '$rollback_tag' promptforge_app && cd '$REMOTE_DIR' && docker compose up -d --force-recreate --no-build app"

if [[ "$smoke_status" -ne 0 ]]; then
  fail "SMOKE_FAILED" "production smoke failed; no automatic rollback was attempted"
fi
log "=== Deploy complete ==="
