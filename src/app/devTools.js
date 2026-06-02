/**
 * Developer utilities — testing and content access.
 * Only meaningful when Developer Mode profile is active.
 */
import { STORAGE_KEYS } from '@/app/storage/keys'
import { writeLearningProfile } from '@/app/profile'
import { LEARNING_PATH } from '@/features/learn/data/path'
import { ALL_LESSONS } from '@/features/learn/data/lessons'
import { STORIES } from '@/features/read/data/stories'
import { speakGreek } from '@/utils/speech'

export function resetLearningProgress() {
  localStorage.removeItem(STORAGE_KEYS.learningProgress)
  localStorage.removeItem(STORAGE_KEYS.masteryProgress)
  localStorage.removeItem(STORAGE_KEYS.spacedRepetition)
  localStorage.removeItem(STORAGE_KEYS.vocabProgress)
  window.dispatchEvent(new Event('learning-progress'))
  window.dispatchEvent(new Event('mastery-progress'))
  window.dispatchEvent(new Event('spaced-repetition'))
}

export function unlockEverything() {
  writeLearningProfile('developer')
}

export function simulateBeginner() {
  resetLearningProgress()
  writeLearningProfile('beginner')
}

export function clearAllLocalStorage() {
  const keys = Object.values(STORAGE_KEYS)
  for (const key of keys) {
    localStorage.removeItem(key)
  }
  window.location.reload()
}

export function testTts() {
  speakGreek('Καλημέρα! Αυτό είναι ένα τεστ ήχου.')
}

export function getDevJumpTargets() {
  return {
    lessons: ALL_LESSONS.map((l) => ({ id: l.id, title: l.title })),
    stories: STORIES.map((s) => ({ id: s.id, title: s.title })),
    path: LEARNING_PATH,
  }
}
