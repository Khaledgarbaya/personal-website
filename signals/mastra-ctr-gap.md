---
kind: signal
category: observation
frequency: 1
sources: ["GSC pull 2026-07-04", "domains/content-seo/metrics/gsc.jsonl"]
domain: ["content-seo"]
status: actioned
---

# Mastra workflows post: huge impressions, almost no clicks

`/blog/mastering-mastra-ai-workflows/` is the site's highest-impression page by far —
**6,917 impressions at avg position 9.86, but only 11 clicks (~0.16% CTR)**. Even at
position ~10, expected CTR is ~1.5%, so this is a click-through problem on top of a
middling position, not just position.

The query mix splits into two audiences:
- **Head, tutorial-seeking (winnable on CTR):** "mastra workflows" (306 impr @ pos 6.8),
  "mastra workflow" (157 @ 6.9), "mastra ai workflow" (102 @ 8.2). The post ranks pos ~7
  here and is a great match — a better snippet should lift clicks.
- **Long-tail, documentation-seeking (not worth chasing):** "mastra createtool ... docs",
  "@mastra/core", "runtimecontext mastra", etc. These want the official docs; a blog
  post won't win them regardless of snippet.

**Fix (this signal → actioned):** rewrote the SERP snippet of the page to target the head
terms — title front-loads the exact keyword and signals a practical, complete guide;
description lists the concrete capabilities covered (parallel, branching, suspend/resume,
multi-agent, deployment) to beat generic listings.

- Title: `A deep dive into Mastra AI workflows with code examples`
  → `Mastra Workflows: A Complete Guide with Code Examples`
- Description rewritten to lead with "Build Mastra AI workflows step by step …".

## Baseline to measure against (next GSC pull)
2026-07-04: 6917 impr · pos 9.86 · 11 clicks · CTR 0.16%. Watch clicks/CTR on the head
terms after the snippet change ships.

## Timeline
2026-07-04 | GSC first pull surfaced the gap; rewrote title + description (branch
`seo/mastra-ctr`).
