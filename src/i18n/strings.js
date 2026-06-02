/**
 * UI string registry — prepare for future localization.
 * Usage: import { t } from '@/i18n/strings'
 */

const en = {
  app: {
    title: 'Epiphany 0.2',
    tagline: 'Understand Greek grammar — practice until it sticks — read with confidence.',
  },
  nav: {
    home: 'Home',
    learn: 'Learn',
    practice: 'Practice',
    read: 'Read',
    settings: 'Settings',
  },
  learn: {
    title: 'Learn',
    subtitle: 'Grammar, syntax, and structured progression.',
    recommendedNext: 'Recommended next',
    suggestedReview: 'Suggested review',
    learningPath: 'Learning path',
    browseTopics: 'Browse topics',
  },
  practice: {
    title: 'Practice',
    subtitle: 'Reinforcement through active recall and drills.',
  },
  read: {
    title: 'Read',
    subtitle: 'Comprehensible input and immersion.',
  },
  progress: {
    title: 'Your progress',
    streak: 'day streak',
    path: 'learning path',
    mastery: 'avg mastery',
    storiesRead: 'stories read',
    wordsLearned: 'words in library',
    recommendedNext: 'Recommended next',
  },
  profile: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    fluent: 'Fluent Speaker',
    developer: 'Developer Mode',
  },
  dev: {
    title: 'Developer tools',
    resetProgress: 'Reset progress',
    unlockAll: 'Unlock everything',
    clearStorage: 'Clear local storage',
    testTts: 'Test audio / TTS',
    jumpLesson: 'Jump to lesson',
    jumpStory: 'Jump to story',
    simulateBeginner: 'Simulate Beginner',
  },
}

let locale = 'en'
const catalogs = { en }

/** @param {keyof typeof en} section @param {string} key */
export function t(section, key) {
  return catalogs[locale]?.[section]?.[key] ?? key
}

export function setLocale(next) {
  if (catalogs[next]) locale = next
}

export { en as stringsEn }
