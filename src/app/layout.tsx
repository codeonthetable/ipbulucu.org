import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateWebApplicationSchema } from "@/lib/schemas";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "IP Bulucu - IP Adresim Nedir? | IP, DNS ve Ağ Araçları",
  description:
    "IP adresinizi, coğrafi konumunuzu, ISP operatörünüzü, DNS, Whois ve açık port durumunu anında öğrenin. Yaklaşık konum ve kaynak bilgisiyle IP sorgulama araçları.",
  keywords: [
    "ip bulucu",
    "ip adresim",
    "ip sorgulama",
    "ip adresi bulma",
    "ip konum bulma",
    "what is my ip",
    "whois sorgulama",
    "dns sorgulama",
    "port kontrolü",
    "cgnat sorgulama",
  ],
  authors: [{ name: "IPBulucu.org", url: "https://ipbulucu.org" }],
  creator: "IPBulucu.org",
  publisher: "IPBulucu.org",
  metadataBase: new URL("https://ipbulucu.org"),
  openGraph: {
    title: "IP Bulucu - IP Adresim Nedir? | Yaklaşık Konum ve ISP",
    description:
      "Genel IP adresinizi ve sağlayıcının sunduğu yaklaşık konum, ISP ve ASN bilgilerini görün. DNS ve Whois araçlarını kullanın.",
    url: "https://ipbulucu.org",
    siteName: "IPBulucu.org",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IP Bulucu - IP Adresim ve Ağ Analizi",
    description: "Genel IP adresi, yaklaşık konum, Whois, DNS ve port sorgulama.",
  },
  verification: {
    google: "5uzyQvk8kIHY8WbJP-0RpK_HTb4z-hIZ2OimS2weZ38",
  },
  other: {
    "google-site-verification": "5uzyQvk8kIHY8WbJP-0RpK_HTb4z-hIZ2OimS2weZ38",
    "geo.region": "TR",
    "geo.placename": "Turkiye",
    "geo.position": "39.0;35.0",
    "ICBM": "39.0, 35.0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const webAppSchema = JSON.stringify(generateWebApplicationSchema());

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: webAppSchema }}
        />
        {/* Production-only analytics; keep campaign labels, omit lookup inputs. */}
        <script dangerouslySetInnerHTML={{__html: `
          if (['ipbulucu.org','www.ipbulucu.org'].includes(location.hostname)) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);};
            var cleanPage = new URL(location.origin + location.pathname);
            var campaign = new URLSearchParams(location.search);
            ['utm_source','utm_medium','utm_campaign','utm_content'].forEach(function(key){
              var value=campaign.get(key); if(value && /^[a-z0-9_-]{1,64}$/i.test(value)) cleanPage.searchParams.set(key,value);
            });
            gtag('js', new Date());
            gtag('config', 'G-WYQCJWTWHF', {page_location: cleanPage.href, page_referrer: document.referrer.split('?')[0].split('#')[0], allow_google_signals: false, allow_ad_personalization_signals: false});
            var tag=document.createElement('script'); tag.async=true; tag.src='https://www.googletagmanager.com/gtag/js?id=G-WYQCJWTWHF'; document.head.appendChild(tag);
          }
        `}} />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
