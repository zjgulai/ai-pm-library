---
title: PromptForge 项目理解、问题域与工作流历史快照
doc_type: architecture
module: promptforge
topic: project-understanding-problem-workflows
status: historical
created: 2026-06-04
updated: 2026-06-19
owner: self
source: human+ai
---

# PromptForge 项目理解、问题域与工作流历史快照

## 边界声明

本文保存 2026-06-04 的项目理解和工作流拆解。文内对当时生产形态、内容数量、脚本名称和数据血缘的描述属于历史快照。

本次 G5b 未重绘图谱，也未执行生产 read-only smoke。当前 repo-local 可验证事实是：catalog manifest 总量 803，分类计数为 `prompt 193`、`skill 306`、`hook 72`、`mcp 72`、`agent 73`、`github 87`，当前内容源链路为 `app/src/data/catalogSource.json` -> `npm run catalog:generate` / `npm run catalog:check` -> `app/public/catalog/*.json`。

## 2026-06-04 一句话定位

PromptForge 是一个面向 AI 产品经理、AI 编程用户、内容创作者和自动化实践者的六维 AI 知识库与内容更新工作台。当时的核心判断是：项目价值不在在线 CRUD，而在把高质量 AI 工作方法、工具、Agent、MCP、Hook 和开源项目组织成可检索、可筛选、可复用、可持续更新的知识资产。

## 2026-06-04 系统分层快照

| 层级 | 快照事实 | 快照关键文件 |
| --- | --- | --- |
| 公开访问层 | 当时记录 `kg.lute-tlz-dddd.top` 通过 nginx 反代到 `promptforge_app:3000` | `deploy/README.md`, `deploy/nginx-kg-block.conf` |
| 前端应用层 | React + React Router + Vite，使用 hash 路由展示页面 | `app/src/App.tsx`, `app/src/pages/*.tsx` |
| 内容展示层 | 六大类页面共用 `CategoryPage -> CardGrid -> SearchBar` | `app/src/components/CategoryPage.tsx`, `app/src/components/CardGrid.tsx`, `app/src/components/SearchBar.tsx` |
| 静态数据层 | 前端请求 `public/catalog/*.json`，当时计数由 `catalogMeta.ts` 维护 | `app/public/catalog/*.json`, `app/src/data/catalogItems.ts`, `app/src/data/catalogMeta.ts` |
| 内容生成层 | 当时为 `staticData.ts` 经 `catalog:export` 生成六类 catalog JSON | `app/src/data/staticData.ts`, `app/scripts/export-catalog-data.mjs` |
| 可选 DB 工具层 | Drizzle/MySQL schema 和旧查询路由存在，但不是公开生产链路 | `app/db/schema.ts`, `app/api/*-router.ts` |
| 部署运维层 | app-only Docker Compose，不触碰旧 MySQL | `deploy/docker-compose.yml`, `deploy/deploy.sh`, `deploy/README.md` |
| 未来管理层 | 管理员新增/发布系统为设计态 | `docs/superpowers/specs/2026-05-31-admin-content-publishing-design.md` |

## 历史问题域

| 大类问题 | 当时解决方式 | 快照成熟度 |
| --- | --- | --- |
| AI 工作方法复用 | `prompt` 类内容、角色标签、场景字段、方法论分析 | 已上线 |
| AI 编程能力封装 | `skill` 类内容，覆盖 Claude Code、电商、产品、开发等角色 | 已上线 |
| Agent 行为治理 | `hook` 类内容，沉淀生命周期钩子和约束策略 | 已上线 |
| 外部系统连接 | `mcp` 类内容，聚焦 MCP server 和上下文接入 | 已上线 |
| 智能体架构选型 | `agent` 类内容，沉淀框架、编排和治理模式 | 已上线 |
| 开源项目评估 | `github` 类内容，配合标题、标签、场景和问题焦点 | 已上线 |
| 内容持续更新 | E0-E8 weekly refresh 工作流 | 已文档化 |
| 生产发布可靠性 | CI verify + local/prod smoke + app-only 部署手册 | 已固化 |
| 管理员写入能力 | 管理员内容发布系统设计 | 已设计未实现 |

