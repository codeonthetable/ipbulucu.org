import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Globe,
  MapPin,
  Wifi,
  ShieldCheck,
  Activity,
  Layers,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Server,
} from "lucide-react";
import InteractiveIpFinder from "@/components/InteractiveIpFinder";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { generateBreadcrumbSchema, generateFaqSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "IP Sorgulama - Canlı IP Adresi, Konum ve ISP Sorgula (2026)",
  description:
    "Hızlı ve ücretsiz IP sorgulama aracı. Kendi dış IP adresinizi veya istediğiniz herhangi bir IP/domain adresini sorgulayın; il, ilçe, internet servis sağlayıcı (ISS), ASN ve güvenlik durumunu anında öğrenin.",
  keywords: [
    "ip sorgulama",
    "ip sorgula",
    "ip adresi sorgulama",
    "canlı ip sorgulama",
    "ip den adres bulma",
    "ip nerede",
    "türk telekom ip sorgulama",
    "superonline ip sorgulama",
    "statik ip dinamik ip sorgulama",
  ],
  alternates: {
    canonical: "https://ipbulucu.org/ip-sorgulama",
  },
  openGraph: {
    title: "Canlı IP Sorgulama - IP Adresi, İl ve ISS Tespiti",
    description:
      "Genel IPv4 ve IPv6 adreslerini yaklaşık konum, ISP ve ASN bilgileriyle sorgulayın. Sağlayıcı kapsamı ve yanıt süresi değişebilir.",
    url: "https://ipbulucu.org/ip-sorgulama",
    siteName: "IPBulucu.org",
    locale: "tr_TR",
    type: "website",
  },
};

const FAQS = [
  {
    question: "IP sorgulama nedir ve ne işe yarar?",
    answer:
      "IP sorgulama, bir bilgisayarın, telefonun veya web sunucusunun internete bağlanırken kullandığı benzersiz sayısal kimliğin (IP adresinin) hangi ülkeye, şehre, servis sağlayıcıya (Türk Telekom, TurkNet vb.) ve ağ bloğuna (ASN) ait olduğunu saniyeler içinde tespit etme işlemidir.",
  },
  {
    question: "IP sorgulaması ile açık ev adresi bulunur mu?",
    answer:
      "Hayır. Halka açık IP sorgulama sistemleri gizlilik ve güvenlik kuralları gereği yalnızca servis sağlayıcının santralini ve bulunduğu şehri gösterir. Açık sokak veya kapı numarası bilgisi yalnızca savcılık kanalıyla yasal müzekkere sonucu telekom operatörlerinden temin edilebilir.",
  },
  {
    question: "IP adresimin tipi (Statik mi, Dinamik mi, CGNAT mı) nasıl anlaşılır?",
    answer:
      "Modeminizi yeniden başlattığınızda dış IP adresiniz değişiyorsa dinamik IP kullanıyorsunuz demektir. Eğer modeminizin yönetim panelindeki WAN IP ile sitemizde görünen IP birbirinden farklıysa (örneğin modemde 100.64.x.x görünüyorsa), internet servis sağlayıcınız sizi CGNAT ortak IP havuzuna dahil etmiştir.",
  },
  {
    question: "Başka birinin IP adresini nasıl sorgulayabilirim?",
    answer:
      "Arama kutumuza elinizdeki IPv4 (örn: 88.241.112.45) veya IPv6 adresini ya da web sitesi alan adını (örn: google.com) yazıp 'Sorgula' butonuna basarak ilgili IP'nin coğrafi konumunu, harita koordinatlarını ve sağlayıcısını anında görebilirsiniz.",
  },
  {
    question: "IP sorgulama ücretsiz mi ve log tutuluyor mu?",
    answer:
      "Evet, IPBulucu.org üzerindeki tüm IP sorgulama, Whois, DNS ve port analiz araçları tamamen ücretsiz ve sınırsızdır. Yapılan sorgulamalar kaydedilmez ve üçüncü şahıslarla paylaşılmaz.",
  },
];

