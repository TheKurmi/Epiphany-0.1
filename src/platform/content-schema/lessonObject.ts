/**
 * Generalized lesson object — structured teaching units.
 * Maps to current Greek lessons in src/features/learn/data/lessons/
 */

import type { PlatformContentObject } from './contentObject'
import type { ContentType, ConceptId } from '../types'

export type LessonSectionType =
  | 'text'
  | 'grammarTable'
  | 'examples'
  | 'drill'
  | 'aspectMatrix'
  | 'verbTransformation'
  | 'timeline'
  | 'miniQuiz'
  | 'insight'
  | string

export interface LessonSection {
  type: LessonSectionType
  title?: string
  /** Section-specific payload — intentionally flexible for creator templates */
  payload?: Record<string, unknown>
}

export interface LessonIntro {
  paragraphs?: string[]
  examples?: Array<{ primary: string; secondary: string }>
  /** Legacy Greek field names supported via adapter */
  [key: string]: unknown
}

export interface PlatformLessonObject extends PlatformContentObject {
  contentType: Extract<ContentType, 'lesson'>

  /** Links to quiz profile / topic mastery */
  topicId: string

  /** Ordering on a learning path */
  pathOrder: number

  intro: LessonIntro
  sections: LessonSection[]

  commonMistakes?: Array<{ mistake: string; fix: string }>
  deepDive?: Record<string, unknown>

  /** Topics required before unlock (mirrors LESSON_PREREQUISITES) */
  requiredConcepts?: ConceptId[]
}
