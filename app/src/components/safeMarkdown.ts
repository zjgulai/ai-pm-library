export type SafeMarkdownInlineSegment =
  | { type: 'text'; text: string }
  | { type: 'code'; text: string }

export type SafeMarkdownBlock =
  | { type: 'heading'; level: 1 | 2 | 3; segments: SafeMarkdownInlineSegment[] }
  | { type: 'paragraph'; segments: SafeMarkdownInlineSegment[] }
  | { type: 'list-item'; marker: string; ordered: boolean; segments: SafeMarkdownInlineSegment[] }
  | { type: 'code'; language?: string; text: string }

const FENCE_PATTERN = /^```([A-Za-z0-9_+-]{1,24})?\s*$/
const UNSAFE_FENCE_PATTERN = /^```/
const HEADING_PATTERN = /^(#{1,3})\s+(.+)$/
const ORDERED_LIST_PATTERN = /^(\s*)(\d+[.,、)])\s+(.+)$/
const BULLET_LIST_PATTERN = /^(\s*)([-*•])\s+(.+)$/
const INLINE_CODE_PATTERN = /`([^`\n]+)`/g

export function parseSafeMarkdownInline(text: string): SafeMarkdownInlineSegment[] {
  const segments: SafeMarkdownInlineSegment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  INLINE_CODE_PATTERN.lastIndex = 0
  while ((match = INLINE_CODE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', text: text.slice(lastIndex, match.index) })
    }
    segments.push({ type: 'code', text: match[1] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', text: text.slice(lastIndex) })
  }

  return segments.length > 0 ? segments : [{ type: 'text', text }]
}

export function parseSafeMarkdown(content: string): SafeMarkdownBlock[] {
  const lines = content.replace(/\r\n?/g, '\n').split('\n')
  const blocks: SafeMarkdownBlock[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    const fenceMatch = FENCE_PATTERN.exec(line)

    if (fenceMatch) {
      const codeLines: string[] = []
      const language = fenceMatch[1]
      index += 1

      while (index < lines.length && !UNSAFE_FENCE_PATTERN.test(lines[index])) {
        codeLines.push(lines[index])
        index += 1
      }

      if (index < lines.length) index += 1
      blocks.push({ type: 'code', language, text: codeLines.join('\n') })
      continue
    }

    if (!line.trim()) {
      index += 1
      continue
    }

    const headingMatch = HEADING_PATTERN.exec(line)
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length as 1 | 2 | 3,
        segments: parseSafeMarkdownInline(headingMatch[2].trim()),
      })
      index += 1
      continue
    }

    const orderedMatch = ORDERED_LIST_PATTERN.exec(line)
    if (orderedMatch) {
      blocks.push({
        type: 'list-item',
        marker: orderedMatch[2],
        ordered: true,
        segments: parseSafeMarkdownInline(orderedMatch[3].trim()),
      })
      index += 1
      continue
    }

    const bulletMatch = BULLET_LIST_PATTERN.exec(line)
    if (bulletMatch) {
      blocks.push({
        type: 'list-item',
        marker: bulletMatch[2],
        ordered: false,
        segments: parseSafeMarkdownInline(bulletMatch[3].trim()),
      })
      index += 1
      continue
    }

    blocks.push({ type: 'paragraph', segments: parseSafeMarkdownInline(line.trim()) })
    index += 1
  }

  return blocks
}
