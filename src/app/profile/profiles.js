/** Learner profile definitions — affects recommendations, not real progression locks. */
export const LEARNING_PROFILES = {
  beginner: {
    id: 'beginner',
    emoji: '🌱',
    label: 'Beginner',
    description: 'Full guided path from the basics.',
    recommendedStartLesson: 'articles-gender',
    unlockBypass: false,
    defaultDifficulty: 'easy',
  },
  intermediate: {
    id: 'intermediate',
    emoji: '📚',
    label: 'Intermediate',
    description: 'Assumes core grammar — emphasis on verb groups and past tense.',
    recommendedStartLesson: 'verb-conjugation-groups',
    unlockBypass: false,
    defaultDifficulty: 'medium',
  },
  fluent: {
    id: 'fluent',
    emoji: '🧠',
    label: 'Fluent Speaker',
    description: 'Reading, nuance, and advanced patterns.',
    recommendedStartLesson: 'past-tense-intro',
    unlockBypass: false,
    defaultDifficulty: 'hard',
  },
  developer: {
    id: 'developer',
    emoji: '🛠',
    label: 'Developer Mode',
    description: 'Unlock everything and expose testing tools.',
    recommendedStartLesson: null,
    unlockBypass: true,
    defaultDifficulty: 'all',
  },
}

export const PROFILE_IDS = Object.keys(LEARNING_PROFILES)

export function getProfile(id) {
  return LEARNING_PROFILES[id] ?? LEARNING_PROFILES.beginner
}
