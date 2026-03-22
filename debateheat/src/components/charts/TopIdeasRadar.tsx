"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { CRITERIA_LABELS, type CriteriaKey, type DebateSession } from "@/lib/types";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Props = {
  session: DebateSession;
  topN?: number;
};

export function TopIdeasRadar({ session, topN = 5 }: Props) {
  const ideas = useMemo(
    () => session.topIdeas.slice(0, topN),
    [session.topIdeas, topN],
  );
  const keys = useMemo(
    () =>
      ideas[0] ? (Object.keys(ideas[0].scores) as CriteriaKey[]) : [],
    [ideas],
  );

  const theta = useMemo(
    () => keys.map((k) => CRITERIA_LABELS[k] ?? k),
    [keys],
  );

  const traces = ideas.map((idea, idx) => ({
    type: "scatterpolar" as const,
    r: keys.map((k) => idea.scores[k]),
    theta,
    fill: "toself" as const,
    name:
      idea.title.length > 40 ? `${idea.title.slice(0, 38)}…` : idea.title,
    opacity: idx === 0 ? 0.35 : 0.2,
  }));

  return (
    <div className="w-full min-h-[400px] rounded-xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <Plot
        data={traces}
        layout={{
          title: {
            text: `Radar — top ${topN} ideas vs criteria`,
            font: { size: 16 },
          },
          polar: {
            radialaxis: { visible: true, range: [0, 10] },
          },
          showlegend: true,
          legend: { orientation: "h", y: -0.15 },
          margin: { t: 56, b: 80 },
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          font: { color: "#3f3f46" },
          height: 440,
        }}
        config={{ responsive: true }}
        style={{ width: "100%" }}
        useResizeHandler
      />
    </div>
  );
}
