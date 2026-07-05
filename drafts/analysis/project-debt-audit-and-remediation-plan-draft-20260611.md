---
title: 当前项目债务深度审计与治理计划
doc_type: analysis
module: promptforge
topic: project-debt-audit-remediation
status: draft
created: 2026-06-11
updated: 2026-06-19
owner: self
source: human+ai
---

# 当前项目债务深度审计与治理计划

## 阅读边界（2026-06-19 补充）

本文是债务审计与执行记录草稿，不是正式 `docs/` 规范。第 0-7 节保留 2026-06-11 的原始诊断基线；第 8 节记录后续执行进展。

截至 2026-06-19，本分支已完成多组原子提交，原始基线中的若干 P0/P1 债务已经被关闭或降级。引用当前状态时，以第 8.16 节和当前仓库命令结果为准，不应把第 0-7 节中的“当前”直接当作最新事实。

## 0. 结论

[事实] 截至 2026-06-11，本仓库 `main` 分支的真实状态不是未跟踪计划文件里描述的 static-first 已收敛状态，而是一个混合状态：

- 前端页面直接打包 `app/src/data/staticData.ts`，当前内容基线为 803 条：`prompt 193`、`skill 306`、`hook 72`、`mcp 72`、`agent 73`、`github 87`。
- tRPC API 仍挂载 `prompts`、`skills`、`workflows` 路由，并通过 `publicQuery` 暴露 `create/update/delete`。
- 部署链路仍包含 MySQL、`migrate`、`seed`，并用 `drizzle-kit push` 直接修改 schema。
- `.kiro/plan` 与未跟踪 `docs/architecture/project-architecture-analysis-20260604/` 记录了另一套“已修复/已收敛”状态，但这些修复没有落在当前 `main` 代码里。

[结论] 当前最大债务不是某一个文件写得不好，而是**项目事实源分裂**：代码、README、未跟踪架构文档、`.kiro` 计划、部署脚本、临时验证产物分别在描述不同版本的产品。治理优先级必须先恢复“唯一真实状态”，再谈功能扩展。

反面论证：保留 DB-backed 架构并非天然错误。如果近期明确要做管理员后台、在线内容编辑、审计发布和多用户协作，DB-backed 是合理方向。但当前代码没有认证、授权、限流、审计、迁移回滚和测试保护，因此现在把 DB 写链路暴露在公开 API 上是高风险路径。

## 1. 审计证据

### 1.1 已执行命令

| 命令 | 结果 | 解释 |
| --- | --- | --- |
| `git status --short --branch` | `main...origin/main`，存在多个未跟踪目录和 `ai_video.pem` | 当前没有已提交的治理收敛分支 |
| `npm run check` | 通过 | TypeScript 当前可编译 |
| `npm run lint` | 通过，但提示 `staticData.ts` 超过 500KB | lint 不覆盖架构风险 |
| `npm run build` | 通过，但主 JS 约 2.3MB，server bundle 约 2.2MB | 大数据和后端打包推高交付成本 |
| `npm run test -- --reporter=dot` | 失败：No test files found | 测试入口存在，回归网不存在 |
| `npm audit --omit=dev --audit-level=moderate` | 失败：2 high，1 moderate | 依赖安全基线不达标 |
| `docker compose -f deploy/docker-compose.yml config --services` | `mysql app migrate seed` | 生产 compose 仍是 DB-backed |
| Markdown 链接扫描 | `draco-content` 至少 16 个本地链接/图片缺失 | 文档承诺与资产不一致 |

说明：`docker compose config` 会展开 `.env.prod` 中的敏感环境变量。本报告只记录风险类型，不记录任何密钥值。

### 1.2 当前代码事实

- `app/src/main.tsx` 包裹 `TRPCProvider`，但页面数据主要从 `staticData.ts` 派生。
- `app/api/router.ts` 挂载 `promptsRouter`、`skillsRouter`、`workflowsRouter`。
- 三个业务 router 均包含公开 `create/update/delete` mutation。
- `app/db/migrations/` 只有 `.gitkeep`；根 `.gitignore` 忽略 `app/db/migrations/*.sql`，正式迁移即使生成也不会进入 Git。
- `deploy/deploy.sh` 使用根目录 `ai_video.pem`，硬编码远端 IP，并设置 `StrictHostKeyChecking=no`。
- `deploy/docker-compose.yml` 的 MySQL healthcheck 使用宿主插值，未设置本地 `MYSQL_PASSWORD` 时会解析为空密码参数。
- `draco-content/` 19 个子目录目前均无 `scripts/`、`requirements.txt`、`package.json` 或 `assets/` 文件，实际更像文档型 skill 资产集合。

## 2. 债务分类诊断

### 2.1 技术债务

| 优先级 | 债务 | 证据 | 影响 |
| --- | --- | --- | --- |
| P0 | 公开写 API 无认证 | `publicQuery` 暴露 `create/update/delete` | 生产数据可被任意调用方修改或删除 |
| P0 | 静态内容站和 DB 写平台混杂 | 前端用 `staticData.ts`，后端仍公开 DB routers | 产品边界不清，攻击面无必要扩大 |
| P1 | 内容数据多源重复 | `staticData.ts`、`prompts.ts`、`skills.ts`、`workflows.ts`、`public/data.json`、SQL/import 脚本并存 | 内容更新容易漂移，无法判断哪个是权威源 |
| P1 | 大 bundle | `staticData.ts` 约 3.4MB，构建主 JS 约 2.3MB | 首屏性能、缓存更新和审查成本高 |
| P1 | `dangerouslySetInnerHTML` 渲染内容 | `CardGrid.tsx` 对内容字符串替换后注入 HTML | 依赖手写转义，后续改动容易引入 XSS |
| P1 | DB schema 缺少查询索引和约束 | `role/search` 查询无索引，`LIKE %q%` | 数据量增长后查询退化，无唯一性保护 |
| P2 | 脚手架残留 | `Home.tsx`、`App.css`、`app/info.md` | 干扰入口判断和维护者认知 |

### 2.2 工程债务

| 优先级 | 债务 | 证据 | 影响 |
| --- | --- | --- | --- |
| P0 | 测试命令无测试文件 | `vitest` include `api/**/*.test.ts`，当前无匹配文件 | 任何修复无法被回归保护 |
| P0 | 迁移不可回滚 | 部署用 `drizzle-kit push`，迁移 SQL 被 ignore | schema 变更不可审计、不可回滚 |
| P1 | 一次性导入脚本未纳入类型检查 | `tsconfig` 不 include `app/scripts`，`seed-data.ts` 相对导入路径错误 | 数据链路靠人工记忆，容易生产失败 |
| P1 | Docker 生产镜像复制完整 deps node_modules | `Dockerfile` 从 `deps` 复制全部依赖 | 生产镜像包含 dev/tooling 依赖，攻击面和体积变大 |
| P1 | Compose 位置假设脆弱 | compose 在 `deploy/`，`build.context: ./app` 依赖被复制到远端根目录后才成立 | 本地和远端执行语义不同 |
| P1 | 缺少 CI/统一 verify | 当前没有 `.github/workflows`，`test` 失败 | 质量门禁不可重复 |
| P2 | 包管理器策略不统一 | 项目约束偏好 `pnpm`，实际 app 用 `npm/package-lock` | 依赖升级和团队协作口径不一致 |

### 2.3 项目管理债务

| 优先级 | 债务 | 证据 | 影响 |
| --- | --- | --- | --- |
| P0 | 计划状态与 Git 状态脱节 | `.kiro/plan` 记录多阶段已完成，但当前 `main` 无对应代码 | 后续协作者会误判“已修复” |
| P0 | 私钥位于项目根目录 | `ai_video.pem` 未跟踪但未被 `.gitignore` 覆盖 | 极易误提交，且违反根目录治理 |
| P1 | 当前产品形态没有唯一 source of truth | README、`.kiro`、未跟踪架构文档互相矛盾 | 决策、部署和验收都缺基线 |
| P1 | 缺少正式任务分解和验收标准 | 当前只有未跟踪 `.kiro` 计划和临时 smoke 产物 | 无法判断治理是否完成 |
| P2 | 根目录局部熵增 | `.codegraph/`、`.kiro/`、`.sisyphus/` 未跟踪 | 工具状态和项目资产边界混淆 |

