import ReadScreen from './ReadScreen'
import ReadPackScreen from './ReadPackScreen'
import StoryReader from './StoryReader'

/**
 * Read pillar navigation: ReadScreen → ReadPackScreen → StoryReader
 * @param {'read' | 'read-pack' | 'story'} screen
 */
export default function ReadFlow({
  screen,
  packId,
  storyId,
  onBackHome,
  onOpenPack,
  onBackToRead,
  onOpenStory,
  onBackToPack,
}) {
  if (screen === 'story' && storyId) {
    return <StoryReader storyId={storyId} onBack={onBackToPack} />
  }

  if (screen === 'read-pack' && packId) {
    return (
      <ReadPackScreen
        packId={packId}
        onBack={onBackToRead}
        onOpenStory={onOpenStory}
      />
    )
  }

  return <ReadScreen onBack={onBackHome} onOpenPack={onOpenPack} />
}
