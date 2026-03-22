"use client";

import { Github } from "lucide-react";

/** Full repo URL, e.g. https://github.com/you/debateheat */
const DEFAULT_URL =
  process.env.NEXT_PUBLIC_GITHUB_REPO ?? "https://github.com";

export function GitHubFab() {
  return (
    <a
      href={DEFAULT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-zinc-900/90 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 backdrop-blur-md transition hover:scale-105 hover:border-violet-400/50 hover:bg-zinc-800 hover:shadow-xl hover:shadow-violet-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 dark:border-zinc-700 dark:bg-zinc-950/95"
      aria-label="View DebateHeat on GitHub"
    >
      <Github
        className="size-5 shrink-0 text-violet-300 transition group-hover:text-white"
        aria-hidden
      />
      <span className="hidden sm:inline">GitHub</span>
    </a>
  );
}
