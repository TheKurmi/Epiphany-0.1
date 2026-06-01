import { filterVocabulary } from '@/data'
import { QUIZ_PROFILES } from '@/features/learn/data/quiz/profiles'

function vocabWords(category, difficulty) {
  return filterVocabulary({ category, difficulty }).map((w) => ({
    text: w.greek,
    hint: w.english,
    patternTag: `vocab-${w.category}`,
    level: 'beginner',
  }))
}

function numberItems() {
  const numbers = QUIZ_PROFILES.numbers?.drills ?? []
  return numbers.map((n) => ({
    text: n.answer,
    hint: n.hint ?? n.prompt.replace(/\*\*/g, ''),
    patternTag: n.patternTag ?? 'numbers',
    level: 'beginner',
  }))
}

function survivalItems() {
  const survival = QUIZ_PROFILES['survival-greek']?.drills ?? []
  return survival.slice(0, 12).map((p) => ({
    text: p.answer,
    hint: p.prompt.replace(/\*\*/g, ''),
    patternTag: p.patternTag ?? 'survival-phrase',
    level: 'beginner',
  }))
}
function phraseItems() {
  const articles = QUIZ_PROFILES.articles?.nouns ?? []
  const negation = QUIZ_PROFILES['questions-negation']?.verbs ?? []

  const fromArticles = articles.map((n) => ({
    text: n.phrase,
    hint: n.noun,
    patternTag: `article-${n.gender}`,
    level: 'intermediate',
  }))

  const fromNegation = negation.slice(0, 4).map((v) => ({
    text: v.affirmative,
    hint: v.english,
    patternTag: 'negation-affirmative',
    level: 'intermediate',
  }))

  return [...fromArticles, ...fromNegation]
}

function sentenceItems() {
  const templates = QUIZ_PROFILES['sentence-structure']?.templates ?? []
  const negQuestions = QUIZ_PROFILES['questions-negation']?.questionForms ?? []

  const fromTemplates = templates.map((t) => {
    const filled = t.prompt.replace('___', t.answer)
    return {
      text: filled.replace(/\.$/, '') + '.',
      hint: t.hint,
      patternTag: t.patternTag,
      level: 'advanced',
    }
  })

  const fromQuestions = negQuestions.map((q) => ({
    text: q.statement,
    hint: q.english,
    patternTag: 'question-form',
    level: 'advanced',
  }))

  return [...fromTemplates, ...fromQuestions]
}

/**
 * @param {'beginner'|'intermediate'|'advanced'} level
 * @param {{ category?: string, difficulty?: string }} [filters]
 */
export function getDictationPool(level, filters = {}) {
  const category = filters.category ?? 'all'
  const difficulty = filters.difficulty ?? 'all'

  const beginner = [
    ...vocabWords(category, difficulty),
    ...numberItems(),
    ...survivalItems(),
  ]
  const intermediate = phraseItems()
  const advanced = sentenceItems()

  if (level === 'beginner') return beginner.length ? beginner : intermediate
  if (level === 'intermediate') {
    return [...intermediate, ...beginner.slice(0, 20)]
  }
  return [...advanced, ...intermediate]
}
