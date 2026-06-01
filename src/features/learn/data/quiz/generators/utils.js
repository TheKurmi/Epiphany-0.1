export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function uniqueOptions(correct, pool, count = 3) {
  const options = new Set([correct])
  for (const item of shuffle(pool)) {
    if (options.size >= count) break
    if (item !== correct) options.add(item)
  }
  while (options.size < count && pool.length) {
    options.add(pick(pool))
  }
  return shuffle([...options])
}

/** @returns {import('../index').GeneratedQuestion} */
export function makeQuestion(fields) {
  return {
    id: `${fields.patternTag ?? 'q'}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...fields,
  }
}
