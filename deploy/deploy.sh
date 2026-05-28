#!/usr/bin/env bash
# PromptForge 部署脚本
# 用法：
#   首次部署（含 seed）: ./deploy.sh --seed
#   日常更新:            ./deploy.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
REMOTE_USER=ubuntu
REMOTE_HOST=101.34.52.232
REMOTE_DIR=/opt/promptforge
SSH_KEY="$PROJECT_ROOT/ai_video.pem"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=no"

SEED=false
if [[ "${1:-}" == "--seed" ]]; then
  SEED=true
fi

log() { echo "[$(date '+%H:%M:%S')] $*"; }

log "=== PromptForge Deploy ==="

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

  # build deps & app 镜像
  docker compose build --no-cache app
  docker compose build migrate

  # 确保 MySQL 运行并 healthy
  docker compose up -d mysql
  echo 'Waiting for MySQL ...'
  docker compose run --rm migrate echo 'MySQL ready'  2>/dev/null || true

  # 运行 schema 迁移
  echo 'Running drizzle push ...'
  docker compose run --rm migrate
"

if [[ "$SEED" == "true" ]]; then
  log "Running seed (803 records) ..."
  ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "
    cd $REMOTE_DIR
    docker compose run --rm seed
  "
fi

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

log "=== Deploy complete ==="