### 2.4 文档管理债务

| 优先级 | 债务 | 证据 | 影响 |
| --- | --- | --- | --- |
| P1 | 正式文档缺元信息 | `docs/analysis/prompt_methodology_report.md` 无 frontmatter | 不符合项目文档治理规则 |
| P1 | 未跟踪架构文档标注 stable 但与当前代码矛盾 | 声称 `public/catalog/*.json`、公开 tRPC 只剩 `ping`、851 条内容 | 文档会反向误导治理 |
| P1 | `draco-content` README 承诺缺失资产 | 16 个本地链接/图片缺失 | 用户按文档操作会失败 |
| P1 | 工具定位过度承诺 | 多个 README 写“可独立运行”，但仓库只有文档/skill | 产品承诺与交付物不匹配 |
| P2 | 临时验证产物过多 | `tmp/` 约 150MB，含大量旧 smoke 截图和报告 | 新证据与旧证据混淆 |

### 2.5 脆弱点债务

| 优先级 | 脆弱点 | 证据 | 风险 |
| --- | --- | --- | --- |
| P0 | 密钥管理脆弱 | 根目录 `ai_video.pem`，`deploy/.env.prod` 本地存在 | 误提交、误展示、终端日志泄漏 |
| P0 | 公开写入面 | 未认证 mutation + 50MB body limit | 数据破坏、资源滥用 |
| P0 | 生产 DB 变更不可回滚 | `drizzle-kit push` | 线上 schema 被不可逆改变 |
| P1 | SSH 部署弱校验 | `StrictHostKeyChecking=no` | 降低中间人防护 |
| P1 | 依赖存在安全漏洞 | `npm audit` 报 high/moderate | 发布门禁不成立 |
| P1 | 没有线上 smoke/回滚证据 | 当前仓库无正式 smoke 脚本和 CI | 发布失败后只能人工排查 |

## 3. 根因

1. **产品形态未锁定**：知识库到底是 static-first read-only，还是 DB-backed 编辑平台，没有形成正式决策记录。
2. **生成式迭代缺少收敛门禁**：计划、架构图、修复记录可以生成，但没有强制回写 Git、测试和 README 的一致性检查。
3. **数据链路先跑通后未产品化**：导入脚本、SQL、静态 TS 数据、DB seed 都能局部完成任务，但没有沉淀为单一内容发布流水线。
4. **部署脚本承担过多隐式知识**：远端目录、私钥、compose 位置、MySQL、nginx 网络都写在脚本里，缺少可复用、可验证的部署模型。
5. **文档没有“事实有效期”机制**：stable 文档与当前代码冲突时，没有自动降级为 archived/draft。

## 4. 治理路径选择

### 推荐路径：static-first read-only 稳定化

适用前提：当前核心产品是公开 AI 知识库，用户主要浏览、搜索、复制、收藏，不需要在线多人编辑。

执行方向：

- 公共运行时只保留静态页面、静态 catalog、`ping`。
- 内容源收敛为一个权威源，构建时导出按分类拆分的 JSON。
- DB、Drizzle、导入脚本保留为离线工具或未来后台方案，不进入公开运行时。
- 移除公开写 API，降低攻击面。

理由：这是最短、最稳、维护成本最低的路径。当前产品价值在内容组织和浏览体验，不在通用 CRUD。

### 备选路径：DB-backed 内容平台

适用前提：近期明确要上线管理员内容新增、审核、发布、回滚和多用户协作。

必要前置：

- 独立 Admin API，认证、授权、CSRF、限流、审计日志齐全。
- 正式迁移目录进入 Git，禁止 `push` 替代 migration。
- seed 幂等，支持 dry-run 和回滚。
- 分页、搜索、索引、唯一约束、发布状态、版本表完备。
- 前端从 API 消费数据，并有加载/错误/空状态测试。

判断：当前仓库尚未满足这些前置，因此不建议直接沿 DB-backed 继续补丁式推进。

## 5. 分阶段治理计划

### Phase 0：风险止血

目标：当天内消除 P0 暴露面，不改变产品功能。

任务：

1. 将 `ai_video.pem` 移出项目目录，并在 `.gitignore` 增加 `*.pem`、`.kiro/`、`.sisyphus/`、`.codegraph/` 的明确规则。
2. 从公开 `appRouter` 移除或禁用 `create/update/delete` mutation。若保留 router 文件，必须不挂到公开 API。
3. 修复 MySQL healthcheck 插值，避免本地解析为空密码。
4. 明确 `deploy/.env.prod`、`deploy/secrets.env` 只允许本地存在，不进入任何输出或报告。
5. 新增最小安全回归测试：公开 API 不存在写 mutation。

验收：

- `rg "create:|update:|delete:" app/api` 不再命中公开路由。
- `git check-ignore ai_video.pem deploy/.env.prod deploy/secrets.env` 均命中。
- `npm run check` 通过。

### Phase 1：建立质量门禁

目标：让每次修改都有最小证据包。

任务：

1. 建立 `npm run verify`，至少串联 `check`、`lint`、`test`、`build`。
2. 补第一组 Vitest：API 路由边界、数据计数、搜索过滤、内容渲染安全。
3. 将 `npm audit --omit=dev` 或 `audit:prod` 纳入发布前检查。
4. 增加 docs 检查：正式区 Markdown frontmatter、本地链接存在性。
5. 增加 smoke 脚本：本地构建后访问 `/`、核心路由、静态数据或 API 健康检查。

验收：

- `npm run test` 不再因无测试文件失败。
- `npm run verify` 一条命令给出完整结果。
- 文档缺 frontmatter 和 broken link 能被机器发现。

### Phase 2：架构收敛

目标：选定单一生产架构，停止 static/DB 双轨漂移。

推荐任务：

1. 将 `staticData.ts` 拆成构建期 catalog JSON：`public/catalog/{prompt,skill,hook,mcp,agent,github}.json`。
2. 前端按分类懒加载 JSON，避免 3.4MB 数据进入首屏 bundle。
3. 移除 React 运行时未使用的 tRPC client/provider。
4. 公开 tRPC 只保留 `ping`；DB routers 转为未挂载离线工具或归档候选。
5. 生产 Docker 镜像只安装运行时依赖，DB 工具依赖不进入 app runtime。

验收：

- 首屏 JS gzip 明显下降。
- `GET /api/trpc/ping` 正常。
- `prompts.list` 等旧 DB route 在公开运行时不可访问。
- Docker app 可在无 `DATABASE_URL` 时启动静态站点。

### Phase 3：数据与内容治理

目标：让 803 条内容有单一来源、可重复生成、可审计更新。

任务：

1. 定义权威内容源：保留一个源文件或一组 catalog 源，不再让 `public/data.json`、`prompts.ts`、`skills.ts`、SQL 批次互相平行。
2. 建立内容导入协议：输入、去重 key、字段校验、评分、来源链接、生成时间。
3. 一次性导入脚本降级到 `archive/scripts/` 或重构为正式 `app/scripts/` 工具。
4. seed 必须幂等：重复运行不制造重复记录。
5. 内容计数由生成脚本派生，README 不手写多处数量。

验收：

- 任意内容更新只走一个入口。
- catalog、README 计数、测试基线一致。
- 旧 SQL 和导入脚本的状态被明确标注：active、archived 或 deprecated。

### Phase 4：部署与运维治理

目标：部署可重复、可回滚、不会泄露密钥。

任务：

1. 重写部署说明：本地构建、远端目录、nginx 网络、环境变量、回滚步骤。
2. 去掉脚本中的根目录私钥假设，改用 `SSH_KEY_PATH` 环境变量或用户本机 SSH config。
3. 禁止 `StrictHostKeyChecking=no` 作为默认值。
4. 若走 static-first，默认 compose 只包含 app；MySQL 作为历史资产单独归档计划处理。
5. 若保留 DB，必须引入正式 migrations、备份、回滚和迁移演练。

