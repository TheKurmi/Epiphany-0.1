import { useEffect, useMemo, useState } from 'react'
import { filterVocabulary, shuffleDeck } from '@/data'

export function useDeck({ category, difficulty, enabled = true, resetKey = 0 }) {
  const [index, setIndex] = useState(0)
  const [deck, setDeck] = useState([])

  const pool = useMemo(
    () => filterVocabulary({ category, difficulty }),
    [category, difficulty],
  )

  useEffect(() => {
    if (!enabled) {
      setDeck([])
      setIndex(0)
      return
    }
    setDeck(shuffleDeck(pool))
    setIndex(0)
  }, [pool, enabled, resetKey])

  const card = enabled ? (deck[index] ?? null) : null

  function nextCard() {
    setIndex((i) => (deck.length ? (i + 1) % deck.length : 0))
  }

  return {
    card,
    deck,
    index,
    nextCard,
    progress: deck.length ? ((index + 1) / deck.length) * 100 : 0,
    position: deck.length ? index + 1 : 0,
    total: deck.length,
    isEmpty: enabled && pool.length === 0,
  }
}
