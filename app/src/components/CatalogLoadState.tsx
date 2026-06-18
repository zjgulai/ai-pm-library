import { AlertTriangle, Loader2 } from 'lucide-react'

interface CatalogLoadStateProps {
  color: string
  error?: string | null
}

export default function CatalogLoadState({ color, error }: CatalogLoadStateProps) {
  return (
    <div className="page-container py-16">
      <div className="flex flex-col items-center justify-center rounded-xl border px-6 py-12 text-center"
        style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-card)' }}
      >
        {error ? (
          <>
            <AlertTriangle className="mb-3 h-8 w-8" style={{ color }} />
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>内容加载失败</p>
            <p className="mt-1 max-w-lg text-xs" style={{ color: 'var(--text-quaternary)' }}>{error}</p>
          </>
        ) : (
          <>
            <Loader2 className="mb-3 h-8 w-8 animate-spin" style={{ color }} />
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>正在加载内容</p>
          </>
        )}
      </div>
    </div>
  )
}
