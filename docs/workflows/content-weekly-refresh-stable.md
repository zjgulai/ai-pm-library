---
title: 每周高质量内容检索、增量更新与部署验证流程
doc_type: workflow
module: content
topic: weekly-refresh
status: stable
created: 2026-06-02
updated: 2026-08-03
owner: self
source: human+ai
---

# 每周高质量内容检索、增量更新与部署验证流程

## 目标

每周为 PromptForge 六大类内容补充一批高质量、可复核、可执行的新内容，并形成从网络检索、候选评分、增量入库、本地验证、Git 远端同步、腾讯云轻量服务器部署到线上 smoke 的完整闭环。

默认策略是“小批量高置信 + 可扩展 loop”：常规迭代每类先补 2 条；用户要求扩容时执行 50 个检索 loop，按质量评分和去重结果增量入库。

六大类：

- `prompt`: 可直接复用的提示词模板
- `skill`: 可迁移到 AI coding agent / 产品工作流的技能
- `hook`: 可自动执行或约束 agent 行为的生命周期钩子
- `mcp`: 可连接外部系统、数据或安全能力的 MCP 工具
- `agent`: 可作为智能体设计参考的架构、模型或工作流
- `github`: 可被团队评估或采用的开源项目

## 迭代总览

每轮迭代必须按以下顺序执行，禁止跳过质量门禁直接部署：

| 阶段 | 名称 | 核心产出 | 通过标准 |
| --- | --- | --- | --- |
| E0 | 状态恢复 | 当前生产入口、Git 状态、内容规模、检索窗口 | 确认生产入口为 `https://kg.lute-tlz-dddd.top/`，工作树风险明确 |
| E1 | 检索设计 | 六大类关键词、来源矩阵、loop 配额 | 每类至少覆盖 T1/T2 来源和 GitHub 活跃源 |
| E2 | 采集执行 | 候选池 JSON 或审计记录 | 候选包含来源、时间、类别、评分依据 |
| E3 | 质量评估 | 入库候选清单 | 低于 75 分淘汰，硬性拒绝项不得入库 |
| E4 | 增量入库 | `catalogSource.json`、catalog JSON、计数元数据 | 六大类计数一致，来源可追溯 |
| E5 | 本地深度检查 | 测试、构建、Docker、local smoke 证据 | `npm run verify` 和本地 smoke 通过 |
| E6 | Git 同步 | 原子提交和远端分支 | 无密钥、无临时产物、远端分支可追溯 |
| E7 | 腾讯云轻量部署 | 远端备份、app-only 部署、生产 smoke | 只触碰 `promptforge_app`，不污染同机服务 |
| E8 | 线上验收 | 线上内容计数、E2E 报告、残余风险 | 生产 counts 与本地一致，smoke 通过，风险归档 |

## E0 状态恢复

开始每轮工作前先确认事实，不使用旧记忆替代 live state：

```bash
git status --short --branch
git log --oneline --decorate -n 8
git remote -v
```

必须确认：

- 当前 PromptForge 生产入口是 `https://kg.lute-tlz-dddd.top/`。
- `person.lute-tlz-dddd.top` 不作为 PromptForge 生产入口。
- 当前内容规模来自 `app/public/catalog/*.json` 和 `app/src/data/catalogMeta.ts`，不能只看 README。
- `ai_video.pem`、`deploy/.env.prod`、`deploy/secrets.env` 不得进入 Git。

如果 `git remote -v` 显示内嵌 GitHub token，先改用 SSH remote 或系统凭据管理器，并轮换已暴露 token。禁止把 token 写入日志、文档或 issue。

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
- 去重检查：入库前搜索 `app/src/data/catalogSource.json` 中的 title、source URL 和核心关键词，避免近似重复。

## 50 个 loop 执行法

当用户要求扩大最新一周内容覆盖时，执行 50 个 loop。一个 loop 是一次独立、可复核的检索任务，必须记录查询意图、来源、候选和拒绝理由。

推荐配额：

| 类别 | 最低 loop | 重点 |
| --- | ---: | --- |
| `prompt` | 8 | 官方模型能力、agent use-case、评估/迁移/成本模板 |
| `skill` | 8 | AI coding skill、团队规范、工作流封装、跨工具迁移 |
| `hook` | 8 | 安全门禁、命令拦截、测试后置、证据采集 |
| `mcp` | 8 | MCP server、权限隔离、安全扫描、数据连接 |
| `agent` | 8 | agent 架构、sandbox、memory、evaluation、workflow |
| `github` | 8 | 最近 push/release 的可用开源项目 |
| 机动 | 2 | 分配给高信号类别或补足证据链 |

每个 loop 的最小记录字段：

- `loopId`
- `category`
- `query`
- `sourceTier`
- `sourceUrl`
- `publishedOrUpdatedAt`
- `candidateTitle`
- `whyRelevant`
- `qualityScore`
- `decision`: `accept`、`reject` 或 `defer`
- `rejectReason` 或 `deferReason`

候选报告属于一次性中间产物，默认写入 `tmp/outputs/`，例如 `tmp/outputs/content-refresh-50-loop-candidates-YYYYMMDDHHMMSS.json`。

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

硬性拒绝项：

- 无法定位主来源页面。
- 只有社区转述，没有官方、仓库、规范或可运行项目证据。
- 与现有内容只是标题改写或用途重复。
- 来源疑似广告、软文或无法判断维护者。
- GitHub 项目缺少 license 且需要实际采用。
- 内容不能转化成模板、流程、检查清单或工具评估。

高质量候选必须回答四个问题：

1. 它解决六大类中的哪个具体问题。
2. 它为什么属于最近一周的新增或更新信号。
3. 它比现有库中的近似内容新增了什么能力。
4. 它如何被用户直接执行、迁移或评估。

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
4. 更新 `app/src/data/catalogSource.json` 的 `prompts_full` 和 `skills_full`。
5. 更新 `app/src/data/catalogMeta.ts` 和 `app/src/data/dataUtils.test.ts` 的计数。
6. 运行 `npm run catalog:generate` 重新生成 `app/public/catalog/*.json`。
7. 更新 `README.md` 的当前内容规模。
8. 更新本工作流的本轮执行记录。
9. 执行本地深度检查和部署前门禁。

## E5 部署前深度检查

部署前必须完成以下检查，任何失败都先修复再部署：

```bash
git status --short --branch
git check-ignore -v ai_video.pem deploy/.env.prod deploy/secrets.env

cd app
npm run verify
npm run smoke:e2e
```

Docker 生产形态检查：

```bash
cd deploy
docker compose config --services

cd ../app
docker build --target production -t promptforge-app:predeploy .
```

预期：

- `docker compose config --services` 只输出 `app`。
- `npm run verify` 包含 TypeScript、ESLint、docs、Vitest、build 和 high audit。
- `npm run smoke:e2e` 覆盖生产 HTML/assets、favicon、catalog JSON、只读 tRPC、全路由、`/skills` 交互、桌面/移动端 overflow 和 console error。
- 本地 catalog count 与 `catalogMeta.ts`、README、本轮入库记录一致。

## E6 Git 远端同步计划

默认顺序是“本地门禁通过后先 push，再部署”。原因是生产部署来自本地 rsync，先 push 能保证生产版本可被远端仓库追溯。

执行规则：

1. `git status --short` 必须只包含本轮预期文件。
2. 禁止 stage `tmp/`、`.env.prod`、`secrets.env`、`*.pem`、截图和候选中间产物，除非它们本来就是被忽略文件。
3. 提交信息用中文，描述为什么。
4. 推送当前分支到 `origin`。
5. 如果远端 URL 内嵌 token，先改为 SSH remote 或凭据管理器，不直接继续 push。

推荐命令：

