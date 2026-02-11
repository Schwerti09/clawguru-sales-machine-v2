import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const Schema = z.object({
  event: z.string().min(1).max(64),
  props: z.record(z.any()).optional()
});

export async function POST(req: NextRequest) {
  try {
    const { event } = Schema.parse(await req.json());
    // Hook your analytics here (Plausible/PostHog). Keep server-side to avoid adblock issues.
    return NextResponse.json({ ok: true, event });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Bad request" }, { status: 400 });
  }
}
