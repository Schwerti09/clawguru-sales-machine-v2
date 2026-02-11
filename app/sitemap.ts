import { getSiteUrl } from "@/lib/origin";
import { RUNBOOKS } from "@/lib/runbooks";

export default function sitemap() {
  const site = getSiteUrl();
  const now = new Date().toISOString();
  return [
    { url: `${site}/`, lastModified: now },
    { url: `${site}/check`, lastModified: now },
    { url: `${site}/pricing`, lastModified: now },
    { url: `${site}/offers`, lastModified: now },
    { url: `${site}/refer`, lastModified: now },
    { url: `${site}/downloads`, lastModified: now },
    ...RUNBOOKS.map(r => ({ url: `${site}/runbooks/${r.slug}`, lastModified: now })),
  ];
}
