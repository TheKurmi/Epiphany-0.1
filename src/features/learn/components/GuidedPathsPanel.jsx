import { useState } from 'react'
import {
  GUIDED_PATHS,
  getPathProgress,
  getNextPathStep,
} from '@/features/learn/data/paths/guidedPaths'
import { getLessonById } from '@/features/learn/data'

export default function GuidedPathsPanel({
  completedLessons,
  onOpenLesson,
  onOpenRead,
  onPractice,
}) {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <section className="guided-paths" aria-labelledby="guided-paths-heading">
      <h2 id="guided-paths-heading" className="guided-paths__title">
        Guided paths
      </h2>
      <p className="guided-paths__desc">
        Structured journeys — know what to learn, practice, and read next.
      </p>
      <ul className="guided-paths__list">
        {GUIDED_PATHS.map((path) => {
          const { done, total, percent } = getPathProgress(path, completedLessons)
          const nextLessonId = getNextPathStep(path, completedLessons)
          const nextLesson = nextLessonId ? getLessonById(nextLessonId) : null
          const expanded = expandedId === path.id
          const complete = done >= total

          return (
            <li key={path.id} className="guided-paths__item">
              <button
                type="button"
                className={`guided-paths__header${expanded ? ' guided-paths__header--open' : ''}`}
                onClick={() => setExpandedId(expanded ? null : path.id)}
                aria-expanded={expanded}
              >
                <span className="guided-paths__emoji" aria-hidden="true">
                  {path.emoji}
                </span>
                <span className="guided-paths__name">{path.title}</span>
                <span className="guided-paths__progress">
                  {complete ? 'Complete' : `${done}/${total}`}
                </span>
              </button>

              {expanded ? (
                <div className="guided-paths__body">
                  <p className="guided-paths__summary">{path.description}</p>
                  <div
                    className="guided-paths__bar"
                    role="progressbar"
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span className="guided-paths__bar-fill" style={{ width: `${percent}%` }} />
                  </div>
                  {nextLesson ? (
                    <button
                      type="button"
                      className="guided-paths__next"
                      onClick={() => onOpenLesson?.(nextLesson.id)}
                    >
                      Next lesson: {nextLesson.title} →
                    </button>
                  ) : (
                    <p className="guided-paths__done">All lessons in this path completed.</p>
                  )}
                  <div className="guided-paths__links">
                    {onPractice ? (
                      <button type="button" className="guided-paths__link" onClick={onPractice}>
                        Practice ({path.practiceModes[0]?.replace('-', ' ') ?? 'drill'})
                      </button>
                    ) : null}
                    {path.readPackIds[0] && onOpenRead ? (
                      <button
                        type="button"
                        className="guided-paths__link"
                        onClick={() => onOpenRead(path.readPackIds[0])}
                      >
                        Read pack →
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