验收：

- 部署脚本不输出密钥。
- `docker compose config --services` 与当前产品形态一致。
- 每次部署后有 smoke 报告。

### Phase 5：文档与项目状态收敛

目标：让文档重新成为可信导航。

任务：

1. 为 `docs/analysis/prompt_methodology_report.md` 补 frontmatter。
2. 将未跟踪且与代码矛盾的 `docs/architecture/project-architecture-analysis-20260604/` 降级为 draft 或 archive，除非先把代码恢复到该文档描述的状态。
3. 清理 `.baiduyun.uploading.cfg`、旧 codegraph DB、旧 smoke 报告等临时产物；删除前按项目规则单独确认。
4. 修复 `draco-content` 缺失链接，或把 README 定位改成“文档型 skill collection”，不再承诺本目录可运行。
5. 建立 `docs/project-state-stable.md` 或在 README 中明确：当前生产形态、数据源、部署方式、未实现能力。

验收：

- 正式文档 frontmatter 全部合规。
- broken local link 为 0，或明确标注为外部/待补资产。
- README、部署文档、代码事实一致。

## 6. 优先级总表

| 顺序 | 项目 | 类型 | 优先级 |
| --- | --- | --- | --- |
| 1 | 移出并 ignore 根目录私钥 | 脆弱点/项目管理 | P0 |
| 2 | 移除公开写 mutation | 技术/安全 | P0 |
| 3 | 建立最小测试与 verify | 工程 | P0 |
| 4 | 停止 `drizzle push` 作为生产迁移 | 工程/运维 | P0 |
| 5 | 统一当前产品事实源 | 项目管理/文档 | P0 |
| 6 | 选择 static-first 或 DB-backed | 技术/产品 | P1 |
| 7 | 拆分大静态数据，降低 bundle | 技术/性能 | P1 |
| 8 | 修复文档 frontmatter 和 broken links | 文档管理 | P1 |
| 9 | 整理一次性脚本和 SQL 状态 | 工程/数据治理 | P1 |
| 10 | 清理临时产物和工具状态目录 | 目录治理 | P2 |

## 7. 下一步执行建议

立即执行 Phase 0 和 Phase 1，不等待完整重构。理由是 P0 项不改变产品体验，只降低暴露面；同时测试/verify 是后续所有治理的地基。

Phase 2 需要先做一个明确产品决策：当前 30 天内是否上线管理员内容编辑。如果答案是否，直接走 static-first read-only；如果答案是，则先写管理员发布系统 PRD 和 API 安全设计，再动 DB-backed 代码。

禁止事项：

- 不直接删除 `.kiro/`、`docs/architecture/`、`tmp/` 或旧 DB 相关文件，先确认是否要归档。
- 不在生产上继续执行 `db:push` 作为迁移方案。
- 不把未跟踪“已完成计划”当作当前代码事实。
- 不把 `draco-content` 对外宣传为已可运行工具集合，除非补齐脚本、依赖和资产。

## 8. 执行进展

### 8.1 Phase 0 已完成项

[事实] 截至 2026-06-14，已在分支 `codex/debt-phase0-risk-stopgap` 完成第一轮风险止血：

- 根目录 `ai_video.pem` 已移除；`.gitignore` 已覆盖 `*.pem`、`*.key`、`.kiro/`、`.sisyphus/`、`.codegraph/`。
- `app/api/prompts-router.ts`、`app/api/skills-router.ts`、`app/api/workflows-router.ts` 已移除公开 `create/update/delete` mutation。
- `deploy/docker-compose.yml` 的 MySQL healthcheck 已改为容器内变量插值：`$$MYSQL_PASSWORD`。
- `deploy/deploy.sh` 已改为通过 `SSH_KEY_PATH` 或 `$HOME/.ssh/promptforge_ai_video.pem` 获取私钥路径，不再引用项目根目录私钥。
- 已新增 `app/api/public-api-boundary.test.ts`，覆盖公开 API 写 mutation、密钥 ignore、MySQL healthcheck 三类边界。

已验证：

| 命令 | 结果 |
| --- | --- |
| `npm run verify` | 通过 |
| `git diff --check` | 通过 |
| `rg "\.mutation\(" app/api --glob '!**/*.test.ts'` | 无公开 mutation 命中 |
| `git check-ignore ai_video.pem .kiro .sisyphus .codegraph` | 均命中 |
| `docker compose -f deploy/docker-compose.yml config` | healthcheck 保留 `--password=$$MYSQL_PASSWORD` |

### 8.2 Phase 1 已完成项

[事实] 截至 2026-06-14，已建立最小质量门禁：

- `app/package.json` 新增 `verify`、`audit:prod`、`audit:full` 脚本。
- `verify` 串联 `check`、`lint`、`test`、`audit:prod`、`build`。
- `npm audit fix` 已修复生产依赖审计问题；`npm audit --omit=dev --audit-level=moderate` 当前为 `0 vulnerabilities`。
- root/Vite/tsx 使用的 `esbuild` 已提升到 `0.28.1`，避免 dev server 和二进制完整性 advisory 继续覆盖主构建链路。

已验证：

| 命令 | 结果 |
| --- | --- |
| `npm run verify` | 通过 |
| `npm audit --omit=dev --audit-level=moderate` | `found 0 vulnerabilities` |
| `npm ls esbuild vite tsx drizzle-kit @esbuild-kit/core-utils --depth=4` | 安装树干净，root/Vite/tsx 为 `esbuild@0.28.1` |
| `npx drizzle-kit --version` | `drizzle-kit: v0.31.10`，`drizzle-orm: v0.45.2` |

### 8.3 仍未关闭的债务

[事实] `npm audit --audit-level=moderate` 仍失败，剩余问题限定在 dev-only Drizzle 迁移工具链：

- `drizzle-kit@0.31.10 -> esbuild@0.25.12`
- `drizzle-kit@0.31.10 -> @esbuild-kit/esm-loader -> @esbuild-kit/core-utils@3.3.2 -> esbuild@0.18.20`

[结论] 该问题不进入当前生产依赖审计，但仍是工程债务。`drizzle-kit` 最新 stable 仍为 `0.31.10`，`1.0.0-rc.1` 仍依赖 `esbuild ^0.25.10`，不能通过常规升级关闭。下一步需要在 Phase 2/4 中选择：

1. static-first 路径：将 Drizzle/DB 工具链移出公开 app 运行时，并把迁移工具降级为离线或归档资产。
2. DB-backed 路径：独立处理迁移工具链替换、正式 migration、回滚演练和 CI 隔离。

另外，`npm run verify` 的 build 阶段仍提示：

- `app/src/data/staticData.ts` 超过 Babel 500KB 优化阈值。
- 主前端 JS 约 `2.3MB`，server bundle 约 `2.2MB`。

这些问题不属于 Phase 1 安全止血范围，归入 Phase 2 架构收敛。

### 8.4 Phase 2 低风险收敛已完成项

[事实] 截至 2026-06-14，已先完成不删除 DB 文件、不迁移目录的公开运行时收敛：

- `app/api/router.ts` 已只挂载 `ping`，不再公开挂载 `prompts`、`skills`、`workflows` 读路由。
- `app/src/main.tsx` 已移除未使用的 `TRPCProvider` 包裹，前端根入口不再加载 tRPC client。
- `app/api/public-api-boundary.test.ts` 已新增 static-first runtime 断言，防止业务 router 被重新挂回公开 API。

已验证：

| 命令 | 结果 |
| --- | --- |
| `npm run verify` | 通过，4 个 Vitest 断言通过 |
| `curl -I http://localhost:4177/` | `200 OK` |
| `curl http://localhost:4177/api/trpc/ping?batch=1&input=%7B%7D` | 返回 `{ ok: true }` |
| `curl http://localhost:4177/api/trpc/prompts.list?batch=1&input=%7B%7D` | 返回 `NOT_FOUND` |

