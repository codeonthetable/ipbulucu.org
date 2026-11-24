import type { Metadata } from "next";
import Link from "next/link";
import PublicIpLookup from "@/components/PublicIpLookup";
import AdPlaceholder from "@/components/AdPlaceholder";
import FaqAccordion from "@/components/FaqAccordion";
import { generateBreadcrumbSchema, generateFaqSchema } from "@/lib/schemas";

const url = "https://ipbulucu.org/ip-sorgulama/";
const title = "IP Sorgulama – IP Adresi, Konum ve İnternet Sağlayıcısı";
const description = "IPv4, IPv6 veya alan adı sorgulayın. IP adresinin ülkesini, varsa şehrini, servis sağlayıcısını ve ASN bilgisini kaynağıyla birlikte görün.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, locale: "tr_TR", type: "website" },
};
const questions = [
  { question: "IP adresi kime ait?", answer: "Sağlayıcı, kuruluş ve ASN alanları IP bloğunu işleten ağı tanımlar. Bir ev bağlantısında bunlar genellikle operatöre aittir. Abonenin adı ve açık adresi bu kayıtta yer almaz." },
  { question: "Alan adıyla IP adresi nasıl bulunur?", answer: "Kutuya sitenin alan adını yazıp sorgulayın. Sonuçta çözümlenen genel IP adresini görürsünüz. Birden fazla sunucu veya içerik dağıtım ağı kullanan siteler farklı zamanlarda farklı adreslere çözümlenebilir." },
  { question: "Modemde gördüğüm IP ile buradaki IP neden farklı?", answer: "Wi-Fi ayarlarında cihazın yerel adresi görünür. Burada ise internete çıkarken görünen genel adresi sorgularsınız. Mobil ağ, VPN veya operatörün adres paylaşımı da hangi genel IP'nin göründüğünü etkileyebilir." },
];
const breadcrumb = generateBreadcrumbSchema([{ name: "Ana sayfa", url: "/" }, { name: "IP sorgulama", url }]);
export default function IpLookupPage() {
  return <article className="mx-auto max-w-4xl space-y-7">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumb, generateFaqSchema(questions)]) }} />
    <header className="space-y-3">
      <h1 className="text-3xl font-bold tracking-tight md:text-5xl">IP adresi sorgulama</h1>
      <p>Bir IPv4, IPv6 veya alan adının hangi ağa ait olduğunu öğrenin. Veri kaynağı sağladığında sonuçta ülke, şehir, internet servis sağlayıcısı ve ağ numarası (ASN) görünür.</p>
    </header>
    <PublicIpLookup searchFirst title="IP veya alan adı sorgula" placeholder="IPv4, IPv6 veya alan adı" buttonLabel="Sorgula" />
    <AdPlaceholder slotId="sorgulama-top" format="leaderboard" />
    <FaqAccordion items={questions} />
    <nav aria-label="İlgili araçlar" className="flex flex-wrap gap-5 text-blue-600 underline">
      <Link href="/">IP adresim nedir?</Link><Link href="/ip-den-adres-bulma/">IP’den konum bulma</Link>
      <Link href="/ip-tespit-etme/">Cihazımda IP adresini bulma</Link><Link href="/cgnat-nedir-nasil-anlasilir/">CGNAT kontrolü</Link>
    </nav>
  </article>;
}
