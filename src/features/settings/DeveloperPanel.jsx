import { useEffect, useState } from 'react'
import { useDeveloperMode } from '@/app/dev/useDeveloperMode'
import { LEARNING_PROFILES, readLearningProfile, writeLearningProfile } from '@/app/profile'
import {
  getDevJumpTargets,
  getDevDiagnostics,
  unlockEverything,
  resetLearningProgress,
  simulateBeginner,
  applyProgressionPreset,
  markAllLessonsComplete,
  markAllStoriesComplete,
  clearReviewQueue,
  resetMemorySystems,
  applyLearnerSimulation,
  simulateMistakeProfile,
  simulateWeakSpots,
  simulateForgottenWords,
  clearAllLocalStorage,
  testTts,
  PROGRESSION_PRESETS,
  LEARNER_SIMULATIONS,
  MISTAKE_SIMULATIONS,
  setTestAsLearner,
  setDebugOverlays,
  disableDeveloperMode,
} from '@/app/dev/devActions'

function DevSection({ title, children }) {
  return (
    <section className="dev-panel__section">
      <h5 className="dev-panel__section-title">{title}</h5>
      {children}
    </section>
  )
}

function DevButton({ children, onClick, danger = false, primary = false }) {
  return (
    <button
      type="button"
      className={`dev-panel__btn${danger ? ' dev-panel__btn--danger' : ''}${primary ? ' dev-panel__btn--primary' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function DeveloperPanel({ onJumpLesson, onJumpStory }) {
  const { enabled, testAsLearner, debugOverlays } = useDeveloperMode()
  const [diag, setDiag] = useState(null)
  const targets = getDevJumpTargets()

  useEffect(() => {
    if (!enabled) return undefined
    const refresh = () => setDiag(getDevDiagnostics())
    refresh()
    const events = ['learning-progress', 'mastery-progress', 'spaced-repetition', 'mistake-patterns']
    for (const e of events) window.addEventListener(e, refresh)
    return () => {
      for (const e of events) window.removeEventListener(e, refresh)
    }
  }, [enabled])

  if (!enabled) return null

  function reloadSoon() {
    setTimeout(() => window.location.reload(), 150)
  }

  return (
    <div className="dev-panel">
      <div className="dev-panel__header">
        <h4 className="dev-panel__title">Developer Mode</h4>
        <button
          type="button"
          className="dev-panel__exit"
          onClick={() => {
            disableDeveloperMode()
            reloadSoon()
          }}
        >
          Exit
        </button>
      </div>

      {diag ? (
        <p className="dev-panel__stats">
          {diag.progress.completedLessons}/{diag.progress.totalLessons} lessons ·{' '}
          {diag.review.due} due review · {diag.review.weak} weak
        </p>
      ) : null}

      <DevSection title="Experience">
        <label className="dev-panel__check">
          <input
            type="checkbox"
            checked={testAsLearner}
            onChange={(e) => {
              setTestAsLearner(e.target.checked)
            }}
          />
          Test as learner (disable unlock bypass)
        </label>
        <label className="dev-panel__check">
          <input
            type="checkbox"
            checked={debugOverlays}
            onChange={(e) => setDebugOverlays(e.target.checked)}
          />
          Debug overlays
        </label>
        <p className="dev-panel__hint">
          Test as learner keeps dev tools visible but restores normal locks and progression gates.
        </p>
      </DevSection>

      <DevSection title="Unlock & progression">
        <div className="dev-panel__btn-row">
          <DevButton primary onClick={() => { unlockEverything(); reloadSoon() }}>
            Unlock everything
          </DevButton>
          <DevButton onClick={() => { markAllLessonsComplete(); reloadSoon() }}>
            All lessons done
          </DevButton>
          <DevButton onClick={() => { markAllStoriesComplete(); reloadSoon() }}>
            All stories done
          </DevButton>
        </div>
        <div className="dev-panel__field">
          <label className="dev-panel__label" htmlFor="dev-progression">
            Jump progression
          </label>
          <select
            id="dev-progression"
            className="dev-panel__select"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                applyProgressionPreset(e.target.value)
                reloadSoon()
              }
              e.target.value = ''
            }}
          >
            <option value="">Select level…</option>
            {Object.values(PROGRESSION_PRESETS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.emoji} {p.label}
              </option>
            ))}
          </select>
        </div>
      </DevSection>

      <DevSection title="Learner simulation">
        <div className="dev-panel__field">
          <label className="dev-panel__label" htmlFor="dev-learner-sim">
            Simulate learner state
          </label>
          <select
            id="dev-learner-sim"
            className="dev-panel__select"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                applyLearnerSimulation(e.target.value)
                reloadSoon()
              }
              e.target.value = ''
            }}
          >
            <option value="">Select profile…</option>
            {Object.values(LEARNER_SIMULATIONS).map((s) => (
              <option key={s.id} value={s.id}>
                {s.emoji} {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="dev-panel__btn-row">
          <DevButton onClick={() => { simulateBeginner(); reloadSoon() }}>
            Fresh beginner
          </DevButton>
        </div>
      </DevSection>

      <DevSection title="Memory & review">
        <div className="dev-panel__btn-row">
          <DevButton onClick={() => { clearReviewQueue(); reloadSoon() }}>
            Clear review queue
          </DevButton>
          <DevButton onClick={() => { resetMemorySystems(); reloadSoon() }}>
            Reset memory
          </DevButton>
          <DevButton onClick={() => { simulateWeakSpots(); reloadSoon() }}>
            Simulate weak spots
          </DevButton>
          <DevButton onClick={() => { simulateForgottenWords(12); reloadSoon() }}>
            Forgotten words
          </DevButton>
        </div>
      </DevSection>

      <DevSection title="Mistake simulation">
        <div className="dev-panel__field">
          <label className="dev-panel__label" htmlFor="dev-mistake-sim">
            Inject mistake profile
          </label>
          <select
            id="dev-mistake-sim"
            className="dev-panel__select"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                simulateMistakeProfile(e.target.value)
                reloadSoon()
              }
              e.target.value = ''
            }}
          >
            <option value="">Select pattern…</option>
            {Object.values(MISTAKE_SIMULATIONS).map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </DevSection>

      <DevSection title="Content preview">
        <div className="dev-panel__field">
          <label className="dev-panel__label" htmlFor="dev-jump-lesson">
            Jump to lesson
          </label>
          <select
            id="dev-jump-lesson"
            className="dev-panel__select"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value && onJumpLesson) onJumpLesson(e.target.value)
              e.target.value = ''
            }}
          >
            <option value="">Select lesson…</option>
            {targets.lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>
        </div>
        <div className="dev-panel__field">
          <label className="dev-panel__label" htmlFor="dev-jump-story">
            Jump to story
          </label>
          <select
            id="dev-jump-story"
            className="dev-panel__select"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value && onJumpStory) onJumpStory(e.target.value)
              e.target.value = ''
            }}
          >
            <option value="">Select story…</option>
            {targets.stories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <DevButton onClick={testTts}>Test TTS</DevButton>
      </DevSection>

      <DevSection title="Danger zone">
        <div className="dev-panel__btn-row">
          <DevButton onClick={() => { resetLearningProgress(); reloadSoon() }}>
            Reset progress
          </DevButton>
          <DevButton
            danger
            onClick={() => {
              if (window.confirm('Clear all Epiphany local storage?')) clearAllLocalStorage()
            }}
          >
            Clear all storage
          </DevButton>
        </div>
      </DevSection>
    </div>
  )
}

export function ProfileSelector() {
  const [profile, setProfile] = useState(readLearningProfile)

  function handleChange(id) {
    writeLearningProfile(id)
    setProfile(id)
    window.location.reload()
  }

  const profiles = Object.values(LEARNING_PROFILES)

  return (
    <div className="settings-modal__field">
      <label className="settings-modal__label" htmlFor="learning-profile">
        Learning profile
      </label>
      <select
        id="learning-profile"
        className="settings-modal__select"
        value={profile}
        onChange={(e) => handleChange(e.target.value)}
      >
        {profiles.map((p) => (
          <option key={p.id} value={p.id}>
            {p.emoji} {p.label}
          </option>
        ))}
      </select>
      <p className="settings-modal__hint">
        {LEARNING_PROFILES[profile]?.description}
      </p>
    </div>
  )
}
