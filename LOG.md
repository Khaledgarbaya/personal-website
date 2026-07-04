# Work log

Append-only journal of finished work bulks, so anyone (human or agent) can catch up fast.
Newest at the BOTTOM. Append an entry whenever a bulk of work wraps (ideally right before
the commit that ships it). Keep entries SHORT: header line + What + Refs, nothing else.

**Entry grammar** (strict, one header line per entry):
```
## YYYY-MM-DD · Short title · #tag1 #tag2
What: 1-2 lines, outcome first.
Refs: [doc](path) (new|updated), repo PR/commit links.
```

**Tags** (reuse before inventing): add your own as loops emerge, e.g.
#analysis #product #content #infra #skill #research #ops #revenue #growth

**Retrieval recipes** (macOS; entry headers always start `## 20`):
```bash
# index of all entries (one line each)
grep '^## 20' LOG.md
# last 5 entries, full
tail -r LOG.md | awk '{print} /^## 20/{c++; if(c==5) exit}' | tail -r
# all entries about a topic
awk '/^## 20/{p=/#product/} p' LOG.md
# entries from a month
awk '/^## 20/{p=/^## 2026-06/} p' LOG.md
```

---

## 2026-07-04 · content-seo loop created + first run · #ops #content #seo
What: Stood up the weekly content-seo loop (grow blog/TIL reach) and ran a first SEO audit — 11/13 post meta descriptions exceed ~160 chars and truncate in search; also confirmed OG images are auto-generated (Cloudinary), so `image`/`imageAlt` frontmatter is unused.
Refs: domains/content-seo/README.md (new), signals/meta-descriptions-too-long.md (new), ARCHITECTURE.md (new), LOG.md (new).

## 2026-07-04 · PostHog analytics live + event catalog · #analysis #content
What: PostHog wired into both layouts capturing 10 events (newsletter, social, blog views, German funnel); cataloged the events as a knowledge-base doc (migrated out of the wizard's root-level report).
Refs: docs/analytics-events.md (new), src/components/posthog.astro, domains/content-seo/README.md (updated).

## 2026-07-04 · content-seo: trim over-long meta descriptions · #content #seo
What: First SEO-fix PR from the content-seo loop — rewrote all 11 post meta descriptions >160 chars down to ≤152 (keyword front-loaded) so they stop truncating in search results. Also retightened the loop charter's data sources.
Refs: 11 files under src/content/posts/*/index.mdx, signals/meta-descriptions-too-long.md (actioned), branch seo/trim-meta-descriptions.

## 2026-07-04 · content-seo: Google Search Console collector · #seo #infra
What: Built a service-account GSC collector (scripts/gsc-collect.mjs, `pnpm gsc:collect`) that appends query+page search-performance to domains/content-seo/metrics/gsc.jsonl. Site already verified (DNS); awaits one-time console setup. Preflight-guard dry run confirmed.
Refs: scripts/gsc-collect.mjs (new), docs/gsc-setup.md (new), domains/content-seo/metrics/README.md (new), .env.example (updated), google-auth-library dep.
