# DebateHeat — Tutorial

Walk through the product from zero to understanding how data flows into the morning brief.

## What you are building toward

Each **calendar day** has one **session file**: `data/sessions/YYYY-MM-DD.json`. The Next.js app does not run AI debates itself; it **visualizes** whatever your pipeline (or the included mock generator) produces.

## Lesson 1: Explore the sample brief

1. Start the dev server (`npm run dev`).
2. Open `/brief/2026-03-22`.
3. Scroll top to bottom once. Notice the order:
   - Topic and metadata
   - Ranked ideas with composite scores
   - Progress vs yesterday (only when a prior day exists)
   - Heatmap A (ideas × criteria)
   - Heatmap B (keywords)
   - Heatmap C (agent groups × ideas)
   - Radar chart for top ideas
   - Short “extreme perspectives” bullets

This order is intentional for a **morning scan**.

## Lesson 2: Understand the JSON shape

Open `data/sessions/2026-03-22.json` in an editor. Map fields to the UI:

| JSON section | UI |
|--------------|-----|
| `topic`, `date`, `generatedAt` | Header |
| `topIdeas[]` | Top ideas list + radar inputs |
| `heatmapA` | Idea × criteria heatmap |
| `heatmapB` | Keyword co-occurrence |
| `heatmapC` | Group × ideas heatmap |
| `extremePerspectives` | Divergent takes |
| `progressVsYesterday` | Green progress block |

Types are defined in `src/lib/types.ts`.

## Lesson 3: Add a new day with the Python generator

```bash
python3 scripts/generate_brief.py --date 2026-04-01
```

Confirm the file exists under `data/sessions/2026-04-01.json`, then visit `/brief/2026-04-01`.

The generator uses **mock** scores so you can test layout and APIs without LLM keys.

## Lesson 4: Wire your own pipeline (conceptual)

1. Your orchestrator (Python, Node, etc.) runs nightly.
2. It produces **one JSON file per day** matching the schema (see Manual).
3. You deploy the JSON with the app (commit, CI artifact, or object storage + code change to `loadSession`).

The app stays a **read-only viewer** in typical serverless hosting.

## Lesson 5: Use the API for automation

```bash
curl -s http://localhost:3000/api/session/2026-03-22 | jq '.topic'
```

Use this from Slack bots, email digests, or monitoring.

## Lesson 6: Production build

```bash
npm run build
npm start
```

Fix any TypeScript or lint errors before deploying.

## Checklist

- [ ] Dev server shows a brief for at least one date
- [ ] You can explain where `topic` and `heatmapA` come from in JSON
- [ ] You generated a new date with `generate_brief.py`
- [ ] `npm run build` completes without errors

When all boxes are checked, read [MANUAL.md](./MANUAL.md) for deployment and schema details.
