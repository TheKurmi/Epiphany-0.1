import { useCallback, useEffect, useRef, useState } from 'react'
import { recordPracticeAttempt } from '@/features/learn/hooks/useMasteryProgress'
import { renderPrompt } from '@/shared/quiz/renderPrompt'
import { useEnterContinue } from '@/shared/hooks/useEnterContinue'
import PracticeFeedback, { evaluateTypedAnswer } from './PracticeFeedback'

export default function TypingPracticeMode({
  question,
  topicId,
  showPronunciation,
  onAnswer,
  onNext,
  isLast,
}) {
  const [input, setInput] = useState('')
  const [phase, setPhase] = useState('input')
  const [userAnswer, setUserAnswer] = useState('')
  const inputRef = useRef(null)

  const reset = useCallback(() => {
    setInput('')
    setPhase('input')
    setUserAnswer('')
  }, [])

  useEffect(() => {
    reset()
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [question?.id, reset])

  if (!question) return null

  const revealed = phase !== 'input'

  function submit() {
    if (revealed) return
    const trimmed = input.trim()
    if (!trimmed) return

    const { phase: nextPhase, statType, result } = evaluateTypedAnswer(
      trimmed,
      question.correctAnswer,
    )
    setUserAnswer(trimmed)
    setPhase(nextPhase)
    recordPracticeAttempt(topicId, {
      result,
      patternTag: question.patternTag,
    })
    onAnswer(statType)
  }

  function goNext() {
    if (!revealed) return
    onNext()
  }

  useEnterContinue({ enabled: revealed, onContinue: goNext })

  function handleSubmit(e) {
    e.preventDefault()
    if (revealed) goNext()
    else submit()
  }

  return (
    <section className="mode-panel practice-mode" aria-label="Typing practice">
      <div className={`challenge-card challenge-card--${phase}`}>
        <span className="card-badge">✍️ Type your answer</span>

        <p className="lesson-quiz__question practice-mode__prompt">
          {renderPrompt(question.promptPlain ?? question.prompt)}
        </p>

        {question.hint && !revealed ? (
          <p className="generated-quiz__hint">{question.hint}</p>
        ) : null}

        {!revealed ? (
          <form className="challenge-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="challenge-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type in Greek…"
              autoComplete="off"
              spellCheck={false}
              aria-label="Your answer"
            />
            <button type="submit" className="btn btn--primary">
              Check answer
            </button>
          </form>
        ) : (
          <div className="challenge-revealed-actions">
            <button type="button" className="btn btn--primary" onClick={goNext}>
              {isLast ? 'Finish session' : 'Continue →'}
            </button>
          </div>
        )}

        <PracticeFeedback
          phase={phase}
          answer={question.correctAnswer}
          userAnswer={userAnswer}
          showPronunciation={showPronunciation}
        />
      </div>
    </section>
  )
}
