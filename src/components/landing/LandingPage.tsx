"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Flame,
  GitBranch,
  Layers,
  LayoutGrid,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";

import { GitHubFab } from "@/components/landing/GitHubFab";
import { LandingModal } from "@/components/landing/LandingModal";
import { SectionNav } from "@/components/landing/SectionNav";
import { LANDING_MODALS } from "@/lib/landingModalContent";

const cardInteractive =
  "cursor-pointer text-left transition hover:-translate-y-0.5 hover:border-white/25 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.99]";

function HeatmapMini({
  title,
  accent,
  rows,
  cols,
  onOpen,
}: {
  title: string;
  accent: string;
  rows: number;
  cols: number;
  onOpen?: () => void;
}) {
  const cells = Array.from({ length: rows * cols }, (_, i) => {
    const v = 0.3 + (Math.sin(i * 0.7) * 0.5 + 0.5) * 0.65;
    return v;
  });
  const inner = (
    <>
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {title}
      </p>
      <div
        className="grid gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((v, i) => (
          <div
            key={i}
            className="aspect-square rounded-sm transition group-hover:scale-110"
            style={{
              background: `hsl(265 90% ${35 + v * 45}%)`,
              opacity: 0.85 + v * 0.15,
            }}
          />
        ))}
      </div>
    </>
  );

  if (onOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className={`group w-full rounded-2xl border border-white/10 bg-zinc-900/60 p-4 shadow-inner ${accent} ${cardInteractive}`}
      >
        {inner}
        <p className="mt-3 text-center text-[11px] font-medium text-violet-400/90">
          Click for details
        </p>
      </button>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-zinc-900/60 p-4 shadow-inner ${accent}`}
    >
      {inner}
    </div>
  );
}

export function LandingPage() {
  const [modalId, setModalId] = useState<string | null>(null);
  const modalDefinition = modalId ? LANDING_MODALS[modalId] ?? null : null;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100">
      {/* Ambient mesh */}
      <div
        className="pointer-events-none fixed inset-0 opacity-90"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-violet-600/30 blur-[120px]" />
        <div className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-fuchsia-600/25 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[90px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(9,9,11,0.4)_50%,rgb(9,9,11)_100%)]" />
      </div>

      <SectionNav />
      <GitHubFab />
      <LandingModal
        open={Boolean(modalDefinition)}
        definition={modalDefinition}
        onClose={() => setModalId(null)}
      />

      <div className="relative lg:pl-56">
        {/* Hero */}
        <section
          id="hero"
          className="relative scroll-mt-20 px-4 pb-20 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-200 backdrop-blur">
              <Sparkles className="size-3.5 text-amber-300" />
              Multi-agent debates → one morning brief
            </div>
            <h1 className="bg-gradient-to-br from-white via-zinc-100 to-zinc-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              DebateHeat
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
              Turn noisy AI brainstorms into{" "}
              <span className="text-white">signal</span>: ranked ideas, rich
              heatmaps, group perspectives, and day-over-day progress—on a
              single scroll.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/brief/latest"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:shadow-xl hover:shadow-violet-500/40"
              >
                Open live brief
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#docs"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-zinc-200 backdrop-blur transition hover:border-white/25 hover:bg-white/10"
              >
                <BookOpen className="size-4" />
                Documentation
              </a>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section
          id="overview"
          className="scroll-mt-20 border-t border-white/5 px-4 py-20 sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              Overview
            </h2>
            <p className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Built for teams who run{" "}
              <span className="bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
                many agents
              </span>
              , not many tabs.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setModalId("overview-json")}
                className={`rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950 p-6 backdrop-blur hover:border-violet-500/40 ${cardInteractive}`}
              >
                <Layers className="size-8 text-violet-400" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  One JSON per day
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Your orchestrator writes structured results; DebateHeat renders
                  heatmaps, lists, and deltas—no database required for the
                  default setup.
                </p>
                <p className="mt-3 text-xs font-medium text-violet-400/90">
                  Learn more →
                </p>
              </button>
              <button
                type="button"
                onClick={() => setModalId("overview-layout")}
                className={`rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950 p-6 backdrop-blur hover:border-fuchsia-500/40 ${cardInteractive}`}
              >
                <Sun className="size-8 text-amber-400" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Morning-first layout
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Topic → ideas → progress → visuals → perspectives. Ordered for
                  a quick scan before your first meeting.
                </p>
                <p className="mt-3 text-xs font-medium text-violet-400/90">
                  Learn more →
                </p>
              </button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-20 px-4 py-20 sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-fuchsia-400">
              Features
            </h2>
            <p className="mt-3 max-w-2xl text-3xl font-bold text-white">
              Everything you need to see the debate—not the transcript.
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: LayoutGrid,
                  title: "Three heatmaps",
                  desc: "Ideas × criteria, keyword co-occurrence, agent groups × top ideas.",
                  color: "from-violet-500/20 to-transparent",
                  modalKey: "feature-heatmaps",
                },
                {
                  icon: Activity,
                  title: "Radar & scores",
                  desc: "Compare top ideas across novelty, feasibility, impact, ethics, and more.",
                  color: "from-cyan-500/20 to-transparent",
                  modalKey: "feature-radar",
                },
                {
                  icon: GitBranch,
                  title: "Divergent takes",
                  desc: "Surface where VC, Ethics, and Engineering disagree—at a glance.",
                  color: "from-amber-500/20 to-transparent",
                  modalKey: "feature-divergent",
                },
                {
                  icon: Zap,
                  title: "REST JSON API",
                  desc: "GET /api/session/YYYY-MM-DD for bots, Slack, or email digests.",
                  color: "from-emerald-500/20 to-transparent",
                  modalKey: "feature-api",
                },
                {
                  icon: BarChart3,
                  title: "Day-over-day",
                  desc: "Track new ideas, score deltas, and trending keywords vs yesterday.",
                  color: "from-rose-500/20 to-transparent",
                  modalKey: "feature-dod",
                },
                {
                  icon: Flame,
                  title: "Mock generator",
                  desc: "Python script outputs valid sessions—test the UI without LLM spend.",
                  color: "from-orange-500/20 to-transparent",
                  modalKey: "feature-mock",
                },
              ].map(({ icon: Icon, title, desc, color, modalKey }) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => setModalId(modalKey)}
                  className={`group rounded-2xl border border-white/10 bg-gradient-to-br ${color} p-5 backdrop-blur hover:border-white/25 ${cardInteractive}`}
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-white/5 text-violet-300 transition group-hover:bg-violet-500/20 group-hover:text-white">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {desc}
                  </p>
                  <p className="mt-3 text-xs font-medium text-violet-400/90">
                    Details →
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Heatmaps visual */}
        <section
          id="heatmaps"
          className="scroll-mt-20 border-t border-white/5 px-4 py-20 sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Visual language
            </h2>
            <p className="mt-3 text-3xl font-bold text-white">
              Quantitative + qualitative, in color.
            </p>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Interactive Plotly charts in the app; below is a stylized preview
              of the three matrix views.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <HeatmapMini
                title="A · Ideas × criteria"
                accent="ring-1 ring-violet-500/20"
                rows={6}
                cols={6}
                onOpen={() => setModalId("viz-a")}
              />
              <HeatmapMini
                title="B · Keywords"
                accent="ring-1 ring-fuchsia-500/20"
                rows={5}
                cols={5}
                onOpen={() => setModalId("viz-b")}
              />
              <HeatmapMini
                title="C · Groups × ideas"
                accent="ring-1 ring-cyan-500/20"
                rows={4}
                cols={5}
                onOpen={() => setModalId("viz-c")}
              />
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section
          id="workflow"
          className="scroll-mt-20 px-4 py-20 sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400">
              Workflow
            </h2>
            <p className="mt-3 text-3xl font-bold text-white">
              From run to dashboard in three steps.
            </p>
            <ol className="mt-10 space-y-4">
              {[
                "Orchestrate your multi-agent debate (your stack: Python, AutoGen, CrewAI, etc.).",
                "Emit one JSON file per calendar day into data/sessions/ (or your storage).",
                "Open DebateHeat: heatmaps and brief update automatically for that date.",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-zinc-900/40 p-5 backdrop-blur"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-zinc-300">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Docs */}
        <section
          id="docs"
          className="scroll-mt-20 border-t border-white/5 px-4 py-20 sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Docs & API
            </h2>
            <p className="mt-3 text-3xl font-bold text-white">
              Ship faster with the included guides.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { href: "/docs/quickstart", label: "Quickstart", sub: "~5 min" },
                { href: "/docs/tutorial", label: "Tutorial", sub: "Guided" },
                { href: "/docs/manual", label: "Manual", sub: "Reference" },
                {
                  href: "/api/session/2026-03-22",
                  label: "Sample API response",
                  sub: "JSON",
                },
              ].map(({ href, label, sub }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/50 px-5 py-4 transition hover:border-emerald-500/40 hover:bg-zinc-800/50"
                >
                  <div>
                    <p className="font-medium text-white">{label}</p>
                    <p className="text-xs text-zinc-500">{sub}</p>
                  </div>
                  <ArrowRight className="size-4 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-emerald-400" />
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              Markdown sources live in the repo under{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                docs/
              </code>
              . Set{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                NEXT_PUBLIC_GITHUB_REPO
              </code>{" "}
              for a “View on GitHub” link on each doc page.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section
          id="cta"
          className="scroll-mt-20 px-4 pb-32 pt-10 sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-3xl rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/80 via-zinc-900/90 to-fuchsia-950/50 p-10 text-center shadow-2xl shadow-violet-900/40">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to see today&apos;s brief?
            </h2>
            <p className="mt-3 text-zinc-400">
              Jump to the latest session with one click.
            </p>
            <Link
              href="/brief/latest"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg transition hover:bg-zinc-100"
            >
              Open latest brief
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
