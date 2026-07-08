import type { Prompt, Role } from "@/types/prompt";

export const roles: Role[] = [
  { id: "all", name: "全部角色", nameEn: "All Roles", description: "所有职业角色的精选提示词合集", descriptionEn: "Curated prompts for all professional roles", icon: "LayoutGrid", count: 103 },
  { id: "creator", name: "创作者", nameEn: "Creator", description: "内容创作 · 知识变现 · 数字产品", descriptionEn: "Content Creation · Monetization · Digital Products", icon: "PenTool", count: 5 },
  { id: "productManager", name: "产品经理", nameEn: "Product Manager", description: "产品设计 · 开发规划 · 大纲构建", descriptionEn: "Product Design · Development · Roadmap", icon: "Package", count: 5 },
  { id: "growth", name: "增长运营", nameEn: "Growth & Ops", description: "获客增长 · 用户留存 · 数据分析", descriptionEn: "Acquisition · Retention · Analytics", icon: "TrendingUp", count: 5 },
  { id: "sales", name: "市场销售", nameEn: "Sales & Mkt", description: "定价策略 · 市场进入 · 价值主张", descriptionEn: "Pricing · GTM · Value Proposition", icon: "Megaphone", count: 10 },
  { id: "strategist", name: "商业战略", nameEn: "Strategist", description: "SWOT分析 · 商业模式 · 战略转型", descriptionEn: "SWOT · Business Model · Transformation", icon: "Compass", count: 14 },
  { id: "founder", name: "创业者", nameEn: "Founder", description: "快速验证 · 商业模式 · 产品阶梯", descriptionEn: "Quick Validation · Business Model · Product Ladder", icon: "Rocket", count: 5 },
  { id: "operations", name: "运营管理", nameEn: "Operations", description: "KPI体系 · 团队管理 · 运营效率", descriptionEn: "KPI · Team Mgmt · Efficiency", icon: "Settings", count: 7 },
  { id: "dataScientist", name: "数据科学家", nameEn: "Data Scientist", description: "数据分析 · 建模预测 · 可视化", descriptionEn: "Data Analysis · Modeling · Visualization", icon: "BarChart3", count: 39 },
  { id: "developer", name: "开发者", nameEn: "Developer", description: "编程开发 · 系统设计 · 代码优化", descriptionEn: "Programming · System Design · Optimization", icon: "Code2", count: 7 },
  { id: "writer", name: "写作者", nameEn: "Writer", description: "内容创作 · 文案营销 · 编辑润色", descriptionEn: "Content · Copywriting · Editing", icon: "FileText", count: 4 },
  { id: "researcher", name: "研究员", nameEn: "Researcher", description: "学术研究 · 情报分析 · 文献综述", descriptionEn: "Academic Research · Intelligence · Literature", icon: "Search", count: 7 },
];

