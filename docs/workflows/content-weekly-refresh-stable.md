---
title: 每周高质量内容检索、增量更新与部署验证流程
doc_type: workflow
module: content
topic: weekly-refresh
status: stable
created: 2026-06-02
updated: 2026-07-08
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
