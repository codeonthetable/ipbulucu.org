import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe2,
  Lock,
  RefreshCw,
  ShieldCheck,
  Server,
  Zap,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata: Metadata = {
  title: "Statik IP ve Dinamik IP Farkı Nedir? Hangisini Seçmelisiniz?",
  description:
    "Statik IP ile Dinamik IP arasındaki tüm teknik ve güvenlik farkları. Güvenlik kameraları, uzaktan çalışma ve online oyunlar için hangisi daha avantajlı?",
  alternates: {
    canonical: "https://ipbulucu.org/statik-ip-dinamik-ip-farklari",
  },
};

const STATIK_FAQS = [
  {
    question: "Statik IP nedir?",
    answer:
      "Statik IP, internet servis sağlayıcınız tarafından modeminize veya sunucunuza atanan ve modem yeniden başlatılsa dahi hiçbir zaman değişmeyen sabit IP adresidir.",
  },
  {
    question: "Dinamik IP güvenli midir?",
    answer:
      "Evet, bireysel ev kullanıcıları için Dinamik IP daha avantajlıdır. Modemi her yeniden başlattığınızda yeni bir IP atandığı için hedefli siber saldırıların ve takibin önüne geçer.",
  },
  {
    question: "Statik IP oyunlarda pingi düşürür mü?",
    answer:
      "Statik IP doğrudan pinginizi büyük oranda düşürmez; ancak CGNAT havuzundan çıkardığı için paket kaybını (packet loss) ve ping dalgalanmasını (jitter) tamamen sıfırlar.",
  },
];

export default function StatikDinamikPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>IP Protokolleri & Karşılaştırma Rehberi</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Statik IP ile Dinamik IP Arasındaki Farklar Nelerdir?
        </h1>
        <p className="text-base md:text-lg text-slate-300 leading-relaxed">
          İnternet aboneliğinizde varsayılan olarak gelen Dinamik IP ile ek ücretle kiralanan Statik IP&#39;nin avantajları, dezavantajları ve kullanım senaryoları.
        </p>
      </div>

      {/* Featured Snippet Definition Box */}
      <div className="rounded-2xl border-2 border-blue-500/40 bg-slate-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="text-xs font-black text-blue-400 uppercase tracking-wider">Kısa ve Net Cevap (Özet)</div>
          <p className="text-sm md:text-base text-white font-medium leading-relaxed">
            <b>Dinamik IP;</b> modemin her açılıp kapanmasında değişen geçici adrestir (Ev kullanıcıları için ideal ve ücretsizdir). <b>Statik IP</b> ise hiçbir zaman değişmeyen sabit adrestir (Güvenlik kameraları, sunucular ve CGNAT&#39;tan kurtulmak için kiralanır).
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 overflow-hidden">
        <h2 className="text-xl font-bold text-white mb-4">Detaylı Karşılaştırma Tablosu</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-white font-bold bg-slate-950/60">
                <th className="p-3">Özellik</th>
                <th className="p-3 text-blue-400">Dinamik IP</th>
                <th className="p-3 text-emerald-400">Statik IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="p-3 font-semibold text-white">Değişkenlik</td>
                <td className="p-3">Modem her açıldığında değişir</td>
                <td className="p-3">Sürekli sabittir, hiç değişmez</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Maliyet</td>
                <td className="p-3 text-emerald-400 font-bold">Ücretsiz (Standart)</td>
                <td className="p-3 text-amber-400 font-bold">Aylık Ek Ücretli</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">CGNAT Durumu</td>
                <td className="p-3">Genellikle CGNAT havuzundadır</td>
                <td className="p-3 text-emerald-400 font-bold">CGNAT&#39;tan %100 Çıkarır</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Port Açma (Forwarding)</td>
                <td className="p-3 text-rose-400">Zor / CGNAT varsa imkansız</td>
                <td className="p-3 text-emerald-400 font-bold">Doğrudan Açılabilir</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Hedefli Siber Tehdit</td>
                <td className="p-3 text-emerald-400">Düşük (IP değiştikçe korunur)</td>
                <td className="p-3 text-rose-400">Daha yüksek (IP sabit olduğu için)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <AdPlaceholder slotId="statik-mid" format="leaderboard" />

      {/* Interactive Tool Link */}
      <div className="p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 to-slate-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Şu Anki IP Türünüzü Öğrenmek İster misiniz?</h3>
          <p className="text-xs text-slate-300 mt-1">ipbulucu.org algoritması IP&#39;nizin Statik mi Dinamik mi olduğunu analiz eder.</p>
        </div>
        <Link href="/" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 transition-all">
          Hemen Test Et &rarr;
        </Link>
      </div>

      <FaqAccordion faqs={STATIK_FAQS} title="Statik ve Dinamik IP SSS" />
    </div>
  );
}
