import HomePage from '@/features/home/HomePage'
import LearnScreen from '@/features/learn/components/LearnScreen'
import TopicScreen from '@/features/learn/components/TopicScreen'
import LessonScreen from '@/features/learn/components/LessonScreen'
import MasteryQuizSession from '@/features/learn/components/MasteryQuizSession'
import PracticeHub from '@/features/practice/screens/PracticeHub'
import PracticeConfigScreen from '@/features/practice/screens/PracticeConfigScreen'
import SessionScreen from '@/features/practice/screens/SessionScreen'
import ReadFlow from '@/features/read/components/ReadFlow'
import { SCREENS, isLearnScreen, isReadScreen } from '@/app/navigation/screens'
import { getActivityMeta } from '@/features/practice/data/modes'

export default function ScreenRouter({
  screen,
  selection,
  nav,
  practice,
  preferences,
}) {
  const { showPronunciation } = preferences
  const {
    draftConfig,
    activeConfig,
    updateDraft,
    sessions,
    studyReviewed,
    celebration,
    onStartSession,
    onExitSession,
    onReturnToFlashcards,
    onPracticeAnswer,
    onStudyReviewed,
    onSelectPracticeMode,
  } = practice

  if (screen === SCREENS.HOME) {
    return (
      <HomePage
        onLearn={nav.openLearn}
        onPractice={nav.openPractice}
        onRead={nav.openRead}
      />
    )
  }

  if (screen === SCREENS.PRACTICE) {
    return (
      <PracticeHub onSelectMode={onSelectPracticeMode} onBack={nav.backFromPractice} />
    )
  }

  if (screen === SCREENS.PRACTICE_CONFIG) {
    return (
      <PracticeConfigScreen
        config={draftConfig}
        onChange={updateDraft}
        onStart={onStartSession}
        onBack={nav.backFromPracticeConfig}
      />
    )
  }

  if (screen === SCREENS.LEARN) {
    return (
      <LearnScreen
        onBack={nav.backFromLearn}
        onOpenTopic={nav.openTopic}
        onOpenLesson={nav.openLesson}
      />
    )
  }

  if (screen === SCREENS.TOPIC) {
    return (
      <TopicScreen
        topicId={selection.topicId}
        onBack={nav.backFromTopic}
        onOpenLesson={nav.openLesson}
        onStartMastery={(level) => nav.startMasteryQuiz(selection.topicId, level)}
      />
    )
  }

  if (screen === SCREENS.LESSON) {
    return (
      <LessonScreen
        lessonId={selection.lessonId}
        onBack={nav.backFromLesson}
        onOpenMastery={nav.openMasteryFromLesson}
        showPronunciation={showPronunciation}
      />
    )
  }

  if (screen === SCREENS.MASTERY_QUIZ) {
    return (
      <MasteryQuizSession
        topicId={selection.topicId}
        masteryLevel={selection.masteryLevel}
        onBack={nav.backFromMasteryQuiz}
        onComplete={nav.completeMasteryQuiz}
      />
    )
  }

  if (isReadScreen(screen)) {
    return (
      <ReadFlow
        screen={screen}
        packId={selection.packId}
        storyId={selection.storyId}
        onBackHome={nav.backFromRead}
        onOpenPack={nav.openReadPack}
        onBackToRead={nav.backFromReadPack}
        onOpenStory={nav.openStory}
        onBackToPack={nav.backFromStory}
      />
    )
  }

  if (screen === SCREENS.SESSION && activeConfig) {
    return (
      <SessionScreen
        config={activeConfig}
        activityMeta={getActivityMeta(activeConfig.activityMode)}
        study={sessions.study}
        challenge={sessions.challenge}
        typing={sessions.typing}
        quickGrammar={sessions.quickGrammar}
        dictation={sessions.dictation}
        sentenceBuilder={sessions.sentenceBuilder}
        weakSpot={sessions.weakSpot}
        studyReviewed={studyReviewed}
        celebration={celebration}
        showPronunciation={showPronunciation}
        onExit={onExitSession}
        onReturnToFlashcards={onReturnToFlashcards}
        onPracticeAnswer={onPracticeAnswer}
        onStudyReviewed={onStudyReviewed}
      />
    )
  }

  return null
}
