import { ASPECT_CONCEPT_DRILLS } from '../patterns/aspect'
import { TIME_ACTION_INSIGHTS } from '@/shared/grammar/verbTransformations'

/** @type {import('../index').Lesson} */
const lesson = {
  id: 'time-and-aspect',
  topicId: 'time-aspect',
  level: 'intermediate',
  pathOrder: 16,
  duration: '8–10 min',
  title: 'How Greek Thinks About Time',
  summary:
    'Greek verbs encode quality of time and quantity of action — not random labels.',
  intro: {
    paragraphs: [
      'If Greek tenses have ever felt like a wall of random names, this lesson is for you. Every verb form answers two human questions: when does it happen (quality of time), and how does the action unfold (quantity of action)?',
      'Quality of time: before now, now, or later. Quantity of action: a lot of times (ongoing/repeated), one time (complete), or already done (finished with a link to another moment).',
      'Once you see this logic, ενεστώτας, παρατατικός, αόριστος, and the futures stop feeling arbitrary. They become combinations you can predict — and that makes every future tense lesson easier.',
    ],
    examples: [
      {
        greek: 'έπαιζα',
        english: 'I was playing (ongoing in the past)',
        highlight: { word: 'έπαιζα', stem: 'έπαιζ', ending: 'α', type: 'verb', label: 'Before now · a lot of times' },
      },
      {
        greek: 'έπαιξα',
        english: 'I played (one complete past event)',
        highlight: { word: 'έπαιξα', stem: 'έπαιξ', ending: 'α', type: 'verb', label: 'Before now · one time' },
      },
      {
        greek: 'θα παίζω / θα παίξω',
        english: 'I will keep playing / I will play (once)',
        note: 'Later · a lot of times vs later · one time',
      },
    ],
  },
  sections: [
    {
      type: 'text',
      title: 'Quality of Time + Quantity of Action = Tense',
      paragraphs: [
        'Every Greek tense combines two ideas. Not every theoretical combination exists — Greek uses the combinations speakers actually need.',
        'The present (ενεστώτας) covers ongoing and habitual now. To express a single completed past event, Greek uses the aorist (αόριστος). To describe background action in the past — what was happening — it uses the imperfect (παρατατικός).',
      ],
    },
    {
      type: 'linguisticInsight',
      title: TIME_ACTION_INSIGHTS[0].title,
      text: TIME_ACTION_INSIGHTS[0].text,
    },
    {
      type: 'aspectMatrix',
      title: 'The concept matrix',
      caption:
        'Switch views: Intuition → Grammar → παίζω. Tap any cell — the ✕ marks a combination Greek does not use.',
    },
    {
      type: 'linguisticInsight',
      title: TIME_ACTION_INSIGHTS[2].title,
      text: TIME_ACTION_INSIGHTS[2].text,
    },
    {
      type: 'verbTransformation',
      title: 'Action transformation patterns',
      caption:
        'Many “one time” forms build from “a lot of times” forms — the verb often becomes sharper in sound.',
      familyIds: ['z-to-x', 'f-to-ps', 'past-layer'],
    },
    {
      type: 'verbTransformation',
      title: 'Already done builds in layers',
      caption: '“Already done” often stacks έχω on the one-time form.',
      familyIds: ['perfect-layer'],
    },
    {
      type: 'linguisticInsight',
      title: TIME_ACTION_INSIGHTS[3].title,
      text: TIME_ACTION_INSIGHTS[3].text,
    },
    {
      type: 'timeline',
      title: 'Visualising action',
      caption: 'Quality of time flows left to right. Quantity of action is how the verb unfolds.',
      variant: 'time-flow',
      items: [
        { label: 'A lot of times', visual: 'wave', text: 'Ongoing, repeated, unfolding — like filming the scene.' },
        { label: 'One time', visual: 'dot', text: 'One complete event — a single snapshot.' },
        { label: 'Already done', visual: 'check', text: 'Finished — linked to another moment (now, past, or future).' },
      ],
    },
    {
      type: 'examples',
      title: 'Same action, different perspective',
      items: [
        {
          greek: 'Όταν διάβαζα, χτύπησε το τηλέφωνο.',
          english: 'While I was reading, the phone rang.',
          note: 'Before now · a lot of times + before now · one time',
        },
        {
          greek: 'Διάβασα το βιβλίο σε μία μέρα.',
          english: 'I read the book in one day.',
          note: 'Before now · one time',
        },
        {
          greek: 'Έχω διαβάσει αυτό το βιβλίο.',
          english: 'I have read this book.',
          note: 'Already done · connected to now',
        },
        {
          greek: 'Αύριο θα διαβάζω όλη μέρα.',
          english: 'Tomorrow I will be reading all day.',
          note: 'Later · a lot of times',
        },
        {
          greek: 'Θα διαβάσω το κεφάλαιο απόψε.',
          english: 'I will read the chapter tonight.',
          note: 'Later · one time',
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
          title: 'Listen for sound changes',
          text: 'παίζω → παίξω is not random — ongoing to complete often compresses the sound (ζ→ξ, φ→ψ). Pattern families repeat across verbs.',
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
      text: 'Start with quality of time + quantity of action. Ενεστώτας, παρατατικός, αόριστος are labels for patterns you can feel.',
    },
    {
      title: 'Ignoring θα in the future',
      text: 'Future forms use θα + verb. Quantity still applies: θα διαβάζω (a lot of times) vs θα διαβάσω (one time).',
    },
  ],
  quiz: {
    question: 'Which form views a past action as one complete event?',
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
          'By tomorrow I will have finished — θα έχω διαβάσει. This looks ahead to a future point where something is already complete. Already done · later.',
        ],
      },
      {
        type: 'note',
        title: 'Reading strategy',
        paragraphs: [
          'When you meet an unknown past form in a story, ask: is the narrator filming the scene (a lot of times) or reporting an event (one time)? That one question unlocks most comprehension.',
        ],
      },
    ],
  },
}

export default lesson
