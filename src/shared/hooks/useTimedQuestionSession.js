import { useCallback, useEffect, useRef, useState } from 'react'
import {
  emptyPracticeStats,
  recordPracticeStat,
  scorePercent,
} from '@/shared/quiz/practiceStats'

/**
 * Shared timed question session lifecycle for grammar practice modes.
 * Deck is snapshotted at session start — mastery updates mid-session do not reset progress.
 */
export function useTimedQuestionSession({ buildDeck, enabled, resetKey }) {
  const [roundId, setRoundId] = useState(0)
  const [index, setIndex] = useState(0)
  const [deck, setDeck] = useState([])
  const [complete, setComplete] = useState(false)
  const [stats, setStats] = useState(() => emptyPracticeStats(true))
  const [questionStartedAt, setQuestionStartedAt] = useState(Date.now())
  const lastDeckRef = useRef([])
  const buildDeckRef = useRef(buildDeck)
  buildDeckRef.current = buildDeck

  const startSession = useCallback((reuseDeck = null) => {
    const nextDeck = reuseDeck ?? buildDeckRef.current()
    lastDeckRef.current = nextDeck
    setDeck(nextDeck)
    setIndex(0)
    setComplete(false)
    setStats(emptyPracticeStats(true))
    setQuestionStartedAt(Date.now())
  }, [])

  useEffect(() => {
    if (!enabled) {
      setDeck([])
      setIndex(0)
      setComplete(false)
      setStats(emptyPracticeStats(true))
      return
    }
    startSession()
  }, [enabled, resetKey, roundId, startSession])

  const question = !enabled || complete ? null : (deck[index] ?? null)
  const total = deck.length
  const position = total ? index + 1 : 0
  const progress = total ? (position / total) * 100 : 0

  function recordAnswer(type) {
    const elapsed = Date.now() - questionStartedAt
    recordPracticeStat(setStats, type, elapsed)
  }

  function nextQuestion() {
    if (index + 1 >= deck.length) {
      setComplete(true)
    } else {
      setIndex((i) => i + 1)
      setQuestionStartedAt(Date.now())
    }
  }

  function newSession() {
    setRoundId((id) => id + 1)
  }

  function retrySession() {
    startSession(lastDeckRef.current)
  }

  const answered =
    stats.correct + stats.nearMiss + stats.incorrect + stats.skipped
  const avgMs = answered ? Math.round(stats.totalMs / answered) : 0

  return {
    question,
    deck,
    index,
    total,
    position,
    progress,
    complete,
    stats,
    avgMs,
    scorePercent: scorePercent(stats, total),
    recordAnswer,
    nextQuestion,
    newSession,
    retrySession,
    isEmpty: enabled && deck.length === 0,
  }
}
