# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server at localhost:4321
pnpm build            # Production build to ./dist/
pnpm preview          # Preview production build
pnpm astro check      # Run TypeScript/Astro diagnostics
pnpm verify           # Gate: astro check + astro build (run before shipping)
pnpm test:e2e         # Playwright smoke test (builds, previews, checks key pages + links)
```

## Architecture

This is an Astro 5 static site with MDX content collections and Tailwind CSS v4.

### Content Collections

Four collections defined in `src/content/config.ts`:
- **posts**: Blog articles in `src/content/posts/` (MDX)
- **til**: "Today I Learned" articles in `src/content/til/` (MDX)
- **pages**: Static pages like About/Uses in `src/content/pages/` (MDX)
- **projekte**: German case studies in `src/content/projekte/` (MDX), surfaced under `/de/projekte/`

Frontmatter schema for posts/til:
```yaml
title: string (required)
description: string (required)
published: date (required)
modified: date (optional)
featured: boolean (default: false)
tags: string (comma-separated)
keywords: array (optional)
image: string (optional)
imageAlt: string (optional)
author: string (default: "Khaled Garbaya")
```

Frontmatter schema for projekte (German fields):
```yaml
title: string (required)
kunde: string (required)          # client
branche: string (required)        # industry
zusammenfassung: string (required) # summary
tags: string[] (default: [])
externalUrl: url (optional)
published: date (required)
featured: boolean (default: false)
```

### Layout Hierarchy

- `BaseLayout.astro` - Root layout with theme script, fonts, analytics
- `BlogLayout.astro` - Post layout with SEO meta, JSON-LD schemas, TOC, social sharing
- `PageLayout.astro` - Static page layout
- `GermanLayout.astro` - Isolated layout for the `/de/*` services section (own nav/footer)
- `Layout.astro` - Simple wrapper

### Key Patterns

**Routing**: File-based. Dynamic routes use `[slug].astro` with `getStaticPaths()`.

**Styling**: Tailwind v4 via Vite plugin. Use `cn()` from `src/lib/utils.ts` for conditional classes.

**MDX Processing**:
- `remarkEmbedderPlugin` wraps YouTube/CodeSandbox embeds in responsive containers
- `rehype-slug` + `rehype-autolink-headings` for anchor links on headings
- Shiki with "one-dark-pro" theme for syntax highlighting

**Theme**: Dark/light mode stored in localStorage, initialized in `BaseLayout.astro` head to prevent flash.

### Component Organization

- `src/components/ui/` - Reusable UI primitives (Button, Badge)
- `src/components/schemas/` - JSON-LD structured data components (BlogPost, WebSite, Person, Breadcrumb)
- Root components - Page-specific (MainNav, Footer, TableOfContents, etc.)

### RSS Feeds

- `/rss.xml` - Blog posts feed (`src/pages/rss.xml.ts`)
- `/til-rss.xml` - TIL feed (`src/pages/til-rss.xml.ts`)

### German Services Section (`/de/*`)

A self-contained German-language freelance-services surface, isolated from the main
English site (excluded from the sitemap in `astro.config.mjs`):
- Pages in `src/pages/de/` — `leistungen` (services), `projekte/` (case studies),
  `kontakt` (contact), `impressum`, `datenschutz`
- Uses `GermanLayout.astro` + `src/components/de/` (GermanNav, GermanFooter)
- Case studies come from the `projekte` content collection

### Cloudflare Pages Functions (`functions/`)

Server-side runtime deployed alongside the static site (Cloudflare Pages):
- `functions/api/kontakt.ts` - Contact form handler for the German `/de/kontakt` page
- `functions/_middleware.ts` - Pages middleware

## Verification

Before shipping, run the gate — for a static site the build *is* the test (it
type-checks every content entry against its Zod schema and fails on broken refs):

```bash
pnpm verify      # astro check + astro build — must pass
pnpm test:e2e    # Playwright: smoke + contact-form behavior
```

CI (`.github/workflows/verify.yml`) runs both on every push and PR.

### E2e suite (`e2e/`)

Playwright drives the built site via `astro preview` (specs never boot the app
themselves). Each new feature PR should add its spec — the gate compounds.

- `e2e/smoke.spec.ts` — key pages render (incl. `/de/*`), main nav works, no
  broken internal links.
- `e2e/kontakt.spec.ts` — `/de/kontakt` deterministic behavior: fields + hidden
  honeypot render, required-field validation blocks submit, and the
  `?status=ok`/`?status=error` banners toggle correctly.

Intentional scope boundary: the contact **backend send** (`functions/api/kontakt.ts`
→ Resend) is *not* e2e'd. `astro preview` serves static output only (no Pages
Functions), and the `.env` Resend key is live — driving it would need
`wrangler pages dev` + a guarded Resend test key. The banner behavior above is the
client-visible contract and is fully covered without it.

## Environment

Local secrets live in a gitignored `.env` (see `.env.example` for the expected
names). Keys the app uses:

- `PUBLIC_POSTHOG_PROJECT_TOKEN` — client-side PostHog capture token (`phc_…`).
  `PUBLIC_`-prefixed so Astro exposes it to the browser.
- `PUBLIC_POSTHOG_HOST` — PostHog ingestion host (e.g. `https://us.i.posthog.com`).
- `RESEND_API_KEY` — used by `functions/api/kontakt.ts` (contact form) to send via
  Resend. In production it's set as a Cloudflare Pages env var, not from this file.

**Analytics**: PostHog is wired via `src/components/posthog.astro` (an `is:inline`
snippet), rendered in `BaseLayout.astro` and `GermanLayout.astro`. Events are captured
with `window.posthog?.capture(...)` across pages/components (newsletter, social share,
blog view, contact form, German services). Reading data back out (e.g. the
`content-seo` loop's traffic collector) needs a separate **personal** API key
(`phx_…`, read scope) — not the public capture token above.

## Knowledge base (full model: `ARCHITECTURE.md`)
**Artifacts** are global, foldered by **kind** — `signals/` (feedback, ideas, observations) and
`docs/` (durable knowledge: analyses, decisions, learnings). Committed work starts as a backlog
line in the owning domain's `README`; promote to a `task` kind only once that outgrows the
README. `domain:` is a frontmatter field (a list), never a folder. **Domains**
(`domains/*/`) are agent loops whose `README` holds the loop's **state** — goal/context, current
focus, a `## Timeline`, and **links** to its artifacts (it points to them, never contains them).
Body = main text + optional append-only `## Timeline`. Each folder's `README` is its schema.

**Reuse before creating** (earn the structure, don't pre-build):
- **Kind** — start with just `signal` + `doc`. Add a new kind only if it has its own status
  machine **and** queryable fields **and** body shape. Otherwise it's a `doc` or a `signal`.
- **Domain** — default to a `domain:` tag on an existing one; spin up a new domain only when
  it's a separable workstream with its own cadence/owner (use the `new-loop` skill).

- **`LOG.md`** — global feed; **append ONE line right before the commit/PR that ships major
  work** (`## YYYY-MM-DD · title · #tags` + `What:`/`Refs:`). Detail → each artifact's `## Timeline`.

Kinds (now): signal + doc.
Domains (now): content-seo (weekly).
