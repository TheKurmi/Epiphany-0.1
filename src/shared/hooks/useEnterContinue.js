import { useCallback, useEffect } from 'react'

/**
 * Enter to continue after feedback — avoids double-submit while in input phase.
 */
export function useEnterContinue({ enabled, onContinue }) {
  useEffect(() => {
    if (!enabled) return

    function handleKeyDown(e) {
      if (e.key !== 'Enter' || e.repeat) return
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      e.preventDefault()
      onContinue()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, onContinue])
}

/** Enter submits form; when revealed, Enter continues (via form onSubmit). */
export function useFormEnterFlow({ revealed, onSubmit, onContinue }) {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (revealed) onContinue()
      else onSubmit()
    },
    [revealed, onSubmit, onContinue],
  )

  useEnterContinue({ enabled: revealed, onContinue })

  return handleSubmit
}
