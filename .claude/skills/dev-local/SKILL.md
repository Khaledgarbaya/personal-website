---
name: dev-local
description: >
  Start the local dev server for this Astro site in one command. Use when asked to
  "start the app", "run the dev server", "bring the stack up", "dev-local", "spin up
  local", or to check/stop/restart the local server. Wraps scripts/dev-local.sh.
---

# dev-local

One command to run this site's local dev stack. It's a static Astro site with **no
infra** (no DB/cache/queue), so the stack is a single long-lived server managed in a
tmux session.

## Services

| Window | Command    | Port | URL                    |
| :----- | :--------- | :--- | :--------------------- |
| `web`  | `pnpm dev` | 4321 | http://localhost:4321  |

> The Cloudflare Pages Functions in `functions/` (contact form) are **not** served by
> `astro dev`. They run in production on Cloudflare Pages — test them via the deploy
> preview, not this launcher.

## Prerequisites

- `tmux` (`brew install tmux`)
- `pnpm` (`corepack enable` or `npm i -g pnpm`)
- Deps installed: `pnpm install`

## Commands

```bash
scripts/dev-local.sh up            # start the dev server (idempotent)
scripts/dev-local.sh status        # window list + port check
scripts/dev-local.sh logs web      # tail the server output
scripts/dev-local.sh restart web   # restart the server
scripts/dev-local.sh attach        # attach to tmux (Ctrl-b d to detach)
scripts/dev-local.sh down          # stop the server
```

## Troubleshooting

- **Port 4321 in use** — something's already bound. `scripts/dev-local.sh status` to
  see, or `lsof -ti :4321` to find the process. Stop the old server with `down`.
- **Window exited immediately** — check `scripts/dev-local.sh logs web`; usually a
  build error or missing deps (`pnpm install`).
- **"session not running"** — start it first with `scripts/dev-local.sh up`.
- **Re-running `up`** — safe and idempotent; it leaves an existing `web` window alone
  rather than starting a duplicate.
