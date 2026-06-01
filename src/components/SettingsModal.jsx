import { useEffect, useState } from 'react'

export default function SettingsModal({
  isOpen,
  onClose,
  darkMode,
  setDarkMode,
}) {
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState('')
  const [speechRate, setSpeechRate] = useState(0.85)

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang.toLowerCase().includes('el'))

      setVoices(availableVoices)

      const savedVoice = localStorage.getItem('epiphany-voice')
      const savedRate = localStorage.getItem('epiphany-rate')

      if (savedVoice) {
        setSelectedVoice(savedVoice)
      } else if (availableVoices.length > 0) {
        const femaleVoice = availableVoices.find((v) =>
          v.name.toLowerCase().includes('female'),
        )

        setSelectedVoice(femaleVoice?.name || availableVoices[0].name)
      }

      if (savedRate) {
        setSpeechRate(Number(savedRate))
      }
    }

    loadVoices()

    speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  useEffect(() => {
    localStorage.setItem('epiphany-voice', selectedVoice)
    localStorage.setItem('epiphany-rate', speechRate)
  }, [selectedVoice, speechRate])

  if (!isOpen) return null

  return (
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
                localStorage.setItem('darkMode', e.target.checked)
              }}
            />
            Dark mode
          </label>
        </div>

        <div className="settings-modal__field">
          <label className="settings-modal__label" htmlFor="speech-rate">
            Speech speed ({speechRate})
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
              setSpeechRate(e.target.value)
              localStorage.setItem('epiphany-speech-rate', e.target.value)
            }}
          />
        </div>
      </div>
    </div>
  )
}
