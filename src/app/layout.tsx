import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
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
  title: "IP Bulucu - IP Adresim Nedir? | Ultra Hızlı Konum ve Ağ Sorgulama",
  description:
    "IP adresinizi, coğrafi konumunuzu, ISP operatörünüzü, DNS, Whois ve açık port durumunu anında öğrenin. Google uyumlu, güvenli ve 0ms gecikmeli IP sorgulama platformu.",
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
  alternates: {
    canonical: "https://ipbulucu.org",
  },
  openGraph: {
    title: "IP Bulucu - IP Adresim Nedir? | Canlı Konum ve ISP Tespiti",
    description:
      "Dış IP adresinizi, bağlı olduğunuz ili, santrali, ISS operatörünüzü ve ağ güvenliğinizi saniyeler içinde öğrenin.",
    url: "https://ipbulucu.org",
    siteName: "IPBulucu.org",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IP Bulucu - IP Adresim ve Ağ Analizi",
    description: "Ultra hızlı IP adresi tespiti, Whois, DNS ve Port sorgulama.",
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
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: webAppSchema }}
        />
        {/* Google Analytics (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WYQCJWTWHF"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WYQCJWTWHF');
            `,
          }}
        />
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
