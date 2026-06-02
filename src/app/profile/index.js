import { STORAGE_KEYS } from '@/app/storage/keys'
import { LEARNING_PROFILES, getProfile } from './profiles'

export { LEARNING_PROFILES, getProfile }

export function readLearningProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.learningProfile)
    if (saved && LEARNING_PROFILES[saved]) return saved
  } catch {
    /* ignore */
  }
  return 'beginner'
}

export function writeLearningProfile(profileId) {
  if (!LEARNING_PROFILES[profileId]) return
  try {
    localStorage.setItem(STORAGE_KEYS.learningProfile, profileId)
    window.dispatchEvent(new Event('learning-profile'))
  } catch {
    /* ignore */
  }
}

export function isDeveloperMode() {
  return readLearningProfile() === 'developer'
}

export function isUnlockBypassed() {
  return getProfile(readLearningProfile()).unlockBypass
}

/** Dev-only: simulate a learner profile without unlocking everything. */
export function simulateProfile(profileId) {
  if (profileId === 'developer') return
  writeLearningProfile(profileId)
}
