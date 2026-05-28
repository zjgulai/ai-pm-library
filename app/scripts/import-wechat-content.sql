-- ============================================================
-- 从6篇微信文章提取的Skills和Prompts导入脚本
-- Phase 2+3+4: 内容分析 → MECE分类 → 数据库导入
-- 追踪的GitHub仓库: 15个
-- ============================================================

-- 1. 文章1: PPT生成AI技能评测 (4 Skills)
-- GitHub: alchaincyf/huashu-skills, hugohe3/ppt-master, op7418/guizang-ppt-skill, tw93/Kami

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('huashu-design：设计原型级PPT生成', 'huashu-design: Design Prototype PPT Generation', 'creator',
JSON_ARRAY('PPT生成', '设计原型', 'AI技能', 'Claude Code'), JSON_ARRAY('PPT Generation', 'Design Prototype', 'AI Skill', 'Claude Code'),
'## huashu-design Skill 使用指南\n\n### 核心定位\n设计原型级PPT生成工具，专注于将设计稿快速转化为可演示的HTML幻灯片。\n\n### 工作流程\n1. 提供设计稿或参考网站的截图\n2. Skill会自动分析设计元素：配色、排版、字体、间距\n3. 生成HTML格式的PPT，横向翻页，浏览器直接打开\n4. 支持自定义主题和动画效果\n\n### 适用场景\n- 需要快速产出设计原型的产品评审\n- 设计师与开发者的沟通桥梁\n- 高保真概念验证\n\n### 安装\n```bash\nnpx skills add alchaincyf/huashu-skills@huashu-design -g -y\n```\n\n### 追踪来源\nGitHub: https://github.com/alchaincyf/huashu-skills',
'将设计稿转化为可演示HTML幻灯片的AI技能，支持自动分析配色、排版、字体等设计元素', 'AI skill that transforms design mockups into presentable HTML slides, auto-analyzing color, typography, and layout',
'设计师需要快速将设计概念转化为可交互的演示原型，用于产品评审或客户展示', 'Designers needing to quickly turn design concepts into interactive prototypes for reviews or client presentations',
'设计稿到PPT的转换耗时且容易失真，传统方式需要手动截图和排版', 'Converting design mockups to PPT is time-consuming and prone to distortion, requiring manual screenshots and layout',
'huashu-skills · 老严评测', 68, '4.2K', 9);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('ppt-master：商务PPT专业生成', 'ppt-master: Professional Business PPT Generation', 'creator',
JSON_ARRAY('PPT生成', '商务演示', 'AI技能', 'Claude Code'), JSON_ARRAY('PPT Generation', 'Business Presentation', 'AI Skill', 'Claude Code'),
'## ppt-master Skill 使用指南\n\n### 核心定位\n面向商务场景的专业PPT生成工具，产出高质量、结构化的演示文稿。\n\n### 工作流程\n1. 输入主题和大纲\n2. Skill会自动生成完整的PPT结构：封面、目录、内容页、总结页\n3. 支持多种商务模板：汇报型、提案型、培训型\n4. 输出为HTML或PPTX格式\n\n### 特色功能\n- 自动图表生成（柱状图、饼图、折线图）\n- 数据可视化建议\n- 商务配色方案\n- 演讲者备注自动生成\n\n### 安装\n```bash\nnpx skills add hugohe3/ppt-master@ppt-master -g -y\n```\n\n### 追踪来源\nGitHub: https://github.com/hugohe3/ppt-master',
'面向商务场景的专业PPT生成AI技能，支持自动图表、数据可视化和演讲者备注', 'Professional business PPT generation AI skill with auto charts, data visualization, and speaker notes',
'商务人士需要快速制作高质量的工作汇报、项目提案或培训材料', 'Business professionals needing to quickly create high-quality reports, proposals, or training materials',
'商务PPT制作耗时，图表设计不专业，演讲准备不充分', 'Business PPT creation is time-consuming, charts look unprofessional, speech preparation is inadequate',
'ppt-master · 老严评测', 72, '4.8K', 11);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('guizang-ppt-skill：技术分享PPT神器', 'guizang-ppt-skill: Technical Presentation PPT Tool', 'developer',
JSON_ARRAY('PPT生成', '技术分享', 'WebGL', '单文件HTML', 'AI技能'), JSON_ARRAY('PPT Generation', 'Tech Presentation', 'WebGL', 'Single File HTML', 'AI Skill'),
'## guizang-ppt-skill 使用指南\n\n### 核心定位\n单文件HTML技术分享PPT生成，横向翻页，浏览器直接打开运行。\n\n### 核心亮点：WebGL流体背景\n不是廉价渐变动画，而是有真实质感的流体效果。hero页一打开像在看Apple发布会。\n\n### 配色预设（5套，不支持自定义）\n- 墨水经典\n- 靛蓝瓷\n- 森林墨\n- 牛皮纸\n- 沙丘\n\n### 技术特点\n- 单文件HTML，完全独立运行\n- 不需要安装任何东西\n- 浏览器打开即可\n- WebGL硬件加速\n\n### 安装\n```bash\nnpx skills add op7418/guizang-ppt-skill@guizang-ppt -g -y\n```\n\n### 追踪来源\nGitHub: https://github.com/op7418/guizang-ppt-skill',
'单文件HTML技术分享PPT生成工具，WebGL流体背景效果惊艳，5套预设配色', 'Single-file HTML tech presentation PPT tool with stunning WebGL fluid backgrounds and 5 preset color schemes',
'技术人员需要做技术分享、内部分享或开源项目演示', 'Technical professionals needing to create tech talks, internal sharing sessions, or open-source project demos',
'技术PPT要么太简陋要么制作耗时，没有适合技术人员的专用工具', 'Tech presentations are either too basic or time-consuming to create, lacking tools designed for technical professionals',
'guizang-ppt-skill · 老严评测', 95, '8.1K', 18);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('Kami：专业文档型PPT', 'Kami: Professional Document-Style PPT', 'creator',
JSON_ARRAY('PPT生成', '专业文档', 'AI技能', 'Claude Code'), JSON_ARRAY('PPT Generation', 'Professional Document', 'AI Skill', 'Claude Code'),
'## Kami Skill 使用指南\n\n### 核心定位\n面向专业文档和学术场景的PPT生成工具，强调内容结构和逻辑表达。\n\n### 工作流程\n1. 输入文档内容或研究论文\n2. Skill会自动提取关键论点、数据和结论\n3. 生成结构清晰、逻辑严密的PPT\n4. 支持LaTeX公式和代码高亮\n\n### 适用场景\n- 学术论文答辩\n- 技术白皮书展示\n- 产品需求文档评审\n- 研究报告汇报\n\n### 安装\n```bash\nnpx skills add tw93/Kami@kami -g -y\n```\n\n### 追踪来源\nGitHub: https://github.com/tw93/Kami',
'面向专业文档和学术场景的PPT生成AI技能，支持LaTeX公式和代码高亮', 'Professional document and academic PPT generation AI skill, supporting LaTeX formulas and code highlighting',
'学术研究者、产品经理需要制作专业文档和学术PPT', 'Researchers and PMs needing to create professional documents and academic presentations',
'学术论文PPT制作繁琐，公式排版困难，代码展示不美观', 'Academic PPT creation is tedious, formula formatting is difficult, code display is unattractive',
'Kami · 老严评测', 54, '3.6K', 7);

