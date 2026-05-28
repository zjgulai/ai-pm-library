import { Outlet, useLocation, Link } from 'react-router'
import { useState, useEffect, useMemo } from 'react'
import {
  MessageSquare, Terminal, GitBranch, Puzzle, Bot, Github,
  Menu, X, ChevronRight
} from 'lucide-react'
import { getAllCounts } from '@/data/dataUtils'

function useNavCounts() {
  const counts = useMemo(() => getAllCounts(), [])
  return counts
}

const NAV_BASE = [
  { path: '/', label: '首页', icon: ChevronRight, exact: true },
  { path: '/prompts', label: '提示词', icon: MessageSquare, color: 'var(--cat-prompt)', countKey: 'prompt' as const },
  { path: '/skills', label: '技能', icon: Terminal, color: 'var(--cat-skill)', countKey: 'skill' as const },
  { path: '/hooks', label: '钩子', icon: GitBranch, color: 'var(--cat-hook)', countKey: 'hook' as const },
  { path: '/mcp', label: 'MCP', icon: Puzzle, color: 'var(--cat-mcp)', countKey: 'mcp' as const },
  { path: '/agents', label: '智能体', icon: Bot, color: 'var(--cat-agent)', countKey: 'agent' as const },
  { path: '/github', label: '开源', icon: Github, color: 'var(--cat-github)', countKey: 'github' as const },
]

export default function Layout() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const counts = useNavCounts()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false) // eslint-disable-line react-hooks/set-state-in-effect
    window.scrollTo(0, 0)
  }, [location.pathname])

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path
    return location.pathname.startsWith(path) && path !== '/'
  }

  const NAV = useMemo(() => NAV_BASE.map(item => ({
    ...item,
    count: 'countKey' in item ? counts[item.countKey!] : undefined,
  })), [counts])

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Navigation */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(253,252,250,0.92)' : 'rgba(253,252,250,0.6)',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        }}
      >
        <div className="page-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                style={{ background: 'var(--accent-primary)' }}
              >
                <span className="text-white text-sm font-bold">灵</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                  灵词
                </span>
                <span className="text-[9px] font-medium leading-tight tracking-wider" style={{ color: 'var(--text-quaternary)' }}>
                  PROMPTFORGE
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((item) => {
                const active = isActive(item.path, item.exact)
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-250"
                    style={{
                      color: active ? (item.color || 'var(--accent-primary)') : 'var(--text-tertiary)',
                      background: active ? (item.color ? item.color + '10' : 'var(--accent-primary-ghost)') : 'transparent',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {'count' in item && item.count !== undefined && (
                      <span
                        className="text-[10px] px-1 py-0 rounded-full font-semibold"
                        style={{
                          background: active ? (item.color + '20') : 'var(--mo-200)',
                          color: active ? item.color : 'var(--text-quaternary)',
                        }}
                      >
                        {item.count}
                      </span>
                    )}
                    {active && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                        style={{ background: item.color || 'var(--accent-primary)' }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: 'var(--text-secondary)' }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="page-container py-3 flex flex-col gap-1">
              {NAV.map((item) => {
                const active = isActive(item.path, item.exact)
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      color: active ? (item.color || 'var(--accent-primary)') : 'var(--text-secondary)',
                      background: active ? (item.color ? item.color + '8' : 'var(--accent-primary-ghost)') : 'transparent',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.count !== undefined && (
                      <span className="text-xs" style={{ color: 'var(--text-quaternary)' }}>
                        {item.count}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--mo-100)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="page-container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent-primary)' }}
              >
                <span className="text-white text-sm font-bold">灵</span>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  灵词 PromptForge
                </p>
                <p className="text-xs" style={{ color: 'var(--text-quaternary)' }}>
                  提示词与技能的锻造工坊
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {NAV.filter(n => n.path !== '/').map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-xs transition-colors hover:text-[var(--accent-primary)]"
                  style={{ color: 'var(--text-quaternary)' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="text-[11px]" style={{ color: 'var(--text-quaternary)' }}>
              &copy; 2025 PromptForge. 保留所有权利。
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
