# Prompt Dispatch — Replace All Screenshots with Carousel Gallery

## Context

The FlightDeck marketing site needs all existing screenshots replaced with a new set of normalized, named screenshots. The images live in the repo at:

```
/Users/danny/Projects/FlightdeckACP-Marketing/Docs/Assets/FlightDeck New Screenshots/
├── originals/   ← full-size PNGs (use for lightbox / click-to-expand)
└── thumbs/      ← 300px-wide JPEGs (use for all default web views, especially iPhone)
```

## File Inventory

### Full-App Screenshots (31 files) — all exactly 3456×2159 px

These are full desktop views of each FlightDeck page. Trimmed to remove the macOS title bar. Identical dimensions — safe to carousel together.

**Flight Mode pages:**
- `Cockpit.png` / `.jpg`
- `Cockpit-with-overlay.png` / `.jpg`
- `Home-Terminal.png` / `.jpg`
- `Home-Terminal-with-Terminal-Panel.png` / `.jpg`
- `Home-Terminal-with-Notification.png` / `.jpg`
- `Crew-Manifest.png` / `.jpg`
- `Document-Manifest-Inbox.png` / `.jpg`
- `Document-Manifest-Icon-Library.png` / `.jpg`
- `Document-Manifest-Logos.png` / `.jpg`
- `Document-Manifest-Logos-Ingest-Modal.png` / `.jpg`
- `Document-Manifest-Logos-with-Terminal-Build.png` / `.jpg`
- `Document-Manifest-Logos-with-Terminal-Agent.png` / `.jpg`
- `Maintenance-System-Health.png` / `.jpg`
- `Data-Structures.png` / `.jpg`
- `Flights-List.png` / `.jpg`
- `Flight-Planification.png` / `.jpg`
- `Flight-Logs.png` / `.jpg`

**Dev Mode pages (prefix `Dev-Mode-`):**
- `Dev-Mode-System-Overview-All-Projects.png` / `.jpg`
- `Dev-Mode-Home-Terminal.png` / `.jpg`
- `Dev-Mode-Project-Overview.png` / `.jpg`
- `Dev-Mode-Agents-and-Connections.png` / `.jpg`
- `Dev-Mode-Settings-System-Health.png` / `.jpg`
- `Dev-Mode-Schema-Explorer.png` / `.jpg`
- `Dev-Mode-Documents-Inbox.png` / `.jpg`
- `Dev-Mode-Documents-Planning-Tab.png` / `.jpg`
- `Dev-Mode-Documents-Icon-Library.png` / `.jpg`
- `Dev-Mode-Documents-Logos.png` / `.jpg`
- `Dev-Mode-Documents-Logos-2.png` / `.jpg`
- `Dev-Mode-Flight-Planification.png` / `.jpg`
- `Dev-Mode-Sprints.png` / `.jpg`
- `Dev-Mode-Session-History.png` / `.jpg`

### Wizard / Applet Screens (15 files) — all exactly 1074×1722 px

These are the three onboarding applet flows (Flight School, Mission Control, Tactical Ops). All normalized to the same canvas. Safe to carousel within their group.

**Flight School (6 screens):**
- `Flight-School-Welcome.png` / `.jpg`
- `Flight-School-Experience-Calibration.png` / `.jpg`
- `Flight-School-Phase1-Intro.png` / `.jpg`
- `Flight-School-Phase1-Communication-Style.png` / `.jpg`
- `Flight-School-Phase1-Humor.png` / `.jpg`
- `Flight-School-Phase1-Mood-Tone.png` / `.jpg`

**Mission Control (7 screens):**
- `Mission-Control-Create-New-Project.png` / `.jpg`
- `Mission-Control-New-or-Existing.png` / `.jpg`
- `Mission-Control-Project-Role.png` / `.jpg`
- `Mission-Control-Project-Name.png` / `.jpg`
- `Mission-Control-Short-Code.png` / `.jpg`
- `Mission-Control-Project-Description.png` / `.jpg`
- `Mission-Control-Whats-Already-In-Place.png` / `.jpg`

**Tactical Ops (2 screens):**
- `Tactical-Ops-Skill-Building-Setup.png` / `.jpg`
- `Tactical-Ops-Skill-Building-Setup-Expanded.png` / `.jpg`

### Closeup / Detail Cards (5 files) — various sizes, standalone only

These are detail crops and should be displayed as standalone images (not in a carousel with other sizes):

- `Home-Terminal-Cards-Closeup.png` / `.jpg` (1952×518)
- `CoPilot-Briefing-Card-Closeup.png` / `.jpg` (640×506)
- `Mission-Control-Card-Closeup.png` / `.jpg` (638×502)
- `Tactical-Ops-Card-Closeup.png` / `.jpg` (640×498)
- `Ingest-Document-Closeup.png` / `.jpg` (1118×1504)

---

## Carousel Groupings

Use these groupings for the layered-card carousel. The first image in each group is the default "front" card. Cards auto-rotate every 4 seconds, pause on hover, and have left/right arrow navigation. Clicking any card opens the full-size original in a lightbox.

### Flight Mode Section