构建变化：

- Vite 转换模块数从 `1857` 降到 `1726`。
- 主前端 JS 从约 `2,304.15 kB` 降到约 `2,207.57 kB`，gzip 从约 `461.00 kB` 降到约 `433.82 kB`。
- server bundle 从约 `2.2MB` 降到 `219.9KB`。

[结论] 公开运行时已经基本回到 static-first 边界，但首屏仍被 `staticData.ts` 大文件主导。Phase 2 下一步应拆分 catalog JSON 和懒加载分类数据，而不是继续在 tRPC/DB 路由上做补丁。

### 8.5 Phase 2 catalog 拆分已完成项

[事实] 截至 2026-06-14，已将运行时内容数据从 `app/src/data/staticData.ts` 拆分到正式静态 catalog 资产：

- 新增 `app/public/catalog/manifest.json`。
- 新增 `app/public/catalog/prompt.json`、`skill.json`、`hook.json`、`mcp.json`、`agent.json`、`github.json`。
- `app/src/data/dataUtils.ts` 已移除 `staticData` 静态 import，改为通过 `fetch('/catalog/...')` 按需读取。
- `app/src/data/catalogHooks.ts` 负责缓存 manifest 和分类 items。
- `Layout` 和 `HomePage` 只读取 manifest 计数。
- 六个分类页只在进入对应路由时加载当前分类 JSON。
- `UnifiedGallery` 也已移除 `staticData` import，避免未来重新启用时把大文件打回 bundle。

catalog 计数：

| 分类 | 条数 |
| --- | ---: |
| prompt | 193 |
| skill | 306 |
| hook | 72 |
| mcp | 72 |
| agent | 73 |
| github | 87 |

已验证：

| 命令/检查 | 结果 |
| --- | --- |
| `npm run verify` | 通过，5 个 Vitest 断言通过 |
| `rg "staticData|getItemsByCategory|getAllCounts" app/src app/api --glob '*.ts' --glob '*.tsx'` | 仅剩 `staticData.ts` 文件自身 |
| `curl -I http://localhost:4177/` | `200 OK` |
| `curl http://localhost:4177/catalog/manifest.json` | manifest 返回 6 类计数 |
| `curl http://localhost:4177/catalog/prompt.json` | 可解析，193 条 |
| Playwright 首页检查 | 显示总数 803 和各分类计数 |
| Playwright `/skills` 检查 | 可渲染已知卡片，无 console error，只请求 `manifest.json` 与 `skill.json` |

构建变化：

- 主前端 JS 从约 `2,207.57 kB` 降到约 `384.24 kB`。
- 主前端 JS gzip 从约 `433.82 kB` 降到约 `119.39 kB`。
- server bundle 保持约 `219.9KB`。
- 构建不再出现大 chunk warning；lint 阶段仍会提示 `staticData.ts` 超过 Babel 500KB，因为该源文件仍在 `app/src/data/` 被 ESLint/Babel 解析。

[结论] Phase 2 的运行时拆包目标已达成。剩余债务转入 Phase 3：确定 `staticData.ts` 是否继续作为源文件、生成脚本如何正式化、以及旧 `public/data.json`、`prompts.ts`、`skills.ts`、`workflows.ts` 的资产状态如何归档或废弃。

### 8.6 Phase 3 第一步：catalog 生成流程正式化

[事实] 截至 2026-06-14，已将 catalog 生成从一次性命令固化为正式脚本：

- 新增 `app/scripts/generate-catalog.mjs`。
- 新增 `npm run catalog:generate`。
- 新增 `npm run catalog:check`。
- `npm run verify` 已接入 `catalog:check`，防止 `staticData.ts` 与 `public/catalog/*.json` 漂移。

已验证：

| 步骤 | 结果 |
| --- | --- |
| 执行 | `npm run catalog:generate` 输出 6 类计数：193/306/72/72/73/87 |
| 测试 | `npm run catalog:check` 通过，catalog 与源文件一致 |
| 验收 | `npm run verify` 通过，`git diff --check` 通过，系统临时目录无 `promptforge-catalog-*` 残留 |

验收中发现并修复的问题：

- 初版生成器假设 `public/catalog/` 已存在。已补充 `mkdirSync(outputDir, { recursive: true })`，消除隐式目录前提。

[结论] catalog 生成流程已经具备可重复性和门禁保护。Phase 3 下一步再处理旧并行数据源的状态判定：`app/public/data.json`、`app/src/data/prompts.ts`、`skills.ts`、`workflows.ts` 应明确保留、废弃或归档，不能继续作为模糊平行源存在。

### 8.7 Phase 3 第二步：旧并行数据源状态判定

[事实] 截至 2026-06-14，已完成旧数据源引用核验，并将“运行时不得引用旧并行源”写入测试门禁：

- `app/api/public-api-boundary.test.ts` 已禁止 `app/src` 运行时代码 import `staticData`、`prompts`、`skills`、`workflows` 旧源。
- 同一测试已禁止运行时代码引用 `/data.json`。
- `npm run verify` 仍通过。

旧源判定：

| 文件 | 当前事实 | 判定 | 问题等级 | 下一步 |
| --- | --- | --- | --- | --- |
| `app/src/data/staticData.ts` | 3,437,162 bytes；catalog 生成器唯一源 | 暂时保留为生成源 | P1 | 后续决定是否迁移到更小的正式源格式 |
| `app/public/catalog/*.json` | 运行时正式读取；manifest 计数 193/306/72/72/73/87 | 当前正式运行时资产 | 无 | 保留并由 `catalog:check` 保护 |
| `app/public/data.json` | 1,342,996 bytes；公开可访问；仅 123 prompts、260 skills、5 workflows | 陈旧公开快照，不是权威源 | P1 | 下一步单独归档或移除，不能继续留在 `public/` |
| `app/src/data/prompts.ts` | 207,729 bytes；未被运行时引用 | 旧并行源/归档候选 | P2 | 下一步与 `skills.ts/workflows.ts` 一起归档或明确 deprecated |
| `app/src/data/skills.ts` | 59,817 bytes；未被运行时引用 | 旧并行源/归档候选 | P2 | 下一步与其他旧 TS 源一起处理 |
| `app/src/data/workflows.ts` | 19,205 bytes；未被运行时引用 | 旧并行源/归档候选 | P2 | 下一步与其他旧 TS 源一起处理 |

已验证：

| 步骤 | 结果 |
| --- | --- |
| 执行 | 测试门禁已新增旧源禁用规则 |
| 测试 | `npm run test` 通过，5 个断言通过 |
| 验收 | `npm run verify` 通过，`git diff --check` 通过 |

验收中发现的问题：

- `app/public/data.json` 虽不再被运行时代码引用，但仍位于 `public/`，会被静态服务公开暴露；且内容少于当前 catalog，属于陈旧资产。此问题本步未删除，因为删除/移动公开文件属于资产状态变更，需单独作为下一步执行并验收。

[结论] 运行时引用漂移已被门禁控制；旧数据源的主要剩余风险集中在 `app/public/data.json` 的公开陈旧快照。下一步优先处理该文件，再处理 `prompts.ts`、`skills.ts`、`workflows.ts` 的归档或 deprecated 标注。

### 8.8 Phase 3 第三步：陈旧公开快照归档

[事实] 截至 2026-06-14，已将陈旧公开快照移出 `public/`：

- `app/public/data.json` 已移动到 `archive/snapshots/public-data-legacy-archived-20260614.json`。
- `app/api/public-api-boundary.test.ts` 已新增断言：`app/public/data.json` 不得存在，归档副本必须存在且可解析。

执行前判定：

| 文件 | 事实 | 处理 |
| --- | --- | --- |
| `app/public/data.json` | 1,342,996 bytes；仅 123 prompts、260 skills、5 workflows；公开可访问 | 移出 public 并归档 |
| `archive/snapshots/public-data-legacy-archived-20260614.json` | 保留原始历史快照 | 作为归档材料保留 |

