import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Scale,
  AlertTriangle,
  HelpCircle,
  Search,
  ArrowRight,
} from "lucide-react";
import InteractiveIpFinder from "@/components/InteractiveIpFinder";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata: Metadata = {
  title: "IP Adresinden Konum Bulma Nasıl Yapılır? Ev Adresi Bulunur mu?",
  description:
    "IP adresinden fiziksel konum nasıl bulunur? Sokak ve ev adresi tespiti mümkün mü? 5651 sayılı kanun ve yasal bilişim süreçleri rehberi.",
  alternates: {
    canonical: "https://ipbulucu.org/ip-ile-konum-bulma-nasil-yapilir",
  },
};

const GEOLOC_FAQS = [
  {
    question: "IP adresinden tam ev adresi bulunur mu?",
    answer:
      "Hayır. Herkese açık hiçbir web sitesi veya araç IP adresinden evinizi, sokak adınızı veya kapı numaranızı bulamaz. IP sorgulamaları sadece bağlı olduğunuz santrali ve şehri gösterir. Kesin abone adresi yalnızca mahkeme kararıyla servis sağlayıcılardan (Türk Telekom vb.) talep edilebilir.",
  },
  {
    question: "IP coğrafi konumunun doğruluk oranı nedir?",
    answer:
      "Ülke bazında doğruluk %99, il/şehir bazında doğruluk %85-95 oranındadır. İlçe ve semt bazında ise internet servis sağlayıcısının santral yönlendirmesine göre sapmalar olabilir.",
  },
  {
    question: "IP adresinden isim veya kimlik tespiti yapılabilir mi?",
    answer:
      "Kullanıcılar için bu bilgi KVKK kapsamında kesinlikle gizlidir. Sadece cumhuriyet savcılıkları ve emniyet siber suçlar bürosu IP sağlayıcısından abone kimliğini alabilir.",
  },
];

export default function IpLocationGuidePage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>Siber Güvenlik & Yasal Rehber</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
          IP Adresinden Konum Nasıl Bulunur? (Ev Adresi Bulunabilir mi?)
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
          İnternette en çok merak edilen sorulardan biri: Bir IP adresinden tam olarak nereye kadar konum tespiti yapılabilir ve adli süreçler nasıl işler?
        </p>
      </div>

      {/* Live Interactive Search Tool */}
      <InteractiveIpFinder
        defaultTitle="Canlı IP Konum & Koordinat Sorgulama"
        placeholder="Konumunu öğrenmek istediğiniz IP adresini girin..."
        buttonLabel="Konumu Tespit Et"
      />

      {/* Featured Snippet Definition Box */}
      <div className="rounded-2xl border-2 border-rose-500/40 bg-white dark:bg-slate-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider">Kesin ve Doğru Cevap</div>
          <p className="text-sm md:text-base text-gray-900 dark:text-white font-medium leading-relaxed">
            <b>IP adresinden doğrudan ev veya sokak adresi bulunamaz.</b> IP coğrafi konumlandırması (GeoIP) sadece servis sağlayıcının santralini, şehri ve yaklaşık bölge koordinatlarını verir. Kesin abone kimliği (Ad, Soyad, TC, Ev Adresi) yalnızca Cumhuriyet Savcılıkları tarafından yasal müzekkere ile ISS&#39;lerden alınabilir.
          </p>
        </div>
      </div>

      {/* Accuracy Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl border border-slate-800 bg-slate-900/60 text-center space-y-2">
          <div className="text-3xl font-black text-emerald-400 font-mono">%99.8</div>
          <div className="text-xs font-bold text-white uppercase">Ülke Doğruluğu</div>
          <p className="text-[11px] text-slate-400">Ülke bilgisi de sağlayıcının tahminidir; VPN, ağ değişikliği veya eski kayıt nedeniyle hatalı olabilir.</p>
        </div>

        <div className="p-5 rounded-3xl border border-slate-800 bg-slate-900/60 text-center space-y-2">
          <div className="text-3xl font-black text-cyan-400 font-mono">%88 - 95</div>
          <div className="text-xs font-bold text-white uppercase">Şehir / İl Doğruluğu</div>
          <p className="text-[11px] text-slate-400">Santral merkezlerine göre il doğruluğu çok yüksektir.</p>
        </div>

        <div className="p-5 rounded-3xl border border-slate-800 bg-slate-900/60 text-center space-y-2">
          <div className="text-3xl font-black text-rose-400 font-mono">%0</div>
          <div className="text-xs font-bold text-white uppercase">Sokak / Ev Adresi</div>
          <p className="text-[11px] text-slate-400">Halka açık hiçbir sistem ev adresini göremez.</p>
        </div>
      </div>

      <AdPlaceholder slotId="location-mid" format="leaderboard" />

      {/* Direct links to related guides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/ip-den-adres-bulma"
          className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/20 hover:border-blue-500/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Ayrıntılı Rehber</div>
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
              IP&#39;den Adres Bulma ve Ev Adresi Gerçekleri
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Siber suçlar, HTS kayıtları ve 5651 sayılı kanunla adres bulma süreçlerinin tüm teknik detayları.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold mt-4">
            <span>Rehberi İncele</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/karsi-tarafin-ip-adresini-bulma"
          className="p-5 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20 hover:border-cyan-500/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Sosyal Medya Rehberi</div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
              Karşı Tarafın IP Adresini Bulma (Instagram & Discord)
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Sosyal medya mesajlarından IP tespit etme imkanları ve IP Logger tuzaklarından korunma yolları.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold mt-4">
            <span>Rehberi İncele</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Legal & Police Steps */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-400" />
          <span>Dolandırıcılık ve Şantajda Yasal Süreç Nasıl İşler?</span>
        </h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Eğer internetten dolandırıldıysanız veya tehdit aldıysanız, <Link href="/" className="text-cyan-400 font-bold hover:underline">ipbulucu.org üzerindeki Savcılık Delil Raporunu</Link> yazdırarak doğrudan en yakın Polis Merkezi Siber Suçlar Büro Amirliği&#39;ne veya Cumhuriyet Başsavcılığı&#39;na müracaat edebilirsiniz. Savcılık, telekom operatöründen ilgili saatteki IP sahibinin kimlik ve adres bilgilerini resmi olarak talep eder.
        </p>
      </div>

      <FaqAccordion items={GEOLOC_FAQS} />
    </div>
  );
}
