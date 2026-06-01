import { getPronunciation } from '@/utils/pronunciation'

export default function GreekWord({
  text,
  showGuide = false,
  className = '',
  size = 'lg',
}) {
  const guide = showGuide ? getPronunciation(text) : null

  return (
    <div className={`greek-word greek-word--${size}${className ? ` ${className}` : ''}`}>
      <span className="greek-word__text">{text}</span>
      {guide ? (
        <span className="greek-word__guide" lang="en">
          {guide}
        </span>
      ) : null}
    </div>
  )
}
