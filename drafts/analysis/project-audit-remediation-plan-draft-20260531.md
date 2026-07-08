---
title: 项目审计修复 MECE 方案与执行 TODO
doc_type: analysis
module: project-governance
topic: audit-remediation
status: draft
created: 2026-05-31
updated: 2026-05-31
owner: self
source: human+ai
---

# 项目审计修复 MECE 方案与执行 TODO

## 1. 目标

把当前仓库从“可运行但风险分散”的状态，收敛为“安全边界清晰、数据源单一、部署可靠、质量门禁可复现、文档可导航”的状态。

## 2. 当前状态摘要

- 应用构建、类型检查、lint、测试通过。
- `npm audit`、`npm run audit:high`、`npm run audit:prod` 均通过；`drizzle-kit` 的传递 `esbuild` 漏洞通过 npm `overrides` 修复。
- 根目录 SSH key 已移出仓库，`.gitignore` 已覆盖 `*.pem`。
- tRPC 写接口已移除，前端实际消费静态 catalog JSON。
- 数据库 schema 无法完整表达前端六维分类。
- 部署配置中的 MySQL healthcheck 变量插值风险已修复。
- `deploy/README.md` 已补齐。
- 首屏主 JS 已从约 2.3 MB 降到约 257 KB，gzip 后约 81 KB。

## 3. 架构判断

推荐采用“两阶段收敛”：

第一阶段先按 `static-first read-only` 稳定生产，因为当前前端已经直接消费 `staticData.ts`，这是最短、最稳、最低维护成本路径。

第二阶段只有在确实需要后台管理、在线编辑、内容审核、增量发布时，再升级为 `DB-backed content platform`。

不推荐当前状态继续演进：静态数据和数据库同时存在，但前端不用 API，后端却暴露写接口。这会同时承担静态站和动态站的复杂度，没有获得动态站收益。

## 4. MECE 解决域

### A. 安全与密钥治理

目标：任何密钥不在项目根目录、不被 Git 追踪、不出现在日志和配置展开输出中。

方案：

- 将 `ai_video.pem` 移出仓库目录，放到用户级安全路径，例如 `~/.ssh/promptforge_ai_video.pem`。
- `.gitignore` 增加 `*.pem`、`ai_video.pem`、`.sisyphus/`、`.kiro/` 或明确决定是否追踪规划文件。
- 轮换服务器 SSH key；如果 `deploy/secrets.env` 内容曾经进入终端输出或远程日志，也轮换数据库密码和 `APP_SECRET`。
- 禁止把 `docker compose config` 原样写入共享日志，因为会展开 `env_file` 密钥。

验收标准：

- `git status --short` 不再显示密钥文件。
- `git check-ignore -v ai_video.pem` 命中规则。
- 新 SSH key 验证可部署，旧 key 失效。

### B. API 暴露面与数据完整性

目标：公开服务默认只读；所有写入路径都有认证、授权、校验和审计。

方案：

- 短期：删除或禁用 `prompts/skills/workflows` 的 `create/update/delete` mutation。
- 中期：如果需要写接口，新增 `protectedProcedure`，校验 `Authorization` 或 server-side session。
- 加入基础限流和请求体大小策略；`bodyLimit` 继续保留，但写接口不能只靠 body limit。
- 对删除类操作增加软删除或管理端确认，不直接暴露硬删除。

验收标准：

- 未认证请求调用写接口返回 401 或接口不存在。
- 读接口仍可用。
- 有 API smoke tests 覆盖读写权限边界。

### C. 数据源与模型收敛

目标：前端、数据库、README 统计口径一致，只有一个可信数据源。

方案：

- 阶段 1：保留静态数据为唯一生产数据源，隐藏或禁用 DB 写链路。
- 阶段 2：如切换 DB-backed，先补 schema：`category`、`source`、`status`、`slug`、`updated_at`、唯一约束。
- 修复 `seed-full.ts`：增加事务、幂等 upsert、分类映射、重复数据检测。
- 解决 `skills_full` 中 `category: prompt` 的 20 条跨境电商 prompt 归属问题。
- 处理重复标题 `Temporal：可靠工作流引擎`。

