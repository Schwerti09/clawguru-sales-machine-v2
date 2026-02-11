import Link from "next/link";
import { cookies } from "next/headers";
import { accessCookieName, verify } from "@/lib/access";
import { DOWNLOADS } from "@/lib/downloads";

export const dynamic = "force-dynamic";

export default function DownloadsPage() {
  const token = cookies().get(accessCookieName())?.value;
  const access = token ? verify(token) : null;

  if (!access) {
    return (
      <div className="card">
        <div className="badge">Gated</div>
        <h1>Downloads locked</h1>
        <p>Purchase to get the full pack, then return here anytime on the same device.</p>
        <div className="row">
          <Link className="btn primary" href="/pricing">Unlock access</Link>
          <Link className="btn" href="/check">Free check</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="badge">Access: {access.plan.toUpperCase()}</div>
      <h1>Your downloads</h1>
      <p>Direct delivery after payment, plus a safe place to grab your files again.</p>
      <div className="hr" />

      <div className="grid">
        {DOWNLOADS.map((d) => (
          <div key={d.id} style={{ border: "1px solid var(--border)", borderRadius: 16, padding: 14 }}>
            <div style={{ fontWeight: 800 }}>{d.name}</div>
            <div style={{ color: "var(--muted)", marginTop: 6 }}>{d.description}</div>
            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn primary" href={`/api/download?id=${encodeURIComponent(d.id)}`}>Download</a>
              <Link className="btn" href="/dashboard">Back to dashboard</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="hr" />
      <p style={{ fontSize: 13, color: "var(--muted)" }}>
        Note: This template serves files from /public via a gated API redirect.
        For stronger protection, move files to private storage (S3) and generate short‑lived signed URLs.
      </p>
    </div>
  );
}
