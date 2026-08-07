# MCity Club

## Requirements

- Node.js (`lts/*`, see [.nvmrc](.nvmrc))
- pnpm (enabled via `corepack enable`)
- A Firebase project with Auth, Firestore and Storage

Alternatively, Docker with Compose — see [Docker](#docker).

## Setup

```bash
pnpm i
cp .env.example .env
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server on [localhost:5000](http://localhost:5000) |
| `pnpm build` | Type-check and build to `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` | Lint with ESLint |
| `pnpm lint:fix` | Lint and auto-fix |

## Docker

```bash
docker compose up --build -d
```

The source is bind-mounted for hot reload and the app is served on port 5000. The container runs as UID/GID `911`, so either `sudo chown -R 911:911 .` or set `UID` and `GID` in `.env` to your own `id -u` / `id -g`.

## Deployment

Configured for Netlify via [netlify.toml](netlify.toml), which rewrites all paths to the SPA entry point. Any static host works — publish `dist/` with the same SPA fallback. Remember to set `VITE_FIREBASE_CONFIG` in the host's build environment.

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs lint and build on pushes and pull requests to `main`.
