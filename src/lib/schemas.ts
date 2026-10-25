export function generateWebApplicationSchema(options?: {
  name?: string;
  description?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": options?.name || "IP Bulucu - IP Adresim ve Konum Sorgulama",
    "url": options?.url || "https://ipbulucu.org",
    "description":
      options?.description ||
      "Genel IP adresi, kaynak bilgisiyle yaklaşık konum, Whois, DNS ve ağ araçları.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TRY",
    },
    "provider": {
      "@type": "Organization",
      "name": "ipbulucu.org",
      "url": "https://ipbulucu.org",
      "logo": "https://ipbulucu.org/icon.svg",
      "sameAs": [
        "https://chromewebstore.google.com/detail/ip-bulucu-anl%c4%b1k-ip-konum/nifmmckmhnfjmpjfakhkifbeegdnanpb",
        "https://github.com/codeonthetable/ipbulucu.org",
        "https://www.npmjs.com/package/ipbulucu",
        "https://pypi.org/project/ipbulucu/"
      ],
    },
    "sameAs": [
      "https://chromewebstore.google.com/detail/ip-bulucu-anl%c4%b1k-ip-konum/nifmmckmhnfjmpjfakhkifbeegdnanpb",
      "https://github.com/codeonthetable/ipbulucu.org",
      "https://www.npmjs.com/package/ipbulucu",
      "https://pypi.org/project/ipbulucu/"
    ],
    "featureList": [
      "Genel IPv4 veya IPv6 adresi sorgulama",
      "Kaynak bilgisiyle yaklaşık coğrafi konum",
      "İnternet Servis Sağlayıcı (ISP) ve ASN Bilgisi",
      "Whois ve DNS Kayıtları Sorgulayıcı",
      "Açık Port ve Kara Liste Kontrolü",
    ],
  };
}

export function generateFaqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http")
        ? item.url
        : `https://ipbulucu.org${item.url}`,
    })),
  };
}
