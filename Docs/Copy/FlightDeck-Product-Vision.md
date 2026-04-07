# FlightDeck Product Vision

**The Solo Founder Control Plane**

| Field | Value |
|-------|-------|
| Author | Danny — Founder & CEO, Dog Nutrition Technologies Inc. |
| Type | Product Vision (Foundational) |
| Date | February 2026 (originated) |
| Last Updated | March 2026 — Architecture simplification, two-surface model established |

---

## What FlightDeck Is

FlightDeck is a control plane for solo founders who build and operate multiple software products simultaneously using AI-first development workflows. It is the single surface where every project, every document, every milestone, and every AI agent interaction converges into one navigable, auditable system.

The product exists because the tools available to solo founders today were designed for teams. They assume multiple human collaborators, sprint ceremonies, role-based access control, and shared calendars. A solo founder using Claude, Claude Code, ChatGPT, Gemini, and a constellation of API connectors doesn't need any of that. They need a cockpit — one surface where incoming work lands, gets triaged, gets routed to the right AI agent, and gets executed with full traceability.

FlightDeck's core thesis: a solo founder can operate at the throughput of a small team by treating AI tools as dispatchable crew members with defined capabilities, costs, and governance constraints.

---

## Product Category

FlightDeck does not fit neatly into any existing software category. It borrows from several but is none of them.

**It is not project management.** Tools like Linear, Jira, Asana, and Notion assume a team of humans coordinating work. FlightDeck assumes one human coordinating a team of AI agents.

**It is not an AI wrapper.** Products like Cursor, Copilot, and various "chat with your codebase" tools provide an interface to a single model. FlightDeck orchestrates across models and tools and maintains session continuity that no single tool provides.

**It is not DevOps.** CI/CD pipelines manage delivery. FlightDeck manages the decisions that precede delivery.

The closest analogy is an air traffic control system for a solo operator.

---

## Architecture: Two Surfaces, One Control Plane

FlightDeck is one governed control plane expressed through two surfaces: a web application for planning and review, and a desktop application for high-agency execution. Both connect to the same Supabase backend. Both enforce the same governance.

### Web Surface (Primary — Live Now)
Planning and review cockpit. Document governance, manifest management, inbox review, work item tracking, flight planning.

### Desktop Surface (Strategically Essential — Future)
Execution cockpit. Governed terminals, local agent orchestration, security-scoped repo access, offline-first. Neither surface is complete without the other.

### Shared Backend
Single Supabase instance. DB is source of truth.

---

## Document Governance

Every document follows: **Upload → AI Classification → Inbox → Canon.** No intermediate stages.

Documents classified by lane (Business Strategy / Product Design / System Ops), domain, release. Active documents appear in working surfaces; archived/historical do not. Visibility follows operational relevance.

---

## Core Surfaces

- **Manifest** — document browser, grouped by pipeline class (Specifications / System Ops / Planning)
- **Inbox** — universal review gate
- **Flight Planning** — spec-grouped truth chains (spec → flight plans)
- **Cockpit** — operational dashboard
- **Wireframes** — interim Media surface
- **Maintenance** — archive, history, diagnostics, trash

---

## Design Principles

Determinism over convenience. Auditability. Founder as tower. No silent failures. Visibility follows operational relevance. Safe stops. Isolation by default.

---

## Autopilot Direction

Long-horizon: AI-assisted execution layer managing agent context as consumable fuel. PCFM (Predictive Context Fuel Management). Future, not V1.

---

*Originated February 2026. Updated March 2026.*
