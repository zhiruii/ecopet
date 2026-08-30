# 🌱 EcoPet

> **A pet you care for by caring for the environment.**

EcoPet is a gamified sustainability web application that turns everyday recycling into a simple, rewarding habit.

Instead of presenting recycling as a chore, EcoPet gives users a virtual companion that becomes happier as they make environmentally responsible choices. Users can learn how to sort recyclable items, earn credits, spend those credits on their pet, and track their environmental impact over time.

The long-term vision is to expand EcoPet beyond recycling into a broader **sustainable-living companion**.

**Production branch is backend-v2.**
---

## 🚀 Live Demo

**Try EcoPet:**  
https://frontend-ten-eta-50.vercel.app

---

## 💡 The Problem

People generally understand that recycling and sustainable behaviour are important, but knowing what to do does not always translate into consistently doing it.

Three common barriers are:

- Recycling can feel like a repetitive chore.
- People may be unsure whether an item is recyclable or how it should be prepared.
- The environmental impact of one small action can feel too abstract to be meaningful.

EcoPet addresses these barriers by combining **guidance, gamification, feedback, and personal progress** into one experience.

---

## 🌍 Our Solution

EcoPet creates a simple behavioural loop:

```text
        ┌─────────────────────┐
        │   Make a sustainable│
        │        choice       │
        └──────────┬──────────┘
                   ↓
        ┌─────────────────────┐
        │   Complete the      │
        │   recycling action  │
        └──────────┬──────────┘
                   ↓
        ┌─────────────────────┐
        │   Earn Eco credits  │
        └──────────┬──────────┘
                   ↓
        ┌─────────────────────┐
        │   Improve your      │
        │   pet's happiness   │
        └──────────┬──────────┘
                   ↓
        ┌─────────────────────┐
        │   Spend rewards on  │
        │   your pet          │
        └──────────┬──────────┘
                   ↓
        ┌─────────────────────┐
        │   Come back and     │
        │   do it again       │
        └─────────────────────┘
```

The central idea is:

> **Care for your pet by caring for the planet.**

---

## ✨ Features

### 🐾 Virtual Pet

The virtual pet is the emotional centre of EcoPet.

Users can:

- Choose from three pet species
- Give their pet a custom name
- Monitor pet happiness
- Feed their pet
- Purchase food
- Purchase and equip accessories
- See the pet react to interactions

Available pet species include:

- `chargetchi`
- `hugtchi`
- `punchtchi`

The pet's happiness is maintained as a **0–500** value and can increase through recycling and feeding. The happiness value will decay over time.

---

### ♻️ Recycling Assistant

EcoPet guides users through a recycling workflow rather than simply telling them whether an object is recyclable.

The scan flow can provide:

- Object classification
- Estimated item weight
- Recyclability
- Rinsing requirements
- Identification confidence
- Recycling-bin guidance
- Reward calculation

The supported material categories are:

| Material | Example |
|---|---|
| Aluminium | Drink cans |
| PET plastic | Plastic drink bottles |
| HDPE plastic | Detergent / household containers |
| Steel | Steel cans |
| Glass | Glass containers |
| Paper / cardboard | Boxes and paper packaging |
| Non-recyclable | Items outside the supported recycling stream |

---

### 🧼 Correct-Sorting Guidance

EcoPet does not stop at identification.

For recyclable items, users are guided through preparation and sorting requirements.

The Singapore-specific prototype uses the **commingled blue recycling bin** model for paper, plastic, metal and glass.

Examples include:

- Rinsing drink cans before recycling
- Emptying and rinsing plastic bottles
- Rinsing containers with food or detergent residue
- Flattening cardboard
- Keeping paper/cardboard dry
- Removing greasy sections from contaminated cardboard where appropriate

This turns the app into a practical recycling assistant rather than only an object-recognition demo.

---

### 🪙 Reward System

Successful recycling actions generate credits.

The current reward model consists of:

| Reward | Credits |
|---|---:|
| Base recyclable-item reward | +10 |
| Rinse confirmation | +5 |
| Correct-bin confirmation | +5 |
| CO₂-based bonus | +20 per kg CO₂e |
| Pet happiness per recyclable scan | +2 |

Non-recyclable items do not receive recycling credits.

The reward system is intentionally transparent so users can understand **why** they received a particular amount of credit.

---

### 🛍️ Pet Shop

Credits can be spent on items for the virtual pet.

The shop includes:

- Food
- Accessories
- Cosmetic customisation

Food affects pet happiness, while accessories can be equipped to customise the pet.

This gives the credits an immediate purpose and strengthens the behavioural feedback loop.

---

### 📊 Progress & Impact Tracking

