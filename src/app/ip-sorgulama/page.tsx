import type { Metadata } from "next";
import Link from "next/link";
import PublicIpLookup from "@/components/PublicIpLookup";
import AdPlaceholder from "@/components/AdPlaceholder";
import FaqAccordion from "@/components/FaqAccordion";
import { generateBreadcrumbSchema } from "@/lib/schemas";

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
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <header className="space-y-3">
      <h1 className="text-3xl font-bold tracking-tight md:text-5xl">IP adresi sorgulama</h1>
      <p>Bir IPv4, IPv6 veya alan adının hangi ağa ait olduğunu öğrenin. Veri kaynağı sağladığında sonuçta ülke, şehir, internet servis sağlayıcısı ve ağ numarası (ASN) görünür.</p>
    </header>
    <PublicIpLookup searchFirst title="IP veya alan adı sorgula" placeholder="IPv4, IPv6 veya alan adı" buttonLabel="Sorgula" />
    <section className="space-y-4 leading-relaxed">
      <h2 className="text-2xl font-bold">Bir web sitesinin IP adresi nasıl bulunur?</h2>
      <p>Sorgu kutusuna sitenin alan adını yazın. Örneğin <strong>ipbulucu.org</strong> yazıp Sorgula’ya bastığınızda araç alan adını bir IPv4 adresine çözer ve o adresin ağ bilgilerini getirir. Elinizde zaten bir IPv4 veya IPv6 adresi varsa doğrudan onu girebilirsiniz.</p>
      <p>Alan adı birden fazla adrese yönlenebilir. Hepsini karşılaştırmak için <Link href="/dns-sorgulama/" className="text-blue-600 underline">DNS sorgulamada</Link> IPv4 için A, IPv6 için AAAA kayıtlarına bakın. Bir içerik dağıtım ağı kullanılıyorsa görünen IP, isteği karşılayan ağın adresi olabilir.</p>
      <h3 className="text-xl font-semibold">Örnek sorgu sonucu nasıl okunur?</h3>
      <p><time dateTime="2026-11-25">25 Kasım 2026</time> tarihinde kendi alan adımızı sorguladık. Konum ve ağ verisini sağlayan ipwho.is, ülkeyi <strong>Türkiye</strong>, sağlayıcıyı <strong>IHS Kurumsal Teknoloji Hizmetleri A.S</strong>, ağ numarasını <strong>AS49126</strong> olarak döndürdü. Bunlar o gün çözümlenen sunucu adresine ait kayıtlardır. Site sahibinin veya ziyaretçinin yaşadığı yeri göstermez. Barındırma hizmeti değişirse aynı sorgunun yanıtı da değişebilir.</p>
    </section>
    <section className="space-y-3 leading-relaxed">
      <h2 className="text-2xl font-bold">Elimdeki IP adresi kime ait?</h2>
      <p>Bir bağlantı kaydındaki IP’yi sorguluyorsanız önce <strong>servis sağlayıcısı</strong> ve <strong>ASN</strong> alanlarına bakın. Bir ev bağlantısında operatör, bir web sunucusunda barındırma şirketi, VPN bağlantısında ise çıkış ağının adı görünebilir. Tek bir IP birden çok abone tarafından paylaşılabilir.</p>
      <p>IP bloğunun hangi kuruluşa kayıtlı olduğunu ayrıca <a href="https://stat.ripe.net/" className="text-blue-600 underline">RIPEstat</a> üzerinden kontrol edebilirsiniz. Şehir bilgisi ayrı bir coğrafi tahmindir. Bir ağ kaydı ile haritadaki nokta farklı soruları yanıtlar.</p>
    </section>
    <AdPlaceholder slotId="sorgulama-top" format="leaderboard" />
    <FaqAccordion items={questions} />
    <nav aria-label="İlgili araçlar" className="flex flex-wrap gap-5 text-blue-600 underline">
      <Link href="/">IP adresim nedir?</Link><Link href="/ip-den-adres-bulma/">IP’den konum bulma</Link>
      <Link href="/ip-tespit-etme/">Cihazımda IP adresini bulma</Link><Link href="/cgnat-nedir-nasil-anlasilir/">CGNAT kontrolü</Link>
    </nav>
  </article>;
}
