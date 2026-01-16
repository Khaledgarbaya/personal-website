# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server at localhost:4321
pnpm build            # Production build to ./dist/
pnpm preview          # Preview production build
pnpm astro check      # Run TypeScript/Astro diagnostics
```

## Architecture

This is an Astro 5 static site with MDX content collections and Tailwind CSS v4.

### Content Collections

Three collections defined in `src/content/config.ts`:
- **posts**: Blog articles in `src/content/posts/` (MDX)
- **til**: "Today I Learned" articles in `src/content/til/` (MDX)
- **pages**: Static pages like About/Uses in `src/content/pages/` (MDX)

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
```

### Layout Hierarchy

- `BaseLayout.astro` - Root layout with theme script, fonts, analytics
- `BlogLayout.astro` - Post layout with SEO meta, JSON-LD schemas, TOC, social sharing
- `PageLayout.astro` - Static page layout
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

## Environment

Requires `.env` file with `POSTHOG_API_KEY` for analytics.
