#!/usr/bin/env bash

set -u
set -o pipefail

umask 077

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
REPO_ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/../.." && pwd)"
SOURCE_IMAGE_TAG=promptforge-app:ci
REPOSITORY="${GITHUB_REPOSITORY:-}"
SOURCE_REVISION="${GITHUB_SHA:-}"
BUILD_RUN_ID="${GITHUB_RUN_ID:-}"
BUILD_RUN_ATTEMPT="${GITHUB_RUN_ATTEMPT:-}"
EVENT_NAME="${GITHUB_EVENT_NAME:-}"
SOURCE_REF="${GITHUB_REF:-}"
RUN_ID="${PROMPTFORGE_GHCR_RUN_ID:-}"
BUILD_RECEIPT_PATH="${PROMPTFORGE_BUILD_RECEIPT_PATH:-}"

invalid_context() {
  printf 'INVALID_CONTEXT: %s\n' "$1" >&2
  exit 2
}

[[ "$EVENT_NAME" == "push" ]] || invalid_context "GITHUB_EVENT_NAME must be push"
[[ "$REPOSITORY" == "zjgulai/ai-pm-library" ]] || invalid_context "unexpected GITHUB_REPOSITORY"
[[ "$SOURCE_REF" == "refs/heads/main" || "$SOURCE_REF" == "refs/heads/codex/catalog-plugin-refresh-202608" ]] || \
  invalid_context "GITHUB_REF is not approved for package publication"
[[ "$SOURCE_REVISION" =~ ^[0-9a-f]{40}$ ]] || invalid_context "GITHUB_SHA must be a full lowercase SHA"
[[ "$BUILD_RUN_ID" =~ ^[1-9][0-9]*$ ]] || invalid_context "GITHUB_RUN_ID must be a positive integer"
[[ "$BUILD_RUN_ATTEMPT" =~ ^[1-9][0-9]*$ ]] || invalid_context "GITHUB_RUN_ATTEMPT must be a positive integer"
[[ "$RUN_ID" =~ ^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$ ]] || invalid_context "PROMPTFORGE_GHCR_RUN_ID is unsafe"

STARTED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
PUBLISHED_TAG="ghcr.io/${REPOSITORY}:sha-${SOURCE_REVISION}-run-${BUILD_RUN_ID}-${BUILD_RUN_ATTEMPT}"
RECEIPT_PATH="$REPO_ROOT/tmp/outputs/ghcr-publish-receipt-$RUN_ID.json"
SOURCE_IMAGE_ID=""
PLATFORM=""
PUBLISHED_DIGEST=""
PUBLISHED_REF=""
PUSH_ATTEMPT=0
EXTERNAL_WRITE=none
VERIFICATION_PULL_ATTEMPT=0

write_receipt() {
  outcome="$1"
  failed_phase="$2"
  error_code="$3"
  finished_at="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

  mkdir -p "$(dirname "$RECEIPT_PATH")" || return 1
  chmod 700 "$(dirname "$RECEIPT_PATH")" || return 1
  receipt_tmp="$RECEIPT_PATH.tmp.$$"
  jq -n \
    --argjson schemaVersion 1 \
    --arg runId "$RUN_ID" \
    --arg sourceRevision "$SOURCE_REVISION" \
    --arg sourceRef "$SOURCE_REF" \
    --arg sourceImageTag "$SOURCE_IMAGE_TAG" \
    --arg sourceImageId "$SOURCE_IMAGE_ID" \
    --arg platform "$PLATFORM" \
    --arg registry ghcr.io \
    --arg repository "$REPOSITORY" \
    --arg publishedTag "$PUBLISHED_TAG" \
    --arg publishedDigest "$PUBLISHED_DIGEST" \
    --arg publishedRef "$PUBLISHED_REF" \
    --arg eventName "$EVENT_NAME" \
    --arg buildRunId "$BUILD_RUN_ID" \
    --argjson buildRunAttempt "$BUILD_RUN_ATTEMPT" \
    --argjson pushAttempt "$PUSH_ATTEMPT" \
    --arg externalWrite "$EXTERNAL_WRITE" \
    --argjson verificationPullAttempt "$VERIFICATION_PULL_ATTEMPT" \
    --arg outcome "$outcome" \
    --arg failedPhase "$failed_phase" \
    --arg errorCode "$error_code" \
    --arg startedAt "$STARTED_AT" \
    --arg finishedAt "$finished_at" \
    '{schemaVersion:$schemaVersion,runId:$runId,sourceRevision:$sourceRevision,sourceRef:$sourceRef,sourceImageTag:$sourceImageTag,sourceImageId:$sourceImageId,platform:$platform,registry:$registry,repository:$repository,publishedTag:$publishedTag,publishedDigest:$publishedDigest,publishedRef:$publishedRef,eventName:$eventName,buildRunId:$buildRunId,buildRunAttempt:$buildRunAttempt,pushAttempt:$pushAttempt,externalWrite:$externalWrite,verificationPullAttempt:$verificationPullAttempt,outcome:$outcome,failedPhase:$failedPhase,errorCode:$errorCode,startedAt:$startedAt,finishedAt:$finishedAt}' \
    > "$receipt_tmp" || return 1
  chmod 600 "$receipt_tmp" || return 1
  mv "$receipt_tmp" "$RECEIPT_PATH"
  printf 'GHCR_PUBLISH_RECEIPT_PATH=%s\n' "$RECEIPT_PATH"
}

