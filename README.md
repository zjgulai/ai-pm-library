# AI PM Library

一个面向 AI 产品经理和内容创作者的工具集合，包含前端应用、内容自动化脚本和数据工具。

## 仓库结构

```
ai_pm_library/
├── app/                    # React + Vite + tRPC 前端应用
├── draco-content/          # 内容自动化工具集（20+ 独立工具）
├── nexscope/               # 数据脚本与 SQL 工具
└── docs/                   # 文档与分析报告
```

---

## app/ — 前端应用

基于 **React 19 + TypeScript + Vite + Tailwind CSS + tRPC + Drizzle ORM** 构建的 Prompt 库与工具管理应用。

### 技术栈

| 层 | 技术 |
|---|---|
| 前端框架 | React 19 + React Router 7 |
| 构建工具 | Vite 7 |
| 样式 | Tailwind CSS v3 + shadcn/ui |
| API | tRPC v11 + Hono |
| ORM | Drizzle ORM + MySQL2 |
| 类型 | TypeScript 5.9 |

### 快速开始

```bash
cd app
npm install
cp .env.example .env   # 填写数据库连接等配置
npm run dev
```

### 可用脚本

```bash
npm run dev        # 开发模式
npm run build      # 生产构建
npm run check      # TypeScript 类型检查
npm run lint       # ESLint 检查
npm run test       # 运行测试
npm run db:push    # 推送 schema 到数据库
```

---

## draco-content/ — 内容自动化工具集

面向内容生产、飞书协作、公众号发布、多媒体自动化的独立工具集。每个子目录是一个相对独立的工具，详见 [draco-content/README.md](./draco-content/README.md)。

主要工具：

- **wechat-article-camofox** — 抓取微信公众号文章
- **daily-ai-agent-aigc-top-news** — 每日 AI 早报自动生成
- **epub2podcast** — 电子书转播客视频
- **manim-video / manim-video-with-tts** — 数学动画视频
- **remotion / motion-canvas** — React/TS 页面视频
- **feishu-seedance-video-pipeline** — Seedance 视频产线

---

## nexscope/ — 数据工具

包含电商数据批量 SQL 脚本，用于数据导入与分析。

---

## docs/

- [docs/analysis/prompt_methodology_report.md](./docs/analysis/prompt_methodology_report.md) — Prompt 标签方法论深度分析报告

---

## 环境要求

- Node.js 20+
- Python 3.10+
- MySQL（app 使用）
- Git