已验证：

| 步骤 | 结果 |
| --- | --- |
| 执行 | 文件已从 `app/public/data.json` 移至 `archive/snapshots/public-data-legacy-archived-20260614.json` |
| 测试 | `npm run test` 通过，6 个断言通过 |
| 测试 | `npm run catalog:check` 通过 |
| 测试 | `npm run verify` 通过 |
| 验收 | `app/dist/public` 不含 `data.json`，仍包含 `catalog/*.json` |
| 验收 | `GET /data.json` 返回 `404` |
| 验收 | `GET /catalog/manifest.json` 返回 `200` |
| 验收 | `GET /catalog/skill.json` 可解析为 306 条 |
| 验收 | `git diff --check` 通过 |

验收中发现的问题：

- `git diff --name-status` 对归档文件不显示重命名关系，因为目标文件当前是未跟踪文件；提交前需要确认将 `archive/snapshots/public-data-legacy-archived-20260614.json` 纳入同一原子提交，否则会表现为只删除公开快照。

[结论] `public/data.json` 的公开陈旧快照风险已关闭。Phase 3 下一步处理 `app/src/data/prompts.ts`、`skills.ts`、`workflows.ts`：优先移动到 `archive/snapshots/` 或增加明确 deprecated 状态，避免继续作为并行源误导维护者。

### 8.9 Phase 3 第四步：旧 TS 并行源归档

[事实] 截至 2026-06-14，已将三份旧 TS 并行源移出运行时源码目录：

- `app/src/data/prompts.ts` -> `archive/snapshots/data-prompts-legacy-archived-20260614.ts`
- `app/src/data/skills.ts` -> `archive/snapshots/data-skills-legacy-archived-20260614.ts`
- `app/src/data/workflows.ts` -> `archive/snapshots/data-workflows-legacy-archived-20260614.ts`

执行前判定：

| 文件 | 事实 | 处理 |
| --- | --- | --- |
| `app/src/data/prompts.ts` | 207,729 bytes；未被运行时引用 | 归档 |
| `app/src/data/skills.ts` | 59,817 bytes；未被运行时引用 | 归档 |
| `app/src/data/workflows.ts` | 19,205 bytes；未被运行时引用 | 归档 |

测试中发现的问题：

- `app/db/seed.ts` 仍引用 `../src/data/prompts`、`skills`、`workflows`，导致 `npm run check` 失败。
- `app/scripts/seed-data.ts` 也引用旧 TS 数据源，且该脚本相对路径本身从 `scripts/` 目录视角不可靠。

修复：

- `app/db/seed.ts` 已改为 deprecated guard，明确提示使用 `db/seed-full.ts`。
- `app/scripts/seed-data.ts` 已改为 deprecated guard，明确提示使用 `db/seed-full.ts`。
- `app/api/public-api-boundary.test.ts` 已新增断言，防止上述旧入口再次引用归档数据源。

已验证：

| 步骤 | 结果 |
| --- | --- |
| 执行 | 三份旧 TS 数据源已移至 `archive/snapshots/` |
| 测试 | `npm run check` 通过 |
| 测试 | `npm run test` 通过，7 个断言通过 |
| 测试 | `npm run verify` 通过 |
| 验收 | `app/src/data/` 中不再有 `prompts.ts`、`skills.ts`、`workflows.ts` |
| 验收 | 归档副本均存在 |
| 验收 | `app/db/seed.ts` 和 `app/scripts/seed-data.ts` 均标注 deprecated，且不再引用旧数据源 |
| 验收 | `git diff --check` 通过 |

[结论] 旧 TS 并行源造成的运行时和 seed 链路漂移已经关闭。当前仍保留的内容源为 `app/src/data/staticData.ts`，它是 catalog 生成器唯一输入；下一步应处理该文件体积和 lint 阶段 Babel 500KB 提示，或者正式确认它在短期内作为唯一源保留。

### 8.10 Phase 3 第五步：权威 catalog 源迁移为 JSON

[事实] 截至 2026-06-14，已将权威 catalog 源从巨型 TS 文件迁移为纯数据 JSON：

- 新增 `app/src/data/catalogSource.json`，作为 catalog 生成器和 full seed 的数据源。
- `app/src/data/staticData.ts` 已移动到 `archive/snapshots/catalog-static-data-ts-legacy-archived-20260614.ts`。
- `app/scripts/generate-catalog.mjs` 已改为直接读取 JSON，不再通过 `esbuild` 临时 bundle TS。
- `app/db/seed-full.ts` 已改为通过 `readFileSync + JSON.parse` 读取 JSON。
- `app/api/public-api-boundary.test.ts` 已新增门禁：旧 `staticData.ts` 不得回到运行时源码目录，生成器和 seed 不得再引用旧 TS 源。

执行前判定：

| 文件 | 事实 | 处理 |
| --- | --- | --- |
| `app/src/data/staticData.ts` | 3.3MB TS 文件；lint 阶段触发 Babel 500KB 提示；仅作为生成源存在 | 迁移为 JSON 源并归档旧 TS |
| `app/src/data/catalogSource.json` | 新权威数据源；非运行时直接 import | 正式保留 |
| `app/scripts/generate-catalog.mjs` | 依赖 `esbuild` 临时 bundle TS | 改为直接读 JSON |
| `app/db/seed-full.ts` | import `staticData.ts` | 改为直接读 JSON |

已验证：

| 步骤 | 结果 |
| --- | --- |
| 执行 | `catalogSource.json` 生成成功；源计数为 `prompts_full=193`、`skills_full=630` |
| 执行 | `staticData.ts` 已归档到 `archive/snapshots/catalog-static-data-ts-legacy-archived-20260614.ts` |
| 测试 | `npm run catalog:generate` 通过，输出 6 类 catalog 计数：193/306/72/72/73/87 |
| 测试 | `npm run catalog:check` 通过 |
| 测试 | `npm run check` 通过 |
| 测试 | `npm run test` 通过，7 个断言通过 |
| 测试 | `npm run verify` 通过，且不再出现 Babel 500KB 大文件提示 |
| 验收 | `npm audit --omit=dev --audit-level=moderate` 返回 `found 0 vulnerabilities` |
| 验收 | 构建产物保持稳定：主 JS 约 `384.24 kB`，gzip 约 `119.39 kB`；server bundle 约 `219.9KB` |
| 验收 | `git diff --check` 通过 |
| 验收 | 系统临时目录无 `promptforge-source-*` 或 `promptforge-catalog-*` 残留 |
| 验收 | 旧 `staticData.ts` 只在测试归档断言中出现，不再被运行时代码、生成脚本或 seed 引用 |

验收中发现的问题：

- `npm run verify` 仍提示 Browserslist/caniuse-lite 数据约 6 个月未更新。这是独立维护项，不阻塞本步，但应进入后续工程维护债清单。
- `catalogSource.json` 仍是约 3.3MB 的单体数据源。本步关闭的是“巨型 TS 被工具链解析”的工程债，不等于完成数据源拆分、schema 校验或来源治理。

[结论] 巨型 TS 源导致的 lint/Babel 脆弱点已关闭；当前 catalog 权威源为 `app/src/data/catalogSource.json`，公开运行时资产仍由 `app/public/catalog/*.json` 承载并由 `catalog:check` 防漂移。下一步应处理 JSON 源 schema 校验、数据来源边界和 Browserslist 维护提示。

### 8.11 Phase 3 第六步：catalog 源结构校验门禁

[事实] 截至 2026-06-14，已将 `catalogSource.json` 的结构校验接入 catalog 生成链路：