EcoPet records individual recycling scans and uses them to calculate meaningful progress.

The statistics screen includes:

#### Items this week

The number of recyclable items scanned during the trailing seven-day period.

#### Change vs. baseline

Users set a personal weekly recycling baseline during onboarding.

EcoPet then compares current behaviour against that baseline.

```text
(current weekly recycling − baseline)
──────────────────────────────────
             baseline
```

#### Correct-sorting rate

The percentage of recyclable scans where the user confirmed both:

- The item was properly rinsed when required
- The item was placed in the correct recycling stream

#### CO₂ saved

The app estimates avoided CO₂e emissions associated with recycling the identified material.

---

## 🌱 Environmental Impact Calculation

EcoPet's environmental figures are based on documented emission factors rather than arbitrary game numbers.

The project uses **EPA Waste Reduction Model (WARM)** data for the material-level recycling factors.

Examples currently implemented include:

| Material | kg CO₂e avoided / kg recycled |
|---|---:|
| Aluminium | 10.04 |
| Steel | 2.00 |
| Glass | 0.31 |
| PET plastic | 1.25 |
| HDPE plastic | 0.97 |
| Paper / cardboard | 3.44 |

For example, the project verifies a 15 g aluminium can as:

```text
10.04 kg CO₂e/kg × 0.015 kg
= 0.1506 kg CO₂e avoided
```

The source and methodology are documented in:

```text
docs/sources.md
```

The app also provides more understandable impact equivalences, such as approximate phone charges and kilometres driven.

---

## 🇸🇬 Singapore Recycling Context

EcoPet's recycling guidance is designed around Singapore's household recycling system.

The prototype follows the principle that paper, plastic, metal and glass can be placed together in the **blue commingled recycling bin**, with sorting subsequently performed at a Materials Recovery Facility.

Users are encouraged to rinse and dry suitable containers and avoid contaminating the recycling stream.

The relevant sources are documented in `docs/sources.md`.

---

## 🧠 Behavioural Design

EcoPet is built around several behavioural-design principles.

### 1. Positive reinforcement

The app rewards sustainable actions rather than relying primarily on guilt or negative messaging.

### 2. Immediate feedback

A user's sustainable action has an immediate consequence:

```text
Recycle
  ↓
Earn credits
  ↓
Pet becomes happier
```

### 3. Emotional attachment

The virtual pet provides a reason for users to care about their actions.

Instead of:

> "I should recycle this."

the desired mindset becomes:

> "I want to help my pet."

### 4. Personalised progress

Users are measured against their own recycling baseline rather than only against a generic target.

### 5. Visible impact

Environmental impact is translated into understandable metrics so users can see that individual actions accumulate over time.

---

## 🔄 User Journey

### Step 1 — Choose a pet

The user begins onboarding by selecting one of the available pet species.

### Step 2 — Name the pet

The user gives their companion a name.

Names are limited to 12 characters.

### Step 3 — Set a recycling baseline

The user enters how many items they typically recycle in a week.

This becomes their personal baseline.

### Step 4 — Meet the pet

The home screen becomes the main hub for interacting with the pet.

### Step 5 — Recycle

The user starts the recycling flow and receives an identification result.

### Step 6 — Prepare and sort

The user confirms the relevant preparation and sorting steps.

### Step 7 — Earn

EcoPet calculates credits based on the recycling action, confirmations and environmental impact.

### Step 8 — Care for the pet

Credits can be used to purchase food and accessories.

### Step 9 — Track progress

The user can review recycling activity, progress against baseline, sorting accuracy and CO₂ savings.

---

## 🤖 Current Detection Architecture

The scan system has been deliberately separated from the rest of the application so that the identification layer can be replaced later without rebuilding the reward, pet or statistics systems.

The current prototype uses `mockIdentify()` as a **Phase-1 stand-in for the real identification API**.

It supports three demonstration paths:

```text
                 ┌─────────────────┐
                 │   Scan Item     │
                 └────────┬────────┘
                          ↓
                 ┌─────────────────┐
                 │ Identification  │
                 └────────┬────────┘
                          │
              ┌───────────┼───────────┐
              ↓           ↓           ↓
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Confident│ │   Low    │ │  Error   │
        │  result  │ │confidence│ │  result  │
        └──────────┘ └──────────┘ └──────────┘
```

The default mock result represents a 330 ml aluminium drink can:

```text
Material:       Aluminium
Item type:      330 ml drink can
Estimated mass: 15 g
Recyclable:     Yes
Rinse needed:   Yes
Confidence:     94%
```

This architecture allows a future computer-vision model, such as a browser-based YOLO implementation or a server-side vision model, to replace the mock function while leaving the rest of the application largely unchanged.

