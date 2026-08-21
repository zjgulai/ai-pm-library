---
title: 智能体可调用的固定摘要 Docker 构建与部署门禁设计
doc_type: architecture
module: release
topic: agent-callable-verified-docker-build
status: stable
created: 2026-08-21
updated: 2026-08-21
owner: self
source: human+ai
---

# 智能体可调用的固定摘要 Docker 构建与部署门禁设计

## 目标

为 PromptForge 建立一个可由人或智能体安全调用的 production image 构建能力，并在本地、CI 和生产部署三层复用同一套供应链校验、单次构建和证据回执规则。

该能力必须解决本机 Docker Hub Auth 路径不稳定的问题，同时保持 Dockerfile 中的基础镜像摘要为唯一事实源，不允许自动切换镜像源、降低摘要校验或把本地成功冒充为生产验证。

## 已验证基线

- `app/Dockerfile` 使用固定基础镜像 `node:22.23.1-alpine3.24` 和 SHA-256 digest。
- Docker Hub Auth 在当前本机 Docker Desktop 内部代理/DNS 路径中超时。
- `mirror.gcr.io` 对同一 manifest 返回与 Dockerfile 完全相同的 digest。
- 使用 GCR mirror 的同 digest build arg 完成了一次 production build，未修改 Dockerfile。
- 构建出的 `linux/arm64` 镜像通过隔离运行检查：catalog 总量 966、ping 200、legacy router 404，且 production node_modules 不包含 Drizzle/MySQL 工具链。
- 本地 Playwright smoke 为 13 passed、1 local-only co-host skip、0 failed。
- 当前 CI 只对宿主 Node production server 运行 smoke，没有构建或运行 Docker production image。
- 当前 `deploy.sh` 使用远端 `docker compose build --no-cache app`，容器健康失败只打印 `WARN`，存在 fail-open 风险。

## 已确认决策

- 覆盖本地、CI、部署三层。
- 采用单一可调用构建器，而不是在三层复制校验逻辑。
- 默认仍使用 Docker Hub；GCR mirror 只能显式启用。
- 不允许 Docker Hub 失败后自动回退，也不允许一次调用执行两次构建。
- Dockerfile 中的完整 `NODE_IMAGE` 是版本和 digest 的唯一事实源。
- GCR 模式只改写 Registry/path，digest 必须保持完全一致。
- 任何 manifest、digest、构建或检查失败都必须显式失败并产生结构化 receipt。
- 直接由新容器导致的健康失败允许自动回滚；完整 smoke 的失败不自动回滚，因为可能来自外部网络或共宿主。
- 真正生产部署仍需要单独、明确的执行授权。

## 第一性原则

### 可调用性

智能体只能调用一个名称稳定、参数有限、退出码明确的入口。调用者不需要理解 Registry token、Docker build arg 或 receipt 落盘细节。

### 内容地址不变量

镜像域名可以显式替换，内容摘要不能替换。任何 mirror 必须证明其 manifest digest 与 Dockerfile pin 完全一致。

### 显式副作用

构建器只负责验证和构建。SSH、rsync、容器替换、生产 smoke 和回滚仍由 `deploy.sh` 编排；构建成功本身不能触发生产替换。

### 失败即停

不存在自动 source fallback、静默 warning 或无限重试。一次调用最多执行一次 build。

### 可审计性

每次真实 build 和 deploy 都生成权限受限、机器可读、无 secret 的 JSON receipt。事实、推断和未验证状态通过不同 outcome 表达。

### 最小权限与可恢复性

构建器不读取 SSH key、env 文件或数据库。部署只操作 `app` service，保留旧镜像 rollback tag，不操作 MySQL、network、volume、共享 nginx 或其他服务。

## 范围

### 包含

- Dockerfile canonical image/digest 解析。
- Docker Hub 与 GCR manifest 验证。
- 本地、CI、远端 Compose 的单次 production build。
- Build receipt 和 deploy receipt。
- CI 运行真实 production image 的 Playwright smoke。
- 部署参数 `--node-mirror gcr` 和无副作用 dry-run 展示。
- 生产容器有界健康门禁和直接健康失败自动回滚。
- 文档、契约测试和发布证据更新。

### 不包含

- 自动 source fallback。
- 任意 Registry URL 或用户提供的任意 shell command。
- 修改 Dockerfile 的固定 digest。
- Registry credential、私有镜像仓库或镜像推送。
- 自动清理 rollback image。
- 删除或重启旧 MySQL、network、volume。
- 共享 nginx 修改。
- 未经单独授权的真实生产部署。

