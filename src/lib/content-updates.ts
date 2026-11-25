// 2026-11-18: MCP integration and installable archive verified live on both API guides.
// 2026-11-17: Android/iOS DNS and recovery flows verified live on9 operator pages.
// Dates of verified, significant production content updates, not build dates.
// 2026-11-04: PR #12, deployed 13:14:50Z; new WAN comparison, TCP purpose
// selection, mail troubleshooting, and SDK archive installation guidance.
// Add/update a route only after its content release is verified live. Leave
// unknown dates absent; rebuilding or changing sitemap metadata is not an update.
// 2026-11-14 Europe/Istanbul: 13 DNS/port/blacklist pages verified live
// at 2026-11-13T21:51:44Z; API documentation retains its previous date.
export const PUBLISHED_CONTENT_DATES: Readonly<Record<string, string>> = {
  "/": "2026-11-25",
  "/ip-ile-konum-bulma-nasil-yapilir/": "2026-11-25",
  "/ip-tespit-etme/": "2026-11-25",
  "/ip-sorgulama/": "2026-11-25",
  "/ip-den-adres-bulma/": "2026-11-25",
  "/isp/turk-telekom/": "2026-11-17",
  "/isp/turkcell-superonline/": "2026-11-17",
  "/isp/turknet/": "2026-11-17",
  "/isp/vodafone-net/": "2026-11-17",
  "/isp/millenicom/": "2026-11-17",
  "/isp/netspeed/": "2026-11-17",
  "/isp/gibibirnet/": "2026-11-17",
  "/isp/turksat-kablonet/": "2026-11-17",
  "/isp/atlantisnet/": "2026-11-17",
  "/port-kontrolu/": "2026-11-14",
  "/en/port-scanner/": "2026-11-14",
  "/karaliste-kontrolu/": "2026-11-14",
  "/en/blacklist-check/": "2026-11-14",
  "/api-dokumantasyon/": "2026-11-18",
  "/en/api-docs/": "2026-11-18",
};
