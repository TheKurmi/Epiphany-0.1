/** Screen identifiers for the platform router. */
export const SCREENS = {
  HOME: 'home',
  LEARN: 'learn',
  TOPIC: 'topic',
  LESSON: 'lesson',
  MASTERY_QUIZ: 'mastery-quiz',
  PRACTICE: 'practice',
  PRACTICE_CONFIG: 'practice-config',
  SESSION: 'session',
  REFERENCE: 'reference',
  READ: 'read',
  READ_PACK: 'read-pack',
  STORY: 'story',
}

export function isLearnScreen(screen) {
  return (
    screen === SCREENS.LEARN ||
    screen === SCREENS.TOPIC ||
    screen === SCREENS.LESSON ||
    screen === SCREENS.MASTERY_QUIZ ||
    screen === SCREENS.REFERENCE
  )
}

export function isPracticeScreen(screen) {
  return (
    screen === SCREENS.PRACTICE ||
    screen === SCREENS.PRACTICE_CONFIG ||
    screen === SCREENS.SESSION
  )
}

export function isReadScreen(screen) {
  return (
    screen === SCREENS.READ ||
    screen === SCREENS.READ_PACK ||
    screen === SCREENS.STORY
  )
}
