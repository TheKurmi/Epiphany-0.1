import { CONVERSATION_GLUE_VOCAB } from './conversation-glue.js'
import { VERBS_HIGH_FREQUENCY } from './verbs-high-frequency.js'
import { THEMES_EXPANDED_VOCAB } from './themes-expanded.js'
import { THEMES_BATCH_2_UNIQUE } from './themes-batch-2.js'
import { THEMES_BATCH_3_VOCAB } from './themes-batch-3.js'

/** All curated vocabulary batches — merged into registry with deduplication. */
export const VOCAB_BATCHES = [
  ...CONVERSATION_GLUE_VOCAB,
  ...VERBS_HIGH_FREQUENCY,
  ...THEMES_EXPANDED_VOCAB,
  ...THEMES_BATCH_2_UNIQUE,
  ...THEMES_BATCH_3_VOCAB,
]

export { CONVERSATION_GLUE_VOCAB, VERBS_HIGH_FREQUENCY, THEMES_EXPANDED_VOCAB }
