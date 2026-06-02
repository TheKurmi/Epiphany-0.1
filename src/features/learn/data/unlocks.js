/** Prerequisite lesson IDs — unlock guided progression. */
export const LESSON_PREREQUISITES = {
  'articles-gender': [],
  'present-tense-endings': ['articles-gender'],
  'echo-essential': ['present-tense-endings'],
  'eimai-essential': ['echo-essential'],
  'sentence-structure': ['present-tense-endings'],
  'questions-negation': ['sentence-structure'],
  'numbers-counting': ['present-tense-endings'],
  'survival-greek': ['numbers-counting'],
  'possessives': ['sentence-structure'],
  'question-words': ['questions-negation'],
  'prepositions-basic': ['question-words'],
  'plurals-patterns': ['articles-gender', 'sentence-structure'],
  'dates-calendar': ['numbers-counting'],
  'time-clock': ['dates-calendar', 'numbers-counting'],
  'modal-verbs': ['present-tense-endings', 'sentence-structure'],
  'conversation-patterns': ['modal-verbs', 'survival-greek'],
  'verb-conjugation-groups': ['present-tense-endings', 'echo-essential'],
  'time-and-aspect': ['verb-conjugation-groups', 'present-tense-endings'],
  'past-tense-intro': ['time-and-aspect', 'verb-conjugation-groups', 'present-tense-endings'],
  'object-pronouns': ['past-tense-intro', 'sentence-structure'],
  'adjective-agreement': ['plurals-patterns', 'articles-gender'],
  'frequency-habit': ['present-tense-endings', 'sentence-structure'],
  'compound-sentences': ['questions-negation', 'frequency-habit'],
}

export function getLessonPrerequisites(lessonId) {
  return LESSON_PREREQUISITES[lessonId] ?? []
}

export function isLessonUnlocked(lessonId, completedLessonIds) {
  const prereqs = getLessonPrerequisites(lessonId)
  return prereqs.every((id) => completedLessonIds.includes(id))
}

export function getUnlockHint(lessonId) {
  const prereqs = getLessonPrerequisites(lessonId)
  if (!prereqs.length) return null
  return `Complete ${prereqs.length === 1 ? 'the previous lesson' : `${prereqs.length} earlier lessons`} first`
}