const BREADCRUMBS = [
  { name: "Anasayfa", url: "/" },
  { name: "IP Sorgulama", url: "/ip-sorgulama" },
];

export default function IpLookupDedicatedPage() {
  const faqSchema = generateFaqSchema(FAQS);
  const breadcrumbSchema = generateBreadcrumbSchema(BREADCRUMBS);

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb visual */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-blue-500 transition-colors">
          Anasayfa
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">IP Sorgulama</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-semibold">
          <Search className="w-3.5 h-3.5" />
          <span>Canlı Ağ & Konum Çözümleyici</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          IP Sorgulama: Canlı IP Adresi, Şehir ve Operatör Tespiti
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
          Kendi IP adresinizi veya sorgulamak istediğiniz herhangi bir IP/domain adresini girerek bağlı olunan ili, internet servis sağlayıcısını (ISS), harita koordinatlarını ve CGNAT durumunu anında öğrenin.
        </p>
      </div>

      {/* Interactive Live Lookup Tool */}
      <InteractiveIpFinder
        defaultTitle="Hızlı IP Adresi & Domain Sorgulama Aracı"
        placeholder="Örn: 88.241.112.45 veya domain adı..."
        buttonLabel="IP&#39;yi Canlı Sorgula"
      />

      {/* Direct Answer Box for GEO & Featured Snippets */}
      <div className="rounded-3xl border-2 border-blue-500/30 bg-white dark:bg-slate-900/90 p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-3">
          <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            IP Sorgulama Nasıl Çalışır? (Özet Bilgi)
          </span>
          <p className="text-sm md:text-base text-gray-900 dark:text-white font-medium leading-relaxed">
            IP sorgulama, IP adresinizi küresel RIPE, ARIN ve APNIC veri tabanları ile Türkiye telekom yönlendirme tabloları (BGP) üzerinden eşleştirir. Sonuç olarak <b>bağlı olduğunuz servis sağlayıcı (Türk Telekom, Superonline, TurkNet vb.)</b>, <b>il/şehir konumu</b>, <b>santral koordinatları</b> ve <b>VPN/Proxy durumu</b> anında ekrana yansıtılır.
          </p>
        </div>
      </div>

      <AdPlaceholder slotId="sorgulama-top" format="leaderboard" />

      {/* 3 Core Information Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Coğrafi Konum</h2>
          <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
            IP adresinin bağlı olduğu ülke, il ve yaklaşık ilçe santral noktası coğrafi koordinatlarla harita üzerinde gösterilir.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
            <Wifi className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Operatör & ASN</h2>
          <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
            Hattın Türk Telekom, Turkcell Superonline, Vodafone veya TurkNet gibi hangi sağlayıcıdan çıktığı ve Otonom Sistem Numarası (ASN) çözümlenir.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Güvenlik & CGNAT</h2>
          <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
            IP&#39;nin bir VPN, Proxy, Tor çıkış düğümü veya CGNAT ortak havuzunda olup olmadığı anında test edilir.
          </p>
        </div>
      </div>

      {/* Internal Navigation to Related Specialized Pages */}
      <div className="p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>İlgili IP ve Ağ Sorgulama Araçları</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <Link
            href="/ip-den-adres-bulma"
            className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 transition-colors text-blue-400 font-medium flex items-center justify-between"
          >
            <span>→ IP&#39;den Adres ve Ev Konumu Bulma</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/karsi-tarafin-ip-adresini-bulma"
            className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 transition-colors text-blue-400 font-medium flex items-center justify-between"
          >
            <span>→ Karşı Tarafın IP&#39;sini Bulma (Instagram & Discord)</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/ip-tespit-etme"
            className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 transition-colors text-blue-400 font-medium flex items-center justify-between"
          >
            <span>→ IP Tespit Etme & Kendi IP&#39;ni Öğrenme</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/cgnat-nedir-nasil-anlasilir"
            className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 transition-colors text-blue-400 font-medium flex items-center justify-between"
          >
            <span>→ CGNAT Testi (Ortak IP Havuzu Sorgulama)</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </Link>
        </div>
      </div>

      <FaqAccordion items={FAQS} />
    </div>
  );
}
