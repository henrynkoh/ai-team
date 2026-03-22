# Vercel deployment (DebateHeat)

## Why you might see `404: NOT_FOUND`

Common causes:

1. **Wrong Root Directory** — If the Next.js app was ever in a subfolder, Vercel may still be set to build that folder while the repo layout has changed.
2. **Build failed** — The deployment exists but didn’t produce a valid Next.js output; Vercel can still show a generic error.
3. **Stale deployment** — Old settings until you **Redeploy** after fixing settings.

## Current repo layout (important)

The **Next.js app lives at the repository root** (this is intentional):

- `package.json`, `next.config.ts`, and `src/` are at the **top level** of `henrynkoh/ai-team`.
- Vercel should use the **default root directory** (`.`). Do **not** set Root Directory to `debateheat` anymore (that folder no longer exists).

## What to do on Vercel

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your project (e.g. **ai-team-ashy**).
2. **Settings** → **General** → **Root Directory**
   - Leave **empty** or set to **`.`** (repository root).
   - Remove **`debateheat`** if it is still set.
3. **Save**.
4. **Deployments** → **⋯** on the latest → **Redeploy** (check “Use existing Build Cache” **off** if you want a clean build).

## Optional: environment variable

**Settings** → **Environment Variables**:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_GITHUB_REPO` | `https://github.com/henrynkoh/ai-team` |

Redeploy after adding.

## Verify locally (same as Vercel build)

```bash
npm ci
npm run build
```

If this succeeds, the Vercel build should too (same commands at repo root).

## Still broken?

Open the failed deployment → **Building** → copy **Build Logs** and check for:

- `Module not found` / TypeScript errors  
- Node version (use **Settings → Node.js Version** 20.x if needed)  
- Wrong branch (confirm **Production Branch** is `main`)
