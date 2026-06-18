import { Puzzle } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CardGrid from '@/components/CardGrid'
import CatalogLoadState from '@/components/CatalogLoadState'
import { useCatalogItems } from '@/data/catalogHooks'
import { CATEGORY_META } from '@/data/dataUtils'

export default function McpPage() {
  const meta = CATEGORY_META.mcp
  const { items, loading, error } = useCatalogItems('mcp')

  return (
    <div>
      <PageHero {...meta} title={meta.label} description={meta.desc} count={items.length} icon={Puzzle} />
      {loading || error
        ? <CatalogLoadState color={meta.color} error={error} />
        : <CardGrid items={items} color={meta.color} categoryLabel="MCP" />}
    </div>
  )
}
