import { useEffect, useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CardGrid from '@/components/CardGrid'
import { CATEGORY_COUNTS, CATEGORY_META, type Category } from '@/data/catalogMeta'
import { loadItemsByCategory, type Item } from '@/data/catalogItems'

type LoadState =
  | { status: 'loading'; items: Item[]; error?: undefined }
  | { status: 'ready'; items: Item[]; error?: undefined }
  | { status: 'error'; items: Item[]; error: string }

interface CategoryPageProps {
  category: Category
  categoryLabel: string
  icon: LucideIcon
  children?: ReactNode
}

export default function CategoryPage({ category, categoryLabel, icon, children }: CategoryPageProps) {
  const meta = CATEGORY_META[category]
  const [state, setState] = useState<LoadState>({ status: 'loading', items: [] })

  useEffect(() => {
    let active = true

    loadItemsByCategory(category)
      .then((items) => {
        if (active) setState({ status: 'ready', items })
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            status: 'error',
            items: [],
            error: error instanceof Error ? error.message : 'Catalog request failed',
          })
        }
      })

    return () => { active = false }
  }, [category])

  const count = state.status === 'ready' ? state.items.length : CATEGORY_COUNTS[category]

  return (
    <div>
      <PageHero {...meta} title={meta.label} description={meta.desc} count={count} icon={icon} />
      {children}
      {state.status === 'loading' && (
        <div className="page-container py-16 text-sm" style={{ color: 'var(--text-tertiary)' }}>
          正在加载{categoryLabel}...
        </div>
      )}
      {state.status === 'error' && (
        <div className="page-container py-16 text-sm" style={{ color: 'var(--accent-primary)' }}>
          {state.error}
        </div>
      )}
      {state.status === 'ready' && (
        <CardGrid items={state.items} color={meta.color} categoryLabel={categoryLabel} />
      )}
    </div>
  )
}
