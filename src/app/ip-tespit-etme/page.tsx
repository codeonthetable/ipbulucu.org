import type { Metadata } from "next";
import Link from "next/link";
import {
  Smartphone,
  Router,
  Laptop,
  CheckCircle2,
  ShieldCheck,
  Search,
  Wifi,
  Globe,
  HelpCircle,
  Activity,
  ArrowRight,
} from "lucide-react";
import InteractiveIpFinder from "@/components/InteractiveIpFinder";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { generateBreadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Telefonda ve Bilgisayarda IP Adresi Nasıl Bulunur? | IP Bulucu",
  description:
    "iPhone, Android, Windows ve Mac’te yerel IP adresinizi bulun. Modem için ağ geçidini, internette görünen genel IP için hangi sonuca bakacağınızı öğrenin.",
  keywords: [
    "ip tespit etme",
    "ip bulma",
    "kendi ip adresimi bulma",
    "ip öğrenme",
    "telefondan ip bulma",
    "modem ip bulma",
    "ip adresi nasıl öğrenilir",
    "ip adresi sorgulama",
    "yerel ip genel ip farkı",
  ],
  alternates: {
    canonical: "https://ipbulucu.org/ip-tespit-etme",
  },
  openGraph: {
    title: "Telefonda ve Bilgisayarda IP Adresi Nasıl Bulunur?",
    description:
      "IP adresinizi tek tıkla tespit edin. Telefondan ve modemden IP öğrenme adımları ve canlı tespit paneli.",
    url: "https://ipbulucu.org/ip-tespit-etme",
    siteName: "IPBulucu.org",
    locale: "tr_TR",
    type: "article",
  },
};

const FAQS = [
  {
    question: "IP tespit etme nedir ve ne işe yarar?",
    answer:
      "Bir web sitesi, kendisine ulaşan bağlantının kaynak IP adresini görebilir. Ev ağı, mobil operatör veya VPN üzerinden bağlanmanıza göre farklı bir adres görünebilir. Bu bilgi tek başına bir kişiyi, ev adresini ya da telefon santralini belirlemez.",
  },
  {
    question: "Genel (Public) IP ile Yerel (Local) IP arasındaki fark nedir?",
    answer:
      "Özel IPv4 adresi ev veya iş ağınızdaki cihazı o ağ içinde tanımlar. Genel IP, internette yönlendirilebilen adrestir. Evdeki birkaç cihaz aynı genel IPv4 üzerinden çıkabilir. IPv6 kullanan cihazın kendi genel adresi de olabilir.",
  },
  {
    question: "Telefonda IP adresi nereden bulunur?",
    answer:
      "iPhone'da: Ayarlar > Wi-Fi > Bağlı olduğunuz ağın yanındaki (i) simgesine dokunarak yerel IP'nizi görebilirsiniz. Android'de: Ayarlar > Ağ ve İnternet > Wi-Fi > Ağ Ayrıntıları adımlarını izleyebilirsiniz. Genel dış IP'nizi görmek içinse doğrudan sitemizi açmanız yeterlidir.",
  },
  {
    question: "Modem IP adresi nasıl bulunur?",
    answer:
      "Ev ağınıza bağlıyken ağ ayrıntılarındaki Yöneltici veya Varsayılan Ağ Geçidi alanını okuyun. Bu, cihazın o bağlantıda kullandığı yönlendiricinin adresidir. Modem panelindeki WAN adresi ise operatör tarafındaki bağlantıya aittir ve CGNAT kullanılan ağlarda internette görünen IPv4 adresinden farklı olabilir.",
  },
  {
    question: "IP adresim neden sürekli değişiyor?",
    answer:
      "Wi-Fi ile mobil veri arasında geçiş yapmak veya VPN açmak, sitelerin gördüğü çıkış adresini değiştirebilir. Dinamik bir adresi sağlayıcı yeniden atayabilir. Modemi yeniden başlattığınızda adresin mutlaka değişmesi gerekmez. Statik IP hizmetiniz olup olmadığını abonelik bilgilerinizden kontrol edebilirsiniz.",
  },
];

const BREADCRUMBS = [
  { name: "Anasayfa", url: "/" },
  { name: "IP Tespit Etme & Bulma", url: "/ip-tespit-etme" },
];

