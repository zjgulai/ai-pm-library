import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  MessageSquare, Terminal, GitBranch, Puzzle, Bot, Github,
  ArrowRight, Sparkles, BookOpen, Compass, Flame
} from 'lucide-react'
import { getAllCounts, CATEGORY_META } from '@/data/dataUtils'
import type { Category } from '@/data/dataUtils'

const CATS: { key: Category; icon: typeof MessageSquare; stat: string; statLabel: string }[] = [
  { key: 'prompt', icon: MessageSquare, stat: '123', statLabel: '覆盖12个职业场景' },
  { key: 'skill', icon: Terminal, stat: '236', statLabel: '从Claude Code到跨境电商' },
  { key: 'hook', icon: GitBranch, stat: '2', statLabel: '事件驱动自动化' },
  { key: 'mcp', icon: Puzzle, stat: '2', statLabel: '模型上下文协议' },
  { key: 'agent', icon: Bot, stat: '3', statLabel: 'AI智能体框架' },
  { key: 'github', icon: Github, stat: '17', statLabel: '精选开源项目' },
]

const FEATURES = [
  { icon: BookOpen, title: '深度分类', desc: '六维体系覆盖提示词、技能、钩子、MCP、智能体、开源' },
  { icon: Sparkles, title: '即用即取', desc: '每条内容都包含完整的使用说明和场景描述' },
  { icon: Compass, title: '持续进化', desc: '基于达尔文进化论，内容库持续迭代优化' },
  { icon: Flame, title: '社区精选', desc: '汇聚全网优质AI资源，经过人工筛选和整理' },
]

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1200, 1)
          const e = 1 - Math.pow(1 - p, 3)
          setDisplay(Math.round(e * value))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>
}

export default function HomePage() {
  const counts = getAllCounts()
  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20" style={{ background: 'linear-gradient(180deg, #FFF 0%, var(--mo-50) 100%)' }}>
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--mo-800) 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        {/* Decorative orbs */}
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, var(--zhu-sha-500), transparent 70%)' }}
        />
        <div className="absolute bottom-10 left-[5%] w-48 h-48 rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, var(--dai-lan), transparent 70%)' }}
        />

        <div className="page-container relative">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'var(--accent-primary-ghost)', color: 'var(--accent-primary)', border: '1px solid var(--zhu-sha-200)' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              提示词与技能的锻造工坊
            </div>
          </div>

          {/* Main heading */}
          <div className="text-center mb-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-5" style={{ color: 'var(--text-primary)', wordBreak: 'keep-all' }}>
              灵词
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              六维分类体系的AI知识库 — 提示词、技能、钩子、MCP、智能体、开源
            </p>
          </div>

          {/* Stats bar */}
          <div className="flex justify-center mb-14">
            <div className="flex items-center gap-6 px-8 py-3 rounded-2xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-2)' }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}><AnimatedCounter value={total} /></div>
                <div className="text-[11px]" style={{ color: 'var(--text-quaternary)' }}>总条目</div>
              </div>
              <div className="w-px h-8" style={{ background: 'var(--border-subtle)' }} />
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--cat-skill)' }}><AnimatedCounter value={6} /></div>
                <div className="text-[11px]" style={{ color: 'var(--text-quaternary)' }}>分类</div>
              </div>
              <div className="w-px h-8" style={{ background: 'var(--border-subtle)' }} />
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--cat-agent)' }}><AnimatedCounter value={14} /></div>
                <div className="text-[11px]" style={{ color: 'var(--text-quaternary)' }}>角色</div>
              </div>
            </div>
          </div>

          {/* Six-dimension matrix */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATS.map(({ key, icon: Icon, statLabel }) => {
              const meta = CATEGORY_META[key]
              return (
                <Link
                  key={key}
                  to={`/${key === 'prompt' ? 'prompts' : key}`}
                  className="group relative rounded-2xl p-5 transition-all duration-300"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--shadow-1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = meta.color + '40'
                    e.currentTarget.style.boxShadow = `0 8px 24px ${meta.color}10`
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-1)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: meta.color + '12' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: meta.color }} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{meta.label}</h3>
                      <span className="text-[10px]" style={{ color: 'var(--text-quaternary)' }}>{meta.subtitle}</span>
                    </div>
                  </div>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{meta.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: meta.color }}>{counts[key]}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-quaternary)' }}>{statLabel}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" style={{ color: meta.color }} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)', wordBreak: 'keep-all' }}>为什么选择灵词</h2>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>为中文用户精心打造的AI知识库</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="text-center p-6 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'var(--accent-primary-ghost)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                </div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="page-container text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)', wordBreak: 'keep-all' }}>
            开始探索
          </h2>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'var(--text-tertiary)' }}>
            选择一个分类，发现经过精心筛选和整理的AI提示词与技能
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CATS.map(({ key }) => {
              const meta = CATEGORY_META[key]
              return (
                <Link
                  key={key}
                  to={`/${key === 'prompt' ? 'prompts' : key}`}
                  className="btn-zh px-5 py-2.5 text-sm"
                  style={{ background: meta.color + '10', color: meta.color, border: `1px solid ${meta.color}25` }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = meta.color
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = meta.color + '10'
                    e.currentTarget.style.color = meta.color
                  }}
                >
                  {meta.label}
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
