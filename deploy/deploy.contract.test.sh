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
state="$(cat "$PROMPTFORGE_TEST_DOCKER_STATE")"
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
      if [[ "$state" == "new" ]]; then echo unhealthy; else echo healthy; fi
      ;;
  esac
  exit 0
fi
if [[ "$1" == "image" ]] && [[ "$2" == "inspect" ]]; then exit 1; fi
if [[ "$1" == "image" ]] && [[ "$2" == "tag" ]]; then exit 0; fi
if [[ "$1" == "compose" ]] && [[ "$*" == *" up "* ]]; then
  if [[ "$*" == *"--no-build app"* ]]; then printf '%s\n' rollback > "$PROMPTFORGE_TEST_DOCKER_STATE"; else printf '%s\n' new > "$PROMPTFORGE_TEST_DOCKER_STATE"; fi
  exit 0
fi
if [[ "$1" == "exec" ]]; then
  [[ "$state" != "new" ]]
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
  case "$value" in
    /opt/promptforge*) rewritten+=("$PROMPTFORGE_TEST_REMOTE_DIR${value#/opt/promptforge}") ;;
    *) rewritten+=("$value") ;;
  esac
done
/bin/bash -s -- "${rewritten[@]}"
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
  /usr/bin/stat -f '%Lp' "$3"
else
  /usr/bin/stat "$@"
fi
EOF
chmod +x "$rollback_bin/docker" "$rollback_bin/ssh" "$rollback_bin/rsync" "$rollback_bin/date" "$rollback_bin/sleep" "$rollback_bin/stat"

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

echo "PASS: $PASS_COUNT deploy contract checks"
