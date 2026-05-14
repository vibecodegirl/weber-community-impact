# AGENTS.md

## Cursor Cloud specific instructions

This is a single-service React/TypeScript web application (Weber Human Services Foundation website) using TanStack Start, Vite 7, and Tailwind CSS 4.

### Package Manager

Bun is the primary package manager (`bun.lockb`). Install it with `curl -fsSL https://bun.sh/install | bash` if not present, then ensure `~/.bun/bin` is on PATH.

### Key Commands

| Action | Command |
|--------|---------|
| Install deps | `bun install` |
| Dev server | `bun run dev` (serves on port 8080) |
| Build | `bun run build` |
| Lint | `bun run lint` |
| Format | `bun run format` |

### Dev Server Notes

- The Vite dev server listens on **port 8080** (configured by `@lovable.dev/vite-tanstack-config`).
- Full SSR is active in dev mode via TanStack Start — pages render server-side before hydration.
- No database, no backend API, no Docker required. All page content lives in `src/content/*.ts`.

### Lint

ESLint has pre-existing formatting errors (prettier/prettier rules) in multiple files. These are not regressions — they exist on `main`.

### Deployment Target

Production deploys to Cloudflare Workers (via `wrangler.jsonc`), but `wrangler` is NOT needed for local development.
