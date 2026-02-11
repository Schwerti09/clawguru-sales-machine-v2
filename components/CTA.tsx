"use client";

import { useState } from "react";

type Props = {
  href?: string;
  action?: () => Promise<void> | void;
  label: string;
  kind?: "primary" | "default";
};

export function CTA({ href, action, label, kind = "primary" }: Props) {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    if (action) {
      try {
        setLoading(true);
        await action();
      } finally {
        setLoading(false);
      }
    }
  }

  const className = kind === "primary" ? "btn primary" : "btn";

  if (href) {
    return <a className={className} href={href}>{loading ? "…" : label}</a>;
  }

  return (
    <button className={className} onClick={onClick} disabled={loading}>
      {loading ? "…" : label}
    </button>
  );
}
