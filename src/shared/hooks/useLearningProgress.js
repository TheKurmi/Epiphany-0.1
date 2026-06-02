import { useCallback, useSyncExternalStore } from 'react'
import { LEARNING_PATH } from '@/features/learn/data/path'
import { LEARN_TOPICS } from '@/features/learn/data/topics'
import { getRecommendedNextLesson } from '@/features/learn/data/curriculum'
import { getLessonById } from '@/features/learn/data'
import { getAggregatedWeakSpots, useAllMasteryProgress } from '@/features/learn/hooks/useMasteryProgress'
import { STORAGE_KEYS } from '@/app/storage/keys'

const STORAGE_KEY = STORAGE_KEYS.learningProgress

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function emptyProgress() {
  return {
    completedLessons: [],
    completedStories: [],
    streak: 0,
    lastActiveDate: null,
    totalReadingSessions: 0,
  }
}

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...emptyProgress(), ...JSON.parse(raw) } : emptyProgress()
  } catch {
    return emptyProgress()
  }
}

function writeAll(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event('learning-progress'))
}

let snapshot = readAll()
const listeners = new Set()

function subscribe(listener) {
  listeners.add(listener)
  const onStorage = () => {
    snapshot = readAll()
    listener()
  }
  window.addEventListener('learning-progress', onStorage)
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('learning-progress', onStorage)
    window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot() {
  return snapshot
}

function touchStreak(data) {
  const today = todayKey()
  if (data.lastActiveDate === today) return data

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayKey = yesterday.toISOString().slice(0, 10)

  const nextStreak =
    data.lastActiveDate === yesterdayKey ? data.streak + 1 : 1

  return { ...data, streak: nextStreak, lastActiveDate: today }
}

export function getCompletedLessons() {
  return readAll().completedLessons ?? []
}

export function markLessonComplete(lessonId) {
  const data = readAll()
  if (data.completedLessons.includes(lessonId)) return
  const updated = touchStreak({
    ...data,
    completedLessons: [...data.completedLessons, lessonId],
  })
  writeAll(updated)
  snapshot = updated
}

export function markStoryComplete(storyId) {
  const data = readAll()
  const alreadyDone = data.completedStories.includes(storyId)
  const updated = touchStreak({
    ...data,
    completedStories: alreadyDone
      ? data.completedStories
      : [...data.completedStories, storyId],
    totalReadingSessions: data.totalReadingSessions + 1,
  })
  writeAll(updated)
  snapshot = updated
}

export function recordActivity() {
  const data = readAll()
  const updated = touchStreak(data)
  if (updated !== data) {
    writeAll(updated)
    snapshot = updated
  }
}

export function useLearningProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const markLesson = useCallback((lessonId) => {
    markLessonComplete(lessonId)
  }, [])

  const markStory = useCallback((storyId) => {
    markStoryComplete(storyId)
  }, [])

  return {
    progress,
    completedLessons: progress.completedLessons,
    completedStories: progress.completedStories,
    streak: progress.streak,
    markLesson,
    markStory,
    recordActivity,
  }
}

/** Dashboard aggregates for the home progress panel. */
export function useProgressDashboard() {
  const { progress } = useLearningProgress()
  const masteryAll = useAllMasteryProgress()

  const topicStats = LEARN_TOPICS.filter((t) => !t.comingSoon).map((topic) => {
    const tp = masteryAll[topic.id]
    return {
      id: topic.id,
      label: topic.label,
      masteryPercent: tp?.masteryPercent ?? 0,
    }
  })

  const avgMastery =
    topicStats.length === 0
      ? 0
      : Math.round(
          topicStats.reduce((sum, t) => sum + t.masteryPercent, 0) /
            topicStats.length,
        )

  const sorted = [...topicStats].sort(
    (a, b) => b.masteryPercent - a.masteryPercent,
  )
  const strongest = sorted.filter((t) => t.masteryPercent > 0).slice(0, 2)
  const weakest = [...sorted]
    .reverse()
    .filter((t) => t.masteryPercent < 100)
    .slice(0, 2)

  const weakSpots = getAggregatedWeakSpots(masteryAll, 4)

  const recommendedLessonId = getRecommendedNextLesson(
    progress.completedLessons,
    LEARNING_PATH,
  )
  const recommendedLesson = recommendedLessonId
    ? getLessonById(recommendedLessonId)
    : null

  const pathProgress = LEARNING_PATH.length
    ? Math.round(
        (progress.completedLessons.filter((id) => LEARNING_PATH.includes(id))
          .length /
          LEARNING_PATH.length) *
          100,
      )
    : 0

  return {
    streak: progress.streak,
    completedLessons: progress.completedLessons.length,
    completedLessonIds: progress.completedLessons,
    totalLessons: LEARNING_PATH.length,
    pathProgress,
    avgMastery,
    completedStories: progress.completedStories.length,
    strongest,
    weakest,
    weakSpots,
    recommendedLesson,
    masteryAll,
  }
}
