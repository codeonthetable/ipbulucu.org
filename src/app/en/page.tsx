import { Metadata } from "next";
import HomePageClient from "../HomePageClient";
import { EN_HOME_FAQS } from "@/lib/i18n/translations";

export const metadata: Metadata = {
  title: "What Is My IP? - Instant IP Lookup & Network Diagnostics | IPBulucu",
  description:
    "Check your public IP address, geolocation, ISP, ASN, DNS propagation, Whois, SSL certificate, and open ports with clear results and source information.",
  keywords: [
    "what is my ip",
    "ip lookup",
    "my ip address",
    "ip location",
    "whois lookup",
    "dns lookup",
    "port scanner",
    "check ip",
    "ip tracker",
    "ip geolocation",
  ],
  alternates: {
    canonical: "https://ipbulucu.org/en/",
    languages: {
      tr: "https://ipbulucu.org/",
      en: "https://ipbulucu.org/en/",
    },
  },
  openGraph: {
    title: "What Is My IP Address? - Live Geolocation & Network Intelligence",
    description:
      "Find your public IPv4/IPv6 address, approximate geolocation, ISP carrier, ASN, and test network security headers in real time.",
    url: "https://ipbulucu.org/en",
    siteName: "IPBulucu.org",
    locale: "en_US",
    type: "website",
  },
};

export default async function EnglishHomePage() {
  return <HomePageClient faqs={EN_HOME_FAQS} lang="en" />;
}
