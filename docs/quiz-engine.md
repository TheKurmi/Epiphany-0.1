# Quiz Engine

Epiphany’s quiz engine is a **reusable assessment layer** — not a pile of one-off screens. Questions are **generated** from topic profiles so new grammar topics can ship by adding data, not rewriting UI.

---

## Purpose

Quizzes exist to verify **understanding in context**, not to drill isolated facts:

- Can the learner **recognize** the right form?
- Can they **produce** it under light pressure?
- Can they use it in a **sentence**?
- Can they **mix** patterns when the scaffold drops?

Mastery quizzes gate topic depth; mini-quizzes inside lessons give immediate feedback without full sessions.

---

## Architecture

```
  Topic (learn topic id)
        │
        ▼
  QUIZ_PROFILES[topicId]  ──► profile.type
        │
        ▼
  generateQuestion(topicId, masteryLevel)
        │
   ┌────┴────┬─────────┬──────────┬────────────┐
   ▼         ▼         ▼          ▼            ▼
conjugation articles negation sentence vocabulary
   │
   └── mastery 1: optional ending-recognition branch
```

**Profiles** declare the grammar domain: verb stems, noun genders, sentence templates, vocab pools. **Generators** turn profiles into concrete questions with `patternTag` for adaptive tracking.

---

## Quiz Types (Profile Families)

| Profile type | What it assesses | Typical mastery progression |
|--------------|------------------|----------------------------|
| `conjugation` | Verb endings, persons, stems | MC → type form → sentence with verb |
| `articles` | Gender–article agreement | MC article choice → fill blank |
| `negation` | δεν placement, negative forms | Recognition → production |
| `sentence` | Word order, agreement in context | Sentence blanks, hints |
| `vocabulary` | Word meaning and recall | MC and typed recall from registry |

Question **surface types**:

- `multipleChoice` — recognition tier.
- `fillBlank` — controlled production.
- `sentenceBlank` — contextual completion.

Each generated question carries optional `patternTag` (e.g. `verb-present`, `article-feminine`) for weak-spot and spaced repetition.

---

## Mastery Levels (Progressive Rigor)

Four tiers per topic (`MASTERY_LEVELS`):

1. **Recognition** — multiple choice, lower stakes.
2. **Controlled production** — typing conjugations and blanks.
3. **Sentence usage** — complete sentences in context.
4. **Mixed practice** — randomized mix, slightly higher pass threshold.

Sessions are short (5–6 questions). Pass thresholds (~60–65%) favor **competence signals** over perfectionism.

Unlocking level N+1 requires passing level N — tied to `isMasteryLevelUnlocked` in the access layer.

---

## Adaptive Quiz Potential

Today:

- Every attempt flows through `recordLearningAttempt()` with topic, pattern tag, and outcome.
- Weak patterns aggregate per topic for Weak Spot mode.
- Review Today can recommend a topic’s next mastery level or practice mode.

Tomorrow (same engine):

- **Bias question generation** toward weak `patternTag`s at level 4.
- **Dynamic profile expansion** — pull distractors from learner’s mistake history.
- **Cross-topic mixed sessions** — “grammar you’ve studied this week.”
- **Creator-defined profiles** — validated JSON added to `QUIZ_PROFILES` catalog.

The engine stays **declarative**: adaptation changes *which* profile fields are stressed, not the UI contract.

---

## Other Assessment Surfaces

Not all quizzes use the mastery engine:

| Surface | Role |
|---------|------|
| **Lesson mini-quiz** | `generateMiniQuiz(topicId)` — single level-1 check inline |
| **Reading comprehension** | Per-story `comprehension[]` — fixed Q&A after read |
| **Practice modes** | Flashcards, typing, dictation — separate generators, same memory layer |
| **Quick Challenge** | Timed variety pool — engagement without mastery gating |

These share **attempt recording** and philosophy; they differ in **session shape** and **progression coupling**.

---

## Progression Integration

- Topics map to `TOPIC_PRIMARY_LESSON` and quiz profiles.
- Completing mastery levels increases `masteryPercent` on the progress dashboard.
- Low mastery triggers gentle recommendations — not lockouts of unrelated content.
- Developer Mode can simulate struggling profiles to test resurfacing.

---

## Educational Philosophy Behind Quizzes

- **Understanding over memorization** — sentence tier before endless ending drills.
- **Pattern tags over word shame** — “verb-aspect” not “you failed word #412.”
- **Calm sessions** — short, passable, retry-friendly.
- **Spiral alignment** — quiz profiles mirror lesson grammar (same stems, same nouns).

Quizzes are **confirmation of acquisition**, not the primary teaching surface. Learn teaches; Practice reinforces; Quiz **certifies** readiness to move on or revisit.

---

## Future Creator-Generated Quizzes

Creators will:

1. Pick a **profile type** or extend an official template.
2. Supply **data pools** (verbs, templates, distractors) within schema limits.
3. Attach **pattern tags** for adaptive compatibility.
4. Preview sessions at each mastery level.
5. Publish as part of a **course module** with unlock rules.

Platform validates profiles before merge — no arbitrary code in generators.

---

## Summary

The quiz engine is Epiphany’s **assessment primitive**: profile-driven generation, four mastery tiers, pattern-tagged outcomes, and a clear path toward adaptive and creator-authored assessments without fragmenting the learner experience.
