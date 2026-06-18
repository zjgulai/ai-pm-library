---
title: PromptForge 项目架构历史快照总览
doc_type: architecture
module: promptforge
topic: architecture-analysis-diagrams
status: historical
created: 2026-06-04
updated: 2026-06-19
owner: self
source: human+ai
---

# PromptForge 项目架构历史快照总览

## 范围

本目录保存 2026-06-04 形成的项目理解、问题域拆解、工作流设计和架构图谱。它是历史快照，不是当前事实源。

图谱中的 `851`、`staticData.ts`、`catalog:export`、`catalogMeta.ts`、旧 CI/smoke 名称等标签保留为快照内容，不能作为当前 catalog 链路或当前内容规模引用。

## 当前可验证事实

本次 G5b 只做仓库本地只读核验，证据等级为 `L1-public-or-runtime` 的 repo-local 事实；未执行生产 read-only smoke，未验证 live 域名状态。

- 当前分支：`codex/debt-phase0-risk-stopgap`。
- 当前 catalog manifest 总量：803。
- 当前分类计数：`prompt 193`、`skill 306`、`hook 72`、`mcp 72`、`agent 73`、`github 87`。
- 当前内容源链路：`app/src/data/catalogSource.json` -> `npm run catalog:generate` / `npm run catalog:check` -> `app/public/catalog/*.json`。
- 当前公开 API 写入边界、catalog 合同和 CI 验证已在本分支前序提交中收口；本目录只负责历史架构资料归档边界。

## 历史快照事实

- 快照时间：2026-06-04。
- 快照主题：static-first read-only 站点、六类内容资产、E0-E8 内容更新流程、管理员发布系统设计、部署隔离与图谱表达。
- 快照限制：图像预览未在本次 G5b 重绘；`.png` 与 `.svg` 预览中的文字仍反映 2026-06-04 的旧链路与旧计数。

## 文件索引

| 文件 | 用途 | 当前边界 |
| --- | --- | --- |
| `codex-session-summary-stable.md` | 2026-06-04 会话恢复上下文摘要 | 历史快照 |
| `project-understanding-problem-workflows-stable.md` | 2026-06-04 项目理解、问题域、工作流 | 历史快照 |
| `diagram-generation-skill-debug-stable.md` | 图形 skill 安装、调试和采用记录 | 历史快照 |
| `../../workflows/README.md` | 当前文档工作流入口 | 当前入口 |
| `../../workflows/catalog-contract-schema-migration-workflow-stable.md` | Catalog 合同 schema 迁移与兼容策略 | 当前入口 |
| `diagrams/*.excalidraw` | 业务架构、流程、数据流、指标、数据血缘图源文件 | 历史图源 |
| `diagrams/*.svg` | 从 Excalidraw 源文件派生的 SVG 预览 | 历史预览 |
| `diagrams/*.png` | 从 SVG 预览派生的 PNG 快速查看文件 | 历史预览 |
| `html/promptforge-architecture-diagram.html` | `architecture-diagram` 风格暗色架构图 | 历史预览 |
| `svg/promptforge-data-flow-fireworks-style.svg` | Fireworks 风格 SVG 备用图 | 历史预览 |
| `svg/promptforge-data-flow-fireworks-style.png` | Fireworks 风格 SVG 的 PNG 预览 | 历史预览 |

## 使用规则

- 引用当前 catalog 规模时，以 `app/public/catalog/manifest.json` 为准。
- 引用当前合同生成链路时，以 `app/scripts/generate-catalog.mjs`、`app/scripts/catalog-source-contract.schema.json` 和 `docs/workflows/catalog-contract-schema-migration-workflow-stable.md` 为准。
- 引用本目录图谱时，必须标注“2026-06-04 历史快照”，不得写成当前生产状态。
