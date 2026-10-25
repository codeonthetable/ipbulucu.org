import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Scale,
  Lock,
  Search,
  AlertTriangle,
  HelpCircle,
  FileText,
  Building,
  CheckCircle2,
  XCircle,
  Info,
  Globe,
} from "lucide-react";
import InteractiveIpFinder from "@/components/InteractiveIpFinder";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { generateBreadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "IP'den Adres Bulma - IP Adresinden Ev ve Konum Bulunur mu?",
  description:
    "IP'den adres bulma mümkün mü? IP adresinden ev adresi, sokak ve açık adres nasıl tespit edilir? Halka açık araçlar ile savcılık süreçleri arasındaki farklar ve canlı sorgulama aracı.",
  keywords: [
    "ip den adres bulma",
    "ip adresinden adres bulma",
    "ipden adres bulma",
    "ip den ev adresi bulunur mu",
    "ip den konum bulma",
    "ip adresinden konum bulma",
    "ip numarasından adres tespiti",
    "ip adresi ile sokak adresi bulma",
    "ip adresinden isim bulma",
  ],
  alternates: {
    canonical: "https://ipbulucu.org/ip-den-adres-bulma",
  },
  openGraph: {
    title: "IP'den Adres Bulma - IP Adresinden Ev Adresi Nasıl Bulunur?",
    description:
      "IP adresinden fiziksel sokak veya ev adresi tespiti yapılabilir mi? Hukuki ve teknik gerçekler, canlı IP konum sorgulama ve savcılık delil süreçleri.",
    url: "https://ipbulucu.org/ip-den-adres-bulma",
    siteName: "IPBulucu.org",
    locale: "tr_TR",
    type: "article",
  },
};

const FAQS = [
  {
    question: "IP adresinden tam ev veya sokak adresi bulunabilir mi?",
    answer:
      "Hayır. Halka açık hiçbir web sitesi, yazılım veya araç bir IP adresinden kapı numarası, apartman veya sokak adını gösteremez. İnternette 'IP'den ev adresi bulma' vaadiyle sunulan programların tamamı sahtedir veya dolandırıcılık amaçlıdır. IP sorgulamaları sadece bağlı olunan telekom santralini, şehri ve servis sağlayıcıyı (Türk Telekom, Superonline vb.) gösterir.",
  },
  {
    question: "Polis ve savcılık IP adresinden ev adresini nasıl bulur?",
    answer:
      "Türkiye'de 5651 sayılı kanun gereği tüm internet servis sağlayıcılar (ISS), hangi IP adresinin ve port numarasının hangi tarihte hangi aboneye tahsis edildiğini en az 2 yıl boyunca saklamak zorundadır. Siber suç, şantaj veya dolandırıcılık durumunda Cumhuriyet Savcılığı telekom operatörüne resmi müzekkere gönderir ve operatör abonenin adı, T.C. kimlik numarası ve sözleşmedeki açık ev/işyeri adresini adli makamlara teslim eder.",
  },
  {
    question: "IP adresinden konum bulma ne kadar doğrudur?",
    answer:
      "Coğrafi IP (GeoIP) veri tabanları ülke düzeyinde %99.8, il/şehir düzeyinde %85-95 doğruluk oranına sahiptir. İlçe ve semt doğruluğu ise ISS'nin o bölgedeki yönlendirme santraline göre değişir; örneğin Kadıköy'de oturan bir kullanıcının IP santrali Üsküdar veya Şişli olarak görünebilir.",
  },
  {
    question: "Sosyal medyadan (Instagram, WhatsApp) mesaj atan kişinin adresi IP ile bulunur mu?",
    answer:
      "Instagram veya WhatsApp doğrudan kullanıcıların IP adresini göstermez; çünkü mesajlar platformların kendi sunucuları üzerinden iletilir. Karşı tarafın IP adresi ancak suç unsuru içeren durumlarda savcılık kanalıyla Meta'dan giriş logları istenerek veya harici bir kayıt bağlantısı üzerinden tespit edilip adli makamlara sunulduğunda resmi adrese dönüştürülebilir.",
  },
  {
    question: "IP adresinden isim ve kimlik bilgisi öğrenilebilir mi?",
    answer:
      "Normal internet kullanıcıları için bu bilgi tamamen gizlidir (KVKK koruması altındadır). Yalnızca yetkili kolluk kuvvetleri (Emniyet Genel Müdürlüğü Siber Suçlarla Mücadele Daire Başkanlığı) ve mahkemeler IP sahibinin kimlik bilgilerine erişebilir.",
  },
];

const BREADCRUMBS = [
  { name: "Anasayfa", url: "/" },
  { name: "IP'den Adres Bulma", url: "/ip-den-adres-bulma" },
];

