export function getSiteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env && env.startsWith("http")) return env.replace(/\/$/, "");
  // Fallback: Vercel / Netlify runtime
  const vercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  const netlify = process.env.URL || "";
  const url = vercel || netlify || "http://localhost:3000";
  return url.replace(/\/$/, "");
}
