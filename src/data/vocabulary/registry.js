/**
 * Central vocabulary registry — single source of truth for all word metadata.
 * Consumed by flashcards, dictation, stories, quizzes, and adaptive systems.
 */
import allItems from './all.json'
import { VOCAB_BATCHES } from './batches/index.js'
import { normalizeCategory, getCategoryLabel, VOCAB_CATEGORIES } from './categories'

/** @typedef {import('@/schemas/content').VocabItemSchema} VocabItem */

/** @param {Record<string, unknown>} raw */
function normalizeItem(raw) {
  const category = normalizeCategory(raw.category ?? 'daily-life')
  return {
    id: raw.id,
    word: raw.word ?? raw.greek,
    translation: raw.translation ?? raw.english,
    greek: raw.word ?? raw.greek,
    english: raw.translation ?? raw.english,
    category,
    difficulty: raw.difficulty ?? 'easy',
    gender: raw.gender ?? null,
    plural: raw.plural ?? null,
    tags: raw.tags ?? [],
    frequencyRank: raw.frequencyRank ?? null,
    pronunciation: raw.pronunciation ?? null,
    conjugationGroup: raw.conjugationGroup ?? null,
    relatedWords: raw.relatedWords ?? [],
    exampleUsage: raw.exampleUsage ?? null,
  }
}

const coreItems = allItems.map(normalizeItem)
const seenWords = new Set(coreItems.map((item) => item.word.toLowerCase()))
const batchItems = VOCAB_BATCHES.map(normalizeItem).filter((item) => {
  const key = item.word.toLowerCase()
  if (seenWords.has(key)) return false
  seenWords.add(key)
  return true
})

const ITEMS = [...coreItems, ...batchItems]
const byId = new Map(ITEMS.map((item) => [item.id, item]))
const byWordLower = new Map(
  ITEMS.map((item) => [item.word.toLowerCase(), item]),
)

export function getAllVocabulary() {
  return ITEMS
}

export function getVocabById(id) {
  return byId.get(id) ?? null
}

export function getVocabByWord(word) {
  if (!word) return null
  const clean = word.replace(/[.,;:!?]/g, '')
  return byWordLower.get(clean.toLowerCase()) ?? byWordLower.get(word.toLowerCase()) ?? null
}

/**
 * Query vocabulary with filters.
 * @param {{ category?: string, difficulty?: string, tags?: string[], limit?: number }} [filters]
 */
export function queryVocabulary(filters = {}) {
  const { category = 'all', difficulty = 'all', tags, limit } = filters
  let results = ITEMS

  if (category !== 'all') {
    const canonical = normalizeCategory(category)
    results = results.filter((w) => w.category === canonical)
  }
  if (difficulty !== 'all') {
    results = results.filter((w) => w.difficulty === difficulty)
  }
  if (tags?.length) {
    results = results.filter((w) => tags.some((t) => w.tags.includes(t)))
  }
  if (limit) results = results.slice(0, limit)
  return results
}

/** Legacy alias */
export function filterVocabulary(filters) {
  return queryVocabulary(filters)
}

/**
 * Enrich a story/lesson vocab entry with registry metadata when available.
 * @param {{ word: string, english: string, [key: string]: unknown }} entry
 */
export function enrichVocabEntry(entry) {
  const found = getVocabByWord(entry.word)
  if (!found) return entry

  return {
    ...entry,
    english: entry.english || found.translation,
    partOfSpeech: entry.partOfSpeech ?? inferPos(found),
    gender: entry.gender ?? found.gender,
    plural: entry.plural ?? found.plural,
    conjugationFamily: entry.conjugationFamily ?? found.conjugationGroup,
    relatedWords: entry.relatedWords ?? found.relatedWords
      ?.map((id) => byId.get(id))
      .filter(Boolean)
      .map((w) => ({ word: w.word, english: w.translation })),
  }
}

function inferPos(item) {
  if (item.conjugationGroup || item.category === 'verbs') return 'verb'
  if (item.category === 'adjectives') return 'adjective'
  if (item.gender) return 'noun'
  return null
}

export const VOCABULARY_COUNT = ITEMS.length

export { VOCAB_CATEGORIES, getCategoryLabel, normalizeCategory }
