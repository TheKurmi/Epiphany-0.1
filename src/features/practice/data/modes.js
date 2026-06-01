/** Distinct practice activities in the 🃏 Practice ecosystem. */
export const PRACTICE_ACTIVITIES = [
  {
    id: 'flashcards',
    emoji: '🃏',
    title: 'Flashcards',
    description: 'Vocabulary review, recognition, and quick exposure at your pace.',
    features: ['Study mode', 'Picture mode', 'Pronunciation'],
  },
  {
    id: 'typing',
    emoji: '✍️',
    title: 'Typing Practice',
    description:
      'Active recall — type conjugations, articles, and grammar forms yourself.',
    features: ['Active recall', 'Near miss', 'Grammar patterns'],
  },
  {
    id: 'quick-challenge',
    emoji: '⚡',
    title: 'Quick Challenge',
    description:
      'Fast-paced rounds with streaks, speed tracking, and rapid-fire drills.',
    features: ['Timed rounds', 'Streaks', 'Replayable'],
  },
  {
    id: 'dictation',
    emoji: '🔊',
    title: 'Dictation Mode',
    description:
      'Listen to Greek, then type what you hear — builds listening and spelling.',
    features: ['Audio first', 'Near miss', '3 difficulty levels'],
  },
  {
    id: 'sentence-builder',
    emoji: '🧩',
    title: 'Sentence Construction Lab',
    description:
      'Rearrange shuffled words into correct Greek sentences — build syntax intuition.',
    features: ['Word order', 'Articles', 'Agreement', 'Grammar correction'],
  },
  {
    id: 'weak-spot',
    emoji: '🎯',
    title: 'Weak Spot Practice',
    description:
      'Adaptive drills targeting endings, articles, and patterns you miss most.',
    features: ['Adaptive', 'Mastery-linked', 'Targeted'],
  },
]

export function getActivityMeta(id) {
  return PRACTICE_ACTIVITIES.find((a) => a.id === id) ?? null
}
