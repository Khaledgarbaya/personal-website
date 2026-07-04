---
kind: signal
category: idea
frequency: 1
sources: ["qmd://brain/09-wiki/multi-agent-coding-orchestration.md"]
domain: [brain-to-blog]
status: open
---

# Blog topic: a deep dive on multi-agent coding orchestration

The vault holds a verified concept note ("Multi-Agent Coding Orchestration") that lays out
**three escalating patterns** for coordinating multiple AI coding agents — and the site
doesn't cover it head-on yet. It's evergreen, on-brand (agentic workflows), and safely
general: it synthesizes a *public* talk, so there's nothing work-specific to strip.

**The angle** (what the existing posts don't do): a practitioner's escalation ladder —
- **Subagents** — a parent orchestrator spawns focused child agents (via a `Task`-style
  tool), manages the dependency graph manually through report files. Zero setup,
  context-isolated, cost-neutral. Where it breaks: no peer messaging, no shared task list.
- **Agent Teams** — adds the coordination primitives subagents lack: shared task list with
  dependency unblocking, file locking, peer-to-peer messaging. Sweet spot 3–5 teammates;
  three focused beat five scattered.
- **Cloud orchestration** — the async, many-agent end of the ladder.
- Plus the reliability tips (loop guardrails, `MAX_ITERATIONS`, forced reflection-before-retry).

**Why it's a distinct post (not a dup):** the existing `ai-engineering-workflows-team-scale`
post is the *human/org* problem — what breaks when five engineers each run agent sessions on
one codebase. This one is the *technical-patterns* problem — how a single developer
coordinates N agents. Complementary; they should cross-link. `meet-ape` and
`ai-coding-workflow-what-worked` round out the cluster.

**Sanitization:** none needed beyond attribution — the source note credits a public talk;
keep the credit, keep it about the patterns, not any internal usage.

## Timeline
2026-07-04 | brain-to-blog first run — surfaced from `qmd search`; verified concept note,
distinct from the team-scale post. Filed as the loop's lead candidate.