export const prompts: Prompt[] = [
  // ========== 1-20: Original Prompts (from images + WeChat) ==========
  {
    id: 1, title: "从一项技能找到赚钱的被动收入想法", titleEn: "Find Passive Income Ideas from Your Skill",
    role: "creator", tags: ["被动收入", "技能变现", "产品想法", "创作者经济"], tagsEn: ["Passive Income", "Skill Monetization", "Product Ideas", "Creator Economy"],
    content: `我有一个技能：[技能]。我的目标受众是[受众]。请帮我生成10个不同的被动收入产品想法，基于我的技能和受众需求。对每个想法，请提供：\n1. 产品名称和一句话描述\n2. 为什么这个产品适合我的技能\n3. 预计的创建时间\n4. 潜在的月收入范围\n5. 需要的工具或平台\n\n请确保想法多样化，涵盖数字产品、课程、模板、工具等不同类型。`,
    description: "基于你的技能和受众，生成10个多样化的被动收入产品想法", descriptionEn: "Generate 10 diverse passive income product ideas based on your skills and audience",
    scenario: "内容创作者、自由职业者、知识工作者希望将技能转化为可持续收入来源", scenarioEn: "Content creators, freelancers, and knowledge workers seeking to monetize their expertise",
    problemFocus: "有技能但不知道可以开发什么产品变现，缺乏产品化思路", problemFocusEn: "Having skills but unsure what products to build for monetization",
    author: "路飞 AI研究员", likes: 48, views: "4.4K", comments: 3, createdAt: "2026-05-03",
  },
  {
    id: 2, title: "将一项技能转化为初学者友好的数字产品", titleEn: "Turn Your Skill into a Beginner-Friendly Digital Product",
    role: "creator", tags: ["数字产品", "初学者", "技能转化", "课程设计"], tagsEn: ["Digital Product", "Beginners", "Skill Transfer", "Course Design"],
    content: `我的技能是[技能]，我想为完全的初学者创建一个数字产品。\n\n请帮我：\n1. 分析这个领域初学者最常遇到的5个痛点\n2. 针对每个痛点设计一个产品模块\n3. 为整个产品设计一个学习路径（从入门到进阶）\n4. 推荐最适合的产品格式（电子书、视频课程、模板、Notion页面等）\n5. 给出一个吸引眼球的产品标题和副标题\n\n产品应该让初学者感觉"我终于找到了一个能理解我处境的资源"。`,
    description: "将你的专业技能转化为初学者友好的数字产品", descriptionEn: "Transform your professional skills into beginner-friendly digital products",
    scenario: "行业专家、资深从业者希望将经验产品化，降低初学者的入门门槛", scenarioEn: "Industry experts wanting to productize their experience for beginners",
    problemFocus: "专家视角过于专业，难以站在初学者角度设计产品和内容", problemFocusEn: "Experts struggle to design products from a beginner's perspective",
    author: "路飞 AI研究员", likes: 10, views: "4.3K", comments: 1, createdAt: "2026-05-03",
  },
  {
    id: 3, title: "创建从低价到高端的产品阶梯", titleEn: "Build a Product Ladder from Low to Premium",
    role: "founder", tags: ["产品阶梯", "定价策略", "收入最大化", "漏斗设计"], tagsEn: ["Product Ladder", "Pricing Strategy", "Revenue Maximization", "Funnel Design"],
    content: `充当产品生态系统专家。我的技能是[技能]，我的受众是[受众]。为我构建一个4级产品阶梯：低价、中等价格、高端数字和经常性产品。每个产品应自然连接到下一个。对每一级，解释销售什么、价格范围、交付格式、购买者类型和它如何引导到下一个产品。`,
    description: "构建4级产品阶梯，从低价引流到高端变现", descriptionEn: "Build a 4-tier product ladder from low-price lead gen to premium monetization",
    scenario: "创业者、独立开发者需要设计完整的产品矩阵，最大化客户终身价值", scenarioEn: "Founders and indie developers designing complete product matrices to maximize customer lifetime value",
    problemFocus: "只有一个产品单打独斗，无法形成客户升级路径，收入天花板明显", problemFocusEn: "Single-product dependency with no customer upgrade path and visible revenue ceiling",
    author: "路飞 AI研究员", likes: 8, views: "4.1K", comments: 1, createdAt: "2026-05-03",
  },
  {
    id: 4, title: "找到我能在7天内推出的最快产品", titleEn: "Find the Fastest Product to Launch in 7 Days",
    role: "founder", tags: ["快速启动", "MVP", "7天挑战", "精益创业"], tagsEn: ["Quick Launch", "MVP", "7-Day Challenge", "Lean Startup"],
    content: `我想要一个被动收入产品，我可以在7天内使用我的[技能]技能创建。我每天可以花[X]小时。我的受众是[受众]。给我7个我可以快速完成的产品想法。对每一个，包括逐日创建计划、所需工具、预计售价和预期难度。强调速度、简洁性和首次销售的最佳选择。`,
    description: "7天内快速推出你的第一个被动收入产品", descriptionEn: "Launch your first passive income product in just 7 days",
    scenario: "想快速验证想法的创业者、副业探索者，时间有限但需要尽快推出MVP", scenarioEn: "Entrepreneurs and side-hustlers wanting to quickly validate ideas with limited time",
    problemFocus: "想创业但总觉得准备不足，追求完美导致永远停留在计划阶段", problemFocusEn: "Perpetual planning phase due to perfectionism, never feeling ready enough to launch",
    author: "路飞 AI研究员", likes: 5, views: "3.6K", comments: 2, createdAt: "2026-05-03",
  },
  {
    id: 5, title: "将我的技能与流行买家问题匹配", titleEn: "Match Your Skills with Popular Buyer Problems",
    role: "sales", tags: ["需求匹配", "买家问题", "产品定位", "销售洞察"], tagsEn: ["Demand Matching", "Buyer Problems", "Product Positioning", "Sales Insights"],
    content: `我有[技能]的技能。我的目标受众是[受众]。列出这个受众积极尝试解决的前15个真实问题，我可以用我的技能帮助解决。然后将每个问题转化为被动收入产品想法。使想法实用、可销售和易于理解。显示问题、产品想法、承诺的转变和可能的购买意图。`,
    description: "找到受众的真实痛点，将技能转化为解决方案", descriptionEn: "Identify real audience pain points and transform skills into solutions",
    scenario: "销售人员、市场人员需要洞察买家真实需求，将产品能力与市场需求精准匹配", scenarioEn: "Sales and marketing professionals seeking to align product capabilities with market demand",
    problemFocus: "销售时只讲产品功能，不了解买家真正想解决的问题和购买动机", problemFocusEn: "Focusing on product features rather than understanding buyers' real problems and motivations",
    author: "路飞 AI研究员", likes: 8, views: "3.1K", comments: 1, createdAt: "2026-05-03",
  },
  {
    id: 6, title: "验证人们实际会为什么付费", titleEn: "Validate What People Will Actually Pay For",
    role: "founder", tags: ["市场验证", "付费意愿", "产品筛选", "精益验证"], tagsEn: ["Market Validation", "Willingness to Pay", "Product Screening", "Lean Validation"],
    content: `充当市场验证研究员。我想基于[技能]向[受众]销售被动收入产品。给我10个产品想法，然后根据需求、紧迫性、创建难度、独特性和购买可能性，对每个想法从1-10打分。之后，告诉我哪3个想法最有可能最快产生收益以及为什么。`,
    description: "用数据驱动的方式验证你的产品想法", descriptionEn: "Validate your product ideas with a data-driven scoring framework",
    scenario: "有多个产品想法但不确定先做哪个，需要通过系统化评估降低试错成本", scenarioEn: "Having multiple product ideas but unsure which to prioritize, needing systematic evaluation to reduce trial costs",
    problemFocus: "凭直觉选产品方向，投入了时间才发现市场不感兴趣，试错成本太高", problemFocusEn: "Choosing product direction by intuition, discovering market disinterest after significant time investment",
    author: "路飞 AI研究员", likes: 2, views: "2.6K", comments: 1, createdAt: "2026-05-03",
  },
  {
    id: 7, title: "从我现有的知识构建产品", titleEn: "Build Products from Your Existing Knowledge",
    role: "creator", tags: ["知识变现", "现有资源", "产品化", "经验萃取"], tagsEn: ["Knowledge Monetization", "Existing Assets", "Productization", "Experience Extraction"],
    content: `我不想从零开始。帮助我将我已经了解的[技能]知识转化为数字产品。问：我经常重复什么任务、经常解释什么、使用什么快捷方式、帮助人们避免什么错误以及我已经遵循什么框架。然后将这些转化为10个被动收入产品，包括清晰的格式、标题想法和理想客户。`,
    description: "将你已有的知识和经验快速转化为数字产品", descriptionEn: "Quickly turn your existing knowledge and experience into digital products",
    scenario: "已有丰富经验和方法论的专家，希望快速将内部知识转化为可销售产品", scenarioEn: "Experienced experts wanting to quickly monetize their internal knowledge",
    problemFocus: "看不到自己已有知识的价值，总觉得需要学习新东西才能做产品", problemFocusEn: "Unable to see the value in existing knowledge, feeling the need to learn more first",
    author: "路飞 AI研究员", likes: 4, views: "2.3K", comments: 1, createdAt: "2026-05-03",
  },
  {
    id: 8, title: "创建完整的数字产品大纲", titleEn: "Create a Complete Digital Product Outline",
    role: "productManager", tags: ["产品大纲", "内容规划", "数字产品", "课程架构"], tagsEn: ["Product Outline", "Content Planning", "Digital Product", "Course Architecture"],
    content: `我想为[受众]创建关于[主题]的[产品类型]。为我构建完整的大纲。包括产品标题、承诺、章节/模块、每个章节内的内容、奖励想法、快速赢得要素和最终交付物结构。使其简单、有用且值得付费。保持实用，而非学术性。`,
    description: "从零到完整大纲，规划你的数字产品内容结构", descriptionEn: "From zero to complete outline — plan your digital product content structure",
    scenario: "产品经理、课程设计者需要为新产品规划完整的内容架构和交付体系", scenarioEn: "Product managers and course designers planning content architecture for new products",
    problemFocus: "有产品想法但不知道如何结构化内容，缺乏系统化的产品规划能力", problemFocusEn: "Having ideas but lacking structured content planning capabilities",
    author: "路飞 AI研究员", likes: 3, views: "2.1K", comments: 1, createdAt: "2026-05-03",
  },
  {
    id: 9, title: "正确定价产品", titleEn: "Price Your Product Right",
    role: "sales", tags: ["定价策略", "价格心理学", "收入优化", "市场定位"], tagsEn: ["Pricing Strategy", "Price Psychology", "Revenue Optimization", "Market Positioning"],
    content: `我有这个数字产品想法：[产品想法]。我的受众是[受众]。比较3个定价选项：低、中等和高端。对每一个，解释应该包括什么、吸引什么类型的买家、预期转化逻辑和优缺点。然后推荐最佳起价，如果我想要早期销售和推荐。`,
    description: "用科学的定价策略最大化你的产品收入", descriptionEn: "Maximize product revenue with scientific pricing strategy",
    scenario: "产品经理、销售负责人需要为新产品确定最优价格点和定价结构", scenarioEn: "Product managers and sales leads determining optimal price points and pricing structures",
    problemFocus: "定价凭感觉而非数据，要么定太高没人买，要么定太低利润薄", problemFocusEn: "Pricing based on gut feeling rather than data — too high kills demand, too low erodes margin",
    author: "路飞 AI研究员", likes: 4, views: "2K", comments: 1, createdAt: "2026-05-03",
  },
  {
    id: 10, title: "选择最佳销售平台", titleEn: "Choose the Best Sales Platform",
    role: "sales", tags: ["销售平台", "渠道选择", "数字分销", "电商平台"], tagsEn: ["Sales Platform", "Channel Selection", "Digital Distribution", "E-commerce"],
    content: `我想销售与[技能]相关的被动收入产品。为我比较最佳平台，例如Gumroad、Etsy、Payhip、Shopify、Notion市场或我自己的网站。根据我的产品类型[产品类型]、受众[受众]和目标[目标]，告诉我哪个平台最好以及为什么。包括费用、设置难度、流量潜力和初学者友好性。`,
    description: "找到最适合你产品的销售平台和分销渠道", descriptionEn: "Find the best sales platform and distribution channel for your product",
    scenario: "创作者、小商家需要选择最适合其产品类型和目标受众的分销渠道", scenarioEn: "Creators and small businesses selecting the best distribution channel for their product type",
    problemFocus: "面对众多平台不知如何选择，每个平台都说自己好但不知道哪个真正适合自己", problemFocusEn: "Overwhelmed by platform options, unsure which truly fits their product and audience",
    author: "路飞 AI研究员", likes: 10, views: "1.9K", comments: 0, createdAt: "2026-05-03",
  },
  {
    id: 11, title: "SWOT战略分析：企业的战略体检报告", titleEn: "SWOT Strategic Analysis: Enterprise Health Report",
    role: "strategist", tags: ["SWOT", "战略分析", "竞争情报", "麦肯锡框架", "战略规划"], tagsEn: ["SWOT", "Strategic Analysis", "Competitive Intelligence", "McKinsey Framework", "Strategic Planning"],
    content: `你是一位拥有20年经验的麦肯锡战略顾问。请利用竞争性市场数据和内部洞察，为[企业名称]在[行业名称]中生成一份深度SWOT分析报告。\n\n## 一、内部环境分析\n\n### 优势 (Strengths)\n列出5-7个核心优势，每个优势需要：\n- 具体描述该优势\n- 量化指标支撑（如有）\n- 该优势如何形成竞争壁垒\n\n### 劣势 (Weaknesses)\n列出4-6个关键劣势，每个劣势需要：\n- 具体描述该劣势\n- 对业务的具体影响\n- 改进的优先级建议\n\n## 二、外部环境分析\n\n### 机会 (Opportunities)\n列出5-7个外部机会，涵盖：\n- 市场趋势带来的机会\n- 技术变革带来的机会\n- 政策/监管变化带来的机会\n- 对每个机会评估"窗口期"和"投入产出比"\n\n### 威胁 (Threats)\n列出4-6个外部威胁，包括：\n- 竞争对手动向\n- 替代品威胁\n- 宏观经济/监管风险\n- 对每个威胁评估"发生概率"和"潜在影响"\n\n## 三、战略矩阵与行动建议\n\n基于以上分析，构建：\n1. SO战略（利用优势抓住机会）\n2. WO战略（克服劣势利用机会）\n3. ST战略（利用优势规避威胁）\n4. WT战略（减少劣势回避威胁）\n\n## 四、关键假设与风险提示\n\n---\n输入变量：\n- [企业名称]\n- [行业名称]`,
    description: "用麦肯锡级框架为你的企业做全方位战略体检，产出可落地的战略矩阵", descriptionEn: "McKinsey-grade framework for comprehensive strategic health check and actionable strategy matrix",
    scenario: "战略部门负责人、咨询公司顾问、企业高管需要对企业进行全面的战略态势评估和规划", scenarioEn: "Strategy leaders, consultants, and executives conducting comprehensive strategic assessments and planning",
    problemFocus: "战略分析流于表面，缺乏系统化的内外部环境扫描和可执行的行动矩阵", problemFocusEn: "Strategy analysis remains superficial, lacking systematic environmental scanning and actionable matrices",
    author: "清华小明 · 星球财金AI", likes: 156, views: "12.8K", comments: 23, createdAt: "2026-04-03",
  },
  {
    id: 12, title: "增长杠杆分析：找到撬动10倍增长的支点", titleEn: "Growth Lever Analysis: Find Your 10x Growth Pivot",
    role: "growth", tags: ["增长杠杆", "可扩展性", "增长黑客", "ROI评估"], tagsEn: ["Growth Levers", "Scalability", "Growth Hacking", "ROI Assessment"],
    content: `你是一位顶级增长战略顾问，曾服务过多家独角兽企业。请探索针对[企业类型]的5大可扩展增长杠杆，重点关注以下三个维度：\n\n## 维度一：收入拓展 (Revenue Expansion)\n- 新产品线拓展机会\n- 新市场/新客群渗透策略\n- 定价优化空间\n- 交叉销售与向上销售机制\n\n## 维度二：运营效率 (Operational Efficiency)\n- 成本结构优化点\n- 流程自动化机会\n- 供应链/交付效率提升\n- 人效提升路径\n\n## 维度三：品牌影响力 (Brand Equity)\n- 品牌溢价空间\n- 口碑传播机制设计\n- 思想领导力建设\n- 社区/生态运营\n\n## 输出要求\n\n对每个增长杠杆，请提供：\n1. **杠杆名称**：一句话概括\n2. **核心逻辑**：为什么这个杠杆对这类企业有效\n3. **实施路径**：3-5个具体步骤\n4. **预期ROI**：投入产出比估算（高/中/低）\n5. **时间线**：短期（0-3月）、中期（3-12月）、长期（1年+）\n6. **风险因素**：可能遇到的阻碍及应对策略\n7. **关键指标**：用什么数据验证这个杠杆生效\n\n## 优先级排序\n请根据"影响力 × 可行性"矩阵，将5个杠杆按优先级排序，并说明理由。\n\n## 整合增长飞轮\n最后，请设计一个增长飞轮模型，说明这5个杠杆如何相互增强，形成自强化循环。\n\n---\n输入变量：[企业类型] 请替换为你的企业描述（如"面向中小企业的SaaS财务管理工具"）`,
    description: "系统盘点企业增长的5大杠杆，找到投入小产出大的增长支点", descriptionEn: "Systematically identify 5 growth levers to find high-impact, low-effort growth pivots",
    scenario: "增长负责人、运营总监需要找到可规模化复制的增长路径，突破增长瓶颈", scenarioEn: "Growth leads and ops directors seeking scalable growth paths to break through bottlenecks",
    problemFocus: "增长停滞或依赖单一渠道，找不到可撬动业务的系统性增长支点", problemFocusEn: "Growth stagnation or over-reliance on a single channel, lacking systematic growth pivots",
    author: "清华小明 · 星球财金AI", likes: 134, views: "11.2K", comments: 18, createdAt: "2026-04-03",
  },
  {
    id: 13, title: "新任高管30-60-90天行动蓝图", titleEn: "New Executive 30-60-90 Day Action Blueprint",
    role: "operations", tags: ["入职计划", "管理", "90天计划", "高管着陆", "团队建设"], tagsEn: ["Onboarding", "Management", "90-Day Plan", "Executive Landing", "Team Building"],
    content: `你是一位资深高管教练，曾辅导过数百位C-level高管成功着陆。请为[公司类型]新任[职位名称]制定一份完整的30-60-90天行动方案。\n\n## 整体原则\n- 前30天：观察与学习，不急于改动\n- 第31-60天：找到1-2个速赢点，建立早期信任\n- 第61-90天：交付第一批成果，确立领导地位\n\n## 第一阶段：Day 0-30（学习期）\n\n### 入职目标\n### 诊断清单\n### 早期信号\n\n## 第二阶段：Day 31-60（行动期）\n\n### 速赢项目 (Quick Wins)\n### 关系建设\n\n## 第三阶段：Day 61-90（成果期）\n\n### 战略举措\n### 绩效指标体系\n### 团队重塑\n\n## 附录：每周执行清单\n\n---\n输入变量：\n- [公司类型]\n- [职位名称]`,
    description: "新任高管的百日着陆蓝图，从观察到成果的系统化行动方案", descriptionEn: "A new executive's 100-day landing blueprint — systematic action from observation to results",
    scenario: "新任高管、空降管理者需要在前90天快速建立信任、诊断问题并拿出成果", scenarioEn: "New executives and空降 managers needing to build trust, diagnose issues, and deliver results within 90 days",
    problemFocus: "新官上任要么乱改一气失去人心，要么观望太久错失建立威信的机会", problemFocusEn: "New leaders either changing too aggressively and alienating teams, or waiting too long and missing credibility windows",
    author: "清华小明 · 星球财金AI", likes: 112, views: "9.8K", comments: 15, createdAt: "2026-04-03",
  },
  {
    id: 14, title: "收入模式架构：CAC/LTV驱动的盈利引擎设计", titleEn: "Revenue Model Architecture: CAC/LTV-Driven Profit Engine",
    role: "strategist", tags: ["收入模式", "CAC", "LTV", "定价", "单位经济模型"], tagsEn: ["Revenue Model", "CAC", "LTV", "Pricing", "Unit Economics"],
    content: `你是一位资深商业模式架构师。请为一家提供[产品/服务描述]的企业制定一份完整的收入模式架构报告。\n\n## 一、定价策略设计\n\n### 三种定价方案对比\n**方案A：基于价值的定价**\n**方案B：分级结构定价**\n**方案C：市场定位定价**\n\n## 二、单位经济模型\n\n### 客户获取成本 (CAC) 拆解\n### 客户生命周期价值 (LTV) 计算\n### 关键健康指标（LTV/CAC > 3）\n\n## 三、收入预测模型\n\n### 12个月MRR预测\n### 年度收入目标拆解\n\n## 四、变现路径优化\n\n### 收入增长飞轮\n### 附加收入机会\n\n## 五、风险与对冲\n\n---\n输入变量：[产品/服务描述]`,
    description: "从定价到LTV/CAC，构建数据驱动的盈利引擎，让收入可预测", descriptionEn: "From pricing to LTV/CAC, build a data-driven profit engine with predictable revenue",
    scenario: "财务总监、战略负责人、投资人需要评估或设计一个可持续盈利的商业模型", scenarioEn: "CFOs, strategy leads, and investors evaluating or designing sustainable, profitable business models",
    problemFocus: "商业模式不清晰，CAC和LTV算不清楚，不知道到底赚不赚钱", problemFocusEn: "Unclear business model, unable to calculate CAC and LTV, unsure if the business is truly profitable",
    author: "清华小明 · 星球财金AI", likes: 198, views: "15.6K", comments: 31, createdAt: "2026-04-03",
  },
  {
    id: 15, title: "用户流失预警与挽回系统：SaaS续命指南", titleEn: "Churn Prediction & Win-Back System: SaaS Survival Guide",
    role: "growth", tags: ["用户流失", "SaaS", "留存策略", "数据驱动", "预警系统"], tagsEn: ["User Churn", "SaaS", "Retention Strategy", "Data-Driven", "Early Warning"],
    content: `你是一位专注于SaaS增长的顶级顾问，用户留存率是你的核心战场。请针对面向[目标客户描述]的SaaS产品，设计一套完整的用户流失预警与挽回系统。\n\n## 一、流失诊断框架\n\n### 流失类型分类\n- 自愿流失（主动取消）vs 非自愿流失（信用卡过期、公司倒闭）\n- 早期流失（<30天）vs 中期流失（1-6月）vs 晚期流失（>6月）\n- 每种流失类型的根本原因分析模板\n\n### 流失信号识别系统\n设计一套"红黄绿灯"预警机制：\n\n**红灯信号（24小时内可能流失）**\n- 3-5个行为指标\n- 自动触发干预流程\n\n**黄灯信号（1-4周内可能流失）**\n- 4-6个行为指标\n- 自动触发培育流程\n\n**绿灯信号（健康用户特征）**\n- 高价值用户行为画像\n- 可复制的成功路径\n\n## 二、数据驱动的挽留策略\n\n### 策略一：产品内干预\n- 关键功能使用引导（当用户未使用核心功能时）\n- 价值实现提醒（展示用户已获得的具体收益）\n- 使用习惯培养（nudge设计）\n\n### 策略二：个性化沟通\n- 基于使用数据的 segmented email/SMS 序列\n- 每个 segment 的话术模板\n- 最佳触达时机预测\n\n### 策略三：人工介入\n- 触发人工介入的阈值设计\n- 客户成功经理(CSM)介入脚本\n- 高管升级流程（大客户）\n\n## 三、反馈闭环机制\n\n### 取消原因收集\n- 结构化取消问卷设计\n- 开放式反馈的NLP分析框架\n- 取消用户的"最后机会"挽回话术\n\n### 产品迭代闭环\n- 流失反馈 → 产品需求优先级\n- 月度流失归因报告模板\n- 预防性产品改进路线图\n\n## 四、留存提升 playbook\n\n### 月度行动计划\n- 第1周：数据审查与流失名单生成\n- 第2周：干预行动执行\n- 第3周：效果追踪与A/B测试\n- 第4周：复盘与流程优化\n\n### 关键指标仪表板\n设计一个留存监控仪表板，包含：\n- 流失率（总体、分cohort、分渠道）\n- 净收入留存率(NRR)\n- 健康评分分布\n- 干预成功率\n- 挽回用户LTV恢复度\n\n## 五、预期成果测算\n\n- 当前流失率：[填入你的数字]\n- 目标流失率：降低30-50%\n- 对MRR的直接影响计算\n- 对LTV的复利效应计算\n\n---\n输入变量：[目标客户描述] 如"中小型企业HR部门，50-500人规模，使用HRMS系统"`,
    description: "用数据预警+精准干预，把用户流失率降低30-50%的SaaS续命指南", descriptionEn: "Reduce churn by 30-50% with data-driven early warning and targeted intervention",
    scenario: "SaaS产品增长负责人、客户成功团队需要建立系统化的用户健康度监控和挽回机制", scenarioEn: "SaaS growth leads and CS teams needing systematic user health monitoring and win-back systems",
    problemFocus: "用户默默流失而不自知，缺乏预警机制，等到取消时才被动应对", problemFocusEn: "Users churning silently without early warning, reactive rather than proactive retention",
    author: "清华小明 · 星球财金AI", likes: 145, views: "13.2K", comments: 27, createdAt: "2026-04-03",
  },
  {
    id: 16, title: "KPI战略仪表板：7个关键指标定生死", titleEn: "Strategic KPI Dashboard: 7 Metrics That Matter",
    role: "operations", tags: ["KPI", "数据仪表板", "运营管理", "指标设计", "数据驱动"], tagsEn: ["KPI", "Dashboard", "Operations", "Metrics Design", "Data-Driven"],
    content: `你是一位顶级运营分析师，深知"你监控什么，你就管理什么"的真理。请为[业务类型]设计一套战略级KPI仪表板，覆盖客户获取、客户留存、产品参与度和财务表现四大维度。\n\n## 设计原则\n- 指标数量控制在7个以内（少即是多）\n- 每个指标都有明确的"健康线"、"警戒线"、"危险线"\n- 指标之间形成因果链条，而非孤立数字\n- 每个指标都有"责任部门"和"行动预案"\n\n## 一、客户获取维度 (Acquisition)\n\n### 建议指标1：CAC回收期\n### 建议指标2：渠道ROI分布\n\n## 二、客户留存维度 (Retention)\n\n### 建议指标3：月度流失率\n### 建议指标4：净收入留存率 (NRR)\n\n## 三、产品参与度维度 (Engagement)\n\n### 建议指标5：核心功能采用率\n### 建议指标6：产品健康评分\n\n## 四、财务表现维度 (Financial)\n\n### 建议指标7：月度经常性收入增长率 (MRR Growth Rate)\n\n## 五、仪表板设计\n\n### 日报版本（5分钟浏览）\n### 周报版本（30分钟分析）\n### 月报版本（战略复盘）\n\n## 六、指标治理机制\n\n---\n输入变量：[业务类型]`,
    description: "7个生死指标+三级预警机制，打造让问题无处藏身的战略仪表板", descriptionEn: "7 critical metrics + 3-tier alert system — a strategic dashboard where no problem can hide",
    scenario: "运营负责人、数据分析师、管理层需要建立一套精简但全面的业务健康度监控体系", scenarioEn: "Operations leads, data analysts, and management needing a lean yet comprehensive business health monitoring system",
    problemFocus: "报表指标太多等于没有重点，要么只看收入数字忽视底层健康度", problemFocusEn: "Too many metrics means no focus, or only tracking revenue while ignoring underlying business health",
    author: "清华小明 · 星球财金AI", likes: 167, views: "14.1K", comments: 29, createdAt: "2026-04-03",
  },
  {
    id: 17, title: "定价策略：价格是你最被低估的增长武器", titleEn: "Pricing Strategy: Your Most Underrated Growth Weapon",
    role: "sales", tags: ["定价策略", "价值定价", "分级定价", "价格心理学", "竞争对标"], tagsEn: ["Pricing Strategy", "Value-Based Pricing", "Tiered Pricing", "Price Psychology", "Competitive Benchmarking"],
    content: `你是一位顶级定价策略顾问，深知"定价错了，再好的产品也是白费"。请针对[细分市场]的[产品/服务描述]，提出3种完整的定价方案，并给出决策框架。\n\n## 一、方案A：基于价值的定价 (Value-Based Pricing)\n\n### 核心逻辑\n客户买的不是你产品本身，而是产品带来的结果。定价应该与客户获得的价值挂钩，而非你的成本。\n\n### 实施步骤\n1. **价值量化**：你的产品帮客户赚/省了多少钱？\n2. **价值分配**：客户获得的价值中，你应提取多少比例？（通常10-30%）\n3. **价格锚定**：如何展示"不用你的产品的代价"\n4. **ROI话术**：帮助销售团队用价值语言报价\n\n## 二、方案B：分级结构定价 (Good-Better-Best)\n\n### 三层架构设计\n\n**基础版 (Good)**\n- 目标客户：预算敏感型/入门级用户\n- 核心功能：解决80%用户的基础需求\n- 价格定位：市场入口价\n\n**专业版 (Better)**\n- 目标客户：核心用户群体\n- 核心功能：完整功能集+优先支持\n- 价格定位：市场主力价位\n\n**企业版 (Best)**\n- 目标客户：大型客户/高级用户\n- 核心功能：全功能+定制化+专属服务\n- 价格定位：溢价\n\n## 三、方案C：市场定位定价 (Positioning-Based)\n\n### 三种市场定位选择\n\n**选项1：高端定位（Premium）**\n- 成为行业里的"宝马"\n- 定价高于市场均值30-100%\n\n**选项2：中端定位（Mainstream）**\n- 成为"丰田"——可靠、均衡\n- 定价在市场均值附近\n\n**选项3：颠覆定位（Disruptor）**\n- 成为"小米"——同等品质，价格杀手\n- 定价低于市场均值20-50%\n\n---\n输入变量：\n- [细分市场] 如"SaaS项目管理工具市场"\n- [产品/服务描述] 如"面向营销团队的AI内容协作平台"`,
    description: "价值定价/分级定价/定位定价三种方案全面对比，找到你的最优价格点", descriptionEn: "Compare value-based, tiered, and positioning pricing to find your optimal price point",
    scenario: "企业定价负责人、产品经理需要对现有或新产品设计完整的定价体系和策略", scenarioEn: "Pricing leads and product managers designing complete pricing systems for existing or new products",
    problemFocus: "定价凭感觉或简单模仿竞品，没有基于价值、客户和定位的系统化策略", problemFocusEn: "Pricing by intuition or copying competitors without a systematic value/customer/positioning strategy",
    author: "清华小明 · 星球财金AI", likes: 189, views: "16.3K", comments: 35, createdAt: "2026-04-03",
  },
  {
    id: 18, title: "市场进入计划：新市场的系统化征服路线图", titleEn: "Market Entry Plan: A Systematic Conquest Roadmap",
    role: "strategist", tags: ["市场进入", "GTM", "扩张策略", "分销渠道", "国际化"], tagsEn: ["Market Entry", "GTM", "Expansion", "Distribution", "Internationalization"],
    content: `你是一位负责过数十个市场进入项目的资深顾问。请为[产品描述]进入[目标市场]制定一份完整的市场进入(Go-To-Market)计划。\n\n## 一、市场诊断\n\n### 目标市场画像\n- TAM/SAM/SOM 计算\n- 市场成熟度评估\n- 市场进入时机分析\n\n### 竞争格局分析\n### 客户洞察\n\n## 二、市场定位策略\n\n### 定位声明\n### 信息屋 (Message House)\n\n## 三、分销渠道策略\n\n### 渠道选择矩阵\n### 渠道组合设计\n### 渠道赋能计划\n\n## 四、客户获取策略\n\n### 获客漏斗设计\n### 首年营销预算分配\n### 本地化需求\n\n## 五、成功指标体系\n\n### 12个月里程碑\n### KPI仪表板\n\n## 六、风险与应急预案\n\n## 七、资源需求与预算\n\n---\n输入变量：\n- [产品描述]\n- [目标市场]`,
    description: "从市场诊断到渠道落地，一份可执行的新市场征服路线图", descriptionEn: "From market diagnosis to channel execution, an actionable new market conquest roadmap",
    scenario: "战略规划部、国际化团队、业务拓展负责人需要进入全新地理或垂直市场", scenarioEn: "Strategy teams, international divisions, and BD leads entering new geographic or vertical markets",
    problemFocus: "进新市场凭感觉，没有系统化的市场评估、渠道规划和风险预案", problemFocusEn: "Entering new markets on gut feeling without systematic assessment, channel planning, or risk mitigation",
    author: "清华小明 · 星球财金AI", likes: 143, views: "12.9K", comments: 24, createdAt: "2026-04-03",
  },
  {
    id: 19, title: "价值主张锻造：10秒抓住客户的注意力", titleEn: "Forge a Killer Value Proposition in 10 Seconds",
    role: "sales", tags: ["价值主张", "品牌定位", "销售话术", "文案", "客户洞察"], tagsEn: ["Value Proposition", "Brand Positioning", "Sales Messaging", "Copywriting", "Customer Insights"],
    content: `你是一位顶级品牌策略师，曾为世界500强企业打造价值主张。请为[品牌或产品名称]撰写一份富有说服力的价值主张，并提供完整的应用工具包。\n\n## 一、价值主张核心框架\n\n### 经典结构\n"对于[目标客户]来说，[品牌名称]是[产品类别]中，能够[核心收益]的[差异化定位]，因为[支撑理由]。"\n\n## 二、客户洞察深挖\n\n### 目标客户痛点地图\n- 功能性痛点（工作里的具体麻烦）\n- 情感性痛点（焦虑、恐惧、挫败感）\n- 社会性痛点（地位、形象、认同感）\n\n### 客户决策动机\n- 推动因素（Push）：什么痛苦让他们想改变\n- 拉动因素（Pull）：什么愿景吸引他们前进\n- 阻碍因素（Anxiety）：什么让他们犹豫\n- 惯性因素（Habit）：什么让他们不想动\n\n## 三、差异化优势提炼\n\n### 竞争优势矩阵\n| 维度 | 我们 | 主要竞品A | 主要竞品B | 市场空白 |\n\n### 差异化声明撰写\n- 列出5-7个潜在差异化点\n- 评估每个差异化点的：独特性、重要性、可持续性、可传达性\n\n## 四、价值主张完整交付物\n\n### 1. 一句话版本（电梯演讲）\n### 2. 一段话版本（官网首页）\n### 3. 一页纸版本（销售手册）\n### 4. 社交媒体版本\n\n## 五、应用场景工具包\n\n### 销售场景\n- 开场白话术\n- 异议处理话术\n- 成交推进话术\n\n### 营销场景\n- 广告文案模板\n- 落地页结构\n- 邮件序列\n\n### 融资场景\n- 路演PPT的价值主张页\n- 投资人常问的3个尖锐问题及回答\n\n---\n输入变量：\n- [品牌或产品名称]\n- [产品描述]`,
    description: "从痛点挖掘到差异化提炼，锻造让客户10秒内想继续了解的杀手级价值主张", descriptionEn: "From pain point mining to differentiation, forge a value proposition that hooks in 10 seconds",
    scenario: "市场负责人、品牌经理、销售人员需要打造清晰有力的价值传递体系", scenarioEn: "Marketing leads, brand managers, and salespeople crafting clear, compelling value messaging",
    problemFocus: "说不清自己产品和竞品的区别，客户听完还是不知道为什么要选你", problemFocusEn: "Unable to articulate differentiation from competitors, leaving customers confused about why to choose you",
    author: "清华小明 · 星球财金AI", likes: 201, views: "17.5K", comments: 38, createdAt: "2026-04-03",
  },
  {
    id: 20, title: "战略转型罗盘：死局中的三条生路", titleEn: "Strategic Transformation Compass: Three Escape Routes from a Dead End",
    role: "strategist", tags: ["战略转型", "初创企业", "商业模式", "第二曲线", "Pivot"], tagsEn: ["Strategic Pivot", "Startup", "Business Model", "Second Curve", "Transformation"],
    content: `你是一位在危机中带领多家企业完成战略转型的资深顾问。请针对面临[具体问题描述]的[企业类型]，从三个维度推荐战略性转型方向，并提供完整的转型决策框架。\n\n## 一、现状诊断\n\n### 核心问题解构\n### 资源盘点\n### 约束条件\n\n## 二、转型方向一：客户群体转型 (Who)\n\n## 三、转型方向二：应用场景转型 (Where/When)\n\n## 四、转型方向三：产品形态转型 (What)\n\n## 五、转型决策矩阵\n\n### 评估维度（每个方向打分1-10）\n| 维度 | 方向A | 方向B | 方向C |\n\n### 综合评分与推荐\n\n## 六、转型实施路线图\n\n### 30天：止血与决策\n### 60天：验证与试点\n### 90天：全力转型\n### 180天：新赛道起跑\n\n## 七、心理建设与领导力学\n\n## 八、成功转型案例参考\n\n---\n输入变量：\n- [企业类型]\n- [具体问题描述]`,
    description: "客户/场景/产品三维转型分析，为死局中的初创企业找到生路", descriptionEn: "Customer/scenario/product transformation analysis to find escape routes for struggling startups",
    scenario: "陷入困境的初创企业创始人、CEO需要系统性地评估转型方向并制定可执行的计划", scenarioEn: "Struggling startup founders and CEOs needing systematic transformation direction assessment and executable plans",
    problemFocus: "增长停滞、融资困难、产品市场不匹配，不知道往哪个方向转型", problemFocusEn: "Growth stagnation, funding difficulties, product-market misfit — unsure which direction to pivot",
    author: "清华小明 · 星球财金AI", likes: 178, views: "15.1K", comments: 33, createdAt: "2026-04-03",
  },

  // ========== 21-81: New Prompts from learnprompt.org + docsbot.ai ==========
  {
    id: 21, title: "通用Python函数生成", titleEn: "General Python Function Generator",
    role: "dataScientist", tags: ["Python", "代码生成", "函数开发", "数据处理"], tagsEn: ["Python", "Code Generation", "Function Development", "Data Processing"],
    content: `Act as a Python code generator. Create a Python function to perform the following task: [clearly describe the task, e.g., 'read a CSV file into a pandas DataFrame and return the first 5 rows', 'calculate the moving average of a list of numbers with a window size N']. Ensure the code is well-commented.`,
    description: "重复编写基础数据处理函数，浪费时间在样板代码上", descriptionEn: "Repeatedly writing basic data processing functions, wasting time on boilerplate ...",
    scenario: "数据科学家、分析师需要快速生成标准Python数据处理函数", scenarioEn: "Data scientists and analysts needing to quickly generate standard Python data processing functions",
    problemFocus: "重复编写基础数据处理函数，浪费时间在样板代码上", problemFocusEn: "Repeatedly writing basic data processing functions, wasting time on boilerplate code",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 22, title: "Python脚本编写", titleEn: "Python Script Writer",
    role: "dataScientist", tags: ["Python", "脚本", "自动化", "错误处理"], tagsEn: ["Python", "Scripting", "Automation", "Error Handling"],
    content: `Act as a Python script writer. Write a Python script that will [describe the script's overall goal, e.g., 'scrape product names and prices from {website url}', 'automate the renaming of files in {directory path} based on {naming convention}']. The script should handle potential errors like [e.g., file not found, network issues].`,
    description: "手动执行重复性数据任务效率低，容易出错", descriptionEn: "Manual execution of repetitive data tasks is inefficient and error-prone",
    scenario: "需要将重复性任务自动化的数据工程师和分析师", scenarioEn: "Data engineers and analysts needing to automate repetitive tasks",
    problemFocus: "手动执行重复性数据任务效率低，容易出错", problemFocusEn: "Manual execution of repetitive data tasks is inefficient and error-prone",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 23, title: "Python模块开发", titleEn: "Python Module Development",
    role: "dataScientist", tags: ["Python", "模块化", "评估指标", "代码组织"], tagsEn: ["Python", "Modular", "Metrics", "Code Organization"],
    content: `Act as a Python developer. Write a Python module to calculate [specific metric or functionality, e.g., 'various text similarity scores like Jaccard and Cosine', 'custom evaluation metrics for my model'] using data from [dataset description or placeholder, e.g., '{your dataframe variable}', '{input text list}']. The module should include functions for [list key functionalities, e.g., 'calculating Jaccard similarity', 'calculating Cosine similarity', 'preprocessing input text'].`,
    description: "项目中缺少标准化的评估指标实现，每次从零开始", descriptionEn: "Projects lack standardized evaluation metric implementations, starting from scra...",
    scenario: "需要构建可复用的自定义度量/评估模块的ML工程师", scenarioEn: "ML engineers needing to build reusable custom metrics/evaluation modules",
    problemFocus: "项目中缺少标准化的评估指标实现，每次从零开始", problemFocusEn: "Projects lack standardized evaluation metric implementations, starting from scratch each time",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 24, title: "NumPy数组创建", titleEn: "NumPy Array Creation",
    role: "dataScientist", tags: ["NumPy", "数组", "数据初始化", "数值计算"], tagsEn: ["NumPy", "Arrays", "Data Initialization", "Numerical Computing"],
    content: `Act as a data scientist. Create a NumPy array with the shape ({X dim}, {Y dim}, {Z dim}) initialized with [e.g., 'random integers between {min val} and {max val}', 'zeros', 'values drawn from a normal distribution with mean {mean} and std dev {std}'].`,
    description: "记不清NumPy各种初始化方法的参数和用法", descriptionEn: "Can't remember NumPy initialization method parameters and usage",
    scenario: "需要创建各种类型测试数据或初始化矩阵的数据科学家", scenarioEn: "Data scientists needing to create various types of test data or initialize matrices",
    problemFocus: "记不清NumPy各种初始化方法的参数和用法", problemFocusEn: "Can't remember NumPy initialization method parameters and usage",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 25, title: "正则表达式生成", titleEn: "Regex Generation",
    role: "dataScientist", tags: ["正则表达式", "文本处理", "模式匹配", "数据提取"], tagsEn: ["Regex", "Text Processing", "Pattern Matching", "Data Extraction"],
    content: `Act as a regex writer. Generate a Python regular expression to [describe the pattern to match, e.g., 'extract all URLs', 'find phone numbers in US format', 'validate an email address'] from the following sample text: '{sample text or description of text}'.`,
    description: "正则表达式语法复杂，手写容易出错且耗时", descriptionEn: "Regex syntax is complex, handwriting is error-prone and time-consuming",
    scenario: "需要从文本中提取特定模式或验证格式的数据分析师", scenarioEn: "Data analysts needing to extract specific patterns or validate formats from text",
    problemFocus: "正则表达式语法复杂，手写容易出错且耗时", problemFocusEn: "Regex syntax is complex, handwriting is error-prone and time-consuming",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 26, title: "多线程Python函数", titleEn: "Multithreaded Python Function",
    role: "dataScientist", tags: ["多线程", "性能优化", "Python", "并发处理"], tagsEn: ["Multithreading", "Performance", "Python", "Concurrency"],
    content: `Act as a Python developer. Convert the following Python function to a multithreaded version to perform [task description, e.g., 'API calls to multiple endpoints', 'image processing on a batch of files'] on [input description, e.g., 'a list of URLs', 'a directory of images'] using [{N} threads] threads. Original function: [paste your Python function here]`,
    description: "单线程处理大量数据太慢，但不知道怎么安全地引入多线程", descriptionEn: "Single-threaded processing of large data is too slow, but unsure how to safely i...",
    scenario: "需要提升数据处理速度，利用多核CPU的工程师", scenarioEn: "Engineers needing to speed up data processing by utilizing multi-core CPUs",
    problemFocus: "单线程处理大量数据太慢，但不知道怎么安全地引入多线程", problemFocusEn: "Single-threaded processing of large data is too slow, but unsure how to safely introduce multithreading",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 27, title: "SQL代码生成", titleEn: "SQL Code Generation",
    role: "dataScientist", tags: ["SQL", "数据库", "查询生成", "数据分析"], tagsEn: ["SQL", "Database", "Query Generation", "Data Analysis"],
    content: `Act as a SQL code generator for [SQL Dialect, e.g., 'PostgreSQL 14', 'MySQL 8', 'SQL Server 2019', 'SQLite']. I have a table named {table name} with columns: [{column name 1 (data type)}, {column name 2 (data type)}, ...]. Write a query to [describe the desired SQL operation, e.g., 'select the top 5 customers by total sales amount', 'calculate the 7-day rolling average of {value column} partitioned by {category column}', 'find all products that have not been sold in the last {N months}'].`,
    description: "SQL查询复杂，窗口函数、JOIN等高级用法掌握不牢", descriptionEn: "SQL queries are complex, window functions, JOINs and other advanced usage not we...",
    scenario: "需要从数据库中提取特定数据但SQL语法不熟练的分析师", scenarioEn: "Analysts needing to extract specific data from databases but not proficient in SQL syntax",
    problemFocus: "SQL查询复杂，窗口函数、JOIN等高级用法掌握不牢", problemFocusEn: "SQL queries are complex, window functions, JOINs and other advanced usage not well mastered",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 28, title: "Google Sheets公式生成", titleEn: "Google Sheets Formula Generator",
    role: "dataScientist", tags: ["Google Sheets", "电子表格", "公式", "业务分析"], tagsEn: ["Google Sheets", "Spreadsheet", "Formulas", "Business Analysis"],
    content: `Act as a Google Sheets formula generator. Create a formula that [describe the desired spreadsheet operation, e.g., 'calculates the sum of cells A1:A50 if the corresponding cell in B1:B50 is "Complete"', 'finds the VLOOKUP for {search key} in range {range} returning the {column index}'].`,
    description: "Google Sheets/Excel公式复杂，嵌套函数容易出错", descriptionEn: "Spreadsheet formulas are complex, nested functions are error-prone",
    scenario: "需要在电子表格中实现复杂计算和查找功能的业务分析师", scenarioEn: "Business analysts needing to implement complex calculations and lookups in spreadsheets",
    problemFocus: "Google Sheets/Excel公式复杂，嵌套函数容易出错", problemFocusEn: "Spreadsheet formulas are complex, nested functions are error-prone",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 29, title: "Excel VBA宏编写", titleEn: "Excel VBA Macro Development",
    role: "dataScientist", tags: ["Excel", "VBA", "自动化", "宏"], tagsEn: ["Excel", "VBA", "Automation", "Macros"],
    content: `Act as an Excel VBA developer. Write a VBA macro that [describe the function of the macro, e.g., 'loops through all selected cells and changes their background color to yellow', 'prompts the user for a folder path and imports all CSV files from that folder into separate new worksheets'].`,
    description: "每天手动处理Excel文件耗时且容易出错", descriptionEn: "Manually processing Excel files daily is time-consuming and error-prone",
    scenario: "需要自动化Excel重复操作的财务分析师和业务人员", scenarioEn: "Financial analysts and business users needing to automate repetitive Excel operations",
    problemFocus: "每天手动处理Excel文件耗时且容易出错", problemFocusEn: "Manually processing Excel files daily is time-consuming and error-prone",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 30, title: "R脚本编写", titleEn: "R Scripting",
    role: "dataScientist", tags: ["R", "统计分析", "ggplot2", "数据可视化"], tagsEn: ["R", "Statistical Analysis", "ggplot2", "Data Visualization"],
    content: `Act as a data scientist using R. Write an R script to [describe the specific requirement, e.g., 'load the {dataset name}.csv file and perform a linear regression of {dependent variable} on {independent variable1} and {independent variable2}', 'create a bar chart using ggplot2 showing the average {value column} for each {category column} in the dataframe {df name}'].`,
    description: "从Python切换到R时语法和包名不熟悉", descriptionEn: "Unfamiliar with R syntax and package names when switching from Python",
    scenario: "统计分析背景深厚，主要使用R语言的数据分析师", scenarioEn: "Data analysts with strong statistical backgrounds primarily using R language",
    problemFocus: "从Python切换到R时语法和包名不熟悉", problemFocusEn: "Unfamiliar with R syntax and package names when switching from Python",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 31, title: "数据集概览与质量问题识别", titleEn: "Dataset Overview & Quality Assessment",
    role: "dataScientist", tags: ["EDA", "数据探索", "数据质量", "pandas"], tagsEn: ["EDA", "Exploratory Analysis", "Data Quality", "pandas"],
    content: `Act as a data analyst. I have a dataset in a pandas DataFrame named '{df name}' (or located at [{file path}]). Provide a comprehensive exploratory data analysis (EDA). Summarize key statistics (e.g., shape, data types, summary statistics for numerical and categorical columns), identify potential data quality issues (e.g., missing values, duplicates, outliers), and suggest initial visualizations to understand distributions and relationships. Provide Python code using pandas, matplotlib, and seaborn.`,
    description: "拿到新数据集不知道从哪里开始分析，遗漏关键数据质量问题", descriptionEn: "Don't know where to start analyzing new datasets, missing key data quality issue...",
    scenario: "获得新数据集后需要快速了解数据质量和特征的分析师", scenarioEn: "Analysts needing to quickly understand data quality and features when receiving new datasets",
    problemFocus: "拿到新数据集不知道从哪里开始分析，遗漏关键数据质量问题", problemFocusEn: "Don't know where to start analyzing new datasets, missing key data quality issues",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 32, title: "变量关系探索", titleEn: "Variable Relationship Explorer",
    role: "dataScientist", tags: ["EDA", "相关性", "统计检验", "可视化"], tagsEn: ["EDA", "Correlation", "Statistical Tests", "Visualization"],
    content: `How can I explore the relationship between [Variable X, e.g., 'study hours'] and [Variable Y (target or related variable), e.g., 'exam score']? Suggest statistical tests (e.g., Pearson correlation, chi-squared) and visualization types (e.g., scatter plot, box plot).`,
    description: "不知道该用哪种统计检验和可视化来探索变量关系", descriptionEn: "Unsure which statistical tests and visualizations to use for exploring variable ...",
    scenario: "需要理解两个变量之间关系强度的研究人员", scenarioEn: "Researchers needing to understand the strength of relationships between two variables",
    problemFocus: "不知道该用哪种统计检验和可视化来探索变量关系", problemFocusEn: "Unsure which statistical tests and visualizations to use for exploring variable relationships",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 33, title: "异常值检测方法", titleEn: "Outlier Detection Methods",
    role: "dataScientist", tags: ["异常值", "数据清洗", "Isolation Forest", "统计方法"], tagsEn: ["Outliers", "Data Cleaning", "Isolation Forest", "Statistical Methods"],
    content: `For a feature named [feature name] (which is [numerical/categorical]) in my dataset on [dataset topic, e.g., credit card transactions], what are 3 different methods to identify potential outliers (e.g., Z-score, IQR, Isolation Forest)? Provide Python code snippets using [pandas/numpy/scipy/sklearn] for one of these methods.`,
    description: "异常值对模型影响大，但不知道哪种检测方法最适合当前数据", descriptionEn: "Outliers greatly affect models, but unsure which detection method is best for cu...",
    scenario: "需要识别和处理数据集中异常值的数据科学家", scenarioEn: "Data scientists needing to identify and handle outliers in datasets",
    problemFocus: "异常值对模型影响大，但不知道哪种检测方法最适合当前数据", problemFocusEn: "Outliers greatly affect models, but unsure which detection method is best for current data",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 34, title: "分布检查与数据变换", titleEn: "Distribution Check & Data Transformation",
    role: "dataScientist", tags: ["分布", "数据变换", "Box-Cox", "对数变换"], tagsEn: ["Distribution", "Data Transformation", "Box-Cox", "Log Transform"],
    content: `How can I check the distribution of the numerical feature [feature name] in my dataset using Python (seaborn or matplotlib)? If it's skewed, what are 2-3 common transformation techniques (e.g., log, Box-Cox) to consider for a [type of model, e.g., linear regression, neural network] model, and why might they be helpful?`,
    description: "特征分布偏斜影响模型性能，不知道用什么变换最合适", descriptionEn: "Skewed feature distributions affect model performance, unsure which transformati...",
    scenario: "建模前需要检查特征分布并进行必要变换的数据科学家", scenarioEn: "Data scientists needing to check feature distributions and apply necessary transformations before modeling",
    problemFocus: "特征分布偏斜影响模型性能，不知道用什么变换最合适", problemFocusEn: "Skewed feature distributions affect model performance, unsure which transformation is most suitable",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 35, title: "针对性数据预处理流程", titleEn: "Targeted Data Preprocessing Pipeline",
    role: "dataScientist", tags: ["数据清洗", "预处理", "pandas", "特征工程"], tagsEn: ["Data Cleaning", "Preprocessing", "pandas", "Feature Engineering"],
    content: `Act as a data analyst. Preprocess the dataset loaded into a pandas DataFrame named {df name} (or located at [{file path}]) by performing the following specific steps in order: [e.g., '1. Remove duplicate records based on all columns', '2. Handle missing values in {column name A} by filling with the mean', '3. Convert {column name B} from object to datetime', '4. Standardize {column name C} using StandardScaler']. Provide Python code.`,
    description: "数据预处理步骤混乱，不知道执行顺序和最佳实践", descriptionEn: "Data preprocessing steps are chaotic, unsure of execution order and best practic...",
    scenario: "需要按照特定步骤清洗和预处理数据的分析师", scenarioEn: "Analysts needing to clean and preprocess data following specific steps",
    problemFocus: "数据预处理步骤混乱，不知道执行顺序和最佳实践", problemFocusEn: "Data preprocessing steps are chaotic, unsure of execution order and best practices",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 36, title: "缺失值处理策略", titleEn: "Missing Value Handling Strategies",
    role: "dataScientist", tags: ["缺失值", "插补", "KNN", "数据质量"], tagsEn: ["Missing Values", "Imputation", "KNN", "Data Quality"],
    content: `My dataset for [problem domain, e.g., patient health records] has missing values in columns [Column X (e.g., 30% missing, numeric, e.g., 'blood pressure'), Column Y (e.g., 5% missing, categorical, e.g., 'smoker status')]. What are 3 different strategies (e.g., mean/median/mode imputation, KNN imputation, predictive model imputation) to handle these missing values? Detail their pros, cons, and when each might be most appropriate for my target model [model type, e.g., Random Forest].`,
    description: "缺失值处理方式直接影响模型效果，但不知道哪种策略最适合", descriptionEn: "Missing value handling directly affects model performance, but unsure which stra...",
    scenario: "数据集中存在大量缺失值，需要选择最佳填充策略的分析师", scenarioEn: "Analysts dealing with datasets containing significant missing values, needing to choose optimal imputation strategies",
    problemFocus: "缺失值处理方式直接影响模型效果，但不知道哪种策略最适合", problemFocusEn: "Missing value handling directly affects model performance, but unsure which strategy is best",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 37, title: "分类变量编码比较", titleEn: "Categorical Variable Encoding Comparison",
    role: "dataScientist", tags: ["分类变量", "编码", "one-hot", "目标编码"], tagsEn: ["Categorical Variables", "Encoding", "One-Hot", "Target Encoding"],
    content: `I have categorical features [Feature A (e.g., 'City' - high cardinality), Feature B (e.g., 'Payment Method' - medium cardinality), Feature C (e.g., 'Binary Flag' - low cardinality)] for my [type of model, e.g., Gradient Boosting] model. Compare one-hot encoding, label encoding, ordinal encoding, and target encoding for these features. Which would you recommend for each and why? Provide Python sklearn or category encoders examples.`,
    description: "分类变量编码方式选择错误会导致模型性能下降或信息丢失", descriptionEn: "Incorrect categorical encoding choices lead to decreased model performance or in...",
    scenario: "需要将分类特征转换为数值形式喂给机器学习模型的数据科学家", scenarioEn: "Data scientists needing to convert categorical features to numerical form for machine learning models",
    problemFocus: "分类变量编码方式选择错误会导致模型性能下降或信息丢失", problemFocusEn: "Incorrect categorical encoding choices lead to decreased model performance or information loss",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 38, title: "文本数据预处理管道", titleEn: "Text Data Preprocessing Pipeline",
    role: "dataScientist", tags: ["NLP", "文本预处理", "TF-IDF", "词嵌入"], tagsEn: ["NLP", "Text Preprocessing", "TF-IDF", "Word Embeddings"],
    content: `I'm working with text data from [source, e.g., customer support tickets] for [task, e.g., text classification]. Outline a comprehensive text preprocessing pipeline. What are the essential steps (e.g., lowercasing, punctuation removal, tokenization, stop-word removal, stemming/lemmatization, TF-IDF/Word2Vec vectorization)? Provide a Python example using [NLTK/spaCy/sklearn] for key steps.`,
    description: "文本预处理步骤多且杂，不知道哪些是必须的，顺序如何安排", descriptionEn: "Text preprocessing has many steps, unsure which are essential and in what order",
    scenario: "从事NLP项目需要系统化处理原始文本数据的NLP工程师", scenarioEn: "NLP engineers working on NLP projects needing systematic raw text processing",
    problemFocus: "文本预处理步骤多且杂，不知道哪些是必须的，顺序如何安排", problemFocusEn: "Text preprocessing has many steps, unsure which are essential and in what order",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 39, title: "数据验证规则", titleEn: "Data Validation Rules",
    role: "dataScientist", tags: ["数据验证", "数据质量", "Great Expectations", "自动化检查"], tagsEn: ["Data Validation", "Data Quality", "Great Expectations", "Automated Checks"],
    content: `Act as a data quality analyst. Write Python code using pandas (or a library like Great Expectations or Pandera if you can provide a conceptual example) to validate the column named {column name} in the DataFrame {dataframe name}. The validation checks should ensure: [list requirements, e.g., 'the column contains only {valid data type, e.g., integers}', 'values are within the range {min val} to {max val}', 'there are no missing values', 'all entries match one of the predefined categories: {category list}', 'it does not contain outliers based on the IQR method'].`,
    description: "脏数据进入模型导致结果不可信，缺乏自动化的数据质量检查", descriptionEn: "Dirty data entering models leads to untrustworthy results, lacking automated dat...",
    scenario: "需要在数据进入模型前建立质量检查机制的数据工程师", scenarioEn: "Data engineers needing to establish quality checks before data enters models",
    problemFocus: "脏数据进入模型导致结果不可信，缺乏自动化的数据质量检查", problemFocusEn: "Dirty data entering models leads to untrustworthy results, lacking automated data quality checks",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 40, title: "特征工程创意生成", titleEn: "Feature Engineering Ideas Generator",
    role: "dataScientist", tags: ["特征工程", "特征构造", "pandas", "模型优化"], tagsEn: ["Feature Engineering", "Feature Construction", "pandas", "Model Optimization"],
    content: `Act as a feature engineer. I have a dataset about [dataset topic, e.g., 'e-commerce transactions'] with features like [list current features, e.g., 'user_id, product_id, timestamp, price, category']. My target variable is [target variable]. Suggest 5-7 new features I could engineer from the existing data (e.g., ratios, aggregations, time-based features, interaction terms). Explain the intuition behind each and provide Python code to create them using pandas.`,
    description: "特征不够丰富导致模型效果 plateau，缺乏创造性特征构造思路", descriptionEn: "Insufficient features cause model performance to plateau, lacking creative featu...",
    scenario: "需要提升模型性能但特征工程思路枯竭的数据科学家", scenarioEn: "Data scientists needing to improve model performance but running out of feature engineering ideas",
    problemFocus: "特征不够丰富导致模型效果 plateau，缺乏创造性特征构造思路", problemFocusEn: "Insufficient features cause model performance to plateau, lacking creative feature construction ideas",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 41, title: "特征选择方法比较", titleEn: "Feature Selection Methods Comparison",
    role: "dataScientist", tags: ["特征选择", "降维", "LASSO", "RFE"], tagsEn: ["Feature Selection", "Dimensionality Reduction", "LASSO", "RFE"],
    content: `I have a dataset with [number of features] features for a [regression/classification] task. Compare 3 different feature selection methods (e.g., filter methods like correlation/chi-squared, wrapper methods like recursive feature elimination, embedded methods like LASSO/feature importance from tree models). Which would you recommend for my scenario and why? Provide Python sklearn examples.`,
    description: "特征太多导致过拟合和训练慢，不知道哪种选择方法最有效", descriptionEn: "Too many features cause overfitting and slow training, unsure which selection me...",
    scenario: "特征维度过高需要降维或筛选的数据科学家", scenarioEn: "Data scientists dealing with high-dimensional feature spaces needing dimensionality reduction or selection",
    problemFocus: "特征太多导致过拟合和训练慢，不知道哪种选择方法最有效", problemFocusEn: "Too many features cause overfitting and slow training, unsure which selection method is most effective",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 42, title: "基线模型建立", titleEn: "Baseline Model Setup",
    role: "dataScientist", tags: ["基线模型", "Logistic Regression", "sklearn", "模型评估"], tagsEn: ["Baseline Model", "Logistic Regression", "sklearn", "Model Evaluation"],
    content: `Act as a data scientist. I am starting a [classification/regression] project on [dataset description, e.g., 'predicting customer churn using historical behavior data']. Before building complex models, what would be a simple yet effective baseline model (e.g., DummyClassifier, Logistic Regression) to establish initial performance? Explain why and provide a Python sklearn example.`,
    description: "没有基线模型就无法判断复杂模型是否真的有提升", descriptionEn: "Without a baseline model, can't judge if complex models actually improve perform...",
    scenario: "开始新机器学习项目需要建立性能基准线的数据科学家", scenarioEn: "Data scientists starting new ML projects needing to establish performance baselines",
    problemFocus: "没有基线模型就无法判断复杂模型是否真的有提升", problemFocusEn: "Without a baseline model, can't judge if complex models actually improve performance",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 43, title: "分类模型训练", titleEn: "Classification Model Training",
    role: "dataScientist", tags: ["分类", "Random Forest", "sklearn", "监督学习"], tagsEn: ["Classification", "Random Forest", "sklearn", "Supervised Learning"],
    content: `Act as a data scientist. I have a dataset [describe dataset, e.g., 'in a pandas DataFrame {df name} with features {feature list} and a binary target variable {target column name}']. Build and train a [specific model, e.g., Logistic Regression, Random Forest, Support Vector Machine] model to predict [{target column name}]. Include steps for splitting data, training the model, and making predictions. Provide Python sklearn code.`,
    description: "模型训练流程不熟悉，不知道数据划分、训练、预测的完整步骤", descriptionEn: "Unfamiliar with model training workflow, don't know complete steps for data spli...",
    scenario: "需要快速搭建和训练分类模型的数据科学家", scenarioEn: "Data scientists needing to quickly build and train classification models",
    problemFocus: "模型训练流程不熟悉，不知道数据划分、训练、预测的完整步骤", problemFocusEn: "Unfamiliar with model training workflow, don't know complete steps for data splitting, training, and prediction",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 44, title: "聚类实现", titleEn: "Clustering Implementation",
    role: "dataScientist", tags: ["聚类", "KMeans", "无监督学习", "PCA"], tagsEn: ["Clustering", "KMeans", "Unsupervised Learning", "PCA"],
    content: `Act as a data scientist. Cluster the [items to cluster, e.g., 'customers based on demographics and purchase behavior', 'documents based on their TF-IDF vectors'] in the dataset [{dataset description or DataFrame name}] into an appropriate number of groups (or suggest how to find k). Use the [clustering algorithm, e.g., 'KMeans', 'AgglomerativeClustering'] algorithm. Provide Python code for its implementation and, if applicable, suggest how to visualize the clusters (e.g., using PCA for dimensionality reduction first).`,
    description: "不知道选择多少聚类数K，也不知道如何评估聚类效果", descriptionEn: "Don't know how to choose the optimal number of clusters K or how to evaluate clu...",
    scenario: "需要对客户或文档进行无监督分组的数据科学家", scenarioEn: "Data scientists needing to perform unsupervised grouping of customers or documents",
    problemFocus: "不知道选择多少聚类数K，也不知道如何评估聚类效果", problemFocusEn: "Don't know how to choose the optimal number of clusters K or how to evaluate clustering quality",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 45, title: "AutoML自动建模", titleEn: "Automated Machine Learning (AutoML)",
    role: "dataScientist", tags: ["AutoML", "TPOT", "自动化", "模型选择"], tagsEn: ["AutoML", "TPOT", "Automation", "Model Selection"],
    content: `Act as an AutoML bot using [AutoML library, e.g., 'TPOT', 'Auto-sklearn', 'FLAML']. I am working on a model to predict [{target variable}] (a [classification/regression] task) based on the features in [{dataset description or path to csv}]. Please write Python code to find the best model, optimizing for [{metric, e.g., 'ROC AUC', 'F1-score for class X', 'Mean Squared Error'}] on the test set. Include code for basic data preprocessing if the library handles it or suggest what I should do first.`,
    description: "手动尝试不同模型和参数组合耗时巨大，AutoML可以大幅加速", descriptionEn: "Manually trying different models and parameter combinations is time-consuming, A...",
    scenario: "想快速找到最佳模型而无需手动调参的数据科学家", scenarioEn: "Data scientists wanting to quickly find the best model without manual hyperparameter tuning",
    problemFocus: "手动尝试不同模型和参数组合耗时巨大，AutoML可以大幅加速", problemFocusEn: "Manually trying different models and parameter combinations is time-consuming, AutoML can greatly accelerate",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 46, title: "NLP任务实现", titleEn: "NLP Task Implementation",
    role: "dataScientist", tags: ["NLP", "情感分析", "主题模型", "NER"], tagsEn: ["NLP", "Sentiment Analysis", "Topic Modeling", "NER"],
    content: `Act as an NLP specialist. For the text data in [dataset description or column name, e.g., 'the 'review text' column of my DataFrame {df name}'], perform [NLP task, e.g., 'sentiment analysis to classify feedback as positive/negative/neutral', 'topic modeling using LDA to identify {k topics} key themes', 'named entity recognition to extract organizations and locations']. Explain the chosen approach/model (e.g., VADER, sklearn.decomposition.LatentDirichletAllocation, spaCy NER) and provide Python code.`,
    description: "NLP任务工具和方法众多，不知道哪种最适合当前任务", descriptionEn: "Many NLP tools and methods available, unsure which is best for the current task",
    scenario: "需要处理文本数据并提取情感、主题或实体的NLP从业者", scenarioEn: "NLP practitioners needing to process text data and extract sentiment, topics, or entities",
    problemFocus: "NLP任务工具和方法众多，不知道哪种最适合当前任务", problemFocusEn: "Many NLP tools and methods available, unsure which is best for the current task",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 47, title: "推荐系统开发", titleEn: "Recommender System Development",
    role: "dataScientist", tags: ["推荐系统", "协同过滤", "SVD", " Surprise"], tagsEn: ["Recommender System", "Collaborative Filtering", "SVD", "Surprise"],
    content: `Act as a data scientist. Develop a [type of recommender system, e.g., 'item-based collaborative filtering', 'content-based using TF-IDF of product descriptions', 'matrix factorization using SVD'] recommender system. The system should suggest [items to recommend, e.g., 'movies', 'products'] to [users or entities, e.g., 'users based on their ratings', 'customers based on their purchase history']. The data is in [data source description, e.g., 'a DataFrame {df name} with columns user id, item id, rating']. Describe the methodology and provide Python code using a library like [Surprise/implicit/sklearn].`,
    description: "推荐系统算法复杂，实现细节容易出错", descriptionEn: "Recommender system algorithms are complex, implementation details are error-pron...",
    scenario: "需要为用户推荐产品或内容的电商平台工程师", scenarioEn: "E-commerce platform engineers needing to recommend products or content to users",
    problemFocus: "推荐系统算法复杂，实现细节容易出错", problemFocusEn: "Recommender system algorithms are complex, implementation details are error-prone",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 48, title: "时间序列分析与预测", titleEn: "Time Series Analysis & Forecasting",
    role: "dataScientist", tags: ["时间序列", "预测", "Prophet", "LSTM"], tagsEn: ["Time Series", "Forecasting", "Prophet", "LSTM"],
    content: `Act as a time series expert. I have a time series dataset: [describe dataset, e.g., 'daily stock prices for {ticker symbol} in {df name} with columns {date column} and {price column}']. Build a model (e.g., [ARIMA, SARIMA, Prophet, Exponential Smoothing, LSTM]) to forecast [{target variable, e.g., 'price column'}] for the next [{N time periods, e.g., '30 days'}]. Use data from [{train start date} to {train end date}] for training. Provide Python code using [statsmodels/pmdarima/prophet/tensorflow].`,
    description: "时间序列模型选择困难，不知道如何处理趋势和季节性", descriptionEn: "Difficult to choose time series models, unsure how to handle trends and seasonal...",
    scenario: "需要预测未来趋势（销售、股价、流量）的业务分析师", scenarioEn: "Business analysts needing to forecast future trends (sales, stock prices, traffic)",
    problemFocus: "时间序列模型选择困难，不知道如何处理趋势和季节性", problemFocusEn: "Difficult to choose time series models, unsure how to handle trends and seasonality",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 49, title: "交叉验证策略与实现", titleEn: "Cross-Validation Strategy & Implementation",
    role: "dataScientist", tags: ["交叉验证", "模型评估", "sklearn", "泛化能力"], tagsEn: ["Cross-Validation", "Model Evaluation", "sklearn", "Generalization"],
    content: `Explain k-fold cross-validation and its importance for model evaluation. For my dataset of [N samples] samples for a [classification/regression] task, what value of 'k' would you recommend and why? Provide a Python sklearn example of performing k-fold cross-validation for a [model name, e.g., GradientBoostingClassifier] and calculating [metric, e.g., 'average ROC AUC'].`,
    description: "单次训练/测试分割结果不稳定，无法准确估计模型在真实数据上的表现", descriptionEn: "Single train/test split results are unstable, can't accurately estimate model pe...",
    scenario: "需要可靠评估模型泛化能力的数据科学家", scenarioEn: "Data scientists needing to reliably assess model generalization ability",
    problemFocus: "单次训练/测试分割结果不稳定，无法准确估计模型在真实数据上的表现", problemFocusEn: "Single train/test split results are unstable, can't accurately estimate model performance on real data",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 50, title: "超参数调优代码", titleEn: "Hyperparameter Tuning Code",
    role: "dataScientist", tags: ["超参数调优", "GridSearch", "Optuna", "贝叶斯优化"], tagsEn: ["Hyperparameter Tuning", "GridSearch", "Optuna", "Bayesian Optimization"],
    content: `Act as a data scientist. I have trained a [{model name, e.g., 'XGBoost Classifier'}] model. Write Python code to tune its hyperparameters using [tuning technique, e.g., 'GridSearchCV', 'RandomizedSearchCV', 'Optuna for Bayesian optimization']. The hyperparameters to tune are [{hyperparameter 1: [range or list], hyperparameter 2: [range or list], ...}] to optimize for [metric, e.g., 'ROC AUC'].`,
    description: "手动调参效率低，搜索空间巨大时无法穷举", descriptionEn: "Manual tuning is inefficient, can't exhaustively search when the search space is...",
    scenario: "需要找到模型最优参数组合以提升性能的ML工程师", scenarioEn: "ML engineers needing to find optimal parameter combinations to improve model performance",
    problemFocus: "手动调参效率低，搜索空间巨大时无法穷举", problemFocusEn: "Manual tuning is inefficient, can't exhaustively search when the search space is huge",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 51, title: "SHAP模型解释", titleEn: "SHAP Model Explanation",
    role: "dataScientist", tags: ["SHAP", "模型可解释性", "特征重要性", "XAI"], tagsEn: ["SHAP", "Model Interpretability", "Feature Importance", "XAI"],
    content: `I have a trained [model type, e.g., XGBoost, Random Forest] model for a [classification/regression] task. I want to understand feature importance and explain individual predictions to stakeholders. How can I use SHAP (SHapley Additive exPlanations) to [describe what you want to explain, e.g., 'explain the prediction for a specific instance: {instance data as dict or array}', 'show the global feature importance using SHAP summary plot', 'generate a SHAP dependence plot for {feature name}'].`,
    description: "模型是黑盒，不知道哪些特征对预测影响最大以及为什么", descriptionEn: "Models are black boxes, don't know which features most influence predictions and...",
    scenario: "需要向非技术利益相关者解释模型决策的数据科学家", scenarioEn: "Data scientists needing to explain model decisions to non-technical stakeholders",
    problemFocus: "模型是黑盒，不知道哪些特征对预测影响最大以及为什么", problemFocusEn: "Models are black boxes, don't know which features most influence predictions and why",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 52, title: "模型性能统计比较", titleEn: "Statistical Model Performance Comparison",
    role: "dataScientist", tags: ["统计检验", "模型比较", "McNemar", "显著性"], tagsEn: ["Statistical Tests", "Model Comparison", "McNemar", "Significance"],
    content: `I have trained [Model A (e.g., Logistic Regression)] and [Model B (e.g., Random Forest)] for predicting [target variable]. On a held-out test set, Model A achieved [Metric A value, e.g., ROC AUC of 0.75] and Model B achieved [Metric B value, e.g., ROC AUC of 0.78]. How can I statistically compare their performance (e.g., using McNemar's test for classification accuracy, or paired t-test on cross-validation scores) to determine if Model B is significantly better for [business objective]? Provide a conceptual outline or Python example if possible.`,
    description: "仅凭分数高低无法判断模型差异是真的更好还是随机波动", descriptionEn: "Score differences alone can't determine if model improvements are real or random...",
    scenario: "需要判断模型A和模型B的差异是否具有统计显著性的研究者", scenarioEn: "Researchers needing to determine if differences between Model A and Model B are statistically significant",
    problemFocus: "仅凭分数高低无法判断模型差异是真的更好还是随机波动", problemFocusEn: "Score differences alone can't determine if model improvements are real or random variation",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 53, title: "数据可视化图表选择", titleEn: "Choosing the Right Plot for Data",
    role: "dataScientist", tags: ["数据可视化", "图表选择", "Seaborn", "Plotly"], tagsEn: ["Data Visualization", "Chart Selection", "Seaborn", "Plotly"],
    content: `I want to visualize [specific aspect, e.g., 'the distribution of product prices', 'the relationship between advertising spend and sales', 'the monthly trend of website visits', 'comparing sales across different product categories']. My data includes [relevant column names and types, e.g., 'price (float)', 'ad spend (float), sales (float)', 'date (datetime), visits (int)', 'category (string), sales (float)']. What type of plot (e.g., histogram, scatter plot, line chart, bar chart, box plot) would be most effective? Provide a Python code snippet using [Matplotlib/Seaborn/Plotly].`,
    description: "图表选择不当导致数据洞察无法清晰传达", descriptionEn: "Inappropriate chart choices prevent clear communication of data insights",
    scenario: "需要选择最合适的图表类型来有效传达数据洞察的分析师", scenarioEn: "Analysts needing to choose the most appropriate chart type to effectively communicate data insights",
    problemFocus: "图表选择不当导致数据洞察无法清晰传达", problemFocusEn: "Inappropriate chart choices prevent clear communication of data insights",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 54, title: "仪表板可视化设计", titleEn: "Dashboard Visualization Design",
    role: "dataScientist", tags: ["仪表板", "KPI", "监控", "业务智能"], tagsEn: ["Dashboard", "KPI", "Monitoring", "Business Intelligence"],
    content: `Suggest 3-5 key visualizations (and the plot types) to include in a dashboard for monitoring [key performance indicator or area, e.g., 'e-commerce sales performance', 'social media engagement', 'real-time system health'] based on data with columns [relevant columns and their general meaning].`,
    description: "仪表板图表过多或选择不当，决策者无法快速获取关键信息", descriptionEn: "Dashboards have too many or inappropriate charts, decision-makers can't quickly ...",
    scenario: "需要设计数据仪表板来监控业务KPI的产品经理和分析师", scenarioEn: "Product managers and analysts needing to design data dashboards for monitoring business KPIs",
    problemFocus: "仪表板图表过多或选择不当，决策者无法快速获取关键信息", problemFocusEn: "Dashboards have too many or inappropriate charts, decision-makers can't quickly get key information",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 55, title: "模型性能可视化", titleEn: "Visualizing Model Performance",
    role: "dataScientist", tags: ["ROC", "混淆矩阵", "模型评估", "可视化"], tagsEn: ["ROC", "Confusion Matrix", "Model Evaluation", "Visualization"],
    content: `How can I visualize the performance of my [binary/multi-class classification model, e.g., Logistic Regression]? Suggest plots like ROC curve, Precision-Recall curve, confusion matrix, or calibration curve. Explain what insights each provides and provide Python sklearn.metrics or matplotlib/seaborn examples for generating one of them, e.g., [the confusion matrix].`,
    description: "只看准确率不够全面，无法发现模型在不同类别上的表现差异", descriptionEn: "Accuracy alone isn't comprehensive enough, can't discover model performance diff...",
    scenario: "需要直观展示模型分类效果的数据科学家", scenarioEn: "Data scientists needing to visually demonstrate model classification performance",
    problemFocus: "只看准确率不够全面，无法发现模型在不同类别上的表现差异", problemFocusEn: "Accuracy alone isn't comprehensive enough, can't discover model performance differences across classes",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 56, title: "代码片段解释", titleEn: "Explain Code Snippet",
    role: "dataScientist", tags: ["代码理解", "调试", "代码审查", "维护"], tagsEn: ["Code Understanding", "Debugging", "Code Review", "Maintenance"],
    content: `Act as a code explainer. Explain what the following [language, e.g., 'Python', 'SQL', 'R'] code is doing. Provide a step-by-step explanation, describe the overall purpose, and highlight any complex or non-obvious logic: [paste your code here]`,
    description: "接手遗留项目时代码注释缺失，理解成本高", descriptionEn: "Legacy projects lack code comments, high understanding cost when taking over",
    scenario: "阅读他人代码或遗留代码时需要理解其逻辑的开发人员", scenarioEn: "Developers needing to understand logic when reading others' code or legacy code",
    problemFocus: "接手遗留项目时代码注释缺失，理解成本高", problemFocusEn: "Legacy projects lack code comments, high understanding cost when taking over",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 57, title: "代码性能优化", titleEn: "Optimize Code Performance",
    role: "dataScientist", tags: ["性能优化", "代码重构", "内存优化", "算法"], tagsEn: ["Performance Optimization", "Code Refactoring", "Memory Optimization", "Algorithms"],
    content: `Act as a code optimizer. The following [language, e.g., 'Python', 'SQL'] code is [describe issue, e.g., 'running very slowly on large data', 'hard to understand', 'using too much memory']: [paste your code here]. Suggest improvements to [e.g., 'enhance its time complexity', 'reduce memory usage by {target amount or method}', 'improve readability through better variable names and comments', 'simplify the logic for {specific part}']. Provide the optimized code if possible.`,
    description: "数据量增大后原有代码无法扩展，性能急剧下降", descriptionEn: "Original code can't scale as data volume increases, performance degrades sharply",
    scenario: "代码运行缓慢或占用内存过高需要优化的工程师", scenarioEn: "Engineers needing to optimize code that runs slowly or uses too much memory",
    problemFocus: "数据量增大后原有代码无法扩展，性能急剧下降", problemFocusEn: "Original code can't scale as data volume increases, performance degrades sharply",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 58, title: "编程语言间代码转换", titleEn: "Translate Code Between Languages",
    role: "dataScientist", tags: ["代码迁移", "语言转换", "SQL", "Python"], tagsEn: ["Code Migration", "Language Translation", "SQL", "Python"],
    content: `Act as a code translator. Convert the following code snippet from [{source language, e.g., 'Python with pandas'}] to [{target language, e.g., 'SQL for PostgreSQL', 'R with dplyr'}]. Ensure the functionality remains identical: [paste your code here]`,
    description: "团队技术栈变化（如从R切换到Python），代码需要迁移", descriptionEn: "Team tech stack changes (e.g., from R to Python), code needs migration",
    scenario: "需要在不同技术栈间迁移数据处理逻辑的分析师", scenarioEn: "Analysts needing to migrate data processing logic between different technology stacks",
    problemFocus: "团队技术栈变化（如从R切换到Python），代码需要迁移", problemFocusEn: "Team tech stack changes (e.g., from R to Python), code needs migration",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 59, title: "代码文档生成", titleEn: "Write Documentation for Code",
    role: "dataScientist", tags: ["文档", "代码规范", "docstring", "维护"], tagsEn: ["Documentation", "Code Standards", "Docstring", "Maintenance"],
    content: `Act as a software developer. Generate documentation (e.g., a docstring in Python) for the following [language] function/module. Include a clear description of its purpose, parameters (name, type, description, default value if any), what it returns (type, description), and any exceptions it might raise: [paste your Python function or code block here]`,
    description: "项目文档缺失，新成员难以理解和使用现有代码", descriptionEn: "Project documentation is missing, new members struggle to understand and use exi...",
    scenario: "需要为代码库编写标准文档的开发人员", scenarioEn: "Developers needing to write standard documentation for codebases",
    problemFocus: "项目文档缺失，新成员难以理解和使用现有代码", problemFocusEn: "Project documentation is missing, new members struggle to understand and use existing code",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 60, title: "A/B测试设计与分析", titleEn: "A/B Test Design & Analysis",
    role: "dataScientist", tags: ["A/B测试", "实验设计", "统计功效", "假设检验"], tagsEn: ["A/B Testing", "Experiment Design", "Statistical Power", "Hypothesis Testing"],
    content: `Act as an experimentation analyst. I want to run an A/B test to compare [Control experience, e.g., 'the current website landing page'] against [Treatment experience, e.g., 'a new landing page with a redesigned hero section']. The primary metric I want to improve is [metric, e.g., 'conversion rate']. I expect the current conversion rate is around [base rate, e.g., 2%]. Design a rigorous A/B test for me. Include: Hypothesis formulation (null and alternative), Randomization unit, Key metrics to track (primary and secondary), How to calculate the required sample size (assuming [desired power, e.g., 80%] and [significance level, e.g., alpha=0.05], and [minimum detectable effect, e.g., 2% uplift]), The statistical test to use for comparing results (e.g., chi-squared, z-test for proportions), How long to run the test, How to interpret the results.`,
    description: "实验设计不严谨，结果不可信，无法区分信号和噪声", descriptionEn: "Experiment designs are not rigorous, results are unreliable, can't distinguish s...",
    scenario: "需要通过实验验证产品改动效果的产品经理和增长分析师", scenarioEn: "Product managers and growth analysts needing to experimentally validate product changes",
    problemFocus: "实验设计不严谨，结果不可信，无法区分信号和噪声", problemFocusEn: "Experiment designs are not rigorous, results are unreliable, can't distinguish signal from noise",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 61, title: "相关数据集推荐", titleEn: "Suggest Relevant Datasets",
    role: "dataScientist", tags: ["数据集", "作品集", "开源数据", "Kaggle"], tagsEn: ["Datasets", "Portfolio", "Open Data", "Kaggle"],
    content: `Act as a data science career coach. I want to build a portfolio project demonstrating skills in [specific skills or technologies, e.g., 'NLP for sentiment analysis using transformers', 'time series forecasting with Prophet', 'computer vision for image classification with PyTorch'] for a [{project goal, e.g., 'classifying movie reviews', 'predicting stock prices', 'identifying dog breeds'}]. Can you suggest 3-5 relevant, publicly available datasets for this use case? Provide links if possible.`,
    description: "找不到合适的练习数据集，不知道哪些数据集适合展示特定技能", descriptionEn: "Can't find suitable practice datasets, don't know which datasets best demonstrat...",
    scenario: "需要为作品集项目寻找合适公开数据集的数据科学学习者", scenarioEn: "Data science learners needing to find appropriate public datasets for portfolio projects",
    problemFocus: "找不到合适的练习数据集，不知道哪些数据集适合展示特定技能", problemFocusEn: "Can't find suitable practice datasets, don't know which datasets best demonstrate specific skills",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 62, title: "边缘案例识别", titleEn: "Identify Edge Cases for a Function",
    role: "dataScientist", tags: ["边界测试", "QA", "健壮性", "单元测试"], tagsEn: ["Edge Cases", "QA", "Robustness", "Unit Testing"],
    content: `Act as a software quality assurance engineer. Help me identify potential edge cases and boundary conditions for the following Python function that [function purpose, e.g., 'calculates the average of a list of numbers']. Consider various input types (valid and invalid), empty inputs, very large inputs, inputs with special values (None, NaN), etc. Function: [paste your Python function here]`,
    description: "代码在生产环境遇到边界条件时崩溃，测试覆盖不全", descriptionEn: "Code crashes in production when encountering boundary conditions, insufficient t...",
    scenario: "需要编写健壮代码、处理各种异常输入的开发者", scenarioEn: "Developers needing to write robust code handling various exceptional inputs",
    problemFocus: "代码在生产环境遇到边界条件时崩溃，测试覆盖不全", problemFocusEn: "Code crashes in production when encountering boundary conditions, insufficient test coverage",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 63, title: "作品集项目创意", titleEn: "Portfolio Project Ideas",
    role: "dataScientist", tags: ["职业发展", "作品集", "求职", "项目创意"], tagsEn: ["Career Development", "Portfolio", "Job Hunt", "Project Ideas"],
    content: `Act as a data science mentor. My background is in [{your background, e.g., 'marketing analytics', 'academic research in biology', 'software engineering with Java'}] and I want to [career goal, e.g., 'transition into a Machine Learning Engineer role', 'specialize in MLOps', 'become a Data Scientist in the healthcare industry']. I need to build 2-3 portfolio projects. Can you suggest specific project ideas that leverage my background, help me achieve my goal, and showcase expertise in [{your key skills to highlight, e.g., 'Python, SQL, model deployment', 'statistical analysis, R, bioinformatics tools', 'scalable systems, cloud platforms like AWS/Azure'}] relevant to [{target industry or company type, e.g., 'tech startups', 'pharmaceutical companies', 'e-commerce businesses'}]?`,
    description: "不知道做什么项目能既展示技能又吸引目标公司的注意", descriptionEn: "Don't know what projects can both showcase skills and attract target companies' ...",
    scenario: "准备转行或求职，需要打造数据科学作品集的专业人士", scenarioEn: "Professionals preparing to switch careers or job hunt, needing to build data science portfolios",
    problemFocus: "不知道做什么项目能既展示技能又吸引目标公司的注意", problemFocusEn: "Don't know what projects can both showcase skills and attract target companies' attention",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 64, title: "学习资源推荐", titleEn: "Learning Resource Suggestions",
    role: "dataScientist", tags: ["学习资源", "在线教育", "书籍推荐", "技能提升"], tagsEn: ["Learning Resources", "Online Education", "Book Recommendations", "Skill Building"],
    content: `Act as a data science learning advisor. I want to learn more about [{specific topic, e.g., 'Reinforcement Learning from Sutton & Barto', 'advanced SQL for data analysis', 'MLOps best practices for model deployment and monitoring', 'causal inference using DoWhy/CausalML'}]. Please suggest the 3 best specific resources (e.g., books, online courses with links, influential research papers, practical blogs/tutorials). I prefer [specify resource type if any, e.g., 'interactive tutorials with code', 'in-depth video lectures', 'comprehensive textbooks'].`,
    description: "学习资源太多质量参差不齐，不知道哪些是最权威和最适合入门的", descriptionEn: "Too many learning resources of varying quality, don't know which are most author...",
    scenario: "希望系统学习某个数据科学子领域的从业者", scenarioEn: "Practitioners wanting to systematically learn a data science subfield",
    problemFocus: "学习资源太多质量参差不齐，不知道哪些是最权威和最适合入门的", problemFocusEn: "Too many learning resources of varying quality, don't know which are most authoritative and suitable for beginners",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 65, title: "算法时间复杂度比较", titleEn: "Compare Time Complexity of Algorithms",
    role: "dataScientist", tags: ["算法", "Big O", "复杂度", "面试"], tagsEn: ["Algorithms", "Big O", "Complexity", "Interview"],
    content: `Act as a computer science instructor. Compare the time complexity (Big O notation) of the following two Python algorithms that aim to achieve the same task of [task description, e.g., 'finding if an element exists in a sorted list']. Explain your reasoning for each. Algorithm 1 ([e.g., linear search]): [paste first Python function] Algorithm 2 ([e.g., binary search]): [paste second Python function]`,
    description: "无法准确判断代码的时间/空间复杂度，导致选择了低效算法", descriptionEn: "Can't accurately determine time/space complexity of code, leading to inefficient...",
    scenario: "面试准备或代码审查时需要分析算法效率的工程师", scenarioEn: "Engineers needing to analyze algorithm efficiency during interview prep or code review",
    problemFocus: "无法准确判断代码的时间/空间复杂度，导致选择了低效算法", problemFocusEn: "Can't accurately determine time/space complexity of code, leading to inefficient algorithm choices",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 66, title: "技术报告/演示结构", titleEn: "Structuring a Technical Report",
    role: "dataScientist", tags: ["技术汇报", "PPT", "沟通", "故事线"], tagsEn: ["Technical Reporting", "Presentation", "Communication", "Storytelling"],
    content: `Outline a structure for a technical report (or a 15-slide presentation) summarizing the findings of a data science project on [project topic, e.g., 'customer churn prediction model development'] for an audience of [e.g., 'technical peers and data science managers', 'non-technical business executives', 'a mixed audience']. Highlight key sections and what each should cover.`,
    description: "技术汇报要么太细节让业务方困惑，要么太简略让技术评审不满意", descriptionEn: "Technical reports are either too detailed confusing business stakeholders, or to...",
    scenario: "需要向不同受众汇报数据科学项目成果的数据科学家", scenarioEn: "Data scientists needing to present data science project findings to different audiences",
    problemFocus: "技术汇报要么太细节让业务方困惑，要么太简略让技术评审不满意", problemFocusEn: "Technical reports are either too detailed confusing business stakeholders, or too brief failing technical reviews",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 67, title: "模型潜在偏见识别", titleEn: "Identifying Potential Bias in Models",
    role: "dataScientist", tags: ["AI伦理", "偏见", "公平性", "fairlearn"], tagsEn: ["AI Ethics", "Bias", "Fairness", "fairlearn"],
    content: `What are potential sources of bias (e.g., sampling bias, measurement bias, algorithmic bias) I should be aware of when building a model to predict [sensitive outcome, e.g., 'loan application approval', 'candidate suitability for a job', 'recidivism risk']? How can I detect and mitigate these biases? Provide a conceptual framework and, where applicable, Python code examples using libraries like fairlearn or aequitas.`,
    description: "模型可能在不知不觉中歧视特定群体，造成法律和声誉风险", descriptionEn: "Models may inadvertently discriminate against specific groups, causing legal and...",
    scenario: "处理敏感预测任务（信贷、招聘、司法）需要确保模型公平性的数据科学家", scenarioEn: "Data scientists handling sensitive prediction tasks (credit, hiring, justice) needing to ensure model fairness",
    problemFocus: "模型可能在不知不觉中歧视特定群体，造成法律和声誉风险", problemFocusEn: "Models may inadvertently discriminate against specific groups, causing legal and reputational risks",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 68, title: "AI编程助手角色设定", titleEn: "AI Coding Assistant Persona",
    role: "developer", tags: ["编程助手", "Debug", "代码审查", "多语言"], tagsEn: ["Coding Assistant", "Debug", "Code Review", "Multi-language"],
    content: `You are an AI assistant specialized in coding and software development. Your primary focus is to help users write correct code, solve errors, and provide programming guidance, with particular expertise in Python and Java, but you are also proficient in every other programming language.

When responding to user queries:
- Analyze any code snippets or error messages thoroughly.
- Provide clear, precise, and correct code solutions.
- Explain errors and their fixes in a straightforward way.
- Prioritize speed and conciseness in your responses while maintaining clarity.
- Offer best practices and efficient coding techniques when relevant.
- Engage as a chat-based assistant, maintaining a conversational and helpful tone focused on development tasks.

Steps:
1. Identify the programming language from the user's input.
2. Understand the error or coding requirement described.
3. Generate correct and optimized code or solutions.
4. Provide a succinct explanation or debugging steps.
5. Repeat as needed, adapting to new coding languages or issues.

Output Format:
- Provide code blocks with the correct syntax highlighting.
- Include concise explanations or instructions alongside code.
- Keep responses fast, clear, and focused on practical development assistance.`,
    description: "遇到报错时搜索StackOverflow耗时，需要即时、准确的编程帮助", descriptionEn: "Searching StackOverflow for errors is time-consuming, need instant, accurate pro...",
    scenario: "日常编程中需要快速解决报错和获取代码建议的开发者", scenarioEn: "Developers needing quick error resolution and code suggestions during daily programming",
    problemFocus: "遇到报错时搜索StackOverflow耗时，需要即时、准确的编程帮助", problemFocusEn: "Searching StackOverflow for errors is time-consuming, need instant, accurate programming help",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 69, title: "详细代码生成指令", titleEn: "Detailed Code Generation Instruction",
    role: "developer", tags: ["代码生成", "需求拆解", "算法", "代码规范"], tagsEn: ["Code Generation", "Requirement Breakdown", "Algorithms", "Code Standards"],
    content: `Generate a detailed programming prompt.

Include a brief description of the programming task, necessary inputs, expected outputs, and any technical constraints or specifications.

Steps:
1. Identify the programming language relevant to the task.
2. Define the core programming concepts or algorithms that should be utilized.
3. Specify any libraries, frameworks, or tools required.
4. Outline the steps necessary for solving the problem, keeping in mind performance considerations if applicable.
5. Provide any known edge cases or potential sources of error to account for.

Output Format:
- Clearly formatted code block for the solution.
- Explanation of the code and why it is effective.
- Any assumptions made during coding.

Examples:
- Example 1: "Write a Python function that sorts a list using the merge sort algorithm."
- Example 2: "Create a web page using HTML and CSS to display a user profile with a picture and short bio."

Notes:
- Consider the skill level of the target audience (e.g., basic, intermediate, advanced).
- Highlight code readability and maintainability considerations.`,
    description: "需求描述模糊，开发者不知道如何拆解成具体的编程任务", descriptionEn: "Requirements are vague, developers don't know how to break them down into specif...",
    scenario: "需要将模糊需求转化为可执行代码任务的技术负责人", scenarioEn: "Tech leads needing to transform vague requirements into executable coding tasks",
    problemFocus: "需求描述模糊，开发者不知道如何拆解成具体的编程任务", problemFocusEn: "Requirements are vague, developers don't know how to break them down into specific coding tasks",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 70, title: "AI代码执行器", titleEn: "AI Code Runner",
    role: "developer", tags: ["代码执行", "逻辑验证", "Sandbox", "快速测试"], tagsEn: ["Code Execution", "Logic Verification", "Sandbox", "Quick Testing"],
    content: `You are an AI-powered code execution assistant. Your role is to simulate running user-provided code and return the expected output, or to help users write and execute code by providing the correct implementation and its expected results.

When given code:
- Analyze the logic step-by-step.
- Predict the output based on standard language behavior.
- If the code contains errors, explain the issue and suggest a fix.
- If the user asks for code to achieve a task, provide a working implementation and show what the output would look like.

For all responses:
- Be concise but thorough.
- Show the output in a code block.
- Highlight any assumptions about inputs or environment.
- Mention if the result might vary by language version or runtime.`,
    description: "不想搭建完整环境就想验证小段代码逻辑", descriptionEn: "Want to verify small code snippets without setting up a complete environment",
    scenario: "需要快速验证代码逻辑或预测输出结果的开发者", scenarioEn: "Developers needing to quickly verify code logic or predict output results",
    problemFocus: "不想搭建完整环境就想验证小段代码逻辑", problemFocusEn: "Want to verify small code snippets without setting up a complete environment",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 71, title: "10天客户获取计划", titleEn: "10-Day Client Acquisition Plan",
    role: "sales", tags: ["客户获取", "销售", "10天计划", "高客单价"], tagsEn: ["Client Acquisition", "Sales", "10-Day Plan", "High-Ticket"],
    content: `Generates a detailed sequential 4-hour daily task plan to acquire 100+ clients and make $250K in 10 days.

Create a comprehensive, day-by-day action plan for aggressive client acquisition over a 10-day period. Each day should include:
- Morning (2 hours): Prospecting and outreach activities
- Afternoon (2 hours): Follow-up, meetings, and closing activities

Day 1-3: Foundation Phase
- Build target client list based on ideal customer profile
- Prepare pitch materials and case studies
- Set up CRM and tracking systems

Day 4-7: Outreach Phase  
- Execute multi-channel outreach (email, LinkedIn, phone)
- Schedule discovery calls
- Send proposals

Day 8-10: Closing Phase
- Conduct negotiation meetings
- Handle objections
- Close deals and onboard clients

For each activity, specify:
- Exact scripts and templates to use
- Target numbers (calls, emails, meetings)
- Success metrics and checkpoints
- Contingency plans if targets are not met

Output a detailed execution playbook with time blocks, scripts, and daily accountability checklists.`,
    description: "没有系统的客户获取流程，靠随机接触效率低下", descriptionEn: "No systematic client acquisition process, random outreach is inefficient",
    scenario: "自由职业者、顾问或小型 agency 需要在短期内快速获取客户的销售负责人", scenarioEn: "Freelancers, consultants, or small agencies needing to rapidly acquire clients in the short term",
    problemFocus: "没有系统的客户获取流程，靠随机接触效率低下", problemFocusEn: "No systematic client acquisition process, random outreach is inefficient",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 72, title: "1分钟加密货币剥头皮指南", titleEn: "1-Minute Crypto Scalping Guide",
    role: "sales", tags: ["加密货币", "剥头皮", "交易", "风险管理"], tagsEn: ["Crypto", "Scalping", "Trading", "Risk Management"],
    content: `A detailed guide explaining strategies and tips for 1-minute crypto scalping.

Provide a comprehensive guide to cryptocurrency scalping on 1-minute timeframes, covering:

1. Strategy Fundamentals
- Best trading pairs for 1-minute scalping (high liquidity, low spreads)
- Optimal trading hours for volatility
- Risk management rules (max 1-2% per trade, daily loss limits)

2. Technical Setup
- Recommended charting platform and indicators
- Essential indicators: EMA 9/21 crossover, RSI (14), Volume
- Entry/exit signal rules with exact parameters

3. Execution Framework
- Position sizing formula based on account balance
- Stop-loss placement (2-3x ATR)
- Take-profit targets (1:1.5 minimum risk/reward)
- When to cut losses vs. let winners run

4. Psychological Rules
- Maximum trades per hour/day
- Discipline checklist before each trade
- How to handle consecutive losses

5. Common Mistakes to Avoid
- Overtrading indicators
- Ignoring market structure
- Revenge trading patterns

Include concrete examples with chart descriptions and a sample trading log format.`,
    description: "短线交易情绪化严重，缺乏系统化的进场/出场规则", descriptionEn: "Short-term trading is highly emotional, lacking systematic entry/exit rules",
    scenario: "希望从事高频加密货币短线交易的交易员", scenarioEn: "Traders wanting to engage in high-frequency cryptocurrency short-term trading",
    problemFocus: "短线交易情绪化严重，缺乏系统化的进场/出场规则", problemFocusEn: "Short-term trading is highly emotional, lacking systematic entry/exit rules",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 73, title: "3D打印电商商业计划", titleEn: "3D Printing E-Commerce Business Plan",
    role: "founder", tags: ["3D打印", "电商", "Shopify", "创业计划"], tagsEn: ["3D Printing", "E-commerce", "Shopify", "Business Plan"],
    content: `Detailed step-by-step blueprint for starting a 3D printing e-commerce business in Tunisia using Shopify and TikTok organic marketing.

Develop a comprehensive business plan for a 3D printing e-commerce venture:

1. Market Research
- 3D printing market size and growth trends in target region
- Top-selling 3D printed product categories
- Competitor analysis (pricing, positioning, channels)

2. Product Strategy
- 10 high-margin, printable product ideas
- Sourcing STL files (free vs. paid marketplaces)
- Material cost calculation per product

3. Operations Setup
- Printer selection (FDM vs. SLA recommendations by budget)
- Production capacity planning
- Quality control checklist
- Packaging and shipping optimization

4. E-Commerce Platform
- Shopify store setup steps
- Product photography guidelines for 3D prints
- Pricing strategy (cost + margin + shipping)

5. Marketing Plan
- TikTok organic content strategy (5 video types)
- SEO for 3D printed products
- Customer retention tactics

6. Financial Projections
- Startup cost breakdown (equipment, materials, platform)
- Monthly operating expenses
- Break-even analysis
- 12-month revenue forecast

Include supplier recommendations and a launch timeline with milestones.`,
    description: "有3D打印技能但不知道如何产品化和商业化", descriptionEn: "Have 3D printing skills but don't know how to productize and commercialize them",
    scenario: "想要将3D打印爱好转化为电商业务的内容创作者和创客", scenarioEn: "Content creators and makers wanting to turn 3D printing hobby into an e-commerce business",
    problemFocus: "有3D打印技能但不知道如何产品化和商业化", problemFocusEn: "Have 3D printing skills but don't know how to productize and commercialize them",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 74, title: "文章润色与风格优化", titleEn: "Article Polish & Style Optimization",
    role: "writer", tags: ["写作", "编辑", "润色", "风格"], tagsEn: ["Writing", "Editing", "Polishing", "Style"],
    content: `You are a professional editor with expertise in [genre/style, e.g., 'business writing', 'academic papers', 'creative fiction', 'technical documentation']. Review and improve the following text for [specific goal, e.g., 'clarity and conciseness', 'persuasive impact', 'academic rigor', 'reader engagement'].

Text to edit:
[paste your text here]

Please provide:
1. An edited version with tracked changes or clear markings
2. Explanation of major changes made and why
3. Suggestions for structural improvements (if applicable)
4. Notes on tone, voice, and style consistency
5. Grammar, punctuation, and word choice improvements

Target audience: [describe your readers]
Desired tone: [e.g., professional, conversational, authoritative, empathetic]
Word count target: [if applicable]`,
    description: "写完后自己看不出问题，缺乏专业编辑视角的反馈", descriptionEn: "Can't spot issues in own writing, lack professional editorial perspective feedba...",
    scenario: "需要提升写作质量的内容创作者、营销人员和学生", scenarioEn: "Content creators, marketers, and students needing to improve writing quality",
    problemFocus: "写完后自己看不出问题，缺乏专业编辑视角的反馈", problemFocusEn: "Can't spot issues in own writing, lack professional editorial perspective feedback",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 75, title: "营销文案生成", titleEn: "Marketing Copy Generator",
    role: "writer", tags: ["文案", "营销", "着陆页", "A/B测试"], tagsEn: ["Copywriting", "Marketing", "Landing Page", "A/B Testing"],
    content: `Act as a senior copywriter for [brand/industry, e.g., 'a sustainable fashion brand', 'a B2B SaaS company']. Write [type of content, e.g., 'a landing page', 'an email sequence', 'social media posts', 'product descriptions'] for [product/service name].

Key selling points:
- [Point 1]
- [Point 2]  
- [Point 3]

Target audience: [describe demographics and psychographics]
Tone: [e.g., bold, friendly, luxurious, technical]
Call to action: [desired action]

Please provide:
1. Headline options (5 variations)
2. Body copy with emotional hooks and logical benefits
3. Call-to-action variations
4. Subject lines (if email)
5. A/B test suggestions (what to test first)

Constraints: [word count, forbidden words, required keywords, etc.]`,
    description: "写文案时创意枯竭，不知道什么角度能打动目标客户", descriptionEn: "Creative block when writing copy, don't know what angles will resonate with targ...",
    scenario: "需要快速产出高质量营销文案的营销人员和小企业主", scenarioEn: "Marketers and small business owners needing to quickly produce high-quality marketing copy",
    problemFocus: "写文案时创意枯竭，不知道什么角度能打动目标客户", problemFocusEn: "Creative block when writing copy, don't know what angles will resonate with target customers",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 76, title: "研究论文文献综述", titleEn: "Research Paper Literature Review",
    role: "researcher", tags: ["文献综述", "学术写作", "研究", "论文"], tagsEn: ["Literature Review", "Academic Writing", "Research", "Paper"],
    content: `Act as an academic researcher. I am conducting a literature review on [topic, e.g., 'the application of transformer models in protein folding prediction']. Help me structure and write this review.

My research question is: [your research question]
I have found approximately [N] relevant papers so far.

Please help me:
1. Create a logical structure/flow for the literature review sections
2. Synthesize key findings across papers by theme (not by paper)
3. Identify gaps, contradictions, or inconsistencies in the current research
4. Highlight the most influential or foundational papers and explain why
5. Suggest a narrative arc: where does the field start, what are the main developments, and where is it heading?
6. Provide paragraph templates for:
   - Introducing a theme
   - Comparing two studies  
   - Identifying a research gap
   - Transitioning between sections

Target journal/venue: [if applicable]
Citation style: [e.g., APA, IEEE, Nature]`,
    description: "文献综述写成论文摘要的堆砌，缺乏逻辑性和批判性分析", descriptionEn: "Literature reviews become堆砌 of paper abstracts, lacking logical flow and critica...",
    scenario: "撰写学术论文文献综述部分的研究生和科研人员", scenarioEn: "Graduate students and researchers writing literature review sections of academic papers",
    problemFocus: "文献综述写成论文摘要的堆砌，缺乏逻辑性和批判性分析", problemFocusEn: "Literature reviews become堆砌 of paper abstracts, lacking logical flow and critical analysis",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 77, title: "自动化OSINT情报收集", titleEn: "Automated OSINT Intelligence Gathering",
    role: "researcher", tags: ["OSINT", "情报", "自动化", "网络安全"], tagsEn: ["OSINT", "Intelligence", "Automation", "Cybersecurity"],
    content: `A detailed guide on automating social media data collection for OSINT including methods, tools, ethics, and risk mitigation.

Create a comprehensive guide for automating open-source intelligence (OSINT) collection from social media platforms for [purpose, e.g., 'cybersecurity threat monitoring', 'competitive intelligence', 'due diligence investigations'].

Cover:

1. Legal and Ethical Framework
- Applicable laws (GDPR, CFAA, platform ToS)
- Ethical boundaries and red lines
- Documentation requirements for legal defensibility

2. Data Collection Methods
- API-based collection (rate limits, authentication)
- Web scraping techniques and tools (Scrapy, Selenium)
- Public dataset aggregation (OSINT frameworks)

3. Platform-Specific Tactics
- Twitter/X: Advanced search operators, historical archives
- LinkedIn: Profile intelligence, company mapping
- Reddit: Subreddit monitoring, sentiment extraction
- Telegram/Discord: Channel monitoring approaches

4. Analysis Techniques
- Network graph construction and analysis
- Temporal pattern detection
- Geolocation correlation
- Sentiment and topic modeling

5. Operational Security
- Attribution risks and mitigation
- Toolchain compartmentalization
- Report anonymization standards

Include recommended tools with setup instructions and a sample Python script for ethical, API-first collection.`,
    description: "开源情报收集手动操作耗时，且容易触碰到法律边界", descriptionEn: "Manual OSINT collection is time-consuming and easy to cross legal boundaries",
    scenario: "从事网络安全、竞争情报或尽职调查的研究分析师", scenarioEn: "Research analysts working in cybersecurity, competitive intelligence, or due diligence",
    problemFocus: "开源情报收集手动操作耗时，且容易触碰到法律边界", problemFocusEn: "Manual OSINT collection is time-consuming and easy to cross legal boundaries",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 78, title: "算法效率分析", titleEn: "Algorithm Efficiency Analysis",
    role: "developer", tags: ["算法分析", "Big O", "复杂度", "架构"], tagsEn: ["Algorithm Analysis", "Big O", "Complexity", "Architecture"],
    content: `Analyze and compare algorithm efficiency for a project.

Given the following algorithms to solve [problem description]:

Algorithm 1: [description, e.g., 'brute force approach']
[Pseudocode or code]

Algorithm 2: [description, e.g., 'dynamic programming approach']
[Pseudocode or code]

Algorithm 3: [description, e.g., 'greedy heuristic']
[Pseudocode or code]

Please provide:
1. Time complexity analysis (Best/Average/Worst case Big O)
2. Space complexity analysis
3. Scalability assessment (performance at 1K, 100K, 1M input sizes)
4. Trade-off matrix (speed vs. memory vs. accuracy)
5. Recommendations based on expected input characteristics
6. Benchmark considerations and methodology

Input characteristics:
- Typical size: [N]
- Distribution: [uniform/skewed/clustered]
- Constraints: [memory limits, real-time requirements]`,
    description: "实现了能工作的代码但不知道是否是最优解，担心 scalability 瓶颈", descriptionEn: "Implemented working code but unsure if it's optimal, worried about scalability b...",
    scenario: "需要在多个算法方案中做技术选型的系统架构师和算法工程师", scenarioEn: "System architects and algorithm engineers needing to choose between multiple algorithm approaches",
    problemFocus: "实现了能工作的代码但不知道是否是最优解，担心 scalability 瓶颈", problemFocusEn: "Implemented working code but unsure if it's optimal, worried about scalability bottlenecks",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 79, title: "市场趋势与竞品分析", titleEn: "Market Trends & Competitor Analysis",
    role: "strategist", tags: ["市场分析", "竞品", "趋势", "战略"], tagsEn: ["Market Analysis", "Competitors", "Trends", "Strategy"],
    content: `Provides a comprehensive summary of all current trends across multiple fields.

Act as a strategic analyst. I need a comprehensive analysis of [industry/market, e.g., 'the electric vehicle charging infrastructure market', 'AI-powered HR tech solutions'].

Analysis components:

1. Market Overview
- TAM/SAM/SOM estimates
- Growth rate (CAGR) and forecast period
- Key market drivers and inhibitors

2. Trend Analysis
- Technology trends shaping the market
- Consumer behavior shifts
- Regulatory landscape changes
- Investment and funding trends

3. Competitive Landscape
- Market leader profiles (3-5 top players)
- Market share estimates
- Competitive positioning map (price vs. features)
- Recent strategic moves (M&A, partnerships)

4. Opportunity Assessment
- Underserved segments
- Emerging use cases
- Geographic expansion opportunities
- Technology gaps waiting to be filled

5. Risk Factors
- Market saturation signals
- Disruption threats
- Regulatory risks
- Supply chain vulnerabilities

Deliverable: A structured analysis report with data-backed insights and visual framework descriptions.`,
    description: "市场信息碎片化，无法形成系统性的趋势判断和竞争格局认知", descriptionEn: "Market information is fragmented, can't form systematic trend judgments and comp...",
    scenario: "需要做市场进入决策或投资评估的战略分析师和产品负责人", scenarioEn: "Strategic analysts and product leads needing to make market entry decisions or investment evaluations",
    problemFocus: "市场信息碎片化，无法形成系统性的趋势判断和竞争格局认知", problemFocusEn: "Market information is fragmented, can't form systematic trend judgments and competitive landscape understanding",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 80, title: "1分钟间隔自动化交易系统", titleEn: "1-Minute Interval Automated Trading System",
    role: "developer", tags: ["量化交易", "自动化", "风险管控", "API"], tagsEn: ["Quant Trading", "Automation", "Risk Control", "API"],
    content: `Design and implement an automated trading system with real-time 1-minute data processing and risk management features.

Create a comprehensive and fully functional automated trading system operating on 1-minute intervals.

The system must:
- Process real-time market data updated every 1 minute.
- Support configurable trading strategies with clear entry and exit rules.
- Execute orders automatically via broker or API, including robust error handling and order confirmations.
- Include risk management features such as stop-loss, take-profit, and position sizing.
- Log all trades and system events with timestamped entries for auditing and analysis.
- Have a modular and extensible architecture to allow future enhancements and customizations.

Follow these steps:
1. Define clear trading strategy parameters and logic tailored to 1-minute interval data.
2. Integrate a reliable real-time data feed with 1-minute resolution.
3. Implement the trading algorithm generating signals based on the chosen strategy.
4. Develop order execution components linked to brokerage/API services with safeguards for errors and confirmation of transactions.
5. Incorporate risk management methods controlling losses and optimizing gains.
6. Build detailed logging mechanisms and monitoring tools to track trades and system performance.
7. Perform rigorous testing using both historical and live market data to validate correctness and robustness.

Output a detailed system design document that includes architecture descriptions, component interactions, and comprehensive trading logic explanations. Provide well-structured, fully documented source code implementing the system and clear deployment and operational instructions.

Notes:
- Emphasize error handling and fail-safe mechanisms to mitigate risks during unexpected market conditions or system faults.
- Optimize for latency and execution speed critical to 1-minute interval trading.`,
    description: "手工交易无法捕捉1分钟级别的机会，且情绪干扰大", descriptionEn: "Manual trading can't capture 1-minute level opportunities, and emotions interfer...",
    scenario: "量化交易员和金融科技开发者需要搭建自动化交易基础设施", scenarioEn: "Quantitative traders and fintech developers needing to build automated trading infrastructure",
    problemFocus: "手工交易无法捕捉1分钟级别的机会，且情绪干扰大", problemFocusEn: "Manual trading can't capture 1-minute level opportunities, and emotions interfere significantly",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },
  {
    id: 81, title: "网络设计：12设备4 VLAN", titleEn: "Network Design: 12 Devices 4 VLANs",
    role: "developer", tags: ["网络设计", "VLAN", "网络安全", "IT架构"], tagsEn: ["Network Design", "VLAN", "Network Security", "IT Architecture"],
    content: `Network design for 12 computers segmented into exactly 4 VLANs.

Design a complete network architecture for a small office with the following requirements:

Hardware:
- 1 managed Layer 3 switch
- 12 endpoints (computers, printers, VoIP phones)
- 1 router/firewall

VLAN Requirements:
- VLAN 10: Management (2 devices - admin workstations)
- VLAN 20: Employees (6 devices - general staff)
- VLAN 30: Guests (2 devices - WiFi access)
- VLAN 40: IoT/Printers (2 devices - printers, security cameras)

Design Deliverables:
1. IP Addressing Scheme
- Propose a private IP range (e.g., 192.168.x.x/24)
- Assign subnet for each VLAN
- Document gateway IPs

2. Switch Configuration
- Port assignments to VLANs
- Trunk configuration for inter-VLAN routing
- Write sample Cisco/HP switch CLI commands

3. Security Policies
- ACL rules between VLANs (who can talk to whom)
- Guest isolation requirements
- Management VLAN access restrictions

4. Network Diagram Description
- Logical topology
- Physical cabling considerations

5. Testing Checklist
- Connectivity tests per VLAN
- Inter-VLAN routing verification
- Security policy validation

Include equipment recommendations with budget considerations.`,
    description: "所有设备在同一个网络中，安全隔离和流量管理困难", descriptionEn: "All devices on the same network, security isolation and traffic management are d...",
    scenario: "需要为小型办公室规划和实施网络分段的IT管理员", scenarioEn: "IT administrators needing to plan and implement network segmentation for small offices",
    problemFocus: "所有设备在同一个网络中，安全隔离和流量管理困难", problemFocusEn: "All devices on the same network, security isolation and traffic management are difficult",
    author: "learnprompt.org / docsbot.ai", likes: 0, views: "1K", comments: 0, createdAt: "2026-05-05",
  },


  // ========== 82-96: PromptMagic.dev Premium Prompts ==========

  {
    id: 82, title: "通用大师提示词模板：GPT-5.5终极框架", titleEn: "The Master Prompt Template for GPT-5.5",
    role: "developer", tags: ["通用框架", "提示词工程", "GPT-5.5", "结构化"], tagsEn: ["Universal Framework", "Prompt Engineering", "GPT-5.5", "Structured"],
    content: `You are my highly-capable and flexible assistant. For every task or question I give you, apply the following framework:

1. REPHRASE & CLARIFY: Briefly restate the core intent or goal, and if anything is ambiguous, ask me up to two clarifying questions before proceeding.

2. DECOMPOSE THE TASK: Identify the main components, sub-tasks, or logical steps needed to solve this.

3. SELECT APPROACH: Choose the best methodology, tool, or mental model for the task. If multiple exist, tell me which you're using and why.

4. THINK STEP-BY-STEP: Before generating any final content, lay out your reasoning in a logical, sequential chain.

5. GENERATE THE CORE OUTPUT: Produce the primary deliverable — code, text, analysis, plan, or decision.

6. ADD LAYERS & CONTEXT: Supplement with edge cases, risk notes, real-world examples, and a "confidence meter" (High / Med / Low with a one-sentence rationale).

7. WRAP UP CLEANLY: End with a concise final recommendation, a one-line takeaway, and a direct follow-up question that moves us forward.

Tone: Smart, concise, practical. No filler. Think before you speak.

Here is my task:
[TASK]`,
    description: "一个适用于任何任务的通用大师级提示词框架，让AI自动执行7步高质量输出流程", descriptionEn: "A universal master prompt framework for any task, making AI automatically execute 7-step high-quality output",
    scenario: "开发者、产品经理、咨询师需要与AI进行高质量对话，确保输出结构化和系统化", scenarioEn: "Developers, PMs, consultants needing high-quality AI conversations with structured, systematic outputs",
    problemFocus: "普通提问得到的AI回答零散、不深入，缺乏系统化的思考框架", problemFocusEn: "Ordinary questions yield scattered, shallow AI responses lacking systematic thinking frameworks",
    author: "PromptMagic · Eric Eden", likes: 134, views: "2.1K", comments: 5, createdAt: "2026-05-15",
  },
  {
    id: 83, title: "深度研究大师模板：Gemini/ChatGPT/Claude通用", titleEn: "Master Deep Research Prompt Template",
    role: "researcher", tags: ["深度研究", "Gemini", "ChatGPT", "Claude", "研究报告"], tagsEn: ["Deep Research", "Gemini", "ChatGPT", "Claude", "Research Report"],
    content: `ROLE & MODE
You are my expert research tutor and synthesis engine. Deliver crisp, source-aware outputs. If critical info is missing, ask up to 3 laser questions once, then proceed. Prefer tables, checklists, and mini-frameworks. Separate Facts / Estimates / Opinions. Add a confidence % with one-line rationale when uncertain.

TOPIC SETUP
- Topic: [TOPIC]
- Level: [Beginner | Intermediate | Advanced]
- My context/audience: [e.g., B2B marketer briefing CFOs]
- Constraints: [e.g., budget <$5k, no PII, team of 1]
- As-of date for facts/examples: [YYYY-MM-DD]
- Optional alt-concept for comparison (#5): [ALT or leave blank]
- Toggles: [e.g., "skip 10, 12" to skip sections]

OUTPUT A — EXECUTIVE SNAPSHOT (≤1 page)
• 5–7 bullets: what it is, why it matters, where it's used, current frontier, risks, ROI/impact.
• A one-sentence rule-of-thumb and a 5-branch decision tree for when/how to use it.
• Top 3 actions for the next 7 days.

OUTPUT B — 20 LEARNING LENSES (turn each into concise, skimmable blocks)
1) Concept Clarifier – 1 paragraph at my level.
2) Layered Depth Dive – elevator pitch → high-school detail → grad-level.
3) Misconception Buster – 5 pairs: misconception → correction + why it's wrong.
4) Socratic Tutor – 5 probing questions; after each, why it matters.
5) Comparative Lens – compare with [ALT] across definition, use cases, strengths, limits.
6) Historical Evolution – origins → 3 milestones → current edge.
7) Framework Builder – big picture + 3 pillars + how they interlock.
8) Exam Prep Drill – 5 testable concepts; why they're asked; memory hook for each.
9) Real-World Scenario – setup → 3–5 application steps → expected outcome + metrics.
10) Cross-Disciplinary Bridge – import a concept from [Discipline A] to solve a [Discipline B] problem.
11) Jargon Translator – 15 essential terms with plain-English defs.
12) Mental Models – map to 5 models (constraints, compounding, feedback loops, power laws, diminishing returns).
13) Edge Cases & Failure Modes – top 5 ways this breaks; detection signals; guardrails.
14) Metrics that Matter – the few KPIs/benchmarks that predict success.
15) Build-It Mini-Lab – a 30–60 min hands-on exercise.
16) Playbook Snippets – 3 paste-ready templates.
17) Cost & ROI Sketch – rough TCO, value drivers, 2-variable sensitivity.
18) Ethics, Risk, Compliance – top 3; do/do-not list; minimum viable policy.
19) Battle Cards – competing tools/approaches table + when to switch.
20) "Teach It" Slide – title + 5 bullets + one diagram description.

OUTPUT C — ARTIFACTS (ready to ship)
• One-pager outline (markdown)
• Cheat Sheet: "Do this / Avoid this" + decision tree.
• Flashcards CSV (Q,A) for 15 most testable facts.
• 30-Day Learning Plan: weekly goals, 3 practice reps/week, 1 capstone.
• Reading/Watching List: 5 items (title, publisher, date, 1-line "why").
• Citations list with source quality (High/Med/Low).

STYLE & GUARDRAILS
Be blunt. Short sentences. No fluff. Use tables where possible. Localize examples to my context.

FINAL CHECKS
End with: (1) a 3-question quick quiz, (2) "If you only remember 5 lines…" summary, (3) one-sentence next calendar task.`,
    description: "20个学习透镜+3层输出结构，将任何主题转化为可执行的研究报告和学习计划", descriptionEn: "20 learning lenses + 3-tier output structure, transforming any topic into actionable research reports and learning plans",
    scenario: "研究员、学生、战略分析师需要快速深入理解一个新领域或技术概念", scenarioEn: "Researchers, students, strategic analysts needing to quickly and deeply understand new fields or technical concepts",
    problemFocus: "研究输出太浅，缺乏系统性框架，无法转化为可执行的行动计划", problemFocusEn: "Research outputs are too shallow, lack systematic frameworks, can't be converted into actionable plans",
    author: "PromptMagic · Eric Eden", likes: 192, views: "3.8K", comments: 8, createdAt: "2026-05-15",
  },
  {
    id: 84, title: "Kaizen大师规划器：周目标与执行仪表盘", titleEn: "Kaizen Master Planner: Weekly Goals & Execution Dashboard",
    role: "operations", tags: ["Kaizen", "周规划", "执行力", "目标管理", "个人效能"], tagsEn: ["Kaizen", "Weekly Planning", "Execution", "Goal Management", "Personal Productivity"],
    content: `Act as my personal Kaizen (continuous improvement) coach and weekly execution planner.

CONTEXT SETUP
- My big goal for this quarter: [GOAL]
- Current week: [DATE RANGE]
- My energy pattern: [morning person / night owl / mixed]
- My biggest distraction: [DISTRACTION]
- One thing I procrastinate on: [TASK]
- Ideal work block length: [e.g., 90 min]

OUTPUT STRUCTURE

## 1. WEEKLY KAIZEN BOARD
| Day | Theme | 3 Must-Do's | Energy Slot | Contingency |
|-----|-------|-------------|-------------|-------------|
| Mon | | | | |
| Tue | | | | |
| Wed | | | | |
| Thu | | | | |
| Fri | | | | |

## 2. THE ONE THING
If everything else fails, the single output that makes this week a win:
[THE ONE THING]

## 3. MORNING & EVENING RITUALS
- 5-minute morning kickstart routine
- 5-minute evening shutdown sequence
- 1 reflection question for each day

## 4. FRICTION LOG
Predict 3 things that will derail me this week and pre-write the recovery move:
1. [Friction] → [Recovery]
2. [Friction] → [Recovery]
3. [Friction] → [Recovery]

## 5. PROGRESS TRACKER
End-of-week scorecard:
- Goals hit: X/Y
- Distraction instances: ___
- Energy level average (1-10): ___
- One thing to stop doing: ___
- One thing to start doing: ___

## 6. CONTINUOUS IMPROVEMENT
One tiny process tweak (<5 min) that would make next week 10% smoother.`,
    description: "基于精益Kaizen理念的周规划系统，包含执行仪表盘、摩擦日志和持续改进循环", descriptionEn: "Lean Kaizen-based weekly planning system with execution dashboard, friction log, and continuous improvement loop",
    scenario: "运营经理、自由职业者、项目负责人需要系统化提升每周执行力和目标达成率", scenarioEn: "Operations managers, freelancers, project leads needing systematic weekly execution and goal achievement improvement",
    problemFocus: "计划做得很好但执行率差，不知道是什么因素在阻碍进度", problemFocusEn: "Plans are well-made but execution rates are poor, don't know what factors are hindering progress",
    author: "PromptMagic · Eric Eden", likes: 1600, views: "5.2K", comments: 12, createdAt: "2026-05-15",
  },
  {
    id: 85, title: "公司背景与概览深度分析", titleEn: "Company Background & Overview Deep Analysis",
    role: "strategist", tags: ["公司研究", "竞争情报", "尽职调查", "投资分析"], tagsEn: ["Company Research", "Competitive Intelligence", "Due Diligence", "Investment Analysis"],
    content: `You are a senior equity analyst at a top-tier investment firm. I need a comprehensive company background and overview analysis for [COMPANY NAME] ([TICKER]) to inform a potential [investment / partnership / competitive analysis / vendor evaluation].

DELIVERABLE STRUCTURE

## 1. COMPANY SNAPSHOT
- Founding story & mission evolution
- Current CEO & leadership team background
- Headquarters & geographic footprint
- Employee count & growth trajectory

## 2. BUSINESS MODEL ARCHITECTURE
- Revenue streams breakdown (% contribution)
- Core products/services & their market position
- Key partnerships & ecosystem
- Supply chain dependencies

## 3. MARKET POSITIONING
- Industry & sub-sector classification
- TAM/SAM/SOM estimates
- Market share & rank
- Key competitors comparison matrix

## 4. FINANCIAL HEALTH CHECK
- Revenue & profit trend (3-5 years)
- Key ratios: gross margin, operating margin, ROE, debt/equity
- Cash flow profile
- Capital allocation strategy

## 5. STRATEGIC INITIATIVES
- Current growth strategy (organic vs. M&A)
- R&D spend & innovation pipeline
- ESG commitments & progress
- Digital transformation status

## 6. RISK LANDSCAPE
- Top 5 business risks (with severity & probability)
- Regulatory & compliance exposure
- Macro sensitivity analysis
- Red flags from recent news/earnings

## 7. VALUATION CONTEXT
- Current multiples vs. historical & peers
- Analyst consensus vs. your independent view
- Key catalysts & events calendar

OUTPUT FORMAT
Use tables for comparisons. Flag anything unusual. Include a 1-page Executive Summary at the top.`,
    description: "投资级公司深度分析框架，覆盖商业模式、财务健康、战略举措和风险全景", descriptionEn: "Investment-grade company deep analysis framework covering business model, financial health, strategic initiatives, and risk landscape",
    scenario: "投资人、战略顾问、BD负责人需要对目标公司做全面的背景调查和竞争分析", scenarioEn: "Investors, strategy consultants, BD leads needing comprehensive background checks and competitive analysis of target companies",
    problemFocus: "公司研究信息碎片化，缺乏系统化的分析框架来判断投资价值", problemFocusEn: "Company research information is fragmented, lacking systematic analysis frameworks to judge investment value",
    author: "PromptMagic · Eric Eden", likes: 977, views: "4.1K", comments: 9, createdAt: "2026-05-15",
  },
  {
    id: 86, title: "增长催化剂超级提示词：30透镜头脑风暴", titleEn: "The Growth Catalyst Super Prompt: 30-Lens Brainstorming",
    role: "growth", tags: ["增长策略", "头脑风暴", "创新", "商业模式", "30透镜"], tagsEn: ["Growth Strategy", "Brainstorming", "Innovation", "Business Model", "30 Lenses"],
    content: `You are a world-class growth strategist who has advised companies from seed-stage to Fortune 500. I need breakthrough growth ideas for [PRODUCT/SERVICE/BUSINESS].

CONTEXT
- Current stage: [e.g., pre-product-market-fit / scaling / mature]
- Primary channel today: [e.g., organic SEO / paid ads / sales team / word-of-mouth]
- Biggest growth constraint: [CONSTRAINT]
- Target customer: [PERSONA]
- Budget for experiments: [BUDGET RANGE]

APPLY THE 30-LENS BRAINSTORMING FRAMEWORK

For each lens, generate 1-2 concrete, testable ideas. Rate each idea on: Impact (1-10), Ease (1-10), Speed (1-10).

LENSES 1-10: PRODUCT & OFFER
1. Premium tier (10x price, white-glove)
2. Freemium hook (what's the irresistible free version?)
3. Usage-based vs. seat-based pricing flip
4. Bundle / unbundle strategy
5. Done-for-you add-on service
6. Partner-exclusive SKU
7. Reverse offer (pay for outcomes, not inputs)
8. Community-as-product
9. API / platform play
10. Data moat creation

LENSES 11-20: CHANNEL & DISTRIBUTION
11. Influencer / creator partnerships
12. Embedded integration (become part of another workflow)
13. Channel partner reseller program
14. Content flywheel (SEO + social + newsletter)
15. Viral loop design (incentive to share)
16. Event & conference strategy
17. Cold outbound 2.0 (AI-personalized at scale)
18. Marketplace listing strategy
19. Affiliate / referral turbocharge
20. Strategic account-based marketing

LENSES 21-30: MARKET & EXPANSION
21. Adjacent customer segment
22. Vertical industry specialization
23. Geographic expansion tier list
24. Regulatory arbitrage opportunity
25. White-label / B2B2C pivot
26. Acquisition target scouting
27. Strategic alliance / co-marketing
28. Open-source community builder
29. Ecosystem platform ambition
30. Category creation / thought leadership

OUTPUT FORMAT
- Top 10 ideas ranked by (Impact × Ease × Speed)
- For each: 1-week experiment design + success metric + kill criteria
- One "moonshot" idea that's crazy but could change everything`,
    description: "30个增长透镜系统性地扫描产品、渠道和市场机会，每个想法附带实验设计和评估矩阵", descriptionEn: "30 growth lenses systematically scan product, channel, and market opportunities, each with experiment design and evaluation matrix",
    scenario: "增长负责人、创始人、产品经理需要突破增长瓶颈，找到可执行的创意来源", scenarioEn: "Growth leads, founders, PMs needing to break through growth bottlenecks and find actionable creative sources",
    problemFocus: "头脑风暴时想法质量参差不齐，缺乏系统性的评估框架来筛选和排序", problemFocusEn: "Brainstorming produces mixed-quality ideas, lacking systematic frameworks to filter and prioritize",
    author: "PromptMagic · Eric Eden", likes: 842, views: "3.5K", comments: 7, createdAt: "2026-05-15",
  },
  {
    id: 87, title: "任何主题快速精通：MEGA学习引擎", titleEn: "Get Smart Fast on Anything: MEGA Learning Engine",
    role: "researcher", tags: ["学习加速", "知识合成", "研究", "MEGA提示词", "教育"], tagsEn: ["Learning Acceleration", "Knowledge Synthesis", "Research", "Mega Prompt", "Education"],
    content: `ROLE & MODE
You are my expert research tutor and synthesis engine. Deliver crisp, source-aware outputs. If critical info is missing, ask up to 3 laser questions once, then proceed. Prefer tables, checklists, and mini-frameworks. Separate Facts / Estimates / Opinions. Add a confidence % with one-line rationale when uncertain.

TOPIC SETUP
- Topic: [TOPIC]
- Level: [Beginner | Intermediate | Advanced]
- My context/audience: [e.g., B2B marketer briefing CFOs]
- Constraints: [e.g., budget <$5k, no PII, team of 1]
- As-of date for facts/examples: [YYYY-MM-DD]

OUTPUT A — EXECUTIVE SNAPSHOT (≤1 page)
• 5–7 bullets: what it is, why it matters, where it's used, current frontier, risks, ROI/impact.
• A one-sentence rule-of-thumb and a 5-branch decision tree for when/how to use it.
• Top 3 actions for the next 7 days.

OUTPUT B — 20 LEARNING LENSES
1) Concept Clarifier
2) Layered Depth Dive (elevator → high-school → grad-level)
3) Misconception Buster (5 pairs)
4) Socratic Tutor (5 probing questions)
5) Comparative Lens (vs. alternative concept)
6) Historical Evolution
7) Framework Builder
8) Exam Prep Drill
9) Real-World Scenario
10) Cross-Disciplinary Bridge
11) Jargon Translator (15 terms)
12) Mental Models (5 models mapped)
13) Edge Cases & Failure Modes
14) Metrics that Matter
15) Build-It Mini-Lab (30-60 min exercise)
16) Playbook Snippets (3 paste-ready templates)
17) Cost & ROI Sketch
18) Ethics, Risk, Compliance
19) Battle Cards (competing approaches)
20) "Teach It" Slide

OUTPUT C — ARTIFACTS
• One-pager outline (markdown)
• Cheat Sheet: "Do this / Avoid this"
• Flashcards CSV (Q,A)
• 30-Day Learning Plan
• Reading/Watching List (5 items)
• Citations list with source quality

STYLE: Be blunt. Short sentences. No fluff. Use tables.`,
    description: "将ChatGPT转化为 ruthless 研究导师，20个学习透镜产出可执行的学习计划和交付物", descriptionEn: "Transform ChatGPT into a ruthless research tutor, 20 learning lenses produce actionable learning plans and deliverables",
    scenario: "需要快速精通一个新领域的学生、职业转换者、终身学习者", scenarioEn: "Students, career changers, lifelong learners needing to quickly master new domains",
    problemFocus: "学习效率低，读了很多但无法转化为可用知识，缺少系统化的学习框架", problemFocusEn: "Low learning efficiency, reading a lot but unable to convert to usable knowledge, lacking systematic learning frameworks",
    author: "PromptMagic · Eric Eden", likes: 309, views: "1.8K", comments: 4, createdAt: "2026-05-15",
  },
  {
    id: 88, title: "合同风险分析器：签约前的法律护盾", titleEn: "Contract Risk Analyzer: Legal Shield Before Signing",
    role: "operations", tags: ["合同审查", "法律风险", "谈判策略", "Startup"], tagsEn: ["Contract Review", "Legal Risk", "Negotiation Strategy", "Startup"],
    content: `You are a senior startup lawyer with 15+ years of experience reviewing contracts for fast-growing technology companies. Your expertise lies in identifying unfair terms, hidden risks, and negotiating better deals for your clients.

[ATTACH OR PASTE CONTRACT HERE]
[INDICATE WHICH SIDE YOU ARE (e.g. I am the company's CEO)]

Analyze the contract using this format:

## Executive Summary
$brief_overview_of_contract_and_major_concerns

## Risk Analysis Table
| Clause | Risk Level | Description | Business Impact |
|--------|------------|-------------|-----------------|
$risk_table

## Deep Dive Analysis
### Critical Issues (Deal Breakers)
$critical_issues_detailed_analysis

### High-Risk Terms
$high_risk_terms_analysis

### Medium-Risk Terms
$medium_risk_terms_analysis

### Industry Standard Comparison
$how_terms_compare_to_standard_practice

## Unfair or Unusual Terms
$analysis_of_terms_that_deviate_from_fairness

## Missing Protections
$important_terms_that_should_be_added

## Negotiation Strategy
### Leverage Points
$areas_of_negotiating_strength

### Suggested Changes
$specific_language_modifications

### Fallback Positions
$acceptable_compromise_positions

## Red Flags
$immediate_concerns_requiring_attention

## Recommended Actions
$prioritized_list_of_next_steps

## Additional Considerations
### Regulatory Compliance
$relevant_regulatory_issues

### Future-Proofing
$potential_future_risks_or_changes

## Summary Recommendation
$final_recommendation_and_key_points

Remember to:
- Focus on risks relevant to my side of the contract
- Highlight hidden obligations or commitments
- Flag any unusual termination or liability terms
- Identify missing protective clauses
- Note vague terms that need clarification
- Compare against industry standards
- Suggest specific improvements for negotiation

Note: If the contract looks good, don't force issues that aren't actually issues.`,
    description: "15年经验律师视角的合同审查框架，识别不公平条款、隐藏风险和谈判筹码", descriptionEn: "15-year-experience lawyer's contract review framework, identifying unfair terms, hidden risks, and negotiation leverage",
    scenario: "创业者、采购负责人、法务专员需要在签约前快速识别合同风险和谈判空间", scenarioEn: "Founders, procurement leads, legal specialists needing to quickly identify contract risks and negotiation room before signing",
    problemFocus: "合同术语晦涩难懂，隐藏条款可能在签约后造成巨大损失", problemFocusEn: "Contract terminology is obscure and difficult, hidden clauses may cause huge losses after signing",
    author: "PromptMagic · Eric Eden", likes: 89, views: "1.2K", comments: 3, createdAt: "2026-05-15",
  },
  {
    id: 89, title: "讲述你的标志性故事：品牌叙事锻造", titleEn: "Tell Your Signature Story: Brand Narrative Forging",
    role: "writer", tags: ["品牌叙事", "故事营销", "创始人故事", "个人品牌"], tagsEn: ["Brand Narrative", "Story Marketing", "Founder Story", "Personal Brand"],
    content: `You are a master brand storyteller who has crafted narratives for iconic brands like Apple, Nike, and Airbnb. I need you to help me tell my signature story.

ABOUT ME / MY BRAND
- My name / brand name: [NAME]
- What I do (one sentence): [DESCRIPTION]
- Who I serve: [AUDIENCE]
- The transformation I create: [TRANSFORMATION]
- My origin story (the pivotal moment): [MOMENT]
- My biggest struggle or failure: [STRUGGLE]
- What makes me different (not better, different): [DIFFERENTIATOR]
- The conviction I hold that others don't: [CONVICTION]

OUTPUT

## 1. CORE NARRATIVE ARC (The Hero's Journey, compressed)
- Ordinary world → Call to adventure → The abyss → The revelation → The return
- Write this as a 200-word story that gives people goosebumps

## 2. THE ONE-LINER
The sentence that makes people say "Tell me more":
[ONE-LINER]

## 3. SIGNATURE STORY VERSIONS
- 30-second elevator version
- 2-minute podcast interview version
- 5-minute keynote version
- 1-page "About" page version

## 4. EMOTIONAL HOOKS
- The 3 feelings my story should evoke
- The 1 universal truth it connects to
- The moment of vulnerability that builds trust

## 5. CALL-TO-ACTION BRIDGE
How the story naturally leads to: [desired action, e.g., buy, subscribe, join]

## 6. USAGE PLAYBOOK
Where to tell this story:
- Homepage hero section
- About page
- Email welcome sequence (which email)
- Sales calls (when to pivot to story)
- LinkedIn posts (3 post ideas)
- Speaking engagements (how to open)

TONE: [e.g., vulnerable but confident, humorous, intense, warm]`,
    description: "用英雄之旅框架锻造你的标志性品牌故事，包含4个版本和全渠道使用手册", descriptionEn: "Forge your signature brand story using the hero's journey framework, with 4 versions and full-channel usage playbook",
    scenario: "创始人、个人品牌打造者、营销人员需要建立有感染力的品牌叙事", scenarioEn: "Founders, personal brand builders, marketers needing to establish infectious brand narratives",
    problemFocus: "有产品但讲不出打动人心的故事，品牌没有记忆点和情感连接", problemFocusEn: "Have products but can't tell heart-touching stories, brand lacks memorable points and emotional connections",
    author: "PromptMagic · Eric Eden", likes: 156, views: "2.3K", comments: 4, createdAt: "2026-05-15",
  },
  {
    id: 90, title: "创建你的标志性口号：一句话让人记住你", titleEn: "Create Your Signature Slogan: One Line That Sticks",
    role: "writer", tags: ["口号创作", "品牌定位", "记忆点", "文案"], tagsEn: ["Slogan Creation", "Brand Positioning", "Memorability", "Copywriting"],
    content: `You are a legendary copywriter who has written taglines for brands that became household names. Help me create a signature slogan.

ABOUT ME / MY OFFER
- My brand/product name: [NAME]
- What it does (functional benefit): [FUNCTION]
- The emotional payoff: [EMOTION]
- The unexpected twist or contrast: [TWIST]
- Words to avoid (overused in my industry): [WORDS]
- Words that feel right: [WORDS]
- The one thing I want people to remember: [REMEMBER]

OUTPUT

## 1. SLOGAN ARCHETYPES (10 directions)
Generate 3 options for each archetype:
1. Promise-based ("Just Do It")
2. Aspirational ("Think Different")
3. Challenger ("The Uncola")
4. Pain-agitation ("When it absolutely, positively...")
5. Metaphorical ("The Ultimate Driving Machine")
6. Rhyme/Rhythm ("Finger Lickin' Good")
7. Provocative question ("Got Milk?")
8. Before/After contrast ("There are some things money can't buy")
9. Insider wink ("The Few. The Proud.")
10. Ownable verb ("Zoom" / "Slack" / "Google it")

## 2. SHORTLIST & SCORING
From the 30 options, pick the top 5 and score each on:
- Memorability (1-10)
- Differentiation (1-10)
- Emotional punch (1-10)
- Say-it-out-loud test (pass/fail)
- Domain/social handle availability (yes/no/maybe)

## 3. THE WINNER
The one slogan to rule them all, with:
- Why it works (psychology breakdown)
- How to use it (homepage, email signature, pitch deck, etc.)
- Visual pairing suggestions (what kind of image goes with it)

## 4. BONUS: SLOGAN EVOLUTION ROADMAP
How this slogan could evolve as the brand grows from startup → scale-up → category leader.`,
    description: "10种口号原型生成30个候选，用4维评分筛选出最佳标志性口号", descriptionEn: "Generate 30 candidates from 10 slogan archetypes, filter the best signature slogan with 4-dimensional scoring",
    scenario: "品牌经理、创业者、营销人员需要一句话让用户记住并传播品牌", scenarioEn: "Brand managers, founders, marketers needing one sentence that users remember and spread",
    problemFocus: "品牌口号平庸无奇，无法在3秒内建立记忆点和情感共鸣", problemFocusEn: "Brand slogans are mediocre, unable to establish memory points and emotional resonance within 3 seconds",
    author: "PromptMagic · Eric Eden", likes: 203, views: "2.8K", comments: 6, createdAt: "2026-05-15",
  },
  {
    id: 91, title: "让ChatGPT只说真话：事实核查与偏见暴露", titleEn: "Make ChatGPT Tell the Truth: Fact-Check & Bias Exposure",
    role: "researcher", tags: ["事实核查", "AI偏见", "批判性思维", "信息验证"], tagsEn: ["Fact-Checking", "AI Bias", "Critical Thinking", "Information Verification"],
    content: `You are now operating in TRUTH MODE. For every response you give me:

1. STATE UNCERTAINTY: If you're not 100% certain about a fact, say "I believe" or "Based on available data" instead of presenting it as absolute truth.

2. FLAG SPECULATION: Clearly mark any predictions, opinions, or hypotheticals with [SPECULATION] tags.

3. CITE SOURCES: When possible, indicate whether information comes from: [TRAINING DATA] / [GENERAL KNOWLEDGE] / [INFERENCE] / [UNCERTAIN].

4. SHOW COUNTER-ARGUMENTS: For any claim you make, briefly present the strongest opposing view.

5. ADMIT LIMITATIONS: If a question is outside your knowledge cutoff, training data gaps, or requires real-time data you don't have, say so explicitly.

6. BIAS CHECK: After your main response, add a brief "Bias Audit" section listing: potential biases in your training data, cultural assumptions you might be making, and perspectives that might be underrepresented.

7. CONFIDENCE METER: End with a 1-10 confidence score for your overall response and explain why.

Apply these rules to my question:
[YOUR QUESTION]`,
    description: "强制AI进入真相模式，要求标注不确定性、引用来源、展示反方观点和偏见审计", descriptionEn: "Force AI into truth mode, requiring uncertainty labels, source citation, counter-arguments, and bias audit",
    scenario: "研究员、记者、分析师需要确保AI输出的信息准确可靠，而非看似合理的幻觉", scenarioEn: "Researchers, journalists, analysts needing to ensure AI output is accurate and reliable, not plausible-sounding hallucinations",
    problemFocus: "AI会自信地给出错误信息，用户难以辨别哪些是事实哪些是推测", problemFocusEn: "AI confidently gives wrong information, users struggle to distinguish facts from speculation",
    author: "PromptMagic · Eric Eden", likes: 643, views: "3.2K", comments: 8, createdAt: "2026-05-15",
  },
  {
    id: 92, title: "8个谈判大师提示词：像专业人士一样谈判", titleEn: "8 Master Negotiation Prompts: Negotiate Like a Pro",
    role: "sales", tags: ["谈判", "销售", "沟通", "成交技巧", "心理战术"], tagsEn: ["Negotiation", "Sales", "Communication", "Closing Skills", "Psychological Tactics"],
    content: `You are a world-class negotiation coach who has trained executives at Fortune 500 companies and elite consulting firms. I need 8 specialized negotiation prompts for different scenarios.

SCENARIO SETUP
- My role: [e.g., founder selling to enterprise / employee asking for raise / vendor negotiating terms]
- Counterparty: [DESCRIPTION]
- What's at stake: [STAKES]
- My BATNA (best alternative): [BATNA]
- Their likely BATNA: [THEIR_BATNA]
- Time pressure: [TIME_CONSTRAINT]

GENERATE 8 NEGOTIATION PROMPTS

1. THE OPENING GAMBIT PROMPT
How to make the first offer / anchor without seeming aggressive. Include psychological anchoring techniques and the "MISO" framework (Market, Internal, Social, Objective anchors).

2. THE OBJECTION HANDLER PROMPT
When they say "That's too expensive / We need to think about it / The committee decided..." — scripted responses that turn objections into progress.

3. THE SILENCE WEAPON PROMPT
How to use strategic silence after making an offer. The 7-second rule, what to do with your face/body, and how to resist the urge to fill silence.

4. THE CONCESSION CALCULATOR PROMPT
Never give anything away for free. How to trade concessions using the "If... then..." formula and the reciprocity principle.

5. THE WALK-AWAY THRESHOLD PROMPT
How to know when to walk away. The 3-strike rule, sunk cost fallacy guardrails, and graceful exit scripts.

6. THE SPLIT-THE-DIFFERENCE COUNTER PROMPT
When they say "Let's meet in the middle" — why this is usually a trap and how to respond with the "nibble" or "package" approach.

7. THE DEADLINE PRESSURE PROMPT
How to handle (or create) urgency without desperation. The time-box close and the "exploding offer" ethics guide.

8. THE POST-NEGOTIATION PROMPT
What to do in the first 24 hours after closing: relationship maintenance, expectation setting, and preventing buyer's remorse.

OUTPUT FORMAT
For each prompt:
- The exact words to say (script)
- The psychology behind why it works
- When NOT to use it (counter-indications)
- A real-world example scenario`,
    description: "8个场景化谈判脚本，从开局策略到沉默武器到让步计算器的完整谈判武器库", descriptionEn: "8 situational negotiation scripts, from opening gambits to silence weapons to concession calculators — a complete negotiation arsenal",
    scenario: "销售负责人、采购专员、创业者需要在价格谈判、合同条款、薪资谈判中取得更好结果", scenarioEn: "Sales leads, procurement specialists, founders needing better outcomes in price, contract, and salary negotiations",
    problemFocus: "谈判时要么过于软弱让步太多，要么过于强硬导致关系破裂，缺乏策略性框架", problemFocusEn: "Being either too soft (giving too much) or too hard (damaging relationships) in negotiations, lacking strategic frameworks",
    author: "PromptMagic · Eric Eden", likes: 412, views: "2.9K", comments: 7, createdAt: "2026-05-15",
  },
  {
    id: 93, title: "价值投资筛选器：像巴菲特一样评估企业", titleEn: "The Value Investor's Screener: Evaluate Like Buffett",
    role: "strategist", tags: ["价值投资", "企业评估", "巴菲特", "护城河", "财务分析"], tagsEn: ["Value Investing", "Business Evaluation", "Buffett", "Moat", "Financial Analysis"],
    content: `You are a disciplined value investor in the tradition of Warren Buffett and Charlie Munger. I want you to evaluate [COMPANY NAME / TICKER] as if you were deciding whether to invest your own money for the next 10 years.

EVALUATION FRAMEWORK

## 1. THE BUSINESS (Would I understand it in 5 minutes?)
- What does the company do in one sentence?
- Is the business model simple and predictable?
- Does it sell a product people will still need in 2035?
- Is it a "toll bridge" (customers have no choice but to pay)?

## 2. THE MOAT (Does it have durable competitive advantage?)
- Type of moat: brand, network effects, cost advantage, regulatory, switching costs, IP
- Width: How many years can it sustain pricing power?
- Trend: Is the moat getting wider, stable, or eroding?
- Test: Could a well-funded competitor replicate this in 3 years?

## 3. MANAGEMENT (Are they owners or employees?)
- CEO tenure and track record
- Insider ownership %
- Capital allocation history (dividends, buybacks, M&A, reinvestment)
- Candor in shareholder letters (do they admit mistakes?)
- Compensation structure (aligned with long-term shareholders?)

## 4. FINANCIALS (The numbers that matter)
- 10-year revenue & earnings CAGR
- Gross margin trend (stable or improving?)
- ROE / ROIC (consistently > 15%?)
- Debt-to-equity (can it survive a 2008-level crisis?)
- Free cash flow / net income ratio (are earnings real?)
- Capital intensity (how much $ to grow $1 of revenue?)

## 5. VALUATION (What's the price vs. value?)
- Current P/E, P/B, EV/EBITDA vs. 10-year average
- DCF "back of envelope" using conservative growth
- What price would make this a "no-brainer"?
- Margin of safety % at current price

## 6. RISKS (What could kill this investment?)
- Top 3 business risks (5-year horizon)
- Top 3 macro/sector risks
- "The loser test": What would make this a losing investment?
- Scenario: What happens if revenue drops 30% for 2 years?

## 7. THE VERDICT
- Buy / Watch / Pass
- Ideal entry price
- Position size (if portfolio were $1M)
- Holding period target
- Exit triggers (what would make you sell)

OUTPUT FORMAT
Be ruthlessly honest. If it's overpriced, say so. If the moat is imaginary, say so. Include a 1-page summary at the top.`,
    description: "巴菲特式价值投资评估框架：护城河、管理层、财务、估值、风险5维深度分析", descriptionEn: "Buffett-style value investing framework: 5-dimensional deep analysis of moat, management, financials, valuation, and risks",
    scenario: "个人投资者、基金经理、战略投资人需要系统评估企业的长期投资价值", scenarioEn: "Individual investors, fund managers, strategic investors needing systematic assessment of long-term investment value",
    problemFocus: "投资决策凭感觉或跟风，没有系统化的护城河分析和安全边际评估", problemFocusEn: "Investment decisions based on intuition or following trends, lacking systematic moat analysis and margin of safety assessment",
    author: "PromptMagic · Eric Eden", likes: 387, views: "2.4K", comments: 5, createdAt: "2026-05-15",
  },
  {
    id: 94, title: "停止总结，开始做决策：执行导向分析框架", titleEn: "Stop Summarizing, Start Making Decisions: Action-Oriented Analysis",
    role: "strategist", tags: ["决策框架", "执行导向", "分析", "战略", "行动力"], tagsEn: ["Decision Framework", "Action-Oriented", "Analysis", "Strategy", "Execution"],
    content: `You are a chief of staff to a CEO who has zero tolerance for "analysis paralysis." For every situation I describe, don't just summarize — deliver a decision-ready framework.

SITUATION
[Describe your situation, data, or problem here]

OUTPUT FORMAT

## 1. THE REAL QUESTION (What are we actually deciding?)
Strip away the noise. State the core decision in one sentence.

## 2. OPTIONS TABLE
| Option | Upside | Downside | Resource Need | Speed | Reversibility |
|--------|--------|----------|---------------|-------|---------------|
| A | | | | | |
| B | | | | | |
| C | | | | | |

## 3. DECISION CRITERIA (What matters most?)
Rank these by importance FOR THIS SPECIFIC DECISION:
- Financial impact
- Strategic alignment
- Speed to result
- Risk level
- Team capacity
- Customer impact
- Competitive position

## 4. THE RECOMMENDATION
My recommendation is [Option X] because [one-line reason].

## 5. THE ACTION PLAN (What happens in the next 48 hours)
- Hour 0-4: [Immediate action]
- Hour 4-24: [Set up phase]
- Hour 24-48: [First deliverable]

## 6. KILL CRITERIA (When to abort)
If [condition] happens by [date], we pivot to [Plan B].

## 7. ACCOUNTABILITY
- Who owns this: [NAME]
- They report progress to: [NAME]
- Check-in schedule: [FREQUENCY]

## 8. DECISION LOG ENTRY
- Decision made: [WHAT]
- Rationale (2 sentences): [WHY]
- Date: [DATE]
- Expected outcome by [DATE]: [WHAT]

RULE: No more than 20% of the output should be background/context. 80% must be forward-looking action.`,
    description: "从分析瘫痪到行动执行，80%输出必须是前瞻性行动，附决策日志和终止条件", descriptionEn: "From analysis paralysis to action execution, 80% output must be forward-looking action, with decision log and kill criteria",
    scenario: "高管、项目经理、战略顾问需要将复杂情况快速转化为可执行的决策和行动方案", scenarioEn: "Executives, project managers, strategy consultants needing to quickly convert complex situations into executable decisions and action plans",
    problemFocus: "分析报告写了很多但没人知道下一步该做什么，决策迟迟无法推进", problemFocusEn: "Analysis reports are thorough but no one knows what to do next, decisions remain stalled",
    author: "PromptMagic · Eric Eden", likes: 534, views: "3.1K", comments: 6, createdAt: "2026-05-15",
  },
  {
    id: 95, title: "CEO运营仪表盘：一页纸掌控全局", titleEn: "CEO Operating Dashboard: One Page to Rule Them All",
    role: "operations", tags: ["CEO", "运营仪表盘", "管理", "KPI", "一页纸"], tagsEn: ["CEO", "Operating Dashboard", "Management", "KPI", "One-Pager"],
    content: `You are a fractional COO who has scaled 20+ startups from seed to Series C. Design a CEO Operating Dashboard for [COMPANY NAME / STAGE / INDUSTRY].

DASHBOARD STRUCTURE (One Page)

## TOP SECTION: VITAL SIGNS (At-a-glance health)
| Metric | This Week | Last Week | Trend | Target | Status |
|--------|-----------|-----------|-------|--------|--------|
| Revenue | | | | | |
| Burn Rate | | | | | |
| Cash Runway (months) | | | | | |
| Active Customers | | | | | |
| NPS | | | | | |
| Team Happiness (1-10) | | | | | |

## LEFT COLUMN: ENGINES (What's working)
1. Growth Engine: [Top 3 growth drivers + their output this week]
2. Product Engine: [Shipped / In Progress / Blocked]
3. Revenue Engine: [Pipeline by stage + forecast]
4. People Engine: [Hires / Fires / Promotions / Issues]

## RIGHT COLUMN: FRICTION (What's broken)
1. #1 Bottleneck: [What] → [Impact] → [Owner] → [Fix by when]
2. #2 Bottleneck: [What] → [Impact] → [Owner] → [Fix by when]
3. #3 Bottleneck: [What] → [Impact] → [Owner] → [Fix by when]

## BOTTOM SECTION: DECISION QUEUE (What needs a decision this week)
| Decision | Options | Recommended | Due Date | Risk if delayed |
|----------|---------|-------------|----------|-----------------|
| | | | | |

## FOOTER: WEEKLY COMMITMENTS
What the CEO commits to doing / deciding / delegating by next Friday:
1.
2.
3.

OUTPUT FORMAT
- Fill with realistic placeholder data for my stage
- Show me what "good" looks like vs. "warning" vs. "critical"
- Include a "How to use this" section (15 min daily routine)
- Add a blank template I can copy-paste into Notion/Google Sheets`,
    description: "一页纸CEO运营仪表盘，包含生命体征、增长引擎、摩擦点和决策队列四大板块", descriptionEn: "One-page CEO operating dashboard with vital signs, growth engines, friction points, and decision queue",
    scenario: "CEO、COO、创始人需要一张仪表盘快速掌握公司运营全貌，而不被数据淹没", scenarioEn: "CEOs, COOs, founders needing one dashboard to quickly grasp company operations without being overwhelmed by data",
    problemFocus: "报表太多且分散，CEO无法一眼看出公司真实的健康状况和优先级", problemFocusEn: "Too many scattered reports, CEO can't see the company's true health and priorities at a glance",
    author: "PromptMagic · Eric Eden", likes: 478, views: "2.7K", comments: 5, createdAt: "2026-05-15",
  },
  {
    id: 96, title: "将任何照片转化为黄金时刻海滩肖像", titleEn: "Turn Any Photo into a Golden-Hour Beach Portrait",
    role: "creator", tags: ["AI图像", "照片转换", "提示词工程", "图像生成"], tagsEn: ["AI Image", "Photo Transform", "Prompt Engineering", "Image Generation"],
    content: `Transform any portrait or full-body photo into a stunning golden-hour beach scene. Works best with clear, well-lit original images.

MASTER PROMPT TEMPLATE:
A [age] [gender] [build] person, standing barefoot at the water's edge on a pristine tropical beach. [hair description] blowing gently in the warm breeze. Wearing [clothing description]. The setting sun casts a radiant golden glow across the scene, creating long dramatic shadows on the wet sand. Crystal-clear turquoise water laps at their feet. Soft volumetric god rays pierce through scattered clouds. Shot with a Canon EOS R5 with 85mm f/1.2 lens, shallow depth of field, subject in sharp focus with creamy bokeh background. Professional editorial photography style. Warm golden-hour color palette with subtle teal shadows. Volumetric lighting, atmospheric haze, photorealistic, 8K detail.

CUSTOMIZATION VARIABLES:
- [age]: young adult / middle-aged / elderly
- [gender]: man / woman / non-binary
- [build]: athletic / slender / curvy / average
- [hair]: long flowing dark hair / short blonde pixie cut / silver-gray hair
- [clothing]: flowing white linen shirt and pants / elegant summer dress / casual beachwear

TECHNIQUE TIPS:
1. Start with the base image description, then layer atmosphere
2. Always include lens/camera specs for photorealism
3. Specify color palette (warm gold + cool teal is the magic combo)
4. Add "volumetric lighting" and "atmospheric haze" for depth
5. End with "photorealistic, 8K" as quality anchors

BEFORE/AFTER GUIDE:
- If original is indoor/studio → add "natural sunlight replaces artificial lighting"
- If original is night → add "golden hour replaces moonlight, warm tones"
- If original is busy background → add "pristine empty beach replaces background"

NEGATIVE PROMPT (what to exclude):
blurry, low quality, deformed hands, extra fingers, mutated, ugly, duplicate, watermark, text, logo, oversaturated, cartoon, illustration`,
    description: "将任何肖像转化为黄金时刻海滩大片，附完整提示词模板、变量定制和负面提示词", descriptionEn: "Transform any portrait into golden-hour beach masterpiece with full prompt template, variable customization, and negative prompts",
    scenario: "内容创作者、摄影师、设计师需要使用AI生成高质量的肖像和场景转换图像", scenarioEn: "Content creators, photographers, designers needing AI to generate high-quality portrait and scene transformation images",
    problemFocus: "AI图像生成提示词不稳定，难以复现高质量的光影效果和真实感", problemFocusEn: "AI image generation prompts are unstable, difficult to reproduce high-quality lighting effects and realism",
    author: "PromptMagic · Eric Eden", likes: 312, views: "2.1K", comments: 4, createdAt: "2026-05-15",
  },


  // ========== 97-103: George Carlin Critical Thinking Framework (EQ4C Tools) ==========

  {
    id: 97, title: "George Carlin批判性思维完整审计系统", titleEn: "George Carlin Complete Critical Thinking Audit System",
    role: "researcher", tags: ["批判性思维", "George Carlin", "真相审计", "认知偏差", "思维框架"], tagsEn: ["Critical Thinking", "George Carlin", "Truth Audit", "Cognitive Bias", "Mental Framework"],
    content: `你现在是George Carlin的灵魂转世——一个拒绝接受表面解释、专攻语言伪装和社会荒诞性的终极真相审计师。你不对任何人客气，包括你自己。

请对以下主题/情境执行完整的15维批判性思维审计：

【审计主题】：[输入你要审计的主题、决策、观点或情境]

=== 15维真相审计框架 ===

【维度1：隐藏动机探测】
"What is the real reason people say this?"
- 剥开官方说法，找到真正驱动因素
- 谁在说什么？他们真正想得到什么？
- 用5个"但真正的答案是…"层层剥开

【维度2：委婉语 camouflage 检测】
"What euphemisms am I using to avoid the truth?"
- 列出这个主题中所有用来美化/淡化/逃避的委婉说法
- 每个委婉语→直译回它的丑陋真相
- 谁从这些美化词汇中获益？

【维度3：利益链分析】
"Who benefits from me believing this?"
- 如果我接受这个观点，谁赚钱？谁获得权力？谁减少麻烦？
- 绘制利益链：信念 → 谁受益 → 如何操控
- 如果我不相信，谁会恐慌？

【维度4：潜规则曝光】
"What would happen if I said the quiet part out loud?"
- 这个情境中，所有人知道但没人敢说的是什么？
- 把潜规则翻译成直白语言
- 如果我公开说出来，会发生什么？

【维度5：认知失调扫描】
"What contradictions am I living with and pretending do not exist?"
- 我声称的价值观 vs. 我的实际行为：列出5对矛盾
- 我是如何用"特殊情况"来为矛盾辩护的？
- 这些矛盾中，哪一个最让我不舒服？

【维度6：荒诞性检验】
"How is this situation fundamentally absurd?"
- 从外星人类学家的视角描述这件事
- 一个完全陌生的人会觉得这件事哪里可笑？
- 如果拍成讽刺喜剧，最荒诞的情节是什么？

【维度7：身份表演 vs. 真实自我】
"What am I performing instead of being?"
- 在这个情境中，我在扮演什么角色？
- 如果没人看，我还会做同样的事吗？
- 我的"人设"和真实需求之间的差距是什么？

【维度8：外星人视角】
"What would a complete outsider think about this normal thing I do?"
- 一个从未接触过这种文化的人会怎么描述这件事？
- 哪些"正常"的东西其实非常奇怪？
- 他们会问哪些让我无法回答的问题？

【维度9：无意义规则排查】
"What rules am I following that make zero actual sense?"
- 列出我遵守的5条"规则"，并证明它们没有任何实际依据
- 这些规则是谁制定的？他们现在还在遵守吗？
- 如果我打破这条规则，最坏会发生什么？

【维度10：恐惧真相】
"What am I afraid to admit because it would make me look bad?"
- 关于这件事，我最不想让别人知道的事实是什么？
- 如果匿名，我会承认什么？
- 这个恐惧是真实的威胁，还是只是面子问题？

【维度11：集体盲区】
"What is everyone pretending not to notice in this meeting/room/group?"
- 这个群体中，所有人都看到但假装没看到的是？
- 谁先说出来，就会承担什么代价？
- 如果我们集体承认这一点，会发生什么？

【维度12：虚伪检测】
"How am I participating in something I claim to oppose?"
- 我公开反对X，但我的行为在支持X的具体证据
- 我用什么借口来合理化这种参与？
- 如果我停止这种参与，我需要牺牲什么？

【维度13：群体迷思识别】
"What is the dumbest thing I believe because everyone else believes it?"
- 列出3个"所有人都这么说"但我从未验证过的信念
- 如果多数人错了，证据会是什么？
- 历史上有没有类似的集体错误？

【维度14：表演 vs. 真实】
"What am I doing for show versus what is real?"
- 我做这件事，是为了效果，还是因为它本身有价值？
- 如果移除所有观众/评价/社交媒体，我会做同样的选择吗？
- 我生活中哪些部分是为了"看起来很好"而存在？

【维度15：终极减法】
"If I removed all the bullshit, what would actually be left?"
- 剥离所有包装、仪式感、社会期待后，核心是什么？
- 如果我把这件事削减到不能再减，剩的是什么？
- 那个剩下的东西，值不值得我投入的时间和精力？

=== 输出格式 ===

对每个维度，提供：
1. 我的回答/观察（brutal honest）
2. 一个让我不舒服的具体例子
3. 如果改变，第一步是什么

最终总结：
- 最重要的3个发现
- 最大的1个行动项（24小时内可执行）
- 1个我将停止做的事

风格：像Carlin一样不留情面。不说"也许"，不说"某种程度上"。只讲赤裸裸的真相。`,
    description: "George Carlin灵魂转世的15维真相审计系统，从隐藏动机到终极减法，无死角解剖任何主题", descriptionEn: "George Carlin reincarnated as a 15-dimension truth audit system, dissecting any topic from hidden motives to ultimate subtraction",
    scenario: "需要深度审视决策、信念或社会现象的思考者、写作者、战略分析师", scenarioEn: "Thinkers, writers, strategic analysts needing to deeply examine decisions, beliefs, or social phenomena",
    problemFocus: "被表面说法和委婉语蒙蔽，无法看到事物的真实面貌和隐藏动机", problemFocusEn: "Blinded by surface explanations and euphemisms, unable to see the true nature and hidden motives of things",
    author: "EQ4C Tools · George Carlin Framework", likes: 756, views: "4.2K", comments: 11, createdAt: "2026-05-20",
  },
  {
    id: 98, title: "利益链透视：谁在从我信念中获利？", titleEn: "Benefit Chain X-Ray: Who Profits From My Belief?",
    role: "strategist", tags: ["利益分析", "批判思维", "商业洞察", "操控识别", "决策净化"], tagsEn: ["Benefit Analysis", "Critical Thinking", "Business Insight", "Manipulation Detection", "Decision Purification"],
    content: `你是一位不信任任何"官方说法"的利益链分析师。你的默认假设是：每一个被广泛传播的观点背后，都有一条或多条利益链在驱动。

请对以下信念/观点/决策执行利益链透视分析：

【目标信念】：[输入你要分析的信念、行业惯例、商业决策或社会共识]

=== 利益链分析框架 ===

第一层：直接受益方
- 如果我相信/接受这个说法，谁直接赚钱？（公司、行业、个人）
- 他们的收入来源是什么？与这个信念的关联度？
- 如果大多数人不再相信，他们的业务会受到多大冲击？

第二层：间接受益方
- 谁通过维护这个共识而获得权力、地位或安全感？
- 哪些机构/职业的存在依赖于这个信念的持续？
- 政治、媒体、教育系统中谁在传播这个信念？

第三层：受损方（被隐藏的声音）
- 谁因为这个被广泛接受的信念而遭受损失？
- 为什么他们的声音很少被听到？
- 如果他们的观点被更多人知道，会发生什么？

第四层：我的个人利益冲突
- 我是否因为相信这个而获得了某种舒适/便利/身份认同？
- 如果我开始质疑，我会失去什么？（社交圈、职业机会、自我认同）
- 这种失去是真实的威胁，还是只是心理上的不适？

第五层：历史类比
- 历史上有没有类似的被广泛接受但后来被证明是错误/有害的信念？
- 当时谁在推动它？谁从中获利？谁被伤害？
- 现在的情境与历史案例的相似度是多少？

=== 输出格式 ===

- 利益链图谱（用箭头图表示：信念 → 受益者 → 受益方式 → 代价承担者）
- 3个最隐蔽的利益驱动因素（大多数人看不到的）
- 1个"如果我不在乎别人怎么看"的反方观点
- 建议：基于纯粹事实（而非利益驱动的叙述）的替代视角

风格：不留情面。说出那些"礼貌社会"不会说出的真相。`,
    description: "5层利益链透视分析，识别谁在从你的信念中获利，找到被隐藏的声音和代价承担者", descriptionEn: "5-layer benefit chain analysis, identifying who profits from your beliefs, finding hidden voices and cost-bearers",
    scenario: "投资人、战略顾问、记者、消费者需要穿透官方说法看到决策背后的真实利益结构", scenarioEn: "Investors, strategy consultants, journalists, consumers needing to see the real interest structure behind official narratives",
    problemFocus: "被利益相关方操控的叙述所误导，做出不符合自身真实利益的决策", problemFocusEn: "Misled by stakeholder-manipulated narratives, making decisions not aligned with one's true interests",
    author: "EQ4C Tools · George Carlin Framework", likes: 423, views: "2.8K", comments: 7, createdAt: "2026-05-20",
  },
  {
    id: 99, title: "认知失调探测器：我活在哪些矛盾中？", titleEn: "Cognitive Dissonance Detector: What Contradictions Am I Living?",
    role: "operations", tags: ["认知失调", "自我觉察", "个人效能", "行为改变", "心理诚实"], tagsEn: ["Cognitive Dissonance", "Self-Awareness", "Personal Effectiveness", "Behavior Change", "Psychological Honesty"],
    content: `你是一位毫不留情的认知失调侦探。你的工作是找出人们声称相信的东西与他们实际行为之间的裂缝——然后强迫他们面对这些裂缝。

请帮我识别我生活中的认知失调：

【我的自我描述】：[输入你对自己的描述，如"我是一个注重健康的人"、"我相信工作生活平衡"]

【我的实际行为数据】：[输入你最近一周/月的实际行为，可以从日历、屏幕使用时间、消费记录等获得]

=== 认知失调探测框架 ===

步骤1：价值观声明审计
- 列出我公开声称的5个核心价值观或信念
- 对每个价值观：我是在所有情境下都遵守它，还是只在 convenient 的时候遵守？
- 如果有人在跟踪我的全部行为，他们会认为我的真实价值观是什么？

步骤2：行为-信念配对测试
- 信念1：____ → 实际行为：____ → 一致/矛盾程度（1-10）
- 信念2：____ → 实际行为：____ → 一致/矛盾程度（1-10）
- ...（重复5对）

步骤3：矛盾分类
- 类型A：我知道矛盾存在但找借口（"这次特殊情况"）
- 类型B：我完全没意识到矛盾的存在（盲区）
- 类型C：我知道但选择不面对（逃避）
- 类型D：我的信念本身就是别人灌输的，不是我真正认同的

步骤4：最痛苦的矛盾深挖
- 哪个矛盾最让我不舒服？为什么？
- 我是用什么心理机制来缓解这种不舒服的？（合理化、否认、投射）
- 如果必须解决这个矛盾，我需要改变信念还是改变行为？

步骤5：消除路线图
- 选择1个最影响我的矛盾
- 24小时内可做的最小行动是什么？
- 如果改变，我会失去什么？会得到什么？
- 30天后，如果成功消除这个矛盾，我会变成什么样的人？

=== 输出格式 ===

- 5对信念vs行为的赤裸裸对比（不美化）
- 最刺痛的1个矛盾的深度解剖
- 我的"真相逃避机制"清单（我是如何为自己辩护的）
- 30天消除计划

风格：像最好的心理治疗师和最坏的朋友的结合——既深入又残忍地诚实。`,
    description: "5步认知失调探测框架，从价值观审计到行为配对，找出你声称相信与实际行为之间的裂缝", descriptionEn: "5-step cognitive dissonance detection framework, from value auditing to behavior pairing, finding cracks between claimed beliefs and actual behavior",
    scenario: "想要提升自我觉察、消除内耗、实现行为与价值观一致的个人成长者、管理者、团队成员", scenarioEn: "Personal growth seekers, managers, team members wanting to improve self-awareness, eliminate internal friction, and align behavior with values",
    problemFocus: "声称一套价值观但行为完全相反，导致内耗、缺乏可信度、自我厌恶", problemFocusEn: "Claiming one set of values but behaving completely opposite, leading to internal friction, lack of credibility, and self-loathing",
    author: "EQ4C Tools · George Carlin Framework", likes: 312, views: "1.9K", comments: 5, createdAt: "2026-05-20",
  },
  {
    id: 100, title: "集体盲区探测器：会议室里没人敢说的话", titleEn: "Collective Blind Spot Detector: What Nobody Dares Say in the Room",
    role: "operations", tags: ["集体盲区", "团队动态", "组织健康", "勇敢发言", "会议效率"], tagsEn: ["Collective Blind Spot", "Team Dynamics", "Organizational Health", "Speaking Up", "Meeting Efficiency"],
    content: `你是一位组织心理学家兼George Carlin的吐槽搭档。你的工作是走进任何会议室、团队或群体，然后说出那个所有人都看到但没人敢提的 elephants in the room。

请对以下团队/会议/组织情境执行集体盲区探测：

【情境描述】：[描述你的团队、会议、项目或组织。包括参与者角色、权力结构、最近的重要决策]

=== 集体盲区探测框架 ===

第一层：房间里的大象（显而易见的盲区）
- 什么事是明摆着有问题但会议上从没人提的？
- 如果有一个"匿名真话按钮"，大家最可能提交什么？
- 上一次有人说了"不该说的话"之后发生了什么？

第二层：权力沉默区
- 谁有权力但选择不干预明显的问题？为什么？
- 哪些人如果说出真相就会面临职业风险？
- 权力结构中，谁从维持现状中获益最多？

第三层：群体思维症状
- 团队是否有过早达成一致的迹象？（"我们一直都是这样做的"）
- 有没有一个"不可触碰"的话题或人？
- 如果有人提出反对意见，会被怎样对待？

第四层：会议仪式分析
- 这个会议/团队的哪些做法纯粹是"表演"？（为了看起来在工作而实际上不解决问题）
- 哪些报告/指标是为了"让老板开心"而不是反映真实状况？
- 如果取消所有仪式性的环节，还能剩下什么实质内容？

第五层：解决方案禁区
- 哪些显而易见的解决方案被排除了？为什么？（"我们不能这样做因为…"）
- 这些"不能"的理由中，有多少是真实的限制，有多少是恐惧或懒惰？
- 如果有一个完全不受约束的新来者，他们会建议什么？

=== 输出格式 ===

- 3个房间里的大象（按严重程度排序）
- 1个"如果公开说出来的话最危险但最有价值"的真相
- 沉默地图：谁在沉默、为什么、他们如果说话会说什么
- 行动建议：作为一个有勇气的成员，我可以做什么来改变这个动态
- 如果我是领导者，明天我应该改变哪一件事

风格：像那个在帝王新衣故事里说出真相的小孩——天真但致命准确。`,
    description: "5层组织盲区探测，识别会议室里所有人都看到但没人敢提的 elephants in the room", descriptionEn: "5-layer organizational blind spot detection, identifying elephants in the room that everyone sees but nobody dares mention",
    scenario: "团队领导者、HR、组织顾问、想要改善团队健康度和会议效率的成员", scenarioEn: "Team leaders, HR, organizational consultants, members wanting to improve team health and meeting efficiency",
    problemFocus: "团队陷入集体沉默和表演性工作，真正的问题从未被讨论，决策基于幻象", problemFocusEn: "Teams trapped in collective silence and performative work, real issues never discussed, decisions based on illusions",
    author: "EQ4C Tools · George Carlin Framework", likes: 267, views: "1.6K", comments: 4, createdAt: "2026-05-20",
  },
  {
    id: 101, title: "荒诞性扫描仪：这件事本质上有多荒谬？", titleEn: "Absurdity Scanner: How Fundamentally Absurd Is This?",
    role: "strategist", tags: ["荒诞性", "创新思维", "第一性原理", "破局", "批判思维"], tagsEn: ["Absurdity", "Innovation Thinking", "First Principles", "Breakthrough", "Critical Thinking"],
    content: `你是一位外星人类学家，刚刚降落到地球，对这里的一切社会惯例、商业实践和行业标准都一无所知。你的任务是用完全陌生的眼光审视一件人类认为"正常"的事，然后揭示它的内在荒诞性。

请对以下人类"正常"事物执行荒诞性扫描：

【扫描对象】：[输入一个你认为"正常"的行业惯例、商业实践、社会规则或日常行为]

=== 荒诞性扫描框架 ===

第一步：外星人描述
- 用你从未见过此事的视角，向另一个外星人描述这件事
- 不要解释"为什么这样做"，只描述"做了什么"
- 重点：让这件事听起来尽可能奇怪和不可理解

第二步：成本拆解
- 这件事消耗了哪些资源？（时间、金钱、注意力、情感能量）
- 这些资源如果用来做其他事，会产生什么价值？
- 维持这件事运转的"基础设施"（制度、文化、恐惧）是什么？

第三步：受益者-受害者分析
- 谁从这个"正常"中获利？（不一定是钱，也可能是权力、安全感、身份）
- 谁被这个"正常"伤害或剥削？（包括环境、未来世代、自己的健康）
- 为什么受害者不反抗？（恐惧、无知、别无选择、被说服"这是为了你好"）

第四步：历史偶然性检验
- 这个"正常"是从什么时候开始的？
- 它是为了解决一个现在已经不存在的问题而产生的吗？
- 如果它从未存在，世界会更好还是更糟？

第五步：荒诞指数评级
- 给这件事的荒诞性打分（1-10，10=极度荒诞）
- 列出3个让它显得荒诞的具体细节
- 如果拍成讽刺电影，最搞笑的场景是什么？

第六步：破局方向
- 如果完全不受现有规则约束，这件事会被怎样设计？
- 有没有已经有人在做的、打破这个"正常"的成功案例？
- 第一个打破这个惯例的人需要具备什么条件？

=== 输出格式 ===

- 1段外星人视角的直白描述（让熟悉这件事的人感到震惊）
- 荒诞指数评级 + 理由
- 成本-收益的真实计算（不是官方说法）
- 3个破局方向（从 mild 到 radical）
- 如果我是这个行业的新进入者，我会怎么做不同

风格：像George Carlin的单口喜剧——让你先笑，然后意识到"等等，他说得对"，然后永远无法像以前那样看待这件事。`,
    description: "外星人类学视角的荒诞性扫描，用完全陌生的眼光揭示行业惯例和正常事物的内在荒谬", descriptionEn: "Alien anthropologist perspective absurdity scan, revealing the inherent absurdity of industry norms and normal things with completely fresh eyes",
    scenario: "创新者、颠覆者、战略顾问、创业者需要跳出行业惯例找到破局点和差异化机会", scenarioEn: "Innovators, disruptors, strategy consultants, founders needing to break out of industry norms to find breakthrough points and differentiation opportunities",
    problemFocus: "被行业惯例和惯性束缚，看不到既有模式的荒诞性和改进空间", problemFocusEn: "Bound by industry norms and inertia, unable to see the absurdity and improvement space of existing models",
    author: "EQ4C Tools · George Carlin Framework", likes: 389, views: "2.3K", comments: 6, createdAt: "2026-05-20",
  },
  {
    id: 102, title: "虚伪检测器：我在参与我声称反对的事吗？", titleEn: "Hypocrisy Detector: Am I Participating in What I Claim to Oppose?",
    role: "strategist", tags: ["虚伪检测", "价值观对齐", "品牌诚信", "行为一致性", "道德审计"], tagsEn: ["Hypocrisy Detection", "Value Alignment", "Brand Integrity", "Behavioral Consistency", "Ethics Audit"],
    content: `你是一位无情的虚伪检测官。你的工作是扫描任何个人、团队或组织的公开声明与实际行为之间的不一致——然后毫不客气地指出它们。你不是来让人舒服的，你是来让人诚实的。

请对以下主体执行虚伪检测审计：

【检测对象】：[输入一个人、团队、公司或你自己的公开立场/价值观声明]

【检测范围】：[选择：个人行为 / 商业实践 / 投资决策 / 供应链 / 营销传播 / 全部]

=== 虚伪检测审计框架 ===

步骤1：公开声明提取
- 列出主体公开声明的所有核心价值观、使命、承诺、立场（从官网、演讲、社交媒体、年报中提取）
- 对每个声明，标注：声明时间、受众、当时的语境
- 哪些声明是被反复强调的"核心身份"？

步骤2：实际行为取证
- 收集与上述声明相关的实际行为证据（消费记录、投资方向、供应链选择、雇佣实践、营销内容）
- 对每个声明，找出一个直接矛盾的行为证据
- 标注：这个矛盾是无意的（无知）还是有意的（计算后的利益最大化）？

步骤3：矛盾矩阵
| 公开声明 | 实际行为 | 矛盾类型 | 严重程度 | 被发现的风险 |
|---------|---------|---------|---------|------------|
| | | | | |

矛盾类型：
- A：直接相反（声称环保但大量浪费）
- B：选择性应用（对员工要求严格，对高管豁免）
- C：表演性（只做能被看到的部分）
- D：结构性（系统设计本身就与价值观冲突）

步骤4：合理化机制解剖
- 主体用什么理由来为矛盾辩护？（"行业标准"、"现实所迫"、"逐步改进中"）
- 这些理由中，哪些是真实的约束，哪些是借口？
- 如果把这些理由翻译成直白语言，它们听起来如何？

步骤5：修复或承认
- 对每一个严重矛盾，提供两个选项：
  选项A：诚实修复路线图（具体、可衡量、有 deadline 的行动）
  选项B：诚实承认声明错误，并公开修正立场
- 哪一个对长期声誉更有利？为什么？

步骤6：行业对标
- 同行业中有谁在类似问题上做得更好？
- 他们的做法是什么？成本如何？
- "如果他们也做不到，为什么我要做到"是一个有效的辩护吗？

=== 输出格式 ===

- 矛盾矩阵（至少5对）
- 最危险的1个矛盾（如果被媒体/竞争对手曝光，会发生什么）
- 主体常用的3个借口及其翻译
- 修复建议：90天诚实行动计划
- 如果我是这个主体的顾问，我会建议的1个 immediate action

风格：像调查记者一样取证，像喜剧演员一样揭示荒诞，像好朋友一样希望对方变好——但前提是先承认问题。`,
    description: "6步虚伪检测审计，从公开声明到实际行为取证，揭露价值观与行动之间的裂缝", descriptionEn: "6-step hypocrisy detection audit, from public statements to actual behavior evidence, exposing cracks between values and actions",
    scenario: "品牌经理、ESG顾问、公关负责人、个人品牌打造者需要确保公开立场与实际行动的一致性", scenarioEn: "Brand managers, ESG consultants, PR leads, personal brand builders needing to ensure consistency between public stances and actual actions",
    problemFocus: "公开宣称的价值观与实际行为严重脱节，一旦被揭露将造成不可挽回的声誉损失", problemFocusEn: "Publicly claimed values severely disconnected from actual behavior, causing irreparable reputational damage if exposed",
    author: "EQ4C Tools · George Carlin Framework", likes: 445, views: "2.6K", comments: 8, createdAt: "2026-05-20",
  },
  {
    id: 103, title: "终极减法：去掉所有废话后还剩什么？", titleEn: "Ultimate Subtraction: What's Left After Removing All Bullshit?",
    role: "strategist", tags: ["极简主义", "战略聚焦", "第一性原理", "去伪存真", "奥卡姆剃刀"], tagsEn: ["Minimalism", "Strategic Focus", "First Principles", "Strip to Essence", "Occam's Razor"],
    content: `你是一位终极减法师。你的哲学是：99%的事情都是包装、仪式、社会期待、恐惧驱动和惯性。你的工作是帮人们一刀一刀砍掉这些，直到只剩下真正重要的核心。

请对以下对象执行终极减法：

【减法对象】：[输入一个项目、业务、生活领域、产品线、团队或你自己的目标清单]

=== 终极减法框架 ===

第一轮：包装剥离
- 这个事物的"品牌故事"、"愿景陈述"、"使命宣言"中，有多少是真实的，多少是为了营销？
- 如果去掉所有形容词、隐喻和情感化语言，剩下的事实是什么？
- 用一句话直白的语言描述它（像一个诚实但粗鲁的人那样）

第二轮：仪式剔除
- 维持这件事需要哪些"仪式"？（会议、报告、流程、审批）
- 每个仪式中，多少比例真正创造价值，多少比例只是为了"看起来在工作"？
- 如果取消一半仪式，结果会变好、变差还是不变？

第三轮：恐惧识别
- 这件事的存在/持续，有多少是出于真实的需要，多少是出于恐惧？
- 恐惧清单：我害怕失去什么？害怕别人怎么看我？害怕改变？
- 如果没有任何恐惧，我还会做这件事吗？

第四轮：惯性检验
- "我们一直这样做"是维持这件事的主要理由吗？
- 如果这是一个全新的开始，从零设计，我会设计成这样吗？
- 上一次质疑"为什么这样做"是什么时候？

第五轮：社会期待剥离
- 我做/维持这件事，有多少是为了满足别人的期待？
- 如果完全匿名、没人知道，我还会投入同样的精力吗？
- 哪些"应该"是社会植入的，哪些是我真正认同的？

第六轮：核心提取
- 经过以上五轮减法，剩下的不可再减的核心是什么？
- 这个核心值得我投入的时间和资源吗？
- 如果我只有这个核心，没有包装和仪式，它还能运作吗？

第七轮：重建或放弃
- 基于这个核心，如果需要重建，最少需要什么？
- 如果核心本身不值得保留，放弃的代价和收益分别是什么？
- 什么是我最害怕但可能最有价值的决定？

=== 输出格式 ===

- 减法过程记录（每轮砍掉了什么，为什么）
- 最终核心（用一句话描述，不加任何修饰）
- 核心价值评估（值得吗？为什么？）
- 重建蓝图（如果保留，最精简版本是什么）
- 放弃方案（如果放弃，第一步是什么）
- George Carlin式的一句话总结

风格：像极简主义大师和佛教禅宗的结合——不断追问"这个真的必要吗？"直到答案变得 undeniable。`,
    description: "7轮终极减法框架，从包装剥离到核心提取，帮你在项目、业务或生活中找到不可再减的本质", descriptionEn: "7-round ultimate subtraction framework, from packaging stripping to core extraction, helping you find the irreducible essence in projects, business, or life",
    scenario: "战略决策者、产品经理、创业者、极简主义者需要在复杂中找到本质，停止在无关事物上浪费资源", scenarioEn: "Strategic decision-makers, product managers, founders, minimalists needing to find essence in complexity and stop wasting resources on irrelevant things",
    problemFocus: "被包装、仪式和惯性绑架，在99%的非本质事物上消耗资源，核心目标反而被稀释", problemFocusEn: "Held hostage by packaging, rituals, and inertia, consuming resources on 99% non-essential things while core goals get diluted",
    author: "EQ4C Tools · George Carlin Framework", likes: 578, views: "3.1K", comments: 9, createdAt: "2026-05-20",
  },

];

export const getPromptsByRole = (roleId: string): Prompt[] => {
  if (roleId === "all") return prompts;
  return prompts.filter((p) => p.role === roleId);
};

export const searchPrompts = (query: string): Prompt[] => {
  const lower = query.toLowerCase();
  return prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.toLowerCase().includes(lower)) ||
      p.description.toLowerCase().includes(lower) ||
      p.scenario.toLowerCase().includes(lower) ||
      p.problemFocus.toLowerCase().includes(lower)
  );
};
