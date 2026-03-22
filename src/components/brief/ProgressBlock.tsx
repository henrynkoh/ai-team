import type { DebateSession } from "@/lib/types";
import { CRITERIA_LABELS, type CriteriaKey } from "@/lib/types";

type Props = {
  session: DebateSession;
};

export function ProgressBlock({ session }: Props) {
  const p = session.progressVsYesterday;
  if (!p) {
    return (
      <section className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50/80 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
        No prior session in the archive — day-over-day progress will appear once
        two daily runs exist.
      </section>
    );
  }

  const deltas = Object.entries(p.criteriaDeltas) as [
    CriteriaKey,
    number,
  ][];

  return (
    <section className="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
      <h2 className="text-lg font-semibold text-emerald-950 dark:text-emerald-100">
        Progress vs yesterday
      </h2>
      <ul className="list-disc space-y-1 pl-5 text-emerald-900/90 dark:text-emerald-100/90">
        <li>New idea volume: +{p.newIdeasPercent}%</li>
        {deltas.map(([k, v]) => (
          <li key={k}>
            Avg {CRITERIA_LABELS[k] ?? k}: {v > 0 ? "+" : ""}
            {v.toFixed(1)} pts
          </li>
        ))}
        <li>
          Trending keywords:{" "}
          {p.trendingKeywords.map((kw) => (
            <span
              key={kw}
              className="mr-2 inline-block rounded bg-white/70 px-1.5 py-0.5 text-sm dark:bg-zinc-900/60"
            >
              {kw}
            </span>
          ))}
        </li>
      </ul>
    </section>
  );
}
