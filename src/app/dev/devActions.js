/**
 * Developer actions — progression, memory, and simulation utilities.
 * Only invoked from Developer Mode UI.
 */
import { STORAGE_KEYS } from '@/app/storage/keys'
import { writeLearningProfile } from '@/app/profile'
import { LEARNING_PATH } from '@/features/learn/data/path'
import { ALL_LESSONS } from '@/features/learn/data/lessons'
import { STORIES } from '@/features/read/data/stories'
import { speakGreek } from '@/utils/speech'
import {
  setDevModeEnabled,
  setTestAsLearner,
  setDebugOverlays,
} from '@/app/dev/devState'
import {
  PROGRESSION_PRESETS,
  LEARNER_SIMULATIONS,
  MISTAKE_SIMULATIONS,
  getQuizTopicIds,
} from '@/app/dev/simulations'
import { clearReviewStore, injectReviewItems } from '@/shared/hooks/useSpacedRepetition'
import {
  clearMistakePatterns,
  injectMistakeProfile,
  getMistakePatternSummary,
} from '@/shared/memory/mistakePatterns'
import { getReviewSummary } from '@/shared/hooks/useSpacedRepetition'
import {
  resetLearningProgressData,
  setCompletedLessons,
  setCompletedStories,
  getLearningProgressSnapshot,
} from '@/shared/hooks/useLearningProgress'
import { writeAllMasteryProgress } from '@/features/learn/hooks/useMasteryProgress'

export function enableDeveloperMode() {
  setDevModeEnabled(true)
}

export function disableDeveloperMode() {
  setDevModeEnabled(false)
}

export function resetLearningProgress() {
  resetLearningProgressData()
  localStorage.removeItem(STORAGE_KEYS.masteryProgress)
  localStorage.removeItem(STORAGE_KEYS.spacedRepetition)
  localStorage.removeItem(STORAGE_KEYS.vocabProgress)
  clearMistakePatterns()
  writeAllMasteryProgress({})
  window.dispatchEvent(new Event('mastery-progress'))
  window.dispatchEvent(new Event('spaced-repetition'))
}

export function unlockEverything() {
  enableDeveloperMode()
  setTestAsLearner(false)
  setCompletedLessons([...LEARNING_PATH])
  setCompletedStories(STORIES.map((s) => s.id))
}

export function simulateBeginner() {
  resetLearningProgress()
  writeLearningProfile('beginner')
  setTestAsLearner(true)
}

export function applyProgressionPreset(presetId) {
  const preset = PROGRESSION_PRESETS[presetId]
  if (!preset) return
  setCompletedLessons(preset.lessonIds)
}

export function markAllLessonsComplete() {
  setCompletedLessons([...LEARNING_PATH])
}

export function markAllStoriesComplete() {
  setCompletedStories(STORIES.map((s) => s.id))
}

export function clearReviewQueue() {
  clearReviewStore()
}

export function resetMemorySystems() {
  clearReviewStore()
  clearMistakePatterns()
  writeAllMasteryProgress({})
}

export function simulateMistakeProfile(simulationId) {
  const sim = MISTAKE_SIMULATIONS[simulationId]
  if (!sim) return
  injectMistakeProfile(sim.category, sim.count, {
    patternTag: sim.patternTag,
    sample: sim.sample,
  })
}

export function simulateWeakSpots() {
  const topics = getQuizTopicIds().slice(0, 4)
  const mastery = {}
  for (const topicId of topics) {
    mastery[topicId] = {
      masteryPercent: 35,
      unlockedLevel: 1,
      levels: {
        1: { attempts: 10, correct: 3, nearMiss: 2, wrong: 5 },
        2: { attempts: 0, correct: 0, nearMiss: 0, wrong: 0 },
        3: { attempts: 0, correct: 0, nearMiss: 0, wrong: 0 },
      },
      weakPatterns: {
        'verb-present': 4,
        'article-gender': 3,
        'plural-pattern': 2,
      },
    }
  }
  writeAllMasteryProgress(mastery)

  injectReviewItems(
    topics.flatMap((topicId, i) => [
      {
        type: 'pattern',
        id: `${topicId}:verb-present`,
        strength: 0,
        wrong: 3,
      },
      {
        type: 'pattern',
        id: `${topicId}:general`,
        strength: 1,
        wrong: 2,
      },
    ]).slice(0, 10),
  )
}

