import { getSiteUrl } from "@/lib/origin";

export default function robots() {
  const site = getSiteUrl();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site}/sitemap.xml`,
  };
}
