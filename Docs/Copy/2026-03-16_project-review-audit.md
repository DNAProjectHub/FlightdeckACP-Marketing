# FlightDeck Project Review

Date: 2026-03-16 @ 01:30 UTC / 6:30 PM PDT
Scope: DNA-Work-Control project (FlightDeck Core)
Build: v3.86.1+
Mode: Operational
Execution context: Browser-only (partial — no local filesystem reconciliation)
Previous audit: 2026-03-14 evening (informal, no JSON snapshot)

---

## 1. Project Briefing

*AI synthesis from active document state — labeled accordingly*

FlightDeck is in active build mode following a major compression and surface redesign session. The working corpus was cut in half today (228 → 118). Five product surfaces are now live: Cockpit, Flight Planning (rebuilt as spec-grouped truth chains), Manifest (now grouped by pipeline class), Wireframes (interim Media surface), and Maintenance (archive/history/diagnostics/trash). The architecture has settled into a two-surface model (web primary, desktop future) with Supabase as shared backend.

The product is in a governance-heavy phase: 32 of 84 active docs are System Ops (policies, protocols, decisions), and 34 are specifications. The governance framework is well ahead of the execution pipeline — the system knows what it wants to build but has only decomposed 6 of 34 specs into flight plans.

---

## 2. Delivery Posture

**Scope:** All non-trashed work items in wc_work_items.

| Metric | Count |
|---|---|
| Total work items | 244 |
| Done | 80 (33% of known work) |
| Approved | 119 |
| Filed | 30 |
| Ready | 8 |
| Parked | 7 |

**Spec coverage:** 6 of 34 active specs have linked work items. 28 specs are unplanified.

**Flight status:**
- Completed: 5 flights (FD-S-DB, FD-S-DB-W2, FD-S0, FD-S1, Sprint 3)
- In progress: 4 flights (FD-HEALTH-v1, FD-S2a, FD-S2b, FD-S5a)
- Not started: 11 flights (FD-S3 through FD-S11, Sprint 4, W10-2026)

**Throughput (7 days):** 0 work items created, 33 completed. Execution outpacing planning.

**Interpretation:** Known work is 33% complete, but 82% of active specs remain undecomposed. The project is executing fast on what's been planned but has a large planning backlog. The compression session today was governance/infrastructure, not feature delivery — the execution numbers reflect prior flight work, not today's session.

---

## 3. Transitional Pipeline

**Scope:** wc_manifest_items WHERE ingest_status IN ('inbox', 'intake_reviewed')

| Status | Total | Has Path | No Path | Has Summary | Fresh (<7d) |
|---|---|---|---|---|---|
| inbox | 31 | 22 | 9 | 31 | 17 |
| intake_reviewed | 0 | — | — | — | — |

**Age of inbox items:** 17 fresh (<7d), 6 stale (7-14d), 8 aging (>14d).

The 8 items older than 14 days are likely flight plans and future specs parked deliberately during triage. **Severity: Watch** — these are governed holds, not neglect.

**Staged-only docs (no repo path):** 10. These are browser-ingested items that auto-materialized to repo but may have path mismatches, or paste-origin items still awaiting file backing.

---

## 4. Active System Health

**Scope:** wc_manifest_items WHERE ingest_status = 'active', row_kind = 'data'

### Critical Findings

**1 duplicate title in live corpus — Severity: Critical (Tier 1)**
"Archive and History Surface Separation Doctrine" exists as both active (`5ea9276a`) and inbox (`974685ab`). The inbox copy was created via browser ingest after the active row was registered via SQL. The inbox copy has a malformed `doc_path` (full file path instead of directory-only). **Fix:** Delete the inbox duplicate `974685ab`.

### High Findings

