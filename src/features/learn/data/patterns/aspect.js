/**
 * Time × Aspect matrix — conceptual foundation for Greek tenses.
 * Reused in the flagship lesson and chart reference.
 */

/** @typedef {'continuous' | 'summary'} AspectId */
/** @typedef {'present' | 'past' | 'future' | 'perfect'} TimeId */

export const ASPECT_COLUMNS = [
  {
    id: 'continuous',
    label: 'Continuous / Ongoing',
    greekLabel: 'Εξακολουθητικό',
    shortLabel: 'Ongoing',
    description:
      'The action unfolds, repeats, or continues — you see it in progress.',
    visual: 'wave',
  },
  {
    id: 'summary',
    label: 'Complete / Whole',
    greekLabel: 'Συνοπτικό',
    shortLabel: 'Whole event',
    description:
      'The action is viewed as one finished unit — a snapshot, not a film.',
    visual: 'dot',
  },
]

export const TIME_ROWS = [
  {
    id: 'present',
    label: 'Present',
    description: 'Happening now — or generally true.',
  },
  {
    id: 'past',
    label: 'Past',
    description: 'Already happened.',
  },
  {
    id: 'future',
    label: 'Future',
    description: 'Will happen.',
  },
  {
    id: 'perfect',
    label: 'Completed state',
    description: 'A past action with present relevance — “has/had been done.”',
  },
]

/**
 * Matrix cells keyed by `${timeId}-${aspectId}`.
 * @type {Record<string, import('./aspect').AspectCell | null>}
 */
export const ASPECT_MATRIX_CELLS = {
  'present-continuous': {
    tense: 'Ενεστώτας',
    tenseEnglish: 'Present',
    example: 'διαβάζω',
    exampleEnglish: 'I read / I am reading',
    stem: 'διαβάζ',
    ending: 'ω',
    insight:
      'The everyday present — ongoing now or habitual. Greek does not split “I read” and “I am reading” the way English does.',
    valid: true,
  },
  'present-summary': {
    valid: false,
    note: 'Modern Greek present already covers habitual and ongoing meaning. There is no separate “summary” present — that role belongs to the aorist in the past.',
  },
  'past-continuous': {
    tense: 'Παρατατικός',
    tenseEnglish: 'Imperfect',
    example: 'διάβαζα',
    exampleEnglish: 'I was reading / I used to read',
    stem: 'διάβαζ',
    ending: 'α',
    insight:
      'Ongoing or repeated action in the past — background scene, habit, or something interrupted.',
    valid: true,
  },
  'past-summary': {
    tense: 'Αόριστος',
    tenseEnglish: 'Aorist',
    example: 'διάβασα',
    exampleEnglish: 'I read (once) / I finished reading',
    stem: 'διαβάσ',
    ending: 'α',
    insight:
      'One complete past event — a single chapter, not the whole story. “I read the book” as a finished act.',
    valid: true,
  },
  'future-continuous': {
    tense: 'Εξακολουθητικός Μέλλοντας',
    tenseEnglish: 'Future continuous',
    example: 'θα διαβάζω',
    exampleEnglish: 'I will be reading / I will read (regularly)',
    insight:
      'Future action viewed as ongoing or repeated — what you will be doing over time.',
    valid: true,
  },
  'future-summary': {
    tense: 'Συνοπτικός Μέλλοντας',
    tenseEnglish: 'Simple future',
    example: 'θα διαβάσω',
    exampleEnglish: 'I will read (it through)',
    insight:
      'One complete future event — a decision, a promise, a single outcome.',
    valid: true,
  },
  'perfect-continuous': {
    tense: 'Υπερσυντέλικος',
    tenseEnglish: 'Pluperfect',
    example: 'είχα διαβάσει',
    exampleEnglish: 'I had been reading / I had read (ongoing before another past event)',
    insight:
      'Past-before-past with duration — what was already underway when something else happened.',
    valid: true,
  },
  'perfect-summary': {
    tense: 'Παρακείμενος',
    tenseEnglish: 'Perfect',
    example: 'έχω διαβάσει',
    exampleEnglish: 'I have read',
    insight:
      'Completed action with present relevance — the result still matters now.',
    valid: true,
  },
}

/** Extra tense that extends the matrix — shown as a connected note. */
export const ASPECT_MATRIX_EXTRAS = [
  {
    tense: 'Συντελεσμένος Μέλλοντας',
    tenseEnglish: 'Future perfect',
    example: 'θα έχω διαβάσει',
    exampleEnglish: 'I will have read',
    insight:
      'A future point where something will already be complete — “By then, I will have finished.”',
  },
]

export function getAspectCell(timeId, aspectId) {
  return ASPECT_MATRIX_CELLS[`${timeId}-${aspectId}`] ?? null
}

/** Recognition drills for the concept lesson. */
export const ASPECT_CONCEPT_DRILLS = [
  {
    prompt: 'Which tense describes an ongoing, repeated action in the past?',
    options: ['Παρατατικός', 'Αόριστος', 'Ενεστώτας'],
    correctIndex: 0,
    explanation:
      'Παρατατικός (διάβαζα) = was reading / used to read — the past “in progress.”',
  },
  {
    prompt: 'Which form views the action as one complete event in the past?',
    options: ['Αόριστος', 'Παρατατικός', 'Παρακείμενος'],
    correctIndex: 0,
    explanation: 'Αόριστος (διάβασα) = I read it through — one finished past event.',
  },
  {
    prompt: 'θα διαβάζω vs θα διαβάσω — what is the difference?',
    options: [
      'Ongoing future vs one complete future action',
      'Past vs present',
      'Formal vs informal',
    ],
    correctIndex: 0,
    explanation:
      'θα διαβάζω = future ongoing; θα διαβάσω = future single completed action.',
  },
  {
    prompt: 'Which tense connects a finished action to the present moment?',
    options: ['Παρακείμενος', 'Αόριστος', 'Παρατατικός'],
    correctIndex: 0,
    explanation: 'έχω διαβάσει = I have read — done, and still relevant now.',
  },
]