-- 2. 文章2: Claude Code 10 Skills (去重agent-browser和summarize后8个新Skills)

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('find-skills：Claude Code技能搜索引擎', 'find-skills: Claude Code Skill Search Engine', 'developer',
JSON_ARRAY('Claude Code', '技能发现', '效率工具', 'AI技能'), JSON_ARRAY('Claude Code', 'Skill Discovery', 'Productivity', 'AI Skill'),
'## find-skills 使用指南\n\n### 核心定位\nClaude Code生态里的技能搜索入口。帮你从skills生态里找到现成方案。\n\n### 解决的问题\n- 这个事到底有没有现成skill？\n- 我要不要自己写？\n- 有没有别人已经沉淀好的流程？\n- 这个方向是不是已经有成熟模板？\n\n### 使用场景\n当你想做某件事但不确定有没有现成方案时，find-skills帮你从生态里先把答案翻出来。\n\n### 核心价值\n降低探索生态的成本。理解成"技能层的搜索引擎"。对于想把Claude Code用深的人来说，这是效率入口。\n\n### 安装\n```bash\nnpx skills add vercel-labs/skills@find-skills -g -y\n```\n\n### 追踪来源\nhttps://skills.sh/vercel-labs/skills/find-skills',
'Claude Code生态的技能搜索引擎，帮你发现现成可用的skills而不是重复造轮子', 'Claude Code ecosystem skill search engine, helping you discover existing skills instead of reinventing wheels',
'Claude Code用户不知道有哪些可用技能，浪费时间重复摸索', 'Claude Code users don''t know what skills are available, wasting time on repeated exploration',
'使用AI工具最浪费时间的不是执行，而是"重复摸索"：这个事到底有没有现成skill？', 'The most time-wasting part of using AI tools isn''t execution, it''s "repeated exploration": does a skill already exist for this?',
'vercel-labs · Import AI推荐', 88, '5.2K', 12);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('skill-creator：把经验固化为可复用Skill', 'skill-creator: Turn Experience into Reusable Skills', 'developer',
JSON_ARRAY('Claude Code', '技能创建', '工作流固化', 'AI技能'), JSON_ARRAY('Claude Code', 'Skill Creation', 'Workflow固化', 'AI Skill'),
'## skill-creator 使用指南\n\n### 核心定位\n如果某个动作一周会重复很多次，那它就值得被固化。skill-creator把重复动作从"零散经验"变成"可复用流程"。\n\n### 工作方式\n1. 描述你经常重复的工作流程\n2. skill-creator帮你将其转化为结构化Skill\n3. 生成的Skill可以被Claude Code反复调用\n4. 随着使用不断迭代优化\n\n### 核心价值\n当Claude Code开始复用你的workflow，它就不再只是助手，而更像一个逐渐熟悉你做事方式的同事。你沉淀得越多，它的产出越稳定。\n\n### 使用场景\n- 每周重复的数据处理流程\n- 固定的代码审查清单\n- 标准化的文档生成流程\n- 重复性的运维操作\n\n### 安装\n```bash\nnpx skills add anthropics/skills@skill-creator -g -y\n```\n\n### 追踪来源\nhttps://skills.sh/anthropics/skills/skill-creator',
'将重复性工作流程固化为可复用AI技能的创建工具，让Claude Code逐渐熟悉你的做事方式', 'Tool for turning repetitive workflows into reusable AI skills, letting Claude Code learn your working style',
'需要把高频重复的工作流程自动化，减少每次从零开始配置的时间', 'Needing to automate high-frequency repetitive workflows, reducing setup time from scratch each time',
'同样操作每周重复多次，每次都从零开始写prompt效率极低', 'Repeating the same operations weekly, writing prompts from scratch each time is extremely inefficient',
'anthropics · Import AI推荐', 112, '7.5K', 19);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('tmux：终端会话持久化管理', 'tmux: Terminal Session Persistence Management', 'developer',
JSON_ARRAY('Claude Code', '终端管理', 'tmux', '远程开发', 'AI技能'), JSON_ARRAY('Claude Code', 'Terminal Management', 'tmux', 'Remote Development', 'AI Skill'),
'## tmux Skill 使用指南\n\n### 核心定位\nClaude Code的终端会话持久化管理工具。解决命令跑很久、过程要持续观察、多个任务并行等场景。\n\n### 解决的问题\n- 命令要跑很久，不能断开\n- 过程要持续观察日志\n- 中途要交互输入\n- 多个任务要并行\n- 远端环境不能轻易断开\n\n### 核心价值\n让Claude Code不只是"执行一次"，而是可以持续控制一个已存在的终端环境。适合开发、运维、远程任务、批处理场景。\n\n### 安装\n```bash\nnpx skills add steipete/clawdis@tmux -g -y\n```\n\n### 追踪来源\nhttps://skills.sh/steipete/clawdis/tmux',
'Claude Code终端会话持久化管理skill，支持长时间任务、日志监控和多任务并行', 'Claude Code terminal session persistence skill, supporting long-running tasks, log monitoring, and multi-task parallelism',
'开发运维人员需要管理长时间运行的任务和远程会话', 'DevOps professionals needing to manage long-running tasks and remote sessions',
'Claude Code执行长时间任务时会话断开，无法持续监控和交互', 'Claude Code loses session when executing long-running tasks, unable to monitor and interact continuously',
'steipete · Import AI推荐', 76, '4.8K', 11);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('webapp-testing：自动化测试工程化', 'webapp-testing: Automated Testing Engineering', 'developer',
JSON_ARRAY('Claude Code', '自动化测试', 'Playwright', 'E2E测试', 'AI技能'), JSON_ARRAY('Claude Code', 'Automated Testing', 'Playwright', 'E2E Testing', 'AI Skill'),
'## webapp-testing Skill 使用指南\n\n### 核心定位\n给Claude Code加了一层测试工程经验。让它写的测试不只是"能写出来"，而是"写得稳定、清晰、可维护"。\n\n### 提升领域\n- 测试结构怎么组织\n- 断言怎么写更有意义\n- 边界条件怎么覆盖\n- Playwright用例怎么更像真实场景\n- 哪些测试值得保留，哪些只是噪音\n\n### 适用场景\n- 前端/Web应用的自动化测试\n- E2E测试用例生成\n- 测试策略制定\n- 测试代码重构\n\n### 安装\n```bash\nnpx skills add anthropics/skills@webapp-testing -g -y\nnpx skills add supercent-io/skills-template@testing-strategies -g -y\n```\n\n### 追踪来源\nhttps://skills.sh/anthropics/skills/webapp-testing',
'给Claude Code增加测试工程经验的skill，提升测试结构、断言质量和Playwright用例真实性', 'Adds testing engineering experience to Claude Code, improving test structure, assertion quality, and Playwright case realism',
'前端开发者需要编写稳定可维护的自动化测试，特别是E2E测试', 'Frontend developers needing to write stable, maintainable automated tests, especially E2E tests',
'AI生成的测试用例不稳定、不清晰、难以维护，缺乏测试工程最佳实践', 'AI-generated test cases are unstable, unclear, and hard to maintain, lacking testing engineering best practices',
'anthropics · Import AI推荐', 82, '5.1K', 13);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('api-docs：技术文档工程化生成', 'api-docs: Technical Documentation Engineering', 'developer',
JSON_ARRAY('Claude Code', '技术文档', 'API文档', 'README', 'AI技能'), JSON_ARRAY('Claude Code', 'Technical Documentation', 'API Docs', 'README', 'AI Skill'),
'## api-docs Skill 使用指南\n\n### 核心定位\n给Claude Code一套文档组织框架，让它从"会堆字"变成"靠谱的技术写作者"。\n\n### 核心价值\nClaude Code很擅长理解代码和结构，但如果没有约束，写出来的文档容易"看着完整，实际上没重点"。这个skill给它一套文档工程框架。\n\n### 适用场景\n- 补README\n- 整理API文档\n- 给项目写上手说明\n- 技术博客撰写\n\n### 安装\n```bash\nnpx skills add vercel-labs/skills@api-docs -g -y\n```\n\n### 追踪来源\nhttps://skills.sh/vercel-labs/skills/api-docs',
'给Claude Code技术文档组织框架的skill，让文档写作从堆字变为工程化输出', 'Provides Claude Code with a technical documentation framework, turning doc writing from word-stacking to engineering output',
'开发者需要为项目编写高质量README、API文档和上手说明', 'Developers needing to write high-quality READMEs, API docs, and onboarding guides for projects',
'AI生成的文档看起来完整但缺乏重点，没有工程化的文档结构', 'AI-generated docs look complete but lack focus, without engineering-grade document structure',
'vercel-labs · Import AI推荐', 65, '4.2K', 9);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('git-refactor：Git操作与代码重构助手', 'git-refactor: Git Operations & Code Refactoring Assistant', 'developer',
JSON_ARRAY('Claude Code', 'Git', '代码重构', '版本控制', 'AI技能'), JSON_ARRAY('Claude Code', 'Git', 'Code Refactoring', 'Version Control', 'AI Skill'),
'## git-refactor Skill 使用指南\n\n### 核心定位\n把Claude Code从"会写代码"推向"能承担完整工作流"，覆盖Git操作和代码重构场景。\n\n### 能力范围\n- 智能commit message生成\n- 分支策略建议\n- 代码重构规划\n- 重构安全评估\n- Git历史清理\n\n### 核心价值\n不只是写代码，而是理解代码演进过程，在重构时保持代码库的健康状态。\n\n### 安装\n```bash\nnpx skills add vercel-labs/skills@git-refactor -g -y\n```',
'覆盖Git操作和代码重构场景的Claude Code skill，支持智能commit和重构安全评估', 'Claude Code skill covering Git operations and code refactoring, supporting smart commits and refactoring safety assessment',
'开发者需要在重构代码时保持Git历史整洁和代码库健康', 'Developers needing to maintain clean Git history and codebase health during refactoring',
'重构时容易破坏Git历史，commit message质量差，缺乏重构规划', 'Refactoring easily breaks Git history, poor commit messages, lack of refactoring planning',
'vercel-labs · Import AI推荐', 71, '4.5K', 10);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('mcp-tools：MCP协议工具集成', 'mcp-tools: MCP Protocol Tool Integration', 'developer',
JSON_ARRAY('Claude Code', 'MCP', '工具集成', '协议', 'AI技能'), JSON_ARRAY('Claude Code', 'MCP', 'Tool Integration', 'Protocol', 'AI Skill'),
'## mcp-tools Skill 使用指南\n\n### 核心定位\nMCP(Model Context Protocol)工具集成skill，让Claude Code能够连接外部工具和数据源。\n\n### 能力范围\n- 连接外部API和数据源\n- 文件系统操作\n- 数据库查询\n- 第三方服务集成\n\n### 核心价值\nMCP是Claude Code扩展能力的协议层。通过mcp-tools，Claude Code可以从"会回答"变成"会做事"，真正与外部世界交互。\n\n### 安装\n```bash\nnpx skills add vercel-labs/skills@mcp-tools -g -y\n```',
'MCP协议工具集成skill，让Claude Code连接外部API、数据源和第三方服务', 'MCP protocol tool integration skill, enabling Claude Code to connect to external APIs, data sources, and third-party services',
'需要让Claude Code与外部工具和数据源交互的开发者', 'Developers needing Claude Code to interact with external tools and data sources',
'Claude Code缺乏与外部世界交互的能力，只能处理本地代码和文本', 'Claude Code lacks the ability to interact with the external world, only handling local code and text',
'vercel-labs · Import AI推荐', 58, '3.8K', 8);

