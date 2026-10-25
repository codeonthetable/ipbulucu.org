import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whois & RDAP Lookup Tool - Domain and IP Ownership Checker",
  description: "Instantly lookup domain registration details, registrar, creation/expiration dates, and IP block ownership via RDAP and Whois.",
  alternates: {
    canonical: "https://ipbulucu.org/en/whois/",
  },
  openGraph: {
    title: "Whois & RDAP Lookup Tool - Domain and IP Ownership Checker",
    description: "Instantly lookup domain registration details, registrar, creation/expiration dates, and IP block ownership via RDAP and Whois.",
    url: "https://ipbulucu.org/en/whois/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
