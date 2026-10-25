import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz IP Sorgulama API Dokümantasyonu (JSON, cURL, Python, Node.js)",
  description: "Geliştiriciler için kayıt ve API anahtarı gerektirmeyen ultra hızlı Türkçe IP Geolocation, ASN, ISP ve CGNAT sorgulama REST API kılavuzu.",
  alternates: {
    canonical: "https://ipbulucu.org/api-dokumantasyon/",
  },
  openGraph: {
    title: "Ücretsiz IP Sorgulama API Dokümantasyonu (JSON, cURL, Python, Node.js)",
    description: "Geliştiriciler için kayıt ve API anahtarı gerektirmeyen ultra hızlı Türkçe IP Geolocation, ASN, ISP ve CGNAT sorgulama REST API kılavuzu.",
    url: "https://ipbulucu.org/api-dokumantasyon/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
