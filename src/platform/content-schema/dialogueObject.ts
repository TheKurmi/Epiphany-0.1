/**
 * Generalized dialogue / conversational content object.
 * Supersedes "Greek story block" as the platform primitive over time.
 */

import type { PlatformContentObject } from './contentObject'
import type { ContentType } from '../types'

/** Future scenario families beyond language */
export type DialogueScenarioType =
  | 'language-conversation'
  | 'historical-reenactment'
  | 'science-discussion'
  | 'interview-simulation'
  | 'mentorship'
  | 'narrative'
  | 'custom'

export interface DialogueLineHighlight {
  text: string
  stem?: string
  ending?: string
  type?: 'verb' | 'noun' | 'article' | 'ending' | 'custom'
  label?: string
}

export interface DialogueLine {
  /** Surface form in primary locale */
  text: string
  /** Translation or gloss */
  translation: string
  /** Optional speaker id for multi-voice TTS */
  speakerId?: string
  highlights?: DialogueLineHighlight[]
  /** Inline vocabulary references (registry ids or glosses) */
  vocabularyRefs?: Array<string | { id?: string; word: string; translation: string }>
}

export interface DialogueComprehensionItem {
  question: string
  options: string[]
  correctIndex: number
}

export interface PlatformDialogueObject extends PlatformContentObject {
  contentType: Extract<ContentType, 'dialogue' | 'story'>

  scenarioType: DialogueScenarioType

  /** Distribution pack id */
  packId: string

  lines: DialogueLine[]

  comprehension?: DialogueComprehensionItem[]

  /**
   * Curriculum topic tags — aligns with lesson topics for recommendations.
   * Greek 0.2: requiredTopics on stories.
   */
  requiredTopics?: string[]

  /** Reading tier hint when used as language input */
  inputTier?: 1 | 2 | 3 | 4
}
