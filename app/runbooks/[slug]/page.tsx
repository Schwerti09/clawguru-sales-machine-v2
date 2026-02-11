import Link from "next/link";
import { getRunbook, RUNBOOKS } from "@/lib/runbooks";
import { cookies } from "next/headers";
import { accessCookieName, verify } from "@/lib/access";

export function generateStaticParams() {
  return RUNBOOKS.map(r => ({ slug: r.slug }));
}

export default function RunbookPage({ params }: { params: { slug: string } }) {
  const runbook = getRunbook(params.slug);
  if (!runbook) {
    return (
      <div className="card">
        <h2>Not found</h2>
        <p>This runbook doesn’t exist.</p>
        <Link className="btn" href="/">Back</Link>
      </div>
    );
  }

  const token = cookies().get(accessCookieName())?.value;
  const access = token ? verify(token) : null;

  return (
    <div className="grid cols2">
      <div className="card">
        <div className="badge">{runbook.tags.join(" • ")}</div>
        <h1>{runbook.title}</h1>
        <p>{runbook.summary}</p>

        <div className="hr" />
        <h2>Quick fix (free)</h2>
        <ul style={{ color: "var(--muted)" }}>
          {runbook.quickFix.map(s => <li key={s} style={{ margin: "8px 0" }}>{s}</li>)}
        </ul>

        <div className="hr" />
        <h2>Full runbook</h2>

        {access ? (
          <ol style={{ color: "var(--muted)", paddingLeft: 18 }}>
            {runbook.fullSteps.map(s => <li key={s} style={{ margin: "10px 0" }}>{s}</li>)}
          </ol>
        ) : (
          <div style={{ border: "1px solid var(--border)", borderRadius: 16, padding: 14 }}>
            <div style={{ fontWeight: 750 }}>Unlock the full 7-step playbook + templates</div>
            <p style={{ marginTop: 6 }}>
              You’re seeing the free teaser. Get the complete runbook, deep checks, and downloads.
            </p>
            <div className="row">
              <Link className="btn primary" href="/pricing">Unlock access</Link>
              <Link className="btn" href="/check">Run the check</Link>
            </div>
          </div>
        )}

        <div className="hr" />
        <div className="row">
          <Link className="btn" href="/offers">Recommended tools</Link>
          <Link className="btn" href="/refer">Referral</Link>
          <Link className="btn primary" href="/dashboard">Go to dashboard</Link>
        </div>
      </div>

      <div className="card">
        <h2>Related runbooks</h2>
        <p>Internal links keep users moving (and search engines happy).</p>
        <div className="hr" />
        <div className="grid">
          {RUNBOOKS.filter(r => r.slug !== runbook.slug).map(r => (
            <Link key={r.slug} href={`/runbooks/${r.slug}`} className="card" style={{ padding: 14 }}>
              <div style={{ fontWeight: 700 }}>{r.title}</div>
              <div style={{ color: "var(--muted)" }}>{r.summary}</div>
            </Link>
          ))}
        </div>
        <div className="hr" />
        <div className="badge">PSEO tip: expand RUNBOOKS and generate hundreds of slugs.</div>
      </div>
    </div>
  );
}
