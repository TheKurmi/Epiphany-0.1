import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

const StudyFocusContext = createContext(false)

/** Whether the parent chart is currently in study (focus) mode. */
export function useStudyFocusActive() {
  return useContext(StudyFocusContext)
}

/**
 * Distraction-free overlay for charts — portaled when open so layering stays correct.
 */
export default function StudyFocusShell({
  title,
  caption,
  children,
  sidebar,
  focusClassName = '',
  renderStudyToolbar,
  collapseHeaderInFocus = true,
  enabled = true,
}) {
  const [open, setOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const panelRef = useRef(null)
  const titleId = useId()

  const exit = useCallback(() => setOpen(false), [])

  const zoomIn = useCallback(
    () => setScale((s) => Math.min(1.45, Math.round((s + 0.1) * 10) / 10)),
    [],
  )
  const zoomOut = useCallback(
    () => setScale((s) => Math.max(0.85, Math.round((s - 0.1) * 10) / 10)),
    [],
  )

  useEffect(() => {
    if (!open) {
      setScale(1)
      return undefined
    }

    document.body.classList.add('study-focus-body-lock')
    const timer = window.setTimeout(() => panelRef.current?.focus(), 50)

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        exit()
        return
      }
      if (e.key === '+' || e.key === '=') {
        e.preventDefault()
        zoomIn()
        return
      }
      if (e.key === '-') {
        e.preventDefault()
        zoomOut()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.body.classList.remove('study-focus-body-lock')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, exit, zoomIn, zoomOut])

  if (!enabled) {
    return children
  }

  const toolbarProps = { scale, setScale, zoomIn, zoomOut, exit, open }

  const panelBody = (
    <>
      {open ? (
        <header className="study-focus-toolbar">
          <div className="study-focus-toolbar__heading">
            {title ? (
              <h2 id={titleId} className="study-focus-toolbar__title">
                {title}
              </h2>
            ) : null}
            {caption ? (
              <p className="study-focus-toolbar__caption">{caption}</p>
            ) : null}
          </div>

          <div className="study-focus-toolbar__controls">
            {renderStudyToolbar?.(toolbarProps)}

            <div
              className="study-focus-toolbar__zoom"
              role="group"
              aria-label="Text size"
            >
              <button
                type="button"
                className="study-focus-toolbar__btn"
                onClick={zoomOut}
                aria-label="Decrease size"
              >
                −
              </button>
              <span className="study-focus-toolbar__scale" aria-live="polite">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                className="study-focus-toolbar__btn"
                onClick={zoomIn}
                aria-label="Increase size"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="study-focus-toolbar__exit"
              onClick={exit}
              aria-label="Close expanded view"
            >
              ✕
            </button>
          </div>
        </header>
      ) : null}

      <div
        className="study-focus-wrap__content"
        style={{ '--study-focus-scale': scale }}
      >
        {open && sidebar ? (
          <div className="study-focus-layout">
            <div className="study-focus-layout__main">{children}</div>
            <aside
              className="study-focus-layout__sidebar"
              aria-label="Pinned explanation"
            >
              <h3 className="study-focus-layout__sidebar-label">Explanation</h3>
              {sidebar}
            </aside>
          </div>
        ) : (
          children
        )}
      </div>

      {open ? (
        <p className="study-focus-wrap__hint">
          Esc to exit · + / − to adjust size
        </p>
      ) : null}
    </>
  )

  const closedView = (
    <StudyFocusContext.Provider value={false}>
      <div className={`study-focus-wrap ${focusClassName}`.trim()}>
        <div className="study-focus-wrap__inline">
          {children}
          <button
            type="button"
            className="study-focus-trigger"
            onClick={() => setOpen(true)}
            aria-label={
              title ? `Expand ${title} for focused study` : 'Expand for focused study'
            }
            title="Expand view"
          >
            <span className="study-focus-trigger__icon" aria-hidden="true">
              🔍
            </span>
          </button>
        </div>
      </div>
    </StudyFocusContext.Provider>
  )

  const openView = (
    <>
      {createPortal(
        <div
          className="study-focus-backdrop"
          aria-hidden="true"
          onClick={exit}
        />,
        document.body,
      )}
      {createPortal(
        <StudyFocusContext.Provider value={true}>
          <div
            ref={panelRef}
            className={[
              'study-focus-wrap',
              'study-focus-wrap--open',
              collapseHeaderInFocus ? 'study-focus-wrap--hide-header' : '',
              focusClassName,
            ]
              .filter(Boolean)
              .join(' ')}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
          >
            <div className="study-focus-panel">{panelBody}</div>
          </div>
        </StudyFocusContext.Provider>,
        document.body,
      )}
    </>
  )

  return open ? openView : closedView
}
