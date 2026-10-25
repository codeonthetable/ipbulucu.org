import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DNS Records Lookup - Check A, AAAA, MX, TXT, NS & CNAME Records",
  description: "Real-time DNS record analyzer. Query A, AAAA, MX, TXT, SPF, DMARC, and NS records for any domain name.",
  alternates: {
    canonical: "https://ipbulucu.org/en/dns-lookup/",
  },
  openGraph: {
    title: "DNS Records Lookup - Check A, AAAA, MX, TXT, NS & CNAME Records",
    description: "Real-time DNS record analyzer. Query A, AAAA, MX, TXT, SPF, DMARC, and NS records for any domain name.",
    url: "https://ipbulucu.org/en/dns-lookup/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
