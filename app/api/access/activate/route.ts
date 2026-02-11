import { NextRequest, NextResponse } from "next/server";
import { accessCookieName, sign } from "@/lib/access";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

function ttlSeconds(plan: "daypass" | "pro" | "team") {
  // Cookie validity (not subscription enforcement). You can enforce renewals via Stripe customer portal later.
  if (plan === "daypass") return 60 * 60 * 24;        // 24h
  if (plan === "pro") return 60 * 60 * 24 * 30;       // 30d
  return 60 * 60 * 24 * 30;                           // 30d
}

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment
    const paid = session.payment_status === "paid" || session.status === "complete";
    if (!paid) return NextResponse.json({ error: "Payment not completed." }, { status: 403 });

    const plan = (session.metadata?.plan || "") as "daypass" | "pro" | "team";
    if (plan !== "daypass" && plan !== "pro" && plan !== "team") {
      return NextResponse.json({ error: "Invalid plan metadata on session." }, { status: 400 });
    }

    const exp = Math.floor(Date.now() / 1000) + ttlSeconds(plan);
    const token = sign({ plan, exp });

    const res = NextResponse.json({ ok: true, plan });
    res.cookies.set(accessCookieName(), token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true,
      maxAge: ttlSeconds(plan)
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Activation failed" }, { status: 500 });
  }
}
