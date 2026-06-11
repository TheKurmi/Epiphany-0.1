/**
 * Educational engine registry — systems vs content boundary.
 * Implementation remains in feature modules; this file documents platform engines.
 */

import type { ContentType, ReusableContext } from '../types'

export interface PlatformEngineDefinition {
  id: string
  label: string
  description: string
  /** Primary content types this engine consumes */
  contentTypes: ContentType[]
  /** Pillar surfaces */
  contexts: ReusableContext[]
  /** Current implementation location (Greek 0.2) */
  implementationPath: string
  status: 'active' | 'prototype' | 'planned'
}

/**
 * SYSTEM engines — reusable across subjects.
 * CONTENT lives in src/data, src/features/*/data — Greek payloads today.
 */
export const PLATFORM_ENGINES: PlatformEngineDefinition[] = [
  {
    id: 'dialogue-renderer',
    label: 'Dialogue / Story Renderer',
    description: 'Renders conversational lines, listen-along, highlights, comprehension.',
    contentTypes: ['dialogue', 'story'],
    contexts: ['read', 'dictation', 'shadowing'],
    implementationPath: 'src/features/read/',
    status: 'active',
  },
  {
    id: 'quiz-engine',
    label: 'Quiz Generation Engine',
    description: 'Profile-driven question generation and mastery sessions.',
    contentTypes: ['quiz'],
    contexts: ['learn', 'assessment', 'review'],
    implementationPath: 'src/features/learn/data/quiz/',
    status: 'active',
  },
  {
    id: 'chart-engine',
    label: 'Educational Visualization Engine',
    description: 'Matrix, table, timeline charts with study-focus mode.',
    contentTypes: ['chart'],
    contexts: ['learn', 'reference'],
    implementationPath: 'src/features/learn/components/ + data/patterns/',
    status: 'active',
  },
  {
    id: 'practice-engine',
    label: 'Practice Exercise Engine',
    description: 'Flashcards, typing, dictation, weak-spot, sentence builder.',
    contentTypes: ['exercise', 'vocabulary'],
    contexts: ['practice'],
    implementationPath: 'src/features/practice/ + src/shared/exercises/',
    status: 'active',
  },
  {
    id: 'progression-engine',
    label: 'Progression & Access Engine',
    description: 'Lesson/pack unlocks, reading tiers, mastery level gates.',
    contentTypes: ['lesson', 'pack', 'path'],
    contexts: ['learn', 'read'],
    implementationPath: 'src/app/access.js + unlocks + path data',
    status: 'active',
  },
  {
    id: 'path-engine',
    label: 'Learning Path Engine',
    description: 'Ordered paths, guided journeys, recommendations.',
    contentTypes: ['path', 'lesson'],
    contexts: ['learn'],
    implementationPath: 'src/features/learn/data/path.js + paths/guidedPaths.js',
    status: 'active',
  },
  {
    id: 'vocabulary-registry',
    label: 'Vocabulary Registry Engine',
    description: 'Central word metadata for all pillars.',
    contentTypes: ['vocabulary'],
    contexts: ['learn', 'practice', 'read'],
    implementationPath: 'src/data/vocabulary/registry.js',
    status: 'active',
  },
  {
    id: 'spoken-response',
    label: 'Spoken Response Assessment',
    description: 'Future: speech recognition and pronunciation scoring.',
    contentTypes: ['quiz', 'exercise'],
    contexts: ['practice', 'assessment'],
    implementationPath: 'platform/engines (planned)',
    status: 'planned',
  },
]

export function getEngineById(id: string): PlatformEngineDefinition | undefined {
  return PLATFORM_ENGINES.find((e) => e.id === id)
}
