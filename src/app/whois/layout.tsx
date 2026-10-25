import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whois Sorgulama - Domain ve IP Sahibi Öğrenme (.tr TRABİS Uyumlu)",
  description: "Herhangi bir alan adının (domain) veya IP adresinin kime ait olduğunu, kayıt ve bitiş tarihlerini, registrar ve DNS sunucularını anında sorgulayın.",
  alternates: {
    canonical: "https://ipbulucu.org/whois/",
  },
  openGraph: {
    title: "Whois Sorgulama - Domain ve IP Sahibi Öğrenme (.tr TRABİS Uyumlu)",
    description: "Herhangi bir alan adının (domain) veya IP adresinin kime ait olduğunu, kayıt ve bitiş tarihlerini, registrar ve DNS sunucularını anında sorgulayın.",
    url: "https://ipbulucu.org/whois/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
