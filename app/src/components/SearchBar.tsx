import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import {
  Search, X, Command, TrendingUp, Clock, Tag,
  ArrowRight
} from 'lucide-react'
import type { Item } from '@/data/catalogItems'

interface SearchBarProps {
  items: Item[]
  color: string
  onSearch: (query: string) => void
  onRoleFilter: (role: string) => void
  activeRole: string
  resultCount: number
  resetSignal?: number
}

// 从items中提取热门标签作为搜索建议
function extractPopularTags(items: Item[], limit = 8): string[] {
  const tagCounts: Record<string, number> = {}
  items.forEach(item => {
    item.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag)
}

export default function SearchBar({
  items, color, onSearch, activeRole, resultCount, resetSignal
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pf_search_history')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [hotSearches, setHotSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const suppressSuggestionsOnNextFocus = useRef(false)

  useEffect(() => {
    setQuery('')
    setSelectedIndex(-1)
    setShowSuggestions(false)
  }, [resetSignal])

  // 提取热门标签
  useEffect(() => {
    setHotSearches(extractPopularTags(items))
  }, [items])

  // 防抖搜索
  const debouncedSearch = useCallback((value: string) => {
    clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      onSearch(value)
    }, 150)
  }, [onSearch])

  // 生成搜索建议
  const suggestions = useMemo(() => {
    if (!query.trim()) {
      return {
        history: searchHistory.slice(0, 5),
        hot: hotSearches.slice(0, 6),
        matches: [] as Array<{ type: string; text: string }>,
      }
    }
    const q = query.toLowerCase()
    // 匹配标题
    const titleMatches = items
      .filter(item => item.title.toLowerCase().includes(q))
      .slice(0, 4)
      .map(item => ({ type: 'title', text: item.title }))
    // 匹配标签
    const allTags = Array.from(new Set(items.flatMap(i => i.tags)))
    const tagMatches = allTags
      .filter(tag => tag.toLowerCase().includes(q))
      .slice(0, 4)
      .map(tag => ({ type: 'tag', text: tag }))
    return {
      history: [],
      hot: [],
      matches: [...titleMatches, ...tagMatches],
    }
  }, [query, searchHistory, hotSearches, items])

  const totalNavigable = suggestions.matches.length + suggestions.history.length

  const addToHistory = useCallback((text: string) => {
    if (!text.trim()) return
    setSearchHistory(prev => {
      const next = [text, ...prev.filter(h => h !== text)].slice(0, 10)
      try { localStorage.setItem('pf_search_history', JSON.stringify(next)) } catch { /* silent */ }
      return next
    })
  }, [])

  const handleSelect = useCallback((text: string) => {
    setQuery(text)
    onSearch(text)
    setShowSuggestions(false)
    addToHistory(text)
  }, [onSearch, addToHistory])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setShowSuggestions(false)
        setIsFocused(false)
        inputRef.current?.blur()
      }
      // 上下箭头导航
      if (showSuggestions && totalNavigable > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, totalNavigable - 1))
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, -1))
        }
        if (e.key === 'Enter' && selectedIndex >= 0) {
          e.preventDefault()
          const allOptions = [...suggestions.matches, ...suggestions.history.map(h => ({ type: 'history', text: h }))]
          const selected = allOptions[selectedIndex]
          if (selected) handleSelect(selected.text)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showSuggestions, totalNavigable, selectedIndex, suggestions, handleSelect])

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (value: string) => {
    setQuery(value)
    setSelectedIndex(-1)
    debouncedSearch(value)
    setShowSuggestions(true)
  }

  const clearHistory = () => {
    setSearchHistory([])
    try { localStorage.removeItem('pf_search_history') } catch { /* silent */ }
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
    setShowSuggestions(false)
    suppressSuggestionsOnNextFocus.current = true
    inputRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const allOptions = [...suggestions.matches, ...suggestions.history.map(h => ({ type: 'history', text: h }))]
    if (selectedIndex >= 0 && allOptions[selectedIndex]) {
      handleSelect(allOptions[selectedIndex].text)
    } else {
      onSearch(query)
      addToHistory(query)
      setShowSuggestions(false)
    }
  }

  // 高亮匹配文本
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return <span>{text}</span>
    try {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
      return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? <mark key={i} className="rounded px-0.5 font-medium" style={{ background: color + '25', color }}>{part}</mark>
          : <span key={i}>{part}</span>
      )
    } catch {
      return <span>{text}</span>
    }
  }

  const hasSuggestions = suggestions.history.length > 0 ||
    suggestions.hot.length > 0 ||
    suggestions.matches.length > 0

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className="relative flex items-center transition-all duration-300"
          style={{
            boxShadow: isFocused
              ? `0 0 0 3px ${color}15, 0 4px 20px ${color}08`
              : '0 2px 8px rgba(0,0,0,0.04)',
            borderRadius: '14px',
          }}
        >
          <Search
            className="absolute left-4 w-[18px] h-[18px] transition-colors duration-200"
            style={{ color: isFocused ? color : 'var(--text-quaternary)' }}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => handleInputChange(e.target.value)}
            onFocus={() => {
              setIsFocused(true)
              if (suppressSuggestionsOnNextFocus.current) {
                suppressSuggestionsOnNextFocus.current = false
                return
              }
              setShowSuggestions(true)
            }}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder={`搜索${items.length}条内容...`}
            className="w-full h-12 pl-11 pr-20 rounded-[14px] text-[13px] outline-none transition-all duration-200"
            style={{
              background: isFocused ? '#fff' : 'var(--bg-card)',
              border: `1.5px solid ${isFocused ? color + '40' : 'var(--border-subtle)'}`,
              color: 'var(--text-primary)',
            }}
            aria-label="搜索内容"
            role="combobox"
            aria-expanded={showSuggestions && hasSuggestions}
            aria-controls="search-suggestions"
          />

          {/* Right side actions */}
          <div className="absolute right-3 flex items-center gap-1.5">
            {query ? (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-md transition-all hover:scale-110"
                style={{ background: 'var(--mo-100)' }}
                aria-label="清除搜索"
              >
                <X className="w-3.5 h-3.5" style={{ color: 'var(--text-quaternary)' }} />
              </button>
            ) : (
              <kbd
                className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-mono"
                style={{ background: 'var(--mo-100)', color: 'var(--text-quaternary)', border: '1px solid var(--border-subtle)' }}
              >
                <Command className="w-2.5 h-2.5" />
                <span>K</span>
              </kbd>
            )}
          </div>
        </div>

        {/* Result count pill */}
        {(query || activeRole !== 'all') && (
          <div className="flex items-center gap-2 mt-2.5">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium"
              style={{ background: color + '10', color, border: `1px solid ${color}15` }}
            >
              {resultCount} 个结果
            </span>
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[11px] transition-opacity hover:opacity-70"
                style={{ color: 'var(--text-quaternary)' }}
              >
                清除搜索
              </button>
            )}
          </div>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && hasSuggestions && (
        <div
          id="search-suggestions"
          className="absolute top-[52px] left-0 right-0 z-50 rounded-xl overflow-hidden anim-fade-up"
          style={{
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)',
            maxHeight: '420px',
            overflowY: 'auto',
          }}
          role="listbox"
        >
          {/* Matched results (when typing) */}
          {suggestions.matches.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1.5 flex items-center gap-1.5">
                <Search className="w-3 h-3" style={{ color: 'var(--text-quaternary)' }} />
                <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-quaternary)' }}>
                  匹配结果
                </span>
              </div>
              {suggestions.matches.map((match, idx) => (
                <button
                  key={`${match.type}-${match.text}`}
                  onClick={() => handleSelect(match.text)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                  style={{
                    background: selectedIndex === idx ? color + '08' : 'transparent',
                  }}
                  role="option"
                  aria-selected={selectedIndex === idx}
                >
                  {match.type === 'title' ? (
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-quaternary)' }} />
                  ) : (
                    <Tag className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                  )}
                  <span className="text-[13px] truncate" style={{ color: 'var(--text-primary)' }}>
                    {highlightMatch(match.text, query)}
                  </span>
                  {match.type === 'tag' && (
                    <span className="text-[10px] ml-auto shrink-0" style={{ color: 'var(--text-quaternary)' }}>标签</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Search History */}
          {suggestions.history.length > 0 && (
            <div className="py-2" style={{ borderTop: suggestions.matches.length > 0 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div className="px-3 py-1.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" style={{ color: 'var(--text-quaternary)' }} />
                  <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-quaternary)' }}>
                    搜索历史
                  </span>
                </div>
                <button
                  onClick={clearHistory}
                  className="text-[10px] transition-colors hover:opacity-70"
                  style={{ color: 'var(--text-quaternary)' }}
                >
                  清除
                </button>
              </div>
              {suggestions.history.map((text, idx) => {
                const globalIdx = suggestions.matches.length + idx
                return (
                  <button
                    key={text}
                    onClick={() => handleSelect(text)}
                    onMouseEnter={() => setSelectedIndex(globalIdx)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors"
                    style={{ background: selectedIndex === globalIdx ? color + '08' : 'transparent' }}
                    role="option"
                    aria-selected={selectedIndex === globalIdx}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-quaternary)' }} />
                    <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{text}</span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Hot Searches */}
          {suggestions.hot.length > 0 && (
            <div className="py-2" style={{ borderTop: (suggestions.matches.length > 0 || suggestions.history.length > 0) ? '1px solid var(--border-subtle)' : 'none' }}>
              <div className="px-3 py-1.5 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" style={{ color: 'var(--text-quaternary)' }} />
                <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-quaternary)' }}>
                  热门搜索
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 px-3 pb-1 pt-0.5">
                {suggestions.hot.map((text, i) => (
                  <button
                    key={text}
                    onClick={() => handleSelect(text)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] transition-all hover:scale-105"
                    style={{
                      background: i < 3 ? color + '08' : 'var(--mo-50)',
                      color: i < 3 ? color : 'var(--text-tertiary)',
                      border: `1px solid ${i < 3 ? color + '15' : 'var(--border-subtle)'}`,
                    }}
                  >
                    {i < 3 && <TrendingUp className="w-2.5 h-2.5" />}
                    {text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
