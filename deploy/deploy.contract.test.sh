#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEPLOY_SCRIPT="$SCRIPT_DIR/deploy.sh"
PASS_COUNT=0

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

pass() {
  PASS_COUNT=$((PASS_COUNT + 1))
  echo "PASS: $*"
}

assert_contains() {
  pattern="$1"
  description="$2"
  if ! grep -Fq -- "$pattern" "$DEPLOY_SCRIPT"; then
    fail "$description (missing: $pattern)"
  fi
  pass "$description"
}

assert_not_contains() {
  pattern="$1"
  description="$2"
  if grep -Fq -- "$pattern" "$DEPLOY_SCRIPT"; then
    fail "$description (found: $pattern)"
  fi
  pass "$description"
}

make_forbidden_command() {
  path="$1"
  name="$2"
  cat > "$path/$name" <<'EOF'
#!/usr/bin/env bash
echo "$0 $*" >> "$PROMPTFORGE_TEST_CALL_LOG"
exit 97
EOF
  chmod +x "$path/$name"
}

assert_contains "--node-mirror gcr" "mirror selection is allowlisted"
assert_contains "git status --porcelain --untracked-files=all -- app deploy .github/workflows/ci.yml" "deploy checks only release-relevant worktree paths"
assert_contains "PROMPTFORGE_SOURCE_REVISION" "local full SHA is passed to the remote builder"
assert_contains "PROMPTFORGE_BUILD_RUN_ID" "deploy and build receipts share one run ID"
assert_contains "verified-production-build.sh" "remote deploy delegates build verification"
assert_contains '.outcome == "built"' "replacement requires a built receipt"
assert_contains '.expectedDigest == .observedDigest' "replacement rechecks the receipt digest invariant"
assert_contains "build receipt permissions must be 600" "replacement requires a private build receipt"
assert_contains "PROMPTFORGE_RELEVANT_WORKTREE_CLEAN=true" "remote builder receives the verified worktree gate"
assert_contains "promptforge_app:rollback-" "current image receives an immutable rollback tag"
assert_contains 'old_health' "pre-replacement inventory records current app health"
assert_contains "docker compose up -d --force-recreate app" "replacement is app-only"
assert_contains "docker compose up -d --force-recreate --no-build app" "rollback restores app without a build"
assert_contains "HEALTH_TIMEOUT_SECONDS=120" "direct health is bounded to 120 seconds"
assert_contains "deploy_outcome=verification_failed" "full smoke failure is distinguished from direct health failure"
assert_contains "production smoke failed; no automatic rollback was attempted" "smoke failure does not trigger automatic rollback"
assert_contains "umask 077" "deployment receipts default to restrictive permissions"
assert_contains "chmod 700" "remote receipt directory is private"
assert_contains "chmod 600" "receipt and env files are private"
assert_contains "mv \"\$receipt_tmp\" \"\$deploy_receipt\"" "deploy receipt publication is atomic"
assert_not_contains "--remove-orphans" "deploy never removes unrelated services"
assert_not_contains "docker network" "deploy never mutates Docker networks"
assert_not_contains "docker volume" "deploy never mutates Docker volumes"
assert_not_contains "promptforge_mysql" "deploy never targets the legacy database"
assert_not_contains "|| echo 'WARN: app not yet ready" "direct health cannot fail open"

tmp_root="$(mktemp -d)"
trap 'rm -rf "$tmp_root"' EXIT
fake_bin="$tmp_root/fake-bin"
mkdir -p "$fake_bin"
call_log="$tmp_root/calls.log"
: > "$call_log"
for command_name in docker ssh rsync curl; do
  make_forbidden_command "$fake_bin" "$command_name"
done

set +e
dry_run_output="$(
  PATH="$fake_bin:$PATH" \
  PROMPTFORGE_TEST_CALL_LOG="$call_log" \
  PROMPTFORGE_DOCKER_BIN="$fake_bin/docker" \
  bash "$DEPLOY_SCRIPT" --dry-run --node-mirror gcr --smoke 2>&1
)"
dry_run_status=$?
set -e

if [[ "$dry_run_status" -ne 0 ]]; then
  fail "dry-run exits successfully without external commands: $dry_run_output"
fi
if [[ -s "$call_log" ]]; then
  fail "dry-run invoked an external command: $(tr '\n' ' ' < "$call_log")"
fi
if [[ "$dry_run_output" != *"source=gcr"* ]] || [[ "$dry_run_output" != *"No SSH, rsync, Registry, Docker, production smoke, or provider call executed."* ]]; then
  fail "dry-run does not expose the approved source and zero-side-effect boundary"
fi
pass "dry-run is zero-side-effect and exposes explicit gcr selection"

