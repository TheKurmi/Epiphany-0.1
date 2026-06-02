import { useState } from 'react'
import {
  LEARNING_PROFILES,
  readLearningProfile,
  writeLearningProfile,
  isDeveloperMode,
} from '@/app/profile'
import {
  resetLearningProgress,
  simulateBeginner,
  unlockEverything,
  clearAllLocalStorage,
  testTts,
  getDevJumpTargets,
} from '@/app/devTools'

export default function DeveloperPanel({ onJumpLesson, onJumpStory }) {
  const [profile, setProfile] = useState(readLearningProfile)
  const targets = getDevJumpTargets()

  if (!isDeveloperMode()) return null

  function handleProfileChange(id) {
    writeLearningProfile(id)
    setProfile(id)
    window.location.reload()
  }

  return (
    <div className="settings-modal__dev">
      <h4 className="settings-modal__dev-title">Developer tools</h4>

      <div className="settings-modal__field">
        <label className="settings-modal__label" htmlFor="dev-jump-lesson">
          Jump to lesson
        </label>
        <select
          id="dev-jump-lesson"
          className="settings-modal__select"
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

      <div className="settings-modal__field">
        <label className="settings-modal__label" htmlFor="dev-jump-story">
          Jump to story
        </label>
        <select
          id="dev-jump-story"
          className="settings-modal__select"
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

      <div className="settings-modal__dev-actions">
        <button type="button" className="settings-modal__dev-btn" onClick={testTts}>
          Test audio / TTS
        </button>
        <button type="button" className="settings-modal__dev-btn" onClick={resetLearningProgress}>
          Reset progress
        </button>
        <button type="button" className="settings-modal__dev-btn" onClick={simulateBeginner}>
          Simulate Beginner
        </button>
        <button type="button" className="settings-modal__dev-btn" onClick={unlockEverything}>
          Unlock everything
        </button>
        <button
          type="button"
          className="settings-modal__dev-btn settings-modal__dev-btn--danger"
          onClick={() => {
            if (window.confirm('Clear all Epiphany local storage?')) clearAllLocalStorage()
          }}
        >
          Clear local storage
        </button>
      </div>
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
        {Object.values(LEARNING_PROFILES).map((p) => (
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
