# Blogger — sample post (DebateHeat)

**Title:** DebateHeat: Turn Multi-Agent AI Debates Into a Single Morning Brief

**Labels / tags:** AI, productivity, data visualization, open source, Next.js

---

## Intro

Teams are experimenting with multiple LLM “personas” in one conversation—VC, PM, ethicist, engineer. The downside is obvious: transcripts explode, and decisions get lost.

**DebateHeat** is an open-source dashboard that treats each day’s debate as one structured artifact: ranked ideas, quantitative heatmaps, and a clear view of disagreement.

---

## What you see in one scroll

1. **Topic of the day** and when the run finished  
2. **Top ideas** with a composite score  
3. **Progress vs yesterday** (when history exists)  
4. **Heatmap A:** ideas × evaluation criteria (novelty, feasibility, impact, …)  
5. **Heatmap B:** keyword co-occurrence  
6. **Heatmap C:** agent groups × top ideas  
7. **Radar chart** for the leading ideas  
8. **Extreme perspectives:** short bullets where groups diverge  

The order is tuned for a **morning read**, not deep research.

---

## How it works (high level)

The app reads **one JSON file per calendar day** from `data/sessions/`. Your orchestration job—AutoGen, CrewAI, custom Python—produces that JSON after the debate. The Next.js UI renders Plotly charts and narrative blocks.

There is a **mock generator** so you can test the UI without wiring models first.

---

## Who it’s for

- Builders orchestrating many agents  
- Analysts who need **signal** from long generative sessions  
- Anyone publishing a **daily insights** page inside a team  

---

## Try it

Clone the repo, `npm install`, `npm run dev`, open `/brief/latest`. Documentation includes Quickstart, Tutorial, and Manual.

**Link:** YOUR_REPO_OR_DEMO_URL

---

## Closing

If multi-agent brainstorming is your workflow, the missing piece is often **aggregation**. DebateHeat is a concrete UI contract: one JSON shape, one morning page.

*Disclaimer: The stock project visualizes data; it does not run paid LLM debates by itself.*
