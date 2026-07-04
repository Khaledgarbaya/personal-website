---
kind: doc
type: reference
domain: [content-seo]
status: adopted
links: ["scripts/content-seo-weekly.sh", "scripts/gsc-digest.mjs", "scripts/launchd/net.khaledgarbaya.content-seo-weekly.plist", "[[gsc-setup]]"]
---

# content-seo weekly automation (local)

Runs the loop's **measurement** on a weekly schedule via `launchd` — entirely local, no
cloud, no secrets to manage (the GSC key already lives in `.secrets/`). Acting stays
human-gated: the AI step *opens* a PR, it never merges.

## What runs each week

`scripts/content-seo-weekly.sh` (Mondays 09:00 local):

1. **Collect** — `pnpm gsc:collect` → appends a fresh snapshot to
   `domains/content-seo/metrics/gsc.jsonl`.
2. **Commit** — commits + pushes the new snapshot (data only; safe, no content change).
3. **Digest** — `node scripts/gsc-digest.mjs` → movement vs baselines, page-2 quick
   wins, CTR gaps, top queries. Saved to `logs/content-seo/digest-<ts>.md`.
4. **Draft (opt-in)** — if `SEO_AUTODRAFT=1`, Claude reads the backlog + digest, makes
   **one** focused content change, and opens a PR for review. It **does not merge** — you
   review and merge (or close). Skips if an open PR already covers the top item.

Deterministic steps (1–3) always run. Step 4 is gated so you can drop to digest-only
anytime.

## Install (one-time)

```bash
cp scripts/launchd/net.khaledgarbaya.content-seo-weekly.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/net.khaledgarbaya.content-seo-weekly.plist
```

Test it immediately (real run):
```bash
launchctl start net.khaledgarbaya.content-seo-weekly
tail -f logs/content-seo/run-*.log      # watch it
```

## Controls

- **Digest-only (no PR drafting):** delete the `SEO_AUTODRAFT` entry from the plist,
  then reload (`unload` + `load`). Or run the script directly without the env var.
- **Disable entirely:**
  ```bash
  launchctl unload -w ~/Library/LaunchAgents/net.khaledgarbaya.content-seo-weekly.plist
  ```
- **Run manually anytime:** `SEO_AUTODRAFT=1 scripts/content-seo-weekly.sh` (or omit the
  var for digest-only).

## Notes / gotchas

- **PATH** — launchd starts with a minimal PATH; the script hard-codes the nvm Node dir
  (`v22.22.0`). If you change Node versions, update the `export PATH=` line.
- **Same-day reruns** append a near-duplicate snapshot (GSC data only refreshes daily,
  with a ~2–3 day lag). Let the weekly cadence do its thing; don't run it repeatedly.
- **The draft step needs `claude` authenticated** (it is, if you use Claude Code). It
  runs headless with `--dangerously-skip-permissions` — that's why it's tightly scoped to
  `src/content/` + `domains/content-seo/` and can only open, never merge.
- Logs live in `logs/` (gitignored).
