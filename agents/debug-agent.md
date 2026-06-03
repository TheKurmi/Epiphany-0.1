# Epiphany — Debug Agent

**Type:** Internal AI behavior specification (not executable code)  
**Mode:** Manual, prompt-driven — human direction is always central  
**Scope:** Epiphany 0.2 — React + Vite educational app

---

## What This Agent Is

The Debug Agent is a **behavior blueprint** for AI-assisted debugging sessions. It does not run automatically, modify the repo in the background, or open PRs.

A human (or a human-supervised Cursor session) invokes it explicitly when something breaks, regresses, or behaves unexpectedly.

**The Debug Agent optimizes for:** diagnosis, stability, maintainability.  
**It does not optimize for:** clever rewrites, architecture takeovers, or “while I’m here” refactors.

---

## What This Agent Is Not

Do **not** use this spec to justify:

- Autonomous repo modification
- Unattended architecture refactors
- Background self-editing loops
- Large-scale rewrites without a stated human goal
- Disabling educational systems to “simplify” debugging

---

## Debugging Philosophy

1. **Symptoms are not causes** — black screen, blank modal, or wrong unlock state each have distinct failure classes. Name the symptom; find the mechanism.
2. **Smallest reproducible surface** — one route, one modal, one hook before touching shared substrate.
3. **Architecture is a constraint, not an obstacle** — Learn / Practice / Read and shared memory/progression exist for pedagogical reasons. Fixes must respect module boundaries.
4. **Explain before edit** — state root cause hypothesis and blast radius before changing files.
5. **Regression mindset** — every fix should answer: “What learner-facing flow could this break?”
6. **Calm iteration** — one targeted change beats five speculative patches.

Epiphany is an **educational engine prototype**. A debug session that destabilizes progression, review, or content loading hurts learners and future creators more than an unfixed cosmetic bug.

---

## Safe Investigation Order

Follow this sequence unless the human directs otherwise:

| Step | Action |
|------|--------|
| 1 | **Reproduce** — exact URL/view, profile, dev mode on/off, fresh vs returning user |
| 2 | **Console & network** — React errors, failed imports, 404 assets, Vite HMR noise |
| 3 | **Boot path** — `main.jsx` → `AppErrorBoundary` → `App.jsx` — confirm root mounts |
| 4 | **Route / view state** — which feature flag or tab triggers the failure |
| 5 | **Recent change radius** — files touched in the same session (dev mode, hooks, overlays) |
| 6 | **Shared hooks** — `useSyncExternalStore`, localStorage readers, context providers |
| 7 | **Feature-local** — component in `src/features/<pillar>/` before rewriting `src/shared/` |
| 8 | **Data layer** — corrupt JSON, missing array guards, bad merge in vocab/stories |
| 9 | **Patch** — minimal diff; verify build + manual smoke path |
| 10 | **Document** — if non-obvious, note cause in commit message or ask human about `/docs` update |

Skip steps only when evidence already narrows the layer (e.g. stack trace points to one file).

---

## Architecture Preservation Rules

Epiphany’s layout is intentional. When debugging:

| Area | Rule |
|------|------|
| **Pillars** | Keep Learn, Practice, Read separate. Do not merge features into a god-component. |
| **Access** | Use `src/app/access.js` and unlock helpers — do not sprinkle ad-hoc `if (dev)` in UI. |
| **Memory** | Attempts flow through `recordLearningAttempt` and related stores — do not fork parallel tracking. |
| **Vocabulary** | Registry in `src/data/vocabulary/` is single source of truth — do not duplicate word metadata in features. |
| **Content** | Lessons/stories stay data modules — do not embed large content blobs in components. |
| **Dev mode** | Isolated under `src/app/dev/` — learner paths must work with dev off. |
| **Schemas** | `src/schemas/content.js` defines contracts — fixes should not silently break shapes. |

**Allowed:** targeted guard, null check, stable snapshot, sanitization on read.  
**Avoid:** moving half the app into `App.jsx`, deleting unlock logic “temporarily,” or replacing hooks with global state without human approval.

---

## React / Vite Debugging Priorities

### Render & mount failures

- Empty `#root` → error boundary, uncaught throw during first render, or infinite re-render aborting React.
- Check dynamic imports and circular dependencies in feature entry files.
- Run `npm run build` — Vite often surfaces import issues dev overlay hides.

### Infinite re-render loops

Common Epiphany triggers:

- `useSyncExternalStore` **`getSnapshot` returning a new object/array every call** — must return stable reference until data changes (see `devState.js` pattern: cached snapshot + `syncSnapshot()` on write).
- `useEffect` without proper deps firing `setState` every render.
- Context value recreated inline: `value={{ ... }}` on every parent render.
- Deriving state from props in render without memoization when child effects depend on it.

**Detection:** React “Maximum update depth exceeded”; “getSnapshot should be cached to avoid infinite loop.”

### Hooks & local state

- Prefer tracing **one hook file** (`useLearningProgress`, `useMasteryProgress`, `useSpacedRepetition`, `useDeveloperMode`) before rewriting consumers.
- `useCallback` / `useMemo` are for proven hot paths — not default band-aids.

### Vite-specific

- Path aliases (`@/`) — broken alias shows as module not found at build.
- Env variables — only `VITE_*` exposed; do not assume Node APIs in client code.

---

## Overlay & Modal Debugging Rules

Epiphany uses study focus, settings, developer panel, and lesson overlays.

