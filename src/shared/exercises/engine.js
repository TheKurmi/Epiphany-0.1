/**
 * Generated exercise engine — composes drills from vocabulary, patterns, and templates.
 * Avoids hardcoding every quiz; scales with registry metadata.
 */
import { queryVocabulary, getVocabByWord } from '@/data/vocabulary/registry'
import { SENTENCE_BUILDER_TEMPLATES } from '@/features/practice/data/sentenceTemplates'
import { conjugate, PRESENT_OMEGA_ENDINGS } from '@/features/learn/data/patterns/conjugation'
import { shuffleDeck } from '@/data'

/**
 * @typedef {Object} GeneratedExercise
 * @property {string} id
 * @property {'typing'|'mc'|'ordering'|'dictation'} type
 * @property {string} prompt
 * @property {string} answer
 * @property {string[]} [options]
 * @property {string} patternTag
 * @property {string} [hint]
 */

/** Generate conjugation drill from a verb stem. */
export function generateConjugationDrill(stem, { personIndex = 2 } = {}) {
  const row = conjugate(stem, PRESENT_OMEGA_ENDINGS)[personIndex]
  if (!row) return null
  return {
    id: `conj-${stem}-${personIndex}`,
    type: 'typing',
    prompt: `Conjugate **${stem}** for ${row.person}:`,
    answer: row.form,
    options: PRESENT_OMEGA_ENDINGS.map((_, i) => conjugate(stem, PRESENT_OMEGA_ENDINGS)[i]?.form).filter(Boolean).slice(0, 3),
    patternTag: `ending-${['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'][personIndex]}`,
    hint: `Present tense ${row.person}`,
  }
}

/** Generate vocabulary MC from registry. */
export function generateVocabMc({ category = 'all', difficulty = 'all', count = 5 } = {}) {
  const pool = shuffleDeck(queryVocabulary({ category, difficulty }))
  const exercises = []

  for (let i = 0; i < Math.min(count, pool.length); i++) {
    const word = pool[i]
    const distractors = pool
      .filter((w) => w.id !== word.id)
      .slice(0, 2)
      .map((w) => w.translation)

    exercises.push({
      id: `vocab-mc-${word.id}`,
      type: 'mc',
      prompt: `What does **${word.word}** mean?`,
      answer: word.translation,
      options: shuffleDeck([word.translation, ...distractors]),
      patternTag: `vocab-${word.category}`,
      hint: word.category,
    })
  }

  return exercises
}

/** Generate dictation items from vocabulary metadata. */
export function generateDictationBatch({ category = 'all', difficulty = 'all', count = 8 } = {}) {
  return queryVocabulary({ category, difficulty })
    .slice(0, count)
    .map((w) => ({
      id: `dict-${w.id}`,
      type: 'dictation',
      prompt: `Listen and type: ${w.translation}`,
      answer: w.word,
      patternTag: `vocab-${w.category}`,
      hint: w.translation,
    }))
}

/** Sentence ordering from templates — adaptive by pattern tag. */
export function generateOrderingExercises({ patternTag, count = 5 } = {}) {
  let pool = SENTENCE_BUILDER_TEMPLATES
  if (patternTag) pool = pool.filter((t) => t.patternTag === patternTag)
  return shuffleDeck(pool)
    .slice(0, count)
    .map((t) => ({
      id: `order-${t.id}`,
      type: 'ordering',
      prompt: t.hint,
      answer: t.sentence,
      words: t.words,
      patternTag: t.patternTag,
      hint: t.hint,
    }))
}

/**
 * Adaptive batch — easier reinforcement after mistakes, harder when strong.
 * @param {{ masteryPercent: number, weakPatternTags?: string[] }} learnerState
 */
export function generateAdaptiveBatch(learnerState) {
  const { masteryPercent = 0, weakPatternTags = [] } = learnerState
  const difficulty =
    masteryPercent >= 70 ? 'hard' : masteryPercent >= 40 ? 'medium' : 'easy'

  const exercises = []

  if (weakPatternTags.some((t) => t.startsWith('ending-'))) {
    exercises.push(generateConjugationDrill('γράφ', { personIndex: 2 }))
    exercises.push(generateConjugationDrill('πίν', { personIndex: 1 }))
  }

  exercises.push(...generateVocabMc({ difficulty, count: 3 }))

  if (masteryPercent >= 50) {
    exercises.push(...generateOrderingExercises({ count: 2 }))
  }

  return exercises.filter(Boolean)
}

/** Lookup registry metadata for inline vocab popups. */
export function lookupWordMeta(word) {
  return getVocabByWord(word)
}
