/**
 * Content authoring schemas — reusable definitions for lessons, stories, exercises.
 * Future teacher/creator tools should validate against these shapes.
 */

/** @typedef {'beginner'|'intermediate'|'advanced'} ContentLevel */

/**
 * @typedef {Object} VocabItemSchema
 * @property {number} id
 * @property {string} word — Greek surface form
 * @property {string} translation
 * @property {string} category
 * @property {'easy'|'medium'|'hard'} difficulty
 * @property {'masculine'|'feminine'|'neuter'|null} [gender]
 * @property {string} [plural]
 * @property {string[]} [tags]
 * @property {number} [frequencyRank]
 * @property {string} [pronunciation]
 * @property {string} [conjugationGroup]
 * @property {number[]} [relatedWords] — ids
 */

/**
 * @typedef {Object} GrammarHighlightSchema
 * @property {string} word
 * @property {string} [stem]
 * @property {string} [ending]
 * @property {'verb'|'noun'|'adjective'|'article'|'ending'} [type]
 * @property {string} [label]
 */

/**
 * @typedef {Object} StorySchema
 * @property {string} id
 * @property {string} packId
 * @property {string} title
 * @property {string} titleEnglish
 * @property {'beginner'|'intermediate'} level
 * @property {string[]} requiredTopics
 * @property {Object[]} sentences
 * @property {Object[]} [comprehension]
 */

/**
 * @typedef {Object} LessonSchema
 * @property {string} id
 * @property {string} topicId
 * @property {ContentLevel} level
 * @property {number} pathOrder
 * @property {string} title
 * @property {string} summary
 * @property {Object} intro
 * @property {Object[]} sections
 * @property {Object[]} [commonMistakes]
 * @property {Object} [deepDive]
 */

/**
 * @typedef {Object} ExerciseTemplateSchema
 * @property {string} id
 * @property {'typing'|'mc'|'ordering'|'dictation'} type
 * @property {string} patternTag
 * @property {string} promptTemplate
 * @property {string} [answerTemplate]
 */

export const CONTENT_VERSION = '0.2.0'
