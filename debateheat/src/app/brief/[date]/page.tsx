import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { AgentGroupHeatmap } from "@/components/charts/AgentGroupHeatmap";
import { IdeaCriteriaHeatmap } from "@/components/charts/IdeaCriteriaHeatmap";
import { KeywordHeatmap } from "@/components/charts/KeywordHeatmap";
import { TopIdeasRadar } from "@/components/charts/TopIdeasRadar";
import { BriefHeader } from "@/components/brief/BriefHeader";
import { DateNav } from "@/components/brief/DateNav";
import { ExtremePerspectives } from "@/components/brief/ExtremePerspectives";
import { ProgressBlock } from "@/components/brief/ProgressBlock";
import { TopIdeasList } from "@/components/brief/TopIdeasList";
import { getAdjacentDates, getLatestSessionDate, loadSession } from "@/lib/session";

type Props = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date: raw } = await params;
  if (raw === "latest") {
    return { title: "DebateHeat — Daily brief" };
  }
  const session = await loadSession(raw);
  return {
    title: session
      ? `DebateHeat — ${session.date}`
      : "DebateHeat — Daily brief",
    description: session?.topic ?? "Multi-agent debate heatmaps",
  };
}

export default async function BriefPage({ params }: Props) {
  const { date: raw } = await params;

  if (raw === "latest") {
    const latest = await getLatestSessionDate();
    if (!latest) notFound();
    redirect(`/brief/${latest}`);
  }

  const session = await loadSession(raw);
  if (!session) notFound();

  const { prev, next } = await getAdjacentDates(session.date);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <DateNav date={session.date} prevDate={prev} nextDate={next} />
      <BriefHeader session={session} />

      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        <div className="space-y-10">
          <TopIdeasList session={session} />
          <ProgressBlock session={session} />
          <IdeaCriteriaHeatmap session={session} />
          <KeywordHeatmap session={session} />
          <AgentGroupHeatmap session={session} />
          <TopIdeasRadar session={session} topN={5} />
          <ExtremePerspectives session={session} />
        </div>
        <aside className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              Morning checklist
            </p>
            <ol className="mt-2 list-decimal space-y-2 pl-4">
              <li>Scan topic & top ideas</li>
              <li>Read heatmap A for weak axes</li>
              <li>Check keyword co-occurrence</li>
              <li>Compare group heatmap & perspectives</li>
              <li>Note deltas vs yesterday</li>
            </ol>
          </div>
          <p>
            JSON API:{" "}
            <Link
              className="font-mono text-amber-800 underline dark:text-amber-400"
              href={`/api/session/${session.date}`}
            >
              /api/session/{session.date}
            </Link>
          </p>
        </aside>
      </div>
    </div>
  );
}
