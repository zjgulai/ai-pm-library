// ============================================================
// 提示词分析数据 - 方法论级高频调教语句TOP188
// 数据来源：173个提示词深度分析 + Anthropic/OpenAI官方指南 +
//           COSTAR/RTF框架 + 前沿论文 + 防御工程 + 创意方法论
// 更新: 2026-05-25
// ============================================================

import data from './promptAnalyticsData.json'

export interface FrequencyWord {
  rank: number
  statement: string
  category: string
  frequency: number
  usage: string
  desc: string
  example: string
  template: string
}

export interface StatementCategory {
  key: string
  label: string
  count: number
  color: string
  desc: string
}

export interface PromptArchitecture {
  rank: number
  name: string
  nameEn: string
  frequency: number
  penetration: string
  score: number
  structure: string
  template: string
  bestFor: string
  example: string
  features: string[]
}

// 188条调教语句
export const TOP188_WORDS: FrequencyWord[] = data.top188 as FrequencyWord[]

// 类别定义
export const STATEMENT_CATEGORIES: StatementCategory[] = data.categories as StatementCategory[]

// 类别颜色映射
export const CATEGORY_COLORS: Record<string, string> = {
  role: '#C84B31',
  output: '#4A6FA5',
  model: '#7C5295',
  framework: '#2E8B8B',
  thinking: '#8A6E4B',
  advanced: '#D4553A',
  defense: '#4A7C59',
  creative: '#9B6EA0',
}

// 类别标签映射
export const CATEGORY_LABELS: Record<string, string> = {
  role: '角色设定',
  output: '输出规格',
  model: '思维模型',
  framework: '分析框架',
  thinking: '思考方式',
  advanced: '高级推理',
  defense: '防御工程',
  creative: '创意激发',
}

// 统计摘要
export const ANALYTICS_SUMMARY = data.summary

