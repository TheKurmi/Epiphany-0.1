import { useCallback, useSyncExternalStore } from 'react'
import { MASTERY_LEVELS } from '@/features/learn/data/quiz/levels'
import { getQuizProfile } from '@/features/learn/data/quiz/profiles'
import { STORAGE_KEYS } from '@/app/storage/keys'

const STORAGE_KEY = STORAGE_KEYS.masteryProgress

function emptyLevelStats() {
  return { attempts: 0, correct: 0, nearMiss: 0, wrong: 0 }
}

function emptyTopicProgress() {
  return {
    masteryPercent: 0,
    unlockedLevel: 1,
    levels: Object.fromEntries(
      MASTERY_LEVELS.map((l) => [l.id, emptyLevelStats()]),
    ),
    weakPatterns: {},
  }
}

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeAll(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event('mastery-progress'))
}

function computeMasteryPercent(levels) {
  let total = 0
  let score = 0
  for (const level of MASTERY_LEVELS) {
    const stats = levels[level.id]
    if (!stats || stats.attempts === 0) continue
    const accuracy = stats.correct / stats.attempts
    total += 1
    score += accuracy
  }
  return total === 0 ? 0 : Math.round((score / total) * 100)
}

function getWeakPatterns(weakPatterns) {
  return Object.entries(weakPatterns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag, count]) => ({ tag, count }))
}

let snapshot = readAll()
const listeners = new Set()

function subscribe(listener) {
  listeners.add(listener)
  const onStorage = () => {
    snapshot = readAll()
    listener()
  }
  window.addEventListener('mastery-progress', onStorage)
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('mastery-progress', onStorage)
    window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot() {
  return snapshot
}

export function getTopicProgress(topicId) {
  const all = readAll()
  return all[topicId] ?? emptyTopicProgress()
}

/**
 * @param {string} topicId
 * @param {number} masteryLevel
 * @param {{ result: 'correct' | 'nearMiss' | 'wrong', patternTag?: string }[]} answers
 */
export function recordMasterySession(topicId, masteryLevel, answers) {
  const all = readAll()
  const topic = all[topicId] ?? emptyTopicProgress()
  const levelStats = topic.levels[masteryLevel] ?? emptyLevelStats()

  for (const answer of answers) {
    levelStats.attempts += 1

    if (answer.result === 'correct') levelStats.correct += 1
    else if (answer.result === 'nearMiss') levelStats.nearMiss += 1
    else levelStats.wrong += 1

    if (
      answer.patternTag &&
      (answer.result === 'wrong' || answer.result === 'nearMiss')
    ) {
      topic.weakPatterns[answer.patternTag] =
        (topic.weakPatterns[answer.patternTag] ?? 0) + 1
    }
  }

  topic.levels[masteryLevel] = levelStats

  topic.masteryPercent = computeMasteryPercent(topic.levels)

  const levelConfig = MASTERY_LEVELS.find((l) => l.id === masteryLevel)
  const sessionCorrect = answers.filter((a) => a.result === 'correct').length
  const sessionScore = sessionCorrect / answers.length

  if (
    levelConfig &&
    sessionScore >= levelConfig.passThreshold &&
    masteryLevel === topic.unlockedLevel &&
    topic.unlockedLevel < MASTERY_LEVELS.length
  ) {
    topic.unlockedLevel = masteryLevel + 1
  }

  all[topicId] = topic
  writeAll(all)
  snapshot = all
}

export function useMasteryProgress(topicId) {
  const all = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const progress = topicId
    ? (all[topicId] ?? emptyTopicProgress())
    : emptyTopicProgress()

  const recordSession = useCallback(
    (masteryLevel, answers) => {
      recordMasterySession(topicId, masteryLevel, answers)
    },
    [topicId],
  )

  return {
    progress,
    weakPatterns: getWeakPatterns(progress.weakPatterns),
    recordSession,
    isLevelUnlocked: (levelId) => levelId <= progress.unlockedLevel,
  }
}

export function useAllMasteryProgress() {
  const all = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return all
}

/** Aggregate weak patterns across all topics for adaptive practice. */
export function getAggregatedWeakSpots(allProgress, limit = 5) {
  const spots = []

  for (const [topicId, progress] of Object.entries(allProgress)) {
    for (const [tag, count] of Object.entries(progress.weakPatterns ?? {})) {
      spots.push({ topicId, patternTag: tag, count })
    }
  }

  return spots.sort((a, b) => b.count - a.count).slice(0, limit)
}

/**
 * Record a single practice attempt (typing, dictation, etc.) into mastery weak patterns.
 */
export function recordPracticeAttempt(topicId, { result, patternTag }) {
  if (!topicId || !patternTag) return
  if (result !== 'wrong' && result !== 'nearMiss') return
  if (!getQuizProfile(topicId)) return
  recordMasterySession(topicId, 1, [{ result, patternTag }])
}
