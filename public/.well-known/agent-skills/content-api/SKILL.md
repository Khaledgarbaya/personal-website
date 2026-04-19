# Content API Skill

## Description

Access the machine-readable content graph for Khaled Garbaya's personal website, including all blog posts and TIL (Today I Learned) entries with structured metadata.

## Endpoint

`GET /api/content.json`

## Response Format

Returns `application/ld+json` (JSON-LD) with a Schema.org WebSite structure containing an ItemList of all content.

### Structure

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Khaled Garbaya",
  "url": "https://khaledgarbaya.net",
  "author": { "@type": "Person", "name": "Khaled Garbaya" },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "BlogPosting",
          "headline": "...",
          "description": "...",
          "url": "https://khaledgarbaya.net/blog/...",
          "datePublished": "...",
          "dateModified": "...",
          "keywords": "..."
        }
      }
    ]
  }
}
```

### Content Types

- `BlogPosting` — Full blog articles at `/blog/{slug}`
- `Article` (articleSection: "Today I Learned") — Short-form TIL entries at `/til/{slug}`

## Additional Resources

- **LLM guidance**: `GET /llms.txt` — Structured site information for LLMs
- **Blog RSS**: `GET /rss.xml` — RSS feed of blog posts
- **TIL RSS**: `GET /til-rss.xml` — RSS feed of TIL entries
- **Sitemap**: `GET /sitemap-index.xml` — Full site structure

## Usage Notes

- Content is sorted by publication date (newest first)
- All URLs are absolute
- The response is cached for 1 hour (`Cache-Control: public, max-age=3600`)
