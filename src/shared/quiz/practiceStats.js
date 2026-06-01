/** Shared practice session statistics — used across quiz/practice modes. */

export function emptyPracticeStats(includeTiming = false) {
  const base = {
    correct: 0,
    nearMiss: 0,
    incorrect: 0,
    skipped: 0,
    streak: 0,
    bestStreak: 0,
  }
  return includeTiming ? { ...base, totalMs: 0 } : base
}

/**
 * @param {React.Dispatch<React.SetStateAction<object>>} setStats
 * @param {'correct' | 'nearMiss' | 'incorrect' | 'skipped'} type
 * @param {number} [elapsedMs]
 */
export function recordPracticeStat(setStats, type, elapsedMs = 0) {
  setStats((prev) => {
    const base = { ...prev, totalMs: (prev.totalMs ?? 0) + elapsedMs }

    if (type === 'correct') {
      const streak = prev.streak + 1
      return {
        ...base,
        correct: prev.correct + 1,
        streak,
        bestStreak: Math.max(prev.bestStreak, streak),
      }
    }
    if (type === 'nearMiss') {
      return { ...base, nearMiss: prev.nearMiss + 1, streak: 0 }
    }
    if (type === 'incorrect') {
      return { ...base, incorrect: prev.incorrect + 1, streak: 0 }
    }
    return { ...base, skipped: prev.skipped + 1, streak: 0 }
  })
}

/** Vocab challenge stats (no timing field). */
export function recordChallengeStat(setStats, type) {
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

export function scorePercent(stats, total) {
  if (!total) return 0
  return Math.round((stats.correct / total) * 100)
}
