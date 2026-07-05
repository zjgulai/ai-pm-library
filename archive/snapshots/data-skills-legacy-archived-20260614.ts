import type { Prompt, Role } from "@/types/prompt";

export const skillRoles: Role[] = [
  { id: "all", name: "全部技能", nameEn: "All Skills", description: "所有职业角色的AI技能与模板合集", descriptionEn: "AI skills and templates for all professional roles", icon: "LayoutGrid", count: 11 },
  { id: "developer", name: "开发者", nameEn: "Developer", description: "编程开发 · 系统调试 · 代码验收 · 项目模板", descriptionEn: "Programming · Debugging · Code Review · Templates", icon: "Code2", count: 8 },
  { id: "productManager", name: "产品经理", nameEn: "Product Manager", description: "需求探索 · 方案设计 · 产品规划", descriptionEn: "Discovery · Design · Product Planning", icon: "Package", count: 1 },
  { id: "researcher", name: "研究员", nameEn: "Researcher", description: "知识管理 · LLM技术 · 知识库构建", descriptionEn: "Knowledge Management · LLM Tech · Wiki Building", icon: "Search", count: 1 },
  { id: "creator", name: "创作者", nameEn: "Creator", description: "内容建站 · 博客系统 · 个人品牌", descriptionEn: "Content Sites · Blogging · Personal Brand", icon: "PenTool", count: 1 },
];

