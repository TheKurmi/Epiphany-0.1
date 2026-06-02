/** @param {{ title?: string, caption?: string, items: { greek: string, english: string, position: 'past' | 'now' | 'future' }[] }} props */
export default function TimeTimeline({ title, caption, items }) {
  return (
    <div className="time-timeline">
      {title ? <h3 className="grammar-table__title">{title}</h3> : null}
      {caption ? <p className="grammar-table__caption">{caption}</p> : null}
      <div className="time-timeline__track" aria-hidden="true">
        <span className="time-timeline__arrow time-timeline__arrow--past">← past</span>
        <span className="time-timeline__now">now</span>
        <span className="time-timeline__arrow time-timeline__arrow--future">future →</span>
      </div>
      <ul className="time-timeline__items">
        {items.map((item) => (
          <li
            key={item.greek}
            className={`time-timeline__item time-timeline__item--${item.position}`}
          >
            <span className="time-timeline__greek" lang="el">
              {item.greek}
            </span>
            <span className="time-timeline__english">{item.english}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
