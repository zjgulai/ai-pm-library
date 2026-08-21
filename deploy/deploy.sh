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
HEALTH_TIMEOUT_SECONDS=120

usage() { echo "Usage: ./deploy.sh [--smoke] [--dry-run] [--node-mirror gcr]" >&2; }
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
      shift 2
      ;;
    --seed) fail "INVALID_ARGUMENT" "--seed is not supported in the static-first production deploy path" ;;
    *) usage; fail "INVALID_ARGUMENT" "unknown argument: $1" ;;
  esac
done

read_canonical_image

if [[ "$DRY_RUN" -eq 1 ]]; then
  log "=== PromptForge Deploy Dry Run ==="
  log "Target: $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
  log "Release scope: app deploy .github/workflows/ci.yml"
  log "Verified build plan: source=$BUILD_SOURCE scope=deploy mode=compose"
  log "Canonical ref: $canonical_ref"
  log "Planned effective ref: $effective_ref"
  log "Expected digest: $expected_digest"
  log "Would validate the release-relevant worktree and pass its full Git SHA to the remote builder"
  log "Would run: rsync app/ to $REMOTE_DIR/app/ with --delete and local excludes"
  log "Would sync app/, docker-compose.yml, and .env.prod with mode 600"
  log "Would inventory promptforge_app and create a non-overwriting rollback image tag"
  log "Would run remotely: app/scripts/verified-production-build.sh --source $BUILD_SOURCE --scope deploy --mode compose"
  log "Would require a built receipt before app-only replacement"
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
relevant_status="$(git status --porcelain --untracked-files=all -- app deploy .github/workflows/ci.yml)"
if [[ -n "$relevant_status" ]]; then
  echo "$relevant_status" >&2
  fail "WORKTREE_NOT_CLEAN" "release-relevant paths contain tracked or untracked changes"
fi

[[ -f "$SSH_KEY" ]] || fail "SSH_KEY_MISSING" "SSH key not found: $SSH_KEY"
[[ -f "$SCRIPT_DIR/.env.prod" ]] || fail "ENV_FILE_MISSING" "deploy/.env.prod not found"
[[ -x "$PROJECT_ROOT/app/scripts/verified-production-build.sh" ]] || fail "BUILDER_MISSING" "verified production builder is missing or not executable"

docker_bin="${PROMPTFORGE_DOCKER_BIN:-docker}"
command -v "$docker_bin" >/dev/null 2>&1 || fail "TOOL_MISSING" "docker command not found"
services="$($docker_bin compose -f "$SCRIPT_DIR/docker-compose.yml" config --services 2>/dev/null)" || fail "COMPOSE_INVALID" "cannot resolve Compose services"
[[ "$services" == "app" ]] || fail "COMPOSE_SCOPE_INVALID" "production Compose must contain only the app service"

run_timestamp="$(date -u '+%Y%m%dT%H%M%SZ')"
run_id="${run_timestamp}-${source_revision:0:12}-$$"
build_receipt="$REMOTE_DIR/.deploy-receipts/docker-build-receipt-$run_id.json"
deploy_receipt="$REMOTE_DIR/.deploy-receipts/deploy-receipt-$run_id.json"
rollback_tag="promptforge_app:rollback-$run_id"
ssh_args=(-i "$SSH_KEY" -o StrictHostKeyChecking=accept-new)
remote_target="$REMOTE_USER@$REMOTE_HOST"

log "=== PromptForge app-only deploy ==="
log "Run ID: $run_id"
log "Source revision: $source_revision"
log "Build source: $BUILD_SOURCE"

ssh "${ssh_args[@]}" "$remote_target" "umask 077; mkdir -p '$REMOTE_DIR/app' '$REMOTE_DIR/.deploy-receipts'; chmod 700 '$REMOTE_DIR/.deploy-receipts'"

log "Syncing app source and deploy configuration ..."
rsync_ssh="ssh -i $SSH_KEY -o StrictHostKeyChecking=accept-new"
rsync -az --delete --exclude node_modules --exclude dist --exclude .git --exclude '*.log' \
  -e "$rsync_ssh" "$PROJECT_ROOT/app/" "$remote_target:$REMOTE_DIR/app/"
rsync -az -e "$rsync_ssh" "$SCRIPT_DIR/docker-compose.yml" "$remote_target:$REMOTE_DIR/docker-compose.yml"
rsync -az -e "$rsync_ssh" "$SCRIPT_DIR/.env.prod" "$remote_target:$REMOTE_DIR/.env.prod"
ssh "${ssh_args[@]}" "$remote_target" "chmod 600 '$REMOTE_DIR/.env.prod'"

set +e
remote_output="$(
  ssh "${ssh_args[@]}" "$remote_target" bash -s -- \
    "$REMOTE_DIR" "$run_id" "$source_revision" "$BUILD_SOURCE" \
    "$build_receipt" "$deploy_receipt" "$rollback_tag" "$HEALTH_TIMEOUT_SECONDS" <<'REMOTE_ORCHESTRATOR'
