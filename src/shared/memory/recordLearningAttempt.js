import { recordPracticeAttempt } from '@/features/learn/hooks/useMasteryProgress'
import { recordReview } from '@/shared/hooks/useSpacedRepetition'
import { recordMistakePattern } from '@/shared/memory/mistakePatterns'

/**
 * Unified learning attempt — mastery weak spots, spaced repetition, mistake patterns.
 */
export function recordLearningAttempt(
  topicId,
  { result, patternTag, userInput, expected },
) {
  if (!topicId) return

  recordPracticeAttempt(topicId, { result, patternTag })

  const reviewKey = patternTag ? `${topicId}:${patternTag}` : `${topicId}:general`
  recordReview('pattern', reviewKey, {
    correct: result === 'correct',
    nearMiss: result === 'nearMiss',
  })

  if (result !== 'correct' && userInput && expected) {
    recordMistakePattern(userInput, expected, { patternTag })
  }
}
