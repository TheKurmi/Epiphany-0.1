import { useState } from 'react'

/**
 * Inline concept-check questions for flagship lessons.
 * @param {{ title?: string, questions: { prompt: string, options: string[], correctIndex: number, explanation: string }[] }} props
 */
export default function ConceptDrill({ title, questions }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const q = questions[index]
  if (!q) return null

  const isCorrect = selected === q.correctIndex
  const isLast = index + 1 >= questions.length

  function choose(optionIndex) {
    if (revealed) return
    setSelected(optionIndex)
    setRevealed(true)
  }

  function next() {
    setSelected(null)
    setRevealed(false)
    setIndex((i) => i + 1)
  }

  return (
    <section className="concept-drill" aria-labelledby="concept-drill-title">
      {title ? (
        <h3 id="concept-drill-title" className="concept-drill__title">
          {title}
        </h3>
      ) : null}
      <p className="concept-drill__progress">
        Question {index + 1} of {questions.length}
      </p>
      <p className="concept-drill__prompt">{q.prompt}</p>
      <div className="concept-drill__options" role="group">
        {q.options.map((option, i) => {
          let state = ''
          if (revealed && i === q.correctIndex) state = ' concept-drill__option--correct'
          else if (revealed && i === selected && !isCorrect)
            state = ' concept-drill__option--wrong'
          return (
            <button
              key={option}
              type="button"
              className={`concept-drill__option${state}`}
              disabled={revealed}
              onClick={() => choose(i)}
            >
              {option}
            </button>
          )
        })}
      </div>
      {revealed ? (
        <div className="concept-drill__feedback" role="status">
          <p className="concept-drill__verdict">
            {isCorrect ? '✓ Exactly.' : 'Not quite — here is the idea:'}
          </p>
          <p className="concept-drill__explanation">{q.explanation}</p>
          {!isLast ? (
            <button type="button" className="btn btn--secondary" onClick={next}>
              Next question →
            </button>
          ) : (
            <p className="concept-drill__done">Concept check complete.</p>
          )}
        </div>
      ) : null}
    </section>
  )
}
