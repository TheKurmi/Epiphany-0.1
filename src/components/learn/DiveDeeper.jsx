import { useId, useState } from 'react'
import LessonSection from './LessonSection'

export default function DiveDeeper({ deepDive, showPronunciation }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  if (!deepDive?.sections?.length) return null

  return (
    <section className="dive-deeper" aria-label="Optional deeper content">
      <button
        type="button"
        className={`dive-deeper__toggle${open ? ' dive-deeper__toggle--open' : ''}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="dive-deeper__toggle-main">
          <span className="dive-deeper__icon" aria-hidden="true">
            {open ? '−' : '+'}
          </span>
          <span className="dive-deeper__label">
            {deepDive.title ?? 'Dive deeper'}
          </span>
        </span>
        {deepDive.teaser ? (
          <span className="dive-deeper__teaser">{deepDive.teaser}</span>
        ) : null}
      </button>

      {open ? (
        <div id={panelId} className="dive-deeper__panel">
          {deepDive.sections.map((section, index) => (
            <LessonSection
              key={`deep-${section.type}-${index}`}
              section={section}
              showPronunciation={showPronunciation}
              nested
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
