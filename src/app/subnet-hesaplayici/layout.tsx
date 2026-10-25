import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IP Subnet Hesaplayıcı - CIDR, Ağ Maskesi ve IP Aralığı Hesaplama",
  description: "IPv4 ve CIDR blokları için ağ adresi, broadcast adresi, wildcard maskesi ve kullanılabilir host sayısını anında hesaplayın.",
  alternates: {
    canonical: "https://ipbulucu.org/subnet-hesaplayici/",
  },
  openGraph: {
    title: "IP Subnet Hesaplayıcı - CIDR, Ağ Maskesi ve IP Aralığı Hesaplama",
    description: "IPv4 ve CIDR blokları için ağ adresi, broadcast adresi, wildcard maskesi ve kullanılabilir host sayısını anında hesaplayın.",
    url: "https://ipbulucu.org/subnet-hesaplayici/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
