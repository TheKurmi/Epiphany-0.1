import { topicToFilter } from '@/data/homeConfig'
import { useDeck } from '@/features/practice/hooks/useDeck'
import { useChallengeSession } from '@/features/practice/hooks/useChallengeSession'
import {
  useTypingPracticeSession,
  useQuickGrammarSession,
  useWeakSpotSession,
} from '@/features/practice/hooks/useQuizPracticeSession'
import { useDictationSession } from '@/features/practice/hooks/useDictationSession'
import { useSentenceBuilderSession } from '@/features/practice/hooks/useSentenceBuilderSession'
import { SCREENS } from '@/app/navigation/screens'

/**
 * Mounts all practice session hooks; enables exactly one based on active config.
 */
export function usePracticeSessionStack({ screen, activeConfig, sessionKey }) {
  const inSession = screen === SCREENS.SESSION && activeConfig !== null

  const category = inSession ? topicToFilter(activeConfig.topic) : 'all'
  const difficulty = inSession ? activeConfig.difficulty : 'easy'
  const grammarTopic = inSession ? activeConfig.grammarTopic : 'present-tense'
  const masteryLevel = inSession ? activeConfig.masteryLevel : 2

  const isFlashcards = inSession && activeConfig.activityMode === 'flashcards'
  const isVocabQuick =
    inSession &&
    activeConfig.activityMode === 'quick-challenge' &&
    activeConfig.quickChallengeSource === 'vocabulary'
  const isTyping = inSession && activeConfig.activityMode === 'typing'
  const isGrammarQuick =
    inSession &&
    activeConfig.activityMode === 'quick-challenge' &&
    activeConfig.quickChallengeSource === 'grammar'
  const isDictation = inSession && activeConfig.activityMode === 'dictation'
  const isSentenceBuilder =
    inSession && activeConfig.activityMode === 'sentence-builder'
  const isWeakSpot = inSession && activeConfig.activityMode === 'weak-spot'

  const study = useDeck({
    category,
    difficulty,
    enabled: isFlashcards,
    resetKey: sessionKey,
  })

  const challenge = useChallengeSession({
    category,
    difficulty,
    enabled: isVocabQuick,
    resetKey: sessionKey,
  })

  const typing = useTypingPracticeSession({
    topicId: grammarTopic,
    masteryLevel,
    enabled: isTyping,
    resetKey: sessionKey,
  })

  const quickGrammar = useQuickGrammarSession({
    topicId: grammarTopic,
    masteryLevel,
    enabled: isGrammarQuick,
    resetKey: sessionKey,
  })

  const dictation = useDictationSession({
    dictationLevel: activeConfig?.dictationLevel ?? 'beginner',
    topic: activeConfig?.topic ?? 'mixed',
    difficulty: activeConfig?.difficulty ?? 'easy',
    enabled: isDictation,
    resetKey: sessionKey,
  })

  const sentenceBuilder = useSentenceBuilderSession({
    enabled: isSentenceBuilder,
    resetKey: sessionKey,
  })

  const weakSpot = useWeakSpotSession({
    enabled: isWeakSpot,
    resetKey: sessionKey,
  })

  return {
    study,
    challenge,
    typing,
    quickGrammar,
    dictation,
    sentenceBuilder,
    weakSpot,
  }
}
