import staticData from './staticData'
import type { Category } from './catalogMeta'

export type { Category } from './catalogMeta'
export { CATEGORY_META, ROLE_LABELS, getAllCounts } from './catalogMeta'

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
