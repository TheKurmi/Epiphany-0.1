import vocabulary from './vocabulary.json'
import { DIFFICULTIES } from './constants'

export { vocabulary }

const categoryLabels = {
  greetings: 'Greetings',
  food: 'Food',
  travel: 'Travel',
  school: 'School',
  family: 'Family',
  home: 'Home',
  body: 'Body',
  numbers: 'Numbers',
  colors: 'Colors',
  time: 'Time',
  weather: 'Weather',
  shopping: 'Shopping',
  emotions: 'Emotions',
  animals: 'Animals',
  work: 'Work',
  nature: 'Nature',
  city: 'City',
  verbs: 'Verbs',
  adjectives: 'Adjectives',
  technology: 'Technology',
  sports: 'Sports',
  culture: 'Culture',
}

export const CATEGORIES = [
  { id: 'all', label: 'All topics' },
  ...Object.entries(categoryLabels).map(([id, label]) => ({ id, label })),
]

export function filterVocabulary({
  category = 'all',
  difficulty = 'all',
} = {}) {
  return vocabulary.filter((word) => {
    if (category !== 'all' && word.category !== category) return false
    if (difficulty !== 'all' && word.difficulty !== difficulty) return false
    return true
  })
}

export function shuffleDeck(deck) {
  const copy = [...deck]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function getCategoryLabel(id) {
  if (id === 'all') return 'All'
  return categoryLabels[id] ?? id
}

export const VOCABULARY_COUNT = vocabulary.length

export { DIFFICULTIES }
