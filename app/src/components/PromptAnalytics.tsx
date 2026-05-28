import { useState, useRef, useEffect, useMemo } from 'react'
import {
  Brain, Layers, ChevronDown, ChevronUp, Lightbulb,
  UserCog, FileOutput, LayoutGrid, BookOpen,
  Award, Copy, Check, Sparkles, ArrowRight, Zap,
  Shield, Cpu, Palette
} from 'lucide-react'
import {
  TOP188_WORDS, TOP10_ARCHITECTURES,
  STATEMENT_CATEGORIES, CATEGORY_COLORS
} from '@/data/promptAnalytics'

const CATEGORY_ICON: Record<string, typeof Brain> = {
  role: UserCog,
  output: FileOutput,
  model: Brain,
  framework: LayoutGrid,
  thinking: Lightbulb,
  advanced: Cpu,
  defense: Shield,
  creative: Palette,
}

// ============================================================
// 统计卡片
// ============================================================
function StatCard({ icon: Icon, label, value, color }: {
  icon: typeof Brain; label: string; value: string; color: string
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: color + '08', border: `1px solid ${color}15` }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: color + '12' }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div>
        <div className="text-lg font-bold leading-tight" style={{ color }}>{value}</div>
        <div className="text-[11px]" style={{ color: 'var(--text-quaternary)' }}>{label}</div>
      </div>
    </div>
  )
}

// ============================================================
// 模块一：高频调教语句TOP188
// ============================================================
function Top188Statements() {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [expandedRank, setExpandedRank] = useState<number | null>(null)
  const [copiedRank, setCopiedRank] = useState<number | null>(null)
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setAnimated(true); obs.disconnect() }
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const filtered = useMemo(() =>
    activeTab === 'all' ? TOP188_WORDS : TOP188_WORDS.filter(w => w.category === activeTab),
    [activeTab]
  )

  const currentCat = STATEMENT_CATEGORIES.find(c => c.key === activeTab)

  const handleCopy = (text: string, rank: number) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopiedRank(rank)
    setTimeout(() => setCopiedRank(null), 2000)
  }

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--cat-prompt)' + '12' }}>
          <BookOpen className="w-5 h-5" style={{ color: 'var(--cat-prompt)' }} />
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            高频调教语句 TOP188
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-quaternary)' }}>
            从7大来源萃取的方法论级调教语句：173个提示词 + Anthropic/OpenAI官方指南 + 前沿论文 + 创意方法论
          </p>
        </div>
      </div>

      {/* Category Tabs - horizontal scroll */}
      <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {STATEMENT_CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => { setActiveTab(cat.key); setExpandedRank(null) }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap shrink-0"
            style={{
              background: activeTab === cat.key ? cat.color + '12' : 'transparent',
              color: activeTab === cat.key ? cat.color : 'var(--text-quaternary)',
              border: activeTab === cat.key ? `1px solid ${cat.color}25` : '1px solid transparent',
            }}
          >
            {cat.label}
            <span className="text-[10px] px-1 py-0 rounded-full" style={{ background: activeTab === cat.key ? cat.color + '15' : 'var(--mo-100)' }}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Category Description */}
      {currentCat && currentCat.key !== 'all' && (
        <div className="mb-4 px-3 py-2 rounded-lg text-[12px]" style={{ background: currentCat.color + '06', border: `1px solid ${currentCat.color}12`, color: currentCat.color }}>
          {currentCat.desc}
        </div>
      )}

      {/* Statement List */}
      <div className="space-y-1.5 max-h-[650px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
        {filtered.map((item, idx) => {
          const isExpanded = expandedRank === item.rank
          const color = CATEGORY_COLORS[item.category] || '#C84B31'
          const Icon = CATEGORY_ICON[item.category] || Brain
          const delay = animated ? Math.min(idx * 15, 500) : 0

          return (
            <div
              key={item.rank}
              className="rounded-xl overflow-hidden transition-all"
              style={{
                background: isExpanded ? color + '06' : 'var(--bg-card)',
                border: `1px solid ${isExpanded ? color + '20' : 'var(--border-subtle)'}`,
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateY(0)' : 'translateY(6px)',
                transition: `all 0.3s ease ${delay}ms`,
              }}
            >
              {/* Collapsed Row */}
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setExpandedRank(isExpanded ? null : item.rank)}
              >
                {/* Rank */}
                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: color + '10' }}>
                  {item.rank <= 3 ? (
                    <Award className="w-4 h-4" style={{ color }} />
                  ) : (
                    <span className="text-[11px] font-bold" style={{ color }}>{item.rank}</span>
                  )}
                </div>

                {/* Category Icon */}
                <div className="w-6 h-6 rounded flex items-center justify-center shrink-0" style={{ background: color + '08' }}>
                  <Icon className="w-3 h-3" style={{ color }} />
                </div>

                {/* Statement */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {item.statement}
                  </p>
                </div>

                {/* Usage Badge */}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0" style={{ background: color + '10', color }}>
                  {item.usage}
                </span>

                {isExpanded
                  ? <ChevronUp className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-quaternary)' }} />
                  : <ChevronDown className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-quaternary)' }} />
                }
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="px-3 pb-3 pl-[52px]" style={{ borderTop: `1px solid ${color}08` }}>
                  <p className="text-[12px] leading-relaxed mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    {item.desc}
                  </p>
                  <div className="flex items-start gap-2 mb-2 px-2.5 py-2 rounded-lg" style={{ background: color + '06' }}>
                    <Sparkles className="w-3 h-3 mt-0.5 shrink-0" style={{ color }} />
                    <div>
                      <span className="text-[10px] font-medium" style={{ color }}>示例：</span>
                      <span className="text-[11px] ml-1" style={{ color: 'var(--text-secondary)' }}>{item.example}</span>
                    </div>
                  </div>
                  <div className="relative rounded-lg p-2.5" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-medium" style={{ color: '#6b7aa1' }}>模板</span>
                      <button
                        onClick={() => handleCopy(item.template, item.rank)}
                        className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded transition-all"
                        style={{ color: copiedRank === item.rank ? '#4ade80' : '#6b7aa1' }}
                      >
                        {copiedRank === item.rank ? <><Check className="w-2.5 h-2.5" /> 已复制</> : <><Copy className="w-2.5 h-2.5" /> 复制</>}
                      </button>
                    </div>
                    <p className="text-[11px] leading-relaxed font-mono" style={{ color: '#a8b4d0' }}>{item.template}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================
