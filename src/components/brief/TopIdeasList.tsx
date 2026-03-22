import type { DebateSession } from "@/lib/types";

type Props = {
  session: DebateSession;
  limit?: number;
};

export function TopIdeasList({ session, limit }: Props) {
  const rows = limit ? session.topIdeas.slice(0, limit) : session.topIdeas;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Top ideas (Novelty × impact composite)
      </h2>
      <ol className="list-decimal space-y-2 pl-5 text-zinc-800 dark:text-zinc-200">
        {rows.map((idea) => (
          <li key={idea.id} className="leading-relaxed">
            <span className="font-medium">{idea.title}</span>
            <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-400">
              ({idea.compositeScore.toFixed(1)})
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
