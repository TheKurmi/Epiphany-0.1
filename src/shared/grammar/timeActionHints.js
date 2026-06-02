/**
 * Contextual grammar hints — subtle time/action reinforcement while reading.
 * Uses Quality of Time + Quantity of Action language for beginners.
 */

const FORM_HINTS = [
  {
    test: (w) => /^έπαιζ|^διάβαζ|^έγραφ|^ήκου|^μίλαγ|^περπατούσ|^ήθελ|^μπορούσ/.test(w),
    hint: 'Before now · a lot of times',
    detail: 'Past ongoing or repeated action',
  },
  {
    test: (w) => /^έπαιξ|^διάβασ|^έγραψ|^άκουσ|^μίλησ|^περπάτησ/.test(w),
    hint: 'Before now · one time',
    detail: 'One complete past event',
  },
  {
    test: (w) => /^θα [^\s]+ζω|^θα [^\s]+άω|^θα [^\s]+ούν/.test(w),
    hint: 'Later · a lot of times',
    detail: 'Future ongoing action',
  },
  {
    test: (w) => /^θα [^\s]+ξω|^θα [^\s]+σω|^θα [^\s]+ψω/.test(w),
    hint: 'Later · one time',
    detail: 'One complete future action',
  },
  {
    test: (w) => /^έχω [^\s]+(σει|θεί|ίξει)/.test(w),
    hint: 'Already done · connected to now',
    detail: 'Present perfect — finished with present relevance',
  },
  {
    test: (w) => /^είχα [^\s]+(σει|θεί|ίξει)/.test(w),
    hint: 'Already done · before another past moment',
    detail: 'Pluperfect',
  },
  {
    test: (w) => /^θα έχω/.test(w),
    hint: 'Already done · by a future point',
    detail: 'Future perfect',
  },
  {
    test: (w) => /(ω|άω|εί|άει|ούν|άνε)$/.test(w) && !/^θα/.test(w) && w.length > 3,
    hint: 'Now · a lot of times / habitual',
    detail: 'Present tense — ongoing or habitual',
  },
]

/**
 * @param {string} wordOrText
 * @returns {{ hint: string, detail?: string } | null}
 */
export function getTimeActionHint(wordOrText) {
  const word = (wordOrText ?? '').trim().replace(/[.,;:!?]/g, '')
  if (!word || word.length < 3) return null

  for (const { test, hint, detail } of FORM_HINTS) {
    if (test(word)) return { hint, detail }
  }
  return null
}

/**
 * Scan sentence for first verb-like word with a time/action hint.
 */
export function getSentenceTimeActionHint(sentenceText) {
  const words = (sentenceText ?? '').split(/\s+/)
  for (const raw of words) {
    const hint = getTimeActionHint(raw)
    if (hint) return hint
  }
  return null
}
