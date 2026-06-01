import { useMemo, useState } from 'react'
import { generateQuizSession, getMasteryLevel } from '../../data/learn/quiz'
import { useMasteryProgress } from '../../hooks/useMasteryProgress'
import GeneratedQuizQuestion from './GeneratedQuizQuestion'

export default function MasteryQuizSession({
  topicId,
  masteryLevel,
  onComplete,
  onBack,
}) {
  const { recordSession } = useMasteryProgress(topicId)
  const levelConfig = getMasteryLevel(masteryLevel)

  const questions = useMemo(
    () => generateQuizSession(topicId, masteryLevel),
    [topicId, masteryLevel],
  )

  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const current = questions[index]
  const correct = answers.filter((a) => a.result === 'correct').length
  const nearMiss = answers.filter((a) => a.result === 'nearMiss').length

  function handleAnswer(payload) {
    const next = [...answers, payload]
    setAnswers(next)

    if (index + 1 >= questions.length) {
      recordSession(masteryLevel, next)
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  if (!questions.length) {
    return (
      <div className="mastery-quiz">
        <p className="empty-state">Quiz content coming soon for this topic.</p>
        <button type="button" className="btn btn--secondary" onClick={onBack}>
          ← Back
        </button>
      </div>
    )
  }

  if (finished) {
    const total = questions.length
    const score = Math.round((correct / total) * 100)
    const passed = score / 100 >= (levelConfig?.passThreshold ?? 0.6)

    return (
      <div className="mastery-quiz mastery-quiz--complete">
        <h2 className="mastery-quiz__title">Session complete</h2>
        <div
          className="session-score-ring mastery-quiz__ring"
          style={{ '--score': score }}
        >
          <span className="session-score-ring__value">{score}%</span>
          <span className="session-score-ring__label">Score</span>
        </div>
        <div className="mastery-quiz__stats">
          <span className="stat-chip stat-chip--good">✓ {correct}</span>
          {nearMiss ? (
            <span className="stat-chip stat-chip--near-miss">⚠ {nearMiss}</span>
          ) : null}
          <span className="stat-chip stat-chip--bad">
            ✗ {total - correct - nearMiss}
          </span>
        </div>
        <p className="mastery-quiz__summary">
          {passed
            ? 'Nice work — patterns are sticking!'
            : 'Keep practicing — review the lesson and try again.'}
        </p>
        <div className="mastery-quiz__actions">
          <button type="button" className="btn btn--primary" onClick={onComplete}>
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mastery-quiz">
      <header className="mastery-quiz__header">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Back
        </button>
        <p className="mastery-quiz__progress">
          Question {index + 1} / {questions.length}
        </p>
        <div className="progress-bar__track mastery-quiz__bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${((index) / questions.length) * 100}%` }}
          />
        </div>
      </header>

      <GeneratedQuizQuestion
        key={current.id}
        question={current}
        onAnswer={handleAnswer}
      />
    </div>
  )
}
