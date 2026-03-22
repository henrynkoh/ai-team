# ai-team · DebateHeat

Next.js **landing page** and **daily brief** dashboard for multi-agent debate results: heatmaps (A/B/C), radar, group perspectives, and day-over-day progress — one scroll each morning.

**Repository:** [github.com/henrynkoh/ai-team](https://github.com/henrynkoh/ai-team)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Latest brief** or **Open live brief** for the newest session in `data/sessions/`.

Set `NEXT_PUBLIC_GITHUB_REPO` in `.env.local` (see `.env.example`) so the floating **GitHub** button points at this repo.

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/QUICKSTART.md](docs/QUICKSTART.md) | ~5 min local run |
| [docs/TUTORIAL.md](docs/TUTORIAL.md) | Guided lessons |
| [docs/MANUAL.md](docs/MANUAL.md) | Schema, API, deployment |
| [docs/README.md](docs/README.md) | Doc index |
| [docs/marketing/](docs/marketing/) | Social / email copy templates |

## Deploy on Vercel

The Next.js app is at the **repository root** (`package.json` here), so Vercel should **auto-detect Next.js** — no subfolder setting required.

1. Import **henrynkoh/ai-team** (or connect Git).
2. If you previously set **Root Directory** to `debateheat`, open **Settings → General → Root Directory** and **clear it** (leave default / `.`) **or** set it to **`.`** — then **Redeploy**.

If you still see `404: NOT_FOUND`, open the latest **Deployment → Build Logs** and fix any build error.

Details: [docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md)

### Env on Vercel

| Variable | Example value |
|----------|----------------|
| `NEXT_PUBLIC_GITHUB_REPO` | `https://github.com/henrynkoh/ai-team` |

## Data & API

- Session files: `data/sessions/YYYY-MM-DD.json`
- Mock generator: `python3 scripts/generate_brief.py --date YYYY-MM-DD`
- API: `GET /api/session/YYYY-MM-DD`

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `python3 scripts/generate_brief.py` | Mock session JSON |
