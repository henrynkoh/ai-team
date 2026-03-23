/**
 * Copy for landing-page modals (Overview, Features, Heatmap previews).
 */
export type ModalSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
  codeLabel?: string;
};

export type LandingModalDefinition = {
  id: string;
  title: string;
  subtitle?: string;
  sections: ModalSection[];
  primaryLink?: { href: string; label: string };
};

export const LANDING_MODALS: Record<string, LandingModalDefinition> = {
  "overview-json": {
    id: "overview-json",
    title: "One JSON per day",
    subtitle: "Structured debate output your UI can trust",
    sections: [
      {
        paragraphs: [
          "DebateHeat does not run your LLM orchestration. It reads **one JSON file per calendar day** from `data/sessions/YYYY-MM-DD.json` and renders the brief, heatmaps, and API responses.",
          "That keeps hosting simple: commit JSON with the repo, sync from CI, or later point `loadSession` at object storage.",
        ],
      },
      {
        heading: "What the file contains",
        bullets: [
          "Topic, timestamps, agent count, and round count",
          "Ranked ideas with per-criteria scores (novelty, feasibility, impact, …)",
          "Three matrix payloads for Heatmap A / B / C",
          "Optional `progressVsYesterday` when a prior day exists",
        ],
      },
      {
        heading: "Example path",
        code: "data/sessions/2026-03-22.json",
        codeLabel: "On disk",
      },
    ],
    primaryLink: { href: "/docs/manual", label: "Read schema in Manual" },
  },

  "overview-layout": {
    id: "overview-layout",
    title: "Morning-first layout",
    subtitle: "Ordered for a 2-minute scan",
    sections: [
      {
        paragraphs: [
          "The daily brief page is **intentionally ordered**: you see the highest-signal information first, then detail.",
        ],
      },
      {
        heading: "Scroll order",
        bullets: [
          "Topic & metadata — what was debated and when",
          "Top ideas — composite ranking at a glance",
          "Progress vs yesterday — deltas when history exists",
          "Heatmap A — ideas × evaluation axes",
          "Heatmap B — keyword co-occurrence",
          "Heatmap C — agent groups × top ideas",
          "Radar — top ideas vs criteria",
          "Divergent perspectives — where personas disagree most",
        ],
      },
    ],
    primaryLink: { href: "/brief/latest", label: "Open a live brief" },
  },

  "feature-heatmaps": {
    id: "feature-heatmaps",
    title: "Three heatmaps",
    subtitle: "Matrix views for quantity and quality",
    sections: [
      {
        paragraphs: [
          "Each heatmap answers a different question. Together they replace wall-of-text transcripts with **comparable, color-coded grids** (Plotly; interactive hover on the brief page).",
        ],
      },
      {
        heading: "Heatmap A — Ideas × criteria",
        bullets: [
          "Rows: top ideas (or idea IDs mapped to titles)",
          "Columns: Novelty, Feasibility, Market impact, Tech depth, Ethical risk, Speed to MVP",
          "Cell: score 0–10 — scan for weak dimensions per idea",
        ],
      },
      {
        heading: "Heatmap B — Keywords",
        bullets: [
          "Symmetric co-occurrence counts across extracted keywords",
          "Shows which concepts cluster in the same ideas",
        ],
      },
      {
        heading: "Heatmap C — Groups × ideas",
        bullets: [
          "Rows: personas or cohorts (e.g. VC, Ethics, Engineering)",
          "Columns: top ideas — average scores from that group’s lens",
        ],
      },
    ],
    primaryLink: { href: "/brief/latest", label: "See charts on latest brief" },
  },

  "feature-radar": {
    id: "feature-radar",
    title: "Radar & scores",
    subtitle: "Multi-axis comparison for top ideas",
    sections: [
      {
        paragraphs: [
          "The **radar chart** overlays the leading ideas on the same six criteria so you can spot trade-offs: one idea might lead on impact but lag on ethics or feasibility.",
        ],
      },
      {
        heading: "Criteria (default set)",
        bullets: [
          "Novelty — how new or non-obvious",
          "Feasibility — realistic to ship with today’s tools",
          "Market impact — scale of upside",
          "Tech depth — engineering sophistication required",
          "Ethical risk — harm, fairness, displacement",
          "Speed to MVP — time to a credible prototype",
        ],
      },
      {
        paragraphs: [
          "Scores are **stored in JSON** per idea; the UI reads them directly. Your judge agents can overwrite or refine these fields when you wire a real pipeline.",
        ],
      },
    ],
    primaryLink: { href: "/brief/latest", label: "View radar on brief" },
  },

  "feature-divergent": {
    id: "feature-divergent",
    title: "Divergent takes",
    subtitle: "Where personas disagree",
    sections: [
      {
        paragraphs: [
          "Long debates hide **conflict**. This block surfaces a few high-signal contrasts: same idea, very different scores and one-line reasons from different “groups” (VC vs Ethics vs Engineering, etc.).",
        ],
      },
      {
        heading: "Why it matters",
        bullets: [
          "Surfaces regulatory or ethical red flags early",
          "Highlights investor excitement vs builder skepticism",
          "Gives meeting talking points without reading full logs",
        ],
      },
      {
        heading: "Data shape",
        bullets: [
          "`extremePerspectives[]` in session JSON: group name, idea reference, score, short reason",
        ],
      },
    ],
    primaryLink: { href: "/brief/latest", label: "See examples on brief" },
  },

  "feature-api": {
    id: "feature-api",
    title: "REST JSON API",
    subtitle: "Machine-readable sessions",
    sections: [
      {
        paragraphs: [
          "Every published session is available over HTTP for **Slack bots**, **email digests**, or **internal tools**.",
        ],
      },
      {
        heading: "Endpoint",
        code: "GET /api/session/YYYY-MM-DD",
        codeLabel: "Example",
      },
      {
        paragraphs: [
          "Returns the same JSON the dashboard uses. **404** if that date has no file under `data/sessions/`.",
        ],
      },
    ],
    primaryLink: { href: "/api/session/2026-03-22", label: "Open sample JSON" },
  },

  "feature-dod": {
    id: "feature-dod",
    title: "Day-over-day",
    subtitle: "Momentum at a glance",
    sections: [
      {
        paragraphs: [
          "When **yesterday’s** session exists, the brief shows **progressVsYesterday**: new-idea volume change, average score deltas on selected criteria, and trending keywords.",
        ],
      },
      {
        heading: "Use cases",
        bullets: [
          "Standups: “Are we generating more diverse ideas this week?”",
          "Tracking whether feasibility scores improve as ideas get refined",
          "Spotting emerging vocabulary (e.g. new toolchains or risks)",
        ],
      },
      {
        paragraphs: [
          "If there is no prior day in the archive, this block is hidden so the page stays honest.",
        ],
      },
    ],
    primaryLink: { href: "/brief/latest", label: "View on latest brief" },
  },

  "feature-mock": {
    id: "feature-mock",
    title: "Mock generator",
    subtitle: "Test the UI without API spend",
    sections: [
      {
        paragraphs: [
          "`scripts/generate_brief.py` writes a **valid session file** for any date using deterministic randomness (seeded by date) so layouts and charts always have data to render.",
        ],
      },
      {
        heading: "Run locally",
        code: "python3 scripts/generate_brief.py --date 2026-04-01",
        codeLabel: "Shell",
      },
      {
        bullets: [
          "No OpenAI key required for the mock",
          "Output path: `data/sessions/YYYY-MM-DD.json`",
          "Reload `/brief/YYYY-MM-DD` after generating",
        ],
      },
    ],
    primaryLink: { href: "/docs/quickstart", label: "Quickstart guide" },
  },

  "viz-a": {
    id: "viz-a",
    title: "Heatmap A — Ideas × criteria",
    subtitle: "Per-idea, per-axis scores",
    sections: [
      {
        paragraphs: [
          "The **primary** heatmap: each row is a candidate idea (or cluster label), each column is an evaluation dimension. Color encodes score (typically 0–10).",
        ],
      },
      {
        heading: "How to read it",
        bullets: [
          "Scan rows for **horizontal** consistency — strong across the board vs lopsided",
          "Scan columns for systemic gaps — e.g. everything scores high on novelty but low on feasibility",
        ],
      },
      {
        heading: "In the app",
        paragraphs: [
          "Rendered with Plotly (Viridis-style scale). Hover shows exact values and labels.",
        ],
      },
    ],
    primaryLink: { href: "/brief/latest", label: "Open interactive chart" },
  },

  "viz-b": {
    id: "viz-b",
    title: "Heatmap B — Keyword co-occurrence",
    subtitle: "Which concepts appear together",
    sections: [
      {
        paragraphs: [
          "Built from **keyword extraction** over ideas (your pipeline can use TF-IDF, LLM labels, or fixed lexicon). The matrix is symmetric: cell (i, j) counts how often keyword i and j appear in the **same** idea or same document window.",
        ],
      },
      {
        heading: "How to read it",
        bullets: [
          "Bright off-diagonal cells — two themes often co-occur",
          "Clusters — groups of terms that move together",
        ],
      },
    ],
    primaryLink: { href: "/brief/latest", label: "See live heatmap" },
  },

  "viz-c": {
    id: "viz-c",
    title: "Heatmap C — Groups × ideas",
    subtitle: "Lens mismatch, visible numerically",
    sections: [
      {
        paragraphs: [
          "Rows are **agent groups** (or judging panels); columns are **top ideas**. Values are average scores from that group’s perspective.",
        ],
      },
      {
        heading: "How to read it",
        bullets: [
          "Large row–column gaps vs other rows — ideological or functional split",
          "Useful for deciding which stakeholder to put in the room for the next round",
        ],
      },
    ],
    primaryLink: { href: "/brief/latest", label: "See live heatmap" },
  },
};
