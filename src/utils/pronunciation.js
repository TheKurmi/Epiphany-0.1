/** Hand-tuned guides for common words (algorithm fallback for the rest). */
const OVERRIDES = {
  Γεια: 'YAH',
  Καλημέρα: 'kah-lee-MEH-rah',
  Καλησπέρα: 'kah-lee-SPEH-rah',
  Καληνύχτα: 'kah-lee-NEEKH-tah',
  Ευχαριστώ: 'ef-kha-ree-STOH',
  Παρακαλώ: 'pah-rah-kah-LOH',
  Συγγνώμη: 'see-gh-NOH-mee',
  Ναι: 'neh',
  Όχι: 'OH-khee',
  Νερό: 'neh-ROH',
  Ψωμί: 'psoh-MEE',
  Νησί: 'nee-SEE',
  Σκύλος: 'SKEE-los',
  Γάτα: 'GAH-tah',
  Θάλασσα: 'THAH-lah-sah',
  Ελλάδα: 'eh-LAH-thah',
  Αθήνα: 'ah-THEE-nah',
  Φαγητό: 'fah-ghee-TOH',
  Καφές: 'kah-FES',
  Βιβλίο: 'vee-VLEE-oh',
  Σχολείο: 'skhoh-LEE-oh',
  Οικογένεια: 'ee-koh-YEH-nee-ah',
  Σπίτι: 'SPEE-tee',
  Αγάπη: 'ah-GAH-pee',
}

const ACCENTED = 'ΆΈΉΊΌΎΏάέήίόύώ'

const TO_BASE = {
  ά: 'α', έ: 'ε', ή: 'η', ί: 'ι', ό: 'ο', ύ: 'υ', ώ: 'ω',
  Ά: 'α', Έ: 'ε', Ή: 'η', Ί: 'ι', Ό: 'ο', Ύ: 'υ', Ώ: 'ω',
}

const MULTI_GRAPHS = [
  ['ου', 'oo'],
  ['αι', 'eh'],
  ['ει', 'ee'],
  ['οι', 'ee'],
  ['αυ', 'av'],
  ['ευ', 'ev'],
  ['μπ', 'b'],
  ['ντ', 'd'],
  ['γκ', 'g'],
  ['γγ', 'ng'],
  ['τσ', 'ts'],
  ['τζ', 'j'],
]

const CHAR_LATIN = {
  α: 'ah',
  β: 'v',
  γ: 'gh',
  δ: 'th',
  ε: 'eh',
  ζ: 'z',
  η: 'ee',
  θ: 'th',
  ι: 'ee',
  κ: 'k',
  λ: 'l',
  μ: 'm',
  ν: 'n',
  ξ: 'x',
  ο: 'oh',
  π: 'p',
  ρ: 'r',
  σ: 's',
  ς: 's',
  τ: 't',
  υ: 'ee',
  φ: 'f',
  χ: 'kh',
  ψ: 'ps',
  ω: 'oh',
}

function isGreek(text) {
  return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text)
}

function stripForLookup(word) {
  return word.replace(/[;?,.\s]/g, '').trim()
}

function toPlainGreek(word) {
  let stressPlainIndex = -1
  let plain = ''

  for (const ch of word) {
    if (ACCENTED.includes(ch)) stressPlainIndex = plain.length
    const base = TO_BASE[ch] ?? ch.toLowerCase()
    if (CHAR_LATIN[base] !== undefined) plain += base
  }

  return { plain, stressPlainIndex }
}

function plainToLatin(plain) {
  let latin = ''
  let i = 0

  while (i < plain.length) {
    let matched = false
    for (const [gr, lat] of MULTI_GRAPHS) {
      if (plain.startsWith(gr, i)) {
        latin += lat
        i += gr.length
        matched = true
        break
      }
    }
    if (!matched) {
      const ch = plain[i]
      latin += CHAR_LATIN[ch] ?? ch
      i += 1
    }
  }

  return latin
}

function plainIndexToLatinIndex(plain, plainStressIndex) {
  if (plainStressIndex < 0) return -1
  const prefix = plainToLatin(plain.slice(0, plainStressIndex))
  return prefix.length
}

function syllabify(latin) {
  const parts = latin.match(/[^aeiouy]*[aeiouy]+/gi)
  return parts?.filter(Boolean) ?? [latin]
}

function formatGuide(latin, stressCharIndex) {
  const syllables = syllabify(latin)
  if (!syllables.length) return latin

  let charPos = 0
  let stressSyllable = 0

  if (stressCharIndex >= 0) {
    for (let s = 0; s < syllables.length; s++) {
      const end = charPos + syllables[s].length
      if (stressCharIndex >= charPos && stressCharIndex < end) {
        stressSyllable = s
        break
      }
      charPos = end
    }
  } else if (syllables.length > 1) {
    stressSyllable = syllables.length - 2
  }

  return syllables
    .map((syl, idx) =>
      idx === stressSyllable ? syl.toUpperCase() : syl.toLowerCase(),
    )
    .join('-')
}

/**
 * English-friendly pronunciation guide for Modern Greek.
 * @param {string} greek
 * @returns {string|null}
 */
export function getPronunciation(greek) {
  if (!greek || !isGreek(greek)) return null

  const lookup = stripForLookup(greek)
  if (OVERRIDES[lookup]) return OVERRIDES[lookup]
  if (OVERRIDES[greek.trim()]) return OVERRIDES[greek.trim()]

  const { plain, stressPlainIndex } = toPlainGreek(lookup)
  if (!plain) return null

  const latin = plainToLatin(plain)
  const stressLatinIndex = plainIndexToLatinIndex(plain, stressPlainIndex)

  return formatGuide(latin, stressLatinIndex) || null
}

export { isGreek }
