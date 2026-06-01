import { useEffect, useState } from 'react'
import { topicToFilter, DEFAULT_SESSION_CONFIG } from './data/homeConfig'
import { getLessonById } from './data/learn'
import { useDeck } from './hooks/useDeck'
import { useChallengeSession } from './hooks/useChallengeSession'
import { STREAK_CELEBRATION } from './data/constants'
import { initSpeech } from './utils/speech'
import { launchConfetti } from './utils/confetti'
import HomePage from './components/HomePage'
import PracticeScreen from './components/PracticeScreen'
import SessionScreen from './components/SessionScreen'
import LearnScreen from './components/learn/LearnScreen'
import TopicScreen from './components/learn/TopicScreen'
import LessonScreen from './components/learn/LessonScreen'
import MasteryQuizSession from './components/learn/MasteryQuizSession'
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
  const [selectedLessonId, setSelectedLessonId] = useState(null)
  const [selectedTopicId, setSelectedTopicId] = useState(null)
  const [selectedMasteryLevel, setSelectedMasteryLevel] = useState(null)
  const [draftConfig, setDraftConfig] = useState(DEFAULT_SESSION_CONFIG)
  const [activeConfig, setActiveConfig] = useState(null)
  const [sessionKey, setSessionKey] = useState(0)

  const [studyReviewed, setStudyReviewed] = useState(0)
  const [celebration, setCelebration] = useState('')
  const [showPronunciation, setShowPronunciation] = useState(readPronunciationPref)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(readDarkModePref)

  const inSession = screen === 'session' && activeConfig !== null
  const inPractice = screen === 'practice' || inSession
  const inLearn =
    screen === 'learn' ||
    screen === 'topic' ||
    screen === 'lesson' ||
    screen === 'mastery-quiz'
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
    setScreen('practice')
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

  function openPractice() {
    setScreen('practice')
  }

  function backFromPractice() {
    setScreen('home')
  }

  function openLearn() {
    setScreen('learn')
  }

  function openTopic(topicId) {
    setSelectedTopicId(topicId)
    setScreen('topic')
  }

  function openLesson(lessonId) {
    const lesson = getLessonById(lessonId)
    setSelectedLessonId(lessonId)
    if (lesson) setSelectedTopicId(lesson.topicId)
    setScreen('lesson')
  }

  function startMasteryQuiz(topicId, level) {
    setSelectedTopicId(topicId)
    setSelectedMasteryLevel(level)
    setScreen('mastery-quiz')
  }

  function backFromLearn() {
    setSelectedLessonId(null)
    setSelectedTopicId(null)
    setSelectedMasteryLevel(null)
    setScreen('home')
  }

  function backFromTopic() {
    setSelectedLessonId(null)
    setSelectedMasteryLevel(null)
    setScreen('learn')
  }

  function backFromLesson() {
    setSelectedLessonId(null)
    setScreen('topic')
  }

  function backFromMasteryQuiz() {
    setSelectedMasteryLevel(null)
    setScreen('topic')
  }

  function completeMasteryQuiz() {
    setSelectedMasteryLevel(null)
    setScreen('topic')
  }

  function openMasteryFromLesson(topicId) {
    setSelectedTopicId(topicId)
    setScreen('topic')
  }

  return (
    <div className="app-shell">
      {inPractice || inLearn ? (
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
          <HomePage onLearn={openLearn} onPractice={openPractice} />
        ) : null}

        {screen === 'practice' ? (
          <PracticeScreen
            config={draftConfig}
            onChange={updateDraft}
            onStart={startSession}
            onBack={backFromPractice}
          />
        ) : null}

        {screen === 'learn' ? (
          <LearnScreen
            onBack={backFromLearn}
            onOpenTopic={openTopic}
            onOpenLesson={openLesson}
          />
        ) : null}

        {screen === 'topic' ? (
          <TopicScreen
            topicId={selectedTopicId}
            onBack={backFromTopic}
            onOpenLesson={openLesson}
            onStartMastery={(level) => startMasteryQuiz(selectedTopicId, level)}
          />
        ) : null}

        {screen === 'lesson' ? (
          <LessonScreen
            lessonId={selectedLessonId}
            onBack={backFromLesson}
            onOpenMastery={openMasteryFromLesson}
            showPronunciation={showPronunciation}
          />
        ) : null}

        {screen === 'mastery-quiz' ? (
          <MasteryQuizSession
            topicId={selectedTopicId}
            masteryLevel={selectedMasteryLevel}
            onBack={backFromMasteryQuiz}
            onComplete={completeMasteryQuiz}
          />
        ) : null}

        {screen === 'session' ? (
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
        ) : null}
      </div>
    </div>
  )
}
