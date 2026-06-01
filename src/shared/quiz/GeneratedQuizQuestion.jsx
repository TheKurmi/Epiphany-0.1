import { useState } from 'react'
import { renderPrompt } from '@/shared/quiz/renderPrompt'
import { evaluateAnswer } from '@/utils/answers'

export default function GeneratedQuizQuestion({
  question,
  onAnswer,
  compact = false,
}) {
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState(null)
  const [revealed, setReveal] = useState(false)
  const [result, setResult] = useState(null)

  if (!question) return null

  const isMC = question.type === 'multipleChoice'

  function submitTyped() {
    if (revealed) return
    const trimmed = input.trim()
    if (!trimmed) return

    const evaluation = evaluateAnswer(trimmed, question.correctAnswer)
    const answerResult =
      evaluation === 'correct'
        ? 'correct'
        : evaluation === 'nearMiss'
          ? 'nearMiss'
          : 'wrong'

    setResult(answerResult)
    setReveal(true)
    onAnswer?.({ result: answerResult, patternTag: question.patternTag })
  }

  function selectOption(index, option) {
    if (revealed) return
    setSelected(index)
    const answerResult = option === question.correctAnswer ? 'correct' : 'wrong'
    setResult(answerResult)
    setReveal(true)
    onAnswer?.({ result: answerResult, patternTag: question.patternTag })
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      submitTyped()
    }
  }

  const feedbackClass =
    result === 'correct'
      ? ' lesson-quiz__feedback--correct'
      : result === 'nearMiss'
        ? ' lesson-quiz__feedback--near-miss'
        : ' lesson-quiz__feedback--wrong'

  const feedbackText =
    result === 'correct'
      ? 'Correct!'
      : result === 'nearMiss'
        ? 'Almost — check the pattern.'
        : `Not quite. Answer: ${question.correctAnswer}`

  return (
    <div className={`generated-quiz${compact ? ' generated-quiz--compact' : ''}`}>
      <p className="lesson-quiz__question">
        {renderPrompt(question.promptPlain ?? question.prompt)}
      </p>

      {question.hint && !revealed ? (
        <p className="generated-quiz__hint">{question.hint}</p>
      ) : null}

      {isMC ? (
        <div className="lesson-quiz__options" role="group">
          {question.options.map((option, index) => {
            let stateClass = ''
            if (revealed && option === question.correctAnswer) {
              stateClass = ' lesson-quiz__option--correct'
            } else if (revealed && index === selected && result !== 'correct') {
              stateClass = ' lesson-quiz__option--wrong'
            }
            return (
              <button
                key={option}
                type="button"
                className={`lesson-quiz__option${stateClass}`}
                disabled={revealed}
                onClick={() => selectOption(index, option)}
              >
                {option}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="generated-quiz__input-row">
          <input
            type="text"
            className="challenge-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={revealed}
            placeholder="Type your answer…"
            autoComplete="off"
            spellCheck={false}
            aria-label="Your answer"
          />
          {!revealed ? (
            <button type="button" className="btn btn--primary" onClick={submitTyped}>
              Check
            </button>
          ) : null}
        </div>
      )}

      {revealed ? (
        <div className={`lesson-quiz__feedback${feedbackClass}`} role="status">
          {feedbackText}
        </div>
      ) : null}
    </div>
  )
}
