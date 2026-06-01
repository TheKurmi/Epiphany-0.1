import ProgressBar from '@/shared/components/ProgressBar'
import StreakBanner from './StreakBanner'
import StudyMode from './StudyMode'
import ChallengeMode from './ChallengeMode'
import SessionComplete from './SessionComplete'
import TypingPracticeMode from '@/features/practice/components/TypingPracticeMode'
import QuickChallengePracticeMode from '@/features/practice/components/QuickChallengePracticeMode'
import DictationPracticeMode from '@/features/practice/components/DictationPracticeMode'
import SentenceBuilderMode from '@/features/practice/components/SentenceBuilderMode'
import { getCategoryLabel } from '@/data'

function getActiveSession(config, sessions) {
  switch (config.activityMode) {
    case 'flashcards':
      return { type: 'flashcards', data: sessions.study }
    case 'quick-challenge':
      return config.quickChallengeSource === 'vocabulary'
        ? { type: 'vocab-challenge', data: sessions.challenge }
        : { type: 'grammar-quick', data: sessions.quickGrammar }
    case 'typing':
      return { type: 'typing', data: sessions.typing }
    case 'dictation':
      return { type: 'dictation', data: sessions.dictation }
    case 'sentence-builder':
      return { type: 'sentence-builder', data: sessions.sentenceBuilder }
    case 'weak-spot':
      return { type: 'weak-spot', data: sessions.weakSpot }
    default:
      return { type: 'flashcards', data: sessions.study }
  }
}

