/** Strip accents and normalize for comparison */
function normalize(text) {
  if (!text) return ''
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/[.;,!?·'"”“]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Split expected gloss into acceptable answer strings */
function expectedVariants(expected) {
  const variants = new Set()

  for (const chunk of expected.split(/[/,]/)) {
    const trimmed = chunk.trim()
    if (!trimmed) continue

    variants.add(normalize(trimmed))
    variants.add(normalize(trimmed.replace(/\([^)]*\)/g, '')))

    // Greek answers: also accept without final punctuation (e.g. ;)
    variants.add(
      normalize(trimmed.replace(/[;?·]/g, '')),
    )
  }

  return [...variants].filter(Boolean)
}

function isGreekText(text) {
  return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text)
}

/** Loose transliteration hints for learners typing Greek without accents */
function greekLooseForms(text) {
  const base = normalize(text)
  const forms = new Set([base])

  if (!isGreekText(text)) return forms

  const unaccented = text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
  forms.add(unaccented)

  return forms
}

/**
 * @param {string} userInput
 * @param {string} expected - correct answer (may include / alternatives)
 */
export function checkAnswer(userInput, expected) {
  const userForms = greekLooseForms(userInput)
  const options = expectedVariants(expected)

  if (!userForms.size || !options.length) return false

  for (const user of userForms) {
    if (!user) continue
    for (const opt of options) {
      if (user === opt) return true
    }
  }

  return false
}
