import {
  PRESENT_OMEGA_ENDINGS,
  PRESENT_ALPHA_ENDINGS,
  conjugate,
} from '../../patterns/conjugation'
import { makeQuestion, pick, shuffle, uniqueOptions } from './utils'

const PATTERNS = {
  omega: PRESENT_OMEGA_ENDINGS,
  alpha: PRESENT_ALPHA_ENDINGS,
}

function getRows(profile, verb) {
  const endings = PATTERNS[profile.pattern] ?? PRESENT_OMEGA_ENDINGS
  return conjugate(verb.stem, endings)
}

function allFormsForProfile(profile) {
  return profile.verbs.flatMap((verb) =>
    getRows(profile, verb).map((row) => ({ ...row, lemma: verb.lemma })),
  )
}

/** Level 1 — multiple choice recognition */
export function generateConjugationL1(profile) {
  const verb = pick(profile.verbs)
  const rows = getRows(profile, verb)
  const target = pick(rows)
  const distractorPool = rows
    .filter((r) => r.form !== target.form)
    .map((r) => r.form)

  return makeQuestion({
    type: 'multipleChoice',
    prompt: `Which form matches **${target.person}** for **${verb.lemma}**?`,
    promptPlain: `Which form matches ${target.person} for ${verb.lemma}?`,
    options: uniqueOptions(target.form, distractorPool),
    correctAnswer: target.form,
    patternTag: target.ending,
  })
}

/** Level 2 — type the conjugated form */
export function generateConjugationL2(profile) {
  const verb = pick(profile.verbs)
  const rows = getRows(profile, verb)
  const target = pick(rows)

  return makeQuestion({
    type: 'fillBlank',
    prompt: `${verb.lemma} → ${target.person}`,
    correctAnswer: target.form,
    patternTag: target.ending,
    hint: `Stem ${verb.stem} + ending ${target.ending}`,
  })
}

/** Level 3 — sentence blank */
export function generateConjugationL3(profile) {
  const verb = pick(profile.verbs)
  const rows = getRows(profile, verb)
  const target = pick(rows.filter((r) => r.person === 'εγώ' || r.person === 'εσύ'))
  const suffix = verb.context ? ` ${verb.context}.` : '.'

  return makeQuestion({
    type: 'sentenceBlank',
    prompt: `${target.person} ___${suffix}`,
    correctAnswer: target.form,
    patternTag: target.ending,
    hint: `From ${verb.lemma}`,
  })
}

/** Irregular one-off forms (μπορώ etc.) */
export function generateIrregularL1(extra) {
  const target = pick(extra.forms)
  const pool = extra.forms.filter((f) => f.form !== target.form).map((f) => f.form)

  return makeQuestion({
    type: 'multipleChoice',
    prompt: `${target.person} + ${extra.lemma} → ?`,
    options: uniqueOptions(target.form, pool),
    correctAnswer: target.form,
    patternTag: `irregular-${extra.lemma}`,
  })
}

export function generateConjugationQuestion(profile, masteryLevel) {
  if (profile.extras?.length && Math.random() < 0.25) {
    return generateIrregularL1(pick(profile.extras))
  }

  if (masteryLevel === 1) return generateConjugationL1(profile)
  if (masteryLevel === 2) return generateConjugationL2(profile)
  if (masteryLevel === 3) return generateConjugationL3(profile)

  const subLevel = pick([1, 2, 3])
  if (subLevel === 1) return generateConjugationL1(profile)
  if (subLevel === 2) return generateConjugationL2(profile)
  return generateConjugationL3(profile)
}

/** Ending-only recognition (any verb in profile) */
export function generateEndingRecognition(profile) {
  const endings = PATTERNS[profile.pattern] ?? PRESENT_OMEGA_ENDINGS
  const target = pick(endings)
  const pool = endings.filter((e) => e.ending !== target.ending).map((e) => e.ending)

  return makeQuestion({
    type: 'multipleChoice',
    prompt: `Which ending goes with **${target.person}**?`,
    promptPlain: `Which ending goes with ${target.person}?`,
    options: uniqueOptions(target.ending, pool),
    correctAnswer: target.ending,
    patternTag: target.ending,
  })
}

export { allFormsForProfile }
