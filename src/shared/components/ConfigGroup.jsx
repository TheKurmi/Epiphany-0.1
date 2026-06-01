export default function ConfigGroup({ label, children, columns = 2 }) {
  return (
    <fieldset className="config-group">
      <legend className="config-group__label">{label}</legend>
      <div
        className={`config-group__options config-group__options--cols-${columns}`}
      >
        {children}
      </div>
    </fieldset>
  )
}

export function ConfigOption({ selected, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      className={`config-option${selected ? ' config-option--selected' : ''}${className ? ` ${className}` : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {children}
    </button>
  )
}
