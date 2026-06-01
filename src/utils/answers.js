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

    variants.add(normalize(trimmed.replace(/[;?·]/g, '')))
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

  for (const variant of greekDigraphVariants(unaccented)) {
    forms.add(variant)
  }

  return forms
}

/** Digraph / vowel pairs learners commonly confuse (half-cost substitutions). */
const GREEK_DIGRAPH_SWAPS = [
  ['ει', 'ι'],
  ['ι', 'ει'],
  ['αι', 'ε'],
  ['ε', 'αι'],
  ['οι', 'ι'],
  ['ι', 'οι'],
  ['ου', 'υ'],
  ['υ', 'ου'],
]

/** Pairs of Greek letters/digraphs learners commonly confuse */
const GREEK_CONFUSIONS = new Set([
  'υ|ι',
  'ι|υ',
  'η|ι',
  'ι|η',
  'η|υ',
  'υ|η',
  'ω|ο',
  'ο|ω',
  'ε|αι',
  'αι|ε',
  'σ|ς',
  'ς|σ',
])

/** Generate spelling variants with common learner digraph swaps. */
function greekDigraphVariants(text) {
  const variants = new Set([text])
  let frontier = [text]

  for (const [from, to] of GREEK_DIGRAPH_SWAPS) {
    const next = []
    for (const form of frontier) {
      if (!form.includes(from)) continue
      const swapped = form.replace(from, to)
      if (!variants.has(swapped)) {
        variants.add(swapped)
        next.push(swapped)
      }
    }
    frontier = next
    if (!frontier.length) break
  }

  return variants
}

function greekSubstitutionCost(a, b) {
  if (a === b) return 0
  if (GREEK_CONFUSIONS.has(`${a}|${b}`)) return 1
  return 2
}

function defaultSubstitutionCost(a, b) {
  return a === b ? 0 : 2
}

/**
 * Scaled Levenshtein distance (×2) so half-cost Greek confusions are supported.
 */
function editDistance(a, b, subCostFn) {
  if (a === b) return 0
  if (!a.length) return b.length * 2
  if (!b.length) return a.length * 2

  const rows = a.length + 1
  const cols = b.length + 1
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0))

  for (let i = 0; i < rows; i++) dp[i][0] = i * 2
  for (let j = 0; j < cols; j++) dp[0][j] = j * 2

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 2,
        dp[i][j - 1] + 2,
        dp[i - 1][j - 1] + subCostFn(a[i - 1], b[j - 1]),
      )
    }
  }

  return dp[a.length][b.length]
}

const MIN_LENGTH_RATIO = 0.85

function lengthRatio(a, b) {
  if (!a.length || !b.length) return 0
  return Math.min(a.length, b.length) / Math.max(a.length, b.length)
}

/** Reject truncated or unrelated-length guesses before edit distance. */
function hasComparableLength(user, expected) {
  const ratio = lengthRatio(user, expected)
  if (ratio < MIN_LENGTH_RATIO) return false

  const lenDiff = Math.abs(user.length - expected.length)
  if (lenDiff >= 2) return false

  if (user.length < expected.length && ratio < 0.9) return false

  return true
}

function maxEditDistance(expectedLen) {
  if (expectedLen <= 4) return 2
  if (expectedLen <= 8) return 4
  return 4
}

function compareForms(user, expected, useGreekRules) {
  if (!user || !expected) return 'wrong'
  if (user === expected) return 'correct'

  if (!hasComparableLength(user, expected)) return 'wrong'

  const subCostFn = useGreekRules ? greekSubstitutionCost : defaultSubstitutionCost
  const distance = editDistance(user, expected, subCostFn)
  const maxDistance = maxEditDistance(expected.length)

  if (distance > 0 && distance <= maxDistance) return 'nearMiss'
  return 'wrong'
}

const RESULT_RANK = { wrong: 0, nearMiss: 1, correct: 2 }

function bestResult(current, next) {
  return RESULT_RANK[next] > RESULT_RANK[current] ? next : current
}

/**
 * @param {string} userInput
 * @param {string} expected
 * @returns {'correct' | 'nearMiss' | 'wrong'}
 */
export function evaluateAnswer(userInput, expected) {
  const userForms = [...greekLooseForms(userInput)]
  const options = expectedVariants(expected)
  const useGreekRules =
    isGreekText(expected) || userForms.some((form) => isGreekText(form))

  if (!userForms.length || !options.length) return 'wrong'

  let result = 'wrong'

  for (const user of userForms) {
    for (const opt of options) {
      result = bestResult(result, compareForms(user, opt, useGreekRules))
      if (result === 'correct') return 'correct'
    }
  }

  return result
}

const CONFUSION_HINTS = [
  { pair: ['ει', 'ι'], hint: 'You may have confused ει and ι.' },
  { pair: ['ι', 'ει'], hint: 'You may have confused ι and ει.' },
  { pair: ['η', 'ι'], hint: 'You may have confused η and ι.' },
  { pair: ['ι', 'η'], hint: 'You may have confused ι and η.' },
  { pair: ['η', 'υ'], hint: 'You may have confused η and υ.' },
  { pair: ['υ', 'η'], hint: 'You may have confused υ and η.' },
  { pair: ['υ', 'ι'], hint: 'You may have confused υ and ι.' },
  { pair: ['ι', 'υ'], hint: 'You may have confused ι and υ.' },
  { pair: ['ω', 'ο'], hint: 'You may have confused ω and ο.' },
  { pair: ['ο', 'ω'], hint: 'You may have confused ο and ω.' },
  { pair: ['αι', 'ε'], hint: 'You may have confused αι and ε.' },
  { pair: ['ε', 'αι'], hint: 'You may have confused ε and αι.' },
  { pair: ['οι', 'ι'], hint: 'You may have confused οι and ι.' },
  { pair: ['ι', 'οι'], hint: 'You may have confused ι and οι.' },
  { pair: ['ου', 'υ'], hint: 'You may have confused ου and υ.' },
  { pair: ['υ', 'ου'], hint: 'You may have confused υ and ου.' },
]

/**
 * Human-readable hint when answer is a near miss.
 * @returns {string | null}
 */
export function getNearMissHint(userInput, expected) {
  if (evaluateAnswer(userInput, expected) !== 'nearMiss') return null

  const user = normalize(userInput)
  const exp = normalize(expected)
  if (!user || !exp) return 'Very close — check spelling and accents.'

  for (const { pair, hint } of CONFUSION_HINTS) {
    const [from, to] = pair
    if (user.includes(from) && exp.includes(to) && user.replace(from, to) === exp) {
      return hint
    }
  }

  if (user.length === exp.length) {
    return 'Very close — double-check accents and letter choices.'
  }

  return 'Almost there — check the full spelling.'
}

/**
 * @param {string} userInput
 * @param {string} expected
 */
export function checkAnswer(userInput, expected) {
  return evaluateAnswer(userInput, expected) === 'correct'
}
