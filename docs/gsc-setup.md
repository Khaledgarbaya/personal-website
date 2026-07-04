---
kind: doc
type: reference
domain: [content-seo]
status: adopted
links: ["scripts/gsc-collect.mjs", "domains/content-seo/metrics/README.md"]
---

# Connect Google Search Console (service-account collector)

One-time setup so the `content-seo` loop can pull real search data
(`pnpm gsc:collect` → `domains/content-seo/metrics/gsc.jsonl`).

**Already done:** `khaledgarbaya.net` is a verified **Domain property** in Search
Console (confirmed by the `google-site-verification` DNS TXT record). So we only need
API access — a service account the collector authenticates as.

## Steps you do in the Google consoles

1. **GCP project** — <https://console.cloud.google.com> → create or pick a project.
2. **Enable the API** — APIs & Services → Library → search "Google Search Console
   API" → **Enable**. (Direct: enable `searchconsole.googleapis.com`.)
3. **Service account** — IAM & Admin → Service Accounts → **Create**. Name it e.g.
   `gsc-collector`. No project roles needed (GSC access is granted in step 6, not via IAM).
4. **JSON key** — open the service account → Keys → Add key → **Create new key** →
   JSON → download.
5. **Store the key** — save it to `.secrets/gsc-key.json` in this repo (the `.secrets/`
   dir is gitignored — the key never gets committed).
6. **Grant it in Search Console** — <https://search.google.com/search-console> → select
   the `khaledgarbaya.net` property → Settings → **Users and permissions** → Add user →
   paste the service account's email (`gsc-collector@<project>.iam.gserviceaccount.com`)
   → permission **Restricted** (read-only is enough) → Add.

## Steps in the repo

7. In `.env` (copy from `.env.example`):
   ```
   GOOGLE_APPLICATION_CREDENTIALS=./.secrets/gsc-key.json
   GSC_SITE_URL=sc-domain:khaledgarbaya.net
   ```
8. Run it:
   ```
   pnpm gsc:collect
   ```
   The collector guards on missing/misconfigured creds and prints what's wrong. On
   success it appends query + page rows to `domains/content-seo/metrics/gsc.jsonl`.

## Notes

- **Permission errors** ("403 / does not have permission") almost always mean step 6
  was skipped or the wrong email was added — the service-account email, not yours.
- **0 rows** is normal for a brand-new property or a quiet window; data also lags
  ~2–3 days, which is why the collector queries a window ending 3 days ago.
- **Cadence** — run weekly (with the loop). Later, this can move into CI/cron with the
  key stored as a secret instead of a local file.
