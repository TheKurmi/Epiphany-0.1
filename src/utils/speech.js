import { STORAGE_KEYS } from '@/app/storage/keys'

const SPEECH_RATE_KEY = STORAGE_KEYS.speechRate

export const SPEECH_RATE_CHANGED = 'epiphany-speech-rate-changed'

/** Dictation levels scale the user's preferred rate — not fixed overrides. */
const DICTATION_MULTIPLIERS = {
  beginner: 0.78,
  intermediate: 0.92,
  advanced: 1,
}

/** @type {{ cancel: () => void } | null} */
let activeSequence = null

export function getSpeechRate() {
  const saved = localStorage.getItem(SPEECH_RATE_KEY)
  const parsed = saved ? Number(saved) : 0.85
  return Number.isFinite(parsed) ? parsed : 0.85
}

export function setSpeechRate(rate) {
  const next = Number(rate)
  if (!Number.isFinite(next)) return
  localStorage.setItem(SPEECH_RATE_KEY, String(next))
  window.dispatchEvent(new CustomEvent(SPEECH_RATE_CHANGED, { detail: next }))
}

export function resolveSpeechRate(options = {}) {
  if (options.rate != null) return Number(options.rate)
  const base = getSpeechRate()
  if (options.dictationLevel) {
    const mult = DICTATION_MULTIPLIERS[options.dictationLevel] ?? 1
    return base * mult
  }
  return base
}

function buildUtterance(text, options = {}) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'el-GR'
  utterance.rate = resolveSpeechRate(options)

  const savedVoice = localStorage.getItem(STORAGE_KEYS.speechVoice)
  const voices = window.speechSynthesis.getVoices()
  const greekVoice =
    voices.find((v) => v.name === savedVoice) ??
    voices.find((v) => v.lang.startsWith('el'))
  if (greekVoice) utterance.voice = greekVoice

  if (options.onStart) utterance.onstart = options.onStart
  if (options.onEnd) utterance.onend = options.onEnd
  if (options.onError) utterance.onerror = options.onError

  return utterance
}

export function cancelSpeech() {
  activeSequence?.cancel()
  activeSequence = null
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

export function speakGreek(text, options = {}) {
  if (!('speechSynthesis' in window) || !text?.trim()) return

  if (!options.queue) {
    cancelSpeech()
  }

  const utterance = buildUtterance(text.trim(), options)
  window.speechSynthesis.speak(utterance)
  return utterance
}

/** Speak a single word or short phrase — same voice/rate as full sentences. */
export function speakGreekWord(word, options = {}) {
  speakGreek(word, options)
}

/**
 * Play sentences one at a time with callbacks for guided listening.
 * @param {string[]} sentences
 * @param {{ rate?: number, onSentenceStart?: (index: number, text: string) => void, onSentenceEnd?: (index: number, text: string) => void, onComplete?: () => void, onCancel?: () => void }} [callbacks]
 */
export function speakGreekSequence(sentences, callbacks = {}) {
  if (!('speechSynthesis' in window) || !sentences?.length) return

  cancelSpeech()

  let index = 0
  let cancelled = false

  const controller = {
    cancel() {
      cancelled = true
      window.speechSynthesis.cancel()
      callbacks.onCancel?.()
    },
  }
  activeSequence = controller

  function speakNext() {
    if (cancelled || index >= sentences.length) {
      activeSequence = null
      if (!cancelled) callbacks.onComplete?.()
      return
    }

    const text = sentences[index]
    const currentIndex = index
    callbacks.onSentenceStart?.(currentIndex, text)

    const utterance = buildUtterance(text, {
      rate: callbacks.rate ?? getSpeechRate(),
      onEnd: () => {
        if (cancelled) return
        callbacks.onSentenceEnd?.(currentIndex, text)
        index += 1
        speakNext()
      },
      onError: () => {
        if (cancelled) return
        index += 1
        speakNext()
      },
    })

    window.speechSynthesis.speak(utterance)
  }

  speakNext()
  return controller
}

export function initSpeech() {
  const load = () => window.speechSynthesis?.getVoices()
  load()
  window.speechSynthesis?.addEventListener('voiceschanged', load)
  return () => window.speechSynthesis?.removeEventListener('voiceschanged', load)
}