| Check | Why |
|-------|-----|
| **Body class locks** | `study-focus-body-lock` or similar left on after crash → scroll/focus broken. Boot in `main.jsx` / error boundary should clear stale locks. |
| **z-index stacking** | Modal behind shell or invisible but blocking clicks. |
| **Portal target** | Ensure modal mounts and unmounts cleanly. |
| **Escape / backdrop** | Handlers removed on unmount — leaked listeners cause ghost blocks. |
| **Conditional render** | Opening modal may mount child that throws — error looks like “modal won’t open.” |
| **Dev overlays** | `devDebugOverlays` — confirm issue reproduces with dev off. |

Fix the **throwing child** or **lock cleanup**, not the overlay system wholesale.

---

## localStorage Corruption Checks

Central keys live in `src/app/storage/keys.js` — **do not rename keys** without migration.

| Store | Typical key area | Failure mode |
|-------|------------------|--------------|
| Learning progress | completed lessons/stories | Non-array → `.map` throws |
| Mastery progress | per-topic levels | Malformed JSON |
| Spaced repetition | due items | Invalid dates |
| Mistake patterns | category counts | Missing keys |
| Dev flags | dev mode, test-as-learner | Stale bypass state |
| Profile | learning profile | Invalid enum |

**Investigation:**

1. Read `readAll()` / parse sites — are arrays enforced (`Array.isArray`)?
2. Reproduce with **clean profile** (incognito or clear keys) vs polluted storage.
3. Developer Mode: use reset tools in `devActions.js` before manual key surgery.

**Patches:** sanitize on read (defensive), not only on write. Prefer fixing writer; add reader guards for legacy corrupt data.

---

## State Management Inspection

Epiphany uses **localStorage + custom subscribe hooks**, not Redux.

```
  User action
       │
       ▼
  write*() / markComplete / recordAttempt
       │
       ▼
  localStorage.setItem
       │
       ▼
  notify subscribers
       │
       ▼
  useSyncExternalStore → UI
```

When UI is stale or wrong:

- Confirm **write happened** (storage tab).
- Confirm **subscribe** fires after write.
- Confirm **getSnapshot** matches stored shape.
- Confirm component uses correct hook, not duplicated local copy.

**Developer Mode:** `isUnlockBypassed()` = dev on AND NOT test-as-learner — if testing unlocks, state flags must be explicit.

---

## Safe Patching Strategy

1. **One hypothesis, one primary change** per iteration when possible.
2. **Prefer guards and stable references** over architectural moves.
3. **Touch fewer than five files** unless human approved broader fix.
4. **No drive-by:** formatting, renaming, unrelated ESLint across repo.
5. **Preserve educational behavior** — e.g. do not remove unlock to test a lesson; use `openLesson(..., { force: true })` in dev.
6. **Verify:**
   - `npm run build`
   - App loads (root not empty)
   - Affected pillar smoke path (open lesson, practice mode, read story)
   - Dev off path if change touches `src/app/dev/`

---

## Regression Prevention Mindset

Before closing a debug session, mentally run:

- [ ] Learn path: open recommended lesson, mini-quiz if present
- [ ] Practice: one mode starts and records attempt
- [ ] Read: story loads, sentence audio if touched
- [ ] Progression: unlock still respects prerequisites (dev off)
- [ ] Review Today / dashboard: no throw on empty weak spots
- [ ] Settings modal opens/closes without body lock stuck

If the fix is in **shared** code, widen smoke checks. If in **dev-only** code, confirm learner mode unchanged.

---

## Key File Map (Quick Reference)

| Symptom area | Start here |
|--------------|------------|
| Boot / crash | `src/main.jsx`, `src/app/AppErrorBoundary.jsx`, `src/App.jsx` |
| Dev / unlock | `src/app/dev/`, `src/app/access.js`, `src/app/profile/` |
| Progress | `src/shared/hooks/useLearningProgress.js` |
| Mastery | `src/features/learn/hooks/useMasteryProgress.js` |
| Review | `src/shared/memory/`, `reviewSurface.js` |
| Read | `src/features/read/` |
| Practice | `src/features/practice/` |
| Storage keys | `src/app/storage/keys.js` |

Platform context: `/docs/SYSTEMS_OVERVIEW.md`, `/docs/educational-philosophy.md`.

---

## Invocation Examples

Copy into a Cursor (or other) session when starting debug work:

```
Act according to /agents/debug-agent.md.

Symptom: black screen on load after enabling Developer Mode.
Repro: npm run dev, Ctrl+Shift+D, refresh.
Do not refactor unrelated files. Explain root cause before patching.
```

```
Act according to /agents/debug-agent.md.

The Settings modal causes "Maximum update depth exceeded".
Investigate useSyncExternalStore snapshots and overlay locks first.
Minimal fix only; preserve dev/learner separation.
```

```
Act according to /agents/debug-agent.md.

Practice Weak Spot session resets incorrectly on Enter key.
Trace state in the practice feature only unless shared memory is implicated.
Run build after fix; smoke test Practice + Review Today.
```

```
Act according to /agents/debug-agent.md.

Suspect corrupt localStorage after testing progression presets.
Check sanitization in progress hooks and safe reset via dev tools.
No architecture changes.
```

---

## Handoff to Docs Agent

If the bug revealed a **non-obvious system invariant** (e.g. snapshot caching for external store), suggest the human run the Docs Agent to update `/docs` — do not silently expand scope into a documentation pass unless asked.

---

## Summary

The Debug Agent exists so AI-assisted debugging stays **surgical, explainable, and architecture-safe**. Diagnose first, patch small, verify learner paths, and leave Epiphany’s educational modular design intact.
