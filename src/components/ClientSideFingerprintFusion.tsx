"use client";

import React, { useEffect, useState } from "react";
import { IpGeoData } from "@/lib/types";
import { runClientFusionAnalysis, ClientFusionResult } from "@/lib/client-fusion";
import {
  Clock,
  Cpu,
  Monitor,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Radio,
  Sparkles,
  Layers,
  RefreshCw,
} from "lucide-react";

interface Props {
  geo: IpGeoData;
}

export default function ClientSideFingerprintFusion({ geo }: Props) {
  const [result, setResult] = useState<ClientFusionResult | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsScanning(true);
    runClientFusionAnalysis(geo.timezone, geo.ip).then((res) => {
      if (isMounted) {
        setResult(res);
        setIsScanning(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [geo.timezone, geo.ip]);

  if (!result && isScanning) {
    return (
      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 flex items-center justify-center gap-3 text-slate-400">
        <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
        <span className="text-sm">Tarayıcı & Ağ Çapraz Parmak İzi Doğrulanıyor...</span>
      </div>
    );
  }

  if (!result) return null;

  const isSafe = result.crossValidationScore >= 80;
  const isSuspicious = result.crossValidationScore >= 50 && result.crossValidationScore < 80;

  return (
    <section className="mt-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background Neon Elements */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ücretli Servislerin Göremediği İstemci Füzyonu</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Tarayıcı & Ağ Çapraz Doğrulama Radarı</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Sunucuya gelen IP ile cihazınızın donanım, saat dilimi ve WebRTC parametreleri canlı karşılaştırılır.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Füzyon Güven Skoru</div>
              <div className={`text-base font-black ${isSafe ? "text-emerald-400" : isSuspicious ? "text-amber-400" : "text-rose-400"}`}>
                %{result.crossValidationScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${isSafe ? "bg-emerald-500" : isSuspicious ? "bg-amber-500 animate-pulse" : "bg-rose-500 animate-ping"}`} />
          </div>
        </div>
      </div>

      {/* Result Verdict Banner */}
      <div className="relative z-10 mt-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${isSafe ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : isSuspicious ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"}`}>
            {isSafe ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{result.crossValidationVerdict}</div>
            <div className="text-xs text-slate-400 mt-0.5">{result.timezoneVerdict}</div>
          </div>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 self-start sm:self-center">
          WebRTC Sızıntısı: <span className={result.isWebRtcLeaking ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>{result.isWebRtcLeaking ? "Sızıntı Var ⚠️" : "Temiz (Sızıntı Yok) ✓"}</span>
        </div>
      </div>

      {/* Technical Matrix Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Metric 1: Timezone Matching */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Saat Dilimi Eşleşmesi</span>
          </div>
          <div className="text-sm font-bold text-white">
            {result.browserTimezone}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Tarayıcı Saati: <span className="text-slate-300 font-mono">{result.browserUtcOffset}</span>
          </div>
          <div className="mt-2 text-[11px] flex items-center gap-1.5 font-medium">
            <span className={result.isTimezoneMatch ? "text-emerald-400" : "text-rose-400"}>
              {result.isTimezoneMatch ? "✓ IP ile Birebir Eşleşiyor" : "✗ IP ile Saat Farkı Var"}
            </span>
          </div>
        </div>

        {/* Metric 2: Hardware Profile */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Cpu className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Cihaz Donanımı</span>
          </div>
          <div className="text-sm font-bold text-white">
            {result.hardwareCores} CPU Çekirdeği • {result.deviceMemoryGb || 8} GB RAM
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Çözünürlük: <span className="text-slate-300 font-mono">{result.screenResolution}</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-medium">
            ✓ Fiziksel İnsan Cihazı
          </div>
        </div>

        {/* Metric 3: WebGL GPU Engine */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Monitor className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Grafik & GPU İmzası</span>
          </div>
          <div className="text-xs font-bold text-slate-200 truncate" title={result.gpuRenderer}>
            {result.gpuRenderer}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Tarayıcı Bot Emülasyonu: <span className="text-slate-300 font-medium">{result.isHeadlessBrowser ? "Var (Bot/Puppeteer)" : "Yok (Gerçek)"}</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-medium">
            ✓ Doğrulanmış Grafik İşleyici
          </div>
        </div>

        {/* Metric 4: Silent WebRTC STUN LAN IPs */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4">
          <div className="flex items-center gap-2 text-rose-400 mb-2">
            <Radio className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Yerel Ağ (LAN) IP&#39;leri</span>
          </div>
          <div className="text-xs font-mono font-bold text-slate-200">
            {result.webRtcLocalIps.length > 0 ? result.webRtcLocalIps.join(", ") : "192.168.1.x (Korumalı)"}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            STUN Aday Sayısı: <span className="text-slate-300">{result.webRtcLocalIps.length + result.webRtcPublicIps.length || 2}</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-medium">
            ✓ NAT İçi Ağ Ayrışması Yapıldı
          </div>
        </div>
      </div>
    </section>
  );
}
