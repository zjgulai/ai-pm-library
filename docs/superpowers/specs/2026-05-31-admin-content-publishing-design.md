---
title: 管理员内容新增与发布系统设计
doc_type: architecture
module: admin-content
topic: content-publishing
status: stable
created: 2026-05-31
updated: 2026-05-31
owner: self
source: human+ai
---

# 管理员内容新增与发布系统设计

## 目标

为 PromptForge 增加管理员专用的六大类内容新增能力，形成从登录、单条录入、预览、草稿保存、发布、回滚到线上 smoke 的闭环。第一阶段只服务管理员，不开放访客投稿，不编辑历史 803 条静态内容。

## 已确认决策

- 第一阶段入口仅管理员使用，公开访客不能触发写入。
- 管理员认证采用单管理员密码登录，密码只保存 hash，登录后使用 `HttpOnly` session cookie。
- 内容录入采用单条手动录入和预览，不做批量导入，不接 AI 生成链路。
- 新增内容持久化使用新的独立 PostgreSQL 服务，不复用旧 `promptforge_mysql`。
- 历史 803 条内容保持只读，第一阶段只管理新增内容。
- 发布采用独立 `deploy-worker` 容器执行，Web 应用只创建发布任务，不持有 SSH key，不挂 Docker socket，不直接部署。
- 公开站点读取共享 catalog volume，通过版本化目录和原子 `current` 切换发布，不要求每次内容发布都重建 app 镜像。
- 新增内容数据模型采用统一 `content_items` 表，六大类由 `category` 区分，类别差异放入 `metadata JSONB`。
- 内容状态采用 `draft -> published -> archived`，下架不删除数据。

## 范围

### 第一阶段包含

- 管理员登录、登出、session 查询。
- 管理员内容工作台：列表、单条新增、编辑新增内容、预览、发布、下架。
- 新增内容写入 PostgreSQL，并记录审计事件。
- `deploy-worker` 消费发布任务，生成版本化 catalog artifact。
- 公开站点从共享 catalog volume 读取 `/catalog/current`，失败时回退镜像内置静态 catalog。
- 发布和回滚后的 smoke 测试。

### 第一阶段不包含

- 访客投稿。
- 多管理员、角色权限、组织协作。
- AI 辅助生成、批量导入、审核队列。
- 编辑历史 803 条静态内容。
- 删除旧 `promptforge_mysql`、`promptforge_net` 或相关 volume。

## 架构

系统拆为四个边界清晰的部分：

1. 公开站点：继续保持 static-first，只读展示六大类 catalog。
2. Admin API：独立 `/api/admin/*` 写入口，负责认证、输入校验、内容管理和发布任务创建。
3. PostgreSQL：保存新增内容、审计事件、catalog 版本和发布任务。
4. `deploy-worker`：独立容器，消费发布任务，生成 catalog artifact，执行 smoke 和回滚。

公开站点不直接写数据库。Admin API 不直接执行部署命令。`deploy-worker` 不暴露公网入口。旧 MySQL 环境作为残余历史资源保留，后续单独归档。

## 数据模型

### `content_items`

保存新增内容本体。

关键字段：

- `id`: 主键。
- `category`: 六大类之一，取值为 `prompt`、`skill`、`hook`、`mcp`、`agent`、`github`。
- `slug`: 小写英文、数字和连字符组成，同一 category 内唯一。
- `title`: 标题。
- `summary`: 摘要。
- `content`: 正文。
- `tags`: 标签数组。
- `role`: 角色或适用人群。
- `metadata`: 类别专属字段，使用 `JSONB`。
- `status`: `draft`、`published`、`archived`。
- `created_at`、`updated_at`、`published_at`: 时间戳。

### `content_events`

记录内容和发布的审计事件。

关键字段：

- `id`: 主键。
- `event_type`: `create`、`update`、`preview`、`publish`、`archive`、`rollback`、`fail`。
- `content_item_id`: 可为空，发布级事件可不绑定单条内容。
- `old_status`、`new_status`: 状态变更。
- `actor`: 管理员标识。
- `ip`、`user_agent`: 请求上下文。
- `error_summary`: 失败摘要。
- `created_at`: 事件时间。

