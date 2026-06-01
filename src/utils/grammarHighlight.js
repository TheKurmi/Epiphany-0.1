/** Split a conjugated form into stem + highlighted ending. */
export function splitStemEnding(form, stem) {
  if (stem && form.startsWith(stem)) {
    return { stem, ending: form.slice(stem.length) }
  }
  return { stem: form, ending: '' }
}

/** @param {{ stem: string, ending: string }} parts */
export function highlightParts({ stem, ending }) {
  const parts = []
  if (stem) parts.push({ text: stem, highlight: false })
  if (ending) parts.push({ text: ending, highlight: true })
  return parts
}

/** @param {string} form @param {string} [stem] */
export function formToParts(form, stem) {
  return highlightParts(splitStemEnding(form, stem))
}
