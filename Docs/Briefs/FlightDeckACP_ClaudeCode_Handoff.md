# FlightDeck Marketing Site — Claude Code Build Handoff
**Date:** 2026-04-05 @ 02:50 UTC / 19:50 PDT  
**Repo:** `FlightdeckACP-Marketing` (GitHub: DNAProjectHub)  
**Vercel project:** `flightdeckacp-marketing`  
**Domain:** `flightdeckacp.com`  
**Stack:** Next.js (App Router) + Tailwind CSS + Framer Motion (minimal) + Mailchimp API

---

## CRITICAL CONSTRAINTS (read before touching any code)

1. **Primary hero visual is ATC (`6_01_33_PM`).** Not Cockpit. Not Flights. The ATC screen. Non-negotiable.
2. **Rename "Data Plane" everywhere** — surface card, asset map, copy — to **"Schema Explorer"** or **"Data Structures."** "Data Plane" has a specific architectural meaning in the product context that conflicts with marketing usage.
3. **Do not imply OverWatch or any future/premium execution-intervention features are currently shipping** unless clearly labeled "Coming soon" or "In development."
4. **Do not block build on hero video or OG image.** Build v1 with screenshots only. Video slot is a placeholder. OG image is auto-generated from logo + headline text.
5. **Apply one consistent visual treatment to every screenshot across the entire site:** same corner radius, same border opacity, same shadow depth, same caption style, same max-width behavior. This single rule makes the site feel premium.
6. **If the FlightDeck SVG logo is not available,** build with a temporary text wordmark styled to match the product (orange `Flightdeck` mark + `Deck` weight treatment) and swap SVG in when delivered.

---

## PROJECT OVERVIEW

**What this is:** Public marketing site and early access signup for FlightDeck — an Agentic Control Plane for solo founders building software with AI.

**What the site must do:**
- Communicate the category: Agentic Control Plane (not AI tool, not project manager)
- Show the product through real screenshots, not abstract concept art
- Collect early access signups via Mailchimp
- Feel like infrastructure, not startup marketing

**Aesthetic:** 70% Linear, 20% Vercel, 10% FlightDeck-native blueprint/aviation

---

## FILE STRUCTURE

```
/
├── app/
│   ├── page.tsx                (homepage)
│   ├── signup/page.tsx         (signup page)
│   ├── api/subscribe/route.ts  (Mailchimp POST handler)
│   └── layout.tsx
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── ProofStrip.tsx
│   ├── Problem.tsx
│   ├── SystemScroll.tsx
│   ├── ProductSurfaces.tsx
│   ├── FlightSchool.tsx
│   ├── FinalCTA.tsx
│   ├── StickyFooterCTA.tsx
│   └── ScreenshotFrame.tsx     (shared screenshot treatment component)
├── public/
│   ├── images/
│   │   ├── screenshots/        (desktop screenshots)
│   │   └── mobile/             (mobile screenshots)
│   └── logo.svg                (swap in when available)
├── lib/
│   └── mailchimp.ts
├── tailwind.config.ts
└── vercel.json
```

---

## DESIGN TOKENS (add to tailwind.config.ts)

```js
extend: {
  colors: {
    fdBlack:     '#0d0d0f',
    fdSurface:   '#111115',
    fdBorder:    '#1e1e24',
    fdOrange:    '#f97316',   // primary accent — confirm from logo
    fdPurple:    '#6366f1',   // secondary accent
    fdGray:      '#9ca3af',
    fdGrayLight: '#e5e7eb',
    fdGreen:     '#22c55e',
    fdRed:       '#ef4444',
    fdYellow:    '#eab308',
  },
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],  // or Geist if preferred
  },
}
```

---

## SCREENSHOT TREATMENT COMPONENT

Build `ScreenshotFrame.tsx` as a shared wrapper used for every screenshot on the site.

```tsx
// Consistent treatment for all product screenshots
// Props: src, alt, caption (optional)
// Rules:
//   - rounded-xl (12px radius)
//   - border border-white/10
//   - shadow-2xl with subtle orange/purple ambient glow
//   - max-w-full, responsive
//   - optional caption: small, muted, centered below
```

