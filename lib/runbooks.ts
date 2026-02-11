export type Runbook = {
  slug: string;
  title: string;
  summary: string;
  quickFix: string[];
  fullSteps: string[];
  tags: string[];
};

export const RUNBOOKS: Runbook[] = [
  {
    slug: "core-web-vitals-triage",
    title: "Core Web Vitals Triage (LCP/INP/CLS)",
    summary: "A practical runbook to move CWV scores without rewriting your entire stack.",
    quickFix: [
      "Enable HTTP caching + immutable assets",
      "Inline critical CSS for above-the-fold",
      "Defer third-party scripts (tag manager last)"
    ],
    fullSteps: [
      "Measure (field + lab): CrUX + Lighthouse, log your baseline.",
      "Fix LCP: compress hero image, preload it, reduce render-blocking.",
      "Fix INP: split bundles, remove long tasks, debounce handlers.",
      "Fix CLS: set explicit sizes, reserve slots for embeds/ads, avoid layout shifts.",
      "Verify with field data window (7–28 days) and keep lab checks daily.",
      "Add performance budgets in CI.",
      "Re-check and export a shareable badge."
    ],
    tags: ["performance", "seo"]
  },
  {
    slug: "indexing-failures",
    title: "Indexing Failures: Why Google Won't Index Your Pages",
    summary: "Diagnose canonical, sitemap, and duplication issues quickly.",
    quickFix: [
      "Ensure canonical URL is consistent (https + www or non-www)",
      "Submit sitemap and ensure it only contains 200 pages",
      "Fix thin/duplicate pages: merge or noindex"
    ],
    fullSteps: [
      "Verify canonical + redirects align with your preferred domain.",
      "Check robots.txt and meta robots directives.",
      "Validate sitemap: 200 status only, lastmod updated, <50k URLs per file.",
      "Fix soft-404 and thin pages: consolidate content or noindex.",
      "Remove parameter duplicates; set canonical or block in Search Console parameters.",
      "Add internal links from strong pages to weak pages.",
      "Request indexing and monitor coverage."
    ],
    tags: ["seo"]
  },
  {
    slug: "security-headers-baseline",
    title: "Security Headers Baseline (CSP, HSTS, etc.)",
    summary: "A safe minimum set of headers for modern web apps without breaking everything.",
    quickFix: [
      "Enable HSTS on your apex domain",
      "Set X-Content-Type-Options: nosniff",
      "Add a basic Content-Security-Policy and iterate"
    ],
    fullSteps: [
      "Inventory third-party domains used by your app.",
      "Enable HSTS with an initial low max-age, then raise it.",
      "Add CSP in Report-Only mode first; capture violations.",
      "Lock down framing with frame-ancestors.",
      "Set Referrer-Policy and Permissions-Policy.",
      "Re-test with security scanners and fix regressions.",
      "Publish a security baseline policy to reduce team drift."
    ],
    tags: ["security"]
  }
];

export function getRunbook(slug: string) {
  return RUNBOOKS.find(r => r.slug === slug) || null;
}