ghcr_digest="sha256:$(printf '%064d' 3)"
ghcr_image_id="sha256:$(printf '%064d' 4)"
ghcr_receipt="$tmp_root/ghcr-publish-receipt.json"
cat > "$ghcr_receipt" <<EOF
{"schemaVersion":1,"runId":"ghcr-1-1","sourceRevision":"$(printf '%040d' 5)","sourceRef":"refs/heads/codex/catalog-plugin-refresh-202608","sourceImageTag":"promptforge-app:ci","sourceImageId":"$ghcr_image_id","platform":"linux/amd64","registry":"ghcr.io","repository":"zjgulai/ai-pm-library","publishedTag":"ghcr.io/zjgulai/ai-pm-library:sha-$(printf '%040d' 5)-run-1-1","publishedDigest":"$ghcr_digest","publishedRef":"ghcr.io/zjgulai/ai-pm-library@$ghcr_digest","eventName":"push","buildRunId":"1","buildRunAttempt":1,"pushAttempt":1,"externalWrite":"occurred","verificationPullAttempt":1,"outcome":"published","failedPhase":"","errorCode":""}
EOF

: > "$call_log"
set +e
ghcr_dry_run_output="$(
  PATH="$fake_bin:$PATH" \
  PROMPTFORGE_TEST_CALL_LOG="$call_log" \
  PROMPTFORGE_DOCKER_BIN="$fake_bin/docker" \
  bash "$DEPLOY_SCRIPT" --dry-run --ghcr-receipt "$ghcr_receipt" --smoke 2>&1
)"
ghcr_dry_run_status=$?
set -e

if [[ "$ghcr_dry_run_status" -ne 0 ]]; then
  fail "GHCR receipt dry-run exits successfully without external commands: $ghcr_dry_run_output"
fi
if [[ -s "$call_log" ]]; then
  fail "GHCR receipt dry-run invoked an external command: $(tr '\n' ' ' < "$call_log")"
fi
if [[ "$ghcr_dry_run_output" != *"delivery=ghcr"* ]] || \
   [[ "$ghcr_dry_run_output" != *"Would pull exactly: ghcr.io/zjgulai/ai-pm-library@$ghcr_digest"* ]] || \
   [[ "$ghcr_dry_run_output" != *"Would replace only app with --no-build"* ]]; then
  fail "GHCR receipt dry-run does not expose immutable pull and app-only no-build boundaries"
fi
if [[ "$ghcr_dry_run_output" == *"Would sync app/"* ]]; then
  fail "GHCR receipt dry-run incorrectly claims that app source will be synchronized"
fi
pass "GHCR receipt dry-run is zero-side-effect and exposes immutable pull delivery"

fixture="$tmp_root/fixture"
mkdir -p "$fixture/deploy" "$fixture/app/scripts" "$fixture/.github/workflows"
cp "$DEPLOY_SCRIPT" "$fixture/deploy/deploy.sh"
cp "$SCRIPT_DIR/docker-compose.yml" "$fixture/deploy/docker-compose.yml"
touch "$fixture/deploy/.env.prod" "$fixture/key.pem" "$fixture/app/scripts/verified-production-build.sh"
printf '%s\n' 'ARG NODE_IMAGE=node:22.23.1-alpine3.24@sha256:16e22a550f3863206a3f701448c45f7912c6896a62de43add43bb9c86130c3e2' > "$fixture/app/Dockerfile"
(
  cd "$fixture"
  git init -q
  git add app deploy .github
  git -c user.name=contract -c user.email=contract@example.invalid commit -qm baseline
  printf 'dirty\n' > app/release-relevant-change.txt
)
: > "$call_log"
set +e
dirty_output="$(
  cd "$fixture"
  PATH="$fake_bin:$PATH" \
  PROMPTFORGE_TEST_CALL_LOG="$call_log" \
  PROMPTFORGE_SSH_KEY="$fixture/key.pem" \
  bash deploy/deploy.sh 2>&1
)"
dirty_status=$?
set -e

if [[ "$dirty_status" -eq 0 ]] || [[ "$dirty_output" != *"WORKTREE_NOT_CLEAN"* ]]; then
  fail "release-relevant dirty worktree must fail before remote access: $dirty_output"
fi
if [[ -s "$call_log" ]]; then
  fail "dirty-worktree rejection invoked an external command: $(tr '\n' ' ' < "$call_log")"
fi
pass "release-relevant dirty worktree blocks before SSH or rsync"

