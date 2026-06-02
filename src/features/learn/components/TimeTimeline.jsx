import StudyFocusShell from '@/shared/components/StudyFocusShell'

const TIME_FLOW = [
  { id: 'past', arrow: '⬅', label: 'Before now', hint: 'Already happened' },
  { id: 'now', arrow: '⬤', label: 'Now', hint: 'Present moment' },
  { id: 'future', arrow: '➡', label: 'Later', hint: 'Still ahead' },
]

function itemKey(item, index) {
  return item.greek ?? item.label ?? item.text ?? `item-${index}`
}

/**
 * Timeline visual — supports time-flow (before now / now / later)
 * and action-shape cards (wave / dot / check).
 */
export default function TimeTimeline({ title, caption, items, variant }) {
  const isTimeFlow =
    variant === 'time-flow' ||
    items.some((item) => item.position === 'past' || item.position === 'now' || item.position === 'future')

  const isActionShape = items.some((item) => item.visual)

  return (
    <StudyFocusShell
      title={title}
      caption={caption}
      focusClassName="study-focus--timeline"
    >
      <div className="time-timeline">
        {title ? <h3 className="grammar-table__title">{title}</h3> : null}
        {caption ? <p className="grammar-table__caption">{caption}</p> : null}

        {isTimeFlow ? (
          <div className="time-timeline__flow" role="img" aria-label="Time flows from before now through now to later">
            {TIME_FLOW.map((step) => (
              <div key={step.id} className={`time-timeline__flow-step time-timeline__flow-step--${step.id}`}>
                <span className="time-timeline__flow-arrow" aria-hidden="true">
                  {step.arrow}
                </span>
                <span className="time-timeline__flow-label">{step.label}</span>
                <span className="time-timeline__flow-hint">{step.hint}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="time-timeline__track" aria-hidden="true">
            <span className="time-timeline__arrow time-timeline__arrow--past">⬅ Before now</span>
            <span className="time-timeline__now">⬤ Now</span>
            <span className="time-timeline__arrow time-timeline__arrow--future">Later ➡</span>
          </div>
        )}

        {isActionShape ? (
          <ul className="time-timeline__shapes">
            {items.map((item, index) => (
              <li
                key={itemKey(item, index)}
                className={`time-timeline__shape time-timeline__shape--${item.visual}`}
              >
                <span className="time-timeline__shape-icon" aria-hidden="true">
                  {item.visual === 'wave' ? '~~~' : item.visual === 'dot' ? '●' : '✓'}
                </span>
                <span className="time-timeline__shape-label">{item.label}</span>
                <span className="time-timeline__shape-text">{item.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="time-timeline__items">
            {items.map((item, index) => (
              <li
                key={itemKey(item, index)}
                className={`time-timeline__item time-timeline__item--${item.position ?? 'now'}`}
              >
                {item.greek ? (
                  <span className="time-timeline__greek" lang="el">
                    {item.greek}
                  </span>
                ) : item.label ? (
                  <span className="time-timeline__greek">{item.label}</span>
                ) : null}
                <span className="time-timeline__english">
                  {item.english ?? item.text ?? ''}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </StudyFocusShell>
  )
}
