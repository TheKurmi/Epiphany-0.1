import { useCallback, useMemo } from 'react'
import {
  generateQuizSession,
  generateTypingQuestion,
  generateQuickQuestion,
  generateWeakSpotSession,
} from '@/features/learn/data/quiz'
import { getAggregatedWeakSpots, useAllMasteryProgress } from '@/features/learn/hooks/useMasteryProgress'
import { useTimedQuestionSession } from '@/shared/hooks/useTimedQuestionSession'

const SESSION_SIZE = 10

export { emptyPracticeStats, scorePercent } from '@/shared/quiz/practiceStats'
export { SESSION_SIZE as PRACTICE_SESSION_SIZE }

export function useTypingPracticeSession({
  topicId,
  masteryLevel,
  enabled,
  resetKey,
}) {
  const buildDeck = useCallback(() => {
    const questions = generateQuizSession(topicId, masteryLevel, SESSION_SIZE, (q) =>
      q.type !== 'multipleChoice' ? true : false,
    )
    if (questions.length >= 3) return questions
    return Array.from({ length: SESSION_SIZE }, () =>
      generateTypingQuestion(topicId, masteryLevel),
    ).filter(Boolean)
  }, [topicId, masteryLevel])

  return useTimedQuestionSession({ buildDeck, enabled, resetKey })
}

export function useQuickGrammarSession({
  topicId,
  masteryLevel,
  enabled,
  resetKey,
}) {
  const buildDeck = useCallback(
    () =>
      Array.from({ length: SESSION_SIZE }, () =>
        generateQuickQuestion(topicId, masteryLevel),
      ).filter(Boolean),
    [topicId, masteryLevel],
  )

  return useTimedQuestionSession({ buildDeck, enabled, resetKey })
}

export function useWeakSpotSession({ enabled, resetKey }) {
  const allProgress = useAllMasteryProgress()
  const weakSpots = useMemo(
    () => getAggregatedWeakSpots(allProgress),
    [allProgress],
  )

  const buildDeck = useCallback(() => {
    if (!weakSpots.length) return []
    return generateWeakSpotSession(weakSpots, SESSION_SIZE)
  }, [weakSpots])

  const session = useTimedQuestionSession({ buildDeck, enabled, resetKey })

  return { ...session, weakSpots }
}
