import { getTopicById, getLessonsForTopic } from '@/features/learn/data'
import { getQuizProfile, MASTERY_LEVELS } from '@/features/learn/data/quiz'
import { useMasteryProgress } from '@/features/learn/hooks/useMasteryProgress'
import LessonCard from './LessonCard'

export default function TopicScreen({
  topicId,
  onBack,
  onOpenLesson,
  onStartMastery,
}) {
  const topic = getTopicById(topicId)
  const lessons = getLessonsForTopic(topicId)
  const profile = getQuizProfile(topicId)
  const { progress, weakPatterns, isLevelUnlocked } = useMasteryProgress(topicId)

  if (!topic) {
    return (
      <div className="topic">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Learn
        </button>
        <p className="empty-state">Topic not found.</p>
      </div>
    )
  }

  return (
    <div className="topic">
      <header className="topic__header">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Learn
        </button>
        <h1 className="topic__title">{topic.label}</h1>
        <p className="topic__desc">{topic.description}</p>

        {profile ? (
          <div className="topic__mastery">
            <div
              className="session-score-ring topic__mastery-ring"
              style={{ '--score': progress.masteryPercent }}
              aria-label={`Mastery ${progress.masteryPercent}%`}
            >
              <span className="session-score-ring__value">
                {progress.masteryPercent}%
              </span>
              <span className="session-score-ring__label">Mastery</span>
            </div>
            {weakPatterns.length ? (
              <div className="topic__weak">
                <p className="topic__weak-title">Practice more:</p>
                <ul className="topic__weak-list">
                  {weakPatterns.map(({ tag, count }) => (
                    <li key={tag}>
                      <span className="topic__weak-tag">{tag}</span>
                      <span className="topic__weak-count">×{count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </header>

      {lessons.length ? (
        <section className="topic__section" aria-labelledby="topic-lessons">
          <h2 id="topic-lessons" className="learn__section-title">
            Lessons
          </h2>
          <div className="learn__list">
            {lessons.map((lesson, i) => (
              <LessonCard
                key={lesson.id}
                badge={`${i + 1}`}
                title={lesson.title}
                summary={lesson.summary}
                duration={lesson.duration}
                onClick={() => onOpenLesson(lesson.id)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {profile ? (
        <section className="topic__section" aria-labelledby="topic-quiz">
          <h2 id="topic-quiz" className="learn__section-title">
            Quiz yourself
          </h2>
          <p className="learn__section-desc">
            Progressive levels — unlock the next by passing each stage.
          </p>
          <div className="mastery-levels">
            {MASTERY_LEVELS.map((level) => {
              const unlocked = isLevelUnlocked(level.id)
              const stats = progress.levels[level.id]
              const accuracy =
                stats?.attempts > 0
                  ? Math.round((stats.correct / stats.attempts) * 100)
                  : null

              return (
                <button
                  key={level.id}
                  type="button"
                  className={`mastery-level${unlocked ? '' : ' mastery-level--locked'}`}
                  disabled={!unlocked}
                  onClick={() => onStartMastery(level.id)}
                >
                  <span className="mastery-level__num">Level {level.id}</span>
                  <span className="mastery-level__label">{level.label}</span>
                  <span className="mastery-level__desc">{level.description}</span>
                  {accuracy !== null ? (
                    <span className="mastery-level__stat">{accuracy}% accuracy</span>
                  ) : (
                    <span className="mastery-level__stat">
                      {level.questionsPerSession} questions
                    </span>
                  )}
                  {!unlocked ? (
                    <span className="mastery-level__lock">Locked</span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </section>
      ) : (
        <p className="empty-state">Quizzes coming soon for this topic.</p>
      )}
    </div>
  )
}
