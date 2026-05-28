import { Github } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CardGrid from '@/components/CardGrid'
import { getItemsByCategory, CATEGORY_META } from '@/data/dataUtils'

export default function GithubPage() {
  const meta = CATEGORY_META.github
  const items = getItemsByCategory('github')

  return (
    <div>
      <PageHero {...meta} title={meta.label} description={meta.desc} count={items.length} icon={Github} />
      <CardGrid items={items} color={meta.color} categoryLabel="开源" />
    </div>
  )
}