---

## 🏗️ Technical Architecture

```text
                         EcoPet
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
       React UI Layer               Application State
             │                           │
     ┌───────┼────────┐          ┌───────┴────────┐
     │       │        │          │                │
     ▼       ▼        ▼          ▼                ▼
   Home     Scan     Shop      Pet Store      Progress Store
     │       │        │          │                │
     └───────┴────────┴──────────┴────────────────┘
                             │
                             ▼
                    Feature / Logic Layer
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
       Economy            Impact             Scan
          │                  │                  │
          ▼                  ▼                  ▼
       Credits          CO₂ metrics       Identification
                             │
                             ▼
                         Data Layer
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
       Bin Rules       Emission Factors     Shop Items
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Component-based user interface |
| **TypeScript 6** | Type safety and maintainability |
| **Vite 8** | Development and production build tooling |
| **Tailwind CSS 3** | Styling and responsive UI |
| **Zustand 5** | Application state management and persistence |
| **Framer Motion 13** | Animations and pet reactions |
| **Lucide React** | Interface icons |
| **Vercel** | Web deployment |
| **Oxlint** | Code linting |

---

## 📁 Project Structure

```text
ecopet-main/
│
├── backend/
│   └── .env.example
│
├── docs/
│   ├── sources.md
│   └── workplan.md
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── BackButton.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── CheckToggle.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── Counter.tsx
│   │   │   ├── ListItem.tsx
│   │   │   ├── PixelArt.tsx
│   │   │   ├── PixelSprite.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Sheet.tsx
│   │   │   ├── TabBar.tsx
│   │   │   └── icons/
│   │   │
│   │   ├── data/
│   │   │   ├── binRules.ts
│   │   │   ├── emissionFactors.ts
│   │   │   ├── equivalences.ts
│   │   │   ├── shopIcons.tsx
│   │   │   └── shopItems.ts
│   │   │
│   │   ├── features/
│   │   │   ├── economy/
│   │   │   ├── impact/
│   │   │   └── scan/
│   │   │
│   │   ├── pet/
│   │   │   ├── accessories/
│   │   │   ├── animations/
│   │   │   ├── faces/
│   │   │   ├── pixel/
│   │   │   ├── Pet.tsx
│   │   │   └── registry.ts
│   │   │
│   │   ├── screens/
│   │   │   ├── Home.tsx
│   │   │   ├── Onboarding.tsx
│   │   │   ├── ScanFlow.tsx
│   │   │   ├── Shop.tsx
│   │   │   ├── SortingGuide.tsx
│   │   │   └── Stats.tsx
│   │   │
│   │   ├── store/
│   │   │   ├── persist.ts
│   │   │   ├── usePetStore.ts
│   │   │   └── useProgressStore.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   └── vite configuration
│
└── shared/
    └── types.ts
```

---

## 💾 State Management

EcoPet uses Zustand with persistence to maintain user progress.

### Pet state

The pet store manages:

- Species
- Name
- Mood
- Happiness
- Food inventory
- Owned accessories
- Equipped accessories

### Progress state

The progress store manages:

- Credits
- Recycling scans
- Weekly baseline
- Scan records
- CO₂ savings
- Reward history

This separation keeps pet-related state independent from sustainability-progress state.

---

## 🔐 Persistence & Data

EcoPet stores gameplay state locally through Zustand persistence.

This allows users to retain their:

- Pet
- Pet name
- Happiness
- Credits
- Inventory
- Accessories
- Recycling history
- Baseline
- Environmental impact

No private API key should be placed in frontend code.

For a future AI-powered implementation, sensitive credentials should remain on a backend rather than being exposed through client-side environment variables.

---

## 🧪 Development

### Prerequisites

Install:

- Node.js 18 or newer
- npm

### Install dependencies

```bash
cd frontend
npm install
```

### Start the development server

```bash
npm run dev
```

The Vite development server will provide a local address, typically:

```text
http://localhost:5173
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

---

## 🧭 Development Screen Shortcuts

For development and demonstration, EcoPet supports direct screen selection through the `dev` query parameter.

Available screens:

```text
?dev=onboarding
?dev=home
?dev=scan
?dev=shop
?dev=stats
```

For example:

```text
http://localhost:5173/?dev=scan
```

This makes it easier to test individual flows without completing the entire onboarding process.

---

## 🗺️ Roadmap

### Phase 1 — Core EcoPet Experience

- [x] Virtual pet
- [x] Pet selection
- [x] Pet naming
- [x] Pet happiness
- [x] Recycling scan flow
- [x] Recycling guidance
- [x] Credit economy
- [x] Pet shop
- [x] Food system
- [x] Accessories
- [x] Recycling statistics
- [x] Personal recycling baseline
- [x] CO₂ impact calculations
- [x] Persistent state
- [x] Deployed web application