rollback_fixture="$tmp_root/rollback-fixture"
rollback_remote="$tmp_root/rollback-remote"
rollback_bin="$tmp_root/rollback-bin"
rollback_log="$tmp_root/rollback-calls.log"
rollback_state="$tmp_root/rollback-state"
rollback_clock="$tmp_root/rollback-clock"
mkdir -p "$rollback_fixture/deploy" "$rollback_fixture/app/scripts" "$rollback_fixture/.github/workflows" "$rollback_remote" "$rollback_bin"
cp "$DEPLOY_SCRIPT" "$rollback_fixture/deploy/deploy.sh"
cp "$SCRIPT_DIR/docker-compose.yml" "$rollback_fixture/deploy/docker-compose.yml"
touch "$rollback_fixture/deploy/.env.prod" "$rollback_fixture/key.pem" "$rollback_fixture/.github/workflows/ci.yml"
printf '%s\n' 'ARG NODE_IMAGE=node:22.23.1-alpine3.24@sha256:16e22a550f3863206a3f701448c45f7912c6896a62de43add43bb9c86130c3e2' > "$rollback_fixture/app/Dockerfile"
printf '%s\n' old > "$rollback_state"
printf '%s\n' 0 > "$rollback_clock"
: > "$rollback_log"

cat > "$rollback_fixture/app/scripts/verified-production-build.sh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
script_dir="$(cd "$(dirname "$0")" && pwd)"
repo_root="$(dirname "$(dirname "$script_dir")")"
receipt_dir="$repo_root/.deploy-receipts"
receipt="$receipt_dir/docker-build-receipt-$PROMPTFORGE_BUILD_RUN_ID.json"
mkdir -p "$receipt_dir"
chmod 700 "$receipt_dir"
cat > "$receipt" <<JSON
{"schemaVersion":1,"runId":"$PROMPTFORGE_BUILD_RUN_ID","scope":"deploy","source":"${2}","canonicalRef":"node:fixture@sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","effectiveRef":"node:fixture@sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","expectedDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","observedDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","proxyConfigured":false,"buildMode":"compose","buildAttempt":1,"sourceRevision":"$PROMPTFORGE_SOURCE_REVISION","relevantWorktreeClean":true,"imageTag":"promptforge_app","imageId":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","platform":"linux/amd64","outcome":"built","failedPhase":"","errorCode":""}
JSON
chmod 600 "$receipt"
EOF
chmod +x "$rollback_fixture/app/scripts/verified-production-build.sh"

cat > "$rollback_bin/docker" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
printf 'docker %s\n' "$*" >> "$PROMPTFORGE_TEST_CALL_LOG"
if [[ "$1" == "--config" ]]; then shift 2; fi
state="$(cat "$PROMPTFORGE_TEST_DOCKER_STATE")"
delivery="${PROMPTFORGE_TEST_DELIVERY:-build}"
if [[ "$1" == "compose" ]] && [[ "$*" == *"config --services"* ]]; then
  echo app
  exit 0
fi
if [[ "$1" == "inspect" ]]; then
  format="$3"
  case "$format" in
    *'.Id'*)
      if [[ "$state" == "new" ]]; then printf '%064d\n' 2; else printf '%064d\n' 1; fi
      ;;
    *'.Image'*) printf 'sha256:%064d\n' 1 ;;
    *'.State.Status'*) echo running ;;
    *'.State.Health'*)
      if [[ "$state" == "new" ]] && [[ "${PROMPTFORGE_TEST_HEALTH_MODE:-failure}" != "success" ]]; then echo unhealthy; else echo healthy; fi
      ;;
  esac
  exit 0
fi
if [[ "$1" == "image" ]] && [[ "$2" == "inspect" ]]; then
  if [[ "$delivery" == "ghcr" ]] && [[ "${*: -1}" == "$PROMPTFORGE_TEST_GHCR_REF" ]]; then
    format="$4"
    case "$format" in
      *'.Id'*'.Os'*'.Architecture'*) printf '%s|linux/amd64\n' "$PROMPTFORGE_TEST_GHCR_IMAGE_ID" ;;
      *'.RepoDigests'*) printf '["%s"]\n' "$PROMPTFORGE_TEST_GHCR_REF" ;;
      *) printf '%s\n' "$PROMPTFORGE_TEST_GHCR_IMAGE_ID" ;;
    esac
    exit 0
  fi
  exit 1
fi
if [[ "$1" == "pull" ]]; then
  [[ "$delivery" == "ghcr" ]] && [[ "$*" == "pull --platform linux/amd64 $PROMPTFORGE_TEST_GHCR_REF" ]]
  exit $?
fi
if [[ "$1" == "image" ]] && [[ "$2" == "tag" ]]; then
  if [[ "$delivery" == "ghcr" ]] && [[ "$3" == "$PROMPTFORGE_TEST_GHCR_REF" ]] && [[ "$4" == "promptforge_app" ]]; then
    printf '%s\n' new > "$PROMPTFORGE_TEST_DOCKER_STATE"
  elif [[ "$3" == promptforge_app:rollback-* ]] && [[ "$4" == "promptforge_app" ]]; then
    printf '%s\n' rollback > "$PROMPTFORGE_TEST_DOCKER_STATE"
  fi
  exit 0
