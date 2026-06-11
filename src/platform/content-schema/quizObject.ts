/**
 * Generalized quiz / assessment content object.
 * Separates assessment *content* from generator *engine* implementation.
 */

import type { PlatformContentObject } from './contentObject'
import type { ContentType, ConceptId } from '../types'

/** Surface interaction types — engines map these to UI */
export type QuizInteractionType =
  | 'multipleChoice'
  | 'fillBlank'
  | 'sentenceBlank'
  | 'dictation'
  | 'transformation'
  | 'ordering'
  | 'matching'
  | 'spokenResponse'
  | 'adaptiveReview'

/** Generator profile family (Epiphany 0.2 quiz profiles) */
export type QuizProfileType =
  | 'conjugation'
  | 'articles'
  | 'negation'
  | 'sentence'
  | 'vocabulary'
  | 'custom'

export interface QuizMasteryTier {
  id: number
  label: string
  description: string
  questionsPerSession: number
  passThreshold: number
  allowedInteractionTypes: QuizInteractionType[]
}

export interface QuizQuestionTemplate {
  id: string
  interactionType: QuizInteractionType
  prompt: string
  patternTag: string
  hint?: string
  /** Profile-specific generator payload */
  generatorPayload?: Record<string, unknown>
}

export interface PlatformQuizProfileObject extends PlatformContentObject {
  contentType: Extract<ContentType, 'quiz'>

  profileType: QuizProfileType

  /** Links to learn topic / mastery */
  topicId: string

  masteryTiers: QuizMasteryTier[]

  /** Data pools for generators — verbs, nouns, templates, etc. */
  dataPools: Record<string, unknown>

  /** Tags emitted on wrong/near-miss for adaptive systems */
  defaultPatternTags: string[]
}

export interface GeneratedQuizQuestionObject {
  id: string
  interactionType: QuizInteractionType
  prompt: string
  correctAnswer: string
  options?: string[]
  patternTag?: string
  hint?: string
  sourceContentId?: string
  conceptIds?: ConceptId[]
}
