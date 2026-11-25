"use client";

import Link from "next/link";
import PublicIpLookup from "@/components/PublicIpLookup";
import FaqAccordion from "@/components/FaqAccordion";
import SeoContentSection from "@/components/SeoContentSection";

type HomeProps = {
  faqs: { question: string; answer: string }[];
  lang?: "tr" | "en";
};

export default function HomePageClient({ faqs, lang = "tr" }: HomeProps) {
  const turkish = lang === "tr";
  return <div className="space-y-8">
    {!turkish && <h1 className="sr-only">IP lookup and network tools</h1>}
    <PublicIpLookup lang={lang} showDetails primaryHeading={turkish}>
      {turkish && <section className="max-w-3xl space-y-3 leading-relaxed">
        <h2 className="text-2xl font-bold">Hangi IP adresini arıyorsunuz?</h2>
        <p><strong>İnternette görünen adresim.</strong> Üstteki genel IP, bu sayfaya bağlandığınızda sunucumuzun gördüğü adrestir. Telefonunuzda Wi-Fi’yi kapatıp mobil veriye geçtiğinizde sayfayı yenileyin. Adres değişirse iki bağlantı internete farklı adreslerden çıkıyor demektir.</p>
        <p><strong>Telefonumun veya bilgisayarımın yerel adresi.</strong> Evdeki yazıcıyı kurarken genellikle Wi-Fi ağındaki adres gerekir. iPhone’da Ayarlar → Wi-Fi ekranında bağlı ağın yanındaki bilgi düğmesine dokunun. Windows’ta komut isteminde <code>ipconfig</code> yazıp bağlı ağ bağdaştırıcısının IPv4 adresine bakın. <Link href="/ip-tespit-etme/" className="text-blue-600 underline">Cihaza göre IP bulma adımları</Link></p>
        <p><strong>Bir sitenin IP adresi.</strong> Site sizin bağlantınızdan açılır ama sitenin sunucusunun ayrı bir IP adresi vardır. <Link href="/ip-sorgulama/" className="text-blue-600 underline">Alan adından IP sorgulayın</Link>. Elinizde zaten bir IP varsa <Link href="/ip-den-adres-bulma/" className="text-blue-600 underline">yaklaşık konumuna bakın</Link>.</p>
      </section>}
    </PublicIpLookup>
    <SeoContentSection lang={lang} />
    <FaqAccordion items={faqs}
      title={turkish ? "Sıkça sorulan sorular" : "Frequently asked questions"}
      subtitle={turkish ? "Genel IP, yaklaşık konum ve ağ hakkında temel bilgiler." : "Public IP, approximate location and network basics."} />
  </div>;
}
