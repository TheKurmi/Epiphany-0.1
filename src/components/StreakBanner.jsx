import { STREAK_CELEBRATION } from '../data/constants'

export default function StreakBanner({ streak, bestStreak }) {
  const nearGoal =
    streak > 0 && streak < STREAK_CELEBRATION && streak >= STREAK_CELEBRATION - 3

  return (
    <div className={`streak-banner${nearGoal ? ' streak-banner--pulse' : ''}`}>
      <div className="streak-banner__main">
        <span className="streak-banner__label">Round streak</span>
        <span className="streak-banner__value">{streak}</span>
        <span className="streak-banner__fire" aria-hidden="true">
          🔥
        </span>
      </div>
      <div className="streak-banner__meta">
        <span>Best: {bestStreak}</span>
        <span>Goal: {STREAK_CELEBRATION} correct</span>
      </div>
      {streak >= STREAK_CELEBRATION ? (
        <p className="streak-banner__celebrate">On fire this round!</p>
      ) : null}
    </div>
  )
}
