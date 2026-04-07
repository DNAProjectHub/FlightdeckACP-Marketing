# FlightDeck — What the Product Is

**Generated from live specifications, March 16, 2026**

---

## The Product

FlightDeck is an all-in-one software creation product and founder control plane. It guides you from first inspiration through guided ideation, founding principles, governing document creation, system and product specification, execution planning, and tracked delivery. It is built for solo founders building software products and the companies behind them, with AI coordinated into every step.

FlightDeck is one governed system made up of multiple coordinated surfaces — a cockpit for operational awareness, a manifest for your documents, a flight plan for your execution chain, logs for your session history, a crew manifest for your AI team, and a maintenance hangar for servicing and diagnostics. Every project, every governing document, every specification, every work item, and every AI agent interaction lives inside this system where it can be seen, traced, reviewed, and audited together.

The thesis: with the right governance, structure, and AI orchestration built into every aspect of the product, a solo founder can operate a development project at the throughput level of a small army of engineers, coders, PMs, and technical operators — without losing the plot, the architecture, or the truth.

The product uses the metaphor of the founder as pilot in command. You sit in the cockpit. AI systems are your dispatchable crew members with defined roles, capabilities, costs, and governance constraints. FlightDeck is your cockpit and control plane. Planning documents are where ideas take shape. Specifications are executable contracts — if it won't be decomposed into work, it's not a spec. Flight plans are the execution units derived from those specs, permanently linked back to their source. Sprints are temporary execution packets, not the permanent structure. The project is the flight. Delivery is the destination — or a connecting hub if you have future versions and multiple SKUs planned.

Every piece of work in the system traces back to the document that created it. Every document traces to the planning intent that shaped it. Nothing floats ungrounded. Nothing fails silently. That lineage — from idea to plan to spec to work item to shipped feature — is not a nice-to-have. It is the product.

FlightDeck is not just a project management product designed for human teams. It is not just an AI wrapper around a process you could do manually. It is not just DevOps that manages delivery but not the decisions that precede it.

It is the ideation, orchestration, governance, and lineage layer that makes GitHub, Vercel, Supabase, Claude, ChatGPT, and Claude Code work together safely for a solo operator. It gives one founder a place to think, decide, specify, decompose, track, and ship — inside one navigable system of truth.

---

## The Six Surfaces

FlightDeck is organized into six surfaces, each with a distinct job.

### 1. Cockpit

The command deck. When you open FlightDeck, the Cockpit tells you whether you are in control of this project right now.

