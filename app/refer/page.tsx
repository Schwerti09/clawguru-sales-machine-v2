"use client";

import { useEffect, useMemo, useState } from "react";

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function ReferPage() {
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const existing = localStorage.getItem("ref_code_local");
    if (existing) setCode(existing);
    else {
      const c = makeCode();
      localStorage.setItem("ref_code_local", c);
      setCode(c);
    }
  }, []);

  const link = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return origin ? `${origin}/pricing?ref=${code}` : "";
  }, [code]);

  async function copy() {
    await navigator.clipboard.writeText(link);
    alert("Copied referral link.");
  }

  return (
    <div className="grid cols2">
      <div className="card">
        <div className="badge">Give 20% • Get 20%</div>
        <h1>Referral link</h1>
        <p>Share your link. Your friend gets a discount. You get credit. Everybody wins, including the heat death of the universe.</p>

        <div className="hr" />
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Your link</div>
        <input value={link} readOnly />
        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn primary" onClick={copy}>Copy</button>
          <a className="btn" href="/pricing">Back to pricing</a>
        </div>
      </div>

      <div className="card">
        <h2>How it works</h2>
        <ol style={{ color: "var(--muted)", paddingLeft: 18 }}>
          <li style={{ margin: "10px 0" }}>You share the link.</li>
          <li style={{ margin: "10px 0" }}>They buy with discount.</li>
          <li style={{ margin: "10px 0" }}>You get credit (implement coupon logic in Stripe).</li>
        </ol>
        <div className="hr" />
        <p style={{ fontSize: 13 }}>
          This template stores a local ref code and passes it via URL. Add Stripe coupon application inside checkout API.
        </p>
      </div>
    </div>
  );
}