Apply this component universally. No raw `<img>` tags for screenshots anywhere.

---

## PAGE ARCHITECTURE

```
NAV (sticky, minimal)
────────────────────────────────
SECTION 1 — HERO
SECTION 2 — PROOF STRIP
SECTION 3 — PROBLEM
SECTION 4 — THE SYSTEM (scroll sequence)
SECTION 5 — PRODUCT SURFACES (grid)
SECTION 6 — FLIGHT SCHOOL
SECTION 7 — FINAL CTA
────────────────────────────────
STICKY FOOTER CTA (appears at 40% scroll)
```

Separate route:
```
/signup — EARLY ACCESS PAGE
```

---

## SECTION 1 — HERO

**Layout (desktop):** Two-column. Left: copy. Right: ATC screenshot.  
**Layout (mobile):** Stacked. Copy first, screenshot below fold.

### Copy

```
H1:    The Control Plane for AI Work

Sub:   Coordinate agents, govern execution, and ship real software —
       as a system, not a series of conversations.

Body:  Built for the solo founder who refuses to lose the plot.

CTA:   [Get Early Access]  →  /signup

Link:  See how it works ↓
```

### Hero Visual
- File: `6_01_33_PM` (ATC — Air Traffic Control view)
- Treatment: `ScreenshotFrame` component, slight perspective tilt (~3deg), subtle drop shadow with orange ambient glow
- Mobile: flat (no tilt), full-width, clipped to show crew cards + session status area

---

## SECTION 2 — PROOF STRIP

**Layout:** Single horizontal band. Logo row, centered.

```
Headline:  Works with the stack you already use
Sub:       FlightDeck coordinates across your tools. You stay in command.
```

**Logo row (monochrome SVGs, subtle glow on hover):**
- GitHub
- Vercel
- Supabase
- Claude
- ChatGPT

**Note:** Claude Code is referenced in body copy and screenshots but its visual mark may feel inconsistent in the logo strip. Include in copy, omit from logo row unless SVG is clean at small sizes. Frame as "works with" not "partners" or "integrations."

---

## SECTION 3 — PROBLEM

**Layout:** Centered, constrained width (~680px). No chrome.

```
Header:  AI can build anything. The problem is controlling it.

¶1:  Every session starts cold. Your AI crew forgets what you decided,
     what you built, and why you built it.

¶2:  Your tools don't talk to each other. GitHub is over here.
     Your specs are somewhere else. Your work items are in a third place.
     Nothing connects.

¶3:  When something breaks, you find out when it's too late.
     No warning. No context. No clear path forward.

Transition:  FlightDeck is the layer that fixes this.
```

**CAUTION CALLOUT** — insert between Problem and Section 4.  
*Visual: Cockpit (`6_01_42_PM`) — crop to show the WARNING row only*

```
Label:   NO SILENT FAILURES
Quote:   "Claude Code context at 88% — recommend refuel."

Copy:    Not a cryptic error. Not a silent failure. A specific caution
         in plain language, surfaced where you're working — with a clear
         next step.
```

---

## SECTION 4 — THE SYSTEM (Scroll Sequence)

**Desktop:** Sticky left column (copy), right panel updates as user scrolls.  
**Mobile:** Stacked. Image, then text beat, image, text beat.

### 5-Beat Sequence

**Beat 1**
```
Copy:    Ideas become specifications.
Visual:  6_02_04_PM (Document Manifest — Manifest tab, Planning domain)
```

**Beat 2**
```
Copy:    Specifications become flight plans.
Visual:  6_02_15_PM (Flight Planification — "37 planified · 172 flight plans")
```

**Beat 3**
```
Copy:    Flight plans become execution.
Visual:  6_02_17_PM (Flights — 1 active, 2 in progress, 11 queued)
```

**Beat 4**
```
Copy:    Every action is governed. Every decision is recorded.
Visual:  6_02_21_PM (Flight Logs — session receipts, commit counts)
```

