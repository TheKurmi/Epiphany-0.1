import { useSyncExternalStore } from 'react'
import {
  getDevModeSnapshot,
  subscribeDevMode,
  toggleDevMode,
  setTestAsLearner,
  setDebugOverlays,
  isDevModeEnabled,
} from '@/app/dev/devState'

export function useDeveloperMode() {
  const state = useSyncExternalStore(subscribeDevMode, getDevModeSnapshot, getDevModeSnapshot)

  return {
    ...state,
    toggle: toggleDevMode,
    setTestAsLearner,
    setDebugOverlays,
    isActive: state.enabled,
  }
}

export { isDevModeEnabled, toggleDevMode }
