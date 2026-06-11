/**
 * Shared educational language for the Epiphany platform.
 * Subject-agnostic — Greek 0.2 is the first implementation layer.
 */

/** High-level content categories across the ecosystem */
export type ContentType =
  | 'lesson'
  | 'dialogue'
  | 'story'
  | 'quiz'
  | 'chart'
  | 'vocabulary'
  | 'exercise'
  | 'path'
  | 'pack'

/** Subject / domain identifier (e.g. greek, math, history-interview) */
export type SubjectId = string

/** Locale or language code for localized surface forms */
export type LocaleCode = string

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export type LearningGoal =
  | 'recognition'
  | 'production'
  | 'comprehension'
  | 'conversation'
  | 'pattern-internalization'
  | 'fluency'
  | 'assessment'

/** Cross-cutting labels for search, adaptation, and creator filters */
export type EducationalTag = string

/** Concept handles for curriculum graph and adaptive targeting */
export type ConceptId = string

/**
 * Influence on adaptive resurfacing (0–1 normalized in content metadata).
 * Higher = more likely to appear in review when weak.
 */
export type AdaptiveWeight = number

/**
 * Base priority for spaced / review scheduling.
 */
export type ReviewPriority = 'low' | 'normal' | 'high' | 'critical'

/** Contexts where the same content primitive may render */
export type ReusableContext =
  | 'learn'
  | 'practice'
  | 'read'
  | 'review'
  | 'dictation'
  | 'shadowing'
  | 'assessment'
  | 'reference'

/** Creator ownership — namespaced when multi-creator ships */
export type CreatorId = string

export type ContentNamespace = 'official' | 'creator' | 'tutor'

export interface PlatformMetadata {
  version: string
  namespace: ContentNamespace
  creatorId?: CreatorId
  createdAt?: string
  updatedAt?: string
}