## 历史工作流

### W1 内容检索与增量更新

1. E0 恢复状态：确认生产入口、Git 状态、内容规模和 secrets 边界。
2. E1 设计检索：按六大类制定关键词、来源等级和 loop 配额。
3. E2 采集候选：记录来源、时间、类别、标题、相关性和证据。
4. E3 质量评分：按时效性、可信度、可执行性、相关性、安全治理价值、非重复性评分。
5. E4 增量入库：当时更新 `staticData.ts`、`catalogMeta.ts`、测试和 README。
6. E5 本地检查：执行 `npm run verify` 和本地 smoke。
7. E6 Git 同步：原子提交并 push。
8. E7 生产部署：app-only 部署，执行 production smoke。
9. E8 验收归档：记录计数、报告、残余风险。

### W2 公开站点访问与交互

1. 用户访问当时记录的 `kg.lute-tlz-dddd.top`。
2. nginx 转发到 `promptforge_app:3000`。
3. React app 根据 hash route 进入首页或六大类页面。
4. 分类页请求 `catalog/<category>.json`。
5. `CardGrid` 执行搜索、角色筛选、分页加载、展开、复制、收藏状态。

### W3 未来管理员发布路线

1. 管理员登录，获得 HttpOnly session。
2. 在 admin UI 新增或编辑内容。
3. Admin API 校验 category、slug、CSRF、session 和输入结构。
4. PostgreSQL 写入内容和事件。
5. 创建发布任务。
6. deploy-worker 生成版本化 catalog release。
7. 校验 manifest、hash、计数和 schema。
8. 原子切换当前 catalog。
9. 执行 smoke；失败则保持上一版或回滚。

## 历史指标体系

| 指标层 | 指标 | 快照证据 |
| --- | --- | --- |
| 北极星指标 | 可复用 AI 工作资产数 | 当时总计 851 |
| 结构指标 | 六类内容数量 | 当时 `CATEGORY_COUNTS` 与 catalog JSON |
| 角色覆盖 | 14 个职业角色及各类 role 分布 | 当时 `ROLE_LABELS` 与 catalog item role |
| 交互可用性 | 搜索、筛选、展开、复制、加载更多 | `CardGrid`, `SearchBar`, smoke |
| 质量门禁 | verify、lint、test、build、audit、docs check | `npm run verify` |
| 部署隔离 | app-only compose、同机域名 smoke、旧 MySQL 不触碰 | `deploy/README.md` |
| 未来发布安全 | session、CSRF、审计、版本化 catalog、回滚 | admin content design |

## 历史数据血缘

2026-06-04 快照中的生产数据血缘是：

```text
人工/AI 整理内容
  -> app/src/data/staticData.ts
  -> npm run catalog:export
  -> app/public/catalog/{prompt,skill,hook,mcp,agent,github}.json
  -> Vite build / Docker image
  -> promptforge_app
  -> nginx / kg.lute-tlz-dddd.top
  -> React CategoryPage/CardGrid/SearchBar
  -> 用户搜索、筛选、展开、复制
```

当前事实已迁移为 `catalogSource.json` 与 `catalog:generate` 链路；引用当前链路时不得使用上面的历史血缘。

## 历史风险与后续可复用判断

| 风险 | 影响 | 后续方向 |
| --- | --- | --- |
| 多点计数容易漂移 | 页面计数和验收可能错误 | 以 manifest 或生成脚本作为单一事实源 |
| DB 工具和静态生产链路共存 | 容易误判 DB-backed 已上线 | 文档和 router mount 继续保持边界 |
| 管理员发布系统未实现 | 内容新增依赖代码提交和部署 | 按 admin design 分阶段实现 |
| 部署回滚依赖 Git 回退再部署 | 回滚追溯性不足 | 引入版本化 release 目录或镜像 tag |
| 图谱自动化链路不完整 | SVG/PNG 预览可能过时 | 重绘前必须重新跑渲染和视觉验收 |
