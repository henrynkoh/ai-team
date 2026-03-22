# WordPress — DebateHeat post (Gutenberg-friendly)

Use as **paragraph** and **heading** blocks. Shortcode-free.

---

## Suggested title

**DebateHeat: A Morning-Friendly Dashboard for Multi-Agent AI Debates**

---

## Excerpt (meta description, ~155 chars)

Turn daily multi-agent debate outputs into one page: heatmaps, ranked ideas, and group disagreement. Open-source Next.js app; JSON in, clarity out.

---

## Body

### The problem

Multi-agent brainstorming with LLMs produces rich transcripts—and **too much text** for a daily decision rhythm.

### The idea

**DebateHeat** is an open-source **Next.js** application that visualizes one debate session per day from a **JSON file**. No database required for the default setup.

### What readers get each morning

- Daily **topic** and run metadata  
- **Ranked ideas** with scores  
- **Day-over-day progress** when prior sessions exist  
- **Three heatmaps**: ideas × criteria, keyword co-occurrence, agent groups × ideas  
- **Radar** view for leading ideas  
- Short **divergent perspectives** (e.g., VC vs ethics)  

### For implementers

- Session path: `data/sessions/YYYY-MM-DD.json`  
- API: `GET /api/session/YYYY-MM-DD`  
- Optional Python script generates mock sessions for UI testing  

### Call to action

Documentation: Quickstart, Tutorial, and Manual in the `docs/` folder.

**Project link:** YOUR_REPO_OR_DEMO_URL

---

## Featured image alt text

Screenshot of DebateHeat daily brief showing topic, heatmap, and radar chart.

---

## Categories (suggested)

- Technology  
- Open Source  
- Artificial Intelligence  

---

## Custom fields / SEO plugins

- **Focus keyphrase:** multi-agent AI dashboard  
- **Canonical URL:** your primary demo or repo page  
