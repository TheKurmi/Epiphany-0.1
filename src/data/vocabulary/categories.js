/**
 * Vocabulary category registry — thematic grouping with metadata.
 * Maps legacy category ids for backward compatibility.
 */
export const VOCAB_CATEGORIES = [
  { id: 'all', label: 'All topics', emoji: '📚' },
  { id: 'daily-life', label: 'Daily Life', emoji: '🏠', legacy: ['home'] },
  { id: 'food', label: 'Food & Drink', emoji: '🍞', legacy: ['food'] },
  { id: 'family', label: 'Family & People', emoji: '👨‍👩‍👧', legacy: ['family'] },
  { id: 'school-work', label: 'School & Work', emoji: '🏫', legacy: ['school', 'work'] },
  { id: 'transport', label: 'Transportation', emoji: '🚶', legacy: ['travel'] },
  { id: 'time', label: 'Time & Routine', emoji: '⏰', legacy: ['time'] },
  { id: 'feelings', label: 'Feelings & States', emoji: '😊', legacy: ['emotions'] },
  { id: 'shopping', label: 'Shopping', emoji: '🛒', legacy: ['shopping'] },
  { id: 'travel', label: 'Travel', emoji: '✈️', legacy: [] },
  { id: 'health', label: 'Health', emoji: '🏥', legacy: ['body'] },
  { id: 'weather', label: 'Weather', emoji: '🌤', legacy: ['weather'] },
  { id: 'hobbies', label: 'Hobbies', emoji: '🎨', legacy: ['sports', 'culture'] },
  { id: 'city', label: 'City & Locations', emoji: '🏙', legacy: ['city'] },
  { id: 'technology', label: 'Technology', emoji: '📱', legacy: ['technology'] },
  { id: 'conversation', label: 'Conversation Fillers', emoji: '💬', legacy: ['greetings'] },
  { id: 'numbers', label: 'Numbers', emoji: '🔢', legacy: ['numbers'] },
  { id: 'colors', label: 'Colors', emoji: '🎨', legacy: ['colors'] },
  { id: 'verbs', label: 'Verbs', emoji: '🔄', legacy: ['verbs'] },
  { id: 'adjectives', label: 'Adjectives', emoji: '✨', legacy: ['adjectives'] },
  { id: 'nature', label: 'Nature', emoji: '🌿', legacy: ['nature'] },
  { id: 'animals', label: 'Animals', emoji: '🐾', legacy: ['animals'] },
]

const legacyToCanonical = new Map()
for (const cat of VOCAB_CATEGORIES) {
  for (const leg of cat.legacy ?? []) {
    legacyToCanonical.set(leg, cat.id)
  }
  legacyToCanonical.set(cat.id, cat.id)
}

export function normalizeCategory(category) {
  return legacyToCanonical.get(category) ?? category
}

export function getCategoryMeta(id) {
  if (id === 'all') return VOCAB_CATEGORIES[0]
  return VOCAB_CATEGORIES.find((c) => c.id === id) ?? { id, label: id, emoji: '📖' }
}

export function getCategoryLabel(id) {
  return getCategoryMeta(id).label
}
