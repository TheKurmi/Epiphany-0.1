import { LEARN_TOPICS } from '@/features/learn/data/topics'
import { QUIZ_PROFILES } from '@/features/learn/data/quiz/profiles'
import { HOME_DIFFICULTIES, HOME_TOPICS } from '@/data/homeConfig'

/** Grammar topics that have quiz generators available. */
export const GRAMMAR_PRACTICE_TOPICS = LEARN_TOPICS.filter(
  (t) => !t.comingSoon && QUIZ_PROFILES[t.id],
).map((t) => ({ id: t.id, label: t.label }))

export const DICTATION_LEVELS = [
  { id: 'beginner', label: 'Beginner', hint: 'Slower speech · isolated words' },
  {
    id: 'intermediate',
    label: 'Intermediate',
    hint: 'Normal speed · short phrases',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    hint: 'Natural speed · full sentences',
  },
]

export const MASTERY_LEVEL_OPTIONS = [
  { id: 1, label: 'Recognition' },
  { id: 2, label: 'Production' },
  { id: 3, label: 'Sentences' },
  { id: 4, label: 'Mixed' },
]

export const DEFAULT_PRACTICE_CONFIG = {
  activityMode: 'flashcards',
  studyDirection: 'gr-en',
  difficulty: 'easy',
  topic: 'mixed',
  learningStyle: 'picture',
  grammarTopic: 'present-tense',
  masteryLevel: 2,
  dictationLevel: 'beginner',
  quickChallengeSource: 'grammar',
}

export { HOME_DIFFICULTIES, HOME_TOPICS }