```bash
git diff --check
git add README.md app/src/data/catalogSource.json app/src/data/catalogMeta.ts app/src/data/dataUtils.test.ts app/public/catalog docs/workflows/content-weekly-refresh-stable.md
git commit -m "增量更新最新一周内容并固化验证证据"
git push origin HEAD
```

如果本轮只更新文档，按实际文件收窄 `git add` 范围。

## E7 腾讯云轻量服务器部署计划

目标服务器：

- 主机：`101.34.52.232`
- 用户：`ubuntu`
- PromptForge 域名：`https://kg.lute-tlz-dddd.top/`
- app 容器：`promptforge_app`
- nginx 容器：`ai_video_nginx`
- 共享网络：`lighthouse_ai_video_net`

部署前远端只读检查：

```bash
ssh -i ~/.ssh/promptforge_ai_video.pem ubuntu@101.34.52.232 \
  'docker ps --format "{{.Names}}\t{{.Status}}\t{{.Networks}}" | grep -E "^(promptforge_app|promptforge_mysql|ai_video_nginx)\b" || true'
```

必须确认：

- `promptforge_app` 和 `ai_video_nginx` 在 `lighthouse_ai_video_net`。
- 旧 `promptforge_mysql` 如果存在，只保留在 `promptforge_net`，不得在日常部署中删除。
- 当前 compose 服务集是 app-only。

部署前备份：

```bash
ssh -i ~/.ssh/promptforge_ai_video.pem ubuntu@101.34.52.232 \
  'ts=$(date +%Y%m%d%H%M%S); mkdir -p /opt/promptforge/.deploy-backups/$ts && tar -czf /opt/promptforge/.deploy-backups/$ts/promptforge-current-app-compose-env.tar.gz -C /opt promptforge/docker-compose.yml promptforge/.env.prod 2>/dev/null || true'
```

执行部署：

```bash
cd deploy
PROMPTFORGE_SSH_KEY=~/.ssh/promptforge_ai_video.pem ./deploy.sh --smoke
```

禁止事项：

- 不使用 `--remove-orphans`。
- 不删除 `promptforge_mysql`、`promptforge_net` 或 volume。
- 不改宿主 nginx 其他域名配置，除非本轮目标就是宿主页或域名路由。

## E8 部署后验证

部署完成后执行三层验证。

第一层：容器和网络边界。

```bash
ssh -i ~/.ssh/promptforge_ai_video.pem ubuntu@101.34.52.232 '
docker ps --format "{{.Names}}\t{{.Status}}\t{{.Networks}}" | grep -E "^(promptforge_app|promptforge_mysql|ai_video_nginx)\b" || true
docker inspect --format "{{json .State.Health}}" promptforge_app
docker exec promptforge_app node -e "fetch(\"http://127.0.0.1:3000/api/trpc/ping?batch=1&input=%7B%7D\").then(async r=>{const t=await r.text(); console.log(r.status,t.includes(\"ok\")); if(!r.ok||!t.includes(\"ok\")) process.exit(1)})"
docker exec ai_video_nginx sh -lc "curl -fsS \"http://promptforge_app:3000/api/trpc/ping?batch=1&input=%7B%7D\" | grep -q \"\\\"ok\\\":true\""
docker exec ai_video_nginx nginx -t
stat -c "%a %n" /opt/promptforge/.env.prod
'
```

第二层：公网 API 和内容规模。

```bash
cd app
npm run smoke:e2e:prod
```

同时抽查：

- `/catalog/prompt.json`
- `/catalog/skill.json`
- `/catalog/hook.json`
- `/catalog/mcp.json`
- `/catalog/agent.json`
- `/catalog/github.json`
- `/api/trpc/ping?batch=1&input=%7B%7D`
- `/api/trpc/prompts.list?batch=1&input=%7B%7D` 应返回 `404 NOT_FOUND`

第三层：共宿主域名不回归。

必须验证：

- `https://kg.lute-tlz-dddd.top/`
- `https://lute-tlz-dddd.top/`
- `https://video.lute-tlz-dddd.top/`
- `https://mkt.lute-tlz-dddd.top/`
- `https://voc.lute-tlz-dddd.top/`
- `https://person.lute-tlz-dddd.top/`

其中 `voc` 返回登录跳转属于预期；不要把 `200 + fallback page` 当成功，必须检查内容或 smoke 断言。

## 回滚策略

当前部署脚本使用 rsync 同步本地代码，远端不保留 Git 历史。回滚优先级：

1. 本地 Git 切回上一稳定提交后重新部署。
2. 使用本轮远端备份恢复 compose/env。
3. 如果 app 容器启动失败，先停止新容器并恢复上一版镜像或上一稳定本地提交。

旧 DB 归档不属于内容刷新迭代。任何停止或删除旧 MySQL、网络、volume 的行为必须单独备份、单独确认。

## 迭代完成定义

一轮内容刷新与部署迭代只有同时满足以下条件才算完成：

- 候选来源和拒绝理由可追溯。
- 入库内容均超过 75 分且无硬性拒绝项。
- 六大类 catalog JSON、元数据计数、README 计数一致。
- 本地 `npm run verify` 通过。
- 本地或生产形态 `npm run smoke:e2e` 通过。
- Git 远端分支已同步或明确记录未同步原因。
- 腾讯云轻量服务器部署完成且生产 smoke 通过。
- 线上内容规模与本地一致。
- 共宿主域名未被污染。
- 残余风险写入进度或正式文档。

## 本轮 2026-06-02 执行记录

第一阶段采用“小批量高置信”策略，入库 12 条：

- `prompt`: 2 条，聚焦 agent use-case gate、模型/记忆/成本迁移决策。
- `skill`: 2 条，聚焦 agent skill 供应链和跨工具规则同步。
- `hook`: 2 条，聚焦 destructive command guard 和编辑后证据门禁。
- `mcp`: 2 条，聚焦 MCP 安全扫描和 no-code automation MCP 工具评估。
- `agent`: 2 条，聚焦 sandboxed agents 和 Opus 4.8 dynamic workflows。
- `github`: 2 条，聚焦 TypeScript AI SDK 与 agent configuration lint。

第二阶段按用户要求执行 50 个检索 loop：

- 检索窗口：`2026-05-26` 到 `2026-06-02`。
- 候选报告：`tmp/outputs/content-refresh-50-loop-candidates-20260602021120.json`。
- 完成 loop：50。
- 唯一候选：257。
- 通过 75 分门槛候选：220。
- 最终入库：30 条，每类 5 条。

本轮总增量为 42 条，最终内容规模为 845 条：

- `prompt`: 200
- `skill`: 313
- `hook`: 79
- `mcp`: 79
- `agent`: 80
- `github`: 94

本轮不采纳纯社区讨论，不采纳无法定位到来源页面的二手汇总，不采纳与现有内容用途重复的候选。

## 本轮 2026-06-02 工作流测试执行记录

本轮用于验证 E0-E8 完整迭代工作流，采用“最小完整增量”策略，每类入库 1 条，共 6 条。

检索与候选：

- 检索窗口：`2026-05-26` 到 `2026-06-02`。
- 候选报告：`tmp/outputs/content-refresh-workflow-test-candidates-20260602154500.json`。
- 入库策略：每类选择 1 条未重复、高可执行性、近一周有 GitHub push 信号的候选。
- 去重拒绝：`TanStack/ai`、`Meirtz/Awesome-Context-Engineering`、`mauhpr/agentlint`、`rohitg00/pro-workflow` 已存在或近似存在，未重复入库。

新增内容：

- `prompt`: AgentEval 评估设计提示词。
- `skill`: Agent Skill Creator 跨工具技能资产化流程。
- `hook`: Probity 过程纪律 Hook。
- `mcp`: FastMCP Pythonic MCP 服务构建评估。
- `agent`: Learn Claude Code Nano Agent Harness 拆解模板。
- `github`: Vercel Workflow SDK TypeScript 持久化 AI 工作流。

