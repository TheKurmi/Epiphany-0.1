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
      { ongoing: 'κλείνω', complete: 'κλείσω', english: 'close' },
    ],
  },
  {
    id: 'f-to-ps',
    label: 'φ → ψ compression',
    insight:
      'Another common “sharpening” — the ongoing form softens, the complete form snaps shut with ψ.',
    pairs: [
      { ongoing: 'γράφω', complete: 'γράψω', english: 'write' },
      { ongoing: 'πλένω', complete: 'πλύνω', english: 'wash' },
    ],
  },
  {
    id: 's-to-s',
    label: 'σ → σ (stem change)',
    insight:
      'Some verbs change the vowel inside the stem when the action becomes complete — the sound tightens.',
    pairs: [
      { ongoing: 'βλέπω', complete: 'δω', english: 'see' },
      { ongoing: 'τρώω', complete: 'φάω', english: 'eat' },
      { ongoing: 'πίνω', complete: 'πιω', english: 'drink' },
    ],
  },
  {
    id: 'past-layer',
    label: 'Past layers',
    insight:
      'Past ongoing adds -α- (έπαιζα); past complete often reshapes the stem before -α (έπαιξα). Same logic, different time.',
    pairs: [
      { ongoing: 'παίζω', complete: 'έπαιζα', english: 'was playing' },
      { ongoing: 'παίξω', complete: 'έπαιξα', english: 'played (once)' },
      { ongoing: 'διαβάζω', complete: 'διάβαζα', english: 'was reading' },
      { ongoing: 'διαβάσω', complete: 'διάβασα', english: 'read (through)' },
    ],
  },
  {
    id: 'perfect-layer',
    label: 'Already done layer',
    insight:
      '“Already done” builds on the one-time form + έχω / είχα / θα έχω. You stack meaning — you do not memorise a new word.',
    pairs: [
      { ongoing: 'παίξω', complete: 'έχω παίξει', english: 'have played' },
      { ongoing: 'παίξω', complete: 'είχα παίξει', english: 'had played' },
      { ongoing: 'παίξω', complete: 'θα έχω παίξει', english: 'will have played' },
      { ongoing: 'διαβάσω', complete: 'έχω διαβάσει', english: 'have read' },
    ],
  },
]

/**
 * Full tense stacks for flagship verb families — visual layer-building.
 * Reused in lessons, charts, and transformation exercises.
 */
