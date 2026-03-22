import Link from "next/link";

type Props = {
  date: string;
  prevDate: string | null;
  nextDate: string | null;
};

export function DateNav({ date, prevDate, nextDate }: Props) {
  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800"
      aria-label="Daily brief dates"
    >
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        Viewing <span className="font-mono text-zinc-800 dark:text-zinc-200">{date}</span>
      </div>
      <div className="flex gap-2">
        {prevDate ? (
          <Link
            href={`/brief/${prevDate}`}
            className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            ← Previous day
          </Link>
        ) : (
          <span className="rounded-full border border-transparent px-3 py-1.5 text-sm text-zinc-400">
            ← Previous day
          </span>
        )}
        {nextDate ? (
          <Link
            href={`/brief/${nextDate}`}
            className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Next day →
          </Link>
        ) : (
          <span className="rounded-full border border-transparent px-3 py-1.5 text-sm text-zinc-400">
            Next day →
          </span>
        )}
        <Link
          href="/"
          className="rounded-full bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Latest
        </Link>
      </div>
    </nav>
  );
}
