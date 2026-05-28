import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Copy, Check, Heart, Eye, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'
import type { Item } from '@/data/dataUtils'
import { ROLE_LABELS } from '@/data/dataUtils'
import SearchBar from './SearchBar'

interface CardGridProps {
  items: Item[]
  color: string
  categoryLabel: string
}

// Safe HTML rendering - prevent XSS while supporting basic formatting
function formatContent(content: string): string {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.*$)/gim, '<h4 class="text-xs font-semibold mt-3 mb-1" style="color:var(--text-primary)">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 class="text-sm font-semibold mt-3 mb-1.5" style="color:var(--text-primary)">$1</h3>')
    .replace(/^# (.*$)/gim, '<h3 class="text-sm font-semibold mt-3 mb-1.5" style="color:var(--text-primary)">$1</h3>')
    .replace(/^\d+[.,、)]\s+(.*$)/gim, '<div class="flex gap-2 mt-1"><span class="shrink-0 text-[11px] font-mono" style="color:' + '${color}' + '">$&</span></div>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="rounded-lg p-2 mt-2 text-[11px] font-mono overflow-x-auto" style="background:#1a1a2e;color:#a8b4d0;border:1px solid #2a2a3e">$2</pre>')
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded text-[11px] font-mono" style="background:var(--mo-100);color:var(--text-primary)">$1</code>')
    .replace(/^(?!\s*[-*•#\d`\s])(.*$)/gim, '<p class="text-[11px] leading-relaxed mt-1" style="color:var(--text-secondary)">$1</p>')
}

// Highlight search matches safely
function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const q = query.toLowerCase()
  if (!text.toLowerCase().includes(q)) return text
  try {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === q
        ? <mark key={i} className="rounded px-0.5 font-semibold" style={{ background: 'var(--highlight-bg)', color: 'var(--highlight-color)' }}>{part}</mark>
        : <span key={i}>{part}</span>
    )
  } catch {
    return text
  }
}

