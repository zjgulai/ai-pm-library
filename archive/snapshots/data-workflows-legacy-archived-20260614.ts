import type { Prompt } from "@/types/prompt";

export const workflowRoles = [
  { id: "all", name: "全部工作流", nameEn: "All Workflows", description: "所有场景的自动化工作流合集", descriptionEn: "Automated workflow collection for all scenarios", icon: "LayoutGrid", count: 5 },
  { id: "operations", name: "运营管理", nameEn: "Operations", description: "信息聚合 · 自动化发布 · 数据归档", descriptionEn: "Aggregation · Auto Publishing · Archival", icon: "Settings", count: 1 },
  { id: "creator", name: "创作者", nameEn: "Creator", description: "内容抓取 · 视觉生成 · 发布工作流", descriptionEn: "Content Capture · Visual Gen · Publishing", icon: "PenTool", count: 3 },
  { id: "developer", name: "开发者", nameEn: "Developer", description: "视频管线 · 框架选型 · 批量渲染", descriptionEn: "Video Pipeline · Framework Selection · Batch Render", icon: "Code2", count: 1 },
];

export const workflows: Prompt[] = [
  {
    id: 2001,
    title: "AI早报自动化工作流：从信息抓取到飞书发布",
    titleEn: "AI Daily Briefing Workflow: From Crawl to Feishu Publish",
    role: "operations",
    tags: ["AI早报", "信息聚合", "飞书自动化", "定时任务", "Cron"],
    tagsEn: ["AI Briefing", "Aggregation", "Feishu Automation", "Cron", "News"],
    content: `## 工作流概述
这是一个完整的AI/Agent/AIGC早报自动化生产工作流，从信息抓取、筛选核验、内容撰写到飞书发布和多维表归档，实现全流程自动化。

## 涉及技能
1. **daily-ai-agent-aigc-top-news** — 早报总入口与编排
2. **news-aggregator-skill** — 多源新闻候选抓取（HackerNews/GitHub/HuggingFace）
3. **feishu-lark-workflows** — 飞书文档创建、回读验证、多维表操作
4. **ai-news-bitable-archive** — 日报归档到飞书多维表，支持可检索归档

## 工作流步骤

### Step 1: 预检查
- 检查当前时间（UTC/CST）
- 验证飞书/lark-cli认证状态与权限范围
- 确认文档创建/读取/多维表写入能力

### Step 2: 信息源采集
- 运行新闻聚合器抓取候选：
  - HackerNews Top Stories
  - GitHub Trending（AI/Agent/AIGC/Developer Tool/Infra分类）
  - HuggingFace热门模型/Space
- 定向检查官方源：OpenAI、Google Gemini/Imagen/Veo、Anthropic/Claude、Runway、Pika、Kling/可灵、字节/即梦/Seedance、Midjourney、Ideogram、Adobe Firefly、Stability AI

### Step 3: 强制项目检查
- 独立检查配置项目（默认：NousResearch/hermes-agent）
- 检查release、commits、merged PR、用户可感知变化
- 即使无实质更新也需提及已执行检查

### Step 4: 内容筛选与撰写
- 优先级排序：官方发布 > GitHub证据 > 权威媒体 > 社交讨论 > Trending信号
- 硬性规则：不写rumor、Trending≠发布、HN Algolia≠证据
- 必含板块：最值得注意的3条、模型/Agent产品、AIGC生图/生视频、评测/基准/研究、GitHub Trending、开源项目、指定项目更新、产业动态、一句话结论

### Step 5: 飞书文档发布
- 创建飞书原生文档
- 标题格式：AI / Agent / AIGC Top News 24h｜YYYY-MM-DD 08:00
- docs +fetch 回读验证结构和内容完整性

### Step 6: 多维表归档（可选）
- 归档到指定Bitable
- 回填字段：标题、文档链接、Token、统计窗口、Top3、一句话结论、摘要、状态
- 按record_id回读验证归档成功

## 输出契约
\`\`\`md
已完成。
- 文档标题：...
- doc_url：...
- bitable_url：...（如启用归档）
- record_id：...（如启用归档）
- 摘要：3～6条要点
\`\`\`

## 常见坑点
1. 只用聚合器不验证官方源 → 信息不准确
2. 跳过AIGC媒体检查 → 遗漏重要更新
3. 将Trending当作发布新闻 → 误导读者
4. 猜测HN item ID → 链接失效
5. 忘记强制项目检查 → 遗漏关键更新
6. 未fetch回读就报告成功 → 文档可能未创建`,
    description: "从多源信息抓取、AI筛选核验到飞书自动发布和归档的完整早报生产工作流，覆盖过去24小时AI/Agent/AIGC领域核心动态",
    descriptionEn: "Complete daily briefing production workflow from multi-source crawling, AI filtering/verification to Feishu auto-publishing and archiving",
    scenario: "运营团队需要每日固定产出AI领域早报，或自媒体人希望自动化信息聚合与发布流程",
    scenarioEn: "Operations teams needing daily AI briefings, or content creators wanting automated info aggregation and publishing",
    problemFocus: "手动追新闻耗时耗力、信息来源分散、筛选标准不统一、发布流程繁琐容易遗漏步骤",
    problemFocusEn: "Manual news tracking is time-consuming, sources are scattered, filtering standards inconsistent, publishing workflow tedious",
    author: "Draco Skills Collection",
    likes: 145, views: "12.3K", comments: 23, createdAt: "2026-05-05",
  },
  {
    id: 2002,
    title: "公众号内容生产工作流：抓取→封面→发布",
    titleEn: "WeChat Content Pipeline: Capture → Cover → Publish",
    role: "creator",
    tags: ["公众号", "内容抓取", "封面生成", "飞书协作", "自动化发布"],
    tagsEn: ["WeChat", "Content Capture", "Cover Gen", "Feishu", "Auto Publish"],
    content: `## 工作流概述
从微信公众号文章抓取、清洗、封面生成到最终草稿发布的完整内容生产链路。支持两条抓取路线和三条封面生成策略。

## 涉及技能
1. **wechat-article-camofox** — 本机CamoFox浏览器稳定抓取
2. **wechat-article-browseruse** — BrowserUse云浏览器抓取+飞书发布
3. **nano-banana-image** — Nano Banana 2/Gemini高质量出图（适合营销视觉）
4. **jimeng-image** — 即梦/火山引擎路线（省钱、支持图生图/多参考图）
5. **article-to-wechat-cover** — 先理解文章再自动生成封面
6. **feishu-doc-to-wechat-draft** — 飞书文档转公众号草稿（临门一脚）

## 工作流步骤

### Step 1: 文章抓取（二选一）
**路线A — 本机稳定链路（CamoFox）**
- 启动camofox-browser本地服务
- 读取浏览器accessibility snapshot
- 专用清洗逻辑去除公众号页噪音
- 输出：Markdown / JSON / 直接发布飞书文档

**路线B — 云浏览器链路（BrowserUse）**
- Playwright CDP连接BrowserUse云浏览器
- 抓取mp.weixin.qq.com文章
- 自动发布到飞书原生文档
- 快速开始：\`python3 scripts/run.py fetch <url>\`

### Step 2: 封面生成（三选一）
**策略A — 直接Prompt出图**
- 使用nano-banana-image
- 高质量营销视觉、结构化JSON prompt控制
- 支持单图/批量/workflow模式

**策略B — 省钱火山路线**
- 使用jimeng-image
- 走火山引擎Ark即梦/Seedream
- 支持文生图、图生图、多参考图、连续组图

**策略C — 智能理解生成**
- 使用article-to-wechat-cover
- 系统先理解文章主题
- 自动生成适合公众号的横幅封面

### Step 3: 飞书协作处理
- 文章存入飞书文档
- 团队协作编辑、批注
- 图片处理和样式调整

### Step 4: 发布公众号草稿
- 使用feishu-doc-to-wechat-draft
- 飞书文档转公众号草稿
- 处理图片、样式和预览
- 一键推送到微信公众号草稿箱

## 一句话决策
- **需要稳定抓取** → CamoFox路线
- **需要云浏览器+自动发布** → BrowserUse路线
- **高质量营销封面** → nano-banana-image
- **省钱+多参考图** → jimeng-image
- **文章理解+自动封面** → article-to-wechat-cover`,
    description: "从公众号文章抓取、多策略封面生成到飞书协作和最终草稿发布的完整内容生产链路，支持两条抓取路线和三条封面策略",
    descriptionEn: "Complete content pipeline from WeChat article capture, multi-strategy cover generation to Feishu collaboration and final draft publishing",
    scenario: "内容创作者、公众号运营者需要系统化内容采集和发布工作流，减少重复手动操作",
    scenarioEn: "Content creators and WeChat operators needing systematic content capture and publishing workflows",
    problemFocus: "手动复制粘贴文章格式混乱、封面设计耗时、团队协作不同步、发布前格式调整反复",
    problemFocusEn: "Manual copy-paste formatting is messy, cover design time-consuming, team collaboration unsynced, pre-publish formatting adjustments repetitive",
    author: "Draco Skills Collection",
    likes: 132, views: "10.8K", comments: 19, createdAt: "2026-05-05",
  },
  {
    id: 2003,
    title: "视频制作工作流：从框架选型到成片交付",
    titleEn: "Video Production Pipeline: Framework Selection to Delivery",
    role: "developer",
    tags: ["视频制作", "Manim", "Remotion", "Motion Canvas", "HyperFrames", "Seedance"],
    tagsEn: ["Video Production", "Manim", "Remotion", "Motion Canvas", "HyperFrames", "Seedance"],
    content: `## 工作流概述
覆盖数学解释视频、场景动画、React页面型视频、英文单词教育视频、讲解视频全链路和Seedance短视频产线的完整视频制作决策树与执行链路。

## 涉及技能
1. **video-framework-selector** — 视频任务开工前框架选型判断
2. **manim-video** — 数学/公式/对象变换/算法过程解释视频
3. **manim-video-with-tts** — Manim + 火山TTS中文旁白同步
4. **motion-canvas** — TS场景动画、时间轴编排、motion graphics
5. **remotion** — React页面型视频、模板化批量视频
6. **vocabulary-video-pipeline** — 英文单词解释视频（Remotion流水线）
7. **feishu-seedance-video-pipeline** — Director+Ledger Guard+Reviewer管理的Seedance产线
8. **hyperframes-explainer-video** — HTML+GSAP+TTS讲解视频全链路

## 工作流步骤

### Step 1: 框架选型（必做）
使用video-framework-selector判断本次任务的正确路线：

| 需求特征 | 推荐框架 |
|---------|---------|
| 对象怎么变（数学公式/几何变换/算法过程） | Manim |
| 数学视频 + 中文旁白同步 | Manim + 火山TTS |
| 场景怎么演（时间轴/矢量动画/讲解型motion graphics） | Motion Canvas |
| 页面这一帧长什么样（React组件/卡片/模板化批量） | Remotion |
| 英文单词教育视频（TTS同步+节奏） | vocabulary-video-pipeline |
| 讲解视频全链路（音频驱动/HTML组件库） | HyperFrames |
| Seedance短视频产线（角色/场景/镜头/成本管控） | feishu-seedance-video-pipeline |

### Step 2: 分路线执行

**Manim路线**
- 分镜设计 → script.py编写 → 渲染 → MP4输出
- 可选：火山TTS生成中文旁白 → 音画同步

**Motion Canvas路线**
- TypeScript场景代码 → 实时预览 → 时间轴编排 → 视频项目导出

**Remotion路线**
- React Composition编写 → 关键帧验图 → 中文旁白/字幕 → 渲染 → MP4
- vocabulary-video-pipeline在此基础上增加：诊断→TTS→节奏分割→渲染→飞书上传

**HyperFrames路线**
- 脚本撰写（小白翻译官Persona）→ TTS生成 → LLM Scene Composer JSON编排 → HTML Animation渲染
- Registry组件库+GSAP时间线驱动

**Seedance产线路线**
- Director Module拆解角色/场景/服装/镜头
- Base Asset Ledger Write Guard防止台账误填
- Reviewer Module做烧钱前门禁
- Seedance生成 → 回填QA/tokens/成本

## 核心原则
- **不要LLM直接生成GSAP代码** — 时序漂移、性能抽奖、调试地狱
- **LLM只写JSON，不写JS** — 创造力在编排层面，执行由验证过的原子组件担保
- **把时间当鼠标** — 视频里没有"用户"，只有时间轴，所有交互必须翻译成时间驱动`,
    description: "覆盖7种视频制作框架的完整决策树和执行链路，从框架选型、分镜设计到渲染交付，含HyperFrames组件库架构和Seedance产线成本管控",
    descriptionEn: "Complete decision tree and execution pipeline covering 7 video frameworks, from selection to delivery, with HyperFrames component architecture and Seedance cost control",
    scenario: "开发者、内容创作者需要制作数学解释视频、教育视频、产品讲解视频或短视频，但不知道选择什么工具链",
    scenarioEn: "Developers and creators needing to produce math explainer, educational, product demo, or short videos but unsure which toolchain to choose",
    problemFocus: "视频工具选择困难、LLM生成的动画代码质量不稳定、音画同步复杂、多步骤流程容易遗漏环节",
    problemFocusEn: "Difficulty choosing video tools, unstable LLM-generated animation code, complex audio-visual sync, easy to miss steps in multi-step workflows",
    author: "Draco Skills Collection",
    likes: 178, views: "15.6K", comments: 31, createdAt: "2026-05-05",
  },
  {
    id: 2004,
    title: "EPUB长内容再加工工作流：电子书转播客视频",
    titleEn: "EPUB Repurposing Workflow: Ebook to Podcast Video",
    role: "creator",
    tags: ["EPUB", "播客", "长内容", "TTS", "视频化", "内容再加工"],
    tagsEn: ["EPUB", "Podcast", "Long Content", "TTS", "Video", "Repurposing"],
    content: `## 工作流概述
将电子书（EPUB）转换为双人中文播客视频：生成播客脚本、分段音频、Smart Slide、最终MP4视频和营销文案。适合把书、长文、系列内容变成更容易传播的播客形式。

## 涉及技能
1. **epub2podcast** — Standalone版EPUB转播客视频管线

## 工作流步骤

### Step 1: 环境准备
- Node.js + npm
- ffmpeg / ffprobe
- Chrome / Chromium（供Puppeteer截图Smart Slide）
- OpenRouter / Volcengine等API环境变量

### Step 2: 核心配置
- language=Chinese
- imageStyle.preset=smart_ppt
- imageStyle.colorTheme=gq_fashion
- imageStyle.pptModel=google/gemini-3-flash-preview
- apiProvider=openrouter
- textModel=gemini-3-flash
- 中文TTS默认走volcengine

### Step 3: 运行转换
\`\`\`bash
# 最简单
epub2podcast-local-run --epub ./book.epub

# 指定输出目录
epub2podcast-local-run --epub ./book.epub --output-dir ./deliveries

# 覆盖主题或模型
epub2podcast-local-run --epub ./book.epub --output-dir ./deliveries \
  --color-theme gq_fashion \
  --ppt-model google/gemini-3-flash-preview \
  --text-model gemini-3-flash
\`\`\`

### Step 4: 交付物
- 双人中文播客脚本
- 分段音频
- 合并音频 \`full_podcast.mp3\`
- Smart Slide图片
- Smart Slide HTML源文件
- 最终视频播客 \`final_podcast.mp4\`
- 营销文案与metadata

### Step 5: 局部修复（可选）
\`\`\`bash
# 只重生某一页，并可选重合成视频
epub2podcast-local-regenerate-slide \
  --delivery-dir /path/to/delivery \
  --slide-index 0 \
  --recompose \
  --color-theme gq_fashion \
  --ppt-model google/gemini-3-flash-preview
\`\`\`

## 核心原则
- 本地运行、独立运行（不依赖外部服务）
- 不依赖Supabase持久化
- 交付物优先落本地目录，后续可再上传飞书
- 首屏书籍封面优先走本地文件+本地HTTP临时地址，避免超长base64截断`,
    description: "将EPUB电子书转换为双人中文播客视频的完整工作流，含Smart Slide生成、TTS语音合成和最终MP4渲染",
    descriptionEn: "Complete workflow for converting EPUB ebooks to dual-host Chinese podcast videos with Smart Slide generation, TTS synthesis and MP4 rendering",
    scenario: "知识创作者、出版社、教育从业者希望将书籍/长文内容转化为更易传播的播客/视频形式",
    scenarioEn: "Knowledge creators, publishers, educators wanting to transform books/long-form content into more shareable podcast/video formats",
    problemFocus: "长内容传播困难、手动制作播客视频耗时、图文转视频技术门槛高、TTS与画面同步复杂",
    problemFocusEn: "Long content hard to spread, manual podcast video production time-consuming, high technical barrier for text-to-video, complex TTS-visual sync",
    author: "Draco Skills Collection",
    likes: 89, views: "7.2K", comments: 14, createdAt: "2026-05-05",
  },
  {
    id: 2005,
    title: "批量视觉实验工作流：Nano Banana + 即梦双路线",
    titleEn: "Batch Visual Experiment Workflow: Nano Banana + Jimeng Dual Route",
    role: "creator",
    tags: ["文生图", "批量出图", "Nano Banana", "即梦", "视觉实验", "营销视觉"],
    tagsEn: ["Text-to-Image", "Batch Generation", "Nano Banana", "Jimeng", "Visual Experiments", "Marketing Visuals"],
    content: `## 工作流概述
支持单张模式、批量模式、workflow模式的双路线AI图片生成工作流。适合头图、横幅图、海报和批量视觉实验。

## 涉及技能
1. **nano-banana-image** — Nano Banana 2 / Gemini Flash Image高质量出图
2. **jimeng-image** — 即梦 / Doubao Seedream省钱路线

## 双路线对比

| 维度 | Nano Banana | Jimeng |
|------|-------------|--------|
| 适合场景 | 高质量营销视觉 | 省钱批量生成 |
| 控制方式 | 结构化JSON prompt | 文生图/图生图/多参考图 |
| 输出质量 | 高（适合头图/海报） | 中（适合连续组图） |
| 成本 | 较高 | 较低 |
| 特殊能力 | JSON Prompt Mode精确控制 | 多参考图融合、连续组图 |
| 飞书支持 | 直接上传飞书 | 直接上传飞书 |

## 工作流步骤

### Step 1: 选择路线
- 需要高质量营销视觉/头图/海报 → Nano Banana
- 需要省钱/图生图/多参考融合/连续组图 → Jimeng

### Step 2: 生成图片
**Nano Banana模式**
- 单图模式：直接输入prompt生成
- 批量模式：输入多个prompt批量产出
- Workflow模式：结构化JSON控制生成参数

**Jimeng模式**
- 文生图：输入文本描述
- 图生图：以上传图片为基础修改
- 多参考图：融合多张参考图风格/元素

### Step 3: 飞书上传（可选）
- 生成后自动或手动上传到飞书文档/云盘
- 支持在飞书协作环境中直接使用

## 核心原则
- nano-banana-image更适合高质量营销视觉和结构化JSON prompt控制
- jimeng-image更适合火山引擎路线，支持图生图、多参考图和连续组图`,
    description: "Nano Banana和即梦双路线的批量AI图片生成工作流，覆盖单图、批量、workflow三种模式，含飞书上传集成",
    descriptionEn: "Dual-route batch AI image generation workflow (Nano Banana + Jimeng), covering single/batch/workflow modes with Feishu upload integration",
    scenario: "设计师、营销人员、内容创作者需要批量生成头图、海报、营销素材，或进行视觉风格实验",
    scenarioEn: "Designers, marketers, content creators needing batch generation of banners, posters, marketing assets, or visual style experiments",
    problemFocus: "单张出图效率低、批量生成时风格不一致、不同平台prompt写法不同、团队协作时素材管理混乱",
    problemFocusEn: "Single image generation inefficient, batch generation style inconsistent, different platforms use different prompt formats, team asset management chaotic",
    author: "Draco Skills Collection",
    likes: 76, views: "6.5K", comments: 11, createdAt: "2026-05-05",
  },
];