export default function IpDetectionGuidePage() {
  const breadcrumbSchema = generateBreadcrumbSchema(BREADCRUMBS);

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb visual */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-emerald-500 transition-colors">
          Anasayfa
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">IP Tespit Etme</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <Activity className="w-3.5 h-3.5" />
          <span>Hızlı Ağ Teşhisi & IP Rehberi</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Telefonda ve bilgisayarda IP adresi nasıl bulunur?
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
          Bir cihazı ev ağında bulmak için o cihazın ağ ayarlarındaki IP adresini okuyun.
          Modem ayarlarını açmak için aynı ekrandaki ağ geçidine bakın.
          İnternette hangi adresle göründüğünüzü öğrenmek için aşağıdaki araçta <b>IP adresim</b> seçeneğini kullanın.
        </p>
      </div>

      {/* Live Tool */}
      <InteractiveIpFinder
        defaultTitle="Bağlantım internette hangi IP ile görünüyor?"
        placeholder="Kendi IP'niz veya sorgulamak istediğiniz IP..."
        buttonLabel="IP'yi Tespit Et"
      />

      <noscript><a className="underline" href="/api/ip?format=text">Genel IP adresimi düz metin olarak göster</a></noscript>

      <AdPlaceholder slotId="detection-guide-top" format="leaderboard" />

      {/* Step by Step Device Guides */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Cihazınıza Göre IP Adresi Nasıl Bulunur?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* iPhone / iOS */}
          <div className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-blue-500">
              <Smartphone className="w-6 h-6" />
              <h3 className="font-bold text-gray-900 dark:text-white text-base">iPhone (iOS)</h3>
            </div>
            <ol className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-slate-300 list-decimal list-inside">
              <li><b>Ayarlar</b> uygulamasını açın.</li>
              <li><b>Wi-Fi</b> seçeneğine dokunun.</li>
              <li>Bağlı olduğunuz ağın yanındaki <b>(i)</b> mavi bilgi simgesine dokunun.</li>
              <li>Aşağı kaydırın: <b>IPV4 Adresi</b> satırında yerel IP&#39;niz yazar (Örn: 192.168.1.34).</li>
            </ol>
          </div>

          {/* Android */}
          <div className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-500">
              <Smartphone className="w-6 h-6" />
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Android Telefon</h3>
            </div>
            <ol className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-slate-300 list-decimal list-inside">
              <li><b>Ayarlar</b> menüsüne girin.</li>
              <li><b>Ağ ve İnternet</b> veya <b>Bağlantılar</b> seçin.</li>
              <li><b>Wi-Fi</b> simgesine dokunup bağlı ağa tıklayın.</li>
              <li><b>Gelişmiş</b> veya <b>Ağ Ayrıntıları</b> bölümünden IP adresinizi görüntüleyin.</li>
            </ol>
          </div>

          {/* Windows / Mac */}
          <div className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-indigo-400">
              <Laptop className="w-6 h-6" />
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Bilgisayar (PC/Mac)</h3>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-slate-300 list-disc list-inside">
              <li><b>Windows:</b> Komut İstemi’nde <code>ipconfig</code> çalıştırın. Bağlı olduğunuz Wi-Fi veya Ethernet bağdaştırıcısındaki <b>IPv4 Adresi</b> satırını okuyun.</li>
              <li><b>Mac:</b> Sistem Ayarları → Ağ → bağlı olduğunuz bağlantı → Ayrıntılar → TCP/IP yolunu açın. IPv4 Adresi alanını okuyun.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Router / Modem Section */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <Router className="w-6 h-6 text-cyan-400 shrink-0" />
          <h2 className="text-xl font-bold text-white">Modemin yerel adresi ve WAN adresi nerede yazar?</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Ev Wi-Fi ağınıza bağlanın. Windows’ta <code>ipconfig</code> çıktısında <b>Varsayılan Ağ Geçidi</b>,
          iPhone veya Mac’te ağ ayrıntılarında <b>Yöneltici</b> alanını okuyun. Kendi ev ağınızdaki yönlendiricinin yerel yönetim arayüzü varsa bu adresi tarayıcınızda açabilirsiniz.
        </p>
        <p className="text-sm text-slate-300">
          Genel IPv4 adresinizi modemle karşılaştırırken paneldeki <b>İnternet / WAN IPv4</b> alanını kullanın.
          İki değer farklıysa önce VPN’i ve arada başka bir yönlendirici olup olmadığını kontrol edin.
          Operatörlerin ortak adres alanını kullanan bağlantılar için <Link href="/cgnat-nedir-nasil-anlasilir/" className="underline">CGNAT kontrol adımlarına</Link> bakabilirsiniz.
        </p>
        <p className="text-sm text-slate-300">
          Cihaz belgeleri: <a className="underline" href="https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig">Microsoft’un ipconfig kılavuzu</a>
          {" · "}<a className="underline" href="https://support.apple.com/tr-tr/guide/mac-help/mh14129/mac">Apple’ın TCP/IP ayarları kılavuzu</a>
        </p>
      </div>

      {/* Internal Crosslinks */}
      <div className="p-6 rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">İlgili rehberler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <Link
            href="/ip-den-adres-bulma"
            className="p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 hover:border-emerald-500 transition-colors text-emerald-600 dark:text-emerald-400 font-medium"
          >
            → IP&#39;den Adres ve Konum Bulma Rehberi
          </Link>
          <Link
            href="/karsi-tarafin-ip-adresini-bulma"
            className="p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 hover:border-emerald-500 transition-colors text-emerald-600 dark:text-emerald-400 font-medium"
          >
            → Karşı Tarafın IP&#39;sini Bulma (Instagram & Discord)
          </Link>
          <Link
            href="/statik-ip-dinamik-ip-farklari"
            className="p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 hover:border-emerald-500 transition-colors text-emerald-600 dark:text-emerald-400 font-medium"
          >
            → Statik IP ve Dinamik IP Farkları
          </Link>
          <Link
            href="/cgnat-nedir-nasil-anlasilir"
            className="p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 hover:border-emerald-500 transition-colors text-emerald-600 dark:text-emerald-400 font-medium"
          >
            → CGNAT Testi: IP&#39;niz Ortak Havuzda mı?
          </Link>
        </div>
      </div>

      <FaqAccordion items={FAQS} />
    </div>
  );
}