本节为 2026-06-02 历史执行记录，当时本轮增量后内容规模为 851 条：

- `prompt`: 201
- `skill`: 314
- `hook`: 80
- `mcp`: 80
- `agent`: 81
- `github`: 95

## 本轮 2026-07-08 高赞 GitHub 仓库增量记录

本轮采用“近 7 天高赞 GitHub 仓库作为主信源”的小批量高置信策略。

检索与候选：

- 检索窗口：`2026-07-01` 到 `2026-07-08`。
- 主信源：GitHub weekly trending、GitHub Search API `created:>=2026-07-01`、`pushed:>=2026-07-01`、`topic:ai`、`topic:mcp`。
- 候选报告：`tmp/outputs/github-weekly-candidates-20260708160500.json`。
- README 证据片段：`tmp/outputs/github-readmes-20260708/`。
- 入库策略：只收录有明确 GitHub 仓库主页、README、license、近 7 天 pushed 或 created 信号，且能转成 PromptForge 可执行模板/评估卡的候选。

新增内容：

- `prompt`: 1 条，聚焦 Strix 风格的 AI 安全评估与修复闭环。
- `skill`: 2 条，聚焦 Astryx agent-ready design system 复用与 .NET agent skills 资产化。
- `hook`: 1 条，聚焦 Codex Plugin CC 跨代理代码审查门禁。
- `mcp`: 1 条，聚焦 Chrome DevTools MCP 浏览器调试接入评估。
- `agent`: 3 条，聚焦 Page Agent GUI 操作验收、Orca 多 agent fleet 编排、Speech-to-Speech 本地语音 agent 试点。
- `github`: 4 条，聚焦 OpenScience、video-use、Claude Skills & Plugins、AI Job Search。

本轮拒绝或暂缓内容：

- `system_prompts_leaks`: 涉及泄露/提取系统提示词主题，不作为本站正式知识资产。
- `TencentCloud/CubeSandbox`、`herdr`: 主题相关但 GitHub API license 为 `NOASSERTION`，本轮暂缓。
- `OmniRoute`: provider routing 和成本权限边界较重，证据不足时不入库。
- 健身数据集、投资研究框架、成熟图片管理工具等与本轮 AI PM / agent / MCP 主线弱相关，未入库。

本轮增量后内容规模为 864 条：

- `prompt`: 203
- `skill`: 316
- `hook`: 81
- `mcp`: 81
- `agent`: 84
- `github`: 99

## 本轮 2026-07-18 近 30 天高质量内容增量记录

本轮按用户指定把常规 7 天窗口扩展为最近 30 天，检索窗口为 `2026-06-18` 到 `2026-07-18`。只采用 T1 官方公告、官方 changelog、标准组织公告，以及具备明确许可证和近期维护信号的 T2 官方仓库。

### 项目框架与发布链路复核

本轮先在隔离副本运行 Understand Anything 的扫描、导入图和领域分析，避免在真实工作区产生 `.ua/` 中间产物：

- 扫描范围：`app/`，共 158 个文件；主动排除 secrets、数据库、构建产物、`tmp/` 和已生成的 `public/catalog/*`。
- 导入关系：93 个文件存在 import，识别 144 条内部依赖边。
- 领域图：4 个业务域、9 条关键流程、43 个步骤；标准 schema 校验通过，0 个 issue。
- 架构结论：六个分类共享同一个 `catalogSource.json` 内容模型和同一条生成发布链路；前端按分类懒加载静态 JSON，公开 API 仍保持只读边界，未挂载旧的 DB-backed catalog 路由。

因此本轮只增量修改内容源、六类计数、生成目录和说明文档，不触碰数据库 schema、写 API、部署配置或生产环境。

### 候选评分与入库

| 类别 | 入库主题 | 主来源 | 评分 |
| --- | --- | --- | ---: |
| `prompt` | 长时程 Agent 委派契约 | OpenAI · 2026-06-25 | 92 |
| `prompt` | 团队频道 AI 委派 | Anthropic · 2026-06-23 | 93 |
| `skill` | 并行 Agent 工作分解与成本核算 | GitHub · 2026-07-08 | 91 |
| `skill` | AI 使用反思与原创思维边界 | Anthropic · 2026-07-09 | 88 |
| `hook` | 浏览器 Agent 权限与网络域名前置 | GitHub · 2026-07-01 | 92 |
| `hook` | AI 安全审查发布门禁 | GitHub · 2026-07-14 | 94 |
| `mcp` | Enterprise-Managed Authorization | MCP · 2026-06-18 | 95 |
| `mcp` | 2026-07-28 SDK Beta 迁移验收 | MCP · 2026-06-29 | 93 |
| `agent` | 可审计科研 Agent 工作台试点 | Anthropic · 2026-06-30 | 92 |
| `agent` | 多 Agent Provider 权限一致性验收 | GitHub · 2026-07-07 | 91 |
| `github` | Understand Anything 评估卡 | Egonex-AI · 2026-07-17 | 94 |
| `github` | MCP Python SDK v2 Beta 评估卡 | MCP Python SDK · 2026-07-14 | 92 |

12 条内容使用 12 个不同的主来源 URL，入库前已按标题、source URL 和用途执行去重；每类 2 条，均高于 75 分门槛。

本轮暂缓：

- MCP TypeScript SDK：主分支仍标为 v2 pre-alpha，且 GitHub API license 为 `NOASSERTION`，不作为本轮开源采用候选。
- MCP Go SDK、C# SDK：虽有近期 push，但 GitHub API license 为 `NOASSERTION`，按硬性门禁暂缓。
- MCP Java SDK：许可证明确，但最近 release 不在本轮 30 天窗口内，未挤占高置信名额。
- 二手新闻、社区讨论和没有主来源页面的汇总全部拒绝。

本轮增量后本地内容规模为 876 条：

- `prompt`: 205
- `skill`: 318
- `hook`: 83
- `mcp`: 83
- `agent`: 86
- `github`: 101

### 本地验证证据

- Understand Anything core：`pnpm --filter @understand-anything/core build` 通过；`pnpm --filter @understand-anything/core test` 为 46 个测试文件、963 个测试全部通过。
- 领域图 schema：56 个节点、56 条边，`validateGraph` 返回 `success: true`、0 个 issue。
- `npm run verify`：TypeScript check、ESLint、catalog contract、49 个 Markdown 文档治理与链接检查、10 个 Vitest 文件共 36 个测试、Vite/API build、`npm audit --audit-level=high` 全部通过；高危漏洞为 0。
- 本地 `npm run smoke:e2e`：10 项通过、1 项跳过、0 项失败；六类静态目录总数为 876，桌面与移动端路由、搜索、筛选、展开、复制、只读 tRPC 边界和浏览器 console 均通过。
- 跳过项仅为生产共宿主域名检查，因为本轮 smoke 目标是 `127.0.0.1`；未把本地 smoke 误报为生产验收。

本节只记录本地 E0-E5 工作；未执行 commit、push、deploy、生产写入或外部发送，E6-E8 保持未执行。

## 本轮 2026-07-20 二次近 30 天增量记录

本轮按用户“再做一次”的要求，在上一轮未提交的 876 条本地状态上继续增量；检索窗口为 `2026-06-20` 到 `2026-07-20`。候选池保存在忽略目录 `tmp/outputs/tmp-content-refresh-30day-candidates-20260720-u2.json`，未加入正式资产。

### Understand Anything 安装与项目复核

