import { useCallback, useEffect, useRef, useState } from 'react'
import { recordLearningAttempt } from '@/shared/memory/recordLearningAttempt'
import { renderPrompt } from '@/shared/quiz/renderPrompt'
import { useEnterContinue } from '@/shared/hooks/useEnterContinue'
import PracticeFeedback, { evaluateTypedAnswer } from './PracticeFeedback'

const QUESTION_SECONDS = 15

export default function QuickChallengePracticeMode({
  question,
  topicId,
  showPronunciation,
  onAnswer,
  onNext,
  isLast,
}) {
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState(null)
  const [phase, setPhase] = useState('input')
  const [userAnswer, setUserAnswer] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_SECONDS)
  const inputRef = useRef(null)
  const timedOutRef = useRef(false)

  const isMC = question?.type === 'multipleChoice'
  const revealed = phase !== 'input'

  const reset = useCallback(() => {
    setInput('')
    setSelected(null)
    setPhase('input')
    setUserAnswer('')
    setSecondsLeft(QUESTION_SECONDS)
    timedOutRef.current = false
  }, [])

  useEffect(() => {
    reset()
    if (!isMC) requestAnimationFrame(() => inputRef.current?.focus())
  }, [question?.id, isMC, reset])

  useEffect(() => {
    if (revealed || !question) return

    const interval = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(interval)
          if (!timedOutRef.current) {
            timedOutRef.current = true
            setPhase('incorrect')
            onAnswer('incorrect')
            recordLearningAttempt(topicId, {
              result: 'wrong',
              patternTag: question.patternTag,
              expected: question.correctAnswer,
            })
          }
          return 0
        }
        return s - 1
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [question, revealed, onAnswer, topicId])

  if (!question) return null

  const timerPercent = (secondsLeft / QUESTION_SECONDS) * 100

  function submitTyped() {
    if (revealed) return
    const trimmed = input.trim()
    if (!trimmed) return

    const { phase: nextPhase, statType, result } = evaluateTypedAnswer(
      trimmed,
      question.correctAnswer,
    )
    setUserAnswer(trimmed)
    setPhase(nextPhase)
    recordLearningAttempt(topicId, {
      result,
      patternTag: question.patternTag,
      userInput: trimmed,
      expected: question.correctAnswer,
    })
    onAnswer(statType)
  }

  function selectOption(index, option) {
    if (revealed) return
    setSelected(index)
    const correct = option === question.correctAnswer
    setPhase(correct ? 'correct' : 'incorrect')
    recordLearningAttempt(topicId, {
      result: correct ? 'correct' : 'wrong',
      patternTag: question.patternTag,
      userInput: option,
      expected: question.correctAnswer,
    })
    onAnswer(correct ? 'correct' : 'incorrect')
  }

  function goNext() {
    if (!revealed) return
    onNext()
  }

  useEnterContinue({ enabled: revealed, onContinue: goNext })

  return (
    <section className="mode-panel practice-mode" aria-label="Quick challenge">
      <div className={`challenge-card challenge-card--${phase}`}>
        <div className="quick-timer" aria-hidden="true">
          <div
            className="quick-timer__bar"
            style={{ width: `${timerPercent}%` }}
          />
          <span className="quick-timer__label">{secondsLeft}s</span>
        </div>

        <span className="card-badge">⚡ Quick challenge</span>

        <p className="lesson-quiz__question practice-mode__prompt">
          {renderPrompt(question.promptPlain ?? question.prompt)}
        </p>

        {!revealed && isMC ? (
          <div className="lesson-quiz__options" role="group">
            {question.options.map((option, index) => (
              <button
                key={option}
                type="button"
                className="lesson-quiz__option"
                onClick={() => selectOption(index, option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}

        {!revealed && !isMC ? (
          <form
            className="challenge-form"
            onSubmit={(e) => {
              e.preventDefault()
              submitTyped()
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="challenge-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type quickly…"
              autoComplete="off"
              spellCheck={false}
            />
            <button type="submit" className="btn btn--primary">
              Check
            </button>
          </form>
        ) : null}

        {revealed ? (
          <div className="challenge-revealed-actions">
            <button type="button" className="btn btn--primary" onClick={goNext}>
              {isLast ? 'Finish round' : 'Next →'}
            </button>
          </div>
        ) : null}

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
