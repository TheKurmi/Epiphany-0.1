/**
 * System vs content classification for Epiphany 0.2 → platform transition.
 * Reference map — not enforced at runtime in Phase 1.
 */

export type LayerKind = 'system' | 'content' | 'substrate' | 'orchestration' | 'tooling'

export interface LayerEntry {
  path: string
  kind: LayerKind
  description: string
}

/** SYSTEM — reusable engines (subject-agnostic behavior) */
export const SYSTEM_LAYER: LayerEntry[] = [
  { path: 'src/features/read/components/', kind: 'system', description: 'Dialogue/story renderer' },
  { path: 'src/features/learn/data/quiz/', kind: 'system', description: 'Quiz generation engine' },
  { path: 'src/features/learn/components/AspectMatrix.jsx', kind: 'system', description: 'Chart renderer' },
  { path: 'src/shared/components/StudyFocusShell.jsx', kind: 'system', description: 'Focus mode shell' },
  { path: 'src/features/practice/', kind: 'system', description: 'Practice mode engines' },
  { path: 'src/shared/memory/', kind: 'system', description: 'Adaptive memory layer' },
  { path: 'src/app/access.js', kind: 'system', description: 'Progression gates' },
  { path: 'src/platform/', kind: 'system', description: 'Platform abstractions (this layer)' },
]

/** CONTENT — Greek (or future subject) payloads */
export const CONTENT_LAYER: LayerEntry[] = [
  { path: 'src/features/learn/data/lessons/', kind: 'content', description: 'Greek lesson modules' },
  { path: 'src/features/read/data/stories*.js', kind: 'content', description: 'Greek dialogues and stories' },
  { path: 'src/features/read/data/packs.js', kind: 'content', description: 'Reading pack definitions' },
  { path: 'src/data/vocabulary/', kind: 'content', description: 'Greek vocabulary corpus' },
  { path: 'src/features/learn/data/quiz/profiles.js', kind: 'content', description: 'Greek quiz data pools' },
  { path: 'src/features/learn/data/patterns/aspect.js', kind: 'content', description: 'Greek aspect matrix cell data' },
]

/** SUBSTRATE — shared services consumed by systems */
export const SUBSTRATE_LAYER: LayerEntry[] = [
  { path: 'src/data/vocabulary/registry.js', kind: 'substrate', description: 'Vocabulary registry engine host' },
  { path: 'src/utils/speech.js', kind: 'substrate', description: 'TTS / playback' },
  { path: 'src/schemas/content.js', kind: 'substrate', description: 'Legacy JSDoc schemas (bridging to platform)' },
]
