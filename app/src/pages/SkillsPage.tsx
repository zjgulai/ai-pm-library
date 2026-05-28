import { Terminal } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CardGrid from '@/components/CardGrid'
import { getItemsByCategory, CATEGORY_META } from '@/data/dataUtils'

export default function SkillsPage() {
  const meta = CATEGORY_META.skill
  const items = getItemsByCategory('skill')

  return (
    <div>
      <PageHero {...meta} title={meta.label} description={meta.desc} count={items.length} icon={Terminal} />
      <CardGrid items={items} color={meta.color} categoryLabel="技能" />
    </div>
  )
}
