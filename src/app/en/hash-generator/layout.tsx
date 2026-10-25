import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Hash Generator - SHA-1, SHA-256 and SHA-512",
  description: "Calculate SHA-1, SHA-256 and SHA-512 hashes in your browser. Text entered into this tool is not sent to the server.",
  alternates: {
    canonical: "https://ipbulucu.org/en/hash-generator/",
  },
  openGraph: {
    title: "Online Hash Generator - SHA-1, SHA-256 and SHA-512",
    description: "Calculate SHA-1, SHA-256 and SHA-512 hashes in your browser. Text entered into this tool is not sent to the server.",
    url: "https://ipbulucu.org/en/hash-generator/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
