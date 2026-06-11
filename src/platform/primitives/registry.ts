/**
 * Educational primitives — portable atoms creators and engines compose.
 */

import type { ContentType, ReusableContext } from '../types'

export interface EducationalPrimitive {
  id: string
  name: string
  description: string
  schemaRef: string
  contexts: ReusableContext[]
  contentTypes: ContentType[]
}

export const EDUCATIONAL_PRIMITIVES: EducationalPrimitive[] = [
  {
    id: 'lesson-unit',
    name: 'Lesson',
    description: 'Structured teaching unit with sections and intro.',
    schemaRef: 'platform/content-schema/lessonObject',
    contexts: ['learn'],
    contentTypes: ['lesson'],
  },
  {
    id: 'dialogue-unit',
    name: 'Dialogue',
    description: 'Turn-based or narrative lines for input and practice reuse.',
    schemaRef: 'platform/content-schema/dialogueObject',
    contexts: ['read', 'dictation', 'shadowing', 'practice'],
    contentTypes: ['dialogue', 'story'],
  },
  {
    id: 'quiz-profile',
    name: 'Quiz Profile',
    description: 'Declarative assessment data pools tied to mastery tiers.',
    schemaRef: 'platform/content-schema/quizObject',
    contexts: ['learn', 'assessment', 'review'],
    contentTypes: ['quiz'],
  },
  {
    id: 'chart-visual',
    name: 'Chart',
    description: 'Interactive educational diagram (matrix, table, timeline).',
    schemaRef: 'platform/content-schema/chartObject',
    contexts: ['learn', 'reference'],
    contentTypes: ['chart'],
  },
  {
    id: 'vocab-entry',
    name: 'Vocabulary Entry',
    description: 'Registry word with metadata and tags.',
    schemaRef: 'src/schemas/content.js (VocabItemSchema)',
    contexts: ['learn', 'practice', 'read'],
    contentTypes: ['vocabulary'],
  },
  {
    id: 'exercise-template',
    name: 'Exercise Template',
    description: 'Pattern-tagged drill template for practice generators.',
    schemaRef: 'src/schemas/content.js (ExerciseTemplateSchema)',
    contexts: ['practice'],
    contentTypes: ['exercise'],
  },
  {
    id: 'content-pack',
    name: 'Content Pack',
    description: 'Themed bundle with unlock rules and input tier.',
    schemaRef: 'docs/content-schema.md (pack metadata)',
    contexts: ['read'],
    contentTypes: ['pack'],
  },
  {
    id: 'guided-path',
    name: 'Guided Path',
    description: 'Cross-pillar journey linking lessons, practice, and reads.',
    schemaRef: 'docs/learning-path-system.md',
    contexts: ['learn', 'practice', 'read'],
    contentTypes: ['path'],
  },
]
