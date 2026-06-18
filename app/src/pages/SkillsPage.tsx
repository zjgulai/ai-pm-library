import { Terminal } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CardGrid from '@/components/CardGrid'
import CatalogLoadState from '@/components/CatalogLoadState'
import { useCatalogItems } from '@/data/catalogHooks'
import { CATEGORY_META } from '@/data/dataUtils'

export default function SkillsPage() {
  const meta = CATEGORY_META.skill
  const { items, loading, error } = useCatalogItems('skill')

  return (
    <div>
      <PageHero {...meta} title={meta.label} description={meta.desc} count={items.length} icon={Terminal} />
      {loading || error
        ? <CatalogLoadState color={meta.color} error={error} />
        : <CardGrid items={items} color={meta.color} categoryLabel="技能" />}
    </div>
  )
}
