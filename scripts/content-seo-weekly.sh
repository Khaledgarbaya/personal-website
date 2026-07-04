#!/usr/bin/env bash
#
# content-seo weekly loop — runs locally on a schedule (launchd/cron).
#
#   1. pull fresh Google Search Console data (pnpm gsc:collect)
#   2. commit + push the new snapshot (data only)
#   3. generate a digest (movement vs baselines, quick wins, CTR gaps)
#   4. (opt-in, SEO_AUTODRAFT=1) have Claude draft ONE content-fix PR for review —
#      it opens the PR and never merges; you review and merge.
#
# Deterministic steps always run; the AI drafting step is gated so you can leave
# it off (digest-only) whenever you want.
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# launchd/cron start with a minimal PATH — add where our tools live.
# (Update the nvm path if you change Node versions.)
export PATH="$HOME/.nvm/versions/node/v22.22.0/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"

LOG_DIR="$ROOT/logs/content-seo"
mkdir -p "$LOG_DIR"
TS="$(date +%Y-%m-%dT%H-%M-%S)"
LOG="$LOG_DIR/run-$TS.log"
DIGEST="$LOG_DIR/digest-$TS.md"

# tee everything to a run log
exec > >(tee -a "$LOG") 2>&1

# portable single-instance lock (macOS has no flock)
LOCK="$LOG_DIR/.lock"
if ! mkdir "$LOCK" 2>/dev/null; then
  echo "another run is in progress ($LOCK) — exiting"; exit 0
fi
trap 'rmdir "$LOCK" 2>/dev/null || true' EXIT

echo "== content-seo weekly run $TS =="

# 1. collect
echo "-- [1/4] collecting GSC data"
pnpm gsc:collect

# 2. commit + push the snapshot (data only, safe)
echo "-- [2/4] committing snapshot"
if ! git diff --quiet -- domains/content-seo/metrics/gsc.jsonl; then
  git add domains/content-seo/metrics/gsc.jsonl
  git commit -q -m "data(content-seo): weekly GSC snapshot $TS"
  git push -q origin main && echo "   pushed" || echo "   push failed (continuing)"
else
  echo "   no new rows"
fi

# 3. digest
echo "-- [3/4] generating digest"
node scripts/gsc-digest.mjs | tee "$DIGEST"

# 4. optional PR draft (opt-in; opens a PR for review, never merges)
echo "-- [4/4] draft step"
if [ "${SEO_AUTODRAFT:-0}" = "1" ]; then
  if ! command -v claude >/dev/null 2>&1; then
    echo "   claude CLI not found — skipping draft"; exit 0
  fi
  PROMPT="You are the content-seo loop's weekly assistant for this Astro blog.
Read domains/content-seo/README.md (its Current focus + Backlog) and the digest below.
First run 'gh pr list --state open'. If an open PR already addresses the top item, STOP and do nothing.
Otherwise pick the SINGLE highest-value unaddressed item and make ONE focused change, only under
src/content/ (post/TIL frontmatter or body) or domains/content-seo/ (loop notes). Preserve the
author's voice. Run 'pnpm verify' and ensure it passes. Then create a NEW branch named
seo/auto-<short-slug>, commit, push, and open a PR with 'gh' that explains the change and cites the
digest numbers that motivated it. DO NOT merge the PR. DO NOT touch anything outside src/content/
and domains/content-seo/. If nothing is clearly actionable, do nothing.

--- DIGEST ---
$(cat "$DIGEST")"
  echo "   drafting PR via claude (SEO_AUTODRAFT=1)"
  claude -p "$PROMPT" --dangerously-skip-permissions || echo "   draft step failed (continuing)"
else
  echo "   SEO_AUTODRAFT not set — digest-only (no PR drafted)"
fi

echo "== done. digest: $DIGEST =="
