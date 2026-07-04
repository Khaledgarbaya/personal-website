---
kind: domain
domain: brain-to-blog
status: active
goal: Turn the second brain into deep, evergreen blog posts — sanitized (no work specifics, no real names)
cadence: monthly
---

# brain-to-blog — mine the vault for writeable topics

Monthly loop over the second brain vault (`~/workspace/brain`, ~345 notes, searched with
`qmd`). Mines concept/wiki notes, daily-note learnings, and reports for topics worth a
**deep, evergreen post**, cross-checks against what the site already covers, and produces
topic `signal`s (with an angle + outline seed). Hard rule: **abstract to the general lesson —
never surface work specifics, client/company/colleague names, or anything internal.** The
vault is the source; the public post is the reusable idea, not the war story.

**Diversity is by design.** Each run sweeps a fixed **theme rotation** (below), not just the
AI-engineering theme — the source material spans people-leadership, decision-making, org
initiatives, and process/meetings, and the loop should surface across all of them.

### Theme rotation (sweep every run)
1. **AI-augmented engineering** — agentic workflows, harness engineering, coding agents
2. **People leadership** — 1:1s, coaching, feedback, performance, competency ladders,
   leadership styles
3. **Decision-making** — tradeoffs, frameworks, "how I decided", reversible vs. one-way-door
4. **Org initiatives & change** — driving adoption, rollouts, lighthouse projects, enablement
5. **Process & meetings** — facilitation, retros, async vs. sync, running effective meetings
6. **Wildcard** — whatever the last month's daily notes clustered around

## Current focus
Fresh-index sweep done (index refreshed — was 69d stale, +213 notes). The rotation now
returns across themes. Vault structure learned: **`09-wiki/` holds generalized concept
notes (safe to mine); `02-people/`, `03-1-on-1s/`, `06-reviews/`, `10-output/reports/` are
name-bearing (lesson-only).** Next: pick one leadership candidate to outline (the simplicity
piece is the strongest non-AI lead).

## Backlog
- [ ] `qmd update` the vault index before each run (currently ~69d stale) — **required
      first step**; stale index is why the non-AI themes under-returned on the first sweeps
- [ ] Draft/outline **multi-agent orchestration deep-dive** — [[multi-agent-orchestration-deep-dive]]
      (AI-eng theme; subagents → Agent Teams → cloud; complements team-scale/ape cluster)
- [ ] Draft/outline **why simplicity is invisible in promotion (a manager's fix)** —
      [[simplicity-not-rewarded]] (engineering-culture/leadership theme; strongest **non-AI**
      candidate — needs Khaled's own manager-side take, not a rehash of the source article)
- [ ] Draft/outline **what makes a staff-engineer promotion case** —
      [[staff-promotion-case-anatomy]] (people-leadership theme; the generalized,
      name-stripped lesson from a real report — a model of the loop's abstract-don't-surface rule)
- [ ] Candidate (decision-making theme): **decisions-as-code — encoding judgment for agents**
      (`09-wiki/decisions-as-code-encoding-judgment-for-agents.md`; generalized from Vercel's
      public system — AI-adjacent but a governance/decisions angle, not another workflow post)
- [ ] Sanitization checklist as a `doc` — concrete rules for stripping names/specifics
      before a vault note becomes public. Sharpen with the promotion-case finding:
      `10-output/reports/` and daily notes are **name-bearing** → mine the lesson, never the doc
- [ ] Widen the mine beyond concept notes — daily-notes and reports hold the
      leadership/decision/meeting material; the concept-note wiki skews AI-heavy
- [ ] Decide the pipeline hand-off: does a filed topic signal become a `content-ideation`
      outline, or go straight to a draft PR? (keep human-gated either way)

## Evidence & analysis
[[multi-agent-orchestration-deep-dive]] · [[simplicity-not-rewarded]] · [[staff-promotion-case-anatomy]]

## Metrics
`metrics/` — TBD. Candidate: a simple monthly count of topics surfaced vs. shipped
(idea → published), to see whether the vault is actually converting into posts.

## Timeline
2026-07-04 | test run (`qmd search`) — mined the vault's AI-engineering theme. Surfaced a
verified concept note "Multi-Agent Coding Orchestration" (subagents/Agent Teams/cloud
patterns, sourced from a public talk — no work specifics). Confirmed it's distinct from the
existing team-scale post (org angle vs. technical-patterns angle). Filed
[[multi-agent-orchestration-deep-dive]]. Note: vault index is ~69d stale — run `qmd update`
before real runs.
2026-07-04 | diversify sweep — broadened the charter to a 6-theme rotation (per request:
meetings, initiatives, decision-making, leadership styles, not just AI). Real sweeps of the
leadership/decision/meeting themes returned thin — stale index + that material lives in
daily-notes/reports, not the concept-note wiki. Hit a name-bearing promotion-case report;
filed its **generalized, name-stripped** lesson as [[staff-promotion-case-anatomy]] — a
model of the abstract-don't-surface rule. Next run must `qmd update` first.
2026-07-04 | fresh-index sweep — ran `qmd update` (+213 notes; BM25 now current) and swept
the full rotation with focused terms. Mapped the vault: `09-wiki/` = generalized/safe;
people/1-on-1s/reviews/reports = name-bearing. Strongest **non-AI** find:
[[simplicity-not-rewarded]] (engineering-culture). Also queued decisions-as-code
(decision-making theme). Diversity confirmed — the rotation now pulls across themes, not just AI.
