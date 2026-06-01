import {
  PRESENT_ALPHA_ENDINGS,
  PRESENT_OMEGA_ENDINGS,
  CONJUGATION_GROUPS,
  MPORO_PRESENT,
  conjugate,
  irregularConjugationRows,
} from '../patterns/conjugation'

const milaoRows = conjugate('μιλ', PRESENT_ALPHA_ENDINGS)
const mpooroRows = irregularConjugationRows(MPORO_PRESENT)

/** @type {import('../index').Lesson} */
const lesson = {
  id: 'verb-conjugation-groups',
  topicId: 'verb-groups',
  level: 'intermediate',
  pathOrder: 7,
  duration: '3–4 min',
  title: 'Verb Groups (Συζυγίες)',
  summary: 'Two regular families + a few essentials — patterns, not isolated words.',
  intro: {
    paragraphs: [
      'Greek teachers organize verbs into συζυγίες (conjugation groups) — families that share the same ending patterns. Instead of treating every verb as unique, you learn one pattern and apply it to dozens of words. This is how native intuition develops: recognizing endings, not memorizing isolated forms.',
      'The two most important regular groups are Group A (-ω verbs like πίνω) and Group B (-άω / -ώ verbs like μιλάω). Group A is the default everyday pattern; Group B adds a stressed -ά- syllable in many forms. A small set of high-frequency verbs — είμαι, έχω, μπορώ — sit outside these groups and are worth learning as fixed forms.',
      'When you encounter a new verb, ask: which group does it belong to? If you can answer that, you can predict most of its present-tense forms. That single habit transforms grammar from a wall of memorization into pattern recognition.',
    ],
    examples: [
      { greek: 'μιλάω / μιλώ', english: 'I speak (-άω group)' },
      { greek: 'μπορώ', english: 'I can (essential irregular)' },
    ],
  },
  sections: [
    {
      type: 'groupCards',
      title: 'Three groups',
      caption: 'By frequency — start with A, then B, then essentials.',
      groups: CONJUGATION_GROUPS.map((g) => ({
        label: g.label,
        name: g.name,
        hint: g.hint,
        example: g.exampleVerb ? `e.g. ${g.exampleVerb}` : undefined,
      })),
    },
    {
      type: 'grammarTable',
      title: 'Group B endings (preview)',
      columns: ['Person', 'Ending'],
      rows: PRESENT_ALPHA_ENDINGS.slice(0, 3).map(({ person, ending }) => [
        person,
        ending,
      ]),
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    {
      title: 'Mixing groups',
      text: 'Do not put -ω endings on -άω verbs: μιλάω, not μιλώω (except optional 1st person μιλώ).',
    },
    {
      title: 'Over-regularizing είμαι',
      text: 'είμαι never follows Group A or B — it is its own mini-system.',
    },
  ],
  quiz: {
    question: 'Which group does μιλάω belong to?',
    options: ['-ω verbs', '-άω / -ώ verbs', 'Essential irregulars'],
    correctIndex: 1,
  },
  deepDive: {
    title: 'Dive deeper',
    teaser: 'Full μιλάω table, μπορώ, Group A vs B comparison, related verbs',
    sections: [
      {
        type: 'conjugationTable',
        title: 'Full conjugation: μιλάω',
        stem: 'μιλ',
        rows: milaoRows,
      },
      {
        type: 'conjugationCompare',
        title: 'Group A vs Group B',
        caption: 'Same persons — different ending shapes.',
        persons: ['εγώ', 'εσύ', 'αυτός/ή/ό'],
        verbs: [
          {
            label: 'πίνω (A)',
            stem: 'πίν',
            forms: ['πίνω', 'πίνεις', 'πίνει'],
          },
          {
            label: 'μιλάω (B)',
            stem: 'μιλ',
            forms: ['μιλάω', 'μιλάς', 'μιλάει'],
          },
        ],
      },
      {
        type: 'conjugationTable',
        title: 'Essential: μπορώ',
        caption: 'Only εγώ looks unusual — other forms follow -ω endings.',
        rows: mpooroRows,
        showEnding: false,
      },
      {
        type: 'grammarTable',
        title: 'Group A full endings',
        columns: ['Person', 'Ending'],
        rows: PRESENT_OMEGA_ENDINGS.map(({ person, ending }) => [person, ending]),
        highlightColumn: 1,
      },
      {
        type: 'grammarTable',
        title: 'Group B full endings',
        columns: ['Person', 'Ending'],
        rows: PRESENT_ALPHA_ENDINGS.map(({ person, ending }) => [person, ending]),
        highlightColumn: 1,
      },
      {
        type: 'note',
        title: 'Advanced note',
        paragraphs: [
          'Past, future, and passive each reuse similar group ideas with different endings — once you know present groups, advanced tenses become pattern recognition instead of starting over.',
        ],
      },
    ],
  },
}

export default lesson
