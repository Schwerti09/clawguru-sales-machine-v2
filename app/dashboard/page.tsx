import Link from "next/link";
import { cookies } from "next/headers";
import { accessCookieName, verify } from "@/lib/access";
import { RUNBOOKS } from "@/lib/runbooks";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const token = cookies().get(accessCookieName())?.value;
  const access = token ? verify(token) : null;

  if (!access) {
    return (
      <div className="card">
        <div className="badge">Gated</div>
        <h1>Dashboard locked</h1>
        <p>Access unlocks after purchase (or if you’re returning to the same browser).</p>
        <div className="row">
          <Link className="btn primary" href="/pricing">Unlock access</Link>
          <Link className="btn" href="/check">Free check</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid cols2">
      <div className="card">
        <div className="badge">Access: {access.plan.toUpperCase()}</div>
        <h1>Ship the next win.</h1>
        <p>Your 7-minute checklist. Keep it boring. Results love boring.</p>
        <div className="hr" />
        <ol style={{ color: "var(--muted)", paddingLeft: 18 }}>
          <li style={{ margin: "10px 0" }}>Run /check and write down the top 3 issues.</li>
          <li style={{ margin: "10px 0" }}>Pick one runbook and apply all steps.</li>
          <li style={{ margin: "10px 0" }}>Re-check and export a badge screenshot to share.</li>
        </ol>
        <div className="hr" />
        <div className="row">
          <Link className="btn primary" href="/check">Re-check</Link>
          <Link className="btn" href="/refer">Referral</Link>
          <Link className="btn" href="/offers">Offers</Link>
        </div>
      </div>

      <div className="card">
        <h2>Your runbooks</h2>
        <p>Start with the highest leverage bottleneck.</p>
        <div className="hr" />
        <div className="grid">
          {RUNBOOKS.map(r => (
            <Link key={r.slug} href={`/runbooks/${r.slug}`} className="card" style={{ padding: 14 }}>
              <div style={{ fontWeight: 700 }}>{r.title}</div>
              <div style={{ color: "var(--muted)" }}>{r.summary}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
