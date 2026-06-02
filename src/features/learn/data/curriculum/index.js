/**
 * Master curriculum registry — topics, levels, and roadmap metadata.
 * Lessons live in lessons/; quiz profiles in quiz/profiles.js.
 */

import { isLessonUnlocked } from '@/app/access'

export const CURRICULUM_LEVELS = ['beginner', 'intermediate', 'advanced']

/** Topic IDs grouped for progression recommendations. */
export const BEGINNER_CORE = [
  'articles',
  'present-tense',
  'sentence-structure',
  'questions-negation',
]

export const BEGINNER_FOUNDATIONS = [
  'numbers',
  'dates',
  'time',
  'plurals',
  'possessives',
  'question-words',
  'prepositions',
  'modals',
  'survival-greek',
  'conversation',
]

export const INTERMEDIATE_TRACK = [
  'verb-groups',
  'past-tense',
  'pronouns',
  'adjectives',
  'compound-sentences',
  'frequency',
]

export const ADVANCED_ROADMAP = [
  'irregular',
  'passive',
  'cases',
  'conditionals',
  'idioms',
  'formal-register',
]

/** Maps topic id → primary lesson id for recommendations. */
export const TOPIC_PRIMARY_LESSON = {
  articles: 'articles-gender',
  'present-tense': 'present-tense-endings',
  'verb-groups': 'verb-conjugation-groups',
  'sentence-structure': 'sentence-structure',
  'questions-negation': 'questions-negation',
  numbers: 'numbers-counting',
  dates: 'dates-calendar',
  time: 'time-clock',
  plurals: 'plurals-patterns',
  possessives: 'possessives',
  'question-words': 'question-words',
  prepositions: 'prepositions-basic',
  modals: 'modal-verbs',
  'survival-greek': 'survival-greek',
  conversation: 'conversation-patterns',
  'past-tense': 'past-tense-intro',
  'time-aspect': 'time-and-aspect',
  pronouns: 'object-pronouns',
  adjectives: 'adjective-agreement',
  'compound-sentences': 'compound-sentences',
  frequency: 'frequency-habit',
}

/**
 * Suggest the next lesson based on path order and unlock state.
 * @param {string[]} completedLessonIds
 * @param {string[]} pathOrder — from path.js LEARNING_PATH
 */
export function getRecommendedNextLesson(completedLessonIds, pathOrder) {
  for (const lessonId of pathOrder) {
    if (completedLessonIds.includes(lessonId)) continue
    if (isLessonUnlocked(lessonId, completedLessonIds)) {
      return lessonId
    }
  }
  return null
}

/**
 * Suggest next topic to browse when path is complete.
 * @param {string[]} completedLessonIds
 * @param {{ id: string, comingSoon?: boolean }[]} topics
 */
export function getRecommendedNextTopic(completedLessonIds, topics) {
  for (const topic of topics) {
    if (topic.comingSoon) continue
    const lessonId = TOPIC_PRIMARY_LESSON[topic.id]
    if (lessonId && !completedLessonIds.includes(lessonId)) {
      return topic
    }
  }
  return null
}
