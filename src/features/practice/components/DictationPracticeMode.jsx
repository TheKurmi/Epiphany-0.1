import { useCallback, useEffect, useRef, useState } from 'react'
import { speakGreek } from '@/utils/speech'
import { recordPracticeAttempt } from '@/features/learn/hooks/useMasteryProgress'
import PracticeFeedback, { evaluateTypedAnswer } from './PracticeFeedback'

export default function DictationPracticeMode({
  item,
  dictationLevel,
  showPronunciation,
  onAnswer,
  onNext,
  isLast,
}) {
  const [input, setInput] = useState('')
  const [phase, setPhase] = useState('input')
  const [userAnswer, setUserAnswer] = useState('')
  const [played, setPlayed] = useState(false)
  const inputRef = useRef(null)

  const playAudio = useCallback(() => {
    if (!item?.text) return
    speakGreek(item.text, { dictationLevel })
    setPlayed(true)
  }, [item?.text, dictationLevel])

  const reset = useCallback(() => {
    setInput('')
    setPhase('input')
    setUserAnswer('')
    setPlayed(false)
  }, [])

  useEffect(() => {
    reset()
    const t = window.setTimeout(() => playAudio(), 400)
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.clearTimeout(t)
  }, [item?.text, reset, playAudio])

  if (!item) return null

  const revealed = phase !== 'input'

  function submit() {
    if (revealed) return
    const trimmed = input.trim()
    if (!trimmed) return

    const { phase: nextPhase, statType, result } = evaluateTypedAnswer(
      trimmed,
      item.text,
    )
    setUserAnswer(trimmed)
    setPhase(nextPhase)
    if (!item.patternTag?.startsWith('vocab-')) {
      recordPracticeAttempt('sentence-structure', {
        result,
        patternTag: item.patternTag,
      })
    }
    onAnswer(statType)
  }

  function reveal() {
    if (revealed) return
    setPhase('skipped')
    onAnswer('skipped')
  }

  return (
    <section className="mode-panel practice-mode" aria-label="Dictation">
      <div className={`challenge-card challenge-card--${phase}`}>
        <span className="card-badge">🔊 Dictation</span>

        <div className="dictation-audio">
          <button
            type="button"
            className="btn btn--primary dictation-audio__play"
            onClick={playAudio}
          >
            {played ? '🔊 Replay audio' : '🔊 Play audio'}
          </button>
          {item.hint && !revealed ? (
            <p className="dictation-audio__hint">Hint: {item.hint}</p>
          ) : null}
        </div>

        {!revealed ? (
          <>
            <p className="challenge-hint">
              Type exactly what you hear in Greek
            </p>
            <form
              className="challenge-form"
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className="challenge-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type what you heard…"
                autoComplete="off"
                spellCheck={false}
                aria-label="Your transcription"
              />
              <button type="submit" className="btn btn--primary">
                Check
              </button>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={reveal}
              >
                Show answer
              </button>
            </form>
          </>
        ) : (
          <div className="challenge-revealed-actions">
            <button type="button" className="btn btn--primary" onClick={onNext}>
              {isLast ? 'Finish session' : 'Continue →'}
            </button>
          </div>
        )}

        <PracticeFeedback
          phase={phase}
          answer={item.text}
          userAnswer={userAnswer}
          showPronunciation={showPronunciation}
        />
      </div>
    </section>
  )
}
