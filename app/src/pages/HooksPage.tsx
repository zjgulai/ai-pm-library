import { GitBranch } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CardGrid from '@/components/CardGrid'
import { getItemsByCategory, CATEGORY_META } from '@/data/dataUtils'

export default function HooksPage() {
  const meta = CATEGORY_META.hook
  const items = getItemsByCategory('hook')

  return (
    <div>
      <PageHero {...meta} title={meta.label} description={meta.desc} count={items.length} icon={GitBranch} />
      <CardGrid items={items} color={meta.color} categoryLabel="钩子" />
    </div>
  )
}
