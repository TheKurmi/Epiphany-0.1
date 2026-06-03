# Adaptive Review System

Epiphany’s adaptive layer is built for **calm, intelligent reinforcement** — helping learners notice what needs attention without turning learning into a punitive game.

---

## Design Intent

Traditional apps optimize for **retention metrics** (streaks, XP, leaderboards). Epiphany optimizes for **comprehension signals**:

- Which **grammar patterns** break under pressure?
- Which **words** are due for memory refresh?
- Which **lessons** naturally come next?
- What **confidence language** reflects real growth?

Adaptation should feel like a thoughtful tutor saying: “Let’s revisit this — you’re close,” not “You failed level 3.”

---

## System Components

```
  Practice / Quiz attempts
           │
           ▼
  recordLearningAttempt()
           │
     ┌─────┴─────┬─────────────┐
     ▼           ▼             ▼
 Mastery      Spaced        Mistake
 weakPatterns repetition   patterns
     │           │             │
     └─────┬─────┴─────────────┘
           ▼
   buildReviewTodayItems()
   getSmartGuidance()
   getConfidenceMessages()
           │
           ▼
   ReviewTodayPanel · Weak Spot · Recommendations
```

---

## Weak Spot Tracking

**Mastery progress** stores per-topic:

- Level stats (attempts, correct, nearMiss, wrong) across mastery tiers 1–4.
- `weakPatterns` — map of `patternTag → count` from wrong/near-miss answers.

Pattern tags are **semantic handles** (`verb-present`, `article-feminine`, `plural-neuter`, `verb-aspect`) attached at exercise generation time.

**Weak Spot practice mode** aggregates tags across topics and biases drills toward the highest-count patterns.

Why tags, not raw words? Grammar generalizes; fixing “ει vs ι” once helps many words.

---

## Mistake Pattern Intelligence

`mistakePatterns.js` classifies errors into categories:

| Category | Typical signal |
|----------|----------------|
| `vowel_confusion` | ει/η/ι/οι interchange |
| `accent` | Normalized match but wrong diacritics |
| `article` | Article gender/number mismatch |
| `tense_selection` | Past/aspect verb form errors |
| `plural` | Plural ending errors |
| `adjective_agreement` | Agreement failures |
| `spelling` | General near-miss |

Classification is **rule-based and explainable** — suitable for creator-facing reports later.

`getTopMistakeCategory()` feeds Review Today: “You often struggle with vowel confusion — a focused review would help.”

---

## Spaced Repetition

A lightweight store (`epiphany-spaced-repetition`) tracks:

- `type` + `id` keys (e.g. `pattern:present-tense:verb-present`, `vocab:…`).
- **Strength** 0–5 adjusted by correct / wrong / near-miss.
- **nextReview** datetime — stronger items schedule farther out.

`getDueReviews()` powers Review Today “due” items.

Philosophy: **short horizons** (days, not months) suited to active course progression, not Anki-decades.

---

## Resurfacing Logic (Review Today)

`reviewSurface.js` merges signals into a capped list (default 5 items):

1. **Due** spaced-repetition entries.
2. **Forgotten** weak strength items.
3. **Curriculum recommendations** from `getReviewRecommendations(weakSpots)`.
4. **Dominant mistake category** if count threshold met.
5. **Tense reinforcement** if time-and-aspect lesson done but mastery low.
6. **Low mastery topics** needing gentle nudge.

Each item includes a **human message** and suggested action (`practice`, `weak-spot`, lesson id).

No item says “You lost 50 points.”

---

## Smart Recommendations

`curriculum/recommendations.js` connects:

- Completed lessons → next lesson on path.
- Weak spots → topic + practice mode suggestions.
- Unread stories in unlocked packs → reading suggestions.

`SmartRecommendations` on home/dashboard surfaces **next lesson** and **suggested review** without overwhelming the learner.

---

## Confidence Messages

`getConfidenceMessages()` produces understanding-focused feedback tied to real progress:

- Lesson completions (present tense, plurals, time-and-aspect).
- Mastery thresholds per topic.

Messages are **descriptive of competence**, not rewards. Shown sparingly on the progress dashboard.

---

## Learner Adaptation (Profiles)

**Learning profiles** (`beginner`, `intermediate`, `fluent`) adjust:

- Recommended starting lesson.
- Default practice difficulty band.

Profiles affect **guidance**, not hard locks (unless combined with progression prerequisites).

Future: struggling-learner simulation in Developer Mode validates resurfacing without live user data.

---

## Integration Points

| Consumer | Behavior |
|----------|----------|
| `recordLearningAttempt` | Unified write after practice/quiz |
| `ReviewTodayPanel` | Home + Learn surfacing |
| `ProgressDashboard` | Stats + confidence |
| `Weak Spot` mode | Pattern-biased drills |
| `PracticeConfig` | Suggested mode from review |
| `ReadingSentence` | Contextual grammar hints (related system) |

---

## Future Scalability

- **Creator dashboards** — mistake histograms per cohort.
- **Tutor assignments** — “Review these pattern tags this week.”
- **Cross-pillar scheduling** — dialogue line due for dictation + read.
- **Configurable resurfacing caps** — ADHD mode: fewer items, clearer priority.
- **Explainable AI assist** — suggest review messages, not black-box ranking.

Core principle unchanged: **learners trust the system when they understand why something resurfaced.**

---

## Anti-Patterns

- Punitive streak loss messaging.
- Unexplained “daily goals” with arbitrary counts.
- Resurfacing items with no actionable next step.
- Competing notification systems (email push, etc.) without calm UX alignment.

Epiphany adaptive review should always answer: **what should I do next, and why?**
