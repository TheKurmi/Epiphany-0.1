/** @type {import('../index').Lesson} */
import { PRESENT_OMEGA_ENDINGS, conjugate } from '../patterns/conjugation'

const theloRows = conjugate('θέλ', PRESENT_OMEGA_ENDINGS)

const lesson = {
  id: 'modal-verbs',
  topicId: 'modals',
  level: 'beginner',
  pathOrder: 16,
  duration: '3–4 min',
  title: 'Modal Verbs — θέλω, μπορώ, πρέπει',
  summary: 'Express wants, ability, and obligation in everyday Greek.',
  intro: {
    paragraphs: [
      'Modal verbs shape intent: θέλω (I want), μπορώ (I can / am able), πρέπει (must / should / have to). They precede another verb — often in the infinitive-like να form: θέλω να πάω (I want to go).',
      'μπορώ and θέλω conjugate like regular -ω verbs. πρέπει is impersonal — the same form for all persons; the verb after it uses να.',
      'These three unlock polite requests, plans, and rules — essential for survival and intermediate conversation.',
    ],
    examples: [
      { greek: 'Θέλω καφέ.', english: 'I want coffee.' },
      { greek: 'Μπορείς να βοηθήσεις;', english: 'Can you help?' },
      { greek: 'Πρέπει να μελετάω.', english: 'I must / should study.' },
    ],
  },
  sections: [
    {
      type: 'conjugationTable',
      title: 'θέλω (present)',
      stem: 'θέλ',
      rows: theloRows,
    },
    {
      type: 'text',
      title: 'πρέπει + να',
      paragraphs: [
        'Πρέπει does not change for person: Πρέπει να πάω (I must go), Πρέπει να πας (You must go). Think of it as “it is necessary that…”',
      ],
    },
  ],
  commonMistakes: [
    { title: 'να after modals', text: 'After θέλω and μπορώ, use να + verb for full clauses: θέλω να φύγω.' },
  ],
}

export default lesson
