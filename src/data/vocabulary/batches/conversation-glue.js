import { v } from './_helpers.js'

/** Natural conversational fillers — high-frequency spoken Greek. */
export const CONVERSATION_GLUE_VOCAB = [
  v('λοιπόν', 'so / well then', {
    category: 'conversation',
    difficulty: 'easy',
    tags: ['conversation', 'filler', 'glue'],
    frequencyRank: 12,
    exampleUsage: 'Λοιπόν, τι κάνουμε τώρα;',
  }),
  v('δηλαδή', 'that is / I mean', {
    category: 'conversation',
    tags: ['conversation', 'filler', 'glue'],
    frequencyRank: 18,
    exampleUsage: 'Δηλαδή, δεν κατάλαβα.',
  }),
  v('βασικά', 'basically', {
    category: 'conversation',
    tags: ['conversation', 'filler'],
    frequencyRank: 22,
  }),
  v('μάλλον', 'probably / rather', {
    category: 'conversation',
    tags: ['conversation', 'filler'],
    frequencyRank: 25,
  }),
  v('ίσως', 'maybe / perhaps', {
    category: 'conversation',
    tags: ['conversation'],
    frequencyRank: 28,
  }),
  v('ακόμα', 'still / yet / also', {
    category: 'conversation',
    tags: ['conversation', 'glue'],
    frequencyRank: 30,
  }),
  v('επίσης', 'also / moreover', {
    category: 'conversation',
    tags: ['conversation', 'glue'],
    frequencyRank: 32,
  }),
  v('εντάξει', 'OK / alright', {
    category: 'conversation',
    tags: ['conversation', 'filler'],
    frequencyRank: 8,
    exampleUsage: 'Εντάξει, τα λέμε αύριο.',
  }),
  v('ναι μωρέ', 'yeah, come on (casual)', {
    category: 'conversation',
    difficulty: 'medium',
    tags: ['conversation', 'casual', 'filler'],
    frequencyRank: 45,
  }),
  v('αλήθεια;', 'really? / honestly?', {
    category: 'conversation',
    tags: ['conversation', 'question'],
    frequencyRank: 40,
  }),
  v('σοβαρά;', 'seriously?', {
    category: 'conversation',
    tags: ['conversation', 'question'],
    frequencyRank: 42,
  }),
  v('όντως;', 'really? (emphatic)', {
    category: 'conversation',
    tags: ['conversation', 'question'],
    frequencyRank: 48,
  }),
  v('ωραία', 'fine / great / OK', {
    category: 'conversation',
    tags: ['conversation', 'filler'],
    frequencyRank: 15,
  }),
  v('ακριβώς', 'exactly', {
    category: 'conversation',
    tags: ['conversation'],
    frequencyRank: 50,
  }),
  v('φυσικά', 'of course', {
    category: 'conversation',
    tags: ['conversation'],
    frequencyRank: 20,
  }),
  v('όμως', 'however / though', {
    category: 'conversation',
    difficulty: 'medium',
    tags: ['conversation', 'glue'],
    frequencyRank: 55,
  }),
  v('έτσι', 'like this / so', {
    category: 'conversation',
    tags: ['conversation'],
    frequencyRank: 35,
  }),
  v('κάπως', 'somehow', {
    category: 'conversation',
    difficulty: 'medium',
    tags: ['conversation'],
    frequencyRank: 60,
  }),
  v('τελικά', 'in the end / finally', {
    category: 'conversation',
    tags: ['conversation', 'glue'],
    frequencyRank: 38,
  }),
  v('ξαφνικά', 'suddenly', {
    category: 'conversation',
    difficulty: 'medium',
    tags: ['conversation'],
    frequencyRank: 65,
  }),
  v('στην πραγματικότητα', 'actually / in reality', {
    category: 'conversation',
    difficulty: 'medium',
    tags: ['conversation', 'glue'],
    frequencyRank: 70,
  }),
  v('πάντως', 'anyway', {
    category: 'conversation',
    difficulty: 'medium',
    tags: ['conversation', 'filler'],
    frequencyRank: 52,
  }),
  v('σίγουρα', 'surely / definitely', {
    category: 'conversation',
    tags: ['conversation'],
    frequencyRank: 33,
  }),
  v('μάλλον όχι', 'probably not', {
    category: 'conversation',
    difficulty: 'medium',
    tags: ['conversation'],
    frequencyRank: 72,
  }),
  v('όχι ακριβώς', 'not exactly', {
    category: 'conversation',
    difficulty: 'medium',
    tags: ['conversation'],
    frequencyRank: 74,
  }),
]