**10 boundary mismatches — Severity: High (Tier 1/2)**
10 docs have `doc_applies_to = 'dna'` but belong to the FlightDeck Core project. Breakdown: 1 active, 5 inbox, 4 archive. These are FlightDeck docs that received the default 'dna' classification during early ingest. **Fix:** Update `doc_applies_to` to 'flightdeck' on the 1 active + 5 inbox items. Archive items are low priority.

**28 active specs with no work items — Severity: High (Tier 1)**
82% of active specs are unplanified. This is expected given today's session focused on corpus compression, not planning. However, this gap means the majority of the product's intended features have no execution decomposition yet.

**154 work items with no source_doc_uid — Severity: High (Tier 1)**
63% of all work items are legacy unlinked items. These predate the lineage enforcement era. They appear in the "Unlinked Flight Plans" exception section of the rebuilt Flight Planning surface. **Fix:** Backfill source_doc_uid where possible; archive obsolete ones.

### Watch Findings

**1 active doc with no backing info — Severity: Watch (Tier 1)**
CLAUDE.md has empty `doc_path` and null `ingest_source_path`. This is a repo-root file that doesn't follow the standard `docs/` directory convention. **Fix:** Set `doc_path` to the repo root path or accept as a governed exception.

**2 active docs with no summary — Severity: Watch (Tier 1)**
Two active docs are missing summaries. Low urgency given the session focus on structure over content.

### Clean

- Lifecycle desyncs: **0** (was 51 at start of day — all resolved)
- Non-canonical bucket values in live corpus: **0** (was 233 — all resolved)
- Cross-project contamination (work items): **0**
- Cross-project contamination (flight plans): **0**
- intake_reviewed stalled: **0** (status eliminated)

---

## 5. Current Flight Status

**Scope:** wc_work_items WHERE trashed_at IS NULL AND sprint IS NOT NULL

| State | Flights | Work Items |
|---|---|---|
| Completed | 5 | 51 (all done) |
| In Progress | 4 | 55 (23 done, 32 remaining) |
| Not Started | 11 | 78 (all approved, none done) |

**Unassigned work items (no sprint):** 60

Active in-progress flights: FD-HEALTH-v1 (7/11 done), FD-S2a (14/18 done), FD-S2b (1/15 done), FD-S5a (1/12 done).

---

## 6. Active Storage / Recoverability

**Scope:** wc_manifest_items WHERE ingest_status = 'active'

| Storage State | Count |
|---|---|
| Repo-backed | 70 |
| Repo + browser | 13 |
| No backing info | 1 (CLAUDE.md) |

**83 of 84 active docs are repo-backed.** Recoverability is strong.

---

## 7. Archive Context (Summary)

| Metric | Count |
|---|---|
| Archive total | 437 |
| Junk | 15 |

Archive is background context. No archive items are creating active risk.

---

## 8. Recommended Actions

### Critical (fix now)
1. **Delete inbox duplicate** of Archive Separation Doctrine (`974685ab`). One row, one DELETE.

### High (fix soon)
2. **Fix boundary mismatches** — update `doc_applies_to` from 'dna' to 'flightdeck' on the 6 live items (1 active + 5 inbox).
3. **Set CLAUDE.md doc_path** — either to empty string (governed exception for repo-root files) or to the literal path.

### Watch (track)
4. **28 unplanified specs** — expected given the governance focus, but this is the largest gap in the system. Next build sessions should prioritize planification.
5. **154 unlinked work items** — backfill campaign needed. The Flight Planning surface now shows these in a dedicated exception section.
6. **10 staged-only docs** — verify these have proper repo backing after auto-materialization.

---

## 9. Evidence / Confidence

All counts are deterministic, queried live from Supabase project `sqcsjnunpydmeskabitq` at 2026-03-16 ~01:25 UTC. No filesystem reconciliation was performed (browser-only context). Ghost file scan not executed this pass.

**Blind spots:**
- Local filesystem state (ghost files, untracked files) — not scanned
- Git working tree status — not checked from this context
- Content hash drift — not checked

---

*End of Audit.*
