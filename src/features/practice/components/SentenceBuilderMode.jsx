import { useCallback, useEffect, useState } from 'react'
import { evaluateAnswer } from '@/utils/answers'
import { recordPracticeAttempt } from '@/features/learn/hooks/useMasteryProgress'
import PracticeFeedback, { resultToPhase } from './PracticeFeedback'

export default function SentenceBuilderMode({
  puzzle,
  showPronunciation,
  onAnswer,
  onNext,
  isLast,
}) {
  const [bank, setBank] = useState([])
  const [built, setBuilt] = useState([])
  const [phase, setPhase] = useState('input')
  const [userSentence, setUserSentence] = useState('')

  const reset = useCallback(() => {
    setBank([...(puzzle?.shuffled ?? [])])
    setBuilt([])
    setPhase('input')
    setUserSentence('')
  }, [puzzle])

  useEffect(() => {
    reset()
  }, [puzzle?.id, reset])

  if (!puzzle) return null

  const revealed = phase !== 'input'

  function addWord(word, index) {
    if (revealed) return
    setBuilt((prev) => [...prev, word])
    setBank((prev) => prev.filter((_, i) => i !== index))
  }

  function removeWord(index) {
    if (revealed) return
    const word = built[index]
    setBuilt((prev) => prev.filter((_, i) => i !== index))
    setBank((prev) => [...prev, word])
  }

  function checkSentence() {
    if (revealed || !built.length) return

    const attempt = built.join(' ')
    const expected = puzzle.sentence.replace(/\.$/, '')
    const attemptNorm = attempt.replace(/\.$/, '')

    const result = evaluateAnswer(attemptNorm, expected)
    const nextPhase = resultToPhase(result)
    setUserSentence(attempt)
    setPhase(nextPhase)
    recordPracticeAttempt('sentence-structure', {
      result,
      patternTag: puzzle.patternTag,
    })
    onAnswer(result === 'wrong' ? 'incorrect' : result)
  }

  function clearAll() {
    if (revealed) return
    setBank([...puzzle.shuffled])
    setBuilt([])
  }

  return (
    <section className="mode-panel practice-mode" aria-label="Sentence builder">
      <div className={`challenge-card challenge-card--${phase}`}>
        <span className="card-badge">🧩 Sentence builder</span>

        {puzzle.hint && !revealed ? (
          <p className="generated-quiz__hint">{puzzle.hint}</p>
        ) : null}

        <div className="sentence-builder__built" aria-label="Your sentence">
          {built.length ? (
            built.map((word, i) => (
              <button
                key={`${word}-${i}`}
                type="button"
                className="sentence-builder__chip sentence-builder__chip--built"
                onClick={() => removeWord(i)}
                disabled={revealed}
              >
                {word}
              </button>
            ))
          ) : (
            <span className="sentence-builder__placeholder">
              Tap words below to build the sentence
            </span>
          )}
        </div>

        {!revealed ? (
          <>
            <div className="sentence-builder__bank" aria-label="Word bank">
              {bank.map((word, i) => (
                <button
                  key={`${word}-${i}`}
                  type="button"
                  className="sentence-builder__chip"
                  onClick={() => addWord(word, i)}
                >
                  {word}
                </button>
              ))}
            </div>

            <div className="sentence-builder__actions">
              <button
                type="button"
                className="btn btn--primary"
                disabled={!built.length}
                onClick={checkSentence}
              >
                Check sentence
              </button>
              <button type="button" className="btn btn--secondary" onClick={clearAll}>
                Reset
              </button>
            </div>
          </>
        ) : (
          <div className="challenge-revealed-actions">
            <button type="button" className="btn btn--primary" onClick={onNext}>
              {isLast ? 'Finish session' : 'Continue →'}
            </button>
          </div>
        )}

        {revealed ? (
          <PracticeFeedback
            phase={phase}
            answer={puzzle.sentence}
            userAnswer={userSentence}
            showPronunciation={showPronunciation}
          />
        ) : null}
      </div>
    </section>
  )
}