- 上游仓库已迁移为 `Egonex-AI/Understand-Anything`；本轮固定到 commit `5c3bc1b7fdefd17b19b44420e89d279ded21dce8`，归档 SHA-256 为 `6c39e12f09dfb9bf3324db98ba94ac36720233a384e557868aaaff03e438b08f`。
- 通过 Codex 官方 skill installer 安装 `understand`、`understand-chat`、`understand-dashboard`、`understand-diff`、`understand-domain`、`understand-explain`、`understand-figma`、`understand-knowledge`、`understand-onboard` 九个入口。
- 上游 core build 通过；46 个测试文件共 967 个测试通过。Codex 原生复制目录能被发现，但运行带依赖的脚本时使用 universal plugin root，以保证 `graphology` 等 workspace 依赖可解析。
- 在包含当前脏工作树内容的隔离 `app/` 快照执行分析，主动排除 secrets、数据库、大体积目录 JSON 与临时产物：扫描 156 个文件，识别 144 条内部 import。
- 合并图为 523 个节点、845 条边；语义复核将 `promptAnalyticsData.json` 的节点类型从错误预期的 `file` 对齐到已有 `config` 节点，并恢复 1 条被丢弃的 import。最终确定性校验为 0 issue、22 个无边孤立节点 warning。
- 识别 9 层：UI、前端数据与状态、API、数据与契约、内容自动化工具、测试与验收、配置与构建、基础设施、文档；生成 12 步中文导览。
- 图谱副本保存在忽略目录 `tmp/outputs/tmp-understand-knowledge-graph-20260720-u2.json`，SHA-256 为 `f6c13eb1f791582a2e8af8f5b406b38f0d44284f389fb57a8c2c2855c41ab2e2`。

架构事实保持不变：`catalogSource.json` 是内容单一来源；生成脚本拆成六类静态 JSON 与 manifest；React 页面按类别懒加载，筛选、搜索和卡片交互在前端完成；公开 Hono/tRPC 只保留 `ping`，Drizzle schema、seed 和 migration 属于预留/离线数据链路，未暴露生产写入口。

### 候选评分与入库

| 类别 | 入库主题 | 主来源 | 评分 |
| --- | --- | --- | ---: |
| `prompt` | GPT-5.6 模型与推理档位路由 | OpenAI · 2026-07-09 | 94 |
| `prompt` | ChatGPT Work 跨应用长任务委派 | OpenAI · 2026-07-09 | 93 |
| `skill` | Coding Agent 产品化反馈环 | Anthropic · 2026-07-06 | 87 |
| `skill` | 仓库级 AI 编码效能度量 | GitHub · 2026-07-17 | 92 |
| `hook` | Copilot Code Review 环境前置 | GitHub · 2026-07-17 | 95 |
| `hook` | Agent OpenTelemetry 治理 | GitHub · 2026-07-08 | 94 |
| `mcp` | MCP Tasks 长时程操作实验评估 | MCP 官方组织 · 2026-07-15 | 88 |
| `mcp` | Skills Over MCP 分发扩展评估 | MCP 官方组织 · 2026-07-17 | 89 |
| `agent` | Code Scanning Agentic Autofix 处置 | GitHub · 2026-07-10 | 94 |
| `agent` | 仓库概览与新贡献者引导 | GitHub · 2026-07-09 | 86 |
| `github` | Google Workspace CLI 评估 | googleworkspace · 2026-07-17 | 91 |
| `github` | brain0 决策图与溯源评估 | Brain0-ai · 2026-07-19 | 84 |

12 条内容使用 12 个不同的主来源 URL，并与现有内容执行 URL、标题和用途去重。另把既有 Understand Anything 评估卡的固定 commit、近期维护信号和活跃度更新到本轮实测状态。

本轮增量后本地内容规模为 888 条：

- `prompt`: 207
- `skill`: 320
- `hook`: 85
- `mcp`: 85
- `agent`: 88
- `github`: 103

### 本地验证证据与边界

- `npm run verify` 最终通过：TypeScript、ESLint、catalog contract、49 个 Markdown 文档治理与链接检查、10 个 Vitest 文件共 36 个测试、Vite/API build、high audit 全部通过；高危漏洞为 0。首次运行发现更新已有条目后 `github.json` 过期，重新生成静态目录后同路径复测通过。
- `npm run smoke:e2e` 在启动本地生产构建后为 10 项通过、1 项跳过、0 项失败；六类目录总数 888，桌面/移动路由、搜索、筛选、展开、复制、只读 tRPC 和 console 均通过。首次运行因未启动 `127.0.0.1:3000` 全部连接拒绝，启动服务后原样复测通过。
- `docker compose config --services` 只输出 `app`。
- Docker production image 未形成通过证据：第一次从错误的 `deploy/` 目录构建找不到 Dockerfile；改到正确的 `app/` 后，Docker daemon 访问 `mirror.ccs.tencentyun.com` 获取 `node:20-alpine` metadata 时返回 `EOF`，本机也没有该基础镜像缓存。未修改镜像源或基础镜像来掩盖环境失败。
- 未执行 commit、push、deploy、生产 smoke、生产写入或外部发送；E6-E8 保持未执行。

## 本轮 2026-07-22 三次近 30 天高质量增量记录

本轮在上一轮未提交的 888 条本地状态上继续增量；检索窗口为 `2026-06-22` 到 `2026-07-22`。候选池保存在忽略目录 `tmp/outputs/tmp-content-refresh-30day-candidates-20260722-u3.json`，未加入正式资产。

### Understand Anything 来源校正与项目复核

- 发现既有展开包版本虽为 `2.9.4`，但 `install.sh` 仍指向旧 `Egonex-AI` 来源且安装目录缺少 `.git`，不能形成可追踪更新证据。
- 本轮从 `Lum1104/Understand-Anything` 官方仓库重新安装 Codex 核心技能，固定 HEAD `6ae71878beb50226a1e4b7e2f52ac6468c86f74b`，包版本 `2.9.4`；官方 clone 位于 `~/.understand-anything/repo`，旧展开包保存在 `~/.understand-anything/repo-backup-20260722T1722`。
- 官方 clone 执行 `pnpm install --frozen-lockfile` 与 `pnpm --filter @understand-anything/core build` 通过；Node.js `v22.22.0`、pnpm `10.6.2`。安装过程提示 Kotlin tree-sitter build script 未获批准，但 core TypeScript build 不受影响。
- 复用上一轮图谱副本作为架构导航：523 个节点、845 条边、9 个架构层、12 步中文导览。该图谱基线为 commit `d0b9f73`，不是当前 `37d7ca3` 的新鲜图谱，因此本轮只把它用于导航，并用当前源码、内容生成脚本和测试重新核验实际链路。
- 当前事实仍是 `catalogSource.json` 单一来源，经 `generate-catalog.mjs` 拆成六类静态 JSON 与 manifest；React 按分类加载并完成搜索、筛选、收藏和展开；公开 Hono/tRPC 只保留只读 `ping`，Drizzle 仍属于预留/离线链路。
- 正式 `.ua/` 分析目录当前不存在。全量重建会先生成并要求人工确认 `.understandignore`，本轮没有绕过该门禁，也未把旧图谱写成当前图谱。

### 候选评分与入库

