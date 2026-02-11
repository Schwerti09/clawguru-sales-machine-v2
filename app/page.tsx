import Link from "next/link";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";
import { RUNBOOKS } from "@/lib/runbooks";

export default function HomePage() {
  return (
    <div className="grid cols2">
      <div className="card">
        <div className="badge">Programmatic SEO • Runbooks • Templates</div>
        <h1>Fix what blocks growth.<br/>In hours, not quarters.</h1>
        <p>
          A friction-light funnel: do a free check, get a targeted runbook, buy instant access, ship fixes,
          and re-check for a shareable badge.
        </p>
        <div className="row" style={{ marginTop: 14 }}>
          <Link className="btn primary" href="/check">Run the Free Check</Link>
          <Link className="btn" href="/pricing">See Pricing</Link>
        </div>
        <div className="hr" />
        <div className="grid">
          <div>
            <div style={{ fontWeight: 700 }}>Popular runbooks</div>
            <div style={{ marginTop: 8 }} className="grid">
              {RUNBOOKS.slice(0, 3).map(r => (
                <Link key={r.slug} href={`/runbooks/${r.slug}`} className="card" style={{ padding: 14 }}>
                  <div style={{ fontWeight: 700 }}>{r.title}</div>
                  <div style={{ color: "var(--muted)" }}>{r.summary}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid">
        <TrustBar />
        <Testimonials />
      </div>
    </div>
  );
}
