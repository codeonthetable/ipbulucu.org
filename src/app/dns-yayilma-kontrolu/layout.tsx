import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DNS Yayılma Kontrolü - Google ve Cloudflare Karşılaştırması",
  description: "DNS kayıtlarını Google ve Cloudflare üzerinden sorgulayın. İki sağlayıcının gerçek yanıtlarını ve sunucudan ölçülen sorgu sürelerini karşılaştırın.",
  alternates: {
    canonical: "https://ipbulucu.org/dns-yayilma-kontrolu/",
  },
  openGraph: {
    title: "DNS Yayılma Kontrolü - Google ve Cloudflare Karşılaştırması",
    description: "DNS kayıtlarını Google ve Cloudflare üzerinden sorgulayın. İki sağlayıcının gerçek yanıtlarını ve sunucudan ölçülen sorgu sürelerini karşılaştırın.",
    url: "https://ipbulucu.org/dns-yayilma-kontrolu/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
