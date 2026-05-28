import staticData from './staticData'

export type Category = 'prompt' | 'skill' | 'hook' | 'mcp' | 'agent' | 'github'

export interface Item {
  id: number
  title: string
  titleEn?: string
  role: string
  tags: string[]
  tagsEn?: string[]
  content: string
  description: string
  descriptionEn?: string
  scenario: string
  scenarioEn?: string
  problemFocus: string
  problemFocusEn?: string
  author: string
  likes: number
  views: string
  comments: number
  category?: string
  createdAt?: string
}

function normalizeTags(tags: unknown): string[] {
  if (!tags) return []
  if (typeof tags === 'string') {
    try { return JSON.parse(tags) } catch { return [tags] }
  }
  if (Array.isArray(tags)) return tags.filter((t): t is string => typeof t === 'string')
  return []
}

function camelizeKeys(obj: Record<string, unknown>): Item {
  const map: Record<string, string> = {
    title_en: 'titleEn', tags_en: 'tagsEn', description_en: 'descriptionEn',
    scenario_en: 'scenarioEn', problem_focus: 'problemFocus',
    problem_focus_en: 'problemFocusEn', created_at: 'createdAt',
  }
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    out[map[k] || k] = v
  }
  out.tags = normalizeTags(out.tags)
  out.tagsEn = normalizeTags(out.tagsEn)
  return out as unknown as Item
}

export function getItemsByCategory(category: Category): Item[] {
  if (category === 'prompt') {
    return (staticData.prompts_full || []).map(camelizeKeys)
  }
  return (staticData.skills_full || [])
    .filter((s: Record<string, unknown>) => s.category === category)
    .map(camelizeKeys)
}

export function getAllCounts(): Record<Category, number> {
  return {
    prompt: (staticData.prompts_full || []).length,
    skill: (staticData.skills_full || []).filter((s: Record<string, unknown>) => s.category === 'skill').length,
    hook: (staticData.skills_full || []).filter((s: Record<string, unknown>) => s.category === 'hook').length,
    mcp: (staticData.skills_full || []).filter((s: Record<string, unknown>) => s.category === 'mcp').length,
    agent: (staticData.skills_full || []).filter((s: Record<string, unknown>) => s.category === 'agent').length,
    github: (staticData.skills_full || []).filter((s: Record<string, unknown>) => s.category === 'github').length,
  }
}

export function getRoleCounts(items: Item[]): Record<string, number> {
  const counts: Record<string, number> = { all: items.length }
  for (const item of items) {
    counts[item.role] = (counts[item.role] || 0) + 1
  }
  return counts
}

export function filterItems(items: Item[], search: string, role: string): Item[] {
  let result = items
  if (role && role !== 'all') {
    result = result.filter(i => i.role === role)
  }
  if (search.trim()) {
    const q = search.toLowerCase()
    result = result.filter(i =>
      i.title.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.scenario.toLowerCase().includes(q) ||
      i.tags.some(t => t.toLowerCase().includes(q)) ||
      i.content.toLowerCase().includes(q)
    )
  }
  return result
}

export function getUniqueTags(items: Item[]): string[] {
  const tagSet = new Set<string>()
  for (const item of items) {
    for (const tag of item.tags) tagSet.add(tag)
  }
  return Array.from(tagSet).sort()
}

export const CATEGORY_META: Record<Category, { label: string; subtitle: string; color: string; colorLight: string; desc: string }> = {
  prompt: { label: '提示词', subtitle: 'Prompts', color: 'var(--cat-prompt)', colorLight: '#C84B3115', desc: '经过验证的提示词模板，覆盖创作、产品、开发等12个职业场景' },
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
