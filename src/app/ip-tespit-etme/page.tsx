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
  title: "IP Tespit Etme & IP Bulma - Kendi IP Adresini Öğrenme Rehberi",
  description:
    "IP tespit etme ve IP bulma nasıl yapılır? Kendi IP adresimi nasıl öğrenirim? Telefondan (iPhone, Android) ve modemden IP adresi bulma adım adım kılavuzu ve canlı test aracı.",
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
    title: "IP Tespit Etme ve IP Bulma Rehberi - IPBulucu.org",
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
      "IP tespit etme, internete bağlı cihazınızın (telefon, bilgisayar, tablet) dijital kimlik numarasını ve dünyaya çıkış yaptığı santral noktasını bulma işlemidir. Ağ sorunlarını gidermek, güvenlik kontrolleri yapmak veya sunuculara izin tanımlamak için IP tespiti yapılır.",
  },
  {
    question: "Genel (Public) IP ile Yerel (Local) IP arasındaki fark nedir?",
    answer:
      "Yerel IP (genellikle 192.168.1.X veya 10.0.0.X gibi başlar), evinizdeki modemin cihazlarınıza içeride dağıttığı adrestir. Genel (Public) IP ise tüm internet dünyasının sizi gördüğü, servis sağlayıcınız tarafından atanan resmi adrestir. Web sitelerine girerken genel IP adresiniz görünür.",
  },
  {
    question: "Telefonda IP adresi nereden bulunur?",
    answer:
      "iPhone'da: Ayarlar > Wi-Fi > Bağlı olduğunuz ağın yanındaki (i) simgesine dokunarak yerel IP'nizi görebilirsiniz. Android'de: Ayarlar > Ağ ve İnternet > Wi-Fi > Ağ Ayrıntıları adımlarını izleyebilirsiniz. Genel dış IP'nizi görmek içinse doğrudan sitemizi açmanız yeterlidir.",
  },
  {
    question: "Modem IP adresi nasıl bulunur?",
    answer:
      "Çoğu modemin yönetim paneli IP'si varsayılan olarak 192.168.1.1 veya 192.168.0.1'dir. Tarayıcınızın adres çubuğuna bu adresi yazıp modem kullanıcı adı ve şifresiyle giriş yaparak modeminizin dış dünyaya bağlandığı genel WAN IP'sini görebilirsiniz.",
  },
  {
    question: "IP adresim neden sürekli değişiyor?",
    answer:
      "Türkiye'deki ev internetlerinin %95'i dinamik IP kullanır. Modeminizi kapatıp açtığınızda veya 24 saatlik periyotlarda servis sağlayıcınız size havuzdan yeni bir IP atar. Ayrıca CGNAT havuzundaysanız tek bir genel IP'yi yüzlerce kişiyle ortak paylaşıyor olabilirsiniz.",
  },
];

const BREADCRUMBS = [
  { name: "Anasayfa", url: "/" },
  { name: "IP Tespit Etme & Bulma", url: "/ip-tespit-etme" },
];

export default function IpDetectionGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const breadcrumbSchema = generateBreadcrumbSchema(BREADCRUMBS);

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          IP Tespit Etme & IP Bulma Rehberi
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
          Kendi IP adresinizi, bağlı olduğunuz internet servis sağlayıcınızı (ISS) ve yaklaşık konumunuzu saniyeler içinde tespit edin. Telefondan ve modemden IP adresi öğrenme adımları.
        </p>
      </div>

      {/* Live Tool */}
      <InteractiveIpFinder
        defaultTitle="Canlı IP Tespit ve Ağ Bilgisi Çıkarıcı"
        placeholder="Kendi IP'niz veya sorgulamak istediğiniz IP..."
        buttonLabel="IP'yi Tespit Et"
      />

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
            <ol className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-slate-300 list-decimal list-inside">
              <li><b>Windows:</b> Başlat &#62; CMD açın ve <code className="text-cyan-400 bg-slate-950 px-1 py-0.5 rounded font-mono">ipconfig</code> yazıp Enter&#39;a basın.</li>
              <li><b>Mac:</b> Terminal açın ve <code className="text-cyan-400 bg-slate-950 px-1 py-0.5 rounded font-mono">ipconfig getifaddr en0</code> yazın.</li>
              <li>İç ağ IP&#39;niz anında listelenir.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Router / Modem Section */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <Router className="w-6 h-6 text-cyan-400 shrink-0" />
          <h2 className="text-xl font-bold text-white">Modem IP Adresi Nasıl Bulunur ve Girilir?</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Evinizdeki modemin kontrol paneline ulaşmak için en sık kullanılan varsayılan adresler şunlardır:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-center">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-bold text-sm">
            192.168.1.1 (Türk Telekom / ZyXEL / TP-Link)
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-bold text-sm">
            192.168.0.1 (Netmaster Kablonet / D-Link)
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-bold text-sm">
            192.168.2.1 (AirTies / Belkin)
          </div>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Tarayıcınıza bu adresi yazdığınızda giriş ekranı açılır. Standart kullanıcı adı ve şifre genellikle <b>admin / admin</b> veya <b>admin / turktelekom</b> şeklindedir.
        </p>
      </div>

      {/* Internal Crosslinks */}
      <div className="p-6 rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">İlgili Diğer Rehberlerimiz</h3>
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
