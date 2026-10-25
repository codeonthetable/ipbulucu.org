import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebRTC Sızıntı Testi - VPN Açıkken Gerçek IP Adresiniz Sızıyor mu?",
  description: "Tarayıcınızın WebRTC protokolü üzerinden gerçek yerel ve genel IP adresinizi sızdırıp sızdırmadığını canlı test edin.",
  alternates: {
    canonical: "https://ipbulucu.org/webrtc-sizinti-testi/",
  },
  openGraph: {
    title: "WebRTC Sızıntı Testi - VPN Açıkken Gerçek IP Adresiniz Sızıyor mu?",
    description: "Tarayıcınızın WebRTC protokolü üzerinden gerçek yerel ve genel IP adresinizi sızdırıp sızdırmadığını canlı test edin.",
    url: "https://ipbulucu.org/webrtc-sizinti-testi/",
    siteName: "IPBulucu.org",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