### `catalog_versions`

记录每次成功生成的 catalog 版本。

关键字段：

- `version`: 版本号。
- `release_path`: `/catalog/releases/<version>`。
- `manifest_hash`: `manifest.json` 摘要。
- `item_counts`: 六大类记录数。
- `created_by`: 发布人。
- `created_at`: 生成时间。
- `rollback_from`: 回滚来源版本，可为空。

### `publish_jobs`

给 `deploy-worker` 消费。

关键字段：

- `id`: 主键。
- `type`: `publish` 或 `rollback`。
- `status`: `queued`、`running`、`succeeded`、`failed`。
- `target_version`: 回滚目标版本或生成后的目标版本。
- `requested_by`: 请求人。
- `error_summary`: 失败摘要。
- `created_at`、`started_at`、`finished_at`: 时间戳。

## 后台 UI

后台入口使用独立路由，例如 `#/admin/content`，不放入公开导航。未登录访问显示管理员登录页；登录后进入内容工作台。

第一阶段后台 UI 只包含三块：

- 内容列表：按 category、status、关键词筛选新增内容。
- 单条新增表单：先选 category，再填写通用字段和 category 专属 metadata。
- 预览/发布面板：复用公开卡片展示形态，确认无展示异常后发布。

录入校验规则：

- `title`、`summary`、`content` 必填。
- `slug` 必须小写英文、数字和连字符组成。
- `slug` 在同一 category 内唯一。
- `category` 必须属于六大类。
- 正文预览必须使用现有安全渲染器，不允许原始 HTML 注入。

## API、安全与审计

公开 `/api/trpc` 继续保持只读，不恢复任何公开写能力。后台接口独立放在 `/api/admin/*`，所有写接口必须经过管理员 session、CSRF 和结构化输入校验。

