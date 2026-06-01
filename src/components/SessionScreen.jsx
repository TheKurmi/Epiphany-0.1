import ProgressBar from './ProgressBar'
import StreakBanner from './StreakBanner'
import StudyMode from './StudyMode'
import ChallengeMode from './ChallengeMode'
import SessionComplete from './SessionComplete'
import { getCategoryLabel } from '../data'
import EpiphanyLogo from './EpiphanyLogo'

export default function SessionScreen({
  config,
  study,
  challenge,
  studyReviewed,
  celebration,
  showPronunciation,
  onExit,
  onReturnToStudy,
  onChallengeAnswer,
  onStudyReviewed,
}) {
  const isChallenge = config.practiceMode === 'challenge'
  const topicLabel = getCategoryLabel(
    config.topic === 'mixed' ? 'all' : config.topic,
  )

  const progressConfig = isChallenge
    ? challenge.complete
      ? null
      : {
          title: 'Challenge progress',
          detail: `Card ${challenge.position} / ${challenge.total}`,
          value: challenge.progress,
        }
    : {
        title: "Today's practice",
        detail:
          studyReviewed > 0
            ? `${studyReviewed} words practiced`
            : 'Flip cards to begin',
        value:
          studyReviewed > 0
            ? Math.min(100, ((studyReviewed % 10) || 10) * 10)
            : 0,
      }

  return (
    <div className="session">
      <header className="session-header">
        <button type="button" className="btn btn--back" onClick={onExit}>
          ← Practice
        </button>
        <div className="session-header__meta">
          <EpiphanyLogo variant="compact" showVersion={false} />
          <h2 className="session-header__title">
            {isChallenge ? 'Challenge' : 'Study'}
          </h2>
          <p className="session-header__detail">
            {topicLabel} · {config.difficulty}
          </p>
        </div>
        {isChallenge && !challenge.complete ? (
          <div className="header-stats session-header__stats">
            <span className="stat-chip stat-chip--good">
              ✓ {challenge.stats.correct}
            </span>
            <span className="stat-chip stat-chip--near-miss">
              ⚠ {challenge.stats.nearMiss}
            </span>
            <span className="stat-chip stat-chip--bad">
              ✗ {challenge.stats.incorrect}
            </span>
            <span className="stat-chip stat-chip--skipped">
              ↷ {challenge.stats.skipped}
            </span>
          </div>
        ) : (
          <div className="session-header__spacer" />
        )}
      </header>

      <main className="session-main">
        {progressConfig ? (
          <ProgressBar
            title={progressConfig.title}
            detail={progressConfig.detail}
            value={progressConfig.value}
          />
        ) : null}

        {isChallenge && !challenge.complete ? (
          <StreakBanner
            streak={challenge.stats.streak}
            bestStreak={challenge.stats.bestStreak}
          />
        ) : null}

        {celebration ? (
          <p className="celebration-toast" role="status">
            {celebration}
          </p>
        ) : null}

        {!isChallenge && !study.card ? (
          <p className="empty-state">
            Nothing to practice with these settings.{' '}
            <button type="button" className="link-btn" onClick={onExit}>
              Change practice settings
            </button>
          </p>
        ) : null}

        {isChallenge && challenge.isEmpty ? (
          <p className="empty-state">
            Nothing to practice with these settings.{' '}
            <button type="button" className="link-btn" onClick={onExit}>
              Change practice settings
            </button>
          </p>
        ) : null}

        {!isChallenge && study.card ? (
          <StudyMode
            card={study.card}
            studyDirection={config.studyDirection}
            learningStyle={config.learningStyle}
            showPronunciation={showPronunciation}
            onNext={study.nextCard}
            onReviewed={onStudyReviewed}
          />
        ) : null}

        {isChallenge && challenge.complete ? (
          <SessionComplete
            stats={challenge.stats}
            total={challenge.total}
            scorePercent={challenge.scorePercent}
            onRetry={challenge.retrySession}
            onNewSession={challenge.newSession}
            onReturnToStudy={onReturnToStudy}
          />
        ) : null}

        {isChallenge && challenge.card && !challenge.complete ? (
          <ChallengeMode
            card={challenge.card}
            studyDirection={config.studyDirection}
            learningStyle={config.learningStyle}
            showPronunciation={showPronunciation}
            onNext={challenge.nextCard}
            onAnswer={onChallengeAnswer}
            isLastCard={challenge.position >= challenge.total}
          />
        ) : null}
      </main>
    </div>
  )
}
