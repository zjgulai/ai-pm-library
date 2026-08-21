---
title: PromptForge 部署运行手册
doc_type: workflow
module: deploy
topic: production-deployment
status: stable
created: 2026-05-31
updated: 2026-08-22
owner: self
source: human+ai
---

# PromptForge 部署运行手册

## 目标

使用独立 Docker Compose 环境部署 PromptForge，不把密钥放入仓库，不污染同机其他服务。

当前生产应用为 static-first：站点从构建产物中的 `public/catalog/*.json` 读取内容，公开 tRPC 只保留 `ping` 健康检查。`DATABASE_URL`、MySQL、Drizzle 工具链只服务于可选 DB 工具/迁移路线，不是静态站运行的硬依赖。

## 当前生产入口

- PromptForge 当前生产域名：`https://kg.lute-tlz-dddd.top/`
- nginx server block：`deploy/nginx-kg-block.conf`
- 远端 app 容器：`promptforge_app`
- 当前宿主域名 `https://lute-tlz-dddd.top/` 是静态 landing page；PromptForge 卡片入口仍处于设计待实施状态。
- `https://person.lute-tlz-dddd.top/` 当前不作为 PromptForge 生产入口使用。

## 本地前置条件

- Docker Compose v2 已在远端服务器可用。
- 本地已安装并登录 GitHub CLI；GHCR 部署前会用 `gh attestation verify` 校验 signed OCI provenance。
- 本地 SSH key 位于 `~/.ssh/promptforge_ai_video.pem`，权限为 `600`。
- 如使用其他 key 路径，执行前设置 `PROMPTFORGE_SSH_KEY=/absolute/path/to/key.pem`。
- `deploy/.env.prod` 只保留在本地和远端部署目录，不提交 Git。

## 部署入口

```bash
cd deploy
./deploy.sh
```

该命令会：

- 同步 `app/` 到远端 `/opt/promptforge/app`。
- 同步 `docker-compose.yml` 和 `.env.prod`。
- 从 `app/Dockerfile` 读取唯一的 Node image digest，通过 Docker Hub 验证后只构建一次 app 镜像。
- 为当前健康 app 镜像创建不可覆盖的 rollback tag。
- 只替换 `app` service，并在 120 秒内验证 container running、Docker healthy 和容器内 ping。

当前编排要求远端已有健康的 `promptforge_app`，以保证替换前具备可验证的回滚基线；缺少或不健康时部署会在 build 前失败。

## 日常更新

```bash
cd deploy
./deploy.sh
```

更新代码并重启 app。catalog 数据在 `npm run build` 阶段由 `app/src/data/catalogSource.json` 生成到 `public/catalog/*.json`。

默认 Registry source 仍是 Docker Hub。只有在人工明确选择并确认 mirror manifest digest 与 Dockerfile pin 完全一致时，才使用受控 GCR mirror：

```bash
./deploy.sh --node-mirror gcr
./deploy.sh --node-mirror gcr --smoke
```

不支持任意 mirror hostname，也不会在 Docker Hub 失败后自动回退到 GCR。每次调用最多执行一次 build。

### GHCR 固定摘要交付

当生产主机无法访问 Docker Hub/GCR 基础镜像源时，不允许关闭 manifest
校验或反复重试。CI 在 production image smoke 通过后，将同一份
`linux/amd64` 镜像通过独立的 push-only job 发布到 GHCR、生成 signed
OCI provenance，并输出：

```text
ghcr-publish-receipt-<runId>.json
```

下载 exact-head CI 的该 receipt 后执行：

```bash
cd deploy
PROMPTFORGE_SSH_KEY=~/.ssh/promptforge_ai_video.pem \
  ./deploy.sh --ghcr-receipt ../tmp/outputs/ghcr-publish-receipt-<runId>.json --smoke
```

该入口不接受手工 tag 或 digest。脚本从 CI receipt 派生
`ghcr.io/zjgulai/ai-pm-library@sha256:...`，并要求 receipt 的
`sourceRevision` 等于本地完整 `HEAD`。脚本还要求 GitHub run 已成功完成，并以
repository、workflow、source ref 和 exact SHA 约束签名证明。远端使用临时空
Docker config 匿名 pull 一次该 digest，核对
`RepoDigests`、`linux/amd64` 和 image ID 后写入独立 pull receipt，再执行：

```bash
docker compose up -d --force-recreate --no-build app
```

GHCR 是 image-only 模式：不同步 `app/`、`docker-compose.yml` 或 `.env.prod`，
只读验证远端 Compose 的 SHA-256 与 exact-head 文件一致且仍仅含 `app`、现有
`.env.prod` 权限为 `600`；它不运行
远端 builder，也不把 Registry token 放到生产。
如果 package 不能匿名按 digest 拉取、receipt 不一致或镜像核验失败，部署在
app replacement 前失败。

