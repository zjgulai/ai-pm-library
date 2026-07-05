---
title: Codex 会话上下文历史快照
doc_type: architecture
module: promptforge
topic: codex-session-context
status: historical
created: 2026-06-05
updated: 2026-06-19
owner: self
source: human+ai
---

# Codex 会话上下文历史快照

## 用途

本文保留 2026-06-04 至 2026-06-05 长会话形成的项目理解和恢复线索。它是历史快照，不是当前状态声明。

新会话需要恢复当前状态时，应先读取 `README.md`、`docs/workflows/README.md`、`app/public/catalog/manifest.json` 和当前 Git 状态，再把本文作为历史背景补充。

## 当前可验证事实

本次 G5b 只做仓库本地核验，未执行生产 read-only smoke。

- 当前分支：`codex/debt-phase0-risk-stopgap`。
- 当前 catalog manifest 总量：803。
- 当前分类计数：`prompt 193`、`skill 306`、`hook 72`、`mcp 72`、`agent 73`、`github 87`。
- 当前内容源链路：`app/src/data/catalogSource.json` -> `npm run catalog:generate` / `npm run catalog:check` -> `app/public/catalog/*.json`。
- 当前工作流入口：`docs/workflows/README.md`。

## 2026-06-04 历史快照摘要

- 项目名称：灵词 PromptForge，位于 `/Users/pray/project/ai_pm_library`。
- 当时记录的生产入口：`https://kg.lute-tlz-dddd.top/`；本次未重新验证该 live 状态。
- 当时判断的公开产品形态：static-first read-only 六维 AI 知识库。
- 当时内容基线：851 条，包含 `prompt 201`、`skill 314`、`hook 80`、`mcp 80`、`agent 81`、`github 95`。
- 当时内容生成链路：`app/src/data/staticData.ts` -> `npm run catalog:export` -> `app/public/catalog/*.json`。
- 当时管理员内容新增与发布系统为设计态，尚未实现。
- 当时部署原则为 app-only Docker Compose，不触碰旧 MySQL。

## 可复用判断

1. 项目核心价值是把 AI PM、AI 编程、Agent、MCP、Hook、开源工具等内容组织成可搜索、可筛选、可复用、可周更的知识资产。
2. 内容更新需要保持状态恢复、检索设计、采集、评分、入库、本地门禁、Git 同步、部署、验收归档的闭环。
3. 任何“最新/当前”文档必须基于 live state 和当前仓库事实，不应直接使用旧记忆覆盖。
4. 管理员写入能力需要独立 Admin API、认证、CSRF、审计、版本化 catalog 和回滚，不能把公开站点改成无保护写入口。

## 历史图谱与工具记录

- `excalidraw-diagram-generator` 曾用于生成五张主图，源文件是 `.excalidraw`。
- `architecture-diagram` 曾用于 HTML/SVG 架构图表达参考。
- `fireworks-tech-graph` 当时未安装成功，不应被记为可用本地能力。
- PNG/SVG 预览保留当时图谱标签，本次未重绘。

## 恢复入口顺序

1. 当前 `README.md`。
2. 当前 `docs/workflows/README.md`。
3. 当前 `app/public/catalog/manifest.json`。
4. 本目录历史快照 README。
5. 任务相关源码或图谱文件。
