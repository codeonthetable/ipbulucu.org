import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MD5, SHA-1, SHA-256 ve SHA-512 Şifreleme & Hash Oluşturucu",
  description: "Metinlerinizi ve parolalarınızı tarayıcı üzerinde güvenli bir şekilde MD5, SHA-1, SHA-256 ve SHA-512 kriptografik özetlerine dönüştürün.",
  alternates: {
    canonical: "https://ipbulucu.org/hash-olusturucu/",
  },
  openGraph: {
    title: "MD5, SHA-1, SHA-256 ve SHA-512 Şifreleme & Hash Oluşturucu",
    description: "Metinlerinizi ve parolalarınızı tarayıcı üzerinde güvenli bir şekilde MD5, SHA-1, SHA-256 ve SHA-512 kriptografik özetlerine dönüştürün.",
    url: "https://ipbulucu.org/hash-olusturucu/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
