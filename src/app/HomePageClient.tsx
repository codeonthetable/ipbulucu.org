"use client";
import Link from "next/link";
import PublicIpLookup from "@/components/PublicIpLookup";
import FaqAccordion from "@/components/FaqAccordion";
import SeoContentSection from "@/components/SeoContentSection";
export default function HomePageClient({faqs,lang="tr"}:{faqs:{question:string;answer:string}[];lang?:"tr"|"en"}) {
 return <div className="space-y-8">{lang==="en" && <h1 className="sr-only">IP lookup and network tools</h1>}<PublicIpLookup lang={lang} showDetails primaryHeading={lang==="tr"}/>{lang==="tr" && <nav aria-label="IP araçları" className="flex flex-wrap gap-5 text-blue-600 underline">
  <Link href="/ip-sorgulama/">Başka bir IP adresini sorgula</Link>
  <Link href="/ip-den-adres-bulma/">IP adresinden konum bul</Link>
  <Link href="/ip-tespit-etme/">Telefonda ve bilgisayarda yerel IP adresini bul</Link>
 </nav>}<SeoContentSection lang={lang}/><FaqAccordion items={faqs} title={lang==="en"?"Frequently asked questions":"Sıkça sorulan sorular"} subtitle={lang==="en"?"Public IP, approximate location and network basics.":"Genel IP, yaklaşık konum ve ağ hakkında temel bilgiler."}/></div>;
}
