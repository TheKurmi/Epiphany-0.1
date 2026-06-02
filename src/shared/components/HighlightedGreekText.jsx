import PatternText from '@/shared/components/PatternText'
import GrammarTooltip from '@/shared/components/GrammarTooltip'
import { formToParts } from '@/utils/grammarHighlight'

/**
 * Render Greek text with optional inline grammar highlights and vocabulary taps.
 * Shared by reading sentences and lesson examples.
 */
export default function HighlightedGreekText({
  text,
  highlights = [],
  vocabulary = [],
  showHighlights = true,
  showVocab = true,
  onVocabClick,
  activeVocab,
  className = '',
}) {
  function renderWithVocab(str, vocab) {
    if (!showVocab || !vocab.length || !onVocabClick) return str

    const tokens = str.split(/(\s+|[.,;:!?—\-]+)/)
    return tokens.map((token, i) => {
      const clean = token.replace(/[.,;:!?]/g, '')
      const entry = vocab.find(
        (v) =>
          token.toLowerCase() === v.word.toLowerCase() ||
          clean === v.word ||
          clean.toLowerCase() === v.word.toLowerCase(),
      )
      if (!entry) return <span key={i}>{token}</span>

      const isActive = activeVocab === entry.word
      return (
        <button
          key={i}
          type="button"
          className={`reading-vocab${isActive ? ' reading-vocab--active' : ''}`}
          onClick={() => onVocabClick(isActive ? null : entry)}
        >
          {token}
        </button>
      )
    })
  }

  function renderHighlight(hl) {
    const inner =
      hl.stem && hl.ending ? (
        <PatternText parts={formToParts(hl.word, hl.stem)} />
      ) : (
        <span className="pattern-text__highlight">{hl.word}</span>
      )

    return (
      <GrammarTooltip highlight={hl} className="reading-sentence__pattern">
        {inner}
      </GrammarTooltip>
    )
  }

  if (!showHighlights || !highlights.length) {
    return (
      <span className={className} lang="el">
        {renderWithVocab(text, vocabulary)}
      </span>
    )
  }

  let remaining = text
  const parts = []

  for (const hl of highlights) {
    const idx = remaining.indexOf(hl.word)
    if (idx === -1) continue

    if (idx > 0) {
      parts.push({ type: 'text', content: remaining.slice(0, idx) })
    }
    parts.push({ type: 'highlight', hl })
    remaining = remaining.slice(idx + hl.word.length)
  }

  if (remaining) parts.push({ type: 'text', content: remaining })

  if (!parts.length) {
    return (
      <span className={className} lang="el">
        {renderWithVocab(text, vocabulary)}
      </span>
    )
  }

  return (
    <span className={className} lang="el">
      {parts.map((part, i) =>
        part.type === 'text' ? (
          <span key={i}>{renderWithVocab(part.content, vocabulary)}</span>
        ) : (
          <span key={i}>{renderHighlight(part.hl)}</span>
        ),
      )}
    </span>
  )
}
