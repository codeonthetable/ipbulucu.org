import type { Metadata } from "next";
import ChromeExtensionGuide from "@/components/ChromeExtensionGuide";

export const metadata: Metadata = {
  title: "Chrome IP Bulucu Eklentisi: Kurulum ve Hızlı Erişim",
  description: "IP Bulucu Chrome eklentisinin mağaza kaydına ulaşın; kurulum, sabitleme ve yer imi adımlarını öğrenin. IP, port, DNS ve kara liste araçlarını kurulum yapmadan kullanın.",
  alternates: { canonical: "https://ipbulucu.org/chrome-eklentisi/", languages: { tr: "https://ipbulucu.org/chrome-eklentisi/", en: "https://ipbulucu.org/en/chrome-extension/" } },
};
export default function Page() { return <ChromeExtensionGuide lang="tr" />; }
