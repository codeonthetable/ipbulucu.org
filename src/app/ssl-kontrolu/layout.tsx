import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSL Sertifikası Sorgulama & Güvenlik Kontrolü Aracı",
  description: "Web sitenizin SSL/TLS sertifikasının geçerlilik süresini, zincir doğrulamasını, şifreleme algoritmasını ve bitiş tarihini anında kontrol edin.",
  alternates: {
    canonical: "https://ipbulucu.org/ssl-kontrolu/",
  },
  openGraph: {
    title: "SSL Sertifikası Sorgulama & Güvenlik Kontrolü Aracı",
    description: "Web sitenizin SSL/TLS sertifikasının geçerlilik süresini, zincir doğrulamasını, şifreleme algoritmasını ve bitiş tarihini anında kontrol edin.",
    url: "https://ipbulucu.org/ssl-kontrolu/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
