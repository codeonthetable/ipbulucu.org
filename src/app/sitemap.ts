import { MetadataRoute } from "next";
import { CITIES_DATA, ISPS_DATA, ASNS_DATA } from "@/lib/seo-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ipbulucu.org";

  // 1. Static Turkish Core & Tool Pages
  const turkishRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/araclar`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/dns-yayilma-kontrolu`,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/whois`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dns-sorgulama`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/port-kontrolu`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ssl-kontrolu`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/header-kontrolu`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/eposta-guvenlik-kontrolu`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/karaliste-kontrolu`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/subnet-hesaplayici`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/webrtc-sizinti-testi`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ip-takip`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/api-dokumantasyon`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cgnat-nedir-nasil-anlasilir`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/statik-ip-dinamik-ip-farklari`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/turkiye-dns-sunuculari`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ip-ile-konum-bulma-nasil-yapilir`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ip-sorgulama`,
      changeFrequency: "daily",
      priority: 0.98,
    },
    {
      url: `${baseUrl}/ip-den-adres-bulma`,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/karsi-tarafin-ip-adresini-bulma`,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ip-tespit-etme`,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/oyunlarda-ping-dusurme-yollari`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hash-olusturucu`,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // 2. Static English Core & Tool Pages
  const englishRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/tools`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/en/whois`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/dns-lookup`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/port-scanner`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/ssl-checker`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/en/email-security`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/en/http-headers`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/en/blacklist-check`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/en/dns-propagation`,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/en/subnet-calculator`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/webrtc-leak-test`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/hash-generator`,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/en/ip-tracker`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/api-docs`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 3. City Programmatic SEO Pages
  const cityRoutes: MetadataRoute.Sitemap = CITIES_DATA.map((city) => ({
    url: `${baseUrl}/sehir/${city.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 4. ISP Programmatic SEO Pages
  const ispRoutes: MetadataRoute.Sitemap = ISPS_DATA.map((isp) => ({
    url: `${baseUrl}/isp/${isp.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 5. ASN Programmatic SEO Pages
  const asnRoutes: MetadataRoute.Sitemap = ASNS_DATA.map((asn) => ({
    url: `${baseUrl}/asn/${asn.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const allRoutes = [...turkishRoutes, ...englishRoutes, ...cityRoutes, ...ispRoutes, ...asnRoutes];
  return allRoutes.map((route) => ({
    ...route,
    url: route.url.endsWith("/") ? route.url : `${route.url}/`,
  }));
}
