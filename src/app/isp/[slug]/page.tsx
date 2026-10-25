import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Server } from "lucide-react";
import { ISPS_DATA } from "@/lib/seo-data";
import InteractiveIpFinder from "@/components/InteractiveIpFinder";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { generateBreadcrumbSchema } from "@/lib/schemas";

interface IspPageProps { params: Promise<{ slug: string }>; }
export async function generateStaticParams() { return ISPS_DATA.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: IspPageProps): Promise<Metadata> {
  const {slug}=await params; const isp=ISPS_DATA.find(x=>x.slug===slug);
  if(!isp) return {title:"Servis Sağlayıcı Bulunamadı"};
  return {title:`${isp.name} IP Sorgulama, DNS Ayarları ve ${isp.asn} | IPBulucu.org`,description:isp.description,alternates:{canonical:`https://ipbulucu.org/isp/${isp.slug}/`}};
}
export default async function IspPage({params}: IspPageProps) {
  const {slug}=await params; const isp=ISPS_DATA.find(x=>x.slug===slug); if(!isp) notFound();
  const registry=`https://stat.ripe.net/data/as-overview/data.json?resource=${isp.asn}`;
  const faqs=[
    {question:`${isp.name} DNS adresimi nasıl öğrenirim?`,answer:"Modeminizin WAN/İnternet durumunda veya cihazınızın ağ ayrıntılarında atanan DNS sunucularını kontrol edin. Otomatik DNS ayarı, bağlantınızın sunduğu adresleri kullanır. Tarayıcıdaki güvenli DNS ayarı farklı bir çözümleyici kullanabilir."},
    {question:`${isp.name} bağlantımda görünen ASN neden farklı?`,answer:"ASN, sorgulanan genel IP adresinin ağ kaydını gösterir. Altyapı, farklı hizmet ağı, VPN veya kurumsal çıkış nedeniyle abonelik markanızdan farklı görünebilir. Buradaki kayıt, sağlayıcının tüm IP bloklarını veya bütün abonelerini kapsayan bir liste değildir."},
    {question:"Statik IP almak ping sorununu çözer mi?",answer:"Statik IP, adresin sabit tutulmasıyla ilgilidir; düşük gecikme veya sıfır paket kaybı garantisi vermez. Genel IP, port erişimi, fiyat ve hizmet koşullarını sağlayıcınızla doğrulayın."}
  ];
  return <div className="space-y-8">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(generateBreadcrumbSchema([{name:"Ana Sayfa",url:"/"},{name:isp.name,url:`/isp/${isp.slug}/` }]))}}/>
    <Link href="/" className="inline-flex items-center gap-2 text-blue-600"><ArrowLeft className="h-4 w-4"/>Ana Sayfaya Dön</Link>
    <header className="rounded-3xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-gray-900 p-6 sm:p-10 space-y-4">
      <p className="flex gap-2 items-center text-sm text-blue-600"><Server className="w-4 h-4"/>{isp.asn} · RIPE NCC kaydı</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">{isp.name} IP Sorgulama ve DNS Ayarları</h1>
      <p className="text-gray-600 dark:text-gray-300">{isp.description}</p>
    </header>
    <InteractiveIpFinder defaultTitle={`${isp.name} için Genel IP ve Ağ Bilgisi`} placeholder="Genel IP adresi veya alan adı" buttonLabel="IP Bilgisini Sorgula"/>
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <h2 className="text-xl font-bold">DNS adresinizi kontrol edin</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Önce modeminizdeki otomatik DNS ayarını ve cihazın ağ ayrıntılarını kontrol edin. Sağlayıcıya özel elle girilecek adresleri <a className="text-blue-600 underline" href={isp.website}>{isp.name} resmî destek kanalı</a> üzerinden doğrulayın.</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Genel DNS seçenekleri farklı hizmetlerdir. Değiştirmeden önce mevcut ayarı not edin; erişim sorunu olursa önceki ayara dönün. Hız farkını kendi bağlantınızda ölçün.</p>
        <ul className="space-y-2 text-sm">
          <li><a className="text-blue-600 underline" href="https://developers.google.com/speed/public-dns/docs/using">Google Public DNS</a>: <code>8.8.8.8</code> / <code>8.8.4.4</code></li>
          <li><a className="text-blue-600 underline" href="https://developers.cloudflare.com/1.1.1.1/ip-addresses/">Cloudflare DNS</a>: <code>1.1.1.1</code> / <code>1.0.0.1</code></li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-300">Sitemizdeki <Link className="text-blue-600 underline" href="/dns-sorgulama/">DNS kayıt sorgusu</Link> bir alan adının kayıtlarını gösterir; cihazınızın kullandığı DNS sunucusunu tespit etmez.</p>
      </section>
      <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <h2 className="text-xl font-bold">ASN kaydı ve kapsamı</h2>
        <p className="font-mono text-lg">{isp.asn}</p><p className="text-sm break-words">{isp.registryHolder}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Kaynak: <a className="text-blue-600 underline" href={registry}>RIPEstat ASN özeti</a>. Kontrol: {isp.registryCheckedAt}.</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Kayıt sahibinin adı bir abonenin kimliğini veya kesin konumunu göstermez. Bağlantınızın güncel ASN bilgisini yukarıdaki IP sorgusuyla karşılaştırabilirsiniz.</p>
        <Link href="/whois/" className="inline-block text-blue-600 underline">Alan adı kayıt bilgilerini sorgula →</Link>
      </section>
    </div>
    <section className="rounded-3xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
      <h2 className="text-xl font-bold">Bağlantı sorunu için üç kontrol</h2>
      <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
        <li>Aynı cihaz ve oyun sunucusunda kablolu ve Wi-Fi sonuçlarını karşılaştırın. Saat, gecikme ve paket kaybını kaydedin; tek ölçümden genel sonuç çıkarmayın.</li>
        <li>Port erişimi gerekiyorsa modeminizin WAN adresini genel IP ile karşılaştırın. <code>100.64.0.0/10</code> paylaşımlı adres alanıdır; <a className="text-blue-600 underline" href="https://datatracker.ietf.org/doc/html/rfc6598">RFC 6598</a>. Farklı adresler NAT veya başka bir ağ çıkışından kaynaklanabilir; kesin CGNAT durumunu sağlayıcı doğrular. <Link className="text-blue-600 underline" href="/port-kontrolu/#troubleshooting">Port açtım ama çalışmıyor: adım adım kontrol →</Link></li>
        <li>MTU, IPv6 ve güvenlik duvarını rastgele değiştirmeyin. <Link href="/oyunlarda-ping-dusurme-yollari/" className="text-blue-600 underline">Ping sorun giderme rehberini</Link> ve <Link href="/statik-ip-dinamik-ip-farklari/" className="text-blue-600 underline">statik/dinamik IP karşılaştırmasını</Link> kullanın.</li>
      </ol>
    </section>
    <AdPlaceholder slotId={`isp-${isp.slug}-banner`} format="leaderboard"/>
    <FaqAccordion faqs={faqs} title={`${isp.name} IP ve DNS soruları`}/>
  </div>;
}
