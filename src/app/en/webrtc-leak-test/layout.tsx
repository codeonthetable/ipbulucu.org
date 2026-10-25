import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebRTC Leak Test - Is Your VPN Leaking Your Real IP Address?",
  description: "Test your browser for WebRTC IP leaks. Verify if your local or public IPv4/IPv6 address is exposed while connected to a VPN.",
  alternates: {
    canonical: "https://ipbulucu.org/en/webrtc-leak-test/",
  },
  openGraph: {
    title: "WebRTC Leak Test - Is Your VPN Leaking Your Real IP Address?",
    description: "Test your browser for WebRTC IP leaks. Verify if your local or public IPv4/IPv6 address is exposed while connected to a VPN.",
    url: "https://ipbulucu.org/en/webrtc-leak-test/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