set -euo pipefail
remote_dir="$1"
run_id="$2"
source_revision="$3"
build_source="$4"
build_receipt="$5"
deploy_receipt="$6"
rollback_tag="$7"
HEALTH_TIMEOUT_SECONDS="$8"
started_at="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
old_container_id=""
old_image_id=""
old_health="unknown"
new_container_id=""
new_image_id=""
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
    --arg buildReceiptPath "$build_receipt" --arg oldImageId "$old_image_id" --arg newImageId "$new_image_id" \
    --arg oldContainerId "$old_container_id" --arg newContainerId "$new_container_id" \
    --arg oldHealth "$old_health" \
    --arg rollbackTag "$rollback_tag" --arg directHealth "$direct_health" --arg smokeReportPath "$smoke_report_path" \
    --arg outcome "$outcome" --arg startedAt "$started_at" --arg finishedAt "$finished_at" \
    '{schemaVersion:$schemaVersion,runId:$runId,sourceRevision:$sourceRevision,buildReceiptPath:$buildReceiptPath,oldImageId:$oldImageId,newImageId:$newImageId,oldContainerId:$oldContainerId,newContainerId:$newContainerId,oldHealth:$oldHealth,rollbackTag:$rollbackTag,directHealth:$directHealth,smokeReportPath:$smokeReportPath,outcome:$outcome,startedAt:$startedAt,finishedAt:$finishedAt}' \
    > "$receipt_tmp"
  chmod 600 "$receipt_tmp"
  mv "$receipt_tmp" "$deploy_receipt"
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

cd "$remote_dir"
command -v docker >/dev/null 2>&1 || { write_deploy_receipt failed_before_replacement not_run ""; exit 1; }
command -v jq >/dev/null 2>&1 || { echo "ERROR [TOOL_MISSING]: jq is required" >&2; exit 1; }
[[ -x ./app/scripts/verified-production-build.sh ]] || { write_deploy_receipt failed_before_replacement not_run ""; exit 1; }

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

docker compose up -d --force-recreate app
new_container_id="$(docker inspect --format '{{.Id}}' promptforge_app)"
if direct_health_gate; then
  printf 'DEPLOY_REMOTE_STATE|%s|%s|%s|%s|%s|%s|%s|%s\n' \
    "$old_container_id" "$old_image_id" "$old_health" "$new_container_id" "$new_image_id" "$rollback_tag" "$build_receipt" "$started_at"
  exit 0
fi

docker image tag "$rollback_tag" promptforge_app
set +e
docker compose up -d --force-recreate --no-build app
rollback_up_status=$?
if [[ "$rollback_up_status" -eq 0 ]] && direct_health_gate; then
  set -e
  write_deploy_receipt rolled_back failed ""
  echo "ERROR [DIRECT_HEALTH_FAILED]: new app failed direct health and old app was restored" >&2
  exit 1
fi
set -e
write_deploy_receipt rollback_failed failed ""
echo "ERROR [ROLLBACK_FAILED]: new app failed direct health and automatic rollback did not recover" >&2
exit 1
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
IFS='|' read -r state_marker old_container_id old_image_id old_health new_container_id new_image_id state_rollback_tag state_build_receipt deploy_started_at <<EOF
$remote_state
EOF
[[ "$state_marker" == "DEPLOY_REMOTE_STATE" ]] || fail "REMOTE_STATE_INVALID" "invalid remote state marker"
[[ "$state_rollback_tag" == "$rollback_tag" ]] || fail "REMOTE_STATE_INVALID" "rollback tag mismatch"
[[ "$state_build_receipt" == "$build_receipt" ]] || fail "REMOTE_STATE_INVALID" "build receipt path mismatch"

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
  "$deploy_receipt" "$run_id" "$source_revision" "$build_receipt" \
  "$old_image_id" "$new_image_id" "$old_container_id" "$new_container_id" "$old_health" \
  "$rollback_tag" "$smoke_report_path" "$deploy_outcome" "$deploy_started_at" <<'REMOTE_FINALIZE'
set -euo pipefail
deploy_receipt="$1"; run_id="$2"; source_revision="$3"; build_receipt="$4"
old_image_id="$5"; new_image_id="$6"; old_container_id="$7"; new_container_id="$8"; old_health="$9"
rollback_tag="${10}"; smoke_report_path="${11}"; outcome="${12}"; started_at="${13}"
finished_at="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
umask 077
receipt_tmp="$deploy_receipt.tmp.$$"
mkdir -p "$(dirname "$deploy_receipt")"
chmod 700 "$(dirname "$deploy_receipt")"
jq -n \
  --arg schemaVersion "1" --arg runId "$run_id" --arg sourceRevision "$source_revision" \
  --arg buildReceiptPath "$build_receipt" --arg oldImageId "$old_image_id" --arg newImageId "$new_image_id" \
  --arg oldContainerId "$old_container_id" --arg newContainerId "$new_container_id" \
  --arg oldHealth "$old_health" \
  --arg rollbackTag "$rollback_tag" --arg directHealth "passed" --arg smokeReportPath "$smoke_report_path" \
  --arg outcome "$outcome" --arg startedAt "$started_at" --arg finishedAt "$finished_at" \
  '{schemaVersion:$schemaVersion,runId:$runId,sourceRevision:$sourceRevision,buildReceiptPath:$buildReceiptPath,oldImageId:$oldImageId,newImageId:$newImageId,oldContainerId:$oldContainerId,newContainerId:$newContainerId,oldHealth:$oldHealth,rollbackTag:$rollbackTag,directHealth:$directHealth,smokeReportPath:$smokeReportPath,outcome:$outcome,startedAt:$startedAt,finishedAt:$finishedAt}' \
  > "$receipt_tmp"
chmod 600 "$receipt_tmp"
mv "$receipt_tmp" "$deploy_receipt"
REMOTE_FINALIZE

log "Build receipt: $build_receipt"
log "Deploy receipt: $deploy_receipt"
log "Rollback tag retained: $rollback_tag"
log "Manual rollback: docker image tag '$rollback_tag' promptforge_app && cd '$REMOTE_DIR' && docker compose up -d --force-recreate --no-build app"

if [[ "$smoke_status" -ne 0 ]]; then
  fail "SMOKE_FAILED" "production smoke failed; no automatic rollback was attempted"
fi
log "=== Deploy complete ==="
