import {
  DEFAULT_PRACTICE_CONFIG,
  DICTATION_LEVELS,
  GRAMMAR_PRACTICE_TOPICS,
  HOME_DIFFICULTIES,
  HOME_TOPICS,
  MASTERY_LEVEL_OPTIONS,
} from '@/features/practice/data/config'
import {
  LEARNING_STYLES,
  STUDY_DIRECTIONS,
} from '@/data/constants'
import { getActivityMeta } from '@/features/practice/data/modes'
import { getAggregatedWeakSpots, useAllMasteryProgress } from '@/features/learn/hooks/useMasteryProgress'
import { topicToFilter } from '@/data/homeConfig'
import { filterVocabulary } from '@/data'
import ConfigGroup, { ConfigOption } from '@/shared/components/ConfigGroup'
import EpiphanyLogo from '@/shared/components/EpiphanyLogo'

const QUICK_SOURCES = [
  { id: 'grammar', label: 'Grammar drills' },
  { id: 'vocabulary', label: 'Vocabulary sprint' },
]

export default function PracticeConfigScreen({
  config,
  onChange,
  onStart,
  onBack,
}) {
  const activity = getActivityMeta(config.activityMode)
  const allProgress = useAllMasteryProgress()
  const weakSpots = getAggregatedWeakSpots(allProgress)

  const vocabPool = filterVocabulary({
    category: topicToFilter(config.topic),
    difficulty: config.difficulty,
  }).length

  const canStart = (() => {
    switch (config.activityMode) {
      case 'flashcards':
      case 'quick-challenge':
        if (config.quickChallengeSource === 'vocabulary' || config.activityMode === 'flashcards') {
          return vocabPool > 0
        }
        return true
      case 'dictation':
        return true
      case 'weak-spot':
        return weakSpots.length > 0
      default:
        return true
    }
  })()

  return (
    <div className="home home--practice">
      <header className="home__hero home__hero--compact">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Practice modes
        </button>
        <EpiphanyLogo variant="compact" showVersion={false} />
        <h1 className="practice__title">
          <span className="practice__emoji" aria-hidden="true">
            {activity?.emoji ?? '🃏'}
          </span>{' '}
          {activity?.title ?? 'Practice'}
        </h1>
        <p className="home__subtitle">{activity?.description}</p>
      </header>

      <section className="home__config" aria-label="Session settings">
        {config.activityMode === 'flashcards' ? (
          <>
            <ConfigGroup label="Translation direction" columns={2}>
              {STUDY_DIRECTIONS.map((d) => (
                <ConfigOption
                  key={d.id}
                  selected={config.studyDirection === d.id}
                  onClick={() => onChange({ studyDirection: d.id })}
                >
                  {d.label}
                </ConfigOption>
              ))}
            </ConfigGroup>

            <ConfigGroup label="Difficulty" columns={3}>
              {HOME_DIFFICULTIES.map((d) => (
                <ConfigOption
                  key={d.id}
                  selected={config.difficulty === d.id}
                  onClick={() => onChange({ difficulty: d.id })}
                >
                  {d.label}
                </ConfigOption>
              ))}
            </ConfigGroup>

            <ConfigGroup label="Topic" columns={3}>
              {HOME_TOPICS.map((t) => (
                <ConfigOption
                  key={t.id}
                  selected={config.topic === t.id}
                  onClick={() => onChange({ topic: t.id })}
                >
                  {t.label}
                </ConfigOption>
              ))}
            </ConfigGroup>

            <ConfigGroup label="Learning style" columns={2}>
              {LEARNING_STYLES.map((s) => (
                <ConfigOption
                  key={s.id}
                  selected={config.learningStyle === s.id}
                  onClick={() => onChange({ learningStyle: s.id })}
                >
                  {s.id === 'word' ? 'Word mode' : 'Picture mode'}
                </ConfigOption>
              ))}
            </ConfigGroup>
          </>
        ) : null}

        {config.activityMode === 'typing' ||
        (config.activityMode === 'quick-challenge' &&
          config.quickChallengeSource === 'grammar') ? (
          <>
            <ConfigGroup label="Grammar topic" columns={2}>
              {GRAMMAR_PRACTICE_TOPICS.map((t) => (
                <ConfigOption
                  key={t.id}
                  selected={config.grammarTopic === t.id}
                  onClick={() => onChange({ grammarTopic: t.id })}
                >
                  {t.label}
                </ConfigOption>
              ))}
            </ConfigGroup>

            <ConfigGroup label="Question depth" columns={2}>
              {MASTERY_LEVEL_OPTIONS.map((l) => (
                <ConfigOption
                  key={l.id}
                  selected={config.masteryLevel === l.id}
                  onClick={() => onChange({ masteryLevel: l.id })}
                >
                  {l.label}
                </ConfigOption>
              ))}
            </ConfigGroup>
          </>
        ) : null}

        {config.activityMode === 'quick-challenge' ? (
          <ConfigGroup label="Challenge type" columns={2}>
            {QUICK_SOURCES.map((s) => (
              <ConfigOption
                key={s.id}
                selected={config.quickChallengeSource === s.id}
                onClick={() => onChange({ quickChallengeSource: s.id })}
              >
                {s.label}
              </ConfigOption>
            ))}
          </ConfigGroup>
        ) : null}

        {config.activityMode === 'quick-challenge' &&
        config.quickChallengeSource === 'vocabulary' ? (
          <>
            <ConfigGroup label="Difficulty" columns={3}>
              {HOME_DIFFICULTIES.map((d) => (
                <ConfigOption
                  key={d.id}
                  selected={config.difficulty === d.id}
                  onClick={() => onChange({ difficulty: d.id })}
                >
                  {d.label}
                </ConfigOption>
              ))}
            </ConfigGroup>

            <ConfigGroup label="Topic" columns={3}>
              {HOME_TOPICS.map((t) => (
                <ConfigOption
                  key={t.id}
                  selected={config.topic === t.id}
                  onClick={() => onChange({ topic: t.id })}
                >
                  {t.label}
                </ConfigOption>
              ))}
            </ConfigGroup>
          </>
        ) : null}

        {config.activityMode === 'dictation' ? (
          <>
            <ConfigGroup label="Listening level" columns={1}>
              {DICTATION_LEVELS.map((l) => (
                <ConfigOption
                  key={l.id}
                  selected={config.dictationLevel === l.id}
                  onClick={() => onChange({ dictationLevel: l.id })}
                >
                  <span className="config-option__title">{l.label}</span>
                  <span className="config-option__hint">{l.hint}</span>
                </ConfigOption>
              ))}
            </ConfigGroup>

            <ConfigGroup label="Vocabulary filter (beginner)" columns={3}>
              {HOME_DIFFICULTIES.map((d) => (
                <ConfigOption
                  key={d.id}
                  selected={config.difficulty === d.id}
                  onClick={() => onChange({ difficulty: d.id })}
                >
                  {d.label}
                </ConfigOption>
              ))}
            </ConfigGroup>
          </>
        ) : null}

        {config.activityMode === 'sentence-builder' ? (
          <p className="practice-config__note">
            Build Greek sentences from shuffled words — articles, verb agreement,
            and natural word order.
          </p>
        ) : null}

        {config.activityMode === 'weak-spot' ? (
          <div className="weak-spot-preview">
            {weakSpots.length ? (
              <>
                <p className="practice-config__note">
                  Targeted drills based on your near misses and wrong answers
                  from lessons and practice.
                </p>
                <ul className="weak-spot-preview__list">
                  {weakSpots.map((spot) => (
                    <li key={`${spot.topicId}-${spot.patternTag}`}>
                      <strong>{spot.patternTag}</strong>
                      <span className="weak-spot-preview__count">
                        {spot.count}× missed
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="home__warning" role="alert">
                No weak spots tracked yet. Complete grammar lessons or typing
                practice first — mistakes will appear here for targeted review.
              </p>
            )}
          </div>
        ) : null}
      </section>

      <footer className="home__footer">
        {!canStart ? (
          <p className="home__warning" role="alert">
            {config.activityMode === 'weak-spot'
              ? 'Practice other modes or complete lessons to unlock adaptive drills.'
              : 'No content matches these settings. Try another combination.'}
          </p>
        ) : null}

        <button
          type="button"
          className="btn btn--start"
          disabled={!canStart}
          onClick={onStart}
        >
          Start session
        </button>
      </footer>
    </div>
  )
}

export { DEFAULT_PRACTICE_CONFIG }
