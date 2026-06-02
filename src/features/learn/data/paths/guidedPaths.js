/** Guided learning journeys — recommend next steps across Learn / Practice / Read. */
export const GUIDED_PATHS = [
  {
    id: 'beginner',
    emoji: '🌱',
    title: 'Beginner Path',
    description: 'Articles, present tense, simple sentences — build your foundation.',
    lessonIds: [
      'articles-gender',
      'present-tense-endings',
      'sentence-structure',
      'numbers-counting',
      'survival-greek',
    ],
    practiceModes: ['flashcards', 'typing'],
    readPackIds: ['daily-routines', 'food-cafe', 'family-home'],
    readingTier: 1,
  },
  {
    id: 'travel',
    emoji: '✈️',
    title: 'Travel Greek Path',
    description: 'Survival phrases, directions, ordering — ready for a trip.',
    lessonIds: ['survival-greek', 'question-words', 'prepositions-basic', 'numbers-counting'],
    practiceModes: ['dictation', 'quick-challenge'],
    readPackIds: ['ordering-dialogues', 'directions-dialogues', 'transport-commute'],
    readingTier: 1,
  },
  {
    id: 'grammar-mastery',
    emoji: '📚',
    title: 'Grammar Mastery Path',
    description: 'Deep conjugation, plurals, agreement — systematic grammar strength.',
    lessonIds: [
      'present-tense-endings',
      'verb-conjugation-groups',
      'plurals-patterns',
      'adjective-agreement',
      'questions-negation',
    ],
    practiceModes: ['typing', 'weak-spot', 'sentence-builder'],
    readPackIds: ['verb-patterns', 'school-life'],
    readingTier: 2,
  },
  {
    id: 'reading',
    emoji: '📖',
    title: 'Reading Path',
    description: 'Gradual story progression — present tense toward richer dialogue.',
    lessonIds: ['sentence-structure', 'present-tense-endings', 'possessives'],
    practiceModes: ['flashcards', 'dictation'],
    readPackIds: ['daily-routines', 'school-life', 'hobbies-friends', 'travel-town'],
    readingTier: 2,
  },
  {
    id: 'time-action',
    emoji: '🧠',
    title: 'Time & Action Path',
    description: 'Master how Greek thinks about when and how actions unfold.',
    lessonIds: ['present-tense-endings', 'verb-conjugation-groups', 'time-and-aspect', 'past-tense-intro'],
    practiceModes: ['typing', 'quick-challenge'],
    readPackIds: ['verb-patterns', 'daily-routines'],
    readingTier: 3,
  },
]

export function getPathProgress(path, completedLessons) {
  const total = path.lessonIds.length
  const done = path.lessonIds.filter((id) => completedLessons.includes(id)).length
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 }
}

export function getNextPathStep(path, completedLessons) {
  const nextLessonId = path.lessonIds.find((id) => !completedLessons.includes(id))
  return nextLessonId ?? null
}

export function getActivePath(completedLessons) {
  let best = GUIDED_PATHS[0]
  let bestProgress = -1
  for (const path of GUIDED_PATHS) {
    const { done, total } = getPathProgress(path, completedLessons)
    if (done < total && done > bestProgress) {
      best = path
      bestProgress = done
    }
  }
  return best
}
