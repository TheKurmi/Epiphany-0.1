/** Topic choices on the home screen (Mixed = all categories). */
export const HOME_TOPICS = [
  { id: 'food', label: 'Food' },
  { id: 'animals', label: 'Animals' },
  { id: 'travel', label: 'Travel' },
  { id: 'school', label: 'School' },
  { id: 'nature', label: 'Nature' },
  { id: 'mixed', label: 'Mixed' },
]

export const HOME_DIFFICULTIES = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
]

export function topicToFilter(topicId) {
  return topicId === 'mixed' ? 'all' : topicId
}

export const DEFAULT_SESSION_CONFIG = {
  practiceMode: 'study',
  studyDirection: 'gr-en',
  difficulty: 'easy',
  topic: 'mixed',
  learningStyle: 'picture',
}
