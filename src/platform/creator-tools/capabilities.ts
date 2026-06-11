/**
 * Creator tool foundations — compatibility contracts (no UI, no API).
 * Phase 1: conceptual groundwork only.
 */

import type { ContentType } from '../types'

export type CreatorToolStatus = 'planned' | 'schema-ready' | 'preview-only'

export interface CreatorCapability {
  id: string
  label: string
  contentTypes: ContentType[]
  requiredSchema: string
  status: CreatorToolStatus
  notes: string
}

/** What the future creator platform must be able to author */
export const CREATOR_CAPABILITIES: CreatorCapability[] = [
  {
    id: 'lesson-authoring',
    label: 'Lesson creation',
    contentTypes: ['lesson'],
    requiredSchema: 'platform/content-schema/lessonObject',
    status: 'schema-ready',
    notes: 'Section templates mirror existing lesson section types.',
  },
  {
    id: 'dialogue-authoring',
    label: 'Dialogue authoring',
    contentTypes: ['dialogue', 'story'],
    requiredSchema: 'platform/content-schema/dialogueObject',
    status: 'schema-ready',
    notes: 'Pack assignment and tier metadata required at publish.',
  },
  {
    id: 'quiz-authoring',
    label: 'Quiz profile authoring',
    contentTypes: ['quiz'],
    requiredSchema: 'platform/content-schema/quizObject',
    status: 'schema-ready',
    notes: 'Profile type + data pools; patternTags mandatory for adaptation.',
  },
  {
    id: 'chart-authoring',
    label: 'Chart / diagram authoring',
    contentTypes: ['chart'],
    requiredSchema: 'platform/content-schema/chartObject',
    status: 'planned',
    notes: 'Matrix and table kinds first; validate cell view mode coverage.',
  },
  {
    id: 'path-builder',
    label: 'Learning path builder',
    contentTypes: ['path', 'lesson'],
    requiredSchema: 'docs/learning-path-system.md',
    status: 'planned',
    notes: 'Guided path JSON: lessonIds, practiceModes, readPackIds.',
  },
  {
    id: 'vocab-upload',
    label: 'Vocabulary batch upload',
    contentTypes: ['vocabulary'],
    requiredSchema: 'src/schemas/content.js',
    status: 'schema-ready',
    notes: 'Registry dedupe by surface form; category normalization.',
  },
  {
    id: 'pack-editor',
    label: 'Reading pack editor',
    contentTypes: ['pack'],
    requiredSchema: 'docs/reading-system.md',
    status: 'planned',
    notes: 'Unlock lessons, starter flag, reading tier.',
  },
  {
    id: 'adaptive-preview',
    label: 'Adaptive flow preview',
    contentTypes: ['lesson', 'quiz', 'dialogue'],
    requiredSchema: 'platform/adaptive-systems',
    status: 'preview-only',
    notes: 'Use Developer Mode simulations until creator sandbox exists.',
  },
]