| 类别 | 入库主题 | 主来源 | 评分 |
| --- | --- | --- | ---: |
| `prompt` | 多模态界面验收与视觉证据 | GitHub · 2026-07-01 | 91 |
| `prompt` | 高能力 Cyber Agent 评测环境威胁建模 | OpenAI · 2026-07-21 | 96 |
| `skill` | 企业 Agent 会话审计与 SIEM 接入 | GitHub · 2026-07-02 | 94 |
| `skill` | Agent 单会话 AI Credits 预算治理 | GitHub · 2026-07-01 | 92 |
| `hook` | Copilot 托管设置完整性前置 | GitHub · 2026-07-08 | 96 |
| `hook` | GitHub Actions Copilot CLI 无 PAT 门禁 | GitHub · 2026-07-02 | 95 |
| `mcp` | Open Connector 多 SaaS Agent 网关 | `oomol-lab/open-connector` · 3071 stars | 92 |
| `mcp` | MCP Interceptors 实验扩展 | MCP 官方组织 · 23 stars | 84 |
| `agent` | Shepherd 可回放 Agent 执行监督 | `shepherd-agents/shepherd` · 1519 stars | 92 |
| `agent` | LLM Space 本地 Agent 调试评测 | `deer-flow/llm-space` · 1164 stars | 89 |
| `github` | grok-build Coding Agent Harness | `xai-org/grok-build` · 21615 stars | 97 |
| `github` | OpenWiki Agent 代码库知识维护 | `langchain-ai/openwiki` · 12837 stars | 96 |

Stars 为 2026-07-22 GitHub API 快照，不能单独证明成熟度。`JustVugg/colibri` 虽有 17695 stars，但主题偏超大模型推理运行时，与当前 AI PM / Agent 工作流主线弱，本轮暂缓；`experimental-ext-server-card` 仅 4 stars 且 SEP 仍为 Draft，也未占用 MCP 名额。

本轮增量后本地内容规模为 900 条：

- `prompt`: 209
- `skill`: 322
- `hook`: 87
- `mcp`: 87
- `agent`: 90
- `github`: 105

### 本地验证证据与边界

- 首次 `npm run verify` 在 `npm audit --audit-level=high` 发现 2 个 high（`brace-expansion`、`fast-uri`）和 2 个 moderate。`npm audit fix --dry-run` 证明 high 可用非强制传递依赖更新消除，随后通过 npm 将 4 个 lockfile 项更新到 `brace-expansion` 1.1.16/2.1.2 和 `fast-uri` 3.1.4。
- 更新后 `npm run verify` 全部通过：TypeScript check、ESLint、catalog contract、49 个 Markdown 文档治理与链接检查、10 个 Vitest 文件共 36 个测试、Vite/API build 和 high audit 均为绿。
- `npm audit --omit=dev --audit-level=high` 退出码为 0；生产依赖仍报告 `@hono/node-server` 的 1 个 moderate。自动修复需要跨 major 到 2.x，本轮不使用 `--force`。
- 本地生产构建启动后，`npm run smoke:e2e` 为 11 项通过、1 项跳过、0 项失败；报告为 `tmp/outputs/smoke-e2e-report-20260722094004.json`。跳过项仅是本地 `127.0.0.1` 不执行生产共宿主域名检查。
- `docker build --network=host --target production -t promptforge-app:predeploy app` 通过，镜像 ID 为 `sha256:3fade894f9d294a5819e69f6ef49c569a7e102c77e41aa121c3c8ccfe1a71572`；容器内 manifest 总量为 900，六类计数与本地一致。首次默认网络构建在 `npm ci` 长时间无进展后被终止，未改镜像源或 Dockerfile。
- `git diff --check` 通过；`bash -n deploy/deploy.sh` 通过；`docker compose config --services` 在 `deploy/` 只输出 `app`。

### Commit、Push、Deploy 与生产发布 TODO

发布目标是把上述 900 条 static-first catalog 作为一个可追踪版本推送到 `origin/main`，随后只重建并替换 `promptforge_app`，不操作旧 `promptforge_mysql`、`promptforge_net`、volume、共享 nginx 配置或其他同机服务。

- [x] 校验 `DDDD.pem` 存在、权限为 `600`、被 `*.pem` 忽略；只使用指纹核验，不记录密钥正文。
- [x] 校验 Git remote 为无内嵌 token 的 `https://github.com/zjgulai/ai-pm-library.git`，远端 `main` 与本地基线同为 `37d7ca3`。
- [x] 完成本地 `verify`、production Docker build、local smoke、Compose app-only 和 secret ignore 门禁。
- [x] 生产只读盘点：`promptforge_app` 与 `ai_video_nginx` 在 `lighthouse_ai_video_net` 且 healthy；旧 `promptforge_mysql` 在 `promptforge_net` 且保持不动；远端 Compose 仅有 `app`；`.env.prod` 为 `600`。
- [x] 精确 stage 本轮 14 个正式文件，排除 `DDDD.pem`、`tmp/`、截图、候选 JSON 和用户草稿。
- [x] 创建中文原子 commit `66de531dede2a216ea5ecc9e7ab47b61025bb9bf` 并 push 到 `origin/main`；远端 SHA 与本地一致。
- [x] 在 `/opt/promptforge/.deploy-backups/20260722174415-66de531-content-release` 创建部署前备份与容器清单；旧镜像保留为 `promptforge_app:rollback-20260722174415-66de531`。
- [x] 使用根目录 `DDDD.pem` 执行 `deploy.sh --smoke`，只重建并替换 `promptforge_app`；production smoke 12 项全部通过，报告为 `tmp/outputs/smoke-e2e-report-20260722094840.json`。
- [x] 独立 E8 通过：新镜像 `sha256:fb8624c5d6b291e6022452ac590f52064fe477c5058802a239db54c70aa3dd7d` healthy；容器内 ping 为 200；nginx 到 app、`nginx -t`、env `600` 和 app-only Compose 均通过。
- [x] 线上六类计数为 209/322/87/87/90/105，总计 900；新增 GitHub ID `1307490`、`1307491` 可读取；legacy router 保持 `404 NOT_FOUND`。

共宿主验收结果：`kg`、根域名、`video`、`mkt`、`person` 均为 200；`voc` 为预期的 302 登录跳转。旧 `promptforge_mysql` 始终保持 healthy 且仅在 `promptforge_net`，未删除或重启任何 DB 容器、网络或 volume，也未修改共享 nginx 配置。

## 本轮 2026-08-01 四次近 30 天高质量增量记录

本轮在已发布的 900 条基线上继续增量；检索窗口为 `2026-07-01` 到 `2026-08-01`。候选池保存在忽略目录 `tmp/outputs/tmp-content-refresh-30day-candidates-20260801-u4.json`，未加入正式资产。

### Understand Anything 与当前架构边界

- 当前 Codex 可发现 `lum1104/Understand-Anything` 的 `understand` 核心技能，官方 clone 仍位于 `~/.understand-anything/repo`，core build 产物存在。
- 本项目没有正式 `.ua/` 图谱；按该技能规则，全量分析必须先生成并由用户确认 `.understandignore`。本轮没有绕过确认门禁，也没有把旧快照标成当前图谱。
- 结合上一轮图谱导航和当前源码复核，canonical 内容源仍为 `app/src/data/catalogSource.json`；`generate-catalog.mjs` 生成六类静态 JSON 与 manifest，React 前端按类别加载，公开 Hono/tRPC 仍只暴露只读 `ping`。
- 因而本轮继续采用 static-first 增量：只修改内容源、计数、派生目录、测试预期和发布记录；不启用 Drizzle/seed/migration，不增加 DB-backed 写 API。

### 候选评分与入库

