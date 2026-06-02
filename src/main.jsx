import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/app/App'
import AppErrorBoundary from '@/app/AppErrorBoundary'

function Boot() {
  useEffect(() => {
    document.body.classList.remove('study-focus-body-lock')
  }, [])

  return (
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Boot />
  </StrictMode>,
)
