import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { accessCookieName, verify } from "@/lib/access";
import { DOWNLOADS } from "@/lib/downloads";

export async function GET(req: NextRequest) {
  const token = cookies().get(accessCookieName())?.value;
  const access = token ? verify(token) : null;
  if (!access) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id") || "";
  const item = DOWNLOADS.find(d => d.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Redirect to the public file path (simple). Upgrade to signed storage for real protection.
  return NextResponse.redirect(new URL(item.filePath, req.nextUrl.origin));
}
