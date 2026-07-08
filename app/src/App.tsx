import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'

const PromptsPage = lazy(() => import('@/pages/PromptsPage'))
const SkillsPage = lazy(() => import('@/pages/SkillsPage'))
const HooksPage = lazy(() => import('@/pages/HooksPage'))
const McpPage = lazy(() => import('@/pages/McpPage'))
const AgentsPage = lazy(() => import('@/pages/AgentsPage'))
const GithubPage = lazy(() => import('@/pages/GithubPage'))

function PageFallback() {
  return (
    <div className="page-container py-20 text-sm" style={{ color: 'var(--text-tertiary)' }}>
      加载内容中...
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/hooks" element={<HooksPage />} />
          <Route path="/mcp" element={<McpPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/github" element={<GithubPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
