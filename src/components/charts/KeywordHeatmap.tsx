"use client";

import dynamic from "next/dynamic";

import type { DebateSession } from "@/lib/types";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Props = {
  session: DebateSession;
};

export function KeywordHeatmap({ session }: Props) {
  const { keywords, matrix } = session.heatmapB;

  return (
    <div className="w-full min-h-[380px] rounded-xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <Plot
        data={[
          {
            z: matrix,
            x: keywords,
            y: keywords,
            type: "heatmap",
            colorscale: "Oranges",
            hovertemplate: "%{y} & %{x}<br>co-occurrence: %{z}<extra></extra>",
            colorbar: { title: { text: "Count" } },
          },
        ]}
        layout={{
          title: {
            text: "Heatmap B — Keyword co-occurrence",
            font: { size: 16 },
          },
          margin: { l: 120, r: 24, t: 56, b: 120 },
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          font: { color: "#3f3f46" },
          height: Math.max(380, keywords.length * 28 + 140),
          xaxis: { tickangle: -35 },
        }}
        config={{ responsive: true }}
        style={{ width: "100%" }}
        useResizeHandler
      />
    </div>
  );
}
