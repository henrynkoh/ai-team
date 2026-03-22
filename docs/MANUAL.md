# DebateHeat — Manual (Reference)

## 1. Purpose

**DebateHeat** is a web dashboard that displays **multi-agent debate / brainstorming** outcomes as:

- Ranked ideas and scores  
- Three heatmaps (ideas×criteria, keywords, groups×ideas)  
- Radar chart  
- Group perspectives and day-over-day deltas  

The repository includes a **Next.js** frontend and a **mock JSON generator**. It does **not** include a full LLM orchestration stack; you attach your own job that emits compatible JSON.

## 2. Requirements

| Tool | Version | Used for |
|------|---------|----------|
| Node.js | 20+ | Next.js app |
| npm | 9+ | Dependencies |
| Python | 3.10+ | Optional `scripts/generate_brief.py` |

## 3. Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Run production server (after build) |
| `npm run lint` | ESLint |
| `python3 scripts/generate_brief.py [--date YYYY-MM-DD]` | Write mock `data/sessions/*.json` |

## 4. URLs (App Router)

| Path | Behavior |
|------|----------|
| `/` | Redirects to latest session date (dynamic) |
| `/brief/latest` | Redirects to newest file in `data/sessions/` |
| `/brief/YYYY-MM-DD` | Daily brief for that date; 404 if missing |
| `/setup` | Shown when no session files exist |
| `/api/session/YYYY-MM-DD` | JSON API for that session; 404 if missing |

## 5. Session file schema (summary)

File path: `data/sessions/YYYY-MM-DD.json`

Required top-level fields (see `src/lib/types.ts` for exact types):

- `date` — string, must match filename  
- `topic` — string  
- `topicSource` — `"queue"` \| `"user"` \| `"llm"`  
- `generatedAt` — ISO 8601 string  
- `agentCount` — number  
- `rounds` — number  
- `topIdeas` — array of `{ id, rank, title, compositeScore, scores }`  
  - `scores` uses keys: `novelty`, `feasibility`, `marketImpact`, `techDepth`, `ethicalRisk`, `mvpSpeed`  
- `heatmapA` — `{ ideaIds[], criteria[], matrix[][] }` — rows align with `ideaIds`, columns with `criteria`  
- `heatmapB` — `{ keywords[], matrix[][] }` — symmetric co-occurrence counts  
- `heatmapC` — `{ groups[], ideaIds[], matrix[][] }`  
- `extremePerspectives` — array of `{ group, ideaRank, ideaTitle, score, reason }`  
- `progressVsYesterday` — object or `null` (first day has no prior comparison)

## 6. Loading behavior

- `src/lib/session.ts` reads from `process.cwd()/data/sessions/`.  
- Dates are discovered by listing `*.json` filenames.  
- **Newest** date is the first entry in the sorted list (descending).

## 7. Deployment (Vercel / similar)

- **Read-only data**: Commit JSON under `data/sessions/` or fetch from external storage (requires code changes to `loadSession`).  
- **Serverless writes**: Do not rely on writing to the deployed repo at runtime; generate JSON in CI or an external worker, then deploy or sync.  
- Set environment variables only if you extend the app (see `.env.example` for optional webhook ideas).

## 8. Troubleshooting

| Issue | What to check |
|-------|----------------|
| Redirect to `/setup` | No JSON files under `data/sessions/` |
| 404 on `/brief/DATE` | Missing `data/sessions/DATE.json` |
| Heatmaps empty / wrong | Matrix dimensions vs `ideaIds` / `criteria` / `keywords` lengths |
| Build fails | Run `npm run lint` and fix TypeScript errors |

## 9. File map

| Path | Role |
|------|------|
| `src/app/brief/[date]/page.tsx` | Brief page layout |
| `src/lib/session.ts` | Load sessions from disk |
| `src/lib/types.ts` | TypeScript types + criteria labels |
| `src/components/charts/*` | Plotly charts (client components) |
| `data/sessions/*.json` | Session payloads |

## 10. Security and privacy

- Do not commit API keys.  
- Session JSON may contain sensitive topics; treat files and API responses according to your policy.
