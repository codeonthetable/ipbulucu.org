import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTTP Header Kontrolü - Sunucu Yanıt ve Güvenlik Başlıkları Testi",
  description: "Web sitelerinin HTTP durum kodlarını, HSTS, CSP, X-Frame-Options gibi güvenlik başlıklarını ve sunucu yanıt detaylarını inceleyin.",
  alternates: {
    canonical: "https://ipbulucu.org/header-kontrolu/",
  },
  openGraph: {
    title: "HTTP Header Kontrolü - Sunucu Yanıt ve Güvenlik Başlıkları Testi",
    description: "Web sitelerinin HTTP durum kodlarını, HSTS, CSP, X-Frame-Options gibi güvenlik başlıklarını ve sunucu yanıt detaylarını inceleyin.",
    url: "https://ipbulucu.org/header-kontrolu/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
