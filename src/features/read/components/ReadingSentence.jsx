import HighlightedGreekText from '@/shared/components/HighlightedGreekText'

/**
 * Render a Greek sentence with optional grammar highlights and clickable vocabulary.
 */
export default function ReadingSentence({
  sentence,
  showTranslation = false,
  showHighlights = true,
  showVocab = true,
  onVocabClick,
  activeVocab,
  isActive = false,
  isRevealed = true,
  dimmed = false,
}) {
  const { text, english, highlights = [], vocabulary = [] } = sentence

  if (!isRevealed) return null

  return (
    <div
      className={`reading-sentence${isActive ? ' reading-sentence--active' : ''}${dimmed ? ' reading-sentence--dimmed' : ''}`}
    >
      <p className="reading-sentence__greek">
        <HighlightedGreekText
          text={text}
          highlights={highlights}
          vocabulary={vocabulary}
          showHighlights={showHighlights}
          showVocab={showVocab}
          onVocabClick={onVocabClick}
          activeVocab={activeVocab}
        />
      </p>
      {showTranslation ? (
        <p className="reading-sentence__english">{english}</p>
      ) : null}
    </div>
  )
}
