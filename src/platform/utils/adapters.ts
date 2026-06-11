/**
 * Adapters — map Greek 0.2 content shapes to platform objects.
 * Not wired into runtime yet; safe structural bridge for Phase 2+.
 */

import type { PlatformDialogueObject } from '../content-schema/dialogueObject'
import type { PlatformLessonObject } from '../content-schema/lessonObject'
import type { DifficultyLevel, ReusableContext } from '../types'
import { normalizeTags } from './validation'

const DEFAULT_SUBJECT = 'greek'
const DEFAULT_CONTEXTS: ReusableContext[] = ['read', 'dictation', 'shadowing', 'practice']

/** @typedef {import('@/features/read/data/stories').Story} LegacyStory */

/**
 * Map legacy Read story → platform dialogue object.
 * @param {Record<string, unknown>} story
 * @param {Partial<PlatformDialogueObject>} [overrides]
 */
export function storyToDialogueObject(
  story: Record<string, unknown>,
  overrides: Partial<PlatformDialogueObject> = {},
): PlatformDialogueObject {
  const sentences = Array.isArray(story.sentences) ? story.sentences : []
  const level = story.level === 'intermediate' ? 'intermediate' : 'beginner'

  return {
    id: String(story.id ?? ''),
    title: String(story.title ?? ''),
    titleSecondary: story.titleEnglish != null ? String(story.titleEnglish) : undefined,
    subject: DEFAULT_SUBJECT,
    difficulty: level as DifficultyLevel,
    tags: normalizeTags(story.tags),
    concepts: normalizeTags(story.requiredTopics),
    prerequisites: [],
    learningGoals: ['comprehension', 'conversation'],
    reusableContexts: DEFAULT_CONTEXTS,
    contentType: 'dialogue',
    scenarioType: 'language-conversation',
    packId: String(story.packId ?? ''),
    lines: sentences.map((s: Record<string, unknown>) => ({
      text: String(s.text ?? ''),
      translation: String(s.english ?? ''),
      highlights: Array.isArray(s.highlights)
        ? s.highlights.map((h: Record<string, unknown>) => ({
            text: String(h.word ?? h.text ?? ''),
            stem: h.stem != null ? String(h.stem) : undefined,
            ending: h.ending != null ? String(h.ending) : undefined,
            type: h.type as 'verb' | 'noun' | 'article' | 'ending' | 'custom' | undefined,
            label: h.label != null ? String(h.label) : undefined,
          }))
        : undefined,
      vocabularyRefs: Array.isArray(s.vocabulary) ? s.vocabulary : undefined,
    })),
    comprehension: Array.isArray(story.comprehension)
      ? story.comprehension.map((q: Record<string, unknown>) => ({
          question: String(q.question ?? ''),
          options: Array.isArray(q.options) ? q.options.map(String) : [],
          correctIndex: Number(q.correctIndex ?? 0),
        }))
      : undefined,
    requiredTopics: Array.isArray(story.requiredTopics)
      ? story.requiredTopics.map(String)
      : undefined,
    ...overrides,
  }
}

/**
 * Map legacy lesson module → partial platform lesson object.
 * @param {Record<string, unknown>} lesson
 */
export function lessonToPlatformLesson(
  lesson: Record<string, unknown>,
): PlatformLessonObject {
  const level =
    lesson.level === 'advanced'
      ? 'advanced'
      : lesson.level === 'intermediate'
        ? 'intermediate'
        : 'beginner'

  return {
    id: String(lesson.id ?? ''),
    title: String(lesson.title ?? ''),
    subject: DEFAULT_SUBJECT,
    difficulty: level,
    tags: [],
    concepts: lesson.topicId != null ? [String(lesson.topicId)] : [],
    prerequisites: [],
    learningGoals: ['recognition', 'production'],
    estimatedDuration: lesson.duration != null ? String(lesson.duration) : undefined,
    reusableContexts: ['learn'],
    summary: lesson.summary != null ? String(lesson.summary) : undefined,
    contentType: 'lesson',
    topicId: String(lesson.topicId ?? lesson.id ?? ''),
    pathOrder: Number(lesson.pathOrder ?? 0),
    intro: (lesson.intro as PlatformLessonObject['intro']) ?? {},
    sections: Array.isArray(lesson.sections)
      ? lesson.sections.map((s: Record<string, unknown>) => ({
          type: String(s.type ?? 'text'),
          title: s.title != null ? String(s.title) : undefined,
          payload: s,
        }))
      : [],
    commonMistakes: Array.isArray(lesson.commonMistakes)
      ? (lesson.commonMistakes as PlatformLessonObject['commonMistakes'])
      : undefined,
    deepDive: lesson.deepDive as PlatformLessonObject['deepDive'],
  }
}
