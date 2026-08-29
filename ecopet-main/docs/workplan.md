# Work Split — Relay Model, 3 People, 24 Hours

Companion to `CLAUDE.md`. That file says *what* we build; this says *who builds which part,
in what order, and the gate they pass before handing over*.

**We build in laps, not in parallel.** One person has the repo at a time. They build their
layer, prove it works, and hand it over. The next person builds on top of it.

```
   LAP 1                    LAP 2                    LAP 3
   Foundation      ──▶      Experience      ──▶      Intelligence & Ship
   Person A                 Person B                 Person C
   H1 – H7                  H7 – H15                 H15 – H22

   plumbing that works      the app people use       real AI, retention, deploy
   (ugly, navigable)        (polished, mock AI)      (live, demo-proof)
```

### Why this order

Each lap can only start once the one below it exists. Types and state before screens; screens
before AI. And it **degrades gracefully**: after Lap 2 you already have a complete, demoable
app running on mock AI. Lap 3 makes it real. If Lap 3 runs short, you still have something to
show — which would not be true in any other ordering.

### The one rule

**Only one person edits the repo at a time.** Say it out loud in the group chat:
*"Taking the repo"* … *"Repo is yours."* That single habit removes every merge conflict you
would otherwise spend the night fighting.

---

## Who should be who

| | Pick the person who is… | Hours |
|---|---|---|
| **A — Foundation** | Most comfortable with TypeScript, data and logic. Tidy. Starts strong. | 6 |
| **B — Experience** | The best designer / most visual. This is the biggest lap and carries most of the grade. | 8 |
| **C — Intelligence & Ship** | Most comfortable with APIs, keys and deployment. Calm under time pressure — this lap ends closest to the deadline. | 7 |

---

## Git, for people who have not done this before

You need **one branch: `main`**. No branches, no pull requests, no merging. That is the whole
payoff of the relay.

```bash
# ONCE, the first time you clone — hooks do not travel with a clone,
# and without this the secret scanner silently does nothing on your machine
git config core.hooksPath .githooks

# starting your lap
git pull

# any time during your lap — commit early, commit often
git add -A
git commit -m "what you did"
git push

# ending your lap: push, then post the handoff note
```

If you are not on your lap, **do not push.** That is the only way this breaks.

### Secrets

The API key lives in `backend/.env`, which is gitignored. Copy `backend/.env.example` to
`backend/.env` and fill it in; in production it is a Vercel environment variable, not a file.

`scripts/check-secrets.sh` runs on every commit via the pre-commit hook and blocks a commit
that contains an API key, a `.env` file, or any frontend reference to a secret — Vite inlines
every `VITE_*` variable into the public browser bundle. Run it by hand any time with
`bash scripts/check-secrets.sh`.

**If a key ever does get committed, rotate it.** Deleting the file is not enough; it stays in
git history forever.

### The handoff note (post in the group chat, every time)

```
HANDOFF — Lap 1 complete
Pushed:      <commit link or hash>
Works:       full navigation, mock scan awards credits, state survives reload
Stubbed:     pet is a grey box, screens are wireframes, AI is mockIdentify()
Start here:  frontend/src/screens/ — replace the placeholders
Known issue: Shop screen has no layout yet, just buttons
```

---

## Off-lap work (this is what stops two people sitting idle)

None of this touches the repo. Do it while you are waiting for your lap.

| Person | While waiting | Why it matters |
|---|---|---|
| **B** (waiting H1–H7) | Draw all 6 pets — paper, Figma, or a standalone `.html` scratch file. Export or hand-write the SVG paths. Decide the 5 mood faces. | You arrive at H7 with art ready to **paste**, so your 8 hours are spent coding, not designing. This is the single highest-leverage prep in the whole plan. |
| **C** (waiting H1–H15) | Create the Vercel + OpenAI accounts and keys. In a **scratch folder outside the repo**, write a plain Node script that sends one photo to `gpt-4o-mini` with a strict JSON schema and prints the result. Iterate the prompt until it reliably classifies a can, a bottle and a pizza box. Also: source every CO₂ figure into `docs/sources.md`, write `docs/demo-script.md`. | You arrive at H15 with a **prompt that already works**. Your lap becomes wiring, not experimenting. |
| **A** (free after H7) | Sleep first. Then: write the pitch, storyboard the video, fact-check C's CO₂ citations. | The relay lets people sleep in shifts — a real advantage over working in parallel. |

**H0–H1, all three together:** agree names, exchange repo access, confirm who is A/B/C, and
write `docs/demo-script.md` — the exact taps the video will show. Then A takes the repo and
the other two go do their prep.

---

