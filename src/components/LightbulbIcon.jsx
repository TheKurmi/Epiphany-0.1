/** Tiny tittle-sized bulb — sits on the “i” in Epiphany. */
export default function LightbulbIcon({ className = '' }) {
  return (
    <svg
      className={`lightbulb-icon ${className}`.trim()}
      viewBox="0 0 8 10"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M4 0.5C2.35 0.5 1 1.75 1 3.35c0 .95.5 1.75 1.25 2.2v.55h3.5v-.55c.75-.45 1.25-1.25 1.25-2.2C7 1.75 5.65 0.5 4 0.5Z"
      />
      <rect x="3" y="6.35" width="2" height="0.55" rx="0.15" fill="currentColor" opacity="0.75" />
      <rect x="2.75" y="7.05" width="2.5" height="0.9" rx="0.2" fill="currentColor" opacity="0.55" />
    </svg>
  )
}
