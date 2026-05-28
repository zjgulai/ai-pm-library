import { Bot } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CardGrid from '@/components/CardGrid'
import { getItemsByCategory, CATEGORY_META } from '@/data/dataUtils'

export default function AgentsPage() {
  const meta = CATEGORY_META.agent
  const items = getItemsByCategory('agent')

  return (
    <div>
      <PageHero {...meta} title={meta.label} description={meta.desc} count={items.length} icon={Bot} />
      <CardGrid items={items} color={meta.color} categoryLabel="智能体" />
    </div>
  )
}
