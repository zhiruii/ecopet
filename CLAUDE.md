# EcoPet — Project Context

> **Read this first.** This is the single source of truth for scope, stack, and file layout.
> LifeHack Problem Statement 3 (Sustainability). Build window: **~24 hours**.

## 1. What we are building

A virtual pet you feed by **photographing items you are about to recycle**. The photo is the
behavioural hook (a real-world physical act at the moment of decision), the pet is the
emotional stake, and a **sorting-guidance step** after each photo teaches correct recycling —
which is where the actual environmental gain lives.

**The loop:** photo → AI identifies material → app tells you how to prep it and which bin →
you confirm with two taps → you earn credits → you feed and dress your pet → the pet wobbles
happily → streak grows.

### The grading reality (do not lose sight of this)

PS3 is judged on **Behaviour-Change Potential, Measurability, Stickiness & Retention, Craft
& Usability**. The statement explicitly says a heavy backend earns no credit if it does not
move behaviour, and it names *dashboards and statistics* as the things people ignore.

So: the app is proof the behavioural argument is real. Three of four criteria are defended
verbally. **Build the argument first, then the app.**

## 2. The one-pager (graded deliverable — also the pitch spine)

| Field | Answer |
|---|---|
| **Audience** | University hall / dorm residents in Singapore (extends to HDB households, offices, schools) |
| **Behaviour** | Recycling *correctly* — right item, rinsed, right stream — measured per item, per week |
| **Why this behaviour** | Singapore's domestic recycling rate is low and a large share of blue-bin contents is rejected as contaminated. The gap is not bin access; it is knowing what qualifies and preparing it. **⚠️ TODO: source exact NEA figures and cite them on the Stats screen.** |
| **Mechanic** | (1) *Commitment device* — the photo is a physical act at the decision point. (2) *Emotional stake / loss aversion* — the pet visibly reacts to your streak. (3) *Just-in-time education* — sorting guidance fires when it is actionable, not in a leaflet. |
| **Baseline** | Onboarding, one tap: "In a typical week, how many items do you recycle?" |
| **Primary metric** | Items correctly prepared & sorted per user per week vs. baseline |
| **Secondary metric** | Correct-sorting rate — % of scans where the user confirms rinse + correct stream |
| **Target** | +50% items/week over baseline; correct-sorting rate ≥ 80% by week 2 |
| **Stated limitation** | We verify *intent and preparation*, not final disposal. Scale-up: QR codes at actual bin chutes, NEA / town-council partnership. **Say this out loud in the pitch** — honesty scores better than pretending. |

## 3. Non-negotiable rule: the LLM never invents a CO₂ number

```
photo ──▶ backend ──▶ OpenAI vision ──▶ STRICT JSON
                                        { material, itemType, estimatedGrams,
                                          recyclable, rinseNeeded, confidence }
                                                  │
                        frontend: emissionFactors[material] × grams
                                                  │
                                          CO₂ saved (deterministic)
```

The model **classifies only**, constrained to a fixed material enum. The number is computed
locally from a cited factor table. This gives reproducible figures, a source to name when a
judge asks *"where did 0.13 kg come from?"*, and an app that still works when the API stalls.

**Never let the model return a CO₂ figure.** "The AI said so" loses Measurability outright.

Corollary: the backend is deliberately dumb. It classifies and returns. All scoring, CO₂ maths
and equivalences happen in the frontend, so demo mode works fully offline.

## 4. Tech stack

| Layer | Choice | Note |
|---|---|---|
| Frontend | Vite + React 18 + TypeScript + Tailwind | |
| Animation | framer-motion | Minimal, see §6 |
| Pet art | Hand-authored inline SVG components | No sprite sheets, no Rive, no Lottie |
| Camera | `<input type="file" accept="image/*" capture="environment">` | Opens the native camera on iOS **and** Android with no `getUserMedia` permission dance. **Do not build a live video preview.** |
| State | Zustand + `localStorage` persist middleware | Single local account, no auth, no DB |
| Backend | Vercel serverless function (TypeScript) | One endpoint |
| Vision | OpenAI `gpt-4o-mini`, `response_format: json_schema` (strict) | Free credits |
| Hosting | One Vercel project, monorepo | Frontend static + `/api/*`. No CORS, no cold-start pain, key stays server-side |
| Key safety | `OPENAI_API_KEY` as a Vercel env var, backend only | **Never prefix with `VITE_`** — anything `VITE_*` is compiled into the browser bundle and is public |

