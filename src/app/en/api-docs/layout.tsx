import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free IP Geolocation & Network Intelligence REST API Documentation",
  description: "Zero-latency, no-key-required IP lookup API for developers. Query IP geolocation, ASN, ISP, CGNAT, and security intelligence in JSON.",
  alternates: {
    canonical: "https://ipbulucu.org/en/api-docs/",
  },
  openGraph: {
    title: "Free IP Geolocation & Network Intelligence REST API Documentation",
    description: "Zero-latency, no-key-required IP lookup API for developers. Query IP geolocation, ASN, ISP, CGNAT, and security intelligence in JSON.",
    url: "https://ipbulucu.org/en/api-docs/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
