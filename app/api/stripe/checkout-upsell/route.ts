import { NextResponse } from "next/server";
import { getStripe, PRICES } from "@/lib/stripe";
import { getSiteUrl } from "@/lib/origin";

export async function POST() {
  try {
    const priceId = PRICES.upsellIncidentKit;
    if (!priceId) return NextResponse.json({ error: "Missing STRIPE_PRICE_UPSELL_INCIDENT_KIT" }, { status: 400 });

    const stripe = getStripe();
    const site = getSiteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${site}/thank-you?upsell=success`,
      cancel_url: `${site}/thank-you?upsell=cancel`,
      allow_promotion_codes: true,
      metadata: { upsell: "incident_kit" }
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
