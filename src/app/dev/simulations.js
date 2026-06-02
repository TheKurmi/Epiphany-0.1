/**
 * Learner state presets for developer testing.
 */
import { LEARNING_PATH } from '@/features/learn/data/path'
import { LEARN_TOPICS } from '@/features/learn/data/topics'

export const PROGRESSION_PRESETS = {
  beginner: {
    id: 'beginner',
    emoji: '🌱',
    label: 'Beginner progress',
    description: 'First 8 path lessons marked complete.',
    lessonIds: LEARNING_PATH.slice(0, 8),
  },
  intermediate: {
    id: 'intermediate',
    emoji: '📚',
    label: 'Intermediate progress',
    description: 'Through modal verbs and conversation patterns.',
    lessonIds: LEARNING_PATH.slice(0, 17),
  },
  advanced: {
    id: 'advanced',
    emoji: '🧠',
    label: 'Advanced progress',
    description: 'Full learning path marked complete.',
    lessonIds: [...LEARNING_PATH],
  },
}

export const LEARNER_SIMULATIONS = {
  fresh: {
    id: 'fresh',
    emoji: '🆕',
    label: 'New learner',
    description: 'Empty progress — nothing completed.',
    preset: null,
    profile: 'beginner',
  },
  struggling: {
    id: 'struggling',
    emoji: '😓',
    label: 'Struggling learner',
    description: 'Partial progress, weak spots, review queue, mistakes.',
    preset: 'beginner',
    profile: 'beginner',
    injectWeakSpots: true,
    injectMistakes: 'vowel_confusion',
  },
  advanced: {
    id: 'advanced',
    emoji: '🎓',
    label: 'Advanced learner',
    description: 'Full path complete, high mastery.',
    preset: 'advanced',
    profile: 'fluent',
    fullMastery: true,
  },
  vocabHeavy: {
    id: 'vocabHeavy',
    emoji: '📇',
    label: 'Vocabulary-heavy',
    description: 'Many vocab items due for review.',
    preset: 'intermediate',
    profile: 'intermediate',
    injectVocabReview: 12,
  },
  grammarHeavy: {
    id: 'grammarHeavy',
    emoji: '📝',
    label: 'Grammar-heavy',
    description: 'Tense and article mistake patterns dominate.',
    preset: 'intermediate',
    profile: 'intermediate',
    injectMistakes: 'tense_selection',
    injectGrammarReview: 8,
  },
}

export const MISTAKE_SIMULATIONS = {
  vowel_confusion: {
    id: 'vowel_confusion',
    label: 'ει / ι confusion',
    category: 'vowel_confusion',
    count: 12,
    sample: { userInput: 'ειμαι', expected: 'είμαι' },
  },
  accent: {
    id: 'accent',
    label: 'Accent mistakes',
    category: 'accent',
    count: 10,
    sample: { userInput: 'ειμαι', expected: 'είμαι' },
  },
  tense_selection: {
    id: 'tense_selection',
    label: 'Tense / aspect confusion',
    category: 'tense_selection',
    count: 10,
    patternTag: 'verb-aspect',
  },
  article: {
    id: 'article',
    label: 'Article mismatch',
    category: 'article',
    count: 8,
    patternTag: 'article-feminine',
  },
  plural: {
    id: 'plural',
    label: 'Plural endings',
    category: 'plural',
    count: 8,
    patternTag: 'plural-neuter',
  },
  adjective_agreement: {
    id: 'adjective_agreement',
    label: 'Adjective agreement',
    category: 'adjective_agreement',
    count: 6,
    patternTag: 'adjective-agreement',
  },
}

/** Topic IDs with quiz profiles — for mastery injection. */
export function getQuizTopicIds() {
  return LEARN_TOPICS.filter((t) => !t.comingSoon).map((t) => t.id)
}
