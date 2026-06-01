import { useEffect } from 'react'
import { getLessonById, getTopicById, getLevelById } from '@/features/learn/data'
import { useLearningProgress } from '@/shared/hooks/useLearningProgress'
import QuickIntro from './QuickIntro'
import LessonSection from './LessonSection'
import MiniGeneratedQuiz from './MiniGeneratedQuiz'
import DiveDeeper from './DiveDeeper'

export default function LessonScreen({
  lessonId,
  onBack,
  onOpenMastery,
  showPronunciation,
}) {
  const lesson = getLessonById(lessonId)
  const { markLesson, completedLessons } = useLearningProgress()
  const isCompleted = completedLessons.includes(lessonId)

  useEffect(() => {
    if (lesson) markLesson(lesson.id)
  }, [lesson, markLesson])

  if (!lesson) {
    return (
      <div className="lesson">
        <header className="lesson__header">
          <button type="button" className="btn btn--back" onClick={onBack}>
            ← Learn
          </button>
        </header>
        <p className="empty-state">This lesson is not available yet.</p>
      </div>
    )
  }

  const topic = getTopicById(lesson.topicId)
  const level = getLevelById(lesson.level)
  const mistakes = lesson.commonMistakes ?? (
    lesson.commonMistake ? [{ text: lesson.commonMistake }] : []
  )

  return (
    <article className="lesson">
      <header className="lesson__header">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Learn
        </button>
        <div className="lesson__meta-row">
          {level ? (
            <span className={`lesson__level lesson__level--${level.id}`}>
              {level.label}
            </span>
          ) : null}
          {lesson.duration ? (
            <span className="lesson__duration">{lesson.duration} read</span>
          ) : null}
        </div>
        {topic ? <span className="lesson__topic">{topic.label}</span> : null}
        {isCompleted ? (
          <span className="lesson__completed-badge">✓ Completed</span>
        ) : null}
        <h1 className="lesson__title">{lesson.title}</h1>
        <p className="lesson__summary">{lesson.summary}</p>
      </header>

      <div className="lesson__body">
        <QuickIntro intro={lesson.intro} showPronunciation={showPronunciation} />

        {lesson.sections.map((section, index) => (
          <LessonSection
            key={`${section.type}-${index}`}
            section={section}
            showPronunciation={showPronunciation}
          />
        ))}

        {mistakes.length ? (
          <aside className="lesson__mistake" aria-label="Common mistakes">
            <h2 className="lesson__mistake-title">Watch out for</h2>
            <ul className="lesson-mistakes">
              {mistakes.map((item) => (
                <li key={item.title ?? item.text} className="lesson-mistakes__item">
                  {item.title ? (
                    <strong className="lesson-mistakes__label">{item.title}</strong>
                  ) : null}
                  <p className="lesson-mistakes__text">{item.text}</p>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <MiniGeneratedQuiz topicId={lesson.topicId} />

        {onOpenMastery ? (
          <div className="lesson__mastery-cta">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => onOpenMastery(lesson.topicId)}
            >
              Quiz yourself →
            </button>
            <p className="lesson__mastery-hint">
              Progressive mastery levels — practice patterns until they stick.
            </p>
          </div>
        ) : null}

        <DiveDeeper deepDive={lesson.deepDive} showPronunciation={showPronunciation} />
      </div>
    </article>
  )
}
