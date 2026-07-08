import { MessageSquare } from 'lucide-react'
import CategoryPage from '@/components/CategoryPage'
import PromptAnalytics from '@/components/PromptAnalytics'

export default function PromptsPage() {
  return (
    <CategoryPage category="prompt" categoryLabel="提示词" icon={MessageSquare}>
      <section className="py-10" style={{ background: 'var(--mo-50)' }}>
        <PromptAnalytics />
      </section>
    </CategoryPage>
  )
}
