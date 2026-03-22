# DebateHeat — Quickstart (5 minutes)

Get the dashboard running and see a sample daily brief.

## Prerequisites

- **Node.js** 20+ ([nodejs.org](https://nodejs.org))
- **npm** (comes with Node)
- Optional: **Python 3** if you want to generate new session files

## 1. Install and run

```bash
cd debateheat
npm install
npm run dev
```

## 2. Open the app

In your browser go to **http://localhost:3000**

You are redirected to the **latest** daily brief (from `data/sessions/*.json`).

## 3. Try a specific date

Visit:

- **http://localhost:3000/brief/2026-03-22**
- **http://localhost:3000/brief/latest** (same as home)

## 4. (Optional) Generate another day

```bash
python3 scripts/generate_brief.py --date 2026-03-26
```

Reload and open **http://localhost:3000/brief/2026-03-26**

## 5. (Optional) Raw JSON API

```bash
curl http://localhost:3000/api/session/2026-03-22
```

## Next steps

- Full reference: [MANUAL.md](./MANUAL.md)
- Guided walkthrough: [TUTORIAL.md](./TUTORIAL.md)
- Project overview: [../README.md](../README.md)
