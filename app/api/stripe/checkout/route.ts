import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, PRICES } from "@/lib/stripe";
import { getSiteUrl } from "@/lib/origin";

const Schema = z.object({
  plan: z.enum(["daypass", "pro", "team"])
});

export async function POST(req: NextRequest) {
  try {
    const body = Schema.parse(await req.json());
    const priceId = PRICES[body.plan];
    if (!priceId) return NextResponse.json({ error: `Missing price id for ${body.plan}` }, { status: 400 });

    const stripe = getStripe();
    const site = getSiteUrl();

    // Optional referral from cookie
    const ref = req.cookies.get("ref_code")?.value;

    const session = await stripe.checkout.sessions.create({
      mode: body.plan === "daypass" ? "payment" : "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${site}/thank-you?session_id={CHECKOUT_SESSION_ID}${ref ? `&ref=${encodeURIComponent(ref)}` : ""}`,
      cancel_url: `${site}/pricing`,
      allow_promotion_codes: true,
      client_reference_id: ref || undefined,
      metadata: {
        plan: body.plan,
        ref: ref || ""
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
