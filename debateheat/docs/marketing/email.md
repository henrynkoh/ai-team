# Email — DebateHeat outreach templates

Replace `YOUR_LINK`, `YOUR_NAME`, `RECIPIENT_NAME` as needed.

---

## 1. Cold intro (product-led)

**Subject:** Multi-agent debates → one morning page (open source)

Hi RECIPIENT_NAME,

Many teams now run several LLM personas on one question. The hard part isn’t the run—it’s **seeing** what changed and what matters.

**DebateHeat** is a small Next.js dashboard: one JSON file per day, heatmaps + ranked ideas + group disagreement on a single scroll. Mock data generator included if you want to try the UI before wiring models.

Repo / demo: YOUR_LINK  
Docs: Quickstart + Manual in the `docs/` folder.

Best,  
YOUR_NAME

---

## 2. Follow-up (after star / download)

**Subject:** Re: DebateHeat — quick setup

Hi RECIPIENT_NAME,

Following up: if you pulled DebateHeat, the fastest path is:

1. `npm install && npm run dev`  
2. Open `/brief/latest`  
3. (Optional) `python3 scripts/generate_brief.py --date YYYY-MM-DD` for a fresh mock day  

If you want to pipe real debate output in, the JSON schema is in `docs/MANUAL.md`.

YOUR_NAME

---

## 3. Internal team launch

**Subject:** [Internal] Daily AI debate brief — DebateHeat pilot

Team,

We’re piloting **DebateHeat** as the read-only view for our nightly multi-agent runs. One page per day: topic, top ideas, heatmaps, deltas vs yesterday.

- **URL:** YOUR_LINK  
- **API for bots:** `GET /api/session/YYYY-MM-DD`  
- **Questions:** YOUR_NAME  

Please bookmark the latest brief for morning standup context.

---

## 4. HTML snippet (minimal, for ESPs)

```html
<p>Hi RECIPIENT_NAME,</p>
<p><strong>DebateHeat</strong> turns multi-agent debate JSON into a single morning brief—heatmaps, ranked ideas, and where personas disagree.</p>
<p><a href="YOUR_LINK">Open the project / demo</a></p>
<p>— YOUR_NAME</p>
```

---

## 5. Plain-text only (strict clients)

Subject: DebateHeat — one-page daily brief for multi-agent runs

Hi RECIPIENT_NAME,

DebateHeat (YOUR_LINK) is an open-source Next.js app that visualizes one debate session per day: heatmaps, top ideas, group perspectives, and day-over-day progress.

Setup: clone repo, npm install, npm run dev, visit /brief/latest.

YOUR_NAME
