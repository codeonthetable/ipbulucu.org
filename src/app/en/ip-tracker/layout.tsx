import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public IP Change Monitor — In-Tab Checks",
  description: "Monitor public IP changes while this browser tab remains open. Checks once per minute; no background push notifications.",
  alternates: {
    canonical: "https://ipbulucu.org/en/ip-tracker/",
  },
  openGraph: {
    title: "Public IP Change Monitor — In-Tab Checks",
    description: "Monitor public IP changes while this browser tab remains open. Checks once per minute; no background push notifications.",
    url: "https://ipbulucu.org/en/ip-tracker/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
