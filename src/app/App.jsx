import { useEffect, useState, useMemo } from 'react'
import { DEFAULT_PRACTICE_CONFIG } from '@/features/practice/data/config'
import { STREAK_CELEBRATION } from '@/data/constants'
import { initSpeech } from '@/utils/speech'
import { launchConfetti } from '@/utils/confetti'
import { recordActivity } from '@/shared/hooks/useLearningProgress'
import {
  readPronunciationPref,
  writePronunciationPref,
  readDarkModePref,
  applyThemeClass,
} from '@/app/preferences'
import { useAppNavigation } from '@/app/navigation/useAppNavigation'
import { usePracticeSessionStack } from '@/app/hooks/usePracticeSessionStack'
import { toggleDevMode, DevModeIndicator, DevDiagnosticsPanel } from '@/app/dev'
import { getLessonById } from '@/features/learn/data'
import { getStoryById } from '@/features/read/data'
import { SCREENS } from '@/app/navigation/screens'
import AppShell from '@/app/AppShell'
import ScreenRouter from '@/app/ScreenRouter'
import { initDocumentTitle } from '@/app/documentTitle'
import '@/styles/app.css'

export default function App() {
  const { screen, selection, nav } = useAppNavigation()

  const [draftConfig, setDraftConfig] = useState(DEFAULT_PRACTICE_CONFIG)
  const [activeConfig, setActiveConfig] = useState(null)
  const [sessionKey, setSessionKey] = useState(0)
  const [studyReviewed, setStudyReviewed] = useState(0)
  const [celebration, setCelebration] = useState('')
  const [showPronunciation, setShowPronunciation] = useState(readPronunciationPref)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(readDarkModePref)

  const sessions = usePracticeSessionStack({ screen, activeConfig, sessionKey })

  useEffect(() => {
    initSpeech()
    initDocumentTitle()
  }, [])
  useEffect(() => {
    applyThemeClass(darkMode)
  }, [darkMode])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault()
        toggleDevMode()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const devContext = useMemo(() => {
    if (screen === SCREENS.LESSON && selection.lessonId) {
      const lesson = getLessonById(selection.lessonId)
      return lesson
        ? { type: 'lesson', id: lesson.id, level: lesson.level, tags: [lesson.topicId] }
        : null
    }
    if (screen === SCREENS.STORY && selection.storyId) {
      const story = getStoryById(selection.storyId)
      return story
        ? { type: 'story', id: story.id, level: story.level, tags: story.requiredTopics }
        : null
    }
    if (screen === SCREENS.READ_PACK && selection.packId) {
      return { type: 'pack', id: selection.packId }
    }
    return { type: screen }
  }, [screen, selection.lessonId, selection.storyId, selection.packId])

  function updateDraft(patch) {
    setDraftConfig((c) => ({ ...c, ...patch }))
  }

  function onSelectPracticeMode(modeId) {
    setDraftConfig((c) => ({ ...c, activityMode: modeId }))
    nav.selectPracticeMode(modeId)
  }

  function onStartSession() {
    setActiveConfig({ ...draftConfig })
    setStudyReviewed(0)
    setCelebration('')
    setSessionKey((k) => k + 1)
    recordActivity()
    nav.startSession()
  }

  function onExitSession() {
    nav.exitSession()
    setActiveConfig(null)
    setCelebration('')
  }

  function onReturnToFlashcards() {
    setDraftConfig((c) => ({ ...c, activityMode: 'flashcards' }))
    nav.returnToFlashcards()
    setActiveConfig(null)
  }

  function onPracticeAnswer(type, streakSource) {
    const stats = streakSource?.stats
    if (type === 'correct' && stats) {
      const nextStreak = stats.streak + 1
      if (nextStreak === STREAK_CELEBRATION) {
        launchConfetti()
        setCelebration(`🎉 ${STREAK_CELEBRATION} in a row!`)
        setTimeout(() => setCelebration(''), 4000)
      }
    }
    streakSource?.recordAnswer(type)
  }

  return (
    <>
      <DevModeIndicator />
      <DevDiagnosticsPanel context={devContext} />
      <AppShell
      screen={screen}
      showPronunciation={showPronunciation}
      onPronunciationChange={(value) => {
        setShowPronunciation(value)
        writePronunciationPref(value)
      }}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      isSettingsOpen={isSettingsOpen}
      onOpenSettings={() => setIsSettingsOpen(true)}
      onCloseSettings={() => setIsSettingsOpen(false)}
      onJumpLesson={(lessonId) => {
        setIsSettingsOpen(false)
        nav.openLesson(lessonId, { force: true })
      }}
      onJumpStory={(storyId) => {
        setIsSettingsOpen(false)
        const story = getStoryById(storyId)
        if (story) {
          nav.openReadPack(story.packId)
          nav.openStory(storyId)
        }
      }}
    >
      <ScreenRouter
        screen={screen}
        selection={selection}
        nav={nav}
        preferences={{ showPronunciation }}
        practice={{
          draftConfig,
          activeConfig,
          updateDraft,
          sessions,
          studyReviewed,
          celebration,
          onStartSession,
          onExitSession,
          onReturnToFlashcards,
          onPracticeAnswer,
          onStudyReviewed: () => setStudyReviewed((n) => n + 1),
          onSelectPracticeMode,
        }}
      />
    </AppShell>
    </>
  )
}
