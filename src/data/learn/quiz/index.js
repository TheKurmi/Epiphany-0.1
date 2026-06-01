import { getQuizProfile } from './profiles'
import { getMasteryLevel, MASTERY_LEVELS } from './levels'
import { generateConjugationQuestion, generateEndingRecognition } from './generators/conjugation'
import { generateArticlesQuestion } from './generators/articles'
import { generateNegationQuestion } from './generators/negation'
import { generateSentenceQuestion } from './generators/sentence'

/**
 * @typedef {'multipleChoice' | 'fillBlank' | 'sentenceBlank'} QuestionType
 *
 * @typedef {Object} GeneratedQuestion
 * @property {string} id
 * @property {QuestionType} type
 * @property {string} prompt
 * @property {string} [promptPlain]
 * @property {string[]} [options]
 * @property {string} correctAnswer
 * @property {string} [patternTag]
 * @property {string} [hint]
 */

export { MASTERY_LEVELS, getMasteryLevel, getQuizProfile }

/**
 * @param {string} topicId
 * @param {number} masteryLevel 1–4
 */
export function generateQuestion(topicId, masteryLevel) {
  const profile = getQuizProfile(topicId)
  if (!profile) return null

  switch (profile.type) {
    case 'conjugation':
      if (masteryLevel === 1 && Math.random() < 0.35) {
        return generateEndingRecognition(profile)
      }
      return generateConjugationQuestion(profile, masteryLevel)
    case 'articles':
      return generateArticlesQuestion(profile, masteryLevel)
    case 'negation':
      return generateNegationQuestion(profile, masteryLevel)
    case 'sentence':
      return generateSentenceQuestion(profile, masteryLevel)
    default:
      return null
  }
}

/**
 * @param {string} topicId
 * @param {number} masteryLevel
 * @param {number} [count]
 * @returns {GeneratedQuestion[]}
 */
export function generateQuizSession(topicId, masteryLevel, count) {
  const level = getMasteryLevel(masteryLevel)
  const size = count ?? level?.questionsPerSession ?? 5
  const questions = []
  const seen = new Set()

  let attempts = 0
  while (questions.length < size && attempts < size * 8) {
    attempts++
    const q = generateQuestion(topicId, masteryLevel)
    if (!q) break
    const key = `${q.promptPlain ?? q.prompt}-${q.correctAnswer}`
    if (seen.has(key)) continue
    seen.add(key)
    questions.push(q)
  }

  return questions
}

/** Single mini-check for inline lesson preview (always level 1). */
export function generateMiniQuiz(topicId) {
  return generateQuestion(topicId, 1)
}