- `app/scripts/generate-catalog.mjs` 在生成或检查前会先验证源数据。
- 校验覆盖顶层结构、`prompts_full`/`skills_full` 数组存在性、非空、字段类型、非空字符串、非空标签数组、非负整数、集合内 ID 唯一性和分类合法性。
- `prompts_full` 必须为 `category: "prompt"`。
- `skills_full` 允许当前真实存在的 `skill/hook/mcp/agent/github/prompt` 分类，其中公开 catalog 仍只发布 `skill/hook/mcp/agent/github` 五类。
- 生成脚本支持 `CATALOG_SOURCE_PATH`，仅用于测试或临时校验替代源，不改变默认正式源。
- `app/api/public-api-boundary.test.ts` 新增正向和负向测试：真实源必须通过 `catalog:check`，畸形临时 JSON 必须被拒绝且不能进入发布检查。

执行前判定：

| 问题 | 事实 | 处理 |
| --- | --- | --- |
| JSON 可解析但结构可能错误 | 迁移为 JSON 后，缺字段、错类型、重复 ID 仍可能生成公开资产 | 在生成器入口加结构校验 |
| `skills_full` 含 20 条 `category: "prompt"` | 这是当前数据事实，不能误判为错误 | 将源允许分类与公开发布分类分层 |
| 测试需要验证失败路径 | 不能污染仓库正式源 | 使用系统临时目录和 `CATALOG_SOURCE_PATH` 注入坏源 |

已验证：

| 步骤 | 结果 |
| --- | --- |
| 执行 | `generate-catalog.mjs` 已新增 `validateCatalogSource` 和字段级校验 |
| 执行 | 测试新增畸形临时 JSON，期望错误包含 `Invalid catalog source` 和 `prompts_full[0].likes` |
| 测试 | `npm run catalog:check` 通过 |
| 测试 | `npm run test` 通过，9 个断言通过 |
| 测试 | `npm run verify` 通过 |
| 验收 | `npm audit --omit=dev --audit-level=moderate` 返回 `found 0 vulnerabilities` |
| 验收 | `git diff --check` 通过 |
| 验收 | 系统临时目录无 `promptforge-invalid-catalog-*`、`promptforge-source-*` 或 `promptforge-catalog-*` 残留 |

验收中发现的问题：

- 本步采用生成器内手写结构校验，没有引入外部 JSON Schema 依赖。理由是当前字段契约简单，新增依赖会增加维护面；后续若需要给非代码协作者或外部导入链路复用，应升级为独立 schema 文件。
- `app/api/public-api-boundary.test.ts` 已承载多类治理门禁，开始出现测试职责过宽的问题。短期可接受；后续应拆出 `catalog-source.test.ts` 或 `scripts/generate-catalog.test.ts`，降低测试文件认知负担。
- `npm run verify` 仍提示 Browserslist/caniuse-lite 数据约 6 个月未更新，该维护债未在本步处理。

[结论] catalog 源的结构漂移风险已被生成链路门禁拦截；坏 JSON 不会继续生成公开 catalog。剩余数据治理债务是：独立 schema 文件、测试分层、数据来源说明和单体 JSON 拆分。

### 8.12 Phase 3 第七步：治理测试职责分层

[事实] 截至 2026-06-14，已将 catalog 源校验测试从公共边界测试文件中拆出，形成独立测试单元：

- 新增 [catalog-source.test.ts](../../app/api/catalog-source.test.ts)，专责 `generate-catalog` 的正向/负向校验。
- `public-api-boundary.test.ts` 删除了 catalog 源校验测试，保持仅关注公开 API 边界规则。

已验证（行为性）：

- 分拆完成，`catalog 源校验断言` 仍可在 `app/api` 测试集中独立执行。

结论：
- 测试职责边界更清晰，后续新增 catalog-schema 变更时不会在公共边界测试中引入额外变更噪音。

### 8.13 Phase 3 第八步：catalog 规则外置到独立合同文件

[事实] 截至 2026-06-14，已将 catalog 生成器约束外置为 `app/scripts/catalog-source-contract.json` 驱动：

- `app/scripts/generate-catalog.mjs` 不再内置类别、字段和集合名，改为仅消费 `catalog-source-contract.json`。
- 支持可配置路径：`CATALOG_SOURCE_CONTRACT_PATH`（合同文件）与 `CATALOG_OUTPUT_DIR`（输出目录）。
- `app/api/catalog-source.test.ts` 新增一条正向场景：使用临时合约只生成 `prompt` 公共分类，验证输出文件、manifest 与标准输出。
- `catalog:check` 与 `npm run verify` 继续保持红线：catalog 结构校验、静态 API 边界、审计、构建均通过。

已验证：

- `npm run test api/catalog-source.test.ts`：4/4 通过。
- `npm run catalog:check`：通过。
- `npm run verify`：通过（10 个测试、`npm audit --omit=dev --audit-level=moderate` 为 `0 vulnerabilities`、构建成功）。

下一步计划：

- 引入独立 schema 文件（如 AJV/valibot）替代脚本内手写规则，以便给非代码协作者维护。
- 在合约中增加 `catalog contract schemaVersion` 与最小兼容策略，支持字段新增/弃用时的版本迁移与回退。

### 8.14 Phase 3 第九步：catalog 合同 JSON Schema 落地

[事实] 截至 2026-06-14，已完成 contract schema 化，catalog 约束现在由独立 JSON Schema 驱动：

- 新增 `app/scripts/catalog-source-contract.schema.json`，定义 contract 的元结构与关键字段约束（集合、校验字段、分类列表、生成来源等）。
- `app/scripts/generate-catalog.mjs` 改为先校验 contract 结构，再执行 catalog source 校验与产物生成。
- 引入新环境变量 `CATALOG_SOURCE_CONTRACT_SCHEMA_PATH`，支持 schema 的定制化路径注入；测试场景可隔离临时 schema 路径。
- 新增 `catalog-source.test.ts` 用例：校验不合法 contract 会直接失败，避免把坏合同注入生成链路。
- `verify` 中未增加新步骤，`catalog:check` 已在现有门禁下持续覆盖 schema 与源一致性校验。
- 补充 `docs/workflows/catalog-contract-schema-migration-workflow-stable.md`，定义 `schemaVersion` 主版本迁移开关与验收边界，明确 override 仅为受控过渡参数。

已验证：

- `npm run test api/catalog-source.test.ts`：7/7 通过。
- `npm run verify`：通过（14 个测试、`npm audit --omit=dev --audit-level=moderate` 为 `0 vulnerabilities`、构建成功）。
- `npm run catalog:check`：通过，验证 output 未出现 stale 状态。
- 增补 `catalog-source.test.ts` 覆盖 `schemaVersion` 主版本兼容性：当合约为 `2.x` 时，生成脚本默认拒绝执行；支持通过 `CATALOG_SOURCE_CONTRACT_SUPPORTED_MAJOR` 在迁移阶段显式放行兼容主版本。

### 8.15 Phase 3 第十步：提交前分组审计与 TODO

[事实] 截至 2026-06-18，当前分支为 `codex/debt-phase0-risk-stopgap`，工作区仍处于多组变更并存状态。`npm run verify` 已通过，但通过不等于可直接整体提交；当前 diff 同时包含运行时代码、catalog 生成链路、公开资产、归档快照、部署脚本、CI、文档和草稿更新。

已执行盘点：

| 检查项 | 结果 |
| --- | --- |
| 当前分支 | `codex/debt-phase0-risk-stopgap` |
| 已跟踪文件变更 | 30 个文件，约 `611 insertions / 47483 deletions` |
| 未跟踪文件 | `.github/`、`app/public/catalog/`、`app/scripts/generate-catalog.mjs`、`app/src/data/catalogSource.json`、`archive/`、`docs/architecture/`、`docs/workflows/`、`drafts/` 等 |
| 最大变更 | 删除 `app/src/data/staticData.ts` 约 42879 行，迁移为 `app/src/data/catalogSource.json` 和 `app/public/catalog/*.json` |
| 当前门禁 | `npm run verify` 通过；`docs:check` 扫描 41 个 Markdown 文件通过；`git diff --check` 通过 |

#### 完整 TODO（2026-06-18 提交前计划快照）

本表是提交拆分前的执行计划快照。2026-06-19 的实际完成状态见第 8.16 节。

