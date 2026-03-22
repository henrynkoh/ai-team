"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { CRITERIA_LABELS, type CriteriaKey, type DebateSession } from "@/lib/types";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Props = {
  session: DebateSession;
};

export function IdeaCriteriaHeatmap({ session }: Props) {
  const ideaTitles = useMemo(() => {
    const map = new Map(session.topIdeas.map((r) => [r.id, r.title]));
    return session.heatmapA.ideaIds.map((id) => map.get(id) ?? id);
  }, [session]);

  const xLabels = useMemo(
    () =>
      session.heatmapA.criteria.map(
        (c) => CRITERIA_LABELS[c as CriteriaKey] ?? c,
      ),
    [session.heatmapA.criteria],
  );

  const z = session.heatmapA.matrix.map((row) =>
    row.map((v) => Math.round(v * 10) / 10),
  );

  return (
    <div className="w-full min-h-[420px] rounded-xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <Plot
        data={[
          {
            z,
            x: xLabels,
            y: ideaTitles,
            type: "heatmap",
            colorscale: "Viridis",
            hovertemplate:
              "Idea: %{y}<br>%{x}: %{z:.1f}<extra></extra>",
            colorbar: { title: { text: "Score (0–10)" } },
          },
        ]}
        layout={{
          title: {
            text: "Heatmap A — Ideas × evaluation criteria",
            font: { size: 16 },
          },
          margin: { l: 280, r: 24, t: 56, b: 72 },
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          font: { color: "#3f3f46" },
          height: Math.max(420, ideaTitles.length * 36 + 120),
          xaxis: { side: "bottom" },
          yaxis: { automargin: true },
        }}
        config={{ responsive: true, displayModeBar: true }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler
      />
    </div>
  );
}