验收标准：

- README 总数、首页总数、页面总数、seed 总数一致。
- 重复 seed 不会产生重复数据。
- 分类查询能稳定返回 `prompt/skill/hook/mcp/agent/github`。

### D. 部署与运维可靠性

目标：部署脚本可重复执行，失败原因可定位，生产启动不依赖隐式本地状态。

方案：

- 修复 `docker-compose.yml` healthcheck 中 `MYSQL_PASSWORD` 的变量展开。
- 补齐 `deploy/README.md`，说明首次部署、日常部署、seed、回滚、密钥路径。
- `deploy.sh` 增加本地前置检查：SSH key 存在、权限为 `600`、远端 Docker 可用、外部网络存在。
- 不再默认 `--no-cache` 全量 build，除非显式传参。
- 使用 Drizzle migration 替代生产 `drizzle-kit push`。

验收标准：

- `docker compose -f deploy/docker-compose.yml config` 不再出现空密码 healthcheck。
- `./deploy.sh --dry-run` 或等效检查能在本地验证关键前提。
- 生产回滚路径写入文档。

### E. 前端性能与用户体验

目标：降低首屏包体积和搜索渲染成本，避免全量数据阻塞首屏。

方案：

- 按分类拆分 `staticData.ts`，用路由级 dynamic import。
- 删除未使用的 `UnifiedGallery` 或明确替换 `CardGrid`，避免平行实现。
- 搜索输入使用 debounce，已存在基础实现；下一步加 `useDeferredValue` 或 worker 索引。
- 大列表加分页、虚拟滚动或“加载更多”。
- 对内容展开渲染改用可靠 markdown sanitizer，不依赖手写正则拼 HTML。

验收标准：

- 主 JS chunk 降到明确预算内，例如 gzip < 250KB 或按阶段设定阈值。
- 搜索 800+ 条数据不卡顿。
- `npm run build` 不再出现大 chunk 警告，或有明确预算豁免。

### F. 测试与质量门禁

目标：每个高风险路径都有最小自动化证据。

方案：

- 新增 API smoke tests：`ping`、list/count、未认证写入拒绝。
- 新增数据测试：分类计数、必填字段、重复标题、非法 category。
- 新增 Markdown link checker，覆盖 README 和 `draco-content/`。
- CI 或本地 `npm run verify` 聚合：`check`、`lint`、`test`、`build`、`audit`。
- 对依赖安全升级建立单独提交，不混入功能改动。

验收标准：

- `npm run test` 通过且不再因无测试失败。
- `npm run verify` 一条命令给出交付证据。
- markdown 缺失链接数量归零或有明确忽略列表。

### G. 文档与仓库治理

目标：仓库可导航，正式资产和草稿边界清晰，根目录不继续熵增。

方案：

- 根目录补 `AGENTS.md`，作为项目治理入口。
- 为 `docs/analysis/prompt_methodology_report.md` 补元信息头，或归档旧报告并生成新版 stable 报告。
- 补 `deploy/README.md`。
- 修复 `draco-content/README.md` 中不存在的图片和目录链接。
- 清理 README 中错误描述：不要把密钥文件列为仓库结构资产。

验收标准：

- 新增 Markdown 都有元信息头。
- 本地链接检查通过。
- 根目录只保留入口、配置和标准顶层目录。

### H. 依赖与供应链管理

目标：依赖升级可控，安全漏洞不长期积压。

方案：

- 先执行 non-major 安全升级：`vite`、`hono`、`postcss`、`rollup`、相关 transitive 修复。
- 对 major 升级单独开任务，例如 Vite 8、Hono 2 node server、ESLint 10。
- 增加 `npm audit --audit-level=high` 到验证脚本。
- 明确 `npm` 为当前包管理器；若迁移 `pnpm`，单独执行锁文件迁移，不混用。

