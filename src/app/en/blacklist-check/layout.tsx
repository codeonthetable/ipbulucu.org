import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IP Blacklist Checker - Check IP Spam Listings",
  description: "Check an outbound mail IP against available DNSBL sources. See unknown results, official listing checks and next steps for email delivery problems.",
  alternates: {
    canonical: "https://ipbulucu.org/en/blacklist-check/",
  },
  openGraph: {
    title: "IP Blacklist Checker - Check IP Spam Listings",
    description: "Check an outbound mail IP against available DNSBL sources. See unknown results, official listing checks and next steps for email delivery problems.",
    url: "https://ipbulucu.org/en/blacklist-check/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
