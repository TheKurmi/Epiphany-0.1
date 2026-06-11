/**
 * Adaptive systems — platform facade over existing memory layer.
 */

export { ADAPTIVE_MODULES, type AdaptiveModuleDefinition } from './modules'

export { buildReviewTodayItems, getConfidenceMessages } from '@/shared/memory/reviewSurface'
export { recordLearningAttempt } from '@/shared/memory/recordLearningAttempt'
export { classifyMistake, getTopMistakeCategory } from '@/shared/memory/mistakePatterns'
export { getDueReviews } from '@/shared/hooks/useSpacedRepetition'
export { getReviewRecommendations } from '@/features/learn/data/curriculum/recommendations'
