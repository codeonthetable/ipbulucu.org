import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IPv4 Subnet & CIDR Calculator - Network Mask & Host Range Tool",
  description: "Calculate network address, broadcast address, subnet mask, wildcard mask, and usable host IP ranges for any CIDR block.",
  alternates: {
    canonical: "https://ipbulucu.org/en/subnet-calculator/",
  },
  openGraph: {
    title: "IPv4 Subnet & CIDR Calculator - Network Mask & Host Range Tool",
    description: "Calculate network address, broadcast address, subnet mask, wildcard mask, and usable host IP ranges for any CIDR block.",
    url: "https://ipbulucu.org/en/subnet-calculator/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
