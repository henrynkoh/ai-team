"use client";

import { useCallback, useEffect, useState } from "react";

const NAV = [
  { id: "hero", label: "Intro" },
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "heatmaps", label: "Heatmaps" },
  { id: "workflow", label: "Workflow" },
  { id: "docs", label: "Docs & API" },
  { id: "cta", label: "Try it" },
] as const;

export function SectionNav() {
  const [active, setActive] = useState<string>("hero");

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
      history.replaceState(null, "", `#${id}`);
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      requestAnimationFrame(() => scrollToId(hash));
    }
  }, [scrollToId]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Mobile: horizontal pill strip */}
      <div className="lg:hidden sticky top-14 z-30 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
        <div className="flex gap-1 overflow-x-auto px-3 py-2.5 scrollbar-thin">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToId(id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                active === id
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md"
                  : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: left sidebar */}
      <aside className="pointer-events-none fixed left-0 top-0 z-30 hidden h-screen w-56 pt-20 lg:block">
        <div className="pointer-events-auto h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden px-3 py-4 [scrollbar-width:thin]">
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            On this page
          </p>
          <nav className="flex flex-col gap-0.5" aria-label="Section navigation">
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToId(id)}
                className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                  active === id
                    ? "bg-white/10 text-white shadow-inner shadow-violet-500/20"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition ${
                    active === id
                      ? "bg-gradient-to-br from-violet-400 to-fuchsia-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                      : "bg-zinc-600 group-hover:bg-zinc-500"
                  }`}
                  aria-hidden
                />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
