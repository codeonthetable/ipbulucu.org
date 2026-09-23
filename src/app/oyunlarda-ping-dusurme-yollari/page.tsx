import type { Metadata } from "next";
import Link from "next/link";
import {
  Gamepad2,
  TrendingDown,
  Zap,
  Sliders,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata: Metadata = {
  title: "Online Oyunlarda Ping Düşürme Yolları (Valorant, CS2, LoL, FC 24/25)",
  description:
    "Oyunlarda yüksek ping ve paket kaybını (packet loss) düşürme yöntemleri. Modem MTU ayarı (1492), DNS optimizasyonu ve CGNAT çözümleri.",
  alternates: {
    canonical: "https://ipbulucu.org/oyunlarda-ping-dusurme-yollari",
  },
};

const PING_FAQS = [
  {
    question: "Oyunlarda en iyi modem MTU değeri kaçtır?",
    answer:
      "Türkiye'deki Fiber ve VDSL (PPPoE) hatlarında en stabil ve paket parçalanmasını engelleyen ideal MTU değeri 1492'dir.",
  },
  {
    question: "Wi-Fi yerine kablo (Ethernet) kullanmak pingi ne kadar etkiler?",
    answer:
      "Kablolu Cat6 bağlantısı ping dalgalanmasını (Jitter) ve paket kaybını sıfırlayarak pinginizi 5-15 ms düşürür ve anlık takılmaları engeller.",
  },
];

export default function PingGuidePage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Espor & Oyun Optimizasyon Rehberi</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Online Oyunlarda Ping Düşürme ve Rota İyileştirme Yolları
        </h1>
        <p className="text-base md:text-lg text-slate-300 leading-relaxed">
          Valorant, CS2, League of Legends ve EA Sports FC sunucularına daha düşük gecikmeyle bağlanmak için uygulayabileceğiniz en etkili 5 adım.
        </p>
      </div>

      {/* 5 Actionable Steps */}
      <div className="space-y-4">
        {[
          {
            num: "1",
            title: "Modem MTU Değerini 1492 Olarak Sabitleyin",
            desc: "Modem arayüzünüzde WAN ayarlarındaki MTU boyutunu 1492 (PPPoE) yapın. Bu ayar oyun paketlerinin parçalanmasını ve Bufferbloat gecikmesini önler.",
          },
          {
            num: "2",
            title: "Kablolu Cat6 Ethernet Bağlantısına Geçin",
            desc: "Wi-Fi 2.4GHz/5GHz bağlantıları duvar ve elektromanyetik parazitler yüzünden anlık ping sıçramalarına (Spike) yol açar. Doğrudan kablo çekin.",
          },
          {
            num: "3",
            title: "Cloudflare 1.1.1.1 veya Doğrudan DoH DNS Kullanın",
            desc: "ISS'nin yavaş DNS çözümleyicileri yerine İstanbul DE-CIX doğrudan bağlı 1.1.1.1 / 1.0.0.1 DNS adreslerini tanımlayın.",
          },
          {
            num: "4",
            title: "CGNAT Havuzundan Çıkmayı Deneyin (Statik IP)",
            desc: "CGNAT havuzundaki yoğunluk akşam saatlerinde jitter ve packet loss yaratabilir. Statik IP ile doğrudan tekil hatta geçebilirsiniz.",
          },
          {
            num: "5",
            title: "Arka Planda İndirme ve Güncellemeleri Sınırlandırın",
            desc: "Windows Update, Steam ve Discord ekran paylaşımı upload bant genişliğinizi doldurarak oyun paketlerini sıraya sokar.",
          },
        ].map((step) => (
          <div key={step.num} className="p-5 rounded-3xl border border-slate-800 bg-slate-900/60 flex items-start gap-4">
            <span className="w-8 h-8 rounded-2xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0 text-sm">
              {step.num}
            </span>
            <div>
              <h2 className="text-base font-bold text-white">{step.title}</h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <AdPlaceholder slotId="ping-mid" format="leaderboard" />

      {/* Interactive Ping Matrix Link */}
      <div className="p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/60 to-slate-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Canlı Oyun Pinginizi Hemen Test Edin</h3>
          <p className="text-xs text-slate-300 mt-1">Valorant TR, CS2 Viyana, LoL ve Frankfurt sunucu pinglerinizi anlık ölçün.</p>
        </div>
        <Link href="/" className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shrink-0 transition-all">
          Ping Radarını Aç &rarr;
        </Link>
      </div>

      <FaqAccordion faqs={PING_FAQS} title="Ping Düşürme SSS" />
    </div>
  );
}
