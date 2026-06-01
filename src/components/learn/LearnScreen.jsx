import {
  getPathLessonsByLevel,
  getTopicsByLevel,
} from '../../data/learn'
import EpiphanyLogo from '../EpiphanyLogo'
import LessonCard from './LessonCard'
import TopicCard from './TopicCard'

export default function LearnScreen({ onBack, onOpenTopic, onOpenLesson }) {
  const pathByLevel = getPathLessonsByLevel()
  const topicsByLevel = getTopicsByLevel()

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
              {group.lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  badge={lesson.pathLabel}
                  title={lesson.title}
                  summary={lesson.summary}
                  duration={lesson.duration}
                  onClick={() => onOpenLesson(lesson.id)}
                />
              ))}
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