# LAP 1 · Person A — Foundation
### H1 – H7 · "the plumbing works, it just looks like a wireframe"

Your job is that B never has to think about data. When you hand over, every number, every
store and every navigation path already works — it is simply ugly.

**You build no pet and no visual design.** Resist it.

### What you build

**1 · Scaffold** — Vite + React + TS + Tailwind. Install **every dependency now** so nobody
ever reopens `package.json`:
```
frontend: react react-dom framer-motion zustand clsx
          + tailwindcss postcss autoprefixer typescript vite @vitejs/plugin-react
```

**2 · `shared/types.ts`**
```ts
export type Material =
  | 'aluminium' | 'pet_plastic' | 'hdpe_plastic'
  | 'steel' | 'glass' | 'paper_cardboard' | 'non_recyclable';

export interface IdentifyResult {
  material: Material;
  itemType: string;          // "500ml drink bottle"
  estimatedGrams: number;
  recyclable: boolean;
  rinseNeeded: boolean;
  confidence: number;        // 0–1
}

export type PetMood = 'idle' | 'happy' | 'eating' | 'sleepy' | 'sad';
export type PetSpeciesId = 'sprout' | 'bloop' | 'pebble' | 'nimbus' | 'fern' | 'coco';
export type AccessoryId = 'hat' | 'scarf' | 'glasses' | 'leafCrown';
```

**3 · `styles/tokens.css`** — the 8 CSS variables from `CLAUDE.md` §7 + the rounded-sans font.

**4 · State** — `store/usePetStore.ts`, `store/useProgressStore.ts`, `store/persist.ts`
```ts
usePetStore()      → { species, name, mood, hunger, owned, worn, feed(), wear(), setSpecies() }
useProgressStore() → { credits, streak, streakFreezes, scans[], baseline,
                       awardScan(), spend() }
```
Zustand with `localStorage` persist, versioned key.

**5 · Data tables**

| File | Shape |
|---|---|
| `data/emissionFactors.ts` | `Record<Material, { kgCo2ePerKg, typicalGrams, source }>` — **`source` is a URL and is mandatory** |
| `data/binRules.ts` | `Record<Material, { accepted, rinseNeeded, stream, note }>` — Singapore blue-bin rules |
| `data/equivalences.ts` | Tiered units: phone charges → km driven → tree-years → flight legs |
| `data/shopItems.ts` | 3 foods + 4 accessories with prices |

**6 · Logic (no JSX in any of these)**

| File | Exports |
|---|---|
| `features/impact/computeCo2.ts` | `computeCo2(material, grams): number` |
| `features/impact/equivalence.ts` | `equivalenceFor(kg): { value, unit, phrase }` — **picks the tier that makes the number legible** |
| `features/impact/metrics.ts` | `itemsThisWeek()`, `baselineDelta()`, `correctSortingRate()`, `cumulativeCo2()` |
| `features/economy/credits.ts` | Award rules |
| `features/scan/mockIdentify.ts` | Resolves a hardcoded `IdentifyResult` after 1.5s. **Accepts a flag to force `lowConfidence` or `error`** — B needs this to build the failure branches |
| `features/scan/capture.ts` | File input → canvas downscale to 768px → JPEG compress |

**7 · The UI kit** — `components/`: `Button` (primary/secondary/ghost, loading), `Card`,
`Chip`, `Sheet` (bottom sheet), `Counter`, `ProgressBar`. Styled from tokens. Plain, not pretty.

**8 · The shell** — `App.tsx` with a screen state machine
(`onboarding | home | scan | shop | stats`) plus a `?dev=` escape hatch, and **six placeholder
screens** in `screens/`. Each renders its own name and the buttons needed to reach the next
screen. Onboarding's **baseline question must be real and must save** — it is the one piece of
Lap 1 UI that ships as-is.

**9 · `docs/sources.md`** — one row per factor: value, source, URL, date accessed.

### 🚦 EXIT GATE A — all ten, before you post the handoff

1. Fresh clone → `npm install && npm run dev` → app loads with **zero console errors**.
2. Navigate to all six screens and back again. No dead ends.
3. Onboarding's baseline question saves; reload the page → **the answer survives**.
4. Console: `computeCo2('aluminium', 15)` ≈ `0.135`.
5. Console: `equivalenceFor(0.135)` returns **phone charges or km — not "0.006 trees"**.
   `equivalenceFor(40)` returns trees.
6. Run a mock scan → credits increase, the scan appears in the log, survives a reload.
7. `mockIdentify({ force: 'lowConfidence' })` and `{ force: 'error' }` both behave as documented.
8. **Every** row in `emissionFactors.ts` has a real source URL, and `docs/sources.md` matches.
9. `grep -rE "jsx|tsx|React" frontend/src/features/` → **returns nothing.** Logic only.
10. `npm run build` succeeds. Push. Post the handoff note.