| 类别 | 入库主题 | 主来源 | 评分 |
| --- | --- | --- | ---: |
| `prompt` | 高风险法律研究与证据核验 | OpenAI Academy · 2026-07-28 | 94 |
| `prompt` | Codex Agentic Coding 增量 Steering 契约 | OpenAI Academy · 2026-07-31 | 92 |
| `skill` | 可自动化工作流建模与批准点设计 | OpenAI Academy · 2026-07-30 | 95 |
| `skill` | Copilot Code Review Skills + Read-only MCP | GitHub · 2026-07-29 | 95 |
| `hook` | Actions 可疑 Workflow 人工审批 | GitHub · 2026-07-28 | 96 |
| `hook` | Issue Agent 建议、置信度与理由门禁 | GitHub · 2026-07-23 | 91 |
| `mcp` | MCP 2026-07-28 正式规范迁移闭环 | MCP 官方规范 · 2026-07-28 | 97 |
| `mcp` | Waggle Agent Handoff Artifact | `modiqo/waggle` · 795 stars | 87 |
| `agent` | AOS CE 可验证 Agent OS 试点 | `unicity-aos/aos-ce` · 8575 stars | 93 |
| `agent` | Better Harness Work Loop 证据改进 | `QoderAI/better-harness` · 1337 stars | 90 |
| `github` | OpenWorker 本地优先 AI Coworker | `andrewyng/openworker` · 11399 stars | 96 |
| `github` | Codex Security 扫描与发布门禁 | `openai/codex-security` · 7863 stars | 97 |

GitHub API stars/forks 快照采集于 2026-08-01 14:59–15:03（Asia/Shanghai），只能反映当时热度。12 条均使用不同主来源 URL，并按 URL、标题和语义用途与 900 条基线去重；每类 2 条。

高 stars 未自动入库：`xai-org/grok-build` 和 `synthetic-sciences/openscience` 已存在；`JustVugg/colibri` 虽 21538 stars 但偏模型推理；`MoonshotAI/Kimi-K3` 偏模型资产且非 SPDX 许可；`MDX-Tom/gpt-5.6-instruct` 属 jailbreak prompt pack；`kvcache-ai/AgentENV` 明示尚无 authorization。上述项目均未占用本轮名额。

本轮增量后本地内容规模为 912 条：

- `prompt`: 211
- `skill`: 324
- `hook`: 89
- `mcp`: 89
- `agent`: 92
- `github`: 107

### 本地验证证据与依赖边界

- `npm run verify` 最终通过：TypeScript、ESLint、catalog contract、49 个 Markdown 文档治理与链接检查、10 个 Vitest 文件共 36 个测试、Vite/API build 和 high audit 均为绿。
- 首次 high audit 发现当日新增的 `brace-expansion`、`postcss` 与 `react-router` advisories；在不使用 `--force` 的前提下更新到 `brace-expansion` 1.1.18/2.1.4、`postcss` 8.5.25 和官方修复版 `react-router` 8.3.0，整套门禁复测通过。
- React Router 8.3.0 要求 Node.js `>=22.22.0`，因此 production Docker 两阶段基座由 Node 20 固定为 `node:22.22-alpine`；容器内实测 Node 为 `v22.22.3`。应用仅使用 library-mode `HashRouter/Routes/Route/Link/Outlet`，未使用自定义 RSC entry。
- `npm audit --omit=dev --audit-level=high` 退出码为 0；生产依赖仍有 `@hono/node-server` 的 1 个 moderate，自动修复需 `--force` 跨 major 到 2.x，本轮不扩张依赖升级范围。
- 本地 production build 的 `npm run smoke:e2e` 为 11 项通过、1 项跳过、0 项失败，报告为 `tmp/outputs/smoke-e2e-report-20260801072747.json`；跳过项仅为本地地址不执行共宿主域名检查。
- `docker compose config --services` 只输出 `app`；`bash -n deploy/deploy.sh` 与 `git diff --check` 通过。
- production image `promptforge-app:predeploy` 构建通过，镜像 ID 为 `sha256:0e12cc49d12876222157ad97e474754a6e7412c366656fb1676c294694d6ab24`；容器内 manifest 为 211/324/89/89/92/107，总计 912。
- Docker Hub metadata 连续发生 IPv6 OAuth timeout，ECR token 也返回 EOF；本地仅从可访问的 DaoCloud mirror 拉取同 digest Node 基座并重新标记为标准 `node:22.22-alpine`，Dockerfile 没有写入镜像源。基座 digest 为 `sha256:e58326d0d441090181ac150dc2078d3e2cf6a0d42e809aebba3ef5880935ffdd`。
- 生产只读盘点通过：`promptforge_app`、`ai_video_nginx` 和旧 `promptforge_mysql` 均 healthy；MySQL 仍只在 `promptforge_net`，app/nginx 在 `lighthouse_ai_video_net`；远端 Compose 只含 `app`，`.env.prod` 为 `600`，`/opt` 可用空间约 92.5 GiB。
- 远端 Docker Hub/认证端点同样超时且无 Node 22 缓存，但 DaoCloud registry IPv4 可达；发布时先拉取并核验同 digest 基座，再本地标记为标准 tag，之后才允许 app-only build。

### Commit、Push、Deploy 与生产发布 TODO

发布目标是把 912 条 static-first catalog 作为可追踪版本推送到 `origin/main`，只重建并替换 `promptforge_app`；不操作旧 `promptforge_mysql`、`promptforge_net`、volume、共享 nginx 或其他共宿主服务。

- [x] 重新生成六类静态目录并验证 manifest 为 912 条。
- [x] 完成 `git diff --check`、TypeScript、ESLint、catalog/docs contract、Vitest、build 和依赖安全门禁。
- [x] 启动本地 production build 并完成 E2E smoke；验证只读 tRPC 和 legacy router 边界。
- [x] 完成 app-only Compose 配置检查和 production Docker image 构建；核对镜像内 manifest。
- [x] 校验 `DDDD.pem` 存在、权限 `600` 且被忽略；只记录公钥指纹，不读取或记录私钥正文。
- [x] 生产只读盘点 app、nginx、MySQL、network、env 权限和共宿主状态。
- [x] 精确 stage 正式文件，排除用户草稿、`tmp/`、PEM、env、secrets 和其他无关改动；创建中文原子 commit 并 push。
- [x] 创建远端备份和 rollback image tag，使用 `deploy.sh --smoke` 执行 app-only 部署。
- [x] 独立 E8 验收容器 health、nginx、线上 912 条计数、新 ID、legacy 404、env `600`、app-only Compose 和共宿主服务。
- [x] 将实际 commit、image、smoke 与回滚证据回填本节，并创建证据补充 commit 后 push。

### Commit、部署与独立 E8 证据

- 内容与依赖原子 commit 为 `38324b70f564ef8298ed1283c24d4512fa90b3d6`，已 push 到 `origin/main`，远端 SHA 与本地一致；提交仅含 16 个正式文件，用户草稿和忽略目录均未入库。
- 部署前备份为 `/opt/promptforge/.deploy-backups/20260801153934-38324b7-content-release`，目录权限 `700`；旧镜像保留为 `promptforge_app:rollback-20260801153934-38324b7`，指向 `sha256:fb8624c5d6b291e6022452ac590f52064fe477c5058802a239db54c70aa3dd7d`。
- `deploy.sh --smoke` 只同步/构建/替换 `app`。Compose 报告旧 MySQL 为 orphan，但没有使用 `--remove-orphans`；旧 `promptforge_mysql` 没有删除、重启或换网。
- 新生产镜像为 `sha256:6a19ab0e37acdf5d7e83c2719ee4ed722669921474fe8126881a2699126ce177`，容器 `promptforge_app` 为 `running/healthy`，Node 为 `v22.22.3`，只连接 `lighthouse_ai_video_net`。
- 部署脚本首次 production smoke 的 PromptForge 11 项功能均通过，但因 `mkt` 返回正常共享登录 302 而触发旧断言失败。验收脚本随后改为：`mkt` 的 302 只允许指向 `https://lute-tlz-dddd.top/login.html`，`voc` 的 302 只允许指向 `/superset/`；不是无条件放宽 3xx。
- 更新后的 `npm run smoke:e2e:prod` 12 项全部通过，报告为 `tmp/outputs/smoke-e2e-report-20260801074706.json`；桌面/移动端路由、搜索、筛选、展开、复制、console、只读 tRPC 和共宿主检查均为绿。
- 独立 E8：容器内 manifest 与公网 manifest 均为 211/324/89/89/92/107，总计 912；新增 GitHub ID `1307502`、`1307503` 可读取；legacy `prompts.list` 为 `404 NOT_FOUND`；容器内 ping 和 nginx-to-app 均为 200，`nginx -t` 成功。
- `.env.prod` 保持 `600`，远端 Compose 仍只含 `app`。`promptforge_mysql` 继续使用部署前镜像 `sha256:6cd09145362dfe6831b14545de3d5fd6cc75c37cfd6ef8561429c1fc73518b39`，状态 healthy 且只在 `promptforge_net`。
- 共宿主最终状态：`kg`、根域名、`video`、`person` 为 200；`mkt` 为指向共享登录页的 302；`voc` 为指向 Superset welcome 的 302。共享 nginx 配置未修改。

