---
title: 图形 Skill 安装调试与采用历史记录
doc_type: architecture
module: promptforge
topic: diagram-skill-debug
status: historical
created: 2026-06-04
updated: 2026-06-19
owner: self
source: human+ai
---

# 图形 Skill 安装调试与采用历史记录

## 边界

本文记录 2026-06-04 图谱生成时的工具调试结果。它不证明这些 skill 在当前环境仍可用，也不证明本目录 PNG/SVG 预览已经按当前 catalog 链路重绘。

## 2026-06-04 Skill 状态快照

| Skill | 当时状态 | 处理结果 |
| --- | --- | --- |
| `excalidraw-diagram-generator` | 已安装 | 作为主图谱产出能力，输出 `.excalidraw` 和 `.png`，采用手绘风格 |
| `architecture-diagram` | 当时已安装 | 安装到 `~/.codex/skills/architecture-diagram`，用于架构图 HTML/SVG 设计规范参考 |
| `fireworks-tech-graph` | 未安装成功 | 找到公开 `SKILL.md`，但安装受 GitHub clone/网络限制影响，未落盘 |

## 历史调试结论

- `architecture-diagram` 当时来源为 NousResearch/Hermes Agent 中的 `skills/creative/architecture-diagram`。
- `fireworks-tech-graph` 当时可验证公开安装源为 `yizhiyanhua-ai/fireworks-tech-graph`，但未形成本地 skill 目录。
- 因用户要求“手绘风格”，当时图谱主产物选择 Excalidraw。
- Excalidraw 官方 renderer 当时未采用；PNG 预览由本地 SVG 派生和系统 Chrome 截图生成。

## 当前使用规则

1. 本目录 `.excalidraw`、`.svg`、`.png` 都按 2026-06-04 历史图谱处理。
2. 需要当前图谱时，必须先更新数据血缘、计数和脚本名称，再重新渲染 SVG/PNG。
3. 不把未安装成功的 `fireworks-tech-graph` 记为当前可用能力。
