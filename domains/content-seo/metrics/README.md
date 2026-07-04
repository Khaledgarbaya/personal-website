# content-seo metrics

Numeric time-series for the loop, written by **deterministic collectors** (code, not
the LLM). Agents read and interpret; they don't hand-write these.

## `gsc.jsonl`

Google Search Console search-performance, appended by `scripts/gsc-collect.mjs`
(`pnpm gsc:collect`). One row per query and per page, per collection run. Each run
appends a fresh 28-day snapshot, so successive runs form a time-series.

Row shape:
```json
{
  "collected_at": "2026-07-11T09:00:00.000Z",
  "window": { "startDate": "2026-06-10", "endDate": "2026-07-08" },
  "dimension": "query",          // "query" | "page"
  "key": "agentic product engineering",
  "clicks": 12,
  "impressions": 430,
  "ctr": 0.0279,
  "position": 8.4
}
```

Read recipes:
```bash
# top queries by impressions in the latest run
grep '"dimension":"query"' gsc.jsonl | tail -250 | \
  jq -s 'sort_by(-.impressions) | .[:20] | .[] | {key, impressions, position}'
# pages ranking on page 2 (positions 11-20) = quick-win opportunities
grep '"dimension":"page"' gsc.jsonl | \
  jq -c 'select(.position > 10 and .position <= 20) | {key, impressions, position}'
```
