import LightbulbIcon from './LightbulbIcon'

/**
 * @param {'hero' | 'compact'} variant
 * @param {boolean} showVersion — show “0.1” (default true for hero)
 */
export default function EpiphanyLogo({
  variant = 'hero',
  showVersion,
  className = '',
}) {
  const isHero = variant === 'hero'
  const versionVisible = showVersion ?? isHero
  const Tag = isHero ? 'h1' : 'span'

  return (
    <Tag
      className={`brand-title brand-title--${variant} ${className}`.trim()}
    >
      <span className="brand-title__name">
        Ep
        <span className="brand-title__i">
          <span className="brand-title__i-char">ı</span>
          <LightbulbIcon className="brand-title__dot" />
        </span>
        phany
      </span>
      {versionVisible ? (
        <span className="brand-title__version">0.1</span>
      ) : null}
    </Tag>
  )
}
