/** Progressive reading difficulty tiers (1–4). */
export const READING_TIER_META = {
  1: {
    label: 'Level 1',
    description: 'Mostly present tense · simple vocabulary',
  },
  2: {
    label: 'Level 2',
    description: 'Simple past introduction · richer dialogue',
  },
  3: {
    label: 'Level 3',
    description: 'Tense contrasts · more natural conversation',
  },
  4: {
    label: 'Level 4',
    description: 'Advanced structures · aspect distinctions · idioms',
  },
}

/**
 * @param {{ readingTier?: number, unlockLessons?: string[] }} pack
 */
export function inferReadingTier(pack) {
  if (pack?.readingTier) return pack.readingTier

  const unlocks = pack?.unlockLessons ?? []
  if (unlocks.some((id) => ['time-and-aspect', 'past-tense-intro'].includes(id))) {
    return 3
  }
  if (unlocks.length >= 2) return 2
  return 1
}

export function getReadingTierMeta(tier) {
  return READING_TIER_META[tier] ?? READING_TIER_META[1]
}

/** Suggest max tier based on completed lessons. */
export function getSuggestedReadingTier(completedLessons) {
  if (completedLessons.includes('time-and-aspect')) return 3
  if (completedLessons.includes('past-tense-intro')) return 2
  if (completedLessons.includes('present-tense-endings')) return 2
  return 1
}