export const skills: Prompt[] = [
  // ========== 核心技能 1-4 ==========
  {
    id: 1001,
    title: "AI代码验收：从盯代码到接受证据包",
    titleEn: "AI Code Acceptance: From Reading Code to Accepting Proof Packets",
    role: "developer",
    tags: ["代码审查", "AI生成代码", "验收框架", "质量管理", "vibe coding"],
    tagsEn: ["Code Review", "AI-Generated Code", "Acceptance Framework", "Quality Mgmt", "Vibe Coding"],
    content: `你是一位AI代码验收专家。请使用以下框架审查这段AI生成的代码/变更。

## 验收边界定义
- 任务/请求：明确本次要构建或修复的内容
- 变更表面：UI、后端、数据库、认证、支付、文件、配置等
- 发布意图：原型/PR交接/生产部署/公开发布
- 风险等级：低/中/高

## 工作板 (Workpad)
### 范围
- 请求变更：
- 触及文件/页面：
- 明确排除：

### 验收标准
- [ ] 用户可见行为符合请求
- [ ] 无无关行为被更改
- [ ] 所需测试或检查通过
- [ ] 涉及UI时完成手动走查
- [ ] 回滚路径清晰

## 证据包 (Proof Packet) — 要求AI/开发者提供
1. **变更摘要**：用通俗语言说明改了什么、为什么改、触及哪些文件/接口/数据
2. **影响地图**：哪些用户流程可能受影响、读写迁移删除的数据、集成的权限计费后台任务
3. **自动化验证**：运行了哪些命令、通过/失败结果、关键输出摘要
4. **手动走查**：涉及UI/产品流/认证/支付/上传下载时，记录点击步骤、预期结果、实际结果、截图/视频
5. **风险审查**：安全隐私风险、数据丢失风险、回归风险、性能成本风险、依赖环境风险
6. **回滚计划**：如何撤销（git revert/配置翻转/功能开关/数据库恢复/迁移回滚/手动清理）

## 分级发现
- P0（阻断发布）：核心行为不工作/无法安装启动/认证支付隐私风险未解决/破坏性操作不可逆/密钥泄露/缺少生产变更所需证据/无回滚路径
- P1（交接前必须修复除非用户明确接受风险）：相邻流程可能回归/非平凡逻辑缺少测试/用户面向变更手动走查不完整/常见路径错误处理薄弱/性能影响未测量
- P2（可带备注发布）：文案布局命名抛光/轻微可维护性问题/可选测试覆盖/文档清理

## 决策状态
- Ready：证据充分，无P0，P1无或已明确接受
- Human Review：AI完成实现和证据包，人类需批准产品/风险决策
- Rework：实现接近但缺少所需证据或修复
- Reject：变更不安全、超范围或未解决请求
- Blocked：缺少所需凭证、环境、文件或外部访问

## 最终报告格式
- 决策状态
- 通俗语言摘要（改了什么、验证了什么、还有什么可能出问题）
- 证据清单（自动化检查、手动走查、审查的文件/页面/数据、回滚方式）
- 发现分级（P0/P1/P2）
- 下一步行动

重要原则：不要先读每行代码再下结论。从验收标准和证据开始。 passing tests 是有用证据，不是保证。`,
    description: "将AI代码审查从'盯代码'转变为'接受证据包'的系统化验收框架，适配OpenAI Symphony理念",
    descriptionEn: "Transform AI code review from 'reading code' to 'accepting proof packets' with a systematic acceptance framework based on OpenAI Symphony",
    scenario: "使用AI生成代码（vibe coding）后需要验收质量、或者不懂代码但需要审查AI产出是否可交付",
    scenarioEn: "Accepting AI-generated code (vibe coding) when you need quality assurance or cannot read code confidently",
    problemFocus: "AI写代码后人类不知道该如何验收，要么盲目信任要么逐行阅读效率低，缺乏系统化的质量把控",
    problemFocusEn: "After AI writes code, humans don't know how to accept it — either blindly trusting or inefficiently reading line by line",
    author: "OpenAI Symphony · 提炼",
    likes: 89, views: "5.2K", comments: 12, createdAt: "2026-05-05",
  },
  {
    id: 1002,
    title: "系统化头脑风暴：从想法到设计文档",
    titleEn: "Systematic Brainstorming: From Ideas to Design Docs",
    role: "productManager",
    tags: ["头脑风暴", "需求探索", "方案设计", "产品规划", "Hard Gate"],
    tagsEn: ["Brainstorming", "Discovery", "Design", "Product Planning", "Hard Gate"],
    content: `在启动任何创意工作（创建功能、构建组件、添加功能或修改行为）之前，使用此头脑风暴流程。

## 核心原则
- 不要在未呈现设计并获得用户批准之前，调用任何实现技能、编写代码或搭建项目
- 每个项目都必须经过此过程，包括看似简单的待办列表、单功能工具、配置变更
- 设计可以很短（真正简单的项目几句话），但必须呈现并获得批准

## 执行清单（按顺序完成）

### 1. 探索项目上下文
检查文件、文档、近期提交，了解当前项目状态。

### 2. 提出澄清问题（一次一个）
- 每次只问一个问题
- 尽可能用选择题而非开放式问题
- 重点理解：目的、约束、成功标准
- 如果话题需要更多探索，拆分成多个问题

### 3. 提出2-3种方案（含权衡和你的推荐）
- 提出2-3种不同方法
- 用对话方式呈现选项，包含推荐和理由
- 先展示推荐选项并解释为什么

### 4. 展示设计（分段展示，逐段获得批准）
- 每个部分根据复杂度调整篇幅：简单项目几句话，复杂项目200-300字
- 每段展示后询问"这样看起来对吗"
- 覆盖：架构、组件、数据流、错误处理、测试
- 如果某部分不合理，准备好回去澄清

### 5. 写入设计文档
- 保存到 docs/plans/YYYY-MM-DD-<topic>-design.md
- 如可用，使用 elements-of-style:writing-clearly-and-concisely 技能
- 提交到git

### 6. 转入实施
- 调用 writing-plans 技能创建详细实施计划
- 不要调用任何其他技能
- 唯一的下一步是 writing-plans

## 关键原则总结
- 一次一个问题 — 不要同时抛出多个问题
- 优先选择题 — 比开放式问题更容易回答
- 严格遵循YAGNI — 从所有设计中移除不必要的功能
- 探索替代方案 — 确定前先提出2-3种方法
- 增量验证 — 展示设计，获得批准后再推进
- 保持灵活 — 某部分不合理时回去澄清

## 终端状态
头脑风暴的终端状态是调用 writing-plans。不要调用 frontend-design、mcp-builder 或任何其他实现技能。`,
    description: "在产品实施前的强制性设计阶段，通过结构化对话将想法转化为完整的设计文档，防止未经验证的假设导致返工",
    descriptionEn: "Mandatory pre-implementation design phase that transforms ideas into complete design docs through structured dialogue, preventing unvalidated assumptions",
    scenario: "产品经理、开发者在启动任何功能开发前，需要系统化探索需求、设计方案并获得确认",
    scenarioEn: "Product managers and developers needing systematic discovery and design validation before any feature development",
    problemFocus: "直接开始编码后发现需求理解错误、边界情况遗漏、方案有重大缺陷，导致大量返工",
    problemFocusEn: "Jumping into coding only to discover misunderstood requirements, missed edge cases, and flawed designs requiring heavy rework",
    author: "Cursor · 提炼",
    likes: 76, views: "4.8K", comments: 9, createdAt: "2026-05-05",
  },
  {
    id: 1003,
    title: "LLM Wiki：让AI替你维护个人知识库",
    titleEn: "LLM Wiki: Let AI Maintain Your Personal Knowledge Base",
    role: "researcher",
    tags: ["知识库", "RAG", "Obsidian", "知识管理", "持续积累"],
    tagsEn: ["Knowledge Base", "RAG", "Obsidian", "Knowledge Management", "Compounding"],
    content: `我想构建一个由LLM自动维护的个人/团队Wiki知识库。请帮我设计并实施以下架构。

## 核心理念
不要只在查询时从原始文档检索片段（传统RAG）。让LLM增量构建和维护一个持久的、结构化的、互相关联的markdown文件集合（Wiki）。

关键差异：Wiki是一个持久的、复利性的产物。交叉引用已经存在，矛盾已被标记，综合已经反映了你读过的所有内容。

## 三层架构

### 原始源 (Raw Sources)
- 你策划的源文档集合：文章、论文、图片、数据文件
- 不可变 — LLM读取但不修改
- 这是真相的来源

### Wiki层 (The Wiki)
- LLM生成的markdown文件目录：摘要、实体页、概念页、对比、概述、综合
- LLM完全拥有这一层：创建页面、更新、维护交叉引用、保持一致性
- 你阅读它；LLM编写它

### Schema层 (The Schema)
- 配置文档（如 CLAUDE.md 或 AGENTS.md）
- 告诉LLM Wiki的结构、约定、摄取/查询/维护工作流
- 你和LLM共同演进此文档

## 核心工作流

### 1. 摄取 (Ingest)
- 将新源放入raw集合，告诉LLM处理
- LLM读取源、讨论关键收获、写摘要页、更新索引、更新相关实体/概念页
- 单个源可能触及10-15个Wiki页面
- 偏好逐个摄取并保持参与，或批量摄取

### 2. 查询 (Query)
- 向Wiki提问，LLM搜索相关页面、阅读、综合回答并附引用
- 好的回答可以作为新页面归档回Wiki
- 让你的探索在知识库中复利积累

### 3. 清理 (Lint)
- 定期健康检查Wiki：页面间矛盾、过时声明、孤立页面、缺少概念页、缺失交叉引用、数据缺口
- LLM擅长建议新问题和要查找的新源

## 特殊文件

### index.md（内容导向）
- Wiki中所有页面的目录，每页附链接、一句话摘要、元数据
- 按类别组织（实体、概念、源等）
- LLM每次摄取后更新
- 回答查询时先读索引再深入

### log.md（时间导向）
- 追加式记录：摄取、查询、清理
- 使用统一前缀（如 ## [2026-04-02] ingest | Article Title）
- 可用grep/Unix工具解析：grep "^## \\[" log.md | tail -5

## 适用场景
- 个人：追踪目标、健康、心理学、自我提升
- 研究：数周/数月深入研究论文、报告、构建综合Wiki
- 读书：按章节归档，构建角色/主题/情节线索页
- 商业/团队：内部Wiki由LLM维护，来源于Slack/会议/文档
- 竞品分析、尽职调查、旅行规划、课程笔记、爱好深度探索

## 可选工具
- Obsidian + Obsidian Web Clipper（浏览器文章转markdown）
- qmd（本地markdown搜索引擎，BM25/向量混合搜索）
- Marp（markdown幻灯片）
- Dataview（Obsidian插件，查询YAML frontmatter）
- Wiki就是git仓库 — 获得版本历史、分支、协作

## 启动指令
"我想为[领域/话题]创建一个LLM维护的Wiki。请帮我设计目录结构、schema约定，并处理我的第一个源文件：[文件内容]。"`,
    description: "让AI从原始文档增量构建持久知识库的架构模式，替代一次性RAG，实现知识的复利积累",
    descriptionEn: "Architecture pattern for incrementally building persistent knowledge bases from raw documents — replacing one-shot RAG with compounding knowledge",
    scenario: "研究员、知识工作者需要长期追踪某一领域的知识，避免每次问AI都从零检索拼凑",
    scenarioEn: "Researchers and knowledge workers needing long-term knowledge tracking in a domain, avoiding repeated zero-start retrieval",
    problemFocus: "传统RAG每次提问都重新检索拼凑，没有知识积累；NotebookLM和ChatGPT文件上传都无法跨文档建立持久关联",
    problemFocusEn: "Traditional RAG re-retrieves from scratch every time with no accumulation; NotebookLM and ChatGPT uploads lack persistent cross-document synthesis",
    author: "Cursor · 提炼",
    likes: 112, views: "7.1K", comments: 18, createdAt: "2026-05-05",
  },
  {
    id: 1004,
    title: "系统化调试：先找根因再修复",
    titleEn: "Systematic Debugging: Root Cause Before Fix",
    role: "developer",
    tags: ["调试", "Bug修复", "根因分析", "测试驱动", "科学方法"],
    tagsEn: ["Debugging", "Bug Fixing", "Root Cause Analysis", "Test-Driven", "Scientific Method"],
    content: `遇到任何bug、测试失败或意外行为时，使用此系统化调试流程。在找到根因之前，禁止提出修复方案。

## 铁律
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
如果未完成第一阶段，你不能提出修复。

## 适用场景
- 测试失败、生产bug、意外行为、性能问题、构建失败、集成问题
- 尤其适用：时间压力下、"快速修复"看起来明显时、已尝试多个修复未成功、不完全理解问题时
- 绝不跳过：问题看起来简单时、赶时间时、经理要求立即修复时

## 四阶段流程（必须按顺序完成）

### 第一阶段：根因调查（提出修复前必须完成）
1. **仔细阅读错误信息**
   - 不要跳过错误或警告
   - 它们常包含精确解决方案
   - 完整阅读堆栈跟踪，记录行号、文件路径、错误码
2. **稳定复现**
   - 能可靠触发吗？
   - 精确步骤是什么？
   - 每次都发生吗？
   - 如不可复现 → 收集更多数据，不要猜测
3. **检查近期变更**
   - git diff、近期提交
   - 新依赖、配置变更
   - 环境差异
4. **多组件系统证据收集**
   - 对每个组件边界：记录进入的数据、离开的数据、验证环境/配置传播、检查每层状态
   - 运行一次收集证据，显示在哪里中断
   - 然后分析证据识别失败组件
   - 再调查该特定组件
5. **追踪数据流**
   - 坏值起源于哪里？
   - 什么调用者传入了坏值？
   - 持续向上追踪直到找到源头
   - 在源头修复，不在症状处修复

### 第二阶段：模式分析（修复前找到模式）
1. **找到工作示例**
   - 在同一代码库中定位相似的工作代码
   - 什么工作原理与当前破损的相似？
2. **对比参考实现**
   - 如实现某种模式，完整阅读参考实现
   - 不要略读 — 每行都读
   - 应用前完整理解模式
3. **识别差异**
   - 工作和破损之间有什么不同？
   - 列出每个差异，无论多小
   - 不要假设"那不可能有影响"
4. **理解依赖**
   - 需要哪些其他组件？
   - 需要哪些设置、配置、环境？
   - 做了哪些假设？

### 第三阶段：假设与测试（科学方法）
1. **形成单一假设**
   - 清晰陈述："我认为X是根因因为Y"
   - 写下来，具体而非模糊
2. **最小化测试**
   - 做最小的可能变更来测试假设
   - 一次只改一个变量
   - 不要同时修复多个问题
3. **验证后再继续**
   - 有效？→ 进入第四阶段
   - 无效？→ 形成新假设
   - 不要在上面叠加更多修复
4. **不知道时**
   - 说"我不懂X"
   - 不要假装知道
   - 寻求帮助或更多研究

### 第四阶段：实施（修复根因而非症状）
1. **创建失败测试用例**
   - 最简单的复现
   - 自动化测试如可能，否则一次性测试脚本
   - 修复前必须有
2. **实施单一修复**
   - 针对已识别的根因
   - 一次只改一处
   - 没有"顺便"改进
   - 不捆绑重构
3. **验证修复**
   - 测试现在通过？
   - 无其他测试被破坏？
   - 问题实际解决？
4. **修复无效时**
   - 停止
   - 统计：已尝试多少次修复？
   - < 3次：返回第一阶段，用新信息重新分析
   - ≥ 3次：STOP并质疑架构（见第5步）
5. **3+次失败时：质疑架构**
   - 每个修复在不同地方揭示新的共享状态/耦合/问题
   - 修复需要"大规模重构"才能实现
   - 每个修复在别处创造新症状
   → 这是架构问题，不是失败的假设。讨论后再继续。

## 红旗 — 立即停止并遵循流程
- "先快速修复，以后再调查"
- "试试改X看有没有用"
- "加多个变更，跑测试"
- "跳过测试，我手动验证"
- "大概是X，让我修那个"
- "我不完全懂但这可能有用"
- "模式说X但我用不同方式适配"
- 在追踪数据流前提出解决方案
- "再试一次修复"（已失败2+次）

**所有这些意味着：停止。返回第一阶段。**

## 常见借口与现实
| 借口 | 现实 |
| "问题简单，不需要流程" | 简单问题也有根因。流程对简单bug很快。 |
| "紧急情况，没时间走流程" | 系统调试比胡乱尝试更快。 |
| "先试这个，然后再调查" | 第一个修复定模式。从一开始就做好。 |
| "确认修复有效后再写测试" | 未经测试的修复不持久。先测试证明它。 |
| "同时修复多个问题省时间" | 无法隔离什么起了作用。会引入新bug。 |
| "参考太长，我适配模式" | 部分理解保证bug。完整阅读。 |
| "我看到问题了，让我修" | 看到症状 ≠ 理解根因。 |

## 速查表
| 阶段 | 关键活动 | 成功标准 |
| 1. 根因 | 读错误、复现、检查变更、收集证据 | 理解WHAT和WHY |
| 2. 模式 | 找到工作示例、对比 | 识别差异 |
| 3. 假设 | 形成理论、最小测试 | 确认或新假设 |
| 4. 实施 | 创建测试、修复、验证 | Bug解决，测试通过 |

## 现实影响
- 系统化方法：15-30分钟修复
- 随机修复：2-3小时折腾
- 首次修复率：95% vs 40%
- 引入新bug：接近零 vs 常见`,
    description: "基于'无根因不修'铁律的4阶段调试框架：根因调查→模式分析→假设测试→实施修复，含红旗清单和常见借口对照表",
    descriptionEn: "4-phase debugging framework based on 'no fix without root cause' iron law: investigation → pattern analysis → hypothesis testing → implementation, with red flags and rationalization table",
    scenario: "开发者在面对任何技术问题时，尤其是时间压力下，需要避免猜测式修复，建立系统化的调试纪律",
    scenarioEn: "Developers facing any technical issue, especially under time pressure, needing to avoid guess-and-check and build systematic debugging discipline",
    problemFocus: "看到报错直觉式改代码，越修bug越多；3次以上尝试失败后仍不质疑架构，陷入无效循环",
    problemFocusEn: "Intuitively changing code at first error sight, creating more bugs; failing 3+ times without questioning architecture, stuck in ineffective loops",
    author: "Cursor · 提炼",
    likes: 134, views: "8.3K", comments: 22, createdAt: "2026-05-05",
  },

  // ========== 合并模板：网站/SaaS ==========
  {
    id: 1005,
    title: "AI编程模板：网站/SaaS项目（小白+专业版）",
    titleEn: "AI Coding Template: Website / SaaS Project (Beginner + Pro)",
    role: "developer",
    tags: ["Next.js", "全栈开发", "SaaS", "电商", "项目模板", ".cursorrules"],
    tagsEn: ["Next.js", "Full-Stack", "SaaS", "E-commerce", "Project Template", ".cursorrules"],
    content: `【小白填空版 — 适合非程序员】

你是一位资深全栈工程师。我是一个不懂代码的产品负责人，我会用大白话告诉你我要什么，你来帮我实现。

## 我的项目
项目名称：[填你的项目名，比如"AI简历助手"]
一句话描述：[填项目是干嘛的，比如"用户上传简历，AI帮优化措辞和排版"]
目标用户：[填给谁用的，比如"找工作的大学生"]
核心功能：
- [功能1，比如"用户注册登录"]
- [功能2，比如"上传简历PDF"]
- [功能3，比如"AI一键优化简历"]
- [功能4，比如"下载优化后的简历"]

## 技术要求（硬性规定，勿改）
技术栈：Next.js 15 App Router + React 19 + TypeScript + Tailwind CSS + shadcn/ui
包管理器：pnpm

### 代码规范红线
1. 每次修改代码前，先说清楚你要改哪个文件的哪个部分，改完后列出所有被影响的文件
2. 不准偷偷删除我没提到的代码。如果你觉得某段代码该删，必须先问我
3. 新功能先建新文件，不要直接往已有的文件里塞代码
4. 每个页面和组件都要能正常显示，不准留空白页面或半成品

### 项目结构规范
- 页面放 app/ 目录，每个页面一个文件夹
- 可复用组件放 components/ 目录
- 工具函数放 lib/ 目录
- 所有代码使用 TypeScript，不要用纯 JavaScript
- 样式全部用 Tailwind CSS 的 class，不要写单独的 CSS 文件
- UI 组件优先用 shadcn/ui，保持界面风格统一

### 沟通要求
- 跟我解释任何技术问题时，用大白话说，不要丢术语
- 遇到需要我做选择的地方，给我 2-3 个选项并说明优缺点
- 如果我的需求有矛盾或不清楚的地方，先问我，不要自己猜
- 每完成一个功能，告诉我怎么在浏览器里看效果

---

【专业实战版 — 适合有经验的开发者】

## 项目概况
这是一个 SaaS 订阅制电商平台「XXX」，支持商家入驻、商品管理、订单处理和会员订阅。面向 B2C 场景，包含用户端商城和商家后台两个入口。

## 技术栈与版本
Next.js 15.1 (App Router) · React 19 · TypeScript 5.6 · Tailwind CSS 3.4 · Shadcn UI · Radix UI · Vercel AI SDK 4.0 · Prisma 6.0 · PostgreSQL 16 · NextAuth.js 5 · Stripe SDK · Zustand 5 · nuqs 2.0 · Zod 3.23 · pnpm 9

## 核心业务模块
1. 用户认证与授权：NextAuth.js 5，支持邮箱/GitHub/Google OAuth，JWT策略，middleware.ts统一拦截
2. 商品管理：Server Actions + Zod校验，图片上传Vercel Blob/Cloudflare R2，RSC直接查库
3. 购物车与结算：Zustand客户端状态persist到localStorage，匿名购物车登录后自动合并，Stripe Checkout Session
4. 订单系统：状态机 pending→paid→shipped→delivered/refunded，Prisma Transaction保证原子性
5. 数据分析面板：Recharts绘图，RSC + Suspense流式渲染，Vercel AI SDK生成运营建议

## API规范
- Server Actions 为推荐方式，统一响应格式 { success, data?, error? }
- API Route供第三方调用：RESTful风格，Authorization: Bearer <token>
- Stripe Webhook：幂等处理用event.id去重

## 性能优化
- Server Components优先，最小化'use client'
- Suspense包裹慢查询 + loading.tsx骨架屏
- next/image自动WebP/AVIF + 响应式sizes
- @next/bundle-analyzer定期检查包体积
- Prisma查询加select限制字段，避免N+1
- 开启React 19 Compiler自动优化re-render

## 常见坑点
- Next.js 15中params和searchParams是异步的，必须await
- 'use client'标记后该文件及导入全部变为客户端bundle
- Server Actions不能返回Date/Map/Set，需转为普通对象
- Stripe Webhook需要原始body(request.text()后手动验证签名)
- Prisma热更新问题：开发环境用全局单例避免连接池溢出`,
    description: "面向网站和SaaS项目的双版本AI编程规则模板：小白填空版用大白话+硬性技术规范，专业版含完整Next.js 15电商架构",
    descriptionEn: "Dual-version AI coding template for websites/SaaS: beginner fill-in-the-blank with plain language + hard tech specs, pro version with complete Next.js 15 e-commerce architecture",
    scenario: "想用AI工具（Cursor/Claude/Windsurf等）开发网站或SaaS产品，但不知道如何写规则文件让AI按预期输出",
    scenarioEn: "Wanting to use AI tools (Cursor/Claude/Windsurf) to build a website or SaaS but unsure how to write rule files for expected output",
    problemFocus: "没有项目规则文件时AI在盲人摸象，写出来的代码架构混乱、技术栈不一致、后期维护成本极高",
    problemFocusEn: "Without project rule files AI codes blindly, producing chaotic architecture, inconsistent tech stacks, and high maintenance costs",
    author: "修Bug的Lucas",
    likes: 156, views: "9.6K", comments: 28, createdAt: "2026-05-05",
  },

  // ========== 合并模板：后台管理 ==========
  {
    id: 1006,
    title: "AI编程模板：后台管理系统（小白+专业版）",
    titleEn: "AI Coding Template: Admin Dashboard (Beginner + Pro)",
    role: "developer",
    tags: ["React", "后台管理", "数据看板", "TanStack Query", "项目模板"],
    tagsEn: ["React", "Admin Dashboard", "Data Visualization", "TanStack Query", "Project Template"],
    content: `【小白填空版 — 适合非程序员】

你是一位资深前端工程师。我是一个不懂代码的项目负责人，我会用大白话告诉你我要什么功能，你来帮我实现。

## 我的项目
项目名称：[填你的项目名，比如"XX公司运营后台"]
一句话描述：[填后台是管什么的，比如"管理公司的客户信息和订单数据"]
谁来用这个后台：[填使用者角色，比如"运营人员和客服"]
需要管理的数据：
- [数据1，比如"客户信息（姓名、手机、地址）"]
- [数据2，比如"订单记录（商品、金额、状态）"]
- [数据3，比如"数据统计（每日销售额、客户增长）"]
需要的功能：
- [功能1，比如"登录页面，不同角色看到不同内容"]
- [功能2，比如"数据看板，展示关键指标和图表"]
- [功能3，比如"客户列表，支持搜索、筛选、翻页"]
- [功能4，比如"导出 Excel"]

## 技术要求（硬性规定，勿改）
技术栈：React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui
数据请求：TanStack Query
表格组件：TanStack Table
图表：Recharts
表单：React Hook Form + Zod
包管理器：pnpm

### 代码规范红线
1. 每次修改代码前，先说清楚你要改哪个文件的哪个部分，改完后列出所有被影响的文件
2. 不准偷偷删除我没提到的代码
3. 新功能先建新文件，不要直接往已有的大文件里塞代码
4. 所有表格必须支持排序、搜索和翻页，不准做成一次性加载全部数据的假表格

### 项目结构规范
- 页面放 src/app/routes/ 目录
- 可复用组件放 src/components/ 目录
- API 请求统一放 src/services/ 目录，每个模块一个文件
- 类型定义统一放 src/types/ 目录
- 所有代码使用 TypeScript，样式全部用 Tailwind CSS，组件优先用 shadcn/ui

---

【专业实战版 — 适合有经验的开发者】

## 项目概况
企业级后台管理系统「XXX」，为中型SaaS公司提供数据管理界面。包含数据看板、用户管理、内容管理、权限控制和系统配置等模块。后端API由独立的FastAPI服务提供。

## 技术栈与版本
React 19 · TypeScript 5.6 · Vite 6.0 · React Router 7 · TanStack Query 5 · TanStack Table 8 · Zustand 5 · shadcn/ui · Radix UI · Tailwind CSS 3.4 · Recharts 2.12 · React Hook Form 7 + Zod 3.23 · Axios 1.7 · date-fns 3 · pnpm 9

## 核心业务模块
1. 数据看板：顶部4个StatsCard指标 → 中部Recharts面积图 → 底部最近订单表格 + 热门内容列表，TanStack Query 60秒自动刷新
2. 用户管理：TanStack Table实现排序/筛选/翻页/批量操作，基于角色(admin/editor/viewer)的按钮级权限，use-permissions hook控制UI显隐
3. 内容管理：Tiptap富文本编辑器支持图片/代码块/表格，分类管理树形结构支持拖拽排序
4. 系统设置：个人资料/团队管理/账单管理

## 数据流与状态管理
- 服务端状态：TanStack Query，queryKey必须是稳定引用
- 客户端状态：Zustand（auth-store:用户信息/角色/token；ui-store:侧边栏/主题/语言）
- 表单状态：React Hook Form + Zod

## API规范
- Axios封装：请求拦截器自动带token，响应拦截器统一错误处理（401自动logout）
- 统一响应格式：ApiResponse<T> { success, data, message? } / PaginatedResponse<T>
- 认证：accessToken存内存(Zustand)，refreshToken存httpOnly cookie，过期自动续期

## 性能优化
- React.lazy + Suspense 按路由懒加载
- @tanstack/react-virtual 大列表虚拟滚动
- useDebounce 300ms防抖搜索
- React.memo包裹复杂表格行
- Vite manualChunks拆分vendor包
- lodash-es替代lodash确保Tree Shaking

## 常见坑点
- React Router v7 loader/action API有改动
- shadcn/ui不是npm包，是代码生成工具，修改后不会被覆盖
- TanStack Query的queryKey数组内对象每次渲染创建新引用会导致无限重新请求
- Tailwind dark mode用class策略而非media
- Vite环境变量只有VITE_前缀会注入客户端
- React Hook Form的watch性能比useEffect监听state好很多`,
    description: "面向后台管理系统的双版本AI编程规则模板：小白版聚焦数据看板+表格管理，专业版含企业级权限/缓存/虚拟滚动架构",
    descriptionEn: "Dual-version AI coding template for admin dashboards: beginner version focuses on data visualization + table management, pro version includes enterprise-grade permissions/caching/virtual scrolling",
    scenario: "需要快速搭建运营后台、数据看板或内容管理系统，让AI按规范输出可维护的React后台代码",
    scenarioEn: "Need to quickly build ops dashboards, data visualizations, or CMS systems with AI generating maintainable React admin code",
    problemFocus: "后台系统表格不做分页排序搜索、权限控制混乱、状态管理随意，导致大量数据时页面卡顿",
    problemFocusEn: "Admin systems lacking table pagination/sorting/search, chaotic permission controls, and ad-hoc state management causing page lag with large datasets",
    author: "修Bug的Lucas",
    likes: 98, views: "6.2K", comments: 15, createdAt: "2026-05-05",
  },

  // ========== 合并模板：内容网站/博客 ==========
  {
    id: 1007,
    title: "AI编程模板：内容网站/博客（小白+专业版）",
    titleEn: "AI Coding Template: Content Site / Blog (Beginner + Pro)",
    role: "creator",
    tags: ["Vue", "Nuxt", "内容网站", "博客", "Markdown", "项目模板"],
    tagsEn: ["Vue", "Nuxt", "Content Site", "Blog", "Markdown", "Project Template"],
    content: `【小白填空版 — 适合非程序员内容创作者】

你是一位资深前端开发者。我是一个不懂代码的内容创作者，我会用大白话告诉你我想要什么样的网站，你来帮我搭建。

## 我的项目
网站名称：[填你的网站名，比如"我的技术笔记"]
一句话描述：[填网站是干嘛的，比如"分享我的技术学习笔记和项目经验"]
网站需要哪些页面：
- [页面1，比如"首页：展示最新文章列表"]
- [页面2，比如"文章详情页：展示完整文章内容"]
- [页面3，比如"标签页：按标签分类浏览"]
- [页面4，比如"关于我：个人介绍"]
特殊需求：
- [需求1，比如"支持暗色模式"]
- [需求2，比如"文章支持代码高亮"]
- [需求3，比如"手机上也要好看"]

## 技术要求（硬性规定，勿改）
技术栈：Vue 3 + Nuxt 3 + TypeScript + Nuxt Content + TailwindCSS
内容格式：Markdown文件（我只需要写 .md 文件就能发布文章）
包管理器：pnpm

### 代码规范红线
1. 每次修改代码前，先说清楚你要改哪个文件的哪个部分，改完后列出所有被影响的文件
2. 不准偷偷删除我没提到的代码
3. 文章内容全部用 Markdown 文件管理，放在 content/ 目录下，我不需要碰任何代码就能写文章
4. 网站必须在手机上也能正常浏览，不准出现横向滚动条

### 沟通要求
- 跟我解释任何技术问题时，用大白话说，不要丢术语
- 遇到需要我做选择的地方，给我 2-3 个选项并说明优缺点
- 教我怎么发布新文章时，只说"在哪个文件夹新建一个 .md 文件"就行，不要让我碰代码

---

【专业实战版 — 适合有经验的开发者】

## 项目概况
技术博客与文档站「XXX」，支持 Markdown 写作、文章分类、标签系统、全文搜索、暗色模式和 RSS 输出。面向技术内容创作者，兼具博客展示和文档管理功能。

## 技术栈与版本
Vue 3.5 (Composition API + <script setup>) · Nuxt 3.14 · TypeScript 5.6 · Nuxt Content 3 · Nuxt Image 1.8 · @nuxtjs/color-mode 3 · TailwindCSS 3.4 · @nuxt/fonts · Pinia 2.2 · VueUse 11 · Shiki · pnpm 9

## 核心业务模块
1. 博客系统：Markdown通过Nuxt Content自动解析，frontmatter定义标题/日期/标签/摘要，支持分页/筛选/排序/阅读时间估算/相关文章推荐
2. 文档系统：数字前缀控制顺序(1.getting-started.md)，自动生成侧边栏导航树，支持Mermaid图表渲染
3. 搜索功能：基于Nuxt Content内置搜索API，结果高亮关键词，支持标题和正文搜索
4. SEO与社交分享：每页自动生成meta标签(useHead+useSeoMeta)，Open Graph图片自动生成，JSON-LD结构化数据，RSS和Sitemap自动生成

## 性能优化
- SSG预渲染：博客文章全部预渲染为静态HTML(nuxt generate)
- ISR增量渲染：文档部分用routeRules配置ISR
- Nuxt Image自动响应式srcset+WebP转换+懒加载
- @nuxt/fonts自动托管Google Fonts消除外部请求
- 非首屏组件用LazyXxx前缀自动按需加载
- Shiki只加载实际用到的语言语法包
- 预渲染关键路由：nuxt.config.ts中配置nitro.prerender.routes

## 常见坑点
- <script setup>中useAsyncData/useFetch必须在setup顶层调用，不能在事件回调里调用
- Nuxt Content文件路径即URL路径，content/blog/hello.md对应/blog/hello
- auto-import的坑：IDE可能报红线，需配置好TypeScript
- hydration mismatch：浏览器API(window/localStorage)用<ClientOnly>包裹，日期格式化时区不一致
- Pinia持久化pinia-plugin-persistedstate只在客户端生效，SSR首次渲染拿不到持久化的值`,
    description: "面向内容创作者的双版本博客模板：小白版只需写Markdown无需碰代码，专业版含SSG/ISR/SEO/搜索/RSS完整架构",
    descriptionEn: "Dual-version blog template for content creators: beginner version only needs Markdown without touching code, pro version includes SSG/ISR/SEO/search/RSS complete architecture",
    scenario: "创作者想搭建个人博客、技术文档站或作品集，希望专注于写作而非技术配置",
    scenarioEn: "Creators wanting to build personal blogs, tech docs sites, or portfolios, focusing on writing rather than technical configuration",
    problemFocus: "搭建博客时被大量技术细节淹没，不会配置路由/构建/SEO，写完文章还要折腾部署",
    problemFocusEn: "Getting overwhelmed by technical details when building blogs, unable to configure routing/building/SEO, struggling with deployment after writing",
    author: "修Bug的Lucas",
    likes: 87, views: "5.8K", comments: 14, createdAt: "2026-05-05",
  },

  // ========== 合并模板：后端API服务 ==========
  {
    id: 1008,
    title: "AI编程模板：后端API服务（小白+专业版）",
    titleEn: "AI Coding Template: Backend API Service (Beginner + Pro)",
    role: "developer",
    tags: ["Python", "FastAPI", "后端开发", "API设计", "PostgreSQL", "项目模板"],
    tagsEn: ["Python", "FastAPI", "Backend", "API Design", "PostgreSQL", "Project Template"],
    content: `【小白填空版 — 适合非程序员】

你是一位资深后端工程师。我是一个不太懂后端的产品负责人，我会告诉你我的业务需求，你来设计和实现 API。
⚠ 这个模板适合你的项目已经有前端了，需要单独做后端服务的情况。如果你是从零开始做网站，用网站/SaaS模板就够了。

## 我的项目
项目名称：[填你的项目名，比如"XX商城后端"]
一句话描述：[填后端是服务什么的，比如"给电商小程序提供用户、商品、订单的接口"]
需要哪些接口：
- [接口1，比如"用户注册、登录、修改个人信息"]
- [接口2，比如"商品列表、商品详情、搜索商品"]
- [接口3，比如"创建订单、查看订单、取消订单"]
- [接口4，比如"数据统计：每日订单数、销售额"]
数据存在哪：[比如"PostgreSQL数据库"或"不确定，你帮我选"]

## 技术要求（硬性规定，勿改）
技术栈：Python 3.12 + FastAPI + SQLAlchemy 2.0 + Pydantic 2 + PostgreSQL
认证方式：JWT Token
包管理器：uv

### 代码规范红线
1. 每次修改代码前，先说清楚你要改哪个文件的哪个部分，改完后列出所有被影响的文件
2. 不准偷偷删除我没提到的代码
3. 每个接口都必须有参数校验，不能让用户随便传什么都能过
4. 数据库操作必须用事务，不能出现"钱扣了但订单没创建"这种情况

### 接口规范
- 所有接口返回统一的 JSON 格式：{"success": true/false, "data": ..., "message": "..."}
- 列表接口必须支持分页
- 错误要返回有意义的提示信息，不要返回一堆代码报错

---

【专业实战版 — 适合有经验的开发者】

## 项目概况
RESTful API后端服务「XXX」，为前端管理系统和电商平台提供数据接口。包含用户认证、商品管理、订单处理、文件上传和数据统计等模块。使用PostgreSQL存储数据，Redis缓存热点数据，Celery处理异步任务。

## 技术栈与版本
Python 3.12 · FastAPI 0.115 · Pydantic 2.10 · SQLAlchemy 2.0 (async) · Alembic 1.14 · asyncpg 0.30 · PostgreSQL 16 · Redis 7 · Celery 5.4 · python-jose 3.3 · Passlib + bcrypt · boto3 · Pytest 8 + httpx · uv · Docker + Docker Compose

## 核心业务模块
1. 用户认证与授权：注册(邮箱+bcrypt)，登录返回accessToken(15分钟)+refreshToken(7天)，JWT中间件自动解析，角色权限admin/merchant/user，refreshToken续期
2. 商品管理：CRUD+分页筛选+软删除，图片上传S3返回CDN，Redis缓存热门商品列表TTL 5分钟
3. 订单处理：创建订单校验库存→扣减库存→创建订单→返回支付链接(事务原子性)，状态机 pending→paid→shipped→delivered/cancelled，Celery异步邮件通知
4. 数据统计：按日/周/月聚合销售额/用户增长/热销Top10，Redis缓存+Celery定时任务每小时更新

## 数据流与架构
HTTP请求 → Middleware(日志/CORS/限流) → Router(路径匹配+参数解析) → Dependencies(认证+权限) → Service(业务逻辑) → Repository(数据库操作) → Response(Pydantic序列化)

## API规范
- RESTful设计：GET/POST/PUT/DELETE标准语义
- 统一响应格式：ApiResponse<T>{success,data,message} / PaginatedResponse<T>{items,total,page,page_size,total_pages}
- 数据库Session管理：async_sessionmaker全局单例避免连接池溢出
- 缓存策略：Cache-Aside模式，写操作主动清除相关缓存key，key规范：{资源类型}:{id} 或 {资源类型}:list:{hash(params)}

## 常见坑点
- SQLAlchemy 2.0 async模式必须使用create_async_engine+async_sessionmaker
- Alembic迁移脚本要检查可回滚性
- Celery任务要处理幂等性，防止重复执行
- FastAPI依赖注入中的数据库session生命周期管理
- Pydantic V2模型配置变更：orm_mode → from_attributes`,
    description: "面向后端API的双版本模板：小白版聚焦接口定义和基础规范，专业版含完整FastAPI异步架构/缓存/Celery/分层设计",
    descriptionEn: "Dual-version backend API template: beginner version focuses on interface definition and basic specs, pro version includes complete FastAPI async architecture/caching/Celery/layered design",
    scenario: "已有前端需要独立后端服务，或需要为小程序/App提供数据接口，让AI按规范输出可扩展的Python后端",
    scenarioEn: "Need a standalone backend for an existing frontend, or providing data APIs for mini-programs/apps, wanting AI to output scalable Python backends to spec",
    problemFocus: "后端接口不做参数校验、不写事务、不统一响应格式，导致安全漏洞和数据不一致",
    problemFocusEn: "Backend APIs lacking parameter validation, transactions, and unified response formats, leading to security vulnerabilities and data inconsistency",
    author: "修Bug的Lucas",
    likes: 72, views: "4.5K", comments: 11, createdAt: "2026-05-05",
  },

  // ========== 合并模板：微信小程序 ==========
  {
    id: 1009,
    title: "AI编程模板：微信小程序（小白+专业版）",
    titleEn: "AI Coding Template: WeChat Mini Program (Beginner + Pro)",
    role: "founder",
    tags: ["微信小程序", "微信生态", "快速验证", "MVP", "项目模板"],
    tagsEn: ["WeChat Mini Program", "WeChat Ecosystem", "Quick Validation", "MVP", "Project Template"],
    content: `【小白填空版 — 适合非程序员】

你是一位微信小程序开发专家。我是一个不懂代码的产品负责人，我会告诉你我想做什么小程序，你来帮我实现。

## 我的项目
小程序名称：[填你的小程序名，比如"附近好店"]
一句话描述：[填小程序是干嘛的，比如"帮用户发现和收藏附近的优质小店"]
目标用户：[填给谁用的，比如"20-35岁的年轻人，喜欢探店"]
核心功能：
- [功能1，比如"首页展示附近店铺列表"]
- [功能2，比如"店铺详情页（图片、评价、地址）"]
- [功能3，比如"收藏店铺"]
- [功能4，比如"我的主页（收藏列表、浏览历史）"]
需要对接的微信能力：
- [能力1，比如"获取用户位置"]
- [能力2，比如"微信登录"]
- [能力3，比如"分享给好友"]

## 技术要求（硬性规定，勿改）
框架：微信小程序原生框架
样式单位：rpx（750rpx = 屏幕宽度）

### 代码规范红线
1. 每次修改代码前，先说清楚你要改哪个文件的哪个部分，改完后列出所有被影响的文件
2. 不准偷偷删除我没提到的代码
3. setData 每次只传需要更新的数据，不要一次性把整个 data 对象扔进去（不然页面会卡）
4. 所有页面都要适配不同手机屏幕，尤其是底部安全区域（刘海屏手机）

### 性能规范
- 图片全部使用懒加载
- 长列表使用虚拟列表或分页加载
- 主包体积控制在 2MB 以内，非首页内容用分包加载
- 不要在页面滚动事件里做复杂计算

---

【专业实战版 — 适合有经验的开发者】

## 项目概况
微信小程序「XXX」，基于微信原生框架开发。面向C端用户，集成微信生态能力（登录、支付、分享、地理位置）。适用于电商、预约、工具、社区等场景。

## 技术栈与版本
微信小程序原生框架 · TypeScript（通过tsconfig配置） · SCSS/WXSS · 微信开发者工具 · miniprogram-ci（CI构建）

## 核心业务模块
1. 用户系统：微信登录(wx.login+wx.getUserProfile)，用户信息存储到后端，支持手机号绑定
2. 页面路由：tabBar页面+子包分包加载策略，主包控制在2MB以内
3. 数据请求：统一封装wx.request为Promise，添加请求拦截器（token自动携带）和响应拦截器（错误统一处理/401跳转登录）
4. 本地存储：敏感数据用加密存储，缓存策略（热门数据本地缓存+过期刷新）
5. 分享传播：自定义分享卡片（onShareAppMessage），支持生成海报canvas绘制
6. 支付闭环：微信支付统一下单，回调验证订单状态更新

## 架构设计
- 每个页面一个文件夹放在 pages/ 下
- 可复用组件放 components/ 目录
- 网络请求统一封装在 services/ 目录
- 工具函数放 utils/ 目录
- wx.request用Promise封装，拒绝回调地狱
- 全局状态管理：使用MobX或自研发布订阅模式

## 性能优化
- 图片懒加载（lazy-load）+ 缩略图策略
- 长列表分页加载或虚拟列表（recycle-view）
- 分包加载策略：按用户路径拆分，tabBar页在主包，详情页/订单页在子包
- 避免setData大数据量更新，只传变化字段
- 避免在onPageScroll中做复杂计算，使用节流函数

## 微信审核与合规
- 用户隐私保护指引必须配置（小程序后台→设置→基本设置→用户隐私保护指引）
- 收集用户信息前必须弹出隐私协议弹窗
- 涉及用户生成内容(UGC)需配置内容安全接口（imgSecCheck/msgSecCheck）
- 支付功能需开通微信支付商户号，小程序主体与商户号主体一致
- 社交/社区类小程序需准备ICP备案或电信业务经营许可证

## 常见坑点
- 微信小程序不支持部分ES6+特性，需通过babel转换或手动兼容
- AppID和开发版/体验版/正式版的环境隔离配置
- 真机调试与模拟器差异：部分API仅在真机可用（如蓝牙、NFC）
- 缓存清理：微信客户端有小程序缓存机制，版本更新后用户可能仍在使用旧版本
- 页面栈限制：最多10层页面，深层跳转需用redirectTo替代navigateTo`,
    description: "面向微信小程序的双版本模板：小白版聚焦微信原生能力和基础规范，专业版含分包加载/支付闭环/审核合规/性能优化完整方案",
    descriptionEn: "Dual-version WeChat Mini Program template: beginner version focuses on native capabilities and basic specs, pro version includes sub-package loading/payment compliance/audit guidelines/performance optimization",
    scenario: "创业者想快速在微信生态验证产品想法，或需要开发电商/预约/工具类小程序",
    scenarioEn: "Founders wanting to quickly validate product ideas in the WeChat ecosystem, or needing e-commerce/appointment/tool mini-programs",
    problemFocus: "小程序主包超过2MB无法上传、审核因隐私协议不通过、setData不当导致页面卡顿、支付回调处理不完善",
    problemFocusEn: "Mini-program main package exceeding 2MB upload limit, privacy policy audit failures, page lag from improper setData, incomplete payment callback handling",
    author: "修Bug的Lucas",
    likes: 65, views: "4.1K", comments: 9, createdAt: "2026-05-05",
  },

  // ========== 合并模板：手机App ==========
  {
    id: 1010,
    title: "AI编程模板：手机App iOS/Android（小白+专业版）",
    titleEn: "AI Coding Template: Mobile App iOS/Android (Beginner + Pro)",
    role: "developer",
    tags: ["React Native", "Expo", "跨端开发", "iOS", "Android", "项目模板"],
    tagsEn: ["React Native", "Expo", "Cross-Platform", "iOS", "Android", "Project Template"],
    content: `【小白填空版 — 适合非程序员】

你是一位资深移动端开发工程师。我是一个不懂代码的产品负责人，我会告诉你我想做什么 App，你来帮我实现。

## 我的项目
App 名称：[填你的 App 名，比如"每日记账"]
一句话描述：[填 App 是干嘛的，比如"帮用户快速记录每天的收入和支出"]
目标用户：[填给谁用的，比如"想养成记账习惯的年轻人"]
核心功能：
- [功能1，比如"快速记一笔（金额、分类、备注）"]
- [功能2，比如"月度报表（饼图展示各分类占比）"]
- [功能3，比如"预算设置和超支提醒"]
- [功能4，比如"数据导出为 Excel"]
需要支持的平台：[比如"iOS 和 Android 都要" 或 "先做 iOS"]

## 技术要求（硬性规定，勿改）
技术栈：React Native + Expo SDK 52 + TypeScript
导航：Expo Router
包管理器：pnpm

### 代码规范红线
1. 每次修改代码前，先说清楚你要改哪个文件的哪个部分，改完后列出所有被影响的文件
2. 不准偷偷删除我没提到的代码
3. 所有页面都要在 iOS 和 Android 上测试通过，不准出现一边好一边崩的情况
4. 加载数据时必须有加载状态，不准让用户对着空白页面发呆

### 项目结构规范
- 页面放 app/ 目录（Expo Router 基于文件的路由）
- 可复用组件放 components/ 目录
- 工具函数放 utils/ 目录
- API 请求放 services/ 目录
- 所有代码使用 TypeScript，样式用 StyleSheet.create，不要写内联样式对象

---

【专业实战版 — 适合有经验的开发者】

## 项目概况
跨平台移动应用「XXX」，使用 React Native + Expo 构建，支持 iOS 和 Android 双端。面向C端用户，包含用户系统、核心功能模块、数据同步和离线支持。

## 技术栈与版本
React Native 0.76 · Expo SDK 52 · TypeScript 5.6 · Expo Router 3 · React Native Reanimated 3 · React Native Skia · Expo SecureStore · Expo Notifications · pnpm 9

## 核心业务模块
1. 导航系统：Expo Router基于文件的路由，支持栈导航/标签导航/抽屉导航，深链接(deep linking)配置
2. 状态管理：Zustand全局状态 + React Query服务端状态 + MMKV本地持久化
3. 数据同步：乐观更新+后台同步策略，离线优先架构，网络恢复后自动重试队列
4. 原生能力：Expo Camera/Location/Notifications/SecureStore，统一封装为hooks
5. 动画交互：React Native Reanimated 3实现手势驱动动画，Skia高性能自定义绘制

## 架构设计
- 基于文件的路由：app/(tabs)/首页结构 + app/_layout.tsx根布局
- 组件层：screen组件(纯展示) + feature组件(含业务逻辑) + shared组件(纯UI)
- 工具层：hooks(useAuth/useLocation/useCamera) + utils(apiClient/storage/validators)
- 主题系统：Expo System UI + 自定义theme对象，支持暗色模式跟随系统

## 性能优化
- Hermes引擎开启字节码预编译，启动时间减少30-50%
- 图片优化：expo-image自动WebP转换+懒加载+渐进式加载
- 列表优化：FlashList替代FlatList，大列表性能提升显著
- 内存管理：大图片释放策略，页面卸载时清理订阅和定时器
- 包体积：expo-build-properties配置proguard规则，删除未使用依赖

## 构建与发布
- 本地开发：expo start → Expo Go扫码预览
- 预构建：expo prebuild生成ios/android原生项目（需要自定义原生代码时）
- EAS Build：云端构建，支持自动签名和分发
- 应用商店：App Store Connect + Google Play Console配置，版本号管理，审核元数据准备

## 常见坑点
- Expo SDK版本与React Native版本严格绑定，不能随意升级单个依赖
- 第三方原生模块需用Expo Config Plugin配置，直接改原生项目会被prebuild覆盖
- iOS和Android权限申请机制不同，需分别配置Info.plist和AndroidManifest.xml
- React Native的样式与CSS有差异，部分属性不支持（如box-shadow用elevation替代）
- 键盘弹出时布局处理：KeyboardAvoidingView行为在iOS和Android表现不同`,
    description: "面向移动App的双版本模板：小白版用Expo快速启动，专业版含跨端导航/离线优先/原生能力封装/EAS构建完整方案",
    descriptionEn: "Dual-version mobile app template: beginner version uses Expo for quick start, pro version includes cross-platform navigation/offline-first/native capability encapsulation/EAS build complete solution",
    scenario: "需要开发iOS/Android双端App，希望用React Native+Expo实现一套代码多端运行，快速上架应用商店",
    scenarioEn: "Need to develop iOS/Android dual-platform apps, wanting React Native+Expo for one codebase multi-platform deployment, quickly publishing to app stores",
    problemFocus: "跨端开发时iOS和Android表现不一致、原生模块配置复杂、应用商店审核反复被拒、离线场景用户体验差",
    problemFocusEn: "Inconsistent iOS and Android behavior in cross-platform development, complex native module configuration, repeated app store rejections, poor offline user experience",
    author: "修Bug的Lucas",
    likes: 58, views: "3.9K", comments: 8, createdAt: "2026-05-05",
  },

  // ========== 合并模板：Chrome浏览器插件 ==========
  {
    id: 1011,
    title: "AI编程模板：Chrome浏览器插件（小白+专业版）",
    titleEn: "AI Coding Template: Chrome Browser Extension (Beginner + Pro)",
    role: "developer",
    tags: ["Chrome扩展", "Manifest V3", "浏览器插件", "TypeScript", "项目模板"],
    tagsEn: ["Chrome Extension", "Manifest V3", "Browser Plugin", "TypeScript", "Project Template"],
    content: `【小白填空版 — 适合非程序员】

你是一位 Chrome 扩展开发专家。我是一个不懂代码的产品负责人，我会告诉你我想做什么浏览器插件，你来帮我实现。

## 我的项目
插件名称：[填你的插件名，比如"网页笔记"]
一句话描述：[填插件是干嘛的，比如"在任何网页上划线标注和写笔记，自动保存"]
核心功能：
- [功能1，比如"选中文字后弹出高亮和笔记按钮"]
- [功能2，比如"侧边栏查看当前页面的所有笔记"]
- [功能3，比如"按网站分类管理笔记"]
- [功能4，比如"导出笔记为 Markdown"]

## 技术要求（硬性规定，勿改）
技术栈：Chrome Extension Manifest V3 + TypeScript + Tailwind CSS
包管理器：pnpm

### 代码规范红线
1. 每次修改代码前，先说清楚你要改哪个文件的哪个部分，改完后列出所有被影响的文件
2. 不准偷偷删除我没提到的代码
3. 必须使用 Manifest V3（最新版），不要用已淘汰的 V2
4. 权限申请遵循最小原则，不要申请用不到的权限（不然 Chrome 商店审核不过）

### 项目结构规范
- manifest.json 放根目录
- 后台逻辑放 background/ 目录
- 注入网页的脚本放 content/ 目录
- 弹出窗口放 popup/ 目录
- 设置页面放 options/ 目录
- 所有代码使用 TypeScript

### 安全规范
- 用户数据存 chrome.storage，不要存 localStorage（换电脑会丢）
- 不要在插件里加载外部脚本
- 用户输入必须做安全处理

---

【专业实战版 — 适合有经验的开发者】

## 项目概况
Chrome浏览器扩展「XXX」，基于Manifest V3标准开发。提供网页内容增强、数据采集、效率工具或AI辅助功能。面向Chrome商店发布。

## 技术栈与版本
Chrome Extension Manifest V3 · TypeScript 5.6 · Tailwind CSS 3.4 · Vite 6.0（构建工具）· crxjs（Vite插件用于Chrome扩展开发）· pnpm 9

## 核心架构模块
1. Service Worker（background）：事件驱动后台脚本，处理插件生命周期、跨页面通信、定时任务、API代理请求
2. Content Scripts：注入目标网页的脚本，操作DOM/监听页面事件/与网页JS隔离通信
3. Popup页面：点击工具栏图标弹出的交互界面，展示状态/提供快捷操作
4. Options页面：插件设置页面，管理用户偏好和高级配置
5. Side Panel（Chrome 114+）：侧边栏面板，持久显示在浏览器侧边

## Manifest V3配置要点
- manifest_version: 3（V2已被Chrome淘汰，2024年后不再支持）
- service_worker替代background.page，不支持持久化后台页
- action API替代browserAction/pageAction
- 内容安全策略(CSP)更严格，内联脚本需使用nonce或移至外部文件
- 权限最小化原则：permissions / optional_permissions / host_permissions 严格区分

## 数据流与通信
- Content Script → Background：chrome.runtime.sendMessage / chrome.runtime.connect（长连接）
- Background → Content Script：chrome.tabs.sendMessage（需指定tabId）
- Popup → Background：与Content Script相同，但Popup关闭后状态不保留
- 数据存储：chrome.storage.local（大容量，异步）/ chrome.storage.sync（跨设备同步，有容量限制）
- 状态管理：Service Worker中维护全局状态，通过消息传递同步到各组件

## 性能与安全
- 懒加载策略：Content Script使用run_at: document_idle，不阻塞页面加载
- DOM操作优化：使用Shadow DOM隔离样式，避免污染宿主页面CSS
- 内存管理：Service Worker非持久化，需处理onSuspend事件保存状态
- 安全审查：不使用eval/Function构造函数，所有外部资源通过manifest声明，用户数据加密存储

## Chrome商店发布
- 开发者账号注册：一次性$5注册费
- 打包：zip上传（含manifest.json和所有构建文件）
- 商店 listing：图标(128x128)/截图(1280x800)/描述/隐私政策链接/权限说明
- 审核周期：通常1-3个工作日，首次发布可能更长
- 版本更新：manifest中version递增，上传新zip包

## 常见坑点
- Manifest V3中Service Worker会在闲置时终止，全局变量不持久，需用chrome.storage保存状态
- Content Script与网页主线程JS隔离，不能直接调用页面JS函数，需用window.postMessage桥接
- host_permissions声明的域名要在商店审核时说明用途，过于宽泛会被拒
- 跨域请求必须在background中通过fetch发起，Content Script受CSP限制
- 浏览器升级导致API变更（如chrome.extension.getURL → chrome.runtime.getURL）`,
    description: "面向Chrome扩展的双版本模板：小白版聚焦Manifest V3基础和最小权限原则，专业版含Service Worker/Content Script通信/商店发布完整方案",
    descriptionEn: "Dual-version Chrome extension template: beginner version focuses on Manifest V3 basics and least-privilege principle, pro version includes Service Worker/Content Script communication/store publishing complete solution",
    scenario: "需要开发网页增强/信息采集/效率工具/AI助手类浏览器插件，并上架Chrome商店",
    scenarioEn: "Need to develop web enhancement/data collection/productivity/AI assistant browser plugins and publish to Chrome Web Store",
    problemFocus: "Manifest V2已被淘汰但网上大量教程仍基于V2、Service Worker不持久化导致状态丢失、商店审核因权限说明不充分被拒",
    problemFocusEn: "Manifest V2 deprecated but many tutorials still based on it, Service Worker non-persistence causing state loss, store rejection due to insufficient permission explanations",
    author: "修Bug的Lucas",
    likes: 52, views: "3.5K", comments: 7, createdAt: "2026-05-05",
  },
];

export function getSkillsByRole(roleId: string): Prompt[] {
  if (roleId === "all") return skills;
  return skills.filter((s) => s.role === roleId);
}

export function searchSkills(query: string): Prompt[] {
  const q = query.toLowerCase();
  return skills.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.titleEn.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.descriptionEn.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.tagsEn.some((t) => t.toLowerCase().includes(q)) ||
      s.scenario.toLowerCase().includes(q) ||
      s.scenarioEn.toLowerCase().includes(q) ||
      s.problemFocus.toLowerCase().includes(q) ||
      s.problemFocusEn.toLowerCase().includes(q) ||
      s.content.toLowerCase().includes(q)
  );
}
