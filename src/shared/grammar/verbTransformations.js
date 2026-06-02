/**
 * Verb transformation patterns — ongoing → one complete action.
 * Reused in lessons, charts, and contextual hints.
 */
export const VERB_TRANSFORMATION_FAMILIES = [
  {
    id: 'z-to-x',
    label: 'ζ → ξ compression',
    insight:
      'When Greek turns an ongoing action into one complete event, the verb often becomes sharper in sound — ζ may compress to ξ.',
    pairs: [
      { ongoing: 'παίζω', complete: 'παίξω', english: 'play' },
      { ongoing: 'ανοίγω', complete: 'ανοίξω', english: 'open' },
    ],
  },
  {
    id: 'f-to-ps',
    label: 'φ → ψ compression',
    insight: 'Another common “sharpening” — the ongoing form softens, the complete form snaps shut with ψ.',
    pairs: [
      { ongoing: 'γράφω', complete: 'γράψω', english: 'write' },
    ],
  },
  {
    id: 'past-layer',
    label: 'Past layers',
    insight: 'Past ongoing adds -α-; past complete often reshapes the stem before -α.',
    pairs: [
      { ongoing: 'παίζω', complete: 'έπαιζα', english: 'was playing' },
      { ongoing: 'παίξω', complete: 'έπαιξα', english: 'played (once)' },
    ],
  },
  {
    id: 'perfect-layer',
    label: 'Already done layer',
    insight: '“Already done” builds on the one-time form + έχω / είχα / θα έχω.',
    pairs: [
      { ongoing: 'παίξω', complete: 'έχω παίξει', english: 'have played' },
      { ongoing: 'παίξω', complete: 'είχα παίξει', english: 'had played' },
      { ongoing: 'παίξω', complete: 'θα έχω παίξει', english: 'will have played' },
    ],
  },
]

export const TIME_ACTION_INSIGHTS = [
  {
    id: 'action-quantity',
    title: 'Why Greeks say it this way',
    text: 'Greek focuses heavily on how an action unfolds — whether it repeats, continues, or happens as one complete event. That is why “quantity of action” matters as much as when something happens.',
  },
  {
    id: 'sound-change',
    title: 'Why the verb sounds different',
    text: 'When an ongoing action becomes one complete event, Greek often compresses the sound — παίζω → παίξω. It is not random chaos; it is a pattern families share.',
  },
  {
    id: 'center-x',
    title: 'Why the present has no “one time” slot',
    text: 'A complete one-time action cannot really happen exactly now — the present moment is naturally unfolding. Greek reflects that intuition with an empty cell in the matrix.',
  },
  {
    id: 'layer-building',
    title: 'Tenses build in layers',
    text: 'Many “already done” forms combine έχω with the one-time verb form. You are not memorising isolated words — you are stacking meaning.',
  },
]

/** Lightweight register tags for future expansion. */
export const REGISTER_TAGS = {
  neutral: { label: 'Everyday Greek', description: 'Natural spoken style' },
  formal: { label: 'More formal', description: 'Polite or written register' },
  conversational: { label: 'Conversational', description: 'How Greeks actually talk' },
  textbook: { label: 'Textbook form', description: 'Clear standard grammar' },
}
