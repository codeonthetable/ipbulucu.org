import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPF, DMARC ve MX Kaydı Kontrolü",
  description: "Alan adınızın MX, SPF ve DMARC DNS kayıtlarını inceleyin. Eksik ve birden fazla kaydı görün; kayıt varlığı teslimat garantisi değildir.",
  alternates: {
    canonical: "https://ipbulucu.org/eposta-guvenlik-kontrolu/",
  },
  openGraph: {
    title: "SPF, DMARC ve MX Kaydı Kontrolü",
    description: "Alan adınızın MX, SPF ve DMARC DNS kayıtlarını inceleyin. Eksik ve birden fazla kaydı görün; kayıt varlığı teslimat garantisi değildir.",
    url: "https://ipbulucu.org/eposta-guvenlik-kontrolu/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
