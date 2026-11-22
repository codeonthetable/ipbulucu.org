import type { Metadata } from "next";
import ChromeExtensionGuide from "@/components/ChromeExtensionGuide";

export const metadata: Metadata = {
  title: "IP Bulucu Chrome Extension: Setup and Quick Access",
  description: "Find the IP Bulucu Chrome Web Store listing, pin the extension or bookmark your tools. Check your IP, ports, DNS and mail blocklists without installing anything.",
  alternates: { canonical: "https://ipbulucu.org/en/chrome-extension/", languages: { tr: "https://ipbulucu.org/chrome-eklentisi/", en: "https://ipbulucu.org/en/chrome-extension/" } },
};
export default function Page() { return <ChromeExtensionGuide lang="en" />; }
