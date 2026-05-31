# 灵词 PromptForge

> 六维分类体系的 AI 知识库 — 提示词、技能、钩子、MCP、智能体、开源

面向 AI 产品经理和内容创作者的工具集合，包含可运行的前端知识库应用、内容自动化脚本和数据工具。

**生产地址：[https://kg.lute-tlz-dddd.top](https://kg.lute-tlz-dddd.top)**

---

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

---

## 仓库结构

```
ai_pm_library/
├── app/                    # 灵词前端应用（React + Vite，static-first catalog）
├── deploy/                 # 生产部署配置（docker-compose + 运维脚本）
├── draco-content/          # 内容自动化工具集（20+ 独立工具）
├── nexscope/               # 电商数据 SQL 工具
├── docs/                   # 文档与分析报告
└── README.md
```

---

## app/ — 灵词前端应用

**灵词（PromptForge）** 是一个六维分类体系的 AI 知识库，支持全文搜索、角色筛选、内容展开、收藏等功能，内置提示词方法论洞察（TOP188 调教语句 + TOP10 架构模式）。

### 技术栈

| 层 | 技术 |
|---|---|
| 前端框架 | React 19 + React Router 7 |
| 构建工具 | Vite 7 + esbuild |
| 样式 | Tailwind CSS v3 + shadcn/ui（40+ 组件） |
| API | Hono + tRPC ping（catalog 生产读取静态 JSON） |
| ORM | Drizzle ORM + MySQL2（仅 DB 工具/迁移路线使用） |
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

### 本地开发

```bash
cd app
npm install
npm run dev            # http://localhost:3000
```

### 可用脚本

```bash
npm run dev          # 开发模式（Vite HMR，端口 3000）
npm run build        # 生产构建（vite build + esbuild API bundle）
npm run check        # TypeScript 类型检查
npm run lint         # ESLint
npm run test         # Vitest
npm run verify       # check + lint + test + build + high audit
npm run start        # 运行生产构建（需先 build）
npm run catalog:export  # 从 staticData 生成 public/catalog/*.json
npm run audit:prod   # 仅生产依赖安全审计
npm run db:push      # 推送 schema 到数据库（Drizzle）
npm run db:generate  # 生成迁移文件
```

### 环境变量

```bash
APP_ID=          # 应用 ID
APP_SECRET=      # JWT 签名密钥（生产用随机 64 位 hex）
DATABASE_URL=    # 可选；仅运行 DB 脚本、迁移或种子导入时需要
```

### 数据源策略

当前生产应用采用 static-first：前端从 `public/catalog/*.json` 读取分类数据，公开 tRPC API 只保留 `ping` 健康检查。旧的 DB-backed catalog read routers 不再挂载到 public `appRouter`。

只有在确实需要后台管理、在线编辑、内容审核或增量发布时，再切换到 DB-backed 路线，并先补齐可回滚 migration、幂等 seed、分页搜索 API、认证授权和审计路径。

### 数据库工具（可选）

```bash
# 1. 推送 schema
npm run db:push

# 2. 导入全量数据（从 staticData 读取）
npx tsx --tsconfig tsconfig.json db/seed-full.ts
```

---

## deploy/ — 生产部署

生产环境运行在腾讯云轻量服务器，独立 Docker Compose 环境，不污染其他应用。

**详见 [deploy/README.md](./deploy/README.md)**

| 文件 | 说明 |
|---|---|
| `docker-compose.yml` | static-first app 容器编排 |
| `deploy.sh` | 一键部署/更新脚本 |
| `.env.prod` | 生产密钥（gitignore，不提交） |
| `secrets.env` | 密钥备份（gitignore，不提交） |
| `nginx-kg-block.conf` | nginx server block 参考 |

**日常更新：**
```bash
cd deploy
./deploy.sh          # 代码更新（不重置数据）
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
├── ecommerce_batch_1.sql
├── ecommerce_batch_2.sql
├── ecommerce_batch_3.sql
└── ecommerce_batch_4.sql
```

---

## docs/

- [Prompt 标签方法论深度分析报告](./docs/analysis/prompt_methodology_report.md) — 173个提示词的标签分布、角色矩阵与方法论洞察

---

## 环境要求

- Node.js 20+
- Python 3.10+（draco-content 工具使用）
- MySQL 8.0+（app 数据库）
- Docker + Docker Compose v2（生产部署）
- Git
