import EpiphanyLogo from '@/shared/components/EpiphanyLogo'
import { PRACTICE_ACTIVITIES } from '@/features/practice/data/modes'

export default function PracticeHub({ onSelectMode, onBack }) {
  return (
    <div className="home home--practice">
      <header className="home__hero home__hero--compact">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Home
        </button>
        <EpiphanyLogo variant="compact" showVersion={false} />
        <h1 className="practice__title">
          <span className="practice__emoji" aria-hidden="true">
            🃏
          </span>{' '}
          Practice
        </h1>
        <p className="home__subtitle">
          Reinforce what you learn — flashcards, typing, listening, and
          adaptive drills.
        </p>
      </header>

      <nav className="hub hub--practice" aria-label="Practice modes">
        {PRACTICE_ACTIVITIES.map((mode) => (
          <button
            key={mode.id}
            type="button"
            className={`hub-card hub-card--practice-mode hub-card--${mode.id}`}
            onClick={() => onSelectMode(mode.id)}
          >
            <span className="hub-card__emoji" aria-hidden="true">
              {mode.emoji}
            </span>
            <span className="hub-card__title">{mode.title}</span>
            <p className="hub-card__desc">{mode.description}</p>
            <ul className="hub-card__features">
              {mode.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <span className="hub-card__action">Start →</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