### ✅ ENTRY GATE — B runs this before starting Lap 2 (5 minutes)

> Do not build on a foundation you have not tested yourself.
>
> 1. Fresh clone on **your** machine → `npm install && npm run dev` → it runs.
> 2. Walk the whole flow, do a mock scan, reload → state survives.
> 3. Import `Button` into a scratch file → it renders and looks tokenized.
>
> Any failure → hand it straight back to A. Five minutes now beats three hours at 4am.

---

# LAP 2 · Person B — Experience
### H7 – H15 · "the app a real person would want to use"

Everything the judges see is yours. A's plumbing works; you make it something people enjoy.
**You write no maths** — every number comes from A's selectors. If you find yourself typing
`Math.`, you are in the wrong file.

### What you build

**1 · The pet subsystem** — `frontend/src/pet/`

| File | Contents |
|---|---|
| `pet/types.ts` | `PetProps`, `SpeciesDef`, `PetReaction` |
| `pet/registry.ts` | `PET_SPECIES: SpeciesDef[]` — 6 entries, each `{ id, displayName, fill, blurb, Body, anchors }` |
| `pet/species/{Sprout,Bloop,Pebble,Nimbus,Fern,Coco}.tsx` | Each: `({ fill, children }) => <svg viewBox="0 0 200 200">…</svg>`. Body, limbs, distinguishing feature, and `{children}` as the face slot. **No face, no logic.** |
| `pet/faces/Eyes.tsx`, `pet/faces/Mouth.tsx` | `({ mood }) => JSX` — 5 branches each, shared by all six species |
| `pet/Pet.tsx` | `({ species, mood, accessories, reaction, size, onTap })` |
| `pet/PetPicker.tsx` | `({ value, onChange })` — 6-tile grid |
| `pet/accessories/` | `ACCESSORIES` registry + Hat, Scarf, Glasses, LeafCrown |
| `pet/animations/variants.ts` | `idle`, `wobble`, `tapSquash`, `dragTilt`, `sleepyTilt` (timings in `CLAUDE.md` §6) + a `prefers-reduced-motion` guard |
| `pet/animations/usePetReaction.ts` | `usePetReaction()` → `{ controls, trigger(r) }`, auto-returns to `idle` |
| `pet/PetGallery.tsx` | Dev harness at `?dev=pets` — a 6×5 grid with Feed/Tap buttons |

> **Anchor points — decide this in your first 20 minutes.** Every `SpeciesDef` declares
> `anchors: { head: [x, y], neck: [x, y] }` in the 200×200 viewBox, and accessories position
> off those. Get it right and one hat fits all six pets. Skip it and you rebuild six SVGs at
> hour 13.

**2 · The six real screens** — replace A's placeholders

