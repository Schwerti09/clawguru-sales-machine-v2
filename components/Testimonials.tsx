export function Testimonials() {
  const items = [
    { who: "Growth Lead (B2B SaaS)", quote: "We fixed the top 3 issues in one afternoon and the re-check jumped 19 points." },
    { who: "Security Engineer (Marketplace)", quote: "The header baseline was the missing piece for our audit notes." },
    { who: "Founder (bootstrapped)", quote: "Day Pass paid for itself on the first runbook. Zero fluff." },
  ];

  return (
    <div className="card">
      <h2>Proof beats vibes</h2>
      <p>Short, specific wins. Replace these with your real testimonials as you collect them.</p>
      <div className="hr" />
      <div className="grid">
        {items.map((t, i) => (
          <div key={i} style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 16 }}>
            <div style={{ fontWeight: 650 }}>{t.who}</div>
            <div style={{ color: "var(--muted)", marginTop: 6 }}>&ldquo;{t.quote}&rdquo;</div>
          </div>
        ))}
      </div>
    </div>
  );
}
