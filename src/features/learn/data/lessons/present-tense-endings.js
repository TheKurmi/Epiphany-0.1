import {
  PRESENT_OMEGA_ENDINGS,
  conjugate,
} from '../patterns/conjugation'

const pinoRows = conjugate('πίν', PRESENT_OMEGA_ENDINGS)
const diavazoRows = conjugate('διαβάζ', PRESENT_OMEGA_ENDINGS)

/** @type {import('../index').Lesson} */
const lesson = {
  id: 'present-tense-endings',
  topicId: 'present-tense',
  level: 'beginner',
  pathOrder: 2,
  duration: '3–4 min',
  title: '-ω Verbs & Present Endings',
  summary: 'One pattern, hundreds of verbs — spot the ending, not every letter.',
  intro: {
    paragraphs: [
      'Greek verbs change their ending to show who is doing the action — I, you, he/she, we, you all, they. The core meaning of the verb (the stem) usually stays the same; only the ending swaps. Once you recognize this rhythm, new verbs feel familiar instead of random.',
      'The most common pattern in everyday Greek is the -ω verb group. Verbs like πίνω (I drink), γράφω (I write), and διαβάζω (I read) all share the same six endings. That means learning one pattern unlocks hundreds of verbs — you are not memorizing every word from scratch.',
      'In conversation, Greeks often drop the subject pronoun (εγώ, εσύ) because the verb ending already tells you who acts. When you hear πίνω, you know it means “I drink” without needing εγώ. Focus on endings first — they are the real grammar signal.',
    ],
    examples: [
      { greek: 'πίνω', english: 'I drink' },
      { greek: 'πίνεις', english: 'you drink' },
      { greek: 'πίνουμε', english: 'we drink' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'The six endings',
      caption: 'Same endings for πίνω, γράφω, διαβάζω, and most everyday verbs.',
      columns: ['Person', 'Ending'],
      rows: PRESENT_OMEGA_ENDINGS.map(({ person, ending }) => [person, ending]),
      highlightColumn: 1,
    },
    {
      type: 'conjugationCompare',
      title: 'See the pattern repeat',
      caption: 'Different stems — identical endings.',
      persons: ['εγώ', 'εσύ', 'αυτός/ή/ό'],
      verbs: [
        { label: 'πίνω', stem: 'πίν', forms: ['πίνω', 'πίνεις', 'πίνει'] },
        { label: 'γράφω', stem: 'γράφ', forms: ['γράφω', 'γράφεις', 'γράφει'] },
      ],
    },
  ],
  commonMistakes: [
    {
      title: 'Endings vs whole word',
      text: 'Focus on -ω, -εις, -ει — not memorizing every verb from scratch.',
    },
    {
      title: 'Accent mistakes',
      text: 'Stress usually falls on the ending syllable in -ω verbs: πίν-ω, πίν-εις. Listen for the beat.',
    },
  ],
  quiz: {
    question: 'What ending goes with εσύ (you)?',
    options: ['-ω', '-εις', '-ουν'],
    correctIndex: 1,
  },
  deepDive: {
    title: 'Dive deeper',
    teaser: 'Full πίνω table, διαβάζω, and all six persons',
    sections: [
      {
        type: 'conjugationTable',
        title: 'Full conjugation: πίνω',
        stem: 'πίν',
        rows: pinoRows,
      },
      {
        type: 'conjugationTable',
        title: 'Another -ω verb: διαβάζω',
        caption: 'Same endings — new stem.',
        stem: 'διαβάζ',
        rows: diavazoRows,
      },
      {
        type: 'note',
        title: 'Syntax tip',
        paragraphs: [
          'Subject pronouns (εγώ, εσύ) are often dropped — the ending already tells you who. Πίνω καφέ = “I drink coffee,” no εγώ needed.',
        ],
      },
    ],
  },
}

export default lesson
