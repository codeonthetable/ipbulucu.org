// Dates of verified, significant production content updates, not build dates.
// 2026-11-04: PR #12, deployed 13:14:50Z; new WAN comparison, TCP purpose
// selection, mail troubleshooting, and SDK archive installation guidance.
// Add/update a route only after its content release is verified live. Leave
// unknown dates absent; rebuilding or changing sitemap metadata is not an update.
export const PUBLISHED_CONTENT_DATES: Readonly<Record<string, string>> = {
  "/isp/turk-telekom/": "2026-11-04",
  "/isp/turkcell-superonline/": "2026-11-04",
  "/isp/turknet/": "2026-11-04",
  "/isp/vodafone-net/": "2026-11-04",
  "/isp/millenicom/": "2026-11-04",
  "/isp/netspeed/": "2026-11-04",
  "/isp/gibibirnet/": "2026-11-04",
  "/isp/turksat-kablonet/": "2026-11-04",
  "/isp/atlantisnet/": "2026-11-04",
  "/port-kontrolu/": "2026-11-04",
  "/en/port-scanner/": "2026-11-04",
  "/karaliste-kontrolu/": "2026-11-04",
  "/en/blacklist-check/": "2026-11-04",
  "/api-dokumantasyon/": "2026-11-04",
  "/en/api-docs/": "2026-11-04",
};
