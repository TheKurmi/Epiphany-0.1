import { useDeveloperMode } from '@/app/dev/useDeveloperMode'

/** Subtle badge — only when Developer Mode is active. */
export default function DevModeIndicator() {
  const { enabled, testAsLearner, unlockActive } = useDeveloperMode()

  if (!enabled) return null

  return (
    <div
      className="dev-mode-indicator"
      title={
        testAsLearner
          ? 'Developer Mode — testing as learner (unlocks off)'
          : 'Developer Mode — all content unlocked'
      }
      aria-label="Developer mode active"
    >
      <span className="dev-mode-indicator__dot" aria-hidden="true" />
      {testAsLearner ? 'Test as learner' : 'Dev'}
    </div>
  )
}
