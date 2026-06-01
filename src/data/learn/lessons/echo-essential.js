import { PRESENT_OMEGA_ENDINGS, conjugate } from '../patterns/conjugation'

const echoRows = conjugate('έχ', PRESENT_OMEGA_ENDINGS)

/** @type {import('../index').Lesson} */
const lesson = {
  id: 'echo-essential',
  topicId: 'present-tense',
  level: 'beginner',
  pathOrder: 3,
  duration: '3 min',
  title: 'έχω — I Have',
  summary: 'Ultra-common, mostly regular — great news for beginners.',
  intro: {
    paragraphs: [
      'The verb έχω (I have) appears constantly in everyday Greek — from “I have time” (έχω χρόνο) to casual expressions like “What’s up?” (Τι έχεις;). It is one of the first verbs worth knowing well because it shows up in almost every conversation.',
      'Good news for learners: έχω follows the regular -ω pattern almost perfectly. The stem is έχ-, and the endings match what you already learned with πίνω and γράφω. If you know -ω verbs, you already know most of έχω — you just need to attach the right ending to the stem.',
      'Beyond literal possession, Greek uses έχω in idiomatic phrases English expresses differently. Έχεις δίκιο means “you are right” (literally “you have reason”). Pay attention to these chunks as you encounter them — they are high-frequency building blocks.',
    ],
    examples: [
      { greek: 'έχω χρόνο', english: 'I have time' },
      { greek: 'έχεις δίκιο', english: 'you are right (lit. you have reason)' },
      { greek: 'έχουμε πρόβλημα', english: 'we have a problem' },
    ],
  },
  sections: [
    {
      type: 'conjugationCompare',
      title: 'έχω = same endings as πίνω',
      persons: ['εγώ', 'εσύ', 'αυτός/ή/ό'],
      verbs: [
        { label: 'έχω', stem: 'έχ', forms: ['έχω', 'έχεις', 'έχει'] },
        { label: 'πίνω', stem: 'πίν', forms: ['πίνω', 'πίνεις', 'πίνει'] },
      ],
    },
  ],
  commonMistakes: [
    {
      title: 'Wrong ending',
      text: 'Not έχω, έχει, έχουν for all persons — match the person: εσύ → έχεις.',
    },
  ],
  quiz: {
    question: 'How do you say “we have”?',
    options: ['έχω', 'έχουμε', 'έχουν'],
    correctIndex: 1,
  },
  deepDive: {
    title: 'Dive deeper',
    teaser: 'Full έχω table and common phrases',
    sections: [
      {
        type: 'conjugationTable',
        title: 'Full conjugation: έχω',
        stem: 'έχ',
        rows: echoRows,
      },
      {
        type: 'examples',
        title: 'Phrases to copy',
        items: [
          { greek: 'Δεν έχω χρόνο.', english: 'I do not have time.' },
          { greek: 'Έχουμε πρόβλημα.', english: 'We have a problem.' },
          { greek: 'Τι έχεις;', english: 'What do you have? / What\'s up?' },
        ],
      },
    ],
  },
}

export default lesson
