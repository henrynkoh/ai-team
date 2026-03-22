import Link from "next/link";

export default function SetupPage() {
  return (
    <main className="mx-auto flex max-w-lg flex-1 flex-col gap-6 px-4 py-20">
      <h1 className="text-2xl font-semibold text-white">No sessions yet</h1>
      <p className="text-zinc-400">
        Add JSON files under{" "}
        <code className="rounded bg-zinc-800 px-1 text-zinc-200">
          data/sessions/YYYY-MM-DD.json
        </code>
        , or run the Python generator (see README). Then open{" "}
        <Link className="text-violet-400 underline hover:text-violet-300" href="/">
          home
        </Link>
        .
      </p>
    </main>
  );
}
