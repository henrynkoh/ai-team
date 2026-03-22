import { readdir, readFile } from "fs/promises";
import path from "path";

import type { DebateSession } from "@/lib/types";

const SESSION_DIR = path.join(process.cwd(), "data", "sessions");

export async function listSessionDates(): Promise<string[]> {
  try {
    const files = await readdir(SESSION_DIR);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""))
      .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
  } catch {
    return [];
  }
}

export async function loadSession(date: string): Promise<DebateSession | null> {
  const safe = date.replace(/[^\d-]/g, "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(safe)) return null;
  try {
    const raw = await readFile(path.join(SESSION_DIR, `${safe}.json`), "utf-8");
    return JSON.parse(raw) as DebateSession;
  } catch {
    return null;
  }
}

export async function getLatestSessionDate(): Promise<string | null> {
  const dates = await listSessionDates();
  return dates[0] ?? null;
}

/** `dates` are sorted newest-first. Previous = older day, next = newer day. */
export async function getAdjacentDates(
  date: string,
): Promise<{ prev: string | null; next: string | null }> {
  const dates = await listSessionDates();
  const idx = dates.indexOf(date);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: dates[idx + 1] ?? null,
    next: dates[idx - 1] ?? null,
  };
}
