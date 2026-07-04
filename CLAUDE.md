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
pnpm test:e2e    # Playwright smoke: key pages render, nav works, no broken internal links
```

CI (`.github/workflows/verify.yml`) runs both on every push and PR.

## Environment

Requires `.env` file with `POSTHOG_API_KEY` for analytics.
