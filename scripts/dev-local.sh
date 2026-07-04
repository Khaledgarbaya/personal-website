#!/usr/bin/env bash
#
# dev-local.sh — bring the local dev stack up in one command.
#
# This is a static Astro site with no infra (no DB/cache/queue), so the "stack"
# is a single long-lived server: `astro dev` on :4321. The script runs it in a
# tmux window so it's detachable, idempotent, and inspectable via `logs`/`status`.
#
# Note: the Cloudflare Pages Functions in functions/ (contact form) are NOT served
# by `astro dev` — they run in production on Cloudflare Pages. Test them via the
# deploy preview, not this launcher.
#
# Usage:
#   scripts/dev-local.sh up            # start the dev server (idempotent)
#   scripts/dev-local.sh down          # stop the dev server
#   scripts/dev-local.sh status        # window list + port check
#   scripts/dev-local.sh logs <name>   # tail a window (name: web)
#   scripts/dev-local.sh restart <name>
#   scripts/dev-local.sh attach        # attach to the tmux session
#
set -euo pipefail

# --- config -----------------------------------------------------------------
SESSION="website-dev"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"   # repo root (script lives in scripts/)

WEB_PORT=4321

# Long-lived servers: "window_name|start command". One per service.
SERVERS=(
  "web|pnpm dev"
)

# name:port pairs shown in the port check.
PORTS=(
  "web:${WEB_PORT}"
)

# --- pretty print -----------------------------------------------------------
c_reset=$'\033[0m'; c_dim=$'\033[2m'; c_grn=$'\033[32m'; c_ylw=$'\033[33m'; c_red=$'\033[31m'; c_cyn=$'\033[36m'
say()  { printf "%s\n" "$*"; }
info() { printf "${c_cyn}▸ %s${c_reset}\n" "$*"; }
ok()   { printf "${c_grn}✓ %s${c_reset}\n" "$*"; }
warn() { printf "${c_ylw}! %s${c_reset}\n" "$*"; }
die()  { printf "${c_red}✗ %s${c_reset}\n" "$*" >&2; exit 1; }
port_up() { lsof -ti :"$1" -sTCP:LISTEN >/dev/null 2>&1; }

# --- preflight --------------------------------------------------------------
preflight() {
  command -v tmux >/dev/null 2>&1 || die "tmux not found. Install: brew install tmux"
  command -v pnpm >/dev/null 2>&1 || die "pnpm not found. Install: npm i -g pnpm (or: corepack enable)"
  [ -d "$ROOT/node_modules" ] || die "Deps not installed. Run: pnpm install"
}

# --- tmux helpers -----------------------------------------------------------
start_window() {  # idempotent: skip if the window already exists
  local name="$1" cmd="$2"
  if tmux list-windows -t "$SESSION" -F '#{window_name}' 2>/dev/null | grep -qx "$name"; then
    warn "window '$name' already exists — leaving it alone"; return
  fi
  tmux new-window -t "$SESSION" -n "$name" -c "$ROOT"
  tmux send-keys -t "$SESSION:$name" "$cmd" C-m
}

port_check() {
  say "  Port status (${c_dim}· = still starting${c_reset}):"
  for e in "${PORTS[@]}"; do
    local nm="${e%%:*}" pt="${e##*:}"
    if port_up "$pt"; then printf "    ${c_grn}●${c_reset} %-8s :%s\n" "$nm" "$pt"
    else                   printf "    ${c_dim}·${c_reset} %-8s :%s\n" "$nm" "$pt"; fi
  done
}

# --- commands ---------------------------------------------------------------
cmd_up() {
  preflight
  tmux has-session -t "$SESSION" 2>/dev/null || tmux new-session -d -s "$SESSION" -n _bootstrap -c "$ROOT"
  for s in "${SERVERS[@]}"; do start_window "${s%%|*}" "${s#*|}"; done
  tmux kill-window -t "$SESSION:_bootstrap" 2>/dev/null || true
  echo; ok "Dev server starting in tmux session '$SESSION'."; echo
  port_check
  echo
  say "  URL:    ${c_cyn}http://localhost:${WEB_PORT}${c_reset}"
  say "${c_dim}  Logs:   scripts/dev-local.sh logs web${c_reset}"
  say "${c_dim}  Attach: scripts/dev-local.sh attach   (Ctrl-b d to detach)${c_reset}"
  say "${c_dim}  Stop:   scripts/dev-local.sh down${c_reset}"
}

cmd_status() {
  if tmux has-session -t "$SESSION" 2>/dev/null; then
    info "tmux '$SESSION' windows:"
    tmux list-windows -t "$SESSION" -F '    #{window_index}: #{window_name}'
  else warn "session '$SESSION' not running"; fi
  echo; port_check
}

cmd_logs()    { tmux has-session -t "$SESSION" 2>/dev/null || die "session not running"; tmux capture-pane -p -S -400 -t "$SESSION:${1:?usage: logs <name>}"; }
cmd_restart() { tmux has-session -t "$SESSION" 2>/dev/null || die "session not running"
  local n="${1:?usage: restart <name>}"; tmux kill-window -t "$SESSION:$n" 2>/dev/null || true
  for s in "${SERVERS[@]}"; do [ "${s%%|*}" = "$n" ] && start_window "$n" "${s#*|}" && { ok "restarted $n"; return; }; done
  die "unknown window '$n'"; }
cmd_attach()  { tmux has-session -t "$SESSION" 2>/dev/null || die "not running — start with: dev-local.sh up"; tmux attach -t "$SESSION"; }
cmd_down() {
  tmux kill-session -t "$SESSION" 2>/dev/null && ok "dev server stopped" || warn "no session '$SESSION'"
}

case "${1:-up}" in
  up)      cmd_up ;;
  down)    cmd_down "${2:-}" ;;
  status)  cmd_status ;;
  logs)    cmd_logs "${2:-}" ;;
  restart) cmd_restart "${2:-}" ;;
  attach)  cmd_attach ;;
  -h|--help|help) awk 'NR==1{next} /^#/{sub(/^# ?/,"");print;next}{exit}' "${BASH_SOURCE[0]}" ;;
  *) die "unknown command '$1' (try: up|down|status|logs|restart|attach)" ;;
esac
