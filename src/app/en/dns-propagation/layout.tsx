import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DNS Propagation Checker - Google and Cloudflare Comparison",
  description: "Compare real DNS responses from Google and Cloudflare. Two anycast resolvers queried from one server, with measured query durations.",
  alternates: {
    canonical: "https://ipbulucu.org/en/dns-propagation/",
  },
  openGraph: {
    title: "DNS Propagation Checker - Google and Cloudflare Comparison",
    description: "Compare real DNS responses from Google and Cloudflare. Two anycast resolvers queried from one server, with measured query durations.",
    url: "https://ipbulucu.org/en/dns-propagation/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
