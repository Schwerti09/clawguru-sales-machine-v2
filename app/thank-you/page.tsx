"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function ThankYouPage() {
  const [status, setStatus] = useState<"idle"|"activating"|"active"|"error">("idle");
  const [message, setMessage] = useState<string>("");

  const sessionId = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("session_id") || "";
  }, []);

  async function activate() {
    if (!sessionId) {
      setStatus("error");
      setMessage("Missing session_id in URL. Please return from Stripe checkout.");
      return;
    }
    setStatus("activating");
    setMessage("");
    const res = await fetch(`/api/access/activate?session_id=${encodeURIComponent(sessionId)}`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("error");
      setMessage(data?.error || "Activation failed.");
      return;
    }
    setStatus("active");
  }

  async function upsell() {
    const res = await fetch("/api/stripe/checkout-upsell", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || "Upsell checkout failed.");
      return;
    }
    window.location.href = data.url;
  }

  useEffect(() => {
    // Auto activate on load (reduces friction)
    if (sessionId) activate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <div className="grid cols2">
      <div className="card">
        <div className="badge">Payment received</div>
        <h1>You’re in.</h1>
        <p>
          Access activates automatically after Stripe verifies payment.
          No account. No password.
        </p>

        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn primary" onClick={activate} disabled={status === "activating" || status === "active"}>
            {status === "active" ? "Access active ✓" : status === "activating" ? "Activating…" : "Activate access"}
          </button>
          <Link className="btn" href="/dashboard">Go to dashboard</Link>
          <Link className="btn" href="/downloads">Downloads</Link>
        </div>

        {message ? <p style={{ color: "#ff8fa3" }}>{message}</p> : null}

        <div className="hr" />
        <h2>Optional add-on</h2>
        <p>Incident Kit: templates + checklists to ship fixes faster. One-time purchase.</p>
        <div className="row">
          <button className="btn" onClick={upsell}>Add Incident Kit</button>
          <Link className="btn" href="/offers">Tool offers</Link>
        </div>
      </div>

      <div className="card">
        <h2>Next level (conversion)</h2>
        <ol style={{ color: "var(--muted)", paddingLeft: 18 }}>
          <li style={{ margin: "10px 0" }}><b>3 case studies</b> on homepage (before/after screenshots).</li>
          <li style={{ margin: "10px 0" }}><b>Order bump</b> (Incident Kit) already wired.</li>
          <li style={{ margin: "10px 0" }}><b>Downloads</b> page reduces “where is my product?” tickets.</li>
          <li style={{ margin: "10px 0" }}><b>Referral</b> link turns buyers into traffic sources.</li>
        </ol>
        <div className="hr" />
        <Link className="btn primary" href="/refer">Get your referral link</Link>
      </div>
    </div>
  );
}