-- 3. 文章3: OSS-Skill 蒸馏开源项目

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('oss-skill：蒸馏开源项目的工程直觉', 'oss-skill: Distill Engineering Intuition from Open Source', 'developer',
JSON_ARRAY('开源', 'Vibe Coding', '工程判断', 'Skill创建', 'AI技能'), JSON_ARRAY('Open Source', 'Vibe Coding', 'Engineering Judgment', 'Skill Creation', 'AI Skill'),
'## oss-skill 使用指南\n\n### 核心定位\n为开发者在Vibe Coding时提供的一套专业Playbook。关注开源作者、开源仓库在真实工程里的判断方式。\n\n### 灵感来源\n借鉴自女娲Skill(nuwa-skill, 1.2万+Star)。但关注点不同：nuwa-skill偏向人的思维框架，oss-skill偏向软件工程里具体的判断动作。\n\n### 工作流程\n1. **指定目标**：选择要蒸馏的开源项目或作者\n2. **六维度调研**：\n   - 架构：结构、边界、状态和依赖\n   - 变更：commit、PR、release里的变更模式\n   - 评审：maintainer在维护和防止什么\n   - 文档：作者明确说过的原则\n   - 决策：关键决策里为什么选A不选B\n   - 演化：风格怎么形成，后来有没有变化\n3. **提炼落地内容**：\n   - 工程判断维度：遇到什么类型的问题时使用\n   - 决策启发式：从维护决策中提炼快速规则\n   - 代码特征/评审特征：写代码、审代码时的稳定偏好\n   - 开发任务映射：写代码、review、debug、重构时的最佳实践\n4. **明确边界**：证据来自代码仓库就不外推到整个人；只出现一次的结论不能硬说成稳定风格\n\n### 追踪来源\nGitHub: https://github.com/lianchi/oss-skill\n灵感来源: https://github.com/alchaincyf/nuwa-skill',
'蒸馏开源项目的工程判断和决策模式，为Vibe Coding提供可复用的专业Playbook', 'Distills engineering judgment and decision patterns from open source projects, providing reusable professional playbooks for Vibe Coding',
'开发者在AI写代码时需要工程判断力辅助，避免盲目信任AI输出', 'Developers needing engineering judgment assistance when AI writes code, avoiding blindly trusting AI output',
'AI写代码效率高但缺乏工程判断，容易做出不合理的设计决策', 'AI codes efficiently but lacks engineering judgment, easily making unreasonable design decisions',
'lianchi · 炼赤开源', 134, '9.8K', 22);

-- 4. 文章4: 五个Skill串起一篇论文 (8 Skills, 去重后全部新)

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('research-proposal：Nature Reviews风格研究提案', 'research-proposal: Nature Reviews Style Research Proposal', 'researcher',
JSON_ARRAY('学术研究', '研究提案', 'Nature风格', '论文写作', 'AI技能'), JSON_ARRAY('Academic Research', 'Research Proposal', 'Nature Style', 'Paper Writing', 'AI Skill'),
'## research-proposal Skill 使用指南\n\n### 核心定位\nNature Reviews风格的研究提案生成，含40+参考文献占位。仓库426★。\n\n### 使用场景\n- 立项/开题阶段\n- 研究提案撰写\n- 基金申请书\n- 合作方案\n\n### 工作流程\n1. 输入研究主题和目标\n2. 生成Nature Reviews风格的研究提案框架\n3. 自动填充40+参考文献占位\n4. 支持迭代修改\n\n### 追踪来源\nGitHub: https://github.com/luwill/research-skills',
'Nature Reviews风格的研究提案生成skill，含40+参考文献占位，适合立项开题', 'Nature Reviews style research proposal generation skill with 40+ reference placeholders, suitable for project initiation',
'学术研究者需要撰写高质量的研究提案和基金申请书', 'Academic researchers needing to write high-quality research proposals and grant applications',
'研究提案格式不规范，参考文献管理混乱，立项成功率低', 'Research proposal formatting is non-standard, reference management is chaotic, approval rate is low',
'luwill · 学术废物收容所推荐', 89, '6.2K', 14);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('paper-strategist：论文架构规划与评审节点', 'paper-strategist: Paper Architecture Planning & Review Nodes', 'researcher',
JSON_ARRAY('学术研究', '论文规划', '评审节点', '论文写作', 'AI技能'), JSON_ARRAY('Academic Research', 'Paper Planning', 'Review Nodes', 'Paper Writing', 'AI Skill'),
'## paper-strategist Skill 使用指南\n\n### 核心定位\n拆出7个评审节点，提示要补的证据位。当前172★。\n\n### 工作流程\n1. 输入论文主题和初步思路\n2. Skill拆解出7个关键评审节点\n3. 每个节点提示需要补充的证据\n4. 生成完整的论文架构规划\n\n### 核心价值\n在写作前就预判审稿人可能提出的问题，提前准备好证据链。\n\n### 追踪来源\nGitHub: https://github.com/lishix520/academic-paper-skills',
'论文架构规划skill，拆解7个评审节点并提示需要补充的证据位', 'Paper architecture planning skill, breaking down 7 review nodes and prompting for evidence gaps',
'学术写作者需要在投稿前预判审稿意见，完善论文架构', 'Academic writers needing to anticipate reviewer comments and refine paper structure before submission',
'论文结构不清晰，审稿意见频出，投稿成功率低', 'Unclear paper structure, frequent reviewer comments, low acceptance rates',
'lishix520 · 学术废物收容所推荐', 67, '4.5K', 9);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('paper-composer：学术论文正文骨架生成', 'paper-composer: Academic Paper Body Skeleton Generation', 'researcher',
JSON_ARRAY('学术研究', '论文写作', '正文生成', 'AI技能'), JSON_ARRAY('Academic Research', 'Paper Writing', 'Body Generation', 'AI Skill'),
'## paper-composer Skill 使用指南\n\n### 核心定位\n出骨架的学术论文写作skill。与scientific-writer配合：composer出骨架，scientific-writer负责润色。\n\n### 工作流程\n1. 输入研究数据和初步结论\n2. 生成论文正文骨架（Introduction→Methods→Results→Discussion）\n3. 自动插入数据占位和图表建议\n4. 与scientific-writer配合润色\n\n### 追踪来源\nGitHub: https://github.com/lishix520/academic-paper-skills',
'学术论文正文骨架生成skill，负责搭建Introduction到Discussion的完整框架', 'Academic paper body skeleton generation skill, building complete framework from Introduction to Discussion',
'学术写作者需要快速搭建论文框架，确保结构完整', 'Academic writers needing to quickly scaffold paper structure ensuring completeness',
'论文结构不完整，各部分逻辑连接薄弱，写作效率低', 'Incomplete paper structure, weak logical connections between sections, low writing efficiency',
'lishix520 · 学术废物收容所推荐', 72, '4.8K', 10);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('scientific-writer：科学写作润色专家', 'scientific-writer: Scientific Writing Polish Expert', 'researcher',
JSON_ARRAY('学术研究', '科学写作', '论文润色', 'AI技能'), JSON_ARRAY('Academic Research', 'Scientific Writing', 'Paper Polish', 'AI Skill'),
'## scientific-writer Skill 使用指南\n\n### 核心定位\n负责论文润色的科学写作skill。主仓库1.7万★。与paper-composer配合：composer出骨架，scientific-writer润色。\n\n### 能力范围\n- 学术语言润色\n- 逻辑连贯性检查\n- 引用格式规范\n- 图表描述优化\n- 投稿信撰写\n\n### 追踪来源\nGitHub: https://github.com/K-Dense-AI/claude-scientific-writer',
'科学写作润色专家skill，1.7万★，负责学术语言优化和逻辑连贯性', 'Scientific writing polish expert skill, 17K stars, responsible for academic language optimization and logical coherence',
'学术写作者需要提升论文语言质量和学术规范性', 'Academic writers needing to improve paper language quality and academic standards',
'非母语写作者学术英语不规范，论文被拒稿率高', 'Non-native writers struggle with academic English norms, high rejection rates',
'K-Dense-AI · 学术废物收容所推荐', 156, '12.3K', 28);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('statistical-analysis：统计分析与数据检验', 'statistical-analysis: Statistical Analysis & Data Testing', 'dataScientist',
JSON_ARRAY('学术研究', '统计分析', 'pandas', 'statsmodels', 'AI技能'), JSON_ARRAY('Academic Research', 'Statistical Analysis', 'pandas', 'statsmodels', 'AI Skill'),
'## statistical-analysis Skill 使用指南\n\n### 核心定位\n自带pandas + statsmodels工作流的统计分析skill。与scientific-writing在同一目录。\n\n### 能力范围\n- 描述性统计分析\n- 假设检验\n- 回归分析\n- 数据可视化\n- 显著性检验\n\n### 追踪来源\nGitHub: https://github.com/K-Dense-AI/claude-scientific-skills',
'自带pandas+statsmodels工作流的统计分析skill，覆盖假设检验到回归分析', 'Statistical analysis skill with built-in pandas+statsmodels workflow, covering hypothesis testing to regression analysis',
'研究者需要进行统计分析和显著性检验', 'Researchers needing to perform statistical analysis and significance testing',
'统计分析代码重复编写，检验方法选择困难，结果解释不准确', 'Repeated statistical code writing, difficulty choosing test methods, inaccurate result interpretation',
'K-Dense-AI · 学术废物收容所推荐', 94, '7.1K', 16);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('latex-document：LaTeX期刊版式排版', 'latex-document: LaTeX Journal Typesetting', 'researcher',
JSON_ARRAY('学术研究', 'LaTeX', '期刊排版', '论文写作', 'AI技能'), JSON_ARRAY('Academic Research', 'LaTeX', 'Journal Typesetting', 'Paper Writing', 'AI Skill'),
'## latex-document Skill 使用指南\n\n### 核心定位\n负责期刊版式的LaTeX排版skill。\n\n### 工作流程\n1. 仓库根目录没有skills/文件夹，直接保留整个仓库\n2. 按README运行setup.sh\n3. 再执行scripts/compile_latex.sh\n\n### 追踪来源\nGitHub: https://github.com/ndpvt-web/latex-document-skill',
'LaTeX期刊版式排版skill，一键运行setup.sh和compile脚本生成期刊格式论文', 'LaTeX journal typesetting skill, one-click setup.sh and compile script to generate journal-formatted papers',
'学术研究者需要制作符合期刊要求的LaTeX格式论文', 'Academic researchers needing to create LaTeX papers meeting journal requirements',
'LaTeX排版复杂，期刊格式要求多，手动调整耗时', 'LaTeX typesetting is complex, journal format requirements are numerous, manual adjustment is time-consuming',
'ndpvt-web · 学术废物收容所推荐', 61, '3.9K', 8);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('office-skills：Word/PPT/PDF文档生成', 'office-skills: Word/PPT/PDF Document Generation', 'creator',
JSON_ARRAY('文档生成', 'Word', 'PPT', 'PDF', 'AI技能'), JSON_ARRAY('Document Generation', 'Word', 'PPT', 'PDF', 'AI Skill'),
'## office-skills Skill 使用指南\n\n### 核心定位\n覆盖Word、PPTX、PDF三个方向的文档生成skill。\n\n### 能力范围\n- Word文档自动生成\n- PPT演示文稿生成\n- PDF报告导出\n- 格式模板应用\n\n### 追踪来源\nGitHub: https://github.com/tfriedel/claude-office-skills\n官方docx/pptx/pdf: https://github.com/anthropics/skills',
'覆盖Word/PPT/PDF三方向的文档生成skill，支持格式模板应用', 'Document generation skill covering Word/PPT/PDF with format template support',
'需要快速生成多种格式办公文档的用户', 'Users needing to quickly generate various format office documents',
'文档格式转换复杂，排版不一致，多格式输出困难', 'Document format conversion is complex, layout inconsistency, multi-format output is difficult',
'tfriedel · 学术废物收容所推荐', 53, '3.5K', 7);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('research-superpower：研究超能力增强', 'research-superpower: Research Superpower Enhancement', 'researcher',
JSON_ARRAY('学术研究', '研究增强', '文献检索', 'AI技能'), JSON_ARRAY('Academic Research', 'Research Enhancement', 'Literature Search', 'AI Skill'),
'## research-superpower Skill 使用指南\n\n### 核心定位\n研究超能力增强skill，在选题阶段配合research-proposal使用。\n\n### 能力范围\n- 文献自动检索\n- 引用校验\n- 研究趋势分析\n- 竞争对手跟踪\n\n### 使用方式\n选题阶段：research-proposal起草 → superpower校验引用 → strategist调整结构\n\n### 追踪来源\nGitHub: https://github.com/kthorn/research-superpower',
'研究超能力增强skill，支持文献自动检索、引用校验和研究趋势分析', 'Research superpower enhancement skill, supporting auto literature search, citation verification, and research trend analysis',
'学术研究者需要高效检索文献和校验引用', 'Academic researchers needing efficient literature search and citation verification',
'文献检索耗时长，引用格式错误多，研究趋势把握不准', 'Literature search is time-consuming, citation format errors are frequent, research trends are hard to grasp',
'kthorn · 学术废物收容所推荐', 58, '3.8K', 8);

