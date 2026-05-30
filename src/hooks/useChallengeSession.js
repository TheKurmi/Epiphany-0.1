import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { filterVocabulary, shuffleDeck } from '../data'
import { CHALLENGE_SESSION_SIZE } from '../data/constants'

const emptyStats = () => ({
  correct: 0,
  incorrect: 0,
  skipped: 0,
  streak: 0,
  bestStreak: 0,
})

export function useChallengeSession({
  category,
  difficulty,
  enabled = true,
  resetKey = 0,
}) {
  const [roundId, setRoundId] = useState(0)
  const [index, setIndex] = useState(0)
  const [deck, setDeck] = useState([])
  const [complete, setComplete] = useState(false)
  const [stats, setStats] = useState(emptyStats)
  const lastDeckRef = useRef([])

  const pool = useMemo(
    () => filterVocabulary({ category, difficulty }),
    [category, difficulty],
  )

  const buildDeck = useCallback(() => {
    const shuffled = shuffleDeck(pool)
    const size = Math.min(CHALLENGE_SESSION_SIZE, shuffled.length)
    return shuffled.slice(0, size)
  }, [pool])

  const startSession = useCallback(
    (reuseDeck = null) => {
      const nextDeck = reuseDeck ?? buildDeck()
      lastDeckRef.current = nextDeck
      setDeck(nextDeck)
      setIndex(0)
      setComplete(false)
      setStats(emptyStats())
    },
    [buildDeck],
  )

  useEffect(() => {
    if (!enabled) {
      setDeck([])
      setIndex(0)
      setComplete(false)
      setStats(emptyStats())
      return
    }
    startSession()
  }, [enabled, resetKey, roundId, startSession])

  const card = !enabled || complete ? null : (deck[index] ?? null)
  const total = deck.length
  const position = total ? index + 1 : 0
  const progress = total ? (position / total) * 100 : 0

  function recordAnswer(type) {
    setStats((prev) => {
      if (type === 'correct') {
        const streak = prev.streak + 1
        return {
          ...prev,
          correct: prev.correct + 1,
          streak,
          bestStreak: Math.max(prev.bestStreak, streak),
        }
      }
      if (type === 'incorrect') {
        return {
          ...prev,
          incorrect: prev.incorrect + 1,
          streak: 0,
        }
      }
      return {
        ...prev,
        skipped: prev.skipped + 1,
        streak: 0,
      }
    })
  }

  function nextCard() {
    if (index + 1 >= deck.length) {
      setComplete(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  function newSession() {
    setRoundId((id) => id + 1)
  }

  function retrySession() {
    startSession(lastDeckRef.current)
  }

  const scorePercent =
    total === 0 ? 0 : Math.round((stats.correct / total) * 100)

  return {
    card,
    deck,
    index,
    total,
    position,
    progress,
    complete,
    stats,
    scorePercent,
    recordAnswer,
    nextCard,
    newSession,
    retrySession,
    isEmpty: enabled && pool.length === 0,
  }
}
