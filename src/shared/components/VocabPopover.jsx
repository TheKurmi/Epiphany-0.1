import { enrichVocabEntry } from '@/data/vocabulary/registry'
import { speakGreek } from '@/utils/speech'

const POS_LABELS = {
  noun: 'noun',
  verb: 'verb',
  adjective: 'adjective',
  adverb: 'adverb',
  phrase: 'phrase',
  pronoun: 'pronoun',
  preposition: 'preposition',
}

/**
 * Lightweight vocabulary card — translation, grammar info, pronunciation.
 * @param {{ word: string, english: string, partOfSpeech?: string, gender?: string, plural?: string, conjugationFamily?: string, note?: string, relatedWords?: { word: string, english: string }[] } | null} entry
 */
export default function VocabPopover({ entry, onClose }) {
  if (!entry) return null

  const enriched = enrichVocabEntry(entry)
  const pos = enriched.partOfSpeech
    ? POS_LABELS[enriched.partOfSpeech] ?? enriched.partOfSpeech
    : null

  function handleSpeak() {
    speakGreek(entry.word.replace(/[.,;:!?—\-]/g, ''))
  }

  return (
    <div className="vocab-popover" role="dialog" aria-label={`${entry.word} — vocabulary`}>
      <div className="vocab-popover__header">
        <strong className="vocab-popover__word" lang="el">
          {entry.word}
        </strong>
        <button
          type="button"
          className="vocab-popover__speak"
          onClick={handleSpeak}
          aria-label={`Pronounce ${entry.word}`}
        >
          🔊
        </button>
        {onClose ? (
          <button
            type="button"
            className="vocab-popover__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        ) : null}
      </div>

      <p className="vocab-popover__english">{enriched.english}</p>

      <dl className="vocab-popover__meta">
        {pos ? (
          <>
            <dt>Type</dt>
            <dd>{pos}</dd>
          </>
        ) : null}
        {enriched.gender ? (
          <>
            <dt>Gender</dt>
            <dd>{enriched.gender}</dd>
          </>
        ) : null}
        {enriched.plural ? (
          <>
            <dt>Plural</dt>
            <dd lang="el">{enriched.plural}</dd>
          </>
        ) : null}
        {enriched.conjugationFamily ? (
          <>
            <dt>Conjugation</dt>
            <dd>{enriched.conjugationFamily}</dd>
          </>
        ) : null}
      </dl>

      {enriched.relatedWords?.length ? (
        <div className="vocab-popover__related">
          <span className="vocab-popover__related-label">Related:</span>
          {enriched.relatedWords.map((r) => (
            <span key={r.word} className="vocab-popover__related-word" lang="el">
              {r.word}
            </span>
          ))}
        </div>
      ) : null}

      {enriched.note ? <p className="vocab-popover__note">{enriched.note}</p> : null}
    </div>
  )
}