| 序号 | TODO | 状态 | 验收命令 | 提交边界 |
| --- | --- | --- | --- | --- |
| 1 | 建立提交前分组清单，明确每组文件、风险和验收命令 | 已执行 | `git status --short`、`git diff --stat`、`git diff --name-status` | 只更新本草稿文档 |
| 2 | G0 风险止血组：密钥忽略、部署私钥路径、Compose healthcheck 插值修复 | 待独立复核 | `git diff -- .gitignore deploy/deploy.sh deploy/docker-compose.yml`、`docker compose -f deploy/docker-compose.yml config --services` | 不与 catalog/schema 混提 |
| 3 | G1 公开 API 风险收口组：公开 `appRouter` 只保留 `ping`，移除公开写 mutation 挂载 | 待独立复核 | `npm run test api/public-api-boundary.test.ts`、`npm run verify` | 可与 G2 合并为“static-first 边界”提交，但不与部署混提 |
| 4 | G2 runtime catalog 迁移组：前端从静态 TS import 改为 fetch `public/catalog/*.json` | 待独立复核 | `npm run catalog:check`、`npm run test`、`npm run build` | 必须包含 `app/src/data/dataUtils.ts`、`catalogHooks.ts`、页面加载态和 catalog 产物 |
| 5 | G3 catalog 源与合同 schema 组：`catalogSource.json`、`generate-catalog.mjs`、contract/schema、AJV、测试 | 待独立复核 | `npm run test api/catalog-source.test.ts`、`npm run catalog:check`、`npm run verify` | 必须包含 `app/package.json` 与 `package-lock.json` 中 AJV/esbuild 变更 |
| 6 | G4 旧源归档组：删除旧 TS 并纳入 `archive/snapshots/*` | 待独立复核 | `test ! -e app/src/data/staticData.ts`、`test -e archive/snapshots/catalog-static-data-ts-legacy-archived-20260614.ts`、`npm run verify` | 必须和删除的旧源同提交，否则历史来源丢失 |
| 7 | G5 文档与恢复入口组：`docs/workflows`、`docs/architecture`、README 工作流入口 | 待独立复核 | `npm run docs:check`、`git diff --check` | 图谱资产较大，建议与代码提交分离 |
| 8 | G6 CI/docs 门禁组：`.github/workflows/verify-and-test.yml`、`check-markdown-links.mjs`、`docs:check` | 待独立复核 | `ruby -e 'require "yaml"; YAML.load_file(".github/workflows/verify-and-test.yml")'`、`npm run docs:check`、`npm run verify` | 可单独提交，便于审查 |
| 9 | G7 文档断链修复组：移除不存在的 `templates/cron-prompt.zh.md` 链接 | 已验收但未提交 | `npm run docs:check` | 可并入 G6 |
| 10 | G8 草稿计划组：本文件持续记录债务处理状态和提交前分组 | 进行中 | `npm run docs:check` | 不进入正式 `docs/`，直到计划定稿 |

#### 分组诊断

| 分组 | 文件范围 | 风险等级 | 诊断 |
| --- | --- | --- | --- |
| G0 风险止血 | `.gitignore`、`deploy/deploy.sh`、`deploy/docker-compose.yml` | 高 | 直接影响部署安全和远端执行方式。必须独立验收，不应借 catalog 迁移一起提交。 |
| G1 API 边界 | `app/api/router.ts`、`prompts-router.ts`、`skills-router.ts`、`workflows-router.ts` | 高 | 移除公开写入口是 P0 风险收口，但会改变 API surface。必须以 public boundary 测试兜底。 |
| G2 runtime catalog | `app/src/data/dataUtils.ts`、`catalogHooks.ts`、`CatalogLoadState.tsx`、各分类页面、`UnifiedGallery.tsx`、`app/public/catalog/*.json` | 中高 | 运行时从 bundle 内数据转为静态 JSON fetch，改变加载时序；需要 build、测试和页面 smoke。 |
| G3 catalog 生成与合同 | `generate-catalog.mjs`、`catalog-source-contract*.json`、`catalog-source.test.ts`、`package*.json` | 中 | 是 catalog 治理主线，当前已有 7 个针对性测试，但依赖 package-lock 变更必须一起审查。 |
| G4 旧源归档 | 删除 `data.json/staticData/prompts/skills/workflows`，新增 `archive/snapshots/*` | 中 | 删除量巨大，必须确认归档文件同提交，否则不可追溯。 |
| G5 文档资产 | `docs/architecture/**`、`docs/workflows/**`、`README.md` | 中 | 属于正式文档资产，包含图谱文件；建议独立提交以降低代码审查噪音。 |
| G6 CI/docs gate | `.github/workflows/verify-and-test.yml`、`check-markdown-links.mjs`、`package.json` 的 `docs:check` | 中 | CI 触发策略已收紧到 `main` 和 PR to `main`，但这是新增仓库门禁，应单独验收。 |
| G8 草稿 | `drafts/analysis/project-debt-audit-and-remediation-plan-draft-20260611.md` | 低 | 记录执行状态，不应替代正式架构/工作流文档。 |

#### 禁止混合提交

- 禁止把 `deploy/*` 与 catalog runtime 迁移合并提交。原因：部署语义和运行时数据加载是两个独立风险面。
- 禁止只提交旧源删除而不提交 `archive/snapshots/*`。原因：历史内容源会丢失审计依据。
- 禁止只提交 `app/package.json` 而漏掉 `app/package-lock.json`。原因：CI `npm ci` 会以 lockfile 为准。
- 禁止只提交 `docs:check` 脚本而不提交 workflow 或 `package.json` 入口。原因：门禁入口不完整。
- 禁止将 `drafts/analysis/*` 直接挪入正式 `docs/`。原因：当前仍是分组审计草稿，不是稳定治理规范。

#### 推荐执行顺序

1. 先提交 G0：风险止血。范围小，但安全价值最高。
2. 再提交 G1+G2+G3+G4：static-first catalog 主链路。若 PR 过大，可拆成 `API 边界`、`catalog runtime`、`catalog contract/schema`、`legacy archive` 四个提交。
3. 再提交 G6+G7：docs link check 与 CI 门禁。
4. 再提交 G5：正式架构/工作流文档和图谱资产。
5. 最后提交 G8：草稿计划同步，或保留为本地执行记录不进入 PR。

#### 第一组验收标准

本阶段先不提交，只完成提交前验收：

| 验收项 | 命令 | 通过条件 |
| --- | --- | --- |
| 代码门禁 | `npm run verify` | 通过 |
| 文档链接 | `npm run docs:check` | 通过 |
| catalog 合同 | `npm run test api/catalog-source.test.ts && npm run catalog:check` | 通过 |
| CI YAML | `ruby -e 'require "yaml"; YAML.load_file(".github/workflows/verify-and-test.yml")'` | 通过 |
| diff 格式 | `git diff --check` | 通过 |

[结论] 当前可以进入“原子提交拆分”阶段，但不应整体 `git add .`。下一步执行应优先围绕 G0 做独立复核，之后再处理 catalog 主链路。

#### 第一轮执行结果

[事实] 2026-06-18 已完成提交前第一轮只读验收：

| 验收项 | 结果 |
| --- | --- |
| `npm run docs:check` | 通过，扫描 41 个 Markdown 文件 |
| `npm run test api/catalog-source.test.ts && npm run catalog:check` | 通过，7 个 catalog-source 测试全部通过，catalog check 通过 |
| CI YAML 解析 | 通过，`.github/workflows/verify-and-test.yml` 可被 Ruby YAML loader 解析 |
| `git diff --check` | 通过 |
| `npm run verify` | 通过，`check/lint/catalog:check/docs:check/test/audit:prod/build` 全部通过 |
| `docker compose -f deploy/docker-compose.yml config --services` | 通过，服务列表为 `mysql/app/migrate/seed` |
| `bash -n deploy/deploy.sh` | 通过 |

验收边界：