-- 5. 文章5: 最值得安装的8个Skill (去重agent-browser/summarize/skill-creator后5个新Skills)

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('skill-vetter：Skill安全审查防投毒', 'skill-vetter: Skill Security Review & Poisoning Prevention', 'developer',
JSON_ARRAY('Claude Code', '安全审查', 'Skill投毒', '恶意检测', 'AI技能'), JSON_ARRAY('Claude Code', 'Security Review', 'Skill Poisoning', 'Malware Detection', 'AI Skill'),
'## skill-vetter 使用指南\n\n### 核心定位\nClawHub上10000+个Skill鱼龙混杂，skill-vetter帮你审查Skill安全性。\n\n### 背景案例\n用户hightower6eu发布了314个Skill，看起来都正常（加密分析、金融追踪、社交媒体分析），结果官方一查，314个全是恶意的。套路：装完后让你去陌生地址下载东西，然后直接在你电脑上执行。\n\n### 风险等级\n- 🟢 低风险：做笔记、查天气、格式处理\n- 🟡 中风险：文件操作、浏览器控制、调外部API\n- 🟠 高风险：执行系统命令、网络请求、文件修改\n- 🔴 极高风险：下载执行远程文件、权限提升\n\n### 使用方式\n装任何Skill之前先扫一遍，出一份报告告诉你能不能装。也可以对现有所有Skill进行全面扫描。\n\n### 追踪来源\nhttps://clawhub.ai/spclaudehome/skill-vetter',
'Claude Code Skill安全审查工具，四级风险检测，防止恶意Skill投毒', 'Claude Code skill security review tool with four-level risk detection, preventing malicious skill poisoning',
'Claude Code用户需要安全审查从第三方安装的Skill', 'Claude Code users needing to security review third-party installed skills',
'第三方Skill可能包含恶意代码，安装后窃取API Key或执行恶意操作', 'Third-party skills may contain malicious code, stealing API keys or executing malicious operations after installation',
'spclaudehome · 顾小北推荐', 108, '7.8K', 17);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('last30days：海外社区真实情绪抓取', 'last30days: Overseas Community Real Sentiment Capture', 'growth',
JSON_ARRAY('社区调研', '情绪分析', '竞品分析', '选品调研', 'AI技能'), JSON_ARRAY('Community Research', 'Sentiment Analysis', 'Competitor Analysis', 'Product Research', 'AI Skill'),
'## last30days Skill 使用指南\n\n### 核心定位\n深入10+海外社区平台，抓取最近30天真实讨论，带参与度数据。\n\n### 覆盖平台\nReddit、X(Twitter)、YouTube、Hacker News、TikTok、Polymarket\n\n### 核心差异（vs Perplexity）\nPerplexity搜的是SEO排名靠前的网页，last30days抓的是社区真实参与度。\n\n### 使用方式\n```bash\n/last30days 这个产品在美国市场反馈\n```\n2-5分钟，AI帮你扫完所有平台，输出带引用来源的综合报告。\n\n### 适用场景\n- 跨境电商选品调研\n- 竞品分析\n- 话题追踪\n- 市场进入决策\n\n### 追踪来源\nGitHub: https://github.com/mvanhorn/last30days-skill\n作者: Lyft联合创始人，8000+星',
'深入10+海外社区抓取真实讨论和参与度数据，2-5分钟输出综合调研报告', 'Deep dive into 10+ overseas communities for real discussions and engagement data, comprehensive report in 2-5 minutes',
'跨境电商、市场分析师需要了解海外真实社区反馈', 'Cross-border e-commerce and market analysts needing to understand overseas community feedback',
'传统搜索看到的是SEO优化内容，不是真实用户反馈', 'Traditional search shows SEO-optimized content, not real user feedback',
'mvanhorn · 顾小北推荐', 92, '6.5K', 14);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('self-improving-agent：从失败中自我进化', 'self-improving-agent: Self-Evolution from Failure', 'developer',
JSON_ARRAY('Claude Code', '自我进化', '错误学习', 'AI技能'), JSON_ARRAY('Claude Code', 'Self-Evolution', 'Error Learning', 'AI Skill'),
'## self-improving-agent 使用指南\n\n### 核心定位\n主动捕获执行错误和你的纠正指令，让Agent在失败中持续进化。ClawHub热门榜第一，46k+ installs。\n\n### 工作原理\n1. 捕获执行过程中的错误\n2. 记录用户的纠正指令\n3. 自动调整后续行为\n4. 形成个人化的工作模式\n\n### 核心价值\n装上一周后，你会发现它真的变聪明了。模型没升级，是它记住了你的习惯、偏好、之前的判断。\n\n### 追踪来源\nhttps://clawhub.ai/pskoett/self-improving-agent',
'主动捕获错误和学习纠正指令的Agent进化skill，ClawHub 46k+ installs', 'Agent evolution skill that actively captures errors and learns from corrections, ClawHub 46k+ installs',
'需要AI助手持续学习用户习惯并自我改进的重度用户', 'Heavy users needing AI assistants to continuously learn user habits and self-improve',
'AI助手每次从零开始，记不住用户偏好和之前纠正过的问题', 'AI assistants start from scratch each time, unable to remember user preferences and previously corrected issues',
'pskoett · 顾小北推荐', 145, '10.2K', 23);

