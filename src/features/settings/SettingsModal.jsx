import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { STORAGE_KEYS } from '@/app/storage/keys'
import {
  getSpeechRate,
  setSpeechRate as persistSpeechRate,
} from '@/utils/speech'
import { useDeveloperMode } from '@/app/dev/useDeveloperMode'
import DeveloperPanel, { ProfileSelector } from './DeveloperPanel'

export default function SettingsModal({
  isOpen,
  onClose,
  darkMode,
  setDarkMode,
  onJumpLesson,
  onJumpStory,
}) {
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState('')
  const [speechRate, setSpeechRate] = useState(0.85)
  const { enabled: devMode } = useDeveloperMode()

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang.toLowerCase().includes('el'))

      setVoices(availableVoices)

      const savedVoice = localStorage.getItem(STORAGE_KEYS.speechVoice)
      const savedRate =
        localStorage.getItem(STORAGE_KEYS.speechRate) ??
        localStorage.getItem('epiphany-rate')

      if (savedVoice) {
        setSelectedVoice(savedVoice)
      } else if (availableVoices.length > 0) {
        const femaleVoice = availableVoices.find((v) =>
          v.name.toLowerCase().includes('female'),
        )
        setSelectedVoice(femaleVoice?.name || availableVoices[0].name)
      }

      setSpeechRate(savedRate ? Number(savedRate) : getSpeechRate())
    }

    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  useEffect(() => {
    if (selectedVoice) {
      localStorage.setItem(STORAGE_KEYS.speechVoice, selectedVoice)
    }
  }, [selectedVoice])

  if (!isOpen) return null

  return createPortal(
    <div
      className="settings-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="settings-modal"
        role="dialog"
        aria-labelledby="settings-modal-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings-modal__header">
          <h3 id="settings-modal-title" className="settings-modal__title">
            Settings
          </h3>
          <button
            type="button"
            className="settings-modal__close"
            onClick={onClose}
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <ProfileSelector />

        <div className="settings-modal__field">
          <label className="settings-modal__label" htmlFor="greek-voice">
            Greek Voice
          </label>
          <select
            id="greek-voice"
            className="settings-modal__select"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>

        <div className="settings-modal__field">
          <label className="settings-modal__label settings-modal__label--row">
            <input
              type="checkbox"
              className="settings-modal__checkbox"
              checked={darkMode}
              onChange={(e) => {
                setDarkMode(e.target.checked)
                localStorage.setItem(STORAGE_KEYS.darkMode, e.target.checked)
              }}
            />
            Dark mode
          </label>
        </div>

        <div className="settings-modal__field">
          <label className="settings-modal__label" htmlFor="speech-rate">
            Speech speed ({Number(speechRate).toFixed(2)}×)
          </label>
          <input
            id="speech-rate"
            type="range"
            className="settings-modal__range"
            min="0.3"
            max="1.5"
            step="0.02"
            value={speechRate}
            onChange={(e) => {
              const next = Number(e.target.value)
              setSpeechRate(next)
              persistSpeechRate(next)
            }}
          />
          <p className="settings-modal__hint">
            Applies to stories, vocabulary audio, dictation, and read-aloud.
          </p>
        </div>

        <DeveloperPanel onJumpLesson={onJumpLesson} onJumpStory={onJumpStory} />

        {!devMode ? (
          <p className="settings-modal__dev-hint">
            <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> — developer mode
          </p>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