It shows the current project identity, the active flight destination (what phase of the build you're in), gate progress toward that destination, and unresolved cautions — real signals about things that need attention, not decorative gauges.

The crew cards sit here as summary instruments: five cards showing Danny (Pilot), ChatGPT (Architect), Claude (Reasoner), Claude Code (Implementer), and Gemini (Researcher). Each card shows a fuel gauge — the percentage of context window remaining for that agent — because context is a consumable resource. When Claude Code is at 88%, the system warns you to recommend a refuel (context reset with rehydration).

The ATC readout area provides a voice-narrated briefing of current project state. Start Engines is the action that begins a work session: it collects context, sends it to the AI, proposes a flight plan, and presents it for review. The console area at the bottom shows live build status and recent git commits.

The Cockpit is not where you go to find documents or manage work items. It's where you go to answer: "Am I ready to fly?"

### 2. Flight Plan

The execution surface. This is where specifications become work.

Every specification in the system can be decomposed into work items through a governed process called Planify. Planify takes the spec text, dependency summaries, and lineage metadata, sends it to Claude (Sonnet model for extraction quality), and produces a bounded set of work items with acceptance criteria. The output is validated fail-closed — if any item fails schema validation, the entire batch is rejected. No partial writes.

Work items are permanently grouped by source specification, not by sprint. The Flight Plan surface shows truth chains: each spec with its child work items, completion percentage, and status breakdown. This is the permanent organizing axis.

Sprints — called "flights" in FlightDeck — are temporary execution packets assembled on demand through Sprintify. You tell Sprintify your focus area, time budget, and priority bias, and it recommends a coherent set of work items from the pool. Preference goes to items from the same source spec for coherence. You review, adjust, confirm. The flight is created.

When a spec already has work items and you planify it again, the system forces a choice: Additive (keep existing, add new) or Re-Planify (replace all from this spec). No silent duplicates. No silent deletions.

Every work item traces to its source specification with a version hash. If the spec changes, the system knows the work items were derived from an older version.

### 3. Flight Logs

Session history and diffs. Every work session produces a flight log: YAML frontmatter for machine indexing, narrative body for human scanning, mandatory compliance checklist, and links to what was built, what changed, and what decisions were made.

This is not buried in Cockpit or Maintenance. It is its own surface because session history is a first-class operational concern — you need to know what happened last session, what was committed, what was decided, and what was deferred.

### 4. Flight Manifest

The document browser. Every governed document in the system appears here, classified by kind and grouped by pipeline class: Specifications (things that drive work), System Ops (policies, protocols, decisions, tools, records), and Planning (plans, guides, references).

Documents enter the system through a universal path: Upload → AI Classification → Inbox → Canon. There is no other path. Every document passes through the Inbox, which is the sole review gate.

The AI classifies documents into three lanes:

**Business Strategy** — why we do what we do. Vision, positioning, market thinking, pricing. These carry a lifecycle status (proposed or ratified) but no build pipeline stage, because strategy documents don't get decomposed into work items.

**Product Design** — what we are building. Features, specifications, wireframes, architecture, plans. These carry a pipeline stage: ideation → specification → flight planning → building → shipping. A specification is a constitutional commitment — if it will not be decomposed into flight plans, it is not a specification.

**System Ops** — how we run the system. Policies, protocols, decisions, tools, records. These carry an ops family (governance, tools, or records) and a lifecycle status, but no build pipeline stage.

Documents are also classified by domain: Strategy (direction and decisions), Design (visual and structural plans), Instructions (consultative guides), Procedures (operational runbooks), and Staging (drafts without a permanent home).

Health indicators appear on every document: green means the file exists on GitHub and matches the stored hash, yellow means it has drifted or has no baseline, red means the file is missing. When a document shows red, the system doesn't just show a dot — it diagnoses the likely cause in plain language and offers an actionable fix: "This file probably exists on your computer but hasn't been pushed to GitHub yet. Push and refresh."

The Manifest shows active and inbox documents only. Archived documents, session reports, and historical records are invisible here — they live in Maintenance. This prevents the working corpus from being contaminated by dead material.

### 5. Crew Manifest

The full agent management surface. This is not the crew cards on Cockpit — those are summary gauges. The Crew Manifest is where you manage your AI team: connection status, capabilities, cost profiles, chat archives, and the comms log.

The comms log shows the history of agent dispatches — what was sent to Claude Code, what came back, what was approved, what was rejected. Named prompt recovery lets you find and reuse effective prompts. The agent catalog shows which agents are available and what they're good at.

Provider bindings (which API keys connect to which services) are configured in Maintenance, but the Crew Manifest shows which providers each agent uses.

### 6. Maintenance

The service hangar. Everything that needs servicing, cleanup, diagnosis, or historical lookup lives here.

**Archive** — superseded, retired, and intentionally shelved documents. Browseable but not in the active working surfaces.

**History** — session reports, execution transcripts, commit history.

**Diagnostics** — system health checks, integrity validation, the project review audit that finds structural problems.

**Trash** — soft-deleted documents and work items. Restorable.

**Secrets and Keys** — API key management with macOS Keychain backing (desktop), per-project scoping, instant validation, guided rotation, and zero raw key display after initial entry.

**Preferences** — dev labels toggle, auto-fit deck, speed settings.

**Provider Bindings** — per-project connections to GitHub, Supabase, Vercel, and AI providers. Test connection, verify, manage.

---

## The Document Lifecycle

Every document follows one path:

```
Upload → AI processes (background) → Inbox → Approve to Canon
```

When a document arrives in the Inbox, the AI has already classified it: lane, domain, kind, stage, confidence level. The Inbox Item Review Card shows all of this in expandable rows. Each field carries a source badge: authored (green, from frontmatter), suggested (blue, inferred by AI), extracted (purple, found in content), defaulted (gray, system default), or edited (amber, changed by user during review).

The AI also generates three title suggestions and detects potential relationships with existing documents — content overlaps, near-duplicate titles, or source references. Each relationship is shown with a colored left border and an action picker: no relationship, my document replaces this one, they're related, or my document is based on this one.

Quick actions let you approve green items without opening the card. Bulk actions let you approve, archive, or reprocess multiple items at once. Defer is implicit — close the card and the document stays in Inbox.

Once approved, a document can be reopened for planning if it needs rework. This is an explicit lifecycle transition that flips `is_canonical` back to false, records the reason, preserves the prior approval history, and shows warning badges on any work items derived from the now-mutable spec.

Documents can also be reprocessed — the AI classification and summary are regenerated from current content. This is manual-only in V1. No silent reinterpretation.

### The Inbox Markdown Editor

Documents can be edited while in Inbox via a dual-write model. "Save Draft" writes to Supabase only. "Publish to Repo" commits to GitHub first, updates Supabase only if GitHub succeeds, then forces linked documents back to Inbox so downstream consumers know a dependency changed. If GitHub fails, nothing touches Supabase. Failure is closed, not partial.

### The Heartbeat Scanner

FlightDeck periodically scans `docs/Inbox/` via the GitHub API, compares against the manifest, and surfaces any files not yet ingested. When pending files are detected, the Ingest button gains an alert badge with a count. The system never auto-ingests — it signals, the founder acts.

---

## How Work Gets Done

### From Idea to Execution

The full pipeline:

```
Vision → Specification → Planify → Flight Plans → Sprintify → Flight → Ship
```

A vision document describes direction. It spawns specifications — documents with a constitutional commitment to be decomposed into work items. A specification is planified into flight plans (work items with acceptance criteria and lineage). Flight plans sit in a pool grouped by source spec. Sprintify assembles a coherent flight from the pool. The flight is executed. Items are marked done.

### The Governed Run Protocol

Every agent-assisted development session follows rules. PR-Only mode forbids push, merge, deploy, and production writes. Every run requires a gate pack with deterministic proof — grep output, test results, SQL results. Never "I reviewed." A mandatory evidence footer lists files changed, gate outputs, forbidden ops confirmation, and ready state.

### Session Management

Sessions are built on a tmux-inspired execution model: durable lanes, tasks, receipts, and checkpoints that survive UI disconnects. A session bootstrap step opens all the dashboards and dev servers you need in one confirmed action — GitHub, Supabase, Vercel dashboards plus local targets, all from stored project bindings.

### The Multi-Agent Team

| Agent | Role | What They Do |
|---|---|---|
| Danny | Founder / Director | Final authority. Eyes, taste, ethos. |
| ChatGPT | Architect | System design, governance, tradeoffs. Proposes, never decides. |
| Claude | Reasoner / Auditor | Synthesis, analysis, document creation, session management. |
| Claude Code | Implementer | Repo edits, refactors, migrations. Zero interpretive authority. |
| Gemini | Researcher | Web discovery, competitive scans, documentation lookup. |

No agent outranks Danny. No agent executes without governance. Claude Code has four subagents: @preflight (validates before execution), @governance-auditor (checks compliance), @schema-reviewer (validates data changes), and @shutdown (clean session close). Each has a narrow system prompt and strict operation-scope invariants.

### Transport and Failure Handling

The system enumerates 26 failure modes across transport, execution, authority, persistence, UI, and human factors. Each has a severity tier (INFO, CAUTION, or CRITICAL FAILURE), a detection signal, a pilot-visible surface, and a required system response.

CRITICAL FAILURE is protected language — it may only be used for Tier 3, where system integrity is compromised. It cannot be dismissed. Every relay request passes through a state ladder: CREATED → SUBMITTED → PILOT APPROVED → DISPATCHED → EXEC STARTED → COMPLETE (or terminal failure states at each step).

The constitutional doctrine: no silent failures. The system may annoy the founder, but it may never confuse them. Every failure produces a detectable signal, a visible surface, and a persisted record.

---

## Multi-Project Architecture

FlightDeck manages multiple projects with full isolation. Each project has its own infrastructure — its own Supabase instance, its own Vercel deployment, its own GitHub repository. The control plane stores pointers, not data. Cross-project operations require explicit intent.

### Project Switch Governance (PSGR)

Five presence states govern how you interact with a project:

- **NONE** — no project selected
- **BROWSE** — read-only, no execution authority
- **HYDRATING** — validating governance bundle (transient)
- **PERSISTENT** — cleared for operations, execution enabled
- **FAILED** — rehydration failed, operations blocked

Execution authority exists only in PERSISTENT. Switching projects requires explicit choice: persistent switch (enables execution, reinjects context) or just browsing (read-only with a banner). Reducing authority is always safe. Increasing authority requires full validation.

### Flight School and Project Creation

New projects are created through a guided questionnaire covering identity, repo, data layer, governance posture, planning preferences, agent configuration, and safety boundaries. The Flight School intake asks 38 questions across tone, safety gates, protected systems, boot sequence, write authority, and tool stack — each answer generates deterministic governance directives.

The system derives a hardware recommendation from your surface choice and tool stack: Web (browser only), Lite Desktop (basic local dev), Serious Cockpit (full agent orchestration), or Heavy Agents (multiple concurrent AI operations). The system recommends, not gatekeeps.

---

## What's Built vs. What's Planned

### Built and Live (Web Surface)

- Cockpit with crew cards, cautions, ATC readout
- Flight Planning with spec-grouped truth chains
- Flight Manifest with pipeline-class grouping, inbox, health dots
- Maintenance with Archive, History, Diagnostics, Trash
- Document ingest pipeline with AI classification
- Work item tracking with full lineage
- Multi-project switching
- Git-backed document health indicators
- Approval pipeline (DRY RUN + EXECUTE)

### Specified but Not Yet Built

- **Inbox Item Review Card** — the expandable field-by-field review experience with AI reasoning, three title suggestions, relationship detection, and source badges
- **FP2 Two-Path Ingest Interpreter** — the rewrite of the ingest engine for the new taxonomy, separating documents from assets
- **Document Workbench** — source text viewing, reprocessing, and reopen-for-planning lifecycle
- **Sprintify** — AI-assisted sprint assembly from the prioritized pool
- **Planify Packet Contract** — the full governed planification pipeline with version hashing, mode selection, atomic writes, and failure reporting
- **Document Surface Unification** — shared UI patterns across all document-work surfaces
- **Document Health Self-Diagnosis** — rich diagnosis with actionable fixes instead of just colored dots
- **Inbox Heartbeat Scanner** — automatic detection of un-ingested files
- **Automatic Git Sync** — background commit and push for watched directories
- **Repo Asset Ingestion** — images, logos, and binary assets as first-class manifest items with thumbnails and preview
- **Glossary Tooltips** — sidebar-toggled term detection from governed vocabulary on reading surfaces
- **Inbox Markdown Editor** — dual-write editing with GitHub-first commit model
- **Session Bootstrap** — one-click open of all project dashboards and dev servers
- **3 AM Capture** — quick note capture from any device, promote to governed artifact later
- **Project Control Ledger** — the generated whole-project synthesis surface (this document's future automated form)
- **Flight Logs and Crew Manifest** — dedicated surfaces for session history and agent management

### Future Horizon (Desktop / V2)

- **Flight Instruments** — Operations Deck with terminal stations, event tape, operation strip, and real-time agent observation (desktop execution surface)
- **Autopilot PCFM** — predictive context fuel management for agent context windows
- **Autopilot Vision** — seven-phase autonomy journey from idea to MVP
- **CC Subagent Architecture** — four narrow subagents for governed implementation
- **Key Vault** — macOS Keychain-backed secrets management
- **Workspace Import + Replicate** — clone, adopt, and replicate governed project workspaces
- **Project Interpretation Profile** — AI output customization derived from project questionnaire answers
- **ElevenLabs Voice** — ATC briefing narration
- **Design Swatch System** — governed palette registry with versioned, lockable color palettes and token export

---

## The Governing Layer

14 system-wide documents govern the product:

**Constitution and Vision** — Product Constitution (the product's philosophical boundaries), Product Vision (what FlightDeck is and why), Go-to-Market Master Plan (commercial strategy and distribution model), System Overview (architecture summary).

**Contracts and Schema** — Product Specification Contract (concrete commitments for V1 feature set), Canonical Schema and Lifecycle V2 (the taxonomy, classification rules, and constitutional invariants that govern all artifacts).

**Plans** — Work Control Plan (execution priorities), Specification Promotion and Planification Pipeline (how specs become work).

**Governance** — Architectural Invariants (non-negotiable system constraints), Archive Separation Doctrine (active surfaces never see archived material), Universal Operating Protocol (session rules), Multi-Agent Operating Protocol (how agents coordinate).

**Ledgers** — System Feature Ledger (what features exist and their status), Contract Surface Index (what each surface commits to).

### Constitutional Invariants

15 invariants govern the system:

1. Every artifact enters at Inbox. No exceptions.
2. If it will not be decomposed into flight plans, it is not a specification.
3. Only specifications generate flight plans (normal path).
4. Inbox is the only review surface.
5. Flight plans are not artifacts — they are database-native execution units.
6. Every spec-originated flight plan has exactly one source, permanently.
7. Flight plans are grouped by source specification.
8. Traceable lineage from flight plan to spec with section-level precision.
9. Sprints are temporary selection containers, not permanent lifecycle stages.
10. Override path (direct-entry flight plans) is narrow, visible, rare, and auditable.
11. No ungrounded flight plans.
12. No dark matter — every planned spec must expose its flight plan children.
13. Atomic planify — all or nothing.
14. No freehand flight plans — all work flows through the manifest-first pipeline or explicit override.
15. No silent failures — every failure produces a signal, a surface, and a record.

---

## The Design Principles

**Determinism over convenience.** Rules-based routing, deterministic state derivation, explicit constraints. AI handles reasoning and synthesis, not structural decisions.

**Founder as tower.** The system proposes, the founder approves. No silent mutations. No autonomous destructive actions.

**No silent failures.** Every failure produces a detectable signal, a visible surface, and a persisted record. "Probably worked" is an invalid system state.

**Visibility follows operational relevance.** Archived material is invisible to active surfaces. If it's not meant to be acted on, it doesn't appear where work happens.

**Safe stops.** Every stopping point is a safe stopping point. The founder can end any session at a stable checkpoint.

**Isolation by default.** Projects are isolated at the infrastructure level. Cross-project operations require explicit intent.

---

*This is FlightDeck as described by its specifications. 39 specs, 14 system-wide governing docs, 279 work items with full lineage. The product is partially built and fully specified. The distance between what's on paper and what's shipped is the current build scope.*
