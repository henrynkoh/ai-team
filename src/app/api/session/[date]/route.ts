import { NextResponse } from "next/server";

import { loadSession } from "@/lib/session";

type RouteProps = { params: Promise<{ date: string }> };

export async function GET(_req: Request, { params }: RouteProps) {
  const { date } = await params;
  const session = await loadSession(date);
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  return NextResponse.json(session);
}