无副作用部署计划预检：

```bash
cd deploy
./deploy.sh --dry-run
./deploy.sh --dry-run --smoke
./deploy.sh --dry-run --node-mirror gcr --smoke
./deploy.sh --dry-run --ghcr-receipt ../tmp/outputs/ghcr-publish-receipt-<runId>.json --smoke
```

`--dry-run` 只解析本地固定契约并输出 source、digest、provenance、同步/回滚/健康检查和可选 smoke 计划；不执行 attestation、Registry probe、Docker、SSH、rsync、生产 smoke 或 provider call。

部署后执行线上 E2E smoke：

```bash
cd deploy
./deploy.sh --smoke
```

`--smoke` 会在 app 更新后调用 `app/scripts/smoke-e2e.mjs`，覆盖生产 HTML/assets、favicon、catalog JSON、只读 tRPC 边界、全路由渲染、`/skills` 共享交互、桌面/移动端横向溢出和浏览器 console 错误。首次运行前需要本地安装依赖和 Chromium：

```bash
cd app
npm ci
npx playwright install chromium
```

也可不重新部署，单独对线上域名运行：

```bash
cd app
npm run smoke:e2e:prod
```

默认报告写入 `tmp/outputs/`，截图写入 `tmp/screenshots/`。CI 对统一构建器产出的 production image 跑同一套 smoke；生产部署使用 `PROMPTFORGE_SMOKE_BASE_URL=https://kg.lute-tlz-dddd.top/`。

直接健康门禁通过后，`--smoke` 失败会写入 `verification_failed` deploy receipt 并返回非零，但不会自动回滚。完整 smoke 可能受公网、浏览器代理或共宿主影响，不能单独证明新 app 是根因；脚本会输出保留的 rollback tag 和精确人工回滚命令。

## 发布前工作区门禁

真实部署要求当前 `HEAD` 可解析为完整 Git SHA，并且会进入发布链路的路径必须干净：

- `app/`
- `deploy/`
- `.github/workflows/ci.yml`

这些路径存在 tracked diff 或未跟踪文件时，脚本以 `WORKTREE_NOT_CLEAN` 在 SSH/rsync 前失败。`drafts/`、`tmp/` 和不会同步的用户材料不阻塞，也不会被暂存或传输。build 模式把完整 SHA 传给远端统一构建器；GHCR 模式则用它约束 successful run 与 signed OCI provenance。

## Build、pull 与 deploy receipts

远端构建器写入：

```text
/opt/promptforge/.deploy-receipts/docker-build-receipt-<runId>.json
```

只有 receipt 同时满足 `outcome=built`、`buildAttempt=1`、source/scope/mode/runId/worktree 契约、expected/observed digest 相等、`sourceRevision` 与本地完整 SHA 一致且权限为 `600` 时，编排器才执行 `docker compose up -d --force-recreate app`。

GHCR 路径保留 CI publish receipt，并在生产写入：

```text
/opt/promptforge/.deploy-receipts/ghcr-publish-receipt-<runId>.json
/opt/promptforge/.deploy-receipts/docker-pull-receipt-<runId>.json
```

pull receipt 将 `sourceRevision`、immutable image ref、expected/observed digest、
image ID、platform、单次 pull 和 `anonymousPull=true` 绑定；它不冒充 build receipt。GHCR deploy receipt
的 `buildReceiptPath` 为空，并通过 `artifactReceiptPath`、
`deliveryReceiptPath` 和 `deliveryMode=ghcr` 指向正确证据层。

最终部署回执写入：

```text
/opt/promptforge/.deploy-receipts/deploy-receipt-<runId>.json
```

receipt 目录权限为 `700`、文件为 `600`，通过同目录临时文件原子发布。receipt 不记录 Registry token、proxy URL、SSH key、env 内容或完整 Docker config。

## DB-backed 路线

默认生产部署不启动 MySQL，不执行 `drizzle-kit push`，也不运行 seed。`./deploy.sh --seed` 会直接失败，防止误以为静态站部署会写数据库。`npm run db:push` 已加本地 guard，只有 `PROMPTFORGE_ALLOW_DB_PUSH=local-only` 且 `DATABASE_URL` 指向 localhost/127.0.0.1 时才允许执行。

如需切换为 DB-backed 内容平台，先提交单独方案和变更，至少包括：

- 可审查、可回滚的 Drizzle migration，禁止用 `push` 直接改生产 schema。
- 幂等 seed 或明确的清表导入策略。
- catalog read API 的分页、搜索、限流、认证授权和审计路径。
- 生产回滚步骤和数据备份步骤。

管理员内容新增与发布路线已有正式设计，但尚未实施：`docs/superpowers/specs/2026-05-31-admin-content-publishing-design.md`。