fi
if [[ "$1" == "compose" ]] && [[ "$*" == *" up "* ]]; then
  if [[ "$delivery" != "ghcr" ]]; then
    if [[ "$*" == *"--no-build app"* ]]; then
      printf '%s\n' rollback > "$PROMPTFORGE_TEST_DOCKER_STATE"
    else
      printf '%s\n' new > "$PROMPTFORGE_TEST_DOCKER_STATE"
      if [[ "${PROMPTFORGE_TEST_REPLACEMENT_FAIL:-0}" == "1" ]]; then exit 1; fi
    fi
  elif [[ "$state" == "new" ]] && [[ "${PROMPTFORGE_TEST_REPLACEMENT_FAIL:-0}" == "1" ]]; then
    exit 1
  fi
  exit 0
fi
if [[ "$1" == "exec" ]]; then
  [[ "$state" != "new" ]] || [[ "${PROMPTFORGE_TEST_HEALTH_MODE:-failure}" == "success" ]]
  exit $?
fi
exit 0
EOF

cat > "$rollback_bin/ssh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
printf 'ssh %s\n' "$*" >> "$PROMPTFORGE_TEST_CALL_LOG"
while [[ "$#" -gt 0 ]]; do
  case "$1" in
    -i|-o) shift 2 ;;
    *) break ;;
  esac
done
shift
if [[ "${1:-}" != "bash" ]]; then
  mkdir -p "$PROMPTFORGE_TEST_REMOTE_DIR/app" "$PROMPTFORGE_TEST_REMOTE_DIR/.deploy-receipts"
  exit 0
fi
shift 3
rewritten=()
for value in "$@"; do
  [[ -n "$value" ]] || continue
  case "$value" in
    /opt/promptforge*) rewritten+=("$PROMPTFORGE_TEST_REMOTE_DIR${value#/opt/promptforge}") ;;
    *) rewritten+=("$value") ;;
  esac
done
set +e
remote_output="$(/bin/bash -s -- "${rewritten[@]}")"
remote_status=$?
set -e
remote_prefix=/opt/promptforge
printf '%s\n' "${remote_output//$PROMPTFORGE_TEST_REMOTE_DIR/$remote_prefix}"
exit "$remote_status"
EOF

cat > "$rollback_bin/rsync" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
printf 'rsync %s\n' "$*" >> "$PROMPTFORGE_TEST_CALL_LOG"
args=("$@")
source_path="${args[${#args[@]}-2]}"
destination="${args[${#args[@]}-1]}"
case "$destination" in
  *:/opt/promptforge/app/)
    mkdir -p "$PROMPTFORGE_TEST_REMOTE_DIR/app"
    cp -R "$source_path"/. "$PROMPTFORGE_TEST_REMOTE_DIR/app/"
    ;;
  *:/opt/promptforge/docker-compose.yml) cp "$source_path" "$PROMPTFORGE_TEST_REMOTE_DIR/docker-compose.yml" ;;
  *:/opt/promptforge/.env.prod) cp "$source_path" "$PROMPTFORGE_TEST_REMOTE_DIR/.env.prod" ;;
  *:/opt/promptforge/.deploy-receipts/*)
    mkdir -p "$PROMPTFORGE_TEST_REMOTE_DIR/.deploy-receipts"
    cp "$source_path" "$PROMPTFORGE_TEST_REMOTE_DIR/.deploy-receipts/${destination##*/}"
    chmod 600 "$PROMPTFORGE_TEST_REMOTE_DIR/.deploy-receipts/${destination##*/}"
    ;;
esac
EOF

cat > "$rollback_bin/date" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
if [[ "$*" == "+%s" ]]; then
  value="$(cat "$PROMPTFORGE_TEST_CLOCK")"
  value=$((value + 60))
  printf '%s\n' "$value" > "$PROMPTFORGE_TEST_CLOCK"
  printf '%s\n' "$value"
else
  /bin/date "$@"
fi
EOF

cat > "$rollback_bin/sleep" <<'EOF'
#!/usr/bin/env bash
exit 0
EOF
cat > "$rollback_bin/stat" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
if [[ "${1:-}" == "-c" ]] && [[ "${2:-}" == "%a" ]]; then
  if /usr/bin/stat -c '%a' "$3" >/dev/null 2>&1; then
    /usr/bin/stat -c '%a' "$3"
  else
    /usr/bin/stat -f '%Lp' "$3"
  fi
else
  /usr/bin/stat "$@"
fi
EOF
cat > "$rollback_bin/gh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
printf 'gh %s\n' "$*" >> "$PROMPTFORGE_TEST_CALL_LOG"
if [[ "$1" == "api" ]]; then
  printf '{"repository":{"full_name":"zjgulai/ai-pm-library"},"head_repository":{"full_name":"zjgulai/ai-pm-library"},"event":"push","status":"completed","conclusion":"success","path":".github/workflows/ci.yml","head_sha":"%s","head_branch":"codex/catalog-plugin-refresh-202608","run_attempt":1}\n' "$PROMPTFORGE_TEST_GHCR_SOURCE_REVISION"
  exit 0
