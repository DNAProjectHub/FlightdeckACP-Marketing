# CC DISPATCH — Replace All Screenshots with New Carousel System
**Repo:** `/Users/danny/Projects/FlightdeckACP-Marketing`
**Version bump:** `1.2.0` → `1.3.0`
**Date:** 2026-04-09

---

## Overview

Replace every screenshot on the marketing site with new properly named images. Build a reusable `ScreenshotCarousel` component that shows sub-screens stacked behind the primary image with auto-rotate, arrow controls, dots, and click-to-lightbox. Integrate into every component that currently uses `ScreenshotFrame`. The existing pill navigation in `ProductSurfaces` is completely untouched — the carousel operates only within each pill's visual slot.

---

## Step 1 — Copy new image assets into public

```bash
cd /Users/danny/Projects/FlightdeckACP-Marketing

mkdir -p public/images/screenshots/originals
mkdir -p public/images/screenshots/thumbs

cp "Docs/Assets/FlightDeck New Screenshots/originals/"*.png public/images/screenshots/originals/
cp "Docs/Assets/FlightDeck New Screenshots/thumbs/"*.jpg public/images/screenshots/thumbs/
```

Do NOT delete the old `.webp` files in `public/images/screenshots/` yet.

---

## Step 2 — Create `components/ScreenshotCarousel.tsx`

Create this file exactly as written. This is a drop-in replacement for `ScreenshotFrame` that accepts an array of image names (bare filenames without extension). Single-image arrays degrade gracefully — no arrows, no counter, no dots. Multi-image arrays show stacked cards behind the front image, auto-rotate every 4s, pause on hover, show arrow controls on hover, dot indicators below, and open the full-size original PNG in a lightbox on click.

```tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ScreenshotCarouselProps {
  images: string[];          // bare filenames without extension, e.g. ["Cockpit", "Cockpit-with-overlay"]
  alt?: string;
  priority?: boolean;
  autoRotateInterval?: number; // ms, default 4000, set to 0 to disable
  basePath?: string;
}

const THUMB_DIR = "thumbs";
const ORIGINAL_DIR = "originals";
const DEFAULT_INTERVAL = 4000;

export default function ScreenshotCarousel({
  images,
  alt = "",
  priority = false,
  autoRotateInterval = DEFAULT_INTERVAL,
  basePath = "/images/screenshots",
}: ScreenshotCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = images.length;
  const hasMultiple = count > 1;

  const thumb = (name: string) => `${basePath}/${THUMB_DIR}/${name}.jpg`;
  const original = (name: string) => `${basePath}/${ORIGINAL_DIR}/${name}.png`;

  const advance = useCallback((dir: number) => {
    setActive(i => (i + dir + count) % count);
  }, [count]);

  useEffect(() => {
    if (!hasMultiple || paused || !autoRotateInterval) return;
    timerRef.current = setInterval(() => advance(1), autoRotateInterval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hasMultiple, paused, autoRotateInterval, advance, active]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <>
      <div
        className="relative rounded-xl overflow-visible group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Stacked background layers — up to 2 visible behind front */}
        {hasMultiple && images.map((name, i) => {
          const offset = ((i - active + count) % count);
          if (offset === 0 || offset > 2) return null;
          return (
            <div
              key={name}
              className="absolute inset-0 rounded-xl overflow-hidden border border-white/10"
              style={{
                transform: `translateY(${offset * -6}px) scale(${1 - offset * 0.03})`,
                opacity: 1 - offset * 0.25,
                zIndex: count - offset,
              }}
            >
              <img
                src={thumb(name)}
                alt=""
                loading="lazy"
                draggable={false}
                className="w-full h-auto"
              />
            </div>
          );
        })}

        {/* Front card */}
        <div
          className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-fd-orange/5 cursor-zoom-in"
          style={{ zIndex: count + 1 }}
          onClick={() => setLightbox(original(images[active]))}
        >
          <img
            src={thumb(images[active])}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            draggable={false}
            className="w-full h-auto"
          />
          {/* Mask version number in top-right corner */}
          <div
            className="absolute top-0 right-0 w-24 h-8 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top right, rgba(13,13,15,1) 40%, rgba(13,13,15,0) 100%)" }}
          />
        </div>

        {/* Arrow controls — appear on hover, min 44px tap targets */}
        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); advance(-1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-fd-black/70 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl leading-none hover:bg-fd-surface"
              aria-label="Previous screenshot"
              style={{ zIndex: count + 2 }}
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); advance(1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-fd-black/70 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl leading-none hover:bg-fd-surface"
              aria-label="Next screenshot"
              style={{ zIndex: count + 2 }}
            >
              ›
            </button>
          </>
        )}

        {/* Counter badge */}
        {hasMultiple && (
          <div
            className="absolute top-2 left-2 bg-fd-black/70 backdrop-blur-sm rounded px-1.5 py-0.5"
            style={{ zIndex: count + 2 }}
          >
            <span className="text-[9px] font-mono text-fd-gray/70">{active + 1}/{count}</span>
          </div>
        )}
      </div>

      {/* Dot indicators */}
      {hasMultiple && (
        <div className="mt-2 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? "w-4 bg-fd-orange" : "w-1.5 bg-fd-border hover:bg-fd-gray/40"
              }`}
              aria-label={`Screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox — full-size original PNG */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out p-4 sm:p-8"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 z-10 w-7 h-7 rounded-full bg-fd-black border border-white/20 text-white text-sm flex items-center justify-center hover:bg-fd-surface transition-colors"
            >
              ✕
            </button>
            <img
              src={lightbox}
              alt={alt}
              className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
```

---

## Step 3 — Update `components/Hero.tsx`

Replace `import ScreenshotFrame from "./ScreenshotFrame"` with `import ScreenshotCarousel from "./ScreenshotCarousel"`.

Replace:
```tsx
<ScreenshotFrame
  src="/images/screenshots/6_01_33_PM.webp"
  alt="FlightDeck ATC — Air Traffic Control showing crew status and flight trajectories"
  priority
/>
```

With:
```tsx
<ScreenshotCarousel
  images={[
    "Home-Terminal",
    "Home-Terminal-with-Terminal-Panel",
    "Home-Terminal-with-Notification",
    "Cockpit",
    "Cockpit-with-overlay",
    "Crew-Manifest",
  ]}
  alt="FlightDeck — project command and overview"
  priority
/>
```

---

## Step 4 — Update `components/Problem.tsx`

Replace `import ScreenshotFrame from "./ScreenshotFrame"` with `import ScreenshotCarousel from "./ScreenshotCarousel"`.

The video-ended screenshot reveal currently uses `ScreenshotFrame`. Replace that instance only:

Replace:
```tsx
<ScreenshotFrame
  src="/images/screenshots/6_01_42_PM.webp"
  alt="FlightDeck Cockpit showing warning caution row"
/>
```

With:
```tsx
<ScreenshotCarousel
  images={["Cockpit", "Cockpit-with-overlay"]}
  alt="FlightDeck Cockpit showing system health and cautions"
/>
```

---

## Step 5 — Update `components/DevModeCallout.tsx`

Replace `import ScreenshotFrame from "./ScreenshotFrame"` with `import ScreenshotCarousel from "./ScreenshotCarousel"`.

The component has two screenshot slots that swap when the Flight/Dev toggle changes. Replace both:

Flight mode screenshot — replace:
```tsx
<ScreenshotFrame
  src="/images/screenshots/6_02_04_PM.webp"
  alt="FlightDeck Document Manifest in Flight mode — aviation naming"
/>
```
With:
```tsx
<ScreenshotCarousel
  images={[
    "Document-Manifest-Inbox",
    "Document-Manifest-Icon-Library",
    "Document-Manifest-Logos",
    "Document-Manifest-Logos-Ingest-Modal",
  ]}
  alt="FlightDeck Document Manifest in Flight mode"
/>
```

Dev mode screenshot — replace:
```tsx
<ScreenshotFrame
  src="/images/screenshots/6_53_25_PM.webp"
  alt="FlightDeck Documents in Developer mode — technical naming"
/>
```
With:
```tsx
<ScreenshotCarousel
  images={[
    "Dev-Mode-Documents-Inbox",
    "Dev-Mode-Documents-Planning-Tab",
    "Dev-Mode-Documents-Icon-Library",
    "Dev-Mode-Documents-Logos",
    "Dev-Mode-Documents-Logos-2",
  ]}
  alt="FlightDeck Documents in Developer mode"
/>
```

---

## Step 6 — Update `components/ProductSurfaces.tsx`

### 6a — Update the `SubTab` interface

Change `image: string` to `images: string[]`:

```ts
interface SubTab {
  number: string;
  name: string;
  images: string[];   // was: image: string
  alt: string;
  body: string;
}
```

### 6b — Replace `ScreenshotFrame` import with `ScreenshotCarousel`

Replace `import ScreenshotFrame from "./ScreenshotFrame"` with `import ScreenshotCarousel from "./ScreenshotCarousel"`.

### 6c — Replace the ScreenshotFrame call in the VisualCol JSX

Find the line that renders the active tab's screenshot. Replace:
```tsx
<ScreenshotFrame src={t.image} alt={t.alt} />
```
With:
```tsx
<ScreenshotCarousel images={t.images} alt={t.alt} />
```

### 6d — DO NOT TOUCH the pills section

The tab pills, their numbers, their names, their orange progress bar animation, their click handlers, and the `← → to browse` hint are completely unchanged.

### 6e — Update the `regions` data array with new `images` arrays

Replace the entire `regions` array with:

```ts
const regions: SurfaceRegion[] = [
  {
    number: "1.0",
    label: "Plan",
    headingLine1: "Turn ideas into",
    headingLine2: "governed specs.",
    visualSide: "right",
    intro:
      "Every plan, specification, policy, design document, wireframe, and visual asset in the system — classified, searchable, and health-checked. Every document has a live health indicator. And when it\u2019s red, the system doesn\u2019t just show you a colored dot. It tells you what\u2019s wrong, why it happened, and gives you a button to fix it.",
    tabs: [
      {
        number: "1.1",
        name: "Document Manifest",
        images: [
          "Document-Manifest-Inbox",
          "Document-Manifest-Icon-Library",
          "Document-Manifest-Logos",
          "Document-Manifest-Logos-Ingest-Modal",
          "Document-Manifest-Logos-with-Terminal-Build",
          "Document-Manifest-Logos-with-Terminal-Agent",
        ],
        alt: "FlightDeck Document Manifest",
        body: "Every plan, spec, wireframe, and asset — classified, health-checked, and linked to the work it drives. Green means everything matches. Yellow means something has drifted. Red means there\u2019s a problem — and the system tells you what, why, and how to fix it.",
      },
      {
        number: "1.2",
        name: "Flight Planning",
        images: ["Flights-List", "Flight-Planification", "Flight-Logs"],
        alt: "FlightDeck Flight Planning",
        body: "Your execution board. Every flight plan organized by sprint, with completion status, effort, and lineage to the spec that created it. This is where you see the truth chain: this spec produced these flight plans, these are done, these are in progress, these are waiting.",
      },
      {
        number: "1.3",
        name: "Ingest",
        images: ["Document-Manifest-Logos-Ingest-Modal", "Ingest-Document-Closeup"],
        alt: "FlightDeck Ingest",
        body: "Drop in a markdown document and it gets classified, summarized by AI, and routed through the inbox. Drop in a JSX wireframe and it renders as a live, interactive preview. You don\u2019t have to tell FlightDeck what kind of file you\u2019re giving it.",
      },
    ],
  },
  {
    number: "2.0",
    label: "Execute",
    headingLine1: "Coordinate",
    headingLine2: "the crew.",
    visualSide: "left",
    intro:
      "You are the pilot in command. Your AI tools are your crew. Each one has a defined job, clear limits, and rules about what it can and cannot do without your sign-off. You manage a team, not a chatbox.",
    tabs: [
      {
        number: "2.1",
        name: "Cockpit",
        images: ["Cockpit", "Cockpit-with-overlay"],
        alt: "FlightDeck Cockpit",
        body: "Your at-a-glance command deck. Every session starts here. A full automated preflight check reads your project\u2019s health every time you start — document status, inbox items, spec coverage, flight plan status, provider connections, and agent context levels — so you always know where you stand before you touch a thing.",
      },
      {
        number: "2.2",
        name: "ATC",
        images: [
          "Home-Terminal",
          "Home-Terminal-with-Terminal-Panel",
          "Home-Terminal-with-Notification",
          "Home-Terminal-Cards-Closeup",
        ],
        alt: "FlightDeck ATC",
        body: "Portfolio command across all projects. Session timer. Crew fuel gauges. Multi-project trajectories with current phase and destination. The full picture from one surface.",
      },
      {
        number: "2.3",
        name: "Crew Manifest",
        images: ["Crew-Manifest", "Dev-Mode-Agents-and-Connections"],
        alt: "FlightDeck Crew Manifest",
        body: "Your AI team roster. Which tools are connected, what each one has been asked to do, what they\u2019ve produced, and the full history of your conversations with them. Danny is Pilot. ChatGPT is Architect. Claude is Reasoner. Claude Code is Implementer.",
      },
    ],
  },
  {
    number: "3.0",
    label: "Govern",
    headingLine1: "Receipts for",
    headingLine2: "everything.",
    visualSide: "right",
    intro:
      "Session history, decisions, commits, and receipts. Nothing fails silently — when something goes wrong, FlightDeck tells you what happened, why it matters, and what to do about it. In plain language. With a button to fix it.",
    tabs: [
      {
        number: "3.1",
        name: "Flight Logs",
        images: ["Flight-Logs", "Dev-Mode-Session-History"],
        alt: "FlightDeck Flight Logs",
        body: "The historical memory of the system. Session history, receipts, prior decisions, archived past work, and the history of your dispatches with your AI crew. This is where you go when you need to know what happened before now. No more \u201Cwhat was I doing last Tuesday?\u201D",
      },
      {
        number: "3.2",
        name: "Maintenance",
        images: ["Maintenance-System-Health", "Dev-Mode-Settings-System-Health"],
        alt: "FlightDeck Maintenance",
        body: "Your service hangar. Diagnostic tools, security settings, system preferences, provider bindings, key rotation, and the machinery you need to keep the system healthy and under control.",
      },
      {
        number: "3.3",
        name: "Schema Explorer",
        images: ["Data-Structures", "Dev-Mode-Schema-Explorer"],
        alt: "FlightDeck Schema Explorer",
        body: "Safe, structured visibility into your project\u2019s database schema. You can explore tables, columns, relationships, and indexes without needing raw database tooling. The system makes your data structure legible without putting you in a position to accidentally damage it.",
      },
    ],
  },
];
```

---

## Step 7 — Update `components/FlightSchool.tsx`

### 7a — Update the phase data structure

Change `image: string` to `images: string[]` in the phases array type. Replace `import ScreenshotFrame from "./ScreenshotFrame"` with `import ScreenshotCarousel from "./ScreenshotCarousel"`.

### 7b — Replace ScreenshotFrame call

Replace:
```tsx
<ScreenshotFrame src={phase.image} alt={phase.alt} />
```
With:
```tsx
<ScreenshotCarousel images={phase.images} alt={phase.alt} autoRotateInterval={3500} />
```

### 7c — Replace the phases array with:

```ts
const phases = [
  {
    number: "4.1",
    flightName: "Co-Pilot Briefing",
    devName: "Governance",
    tagline: "How your co-pilot communicates, decides, and operates.",
    desc: "Complete the intake to configure your governance doctrine, set your experience level, and unlock the full FlightDeck workflow.",
    images: [
      "Flight-School-Welcome",
      "Flight-School-Experience-Calibration",
      "Flight-School-Phase1-Intro",
      "Flight-School-Phase1-Communication-Style",
      "Flight-School-Phase1-Humor",
      "Flight-School-Phase1-Mood-Tone",
      "CoPilot-Briefing-Card-Closeup",
    ],
    alt: "Co-Pilot Briefing — Flight School governance setup",
    comingSoon: false,
  },
  {
    number: "4.2",
    flightName: "Mission Control",
    devName: "Projects",
    tagline: "Define your project, configure infrastructure, and bind services.",
    desc: "Create a new project with governance settings, provider bindings, and crew assignments pre-configured from your profile.",
    images: [
      "Mission-Control-Create-New-Project",
      "Mission-Control-New-or-Existing",
      "Mission-Control-Project-Role",
      "Mission-Control-Project-Name",
      "Mission-Control-Short-Code",
      "Mission-Control-Project-Description",
      "Mission-Control-Whats-Already-In-Place",
      "Mission-Control-Card-Closeup",
    ],
    alt: "Mission Control — project creation flow",
    comingSoon: false,
  },
  {
    number: "4.3",
    flightName: "Tactical Ops",
    devName: "Skills",
    tagline: "Create reusable skills and workflow patterns.",
    desc: "Build reusable skills that automate common workflows and execution patterns across your projects.",
    images: [
      "Tactical-Ops-Skill-Building-Setup",
      "Tactical-Ops-Skill-Building-Setup-Expanded",
      "Tactical-Ops-Card-Closeup",
    ],
    alt: "Tactical Ops — skill building setup",
    comingSoon: false,
  },
  {
    number: "4.4",
    flightName: "Design Deck",
    devName: "Visual Foundation",
    tagline: "Establish your product\u2019s visual system before you write a spec.",
    desc: "Answer structured questions about your product\u2019s feel, layout, and visual direction. Get back a governed wireframe swatch, core screen blueprints, and design rules \u2014 linked to everything else in the system.",
    images: ["Flight-School-Welcome"],
    alt: "Design Deck — coming soon",
    comingSoon: true,
  },
];
```

---

## Step 8 — Bump version

In `package.json`: change `"version": "1.2.0"` to `"version": "1.3.0"`.

---

## Step 9 — Verify

Run `npm run dev` and check every section at `localhost:3000`:

- **Hero:** carousel cycles through 6 screens, stacked cards visible behind front, arrows appear on hover, dots below
- **Problem:** video plays → on end, Cockpit carousel fades in with overlay card stacked behind
- **DevModeCallout:** toggle switches between flight carousel (4 screens) and dev carousel (5 screens), both stack correctly
- **Plan (1.0):** Document Manifest pill shows 6-screen carousel, Flight Planning shows 3, Ingest shows 2 — pills unchanged, arrows and dots work within each
- **Execute (2.0):** Cockpit shows 2 screens, ATC shows 4, Crew Manifest shows 2 — pills unchanged
- **Govern (3.0):** all three tabs show 2 screens each — pills unchanged
- **Flight School:** Co-Pilot Briefing carousels 7 screens, Mission Control 8, Tactical Ops 3
- **Click any image → lightbox opens full PNG, Escape closes**
- On narrow viewport (< 680px): single column, thumbs load fast, tap targets ≥ 44px

Do not delete old `.webp` files until verify passes.

---

## Commit message

```
feat: replace all screenshots with new carousel system (v1.3.0)

- Add ScreenshotCarousel component with stacked cards, auto-rotate,
  arrow controls, dot indicators, and lightbox (thumbs default, full PNG on click)
- Copy 51 originals + 51 thumbs to public/images/screenshots/
- Update Hero, Problem, DevModeCallout, ProductSurfaces, FlightSchool
- ProductSurfaces pill navigation unchanged — carousel operates within each tab slot
- FlightSchool applet cards now carousel through all wizard sub-screens
```
