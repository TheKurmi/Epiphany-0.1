import { useMemo, useState } from 'react'
import { generateMiniQuiz } from '../../data/learn/quiz'
import GeneratedQuizQuestion from './GeneratedQuizQuestion'

export default function MiniGeneratedQuiz({ topicId }) {
  const [key, setKey] = useState(0)
  const question = useMemo(
    () => (topicId ? generateMiniQuiz(topicId) : null),
    [topicId, key],
  )

  if (!topicId || !question) return null

  return (
    <section className="lesson-quiz" aria-label="Quick check">
      <h3 className="lesson-quiz__title">Quick check</h3>
      <GeneratedQuizQuestion
        key={key}
        question={question}
        compact
        onAnswer={() => {}}
      />
      <button
        type="button"
        className="link-btn lesson-quiz__retry"
        onClick={() => setKey((k) => k + 1)}
      >
        New question
      </button>
    </section>
  )
}