export default function SessionScreen({
  config,
  activityMeta,
  study,
  challenge,
  typing,
  quickGrammar,
  dictation,
  sentenceBuilder,
  weakSpot,
  studyReviewed,
  celebration,
  showPronunciation,
  onExit,
  onReturnToFlashcards,
  onPracticeAnswer,
  onStudyReviewed,
}) {
  const active = getActiveSession(config, {
    study,
    challenge,
    typing,
    quickGrammar,
    dictation,
    sentenceBuilder,
    weakSpot,
  })

  const { type, data: session } = active
  const isFlashcards = type === 'flashcards'
  const isVocabChallenge = type === 'vocab-challenge'
  const hasStats = !isFlashcards && session?.stats
  const isComplete = session?.complete
  const isEmpty = session?.isEmpty
  const showAvgSpeed = session?.avgMs > 0 && !isComplete

  const topicLabel =
    config.activityMode === 'typing' ||
    config.activityMode === 'quick-challenge' ||
    config.activityMode === 'weak-spot'
      ? config.grammarTopic?.replace(/-/g, ' ')
      : getCategoryLabel(
          config.topic === 'mixed' ? 'all' : config.topic,
        )

  const progressConfig =
    isComplete || isEmpty
      ? null
      : isFlashcards
        ? {
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
        : {
            title: `${activityMeta?.title ?? 'Practice'} progress`,
            detail: `Question ${session.position} / ${session.total}`,
            value: session.progress,
          }

  function answerHandler(source) {
    return (type) => onPracticeAnswer(type, source)
  }

  return (
    <div className="session">
      <header className="session-header">
        <button type="button" className="btn btn--back" onClick={onExit}>
          ← Practice
        </button>
        <div className="session-header__meta">
          <h2 className="session-header__title">
            {activityMeta?.emoji} {activityMeta?.title ?? 'Practice'}
          </h2>
          <p className="session-header__detail">
            {topicLabel}
            {config.dictationLevel && type === 'dictation'
              ? ` · ${config.dictationLevel}`
              : ''}
            {config.difficulty && (isFlashcards || isVocabChallenge)
              ? ` · ${config.difficulty}`
              : ''}
          </p>
        </div>
        {hasStats && !isComplete ? (
          <div className="header-stats session-header__stats">
            <span className="stat-chip stat-chip--good">
              ✓ {session.stats.correct}
            </span>
            <span className="stat-chip stat-chip--near-miss">
              ⚠ {session.stats.nearMiss}
            </span>
            <span className="stat-chip stat-chip--bad">
              ✗ {session.stats.incorrect}
            </span>
            {session.stats.skipped > 0 ? (
              <span className="stat-chip stat-chip--skipped">
                ↷ {session.stats.skipped}
              </span>
            ) : null}
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

        {hasStats && !isComplete ? (
          <StreakBanner
            streak={session.stats.streak}
            bestStreak={session.stats.bestStreak}
          />
        ) : null}

        {showAvgSpeed ? (
          <p className="session-speed" aria-live="polite">
            Avg. response: {(session.avgMs / 1000).toFixed(1)}s
          </p>
        ) : null}

        {celebration ? (
          <p className="celebration-toast" role="status">
            {celebration}
          </p>
        ) : null}

        {isEmpty ? (
          <p className="empty-state">
            Nothing to practice with these settings.{' '}
            <button type="button" className="link-btn" onClick={onExit}>
              Change practice settings
            </button>
          </p>
        ) : null}

        {isFlashcards && !study.card && !isEmpty ? (
          <p className="empty-state">
            Nothing to practice with these settings.{' '}
            <button type="button" className="link-btn" onClick={onExit}>
              Change practice settings
            </button>
          </p>
        ) : null}

        {isFlashcards && study.card ? (
          <StudyMode
            card={study.card}
            studyDirection={config.studyDirection}
            learningStyle={config.learningStyle}
            showPronunciation={showPronunciation}
            onNext={study.nextCard}
            onReviewed={onStudyReviewed}
          />
        ) : null}

        {isVocabChallenge && isComplete ? (
          <SessionComplete
            stats={challenge.stats}
            total={challenge.total}
            scorePercent={challenge.scorePercent}
            onRetry={challenge.retrySession}
            onNewSession={challenge.newSession}
            onReturnToStudy={onReturnToFlashcards}
            unitLabel="questions"
          />
        ) : null}

        {isVocabChallenge && challenge.card && !isComplete ? (
          <ChallengeMode
            card={challenge.card}
            studyDirection={config.studyDirection}
            learningStyle={config.learningStyle}
            showPronunciation={showPronunciation}
            onNext={challenge.nextCard}
            onAnswer={answerHandler(challenge)}
            isLastCard={challenge.position >= challenge.total}
          />
        ) : null}

        {type === 'typing' && isComplete ? (
          <SessionComplete
            stats={typing.stats}
            total={typing.total}
            scorePercent={typing.scorePercent}
            avgMs={typing.avgMs}
            onRetry={typing.retrySession}
            onNewSession={typing.newSession}
            onReturnToStudy={onReturnToFlashcards}
            unitLabel="questions"
          />
        ) : null}

        {type === 'typing' && typing.question && !isComplete ? (
          <TypingPracticeMode
            question={typing.question}
            topicId={config.grammarTopic}
            showPronunciation={showPronunciation}
            onAnswer={answerHandler(typing)}
            onNext={typing.nextQuestion}
            isLast={typing.position >= typing.total}
          />
        ) : null}

        {type === 'grammar-quick' && isComplete ? (
          <SessionComplete
            stats={quickGrammar.stats}
            total={quickGrammar.total}
            scorePercent={quickGrammar.scorePercent}
            avgMs={quickGrammar.avgMs}
            onRetry={quickGrammar.retrySession}
            onNewSession={quickGrammar.newSession}
            onReturnToStudy={onReturnToFlashcards}
            unitLabel="questions"
          />
        ) : null}

        {type === 'grammar-quick' && quickGrammar.question && !isComplete ? (
          <QuickChallengePracticeMode
            question={quickGrammar.question}
            topicId={config.grammarTopic}
            showPronunciation={showPronunciation}
            onAnswer={answerHandler(quickGrammar)}
            onNext={quickGrammar.nextQuestion}
            isLast={quickGrammar.position >= quickGrammar.total}
          />
        ) : null}

        {type === 'dictation' && isComplete ? (
          <SessionComplete
            stats={dictation.stats}
            total={dictation.total}
            scorePercent={dictation.scorePercent}
            onRetry={dictation.retrySession}
            onNewSession={dictation.newSession}
            onReturnToStudy={onReturnToFlashcards}
            unitLabel="items"
          />
        ) : null}

        {type === 'dictation' && dictation.item && !isComplete ? (
          <DictationPracticeMode
            item={dictation.item}
            dictationLevel={config.dictationLevel}
            showPronunciation={showPronunciation}
            onAnswer={answerHandler(dictation)}
            onNext={dictation.nextItem}
            isLast={dictation.position >= dictation.total}
          />
        ) : null}

        {type === 'sentence-builder' && isComplete ? (
          <SessionComplete
            stats={sentenceBuilder.stats}
            total={sentenceBuilder.total}
            scorePercent={sentenceBuilder.scorePercent}
            onRetry={sentenceBuilder.retrySession}
            onNewSession={sentenceBuilder.newSession}
            onReturnToStudy={onReturnToFlashcards}
            unitLabel="sentences"
          />
        ) : null}

        {type === 'sentence-builder' &&
        sentenceBuilder.puzzle &&
        !isComplete ? (
          <SentenceBuilderMode
            puzzle={sentenceBuilder.puzzle}
            showPronunciation={showPronunciation}
            onAnswer={answerHandler(sentenceBuilder)}
            onNext={sentenceBuilder.nextPuzzle}
            isLast={sentenceBuilder.position >= sentenceBuilder.total}
          />
        ) : null}

        {type === 'weak-spot' && isComplete ? (
          <SessionComplete
            stats={weakSpot.stats}
            total={weakSpot.total}
            scorePercent={weakSpot.scorePercent}
            avgMs={weakSpot.avgMs}
            onRetry={weakSpot.retrySession}
            onNewSession={weakSpot.newSession}
            onReturnToStudy={onReturnToFlashcards}
            unitLabel="questions"
          />
        ) : null}

        {type === 'weak-spot' && weakSpot.question && !isComplete ? (
          <>
            {weakSpot.weakSpots?.length ? (
              <p className="weak-spot-session__focus">
                🎯 Focusing on:{' '}
                <strong>{weakSpot.weakSpots[0].patternTag}</strong>
              </p>
            ) : null}
            <TypingPracticeMode
              question={weakSpot.question}
              topicId={
                weakSpot.question.topicId ?? weakSpot.weakSpots[0]?.topicId
              }
              showPronunciation={showPronunciation}
              onAnswer={answerHandler(weakSpot)}
              onNext={weakSpot.nextQuestion}
              isLast={weakSpot.position >= weakSpot.total}
            />
          </>
        ) : null}
      </main>
    </div>
  )
}
