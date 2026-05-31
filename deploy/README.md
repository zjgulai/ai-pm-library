---
title: PromptForge 部署运行手册
doc_type: workflow
module: deploy
topic: production-deployment
status: stable
created: 2026-05-31
updated: 2026-05-31
owner: self
source: human+ai
---

# PromptForge 部署运行手册

## 目标

使用独立 Docker Compose 环境部署 PromptForge，不把密钥放入仓库，不污染同机其他服务。

当前生产应用为 static-first：站点从构建产物中的 `public/catalog/*.json` 读取内容，公开 tRPC 只保留 `ping` 健康检查。`DATABASE_URL`、MySQL、Drizzle 工具链只服务于可选 DB 工具/迁移路线，不是静态站运行的硬依赖。

## 本地前置条件

- Docker Compose v2 已在远端服务器可用。
- 本地 SSH key 位于 `~/.ssh/promptforge_ai_video.pem`，权限为 `600`。
- 如使用其他 key 路径，执行前设置 `PROMPTFORGE_SSH_KEY=/absolute/path/to/key.pem`。
- `deploy/.env.prod` 只保留在本地和远端部署目录，不提交 Git。

## 首次部署

```bash
cd deploy
./deploy.sh
```

该命令会：

- 同步 `app/` 到远端 `/opt/promptforge/app`。
- 同步 `docker-compose.yml` 和 `.env.prod`。
- 构建 app 镜像。
- 启动 app 并做基础健康检查。

## 日常更新

```bash
cd deploy
./deploy.sh
```

更新代码并重启 app。catalog 数据在 `npm run build` 阶段由 `staticData.ts` 生成到 `public/catalog/*.json`。

## DB-backed 路线

默认生产部署不启动 MySQL，不执行 `drizzle-kit push`，也不运行 seed。`./deploy.sh --seed` 会直接失败，防止误以为静态站部署会写数据库。

如需切换为 DB-backed 内容平台，先提交单独方案和变更，至少包括：

- 可审查、可回滚的 Drizzle migration，禁止用 `push` 直接改生产 schema。
- 幂等 seed 或明确的清表导入策略。
- catalog read API 的分页、搜索、限流、认证授权和审计路径。
- 生产回滚步骤和数据备份步骤。

旧的远端 `promptforge_mysql` 容器和 `mysql_data` volume 如果已经存在，不会被新的 static-first compose 使用。删除前必须先备份并单独确认。

## 密钥规则

- 禁止把 `*.pem`、`.env.prod`、`secrets.env` 提交到 Git。
- 禁止把 `docker compose config` 的完整输出贴到共享日志，因为它会展开环境变量。
- SSH key 轮换后，先验证新 key 可登录，再移除旧 key。

## 回滚

应用代码回滚：

```bash
ssh -i ~/.ssh/promptforge_ai_video.pem ubuntu@101.34.52.232
cd /opt/promptforge
git status
```

当前部署脚本以 rsync 同步代码，不保留远端 Git 历史。生产级回滚应补充版本化 release 目录或镜像 tag。在补齐前，推荐通过本地 Git 回退到上一个稳定提交后重新部署。

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

远端检查：

```bash
curl -sf http://localhost:3000/ > /dev/null && echo OK
```
