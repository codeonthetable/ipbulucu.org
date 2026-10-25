import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Port Checker - TCP & Port Forwarding Test",
  description: "Check a TCP port or 8 common ports on a host you manage. Understand open, refused and inconclusive results, troubleshoot forwarding and copy a summary.",
  alternates: {
    canonical: "https://ipbulucu.org/en/port-scanner/",
  },
  openGraph: {
    title: "Open Port Checker - TCP & Port Forwarding Test",
    description: "Check a TCP port or 8 common ports on a host you manage. Understand open, refused and inconclusive results, troubleshoot forwarding and copy a summary.",
    url: "https://ipbulucu.org/en/port-scanner/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
