import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { topicToFilter } from '@/data/homeConfig'
import { getDictationPool } from '@/features/practice/data/dictationPools'
import { shuffleDeck } from '@/data'
import { emptyPracticeStats } from '@/shared/quiz/practiceStats'

const SESSION_SIZE = 10

export function useDictationSession({
  dictationLevel,
  topic,
  difficulty,
  enabled,
  resetKey,
}) {
  const [roundId, setRoundId] = useState(0)
  const [index, setIndex] = useState(0)
  const [deck, setDeck] = useState([])
  const [complete, setComplete] = useState(false)
  const [stats, setStats] = useState(emptyPracticeStats)
  const lastDeckRef = useRef([])

  const pool = useMemo(
    () =>
      getDictationPool(dictationLevel, {
        category: topicToFilter(topic),
        difficulty,
      }),
    [dictationLevel, topic, difficulty],
  )

  const buildDeck = useCallback(() => {
    const shuffled = shuffleDeck(pool)
    return shuffled.slice(0, Math.min(SESSION_SIZE, shuffled.length))
  }, [pool])

  const startSession = useCallback(
    (reuseDeck = null) => {
      const nextDeck = reuseDeck ?? buildDeck()
      lastDeckRef.current = nextDeck
      setDeck(nextDeck)
      setIndex(0)
      setComplete(false)
      setStats(emptyPracticeStats())
    },
    [buildDeck],
  )

  useEffect(() => {
    if (!enabled) {
      setDeck([])
      setIndex(0)
      setComplete(false)
      setStats(emptyPracticeStats())
      return
    }
    startSession()
  }, [enabled, resetKey, roundId, startSession])

  const item = !enabled || complete ? null : (deck[index] ?? null)
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
      if (type === 'nearMiss') {
        return { ...prev, nearMiss: prev.nearMiss + 1, streak: 0 }
      }
      if (type === 'incorrect') {
        return { ...prev, incorrect: prev.incorrect + 1, streak: 0 }
      }
      return { ...prev, skipped: prev.skipped + 1, streak: 0 }
    })
  }

  function nextItem() {
    if (index + 1 >= deck.length) setComplete(true)
    else setIndex((i) => i + 1)
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
    item,
    total,
    position,
    progress,
    complete,
    stats,
    scorePercent,
    recordAnswer,
    nextItem,
    newSession,
    retrySession,
    isEmpty: enabled && pool.length === 0,
  }
}
