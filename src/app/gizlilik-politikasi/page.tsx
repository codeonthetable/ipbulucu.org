import type { Metadata } from "next";
import PrivacyInformation from "@/components/PrivacyInformation";
export const metadata: Metadata = {
  title: "Gizlilik ve Veri İşleme | IPBulucu",
  description: "IP sorguları, Google Analytics, eklenti ve API sayaçlarının veri işleme açıklaması.",
  alternates: { canonical:"https://ipbulucu.org/gizlilik-politikasi/", languages:{tr:"https://ipbulucu.org/gizlilik-politikasi/",en:"https://ipbulucu.org/en/privacy-policy/"}}
};
export default function Page(){return <PrivacyInformation />;}