Client-side: downscale the photo to ~768px and JPEG-compress before upload. Cuts cost and
latency a lot, and 768px is plenty for material classification.

## 5. File structure

Three top-level workspaces. `shared/` exists for one reason: the material enum **must** stay
identical between the OpenAI JSON schema and the emission-factor table, or the app silently
computes zero.

```
lifehack/
├── CLAUDE.md
├── README.md                       # submission deliverable
├── vercel.json                     # routes /api/* → backend, else → frontend/dist
├── docs/
│   ├── one-pager.md                # §2, expanded — the pitch
│   ├── sources.md                  # every CO₂ figure + its citation URL
│   └── demo-script.md              # the exact taps the video shows
│
├── shared/
│   └── types.ts                    # Material enum, IdentifyResult, PetMood — imported by both
│
├── backend/
│   ├── api/
│   │   └── identify.ts             # POST: image → OpenAI → validated JSON
│   ├── src/
│   │   ├── openaiClient.ts
│   │   ├── identifySchema.ts       # strict JSON schema, built from shared/types Material enum
│   │   ├── prompt.ts               # the classification system prompt
│   │   └── rateLimit.ts            # naive in-memory per-IP cap
│   ├── package.json
│   └── .env.example                # OPENAI_API_KEY=
│
└── frontend/
    ├── index.html
    ├── vite.config.ts
    ├── tailwind.config.ts
    ├── package.json
    └── src/
        ├── main.tsx
        ├── App.tsx                 # screen router only
        │
        ├── pet/                    # ◀── SELF-CONTAINED. See §6. Nothing here imports
        │   ├── index.ts            #     from features/ or store/.
        │   ├── types.ts            # PetSpecies, PetMood, AccessoryId
        │   ├── registry.ts         # PET_SPECIES[] — the pickable catalogue
        │   ├── Pet.tsx             # renderer: species + mood + accessories + animation
        │   ├── PetPicker.tsx       # onboarding species selection grid
        │   ├── species/            # one file per pet, pure SVG, no logic
        │   │   ├── Sprout.tsx
        │   │   ├── Bloop.tsx
        │   │   ├── Pebble.tsx
        │   │   ├── Nimbus.tsx
        │   │   ├── Fern.tsx
        │   │   └── Coco.tsx
        │   ├── faces/
        │   │   ├── Eyes.tsx        # mood → eye shape. Shared by ALL species.
        │   │   └── Mouth.tsx       # mood → mouth shape. Shared by ALL species.
        │   ├── accessories/
        │   │   ├── index.ts        # ACCESSORIES registry
        │   │   └── *.tsx           # hat, scarf, glasses, leaf — absolutely-positioned layers
        │   └── animations/
        │       ├── variants.ts     # ALL framer-motion variants live here, nowhere else
        │       └── usePetReaction.ts  # fire-and-forget: trigger('fed') → wobble, then idle
        │
        ├── screens/
        │   ├── Onboarding.tsx      # pick pet → name it → baseline question
        │   ├── Home.tsx            # pet stage + credits + streak + scan button
        │   ├── ScanFlow.tsx        # capture → identifying → result → guidance → reward
        │   ├── SortingGuide.tsx    # rinse + which-bin + the TWO confirm taps
        │   ├── Shop.tsx            # feed + dress-up, spends credits
        │   └── Stats.tsx           # baseline delta, sorting rate, CO₂, citations
        │
        ├── components/             # generic dumb UI: Button, Card, Chip, Sheet, Counter
        │
        ├── features/
        │   ├── scan/
        │   │   ├── capture.ts      # file input + downscale + compress
        │   │   ├── identify.ts     # calls /api/identify; falls back to mock
        │   │   └── mockIdentify.ts # Phase 1 stand-in AND demo mode
        │   ├── impact/
        │   │   ├── computeCo2.ts   # grams × factor
        │   │   └── equivalence.ts  # scale-aware fun fact — see §8
        │   └── economy/
        │       └── credits.ts      # award rules, daily cap, diminishing returns
        │
        ├── store/
        │   ├── usePetStore.ts      # species, name, mood, hunger, accessories owned/worn
        │   ├── useProgressStore.ts # credits, streak, scan log, baseline
        │   └── persist.ts
        │
        ├── data/
        │   ├── emissionFactors.ts  # material → kg CO₂e/kg + typical mass + SOURCE URL
        │   ├── binRules.ts         # material → accepted? rinse? which stream (SG blue bin)
        │   ├── equivalences.ts     # tiered fun-fact units
        │   ├── shopItems.ts        # foods + accessories, prices
        │   └── demoItems.ts        # pre-baked results for offline demo
        │
        └── styles/
            ├── index.css
            └── tokens.css          # §7 palette
```

