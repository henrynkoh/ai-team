"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCallback, useEffect, useId } from "react";

import type { LandingModalDefinition } from "@/lib/landingModalContent";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-zinc-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

type Props = {
  open: boolean;
  definition: LandingModalDefinition | null;
  onClose: () => void;
};

export function LandingModal({ open, definition, onClose }: Props) {
  const titleId = useId();
  const panelId = useId();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, handleKeyDown]);

  if (!open || !definition) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[101] flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col rounded-2xl border border-white/15 bg-zinc-900 shadow-2xl shadow-violet-950/50"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <h2 id={titleId} className="text-lg font-semibold text-white">
              {definition.title}
            </h2>
            {definition.subtitle ? (
              <p className="mt-1 text-sm text-zinc-400">{definition.subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
            {definition.sections.map((section, idx) => (
              <div key={idx}>
                {section.heading ? (
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-400">
                    {section.heading}
                  </h3>
                ) : null}
                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="mb-3 last:mb-0">
                    {renderInline(p)}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="list-disc space-y-1.5 pl-5 marker:text-zinc-500">
                    {section.bullets.map((b, i) => (
                      <li key={i}>{renderInline(b)}</li>
                    ))}
                  </ul>
                ) : null}
                {section.code ? (
                  <div className="mt-3">
                    {section.codeLabel ? (
                      <p className="mb-1 text-xs text-zinc-500">{section.codeLabel}</p>
                    ) : null}
                    <pre className="overflow-x-auto rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-xs text-emerald-300/95">
                      {section.code}
                    </pre>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="shrink-0 space-y-2 border-t border-white/10 px-5 py-4">
          {definition.primaryLink ? (
            <Link
              href={definition.primaryLink.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              onClick={onClose}
            >
              {definition.primaryLink.label}
            </Link>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-white/15 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
