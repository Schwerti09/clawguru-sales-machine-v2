"use client";

import { useState } from "react";
import { CTA } from "@/components/CTA";

type Plan = {
  key: "free" | "daypass" | "pro" | "team";
  name: string;
  price: string;
  forWho: string;
  bullets: string[];
  cta: string;
};

const PLANS: Plan[] = [
  {
    key: "free",
    name: "Free",
    price: "€0",
    forWho: "Try the flow and see your first bottleneck.",
    bullets: ["Quick check", "Runbook teasers", "Recommended fixes"],
    cta: "Start free check"
  },
  {
    key: "daypass",
    name: "Day Pass",
    price: "€29 one‑time",
    forWho: "24h shipping sprint. Ideal for audits + quick wins.",
    bullets: ["Full runbooks", "Templates + downloads", "Gated dashboard (24h)"],
    cta: "Buy Day Pass"
  },
  {
    key: "pro",
    name: "Pro",
    price: "€59/mo",
    forWho: "Solo builders shipping every week.",
    bullets: ["Everything in Day Pass", "Deep checks (gated)", "New runbooks weekly"],
    cta: "Start Pro"
  },
  {
    key: "team",
    name: "Team",
    price: "€149/mo",
    forWho: "Teams that need shared playbooks and seats.",
    bullets: ["Seats + shared dashboard", "Priority runbook requests", "Team templates pack"],
    cta: "Start Team"
  }
];

export function PricingTable() {
  const [error, setError] = useState<string | null>(null);

  async function checkout(plan: Exclude<Plan["key"], "free">) {
    setError(null);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data?.error || "Checkout failed.");
      return;
    }
    window.location.href = data.url;
  }

  return (
    <div className="grid cols2">
      <div className="card">
        <h2>Pricing</h2>
        <p>
          Freemium entry → one‑time Day Pass for impulse buyers → Pro/Team for retention.
          Simple funnel. Predictable revenue.
        </p>
        {error ? <p style={{ color: "#ff8fa3" }}>{error}</p> : null}
        <div className="hr" />

        <table className="table">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {PLANS.map((p) => (
              <tr key={p.key}>
                <td>
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>{p.forWho}</div>
                </td>
                <td>{p.price}</td>
                <td style={{ textAlign: "right" }}>
                  {p.key === "free" ? (
                    <CTA label={p.cta} href="/check" />
                  ) : (
                    <CTA label={p.cta} action={() => checkout(p.key)} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="hr" />
        <p style={{ fontSize: 13 }}>
          Transparent billing. No accounts. Access is a signed cookie after Stripe verifies payment.
        </p>
      </div>

      <div className="card">
        <h2>What you get</h2>
        <p>Outcome loop: Check → Fix → Re‑check → Share.</p>
        <div className="hr" />
        <div className="grid">
          {PLANS.slice(1).map((p) => (
            <div key={p.key} style={{ border: "1px solid var(--border)", borderRadius: 16, padding: 12 }}>
              <div className="badge"><strong style={{ color: "var(--text)" }}>{p.name}</strong> • {p.price}</div>
              <ul style={{ margin: "10px 0 0 18px", color: "var(--muted)" }}>
                {p.bullets.map((b) => <li key={b} style={{ margin: "6px 0" }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="hr" />
        <div className="badge">
          Conversion tip: put 3 real case studies on the homepage ASAP.
        </div>
      </div>
    </div>
  );
}
