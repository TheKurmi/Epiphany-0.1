/**
 * Quality of Time × Quantity of Action matrix — 3×3 pedagogical grid.
 * Columns = Quality of Time (before now / now / later)
 * Rows = Quantity of Action (a lot of times / one time / already done)
 */

/** @typedef {'past' | 'present' | 'future'} MatrixTimeId */
/** @typedef {'continuous' | 'summary' | 'completed'} MatrixAspectId */
/** @typedef {'intuitive' | 'grammar' | 'examples'} MatrixViewMode */

export const MATRIX_VIEW_MODES = [
  {
    id: 'intuitive',
    label: 'Intuition',
    description: 'Human-friendly — no grammar jargon',
  },
  {
    id: 'grammar',
    label: 'Grammar',
    description: 'Greek + English terminology',
  },
  {
    id: 'examples',
    label: 'παίζω',
    description: 'Real verb — see the system in action',
  },
]

export const MATRIX_COLUMNS = [
  {
    id: 'past',
    intuitiveLabel: 'Before now',
    grammarLabel: 'Past',
    description: 'Already happened from where you stand now.',
  },
  {
    id: 'present',
    intuitiveLabel: 'Now',
    grammarLabel: 'Present',
    description: 'Happening now — or generally true.',
  },
  {
    id: 'future',
    intuitiveLabel: 'Later',
    grammarLabel: 'Future',
    description: 'Will happen after now.',
  },
]

export const MATRIX_ROWS = [
  {
    id: 'continuous',
    intuitiveLabel: 'A lot of times',
    intuitiveHint: 'Ongoing · repeated · in progress',
    grammarLabel: 'Continuous aspect',
    grammarGreek: 'Εξακολουθητικό',
    visual: 'wave',
  },
  {
    id: 'summary',
    intuitiveLabel: 'One time',
    intuitiveHint: 'One whole event · start to finish',
    grammarLabel: 'Perfective aspect',
    grammarGreek: 'Συνοπτικό',
    visual: 'dot',
  },
  {
    id: 'completed',
    intuitiveLabel: 'Already done',
    intuitiveHint: 'Finished — linked to another moment',
    grammarLabel: 'Completed state',
    grammarGreek: 'Συντελικό',
    visual: 'check',
  },
]

/** @type {Record<string, AspectMatrixCell>} */
export const ASPECT_MATRIX_CELLS = {
  'past-continuous': {
    valid: true,
    intuitiveText: 'Was doing it',
    intuitiveHint: 'Again and again — or in progress back then',
    tenseGreek: 'Παρατατικός',
    tenseEnglish: 'Imperfect · Continuous Past',
    examplePlay: 'έπαιζα',
    examplePlayStem: 'έπαιζ',
    examplePlayEnglish: 'I was playing / I used to play',
    exampleRead: 'διάβαζα',
    exampleReadStem: 'διάβαζ',
    exampleReadEnglish: 'I was reading',
    insight:
      'Background action in the past — a scene unfolding, a habit, or something interrupted.',
  },
  'present-continuous': {
    valid: true,
    intuitiveText: 'Doing it now',
    intuitiveHint: 'Right now — or regularly / habitually',
    tenseGreek: 'Ενεστώτας',
    tenseEnglish: 'Present Tense',
    examplePlay: 'παίζω',
    examplePlayStem: 'παίζ',
    examplePlayEnglish: 'I play / I am playing',
    exampleRead: 'διαβάζω',
    exampleReadStem: 'διαβάζ',
    exampleReadEnglish: 'I read / I am reading',
    insight:
      'The everyday present — Greek does not split “I read” and “I am reading” the way English does.',
  },
  'future-continuous': {
    valid: true,
    intuitiveText: 'Will keep doing it',
    intuitiveHint: 'Future action seen as ongoing or repeated',
    tenseGreek: 'Εξακολουθητικός Μέλλοντας',
    tenseEnglish: 'Continuous Future',
    examplePlay: 'θα παίζω',
    examplePlayEnglish: 'I will be playing / I will play (regularly)',
    exampleRead: 'θα διαβάζω',
    exampleReadEnglish: 'I will be reading',
    insight: 'What you will be doing over time — not just a single future moment.',
  },
  'past-summary': {
    valid: true,
    intuitiveText: 'Did it once',
    intuitiveHint: 'One finished event — complete',
    tenseGreek: 'Αόριστος',
    tenseEnglish: 'Simple Past · Aorist',
    examplePlay: 'έπαιξα',
    examplePlayStem: 'έπαιξ',
    examplePlayEnglish: 'I played (once) / I finished playing',
    exampleRead: 'διάβασα',
    exampleReadStem: 'διαβάσ',
    exampleReadEnglish: 'I read (it through)',
    insight: 'One complete past event — a snapshot, not a film.',
  },
  'present-summary': {
    valid: false,
    note: 'Greek present already covers ongoing meaning. There is no separate “one-time” present — that role belongs to the aorist in the past.',
    intuitiveText: '—',
    intuitiveHint: '',
    tenseGreek: '',
    tenseEnglish: '',
    examplePlay: '',
    examplePlayEnglish: '',
    exampleRead: '',
    exampleReadEnglish: '',
    insight: '',
  },
  'future-summary': {
    valid: true,
    intuitiveText: 'Will do it once',
    intuitiveHint: 'One complete future event',
    tenseGreek: 'Συνοπτικός Μέλλοντας',
    tenseEnglish: 'Simple Future',
    examplePlay: 'θα παίξω',
    examplePlayEnglish: 'I will play (it through)',
    exampleRead: 'θα διαβάσω',
    exampleReadEnglish: 'I will read (it through)',
    insight: 'A decision, promise, or single outcome — done in one go.',
  },
  'past-completed': {
    valid: true,
    intuitiveText: 'Had already done it',
    intuitiveHint: 'Finished before another past moment',
    tenseGreek: 'Υπερσυντέλικος',
    tenseEnglish: 'Past Perfect · Pluperfect',
    examplePlay: 'είχα παίξει',
    examplePlayEnglish: 'I had played / I had already played',
    exampleRead: 'είχα διαβάσει',
    exampleReadEnglish: 'I had read',
    insight: 'Past-before-past — already complete when something else happened.',
  },
  'present-completed': {
    valid: true,
    intuitiveText: 'Have done it',
    intuitiveHint: 'Done — and still relevant now',
    tenseGreek: 'Παρακείμενος',
    tenseEnglish: 'Present Perfect',
    examplePlay: 'έχω παίξει',
    examplePlayEnglish: 'I have played',
    exampleRead: 'έχω διαβάσει',
    exampleReadEnglish: 'I have read',
    insight: 'The result still matters in the present moment.',
  },
  'future-completed': {
    valid: true,
    intuitiveText: 'Will have done it',
    intuitiveHint: 'Complete by a future point',
    tenseGreek: 'Συντελεσμένος Μέλλοντας',
    tenseEnglish: 'Future Perfect',
    examplePlay: 'θα έχω παίξει',
    examplePlayEnglish: 'I will have played',
    exampleRead: 'θα έχω διαβάσει',
    exampleReadEnglish: 'I will have read',
    insight: 'By then, it will already be finished — “I will have done it.”',
  },
}

