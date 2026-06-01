import LightbulbIcon from './LightbulbIcon'
import { EPIPHANY_VERSION } from '@/app/brand'

/**
 * @param {'hero' | 'compact'} variant
 * @param {boolean} showVersion — show version badge (default true for hero)
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
        <span className="brand-title__version">{EPIPHANY_VERSION}</span>
      ) : null}
    </Tag>
  )
}
