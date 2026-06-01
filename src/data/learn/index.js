import { LEARN_TOPICS } from './topics'
import { LEARNING_PATH } from './path'
import { LEARN_LEVELS, getLevelById } from './levels'
import { LESSONS, ALL_LESSONS } from './lessons'

/**
 * @typedef {Object} LessonExample
 * @property {string} greek
 * @property {string} english
 * @property {string} [note]
 *
 * @typedef {Object} LessonQuiz
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctIndex
 *
 * @typedef {'beginner' | 'intermediate' | 'advanced'} LessonLevel
 *
 * @typedef {Object} LessonSection
 * @property {string} type
 *
 * @typedef {Object} LessonIntro
 * @property {string[]} paragraphs
 * @property {LessonExample[]} [examples]
 *
 * @typedef {Object} LessonDeepDive
 * @property {string} [title]
 * @property {string} [teaser]
 * @property {LessonSection[]} sections
 *
 * @typedef {Object} LessonMistake
 * @property {string} [title]
 * @property {string} text
 *
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} topicId
 * @property {LessonLevel} level
 * @property {number} pathOrder
 * @property {string} [duration]
 * @property {string} title
 * @property {string} summary
 * @property {LessonIntro} intro
 * @property {LessonSection[]} sections
 * @property {LessonMistake[]} [commonMistakes]
 * @property {string} [commonMistake]
 * @property {LessonQuiz} [quiz]
 * @property {LessonDeepDive} [deepDive]
 */

export {
  LEARN_TOPICS,
  LEARNING_PATH,
  LEARN_LEVELS,
  LESSONS,
  ALL_LESSONS,
  getLevelById,
}

export function getLessonById(id) {
  return LESSONS[id] ?? null
}

export function getPathLessons() {
  return LEARNING_PATH.map((id, index) => {
    const lesson = LESSONS[id]
    return lesson ? { ...lesson, pathLabel: `Lesson ${index + 1}` } : null
  }).filter(Boolean)
}

export function getPathLessonsByLevel() {
  return LEARN_LEVELS.map((level) => ({
    ...level,
    lessons: getPathLessons().filter((lesson) => lesson.level === level.id),
  })).filter((group) => group.lessons.length > 0)
}

export function getTopicById(topicId) {
  return LEARN_TOPICS.find((t) => t.id === topicId) ?? null
}

export function getLessonsForTopic(topicId) {
  return ALL_LESSONS.filter((lesson) => lesson.topicId === topicId)
}

export function getPrimaryLessonForTopic(topicId) {
  return getLessonsForTopic(topicId)[0] ?? null
}

export function getTopicsByLevel() {
  return LEARN_LEVELS.map((level) => ({
    ...level,
    topics: LEARN_TOPICS.filter((t) => t.level === level.id),
  }))
}
