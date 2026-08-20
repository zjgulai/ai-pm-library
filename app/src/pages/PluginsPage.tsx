import { Package } from 'lucide-react'
import CategoryPage from '@/components/CategoryPage'

export default function PluginsPage() {
  return <CategoryPage category="plugin" categoryLabel="插件" icon={Package} />
}