旧的远端 `promptforge_mysql` 容器和 `mysql_data` volume 如果已经存在，不会被新的 static-first compose 使用。删除前必须先备份并单独确认。

## 旧 DB 归档 TODO

旧 `promptforge_mysql`、`promptforge_net` 和相关 volume 是后续归档项，不属于日常部署动作。归档前必须完成：

1. 备份 `/opt/promptforge`、`docker inspect promptforge_mysql`、`docker logs promptforge_mysql`、相关 volume 元数据，以及可用凭据下的 MySQL dump。
2. 确认 `promptforge_app`、`ai_video_nginx` 和其他同机应用没有引用 `promptforge_net` 或 `promptforge_mysql`。
3. 在维护窗口先 `stop` 而不是删除，观察生产域名、同机域名和 smoke 结果。
4. 只有在单独确认后，才允许执行容器、网络或 volume 的最终归档/删除。

## 密钥规则

- 禁止把 `*.pem`、`.env.prod`、`secrets.env` 提交到 Git。
- 禁止把 `docker compose config` 的完整输出贴到共享日志，因为它会展开环境变量。
- SSH key 轮换后，先验证新 key 可登录，再移除旧 key。

## 回滚

替换前，脚本盘点当前 container/image/health，并创建：

```text
promptforge_app:rollback-<runId>
```

首次 `docker compose up` 返回非零或新 app 的直接健康门禁失败时，脚本将 rollback tag 重新指向 Compose 使用的 `promptforge_app` image，然后只执行：

```bash
cd /opt/promptforge
docker compose up -d --force-recreate --no-build app
```

自动回滚成功仍以 `rolled_back` 返回非零；回滚本身失败则为 `rollback_failed`。rollback tag 不自动清理，镜像清理属于需要另行盘点和授权的破坏性维护任务。禁止使用 `--remove-orphans`，部署和回滚都只指定 `app`，不操作旧 MySQL、network、volume 或共享 nginx。

数据库回滚：

当前 static-first 部署路径不执行数据库变更。DB-backed 路线启用前，必须先补可回滚 migration 和备份策略。

在切回 DB-backed 内容平台前，禁止重新公开 catalog read/write routers；必须先补齐认证授权、分页搜索、幂等 seed 和可回滚 migration。

## 依赖安全边界

生产 app 镜像只安装 `dependencies`，不携带 `devDependencies` 中的 DB 工具和未使用客户端包，例如 `drizzle-kit`、`drizzle-orm`、`mysql2`、`dotenv`、`zod`、`@trpc/client`、`@trpc/react-query` 和 `@tanstack/react-query`。

本地安全检查：

```bash
cd app
npm run audit:prod
npm run audit:high
```

`drizzle-kit` 只保留在开发依赖中，用于未来 DB-backed 路线设计和本地迁移文件生成。不要使用 `npm audit fix --force` 自动降级到旧版 `drizzle-kit`。

## 健康检查

本地检查 compose 配置：

```bash
docker compose -f deploy/docker-compose.yml config
```

预期默认服务只包含 `app`，不包含 `mysql`、`migrate` 或 `seed`。

远端检查必须按容器网络边界执行。当前 `promptforge_app` 不把 `3000` 暴露到宿主机，因此不要用宿主机 `curl http://localhost:3000` 判断服务状态。

```bash
ssh -i ~/.ssh/promptforge_ai_video.pem ubuntu@101.34.52.232 '
docker ps --format "{{.Names}}\t{{.Status}}\t{{.Networks}}" | grep -E "^(promptforge_app|promptforge_mysql|ai_video_nginx)\b" || true
docker inspect --format "{{json .State.Health}}" promptforge_app
docker exec promptforge_app node -e "fetch(\"http://127.0.0.1:3000/api/trpc/ping?batch=1&input=%7B%7D\").then(async r=>{const t=await r.text(); console.log(r.status,t.includes(\"ok\")); if(!r.ok||!t.includes(\"ok\")) process.exit(1)})"
docker exec ai_video_nginx sh -lc "curl -fsS \"http://promptforge_app:3000/api/trpc/ping?batch=1&input=%7B%7D\" | grep -q \"\\\"ok\\\":true\""
docker exec ai_video_nginx nginx -t
stat -c "%a %n" /opt/promptforge/.env.prod
'
```

公网 smoke：

```bash
cd app
npm run smoke:e2e:prod
```

远端验证通过标准：

- `promptforge_app` 为 `healthy`。
- `ai_video_nginx` 能通过 Docker 网络访问 `promptforge_app:3000`。
- `nginx -t` 通过。
- `/opt/promptforge/.env.prod` 权限为 `600`。
- 线上 `catalog/*.json` 计数与本地一致。
- 旧 `promptforge_mysql` 如仍存在，必须保持未触碰状态，直到单独归档窗口确认。
