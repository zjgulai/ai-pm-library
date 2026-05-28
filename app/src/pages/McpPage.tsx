import { Puzzle } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CardGrid from '@/components/CardGrid'
import { getItemsByCategory, CATEGORY_META } from '@/data/dataUtils'

export default function McpPage() {
  const meta = CATEGORY_META.mcp
  const items = getItemsByCategory('mcp')

  return (
    <div>
      <PageHero {...meta} title={meta.label} description={meta.desc} count={items.length} icon={Puzzle} />
      <CardGrid items={items} color={meta.color} categoryLabel="MCP" />
    </div>
  )
}