export const VERB_TENSE_STACKS = [
  {
    id: 'paizo',
    lemma: 'παίζω',
    english: 'play',
    family: 'ζ → ξ',
    forms: [
      { label: 'Present ongoing', greek: 'παίζω', english: 'I play / am playing' },
      { label: 'Past ongoing', greek: 'έπαιζα', english: 'I was playing / used to play' },
      { label: 'Future ongoing', greek: 'θα παίζω', english: 'I will play (regularly)' },
      { label: 'One complete', greek: 'παίξω', english: 'I play (through once)' },
      { label: 'Past complete', greek: 'έπαιξα', english: 'I played (once)' },
      { label: 'Future complete', greek: 'θα παίξω', english: 'I will play (once)' },
      { label: 'Already done', greek: 'έχω παίξει', english: 'I have played' },
    ],
  },
  {
    id: 'grafo',
    lemma: 'γράφω',
    english: 'write',
    family: 'φ → ψ',
    forms: [
      { label: 'Present ongoing', greek: 'γράφω', english: 'I write / am writing' },
      { label: 'Past ongoing', greek: 'έγραφα', english: 'I was writing' },
      { label: 'Future ongoing', greek: 'θα γράφω', english: 'I will write (regularly)' },
      { label: 'One complete', greek: 'γράψω', english: 'I write (through once)' },
      { label: 'Past complete', greek: 'έγραψα', english: 'I wrote' },
      { label: 'Future complete', greek: 'θα γράψω', english: 'I will write (once)' },
      { label: 'Already done', greek: 'έχω γράψει', english: 'I have written' },
    ],
  },
  {
    id: 'vlepo',
    lemma: 'βλέπω',
    english: 'see / watch',
    family: 'σ → σ (stem change)',
    forms: [
      { label: 'Present ongoing', greek: 'βλέπω', english: 'I see / watch' },
      { label: 'Past ongoing', greek: 'έβλεπα', english: 'I was watching' },
      { label: 'Future ongoing', greek: 'θα βλέπω', english: 'I will watch (regularly)' },
      { label: 'One complete', greek: 'δω', english: 'I see (once)' },
      { label: 'Past complete', greek: 'είδα', english: 'I saw' },
      { label: 'Future complete', greek: 'θα δω', english: 'I will see' },
      { label: 'Already done', greek: 'έχω δει', english: 'I have seen' },
    ],
  },
  {
    id: 'anoigo',
    lemma: 'ανοίγω',
    english: 'open',
    family: 'ζ → ξ',
    forms: [
      { label: 'Present ongoing', greek: 'ανοίγω', english: 'I open / am opening' },
      { label: 'Past ongoing', greek: 'άνοιγα', english: 'I was opening' },
      { label: 'Future ongoing', greek: 'θα ανοίγω', english: 'I will open (regularly)' },
      { label: 'One complete', greek: 'ανοίξω', english: 'I open (once)' },
      { label: 'Past complete', greek: 'άνοιξα', english: 'I opened' },
      { label: 'Future complete', greek: 'θα ανοίξω', english: 'I will open' },
      { label: 'Already done', greek: 'έχω ανοίξει', english: 'I have opened' },
    ],
  },
  {
    id: 'diavazo',
    lemma: 'διαβάζω',
    english: 'read',
    family: 'ζ → ξ',
    forms: [
      { label: 'Present ongoing', greek: 'διαβάζω', english: 'I read / am reading' },
      { label: 'Past ongoing', greek: 'διάβαζα', english: 'I was reading' },
      { label: 'Future ongoing', greek: 'θα διαβάζω', english: 'I will read (regularly)' },
      { label: 'One complete', greek: 'διαβάσω', english: 'I read (through)' },
      { label: 'Past complete', greek: 'διάβασα', english: 'I read (finished)' },
      { label: 'Future complete', greek: 'θα διαβάσω', english: 'I will read (through)' },
      { label: 'Already done', greek: 'έχω διαβάσει', english: 'I have read' },
    ],
  },
  {
    id: 'leo',
    lemma: 'λέω',
    english: 'say / tell',
    family: 'irregular',
    forms: [
      { label: 'Present ongoing', greek: 'λέω', english: 'I say / tell' },
      { label: 'Past ongoing', greek: 'έλεγα', english: 'I was saying' },
      { label: 'Future ongoing', greek: 'θα λέω', english: 'I will say (regularly)' },
      { label: 'One complete', greek: 'πω', english: 'I say (once)' },
      { label: 'Past complete', greek: 'είπα', english: 'I said' },
      { label: 'Future complete', greek: 'θα πω', english: 'I will say' },
      { label: 'Already done', greek: 'έχω πει', english: 'I have said' },
    ],
  },
]

export function getVerbTenseStack(lemmaOrId) {
  const key = lemmaOrId.toLowerCase()
  return (
    VERB_TENSE_STACKS.find(
      (s) => s.id === key || s.lemma.toLowerCase() === key,
    ) ?? null
  )
}

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
  {
    id: 'reading-strategy',
    title: 'How to read past forms',
    text: 'When you meet an unknown past form, ask one question: is the narrator filming the scene (a lot of times) or reporting an event (one time)? That unlocks most comprehension.',
  },
  {
    id: 'habitual-present',
    title: 'Present ≠ only “now”',
    text: 'Greek present often covers habitual actions — “I read every day” uses the same form as “I am reading right now.” Context tells you which.',
  },
  {
    id: 'glue-words',
    title: 'Why glue words matter',
    text: 'Words like λοιπόν, δηλαδή, and μάλλον rarely change the factual meaning — they manage rhythm, agreement, and social tone. Ignoring them makes Greek sound textbook-flat.',
  },
  {
    id: 'pattern-power',
    title: 'Patterns multiply comprehension',
    text: 'Once you know θέλω να and μπορώ να, hundreds of sentences become predictable. You are not memorising every sentence — you are recognising frames.',
  },
]

/** Lightweight register tags for future expansion. */
export const REGISTER_TAGS = {
  neutral: { label: 'Everyday Greek', description: 'Natural spoken style' },
  formal: { label: 'More formal', description: 'Polite or written register' },
  conversational: { label: 'Conversational', description: 'How Greeks actually talk' },
  textbook: { label: 'Textbook form', description: 'Clear standard grammar' },
}
