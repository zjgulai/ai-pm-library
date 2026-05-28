# 灵词 PromptForge

> 六维分类体系的 AI 知识库 — 提示词、技能、钩子、MCP、智能体、开源

面向 AI 产品经理和内容创作者的工具集合，包含可运行的前端知识库应用、内容自动化脚本和数据工具。

## 内容规模

| 分类 | 数量 | 说明 |
|---|---|---|
| 提示词 | 193 | 覆盖创作、产品、开发等 14 个职业角色 |
| 技能 | 306 | 从 Claude Code 到跨境电商的全域技能库 |
| 钩子 | 72 | 事件驱动的自动化工作流 |
| MCP | 72 | 模型上下文协议工具 |
| 智能体 | 73 | AI Agent 框架与编排方案 |
| 开源 | 87 | 精选开源项目 |
| **合计** | **803** | **14 个职业角色** |

## 仓库结构

```
ai_pm_library/
├── app/                    # 灵词前端应用（React + Vite + tRPC）
├── draco-content/          # 内容自动化工具集（20+ 独立工具）
├── nexscope/               # 电商数据 SQL 工具
└── docs/                   # 文档与分析报告
```

---

## app/ — 灵词前端应用

**灵词（PromptForge）** 是一个六维分类体系的 AI 知识库，支持全文搜索、角色筛选、内容展开、收藏等功能，内置提示词方法论洞察（TOP188 调教语句 + TOP10 架构模式）。

### 技术栈

| 层 | 技术 |
|---|---|
| 前端框架 | React 19 + React Router 7 |
| 构建工具 | Vite 7 |
| 样式 | Tailwind CSS v3 + shadcn/ui（40+ 组件） |
| API | tRPC v11 + Hono |
| ORM | Drizzle ORM + MySQL2 |
| 类型 | TypeScript 5.9 |

### 页面路由

| 路径 | 内容 |
|---|---|
| `/` | 首页，六维分类入口 + 数据总览 |
| `/prompts` | 提示词库（193条），含方法论洞察模块 |
| `/skills` | 技能库（306条） |
| `/hooks` | 钩子（72条） |
| `/mcp` | MCP 工具（72条） |
| `/agents` | 智能体（73条） |
| `/github` | 开源项目（87条） |

### 快速开始

```bash
cd app
npm install
cp .env.example .env   # 填写 DATABASE_URL 等配置
npm run dev
```

### 可用脚本

```bash
npm run dev        # 开发模式（热重载）
npm run build      # 生产构建
npm run check      # TypeScript 类型检查
npm run lint       # ESLint 检查
npm run test       # 运行测试
npm run db:push    # 推送 schema 到数据库
npm run db:generate  # 生成迁移文件
```

### 环境变量

```bash
APP_ID=          # 应用 ID
APP_SECRET=      # JWT 签名密钥
DATABASE_URL=    # MySQL 连接串（mysql://user:pass@host:port/db）
```

---

## draco-content/ — 内容自动化工具集

面向内容生产、飞书协作、公众号发布、多媒体自动化的独立工具集。每个子目录独立运行，详见 [draco-content/README.md](./draco-content/README.md)。

| 工具 | 功能 |
|---|---|
| `wechat-article-camofox` | 抓取微信公众号文章 → Markdown / 飞书文档 |
| `wechat-article-browseruse` | BrowserUse 云浏览器抓取公众号 |
| `article-to-wechat-cover` | 文章自动生成公众号封面图 |
| `feishu-doc-to-wechat-draft` | 飞书文档转公众号草稿 |
| `daily-ai-agent-aigc-top-news` | 每日 AI / Agent / AIGC 早报自动发布 |
| `news-aggregator-skill` | 抓取 AI 技术新闻候选线索 |
| `ai-news-bitable-archive` | 飞书日报归档到多维表 |
| `epub2podcast` | 电子书转双人中文播客视频 |
| `manim-video` | 数学/算法过程动画视频 |
| `manim-video-with-tts` | Manim + 火山 TTS 中文旁白数学视频 |
| `hyperframes-explainer-video` | HTML + GSAP + TTS 讲解视频全链路 |
| `motion-canvas` | TypeScript 场景动画 / motion graphics |
| `remotion` | React 页面型视频 / 模板化批量视频 |
| `vocabulary-video-pipeline` | 英文单词解释视频（含 TTS 同步） |
| `feishu-seedance-video-pipeline` | Seedance 视频产线（Director + Reviewer） |
| `video-framework-selector` | 视频任务框架选型顾问 |
| `nano-banana-image` | Nano Banana 2 / Gemini Flash 出图 |
| `jimeng-image` | 即梦 / Doubao Seedream 文生图 |
| `feishu-lark-workflows` | 飞书文档 / 云盘 / 多维表自动化 |

---

## nexscope/ — 数据工具

电商数据批量 SQL 脚本，用于向数据库导入跨境电商技能数据。

```
nexscope/
├── ecommerce_batch_1.sql   # 跨境电商技能批次1
├── ecommerce_batch_2.sql   # 跨境电商技能批次2
├── ecommerce_batch_3.sql   # 跨境电商技能批次3
└── ecommerce_batch_4.sql   # 跨境电商技能批次4
```

---

## docs/

- [Prompt 标签方法论深度分析报告](./docs/analysis/prompt_methodology_report.md) — 173个提示词的标签分布、角色矩阵与方法论洞察

---

## 环境要求

- Node.js 20+
- Python 3.10+（draco-content 工具使用）
- MySQL 8.0+（app 数据库）
- Git
