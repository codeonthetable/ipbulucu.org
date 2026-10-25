import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SHA-256, Base64 ve Rastgele Parola Oluşturucu",
  description: "Tarayıcınızda metinlerin SHA-256 özetini hesaplayın, Base64 dönüşümü yapın ve rastgele parola üretin. Girilen metin bu araç tarafından sunucuya gönderilmez.",
  alternates: {
    canonical: "https://ipbulucu.org/hash-olusturucu/",
  },
  openGraph: {
    title: "SHA-256, Base64 ve Rastgele Parola Oluşturucu",
    description: "Tarayıcınızda metinlerin SHA-256 özetini hesaplayın, Base64 dönüşümü yapın ve rastgele parola üretin. Girilen metin bu araç tarafından sunucuya gönderilmez.",
    url: "https://ipbulucu.org/hash-olusturucu/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
