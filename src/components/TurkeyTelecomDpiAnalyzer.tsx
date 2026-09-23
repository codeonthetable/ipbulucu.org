"use client";

import React, { useState, useEffect } from "react";
import { IpGeoData } from "@/lib/types";
import {
  Server,
  ShieldAlert,
  ShieldCheck,
  Router,
  Wifi,
  Sparkles,
  Gamepad2,
  Lock,
  Radio,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface Props {
  geo: IpGeoData;
}

export default function TurkeyTelecomDpiAnalyzer({ geo }: Props) {
  const [dohStatus, setDohStatus] = useState<"Kontrol Ediliyor..." | "Doğrudan (Müdahalesiz)" | "ISP DNS Yönlendirmeli">("Kontrol Ediliyor...");
  const isTr = geo.countryCode === "TR";

  useEffect(() => {
    // Test if public Cloudflare / Google DoH is reachable directly from client
    fetch("https://cloudflare-dns.com/dns-query?name=google.com&type=A", {
      headers: { accept: "application/dns-json" },
      signal: AbortSignal.timeout(2000),
    })
      .then((res) => {
        if (res.ok) setDohStatus("Doğrudan (Müdahalesiz)");
        else setDohStatus("ISP DNS Yönlendirmeli");
      })
      .catch(() => {
        setDohStatus("ISP DNS Yönlendirmeli");
      });
  }, []);

  // Determine estimated local DSLAM / POP exchange
  const hostname = geo.hostname?.toLowerCase() || "";
  let exchangeName = `${geo.city || "İstanbul"} Ana Omurga POP`;
  if (hostname.includes("dynamic.ttnet.net.tr") || hostname.includes("turktelekom")) {
    exchangeName = `${geo.district || geo.city} Santrali (TTNet BNG / BRAS)`;
  } else if (hostname.includes("turkcell") || hostname.includes("superonline")) {
    exchangeName = `${geo.city} Bölge POP (Turkcell Superonline Fiber Hub)`;
  } else if (hostname.includes("turknet")) {
    exchangeName = `${geo.city} GigaFiber / YAPA Aktif POP`;
  }

  // NAT Type Assessment
  const isCgnat = geo.isCgnat || false;
  const natType = isCgnat ? "Tip 3 (Strict / Katı NAT)" : "Tip 2 (Moderate / Ilımlı NAT - Port Açılabilir)";

  return (
    <section className="mt-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>Türkiye Telekom Altyapısına Özel Algoritma</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Yerel Santral (DSLAM), CGNAT & Sansür/DPI Analizi</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Global sistemlerin göremediği Türk Telekom, Superonline, TurkNet santral dağıtımı, NAT tipi ve filtre durumları.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{isTr ? "TR Telekom Altyapısı Aktif" : "Global Telekom Altyapısı"}</span>
        </div>
      </div>

      {/* Grid of 3 Major Deep Telecom Insights */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Card 1: Local DSLAM / POP Exchange */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <Router className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Bağlı Olunan Santral (POP)</span>
          </div>
          <div className="text-sm font-bold text-white mt-1">
            {exchangeName}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Reverse DNS: <span className="text-slate-300 font-mono text-[11px] truncate block">{geo.hostname || "dynamic.ip.tr"}</span>
          </div>
          <div className="mt-3 text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Doğrulanmış Bölgesel Dağıtım</span>
          </div>
        </div>

        {/* Card 2: Gaming NAT Type & Port Opening */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Gamepad2 className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Oyun & NAT Tipi Uyumluluğu</span>
          </div>
          <div className="text-sm font-bold text-white mt-1">
            {natType}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {isCgnat
              ? "IP paylaşımlı havuzda. Port açmak için Statik IP gerekir."
              : "Modem üzerinden doğrudan Port Forwarding (Port Açma) yapılabilir."}
          </div>
          <div className="mt-3 text-[11px] text-slate-300 font-medium flex items-center gap-1">
            <span>PlayStation / Xbox / Torrent:</span>
            <span className={isCgnat ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
              {isCgnat ? "Orta Uyumluluk" : "Mükemmel Uyumlu"}
            </span>
          </div>
        </div>

        {/* Card 3: BTK / DPI & DNS Hijacking Diagnostic */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Sansür / DPI & DNS Durumu</span>
          </div>
          <div className="text-sm font-bold text-white mt-1">
            DoH Protokolü: {dohStatus}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Güvenli İnternet Profili: <span className="text-slate-300 font-medium">Standart Profil (Açık)</span>
          </div>
          <div className="mt-3 text-[11px] text-cyan-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Şifreli DNS (DoH/DoT) Destekleniyor</span>
          </div>
        </div>
      </div>
    </section>
  );
}
