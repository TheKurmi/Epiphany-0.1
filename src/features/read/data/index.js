import { READ_PACKS, READ_CATEGORIES, getPackById, getPacksByCategory } from './packs'
import { STORIES, getStoryById, getStoriesForPack } from './stories'
import {
  getPackUnlockHint,
  getPackMissingLessons,
} from './packUnlock'
import { isPackUnlocked as isPackUnlockedWithProfile } from '@/app/access'

export { READ_PACKS, READ_CATEGORIES, STORIES, getPackById, getPacksByCategory, getStoryById, getStoriesForPack }
export { getPackUnlockHint, getPackMissingLessons }

/** Respects learning profile / developer bypass. */
export function isPackUnlocked(packId, completedLessonIds = []) {
  return isPackUnlockedWithProfile(packId, completedLessonIds)
}

export function getAvailablePacks(completedLessonIds) {
  return READ_PACKS.map((pack) => ({
    ...pack,
    unlocked: isPackUnlocked(pack.id, completedLessonIds),
    storyCount: getStoriesForPack(pack.id).length,
    completedCount: 0,
  }))
}

export function getPackStories(packId, completedLessonIds, completedStoryIds = []) {
  if (!isPackUnlocked(packId, completedLessonIds)) return []

  return getStoriesForPack(packId).map((story) => ({
    ...story,
    completed: completedStoryIds.includes(story.id),
  }))
}

export function getReadingStats(completedStoryIds) {
  const total = STORIES.length
  const completed = completedStoryIds.filter((id) =>
    STORIES.some((s) => s.id === id),
  ).length
  const unlockedPacks = READ_PACKS.filter((p) => !p.comingSoon).length

  return { total, completed, unlockedPacks }
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
