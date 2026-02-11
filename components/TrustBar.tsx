export function TrustBar() {
  const items = [
    { k: "No account required", v: "Buy → Activate → Done" },
    { k: "Stripe Checkout", v: "Secure payments" },
    { k: "Instant access", v: "Gated dashboard + downloads" },
    { k: "Transparent offers", v: "Affiliate links disclosed" },
  ];
  return (
    <div className="card">
      <div className="grid">
        {items.map((it) => (
          <div key={it.k} className="kpi">
            <strong>✓</strong>
            <div>
              <div style={{ fontWeight: 650 }}>{it.k}</div>
              <div style={{ color: "var(--muted)" }}>{it.v}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
