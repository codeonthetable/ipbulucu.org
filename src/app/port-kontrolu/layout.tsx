import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Açık Port Kontrolü ve Port Yönlendirme Testi",
  description: "TCP port erişimini kontrol edin; bağlantı reddi ve zaman aşımını ayırt edin. Port yönlendirme sorunları için adım adım rehber ve kopyalanabilir sonuç özeti.",
  alternates: {
    canonical: "https://ipbulucu.org/port-kontrolu/",
  },
  openGraph: {
    title: "Açık Port Kontrolü ve Port Yönlendirme Testi",
    description: "TCP port erişimini kontrol edin; bağlantı reddi ve zaman aşımını ayırt edin. Port yönlendirme sorunları için adım adım rehber ve kopyalanabilir sonuç özeti.",
    url: "https://ipbulucu.org/port-kontrolu/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