### Boundary rules (keep the pet subsystem clean)

- `pet/` renders. It never reads a store, never calls an API, never knows what a credit is.
  Everything arrives via props: `<Pet species mood accessories reaction />`.
- Any new pet = **one new file in `pet/species/` + one entry in `registry.ts`.** Nothing else.
- Every framer-motion variant lives in `pet/animations/variants.ts`. No inline `animate={{}}`
  scattered across screens — that is how a codebase becomes unmaintainable at hour 18.
- `screens/` composes. `components/` is dumb. `features/` holds logic with no JSX.

## 6. Pet design & animation spec

### Visual language

Derived from the reference sheet — **as a style reference only. Do not ship Bandai's
characters, the Tamagotchi name, or that PNG.** Draw 6 originals in this language:

- **Thick dark-navy outline**, ~7px stroke, round caps and joins, very slightly irregular so
  it reads hand-drawn rather than vector-perfect
- **One flat fill colour** per pet. No gradients, no shading, no shadows.
- **Blobby rounded silhouette** — wider than tall, or egg-shaped
- **Simple face:** two oval eyes with a white highlight dot (or solid dots), and a `u` mouth
- **Stubby limbs:** short arm nubs, thin stick legs with small feet
- Sits on a plain warm off-white stage

### The six species (originals — vary silhouette, not just colour)

| Id | Fill | Distinguishing feature |
|---|---|---|
| `sprout` | lime `#A8C934` | Leaf sprig on top of the head |
| `bloop` | sky `#5EC7EE` | Wide beak-like snout, round body |
| `pebble` | slate `#7E93BC` | Tall rabbit ears, thin legs |
| `nimbus` | cream `#F7F0A8` | Big oval eyes, cloud-lobed top edge |
| `fern` | pink `#F27DB0` | Duck bill, small side fins |
| `coco` | peach `#F5C9A0` | Wide stacked mouth, tiny tuft |

### Moods (drive `faces/`, shared across all species)

`idle` · `happy` · `eating` · `sleepy` · `sad`

Mood changes **only** the eyes and mouth. Bodies never change. That is why one face change
ships to all six pets for free.

### Animations — deliberately minimal

| Name | Trigger | Motion | Timing |
|---|---|---|---|
| `idle` | always | Gentle vertical breathe, ±3px | 2.4s, `easeInOut`, infinite |
| `wobble` | **fed** | Squash-and-stretch: scaleY 1 → 0.88 → 1.06 → 1, slight rotate ±4° | 600ms, spring |
| `tapSquash` | tapped | Quick squash to 0.94 and back | 180ms |
| `dragTilt` | dragged | Rotate toward drag direction, spring back on release | spring |
| `sleepyTilt` | mood `sleepy` | Slow head-lean, eyes to `u u` | 3s loop |

Everything else is a no. `usePetReaction` fires a reaction, then falls back to `idle`
automatically. **Respect `prefers-reduced-motion`** — drop to opacity/colour changes only.

## 7. Design tokens (`styles/tokens.css`)

```
--ink:        #14396E   /* every outline, every heading */
--paper:      #FBF9F3   /* app background, warm off-white */
--card:       #FFFFFF
--accent:     #2E9BE0   /* primary action */
--good:       #4CAF50   /* recyclable / success */
--warn:       #E8A33D   /* rinse needed */
--bad:        #E01E26   /* not recyclable */
--credit:     #FFD400   /* coins */
```

