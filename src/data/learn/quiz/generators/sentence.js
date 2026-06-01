import { makeQuestion, pick, uniqueOptions } from './utils'

const DISTRACTORS = ['πίνω', 'πίνει', 'τρώω', 'μιλάω', 'είμαι', 'έχω']

export function generateSentenceL1(profile) {
  const tpl = pick(profile.templates)

  return makeQuestion({
    type: 'multipleChoice',
    prompt: tpl.prompt,
    options: uniqueOptions(tpl.answer, [...DISTRACTORS, tpl.answer]),
    correctAnswer: tpl.answer,
    patternTag: tpl.patternTag,
    hint: tpl.hint,
  })
}

export function generateSentenceL2(profile) {
  const tpl = pick(profile.templates)

  return makeQuestion({
    type: 'fillBlank',
    prompt: tpl.prompt,
    correctAnswer: tpl.answer,
    patternTag: tpl.patternTag,
    hint: tpl.hint,
  })
}

export function generateSentenceL3(profile) {
  return generateSentenceL2(profile)
}

export function generateSentenceQuestion(profile, masteryLevel) {
  if (masteryLevel === 1) return generateSentenceL1(profile)
  if (masteryLevel === 2) return generateSentenceL2(profile)
  if (masteryLevel === 3) return generateSentenceL3(profile)

  const sub = pick([1, 2, 3])
  if (sub === 1) return generateSentenceL1(profile)
  return generateSentenceL2(profile)
}
