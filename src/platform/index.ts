/**
 * Epiphany Platform Layer — Phase 1 foundation.
 *
 * Engines + schemas + types; Greek 0.2 app continues using feature paths.
 * Import from @/platform for new cross-subject work.
 */

export * from './types'
export * from './content-schema'
export * from './engines'
export * from './primitives'
export * from './creator-tools'
export * from './utils'
export { SYSTEM_LAYER, CONTENT_LAYER, SUBSTRATE_LAYER, type LayerEntry, type LayerKind } from './separation'

// Adaptive facade (optional import path)
export {
  ADAPTIVE_MODULES,
  buildReviewTodayItems,
  getConfidenceMessages,
  recordLearningAttempt,
  classifyMistake,
  getTopMistakeCategory,
  getDueReviews,
  getReviewRecommendations,
} from './adaptive-systems'
