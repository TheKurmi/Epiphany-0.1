import { useEffect, useState } from 'react'
import { useDeveloperMode } from '@/app/dev/useDeveloperMode'
import { getDevDiagnostics } from '@/app/dev/devActions'
import { readLearningProfile, getProfile } from '@/app/profile'

/**
 * Collapsible diagnostics — only when dev mode + debug overlays enabled.
 * Does not modify learner-facing components.
 */
export default function DevDiagnosticsPanel({ context = null }) {
  const { enabled, debugOverlays } = useDeveloperMode()
  const [open, setOpen] = useState(true)
  const [diag, setDiag] = useState(null)

  useEffect(() => {
    if (!enabled || !debugOverlays) return undefined

    const refresh = () => setDiag(getDevDiagnostics())
    refresh()

    const events = ['learning-progress', 'mastery-progress', 'spaced-repetition', 'mistake-patterns', 'dev-mode-changed']
    for (const e of events) window.addEventListener(e, refresh)
    return () => {
      for (const e of events) window.removeEventListener(e, refresh)
    }
  }, [enabled, debugOverlays])

  if (!enabled || !debugOverlays || !diag) return null

  const profile = getProfile(readLearningProfile())

  return (
    <div className={`dev-diagnostics${open ? '' : ' dev-diagnostics--collapsed'}`}>
      <button
        type="button"
        className="dev-diagnostics__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Debug {open ? '▾' : '▸'}
      </button>
      {open ? (
        <div className="dev-diagnostics__body">
          <dl className="dev-diagnostics__grid">
            <dt>Profile</dt>
            <dd>{profile.emoji} {profile.label}</dd>
            <dt>Lessons</dt>
            <dd>{diag.progress.completedLessons}/{diag.progress.totalLessons}</dd>
            <dt>Stories</dt>
            <dd>{diag.progress.completedStories}/{diag.progress.totalStories}</dd>
            <dt>Review due</dt>
            <dd>{diag.review.due} ({diag.review.totalTracked} tracked)</dd>
            <dt>Weak items</dt>
            <dd>{diag.review.weak}</dd>
            <dt>Top mistake</dt>
            <dd>
              {diag.mistakes.top[0]
                ? `${diag.mistakes.top[0].emoji} ${diag.mistakes.top[0].label} (${diag.mistakes.top[0].count})`
                : '—'}
            </dd>
          </dl>
          {context ? (
            <div className="dev-diagnostics__context">
              <span className="dev-diagnostics__context-label">Context</span>
              {context.type ? <span className="dev-tag">{context.type}</span> : null}
              {context.level ? <span className="dev-tag">Lv {context.level}</span> : null}
              {context.tags?.map((t) => (
                <span key={t} className="dev-tag dev-tag--muted">{t}</span>
              ))}
              {context.id ? (
                <code className="dev-diagnostics__id">{context.id}</code>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