| Group | Front Card | Behind (in order) |
|-------|-----------|-------------------|
| **Cockpit** | Cockpit | Cockpit-with-overlay |
| **Home Terminal** | Home-Terminal | Home-Terminal-with-Terminal-Panel, Home-Terminal-with-Notification |
| **Crew Manifest** | Crew-Manifest | *(single image)* |
| **Document Manifest** | Document-Manifest-Inbox | Document-Manifest-Icon-Library, Document-Manifest-Logos, Document-Manifest-Logos-Ingest-Modal, Document-Manifest-Logos-with-Terminal-Build, Document-Manifest-Logos-with-Terminal-Agent |
| **Maintenance** | Maintenance-System-Health | *(single image)* |
| **Data Structures** | Data-Structures | *(single image)* |
| **Flights** | Flights-List | Flight-Planification, Flight-Logs |
| **Flight School** | Flight-School-Welcome | Flight-School-Experience-Calibration, Flight-School-Phase1-Intro, Flight-School-Phase1-Communication-Style, Flight-School-Phase1-Humor, Flight-School-Phase1-Mood-Tone |
| **Mission Control** | Mission-Control-Create-New-Project | Mission-Control-New-or-Existing, Mission-Control-Project-Role, Mission-Control-Project-Name, Mission-Control-Short-Code, Mission-Control-Project-Description, Mission-Control-Whats-Already-In-Place |
| **Tactical Ops** | Tactical-Ops-Skill-Building-Setup | Tactical-Ops-Skill-Building-Setup-Expanded |

### Dev Mode Section

| Group | Front Card | Behind (in order) |
|-------|-----------|-------------------|
| **System Overview** | Dev-Mode-System-Overview-All-Projects | *(single image)* |
| **Home Terminal** | Dev-Mode-Home-Terminal | Dev-Mode-Project-Overview |
| **Agents & Connections** | Dev-Mode-Agents-and-Connections | Dev-Mode-Settings-System-Health, Dev-Mode-Schema-Explorer |
| **Documents** | Dev-Mode-Documents-Inbox | Dev-Mode-Documents-Planning-Tab, Dev-Mode-Documents-Icon-Library, Dev-Mode-Documents-Logos, Dev-Mode-Documents-Logos-2 |
| **Flight Planification** | Dev-Mode-Flight-Planification | *(single image)* |
| **Sprints** | Dev-Mode-Sprints | *(single image)* |
| **Session History** | Dev-Mode-Session-History | *(single image)* |

### Standalone Detail Cards (no carousel)

Display these individually wherever the three applets are featured:
- `Home-Terminal-Cards-Closeup` — shows all three onboarding cards side by side
- `CoPilot-Briefing-Card-Closeup` — detail of the Co-Pilot Briefing card
- `Mission-Control-Card-Closeup` — detail of the Mission Control card
- `Tactical-Ops-Card-Closeup` — detail of the Tactical Ops card
- `Ingest-Document-Closeup` — detail of the document ingest classification modal

---

## Implementation Instructions

### Image Loading Strategy

1. **Default (all views):** Use the `thumbs/` JPEGs (~11KB each, 300px wide). Reference them as:
   ```
   /images/screenshots/thumbs/Cockpit.jpg
   ```

2. **Click-to-expand (lightbox):** Load the `originals/` PNG on click:
   ```
   /images/screenshots/originals/Cockpit.png
   ```

3. **Add `loading="lazy"`** to all `<img>` tags so offscreen images don't load until scrolled into view.

### Carousel Behavior

- **Layered stack effect:** Behind the front card, show 1-2 peeking cards offset upward (translateY -6px per layer, scale down 3% per layer, opacity fade 25% per layer)
- **Auto-rotate:** Advance to next image every 4 seconds
- **Pause on hover:** Stop auto-rotate when user hovers over a card
- **Arrow controls:** Left/right arrows appear on hover, advance manually
- **Dot indicators:** Show dots below multi-image cards for direct navigation
- **Counter:** Show "2/7" style counter in the card label area

### Flight Mode / Dev Mode Toggle

Add a toggle at the top of the gallery section so users can switch between Flight Mode and Dev Mode views. Flight Mode is default.

### Mobile (iPhone) Optimization

- Use only the `thumbs/` JPEGs — total payload ~0.5MB for all 51 images vs 29.8MB for originals
- Single-column grid on viewports under 680px
- Touch-friendly arrow buttons (min 44×44 tap target)

### File Sizes

| Category | Count | Total Size | Avg per Image |
|----------|-------|-----------|---------------|
| Originals (PNG) | 51 | ~29.8 MB | ~584 KB |
| Thumbs (JPEG) | 51 | ~0.5 MB | ~11 KB |

---

## What to Replace

Replace ALL existing screenshots on the marketing site with these new named files. Every page/section that currently shows a FlightDeck screenshot should be updated to use the appropriate carousel group from above. The three onboarding applets (Flight School, Mission Control, Tactical Ops) should each get their own carousel showing the step-by-step flow.

## Component Reference

A ready-made React component (`ScreenshotGallery.jsx`) and CSS file (`screenshot-gallery.css`) are available in the same folder as the screenshots. A standalone HTML preview (`gallery-preview.html`) is also included — open it from the screenshots folder to see the gallery working with the actual images.
