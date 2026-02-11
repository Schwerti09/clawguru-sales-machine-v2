"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function scoreUrl(u: string) {
  // Simple heuristic: shorter + https + no query = slightly better. (Clearly not a deep scan.)
  const len = u.length;
  const https = u.startsWith("https://") ? 8 : 0;
  const q = u.includes("?") ? -8 : 0;
  const base = 55 + https + q + (len < 35 ? 8 : len < 70 ? 2 : -6);
  const jitter = Math.floor(Math.random() * 10) - 4;
  return clamp(base + jitter, 12, 92);
}

export default function CheckPage() {
  const [url, setUrl] = useState("https://example.com");
  const [ran, setRan] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const topFixes = useMemo(() => {
    const s = score ?? 0;
    if (s >= 75) return [
      "Great baseline. Tighten internal linking to your top money pages.",
      "Make sure your sitemap contains only canonical 200 pages.",
      "Add performance budgets so this doesn’t regress."
    ];
    if (s >= 50) return [
      "Fix Core Web Vitals: LCP + INP typically move the needle fastest.",
      "Clean up indexing: canonicals + sitemap hygiene.",
      "Reduce third-party script cost (tag manager last)."
    ];
    return [
      "Canonical + redirect alignment (https + preferred host).",
      "Remove thin/duplicate pages (merge or noindex).",
      "Fix basic headers + caching to stabilize performance."
    ];
  }, [score]);

  return (
    <div className="grid cols2">
      <div className="card">
        <div className="badge">Free quick check (client-side)</div>
        <h1>Get your first score in 30 seconds.</h1>
        <p>
          This is a fast heuristic check to point you at the right runbook.
          Deep scan (full fix list + templates) unlocks with Day Pass / Pro.
        </p>

        <label>Website URL</label>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://your-site.com" />

        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn primary" onClick={() => { setScore(scoreUrl(url)); setRan(true); }}>
            Run Check
          </button>
          <Link className="btn" href="/pricing">Unlock Deep Scan</Link>
        </div>

        {ran ? (
          <>
            <div className="hr" />
            <div className="kpi">
              <strong>{score}</strong>
              <div>
                <div style={{ fontWeight: 700 }}>Claw Score</div>
                <div style={{ color: "var(--muted)" }}>Top issues + recommended runbook</div>
              </div>
            </div>

            <div className="hr" />
            <div style={{ fontWeight: 700 }}>Top fixes (free)</div>
            <ul style={{ color: "var(--muted)" }}>
              {topFixes.map((f) => <li key={f} style={{ margin: "8px 0" }}>{f}</li>)}
            </ul>

            <div className="row" style={{ marginTop: 10 }}>
              <Link className="btn primary" href="/pricing">Get the full fix list</Link>
              <Link className="btn" href="/runbooks/core-web-vitals-triage">Read a runbook</Link>
            </div>
          </>
        ) : null}
      </div>

      <div className="card">
        <h2>How this turns into results</h2>
        <p>Check → get a targeted runbook → apply fixes → re-check → share badge.</p>
        <div className="hr" />
        <ol style={{ color: "var(--muted)", paddingLeft: 18 }}>
          <li style={{ margin: "10px 0" }}>Run the quick check to find your bottleneck.</li>
          <li style={{ margin: "10px 0" }}>Unlock deep scan to get the complete fix list + templates.</li>
          <li style={{ margin: "10px 0" }}>Ship fixes using copy/paste runbooks.</li>
          <li style={{ margin: "10px 0" }}>Re-check and share proof with your team.</li>
        </ol>
        <div className="hr" />
        <div className="badge">Tip: collect 3 real testimonials ASAP. They’re conversion steroids.</div>
      </div>
    </div>
  );
}
