import { EPIPHANY_VERSION, APP_TITLE } from '@/app/brand'

/** Sync document title with app brand on load. */
export function initDocumentTitle() {
  if (typeof document !== 'undefined') {
    document.title = APP_TITLE
  }
}

export { EPIPHANY_VERSION, APP_TITLE }
