#!/usr/bin/env bash
# PromptForge 部署脚本
# 用法：
#   部署 / 更新: ./deploy.sh
#   部署后执行线上 E2E smoke: ./deploy.sh --smoke
#   只做无副作用计划预检: ./deploy.sh --dry-run
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
REMOTE_USER=ubuntu
REMOTE_HOST=101.34.52.232
REMOTE_DIR=/opt/promptforge
SSH_KEY="${PROMPTFORGE_SSH_KEY:-$HOME/.ssh/promptforge_ai_video.pem}"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"
RUN_SMOKE=0
DRY_RUN=0
DOCKER_BIN="${PROMPTFORGE_DOCKER_BIN:-}"

usage() {
  echo "Usage: ./deploy.sh [--smoke] [--dry-run]" >&2
}

for arg in "$@"; do
  case "$arg" in
    --smoke)
      RUN_SMOKE=1
      ;;
    --dry-run|--preflight)
      DRY_RUN=1
      ;;
    --seed)
      echo "ERROR: --seed is not supported in the static-first production deploy path." >&2
      echo "Catalog data is generated into public/catalog/*.json during npm run build." >&2
      echo "If DB-backed content is needed, design a separate migration and seed workflow first." >&2
      exit 1
      ;;
    *)
      echo "ERROR: unknown argument: $arg" >&2
      usage
      exit 1
      ;;
  esac
done

log() { echo "[$(date '+%H:%M:%S')] $*"; }

resolve_docker_bin() {
  if [[ -n "$DOCKER_BIN" ]]; then
    return 0
  fi
  if command -v docker >/dev/null 2>&1; then
    DOCKER_BIN="$(command -v docker)"
    return 0
  fi
  if [[ -x /usr/local/bin/docker ]]; then
    DOCKER_BIN="/usr/local/bin/docker"
    return 0
  fi
  return 1
}

if [[ "$DRY_RUN" -eq 1 ]]; then
  log "=== PromptForge Deploy Dry Run ==="
  log "Target: $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
  log "App source: $PROJECT_ROOT/app/"
  log "Compose file: $SCRIPT_DIR/docker-compose.yml"
  log "SSH key path: $SSH_KEY"

  if [[ -f "$SSH_KEY" ]]; then
    log "Preflight: SSH key path exists"
  else
    log "Preflight warning: SSH key path is missing; real deploy would fail before remote access"
  fi

  if [[ -f "$SCRIPT_DIR/.env.prod" ]]; then
    log "Preflight: deploy/.env.prod exists locally"
  else
    log "Preflight warning: deploy/.env.prod is missing; real deploy would fail before env sync"
  fi

  if resolve_docker_bin; then
    services="$("$DOCKER_BIN" compose -f "$SCRIPT_DIR/docker-compose.yml" config --services 2>/dev/null | tr '\n' ' ')"
    log "Preflight: docker compose services: ${services:-unavailable}"
  else
    log "Preflight warning: docker command not found; compose config was not checked"
  fi

  log "Would run: ssh $REMOTE_USER@$REMOTE_HOST 'mkdir -p $REMOTE_DIR/app'"
  log "Would run: rsync app/ to $REMOTE_DIR/app/ with --delete and local excludes"
  log "Would run: rsync docker-compose.yml to $REMOTE_DIR/"
  log "Would run: rsync deploy/.env.prod to $REMOTE_DIR/.env.prod and chmod 600"
  log "Would run remotely: docker compose build --no-cache app"
  log "Would run remotely: docker compose up -d --force-recreate app"
  log "Would run remotely: docker compose ps and container-local ping health check"
  if [[ "$RUN_SMOKE" -eq 1 ]]; then
    log "Would run local production E2E smoke against ${PROMPTFORGE_PUBLIC_URL:-https://kg.lute-tlz-dddd.top/}"
  fi
  log "No SSH, rsync, remote Docker, production smoke, or provider call executed."
  log "=== Dry run complete ==="
  exit 0
fi

log "=== PromptForge Deploy ==="

if [[ ! -f "$SSH_KEY" ]]; then
  echo "ERROR: SSH key not found: $SSH_KEY" >&2
  echo "Set PROMPTFORGE_SSH_KEY or place the key at ~/.ssh/promptforge_ai_video.pem" >&2
  exit 1
fi

# ── 1. 同步文件到服务器 ──────────────────────────────────────────
log "Syncing app/ to $REMOTE_HOST:$REMOTE_DIR/app ..."
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_DIR/app"
rsync -az --delete \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude '.git' \
  --exclude '*.log' \
  -e "ssh $SSH_OPTS" \
  "$PROJECT_ROOT/app/" \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/app/"

log "Syncing deploy/ (compose + scripts) ..."
rsync -az \
  --exclude 'secrets.env' \
  -e "ssh $SSH_OPTS" \
  "$SCRIPT_DIR/docker-compose.yml" \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"

log "Syncing .env.prod ..."
rsync -az \
  -e "ssh $SSH_OPTS" \
  "$SCRIPT_DIR/.env.prod" \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/.env.prod"
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "chmod 600 $REMOTE_DIR/.env.prod"

# ── 2. 服务器上 build + 启动 ────────────────────────────────────
log "Building images on server ..."
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "
  set -e
  cd $REMOTE_DIR

  docker compose build --no-cache app
"

log "Starting / restarting app ..."
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "
  cd $REMOTE_DIR
  docker compose up -d --force-recreate app
"

# ── 3. 验证 ───────────────────────────────────────────────────────
log "Waiting 10s for app to start ..."
sleep 10
log "Container status:"
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "docker compose -f $REMOTE_DIR/docker-compose.yml ps"

log "App health check:"
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST \
  "docker exec promptforge_app node -e \"fetch('http://127.0.0.1:3000/api/trpc/ping?batch=1&input=%7B%7D').then(async r=>{const t=await r.text(); if(!r.ok||!t.includes('ok')) process.exit(1); console.log('OK: app responding inside promptforge_app')}).catch(()=>process.exit(1))\" || echo 'WARN: app not yet ready (may still be starting)'"

if [[ "$RUN_SMOKE" -eq 1 ]]; then
  log "Running production E2E smoke ..."
  (
    cd "$PROJECT_ROOT/app"
    PROMPTFORGE_SMOKE_BASE_URL="${PROMPTFORGE_PUBLIC_URL:-https://kg.lute-tlz-dddd.top/}" \
      PROMPTFORGE_SMOKE_CHECK_COHOSTS="${PROMPTFORGE_SMOKE_CHECK_COHOSTS:-1}" \
      npm run smoke:e2e
  )
fi

log "=== Deploy complete ==="
