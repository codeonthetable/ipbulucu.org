import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSL Certificate Checker - Verify TLS Chain, Expiry & Security",
  description: "Inspect SSL/TLS certificates for any website. Verify issuer, validity period, cipher suites, and certificate chain.",
  alternates: {
    canonical: "https://ipbulucu.org/en/ssl-checker/",
  },
  openGraph: {
    title: "SSL Certificate Checker - Verify TLS Chain, Expiry & Security",
    description: "Inspect SSL/TLS certificates for any website. Verify issuer, validity period, cipher suites, and certificate chain.",
    url: "https://ipbulucu.org/en/ssl-checker/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
