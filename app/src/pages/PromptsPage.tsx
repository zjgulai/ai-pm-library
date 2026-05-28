import { MessageSquare } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CardGrid from '@/components/CardGrid'
import PromptAnalytics from '@/components/PromptAnalytics'
import { getItemsByCategory, CATEGORY_META } from '@/data/dataUtils'

export default function PromptsPage() {
  const meta = CATEGORY_META.prompt
  const items = getItemsByCategory('prompt')

  return (
    <div>
      <PageHero {...meta} title={meta.label} description={meta.desc} count={items.length} icon={MessageSquare} />

      {/* Analytics Modules */}
      <section className="py-10" style={{ background: 'var(--mo-50)' }}>
        <PromptAnalytics />
      </section>

      {/* Prompt Cards */}
      <div className="pt-8 pb-12">
        <CardGrid items={items} color={meta.color} categoryLabel="提示词" />
      </div>
    </div>
  )
}