fi
if [[ "$1" == "attestation" ]] && [[ "$2" == "verify" ]]; then
  if [[ "${PROMPTFORGE_TEST_ATTESTATION_MODE:-success}" == "fail" ]]; then exit 1; fi
  printf '%s\n' '[{"verificationResult":{"statement":{"subject":[]}}}]'
  exit 0
fi
exit 2
EOF
chmod +x "$rollback_bin/docker" "$rollback_bin/ssh" "$rollback_bin/rsync" "$rollback_bin/date" "$rollback_bin/sleep" "$rollback_bin/stat" "$rollback_bin/gh"

(
  cd "$rollback_fixture"
  git init -q
  git add app deploy .github
  git -c user.name=contract -c user.email=contract@example.invalid commit -qm baseline
)

set +e
rollback_output="$(
  cd "$rollback_fixture"
  PATH="$rollback_bin:$PATH" \
  PROMPTFORGE_DOCKER_BIN="$rollback_bin/docker" \
  PROMPTFORGE_SSH_KEY="$rollback_fixture/key.pem" \
  PROMPTFORGE_TEST_CALL_LOG="$rollback_log" \
  PROMPTFORGE_TEST_REMOTE_DIR="$rollback_remote" \
  PROMPTFORGE_TEST_DOCKER_STATE="$rollback_state" \
  PROMPTFORGE_TEST_CLOCK="$rollback_clock" \
    bash deploy/deploy.sh 2>&1
)"
rollback_status=$?
set -e

if [[ "$rollback_status" -eq 0 ]] || [[ "$rollback_output" != *"DIRECT_HEALTH_FAILED"* ]]; then
  fail "fake direct-health failure must return nonzero after restoring the old app: $rollback_output"
fi
if ! grep -Fq -- "docker compose up -d --force-recreate app" "$rollback_log" || \
   ! grep -Fq -- "docker compose up -d --force-recreate --no-build app" "$rollback_log"; then
  fail "fake orchestration did not execute both app replacement and no-build rollback"
fi
if grep -Fq -- "--remove-orphans" "$rollback_log" || grep -Eq -- 'docker (network|volume)' "$rollback_log"; then
  fail "fake orchestration attempted an out-of-scope Docker mutation"
fi
rollback_receipt="$(find "$rollback_remote/.deploy-receipts" -name 'deploy-receipt-*.json' -print -quit)"
if [[ -z "$rollback_receipt" ]] || ! grep -Fq -- '"outcome": "rolled_back"' "$rollback_receipt"; then
  fail "fake orchestration did not persist a rolled_back deploy receipt"
fi
pass "fake direct-health failure executes one app-only no-build rollback and records rolled_back"

build_replace_remote="$tmp_root/build-replace-remote"
build_replace_log="$tmp_root/build-replace-calls.log"
build_replace_state="$tmp_root/build-replace-state"
build_replace_clock="$tmp_root/build-replace-clock"
mkdir -p "$build_replace_remote"
: > "$build_replace_log"
printf '%s\n' old > "$build_replace_state"
printf '%s\n' 0 > "$build_replace_clock"
set +e
build_replace_output="$(
  cd "$rollback_fixture"
  PATH="$rollback_bin:$PATH" \
  PROMPTFORGE_DOCKER_BIN="$rollback_bin/docker" \
  PROMPTFORGE_SSH_KEY="$rollback_fixture/key.pem" \
  PROMPTFORGE_TEST_CALL_LOG="$build_replace_log" \
  PROMPTFORGE_TEST_DOCKER_STATE="$build_replace_state" \
  PROMPTFORGE_TEST_REMOTE_DIR="$build_replace_remote" \
  PROMPTFORGE_TEST_CLOCK="$build_replace_clock" \
  PROMPTFORGE_TEST_REPLACEMENT_FAIL=1 \
    bash deploy/deploy.sh 2>&1
)"
build_replace_status=$?
set -e
if [[ "$build_replace_status" -eq 0 ]] || [[ "$build_replace_output" != *"REPLACEMENT_FAILED"* ]]; then
  fail "build replacement failure must return nonzero after restoring the old app: $build_replace_output"
fi
if [[ "$(grep -Fc -- "docker compose up -d --force-recreate app" "$build_replace_log")" -ne 1 ]] || \
   [[ "$(grep -Fc -- "docker compose up -d --force-recreate --no-build app" "$build_replace_log")" -ne 1 ]]; then
  fail "build replacement failure did not execute exactly one app-only rollback"
fi
build_replace_receipt="$(find "$build_replace_remote/.deploy-receipts" -name 'deploy-receipt-*.json' -print -quit)"
if [[ -z "$build_replace_receipt" ]] || ! jq -e '.outcome == "rolled_back" and .directHealth == "not_run"' "$build_replace_receipt" >/dev/null; then
  fail "build replacement failure did not persist rolled_back evidence"
