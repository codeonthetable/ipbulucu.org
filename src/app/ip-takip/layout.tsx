import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IP Değişim Takibi — Tarayıcı Sekmesinde Canlı Kontrol",
  description: "Sekme açıkken genel IP adresinizin değişimini dakikada bir kontrol edin. Sunucu taraflı veya arka plan bildirimi içermez.",
  alternates: {
    canonical: "https://ipbulucu.org/ip-takip/",
  },
  openGraph: {
    title: "IP Değişim Takibi — Tarayıcı Sekmesinde Canlı Kontrol",
    description: "Sekme açıkken genel IP adresinizin değişimini dakikada bir kontrol edin. Sunucu taraflı veya arka plan bildirimi içermez.",
    url: "https://ipbulucu.org/ip-takip/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
