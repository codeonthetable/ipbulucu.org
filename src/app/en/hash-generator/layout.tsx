import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Hash Generator - MD5, SHA-1, SHA-256 & SHA-512 Calculator",
  description: "Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) client-side in your browser with zero data transmission.",
  alternates: {
    canonical: "https://ipbulucu.org/en/hash-generator/",
  },
  openGraph: {
    title: "Online Hash Generator - MD5, SHA-1, SHA-256 & SHA-512 Calculator",
    description: "Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) client-side in your browser with zero data transmission.",
    url: "https://ipbulucu.org/en/hash-generator/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
