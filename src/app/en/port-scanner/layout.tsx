import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Port Scanner & Port Forwarding Tester - Online TCP Port Check",
  description: "Scan open TCP ports (80, 443, 22, 3389, etc.) on any IP or domain name and verify port forwarding configurations.",
  alternates: {
    canonical: "https://ipbulucu.org/en/port-scanner/",
  },
  openGraph: {
    title: "Open Port Scanner & Port Forwarding Tester - Online TCP Port Check",
    description: "Scan open TCP ports (80, 443, 22, 3389, etc.) on any IP or domain name and verify port forwarding configurations.",
    url: "https://ipbulucu.org/en/port-scanner/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
