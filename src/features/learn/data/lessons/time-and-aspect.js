import { ASPECT_CONCEPT_DRILLS } from '../patterns/aspect'

/** @type {import('../index').Lesson} */
const lesson = {
  id: 'time-and-aspect',
  topicId: 'time-aspect',
  level: 'intermediate',
  pathOrder: 16,
  duration: '8–10 min',
  title: 'How Greek Thinks About Time',
  summary:
    'Greek verbs encode WHEN something happens and HOW you view the action — not random labels.',
  intro: {
    paragraphs: [
      'If Greek tenses have ever felt like a wall of random names, this lesson is for you. Modern Greek does not ask you to memorise isolated tables — it combines two ideas: time (past, present, future) and aspect (ongoing vs complete).',
      'Think of aspect as a camera setting. Continuous aspect films the action in progress — reading, reading, reading. Summary aspect takes one photograph — the book, finished. Same verb stem, different perspective.',
      'Once you see this logic, ενεστώτας, παρατατικός, αόριστος, and the futures stop feeling arbitrary. They become combinations you can predict — and that makes every future tense lesson easier.',
    ],
    examples: [
      {
        greek: 'διάβαζα',
        english: 'I was reading (ongoing in the past)',
        highlight: { word: 'διάβαζα', stem: 'διάβαζ', ending: 'α', type: 'verb', label: 'Παρατατικός — continuous past' },
      },
      {
        greek: 'διάβασα',
        english: 'I read / finished reading (one complete past event)',
        highlight: { word: 'διάβασα', stem: 'διαβάσ', ending: 'α', type: 'verb', label: 'Αόριστος — summary past' },
      },
      {
        greek: 'θα διαβάζω / θα διαβάσω',
        english: 'I will be reading / I will read (through)',
        note: 'Future continuous vs future complete',
      },
    ],
  },
  sections: [
    {
      type: 'text',
      title: 'Time + Aspect = Tense',
      paragraphs: [
        'Every Greek tense answers two questions: when does it happen, and do we see the action as unfolding or as a finished unit? Not every theoretical combination exists — Greek uses the combinations that speakers actually need.',
        'The present (ενεστώτας) covers ongoing and habitual now. To express a single completed past event, Greek uses the aorist (αόριστος). To describe background action in the past — what was happening — it uses the imperfect (παρατατικός).',
      ],
    },
    {
      type: 'aspectMatrix',
      title: 'The concept matrix',
      caption:
        'Tap any cell to explore. Empty cells mark combinations that Modern Greek does not use as separate tenses.',
    },
    {
      type: 'examples',
      title: 'Same action, different perspective',
      items: [
        {
          greek: 'Όταν διάβαζα, χτύπησε το τηλέφωνο.',
          english: 'While I was reading, the phone rang.',
          note: 'Παρατατικός (background) + Αόριστος (single event)',
        },
        {
          greek: 'Διάβασα το βιβλίο σε μία μέρα.',
          english: 'I read the book in one day.',
          note: 'Αόριστος — one complete event',
        },
        {
          greek: 'Έχω διαβάσει αυτό το βιβλίο.',
          english: 'I have read this book.',
          note: 'Παρακείμενος — done, still relevant now',
        },
        {
          greek: 'Αύριο θα διαβάζω όλη μέρα.',
          english: 'Tomorrow I will be reading all day.',
          note: 'Future continuous',
        },
        {
          greek: 'Θα διαβάσω το κεφάλαιο απόψε.',
          english: 'I will read the chapter tonight.',
          note: 'Future complete — one finished act',
        },
      ],
    },
    {
      type: 'tips',
      title: 'Learner tips',
      items: [
        {
          title: 'Do not translate word-for-word',
          text: 'English “I was reading” maps to παρατατικός, but English “I read” yesterday could be aorist OR imperfect depending on perspective — ask: whole event or ongoing?',
        },
        {
          title: 'Empty cells are informative',
          text: 'Greek does not invent tenses for every logical slot. The matrix shows meaningful forms, not a mechanical grid.',
        },
        {
          title: 'Build on present patterns',
          text: 'You already know present endings. Past and future add prefixes (θα) and stem changes — aspect tells you which past or future form to reach for.',
        },
      ],
    },
    {
      type: 'conceptDrill',
      title: 'Concept check',
      questions: ASPECT_CONCEPT_DRILLS,
    },
  ],
  commonMistakes: [
    {
      title: 'Treating aorist and imperfect as interchangeable',
      text: 'Διάβασα = finished reading. Διάβαζα = was reading / used to read. Context and perspective decide — not random choice.',
    },
    {
      title: 'Fear of the names',
      text: 'Ενεστώτας, παρατατικός, αόριστος are labels for patterns you can feel. Focus on ongoing vs complete first; the Greek names follow.',
    },
    {
      title: 'Ignoring θα in the future',
      text: 'Future forms use θα + verb. Aspect still applies: θα διαβάζω (ongoing) vs θα διαβάσω (complete).',
    },
  ],
  quiz: {
    question: 'Which tense views a past action as one complete event?',
    options: ['Αόριστος', 'Παρατατικός', 'Ενεστώτας'],
    correctIndex: 0,
  },
  deepDive: {
    title: 'Go deeper',
    teaser: 'Future perfect, pluperfect nuance, and reading strategy',
    sections: [
      {
        type: 'text',
        title: 'Συντελεσμένος Μέλλοντας',
        paragraphs: [
          'By tomorrow I will have finished — θα έχω διαβάσει. This looks ahead to a future point where something is already complete. It extends the matrix: completed state, looking forward.',
        ],
      },
      {
        type: 'note',
        title: 'Reading strategy',
        paragraphs: [
          'When you meet an unknown past form in a story, ask: is the narrator filming the scene (παρατατικός) or reporting an event (αόριστος)? That one question unlocks most comprehension.',
        ],
      },
    ],
  },
}

export default lesson
