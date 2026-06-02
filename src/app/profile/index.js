import { STORAGE_KEYS } from '@/app/storage/keys'
import { LEARNING_PROFILES, getProfile } from './profiles'
import {
  isDevModeEnabled,
  isDevUnlockActive,
  setDevModeEnabled,
} from '@/app/dev/devState'

export { LEARNING_PROFILES, getProfile }

/** Migrate legacy profile-based dev flag. */
function migrateLegacyDeveloperProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.learningProfile)
    if (saved === 'developer' && !isDevModeEnabled()) {
      setDevModeEnabled(true)
      localStorage.setItem(STORAGE_KEYS.learningProfile, 'beginner')
    }
  } catch {
    /* ignore */
  }
}

migrateLegacyDeveloperProfile()

export function readLearningProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.learningProfile)
    if (saved && LEARNING_PROFILES[saved] && saved !== 'developer') return saved
  } catch {
    /* ignore */
  }
  return 'beginner'
}

export function writeLearningProfile(profileId) {
  if (!LEARNING_PROFILES[profileId] || profileId === 'developer') return
  try {
    localStorage.setItem(STORAGE_KEYS.learningProfile, profileId)
    window.dispatchEvent(new Event('learning-profile'))
  } catch {
    /* ignore */
  }
}

export function isDeveloperMode() {
  return isDevModeEnabled()
}

export function isUnlockBypassed() {
  return isDevUnlockActive()
}

/** Dev-only: simulate a learner profile without unlocking everything. */
export function simulateProfile(profileId) {
  if (profileId === 'developer') return
  writeLearningProfile(profileId)
}
