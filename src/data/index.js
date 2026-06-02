/**
 * Re-export vocabulary from central registry.
 * Legacy imports from @/data continue to work.
 */
import { DIFFICULTIES } from './constants'
import {
  getAllVocabulary,
  filterVocabulary,
  queryVocabulary,
  getVocabById,
  getVocabByWord,
  enrichVocabEntry,
  VOCABULARY_COUNT,
} from './vocabulary/registry'
import { VOCAB_CATEGORIES, getCategoryLabel } from './vocabulary/categories'

export const vocabulary = getAllVocabulary()

export {
  getAllVocabulary,
  filterVocabulary,
  queryVocabulary,
  getVocabById,
  getVocabByWord,
  enrichVocabEntry,
  VOCABULARY_COUNT,
  VOCAB_CATEGORIES,
  getCategoryLabel,
  DIFFICULTIES,
}

export const CATEGORIES = [
  { id: 'all', label: 'All topics' },
  ...VOCAB_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
    id: c.id,
    label: c.label,
    emoji: c.emoji,
  })),
]

export function shuffleDeck(deck) {
  const copy = [...deck]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
