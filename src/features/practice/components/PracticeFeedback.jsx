import { evaluateAnswer, getNearMissHint } from '@/utils/answers'
import GreekWord from '@/features/practice/screens/GreekWord'

export default function PracticeFeedback({
  phase,
  answer,
  userAnswer,
  showPronunciation,
  answerIsGreek = true,
}) {
  if (phase === 'input') return null

  function renderAnswer() {
    if (answerIsGreek) {
      return (
        <GreekWord text={answer} showGuide={showPronunciation} size="md" />
      )
    }
    return <span>{answer}</span>
  }

  const nearMissHint =
    phase === 'near-miss' && userAnswer
      ? getNearMissHint(userAnswer, answer)
      : null

  if (phase === 'correct') {
    return (
      <div className="feedback-banner feedback-banner--correct" role="status">
        <span className="feedback-banner__icon" aria-hidden="true">
          ✓
        </span>
        <div>
          <strong>Correct!</strong>
          <div className="feedback-banner__answer">{renderAnswer()}</div>
        </div>
      </div>
    )
  }

  if (phase === 'near-miss') {
    return (
      <div className="feedback-banner feedback-banner--near-miss" role="status">
        <span className="feedback-banner__icon" aria-hidden="true">
          ⚠
        </span>
        <div>
          <strong>Almost!</strong>
          {nearMissHint ? (
            <p className="feedback-banner__label">{nearMissHint}</p>
          ) : (
            <p className="feedback-banner__label">
              Very close — check the spelling:
            </p>
          )}
          <div className="feedback-banner__answer">{renderAnswer()}</div>
          <p className="feedback-banner__note">Counted as a near miss</p>
        </div>
      </div>
    )
  }

  if (phase === 'incorrect') {
    return (
      <div className="feedback-banner feedback-banner--wrong" role="status">
        <span className="feedback-banner__icon" aria-hidden="true">
          ✗
        </span>
        <div>
          <strong>Not quite</strong>
          <p className="feedback-banner__label">Correct answer:</p>
          <div className="feedback-banner__answer">{renderAnswer()}</div>
        </div>
      </div>
    )
  }

  if (phase === 'skipped') {
    return (
      <div className="feedback-banner feedback-banner--skipped" role="status">
        <span className="feedback-banner__icon" aria-hidden="true">
          ↷
        </span>
        <div>
          <strong>Answer revealed</strong>
          <p className="feedback-banner__label">Correct answer:</p>
          <div className="feedback-banner__answer">{renderAnswer()}</div>
        </div>
      </div>
    )
  }

  return null
}

export function resultToPhase(result) {
  if (result === 'wrong') return 'incorrect'
  if (result === 'nearMiss') return 'near-miss'
  return result
}

export function evaluateTypedAnswer(input, expected) {
  const result = evaluateAnswer(input.trim(), expected)
  return {
    result,
    phase: resultToPhase(result),
    statType: result === 'wrong' ? 'incorrect' : result,
  }
}
