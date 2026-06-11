/**
 * Platform content schema — foundational educational object structures.
 * Greek 0.2 runtime still uses src/schemas/content.js JSDoc; migrate gradually.
 */

export {
  PLATFORM_CONTENT_VERSION,
  type PlatformContentObject,
  type ContentCatalogEntry,
} from './contentObject'

export {
  type PlatformLessonObject,
  type LessonSection,
  type LessonIntro,
  type LessonSectionType,
} from './lessonObject'

export {
  type PlatformDialogueObject,
  type DialogueLine,
  type DialogueLineHighlight,
  type DialogueComprehensionItem,
  type DialogueScenarioType,
} from './dialogueObject'

export {
  type PlatformQuizProfileObject,
  type GeneratedQuizQuestionObject,
  type QuizInteractionType,
  type QuizProfileType,
  type QuizMasteryTier,
  type QuizQuestionTemplate,
} from './quizObject'

export {
  type PlatformChartObject,
  type ChartCell,
  type ChartAxisDefinition,
  type ChartViewMode,
  type ChartVisualizationKind,
} from './chartObject'
