# docs/ — durable knowledge

One file per **doc**: something you learned, analyzed, or decided that you want to be findable
later. If a signal is raw evidence, a doc is the worked-through version: an analysis, a writeup,
a decision and its rationale, a how-it-works note.

This README is the schema. See `ARCHITECTURE.md` for the model.

## Frontmatter

```yaml
---
kind: doc
domain: []                  # which loop(s) this belongs to
status: draft | adopted | superseded   # optional; use when a doc can be acted on or replaced
links: []                   # related artifacts, [[slug]] or paths
---
```

Optionally add a `type:` field (e.g. `analysis`, `decision`, `learning`) if you find yourself
wanting to filter docs by shape — but don't force it. Most docs are just knowledge.

## Body

Main text = *what's true now*. Append an optional `## Timeline` for *what happened*
(revisions, supersessions, when a decision was revisited). Link liberally with `[[slug]]`.

## Naming

`<short-kebab-slug>.md` or `<TOPIC>-<YYYY-MM>.md` — whatever reads well and sorts sensibly.
