import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DNS Sorgulama - A, AAAA, MX, TXT, NS ve CNAME Kayıtları Çözümleyici",
  description: "Domain DNS kayıtlarını (A, MX, TXT, SPF, DMARC, NS, SOA) gerçek zamanlı sorgulayın ve sunucu yapılandırmasını kontrol edin.",
  alternates: {
    canonical: "https://ipbulucu.org/dns-sorgulama/",
  },
  openGraph: {
    title: "DNS Sorgulama - A, AAAA, MX, TXT, NS ve CNAME Kayıtları Çözümleyici",
    description: "Domain DNS kayıtlarını (A, MX, TXT, SPF, DMARC, NS, SOA) gerçek zamanlı sorgulayın ve sunucu yapılandırmasını kontrol edin.",
    url: "https://ipbulucu.org/dns-sorgulama/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
