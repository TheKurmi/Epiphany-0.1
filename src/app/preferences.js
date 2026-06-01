import { STORAGE_KEYS } from './storage/keys'

export function readPronunciationPref() {
  try {
    const current = localStorage.getItem(STORAGE_KEYS.pronunciation)
    if (current !== null) return current === 'true'
    const legacy = localStorage.getItem(STORAGE_KEYS.pronunciationLegacy)
    if (legacy !== null) {
      localStorage.setItem(STORAGE_KEYS.pronunciation, legacy)
      return legacy === 'true'
    }
  } catch {
    /* ignore */
  }
  return false
}

export function writePronunciationPref(value) {
  try {
    localStorage.setItem(STORAGE_KEYS.pronunciation, String(value))
  } catch {
    /* ignore */
  }
}

export function readDarkModePref() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.darkMode)
    if (saved === 'true') return true
    if (saved === 'false') return false
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyThemeClass(darkMode) {
  const root = document.documentElement
  const saved = localStorage.getItem(STORAGE_KEYS.darkMode)

  root.classList.remove('dark', 'light')

  if (saved === 'true') {
    root.classList.add('dark')
  } else if (saved === 'false') {
    root.classList.add('light')
  } else if (darkMode) {
    root.classList.add('dark')
  }
}