验收标准：

- `npm audit --audit-level=high` 通过。
- 锁文件变更可解释。
- major 升级有回归测试证据。

## 5. 执行 TODO

### Phase 0: 初始化与风险止血

- [ ] P0-01 创建并确认 `AGENTS.md` 项目治理入口。
- [ ] P0-02 将 `ai_video.pem` 移出仓库并加入 ignore。
- [ ] P0-03 轮换 SSH key；确认旧 key 失效。
- [ ] P0-04 禁用或删除公开写接口。
- [ ] P0-05 修复 `docker-compose.yml` MySQL healthcheck 变量展开。

### Phase 1: 生产稳定化

- [x] P1-01 补 `deploy/README.md`，写清部署、seed、回滚和密钥管理。
- [x] P1-02 修复 README 中不存在的 `deploy/README.md` 链接或补齐文件。
- [x] P1-03 增加最小 API 和数据测试，让 `npm run test` 通过。
- [x] P1-04 建立 `npm run verify`，聚合 check/lint/test/build。
- [x] P1-05 执行 non-major 安全升级并验证 high-severity audit gate。
- [x] P1-06 处理 `drizzle-kit` 传递依赖 moderate 漏洞，禁止用降级到 `0.18.1` 的方式修复。

### Phase 2: 数据架构收敛

- [x] P2-01 决策：继续 static-first，还是升级 DB-backed。
- [x] P2-02 static-first 路线：移除生产写接口，前端改为按需加载生成后的静态 catalog JSON。
- [x] P2-03 static-first 启动边界：静态站生产启动不再强制要求 `DATABASE_URL`。
- [ ] P2-04 DB-backed 路线：补 schema、migration、category、幂等 seed。
- [ ] P2-05 修正 20 条 `category: prompt` 的归属。当前生成器按历史公开口径排除这 20 条重复项，不直接改大数据源。
- [ ] P2-06 修正重复标题和 README 统计口径。

### Phase 3: 性能与体验

- [x] P3-01 按分类拆分静态数据，路由级懒加载。
- [ ] P3-02 删除或合并 `UnifiedGallery` 与 `CardGrid` 的平行实现。
- [x] P3-03 为大列表引入分页、加载更多或虚拟滚动。
- [ ] P3-04 替换手写 HTML formatter 为受控 markdown 渲染与 sanitizer。
- [ ] P3-05 设置 bundle size 预算。当前事实预算：初始 JS gzip 约 81 KB，后续应保持低于 100 KB。

### Phase 4: 文档和内容资产

- [ ] P4-01 修复 35 个 Markdown 缺失链接。
- [ ] P4-02 为正式区 Markdown 补元信息头。
- [ ] P4-03 清理或补齐 `draco-content` 缺失 assets。
- [ ] P4-04 明确 `nexscope/skills_data.pkl` 是临时数据、归档资产还是正式输入。
- [ ] P4-05 更新 README，使目录、技术栈、数据流与事实一致。

## 6. 推荐第一批执行包

第一批只做止血和验证，不碰大规模架构迁移：

1. 处理 SSH key 和 `.gitignore`。
2. 禁用公开写接口。
3. 修复 compose healthcheck。
4. 补最小测试，让 `npm run test` 不再失败。
5. 补 `deploy/README.md`，修 README 错误链接。

这批完成后再决定 static-first 还是 DB-backed。否则容易在未止血状态下扩大重构范围。

## 7. 当前禁止动作

- 不删除现有数据文件。
- 不批量移动 `draco-content/`。
- 不直接清理 `.sisyphus/`、`ai_video.pem`，除非获得确认。
- 不执行 `git reset --hard`、`git clean -f`。
- 不在同一提交中混合密钥治理、依赖升级和架构迁移。
