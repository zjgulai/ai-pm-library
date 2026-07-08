import type { Category } from './catalogMeta'

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

const itemCache = new Map<Category, Promise<Item[]>>()

function normalizeTags(tags: unknown): string[] {
  if (!tags) return []
  if (typeof tags === 'string') {
    try { return JSON.parse(tags) } catch { return [tags] }
  }
  if (Array.isArray(tags)) return tags.filter((tag): tag is string => typeof tag === 'string')
  return []
}

function normalizeItem(item: Record<string, unknown>): Item {
  return {
    ...item,
    tags: normalizeTags(item.tags),
    tagsEn: normalizeTags(item.tagsEn ?? item.tags_en),
  } as Item
}

export function loadItemsByCategory(category: Category): Promise<Item[]> {
  const cached = itemCache.get(category)
  if (cached) return cached

  const request = fetch(`${import.meta.env.BASE_URL}catalog/${category}.json`)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Catalog request failed: ${category} ${response.status}`)
      }
      const items = await response.json() as Record<string, unknown>[]
      return items.map(normalizeItem)
    })

  itemCache.set(category, request)
  return request
}
