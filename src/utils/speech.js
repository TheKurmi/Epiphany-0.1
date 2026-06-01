import { STORAGE_KEYS } from '@/app/storage/keys'

const SPEECH_RATE_KEY = STORAGE_KEYS.speechRate

const DICTATION_RATES = {
  beginner: 0.6,
  intermediate: 0.85,
  advanced: 1.0,
}

export function speakGreek(text, options = {}) {
  if (!('speechSynthesis' in window)) return

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'el-GR'

  const savedRate = localStorage.getItem(SPEECH_RATE_KEY)
  const defaultRate = savedRate ? Number(savedRate) : 0.85
  utterance.rate =
    options.rate ??
    (options.dictationLevel
      ? (DICTATION_RATES[options.dictationLevel] ?? defaultRate)
      : defaultRate)

  const savedVoice = localStorage.getItem(STORAGE_KEYS.speechVoice)
  const voices = window.speechSynthesis.getVoices()
  const greekVoice =
    voices.find((v) => v.name === savedVoice) ??
    voices.find((v) => v.lang.startsWith('el'))
  if (greekVoice) utterance.voice = greekVoice

  window.speechSynthesis.speak(utterance)
}

export function initSpeech() {
  const load = () => window.speechSynthesis?.getVoices()
  load()
  window.speechSynthesis?.addEventListener('voiceschanged', load)
  return () => window.speechSynthesis?.removeEventListener('voiceschanged', load)
}
