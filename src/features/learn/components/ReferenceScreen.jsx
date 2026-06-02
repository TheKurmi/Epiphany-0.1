import { useState } from 'react'
import {
  REFERENCE_CATEGORIES,
  getReferenceChartsByCategory,
} from '@/features/learn/data/reference'
import LessonSection from './LessonSection'

export default function ReferenceScreen({ onBack, showPronunciation }) {
  const [categoryId, setCategoryId] = useState('verbs')
  const [openChartId, setOpenChartId] = useState('present-endings')

  const charts = getReferenceChartsByCategory(categoryId)

  return (
    <div className="learn reference charts">
      <header className="learn__header">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Learn
        </button>
        <div className="learn__intro">
          <h1 className="learn__title">📊 Charts</h1>
          <p className="learn__subtitle">
            Foundational grammar at a glance — patterns, endings, and reminders
            you can revisit in seconds.
          </p>
        </div>
      </header>

      <p className="charts__intro">
        Core charts covering verbs, nouns, syntax, and everyday function words.
        Expand any chart — use the 🔍 control on a table for a calm, focused view.
      </p>

      <nav className="reference__nav" aria-label="Chart categories">
        {REFERENCE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`reference__nav-btn${categoryId === cat.id ? ' reference__nav-btn--active' : ''}`}
            onClick={() => {
              setCategoryId(cat.id)
              const first = getReferenceChartsByCategory(cat.id)[0]
              setOpenChartId(first?.id ?? null)
            }}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </nav>

      <div className="reference__charts">
        {charts.map((chart) => {
          const isOpen = openChartId === chart.id
          return (
            <article
              key={chart.id}
              className={`reference__chart-card${isOpen ? ' reference__chart-card--open' : ''}`}
            >
              <button
                type="button"
                className="reference__chart-toggle"
                aria-expanded={isOpen}
                onClick={() => setOpenChartId(isOpen ? null : chart.id)}
              >
                <span className="reference__chart-title-row">
                  <span className="reference__chart-title">{chart.title}</span>
                  {chart.foundation ? (
                    <span className="reference__chart-badge">Core</span>
                  ) : null}
                </span>
                <span className="reference__chart-summary">{chart.summary}</span>
                <span className="reference__chart-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen ? (
                <div className="reference__chart-body">
                  {chart.sections.map((section, i) => (
                    <LessonSection
                      key={`${chart.id}-${i}`}
                      section={section}
                      showPronunciation={showPronunciation}
                      nested
                    />
                  ))}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>

      <p className="reference__footer">
        Tip: open <strong>How Greek Thinks About Time</strong> in the learning path
        for the full aspect lesson behind the matrix chart.
      </p>
    </div>
  )
}