export default function CardGrid({ items, color, categoryLabel }: CardGridProps) {
  const [search, setSearch] = useState('')
  const [activeRole, setActiveRole] = useState('all')
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // CSS custom properties for highlight colors
  useEffect(() => {
    document.documentElement.style.setProperty('--highlight-bg', color + '20')
    document.documentElement.style.setProperty('--highlight-color', color)
  }, [color])

  // Filter items
  const filtered = useMemo(() => {
    let result = [...items]
    if (activeRole !== 'all') {
      result = result.filter(item => item.role === activeRole)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q)) ||
        item.content.toLowerCase().includes(q)
      )
    }
    return result
  }, [items, search, activeRole])

  // Role counts
  const roleCounts = useMemo(() => {
    const counts: Record<string, number> = { all: items.length }
    for (const item of items) {
      counts[item.role] = (counts[item.role] || 0) + 1
    }
    return Object.entries(counts)
      .filter(([r]) => r !== 'all')
      .sort((a, b) => b[1] - a[1])
  }, [items])

  const filterKey = `${search}::${activeRole}`

  const handleCopy = useCallback(async (content: string, id: number) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Fallback for environments without clipboard API
      const textarea = document.createElement('textarea')
      textarea.value = content
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
      } catch { /* silent fail */ }
      document.body.removeChild(textarea)
    }
  }, [])

  const toggleLike = useCallback((id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }, [])

  return (
    <div className="page-container py-8 pb-16">
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          items={items}
          color={color}
          onSearch={setSearch}
          onRoleFilter={setActiveRole}
          activeRole={activeRole}
          resultCount={filtered.length}
        />
      </div>

      {/* Role pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          onClick={() => setActiveRole('all')}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: activeRole === 'all' ? color : 'transparent',
            color: activeRole === 'all' ? '#fff' : 'var(--text-tertiary)',
            border: activeRole === 'all' ? 'none' : '1px solid var(--border-subtle)',
          }}
          aria-pressed={activeRole === 'all'}
        >
          全部 ({items.length})
        </button>
        {roleCounts.map(([role, count]) => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: activeRole === role ? color : 'transparent',
              color: activeRole === role ? '#fff' : 'var(--text-tertiary)',
              border: activeRole === role ? 'none' : '1px solid var(--border-subtle)',
            }}
            aria-pressed={activeRole === role}
          >
            {ROLE_LABELS[role] || role} ({count})
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 anim-fade-up">
          <AlertTriangle className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--text-quaternary)' }} />
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            未找到匹配 &ldquo;{search}&rdquo; 的内容
          </p>
          <button
            onClick={() => { setSearch(''); setActiveRole('all') }}
            className="mt-3 text-xs underline"
            style={{ color }}
          >
            清除筛选
          </button>
        </div>
      ) : (
        <div ref={gridRef} key={filterKey} className="grid md:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <CardItem
              key={item.id}
              item={item}
              color={color}
              categoryLabel={categoryLabel}
              search={search}
              isExpanded={expandedId === item.id}
              isCopied={copiedId === item.id}
              isLiked={likedIds.has(item.id)}
              onToggleExpand={() => setExpandedId(expandedId === item.id ? null : item.id)}
              onCopy={() => handleCopy(item.content || item.description, item.id)}
              onToggleLike={() => toggleLike(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Individual card component for better performance
interface CardItemProps {
  item: Item
  color: string
  categoryLabel: string
  search: string
  isExpanded: boolean
  isCopied: boolean
  isLiked: boolean
  onToggleExpand: () => void
  onCopy: () => void
  onToggleLike: () => void
}

function CardItem({ item, color, categoryLabel, search, isExpanded, isCopied, isLiked, onToggleExpand, onCopy, onToggleLike }: CardItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="card-zh overflow-hidden flex flex-col" style={{ animation: 'fadeUp 0.4s ease-out' }}>
      {/* Card Body */}
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0"
            style={{ background: color + '12', color }}
          >
            {categoryLabel}
          </span>
          <button
            onClick={onToggleLike}
            className="flex-shrink-0 p-1 rounded-lg transition-colors hover:bg-[var(--mo-100)]"
            aria-label={isLiked ? '取消收藏' : '收藏'}
            aria-pressed={isLiked}
          >
            <Heart
              className="w-4 h-4"
              style={{ color: isLiked ? color : 'var(--text-quaternary)' }}
              fill={isLiked ? color : 'none'}
            />
          </button>
        </div>

        <h3
          className="text-[15px] font-semibold leading-snug mb-2 cursor-pointer hover:opacity-80 transition-opacity"
          style={{ color: 'var(--text-primary)' }}
          onClick={onToggleExpand}
        >
          {highlightText(item.title, search)}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.tags.slice(0, 5).map((tag, idx) => (
            <span key={idx} className="tag-zh">{tag}</span>
          ))}
        </div>

        <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--text-tertiary)' }}>
          {highlightText(item.description, search)}
        </p>

        {item.scenario && (
          <div className="flex items-start gap-2 mb-1">
            <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-quaternary)' }}>
              {item.scenario}
            </p>
          </div>
        )}

        {/* Expanded content */}
        {isExpanded && (
          <div
            ref={contentRef}
            className="mt-4 pt-4 anim-fade-up"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            <div
              className="text-xs leading-relaxed max-h-96 overflow-y-auto pr-2"
              style={{ color: 'var(--text-secondary)' }}
              dangerouslySetInnerHTML={{ __html: formatContent(item.content) }}
            />
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ background: 'var(--mo-50)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onCopy}
            className="flex items-center gap-1 text-[11px] transition-colors hover:opacity-80"
            style={{ color: isCopied ? '#16a34a' : 'var(--text-quaternary)' }}
            aria-label={isCopied ? '已复制' : '复制内容'}
          >
            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {isCopied ? '已复制' : '复制'}
          </button>
          <button
            onClick={onToggleExpand}
            className="text-[11px] font-medium transition-colors hover:opacity-80 flex items-center gap-0.5"
            style={{ color }}
            aria-label={isExpanded ? '收起详情' : '展开详情'}
          >
            {isExpanded ? '收起' : '展开'}
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-quaternary)' }}>
            <Eye className="w-3.5 h-3.5" /> {item.views}
          </span>
        </div>
        {item.author && (
          <span className="text-[10px] truncate max-w-[100px]" style={{ color: 'var(--text-quaternary)' }}>
            {item.author}
          </span>
        )}
      </div>
    </div>
  )
}