## 2026-08-03 运行时与容器供应链风险修复

本轮不改 catalog 内容和六类计数，目标是关闭上一轮保留的生产依赖漏洞、容器可复现性和开发/生产启动边界风险。

### 风险与修复

- `@hono/node-server` 1.19.17 同时是直接生产依赖和开发插件传递依赖，命中
  [GHSA-frvp-7c67-39w9](https://github.com/advisories/GHSA-frvp-7c67-39w9)；
  项目升级并固定到官方已修复版本 2.0.12，同时将 `hono` 固定到 4.12.34。
- `@hono/vite-dev-server` 升级到 0.26.1。其声明范围仍停留在 node-server 1.x，因此使用 npm override 将直接依赖与传递依赖统一到 2.0.12，并以开发态 API 实测和锁文件唯一版本断言作为兼容门禁。
- `verify` 从只阻断 high 风险改为执行 `audit:full`，生产审计显式使用 `--audit-level=moderate`；修复后完整依赖树和生产依赖树均为 0 vulnerability。
- Browserslist 数据由 8 个月前版本刷新到 `caniuse-lite` 1.0.30001806；目标浏览器集合未发生变化。
- Docker 基座升级并固定为
  `node:22.23.1-alpine3.24@sha256:16e22a550f3863206a3f701448c45f7912c6896a62de43add43bb9c86130c3e2`。
  生产层移除 npm/npx，改为 UID 1000 的 `node` 用户直接执行 `node dist/boot.js`。
- 升级开发插件后发现旧 `process.env.VITE` 判定失效，Vite 会误启动第二个 HTTP server。启动边界改为使用 Vite 原生 `import.meta.env.DEV`，生产 esbuild 明确定义为 `false`，同时覆盖开发态和独立生产 bundle。

### 本地验证证据

- `npm ci --ignore-scripts` 和 `npm run verify` 通过：TypeScript、ESLint、catalog contract、50 个 Markdown 文档治理与链接检查、10 个 Vitest 文件共 39 个测试、Vite/API build 与 moderate audit 均为绿。
- Vite 开发态首页和 `/api/trpc/ping` 实测通过，修复后无第二个 server、静态目录或端口竞争日志。
- 本地 production bundle 独立启动成功，容器内 Node 为 `v22.23.1`、用户为 `node`、npm 不存在；编码反斜杠路径返回 404。
- production image `promptforge-app:risk-remediation` 为
  `sha256:e6eee9b8cd082b6cf7795e3932eade7ec6c92a4cf5aa3001c7e88f376e1de8bc`。
  Docker Scout 扫描 262 个包，结果为 0 critical、0 high、0 moderate、0 low。
- 本地 production smoke 的 11 项功能全部通过，1 项仅因本地地址而跳过共宿主检查；桌面、移动端、目录计数、只读 API 和浏览器 console 均为绿。

### Commit、部署与独立 E8 证据

- 风险修复 commit 为 `ad121c261ceded172cff38b8a98c375be56bd4bc`，已 push 到 `origin/main`；提交仅含 5 个修复文件，用户既有跨境电商草稿、`tmp/`、PEM、env 和 secrets 均未入库。
- 部署前备份为 `/opt/promptforge/.deploy-backups/20260803232532-ad121c2-risk-remediation`，目录权限 `700`、内部证据文件为 `600`；旧生产镜像保留为 `promptforge_app:rollback-20260803232532-ad121c2`，指向 `sha256:e6b74c063aab5cd060acf6ee6227945c145391f78aedbaa1416b7053fe65fe98`。
- `deploy.sh --smoke` 只同步、构建和替换 `promptforge_app`，没有使用 `--remove-orphans`。生产 smoke 12 项全部通过，报告为 `tmp/outputs/smoke-e2e-report-20260803152720.json`。
- 新生产镜像为 `sha256:ccbb8de19f8d35c28dc199c23eb5238dcc0936e91f831ccd7fc39b0a080f8af7`；`promptforge_app` 为 healthy，运行用户为 UID 1000 的 `node`，Node 为 `v22.23.1`，npm 不存在，`@hono/node-server` 为 2.0.12，`hono` 为 4.12.34。
- 独立 E8：容器与公网 manifest 均为 213/326/91/91/94/109，总计 924；容器 ping 与 nginx-to-app 均为 200，`nginx -t` 成功，legacy `prompts.list` 和编码反斜杠探测均为 404，`.env.prod` 保持 `600`，远端 Compose 仍只含 `app`。
- 旧 `promptforge_mysql` 未重启、删除或换网，仍使用
  `sha256:6cd09145362dfe6831b14545de3d5fd6cc75c37cfd6ef8561429c1fc73518b39`，
  启动时间仍为 `2026-07-19T16:22:44.020085209Z`，且只连接 `promptforge_net`。

### 仍需单独授权的残余风险

- 根目录 `DDDD.pem` 当前权限为 `600` 且被 Git 忽略，但迁移到专用 `~/.ssh/` 路径涉及本地凭据位置和部署配置，应作为独立变更执行。
- 旧 MySQL 容器、`promptforge_net` 和相关 volume 当前不参与 static-first 生产链路；归档或删除前仍需单独备份、业务归属确认和明确授权。

## 2026-08-01 X 全量书签增量（924 条）

本轮根据用户已登录的本地 X 书签页执行全量采集，不沿用“14 条”抽样结论。最终获得 166 条唯一 status URL；到达页尾的证据为连续 10 次 Page Down 无新增、3 次 End 无新增及 X footer 可见。原始盘点保存在忽略文件 `tmp/tmp-x-bookmarks-inventory-20260801-full.json`，正式分析见 `drafts/analysis/content-x-bookmarks-taxonomy-draft-20260801.md`。

### 全量分类与门禁

- 最近 1 个月窗口（2026-07-02—2026-08-01）：124 条；窗口外保留审计：42 条。
- 六类分布：prompt 12、skill 36、hook 16、mcp 10、agent 31、github 61。
- 初筛：accept 64、defer 52、reject 50；accept 仅代表进入官方溯源候选，不等于入库。
- 识别 13 组语义重复、6 条无正文记录；#119 OpenWiki 与当前 catalog 精确重复。
- 盗版/付费墙绕过、系统提示词泄露、反检测、安全控制绕过、未验证医疗建议及纯广告内容按硬门禁拒绝。
- 抓取、浏览器登录态、OSINT、金融、声音克隆、桌面命令和社交 API 候选默认 defer，等待授权、ToS、隐私和隔离实测。

### 官方溯源与入库

X 仅作为 T4 发现层。最终 12 条全部回到官方仓库或研究页面，复核 title/URL/语义去重、stars、license、近期 push/release，并将安全边界写入可执行内容。

| 类别 | 入库主题 | 主来源 | 评分 |
| --- | --- | --- | ---: |
| `prompt` | 产品系统拆解：JTBD、核心循环与下一步机会 | `yanliudesign/product-teardown-skill` | 89 |
| `prompt` | 女性人像约束锁定、风格路由与负面约束 | `liyue-aigc/female-portrait-director` · 1242 stars | 90 |
| `skill` | SkillOpt 验证门控的 Agent Skill 优化 | `microsoft/SkillOpt` · 15448 stars | 98 |
| `skill` | book-to-skill 技术资料渐进披露蒸馏 | `virgiliojr94/book-to-skill` · 14490 stars | 94 |
| `hook` | OpenSpec Plus 规格就绪与 TDD 分片门禁 | `sudokar/openspec-plus` · 139 stars | 88 |
| `hook` | BrowserAct 敏感浏览器动作确认与人工接管 | `browser-act/skills` · 5053 stars | 91 |
| `mcp` | Desktop Commander 本机终端与文件权限评估 | `wonderwhy-er/DesktopCommanderMCP` · 9028 stars | 92 |
| `mcp` | Langflow Agent Flow 转 MCP Tool 发布验收 | `langflow-ai/langflow` · 152698 stars | 96 |
| `agent` | DeepTutor 终身个性化学习 Agent 试点 | `HKUDS/DeepTutor` · 31706 stars | 96 |
| `agent` | Fractal 递归分层 Agent Loop 安全试点 | `plasma-ai/fractal` · 652 stars | 84 |
| `github` | MarkItDown 多格式文档转 Markdown 安全评估 | `microsoft/markitdown` · 170592 stars | 98 |
| `github` | CLI-Anything GUI 软件 Agent-Native Harness 评估 | `HKUDS/CLI-Anything` · 46448 stars | 95 |

Stars 为 2026-08-01 GitHub API 快照，只用作活跃度/采用面信号，不能替代 license、安全和适配性验证。Product Teardown 仓库未声明 license，本条只抽象通用方法结构，不复制代码、HTML 或品牌模板。

本轮增量后本地内容规模为 924 条：

- `prompt`: 213
- `skill`: 326
- `hook`: 91
- `mcp`: 91
- `agent`: 94
- `github`: 109

### 本轮执行边界与验证证据

- 内容整理批次先完成本地增量；后续发布批次在重新通过远端只读门禁后，获用户“继续下一批”授权执行 commit、push、app-only deploy 与独立 E8。发布前线上仍以已发布的 912 条版本为准。
- 用户既有草稿 `drafts/analysis/promptforge-crossborder-ecommerce-value-report-draft-20260630.md` 未修改、未暂存。
- Deep Research 报告门禁通过：required sections、编号引用、完整 bibliography、占位符、截断、来源数量和链接检查均为绿；16/16 个官方引用 URL 可访问，0 suspicious、0 unverified。
- `npm run verify` 通过：TypeScript、ESLint、catalog contract、50 个 Markdown 文档治理与链接检查、10 个 Vitest 文件共 36 个测试、Vite/API build 与 high audit 均为绿。
- high audit 仍报告既有 `@hono/node-server` 2 个 moderate advisory，当前无可用修复；high 级退出码为 0，本轮没有为内容更新扩张依赖升级范围。
- 本地 production build 的 `npm run smoke:e2e` 为 11 项通过、1 项跳过、0 项失败；报告为 `tmp/outputs/smoke-e2e-report-20260801095615.json`，跳过项仅为本地地址不执行共宿主域名检查。
- `git diff --check` 通过；生成 manifest 为 213/326/91/91/94/109，总计 924。
- 发布批次再次执行 `npm run verify`、`bash -n deploy/deploy.sh` 与 app-only Compose 检查，均通过；第一次从仓库根目录误执行 `npm run verify` 仅因根目录无 `package.json` 退出，切换到 `app/` 后原命令完整通过。
- production image `promptforge-app:predeploy` 构建通过，镜像 ID 为 `sha256:d26e86a31fd3dc98a1e9a242ee44c5b40275da99c08e7fe66471daaa61e4fe6c`；镜像内 Node 为 `v22.22.3`，manifest 为 213/326/91/91/94/109，总计 924。

### Commit、Push、Deploy 与生产验收 TODO

- [x] 使用根目录 `DDDD.pem` 校验 SSH 可达、权限 `600` 与公钥指纹，不记录私钥正文。
- [x] 现场确认远端 Compose 仅含 `app`；app/nginx/MySQL 均 healthy，旧 MySQL 仍只在 `promptforge_net`，env 为 `600`。
- [x] 通过完整本地门禁与 production image 内 manifest 验收。
- [x] 精确暂存本轮 924 条内容、派生目录、计数、报告和工作流，排除用户既有跨境电商草稿。
- [x] 创建中文原子 commit、push 到 `origin/main` 并核对远端 SHA。
- [x] 创建远端备份与 rollback image tag，只执行 app-only deploy，不使用 `--remove-orphans`。
- [x] 独立验收公网/容器目录计数、健康、nginx、只读 API、legacy 404、env 权限和共宿主服务。

### Commit、部署与独立 E8 证据

- 内容原子 commit 为 `597d8fb218c0d9ab7a53ee69096dcb96a44f7f74`，已 push 到 `origin/main`，远端 SHA 与本地一致；提交仅含 14 个本轮正式文件，用户既有跨境电商草稿、`tmp/`、PEM、env 和 secrets 均未入库。
- 部署前备份为 `/opt/promptforge/.deploy-backups/20260801204020-597d8fb-x-bookmarks`，目录权限 `700`、内部证据文件为 `600`；旧生产镜像保留为 `promptforge_app:rollback-20260801204020-597d8fb`，指向 `sha256:6a19ab0e37acdf5d7e83c2719ee4ed722669921474fe8126881a2699126ce177`。
- `deploy.sh --smoke` 只同步、构建和替换 `promptforge_app`。Compose 报告 `promptforge_mysql` 为 orphan，但没有使用 `--remove-orphans`；旧 MySQL 未重启，仍使用 `sha256:6cd09145362dfe6831b14545de3d5fd6cc75c37cfd6ef8561429c1fc73518b39` 且只在 `promptforge_net`。
- 新生产镜像为 `sha256:e6b74c063aab5cd060acf6ee6227945c145391f78aedbaa1416b7053fe65fe98`；`promptforge_app` 为 healthy、Node 为 `v22.22.3`，只连接 `lighthouse_ai_video_net`。容器 ping、nginx-to-app 与 `nginx -t` 均通过，app 日志无运行错误。
- 部署脚本内首轮与第一次原样复测的静态目录、只读 API、共宿主检查通过，但 System Chrome 继承 macOS 系统代理后稳定出现 `ERR_CONNECTION_RESET`/导航超时；同机 HTTP/1.1、HTTP/2、Node fetch 和容器链路均为 200。用独立 Playwright 对照确认 `--no-proxy-server` 后页面稳定 200，因此新增默认关闭的 `PROMPTFORGE_SMOKE_BYPASS_PROXY` 显式开关，不改变默认代理策略。
- 启用该开关后的 `npm run smoke:e2e:prod` 12 项全部通过，报告为 `tmp/outputs/smoke-e2e-report-20260801125023.json`；桌面/移动路由、搜索、筛选、展开、复制、console、静态目录、只读 tRPC 与共宿主检查均为绿。
- 独立 E8：容器与公网 manifest 均为 213/326/91/91/94/109，总计 924；新增 ID `1307504`、`1307515` 可读取；legacy `prompts.list` 为 `404 NOT_FOUND`；`.env.prod` 为 `600`，远端 Compose 仍只含 `app`。
- 共宿主最终状态：`kg`、根域名、`video`、`person` 为 200；`mkt` 为指向共享登录页的 302；`voc` 为指向 Superset welcome 的 302。共享 nginx 配置未修改。
