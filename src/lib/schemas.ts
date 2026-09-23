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
      "Google uyumlu ultra hızlı IP adresi sorgulama, coğrafi konum tespiti, Whois, DNS ve açık port kontrolü aracı.",
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
    },
    "featureList": [
      "Anında IPv4 ve IPv6 Tespiti",
      "Gerçek Zamanlı Coğrafi Konum (İl, İlçe, Koordinat)",
      "İnternet Servis Sağlayıcı (ISP) ve ASN Bilgisi",
      "VPN, Proxy ve Tor Güvenlik Taraması",
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