## 架构

### Canonical source

`app/Dockerfile` 第一条 `ARG NODE_IMAGE=<repository>:<tag>@sha256:<digest>` 是唯一事实源。CI、Compose、部署脚本和文档不得复制 Node 版本或 digest 常量。

### 统一构建器

新增 `app/scripts/verified-production-build.sh`，运行于 macOS Bash 和 Ubuntu Bash。它只执行以下职责：

1. 校验参数和必要工具。
2. 从 Dockerfile 严格提取 canonical ref。
3. 解析 repository、tag 和 digest。
4. 选择 canonical Docker Hub ref 或受控 GCR mirror ref。
5. 通过 Registry API 取得 observed digest。
6. 比较 expected/observed digest。
7. 执行一次 direct Docker 或 Compose build。
8. inspect 输出镜像身份。
9. 原子写入 build receipt。

构建器不执行 SSH、rsync、`docker compose up`、运行时 smoke、生产回滚或资源清理。

### 调用适配器

- 本地：`npm run docker:build:verified -- --source gcr`。
- CI：调用同一 npm 入口，scope 固定为 `ci`。
- 部署：`deploy.sh --node-mirror gcr --smoke` 在同步后调用远端构建器的 Compose mode。

Compose 不保存镜像版本或 digest。构建器通过受控 `--build-arg NODE_IMAGE=<effective-ref>` 注入本次已验证引用。

### Deploy orchestrator

`deploy/deploy.sh` 继续独占以下职责：

- 相关工作区边界检查。
- SSH 与 rsync。
- 旧容器/镜像身份盘点。
- rollback tag 创建。
- 调用远端构建器。
- app-only container replacement。
- 直接健康门禁、必要时回滚。
- 可选 production smoke。
- deploy receipt。

## CLI 契约

### 构建器

只允许枚举参数：

```text
verified-production-build.sh \
  --source dockerhub|gcr \
  --scope local|ci|deploy \
  --mode docker|compose \
  [--dry-run]
```

- 未知参数直接失败。
- `source` 默认 `dockerhub`。
- `scope` 决定 image tag、receipt 根目录和 source revision 获取方式。
- `mode=docker` 用于本地/CI；`mode=compose` 只允许 deploy scope。
- `--dry-run` 只解析并展示计划，不调用 Registry、Docker、SSH 或其他外部服务，也不生成成功 receipt。
- image tag、context、Compose project 和 service 均由 scope 固定，调用者不能注入任意值。

### 部署器

```text
deploy.sh [--smoke] [--dry-run] [--node-mirror gcr]
```

- 未提供 `--node-mirror` 时使用 Docker Hub canonical ref。
- 只接受 `gcr`，不接受任意 hostname。
- `--dry-run --node-mirror gcr` 显示 planned effective ref 和 digest，但不执行 manifest probe。
- 不支持 `--seed`、`--remove-orphans` 或资源清理参数。

### 代理

可选环境变量 `PROMPTFORGE_REGISTRY_PROXY` 只传给 Registry HTTP probe。它的值不输出、不进入 receipt；receipt 仅记录 `proxyConfigured` 布尔值。

Docker Engine 的代理仍由 Docker 自身环境管理，构建器不修改 Docker Desktop、ClashX、系统 DNS 或系统代理设置。

## 数据流

真实构建的数据流固定为：

```text
caller
  -> argument allowlist
  -> Dockerfile canonical ref
  -> controlled source mapping
  -> Registry manifest probe
  -> exact digest comparison
  -> one Docker build
  -> image inspect
  -> atomic receipt
```

允许的状态流：

```text
preflight -> manifest_verified -> build_started -> built
```

任意阶段可以进入 `failed`。不能从 `preflight` 跳过 manifest 验证进入 build；不能从 `failed` 自动切换 source。

## Registry 校验

### Docker Hub

构建器使用匿名 pull scope 请求短期 bearer token，再对 canonical repository/digest 发起 manifest HEAD。token 只保存在进程变量中，不打印、不写日志、不写 receipt。

### GCR mirror

构建器把 `node:<tag>@<digest>` 映射为 `mirror.gcr.io/library/node@<digest>`，对该引用执行 manifest HEAD。

### 判定

- HTTP 状态必须为 200。
- `Docker-Content-Digest` 必须存在。
- observed digest 必须与 Dockerfile expected digest 字符串完全相等。
- 失败时 build invocation count 必须为 0。

## Build receipt

Build receipt 使用 JSON，至少包含：

