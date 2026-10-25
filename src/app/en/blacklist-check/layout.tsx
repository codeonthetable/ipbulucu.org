import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IP Blacklist Checker - DNSBL Results and Availability",
  description: "Query SpamCop and DroneBL with official links to Spamhaus and Barracuda. Unavailable results are shown as unknown, never clean.",
  alternates: {
    canonical: "https://ipbulucu.org/en/blacklist-check/",
  },
  openGraph: {
    title: "IP Blacklist Checker - DNSBL Results and Availability",
    description: "Query SpamCop and DroneBL with official links to Spamhaus and Barracuda. Unavailable results are shown as unknown, never clean.",
    url: "https://ipbulucu.org/en/blacklist-check/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
