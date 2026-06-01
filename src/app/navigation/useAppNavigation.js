import { useState } from 'react'
import { getLessonById } from '@/features/learn/data'
import { isLessonUnlocked } from '@/features/learn/data/unlocks'
import { getCompletedLessons } from '@/shared/hooks/useLearningProgress'
import { SCREENS } from './screens'

const emptySelection = {
  lessonId: null,
  topicId: null,
  masteryLevel: null,
  packId: null,
  storyId: null,
}

/** Platform navigation state — screen routing and selection IDs. */
export function useAppNavigation() {
  const [screen, setScreen] = useState(SCREENS.HOME)
  const [selection, setSelection] = useState(emptySelection)

  function go(nextScreen, patch = {}) {
    if (Object.keys(patch).length) {
      setSelection((s) => ({ ...s, ...patch }))
    }
    setScreen(nextScreen)
  }

  function clearSelection(keys) {
    setSelection((s) => {
      const next = { ...s }
      for (const key of keys) next[key] = null
      return next
    })
  }

  return {
    screen,
    selection,
    nav: {
      home: () => {
        setSelection(emptySelection)
        setScreen(SCREENS.HOME)
      },

      openLearn: () => setScreen(SCREENS.LEARN),
      backFromLearn: () => {
        setSelection(emptySelection)
        setScreen(SCREENS.HOME)
      },
      openTopic: (topicId) => go(SCREENS.TOPIC, { topicId }),
      backFromTopic: () => {
        clearSelection(['lessonId', 'masteryLevel'])
        setScreen(SCREENS.LEARN)
      },
      openLesson: (lessonId) => {
        const lesson = getLessonById(lessonId)
        if (!lesson || !isLessonUnlocked(lessonId, getCompletedLessons())) return
        go(SCREENS.LESSON, { lessonId, topicId: lesson.topicId })
      },
      backFromLesson: () => {
        clearSelection(['lessonId'])
        setScreen(SCREENS.TOPIC)
      },
      startMasteryQuiz: (topicId, level) =>
        go(SCREENS.MASTERY_QUIZ, { topicId, masteryLevel: level }),
      backFromMasteryQuiz: () => {
        clearSelection(['masteryLevel'])
        setScreen(SCREENS.TOPIC)
      },
      completeMasteryQuiz: () => {
        clearSelection(['masteryLevel'])
        setScreen(SCREENS.TOPIC)
      },
      openMasteryFromLesson: (topicId) => go(SCREENS.TOPIC, { topicId }),

      openPractice: () => setScreen(SCREENS.PRACTICE),
      backFromPractice: () => setScreen(SCREENS.HOME),
      selectPracticeMode: () => setScreen(SCREENS.PRACTICE_CONFIG),
      backFromPracticeConfig: () => setScreen(SCREENS.PRACTICE),
      startSession: () => setScreen(SCREENS.SESSION),
      exitSession: () => setScreen(SCREENS.PRACTICE_CONFIG),
      returnToFlashcards: () => setScreen(SCREENS.PRACTICE_CONFIG),

      openRead: () => setScreen(SCREENS.READ),
      backFromRead: () => {
        clearSelection(['packId', 'storyId'])
        setScreen(SCREENS.HOME)
      },
      openReadPack: (packId) => {
        if (!packId) return
        go(SCREENS.READ_PACK, { packId, storyId: null })
      },
      backFromReadPack: () => {
        clearSelection(['packId', 'storyId'])
        setScreen(SCREENS.READ)
      },
      openStory: (storyId) => {
        if (!storyId) return
        go(SCREENS.STORY, { storyId })
      },
      backFromStory: () => {
        clearSelection(['storyId'])
        setScreen(SCREENS.READ_PACK)
      },
    },
  }
}

export { SCREENS, isLearnScreen, isPracticeScreen, isReadScreen } from './screens'