// 架构TOP10（保持不变）
export const TOP10_ARCHITECTURES: PromptArchitecture[] = [
  { rank: 1, name: "角色-任务-约束（RTC）", nameEn: "Role-Task-Constraint", frequency: 36, penetration: "20.8%", score: 95, structure: "角色定义 -> 任务描述 -> 约束条件 -> 输出要求", template: "你是一位[专业角色]，拥有[经验/专长]。\n\n请根据以下[主题/问题]，[执行任务]。\n\n## 要求\n- [约束条件1]\n- [约束条件2]\n\n## 输出格式\n[格式要求]", bestFor: "专业咨询、分析诊断、策略制定", example: "荒诞性扫描仪：你是一位外星人类学家...", features: ["角色代入感强", "专业度可控", "输出质量稳定", "适用范围广"] },
  { rank: 2, name: "输入-处理-输出（IPO）", nameEn: "Input-Process-Output", frequency: 147, penetration: "85.0%", score: 92, structure: "输入定义 -> 处理规则 -> 输出规格 -> 示例", template: "## 输入\n[输入变量描述]\n\n## 处理规则\n1. [规则1]\n2. [规则2]\n\n## 输出\n[输出格式和内容要求]\n\n## 示例\n输入：[示例输入]\n输出：[示例输出]", bestFor: "数据转换、内容生成、格式化任务", example: "小红书爆款笔记标题生成器", features: ["模板化程度高", "用户友好", "可复用性强", "误操作率低"] },
  { rank: 3, name: "步骤分解（Stepwise）", nameEn: "Stepwise Decomposition", frequency: 115, penetration: "66.5%", score: 90, structure: "步骤1 -> 步骤2 -> 步骤3 -> ... -> 最终输出", template: "请按照以下步骤完成任务：\n\n### 步骤1：[步骤名称]\n[详细说明]\n\n### 步骤2：[步骤名称]\n[详细说明]\n\n### 步骤3：[步骤名称]\n[详细说明]\n\n### 最终输出\n[整合要求]", bestFor: "流程化任务、多阶段分析、复杂问题拆解", example: "产品需求文档PRD生成助手", features: ["逻辑清晰", "便于跟踪", "容错性好", "易于协作"] },
  { rank: 4, name: "层级标题（Hierarchical）", nameEn: "Hierarchical Headers", frequency: 68, penetration: "39.3%", score: 88, structure: "# 主标题 -> ## 二级 -> ### 三级 -> 内容", template: "# [主题]\n\n## 核心概念\n[概念解释]\n\n## 方法/步骤\n### 方法A\n[详情]\n### 方法B\n[详情]\n\n## 注意事项\n[约束和提醒]", bestFor: "知识整理、报告生成、系统化说明", example: "用户旅程地图绘制指南", features: ["层次分明", "易于导航", "信息密度高", "扩展性好"] },
  { rank: 5, name: "结构化Checklist", nameEn: "Structured Checklist", frequency: 56, penetration: "32.4%", score: 86, structure: "任务描述 -> [ ] 检查项1 -> [ ] 检查项2 -> 完成标准", template: "请完成以下[任务]，并对照检查清单确保质量：\n\n## 任务\n[任务描述]\n\n## 检查清单\n- [ ] [检查项1]\n- [ ] [检查项2]\n- [ ] [检查项3]\n\n## 完成标准\n[通过/不通过的判定标准]", bestFor: "代码审查、质量验收、审计检查", example: "AI辅助代码审查清单", features: ["防遗漏", "标准化", "可追溯", "质量可控"] },
  { rank: 6, name: "示例驱动（Few-Shot）", nameEn: "Example-Driven", frequency: 51, penetration: "29.5%", score: 85, structure: "任务说明 -> 示例1 -> 示例2 -> [可选：反例] -> 输出", template: "请根据以下示例，理解任务模式后完成新任务。\n\n## 任务说明\n[描述]\n\n## 示例1\n输入：[输入A]\n输出：[输出A]\n\n## 示例2\n输入：[输入B]\n输出：[输出B]\n\n## 现在请处理\n输入：[新输入]\n输出：", bestFor: "风格模仿、格式统一、模式学习", example: "文风分析器与编辑审校", features: ["学习成本低", "效果稳定", "风格一致", "无需微调"] },
  { rank: 7, name: "评分-排序（Scoring）", nameEn: "Score & Rank", frequency: 16, penetration: "9.2%", score: 82, structure: "评价维度 -> 评分标准 -> 逐项打分 -> 排序输出", template: "请对以下[项目列表]按照以下维度进行评估和排序：\n\n## 评价维度\n1. [维度1]（权重X%）\n2. [维度2]（权重Y%）\n3. [维度3]（权重Z%）\n\n## 评分标准\n- 5分：[优秀标准]\n- 3分：[合格标准]\n- 1分：[不合格标准]\n\n## 待评估项目\n[项目列表]", bestFor: "方案评估、优先级排序、竞品对比", example: "RICE评分、KPI评估", features: ["量化客观", "可比性强", "决策依据充分", "可复现"] },
  { rank: 8, name: "对比分析（Comparative）", nameEn: "Comparative Analysis", frequency: 13, penetration: "7.5%", score: 80, structure: "对比对象 -> 维度矩阵 -> 优劣势 -> 结论建议", template: "请对[A]和[B]进行全面对比分析。\n\n## 对比维度\n| 维度 | A | B |\n|------|---|---|\n| [维度1] | | |\n| [维度2] | | |\n\n## A的优势\n[优势列表]\n\n## B的优势\n[优势列表]\n\n## 结论建议\n[根据场景的推荐]", bestFor: "方案选型、竞品分析、技术对比", example: "微服务拆分评估框架", features: ["全面客观", "维度清晰", "决策导向", "易于汇报"] },
  { rank: 9, name: "思考链（Chain-of-Thought）", nameEn: "Chain-of-Thought", frequency: 10, penetration: "5.8%", score: 88, structure: "问题 -> 逐步推理 -> 每一步解释 -> 最终结论", template: "请逐步思考以下问题，展示完整的推理过程：\n\n## 问题\n[问题描述]\n\n请按照以下步骤思考：\n1. 首先，分析问题的关键要素...\n2. 然后，考虑可能的方法...\n3. 接着，评估每种方法的优劣...\n4. 最后，得出结论...\n\n注意：在每一步都请说明你的思考依据。", bestFor: "复杂决策、逻辑推理、教学解释", example: "苏格拉底式提问、根因分析", features: ["逻辑透明", "可审计", "错误可追溯", "学习价值高"] },
  { rank: 10, name: "循环迭代（Iterative）", nameEn: "Iterative Refinement", frequency: 8, penetration: "4.6%", score: 78, structure: "初稿 -> 审查 -> 反馈 -> 修订 -> 终稿", template: "我们将通过多轮迭代完成这个任务。\n\n## 第1轮：初稿\n请基于[要求]生成初稿。\n\n## 第2轮：审查\n我将提出修改意见，请记录。\n\n## 第3轮：修订\n请根据反馈修改并说明改动原因。\n\n## 第4轮：终稿\n输出最终版本和变更摘要。", bestFor: "内容精修、方案优化、创作打磨", example: "文风分析与编辑审校", features: ["质量递增", "可控性强", "反馈闭环", "适合协作"] },
]
