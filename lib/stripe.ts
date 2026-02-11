import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(key, { apiVersion: "2024-06-20" as any });
}

export const PRICES = {
  daypass: process.env.STRIPE_PRICE_DAYPASS || "",
  pro: process.env.STRIPE_PRICE_PRO || "",
  team: process.env.STRIPE_PRICE_TEAM || "",
  upsellIncidentKit: process.env.STRIPE_PRICE_UPSELL_INCIDENT_KIT || "",
};
