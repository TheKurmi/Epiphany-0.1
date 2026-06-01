/** @type {import('../index').Lesson} */
const lesson = {
  id: 'object-pronouns',
  topicId: 'pronouns',
  level: 'intermediate',
  pathOrder: 19,
  duration: '4 min',
  title: 'Object Pronouns',
  summary: 'με, σε, τον, την, τους — who receives the action.',
  intro: {
    paragraphs: [
      'Object pronouns show who receives the verb’s action: βλέπω σε (I see you), αγαπάω τον (I love him). They usually come before the verb in modern spoken Greek.',
      'Forms: με (me), σε (you sg.), τον/την/το (him/her/it), μας (us), σας (you pl.), τους (them). The accusative gender matches the object, not the speaker.',
      'Combine with verbs you already know: σε βλέπω, με ακούει, τους καλούμε.',
    ],
    examples: [
      { greek: 'Με ακούεις;', english: 'Do you hear me?' },
      { greek: 'Σε βλέπω.', english: 'I see you.' },
      { greek: 'Τους ξέρουμε.', english: 'We know them.' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Object pronouns',
      columns: ['Person', 'Form', 'Example'],
      rows: [
        ['me', 'με', 'Με βλέπει'],
        ['you (sg.)', 'σε', 'Σε αγαπώ'],
        ['him / it (m./n.)', 'τον / το', 'Τον καλώ'],
        ['her', 'την', 'Την ξέρω'],
        ['us', 'μας', 'Μας αρέσει'],
        ['you (pl.)', 'σας', 'Σας περιμένω'],
        ['them', 'τους', 'Τους βλέπω'],
      ],
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    { title: 'Position', text: 'In speech, pronoun often precedes verb: σε αγαπώ (not αγαπώ σε in many contexts).' },
  ],
}

export default lesson
