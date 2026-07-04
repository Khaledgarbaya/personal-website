---
kind: signal
category: observation
frequency: 1
sources: ["content-seo first-run audit 2026-07-04", "src/content/posts/*/index.mdx"]
domain: ["content-seo"]
status: actioned
---

# Most blog meta descriptions are too long for search results

11 of 13 posts have a `description` longer than ~160 characters. Google truncates
meta descriptions around 155–160 chars (~920px) in the SERP, so the tail of each
one is cut off — weakening the click-through pitch on exactly the pages we want to
rank. The `description` frontmatter feeds `<meta name="description">` / `og:description`
via `BlogLayout.astro`.

**Worst offenders (chars):**
- `how-to-create-a-node-js-command-line-tool-with-yargs-middleware` — 306
- `2020-a-year-in-review` — 313
- `tl-dr-graphql` — 295
- `gatsby-as-a-replacement-for-create-react-app` — 286
- `why-mastra-might-be-your-new-best-friend` — 237
- `meet-ape` — 229
- `ai-engineering-workflows-team-scale` — 209
- `mastering-mastra-ai-workflows` — 202
- `my-new-mac-for-web-development-in-2021` — 187
- `ai-coding-workflow-what-worked` — 178
- `4-ways-to-use-axios-interceptors` — 174

**Within range (leave alone):** `an-introduction-to-start-using-eleventy` (122),
`developer-friendly-apis-using-es6-proxies` (105).

**Fix:** rewrite each over-length description to ≤155 chars, front-loading the keyword
and the value proposition. Low-risk, mechanical, and a clean first SEO-fix PR for the
loop. Prioritize the four >250 first.

## Timeline
2026-07-04 | content-seo first run — audit of all 13 post frontmatters surfaced this.
2026-07-04 | actioned — rewrote all 11 over-long descriptions to ≤152 chars, keyword
front-loaded, on branch `seo/trim-meta-descriptions` (PR). Verified via `pnpm verify`.
