# DebateHeat

Next.js dashboard for **multi-agent brainstorming / debate** results: **Heatmap A** (ideas × criteria), **Heatmap B** (keyword co-occurrence), **Heatmap C** (agent group × ideas), **radar** chart for top ideas, **group perspectives**, and **day-over-day progress** — designed so a human can scan **one page every morning**.

## Documentation

| Doc | Description |
|-----|-------------|
| **[docs/QUICKSTART.md](docs/QUICKSTART.md)** | Fastest path to run locally (~5 min) |
| **[docs/TUTORIAL.md](docs/TUTORIAL.md)** | Step-by-step lessons (UI → JSON → API) |
| **[docs/MANUAL.md](docs/MANUAL.md)** | Full reference: schema, URLs, deployment |
| **[docs/README.md](docs/README.md)** | Documentation index |
| **[docs/marketing/](docs/marketing/)** | Channel copy: Facebook, Instagram, Threads, blogs (EN/KR), newsletter, email |

## Run locally

```bash
cd debateheat
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you’ll see the **landing page** (section navigation, features, heatmap previews). Use **Latest brief** in the header or **Open live brief** to open the dashboard for the newest session in `data/sessions/`.

Set `NEXT_PUBLIC_GITHUB_REPO` in `.env.local` (see `.env.example`) so the floating **GitHub** button points at your repository.

## Data model

Each morning’s run should produce one file:

`data/sessions/YYYY-MM-DD.json`

The app reads these files at request time (see `src/lib/session.ts`). Sample days are included under `data/sessions/`.

## Generate a new day (Python, no API keys)

```bash
python3 scripts/generate_brief.py --date 2026-03-24
```

Then open `/brief/2026-03-24`.

## API

- `GET /api/session/YYYY-MM-DD` — raw session JSON for Slack bots or scripts.

## Production notes (Vercel / cron)

- The UI is **read-only**: deploy the repo with `data/sessions/*.json` committed, or sync JSON from your orchestrator (S3, blob store) and adjust `loadSession` to fetch remotely.
- Serverless filesystems are **not** durable for writes; nightly jobs should write JSON in CI or object storage, then redeploy or upload.
- For **Slack / email** after generation, call webhooks from the same job that writes JSON (see `.env.example`).

## Morning layout

The brief page (`/brief/[date]`) orders content for a quick scan: **topic → top ideas → progress vs yesterday → heatmaps → radar → divergent group takes**.

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `python3 scripts/generate_brief.py` | Mock session JSON |

## Marketing & comms

Ready-to-adapt copy for ads and posts lives in **[docs/marketing/](docs/marketing/)** (replace `YOUR_LINK` / `YOUR_REPO_OR_DEMO_URL` with your real URLs).
