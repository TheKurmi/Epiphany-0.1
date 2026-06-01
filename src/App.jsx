import { useEffect, useState } from 'react'
import { topicToFilter, DEFAULT_SESSION_CONFIG } from './data/homeConfig'
import { useDeck } from './hooks/useDeck'
import { useChallengeSession } from './hooks/useChallengeSession'
import { STREAK_CELEBRATION } from './data/constants'
import { initSpeech } from './utils/speech'
import { launchConfetti } from './utils/confetti'
import HomePage from './components/HomePage'
import SessionScreen from './components/SessionScreen'
import PronunciationToggle from './components/PronunciationToggle'
import SettingsModal from './components/SettingsModal'
import './App.css'

const PRONUNCIATION_KEY = 'epiphany-show-pronunciation'
const LEGACY_PRONUNCIATION_KEY = 'hellenic-show-pronunciation'
const DARK_MODE_KEY = 'darkMode'

function readPronunciationPref() {
  try {
    const current = localStorage.getItem(PRONUNCIATION_KEY)
    if (current !== null) return current === 'true'
    const legacy = localStorage.getItem(LEGACY_PRONUNCIATION_KEY)
    if (legacy !== null) {
      localStorage.setItem(PRONUNCIATION_KEY, legacy)
      return legacy === 'true'
    }
  } catch {
    /* ignore */
  }
  return false
}

function readDarkModePref() {
  try {
    const saved = localStorage.getItem(DARK_MODE_KEY)
    if (saved === 'true') return true
    if (saved === 'false') return false
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyThemeClass(darkMode) {
  const root = document.documentElement
  const saved = localStorage.getItem(DARK_MODE_KEY)

  root.classList.remove('dark', 'light')

  if (saved === 'true') {
    root.classList.add('dark')
  } else if (saved === 'false') {
    root.classList.add('light')
  } else if (darkMode) {
    root.classList.add('dark')
  }
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [draftConfig, setDraftConfig] = useState(DEFAULT_SESSION_CONFIG)
  const [activeConfig, setActiveConfig] = useState(null)
  const [sessionKey, setSessionKey] = useState(0)

  const [studyReviewed, setStudyReviewed] = useState(0)
  const [celebration, setCelebration] = useState('')
  const [showPronunciation, setShowPronunciation] = useState(readPronunciationPref)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(readDarkModePref)

  const inSession = screen === 'session' && activeConfig !== null
  const category = inSession ? topicToFilter(activeConfig.topic) : 'all'
  const difficulty = inSession ? activeConfig.difficulty : 'easy'

  const study = useDeck({
    category,
    difficulty,
    enabled: inSession && activeConfig.practiceMode === 'study',
    resetKey: sessionKey,
  })

  const challenge = useChallengeSession({
    category,
    difficulty,
    enabled: inSession && activeConfig.practiceMode === 'challenge',
    resetKey: sessionKey,
  })

  useEffect(() => initSpeech(), [])

  useEffect(() => {
    applyThemeClass(darkMode)
  }, [darkMode])

  function handlePronunciationToggle(value) {
    setShowPronunciation(value)
    try {
      localStorage.setItem(PRONUNCIATION_KEY, String(value))
    } catch {
      /* ignore */
    }
  }

  function updateDraft(patch) {
    setDraftConfig((c) => ({ ...c, ...patch }))
  }

  function startSession() {
    setActiveConfig({ ...draftConfig })
    setStudyReviewed(0)
    setCelebration('')
    setSessionKey((k) => k + 1)
    setScreen('session')
  }

  function exitSession() {
    setScreen('home')
    setActiveConfig(null)
    setCelebration('')
  }

  function handleChallengeAnswer(type) {
    if (type === 'correct') {
      const nextStreak = challenge.stats.streak + 1
      if (nextStreak === STREAK_CELEBRATION) {
        launchConfetti()
        setCelebration(`🎉 ${STREAK_CELEBRATION} in a row!`)
        setTimeout(() => setCelebration(''), 4000)
      }
    }
    challenge.recordAnswer(type)
  }

  function handleReturnToStudy() {
    setDraftConfig((c) => ({ ...c, practiceMode: 'study' }))
    exitSession()
  }

  return (
    <div className="app-shell">
      {inSession ? (
        <PronunciationToggle
          enabled={showPronunciation}
          onChange={handlePronunciationToggle}
        />
      ) : null}

      <div className={`view-screen view-screen--${screen}`} key={screen}>
        <button
          type="button"
          className="settings-trigger"
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Open settings"
        >
          ⚙️
        </button>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {screen === 'home' ? (
          <HomePage
            config={draftConfig}
            onChange={updateDraft}
            onStart={startSession}
          />
        ) : (
          <SessionScreen
            config={activeConfig}
            study={study}
            challenge={challenge}
            studyReviewed={studyReviewed}
            celebration={celebration}
            showPronunciation={showPronunciation}
            onExit={exitSession}
            onReturnToStudy={handleReturnToStudy}
            onChallengeAnswer={handleChallengeAnswer}
            onStudyReviewed={() => setStudyReviewed((n) => n + 1)}
          />
        )}
      </div>
    </div>
  )
}
