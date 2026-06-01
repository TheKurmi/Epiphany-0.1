/** @param {{ text: string, highlight?: boolean }[]} parts */
export default function PatternText({ parts, className = '' }) {
  return (
    <span className={`pattern-text${className ? ` ${className}` : ''}`}>
      {parts.map((part, index) =>
        part.highlight ? (
          <span key={index} className="pattern-text__highlight">
            {part.text}
          </span>
        ) : (
          <span key={index} className="pattern-text__stem">
            {part.text}
          </span>
        ),
      )}
    </span>
  )
}
