/**
 * Developer Mode state — isolated from learner profiles and progression.
 * Activated via Ctrl+Shift+D or settings panel when enabled.
 */
import { STORAGE_KEYS } from '@/app/storage/keys'

const EVENT = 'dev-mode-changed'

/** Stable snapshot object for useSyncExternalStore — must reuse reference until values change. */
let snapshot = {
  enabled: false,
  testAsLearner: false,
  debugOverlays: false,
  unlockActive: false,
}

function readFlag(key, fallback = false) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return raw === 'true'
  } catch {
    return fallback
  }
}

function syncSnapshot() {
  const enabled = readFlag(STORAGE_KEYS.devModeEnabled)
  const testAsLearner = readFlag(STORAGE_KEYS.devTestAsLearner)
  const debugOverlays = readFlag(STORAGE_KEYS.devDebugOverlays)
  const unlockActive = enabled && !testAsLearner

  if (
    snapshot.enabled === enabled &&
    snapshot.testAsLearner === testAsLearner &&
    snapshot.debugOverlays === debugOverlays &&
    snapshot.unlockActive === unlockActive
  ) {
    return
  }

  snapshot = { enabled, testAsLearner, debugOverlays, unlockActive }
}

function writeFlag(key, value) {
  try {
    localStorage.setItem(key, value ? 'true' : 'false')
  } catch {
    /* ignore */
  }
  syncSnapshot()
  window.dispatchEvent(new Event(EVENT))
}

try {
  syncSnapshot()
} catch {
  /* ignore — SSR or blocked storage */
}

export function isDevModeEnabled() {
  return snapshot.enabled
}

export function setDevModeEnabled(enabled) {
  writeFlag(STORAGE_KEYS.devModeEnabled, enabled)
  if (!enabled) {
    setTestAsLearner(false)
    setDebugOverlays(false)
  }
}

export function toggleDevMode() {
  setDevModeEnabled(!isDevModeEnabled())
  return isDevModeEnabled()
}

export function isTestAsLearner() {
  return snapshot.testAsLearner
}

export function setTestAsLearner(active) {
  writeFlag(STORAGE_KEYS.devTestAsLearner, active)
}

export function isDebugOverlaysEnabled() {
  return snapshot.debugOverlays
}

export function setDebugOverlays(enabled) {
  writeFlag(STORAGE_KEYS.devDebugOverlays, enabled)
}

/** Unlock bypass — dev powers active and not in "test as learner" mode. */
export function isDevUnlockActive() {
  return snapshot.unlockActive
}

export function subscribeDevMode(listener) {
  const handler = () => listener()
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}

export function getDevModeSnapshot() {
  return snapshot
}