```text
schemaVersion
runId
scope
source
canonicalRef
effectiveRef
expectedDigest
observedDigest
proxyConfigured
buildMode
buildAttempt
sourceRevision
relevantWorktreeClean
imageTag
imageId
platform
startedAt
finishedAt
outcome
failedPhase
errorCode
```

规则：

- `buildAttempt` 只能为 0 或 1；执行 build 后必须为 1。
- `outcome` 只能为 `built` 或 `failed`。
- `failedPhase` 只使用状态名。
- `errorCode` 使用稳定枚举，不写未经处理的远端响应正文。
- 不记录 token、proxy URL、SSH key、env、完整 Docker config 或命令环境。
- 使用 `umask 077`、同目录临时文件和 atomic rename。

默认路径：

- local/CI：`tmp/outputs/docker-build-receipt-<runId>.json`。
- deploy：`/opt/promptforge/.deploy-receipts/docker-build-receipt-<runId>.json`。

远端 receipt 目录为 700，文件为 600。

## Source revision 与工作区边界

本地和 CI 从 Git 获取 `sourceRevision`。部署由本地 `deploy.sh` 在 rsync 前计算并传入远端，值必须为完整 Git SHA。

生产部署只检查会进入发布链路的路径：`app/`、`deploy/` 和 CI/构建入口文件。相关 tracked diff 或相关未跟踪文件存在时拒绝部署；`drafts/`、`tmp/` 和其他不会同步的用户工作不阻塞，也不得被暂存或传输。

`relevantWorktreeClean=false` 不能进入 deploy build。

## 生产替换与回滚

### 替换前

正式部署在 build 前记录当前 app container ID、image ID 和 health，并创建不可覆盖的 `promptforge_app:rollback-<runId>` tag。

manifest 或 build 失败时退出；当前运行容器不替换。远端 source 已同步不等于生产已更新。

### 替换

只有 build receipt 为 `built` 才允许：

```text
docker compose up -d --force-recreate app
```

禁止使用 `--remove-orphans`。只指定 `app` service。

### 直接健康门禁

替换后在最长 120 秒内有界轮询，必须同时满足：

- app container 为 running。
- Docker health 为 healthy。
- 容器内 `/api/trpc/ping` 返回 200 且包含 `ok`。

删除当前 `|| echo WARN` 行为。直接健康失败时，使用 rollback tag 恢复旧 image，执行 `compose up -d --force-recreate --no-build app` 并验证旧 app 健康。

无论自动回滚是否成功，原部署都返回非零。outcome 为 `rolled_back` 或 `rollback_failed`。

### Production smoke

直接健康通过后才允许运行完整 production Playwright smoke。Smoke 失败时部署返回非零并标记 `verification_failed`，但不自动回滚，因为失败可能来自浏览器代理、外部网络或共宿主，不能证明新 app 存在因果责任。

部署输出 rollback tag 和精确人工回滚命令，等待证据判断。

### Rollback 保留

Rollback tag 不自动清理。镜像清理属于独立、破坏性维护任务，必须另行盘点和授权。

## Deploy receipt

Deploy receipt 引用 build receipt，并至少包含：

```text
schemaVersion
runId
sourceRevision
buildReceiptPath
oldImageId
newImageId
oldContainerId
newContainerId
rollbackTag
directHealth
smokeReportPath
outcome
startedAt
finishedAt
```

允许的 outcome：

- `deployed`
- `rolled_back`
- `rollback_failed`
- `verification_failed`
- `failed_before_replacement`

Deploy receipt 与 build receipt 使用同样的权限、原子写入和 secret 排除规则。

## CI 设计

CI 保留 `npm run verify`，随后以显式 `source=gcr` 调用统一构建器，构建 `linux/amd64` production image。

现有以宿主 `npm run start` 启动服务的 smoke 改为：

1. 启动刚构建的 production image。
2. 映射随机 localhost 端口。
3. 有界等待容器内/外 ping。
4. 对该真实镜像运行现有 Playwright smoke。
5. 始终清理临时容器。
6. 始终上传 build receipt、smoke report、截图和失败日志。

CI 不读取 SSH key、不访问生产、不执行 rsync、deploy 或 provider call。

## 测试矩阵

### 契约测试

使用 Vitest 启动真实构建脚本，通过临时 `PATH` 注入 fake `curl`、`docker` 和 `git`：

