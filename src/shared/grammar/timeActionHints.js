/**
 * Contextual grammar hints — subtle time/action reinforcement while reading.
 * Uses Quality of Time + Quantity of Action language for beginners.
 */

const FORM_HINTS = [
  // —— Past ongoing (παρατατικός) ——
  {
    test: (w) =>
      /^έπαιζ|^διάβαζ|^έγραφ|^ήκου|^μίλαγ|^περπατούσ|^ήθελ|^μπορούσ|^έτρεχ|^έπιν|^έβρεχ|^καθόμ|^περνούσ|^μαγείρευ|^έλεγ|^κοιμόμ|^δούλευ|^έφευγ|^ήρχ|^έφευγ|^κάθ|^έβλεπ/.test(
        w,
      ),
    hint: 'Before now · a lot of times',
    detail: 'Past ongoing or repeated action (παρατατικός)',
  },
  // —— Past complete (αόριστος) ——
  {
    test: (w) =>
      /^έπαιξ|^διάβασ|^έγραψ|^άκουσ|^μίλησ|^περπάτησ|^χτύπησ|^ξύπνησ|^πήγ|^έφαγ|^ήρθ|^έφυγ|^είδ|^έμαθ|^περάσ|^ταξίδεψ|^μείνα|^έτρεξ|^έπιε|^έκλεισ|^άνοιξ/.test(
        w,
      ),
    hint: 'Before now · one time',
    detail: 'One complete past event (αόριστος)',
  },
  // —— Future ongoing ——
  {
    test: (w) => /^θα [^\s]+(ζω|άω|ούν|άνε|εί|είς|εί)$/.test(w),
    hint: 'Later · a lot of times',
    detail: 'Future ongoing action',
  },
  // —— Future complete ——
  {
    test: (w) => /^θα [^\s]+(ξω|σω|ψω|ξεις|σει|ξουν|σουν|ψουν)$/.test(w),
    hint: 'Later · one time',
    detail: 'One complete future action',
  },
  // —— Present perfect ——
  {
    test: (w) => /^έχω [^\s]+(σει|θεί|ίξει|άσει|ήσει|ύσει)/.test(w),
    hint: 'Already done · connected to now',
    detail: 'Present perfect — finished with present relevance',
  },
  // —— Pluperfect ——
  {
    test: (w) => /^είχα [^\s]+(σει|θεί|ίξει|άσει|ήσει|ύσει)/.test(w),
    hint: 'Already done · before another past moment',
    detail: 'Pluperfect (υπερσυντέλικος)',
  },
  // —— Future perfect ——
  {
    test: (w) => /^θα έχω/.test(w),
    hint: 'Already done · by a future point',
    detail: 'Future perfect',
  },
  // —— Imperfect auxiliary ——
  {
    test: (w) => /^ήμουν|^ήσουν|^ήταν$/.test(w),
    hint: 'Before now · ongoing state',
    detail: 'Imperfect of είμαι — was / were',
  },
  // —— Present habitual ——
  {
    test: (w) =>
      /(ω|άω|ώ|εί|άει|ούν|άνε|άμε|άτε)$/.test(w) &&
      !/^θα/.test(w) &&
      !/^έ/.test(w) &&
      w.length > 3,
    hint: 'Now · a lot of times / habitual',
    detail: 'Present tense — ongoing or habitual',
  },
]

/**
 * @param {string} wordOrText
 * @returns {{ hint: string, detail?: string } | null}
 */
export function getTimeActionHint(wordOrText) {
  const word = (wordOrText ?? '').trim().replace(/[.,;:!?«»"'`]/g, '')
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
