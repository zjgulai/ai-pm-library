import { Routes, Route } from 'react-router'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import PromptsPage from '@/pages/PromptsPage'
import SkillsPage from '@/pages/SkillsPage'
import HooksPage from '@/pages/HooksPage'
import McpPage from '@/pages/McpPage'
import AgentsPage from '@/pages/AgentsPage'
import GithubPage from '@/pages/GithubPage'

export default function App() {
  return (
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
  )
}
