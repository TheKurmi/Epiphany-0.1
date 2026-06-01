import { useState } from 'react'
import GeneratedQuizQuestion from '@/shared/quiz/GeneratedQuizQuestion'

export default function ComprehensionQuiz({ questions, onComplete }) {
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!questions?.length) return null

  const current = questions[index]

  function handleAnswer({ result }) {
    const nextCorrect = result === 'correct' ? correct + 1 : correct
    setCorrect(nextCorrect)

    if (index + 1 >= questions.length) {
      setFinished(true)
      onComplete?.({ correct: nextCorrect, total: questions.length })
    } else {
      setIndex((i) => i + 1)
    }
  }

  if (finished) {
    const pct = Math.round((correct / questions.length) * 100)
    return (
      <section className="comprehension-quiz comprehension-quiz--done" aria-live="polite">
        <h2 className="comprehension-quiz__title">Comprehension complete</h2>
        <p className="comprehension-quiz__score">
          {correct} / {questions.length} correct ({pct}%)
        </p>
        <p className="comprehension-quiz__hint">
          {pct >= 80
            ? 'Great reading comprehension!'
            : 'Re-read the story and try again anytime.'}
        </p>
      </section>
    )
  }

  return (
    <section className="comprehension-quiz" aria-labelledby="comprehension-heading">
      <h2 id="comprehension-heading" className="comprehension-quiz__title">
        Comprehension check
      </h2>
      <p className="comprehension-quiz__progress">
        Question {index + 1} of {questions.length}
      </p>
      <GeneratedQuizQuestion
        key={index}
        question={{
          type: 'multipleChoice',
          prompt: current.question,
          promptPlain: current.question,
          options: current.options,
          correctAnswer: current.options[current.correctIndex],
        }}
        onAnswer={handleAnswer}
      />
    </section>
  )
}
