import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IP Kara Liste Sorgulama - DNSBL ve Kaynak Erişim Durumu",
  description: "SpamCop ve DroneBL sonuçlarını sorgulayın; Spamhaus ve Barracuda resmi kontrol bağlantılarına ulaşın. Doğrulanamayan kaynaklar açıkça gösterilir.",
  alternates: {
    canonical: "https://ipbulucu.org/karaliste-kontrolu/",
  },
  openGraph: {
    title: "IP Kara Liste Sorgulama - DNSBL ve Kaynak Erişim Durumu",
    description: "SpamCop ve DroneBL sonuçlarını sorgulayın; Spamhaus ve Barracuda resmi kontrol bağlantılarına ulaşın. Doğrulanamayan kaynaklar açıkça gösterilir.",
    url: "https://ipbulucu.org/karaliste-kontrolu/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
