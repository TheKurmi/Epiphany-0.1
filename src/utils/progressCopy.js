import { CHALLENGE_SESSION_SIZE } from '../data/constants'

/** Progress bar fill for study mode (cycles every 10 words, no database total). */
export function studyProgressPercent(wordsReviewed) {
  if (wordsReviewed <= 0) return 0
  const step = wordsReviewed % CHALLENGE_SESSION_SIZE || CHALLENGE_SESSION_SIZE
  return (step / CHALLENGE_SESSION_SIZE) * 100
}

export function studyProgressDetail(wordsReviewed) {
  if (wordsReviewed <= 0) return 'Ready when you are'
  const step = wordsReviewed % CHALLENGE_SESSION_SIZE || CHALLENGE_SESSION_SIZE
  return `Word ${step} of ${CHALLENGE_SESSION_SIZE} · ${wordsReviewed} practiced today`
}

export function challengeProgressDetail(position, total) {
  return `Card ${position} / ${total}`
}
