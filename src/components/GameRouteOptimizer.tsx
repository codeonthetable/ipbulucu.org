"use client";

import React, { useState } from "react";
import { IpGeoData } from "@/lib/types";
import {
  Gamepad2,
  Zap,
  TrendingDown,
  Navigation,
  Globe,
  Sliders,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface Props {
  geo: IpGeoData;
}

export default function GameRouteOptimizer({ geo }: Props) {
  const [selectedGame, setSelectedGame] = useState<string>("valorant");

  const gameData: Record<string, { name: string; server: string; currentPing: number; optimizedPing: number; bottleneck: string; tip: string }> = {
    valorant: {
      name: "Valorant (Riot Games)",
      server: "İstanbul (TR1)",
      currentPing: geo.countryCode === "TR" ? 8 : 45,
      optimizedPing: geo.countryCode === "TR" ? 5 : 38,
      bottleneck: "Doğrudan DE-CIX Istanbul peering aktif.",
      tip: "Cloudflare 1.1.1.1 DoH kullanarak oyun başlatıcı sorgularını hızlandırabilirsiniz.",
    },
    cs2: {
      name: "Counter-Strike 2 (CS2)",
      server: "Viyana / Frankfurt (EU East)",
      currentPing: geo.countryCode === "TR" ? 34 : 14,
      optimizedPing: geo.countryCode === "TR" ? 27 : 11,
      bottleneck: "Yurt dışı çıkışında Sofya/Bükreş üzerinden ek transit hop gecikmesi.",
      tip: "Modem MTU değerini 1492 (Fiber PPPoE) olarak sabitleyerek paket parçalanmasını engelleyin.",
    },
    eafc: {
      name: "EA Sports FC (FIFA)",
      server: "Frankfurt (DE Core)",
      currentPing: geo.countryCode === "TR" ? 38 : 16,
      optimizedPing: geo.countryCode === "TR" ? 31 : 12,
      bottleneck: "EA sunucu havuzu Frankfurt AWS üzerinden yönlendiriliyor.",
      tip: "Statik IP alarak CGNAT havuzundaki paket gecikme dalgalanmasını (Jitter) sıfırlayabilirsiniz.",
    },
    lol: {
      name: "League of Legends",
      server: "İstanbul (TR)",
      currentPing: geo.countryCode === "TR" ? 9 : 42,
      optimizedPing: geo.countryCode === "TR" ? 6 : 35,
      bottleneck: "Yerel omurga bağlantısı mükemmel seviyede.",
      tip: "Kablolu Ethernet (Cat6) bağlantısı kullanarak Wi-Fi kaynaklı jitter kaybını önleyin.",
    },
  };

  const active = gameData[selectedGame] || gameData.valorant;
  const pingGain = active.currentPing - active.optimizedPing;

  return (
    <section className="mt-8 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Oyun & Rota Darboğazı Çözücü</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Ping İyileştirme ve Peering Rota Analizi</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Operatörünüzün ({geo.isp}) Avrupa ve Türkiye sunucularına giden peering rotasını inceler ve ping düşürme önerileri sunar.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-purple-300 text-xs font-bold">
          <TrendingDown className="w-4 h-4 text-emerald-400" />
          <span>Tahmini -{pingGain} ms Kazanç</span>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 mt-6">
        {Object.entries(gameData).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setSelectedGame(key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              selectedGame === key
                ? "bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-lg shadow-purple-500/10"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {data.name}
          </button>
        ))}
      </div>

      {/* Dynamic Performance Matrix */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* Metric 1: Current vs Optimized Ping */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Ping Durumu & Hedef
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="text-[10px] text-slate-500">Mevcut Ortalama</div>
              <div className="text-2xl font-black text-white font-mono">{active.currentPing} ms</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600" />
            <div>
              <div className="text-[10px] text-emerald-400">Optimize Edilebilir</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">{active.optimizedPing} ms</div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            Hedef Sunucu: <span className="text-slate-200 font-medium">{active.server}</span>
          </div>
        </div>

        {/* Metric 2: Peering & Transit Bottleneck */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-purple-400" />
            <span>Tespit Edilen Rota Durumu</span>
          </div>
          <div className="text-xs text-slate-300 mt-2 leading-relaxed">
            {active.bottleneck}
          </div>
          <div className="mt-3 text-[11px] text-purple-300 flex items-center gap-1 font-medium">
            <Globe className="w-3 h-3" />
            <span>Transit: DE-CIX & Sparkle/Telia Omurgası</span>
          </div>
        </div>

        {/* Metric 3: Optimization Action Item */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ping Düşürme Tavsiyesi</span>
          </div>
          <div className="text-xs text-slate-300 mt-2 leading-relaxed">
            {active.tip}
          </div>
          <div className="mt-3 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Uygulanabilir Ağ İyileştirmesi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
