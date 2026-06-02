import { useState } from 'react'
import { explainHighlight, highlightTypeClass } from '@/utils/grammarExplain'

/**
 * Wraps a highlighted grammar segment with a tap/hover explanation.
 */
export default function GrammarTooltip({ highlight, children, className = '' }) {
  const [open, setOpen] = useState(false)
  const explanation = explainHighlight(highlight)
  const typeClass = highlightTypeClass(highlight?.type)

  return (
    <span
      className={`grammar-tooltip ${typeClass}${className ? ` ${className}` : ''}`.trim()}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="grammar-tooltip__trigger"
        aria-expanded={open}
        aria-label={explanation}
        onClick={() => setOpen((v) => !v)}
      >
        {children}
      </button>
      {open ? (
        <span className="grammar-tooltip__popup" role="tooltip">
          {explanation}
        </span>
      ) : null}
    </span>
  )
}