// 模块二：高质量架构TOP10
// ============================================================
function Top10Architecture() {
  const [expandedRank, setExpandedRank] = useState<number | null>(1)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setAnimated(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleCopy = (template: string, index: number) => {
    navigator.clipboard.writeText(template.replace(/\\n/g, '\n')).catch(() => {})
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div ref={ref}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--cat-skill)' + '12' }}>
          <Layers className="w-5 h-5" style={{ color: 'var(--cat-skill)' }} />
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            提示词高质量架构 TOP10
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-quaternary)' }}>
            分析173个提示词的结构模式，萃取10大高效编写范式
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {TOP10_ARCHITECTURES.map((arch, idx) => {
          const isExpanded = expandedRank === arch.rank
          const delay = animated ? idx * 80 : 0
          const scoreColor = arch.score >= 90 ? '#C84B31' : arch.score >= 85 ? '#4A6FA5' : '#7C5295'

          return (
            <div
              key={arch.rank}
              className="rounded-xl overflow-hidden transition-all"
              style={{
                background: isExpanded ? scoreColor + '06' : 'var(--bg-card)',
                border: `1px solid ${isExpanded ? scoreColor + '20' : 'var(--border-subtle)'}`,
                boxShadow: isExpanded ? `0 4px 16px ${scoreColor}08` : 'var(--shadow-1)',
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateY(0)' : 'translateY(12px)',
                transition: `all 0.5s ease ${delay}ms`,
              }}
            >
              <div className="flex items-center gap-3 px-4 py-3 cursor-pointer" onClick={() => setExpandedRank(isExpanded ? null : arch.rank)}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: scoreColor + '12' }}>
                  <span className="text-[13px] font-bold" style={{ color: scoreColor }}>{arch.rank}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{arch.name}</span>
                    <span className="text-[10px] font-mono truncate" style={{ color: 'var(--text-quaternary)' }}>{arch.nameEn}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[10px]" style={{ color: 'var(--text-quaternary)' }}>频次 {arch.frequency} · 渗透率 {arch.penetration}</span>
                    <span className="text-[11px] font-semibold" style={{ color: scoreColor }}>{arch.score}分</span>
                  </div>
                </div>
                {isExpanded
                  ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: 'var(--text-quaternary)' }} />
                  : <ChevronDown className="w-4 h-4 shrink-0" style={{ color: 'var(--text-quaternary)' }} />
                }
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t" style={{ borderColor: scoreColor + '10' }}>
                  <div className="mt-3 mb-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Zap className="w-3.5 h-3.5" style={{ color: scoreColor }} />
                      <span className="text-[11px] font-medium" style={{ color: scoreColor }}>核心结构</span>
                    </div>
                    <div className="flex items-center flex-wrap gap-1">
                      {arch.structure.split(' -> ').map((step, i, arr) => (
                        <div key={i} className="flex items-center gap-1">
                          <span className="text-[11px] px-2 py-1 rounded-md font-medium" style={{ background: scoreColor + '10', color: scoreColor, border: `1px solid ${scoreColor}15` }}>{step}</span>
                          {i < arr.length - 1 && <ArrowRight className="w-3 h-3 shrink-0" style={{ color: 'var(--text-quaternary)' }} />}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {arch.features.map(f => (
                      <span key={f} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: scoreColor + '08', color: scoreColor, border: `1px solid ${scoreColor}12` }}>{f}</span>
                    ))}
                  </div>
                  <div className="rounded-lg p-3 relative" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-medium" style={{ color: '#6b7aa1' }}>模板示例</span>
                      <button onClick={() => handleCopy(arch.template, idx)} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded transition-all" style={{ color: copiedIndex === idx ? '#4ade80' : '#6b7aa1' }}>
                        {copiedIndex === idx ? <><Check className="w-3 h-3" /> 已复制</> : <><Copy className="w-3 h-3" /> 复制</>}
                      </button>
                    </div>
                    <pre className="text-[11px] leading-relaxed whitespace-pre-wrap font-mono" style={{ color: '#a8b4d0' }}>{arch.template.replace(/\\n/g, '\n')}</pre>
                  </div>
                  <div className="mt-3 text-[11px]">
                    <span style={{ color: 'var(--text-quaternary)' }}>适用场景：</span>
                    <span style={{ color: 'var(--text-tertiary)' }}>{arch.bestFor}</span>
                  </div>
                  <div className="text-[11px] mt-1">
                    <span style={{ color: 'var(--text-quaternary)' }}>典型案例：</span>
                    <span style={{ color: 'var(--text-tertiary)' }}>{arch.example}</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================
// 主组件
// ============================================================
export default function PromptAnalytics() {
  const [activeModule, setActiveModule] = useState<'statements' | 'architecture'>('statements')

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--cat-prompt)' + '10' }}>
            <Lightbulb className="w-4 h-4" style={{ color: 'var(--cat-prompt)' }} />
          </div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>提示词方法论洞察</h2>
        </div>
        <p className="text-[13px] mb-4" style={{ color: 'var(--text-tertiary)' }}>
          基于173个高质量提示词 + Anthropic/OpenAI官方指南 + 前沿论文，萃取让AI回答更准确的188条调教语句
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={BookOpen} label="方法论级调教语句" value="188" color="var(--cat-prompt)" />
          <StatCard icon={Brain} label="思维模型" value="35" color="var(--cat-agent)" />
          <StatCard icon={Shield} label="防御性工程" value="10" color="#4A7C59" />
          <StatCard icon={Layers} label="架构模式" value="10" color="var(--cat-hook)" />
        </div>

        {/* Source tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {['173个提示词深度分析', 'Anthropic官方指南', 'OpenAI最佳实践', 'COSTAR/RTF框架', 'ToT/ReAct/Reflexion', '防御性提示工程', '创意方法论'].map(src => (
            <span key={src} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--mo-100)', color: 'var(--text-quaternary)', border: '1px solid var(--border-subtle)' }}>{src}</span>
          ))}
        </div>
      </div>

      {/* Module Switcher */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveModule('statements')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all"
          style={{
            background: activeModule === 'statements' ? 'var(--cat-prompt)' + '10' : 'var(--bg-card)',
            color: activeModule === 'statements' ? 'var(--cat-prompt)' : 'var(--text-tertiary)',
            border: activeModule === 'statements' ? `1px solid var(--cat-prompt)20` : '1px solid var(--border-subtle)',
            boxShadow: activeModule === 'statements' ? 'var(--shadow-2)' : 'none',
          }}
        >
          <BookOpen className="w-4 h-4" />
          调教语句TOP188
        </button>
        <button
          onClick={() => setActiveModule('architecture')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all"
          style={{
            background: activeModule === 'architecture' ? 'var(--cat-skill)' + '10' : 'var(--bg-card)',
            color: activeModule === 'architecture' ? 'var(--cat-skill)' : 'var(--text-tertiary)',
            border: activeModule === 'architecture' ? `1px solid var(--cat-skill)20` : '1px solid var(--border-subtle)',
            boxShadow: activeModule === 'architecture' ? 'var(--shadow-2)' : 'none',
          }}
        >
          <Layers className="w-4 h-4" />
          架构TOP10
        </button>
      </div>

      {/* Content */}
      <div className="pb-8">
        {activeModule === 'statements' ? <Top188Statements /> : <Top10Architecture />}
      </div>
    </div>
  )
}
