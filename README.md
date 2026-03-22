# ai-team

This repository contains **DebateHeat** — a Next.js landing page and daily brief dashboard for multi-agent debate results (heatmaps, API, docs).

## Quick start

```bash
cd debateheat
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Full documentation: [debateheat/README.md](debateheat/README.md) and [debateheat/docs/](debateheat/docs/).

## Deploy on Vercel

This repo is a **monorepo**: the Next.js app is in **`debateheat/`**, not at the repo root.

If you see **`404: NOT_FOUND`** on your `*.vercel.app` URL, Vercel is almost certainly building from the **wrong folder**. Fix it:

1. Vercel → your project → **Settings** → **General** → **Root Directory** → **`debateheat`**
2. **Save**, then **Redeploy**

Step-by-step: [docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md)

### Optional env

Set `NEXT_PUBLIC_GITHUB_REPO` to `https://github.com/henrynkoh/ai-team` so the landing page GitHub link matches this repository.
