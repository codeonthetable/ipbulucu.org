export type Locale = "tr" | "en";

export const ROUTE_MAP: Record<string, { tr: string; en: string }> = {
  home: { tr: "/", en: "/en" },
  tools: { tr: "/araclar", en: "/en/tools" },
  whois: { tr: "/whois", en: "/en/whois" },
  dns: { tr: "/dns-sorgulama", en: "/en/dns-lookup" },
  port: { tr: "/port-kontrolu", en: "/en/port-scanner" },
  ssl: { tr: "/ssl-kontrolu", en: "/en/ssl-checker" },
  emailSecurity: { tr: "/eposta-guvenlik-kontrolu", en: "/en/email-security" },
  headers: { tr: "/header-kontrolu", en: "/en/http-headers" },
  blacklist: { tr: "/karaliste-kontrolu", en: "/en/blacklist-check" },
  propagation: { tr: "/dns-yayilma-kontrolu", en: "/en/dns-propagation" },
  subnet: { tr: "/subnet-hesaplayici", en: "/en/subnet-calculator" },
  webrtc: { tr: "/webrtc-sizinti-testi", en: "/en/webrtc-leak-test" },
  hash: { tr: "/hash-olusturucu", en: "/en/hash-generator" },
  tracker: { tr: "/ip-takip", en: "/en/ip-tracker" },
  apiDocs: { tr: "/api-dokumantasyon", en: "/en/api-docs" },
  privacy: { tr: "/gizlilik-politikasi", en: "/en/privacy-policy" },
};

export function getOppositeRoute(pathname: string): { locale: Locale; path: string } {
  pathname = pathname.replace(/\/+$/, "") || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const targetLocale: Locale = isEn ? "tr" : "en";

  for (const key of Object.keys(ROUTE_MAP)) {
    const route = ROUTE_MAP[key];
    if (isEn && pathname === route.en) {
      return { locale: "tr", path: route.tr };
    }
    if (!isEn && pathname === route.tr) {
      return { locale: "en", path: route.en };
    }
  }

  // Default fallbacks
  return {
    locale: targetLocale,
    path: targetLocale === "en" ? "/en" : "/",
  };
}