**Beat 5**
```
Copy:    From idea to shipped feature — fully traceable. Nothing floats loose.
Visual:  6_03_01_PM (Ingest modal — AI classification, high confidence badge)
```

**Section tagline** (after scroll sequence):
```
That lineage — idea to plan to spec to work item to shipped feature —
is not a nice-to-have. It is the product.
```

---

## SECTION 5 — PRODUCT SURFACES

**Layout:** 2-column grid desktop, 1-column mobile.  
**Section header:** Six surfaces. One system.  
**Sub:** Every part of FlightDeck has a specific job. Nothing overlaps. Nothing gets lost.

### Surface Cards

```
Card 1 — Cockpit
Visual:  6_01_42_PM
Copy:    Your command deck. ATC Readout narrates current project state.
         Cautions surface in plain language when your system needs a decision.
         Start Engines to begin preflight.

Card 2 — ATC
Visual:  6_01_33_PM
Copy:    Portfolio command. Session timer. All five crew members with fuel gauges.
         Multi-project flight trajectories with real ETAs.
         The full picture from one surface.

Card 3 — Crew Manifest
Visual:  6_01_45_PM
Copy:    Danny is Pilot. ChatGPT is Architect. Claude is Reasoner.
         Claude Code is Implementer. Every agent has a defined role,
         a fuel gauge, and a full comms log. You manage a team, not a chatbox.

Card 4 — Document Manifest
Visual:  6_02_04_PM
Copy:    Every plan, spec, wireframe, and asset — classified, health-checked,
         and linked to the work it drives.

Card 5 — Flight Planning
Visual:  6_02_17_PM
Copy:    Specs become work items through a governed process.
         Truth chains: every task traces to its source spec.

Card 6 — Flight Logs
Visual:  6_02_21_PM
Copy:    Session history, decisions, commits, and receipts.
         You never ask "what happened last Tuesday?" again.

Card 7 — Maintenance
Visual:  6_01_55_PM
Copy:    Diagnostics, provider bindings, secrets, system health.
         The hangar where the system services itself.

Card 8 — Schema Explorer
Visual:  6_01_59_PM
Copy:    Schema explorer and query console.
         Your system's data structure — visible and inspectable.
```

### Feature Callouts (below grid)

**Document Health:**
*Visual: `6_03_01_PM` or `6_02_58_PM` (Ingest modal)*
```
Every document has a health signal.
Green = exists and matches. Yellow = drifted. Red = problem.
When it's red, FlightDeck tells you what's wrong and gives you a button to fix it.
```

**Asset Library:**
*Visual: `6_02_07_PM` + `6_02_10_PM` (Icon Library + Logos tab)*
```
Your brand assets are governed too.
82 icons. Logo variants. Design tokens. Classified, versioned,
and linked to the documents that reference them.
```

---

## SECTION 6 — FLIGHT SCHOOL

**Section header:** Start with Flight School.

**Sub:** Before you touch a codebase, FlightDeck configures your AI copilot. Structured onboarding in minutes.

**Body:**
```
Tell FlightDeck how you work, how you think, what your product is,
and how you want your AI crew to behave. It generates CLAUDE.md,
SOUL.md, and a full governance stack — formal documents that define
how your AI assistant should operate inside your project.
The more specific you are, the better your entire build experience becomes.
```

**Three phase blocks:**
```
Phase 1 — Style and Tone
How proactive or restrained your copilot should be. Empathy, pacing, explanation style.

Phase 2 — Rules and Boundaries
What your AI can and can't do without your approval. Protected systems. Evidence standards.

Phase 3 — Governance and Procedures
Tool routing, project scope, output behavior, team shape.
```

**Pull quote:**
```
Nothing is saved until you review and approve at the end.
```

**Visuals:**
- Mobile pair: `6_04_04_PM` (welcome) + `6_03_45_PM` (role selection) side by side
- Alt/desktop: `6_03_31_PM` (Create a New Project — 6-step structured flow)

