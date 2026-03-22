#!/usr/bin/env python3
"""
Generate a DebateHeat session JSON (mock scores + structure) for cron / local runs.
Writes to data/sessions/YYYY-MM-DD.json — same schema the Next.js app reads.

Usage:
  python scripts/generate_brief.py --date 2026-03-23
  python scripts/generate_brief.py   # uses today's UTC date

Optional: set OPENAI_API_KEY and implement real LLM calls in place of random data.
"""
from __future__ import annotations

import argparse
import json
import random
from datetime import datetime, timezone
from pathlib import Path

CRITERIA = [
    "novelty",
    "feasibility",
    "marketImpact",
    "techDepth",
    "ethicalRisk",
    "mvpSpeed",
]

KEYWORD_POOL = [
    "AI agent",
    "automation",
    "job displacement",
    "ethics",
    "OCR",
    "LLM",
    "workflow",
    "regulation",
    "MVP",
    "productivity",
]

GROUPS = ["VC", "Product", "Engineering", "Ethics", "Futurist"]


def rnd_matrix(rows: int, cols: int, lo: float, hi: float) -> list[list[float]]:
    return [[round(random.uniform(lo, hi), 1) for _ in range(cols)] for _ in range(rows)]


def sym_cooccur(n: int, hi: int) -> list[list[int]]:
    m = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(i, n):
            v = random.randint(0, hi) if i != j else random.randint(8, hi + 4)
            m[i][j] = m[j][i] = v
    return m


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--date",
        help="YYYY-MM-DD (default: today UTC)",
    )
    args = parser.parse_args()
    day = args.date or datetime.now(timezone.utc).strftime("%Y-%m-%d")
    random.seed(hash(day) % (2**32))

    n_ideas = random.randint(8, 12)
    idea_ids = [f"i{k}" for k in range(1, n_ideas + 1)]
    topics = [
        "Which roles are first to be 90%+ automated by AI agents?",
        "What is the single biggest bottleneck for agentic workflows in enterprises?",
        "2027년에 가장 먼저 사라질 직업 후보는?",
    ]

    top_ideas = []
    for rank, iid in enumerate(idea_ids, start=1):
        scores = {c: round(random.uniform(4.0, 9.5), 1) for c in CRITERIA}
        comp = round(sum(scores.values()) / len(scores), 1)
        top_ideas.append(
            {
                "id": iid,
                "rank": rank,
                "title": f"Generated idea {rank}: {random.choice(KEYWORD_POOL)} angle",
                "compositeScore": comp,
                "scores": scores,
            }
        )

    heat_a = rnd_matrix(len(idea_ids), len(CRITERIA), 4.0, 9.5)
    k = min(10, len(KEYWORD_POOL))
    kws = random.sample(KEYWORD_POOL, k)
    heat_b = sym_cooccur(k, 18)
    top5 = idea_ids[:5]
    heat_c = rnd_matrix(len(GROUPS), len(top5), 4.0, 9.8)

    session = {
        "date": day,
        "topic": random.choice(topics),
        "topicSource": random.choice(["queue", "llm"]),
        "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "agentCount": random.randint(8, 24),
        "rounds": random.randint(3, 6),
        "topIdeas": top_ideas,
        "heatmapA": {
            "ideaIds": idea_ids,
            "criteria": CRITERIA,
            "matrix": heat_a,
        },
        "heatmapB": {"keywords": kws, "matrix": heat_b},
        "heatmapC": {
            "groups": GROUPS,
            "ideaIds": top5,
            "matrix": heat_c,
        },
        "extremePerspectives": [
            {
                "group": "VC",
                "ideaRank": 1,
                "ideaTitle": top_ideas[0]["title"],
                "score": round(random.uniform(8.5, 9.9), 1),
                "reason": "Large TAM + fast adoption curve.",
            },
            {
                "group": "Ethics",
                "ideaRank": 1,
                "ideaTitle": top_ideas[0]["title"],
                "score": round(random.uniform(2.0, 5.0), 1),
                "reason": "Displacement and governance concerns.",
            },
            {
                "group": "Engineering",
                "ideaRank": min(3, n_ideas),
                "ideaTitle": top_ideas[min(2, n_ideas - 1)]["title"],
                "score": round(random.uniform(8.0, 9.5), 1),
                "reason": "Technically feasible with current tooling.",
            },
        ],
        "progressVsYesterday": {
            "newIdeasPercent": random.randint(10, 55),
            "criteriaDeltas": {
                "novelty": round(random.uniform(-0.5, 2.0), 1),
                "feasibility": round(random.uniform(-0.3, 1.5), 1),
                "marketImpact": round(random.uniform(-0.2, 1.8), 1),
            },
            "trendingKeywords": random.sample(kws, min(3, len(kws))),
        },
    }

    root = Path(__file__).resolve().parents[1]
    out = root / "data" / "sessions" / f"{day}.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(session, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
