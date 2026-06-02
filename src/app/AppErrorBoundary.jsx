import { Component } from 'react'

/**
 * Catches render errors so the app shows a recovery screen instead of a blank page.
 */
export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[Epiphany] Render error:', error, info)
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div className="app-error-fallback" role="alert">
        <h1>Something went wrong</h1>
        <p>Epiphany hit an unexpected error. Your progress is still saved locally.</p>
        <pre className="app-error-fallback__detail">{error.message}</pre>
        <div className="app-error-fallback__actions">
          <button
            type="button"
            className="app-error-fallback__btn"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
          <button
            type="button"
            className="app-error-fallback__btn app-error-fallback__btn--muted"
            onClick={() => {
              try {
                localStorage.clear()
              } catch {
                /* ignore */
              }
              window.location.reload()
            }}
          >
            Clear storage &amp; reload
          </button>
        </div>
      </div>
    )
  }
}
