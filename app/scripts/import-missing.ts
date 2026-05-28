import { getDb } from "../api/queries/connection";
import { skills } from "../db/schema";

async function importMissing() {
  const db = getDb();

  const missing = [
    // 文章正文提到但未归档: slide-generator → make-slide
    {
      title: "make-slide：单文件HTML幻灯片生成",
      titleEn: "make-slide: Single-File HTML Slide Deck Generator",
      role: "creator",
      tags: ["PPT生成", "HTML幻灯片", "单文件", "Claude Code", "AI技能"],
      tagsEn: ["PPT Generation", "HTML Slides", "Single File", "Claude Code", "AI Skill"],
      content: `## make-slide 使用指南\n\n### 核心定位\n通用AI skill，让AI coding agent（Claude Code、Gemini CLI、Codex、Cursor等）生成专业的单文件HTML演示文稿。告别每次从零设计，使用预构建的主题模板。\n\n### 核心特性\n- 10种主题：从暗黑极简到活泼 pastel\n- 单HTML输出：无构建步骤，无框架，浏览器直接打开\n- 演讲者备注：内置演讲者模式（按S）\n- PDF导出：Ctrl+P即可打印\n- 全屏切换：按F一键全屏\n- 3种输入模式：仅主题 / 提供内容 / 提供脚本\n- 4种布局：居中、宽屏、分栏、编辑式\n- PPTX导出：同时生成PowerPoint文件\n- 自动图片搜索：从Unsplash自动找图\n- CSS-only图表：柱状图、进度环、KPI卡片\n\n### 安装\n\`\`\`bash\nnpx make-slide init\n\`\`\`\n\n### 追踪来源\nGitHub: https://github.com/Kuneosu/make-slide`,
      description: "通用AI skill生成单文件HTML幻灯片，10种主题、4种布局、支持PPTX导出和自动搜图",
      descriptionEn: "Universal AI skill for single-file HTML slide decks, 10 themes, 4 layouts, PPTX export, auto image search",
      scenario: "需要快速生成精美HTML幻灯片且不想从零设计的用户",
      scenarioEn: "Users needing to quickly generate beautiful HTML slides without designing from scratch",
      problemFocus: "每次生成幻灯片都要从零设计，浪费token且风格不一致",
      problemFocusEn: "Generating slides from scratch every time wastes tokens and produces inconsistent styles",
      author: "Kuneosu · 文章提及",
      likes: 85, views: "6.2K", comments: 11,
    },
    // 文章正文提到但未归档: deck-builder → deck.md
    {
      title: "deck.md：讲故事驱动的幻灯片标准",
      titleEn: "deck.md: Storytelling-Driven Slide Deck Standard",
      role: "creator",
      tags: ["PPT生成", "讲故事", "咨询方法", "开放标准", "Claude Code", "AI技能"],
      tagsEn: ["PPT Generation", "Storytelling", "Consulting", "Open Standard", "Claude Code", "AI Skill"],
      content: `## deck.md 使用指南\n\n### 核心定位\n一个开放标准和agent skill，用于研究、简报和制作精美的幻灯片——根植于讲故事和咨询最佳实践。全程人工在环。\n\n### 核心理念\n不只是生成幻灯片，而是帮你构建一个完整的叙事结构。从研究到简报再到制作，每一步都有最佳实践指导。\n\n### 工作流程\n1. **Research（研究）** — 收集和整理内容\n2. **Brief（简报）** — 构建叙事结构\n3. **Produce（制作）** — 生成精美幻灯片\n\n### 关键概念\n- **Pyramid Principle（金字塔原理）**：每页一个洞察，表达为完整句子\n- **Sparkline pattern**：紧张/释放的叙事节奏\n- **Ghost deck test**：仅读标题就能讲完整个故事\n- **Action titles**：每页标题都是结论句而非标签\n\n### 追踪来源\nGitHub: https://github.com/rodrigolourencofarinha/deck.md`,
      description: "讲故事和咨询最佳实践的幻灯片开放标准，基于金字塔原理和Sparkline叙事模式",
      descriptionEn: "Storytelling and consulting best-practice slide deck open standard, based on Pyramid Principle and Sparkline narrative pattern",
      scenario: "需要制作有叙事结构、咨询级别的专业幻灯片",
      scenarioEn: "Needing to create narrative-structured, consulting-grade professional slide decks",
      problemFocus: "幻灯片只是信息堆砌，缺乏叙事结构和说服力",
      problemFocusEn: "Slides are just information堆砌, lacking narrative structure and persuasiveness",
      author: "rodrigolourencofarinha · 文章提及",
      likes: 92, views: "6.8K", comments: 13,
    },
    // 文章PS提到: MiniMax的PPT-generator → MiniMax-AI/pptx-generator
    {
      title: "minimax-pptx-generator：MiniMax官方PPT生成",
      titleEn: "minimax-pptx-generator: MiniMax Official PPT Generation",
      role: "creator",
      tags: ["PPT生成", "MiniMax", "PptxGenJS", "文档生成", "Claude Code", "AI技能"],
      tagsEn: ["PPT Generation", "MiniMax", "PptxGenJS", "Document Generation", "Claude Code", "AI Skill"],
      content: `## minimax-pptx-generator 使用指南\n\n### 核心定位\nMiniMax官方PPT生成skill，用PptxGenJS从零创建和编辑PowerPoint演示文稿。属于MiniMax 11个官方开发skill之一。\n\n### 核心特性\n- 从零创建PPT\n- 编辑现有PPT\n- PptxGenJS驱动\n- 与MiniMax AI CLI集成\n- 支持MiniMax多模态内容（文本、图像、视频、语音）\n\n### MiniMax Skills生态\nMiniMax团队提供了11个开发和文档生成skills：\n- frontend-dev：全栈前端开发\n- fullstack-dev：后端架构\n- android-native-dev：Android原生开发\n- ios-application-dev：iOS开发\n- shader-dev：GLSL着色器开发\n- gif-sticker-maker：GIF贴纸制作\n- minimax-pdf：PDF生成\n- **pptx-generator：PPT生成**\n- minimax-xlsx：Excel处理\n- minimax-docx：DOCX文档\n- minimax-multimodal-toolkit：多模态内容生成\n\n### 追踪来源\nGitHub: https://github.com/MiniMax-AI/skills`,
      description: "MiniMax官方PPT生成skill，PptxGenJS驱动，属于11个MiniMax官方skill之一",
      descriptionEn: "MiniMax official PPT generation skill, PptxGenJS-powered, one of 11 MiniMax official skills",
      scenario: "需要与MiniMax AI生态集成的PPT生成",
      scenarioEn: "Needing PPT generation integrated with MiniMax AI ecosystem",
      problemFocus: "缺乏与MiniMax多模态AI集成的文档生成工具",
      problemFocusEn: "Lacking document generation tools integrated with MiniMax multimodal AI",
      author: "MiniMax-AI · 文章提及",
      likes: 78, views: "5.5K", comments: 9,
    },
    // 额外发现: keynot — 另一个优秀HTML幻灯片skill
    {
      title: "keynot：用HTML终结PowerPoint",
      titleEn: "keynot: Kill PowerPoint with HTML",
      role: "creator",
      tags: ["PPT生成", "HTML幻灯片", "品牌主题", "单文件", "Claude Code", "AI技能"],
      tagsEn: ["PPT Generation", "HTML Slides", "Brand Theme", "Single File", "Claude Code", "AI Skill"],
      content: `## keynot 使用指南\n\n### 核心定位\n一个Claude Code skill，让你告别PowerPoint。说"slides"或"deck"，它就给你一个单HTML文件——键盘导航、滑动、全屏、交错动画、编辑式排版，全部内置。\n\n### 核心特性\n- 导航：方向键、空格、触摸滑动、点击圆点指示器\n- 全屏：按F或点击全屏按钮\n- 交错动画：每页内容依次淡入\n- 品牌主题：CSS变量控制主色/强调色/字体，秒级切换\n- 布局库：分栏、统计列、价值卡片、方案行、照片面板\n- 内嵌资源：字体CDN、图片base64——单文件无断链\n- PDF导出：Cmd+P → 存为PDF，每页一张幻灯片\n\n### 安装\n\`\`\`bash\n/plugin marketplace add shawnzam/keynot\n/plugin install keynot@keynot-marketplace\n\`\`\`\n\n### 追踪来源\nGitHub: https://github.com/shawnzam/keynot`,
      description: "用单HTML文件替代PowerPoint，支持品牌主题、交错动画和PDF导出",
      descriptionEn: "Replace PowerPoint with single HTML files, supporting brand themes, staggered animations, and PDF export",
      scenario: "厌倦了PowerPoint模板限制，想要更轻量的幻灯片方案",
      scenarioEn: "Tired of PowerPoint template limitations, wanting a lighter slide solution",
      problemFocus: "PowerPoint模板僵化、文件臃肿、排版耗时",
      problemFocusEn: "PowerPoint templates are rigid, files are bloated, layout is time-consuming",
      author: "shawnzam · GitHub发现",
      likes: 112, views: "8.1K", comments: 16,
    },
    // 额外发现: pptx-from-layouts-skill — 从markdown生成PPTX
    {
      title: "pptx-from-layouts：Markdown转专业PPT",
      titleEn: "pptx-from-layouts: Markdown to Professional PPT",
      role: "creator",
      tags: ["PPT生成", "Markdown", "模板布局", "python-pptx", "Claude Code", "AI技能"],
      tagsEn: ["PPT Generation", "Markdown", "Template Layouts", "python-pptx", "Claude Code", "AI Skill"],
      content: `## pptx-from-layouts 使用指南\n\n### 核心定位\n用slide master布局（而非覆盖文字）生成PowerPoint。测试了32个PowerPoint生成skill后，这个得分最高（95分）。\n\n### 核心差异\n大多数skill使用"库存/替换"方式——在模板上覆盖文字，这与许多专业模板冲突。pptx-from-layouts使用模板的slide master布局，将内容放在实际占位符中。\n\n### 使用方式\n\`\`\`bash\npython scripts/generate.py outline.md -o presentation.pptx --template your-template.pptx\n\`\`\`\n\n### 追踪来源\nGitHub: https://github.com/tristan-mcinnis/pptx-from-layouts-skill`,
      description: "用slide master布局从Markdown生成专业PPT，测试32个skill中得分最高（95分）",
      descriptionEn: "Generate professional PPT from Markdown using slide master layouts, highest score (95/100) among 32 tested skills",
      scenario: "有现成PPT模板，需要将Markdown内容按模板规范生成幻灯片",
      scenarioEn: "Having existing PPT templates, needing to generate slides from Markdown content following template specs",
      problemFocus: "现有工具与专业PPT模板冲突，排版容易破坏",
      problemFocusEn: "Existing tools conflict with professional PPT templates, layout easily breaks",
      author: "tristan-mcinnis · GitHub发现",
      likes: 95, views: "7.2K", comments: 14,
    },
  ];

  for (const s of missing) {
    await db.insert(skills).values(s);
  }
  console.log(`Inserted ${missing.length} missing skills`);

  // Verify
  const { count } = await import("drizzle-orm");
  const result = await db.select({ count: count() }).from(skills);
  console.log(`Total skills: ${result[0].count}`);
  process.exit(0);
}

importMissing().catch(console.error);
