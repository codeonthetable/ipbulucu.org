import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Açık Port Kontrolü & Port Tarama Aracı - Canlı Port Testi",
  description: "IP adresinizde veya sunucunuzda açık olan portları (80, 443, 22, 3389, 25565 vb.) saniyeler içinde tarayın, modem port yönlendirme ve CGNAT durumunu test edin.",
  alternates: {
    canonical: "https://ipbulucu.org/port-kontrolu/",
  },
  openGraph: {
    title: "Açık Port Kontrolü & Port Tarama Aracı - Canlı Port Testi",
    description: "IP adresinizde veya sunucunuzda açık olan portları (80, 443, 22, 3389, 25565 vb.) saniyeler içinde tarayın, modem port yönlendirme ve CGNAT durumunu test edin.",
    url: "https://ipbulucu.org/port-kontrolu/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
