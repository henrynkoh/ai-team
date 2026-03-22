import { readFile } from "fs/promises";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";

import ReactMarkdown from "react-markdown";

const SLUG_TO_FILE: Record<string, string> = {
  quickstart: "QUICKSTART.md",
  tutorial: "TUTORIAL.md",
  manual: "MANUAL.md",
};

const TITLES: Record<string, string> = {
  quickstart: "Quickstart",
  tutorial: "Tutorial",
  manual: "Manual",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const title = TITLES[slug];
  return {
    title: title ? `${title} — Docs` : "Docs",
  };
}

export async function generateStaticParams() {
  return Object.keys(SLUG_TO_FILE).map((slug) => ({ slug }));
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const file = SLUG_TO_FILE[slug];
  if (!file) notFound();

  let content: string;
  try {
    content = await readFile(
      path.join(process.cwd(), "docs", file),
      "utf-8",
    );
  } catch {
    notFound();
  }

  const githubBase = process.env.NEXT_PUBLIC_GITHUB_REPO?.replace(/\/$/, "");
  const githubUrl = githubBase
    ? `${githubBase}/blob/main/docs/${file}`
    : null;

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-200">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link
            href="/#docs"
            className="text-sm font-medium text-violet-400 hover:text-violet-300"
          >
            ← Back to landing
          </Link>
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-300"
            >
              View on GitHub
            </a>
          ) : null}
        </div>
        <article className="prose prose-invert prose-headings:scroll-mt-24 prose-a:text-violet-400 prose-code:rounded prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-pre:bg-zinc-900 max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
