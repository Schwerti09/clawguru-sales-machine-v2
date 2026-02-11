import Link from "next/link";

export function Nav() {
  return (
    <div className="nav">
      <div className="brand">
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: "linear-gradient(135deg, rgba(124,92,255,.95), rgba(0,209,255,.55))",
          display: "grid", placeItems: "center", fontWeight: 900
        }}>C</div>
        <div>
          <div style={{ lineHeight: 1 }}>ClawGuru</div>
          <div className="pill">Runbooks • Checks • Templates</div>
        </div>
      </div>
      <div className="row">
        <Link className="btn small" href="/check">Free Check</Link>
        <Link className="btn small" href="/pricing">Pricing</Link>
        <Link className="btn small" href="/downloads">Downloads</Link>
        <Link className="btn small" href="/offers">Offers</Link>
        <Link className="btn primary small" href="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}
