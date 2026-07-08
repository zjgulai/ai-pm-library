import { parseSafeMarkdown, type SafeMarkdownInlineSegment } from './safeMarkdown'

interface SafeMarkdownContentProps {
  content: string
  markerColor: string
}

function renderInline(segments: SafeMarkdownInlineSegment[]) {
  return segments.map((segment, index) => {
    if (segment.type === 'code') {
      return (
        <code
          key={index}
          className="px-1 py-0.5 rounded text-[11px] font-mono"
          style={{ background: 'var(--mo-100)', color: 'var(--text-primary)' }}
        >
          {segment.text}
        </code>
      )
    }
    return <span key={index}>{segment.text}</span>
  })
}

export default function SafeMarkdownContent({ content, markerColor }: SafeMarkdownContentProps) {
  const blocks = parseSafeMarkdown(content)

  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'code') {
          return (
            <pre
              key={index}
              className="rounded-lg p-2 mt-2 text-[11px] font-mono overflow-x-auto"
              style={{ background: '#1a1a2e', color: '#a8b4d0', border: '1px solid #2a2a3e' }}
            >
              <code>{block.text}</code>
            </pre>
          )
        }

        if (block.type === 'heading') {
          if (block.level === 3) {
            return (
              <h4
                key={index}
                className="text-xs font-semibold mt-3 mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {renderInline(block.segments)}
              </h4>
            )
          }

          return (
            <h3
              key={index}
              className="text-sm font-semibold mt-3 mb-1.5"
              style={{ color: 'var(--text-primary)' }}
            >
              {renderInline(block.segments)}
            </h3>
          )
        }

        if (block.type === 'list-item') {
          return (
            <div key={index} className="flex gap-2 mt-1">
              <span className="shrink-0 text-[11px] font-mono" style={{ color: markerColor }}>
                {block.marker}
              </span>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {renderInline(block.segments)}
              </p>
            </div>
          )
        }

        return (
          <p key={index} className="text-[11px] leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>
            {renderInline(block.segments)}
          </p>
        )
      })}
    </>
  )
}