export default function IpFromAddressPage() {
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
        <Link href="/" className="hover:text-rose-500 transition-colors">
          Anasayfa
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">IP&#39;den Adres Bulma</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>Konum Tespiti & Siber Hukuk Rehberi</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          IP&#39;den Adres Bulma: IP Adresinden Ev Adresi Bulunur mu?
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
          İnternet kullanıcılarının en çok aradığı konu: Bir IP adresinden sokak veya ev adresi bulunabilir mi? Canlı IP adres sorgulama aracımızı kullanarak anında konum, şehir ve ISS santralini test edin.
        </p>
      </div>

      {/* Live Interactive Search Tool */}
      <InteractiveIpFinder
        defaultTitle="Canlı IP&#39;den Adres ve Konum Sorgulama Aracı"
        placeholder="Adresini bulmak istediğiniz IP adresini girin..."
        buttonLabel="Adresi & Konumu Tespit Et"
      />

      {/* Featured Snippet Quick Answer */}
      <div className="rounded-3xl border-2 border-rose-500/40 bg-white dark:bg-slate-900/90 p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Kesin Cevap: Ev ve Sokak Adresi Görünür mü?
            </span>
            <p className="text-sm md:text-base text-gray-900 dark:text-white font-medium leading-relaxed">
              <b>Hayır, halka açık hiçbir web sitesi veya araç bir IP adresinden kapı numarası veya ev adresi bulamaz.</b> IP coğrafi konumlandırması (GeoIP) yalnızca servis sağlayıcının santralini, şehri ve yaklaşık ilçe koordinatlarını verir. Gerçek ev adresi ve abone kimliği yalnızca <b>Cumhuriyet Savcılıkları</b> tarafından mahkeme kararıyla servis sağlayıcılardan (Türk Telekom, Superonline vb.) resmi olarak temin edilir.
            </p>
          </div>
        </div>
      </div>

      <AdPlaceholder slotId="address-guide-top" format="leaderboard" />

      {/* Comparison: Public Lookup vs Law Enforcement (Emniyet/Savcılık) */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Scale className="w-6 h-6 text-indigo-500" />
          <span>Halka Açık IP Bulucu ile Polis/Savcılık Sorgulaması Arasındaki Fark</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Public Tools */}
          <div className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-slate-800">
              <Globe className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Halka Açık IP Sorgulama Siteleri</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5 text-gray-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Ülke ve Şehir tespiti (%90+ doğruluk)</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>İnternet Servis Sağlayıcı (Türk Telekom, TurkNet vb.)</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Yaklaşık santral GPS koordinatları</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-500 dark:text-slate-500">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Kişinin adı, soyadı ve T.C. kimliği <b>(GÖRÜLEMEZ)</b></span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-500 dark:text-slate-500">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Cadde, sokak, apartman ve daire no <b>(GÖRÜLEMEZ)</b></span>
              </li>
            </ul>
          </div>

          {/* Law Enforcement */}
          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/30 via-slate-900/70 to-slate-900 p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-indigo-500/20">
              <Building className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-white text-base">Siber Suçlar & Cumhuriyet Savcılığı</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Abone Adı, Soyadı ve T.C. Kimlik Numarası</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modemin bağlı olduğu resmi ikametgah ve kapı adresi</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CGNAT port tahsis eşleşmesi (dakika bazlı)</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>5651 sayılı kanun kapsamındaki 2 yıllık geriye dönük loglar</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mobil baz istasyonu (HTS) konum geçmişi</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5651 Law and Legal Action Steps */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>İnternet Dolandırıcılığı, Hakaret veya Tehditte Ne Yapmalısınız?</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Eğer bir şahıs tarafından internet üzerinden dolandırıldıysanız, şantaja uğradıysanız veya hakarete maruz kaldıysanız, kendi başınıza sokak adresi bulmaya çalışmak yerine yasal prosedürü uygulamanız gerekir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <span>1. Delilleri Kaydedin</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Mesajların, e-postaların veya profil sayfalarının ekran görüntülerini saat ve tarih net görünecek şekilde alın. E-posta varsa header (kaynak) kodunu kaydedin.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-indigo-400 flex items-center gap-1.5">
              <span>2. Savcılık Raporu Alın</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Sitemiz üzerinden şüphelinin IP adresini sorgulayın ve sistemin otomatik oluşturduğu <b>Adli Delil Raporunu</b> yazdırıp dosyanıza ekleyin.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span>3. Suç Duyurusunda Bulunun</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              En yakın Cumhuriyet Başsavcılığı Bilişim Suçları Soruşturma Bürosu&#39;na veya Emniyet Siber Suçlar şubesine şikayet dilekçenizi teslim edin.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <span>Anasayfada IP Sorgula & Savcılık Raporunu İndir</span>
          </Link>
        </div>
      </div>

      {/* Related Reading & Interlinking */}
      <div className="p-6 rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">İlgili Rehberler ve Araçlar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <Link
            href="/karsi-tarafin-ip-adresini-bulma"
            className="p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 hover:border-blue-500 transition-colors text-blue-600 dark:text-blue-400 font-medium"
          >
            → Karşı Tarafın IP Adresini Bulma Yöntemleri
          </Link>
          <Link
            href="/ip-tespit-etme"
            className="p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 hover:border-blue-500 transition-colors text-blue-600 dark:text-blue-400 font-medium"
          >
            → IP Tespit Etme & Kendi IP Adresini Öğrenme
          </Link>
          <Link
            href="/cgnat-nedir-nasil-anlasilir"
            className="p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 hover:border-blue-500 transition-colors text-blue-600 dark:text-blue-400 font-medium"
          >
            → CGNAT Havuzu Nedir? Neden IP&#39;niz Başkalarıyla Ortak?
          </Link>
          <Link
            href="/statik-ip-dinamik-ip-farklari"
            className="p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 hover:border-blue-500 transition-colors text-blue-600 dark:text-blue-400 font-medium"
          >
            → Statik IP ve Dinamik IP Farkları
          </Link>
        </div>
      </div>

      <FaqAccordion items={FAQS} />
    </div>
  );
}
