export function speakGreek(text) {
  if (!('speechSynthesis' in window)) return

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'el-GR'
  utterance.rate = 0.85

  const voices = window.speechSynthesis.getVoices()
  const greekVoice = voices.find((v) => v.lang.startsWith('el'))
  if (greekVoice) utterance.voice = greekVoice

  window.speechSynthesis.speak(utterance)
}

export function initSpeech() {
  const load = () => window.speechSynthesis?.getVoices()
  load()
  window.speechSynthesis?.addEventListener('voiceschanged', load)
  return () => window.speechSynthesis?.removeEventListener('voiceschanged', load)
}
