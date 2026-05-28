# 灵词 PromptForge — app

六维分类体系的 AI 知识库前端应用。

## 功能

- 六维分类浏览：提示词（193）/ 技能（306）/ 钩子（72）/ MCP（72）/ 智能体（73）/ 开源（87）
- 全文搜索 + 角色筛选 + 搜索历史 + 热门建议
- 卡片展开查看完整内容，一键复制
- 提示词方法论洞察：TOP188 调教语句 + TOP10 架构模式
- 暗色/浅色自适应主题（CSS 变量）

## 快速开始

```bash
npm install
cp .env.example .env   # 填写 DATABASE_URL
npm run dev            # http://localhost:5173
```

## 脚本

```bash
npm run dev          # 开发模式（Vite HMR）
npm run build        # 生产构建（Vite + esbuild API）
npm run check        # TypeScript 类型检查
npm run lint         # ESLint
npm run test         # Vitest
npm run db:push      # 推送 schema（Drizzle）
npm run db:generate  # 生成迁移文件
npm run start        # 运行生产构建
```

## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | React 19 + React Router 7 |
| 构建 | Vite 7 + esbuild |
| 样式 | Tailwind CSS v3 + shadcn/ui |
| API | tRPC v11 + Hono（Node.js） |
| DB | Drizzle ORM + MySQL2 |
| 类型 | TypeScript 5.9 |

## 目录结构

```
app/
├── api/              # tRPC 路由 + Hono 服务端
│   ├── boot.ts       # 服务启动入口
│   ├── router.ts     # tRPC 根路由
│   ├── prompts-router.ts
│   ├── skills-router.ts
│   └── workflows-router.ts
├── db/               # Drizzle schema + seed
├── scripts/          # 一次性数据导入脚本
├── src/
│   ├── components/   # 页面组件（CardGrid, SearchBar, PageHero, PromptAnalytics…）
│   ├── components/ui/ # shadcn/ui 组件库（40+）
│   ├── data/         # 静态数据（staticData.ts, promptAnalytics.ts…）
│   ├── pages/        # 路由页面
│   ├── hooks/        # 自定义 hooks
│   ├── providers/    # tRPC provider
│   └── types/        # 类型定义
└── public/           # 静态资源
```

## 环境变量

```bash
APP_ID=           # 应用 ID
APP_SECRET=       # JWT 签名密钥
DATABASE_URL=     # MySQL 连接串（mysql://user:pass@host:port/db）
```
