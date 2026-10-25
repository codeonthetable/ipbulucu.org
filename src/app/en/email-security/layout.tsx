import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPF, DMARC and MX Record Checker",
  description: "Inspect MX, SPF and direct DMARC DNS records. Find missing and duplicate records with clear limits on what this check verifies.",
  alternates: {
    canonical: "https://ipbulucu.org/en/email-security/",
  },
  openGraph: {
    title: "SPF, DMARC and MX Record Checker",
    description: "Inspect MX, SPF and direct DMARC DNS records. Find missing and duplicate records with clear limits on what this check verifies.",
    url: "https://ipbulucu.org/en/email-security/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
