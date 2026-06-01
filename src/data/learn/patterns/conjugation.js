/**
 * Shared conjugation patterns for reuse across lessons.
 * Endings omit the hyphen when applied: stem + suffix.
 */

export const PRESENT_OMEGA_ENDINGS = [
  { person: 'εγώ', ending: '-ω', suffix: 'ω' },
  { person: 'εσύ', ending: '-εις', suffix: 'εις' },
  { person: 'αυτός/ή/ό', ending: '-ει', suffix: 'ει' },
  { person: 'εμείς', ending: '-ουμε', suffix: 'ουμε' },
  { person: 'εσείς', ending: '-ετε', suffix: 'ετε' },
  { person: 'αυτοί/ές/ά', ending: '-ουν', suffix: 'ουν' },
]

export const PRESENT_ALPHA_ENDINGS = [
  { person: 'εγώ', ending: '-άω / -ώ', suffix: 'άω' },
  { person: 'εσύ', ending: '-άς', suffix: 'άς' },
  { person: 'αυτός/ή/ό', ending: '-άει / -ά', suffix: 'άει' },
  { person: 'εμείς', ending: '-άμε', suffix: 'άμε' },
  { person: 'εσείς', ending: '-άτε', suffix: 'άτε' },
  { person: 'αυτοί/ές/ά', ending: '-άνε / -ούν', suffix: 'άνε' },
]

/** @param {string} stem @param {{ person: string, ending: string, suffix: string }[]} endings */
export function conjugate(stem, endings) {
  return endings.map(({ person, ending, suffix }) => ({
    person,
    ending,
    form: `${stem}${suffix}`,
    stem,
  }))
}

export const CONJUGATION_GROUPS = [
  {
    id: 'omega',
    label: 'Group A',
    name: '-ω verbs',
    hint: 'Most common everyday pattern',
    exampleVerb: 'πίνω',
    stem: 'πίν',
    frequency: 'very high',
  },
  {
    id: 'alpha',
    label: 'Group B',
    name: '-άω / -ώ verbs',
    hint: 'Stress on the ending syllable',
    exampleVerb: 'μιλάω',
    stem: 'μιλ',
    frequency: 'high',
  },
  {
    id: 'irregular',
    label: 'Essentials',
    name: 'High-frequency irregulars',
    hint: 'Small set — learn as whole forms',
    exampleVerb: 'είμαι',
    frequency: 'very high',
  },
]

/** Irregular είμαι — present (learn as set, not stem+ending). */
export const EIMAI_PRESENT = [
  { person: 'εγώ', form: 'είμαι', english: 'I am' },
  { person: 'εσύ', form: 'είσαι', english: 'you are' },
  { person: 'αυτός/ή/ό', form: 'είναι', english: 'he / she / it is' },
  { person: 'εμείς', form: 'είμαστε', english: 'we are' },
  { person: 'εσείς', form: 'είστε', english: 'you are (pl.)' },
  { person: 'αυτοί/ές/ά', form: 'είναι', english: 'they are' },
]

/** μπορώ — only εγώ form is highly irregular; others follow -ω pattern. */
export const MPORO_PRESENT = [
  { person: 'εγώ', form: 'μπορώ', english: 'I can' },
  { person: 'εσύ', form: 'μπορείς', english: 'you can' },
  { person: 'αυτός/ή/ό', form: 'μπορεί', english: 'he / she can' },
  { person: 'εμείς', form: 'μπορούμε', english: 'we can' },
  { person: 'εσείς', form: 'μπορείτε', english: 'you can (pl.)' },
  { person: 'αυτοί/ές/ά', form: 'μπορούν', english: 'they can' },
]

export function irregularConjugationRows(forms) {
  return forms.map(({ person, form, english }) => ({
    person,
    ending: '—',
    form,
    stem: '',
    english,
  }))
}