/** @deprecated */
export const TIME_ROWS = MATRIX_COLUMNS
/** @deprecated */
export const ASPECT_COLUMNS = MATRIX_ROWS
/** @deprecated */
export const ASPECT_MATRIX_EXTRAS = []

export function getAspectCell(timeId, aspectId) {
  return ASPECT_MATRIX_CELLS[`${timeId}-${aspectId}`] ?? null
}

export function getMatrixCellKey(timeId, aspectId) {
  return `${timeId}-${aspectId}`
}

export const ASPECT_CONCEPT_DRILLS = [
  {
    prompt: 'Which form describes an action repeated many times before now?',
    options: ['Before now · a lot of times', 'Before now · one time', 'Now · a lot of times'],
    correctIndex: 0,
    explanation:
      'Παρατατικός (έπαιζα) = past ongoing or repeated — “before now” + “a lot of times.”',
  },
  {
    prompt: 'Transform the idea: ongoing action → one complete past event. Which is correct?',
    options: ['έπαιξα', 'έπαιζα', 'παίζω'],
    correctIndex: 0,
    explanation: 'έπαιξα = one complete past action; έπαιζα = was playing / used to play.',
  },
  {
    prompt: 'Which tense describes an ongoing, repeated action in the past?',
    options: ['Παρατατικός', 'Αόριστος', 'Ενεστώτας'],
    correctIndex: 0,
    explanation:
      'Παρατατικός (έπαιζα) = was playing / used to play — the past “in progress.”',
  },
  {
    prompt: 'Which form views the action as one complete event in the past?',
    options: ['Αόριστος', 'Παρατατικός', 'Παρακείμενος'],
    correctIndex: 0,
    explanation: 'Αόριστος (έπαιξα) = I played it through — one finished past event.',
  },
  {
    prompt: 'θα παίζω vs θα παίξω — what is the difference?',
    options: [
      'Ongoing future vs one complete future action',
      'Past vs present',
      'Formal vs informal',
    ],
    correctIndex: 0,
    explanation:
      'θα παίζω = future ongoing; θα παίξω = future single completed action.',
  },
  {
    prompt: 'Which tense connects a finished action to the present moment?',
    options: ['Παρακείμενος', 'Αόριστος', 'Παρατατικός'],
    correctIndex: 0,
    explanation: 'έχω παίξει = I have played — done, and still relevant now.',
  },
]
