import { Bot } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CardGrid from '@/components/CardGrid'
import CatalogLoadState from '@/components/CatalogLoadState'
import { useCatalogItems } from '@/data/catalogHooks'
import { CATEGORY_META } from '@/data/dataUtils'

export default function AgentsPage() {
  const meta = CATEGORY_META.agent
  const { items, loading, error } = useCatalogItems('agent')

  return (
    <div>
      <PageHero {...meta} title={meta.label} description={meta.desc} count={items.length} icon={Bot} />
      {loading || error
        ? <CatalogLoadState color={meta.color} error={error} />
        : <CardGrid items={items} color={meta.color} categoryLabel="智能体" />}
    </div>
  )
}
