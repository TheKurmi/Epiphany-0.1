import { READ_PACKS, READ_CATEGORIES, getPackById, getPacksByCategory } from './packs'
import { STORIES, getStoryById, getStoriesForPack } from './stories'

export { READ_PACKS, READ_CATEGORIES, STORIES, getPackById, getPacksByCategory, getStoryById, getStoriesForPack }

/**
 * Check whether a reading pack is unlocked based on completed lessons.
 * Starter packs are always available for new learners.
 * @param {string} packId
 * @param {string[]} completedLessonIds
 */
export function isPackUnlocked(packId, completedLessonIds = []) {
  const pack = getPackById(packId)
  if (!pack || pack.comingSoon) return false
  if (pack.starter) return true
  if (!pack.unlockLessons?.length) return true
  return pack.unlockLessons.every((id) => completedLessonIds.includes(id))
}

/**
 * Return packs available to the learner, with unlock metadata.
 * @param {string[]} completedLessonIds
 */
export function getAvailablePacks(completedLessonIds) {
  return READ_PACKS.map((pack) => ({
    ...pack,
    unlocked: isPackUnlocked(pack.id, completedLessonIds),
    storyCount: getStoriesForPack(pack.id).length,
    completedCount: getStoriesForPack(pack.id).filter(() => false).length,
  }))
}

/**
 * Adaptive filter — stories whose required topics match learner progress.
 * For MVP, all stories in unlocked packs are shown; requiredTopics gate future packs.
 * @param {string} packId
 * @param {string[]} completedLessonIds
 * @param {string[]} completedStoryIds
 */
export function getPackStories(packId, completedLessonIds, completedStoryIds = []) {
  if (!isPackUnlocked(packId, completedLessonIds)) return []

  return getStoriesForPack(packId).map((story) => ({
    ...story,
    completed: completedStoryIds.includes(story.id),
  }))
}

/**
 * Summarize reading progress for dashboard.
 */
export function getReadingStats(completedStoryIds) {
  const total = STORIES.length
  const completed = completedStoryIds.filter((id) =>
    STORIES.some((s) => s.id === id),
  ).length
  const unlockedPacks = READ_PACKS.filter((p) => !p.comingSoon).length

  return { total, completed, unlockedPacks }
}

/**
 * Get unlock hint for a locked pack.
 */
export function getPackUnlockHint(packId) {
  const pack = getPackById(packId)
  if (!pack?.unlockLessons?.length) return 'Complete more lessons to unlock'
  return `Complete ${pack.unlockLessons.length} lesson${pack.unlockLessons.length > 1 ? 's' : ''} in Learn to unlock`
}

/**
 * Lesson IDs still required before a pack opens.
 */
export function getPackMissingLessons(packId, completedLessonIds = []) {
  const pack = getPackById(packId)
  if (!pack || pack.starter || pack.comingSoon) return []
  return (pack.unlockLessons ?? []).filter((id) => !completedLessonIds.includes(id))
}

export function getCategoriesWithPacks(completedLessonIds) {
  return READ_CATEGORIES.map((cat) => ({
    ...cat,
    packs: getPacksByCategory(cat.id).map((pack) => ({
      ...pack,
      unlocked: isPackUnlocked(pack.id, completedLessonIds),
      stories: getStoriesForPack(pack.id),
    })),
  })).filter((cat) => cat.packs.length > 0)
}
