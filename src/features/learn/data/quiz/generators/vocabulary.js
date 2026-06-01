import { pick, uniqueOptions } from './utils'

/**
 * Generic vocabulary / pattern drills from profile.drills.
 * @param {{ drills: Array<{ prompt: string, answer: string, options?: string[], hint?: string, patternTag?: string }> }} profile
 * @param {number} masteryLevel
 */
export function generateVocabularyQuestion(profile, masteryLevel) {
  const drill = pick(profile.drills)
  if (!drill) return null

  const useMC = masteryLevel === 1 || (masteryLevel <= 2 && Math.random() < 0.45)

  if (useMC && drill.options?.length) {
    return {
      id: `vocab-mc-${Date.now()}-${Math.random()}`,
      type: 'multipleChoice',
      prompt: drill.prompt,
      promptPlain: drill.prompt,
      options: uniqueOptions(drill.answer, drill.options),
      correctAnswer: drill.answer,
      hint: drill.hint,
      patternTag: drill.patternTag,
    }
  }

  return {
    id: `vocab-fill-${Date.now()}-${Math.random()}`,
    type: 'fillBlank',
    prompt: drill.prompt,
    promptPlain: drill.prompt,
    correctAnswer: drill.answer,
    hint: drill.hint,
    patternTag: drill.patternTag,
  }
}
