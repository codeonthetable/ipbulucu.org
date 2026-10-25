"use client";
import PublicIpLookup from "@/components/PublicIpLookup";
import FaqAccordion from "@/components/FaqAccordion";
import SeoContentSection from "@/components/SeoContentSection";
export default function HomePageClient({faqs,lang="tr"}:{faqs:{question:string;answer:string}[];lang?:"tr"|"en"}) {
 return <div className="space-y-8"><h1 className="sr-only">{lang==="en"?"IP lookup and network tools":"IP sorgulama ve ağ araçları"}</h1><PublicIpLookup lang={lang} showDetails/><SeoContentSection lang={lang}/><FaqAccordion items={faqs} title={lang==="en"?"Frequently asked questions":"Sıkça sorulan sorular"} subtitle={lang==="en"?"Public IP, approximate location and network basics.":"Genel IP, yaklaşık konum ve ağ hakkında temel bilgiler."}/></div>;
}
