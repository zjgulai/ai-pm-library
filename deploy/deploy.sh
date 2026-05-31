#!/usr/bin/env bash
# PromptForge 部署脚本
# 用法：
#   部署 / 更新: ./deploy.sh
#   部署后执行线上 E2E smoke: ./deploy.sh --smoke
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
REMOTE_USER=ubuntu
REMOTE_HOST=101.34.52.232
REMOTE_DIR=/opt/promptforge
SSH_KEY="${PROMPTFORGE_SSH_KEY:-$HOME/.ssh/promptforge_ai_video.pem}"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"
RUN_SMOKE=0

for arg in "$@"; do
  case "$arg" in
    --smoke)
      RUN_SMOKE=1
      ;;
    --seed)
      echo "ERROR: --seed is not supported in the static-first production deploy path." >&2
      echo "Catalog data is generated into public/catalog/*.json during npm run build." >&2
      echo "If DB-backed content is needed, design a separate migration and seed workflow first." >&2
      exit 1
      ;;
    *)
      echo "ERROR: unknown argument: $arg" >&2
      echo "Usage: ./deploy.sh [--smoke]" >&2
      exit 1
      ;;
  esac
done

log() { echo "[$(date '+%H:%M:%S')] $*"; }

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
  "curl -sf http://localhost:3000/ > /dev/null && echo 'OK: app responding on :3000' || echo 'WARN: app not yet ready (may still be starting)'"

if [[ "$RUN_SMOKE" -eq 1 ]]; then
  log "Running production E2E smoke ..."
  (
    cd "$PROJECT_ROOT/app"
    PROMPTFORGE_SMOKE_BASE_URL="${PROMPTFORGE_PUBLIC_URL:-https://person.lute-tlz-dddd.top/}" \
      PROMPTFORGE_SMOKE_CHECK_COHOSTS="${PROMPTFORGE_SMOKE_CHECK_COHOSTS:-1}" \
      npm run smoke:e2e
  )
fi

log "=== Deploy complete ==="
