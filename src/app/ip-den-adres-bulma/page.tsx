import type { Metadata } from "next";
import Link from "next/link";
import PublicIpLookup from "@/components/PublicIpLookup";
import FaqAccordion from "@/components/FaqAccordion";

import { generateBreadcrumbSchema, generateFaqSchema } from "@/lib/schemas";

const url = "https://ipbulucu.org/ip-den-adres-bulma/";
const title = "IP’den Konum Bulma – IP Adresini Haritada Sorgula";
const description = "Bir IP adresinin yaklaşık konumunu haritada görün. Ülkeyi, varsa şehri ve internet sağlayıcısını öğrenin. IP sorgusu ev veya sokak adresini göstermez.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, locale: "tr_TR", type: "website" },
};

const questions = [
  { question: "IP adresinden ev adresi bulunur mu?", answer: "Halka açık IP kayıtlarında abonenin adı, sokağı veya kapı numarası yer almaz. Haritadaki nokta, sağlayıcının IP bloğu için bildirdiği yaklaşık konumdur." },
  { question: "IP konumum neden başka şehirde görünüyor?", answer: "Mobil operatörünüz trafiği başka bir şehirden internete çıkarabilir. Bir VPN kullanıyorsanız görünen konum VPN sunucusuna ait olabilir. Haritayı yakınlaştırmak konum doğruluğunu artırmaz." },
  { question: "Alan adı girersem kimin konumunu görürüm?", answer: "Alan adının çözümlendiği sunucunun veya içerik dağıtım ağının IP kaydını görürsünüz. Bu kayıt site sahibinin ya da ziyaretçinin bulunduğu yeri göstermez." },
];

export default function IpLocationPage() {
  return <article className="mx-auto max-w-4xl space-y-7">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([generateBreadcrumbSchema([{name: "Ana sayfa", url: "/"}, {name: "IP adresinden konum bulma", url}]), generateFaqSchema(questions)]) }} />
    <header className="space-y-3">
      <h1 className="text-3xl font-bold tracking-tight md:text-5xl">IP adresinden konum bulma</h1>
      <p>Elinizdeki IP adresinin hangi ülke ve şehirle ilişkilendirildiğini sorgulayın. Veri kaynağı koordinat sunuyorsa yaklaşık konumu haritada görebilirsiniz.</p>
    </header>
    <PublicIpLookup searchFirst title="IP konumunu sorgula" placeholder="IP adresi veya alan adı" buttonLabel="Konumu bul" />
    <FaqAccordion items={questions} />
    <nav aria-label="İlgili araçlar" className="flex flex-wrap gap-5 text-blue-600 underline">
      <Link href="/">Kendi IP adresimi öğren</Link><Link href="/ip-sorgulama/">IP ve operatör sorgulama</Link>
      <Link href="/ip-tespit-etme/">Telefonda ve bilgisayarda IP bulma</Link>
    </nav>
  </article>;
}