| Screen | Must contain |
|---|---|
| `Onboarding.tsx` | 3 steps: pick a pet (`<PetPicker/>`) → name it (12-char cap) → **the baseline question** (keep A's logic, restyle it) |
| `Home.tsx` | The pet as the unmistakable hero. Credits, streak, one big **Scan** button, nav to Shop and Stats |
| `ScanFlow.tsx` | States: `idle → capturing → identifying → result → guidance → reward`. **Build all three outcome branches now**, driven by A's mock flags: confident → proceed · `confidence < 0.7` → confirm chip · error → **manual material picker** (7 tiles). C swaps the data source in Lap 3; the UI must already exist |
| `SortingGuide.tsx` | Rinse instruction + which bin, from `binRules`, **plus the two one-tap confirmations** — "Rinsed ✓" and "Which bin did it go in?" These taps are a graded metric, not decoration |
| `Shop.tsx` | 3 foods + 4 accessories, spending against credits |
| `Stats.tsx` | Items this week vs. baseline, correct-sorting rate, cumulative CO₂ + equivalence, **and a visible source citation**. Every number from `features/impact/metrics.ts` |

**3 · The reward moment** — `components/CoinFly.tsx`, `ScreenTransition.tsx`, `Skeleton.tsx`,
`EmptyState.tsx`. Feeding the pet is the emotional payoff of the whole product: coins fly into
the counter, the counter ticks, the pet wobbles — all inside ~1.2 seconds.

**4 · Mobile pass** at 375px width, on a real phone.

### 🚦 EXIT GATE B — all ten, before you post the handoff

1. `?dev=pets` renders **all 30 combinations** (6 species × 5 moods). None clipped.
2. Tap a pet → squash (~180ms). Feed → wobble (~600ms) then settles back to `idle` on its own.
3. Drag the pet → tilts, springs back on release.
4. OS reduce-motion on → **zero transforms**, app still fully legible.
5. Every accessory sits correctly on **all six** species — checked in the gallery, not on one pet.
6. Clear `localStorage`, then complete the entire journey **thumb-only on a real phone**. No dead ends; every screen has a way back.
7. All three scan outcomes reachable via A's mock flags — including the manual picker. **No infinite spinner in any of them.**
8. One scan skipping both confirmations and one confirming both → the two are **distinguishable in the scan log**.
9. `grep -rE "computeCo2|emissionFactor|Math\." frontend/src/screens/` → nothing meaningful.
10. 375px: no clipping, no horizontal scroll. `npm run build` succeeds. Push. Post the handoff.

> **After this gate the app is demoable.** If everything downstream collapsed, you could
> present what you have. Protect that.

### ✅ ENTRY GATE — C runs this before starting Lap 3 (5 minutes)

> 1. Fresh clone on **your** machine → runs.
> 2. Complete the whole journey on your own phone. The pet animates.
> 3. `?dev=pets` loads. `npm run build` succeeds.
>
> Any failure → hand it back to B.

---

# LAP 3 · Person C — Intelligence & Ship
### H15 – H22 · "make it real, and make it survive the demo"

You arrive with a working prompt already tested in your scratch folder. B built every UI
branch you need. **Your lap is wiring, retention logic, and shipping — not experimenting.**

### What you build

**1 · The backend**

| File | Contents |
|---|---|
| `backend/api/identify.ts` | POST: image → OpenAI → validated JSON. Rejects anything off-schema |
| `backend/src/identifySchema.ts` | Strict JSON schema built **from the shared `Material` enum**, not a hand-typed copy |
| `backend/src/prompt.ts` | Your tested prompt. **Explicitly instructs the model not to estimate CO₂** |
| `backend/src/openaiClient.ts` | `gpt-4o-mini`, `response_format: json_schema` strict |
| `backend/src/rateLimit.ts` | Naive per-IP cap |
| `vercel.json` | `/api/*` → backend, everything else → `frontend/dist` |

**2 · `features/scan/identify.ts`** — real API call, **throws a typed error B's UI already
catches**, falls back to mock in demo mode. You are swapping a data source, nothing more.

**3 · Retention logic** — streak + freeze token · mood decay (sleepy → sad on inactivity,
**never death**) · one daily quest · anti-gaming: daily credit cap, same-material diminishing
returns, `sessionStorage` image-hash dedupe.

**4 · Demo-proofing** — `data/demoItems.ts` (pre-baked results), `?demo=1` bypassing the API
entirely, and a seeded state: 12-day streak, scan history, a dressed pet. An empty app reads
as unfinished.

**5 · Ship** — production deploy, `README.md`, `docs/one-pager.md` (audience / behaviour /
mechanic / measurement — the four things the rubric asks for in writing).

### 🚦 EXIT GATE C — all ten

1. `curl` the **deployed** `/api/identify` with a test image → valid JSON matching `IdentifyResult`.
2. `grep -ri "OPENAI\|sk-" frontend/` → **returns nothing.** The key never reaches the browser bundle.
3. Photograph a real aluminium can on a phone → correct result, end to end.
4. Switch the browser offline **mid-identify** → lands in B's manual picker within 10s. **Watch it happen — do not infer it from the code.**
5. Photograph a styrofoam cup → `recyclable: false`, no credits awarded.
6. Submit the **identical photo twice** → second award reduced or refused.
7. Clock forward 2 days → pet sleepy, streak offers its freeze. Forward 5 → sad. **Never dead.**
8. Airplane mode + `?demo=1` → the full demo script runs with **zero network requests**.
9. Fresh incognito window on the production URL → works, and looks lived-in rather than empty.
10. `README.md` and `docs/one-pager.md` complete. Push.

---

## H22 – H24 · All three together

- **B** is on camera — real hands, a real bottle, following `docs/demo-script.md`. Under 3 min.
- **A** shoots and edits, and delivers the pitch.
- **C** does the Devpost submission: repo link, video link, README.
- **Leave the last hour empty.** Something will break.

---

## If a lap overruns

This is the relay's one real weakness: a late lap pushes everyone behind it. So —

- **Time-box hard.** At your lap's end time, you hand over what works. You do not keep going.
- **Cut from your own lap**, using the `CLAUDE.md` §10 list. Never borrow time from the next person.
- If you must hand over something unfinished, **say so precisely in the handoff note.** A known
  gap is manageable; a surprise at 4am is not.

**Never cut, no matter who is behind:** the two sorting confirmations, the baseline question,
the manual-material fallback, demo mode. Those four carry three of the four judging criteria.
