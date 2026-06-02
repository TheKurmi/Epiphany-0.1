/**
 * Reading packs — grouped micro stories with unlock requirements.
 * Unlocks tie to completed lessons so content stays level-appropriate.
 */
export const READ_PACKS = [
  {
    id: 'daily-routines',
    label: 'Daily Routines',
    emoji: '☀️',
    category: 'micro-stories',
    description: 'Simple morning and evening habits — present tense in context.',
    starter: true,
    unlockLessons: [],
    readingTier: 1,
  },
  {
    id: 'listen-routines',
    label: 'Read & Listen — Routines',
    emoji: '🎧',
    category: 'read-listen',
    description: 'Short texts with read-aloud — hear natural rhythm and stress.',
    starter: true,
    unlockLessons: [],
  },
  {
    id: 'school-life',
    label: 'School & Study',
    emoji: '🏫',
    category: 'micro-stories',
    description: 'Classrooms, homework, and everyday student life.',
    unlockLessons: ['present-tense-endings', 'sentence-structure'],
    readingTier: 2,
  },
  {
    id: 'food-cafe',
    label: 'Food & Café',
    emoji: '☕',
    category: 'micro-stories',
    description: 'Ordering, eating, and talking about favourite foods.',
    unlockLessons: ['articles-gender', 'present-tense-endings'],
  },
  {
    id: 'family-home',
    label: 'Family & Home',
    emoji: '🏠',
    category: 'micro-stories',
    description: 'Family members, home life, and simple conversations.',
    unlockLessons: ['articles-gender', 'eimai-essential'],
  },
  {
    id: 'shopping-market',
    label: 'Shopping & Market',
    emoji: '🛒',
    category: 'micro-stories',
    description: 'Prices, quantities, and everyday market exchanges.',
    unlockLessons: ['numbers-counting', 'survival-greek'],
  },
  {
    id: 'hobbies-friends',
    label: 'Hobbies & Friends',
    emoji: '🎸',
    category: 'micro-stories',
    description: 'Music, sports, and talking about what you love.',
    unlockLessons: ['present-tense-endings', 'possessives'],
  },
  {
    id: 'transport-commute',
    label: 'Transportation',
    emoji: '🚌',
    category: 'micro-stories',
    description: 'Buses, schedules, and getting around town.',
    unlockLessons: ['time-clock', 'prepositions-basic'],
  },
  {
    id: 'travel-town',
    label: 'Travel & Town',
    emoji: '✈️',
    category: 'micro-stories',
    description: 'Trips, hotels, and exploring new places.',
    unlockLessons: ['prepositions-basic', 'question-words'],
  },
  {
    id: 'ordering-dialogues',
    label: 'At the Café',
    emoji: '🗣️',
    category: 'dialogues',
    description: 'Order coffee and snacks — real back-and-forth exchanges.',
    unlockLessons: ['survival-greek', 'articles-gender'],
  },
  {
    id: 'directions-dialogues',
    label: 'Asking Directions',
    emoji: '🗺️',
    category: 'dialogues',
    description: 'Find your way — questions, prepositions, and polite phrases.',
    unlockLessons: ['prepositions-basic', 'question-words'],
  },
  {
    id: 'questions-dialogue',
    label: 'Question & Answer',
    emoji: '💬',
    category: 'dialogues',
    description: 'Back-and-forth exchanges with questions and answers.',
    unlockLessons: ['questions-negation', 'sentence-structure'],
  },
  {
    id: 'verb-patterns',
    label: 'Verb Patterns in Context',
    emoji: '🔄',
    category: 'guided-reading',
    description: 'See -ω and -άω verbs used naturally in short texts.',
    unlockLessons: ['verb-conjugation-groups', 'present-tense-endings'],
    readingTier: 2,
  },
  {
    id: 'weather-everyday',
    label: 'Weather & Seasons',
    emoji: '🌤️',
    category: 'micro-stories',
    description: 'Heat, rain, and seasonal routines — natural small talk.',
    unlockLessons: ['present-tense-endings', 'survival-greek'],
  },
  {
    id: 'work-office',
    label: 'Work & Office',
    emoji: '💼',
    category: 'micro-stories',
    description: 'Meetings, colleagues, and everyday professional life.',
    unlockLessons: ['time-clock', 'present-tense-endings'],
  },
  {
    id: 'city-life',
    label: 'City Life',
    emoji: '🏙️',
    category: 'micro-stories',
    description: 'Neighbourhoods, parks, and urban routines.',
    starter: true,
    unlockLessons: [],
  },
]

export const READ_CATEGORIES = [
  {
    id: 'micro-stories',
    label: 'Micro Stories',
    emoji: '📖',
    description: '3–6 sentence stories — comprehensible input for beginners.',
  },
  {
    id: 'dialogues',
    label: 'Dialogues',
    emoji: '🗣️',
    description: 'Short conversational exchanges — Greek that feels alive.',
  },
  {
    id: 'guided-reading',
    label: 'Guided Reading',
    emoji: '📰',
    description: 'Grammar-highlighted texts tied to your lessons.',
  },
  {
    id: 'read-listen',
    label: 'Read & Listen',
    emoji: '🎧',
    description: 'Read along with audio — rhythm, stress, and pronunciation.',
  },
  {
    id: 'comprehension',
    label: 'Comprehension Challenges',
    emoji: '🧠',
    description: 'Read, then answer — reinforce understanding.',
  },
]

export function getPackById(packId) {
  return READ_PACKS.find((p) => p.id === packId) ?? null
}

export function getPacksByCategory(categoryId) {
  return READ_PACKS.filter((p) => p.category === categoryId)
}