fi
pass "build compose-up failure executes one app-only rollback and records rolled_back"

build_success_remote="$tmp_root/build-success-remote"
build_success_log="$tmp_root/build-success-calls.log"
build_success_state="$tmp_root/build-success-state"
build_success_clock="$tmp_root/build-success-clock"
mkdir -p "$build_success_remote"
: > "$build_success_log"
printf '%s\n' old > "$build_success_state"
printf '%s\n' 0 > "$build_success_clock"
set +e
build_success_output="$(
  cd "$rollback_fixture"
  PATH="$rollback_bin:$PATH" \
  PROMPTFORGE_DOCKER_BIN="$rollback_bin/docker" \
  PROMPTFORGE_SSH_KEY="$rollback_fixture/key.pem" \
  PROMPTFORGE_TEST_CALL_LOG="$build_success_log" \
  PROMPTFORGE_TEST_DOCKER_STATE="$build_success_state" \
  PROMPTFORGE_TEST_REMOTE_DIR="$build_success_remote" \
  PROMPTFORGE_TEST_CLOCK="$build_success_clock" \
  PROMPTFORGE_TEST_HEALTH_MODE=success \
    bash deploy/deploy.sh 2>&1
)"
build_success_status=$?
set -e
if [[ "$build_success_status" -ne 0 ]]; then
  fail "fake build delivery without smoke must complete successfully: $build_success_output"
fi
build_success_receipt="$(find "$build_success_remote/.deploy-receipts" -name 'deploy-receipt-*.json' -print -quit)"
if [[ -z "$build_success_receipt" ]] || ! jq -e \
  '.outcome == "deployed" and .deliveryMode == "build" and .imageRef == "" and .buildReceiptPath != "" and .smokeReportPath == ""' \
  "$build_success_receipt" >/dev/null; then
  fail "build delivery without smoke did not preserve empty finalizer arguments"
fi
pass "build delivery without smoke preserves empty finalizer arguments"

ghcr_remote="$tmp_root/ghcr-remote"
ghcr_log="$tmp_root/ghcr-calls.log"
ghcr_state="$tmp_root/ghcr-state"
ghcr_clock="$tmp_root/ghcr-clock"
mkdir -p "$ghcr_remote"
cp "$rollback_fixture/deploy/docker-compose.yml" "$ghcr_remote/docker-compose.yml"
cp "$rollback_fixture/deploy/.env.prod" "$ghcr_remote/.env.prod"
chmod 600 "$ghcr_remote/.env.prod"
: > "$ghcr_log"
printf '%s\n' old > "$ghcr_state"
printf '%s\n' 0 > "$ghcr_clock"
ghcr_source_revision="$(git -C "$rollback_fixture" rev-parse HEAD)"
ghcr_digest="sha256:$(printf '%064d' 3)"
ghcr_image_id="sha256:$(printf '%064d' 4)"
ghcr_ref="ghcr.io/zjgulai/ai-pm-library@$ghcr_digest"
ghcr_runtime_receipt="$tmp_root/ghcr-runtime-publish-receipt.json"
cat > "$ghcr_runtime_receipt" <<EOF
{"schemaVersion":1,"runId":"ghcr-1-1","sourceRevision":"$ghcr_source_revision","sourceRef":"refs/heads/codex/catalog-plugin-refresh-202608","sourceImageTag":"promptforge-app:ci","sourceImageId":"$ghcr_image_id","platform":"linux/amd64","registry":"ghcr.io","repository":"zjgulai/ai-pm-library","publishedTag":"ghcr.io/zjgulai/ai-pm-library:sha-$ghcr_source_revision-run-1-1","publishedDigest":"$ghcr_digest","publishedRef":"$ghcr_ref","eventName":"push","buildRunId":"1","buildRunAttempt":1,"pushAttempt":1,"externalWrite":"occurred","verificationPullAttempt":1,"outcome":"published","failedPhase":"","errorCode":""}
EOF

set +e
ghcr_output="$(
  cd "$rollback_fixture"
  PATH="$rollback_bin:$PATH" \
  PROMPTFORGE_DOCKER_BIN="$rollback_bin/docker" \
  PROMPTFORGE_SSH_KEY="$rollback_fixture/key.pem" \
  PROMPTFORGE_TEST_CALL_LOG="$ghcr_log" \
  PROMPTFORGE_TEST_DELIVERY=ghcr \
  PROMPTFORGE_TEST_DOCKER_STATE="$ghcr_state" \
  PROMPTFORGE_TEST_GHCR_IMAGE_ID="$ghcr_image_id" \
  PROMPTFORGE_TEST_GHCR_REF="$ghcr_ref" \
  PROMPTFORGE_TEST_GHCR_SOURCE_REVISION="$ghcr_source_revision" \
  PROMPTFORGE_TEST_HEALTH_MODE=success \
  PROMPTFORGE_TEST_REMOTE_DIR="$ghcr_remote" \
  PROMPTFORGE_TEST_CLOCK="$ghcr_clock" \
    bash deploy/deploy.sh --ghcr-receipt "$ghcr_runtime_receipt" 2>&1
)"
ghcr_status=$?
set -e

