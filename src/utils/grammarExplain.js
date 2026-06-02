/** Human-readable labels for grammar highlight types. */
const TYPE_LABELS = {
  verb: 'Verb form',
  article: 'Article',
  ending: 'Ending',
  adjective: 'Adjective',
  noun: 'Noun',
}

/** Common present-tense ending explanations. */
const ENDING_HINTS = {
  ω: '1st person singular present (-ω)',
  'άω': '1st person singular present (-άω)',
  'ώ': '1st person singular present (-ώ)',
  εις: '2nd person singular present (-εις)',
  'άς': '2nd person singular present (-άς)',
  ει: '3rd person singular present (-ει)',
  'άει': '3rd person singular present (-άει)',
  ουμε: '1st person plural present (-ουμε)',
  'άμε': '1st person plural present (-άμε)',
  ετε: '2nd person plural present (-ετε)',
  'άτε': '2nd person plural present (-άτε)',
  ουν: '3rd person plural present (-ουν)',
  'άνε': '3rd person plural present (-άνε)',
  'ουν': '3rd person plural present (-ουν)',
  ος: 'Masculine singular adjective ending (-ος)',
  η: 'Feminine singular adjective ending (-η)',
  ο: 'Masculine singular ending (-ος)',
  α: 'Feminine/neuter singular ending (-α)',
  ι: 'Neuter singular noun ending (-ι)',
  ες: 'Masculine/feminine plural ending (-ες)',
  'δες': 'Masculine plural ending (-δες)',
  'ιά': 'Neuter plural ending (-ιά)',
  μου: 'Possessive: my (μου)',
  σου: 'Possessive: your (σου)',
  του: 'Possessive: his/her (του)',
  μας: 'Possessive: our (μας)',
  σας: 'Possessive: your plural (σας)',
  τους: 'Possessive: their (τους)',
}

/**
 * Build a short explanation for a highlighted grammar segment.
 * @param {{ word?: string, stem?: string, ending?: string, type?: string, label?: string }} highlight
 */
export function explainHighlight(highlight) {
  if (highlight?.label) return highlight.label

  const { ending, type } = highlight ?? {}

  if (ending && ENDING_HINTS[ending]) {
    return ENDING_HINTS[ending]
  }

  if (type && TYPE_LABELS[type]) {
    if (ending) return `${TYPE_LABELS[type]} · ending “${ending}”`
    return TYPE_LABELS[type]
  }

  if (ending) return `Ending: “${ending}”`

  return 'Grammar pattern'
}

/**
 * CSS modifier class for highlight type — keeps colors subtle.
 * @param {string} [type]
 */
export function highlightTypeClass(type) {
  if (!type) return ''
  return `grammar-highlight--${type}`
}
