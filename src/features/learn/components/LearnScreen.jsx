import {
  getPathLessonsByLevel,
  getTopicsByLevel,
  getLessonById,
} from '@/features/learn/data'
import { LEARNING_PATH } from '@/features/learn/data/path'
import { getRecommendedNextLesson } from '@/features/learn/data/curriculum'
import { getUnlockHint } from '@/features/learn/data/unlocks'
import { isLessonUnlocked } from '@/app/access'
import { useLearningProgress } from '@/shared/hooks/useLearningProgress'
import {
  getAggregatedWeakSpots,
  useAllMasteryProgress,
} from '@/features/learn/hooks/useMasteryProgress'
import EpiphanyLogo from '@/shared/components/EpiphanyLogo'
import SmartRecommendations from '@/shared/components/SmartRecommendations'
import GuidedPathsPanel from './GuidedPathsPanel'
import LessonCard from './LessonCard'
import TopicCard from './TopicCard'

export default function LearnScreen({
  onBack,
  onOpenTopic,
  onOpenLesson,
  onOpenReference,
  onOpenRead,
  onPractice,
}) {
  const pathByLevel = getPathLessonsByLevel()
  const topicsByLevel = getTopicsByLevel()
  const { completedLessons } = useLearningProgress()
  const masteryAll = useAllMasteryProgress()
  const weakSpots = getAggregatedWeakSpots(masteryAll, 5)
  const recommendedId = getRecommendedNextLesson(completedLessons, LEARNING_PATH)
  const recommendedLesson = recommendedId ? getLessonById(recommendedId) : null

  function handleTopicClick(topic) {
    if (topic.comingSoon) return
    onOpenTopic(topic.id)
  }

  return (
    <div className="learn">
      <header className="learn__header">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Home
        </button>
        <div className="learn__intro">
          <EpiphanyLogo variant="compact" showVersion={false} />
          <h1 className="learn__title">Learn</h1>
          <p className="learn__subtitle">
            Quick core lessons — expand when you are curious.
          </p>
        </div>
      </header>

      <section className="learn__section learn__section--reference" aria-labelledby="reference-heading">
        <h2 id="reference-heading" className="learn__section-title">
          📊 Charts
        </h2>
        <p className="learn__section-desc">
          Present endings, articles, question words, prepositions, and more —
          concise tables you can scan in seconds.
        </p>
        <button type="button" className="learn__reference-btn" onClick={onOpenReference}>
          Open grammar charts
        </button>
      </section>

      {recommendedLesson ? (
        <section
          className="learn__section learn__section--recommended"
          aria-labelledby="recommended-heading"
        >
          <h2 id="recommended-heading" className="learn__section-title">
            Recommended next
          </h2>
          <p className="learn__section-desc">
            Continue your path — the next unlocked lesson for you.
          </p>
          <div className="learn__list">
            <LessonCard
              badge={recommendedLesson.pathLabel}
              title={recommendedLesson.title}
              summary={recommendedLesson.summary}
              duration={recommendedLesson.duration}
              locked={false}
              completed={false}
              onClick={() => onOpenLesson(recommendedLesson.id)}
            />
          </div>
        </section>
      ) : null}

      <SmartRecommendations
        completedLessons={completedLessons}
        masteryAll={masteryAll}
        weakSpots={weakSpots}
        onOpenLesson={onOpenLesson}
        onOpenTopic={onOpenTopic}
      />

      <GuidedPathsPanel
        completedLessons={completedLessons}
        onOpenLesson={onOpenLesson}
        onOpenRead={onOpenRead}
        onPractice={onPractice}
      />

      <section className="learn__section" aria-labelledby="learning-path-heading">
        <h2 id="learning-path-heading" className="learn__section-title">
          Learning path
        </h2>
        <p className="learn__section-desc">
          Most useful grammar first — beginner to advanced.
        </p>

        {pathByLevel.map((group) => (
          <div key={group.id} className="learn__level-group">
            <h3 className={`learn__level-heading learn__level-heading--${group.id}`}>
              {group.label}
            </h3>
            <p className="learn__level-desc">{group.description}</p>
            <div className="learn__list">
              {group.lessons.map((lesson) => {
                const unlocked = isLessonUnlocked(lesson.id, completedLessons)
                const completed = completedLessons.includes(lesson.id)
                return (
                  <LessonCard
                    key={lesson.id}
                    badge={lesson.pathLabel}
                    title={lesson.title}
                    summary={lesson.summary}
                    duration={lesson.duration}
                    locked={!unlocked}
                    completed={completed}
                    lockHint={getUnlockHint(lesson.id)}
                    onClick={() => onOpenLesson(lesson.id)}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="learn__section" aria-labelledby="browse-topics-heading">
        <h2 id="browse-topics-heading" className="learn__section-title">
          Browse topics
        </h2>
        <p className="learn__section-desc">
          Jump to a topic — tables and conjugations included.
        </p>

        {topicsByLevel.map((group) => (
          <div key={group.id} className="learn__level-group">
            <h3 className={`learn__level-heading learn__level-heading--${group.id}`}>
              {group.label}
            </h3>
            {group.id === 'advanced' ? (
              <p className="learn__level-desc learn__level-desc--advanced">
                Advanced syntax, conditionals, passive voice, cases, formal register, and idioms —
                structured roadmap with lessons arriving progressively.
              </p>
            ) : null}
            <div className="learn__topic-grid">
              {group.topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  label={topic.label}
                  description={topic.description}
                  comingSoon={topic.comingSoon}
                  onClick={() => handleTopicClick(topic)}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