**Flight Mode / Dev Mode callout** (below main Flight School block):  
*Visual: `6_01_38_PM` (Home Terminal)*
```
Header:  Flight Mode or Developer Mode — one toggle.

Copy:    New to building software? Everything speaks plain language.
         Aviation metaphors, guided onboarding, tooltips on everything.
         Already technical? Flip to Developer Mode. Labels go technical,
         scaffolding disappears, you work at full speed.
         Same system. Same data. Same governance.
```

---

## SECTION 7 — FINAL CTA

**Layout:** Full-width dark band, centered, no chrome.

```
Headline:  Run your AI like a system.

Sub:       Not like a conversation you keep starting over.

CTA:       [Get Early Access]  →  /signup

Note:      No credit card. No setup. Early access to the beta.
```

---

## STICKY FOOTER CTA

**Behavior:** Appears after 40% scroll. Fixed bottom bar.  
**Desktop:** Persistent slim bar.  
**Mobile:** Small tab that expands to a full glassmorphism drawer.

**Bar copy:**
```
Get early access to FlightDeck.   [Join the Beta →]
```

**Drawer copy (mobile expanded):**
```
Header:  Get early access to FlightDeck.
[email field: placeholder "your@email.com"]
[Join the Beta]
```

---

## SIGNUP PAGE (/signup)

**Headline:** Join the Early Access List

**Sub:** FlightDeck is in active development. Get notified when beta access opens.

**Form fields:**
- First name
- Email (required)
- "What are you building?" (optional text, low friction)

**CTA:** Request Early Access

**Below form:**
```
You're joining a list of founders who want to build software like a system.
No noise. Just updates when they matter.
```

**Post-submit state:**
```
You're in.
Check your email — we sent the FlightDeck product overview.
```

---

## MAILCHIMP API ROUTE

File: `app/api/subscribe/route.ts`

```ts
// POST handler
// Body: { email, firstName, whatBuilding? }
// Tags signup: source:website
// On success: 200
// On duplicate: 200 (silent — don't alarm user)
// On error: 500 with message

// Environment variables required:
// MAILCHIMP_API_KEY
// MAILCHIMP_LIST_ID     ← get from Danny before wiring
// MAILCHIMP_SERVER      ← e.g. "us21" (from API key suffix)
```

Build the form with client-side validation (email format only). No blocking on the "what building" field.

---

## COPY CONSTRAINTS (enforced)

**Voice:**
- Direct, no-nonsense, assertive
- No AI-speak: no "harness," "leverage," "unlock," "game-changing," "next-generation"
- No bullet-point lists in prose sections
- Short declarative sentences

**What is and is not shipping:**
- SHIPPING: Cockpit, ATC, Crew Manifest, Flight Planning, Flight Logs, Document Manifest, Maintenance, Schema Explorer, Flight School, ingest pipeline, document health indicators, Home Terminal
- NOT SHIPPING / future: OverWatch (execution intervention), voice ATC briefing (ElevenLabs), desktop execution terminals, dogfight mode, Autopilot
- If any future feature appears in screenshots or copy, label it "Coming soon" or do not reference it

**Integration framing:** "Works with your stack" — not "partners," "integrations," or "trusted by"

**No implied endorsements** from GitHub, Vercel, Supabase, Anthropic, or OpenAI

---

## VERCEL DEPLOYMENT

- Repo: `FlightdeckACP-Marketing`
- Framework: Next.js
- Root directory: `./`
- Environment variables to set before launch:
  - `MAILCHIMP_API_KEY`
  - `MAILCHIMP_LIST_ID`
  - `MAILCHIMP_SERVER`

Push to `main` triggers auto-deploy.

---

## KNOWN BLOCKERS

| Item | Status | Impact |
|---|---|---|
| FlightDeck logo SVG | Not yet provided | Use text wordmark, swap later |
| Mailchimp list ID | Not yet provided | Wire API route, test with dummy ID |
| Hero video | Deferred to V2 | Video slot is a placeholder |
| OG image | Auto-generate from logo + H1 | Not blocking |

---

*Build handoff complete. Strategy doc: `FlightDeckACP_Marketing_StrategyCopyBrief.md`*  
*All 23 screenshots accounted for. One SVG logo swap pending. Mailchimp ID needed before live launch.*
