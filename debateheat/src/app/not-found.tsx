import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-lg flex-1 flex-col gap-4 px-4 py-20 text-center">
      <h1 className="text-xl font-semibold text-white">Brief not found</h1>
      <p className="text-zinc-400">
        That date has no session file yet.
      </p>
      <Link href="/" className="text-violet-400 underline hover:text-violet-300">
        Back to home
      </Link>
    </main>
  );
}
