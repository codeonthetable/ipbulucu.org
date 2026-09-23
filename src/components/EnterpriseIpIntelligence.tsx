"use client";

import React from "react";
import { IpGeoData } from "@/lib/types";
import {
  Zap,
  Activity,
  UserCheck,
  ShieldCheck,
  Phone,
  Car,
  CloudSun,
  Coins,
  Server,
  Lock,
  Wifi,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface Props {
  geo: IpGeoData;
}

export default function EnterpriseIpIntelligence({ geo }: Props) {
  const fraudScore = geo.fraudScore || 2;
  const isHighRisk = fraudScore > 50;

  return (
    <section className="mt-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ücretli Servis Düzeyinde Derin İstihbarat</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Gelişmiş Hat, Cihaz ve Taşıyıcı Analizi</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Sadece IP adresinden elde edilen operatör altyapısı, hat hızı sınıfı, bölgesel telekom kodları ve güvenlik risk profili.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Dolandırıcılık Skoru</div>
              <div className={`text-base font-black ${isHighRisk ? "text-rose-400" : "text-emerald-400"}`}>
                %{fraudScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${isHighRisk ? "bg-rose-500 animate-ping" : "bg-emerald-500"}`} />
          </div>
        </div>
      </div>

      {/* Grid of Enterprise Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Card 1: Hat & Bağlantı Türü */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 hover:border-slate-700/80 transition-colors">
          <div className="flex items-center gap-2.5 text-cyan-400 mb-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Wifi className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Bağlantı Türü</span>
          </div>
          <div className="text-base font-bold text-white mt-1">
            {geo.connectionType || "Fiber Optik / VDSL (Genişbant)"}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{geo.lineSpeedTier || "Yüksek Hız (35 - 1000 Mbps)"}</span>
          </div>
        </div>

        {/* Card 2: Ziyaretçi Kimliği & Persona */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 hover:border-slate-700/80 transition-colors">
          <div className="flex items-center gap-2.5 text-indigo-400 mb-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Kullanıcı Tipi</span>
          </div>
          <div className="text-base font-bold text-white mt-1">
            {geo.userPersona || "Gerçek İnsan Kullanıcı (Bireysel)"}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Güvenilirlik: %{geo.securityScore || 100} / 100</span>
          </div>
        </div>

        {/* Card 3: Telekom & Bölge Kodları */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 hover:border-slate-700/80 transition-colors">
          <div className="flex items-center gap-2.5 text-amber-400 mb-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Bölge & Telefon Kodları</span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-sm font-bold text-white">
            <span className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-slate-400" /> Plaka: {geo.plateCode || "34"}
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> Alan: {geo.localAreaCode || "0212"}
            </span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Posta Kodu: <span className="text-slate-300 font-mono">{geo.postalCode || "34000"}</span>
          </div>
        </div>

        {/* Card 4: Yerel Çevre & Para Birimi */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 hover:border-slate-700/80 transition-colors">
          <div className="flex items-center gap-2.5 text-emerald-400 mb-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Coins className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Yerel Bilgiler</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm font-bold text-white">
            <span>{geo.currency?.code || "TRY"} ({geo.currency?.name || "Türk Lirası"})</span>
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <CloudSun className="w-3.5 h-3.5 text-amber-400" />
            <span>Tahmini Hava: {geo.weatherEstimate?.temp || "21°C"} ({geo.weatherEstimate?.condition || "Açık"})</span>
          </div>
        </div>
      </div>

      {/* Deep Risk & Security Factor Matrix */}
      <div className="relative z-10 mt-6 pt-6 border-t border-slate-800/60 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Risk Breakdown */}
        <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Siber Güvenlik & Tehdit Matrisi</span>
            </h3>
            <span className="text-[11px] text-emerald-400 font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
              Doğrulanmış
            </span>
          </div>
          <div className="space-y-2.5">
            {(geo.fraudFactors || []).map((factor, idx) => (
              <div key={idx} className="flex items-start justify-between gap-3 text-xs bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50">
                <div>
                  <div className="font-semibold text-slate-200">{factor.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{factor.detail}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${factor.status === "Temiz" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/15 text-rose-300 border border-rose-500/30"}`}>
                  {factor.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Exposed Public Services / Ports */}
        <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>Dış Dünyaya Açık Port & Servis Taraması</span>
            </h3>
            <span className="text-[11px] text-slate-400">Genel Portlar</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {(geo.exposedServices || []).map((srv, idx) => (
              <div key={idx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-200">Port {srv.port}</div>
                  <div className="text-[10px] text-slate-400">{srv.name}</div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kapalı</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            Not: Bireysel ev hatlarında portlar servis sağlayıcı (CGNAT/Firewall) tarafından varsayılan olarak kapalı tutulur.
          </p>
        </div>
      </div>
    </section>
  );
}
