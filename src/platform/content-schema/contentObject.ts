/**
 * Base educational content object — all platform content extends this.
 * Foundational structure for future interoperability (not a database model).
 */

import type {
  AdaptiveWeight,
  ConceptId,
  DifficultyLevel,
  EducationalTag,
  LearningGoal,
  LocaleCode,
  PlatformMetadata,
  ReusableContext,
  ReviewPriority,
  SubjectId,
} from '../types'

export const PLATFORM_CONTENT_VERSION = '0.3.0-platform'

/**
 * Shared metadata every educational object should be able to carry.
 * Greek 0.2 content may omit fields; adapters fill defaults at read time.
 */
export interface PlatformContentObject {
  /** Stable id — creator content should use namespaced ids */
  id: string

  /** Primary display title */
  title: string

  /** Optional subtitle or English gloss */
  titleSecondary?: string

  /** Domain: greek, spanish, calculus, etc. */
  subject: SubjectId

  /** Primary locale for surface text */
  locale?: LocaleCode

  difficulty: DifficultyLevel

  /** Cross-cutting tags (travel, food, aspect, interview…) */
  tags: EducationalTag[]

  /** Curriculum concept handles for graphs and recommendations */
  concepts: ConceptId[]

  /** Content ids that should be completed or understood first */
  prerequisites: string[]

  /** Pedagogical intents this object serves */
  learningGoals: LearningGoal[]

  /** Human-readable estimate e.g. "5–6 min" or minutes number */
  estimatedDuration?: string | number

  /**
   * 0–1 — how strongly weak performance should resurface this content.
   * Engine interprets; not a learner-visible score.
   */
  adaptiveWeight?: AdaptiveWeight

  reviewPriority?: ReviewPriority

  /** Where this object may appear without duplication */
  reusableContexts: ReusableContext[]

  /** Platform packaging */
  metadata?: PlatformMetadata

  /** Optional summary for discovery cards */
  summary?: string
}

/** Minimal fields required to register content in a catalog */
export type ContentCatalogEntry = Pick<
  PlatformContentObject,
  'id' | 'title' | 'subject' | 'difficulty' | 'tags' | 'concepts'
>
