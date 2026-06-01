import PronunciationToggle from '@/shared/components/PronunciationToggle'
import SettingsModal from '@/features/settings/SettingsModal'
import { isLearnScreen, isPracticeScreen, isReadScreen } from '@/app/navigation/screens'

export default function AppShell({
  screen,
  showPronunciation,
  onPronunciationChange,
  darkMode,
  setDarkMode,
  isSettingsOpen,
  onOpenSettings,
  onCloseSettings,
  children,
}) {
  const showPronunciationToggle =
    isLearnScreen(screen) || isPracticeScreen(screen) || isReadScreen(screen)

  return (
    <div className="app-shell">
      {showPronunciationToggle ? (
        <PronunciationToggle
          enabled={showPronunciation}
          onChange={onPronunciationChange}
        />
      ) : null}

      <div className={`view-screen view-screen--${screen}`} key={screen}>
        <button
          type="button"
          className="settings-trigger"
          onClick={onOpenSettings}
          aria-label="Open settings"
        >
          ⚙️
        </button>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={onCloseSettings}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {children}
      </div>
    </div>
  )
}
