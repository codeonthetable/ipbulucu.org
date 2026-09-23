"use client";

import React, { useState } from "react";
import { IpGeoData } from "@/lib/types";
import {
  UserX,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Search,
  FileCheck,
  Eye,
  MessageSquareWarning,
} from "lucide-react";
import LegalEvidenceReport from "./LegalEvidenceReport";

interface Props {
  geo: IpGeoData;
}

export default function ScamHunterCard({ geo }: Props) {
  const [showLegalReport, setShowLegalReport] = useState<boolean>(false);
  const [claimedCountry, setClaimedCountry] = useState<string>("Almanya");
  const [testType, setTestType] = useState<"instagram" | "whatsapp" | "sahibinden" | "genel">("instagram");

  const isRealResidential = !geo.isHosting && !geo.isVpn && !geo.isTor;
  const isForeignCountry = geo.countryCode !== "TR";

  return (
    <section className="mt-8 rounded-3xl border border-rose-500/20 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-2">
            <UserX className="w-3.5 h-3.5" />
            <span>Özel Sosyal Mühendislik Güvenlik Kalkanı</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Dolandırıcı & Sahte Profil Avcısı (Beni Kandırıyorlar mı?)</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Instagram, WhatsApp, Telegram veya Sahibinden üzerinden konuştuğunuz şüpheli kişinin IP gerçekliğini test edin.
          </p>
        </div>

        <button
          onClick={() => setShowLegalReport(!showLegalReport)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all self-start md:self-center"
        >
          <FileCheck className="w-4 h-4 text-rose-400" />
          <span>{showLegalReport ? "Resmi Tutanak Formunu Kapat" : "Savcılık / Adli Tutanak İncele"}</span>
        </button>
      </div>

      {/* Interactive Questionnaire */}
      <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Context Selector */}
        <div className="space-y-4">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Şüpheli İletişim Kanalı:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "instagram", name: "Instagram / DM" },
              { id: "whatsapp", name: "WhatsApp / Tel" },
              { id: "sahibinden", name: "Sahibinden / İkinci El" },
              { id: "genel", name: "E-posta / Link" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTestType(item.id as typeof testType)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                  testType === item.id
                    ? "bg-rose-500/20 border-rose-500/40 text-rose-300 shadow-md shadow-rose-500/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Karşı Taraf Nerede Olduğunu İddia Ediyor?
            </label>
            <select
              value={claimedCountry}
              onChange={(e) => setClaimedCountry(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            >
              <option value="Türkiye">Türkiye (İstanbul / Ankara / vb.)</option>
              <option value="Almanya">Almanya</option>
              <option value="İngiltere">İngiltere (Birleşik Krallık)</option>
              <option value="ABD">Amerika Birleşik Devletleri</option>
              <option value="Fransa">Fransa</option>
              <option value="Hollanda">Hollanda</option>
            </select>
          </div>
        </div>

        {/* Middle & Right: Plain Language Diagnosis Verdicts */}
        <div className="lg:col-span-2 space-y-3">
          {/* Verdict 1: Physical Reality Check */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                <MessageSquareWarning className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  1. Konum Doğruluk Teşhisi
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Karşı taraf <span className="text-rose-400 font-bold">{claimedCountry}</span> olduğunu iddia ediyor. Ancak bu IP adresi{" "}
                  <span className="text-emerald-400 font-bold">{geo.country} ({geo.city})</span> konumuna bağlıdır.
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {claimedCountry.toLowerCase() === geo.country.toLowerCase()
                    ? "✓ İddia edilen ülke ile tespit edilen IP ülkesi uyumlu görünüyor."
                    : "⚠️ UYARI: İddia edilen ülke ile IP ülkesi tamamen farklı! Sahte profil veya lokasyon aldatması olabilir."}
                </div>
              </div>
            </div>
          </div>

          {/* Verdict 2: Real Human vs Bot Server */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  2. Cihaz ve Bağlantı Gerçekliği
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Bu bağlantı <span className="text-slate-200 font-semibold">{geo.isp}</span> operatörüne ait bir{" "}
                  <span className="text-cyan-400 font-semibold">{geo.ipType || "Ev / Bireysel"}</span> hattından geliyor.
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {isRealResidential
                    ? "✓ Bağlantı doğrudan gerçek bir ev interneti veya cep telefonundan geliyor. Sunucu / bot havuzu değil."
                    : "🚨 TEHLİKE: Bu bağlantı veri merkezinden (hosting/sunucu) veya VPN arkasından geliyor. Otomatik bot veya kimliğini gizleyen biri olabilir!"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render Legal Evidence Sheet when toggled */}
      {showLegalReport && (
        <div className="relative z-10 mt-8">
          <LegalEvidenceReport geo={geo} />
        </div>
      )}
    </section>
  );
}
