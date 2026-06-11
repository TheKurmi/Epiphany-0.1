import EpiphanyLogo from '@/shared/components/EpiphanyLogo'
import ProgressDashboard from './ProgressDashboard'
import VocabularyTest from '@/VocabularyTest'

const HUB_CARDS = [
  {
    id: 'learn',
    emoji: '📚',
    title: 'Learn',
    description:
      'Grammar, syntax, conjugations, and guided lessons with tables, deep dives, and progressive mastery quizzes.',
    features: ['Learning path', 'Grammar tables', 'Mastery levels'],
    handler: 'onLearn',
  },
  {
    id: 'practice',
    emoji: '🃏',
    title: 'Practice',
    description:
      'Flashcards, typing, dictation, sentence building, and weak-spot drills to reinforce what you know.',
    features: ['6 practice modes', 'Adaptive review', 'Pronunciation'],
    handler: 'onPractice',
  },
  {
    id: 'read',
    emoji: '📖',
    title: 'Read',
    description:
      'Micro stories, dialogues, and guided reading using grammar and vocabulary you have learned — build real comprehension.',
    features: ['Micro stories', 'Dialogues', 'Read & listen', 'Comprehension quizzes'],
    handler: 'onRead',
  },
]

export default function HomePage({ onLearn, onPractice, onRead, onOpenLesson }) {
  const handlers = { onLearn, onPractice, onRead }

  return (
    <div className="home home--landing">
      <header className="home__hero">
        <EpiphanyLogo variant="hero" />
        <p className="home__subtitle">
          Understand Greek grammar — practice until it sticks — read with
          confidence.
        </p>
      </header>

      <section aria-label="Vocabulary database test" style={{ padding: '0 1rem', maxWidth: '40rem', margin: '0 auto' }}>
        <VocabularyTest />
      </section>

      <ProgressDashboard
        compact
        onOpenLesson={onOpenLesson}
        onPractice={onPractice}
        onLearn={onLearn}
      />

      <nav className="hub hub--three" aria-label="Choose your path">
        {HUB_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`hub-card hub-card--${card.id}`}
            onClick={handlers[card.handler]}
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
