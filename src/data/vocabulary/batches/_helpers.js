/** @typedef {import('../registry').VocabItem} VocabItem */

let _nextId = 1305

/** Create a structured vocab entry with consistent metadata. */
export function v(word, translation, opts = {}) {
  const id = opts.id ?? _nextId++
  return {
    id,
    word,
    translation,
    category: opts.category ?? 'daily-life',
    difficulty: opts.difficulty ?? 'easy',
    gender: opts.gender ?? null,
    plural: opts.plural ?? null,
    tags: opts.tags ?? [],
    frequencyRank: opts.frequencyRank ?? id,
    pronunciation: opts.pronunciation ?? null,
    conjugationGroup: opts.conjugationGroup ?? null,
    relatedWords: opts.relatedWords ?? [],
    exampleUsage: opts.exampleUsage ?? null,
  }
}

export function setBatchStartId(n) {
  _nextId = n
}
