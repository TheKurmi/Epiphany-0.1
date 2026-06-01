import PatternText from '@/shared/components/PatternText'
import { formToParts } from '@/utils/grammarHighlight'

/**
 * Render a Greek sentence with optional grammar highlights and clickable vocabulary.
 */
export default function ReadingSentence({
  sentence,
  showTranslation = false,
  showHighlights = true,
  onVocabClick,
  activeVocab,
}) {
  const { text, english, highlights = [], vocabulary = [] } = sentence

  function renderText() {
    if (!showHighlights || !highlights.length) {
      return renderWithVocab(text, vocabulary)
    }

    let remaining = text
    const parts = []

    for (const hl of highlights) {
      const idx = remaining.indexOf(hl.word)
      if (idx === -1) continue

      if (idx > 0) {
        parts.push({ type: 'text', content: remaining.slice(0, idx) })
      }

      if (hl.stem && hl.ending) {
        parts.push({
          type: 'highlight',
          content: (
            <PatternText
              parts={formToParts(hl.word, hl.stem)}
              className="reading-sentence__pattern"
            />
          ),
        })
      } else {
        parts.push({
          type: 'highlight',
          content: (
            <span className="pattern-text__highlight">{hl.word}</span>
          ),
        })
      }

      remaining = remaining.slice(idx + hl.word.length)
    }

    if (remaining) {
      parts.push({ type: 'text', content: remaining })
    }

    if (!parts.length) return renderWithVocab(text, vocabulary)

    return parts.map((part, i) =>
      part.type === 'text' ? (
        <span key={i}>{renderWithVocab(part.content, vocabulary)}</span>
      ) : (
        <span key={i}>{part.content}</span>
      ),
    )
  }

  function renderWithVocab(str, vocab) {
    if (!vocab.length || !onVocabClick) return str

    const tokens = str.split(/(\s+|[.,;:!?—\-]+)/)
    return tokens.map((token, i) => {
      const entry = vocab.find(
        (v) =>
          token.toLowerCase() === v.word.toLowerCase() ||
          token.replace(/[.,;:!?]/g, '') === v.word,
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

  return (
    <div className="reading-sentence">
      <p className="reading-sentence__greek" lang="el">
        {renderText()}
      </p>
      {showTranslation ? (
        <p className="reading-sentence__english">{english}</p>
      ) : null}
    </div>
  )
}
