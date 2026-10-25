import type { Metadata } from "next";
import PrivacyInformation from "@/components/PrivacyInformation";
export const metadata: Metadata = {
  title: "Privacy and Data Processing | IPBulucu",
  description: "How IP queries, Google Analytics, the extension and aggregate API counters process data.",
  alternates: {canonical:"https://ipbulucu.org/en/privacy-policy/",languages:{tr:"https://ipbulucu.org/gizlilik-politikasi/",en:"https://ipbulucu.org/en/privacy-policy/"}}
};
export default function Page(){return <PrivacyInformation lang="en" />;}
