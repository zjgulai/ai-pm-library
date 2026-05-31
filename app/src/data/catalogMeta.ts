export type Category = 'prompt' | 'skill' | 'hook' | 'mcp' | 'agent' | 'github'

export const CATEGORY_COUNTS: Record<Category, number> = {
  prompt: 193,
  skill: 306,
  hook: 72,
  mcp: 72,
  agent: 73,
  github: 87,
}

export function getAllCounts(): Record<Category, number> {
  return { ...CATEGORY_COUNTS }
}

export const CATEGORY_META: Record<Category, { label: string; subtitle: string; color: string; colorLight: string; desc: string }> = {
  prompt: { label: '提示词', subtitle: 'Prompts', color: 'var(--cat-prompt)', colorLight: '#C84B3115', desc: '经过验证的提示词模板，覆盖创作、产品、开发等14个职业角色' },
  skill: { label: '技能', subtitle: 'Skills', color: 'var(--cat-skill)', colorLight: '#4A6FA515', desc: '职业场景技能库，从Claude Code到跨境电商的全域覆盖' },
  hook: { label: '钩子', subtitle: 'Hooks', color: 'var(--cat-hook)', colorLight: '#7C529515', desc: '事件驱动的自动化工作流，让AI自己管理自己' },
  mcp: { label: 'MCP', subtitle: 'Model Context Protocol', color: 'var(--cat-mcp)', colorLight: '#2E8B8B15', desc: '模型上下文协议工具，连接AI与外部世界' },
  agent: { label: '智能体', subtitle: 'AI Agents', color: 'var(--cat-agent)', colorLight: '#5B8C5A15', desc: 'AI Agent框架与编排，从单智能体到多智能体协作' },
  github: { label: '开源', subtitle: 'Open Source', color: 'var(--cat-github)', colorLight: '#8A6E4B15', desc: '精选开源项目与工具，站在巨人的肩膀上' },
}

export const ROLE_LABELS: Record<string, string> = {
  all: '全部', creator: '创作者', productManager: '产品经理', developer: '开发者',
  growth: '增长', founder: '创始人', strategist: '策略', operations: '运营',
  dataScientist: '数据', writer: '写作者', researcher: '研究', sales: '销售',
  ecommerce: '跨境电商', claude: 'Claude Code', claudeCode: 'Claude Code',
  prompt: '提示词', skill: '技能', hook: '钩子', mcp: 'MCP', agent: '智能体', github: '开源',
}
