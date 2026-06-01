import { makeQuestion, pick, uniqueOptions } from './utils'

export function generateNegationL1(profile) {
  const item = pick(profile.verbs)

  return makeQuestion({
    type: 'multipleChoice',
    prompt: `How do you say “I do not …” for: ${item.affirmative.split(' ')[0]}?`,
    options: uniqueOptions(item.negative, profile.verbs.map((v) => v.negative)),
    correctAnswer: item.negative,
    patternTag: 'negation-δεν',
  })
}

export function generateNegationL2(profile) {
  const item = pick(profile.verbs)

  return makeQuestion({
    type: 'fillBlank',
    prompt: `Make it negative: ${item.affirmative}`,
    correctAnswer: item.negative,
    patternTag: 'negation-δεν',
    hint: 'δεν goes before the verb',
  })
}

export function generateNegationL3(profile) {
  const item = pick(profile.verbs)

  return makeQuestion({
    type: 'sentenceBlank',
    prompt: `Negate: ${item.affirmative}`,
    correctAnswer: item.negative,
    patternTag: 'negation-δεν',
    hint: 'Place δεν before the verb',
  })
}

export function generateNegationQuestion(profile, masteryLevel) {
  if (masteryLevel === 1) return generateNegationL1(profile)
  if (masteryLevel === 2) return generateNegationL2(profile)
  if (masteryLevel === 3) return generateNegationL3(profile)

  const sub = pick([1, 2, 3])
  if (sub === 1) return generateNegationL1(profile)
  if (sub === 2) return generateNegationL2(profile)
  return generateNegationL3(profile)
}
