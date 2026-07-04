#!/usr/bin/env node
// Google Search Console collector for the content-seo loop.
//
// A DETERMINISTIC collector (per ARCHITECTURE.md: collectors write data, agents
// interpret). Pulls the last 28 days of search performance for the site and
// appends one JSONL row per query and per page to
// domains/content-seo/metrics/gsc.jsonl — a growing time-series the loop reads.
//
// Auth: a GCP service account (JSON key) whose email is added as a user on the
// GSC property. Point GOOGLE_APPLICATION_CREDENTIALS at the key file.
//
// Usage:  pnpm gsc:collect
//
import { GoogleAuth } from 'google-auth-library';
import { existsSync } from 'node:fs';
import { mkdir, appendFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = process.env.GSC_SITE_URL || 'sc-domain:khaledgarbaya.net';
const OUT = resolve(ROOT, 'domains/content-seo/metrics/gsc.jsonl');
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const ROW_LIMIT = 250;

// --- preflight: fail with actionable guidance, never a cryptic stack ---------
const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!creds || !existsSync(resolve(ROOT, creds))) {
  console.error(`\n✗ GSC collector not configured yet.

Set GOOGLE_APPLICATION_CREDENTIALS to your service-account key file, then rerun.
Finish the one-time setup first (see docs/gsc-setup.md):
  1. GCP: create a project, enable the Search Console API, make a service account + JSON key.
  2. Save the key to .secrets/gsc-key.json  (gitignored).
  3. In Search Console, add the service account email as a user on ${SITE}.
  4. In .env:  GOOGLE_APPLICATION_CREDENTIALS=./.secrets/gsc-key.json
${creds ? `\n(current value points at "${creds}", which doesn't exist)` : ''}
`);
  process.exit(1);
}

// --- date window: GSC data lags ~2-3 days, so end 3 days back over 28 days ----
const day = 86_400_000;
const iso = (t) => new Date(t).toISOString().slice(0, 10);
const endDate = iso(Date.now() - 3 * day);
const startDate = iso(Date.now() - 31 * day);

async function query(dimension) {
  const auth = new GoogleAuth({ scopes: [SCOPE] });
  const client = await auth.getClient();
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
  const res = await client.request({
    url,
    method: 'POST',
    data: { startDate, endDate, dimensions: [dimension], rowLimit: ROW_LIMIT },
  });
  return res.data.rows || [];
}

async function main() {
  const collectedAt = new Date().toISOString();
  await mkdir(dirname(OUT), { recursive: true });

  let total = 0;
  for (const dimension of ['query', 'page']) {
    const rows = await query(dimension);
    const lines = rows.map((r) =>
      JSON.stringify({
        collected_at: collectedAt,
        window: { startDate, endDate },
        dimension,
        key: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: Number(r.ctr?.toFixed(4)),
        position: Number(r.position?.toFixed(2)),
      }),
    );
    if (lines.length) await appendFile(OUT, lines.join('\n') + '\n');
    console.log(`  ${dimension.padEnd(6)} ${String(rows.length).padStart(3)} rows`);
    total += rows.length;
  }

  console.log(`\n✓ ${total} rows for ${SITE} (${startDate}..${endDate}) → ${OUT.replace(ROOT + '/', '')}`);
  if (total === 0) console.log('  (0 rows — new property, or no impressions in the window yet)');
}

main().catch((err) => {
  const msg = err?.response?.data?.error?.message || err.message;
  console.error(`\n✗ GSC query failed: ${msg}`);
  if (/permission|forbidden|403/i.test(msg))
    console.error(`  → Is the service-account email added as a user on ${SITE} in Search Console?`);
  process.exit(1);
});
