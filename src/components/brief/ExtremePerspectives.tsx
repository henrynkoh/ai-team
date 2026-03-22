import type { DebateSession } from "@/lib/types";

type Props = {
  session: DebateSession;
};

export function ExtremePerspectives({ session }: Props) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Group perspectives (most divergent)
      </h2>
      <ul className="space-y-3">
        {session.extremePerspectives.map((row, i) => (
          <li
            key={`${row.group}-${i}`}
            className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-3 dark:border-zinc-800 dark:bg-zinc-900/30"
          >
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              {row.group}{" "}
              <span className="text-zinc-500 dark:text-zinc-400">
                · idea #{row.ideaRank}
              </span>{" "}
              <span className="tabular-nums text-amber-700 dark:text-amber-400">
                {row.score.toFixed(1)} / 10
              </span>
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              {row.ideaTitle}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {row.reason}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