### Phase 2 — Real Computer Vision

- [ ] Connect the scan flow to a real image-capture pipeline
- [ ] Integrate a trained waste-detection model
- [ ] Support real-time camera input
- [ ] Improve multi-object detection
- [ ] Improve confidence handling
- [ ] Add manual correction when identification is uncertain
- [ ] Expand the training dataset for Singapore-relevant waste

### Phase 3 — Sustainable Living

EcoPet's long-term goal is to support more than recycling.

Potential future actions include:

- 🚌 Choosing public transport instead of driving
- ❄️ Setting air-conditioning to **25°C or higher**
- 💡 Turning off unnecessary lights
- 🚶 Walking or cycling for short journeys
- 🥤 Using a reusable bottle
- 🛍️ Bringing reusable shopping bags
- 🍽️ Reducing food waste
- 🔌 Reducing unnecessary electricity consumption

These behaviours could feed into the same reward system:

```text
Sustainable action
        ↓
Verified / logged behaviour
        ↓
Eco points
        ↓
Pet happiness
        ↓
Pet rewards
        ↓
Habit reinforcement
```

---

## 🎯 Why a Virtual Pet?

A virtual pet provides something that a conventional recycling tracker does not: **emotional motivation**.

A dashboard can tell a user:

> "You recycled 5 items."

EcoPet can instead communicate:

> "Your actions helped your pet."

This creates a more personal feedback loop.

The pet becomes a visual representation of the user's sustainable behaviour, while the shop and progression systems give users a reason to continue.

---

## 📈 Measuring Success

EcoPet can evaluate whether the concept is encouraging better behaviour through several indicators:

### Behaviour

- Items recycled per week
- Change from personal baseline
- Frequency of returning to the app

### Accuracy

- Correct-sorting rate
- Rinse-confirmation rate
- Identification confidence

### Environmental impact

- Estimated CO₂e saved
- Cumulative sustainable actions
- Material categories recycled

### Engagement

- Credits earned
- Credits spent
- Pet happiness
- Items purchased
- Repeated scan activity

These metrics can eventually be used to determine whether gamification is genuinely encouraging sustained behaviour rather than simply generating short-term engagement.

---

## 🧩 Design Philosophy

EcoPet follows five core principles:

### **Simple**

The user should understand what to do without reading a manual.

### **Playful**

Pixel-art visuals and a virtual companion make sustainability approachable.

### **Rewarding**

Sustainable behaviour produces immediate positive feedback.

### **Educational**

The app teaches users how to prepare and sort recyclable materials correctly.

### **Measurable**

Users can see their behaviour and environmental impact improve over time.

---

## ⚠️ Current Limitations

EcoPet is currently a prototype.

The most important limitation is that the recycling identification layer currently uses a deterministic mock implementation rather than a production computer-vision model.

Other limitations include:

- Environmental impact estimates depend on estimated item mass.
- Some equivalence calculations are approximations.
- Recycling guidance is focused on the current Singapore household context.
- The prototype's local persistence is not a substitute for a production backend.
- The current reward system is designed for experimentation and may require balancing after real user testing.
- Anti-gaming and long-term retention mechanics can be expanded in future iterations.

These limitations are intentional and provide clear directions for future development.

---

## 📚 Sources & Methodology

The project maintains a dedicated source document:

```text
docs/sources.md
```

It documents:

- EPA WARM emission factors
- Singapore recycling guidance
- CO₂ equivalence calculations
- Verification examples
- Assumptions used by the prototype

The environmental numbers in the application should therefore be treated as **documented estimates**, not precise measurements of the impact of an individual item.

---

## 🤝 Contributing

Contributions and improvements are welcome.

A typical workflow is:

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

When submitting a change, please describe:

- What was changed
- Why it was changed
- How it was tested
- Any limitations or follow-up work

---

## 👥 Team

**EcoPet — Ecovolt-Tech**

EcoPet explores how **gamification, virtual companionship, recycling education, and measurable environmental impact** can work together to encourage sustainable everyday behaviour.

---

## 🌏 Vision

EcoPet starts with a simple question:

> **What if taking care of the planet felt as rewarding as taking care of a pet?**

The current prototype focuses on recycling, but the underlying system is designed to grow into a broader sustainability companion.

The ultimate goal is to make sustainable behaviour:

**Easy to understand → Easy to act on → Rewarding to repeat.**

---

<p align="center">
  <strong>🐾 Care for your pet. ♻️ Care for the planet. 🌱</strong>
</p>
