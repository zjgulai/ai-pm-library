---
title: 每周高质量内容检索与增量更新流程
doc_type: workflow
module: content
topic: weekly-refresh
status: stable
created: 2026-06-02
updated: 2026-06-02
owner: self
source: human+ai
---

# 每周高质量内容检索与增量更新流程

## 目标

每周为 PromptForge 六大类内容补充一批高质量、可复核、可执行的新内容。默认采用“小批量高置信”策略：每类先补 2 条，确认质量和用户反馈后再扩容。

六大类：

- `prompt`: 可直接复用的提示词模板
- `skill`: 可迁移到 AI coding agent / 产品工作流的技能
- `hook`: 可自动执行或约束 agent 行为的生命周期钩子
- `mcp`: 可连接外部系统、数据或安全能力的 MCP 工具
- `agent`: 可作为智能体设计参考的架构、模型或工作流
- `github`: 可被团队评估或采用的开源项目

## 检索窗口

默认窗口为当前日期往前 7 天。以 `2026-06-02` 为例，窗口为 `2026-05-26` 到 `2026-06-02`。

可接受的近一周信号：

- 官方发布、变更日志、产品公告、规范更新发生在窗口内。
- GitHub 仓库在窗口内有 push、release 或显著 README 更新，并且项目用途与本站信息架构匹配。
- 社区讨论只作为候选线索，不能作为正式入库依据；必须回溯到官方文档、仓库、规范或可运行项目。

## 信息源优先级

| 等级 | 来源 | 用法 |
| --- | --- | --- |
| T1 | 官方文档、官方 changelog、标准规范、产品公告 | 可直接作为正式内容来源 |
| T2 | 高活跃开源仓库、release note、README、API 文档 | 需要验证维护信号、license、用途清晰度 |
| T3 | 研究论文、技术博客、厂商案例 | 只在能转化成可执行模板时采用 |
| T4 | Reddit、X、论坛、二手汇总 | 只用于发现线索，不直接入库 |

## 检索策略

每类至少覆盖两种检索方式：

- 官方源检索：按 OpenAI、Anthropic、GitHub、Model Context Protocol、Vercel、Airbyte、Activepieces 等源站检索。
- GitHub 活跃度检索：按 `pushed:>=YYYY-MM-DD`、`stars`、`topics` 和关键词筛选。
- 交叉验证：同一候选至少读取一个主来源页面；开源项目同时检查 stars、最近 push、README 描述和 topic。
- 去重检查：入库前搜索 `staticData.ts` 中的 title、source URL 和核心关键词，避免近似重复。

## 质量评分

满分 100，低于 75 不入库。

| 维度 | 分值 | 判定 |
| --- | ---: | --- |
| 时效性 | 15 | 发布、更新或 push 在最近 7 天内 |
| 来源可信度 | 25 | T1/T2 优先，T3 需有明确证据链 |
| 可执行性 | 25 | 能转化成模板、流程、检查清单或工具评估 |
| 相关性 | 15 | 明确服务 AI PM、AI coding、agent、MCP、自动化或内容工作流 |
| 安全与治理价值 | 10 | 能降低泄密、误操作、幻觉、成本或供应链风险 |
| 非重复性 | 10 | 与当前内容库不构成标题或用途重复 |

## 入库格式

每条内容必须包含：

- 中文标题和英文标题
- `role`
- 中文 tags 和英文 tags
- 可直接执行的 `content`
- `description`、`scenario`、`problemFocus`
- `author`
- `createdAt`
- 来源链接，写入 `content` 的 `## 来源` 段

默认 `createdAt` 使用本次入库时间，不伪装为外部发布日期。

## 增量更新步骤

1. 检索并筛选候选内容。
2. 对候选按评分表打分，保留每类前 2 条。
3. 备份将修改的正式文件。
4. 更新 `app/src/data/staticData.ts` 的 `prompts_full` 和 `skills_full`。
5. 更新 `app/src/data/catalogMeta.ts` 和 `app/src/data/dataUtils.test.ts` 的计数。
6. 运行 `npm run catalog:export` 重新生成 `app/public/catalog/*.json`。
7. 更新 `README.md` 的当前内容规模。
8. 执行验证：`npm run docs:check`、`npm run verify`、必要时执行 `npm run smoke:e2e`。

## 本轮 2026-06-02 采集计划

本轮采用 12 条增量：

- `prompt`: 2 条，聚焦 agent use-case gate、模型/记忆/成本迁移决策。
- `skill`: 2 条，聚焦 agent skill 供应链和跨工具规则同步。
- `hook`: 2 条，聚焦 destructive command guard 和编辑后证据门禁。
- `mcp`: 2 条，聚焦 MCP 安全扫描和 no-code automation MCP 工具评估。
- `agent`: 2 条，聚焦 sandboxed agents 和 Opus 4.8 dynamic workflows。
- `github`: 2 条，聚焦 TypeScript AI SDK 与 agent configuration lint。

本轮不采纳纯社区讨论，不采纳无法定位到来源页面的二手汇总，不采纳与现有跨境电商批次重复的内容。
