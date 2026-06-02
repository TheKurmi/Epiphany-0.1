import { getPackById } from './packs'

/** Core pack unlock logic — no profile bypass (see @/app/access). */
export function checkPackUnlocked(packId, completedLessonIds = []) {
  const pack = getPackById(packId)
  if (!pack || pack.comingSoon) return false
  if (pack.starter) return true
  if (!pack.unlockLessons?.length) return true
  return pack.unlockLessons.every((id) => completedLessonIds.includes(id))
}

export function getPackUnlockHint(packId) {
  const pack = getPackById(packId)
  if (!pack?.unlockLessons?.length) return 'Complete more lessons to unlock'
  return `Complete ${pack.unlockLessons.length} lesson${pack.unlockLessons.length > 1 ? 's' : ''} in Learn to unlock`
}

export function getPackMissingLessons(packId, completedLessonIds = []) {
  const pack = getPackById(packId)
  if (!pack || pack.starter || pack.comingSoon) return []
  return (pack.unlockLessons ?? []).filter((id) => !completedLessonIds.includes(id))
}
