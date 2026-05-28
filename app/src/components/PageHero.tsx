import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

interface PageHeroProps {
  title: string
  subtitle: string
  description: string
  color: string
  icon: LucideIcon
  count: number
}

export default function PageHero({ title, subtitle, description, color, icon: Icon, count }: PageHeroProps) {
  const [animatedCount, setAnimatedCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Animate counter
  useEffect(() => {
    if (!visible) return
    const duration = 800
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedCount(Math.round(eased * count))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, count])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: color + '06' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(${color}15 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />

      <div className="page-container relative pt-10 pb-8">
        <div className="flex items-start gap-4 mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500"
            style={{
              background: color + '12',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.8)',
            }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <h1
              className="text-2xl font-bold mb-1 transition-all duration-500"
              style={{
                color: 'var(--text-primary)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              {title}
            </h1>
            <p
              className="text-sm font-medium transition-all duration-500 delay-75"
              style={{
                color,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        <div
          className="flex items-center gap-4 flex-wrap"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.5s ease 150ms',
          }}
        >
          <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>{description}</p>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold"
            style={{
              background: color + '10',
              color,
              border: `1px solid ${color}15`,
            }}
          >
            <span className="text-[14px] tabular-nums">{animatedCount}</span>
            <span>条精选内容</span>
          </span>
        </div>
      </div>
    </section>
  )
}
