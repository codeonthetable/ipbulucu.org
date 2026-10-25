import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz IP Sorgulama API Dokümantasyonu (JSON, cURL, Python, Node.js)",
  description: "IP ve yaklaşık konum API’si için çalışan Node.js, Python ve cURL örnekleri. JSON yanıtları, hata yönetimi, kullanım sınırları ve OpenAPI şeması.",
  alternates: {
    canonical: "https://ipbulucu.org/api-dokumantasyon/",
  },
  openGraph: {
    title: "Ücretsiz IP Sorgulama API Dokümantasyonu (JSON, cURL, Python, Node.js)",
    description: "IP ve yaklaşık konum API’si için çalışan Node.js, Python ve cURL örnekleri. JSON yanıtları, hata yönetimi, kullanım sınırları ve OpenAPI şeması.",
    url: "https://ipbulucu.org/api-dokumantasyon/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
