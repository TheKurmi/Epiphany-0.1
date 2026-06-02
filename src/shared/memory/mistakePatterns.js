/** Storage for aggregated mistake pattern intelligence. */
export const MISTAKE_STORAGE_KEY = 'epiphany-mistake-patterns'

export const MISTAKE_CATEGORIES = {
  vowel_confusion: { label: 'Vowel / digraph confusion', emoji: 'α' },
  accent: { label: 'Accent mistakes', emoji: '΄' },
  article: { label: 'Article mismatch', emoji: 'ο/η/το' },
  tense_selection: { label: 'Tense selection', emoji: '🕒' },
  plural: { label: 'Plural endings', emoji: 'ες' },
  adjective_agreement: { label: 'Adjective agreement', emoji: '—ος/η/ο' },
  spelling: { label: 'Spelling near miss', emoji: '✎' },
}

function readStore() {
  try {
    const raw = localStorage.getItem(MISTAKE_STORAGE_KEY)
    return raw ? JSON.parse(raw) : { counts: {}, recent: [] }
  } catch {
    return { counts: {}, recent: [] }
  }
}

function writeStore(data) {
  try {
    localStorage.setItem(MISTAKE_STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event('mistake-patterns'))
}

function normalize(text) {
  return (text ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
}

/**
 * Classify WHY an answer failed — for adaptive review.
 * @returns {string | null} category id
 */
export function classifyMistake(userInput, expected, { patternTag } = {}) {
  const user = normalize(userInput)
  const exp = normalize(expected)
  if (!user || !exp) return null

  const digraphPairs = [
    ['ει', 'ι'],
    ['η', 'ι'],
    ['η', 'υ'],
    ['υ', 'ι'],
    ['αι', 'ε'],
    ['οι', 'ι'],
    ['ου', 'υ'],
    ['ω', 'ο'],
  ]
  for (const [a, b] of digraphPairs) {
    if (
      (user.includes(a) && exp.includes(b)) ||
      (user.includes(b) && exp.includes(a))
    ) {
      return 'vowel_confusion'
    }
  }

  if (user === exp && userInput !== expected) return 'accent'

  if (/^article-/.test(patternTag ?? '')) return 'article'
  if (/plural/.test(patternTag ?? '')) return 'plural'
  if (/agreement|adjective/.test(patternTag ?? '')) return 'adjective_agreement'
  if (/past|aorist|imperfect|tense|aspect|verb-/.test(patternTag ?? '')) {
    return 'tense_selection'
  }

  if (user.length === exp.length) return 'spelling'

  return 'spelling'
}

export function recordMistakePattern(userInput, expected, meta = {}) {
  const category = classifyMistake(userInput, expected, meta)
  if (!category) return

  const store = readStore()
  store.counts[category] = (store.counts[category] ?? 0) + 1

  store.recent.unshift({
    category,
    at: new Date().toISOString(),
    patternTag: meta.patternTag ?? null,
  })
  store.recent = store.recent.slice(0, 40)

  writeStore(store)
}

export function getMistakePatternSummary() {
  const store = readStore()
  const top = Object.entries(store.counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => ({
      id,
      count,
      ...MISTAKE_CATEGORIES[id],
    }))

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yKey = yesterday.toISOString().slice(0, 10)

  const yesterdayCount = store.recent.filter((r) => r.at.startsWith(yKey)).length

  return { top, yesterdayCount, recent: store.recent.slice(0, 8) }
}

export function getTopMistakeCategory() {
  return getMistakePatternSummary().top[0] ?? null
}

export function clearMistakePatterns() {
  writeStore({ counts: {}, recent: [] })
}

/** Seed mistake pattern counts for adaptive testing. */
export function injectMistakeProfile(category, count, { patternTag, sample } = {}) {
  const store = readStore()
  store.counts[category] = (store.counts[category] ?? 0) + count

  const entries = Array.from({ length: Math.min(count, 12) }, () => ({
    category,
    at: new Date().toISOString(),
    patternTag: patternTag ?? null,
    sample: sample ?? null,
  }))
  store.recent = [...entries, ...store.recent].slice(0, 40)

  writeStore(store)
}
