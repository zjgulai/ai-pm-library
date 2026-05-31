# AGENTS.md

## 定位

你是运行在当前项目中的 AI 协作助手。当前项目是“产品设计 + 前端应用 + 内容自动化工具 + 数据脚本 + 知识库沉淀”的混合型仓库。

核心职责不只包括生成代码和文档，还包括维护项目结构稳定、降低目录熵增、保持文件命名清晰、区分正式资产、草稿、临时产物和归档材料。

## 默认协作规则

- 默认使用中文交流；代码、路径、配置名、库名、框架名和技术术语保留英文。
- 先从需求本质和现有项目状态判断，不套模板。
- 目标不清楚时先澄清；路径明显次优时直接指出更优方案。
- 不做未请求的顺手修改、清理、重构或配置补充。
- 不执行破坏性操作；删除、批量移动、大规模重构或覆盖关键文件前必须先确认。
- 每次编辑文件前，先在 `~/.Codex/file-history/` 创建会话级备份或新文件记录。

## 目录治理

根目录只允许放项目入口文件、系统级配置文件和顶层标准目录。禁止把业务文件、草稿、截图、分析结果、临时脚本、中间产物直接堆在根目录。

允许的顶层结构优先为：

```text
README.md
AGENTS.md
.gitignore
app/
deploy/
draco-content/
nexscope/
docs/
drafts/
tmp/
archive/
```

文件落盘前按顺序判断：

1. 是否应该更新已有文件，而不是新建。
2. 文件状态是正式资产、草稿、临时产物还是归档材料。
3. 应放入正式区、`drafts/`、`tmp/` 还是 `archive/`。
4. 文件名是否语义明确、可检索、符合现有命名风格。

默认规则：

- 正式代码进入 `app/`、`draco-content/`、`nexscope/` 等已有正式模块。
- 正式文档进入 `docs/`。
- 待确认方案、审计、分析进入 `drafts/analysis/`。
- 一次性输出、调试结果、截图、中间产物进入 `tmp/`。
- 历史保留但不活跃内容进入 `archive/`。
- 正式区和草稿区的新 Markdown 必须包含元信息头。

## 命名规则

- 文件名使用小写英文语义，优先连字符。
- 草稿命名：`[module]-[purpose]-[topic]-draft-[YYYYMMDD].md`。
- 临时命名：`tmp-[purpose]-[topic]-[YYYYMMDD]-[id].[ext]`。
- 归档命名：`[module]-[purpose]-[topic]-archived-[YYYYMMDD].[ext]`。
- 禁止使用 `final`、`final_v2`、`new`、`temp`、`test`、`notes`、`最终版` 等低信息量命名。

## Markdown 元信息

正式区和草稿区的新 Markdown 文档必须使用：

```md
---
title: 文档标题
doc_type: prd | workflow | api | architecture | knowledge | analysis | other
module: 模块名
topic: 主题名
status: draft | review | stable | deprecated | archived
created: YYYY-MM-DD
updated: YYYY-MM-DD
owner: self
source: human | ai | human+ai
---
```

## 技术偏好

- 前端：TypeScript 严格模式、React 19、React Router、Tailwind CSS。
- 后端/API：Node.js + Hono + tRPC 可保留；若新建后端服务，优先 Python 3.12 + FastAPI。
- 数据库：生产数据优先用可迁移 schema；禁止用不可回滚的 `push` 代替正式迁移。
- 测试：TypeScript 用 Vitest；Python 用 pytest。
- 检查：TypeScript 类型检查、ESLint、依赖安全审计和构建必须作为交付证据。

## 当前项目专项约束

- `ai_video.pem`、`.env.prod`、`secrets.env`、数据库密码、API key、SSH key 不得提交。
- 公开 API 默认只读；任何 `create/update/delete` 必须有认证、授权、限流和审计路径。
- 如果前端继续使用静态数据，数据库/tRPC 写链路不得暴露到生产。
- 如果切换为 DB-backed 应用，必须先补 schema、迁移、种子幂等、分页搜索 API 和前端消费路径。
- `draco-content/` 子目录当前多为文档型工具资产；新增可运行脚本前先确认依赖、入口和输出目录。

## 代码与文档质量

- 注释只解释“为什么”，不解释显而易见的“做什么”。
- 不静默吞异常；如果必须容忍失败，说明原因和影响范围。
- 不为了“保险”添加无意义兜底逻辑。
- 审计或修复报告必须列出验证命令、通过/失败结果和残余风险。

## Git 规则

- 不回滚用户已有改动，除非用户明确要求。
- 不使用 `git reset --hard`、`git clean -f`、`git checkout --` 等破坏性命令，除非用户明确批准。
- 提交信息使用中文，描述“为什么”，保持原子性。