if [[ "$ghcr_status" -ne 0 ]]; then
  fail "fake GHCR digest delivery must complete successfully: $ghcr_output"
fi
if [[ "$(grep -Ec -- "^docker --config .+ pull --platform linux/amd64 $ghcr_ref$" "$ghcr_log")" -ne 1 ]]; then
  fail "GHCR delivery did not pull the exact digest exactly once"
fi
if grep -Fq -- "compose build" "$ghcr_log" || grep -Fq -- ":/opt/promptforge/app/" "$ghcr_log"; then
  fail "GHCR delivery rebuilt remotely or synchronized app source"
fi
if grep -Fq -- ":/opt/promptforge/docker-compose.yml" "$ghcr_log" || \
   grep -Fq -- ":/opt/promptforge/.env.prod" "$ghcr_log"; then
  fail "GHCR image-only delivery synchronized production configuration"
fi
if [[ "$(grep -Fc -- "docker compose up -d --force-recreate --no-build app" "$ghcr_log")" -ne 1 ]]; then
  fail "GHCR delivery did not perform exactly one app-only no-build replacement"
fi
if grep -Fq -- "--remove-orphans" "$ghcr_log" || grep -Eq -- 'docker (network|volume)' "$ghcr_log" || \
   grep -Eq -- '(promptforge_mysql|ai_video_nginx)' "$ghcr_log"; then
  fail "GHCR delivery attempted an out-of-scope service or Docker mutation"
fi
pull_receipt="$(find "$ghcr_remote/.deploy-receipts" -name 'docker-pull-receipt-*.json' -print -quit)"
deploy_receipt="$(find "$ghcr_remote/.deploy-receipts" -name 'deploy-receipt-*.json' -print -quit)"
if [[ -z "$pull_receipt" ]] || ! jq -e --arg ref "$ghcr_ref" --arg imageId "$ghcr_image_id" --arg revision "$ghcr_source_revision" \
  '.outcome == "pulled" and .deliveryMode == "ghcr" and .imageRef == $ref and .imageId == $imageId and .sourceRevision == $revision and .pullAttempt == 1 and .anonymousPull == true and .platform == "linux/amd64"' \
  "$pull_receipt" >/dev/null; then
  fail "GHCR delivery did not persist a valid pull receipt"
fi
if [[ -z "$deploy_receipt" ]] || ! jq -e --arg ref "$ghcr_ref" \
  '.outcome == "deployed" and .deliveryMode == "ghcr" and .imageRef == $ref and .directHealth == "passed" and .buildReceiptPath == ""' \
  "$deploy_receipt" >/dev/null; then
  fail "GHCR delivery did not persist a valid deploy receipt"
fi
if [[ "$(stat -c '%a' "$pull_receipt" 2>/dev/null || stat -f '%Lp' "$pull_receipt")" != "600" ]] || \
   [[ "$(stat -c '%a' "$deploy_receipt" 2>/dev/null || stat -f '%Lp' "$deploy_receipt")" != "600" ]]; then
  fail "GHCR pull/deploy receipts are not mode 600"
fi
pass "fake GHCR receipt pulls one exact digest and performs one app-only no-build replacement"

provenance_log="$tmp_root/provenance-failure-calls.log"
: > "$provenance_log"
set +e
provenance_output="$(
  cd "$rollback_fixture"
  PATH="$rollback_bin:$PATH" \
  PROMPTFORGE_DOCKER_BIN="$rollback_bin/docker" \
  PROMPTFORGE_SSH_KEY="$rollback_fixture/key.pem" \
  PROMPTFORGE_TEST_CALL_LOG="$provenance_log" \
  PROMPTFORGE_TEST_GHCR_SOURCE_REVISION="$ghcr_source_revision" \
  PROMPTFORGE_TEST_ATTESTATION_MODE=fail \
    bash deploy/deploy.sh --ghcr-receipt "$ghcr_runtime_receipt" 2>&1
)"
provenance_status=$?
set -e
if [[ "$provenance_status" -eq 0 ]] || [[ "$provenance_output" != *"GHCR_PROVENANCE_INVALID"* ]]; then
  fail "invalid signed provenance must block GHCR deployment: $provenance_output"
fi
if grep -Eq -- '^(ssh|rsync|docker) ' "$provenance_log"; then
  fail "invalid signed provenance reached a production or Docker command"
fi
pass "invalid signed OCI provenance blocks before SSH, rsync, or Docker"