Type: one rounded sans (Nunito / Baloo 2 / Fredoka). Heavy weights, generous letter-spacing on
headings. Chunky rounded buttons with a 3px `--ink` border and a hard 3px offset shadow — no
blur. Mobile-first, max-width ~430px, centred on desktop.

## 8. Two traps to avoid

1. **Tiny numbers read as fake.** One aluminium can ≈ 0.13 kg CO₂e ≈ *0.006 trees*. Showing
   "0.006 trees planted" kills the reward. `equivalence.ts` must pick the unit that makes the
   number legible **at the current scale**: phone charges / km driven for single items;
   tree-years and flight legs only once cumulative totals are large enough.
2. **Repeat-scan farming.** A judge will photograph the same bottle twice. Daily credit cap,
   diminishing returns on the same material within a window, and a `sessionStorage` hash of
   recent images. Have the answer ready even if the implementation is light.

### Emission factors — placeholders, **verify and cite every one** in `docs/sources.md`

Indicative kg CO₂e avoided per kg recycled vs. landfill (US EPA WARM, or DEFRA):

| Material | ~kg CO₂e / kg | Typical item mass |
|---|---|---|
| `aluminium` | ~9 | 15 g |
| `pet_plastic` | ~1.5 | 25 g |
| `hdpe_plastic` | ~1.4 | 40 g |
| `steel` | ~1.8 | 60 g |
| `glass` | ~0.3 | 300 g |
| `paper_cardboard` | ~1.0–3.9 | 200 g |
| `non_recyclable` | 0 | — |

## 9. Phases — a relay, 3 people, 24 hours

We build in **laps, not in parallel**. One person has the repo at a time, builds their layer,
proves it against an exit gate, and hands over. The next person builds on top. No branches,
no merges, no conflicts.

```
H0–1    All three   Agree roles, exchange access, write docs/demo-script.md
H1–7    LAP 1  A    Foundation — types, stores, data, maths, UI kit, screen shells
                    Hands over: plumbing that works, looks like a wireframe
H7–15   LAP 2  B    Experience — the pet subsystem, all six real screens, the reward moment
                    Hands over: a polished, demoable app running on mock AI
H15–22  LAP 3  C    Intelligence & Ship — real OpenAI backend, retention logic,
                    anti-gaming, demo mode, seed, deploy, README
H22–24  All three   Video, submission, buffer
```

**The ordering matters:** each lap needs the one below it, and the stack degrades gracefully —
after Lap 2 the app is already demoable on mock AI, so a short Lap 3 costs polish, not the demo.

While off-lap, each person does **prep that never touches the repo** — B draws the six pets,
C tests the OpenAI prompt in a scratch folder, A sleeps then writes the pitch. This is what
stops two people idling.

**Full per-person file lists, exit gates and handoff protocol: `docs/workplan.md`.**

## 10. Cut list (drop in this order if behind)

1. Dress-up accessories (keep feeding — it is the credit sink that matters)
2. Daily quest
3. Drag interaction (keep tap)
4. Streak freeze
5. Down to 3 pet species

**Never cut:** the sorting-guidance step, the baseline question, the manual-material fallback,
demo mode.

## 11. Backlog (pitch as roadmap, do not build)

Barcode scan + Open Food Facts lookup · real accounts and sync · hall/floor leaderboards ·
pets visiting friends' pets · QR codes at actual bin chutes · NEA / town-council partnership.

## 12. Verification

- **Loop:** fresh browser → onboarding → 3 real items (can, PET bottle, pizza box) → credits,
  CO₂, streak all update and survive a reload
- **Failure:** kill the network mid-scan → lands in the manual picker, not a spinner
- **Adversarial:** photograph a styrofoam cup → says *no*, awards nothing. A judge will try this
- **Repeat:** same photo twice → credits capped or reduced
- **Device:** deployed URL on a real iPhone *and* Android. The camera input and the drag
  gesture are what break on real hardware
- **Numbers:** hand-check one CO₂ figure against its cited source. Be ready to name it out loud
