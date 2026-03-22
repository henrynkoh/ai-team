# Fix Vercel `404: NOT_FOUND` (DebateHeat monorepo)

## Why this happens

Your GitHub repo **`henrynkoh/ai-team`** is laid out like this:

```text
ai-team/                 ← Vercel often defaults to this folder
├── README.md
└── debateheat/          ← the actual Next.js app lives here
    ├── package.json
    ├── next.config.ts
    └── src/
```

If Vercel’s **Root Directory** is the repository root, there is **no Next.js app** there (no `package.json` for the app at the top level). The deployment can finish without a valid Next.js output, or nothing is served at `/`, which shows Vercel’s **`404: NOT_FOUND`** page.

Your SSH keys and Git push are fine; this is a **project configuration** issue on Vercel.

## What to do (recommended)

1. Open **[Vercel Dashboard](https://vercel.com/dashboard)** → select the project (e.g. **ai-team-ashy**).
2. Go to **Settings** → **General**.
3. Find **Root Directory** and set it to: **`debateheat`**  
   (Use “Edit” / “Override” if you see a monorepo picker.)
4. **Save**.
5. Go to **Deployments** → open the latest deployment → **Redeploy** (or push a new commit).

After this, Vercel runs `npm install` and `npm run build` **inside** `debateheat/`, where the Next.js app actually is.

## Optional: Environment variable

In **Settings** → **Environment Variables**, add:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_GITHUB_REPO` | `https://github.com/henrynkoh/ai-team` |

Redeploy so the landing page GitHub button points at your repo.

## Verify locally

```bash
cd debateheat
npm ci
npm run build
```

If this passes, the same commands in Vercel (with Root Directory = `debateheat`) should work.
