/**
 * Conversational glue — fillers and connectives that make Greek sound human.
 * Pairs with vocabulary batch and reading content.
 */
export const CONVERSATION_GLUE = [
  {
    word: 'λοιπόν',
    english: 'so / well then',
    usage: 'Transitions to a decision or next step.',
    example: 'Λοιπόν, τι κάνουμε τώρα;',
    register: 'conversational',
  },
  {
    word: 'δηλαδή',
    english: 'that is / I mean',
    usage: 'Clarifies or rephrases what you just said.',
    example: 'Δηλαδή, δεν μπορώ να έρθω.',
    register: 'conversational',
  },
  {
    word: 'βασικά',
    english: 'basically',
    usage: 'Summarises or cuts to the main point.',
    example: 'Βασικά, είμαι κουρασμένος.',
    register: 'conversational',
  },
  {
    word: 'μάλλον',
    english: 'probably / rather',
    usage: 'Soft guess or gentle preference.',
    example: 'Μάλλον θα μείνω σπίτι.',
    register: 'conversational',
  },
  {
    word: 'ίσως',
    english: 'maybe / perhaps',
    usage: 'Opens possibilities without committing.',
    example: 'Ίσως πάμε αύριο.',
    register: 'neutral',
  },
  {
    word: 'εντάξει',
    english: 'OK / alright',
    usage: 'Agreement, acceptance, or closing a topic.',
    example: 'Εντάξει, τα λέμε αύριο.',
    register: 'conversational',
  },
  {
    word: 'ακόμα',
    english: 'still / yet / also',
    usage: 'Time continuity or adding another point.',
    example: 'Ακόμα δεν έφτασα.',
    register: 'neutral',
  },
  {
    word: 'επίσης',
    english: 'also / moreover',
    usage: 'Adds information in a structured way.',
    example: 'Επίσης, θέλω και ψωμί.',
    register: 'neutral',
  },
  {
    word: 'πάντως',
    english: 'anyway',
    usage: 'Returns to the main thread after a digression.',
    example: 'Πάντως, δεν πειράζει.',
    register: 'conversational',
  },
  {
    word: 'τελικά',
    english: 'in the end / finally',
    usage: 'Wraps up a story or decision path.',
    example: 'Τελικά, πήγαμε σινεμά.',
    register: 'conversational',
  },
  {
    word: 'ναι μωρέ',
    english: 'yeah, come on (casual)',
    usage: 'Casual agreement with warmth or mild exasperation.',
    example: '— Θα τα καταφέρεις. — Ναι μωρέ, εντάξει.',
    register: 'casual',
  },
  {
    word: 'αλήθεια;',
    english: 'really? / honestly?',
    usage: 'Surprise or seeking confirmation.',
    example: '— Έφυγε ήδη. — Αλήθεια;',
    register: 'conversational',
  },
  {
    word: 'σοβαρά;',
    english: 'seriously?',
    usage: 'Disbelief or emphasis — very common spoken.',
    example: '— Δεν θα έρθει. — Σοβαρά;',
    register: 'conversational',
  },
  {
    word: 'ωραία',
    english: 'fine / great / OK',
    usage: 'Positive closure — lets conversation move on.',
    example: 'Ωραία, τα λέμε εκεί.',
    register: 'conversational',
  },
  {
    word: 'ακριβώς',
    english: 'exactly',
    usage: 'Strong agreement — you align with the speaker.',
    example: '— Είναι δύσκολο. — Ακριβώς.',
    register: 'conversational',
  },
]

export function getGlueByWord(word) {
  if (!word) return null
  const clean = word.replace(/[.,;:!?]/g, '').toLowerCase()
  return CONVERSATION_GLUE.find((g) => g.word.toLowerCase() === clean) ?? null
}
