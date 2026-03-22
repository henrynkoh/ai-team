"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import type { DebateSession } from "@/lib/types";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Props = {
  session: DebateSession;
};

export function AgentGroupHeatmap({ session }: Props) {
  const titles = useMemo(() => {
    const map = new Map(session.topIdeas.map((r) => [r.id, r.title]));
    return session.heatmapC.ideaIds.map((id) => {
      const t = map.get(id) ?? id;
      return t.length > 48 ? `${t.slice(0, 46)}…` : t;
    });
  }, [session]);

  return (
    <div className="w-full min-h-[320px] rounded-xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <Plot
        data={[
          {
            z: session.heatmapC.matrix.map((row) =>
              row.map((v) => Math.round(v * 10) / 10),
            ),
            x: titles,
            y: session.heatmapC.groups,
            type: "heatmap",
            colorscale: "RdBu",
            hovertemplate:
              "%{y} → %{x}<br>avg score: %{z:.1f}<extra></extra>",
            colorbar: { title: { text: "Avg (0–10)" } },
          },
        ]}
        layout={{
          title: {
            text: "Heatmap C — Agent group × top ideas",
            font: { size: 16 },
          },
          margin: { l: 160, r: 24, t: 56, b: 160 },
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          font: { color: "#3f3f46" },
          height: Math.max(320, session.heatmapC.groups.length * 40 + 140),
          xaxis: { tickangle: -30 },
        }}
        config={{ responsive: true }}
        style={{ width: "100%" }}
        useResizeHandler
      />
    </div>
  );
}
