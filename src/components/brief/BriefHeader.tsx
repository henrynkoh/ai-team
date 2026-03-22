import type { DebateSession } from "@/lib/types";

type Props = {
  session: DebateSession;
};

export function BriefHeader({ session }: Props) {
  const sourceLabel =
    session.topicSource === "queue"
      ? "Topic queue"
      : session.topicSource === "user"
        ? "User-submitted"
        : "LLM-suggested";

  return (
    <header className="space-y-2 border-b border-zinc-200 pb-6 dark:border-zinc-800">
      <p className="text-sm font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">
        DebateHeat Daily Brief
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-3xl">
        {session.date}
      </h1>
      <p className="text-lg text-zinc-700 dark:text-zinc-300">
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          Today&apos;s topic:
        </span>{" "}
        {session.topic}
      </p>
      <div className="flex flex-wrap gap-3 text-sm text-zinc-500 dark:text-zinc-400">
        <span>Source: {sourceLabel}</span>
        <span aria-hidden>·</span>
        <span>{session.agentCount} agents</span>
        <span aria-hidden>·</span>
        <span>{session.rounds} rounds</span>
        <span aria-hidden>·</span>
        <span>
          Generated{" "}
          {new Date(session.generatedAt).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
      </div>
    </header>
  );
}
