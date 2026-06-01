import EpiphanyLogo from './EpiphanyLogo'

const HUB_CARDS = [
  {
    id: 'learn',
    emoji: '📚',
    title: 'Learn',
    description:
      'Grammar, syntax, conjugations, and guided lessons with tables, deep dives, and progressive quizzes.',
    features: ['Learning path', 'Grammar tables', 'Mastery quizzes'],
  },
  {
    id: 'practice',
    emoji: '🃏',
    title: 'Practice',
    description:
      'Flashcards, challenge mode, pronunciation, and vocabulary drills to reinforce what you know.',
    features: ['Study & challenge', 'Picture mode', 'Pronunciation'],
  },
]

export default function HomePage({ onLearn, onPractice }) {
  return (
    <div className="home home--landing">
      <header className="home__hero">
        <EpiphanyLogo variant="hero" />
        <p className="home__subtitle">
          Understand Greek grammar — then practice until it sticks.
        </p>
      </header>

      <nav className="hub" aria-label="Choose your path">
        {HUB_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`hub-card hub-card--${card.id}`}
            onClick={card.id === 'learn' ? onLearn : onPractice}
          >
            <span className="hub-card__emoji" aria-hidden="true">
              {card.emoji}
            </span>
            <span className="hub-card__title">{card.title}</span>
            <p className="hub-card__desc">{card.description}</p>
            <ul className="hub-card__features">
              {card.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <span className="hub-card__action">
              Open {card.title.toLowerCase()} →
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}
