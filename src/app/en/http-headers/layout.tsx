import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTTP Security Headers Checker - Inspect Server Response Headers",
  description: "Analyze HTTP status codes and security headers including HSTS, Content-Security-Policy, X-Frame-Options, and Server tags.",
  alternates: {
    canonical: "https://ipbulucu.org/en/http-headers/",
  },
  openGraph: {
    title: "HTTP Security Headers Checker - Inspect Server Response Headers",
    description: "Analyze HTTP status codes and security headers including HSTS, Content-Security-Policy, X-Frame-Options, and Server tags.",
    url: "https://ipbulucu.org/en/http-headers/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
