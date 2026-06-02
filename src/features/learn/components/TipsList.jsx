/** @param {{ title?: string, items: { title?: string, text: string }[] }} props */
export default function TipsList({ title, items }) {
  return (
    <div className="edu-tips">
      {title ? <h3 className="edu-tips__title">{title}</h3> : null}
      <ul className="edu-tips__list">
        {items.map((item) => (
          <li key={item.title ?? item.text} className="edu-tips__item">
            {item.title ? (
              <strong className="edu-tips__item-title">{item.title}</strong>
            ) : null}
            <p className="edu-tips__item-text">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