export function simulateForgottenWords(count = 10) {
  const items = Array.from({ length: count }, (_, i) => ({
    type: 'vocab',
    id: `dev-vocab-${i}`,
    strength: 0,
    wrong: 2,
  }))
  injectReviewItems(items)
}

export function applyLearnerSimulation(simulationId) {
  const sim = LEARNER_SIMULATIONS[simulationId]
  if (!sim) return

  resetLearningProgress()

  if (sim.preset) {
    applyProgressionPreset(sim.preset)
  } else {
    setCompletedLessons([])
    setCompletedStories([])
  }

  if (sim.profile) {
    writeLearningProfile(sim.profile)
  }

  if (sim.fullMastery) {
    const mastery = {}
    for (const topicId of getQuizTopicIds()) {
      mastery[topicId] = {
        masteryPercent: 88,
        unlockedLevel: 3,
        levels: {
          1: { attempts: 20, correct: 18, nearMiss: 1, wrong: 1 },
          2: { attempts: 15, correct: 13, nearMiss: 1, wrong: 1 },
          3: { attempts: 10, correct: 9, nearMiss: 0, wrong: 1 },
        },
        weakPatterns: {},
      }
    }
    writeAllMasteryProgress(mastery)
  }

  if (sim.injectWeakSpots) {
    simulateWeakSpots()
  }

  if (sim.injectMistakes) {
    simulateMistakeProfile(sim.injectMistakes)
  }

  if (sim.injectVocabReview) {
    simulateForgottenWords(sim.injectVocabReview)
  }

  if (sim.injectGrammarReview) {
    injectReviewItems(
      Array.from({ length: sim.injectGrammarReview }, (_, i) => ({
        type: 'pattern',
        id: `present-tense:grammar-${i}`,
        strength: 0,
        wrong: 2,
      })),
    )
    simulateMistakeProfile('tense_selection')
  }

  window.dispatchEvent(new Event('learning-progress'))
  window.dispatchEvent(new Event('mastery-progress'))
  window.dispatchEvent(new Event('spaced-repetition'))
  window.dispatchEvent(new Event('mistake-patterns'))
}

export function clearAllLocalStorage() {
  const keys = Object.values(STORAGE_KEYS)
  for (const key of keys) {
    localStorage.removeItem(key)
  }
  window.location.reload()
}

export function testTts() {
  speakGreek('Καλημέρα! Αυτό είναι ένα τεστ ήχου.')
}

export function getDevJumpTargets() {
  return {
    lessons: ALL_LESSONS.map((l) => ({ id: l.id, title: l.title, level: l.level })),
    stories: STORIES.map((s) => ({
      id: s.id,
      title: s.title,
      packId: s.packId,
      level: s.level,
    })),
    path: LEARNING_PATH,
  }
}

export function getDevDiagnostics() {
  const progress = getLearningProgressSnapshot()
  const review = getReviewSummary()
  const mistakes = getMistakePatternSummary()

  return {
    progress: {
      completedLessons: progress.completedLessons.length,
      totalLessons: LEARNING_PATH.length,
      completedStories: progress.completedStories.length,
      totalStories: STORIES.length,
      streak: progress.streak,
    },
    review,
    mistakes,
  }
}

export {
  PROGRESSION_PRESETS,
  LEARNER_SIMULATIONS,
  MISTAKE_SIMULATIONS,
  setTestAsLearner,
  setDebugOverlays,
}
