import { getQuizProfile } from './profiles'
import { getMasteryLevel, MASTERY_LEVELS } from './levels'
import { generateConjugationQuestion, generateEndingRecognition } from './generators/conjugation'
import { generateArticlesQuestion } from './generators/articles'
import { generateNegationQuestion } from './generators/negation'
import { generateSentenceQuestion } from './generators/sentence'
import { generateVocabularyQuestion } from './generators/vocabulary'

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
    case 'vocabulary':
      return generateVocabularyQuestion(profile, masteryLevel)
    default:
      return null
  }
}

/** Single mini-check for inline lesson preview (always level 1). */
export function generateMiniQuiz(topicId) {
  return generateQuestion(topicId, 1)
}

/** Typed-only questions for Typing Practice (levels 2–4). */
export function generateTypingQuestion(topicId, masteryLevel = 2) {
  for (let i = 0; i < 12; i++) {
    const level = masteryLevel >= 2 ? masteryLevel : 2
    const q = generateQuestion(topicId, level)
    if (q && q.type !== 'multipleChoice') return q
  }
  return generateQuestion(topicId, 2)
}

/** Rapid-fire mix for Quick Challenge — MC + typed. */
export function generateQuickQuestion(topicId, masteryLevel = 1) {
  return generateQuestion(topicId, masteryLevel)
}

/**
 * @param {string} topicId
 * @param {number} masteryLevel
 * @param {number} [count]
 * @param {(q: GeneratedQuestion) => boolean} [filter]
 */
export function generateQuizSession(topicId, masteryLevel, count, filter) {
  const level = getMasteryLevel(masteryLevel)
  const size = count ?? level?.questionsPerSession ?? 5
  const questions = []
  const seen = new Set()

  let attempts = 0
  while (questions.length < size && attempts < size * 12) {
    attempts++
    const q = generateQuestion(topicId, masteryLevel)
    if (!q) break
    if (filter && !filter(q)) continue
    const key = `${q.promptPlain ?? q.prompt}-${q.correctAnswer}`
    if (seen.has(key)) continue
    seen.add(key)
    questions.push(q)
  }

  return questions
}

/**
 * @param {{ topicId: string, patternTag: string }[]} weakSpots
 * @param {number} [count]
 */
export function generateWeakSpotSession(weakSpots, count = 8) {
  if (!weakSpots.length) return []

  const questions = []
  const seen = new Set()
  let attempts = 0

  while (questions.length < count && attempts < count * 15) {
    attempts++
    const spot = weakSpots[questions.length % weakSpots.length]
    const q = generateQuestion(spot.topicId, 2)
    if (!q) continue
    if (spot.patternTag && q.patternTag !== spot.patternTag && attempts % 3 !== 0) {
      continue
    }
    const key = `${q.promptPlain ?? q.prompt}-${q.correctAnswer}`
    if (seen.has(key)) continue
    seen.add(key)
    questions.push({
      ...q,
      weakSpotTag: spot.patternTag,
      topicId: spot.topicId,
    })
  }

  return questions
}
