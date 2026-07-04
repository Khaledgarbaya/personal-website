---
kind: domain
domain: brain-to-blog
status: active
goal: Turn the second brain into deep, evergreen blog posts — sanitized (no work specifics, no real names)
cadence: monthly
---

# brain-to-blog — mine the vault for writeable topics

Monthly loop over the second brain vault (`~/workspace/brain`, ~345 notes, searched with
`qmd`). Mines concept/wiki notes and daily-note learnings for topics worth a **deep,
evergreen post**, cross-checks against what the site already covers, and produces topic
`signal`s (with an angle + outline seed). Hard rule: **abstract to the general lesson —
never surface work specifics, client/company/colleague names, or anything internal.** The
vault is the source; the public post is the reusable idea, not the war story.

## Current focus
Bootstrapped from the first run: multi-agent orchestration patterns is the strongest
unwritten candidate ([[multi-agent-orchestration-deep-dive]]). Next monthly run: re-index
the vault (`qmd update` — index is stale) and sweep the AI-engineering + leadership themes
for the next 2–3 candidates.

## Backlog
- [ ] Draft/outline **multi-agent orchestration deep-dive** — [[multi-agent-orchestration-deep-dive]]
      (subagents → Agent Teams → cloud; complements the existing team-scale/ape cluster)
- [ ] `qmd update` the vault index before each run (currently ~69d stale) — cheap, keeps
      the mine honest
- [ ] Sweep the **engineering-leadership** theme (1:1s, perf management, competency ladders)
      for evergreen posts abstracted away from any employer
- [ ] Decide the pipeline hand-off: does a filed topic signal become a `content-ideation`
      outline, or go straight to a draft PR? (keep human-gated either way)
- [ ] Sanitization checklist as a `doc` — the concrete rules for stripping names/specifics
      before a vault note becomes public

## Evidence & analysis
[[multi-agent-orchestration-deep-dive]]

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