- 本轮没有执行 `git add`、`git commit`、部署、远端连接或生产 smoke。
- `docker compose config --services` 只验证 Compose 可解析和服务声明，不证明远端部署成功。
- `npm run verify` 通过证明当前本地门禁可过，不等于所有变更已经完成提交拆分。

[结论] 第一轮验收满足进入 G0 原子提交复核条件。下一步应先审查并准备 G0 文件集合：`.gitignore`、`deploy/deploy.sh`、`deploy/docker-compose.yml`。

#### G0 原子提交复核结果

[事实] 2026-06-18 已完成 G0 文件集合专项复核，范围限定为 `.gitignore`、`deploy/deploy.sh`、`deploy/docker-compose.yml`。

| 文件 | 变更 | 复核结论 |
| --- | --- | --- |
| `.gitignore` | 新增 `*.pem`、`*.key`、`.kiro/`、`.sisyphus/`、`.codegraph/` 忽略规则 | `git check-ignore -v ai_video.pem deploy/test.pem deploy/test.key` 显示规则生效 |
| `deploy/deploy.sh` | 将默认 SSH key 从项目根目录 `ai_video.pem` 改为 `${SSH_KEY_PATH:-$HOME/.ssh/promptforge_ai_video.pem}` | `bash -n deploy/deploy.sh` 通过；该变更降低根目录私钥依赖，但不验证远端 SSH 可连通 |
| `deploy/docker-compose.yml` | MySQL healthcheck password 从宿主 `${MYSQL_PASSWORD}` 展开改为容器内 `$$MYSQL_PASSWORD` | `docker compose -f deploy/docker-compose.yml config --services` 通过；`docker compose config` 中 healthcheck 保留 `--password=$$MYSQL_PASSWORD` |

G0 复核命令：

| 命令 | 结果 |
| --- | --- |
| `git diff -- .gitignore deploy/deploy.sh deploy/docker-compose.yml` | 仅包含 G0 三文件变更 |
| `bash -n deploy/deploy.sh` | 通过 |
| `docker compose -f deploy/docker-compose.yml config --services` | 通过，服务为 `mysql/app/migrate/seed` |
| `git check-ignore -v ai_video.pem deploy/test.pem deploy/test.key` | 通过，均被 `.gitignore` 捕获 |
| `docker compose -f deploy/docker-compose.yml config \| rg -n "healthcheck\|mysqladmin\|password"` | 通过，确认 healthcheck 命令保留容器内变量 |

边界判断：

- G0 可作为独立原子提交，不依赖 catalog/runtime/schema 文档变更。
- G0 不应包含 `app/package.json`、`.github/`、`docs/`、`archive/` 或 catalog 产物。
- G0 仍不是部署完成证明；提交后如要上线，需要单独执行远端 SSH 连通、deploy dry-run 或生产 smoke。

[结论] G0 已达到可独立 stage/commit 条件。建议提交信息：`chore: 收紧部署密钥与 compose 健康检查边界`。

### 8.16 原子提交拆分执行完成

[事实] 截至 2026-06-19，前述 G0-G7/G5a/G5b 已按原子边界完成提交。本节只记录本地仓库事实；未执行部署、远端连接或生产 read-only smoke。

| 分组 | 提交 | 状态 | 验收边界 |
| --- | --- | --- | --- |
| G0 风险止血 | `6d835e4 收紧部署密钥与 Compose 健康检查边界` | 已提交 | `.gitignore`、`deploy/deploy.sh`、`deploy/docker-compose.yml` 独立收口 |
| G1 公开 API 风险收口 | `0c546d5 收口公开 API 写入边界` | 已提交 | 公开 `appRouter` 写入口移除，增加 public write boundary 测试 |
| G2 runtime catalog | `2090956 迁移前端运行时 catalog 加载` | 已提交 | 前端运行时改为读取 `app/public/catalog/*.json` |
| G3 catalog 源与合同 schema | `0c91771 建立 catalog 源合同与生成校验` | 已提交 | `catalogSource.json`、生成器、合同、JSON Schema、AJV 与测试同组提交 |
| G4 旧源归档 | `f21fde8 归档旧内容源并关闭并行 seed 入口` | 已提交 | 旧公开快照和旧 TS 源移入 `archive/snapshots/` |
| G6/G7 CI 与文档断链门禁 | `4588913 接入文档链接门禁与 CI 验证` | 已提交 | `docs:check` 接入 `verify` 与 GitHub workflow，并修复已知断链 |
| G5a workflow 文档入口 | `221cb67 补充 catalog 合同迁移工作流文档入口` | 已提交 | `README.md` 与 `docs/workflows/` 收口，不纳入陈旧 architecture 图谱 |
| G5b architecture 历史边界 | `9180989 标注架构图谱历史快照边界` | 已提交 | `docs/architecture/project-architecture-analysis-20260604/` 降级为历史快照 |
| G8 草稿执行记录 | 本节当前变更 | 待提交 | 保持在 `drafts/analysis/`，不升级为正式 `docs/` |

当前 repo-local 事实：

| 检查项 | 当前结果 |
| --- | --- |
| 当前分支 | `codex/debt-phase0-risk-stopgap` |
| catalog manifest | 总量 803：`prompt 193`、`skill 306`、`hook 72`、`mcp 72`、`agent 73`、`github 87` |
| 当前权威内容源 | `app/src/data/catalogSource.json` |
| 当前公开 catalog | `app/public/catalog/*.json` |
| 当前生成门禁 | `npm run catalog:generate` / `npm run catalog:check` |
| 当前总门禁 | `npm run verify` |
| 本节编辑前未提交项 | 仅 `drafts/` |

2026-06-19 新鲜验收：

| 命令 | 结果 | 证据等级 |
| --- | --- | --- |
| `npm run verify` | 通过：`check`、`lint`、`catalog:check`、`docs:check`、18 个 Vitest、`audit:prod`、`build` 全部通过 | repo-local L1 |
| `npm run audit:full` | 失败：dev 依赖链仍含 `@babel/core`、`js-yaml`、`drizzle-kit -> @esbuild-kit/... -> esbuild` advisory | repo-local L1 |
| `app/public/catalog/manifest.json` | 与当前 803 条分类计数一致 | repo-local L1 |

当前剩余债务：

| 债务 | 当前判断 | 下一步 |
| --- | --- | --- |
| 生产状态未重新核验 | 本轮提交后未执行 production read-only smoke，不能声明已部署或线上已通过 | 如需上线结论，单独执行 production read-only smoke 或部署验收 |
| dev 依赖审计仍失败 | `audit:prod` 通过，但 `audit:full` 失败；主要是 dev 工具链 advisory | 单独评估 Babel/js-yaml 常规修复，以及 Drizzle 工具链替换或隔离 |
| Browserslist 数据过期 | `npm run verify` 的 build 阶段提示 caniuse-lite 约 6 个月未更新 | 单独执行依赖维护，不混入债务收口提交 |
| `catalogSource.json` 仍是单体大 JSON | 已从巨型 TS 迁移为 JSON，但来源治理和拆分仍未完成 | 后续设计来源字段、去重协议、分片或导入流程 |
| 管理员发布系统未实现 | 当前公开产品保持 static-first read-only；DB-backed admin 仍是未来路线 | 先写 admin PRD/API 安全设计，再进入实现 |
| 架构图谱未重绘 | `docs/architecture/...` 已标为历史快照，图内旧标签未更新 | 如需当前图谱，必须重新生成 SVG/PNG 并做视觉验收 |

边界结论：

- 本阶段完成的是 repo-local 代码、文档和门禁收口，不是 production deployment closeout。
- `docs-only`、`draft`、`read-only`、`production unchanged` 不可混用；本节属于 draft 执行记录。
- 没有 provider call、live send、manual approval 或 authorized live side effect。

下一步建议：

1. 提交本草稿作为 G8 draft record。
2. 提交后确认工作区是否干净。
3. 若要形成可合并/可上线结论，再进入分支级 review、push/PR 或 production read-only smoke。
