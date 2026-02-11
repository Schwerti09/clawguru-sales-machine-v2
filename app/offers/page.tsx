export const metadata = {
  title: "Offers — ClawGuru",
  description: "Recommended tools (affiliate links disclosed)."
};

type Offer = {
  name: string;
  why: string;
  category: string;
  link: string;
};

const OFFERS: Offer[] = [
  { name: "Plausible Analytics", why: "Simple, privacy-friendly analytics that doesn’t bloat pages.", category: "analytics", link: "https://plausible.io" },
  { name: "PostHog", why: "Product analytics + funnels + experiments (EU hosting available).", category: "analytics", link: "https://posthog.com" },
  { name: "Cloudflare", why: "CDN + WAF + caching = easy wins for performance and security.", category: "security", link: "https://cloudflare.com" },
  { name: "Sentry", why: "Catch production errors before users do.", category: "reliability", link: "https://sentry.io" }
];

export default function OffersPage() {
  return (
    <div className="card">
      <div className="badge">Affiliate disclosure</div>
      <h1>Recommended tools</h1>
      <p>
        Some links may be affiliate links. If you buy through them, we may earn a commission.
        It won’t change your price. Transparency keeps the universe stable.
      </p>

      <div className="hr" />
      <table className="table">
        <thead>
          <tr>
            <th>Tool</th>
            <th>Why it’s here</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {OFFERS.map((o) => (
            <tr key={o.name}>
              <td style={{ fontWeight: 700 }}><a href={o.link} target="_blank" rel="noreferrer">{o.name}</a></td>
              <td style={{ color: "var(--muted)" }}>{o.why}</td>
              <td>{o.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="hr" />
      <p style={{ fontSize: 13 }}>
        Replace these links with your actual partner links once you have them.
      </p>
    </div>
  );
}
