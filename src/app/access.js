/**
 * Central access control — respects developer unlock bypass without
 * removing progression for real learners.
 */
import { isUnlockBypassed } from '@/app/profile'
import {
  isLessonUnlocked as checkLessonUnlocked,
  getLessonPrerequisites,
} from '@/features/learn/data/unlocks'
import { checkPackUnlocked } from '@/features/read/data/packUnlock'

export function isLessonUnlocked(lessonId, completedLessonIds = []) {
  if (isUnlockBypassed()) return true
  return checkLessonUnlocked(lessonId, completedLessonIds)
}

export function isPackUnlocked(packId, completedLessonIds = []) {
  if (isUnlockBypassed()) return true
  return checkPackUnlocked(packId, completedLessonIds)
}

export function isMasteryLevelUnlocked(levelId, unlockedLevel) {
  if (isUnlockBypassed()) return true
  return levelId <= unlockedLevel
}

export { getLessonPrerequisites }
