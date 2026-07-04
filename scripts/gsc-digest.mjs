#!/usr/bin/env node
// content-seo weekly digest: turn the GSC time-series into an actionable summary.
//
// Deterministic (no LLM). Reads domains/content-seo/metrics/gsc.jsonl, compares the
// latest snapshot to the previous one, and prints markdown: overview, tracked-page
// movement (the baselines we act against), fresh page-2 quick wins, and CTR gaps.
//
// Usage:  node scripts/gsc-digest.mjs        # prints markdown to stdout
//
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = resolve(ROOT, 'domains/content-seo/metrics/gsc.jsonl');

// Canonical pages we've acted on and want to watch (from the loop's signals).
const TRACKED = [
  '/blog/mastering-mastra-ai-workflows/',
  '/blog/4-ways-to-use-axios-interceptors/',
  '/blog/ai-coding-workflow-what-worked/',
  '/til/show-more-lines-in-a-node-js-error-stack-trace/',
];

if (!existsSync(FILE)) {
  console.log('_No GSC data yet — run `pnpm gsc:collect` first._');
  process.exit(0);
}

const rows = readFileSync(FILE, 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((l) => JSON.parse(l));

// Group into snapshots by collection timestamp.
const snapsByTime = new Map();
for (const r of rows) {
  if (!snapsByTime.has(r.collected_at)) snapsByTime.set(r.collected_at, []);
  snapsByTime.get(r.collected_at).push(r);
}
const times = [...snapsByTime.keys()].sort();
const latestTime = times[times.length - 1];
const prevTime = times.length > 1 ? times[times.length - 2] : null;

// Build page lookup for a snapshot: canonical path -> metrics (skip #anchor rows).
const pageMap = (time) => {
  const m = new Map();
  for (const r of snapsByTime.get(time) || []) {
    if (r.dimension !== 'page') continue;
    const path = r.key.replace('https://khaledgarbaya.net', '');
    if (path.includes('#')) continue;
    m.set(path, r);
  }
  return m;
};
const queryRows = (time) =>
  (snapsByTime.get(time) || []).filter((r) => r.dimension === 'query');

const latest = pageMap(latestTime);
const prev = prevTime ? pageMap(prevTime) : null;

const win = (snapsByTime.get(latestTime)[0] || {}).window || {};
const fmtPos = (n) => (n == null ? '—' : n.toFixed(1));
const arrow = (delta, betterIsUp) => {
  if (delta == null || Math.abs(delta) < 0.1) return '±0';
  const improved = betterIsUp ? delta > 0 : delta < 0;
  return `${improved ? '🔼' : '🔽'} ${delta > 0 ? '+' : ''}${delta.toFixed(1)}`;
};

const out = [];
out.push(`# content-seo weekly digest`);
out.push(`Window **${win.startDate ?? '?'} → ${win.endDate ?? '?'}**  ·  snapshot \`${latestTime}\``);
out.push(prevTime ? `Compared to previous pull \`${prevTime}\`.` : `_First snapshot — no prior pull to compare against yet._`);

// --- Tracked pages (the baselines we've acted on) ---------------------------
out.push(`\n## Tracked pages (positions we're watching)`);
out.push(`| page | impr | pos | Δpos | clicks | Δclicks |`);
out.push(`|---|--:|--:|--:|--:|--:|`);
for (const path of TRACKED) {
  const c = latest.get(path);
  const p = prev?.get(path);
  if (!c) {
    out.push(`| ${path} | — | — | — | — | — |`);
    continue;
  }
  // position: lower is better → improvement is a decrease
  const dPos = p ? p.position - c.position : null;
  const dClicks = p ? c.clicks - p.clicks : null;
  out.push(
    `| ${path} | ${c.impressions} | ${fmtPos(c.position)} | ${arrow(dPos, true)} | ${c.clicks} | ${dClicks == null ? '—' : (dClicks > 0 ? '+' : '') + dClicks} |`,
  );
}

// --- Fresh page-2 quick wins (pos 10-20, high impressions) ------------------
const quickWins = [...latest.values()]
  .filter((r) => r.position > 10 && r.position <= 20 && r.impressions >= 100)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 8);
out.push(`\n## Page-2 quick wins (pos 10–20, ≥100 impr)`);
if (quickWins.length) {
  out.push(`| page | impr | pos | ctr |`);
  out.push(`|---|--:|--:|--:|`);
  for (const r of quickWins)
    out.push(`| ${r.key.replace('https://khaledgarbaya.net', '')} | ${r.impressions} | ${fmtPos(r.position)} | ${(r.ctr * 100).toFixed(1)}% |`);
} else out.push(`_None this window._`);

// --- CTR gaps (good position, high impressions, low CTR) --------------------
const ctrGaps = [...latest.values()]
  .filter((r) => r.impressions >= 200 && r.position <= 10 && r.ctr < 0.012)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 8);
out.push(`\n## CTR gaps (pos ≤10, ≥200 impr, CTR <1.2%)`);
if (ctrGaps.length) {
  out.push(`| page | impr | pos | ctr | clicks |`);
  out.push(`|---|--:|--:|--:|--:|`);
  for (const r of ctrGaps)
    out.push(`| ${r.key.replace('https://khaledgarbaya.net', '')} | ${r.impressions} | ${fmtPos(r.position)} | ${(r.ctr * 100).toFixed(2)}% | ${r.clicks} |`);
} else out.push(`_None this window._`);

// --- Top queries (filter obvious code/path noise) ---------------------------
const noise = (k) => k.length > 60 || /[/{}]/.test(k) || k.includes('bytes');
const topQ = queryRows(latestTime)
  .filter((r) => !noise(r.key))
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 10);
out.push(`\n## Top queries by impressions`);
out.push(`| query | impr | pos | clicks |`);
out.push(`|---|--:|--:|--:|`);
for (const r of topQ)
  out.push(`| ${r.key} | ${r.impressions} | ${fmtPos(r.position)} | ${r.clicks} |`);

console.log(out.join('\n'));
