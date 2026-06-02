/** Small “Why Greeks say it this way” insight box. */
export default function LinguisticInsight({ title, text, compact = false }) {
  if (!text) return null

  return (
    <aside className={`linguistic-insight${compact ? ' linguistic-insight--compact' : ''}`}>
      <h4 className="linguistic-insight__title">{title ?? 'Why Greeks say it this way'}</h4>
      <p className="linguistic-insight__text">{text}</p>
    </aside>
  )
}
