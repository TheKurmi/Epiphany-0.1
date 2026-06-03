# Progression System

Progression in Epiphany answers: **what can this learner access right now, and what have they actually learned?** It spans lessons, readings, mastery quizzes, and reading difficulty tiers.

---

## Layers of Progress

| Layer | Storage / module | What it tracks |
|-------|------------------|----------------|
| Lesson completion | `epiphany-learning-progress` | `completedLessons[]`, streak, activity |
| Story completion | same | `completedStories[]`, reading sessions |
| Topic mastery | `epiphany-learn-mastery` | Per-topic quiz levels, weak patterns |
| Spaced repetition | `epiphany-spaced-repetition` | Review scheduling |
| Mistake patterns | `epiphany-mistake-patterns` | Error taxonomy counts |

Layers are **intentionally separate stores** — easy to reset or simulate independently in Developer Mode.

---

## Unlock Model

Central access API (`src/app/access.js`):

- `isLessonUnlocked(lessonId, completedLessons)`
- `isPackUnlocked(packId, completedLessons)`
- `isMasteryLevelUnlocked(levelId, unlockedLevel)`

Checks prerequisites from `LESSON_PREREQUISITES` and pack `unlockLessons` / `starter` flags.

**Developer bypass** (`isDevUnlockActive`) unlocks content for QA without mutating learner data — unless “Test as learner” mode restores real gates.

Philosophy: **soft guidance, hard minimums** — you can browse ahead in topics, but packs and lessons respect prerequisites unless testing.

---

## Lesson Progression

- Lessons have `pathOrder` for display sorting.
- `LEARNING_PATH` defines canonical sequence.
- Completing a lesson fires `markLessonComplete()` → unlocks dependent lessons and packs.
- Lesson screens can link to **topic mastery** quizzes.

Advanced lessons on roadmap appear as topics with `comingSoon: true` — progression UI shows future breadth.

---

## Reading Progression

### Pack unlocks

Packs declare:

- `starter: true` — available immediately.
- `unlockLessons: [...]` — all listed lessons must be complete.
- `readingTier: 1–4` — difficulty label for UI and suggestions.

`getSuggestedReadingTier(completedLessons)` caps recommended input complexity based on grammar milestones (e.g. time-and-aspect → tier 3).

### Story completion

Stories track separately from lessons — a learner can read without “finishing” every lesson if packs are unlocked (via dev or progression). Completion feeds stats and confidence.

---

## Mastery Progression (Per Topic)

Four **mastery levels** per topic:

1. Recognition (multiple choice)
2. Controlled production (typing)
3. Sentence usage (context)
4. Mixed practice

Passing a session at threshold unlocks next level. `masteryPercent` aggregates accuracy across levels.

Weak patterns accumulate at level 1+ — feeding adaptive review.

---

## Reading Tiers (Input Difficulty)

Orthogonal to pack unlocks — describes **linguistic complexity**:

| Tier | Typical content |
|------|-----------------|
| 1 | Present tense, simple vocab |
| 2 | Past introduction, richer dialogue |
| 3 | Tense contrasts, natural conversation |
| 4 | Idioms, aspect nuance, advanced flow |

Packs set `readingTier` explicitly or via `inferReadingTier()` from unlock lessons.

Tiers communicate expectations — they do not auto-block individual stories unless combined with pack locks.

---

## Streaks & Activity

- `touchStreak()` on lesson/story completion and practice activity.
- Streak celebrates **habit**, not skill.
- Confetti at practice milestones — rare, not constant.

---

## Confidence & Dashboard

`useProgressDashboard` aggregates:

- Path percent complete.
- Average mastery.
- Strongest/weakest topics.
- Weak spot list.
- Recommended next lesson.

Copy emphasizes **understanding**, not rank.

---

## Simulation & Recovery

Developer tools:

- Reset all progression.
- Apply beginner/intermediate/advanced presets.
- Mark all lessons/stories complete.
- Inject weak spots and mistake profiles.

Corrupted localStorage is sanitized on read (arrays enforced for completed lists).

---

## Future Scalability

- **Per-creator progression** — separate trees for third-party courses.
- **Placement tests** — skip prerequisites with verified competence.
- **Cohort sync** — classroom progress (with privacy controls).
- **Adaptive unlock** — optional “unlock tier 3 reads after strong past-tense quiz” beyond static lesson lists.

Core model remains: **explicit prerequisites + transparent tiers + separate mastery track**.

---

## Design Principle

Progression should feel like **doors opening** as understanding grows — not like arbitrary locks punishing exploration.

Every gate should be explainable: “Complete *Present Tense Endings* to unlock *School & Study* readings.”
