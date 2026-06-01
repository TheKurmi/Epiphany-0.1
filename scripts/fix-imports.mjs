import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'src')

const REPLACEMENTS = [
  [/from '\.\.\/\.\.\/data\/learn\/unlocks'/g, "from '@/features/learn/data/unlocks'"],
  [/from '\.\.\/\.\.\/data\/learn\/quiz'/g, "from '@/features/learn/data/quiz'"],
  [/from '\.\.\/\.\.\/data\/learn'/g, "from '@/features/learn/data'"],
  [/from '\.\.\/data\/learn\/unlocks'/g, "from '@/features/learn/data/unlocks'"],
  [/from '\.\.\/data\/learn\/quiz'/g, "from '@/features/learn/data/quiz'"],
  [/from '\.\.\/data\/learn'/g, "from '@/features/learn/data'"],
  [/from '\.\.\/\.\.\/data\/read'/g, "from '@/features/read/data'"],
  [/from '\.\.\/data\/read'/g, "from '@/features/read/data'"],
  [/from '\.\.\/\.\.\/data\/practice\//g, "from '@/features/practice/data/"],
  [/from '\.\.\/data\/practice\//g, "from '@/features/practice/data/"],
  [/from '\.\.\/\.\.\/hooks\/useLearningProgress'/g, "from '@/shared/hooks/useLearningProgress'"],
  [/from '\.\.\/hooks\/useLearningProgress'/g, "from '@/shared/hooks/useLearningProgress'"],
  [/from '\.\.\/\.\.\/hooks\/useMasteryProgress'/g, "from '@/features/learn/hooks/useMasteryProgress'"],
  [/from '\.\.\/hooks\/useMasteryProgress'/g, "from '@/features/learn/hooks/useMasteryProgress'"],
  [/from '\.\.\/\.\.\/hooks\/useDeck'/g, "from '@/features/practice/hooks/useDeck'"],
  [/from '\.\.\/\.\.\/hooks\/useChallengeSession'/g, "from '@/features/practice/hooks/useChallengeSession'"],
  [/from '\.\.\/\.\.\/hooks\/useQuizPracticeSession'/g, "from '@/features/practice/hooks/useQuizPracticeSession'"],
  [/from '\.\.\/\.\.\/hooks\/useDictationSession'/g, "from '@/features/practice/hooks/useDictationSession'"],
  [/from '\.\.\/\.\.\/hooks\/useSentenceBuilderSession'/g, "from '@/features/practice/hooks/useSentenceBuilderSession'"],
  [/from '\.\.\/EpiphanyLogo'/g, "from '@/shared/components/EpiphanyLogo'"],
  [/from '\.\.\/ConfigGroup'/g, "from '@/shared/components/ConfigGroup'"],
  [/from '\.\.\/LightbulbIcon'/g, "from '@/shared/components/LightbulbIcon'"],
  [/from '\.\.\/ProgressBar'/g, "from '@/shared/components/ProgressBar'"],
  [/from '\.\.\/PronunciationToggle'/g, "from '@/shared/components/PronunciationToggle'"],
  [/from '\.\.\/GreekWord'/g, "from '@/features/practice/screens/GreekWord'"],
  [/from '\.\.\/WordVisual'/g, "from '@/features/practice/screens/WordVisual'"],
  [/from '\.\.\/FlashCard'/g, "from '@/features/practice/screens/FlashCard'"],
  [/from '\.\.\/StudyMode'/g, "from '@/features/practice/screens/StudyMode'"],
  [/from '\.\.\/ChallengeMode'/g, "from '@/features/practice/screens/ChallengeMode'"],
  [/from '\.\.\/SessionComplete'/g, "from '@/features/practice/screens/SessionComplete'"],
  [/from '\.\.\/StreakBanner'/g, "from '@/features/practice/screens/StreakBanner'"],
  [/from '\.\.\/learn\/PatternText'/g, "from '@/shared/components/PatternText'"],
  [/from '\.\.\/learn\/GeneratedQuizQuestion'/g, "from '@/shared/quiz/GeneratedQuizQuestion'"],
  [/from '\.\.\/\.\.\/utils\//g, "from '@/utils/"],
  [/from '\.\.\/utils\//g, "from '@/utils/"],
  [/from '\.\.\/\.\.\/components\/practice\//g, "from '@/features/practice/components/"],
  [/from '\.\.\/\.\.\/components\/learn\//g, "from '@/features/learn/components/"],
  [/from '\.\.\/\.\.\/components\/read\//g, "from '@/features/read/components/"],
  [/from '\.\.\/practice\//g, "from '@/features/practice/components/"],
  [/from '\.\.\/read\//g, "from '@/features/read/components/"],
  [/from '\.\.\/learn\//g, "from '@/features/learn/components/"],
  [/from '\.\.\/\.\.\/data\/constants'/g, "from '@/data/constants'"],
  [/from '\.\.\/\.\.\/data\/homeConfig'/g, "from '@/data/homeConfig'"],
  [/from '\.\.\/homeConfig'/g, "from '@/data/homeConfig'"],
  [/from '\.\.\/learn\/topics'/g, "from '@/features/learn/data/topics'"],
  [/from '\.\.\/learn\/quiz\/profiles'/g, "from '@/features/learn/data/quiz/profiles'"],
  [/from '\.\.\/index'/g, "from '@/data'"],
  [/from '\.\.\/\.\.\/data'/g, "from '@/data'"],
  [/from '\.\.\/data\/constants'/g, "from '@/data/constants'"],
]

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      if (name === 'node_modules') continue
      walk(path, files)
    } else if (['.js', '.jsx'].includes(extname(name))) {
      files.push(path)
    }
  }
  return files
}

let count = 0
for (const file of walk(SRC)) {
  if (file.includes('node_modules')) continue
  let content = readFileSync(file, 'utf8')
  const original = content
  for (const [pattern, replacement] of REPLACEMENTS) {
    content = content.replace(pattern, replacement)
  }
  if (content !== original) {
    writeFileSync(file, content)
    count += 1
  }
}
console.log(`Updated imports in ${count} files`)
