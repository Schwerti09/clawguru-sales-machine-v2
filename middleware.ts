import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/pricing", "/check", "/runbooks/:path*"]
};

function pickVariant(existing?: string | null) {
  if (existing === "A" || existing === "B") return existing;
  return Math.random() < 0.5 ? "A" : "B";
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // A/B variant cookie
  const variant = pickVariant(req.cookies.get("ab_variant")?.value ?? null);
  res.cookies.set("ab_variant", variant, { path: "/", httpOnly: false, sameSite: "lax" });

  // Referral cookie if present in URL
  const ref = req.nextUrl.searchParams.get("ref");
  if (ref && /^[a-zA-Z0-9_-]{3,32}$/.test(ref)) {
    res.cookies.set("ref_code", ref, { path: "/", httpOnly: false, sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  }

  return res;
}