- 未知参数、非法 source/scope/mode 被拒绝。
- Dockerfile 缺少、重复或含非法 digest 时失败。
- digest 一致时只调用一次 build。
- digest mismatch、manifest unreachable、tool missing 时 build 调用次数为 0。
- build/inspect 失败生成稳定 errorCode 和失败 receipt。
- receipt 为合法 JSON，权限受限，不包含 token、proxy URL 或响应正文。
- `proxyConfigured` 只记录布尔值。
- deploy scope 在相关工作区不干净时失败。
- direct health 失败触发一次无 build 的 rollback 路径。
- 任何 fake command 中都不存在 `--remove-orphans` 或 DB/network/volume 操作。

### 本地集成

- `bash -n`。
- `npm run verify`。
- GCR 同 digest 的单次真实 production build。
- image inspect、catalog 计数、ping、legacy 404、production dependency 边界。
- 使用构建镜像运行本地 Playwright smoke。
- 临时容器全部清理。
- `deploy.sh --dry-run --node-mirror gcr --smoke` 无外部副作用。

### CI

- exact-head workflow success。
- Build receipt 的 expected/observed digest 相等。
- Linux amd64 image build 成功。
- 容器 smoke 通过。
- Artifacts 可读取且不含 secret。

### 生产验收

生产验收只在单独授权后执行：

- 部署前只读 inventory 和 rollback readiness。
- app-only mirror build 与 container replacement。
- direct health、production smoke、独立 E8。
- 线上 catalog 计数、新内容 ID、legacy 404、env 600、nginx-to-app 和共宿主检查。
- 旧 MySQL 的 container ID、image、start time、network 保持不变。

## 错误码

稳定错误码至少包括：

- `INVALID_ARGUMENT`
- `TOOL_MISSING`
- `DOCKERFILE_CONTRACT_INVALID`
- `REGISTRY_AUTH_FAILED`
- `MANIFEST_UNREACHABLE`
- `MANIFEST_DIGEST_MISSING`
- `DIGEST_MISMATCH`
- `WORKTREE_NOT_CLEAN`
- `BUILD_FAILED`
- `IMAGE_INSPECT_FAILED`
- `DIRECT_HEALTH_FAILED`
- `ROLLBACK_FAILED`
- `SMOKE_FAILED`

错误码用于机器分支；人类日志保留可行动摘要，但不记录 secret-bearing body。

## 安全边界

- 不读取或打印 `.env`、PEM、Registry config、token 或 cookie。
- 不把代理地址写入 receipt。
- 不接受任意 URL、任意 image tag、任意 context 或任意 shell command。
- 不修改 Docker Desktop、ClashX、DNS 或系统代理。
- 不使用 `npm audit fix --force` 或更换固定 digest 规避网络问题。
- 不提交 `tmp/`、receipt、截图、env 或 PEM。
- CI 权限保持 `contents: read`。
- 生产变更必须 app-only，旧 DB 和共享服务保持隔离。

## 预期文件变更

- 新增 `app/scripts/verified-production-build.sh`。
- 新增构建器契约测试。
- 更新 `app/package.json`，提供稳定 npm 入口。
- 更新 `.github/workflows/ci.yml`，使用 production image smoke。
- 更新 `deploy/deploy.sh`，支持显式 mirror、fail-closed health、rollback 和 deploy receipt。
- 更新 `deploy/README.md` 与发布工作流文档。

不要求修改 Dockerfile digest、应用业务代码、catalog 数据、数据库或 nginx 配置。

## 完成标准

### 实现完成

- 所有契约测试和本地集成门禁通过。
- 同 digest production image 构建与本地容器 smoke 通过。
- Deploy dry-run、错误路径和回滚路径通过 fake integration tests。
- Diff 只包含已批准实现文件，用户草稿和无关工作保持未暂存。

### CI 完成

- exact-head CI 使用真实 production image 通过 verify 和 smoke。
- Build receipt、smoke report 和 artifact 上传可验证。

### 生产完成

只有在另行授权的真实部署完成且独立 E8 通过后，才能声明本地、CI、生产三层能力全部完成。

若没有生产授权或生产证据，只能声明“部署能力已实现并通过本地/CI 验证，生产未执行”。

## 实施边界

本设计批准后先创建实现计划，再实施本地和 CI 变更。Commit、push、真实部署分别遵循独立授权；设计批准不自动授权 push 或生产变更。

## 当前实施状态

截至 2026-08-21，本设计已由用户确认并完成本地实现与验收：统一构建器、契约测试、CI production-image smoke 编排、deploy fail-closed 健康与回滚编排均已落盘；本地同摘要 GCR build 和隔离 Playwright smoke 已通过。实现改动尚未 commit/push，exact-head CI 与真实生产部署尚未执行，不能据此声明生产能力已验证。