if [[ ! -f "$BUILD_RECEIPT_PATH" ]] || ! jq -e --arg revision "$SOURCE_REVISION" \
  '.outcome == "built" and .scope == "ci" and .imageTag == "promptforge-app:ci" and
   .platform == "linux/amd64" and .buildAttempt == 1 and .relevantWorktreeClean == true and
   .sourceRevision == $revision and (.imageId | test("^sha256:[0-9a-f]{64}$"))' \
  "$BUILD_RECEIPT_PATH" >/dev/null 2>&1; then
  printf 'BUILD_RECEIPT_INVALID: receipt is not bound to the exact CI image and revision\n' >&2
  write_receipt failed preflight BUILD_RECEIPT_INVALID
  exit 1
fi
BUILD_IMAGE_ID="$(jq -r '.imageId' "$BUILD_RECEIPT_PATH")"

if ! source_inspect="$(docker image inspect --format '{{.Id}}|{{.Os}}/{{.Architecture}}' "$SOURCE_IMAGE_TAG")"; then
  printf 'SOURCE_INSPECT_FAILED: source image inspect exited nonzero\n' >&2
  write_receipt failed preflight SOURCE_INSPECT_FAILED
  exit 1
fi
SOURCE_IMAGE_ID="${source_inspect%%|*}"
PLATFORM="${source_inspect#*|}"
if [[ "$SOURCE_IMAGE_ID" != "$BUILD_IMAGE_ID" ]] || [[ "$PLATFORM" != "linux/amd64" ]]; then
  printf 'SOURCE_IMAGE_INVALID: expected a linux/amd64 image with a complete SHA-256 ID\n' >&2
  write_receipt failed preflight SOURCE_IMAGE_INVALID
  exit 1
fi

if ! docker tag "$SOURCE_IMAGE_TAG" "$PUBLISHED_TAG"; then
  printf 'TAG_FAILED: source image tag exited nonzero\n' >&2
  write_receipt failed preflight TAG_FAILED
  exit 1
fi
PUSH_ATTEMPT=1
push_output="$(docker push "$PUBLISHED_TAG")"
push_status=$?
if [[ "$push_status" -ne 0 ]]; then
  EXTERNAL_WRITE=uncertain
  printf 'PUSH_FAILED: GHCR upload exited nonzero\n' >&2
  write_receipt failed push_started PUSH_FAILED
  exit 1
fi
EXTERNAL_WRITE=occurred
printf '%s\n' "$push_output"
PUBLISHED_DIGEST="$(printf '%s\n' "$push_output" | sed -n 's/.*digest: \(sha256:[a-f0-9]\{64\}\).*/\1/p' | tail -n 1)"
if [[ ! "$PUBLISHED_DIGEST" =~ ^sha256:[0-9a-f]{64}$ ]]; then
  PUBLISHED_DIGEST=""
  printf 'PUBLISHED_DIGEST_INVALID: push output did not contain a complete SHA-256 digest\n' >&2
  write_receipt verification_failed push_completed PUBLISHED_DIGEST_INVALID
  exit 1
fi
PUBLISHED_REF="ghcr.io/${REPOSITORY}@${PUBLISHED_DIGEST}"
VERIFICATION_PULL_ATTEMPT=1
if ! docker pull --platform linux/amd64 "$PUBLISHED_REF" >/dev/null; then
  printf 'PUBLISHED_IMAGE_PULL_FAILED: digest pull exited nonzero\n' >&2
  write_receipt verification_failed digest_verification PUBLISHED_IMAGE_PULL_FAILED
  exit 1
fi
published_inspect="$(docker image inspect --format '{{.Id}}|{{.Os}}/{{.Architecture}}' "$PUBLISHED_REF")" || {
  printf 'PUBLISHED_IMAGE_MISMATCH: digest image inspect failed\n' >&2
  write_receipt verification_failed digest_verification PUBLISHED_IMAGE_MISMATCH
  exit 1
}
if [[ "$published_inspect" != "$SOURCE_IMAGE_ID|linux/amd64" ]]; then
  printf 'PUBLISHED_IMAGE_MISMATCH: digest image does not match the smoke-verified source image\n' >&2
  write_receipt verification_failed digest_verification PUBLISHED_IMAGE_MISMATCH
  exit 1
fi
write_receipt published "" ""