compose_drift_remote="$tmp_root/compose-drift-remote"
compose_drift_log="$tmp_root/compose-drift-calls.log"
mkdir -p "$compose_drift_remote"
cp "$rollback_fixture/deploy/docker-compose.yml" "$compose_drift_remote/docker-compose.yml"
printf '%s\n' '# drift with the same app-only service list' >> "$compose_drift_remote/docker-compose.yml"
cp "$rollback_fixture/deploy/.env.prod" "$compose_drift_remote/.env.prod"
chmod 600 "$compose_drift_remote/.env.prod"
: > "$compose_drift_log"
set +e
compose_drift_output="$(
  cd "$rollback_fixture"
  PATH="$rollback_bin:$PATH" \
  PROMPTFORGE_SSH_KEY="$rollback_fixture/key.pem" \
  PROMPTFORGE_TEST_CALL_LOG="$compose_drift_log" \
  PROMPTFORGE_TEST_GHCR_SOURCE_REVISION="$ghcr_source_revision" \
  PROMPTFORGE_TEST_REMOTE_DIR="$compose_drift_remote" \
    bash deploy/deploy.sh --ghcr-receipt "$ghcr_runtime_receipt" 2>&1
)"
compose_drift_status=$?
set -e
if [[ "$compose_drift_status" -eq 0 ]] || [[ "$compose_drift_output" != *"REMOTE_CONFIG_INVALID"* ]]; then
  fail "remote Compose drift must block GHCR deployment: $compose_drift_output"
fi
if grep -Eq -- '^(rsync |docker .*(pull| compose up))' "$compose_drift_log"; then
  fail "remote Compose drift reached receipt sync, image pull, or app replacement"
fi
pass "remote Compose hash drift blocks before receipt sync, pull, or replacement"

ghcr_replace_remote="$tmp_root/ghcr-replace-remote"
ghcr_replace_log="$tmp_root/ghcr-replace-calls.log"
ghcr_replace_state="$tmp_root/ghcr-replace-state"
ghcr_replace_clock="$tmp_root/ghcr-replace-clock"
mkdir -p "$ghcr_replace_remote"
cp "$rollback_fixture/deploy/docker-compose.yml" "$ghcr_replace_remote/docker-compose.yml"
cp "$rollback_fixture/deploy/.env.prod" "$ghcr_replace_remote/.env.prod"
chmod 600 "$ghcr_replace_remote/.env.prod"
: > "$ghcr_replace_log"
printf '%s\n' old > "$ghcr_replace_state"
printf '%s\n' 0 > "$ghcr_replace_clock"
set +e
ghcr_replace_output="$(
  cd "$rollback_fixture"
  PATH="$rollback_bin:$PATH" \
  PROMPTFORGE_DOCKER_BIN="$rollback_bin/docker" \
  PROMPTFORGE_SSH_KEY="$rollback_fixture/key.pem" \
  PROMPTFORGE_TEST_CALL_LOG="$ghcr_replace_log" \
  PROMPTFORGE_TEST_DELIVERY=ghcr \
  PROMPTFORGE_TEST_DOCKER_STATE="$ghcr_replace_state" \
  PROMPTFORGE_TEST_GHCR_IMAGE_ID="$ghcr_image_id" \
  PROMPTFORGE_TEST_GHCR_REF="$ghcr_ref" \
  PROMPTFORGE_TEST_GHCR_SOURCE_REVISION="$ghcr_source_revision" \
  PROMPTFORGE_TEST_REMOTE_DIR="$ghcr_replace_remote" \
  PROMPTFORGE_TEST_CLOCK="$ghcr_replace_clock" \
  PROMPTFORGE_TEST_REPLACEMENT_FAIL=1 \
    bash deploy/deploy.sh --ghcr-receipt "$ghcr_runtime_receipt" 2>&1
)"
ghcr_replace_status=$?
set -e
if [[ "$ghcr_replace_status" -eq 0 ]] || [[ "$ghcr_replace_output" != *"REPLACEMENT_FAILED"* ]]; then
  fail "GHCR replacement failure must return nonzero after restoring the old app: $ghcr_replace_output"
fi
if [[ "$(grep -Fc -- "docker compose up -d --force-recreate --no-build app" "$ghcr_replace_log")" -ne 2 ]]; then
  fail "GHCR replacement failure did not execute one replacement and one app-only rollback"
fi
ghcr_replace_receipt="$(find "$ghcr_replace_remote/.deploy-receipts" -name 'deploy-receipt-*.json' -print -quit)"
if [[ -z "$ghcr_replace_receipt" ]] || ! jq -e '.outcome == "rolled_back" and .directHealth == "not_run"' "$ghcr_replace_receipt" >/dev/null; then
  fail "GHCR replacement failure did not persist rolled_back evidence"
fi
pass "GHCR compose-up failure executes one app-only rollback and records rolled_back"

echo "PASS: $PASS_COUNT deploy contract checks"
