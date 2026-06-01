import { useState } from 'react'

export default function LessonQuiz({ quiz }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  if (!quiz) return null

  const isCorrect = selected === quiz.correctIndex

  function handleSelect(index) {
    if (revealed) return
    setSelected(index)
    setRevealed(true)
  }

  function handleRetry() {
    setSelected(null)
    setRevealed(false)
  }

  return (
    <section className="lesson-quiz" aria-label="Mini quiz">
      <h3 className="lesson-quiz__title">Quick check</h3>
      <p className="lesson-quiz__question">{quiz.question}</p>

      <div className="lesson-quiz__options" role="group" aria-label="Answer choices">
        {quiz.options.map((option, index) => {
          let stateClass = ''
          if (revealed && index === quiz.correctIndex) {
            stateClass = ' lesson-quiz__option--correct'
          } else if (revealed && index === selected && !isCorrect) {
            stateClass = ' lesson-quiz__option--wrong'
          } else if (selected === index) {
            stateClass = ' lesson-quiz__option--selected'
          }

          return (
            <button
              key={option}
              type="button"
              className={`lesson-quiz__option${stateClass}`}
              onClick={() => handleSelect(index)}
              disabled={revealed}
            >
              {option}
            </button>
          )
        })}
      </div>

      {revealed ? (
        <div
          className={`lesson-quiz__feedback${
            isCorrect ? ' lesson-quiz__feedback--correct' : ' lesson-quiz__feedback--wrong'
          }`}
          role="status"
        >
          {isCorrect ? 'Nice — you got it!' : 'Not quite. Review the examples above.'}
          {!isCorrect ? (
            <button
              type="button"
              className="link-btn lesson-quiz__retry"
              onClick={handleRetry}
            >
              Try again
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
