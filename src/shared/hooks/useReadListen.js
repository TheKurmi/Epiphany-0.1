import { useCallback, useEffect, useRef, useState } from 'react'
import {
  cancelSpeech,
  getSpeechRate,
  speakGreek,
  speakGreekSequence,
  SPEECH_RATE_CHANGED,
} from '@/utils/speech'

/**
 * Guided read-and-listen session — sentence-by-sentence playback with highlighting.
 * Uses the global speech rate from Settings.
 * @param {string[]} sentences — Greek sentence texts
 * @param {{ defaultAutoplay?: boolean }} [options]
 */
export function useReadListen(sentences, options = {}) {
  const { defaultAutoplay = false } = options

  const [activeIndex, setActiveIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoplay, setAutoplay] = useState(defaultAutoplay)
  const [speechRate, setSpeechRateState] = useState(getSpeechRate)
  const controllerRef = useRef(null)

  useEffect(() => {
    const onRateChange = (e) => {
      setSpeechRateState(e.detail ?? getSpeechRate())
    }
    window.addEventListener(SPEECH_RATE_CHANGED, onRateChange)
    return () => window.removeEventListener(SPEECH_RATE_CHANGED, onRateChange)
  }, [])

  const stop = useCallback(() => {
    controllerRef.current?.cancel()
    controllerRef.current = null
    cancelSpeech()
    setIsPlaying(false)
    setActiveIndex(null)
  }, [])

  useEffect(() => () => stop(), [stop])

  const playFrom = useCallback(
    (startIndex = 0) => {
      if (!sentences.length) return

      stop()
      setIsPlaying(true)
      setActiveIndex(startIndex)

      const rate = getSpeechRate()
      controllerRef.current = speakGreekSequence(sentences.slice(startIndex), {
        rate,
        onSentenceStart: (relativeIndex) => {
          setActiveIndex(startIndex + relativeIndex)
        },
        onComplete: () => {
          setIsPlaying(false)
          setActiveIndex(null)
          controllerRef.current = null
        },
        onCancel: () => {
          setIsPlaying(false)
          setActiveIndex(null)
          controllerRef.current = null
        },
      })
    },
    [sentences, stop],
  )

  const playAll = useCallback(() => playFrom(0), [playFrom])

  const playSentence = useCallback(
    (index) => {
      stop()
      setActiveIndex(index)
      speakGreek(sentences[index], {
        rate: getSpeechRate(),
        onEnd: () => {
          setActiveIndex(null)
          if (autoplay && index + 1 < sentences.length) {
            playFrom(index + 1)
          }
        },
      })
    },
    [autoplay, playFrom, sentences, stop],
  )

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stop()
    } else {
      playAll()
    }
  }, [isPlaying, playAll, stop])

  return {
    activeIndex,
    isPlaying,
    autoplay,
    setAutoplay,
    speechRate,
    playAll,
    playFrom,
    playSentence,
    togglePlay,
    stop,
  }
}