INSERT INTO skills (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('claude-to-im：飞书远程操控Claude Code', 'claude-to-im: Feishu Remote Control for Claude Code', 'operations',
JSON_ARRAY('Claude Code', '飞书', '远程操控', '即时通讯', 'AI技能'), JSON_ARRAY('Claude Code', 'Feishu', 'Remote Control', 'IM', 'AI Skill'),
'## claude-to-im Skill 使用指南\n\n### 核心定位\n把Claude Code桥接到飞书，出门在外用手机在飞书里发消息，就能远程操控电脑上的Claude Code。\n\n### 能干嘛\n- 躺床上让它帮你整理文档，第二天到公司直接用\n- 出差路上发现需要改个脚本，手机发句话就搞定\n- 开会时临时要查个数据，不用开电脑，飞书一句话让它跑\n- 晚上想起来有个代码要推送，手机上发指令就行\n\n### 飞书优势\n- 不需要公网IP\n- 不需要内网穿透（省掉frp、ngrok配置麻烦）\n- 防火墙后面也能用（WSClient长连接）\n- 配置简单：飞书开放平台建应用，填两个凭证就完事\n\n### 追踪来源\nGitHub: https://github.com/op7418/Claude-to-IM-skill',
'将Claude Code桥接到飞书，支持手机远程操控和团队协作共用', 'Bridges Claude Code to Feishu, supporting mobile remote control and team collaboration',
'需要随时随地远程操控Claude Code的用户', 'Users needing to remotely control Claude Code anytime, anywhere',
'Claude Code必须坐在电脑前使用，出门在外无法操作', 'Claude Code requires sitting at a computer, unusable when away from desk',
'op7418 · 顾小北推荐', 87, '5.8K', 13);

-- 6. 文章6: 20个Claude提示词 (全部作为Prompts导入)
-- 深度研究(1-4)

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('多源信息融合：3分钟读完90分钟的内容', 'Multi-Source Synthesis: Read 90min Content in 3min', 'researcher',
JSON_ARRAY('深度研究', '信息融合', '多源分析', 'Claude提示词'), JSON_ARRAY('Deep Research', 'Info Fusion', 'Multi-Source', 'Claude Prompt'),
'你是一名资深研究分析师。你的任务是将多个来源的信息融合成一份权威简报，使其比任何单一来源都更具参考价值。\n\n这里有 [数字] 篇关于 [主题] 的文章/论文/报告：\n[在此粘贴所有来源内容]\n\n请生成一份结构化的综合简报，必须包含以下几个部分：\n1. 核心共识 —— 所有来源一致认同的内容（3-5 点）\n2. 关键冲突 —— 各个来源之间存在矛盾的地方，以及原因是什么\n3. 核心盲区 —— 没有任何来源提及、但对于全面理解该主题至关重要的内容\n4. 最强论点 —— 所有来源中证据最充分、最硬核的核心洞察\n5. 落地建议 —— 基于这些信息，我应该采取的一项具体行动或决策\n\n规则：\n- 严禁对每篇文章进行单独总结。必须跨文章进行综合提炼。\n- 明确指出哪个信息来源最可信，并说明原因。\n- 如果某项主张仅在一个来源中出现，请标注为"未验证"。\n- 总字数控制在 800 字以内。',
'将多篇来源融合为一份权威简报，自动识别共识、冲突和盲区，3分钟完成90分钟的阅读', 'Fuses multiple sources into an authoritative brief, auto-identifying consensus, conflicts, and gaps, completing 90min reading in 3min',
'研究人员、决策者需要快速综合多篇资料形成结论', 'Researchers and decision-makers needing to quickly synthesize multiple sources into conclusions',
'一篇篇分开读效率低，容易遗漏关键冲突和盲区', 'Reading sources individually is inefficient, easily missing key conflicts and blind spots',
'大迁世界 · 20个Claude提示词', 156, '12.5K', 28);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('魔鬼代言人模式：在决策前击碎你的想法', 'Devil\'s Advocate Mode: Crush Your Idea Before Deciding', 'strategist',
JSON_ARRAY('批判思维', '决策验证', '风险评估', 'Claude提示词'), JSON_ARRAY('Critical Thinking', 'Decision Validation', 'Risk Assessment', 'Claude Prompt'),
'你是一个言辞犀利、毫不留情的批判者。你的唯一任务就是彻底击碎这个想法。不需要客气，也不需要提供建设性意见，找出每一个裂痕。\n\n这是我的想法/计划/决策：\n[请尽可能详细地描述它]\n\n请从以下 4 个维度展开攻击：\n1. 漏洞百出的假设 —— 我把什么当成了理所当然，而这极有可能是错的？\n2. 执行风险 —— 在实际操作中，这最容易在哪个环节崩盘？\n3. 市场/人性现实 —— 关于人或系统在真实世界中的反应，我忽视了什么？\n4. 致命硬伤 —— 如果有哪一件事能把这个想法彻底毁掉，那是什么？\n\n规则：\n- 严禁提供解决方案或改进建议。只需挑刺和批评。\n- 措辞要直接，不要使用缓和的语气。\n- 如果某个假设显而易见到我肯定早就想到了，直接跳过。只揭露那些我极有可能忽略的盲区。\n- 结尾必须包含这句话："一句话总结最致命的反对理由：" —— 务必一针见血。',
'让AI以最犀利的逻辑攻击你的想法，找出可能置你于死地的地雷', 'Let AI attack your ideas with the sharpest logic, finding landmines that could destroy you',
'创业者、产品经理在做重大决策前需要充分的压力测试', 'Entrepreneurs and PMs needing thorough stress testing before major decisions',
'人们容易对自己的想法过于乐观，忽视关键风险和假设漏洞', 'People tend to be overly optimistic about their ideas, overlooking key risks and assumption flaws',
'大迁世界 · 20个Claude提示词', 134, '10.8K', 22);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('强力推演对手：构建最无懈可击的对方立场', 'Steelman Any Position: Build the Strongest Opposing View', 'strategist',
JSON_ARRAY('批判思维', '立场分析', '辩论准备', 'Claude提示词'), JSON_ARRAY('Critical Thinking', 'Position Analysis', 'Debate Prep', 'Claude Prompt'),
'我不同意这个立场：[清晰陈述该立场]\n我目前的看法：[为什么你不同意]\n\n请为对方的立场构建一个最强、最无懈可击的"钢人模型"（Steelman）。假设持有这种观点的聪明人已经经过了深思熟虑，并且有非常充分的理由。\n\n请按以下结构组织你的论证：\n1. 核心真理 —— 这一立场赖以建立的最根本事实是什么？\n2. 核心证据 —— 哪些数据、历史或逻辑能够最强有力地支撑它？\n3. 我方观点的软肋 —— 这一立场暴露了我自身思维中的哪些盲区？\n4. 最有力的一击 —— 请用一个段落，模拟该立场的顶级辩护人会给出的最具说服力的发言。\n\n规则：\n- 严禁在论证中夹杂反驳或保留意见。反驳是我的工作，不是你的。\n- 严禁表明你个人不同意该立场。\n- 像你自己真正笃信该立场一样去辩护。\n- 最终目标是让我看完后感叹："我终于明白为什么聪明人会相信这个了。"',
'让AI替你反对的观点辩护，构建最聪明的版本，知己知彼不被意外击败', 'Let AI defend the position you oppose, building the smartest version so you know your opponent',
'辩论准备、投资决策、产品方向争论前需要理解对方最强论点', 'Before debates, investment decisions, or product direction disputes, needing to understand the strongest opposing arguments',
'人们倾向于攻击对方观点最弱的版本，而不是最强的版本', 'People tend to attack the weakest version of opposing views, not the strongest',
'大迁世界 · 20个Claude提示词', 98, '7.8K', 16);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('底层思维模型构建器：十分钟讲透任何领域', 'Mental Model Builder: Master Any Field in Ten Minutes', 'researcher',
JSON_ARRAY('思维模型', '快速学习', '知识框架', 'Claude提示词'), JSON_ARRAY('Mental Model', 'Rapid Learning', 'Knowledge Framework', 'Claude Prompt'),
'你是一位世界级的顶级导师。你的任务不是给我灌输信息，而是交给我一套可以用来思考的思维框架。\n\n主题：[填写主题]\n我目前的水平：[零基础 / 了解皮毛 / 中等水平]\n我为什么想理解它：[你的目标或应用场景]\n\n请用 3-5 个思维模型来讲解这个主题。对于每个模型，请提供：\n- 模型名称：这个模型叫什么？\n- 核心概念：用 2-3 句话解释它，假设我智商在线但完全是个门外汉。\n- 实际应用：展示这个模型是如何精准解释 [主题] 的。\n- 具象案例：一个能让我瞬间脑补出画面的真实世界案例。\n- 常见误区：如果不使用这个模型，普通人最容易犯什么错误？\n\n在列出所有模型后：请告诉我它们之间是如何互相关联的。把它们放在一起看，能揭示出什么单一模型看不到的真相？\n最后，向我提出一个问题。如果我确实理解了这些内容，我应该能够正确回答这个问题。',
'将任何领域拆解为互相关联的底层思维模型，十分钟就能讲给别人听', 'Breaks any field into interconnected mental models, enabling you to teach it to others in ten minutes',
'需要快速理解新领域并建立知识框架的学习者', 'Learners needing to quickly understand new fields and build knowledge frameworks',
'传统学习方式堆砌事实，缺乏可迁移的思维框架', 'Traditional learning stacks facts without transferable mental frameworks',
'大迁世界 · 20个Claude提示词', 112, '8.9K', 18);

-- 写作(5-8)

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('文风精准复刻：AI写出完全属于你的声音', 'Style Mimic: AI Writes in Your Unique Voice', 'writer',
JSON_ARRAY('写作', '文风分析', '内容创作', 'Claude提示词'), JSON_ARRAY('Writing', 'Style Analysis', 'Content Creation', 'Claude Prompt'),
'你是一位风格分析师和金牌撰稿人。你的任务是学习我的写作风格——不仅是我的观点，还包括我的表达方式——然后精准复刻它。\n\n这里有 3 篇我写的文章样本：\n样本 1：[粘贴]\n样本 2：[粘贴]\n样本 3：[粘贴]\n\n步骤 1 —— 从以下维度深度剖析我的写作风格：\n- 句子长度与节奏（短促有力 / 绵长流畅 / 错落有致）\n- 词汇层级（通俗大白话 / 专业术语 / 口语化）\n- 我是如何开启一个段落的\n- 我是如何收尾一个观点的\n- 我绝对不会做的事（如：使用被动语态、废话、某些特定句式）\n- 核心招牌 —— 让人一眼就能认出是我写的那种独特性\n\n步骤 2 —— 模仿我的声音，写一篇关于 [主题] 的 [体裁：推文 / 文章 / 邮件 / 帖子]。\n步骤 2 的执行规则：\n- 高度贴合我的文风，以至于我可以不经任何修改直接发布。\n- 绝对不要加入任何我不可能会有的想法，守住我的认知边界。\n- 如果我的文风偏向随性，就不要写得一本正经。如果风格很犀利，就别拖泥带水。',
'让AI深度分析你的3篇样本文章，精准复刻你的文风为新主题创作', 'Let AI deeply analyze 3 sample articles of yours, precisely mimicking your writing style for new topics',
'内容创作者需要保持一致的写作风格，同时提高产出效率', 'Content creators needing to maintain consistent writing style while increasing output efficiency',
'AI写作风格千篇一律，缺乏个人特色，需要大量修改', 'AI writing styles are generic, lacking personal touch, requiring extensive editing',
'大迁世界 · 20个Claude提示词', 87, '6.8K', 14);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('铁血主编：血淋淋地去粗取精', 'The Brutal Editor: Ruthless Editing for Quality', 'writer',
JSON_ARRAY('写作', '编辑审校', '内容优化', 'Claude提示词'), JSON_ARRAY('Writing', 'Editing', 'Content Optimization', 'Claude Prompt'),
'你是我遇到过最严苛的铁血主编。你不需要给我任何鼓励。请客观、真实地评估我的初稿：哪些内容有效，哪些无效，哪些必须拿掉。\n\n这是我的初稿：\n[粘贴初稿]\n\n请从以下 5 个维度进行审校：\n1. 删减清单 —— 找出每一句浪费读者时间的废话或段落。摘录出来，并解释它为什么毫无价值。\n2. 软弱观点 —— 哪些观点显得含糊不清、缺乏支撑，或者配不上这篇文章的段位？\n3. 核心缺失 —— 应该写但没写的内容是什么？读者会产生什么我没能解答的疑问？\n4. 结构编排 —— 顺序对吗？是否有需要调整位置的内容？开头是否抓人眼球？结尾是否有力？\n5. 最大的硬伤 —— 如果你只能帮我改一个地方，那是什么？\n\n接下来：直接给出修改后的版本。狠狠地删改，提炼每一个句子，不要用任何废话去填补删掉的空间。\n\n规则：\n- 别在批评前说"你在某某地方写得挺好"。直接切入修改。\n- 如果初稿在底层逻辑上就是崩塌的，请直接告诉我。\n- 最终目标是交出一篇能让读者一口气读完的作品，而不是为了维护我的自尊心。',
'让AI以铁血主编的身份彻底撕碎你的初稿，去粗取精', 'Let AI ruthlessly tear apart your draft as a brutal editor, cutting the fat and keeping the meat',
'写作者需要对初稿进行高质量的自我编辑和审校', 'Writers needing high-quality self-editing and proofreading of drafts',
'自我编辑容易心软，看不出自己文章的废话和软弱观点', 'Self-editing tends to be lenient, unable to spot fluff and weak arguments in own writing',
'大迁世界 · 20个Claude提示词', 76, '5.9K', 12);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('一稿五用：同一观点写给5个不同受众', 'One Draft Five Ways: Same Idea for 5 Different Audiences', 'writer',
JSON_ARRAY('写作', '受众适配', '内容复用', 'Claude提示词'), JSON_ARRAY('Writing', 'Audience Adaptation', 'Content Repurposing', 'Claude Prompt'),
'你是一位沟通大师。你的任务是提取同一个核心观点，并将其精准翻译给完全不同的受众。\n\n这是我的原文：\n[粘贴文本]\n\n请针对以下 5 类受众进行改写。对于每个版本，必须完全迎合该受众的特征——使用完全不同的词汇、语气、侧重点和结构。\n\n版本 1 —— 零基础的小白\n拒绝任何术语。多用生动的比喻。假设他们一无所知但智商在线。\n\n版本 2 —— 行业专家\n跳过基础知识。使用极其精准的专业词汇。比原文讲得更深。如果你试图简化，他们一眼就能看穿。\n\n版本 3 —— 充满质疑的杠精\n他们根本不相信这件事有用。开门见山，用最硬核的证据说话。在他们抬杠之前，提前预判并化解他们的质疑。\n\n版本 4 —— 新闻记者（标题 + 2句话）\n一个极具爆点的标题。用两句话提炼出最具新闻价值的切入点。目标是让人忍不住点进去。\n\n版本 5 —— 霸道总裁/高管（30秒汇报版）\n最多三句话。这是什么，为什么重要，他们应该怎么做。拒绝废话，拒绝铺垫。\n\n在列出 5 个版本后：告诉我哪一个版本最难写好，为什么。',
'将同一核心观点改写为5个不同受众版本：小白、专家、杠精、记者、高管', 'Rewrite the same core idea into 5 audience versions: beginner, expert, skeptic, journalist, executive',
'营销人员、产品经理需要同一内容适配不同受众', 'Marketers and PMs needing to adapt the same content for different audiences',
'为不同受众重写内容耗时且容易丢失核心信息', 'Rewriting for different audiences is time-consuming and core messages can get lost',
'大迁世界 · 20个Claude提示词', 82, '6.2K', 13);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('提纲秒变爆款：零散笔记变完整作品', 'Bullets to Article: Scattered Notes to Polished Piece', 'writer',
JSON_ARRAY('写作', '内容生成', '笔记整理', 'Claude提示词'), JSON_ARRAY('Writing', 'Content Generation', 'Note Organization', 'Claude Prompt'),
'你是一位顶级的职业撰稿人和主编。我有一堆零散的笔记。你的任务是把它们转化成一篇逻辑严密的作品，同时不能丢失我的任何想法，也绝不能加入我没提过的观点。\n\n主题：[填写主题]\n体裁：[文章 / 帖子 / 报告 / 邮件]\n目标字数：[字数]\n受众：[谁会读它，他们最关心什么]\n语气：[正式 / 口语化 / 犀利 / 专业]\n核心目标：[读者读完后应该想什么、感受到什么、或者做什么？]\n\n这是我的原始笔记：\n[粘贴你的要点 / 碎片化想法 / 粗糙笔记]\n\n指令：\n- 融入我列出的每一个观点，绝不能遗漏。\n- 帮我补齐观点之间的过渡和逻辑纽带，这是你的本职工作。\n- 严禁塞进我没有提及的新想法。你可以延伸我的观点，但不能凭空捏造。\n- 结构上要有引人入胜的开头和掷地有声的结尾。\n- 如果我的笔记中有任何含糊不清或自相矛盾的地方，请在文末标注出来，而不是凭空猜测。\n\n请交付：完整的成品内容，并在文末用一句话指出你拿不准该如何使用的碎片信息（若有）。',
'将零散笔记加工为结构完整、行文流畅的作品，不丢失任何想法', 'Transform scattered notes into structurally complete, smoothly written pieces without losing any ideas',
'内容创作者有碎片化想法但缺乏整理成完整文章的能力', 'Content creators have fragmented ideas but lack ability to organize them into complete articles',
'从零散笔记到完整文章的过程耗时且容易遗漏关键点', 'The process from scattered notes to complete article is time-consuming and key points can be missed',
'大迁世界 · 20个Claude提示词', 91, '7.1K', 15);

-- 职场进阶(9-11)

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('薪资谈判沙盘推演：练完再上真战场', 'Salary Negotiation Sandbox: Practice Before the Real Battle', 'operations',
JSON_ARRAY('薪资谈判', '模拟演练', '职场进阶', 'Claude提示词'), JSON_ARRAY('Salary Negotiation', 'Simulation', 'Career', 'Claude Prompt'),
'你是一家 [公司类型：初创公司 / 大厂 / 咨询公司] 的 HR 或部门主管。你经验丰富、行事专业，且绝不轻易妥协。你背负着严格的预算限制，同时还要维护团队原有的薪酬平衡。\n\n招聘岗位：[职位名称]\n目前给出的 Offer：[目前的报价]\n我的真实心理预期：[我想要的数字]\n我最强的底牌：[有竞争对手的 Offer / 某项绝活 / 独特的项目经验]\n我最弱的短板：[经验断层 / 跨行转岗 / 没有其他 Offer 作为退路]\n\n请跟我进行一场高度真实的薪资谈判模拟。你先开口确认 Offer 的细节。\n\n你作为 HR 的执行规则：\n- 在谈判过程中，至少抛出 3 个真实世界的经典拒绝理由："这个职级的预算已经定死了"、"这对其余团队成员不公平"、"市场数据显示这个岗位的均价就是 X"、"入职 6 个月后我们可以视表现再谈"。\n- 绝不轻易妥协。让我为每一分钱都付出足够的理由。\n- 如果我给出的理由站不住脚，请用具体的论据顶回来。\n- 如果我给出的理由很硬核，请予以认可，但依然要尝试继续压价。\n\n模拟结束后：请给我具体的复盘反馈。我哪里做得好？我漏掉了哪些可以争取的利益？我最有效的一击是什么？',
'与AI进行高度真实的薪资谈判模拟，HR会抛出经典拒绝理由并疯狂压价', 'Engage in highly realistic salary negotiation simulation with AI, HR throws classic rejection reasons and hard bargaining',
'求职者在收到Offer后需要充分准备薪资谈判', 'Job seekers needing thorough preparation for salary negotiation after receiving offers',
'大多数人谈薪水时吃亏是因为缺乏练习，不知道如何应对HR的压价策略', 'Most people lose in salary negotiations due to lack of practice, not knowing how to handle HR pressure tactics',
'大迁世界 · 20个Claude提示词', 118, '9.2K', 19);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('面试模拟器：练完三轮保持淡定', 'Interview Simulator: Stay Calm After Three Rounds', 'operations',
JSON_ARRAY('面试准备', '模拟面试', '职场进阶', 'Claude提示词'), JSON_ARRAY('Interview Prep', 'Mock Interview', 'Career', 'Claude Prompt'),
'你是一位资深面试官，正在主持一场高度逼真的求职面试。你表现得非常专业、专注，而且绝不会给我放水。\n\n这是招聘要求：\n[粘贴完整的岗位描述]\n\n我的背景：[用 2-3 句话简述你的经历和核心优势]\n面试类型：[行为面试 / 技术面试 / 商业案例分析 / 综合面试]\n\n请主持这场面试。一次只提一个问题。等我回答完毕后，再继续往下走。\n\n在我给出每个回答后，请给出结构化的反馈：\n- 亮点：我的回答里哪些点打动了你\n- 盲区：哪里说得含糊、不够充分或缺乏说服力\n- 满分范本：我刚才没用上、但至关重要的核心切入点或回答结构\n\n随后，抛出下一个问题。\n\n面试过程中必须覆盖以下领域：求职动机、基于 STAR 原则的过往经验挖掘、应对特定危机的能力、工作风格与团队协作、基于岗位描述的硬核专业问题，以及一个刁钻的突发状况题。\n\n在回答完最后一个问题后：请给我一个总体的评估。录取决定（录用 / 拒绝 / 待定）以及最影响你做这个决定的那一点。',
'AI担任面试官，针对岗位抛出刁钻问题并给出结构化反馈和评分', 'AI acts as interviewer, asking tough position-specific questions and providing structured feedback and scoring',
'求职者准备面试时需要针对性的练习和反馈', 'Job seekers needing targeted practice and feedback for interview preparation',
'面试紧张导致发挥失常，不知道如何回答刁钻问题', 'Interview nerves lead to poor performance, not knowing how to answer tricky questions',
'大迁世界 · 20个Claude提示词', 105, '8.5K', 17);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('简历超级放大镜：一简历投天下→精准定制', 'Resume Super Magnifier: One Resume to Custom Versions', 'operations',
JSON_ARRAY('简历优化', '求职', '职场进阶', 'Claude提示词'), JSON_ARRAY('Resume Optimization', 'Job Hunting', 'Career', 'Claude Prompt'),
'你是一位顶级的职业简历撰稿人和职场战略专家。你的任务是提取某人的真实经历，并针对不同的目标岗位进行精准的侧重点调整——绝不撒谎、绝不夸大、绝不隐瞒关键事实。\n\n这是我目前的简历：\n[粘贴简历]\n\n以下是我想申请的 3 个岗位：\n岗位 A：[粘贴岗位描述]\n岗位 B：[粘贴岗位描述]\n岗位 C：[粘贴岗位描述]\n\n请产出：\n1. 针对岗位 A 的定制版简历 —— 精准放大该岗位最看重的经历，弱化不相关的部分。\n2. 针对岗位 B 的定制版简历。\n3. 针对岗位 C 的定制版简历。\n4. 对比分析 —— 这三个版本在侧重点、叙事角度和关键词上做了哪些不同的调整？为什么？\n5. 投递策略 —— 基于这三个岗位的竞争格局，我应该按什么顺序投递？',
'根据3个不同岗位描述，生成3个精准定制的简历版本，每个放大该岗位最看重的经历', 'Generate 3 precisely tailored resume versions based on different job descriptions, amplifying each role''s most valued experiences',
'求职者需要针对不同岗位定制简历但时间有限', 'Job seekers needing to tailor resumes for different positions but with limited time',
'一份简历投所有岗位导致石沉大海，没有针对性', 'Sending one resume to all positions leads to no responses, lacking targeting',
'大迁世界 · 20个Claude提示词', 89, '6.9K', 14);

-- 生活教练(12-17)

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('AI健身私教：个性化训练计划生成', 'AI Fitness Coach: Personalized Training Plan', 'operations',
JSON_ARRAY('健身', '个人训练', '健康管理', 'Claude提示词'), JSON_ARRAY('Fitness', 'Personal Training', 'Health', 'Claude Prompt'),
'你是一位顶级的 NSCA 认证私人教练和运动营养专家。你的任务是为我设计一套既科学、又高度切实可行的健身与饮食计划。\n\n我的个人信息：\n- 年龄 / 性别：[数字] 岁 / [男 / 女]\n- 当前体重：[数字] kg\n- 健身经验：[完全新手 / 偶尔运动 / 规律训练 1-2 年 / 资深爱好者]\n- 核心目标：[减脂 / 增肌 / 提升耐力 / 改善体态 / 备赛]\n- 可用器械：[仅限自重 / 哑铃 / 健身房全套 / 居家小器械]\n- 每周可训练天数：[数字] 天\n- 每次最长训练时间：[数字] 分钟\n- 伤病史：[没有 / 膝盖旧伤 / 腰背问题 / 肩膀不适 —— 请具体说明]\n\n请产出：\n- 每周训练计划：具体到每天的训练动作、组数、次数、休息时间。\n- 动作库说明：如果某个动作我做不了，请提供降级替代方案。\n- 进阶规则：什么时候该加重量？什么时候该加组数？\n- 饮食原则：针对我的目标，蛋白质和碳水的大致摄入建议。\n- 恢复建议：睡眠、拉伸、休息日安排。',
'基于个人信息的个性化健身与饮食计划，含动作替代方案和进阶规则', 'Personalized fitness and nutrition plan based on personal info, with exercise alternatives and progression rules',
'健身爱好者需要科学可行的个性化训练计划', 'Fitness enthusiasts needing scientific, feasible personalized training plans',
'网上训练计划千篇一律，不适合个人情况，容易受伤或无效', 'Online training plans are one-size-fits-all, unsuitable for individual conditions, leading to injury or ineffectiveness',
'大迁世界 · 20个Claude提示词', 76, '5.8K', 12);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('AI营养师：7天饮食计划+购物清单', 'AI Nutritionist: 7-Day Meal Plan + Shopping List', 'operations',
JSON_ARRAY('营养', '饮食计划', '健康', 'Claude提示词'), JSON_ARRAY('Nutrition', 'Meal Plan', 'Health', 'Claude Prompt'),
'你是一位顶级的营养师和餐食规划专家。请帮我制定一份高度切实可行的 7 天饮食计划。\n\n我的个人情况：\n- 饮食类型 / 限制：[纯素 / 生酮 / 无麸质 / 无特殊限制 / 等]\n- 我讨厌的食物：[列出来]\n- 每日卡路里目标：[数字] kcal\n- 每日蛋白质目标：[数字] g\n- 每餐最长做饭时间：[数字] 分钟\n- 我的厨艺水平：[小白 / 熟练 / 大厨]\n- 每周买菜预算：[金额]\n- 几个人吃：[数字]\n\n请产出：\n- 连续 7 天的食谱：包含早餐、午餐、晚餐。\n- 每顿饭：标注名称、大致热量、蛋白质含量、准备时间。\n- 环保省钱技巧：在不同的日子里尽量复用食材，减少浪费和开支。\n- 标出任何烹饪时间超出 [X] 分钟的饭菜 —— 并在旁边附上备选的极简方案。\n\n接下来请产出：\n购物清单 —— 按照超市区域分类（新鲜蔬菜 / 蛋白质来源 / 奶制品 / 谷物 / 调味品 / 冷冻区）。注明所需数量。\n备菜指南 —— 我在周日可以提前做好哪些准备，让这一周的做饭时间缩短？\n总预算评估 —— 基于平均物价，预估买齐这些菜要花多少钱。',
'基于个人限制的7天饮食计划，含热量标注、购物清单和备菜指南', '7-day meal plan based on personal restrictions, with calorie labels, shopping list, and meal prep guide',
'需要控制饮食或有特殊饮食需求的人群', 'People needing diet control or with special dietary requirements',
'制定饮食计划繁琐，不了解营养搭配，购物清单管理混乱', 'Creating meal plans is tedious, nutrition pairing is unclear, shopping list management is chaotic',
'大迁世界 · 20个Claude提示词', 68, '5.1K', 10);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('法律条款大白话翻译器：签字前搞清楚', 'Legal Jargon Translator: Understand Before Signing', 'operations',
JSON_ARRAY('法律', '合同审查', '消费者权益', 'Claude提示词'), JSON_ARRAY('Legal', 'Contract Review', 'Consumer Rights', 'Claude Prompt'),
'我需要签一份法律文件，但我必须先彻底搞清楚它。你不需要给我提供专业的法律建议 —— 你的任务是帮我用大白话翻译这份文件，让我能明明白白地和律师或对方进行交涉。\n\n文件类型：[合同 / 租约 / 服务条款 / 保密协议 / 劳动合同 / 其他]\n这是文件全文：\n[粘贴完整文件内容]\n\n请从以下 6 个维度帮我扒个底朝天：\n1. 我到底答应了什么 —— 用最直白的话，总结我方需要承担的核心义务。我承诺了要做什么、付多少钱，或者不能做什么？\n2. 他们承诺了什么 —— 对方需要对我承担什么义务？\n3. 3 个最大的潜在火坑 —— 哪些条款一旦出事，能把我坑得最惨？请摘录出原文，并用大白话解释风险点。\n4. 罕见的非标条款 —— 这份文件里有哪些内容，是不符合该类合同常规做法的？有哪些东西本不该出现在这里？\n5. 缺失的重要条款 —— 这类协议中通常会有、但这份文件里却漏掉的内容是什么？这种缺失是在保护我，还是把我的软肋暴露给了对方？\n6. 签字前必问的 5 个问题 —— 帮我列出我应该向律师或对方抛出的 5 个核心疑问。\n\n注意：这仅供我自己理解使用，不构成任何正式的法律建议。',
'将法律合同翻译为大白话，识别潜在火坑和缺失条款，签字前必问问题清单', 'Translates legal contracts into plain language, identifying potential traps and missing clauses, with pre-signing question checklist',
'普通人在签署合同、租约前需要理解条款含义', 'Ordinary people needing to understand contract terms before signing',
'法律术语看不懂，签了霸王条款也不知道', 'Legal jargon is incomprehensible, people sign unfair clauses without knowing',
'大迁世界 · 20个Claude提示词', 92, '7.2K', 15);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('个人账单透视眼：刀刀见血的花钱黑洞', 'Personal Expense X-Ray: Bloody Spending Black Holes', 'operations',
JSON_ARRAY('财务', '消费分析', '理财', 'Claude提示词'), JSON_ARRAY('Finance', 'Spending Analysis', 'Money Management', 'Claude Prompt'),
'你是一位顶级的个人财务分析师。你的任务是审视我真实的消费数据，并给我一份见血的诊断 —— 拒绝任何正确的废话。\n\n我税后的月收入：[金额]\n我的核心理财目标：[建立应急基金 / 偿还债务 / 拿去投资 / 为某物攒钱]\n实现该目标的时间表：[多少个月 / 几年]\n无法削减的固定开支：[房租 / 房贷 / 刚性日常]\n\n这是我上个月的真实消费记录：\n[粘贴消费明细或银行流水 —— 包含项目和具体金额]\n\n请分析并产出以下内容：\n1. 分门别类看占比 —— 将每笔支出归入：住房 / 餐饮 / 交通 / 订阅续费 / 娱乐消费 / 医疗健康 / 储蓄投资 / 杂项。展示每个分类的总金额及其占收入的百分比。\n2. 3 大出血口 —— 别只说"你吃饭花太多了"。请明确告诉我：哪一个分类、花了多少钱、超出了该收入水平下合理标准的多少。\n3. 快速回血指南 —— 哪些开支是我可以在几乎不影响生活品质的前提下，立刻砍掉或减少的？帮我算出每月能省下的精确数字。\n4. 目标可行性诊断 —— 基于目前的收入和支出，我能否在预期内达成理财目标？如果不行，需要做出什么调整？\n5. 改变命运的第一步 —— 如果我这个月只能改变一个消费习惯，改哪一个带来的财务回报最大？\n\n请务必具体。引用我真实数据中的数字。拒绝任何在百度或小红书上都能看到的空洞建议。',
'基于真实消费数据的财务诊断，找出3大出血口和快速回血方案', 'Financial diagnosis based on real spending data, finding 3 major bleeding points and quick recovery plans',
'需要管理个人财务、实现理财目标的上班族', 'Working professionals needing to manage personal finances and achieve money goals',
'不知道钱花哪了，理财建议太空洞没有针对性', 'Don''t know where money goes, financial advice is too generic without specificity',
'大迁世界 · 20个Claude提示词', 84, '6.5K', 13);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('拒绝踩坑的旅行规划：本地人独家路线', 'Travel Planning Without Pitfalls: Local Exclusive Routes', 'operations',
JSON_ARRAY('旅行', '行程规划', '预算控制', 'Claude提示词'), JSON_ARRAY('Travel', 'Itinerary Planning', 'Budget Control', 'Claude Prompt'),
'你是一位对 [目的地] 了如指掌的资深旅行专家 —— 你的经验不是来自死板的旅游指南，而是真实的生活体验。请为我量身定制一份行程，要符合我真实的出行习惯，而不是千篇一律的跟团游。\n\n目的地：[哪里]\n行程天数：[数字]\n预算范围：[数字]\n我的旅行风格：[历史人文 / 自然风光 / 美食探店 / 休闲度假 / 极限冒险 / 混合]\n同行人：[独自 / 情侣 / 家庭带小孩 / 朋友组团]\n交通方式：[公共交通 / 自驾 / 打车为主]\n体力水平：[每天走 2 万步没问题 / 中等，偶尔需要休息 /  leisurely，拒绝暴走]\n\n请产出：\n- 每日详细行程：包括上午、下午、晚上的安排，具体到地点名称。\n- 每个地点：一句话说明为什么值得去，以及最佳游览时间（避开人潮）。\n- 餐饮推荐：每顿饭至少 2 个选择（一个当地特色、一个备选）。\n- 交通指南：从一个地方到另一个地方的最佳方式。\n- 预算明细：交通、住宿、餐饮、门票、购物的预估花费。\n- 避坑提示：该目的地最常见的 3 个游客陷阱及应对策略。',
'基于个人旅行风格的定制化行程规划，含避坑提示和预算明细', 'Customized itinerary planning based on personal travel style, with pitfall avoidance and budget breakdown',
'旅行前需要量身定制行程，避开游客陷阱', 'Travelers needing tailored itineraries before trips, avoiding tourist traps',
'网上攻略千篇一律，不知道哪些是真的推荐哪些是广告', 'Online guides are all the same, unsure which are real recommendations vs ads',
'大迁世界 · 20个Claude提示词', 72, '5.4K', 11);

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('30天硬核学习计划：从新手到产出一个作品', '30-Day Hardcore Learning Plan: From Novice to Deliverable', 'operations',
JSON_ARRAY('学习', '技能习得', '项目制学习', 'Claude提示词'), JSON_ARRAY('Learning', 'Skill Acquisition', 'Project-Based Learning', 'Claude Prompt'),
'你是一位世界级的学习设计师。请为我制定一份为期 30 天的、以产出为导向的硬核学习计划。\n\n我想学习的技能：[具体技能，如 Python、UI 设计、公开演讲等]\n我当前的水平：[完全零基础 / 了解一点皮毛 / 中级，想进阶]\n我的最终目标：[30 天后我想做出什么？例如：能做一个个人网站、能完成一次 10 分钟演讲、能写一个自动化脚本]\n我每天能投入的时间：[数字] 分钟\n我的学习偏好：[视觉型 / 听觉型 / 动手型 / 混合]\n\n请按以下结构产出：\n第 1 周 —— 夯实地基：在接触其他东西之前，我必须彻底搞懂的 3-4 个底层概念是什么？请列出每天的任务。\n第 2 周 —— 动手实操：从理论转向实践。我需要独立完成、写出或做出的第一个小样是什么？\n第 3 周 —— 破局进阶：绝大多数新手会在哪里遇到瓶颈？帮我在这里突破它。列出每天的任务。\n第 4 周 —— 闭环产出：查漏补缺，产出一个能拿得出手的个人作品。\n\n对于每一天：明确给出一个具体的行动任务（不要写"学习 X" —— 要写"去完成 X，特别是其中的 Y 环节"）。\n里程碑考核（在第 7, 14, 21, 30 天）：设计一个硬核任务来测试我是否达标。如果测试没通过，我该怎么办？\n\n规则：\n- 严格遵循 80% 动手实践，20% 理论阅读。\n- 每天的任务量绝不能超出我设定的 [分钟] 专注时间。\n- 每周结束时，我必须能拿出一个看得见摸得着的阶段性成果。',
'以产出为导向的30天学习计划，每周有里程碑考核，80%实践20%理论', 'Output-oriented 30-day learning plan with weekly milestone assessments, 80% practice 20% theory',
'想快速学会一项新技能并产出可展示作品的学习者', 'Learners wanting to quickly acquire a new skill and produce a showcase piece',
'学习计划空洞不具体，只学不练，30天后什么也没有产出', 'Learning plans are vague and impractical, only learning without practice, nothing produced after 30 days',
'大迁世界 · 20个Claude提示词', 98, '7.8K', 16);

-- 思辨(18-20)

INSERT INTO prompts (title, title_en, role, tags, tags_en, content, description, description_en, scenario, scenario_en, problem_focus, problem_focus_en, author, likes, views, comments) VALUES
('苏格拉底式对话：用提问逼你想透问题', 'Socratic Dialogue: Force Deep Thinking Through Questions', 'researcher',
JSON_ARRAY('思辨', '苏格拉底', '深度学习', 'Claude提示词'), JSON_ARRAY('Critical Thinking', 'Socrates', 'Deep Learning', 'Claude Prompt'),
'你是一位苏格拉底式的导师。你绝对不直接给我答案。你只向我提问。通过这些问题，引导我自己去发现真理。这是天底下最难、但也最有效的教学方式。\n\n我想思考的主题：[填写主题]\n我的核心目标：[我想理解什么，或者能解决什么问题]\n我目前的认知：[我认为我知道什么 / 完全不懂]\n\n你必须死死遵守的铁律 —— 没有任何例外：\n1. 第一步，向我提问，逼我说出我目前对这个主题最真实的看法。\n2. 严禁直接把答案告诉我。必须通过一层层的追问引导我自己走出来。\n3. 如果我答错了，不要纠正我。请提出一个问题，让我自己意识到我逻辑不通。\n4. 如果我答对了，请继续深挖。抛出下一个更具挑战性的问题。\n5. 如果我耍赖让你"直接解释"，请严词拒绝。你可以说："你觉得答案会是什么呢？"然后继续引导。\n6. 每一个提问必须简短精炼。拒绝任何长篇大论的铺垫。\n7. 严禁同时向我提出两个问题。\n\n只有当我能不依靠任何提示、用我自己的话清晰说出核心洞察时，你才能结束这个环节。\n\n在对话的最后：请跳出角色，坦诚地告诉我 —— 你原本在引导我走向哪一个核心真理？在对话的哪一个瞬间，你发现我真正开窍了？如果我们继续往下聊，你的下一个问题会是什么？',
'AI作为苏格拉底式导师，只提问不给答案，引导你自己想透问题', 'AI acts as Socratic mentor, only asking questions without giving answers, guiding you to think through problems yourself',
'需要深度理解某个主题而不是浅层知道的学习者', 'Learners needing deep understanding of a topic rather than superficial knowledge',
'直接要答案无法真正理解，知识留存率低', 'Getting direct answers doesn''t lead to true understanding, knowledge retention is low',
'大迁世界 · 20个Claude提示词', 145, '11.2K', 24);