接口范围：

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/session`
- `GET /api/admin/content`
- `GET /api/admin/content/:id`
- `POST /api/admin/content`
- `PATCH /api/admin/content/:id`
- `POST /api/admin/content/:id/archive`
- `POST /api/admin/content/:id/preview`
- `POST /api/admin/publish`
- `GET /api/admin/publish/:jobId`
- `GET /api/admin/catalog/versions`
- `POST /api/admin/catalog/rollback`

安全规则：

- 管理员密码只保存 hash。
- session cookie 使用 `HttpOnly`、`SameSite=Lax`、`Secure`。
- 登录限流按 IP 和失败次数执行。
- 内容写入和发布按 session 做低频限流。
- 错误返回只暴露可行动信息：`400` 校验失败、`401` 未登录、`403` 权限不足、`409` slug 或发布冲突、`500` 返回事件 ID。

所有写入、发布、回滚和失败都必须写入 `content_events`。

## Catalog 发布与回滚

`deploy-worker` 消费 `publish_jobs`，读取历史静态 catalog 和新增已发布内容，生成版本化目录：

```text
/catalog/releases/<version>/
├─ manifest.json
├─ prompt.json
├─ skill.json
├─ hook.json
├─ mcp.json
├─ agent.json
└─ github.json
```

`manifest.json` 记录版本号、每个文件 hash、每类记录数、生成时间和来源 job。生成后先做 schema 校验、分类计数校验和 JSON 可读性校验，全部通过后再把 `/catalog/current` 原子切换到新版本。

公开 app 优先读取共享 volume 的 `/catalog/current`。如果共享 volume 不可用，回退到镜像内置 `public/catalog`，保证线上静态基线可用。

回滚不修改 `content_items`。回滚创建 `rollback` job，把 `/catalog/current` 指向历史 `catalog_versions` 中的目标版本，并记录审计事件。

## 测试矩阵

### 单元测试

- slug 格式和唯一性校验。
- category 枚举校验。
- `draft -> published -> archived` 状态流转。
- catalog 合并逻辑。
- `manifest.json` hash 和计数。
- `current` 指针切换和回滚。

### API 测试

- 登录、登出、session。
- CSRF 缺失拒绝。
- 未登录写入拒绝。
- slug 冲突返回 `409`。
- 发布任务重复触发冲突处理。
- 登录和发布限流。

### 集成测试

- PostgreSQL migration 可重复执行。
- Admin API 写入内容后 `deploy-worker` 能生成 catalog。
- shared volume 中 `releases` 和 `current` 结构正确。
- publish job 失败时不切换 `current`。
- rollback job 能恢复上一版本。

### E2E 与 smoke

- 管理员登录。
- 新增一条内容并预览。
- 发布后公开 catalog 出现新增内容。
- 六大类 category JSON 均返回 `200`。
- 公开页面搜索、展开、加载更多仍正常。
- 发布失败后前台仍读取上一版 catalog。
- 生产 smoke 继续纳入部署流程。

## 迁移顺序

1. 本地实现 PostgreSQL schema 和 migration。
2. 本地实现 Admin API、认证、CSRF、限流和审计。
3. 本地实现 admin UI。
4. 本地实现 catalog publisher 和 shared volume 读取。
5. 本地实现 `deploy-worker`、发布任务、回滚任务和 smoke。
6. CI 加入 admin 与 publisher 测试。
7. 线上 compose 增加独立 PostgreSQL、catalog volume、`deploy-worker`。
8. 线上先执行 no-op 发布，确认生成 catalog 与 smoke 成功。
9. 线上录入第一条真实内容，执行发布和生产 E2E。

线上迁移不删除、不停止、不改名旧 `promptforge_mysql`、`promptforge_net` 或相关 volume。

## 实施里程碑

### M1 数据与认证

完成 PostgreSQL schema、migration、管理员登录、session、CSRF、限流和基础审计。

验收条件：

- migration 可重复执行。
- 未登录访问 admin 写接口返回 `401`。
- 登录失败限流生效。
- `npm run verify` 通过。

### M2 Admin UI

完成管理员内容列表、单条新增表单、编辑新增内容和预览。

验收条件：

- 可以保存 `draft`。
- slug 冲突被前后端同时拦截。
- 预览使用公开安全渲染路径。
- 后台路由不出现在公开导航。

### M3 Catalog Publisher

完成新增内容和历史静态 catalog 的合并输出。

验收条件：

- 生成六类 JSON 和 `manifest.json`。
- 文件 hash、记录数和 schema 校验通过。
- 历史 catalog 不被覆盖。

### M4 Deploy Worker 与回滚

完成 `publish_jobs` 消费、版本化 release、原子切换和 rollback。

验收条件：

- 发布成功后 `/catalog/current` 指向新版本。
- 发布失败不切换 `current`。
- 回滚能恢复上一版本。
- 事件和错误摘要可追踪。

### M5 CI 与本地 smoke

将 admin、publisher、worker 和公开站 smoke 纳入自动验证。

验收条件：

- `npm run verify` 通过。
- `npm run audit:prod` 通过。
- 本地 `smoke:e2e` 覆盖公开页面和基础后台路径。

### M6 线上灰度与生产 E2E

线上增加独立 PostgreSQL、catalog volume、`deploy-worker` 后，先 no-op 发布，再发布真实新增内容。

验收条件：

- 不触碰旧 MySQL 和旧网络。
- no-op 发布成功且公开站仍正常。
- 真实新增内容出现在对应 category。
- 生产 smoke 和关键 E2E 通过。

## 残余风险

- 单管理员密码适合第一阶段，后续多人协作必须升级为多用户和角色权限。
- `metadata JSONB` 灵活但弱约束，后续稳定后应把高频类别字段结构化。
- shared volume fallback 能保住静态基线，但如果 volume 长期不可用，新增内容不会展示，需要部署告警。
- 旧 `promptforge_mysql` 和 `promptforge_net` 仍是残余运维债，需单独备份后归档。

## 通过标准

本设计完成实施后，管理员可以在后台新增六大类内容并触发发布；公开站不暴露写入口；新增内容通过版本化 catalog 安全上线；发布失败不破坏上一版；回滚可追踪；部署和 smoke 证据完整。
