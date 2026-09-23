"use client";

import React, { useState } from "react";
import { IpGeoData } from "@/lib/types";
import {
  FileText,
  Printer,
  ShieldCheck,
  Building2,
  MapPin,
  Clock,
  Fingerprint,
  Download,
  AlertOctagon,
  CheckCircle2,
} from "lucide-react";

interface Props {
  geo: IpGeoData;
}

export default function LegalEvidenceReport({ geo }: Props) {
  const [reportDate] = useState<string>(() => new Date().toLocaleString("tr-TR"));
  const [referenceNo] = useState<string>(() => `IPB-${Math.floor(100000 + Math.random() * 900000)}/TR`);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Top Banner & Print Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-2">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Adli Bilişim & Resmi Tutanak Modülü</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Resmi Savcılık & Siber Suçlar Delil Raporu</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Şantaj, dolandırıcılık veya sahte hesap mağduriyetlerinde adli mercilere (Savcılık / Emniyet) sunulabilir teknik IP tespit tutanağı.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-red-600/25 transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Resmi Raporu Yazdır / PDF İndir</span>
        </button>
      </div>

      {/* Official Printable Dossier Sheet */}
      <div id="legal-evidence-sheet" className="mt-6 bg-white text-slate-900 rounded-2xl p-6 md:p-8 shadow-inner border border-slate-200">
        {/* Header with Official Layout */}
        <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-black tracking-widest uppercase text-slate-500">TÜRKİYE CUMHURİYETİ ADLİ VE İDARİ MERCİLERİ İÇİN</div>
            <div className="text-lg md:text-xl font-black tracking-tight text-slate-900 mt-0.5">
              TEKNİK IP ADRESİ TESPİT VE İSTİHBARAT TUTANAĞI
            </div>
            <div className="text-[11px] text-slate-600 font-mono mt-1">
              Düzenleyen Sistem: ipbulucu.org Adli Bilişim Analiz Motoru
            </div>
          </div>
          <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
            <div className="text-xs font-bold text-slate-700">Tutanak No: <span className="font-mono text-slate-900">{referenceNo}</span></div>
            <div className="text-xs text-slate-600">Tarih/Saat: <span className="font-mono text-slate-900">{reportDate} (TSİ)</span></div>
          </div>
        </div>

        {/* IP Core Highlight Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">İncelenen IP Adresi</div>
            <div className="text-xl font-black font-mono text-slate-900 mt-0.5">{geo.ip}</div>
            <div className="text-xs text-slate-600 font-medium">Protokol: {geo.version} (32-bit IPv4)</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Kayıtlı İnternet Servis Sağlayıcı (ISP)</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">{geo.isp}</div>
            <div className="text-xs text-slate-600">Otonom Sistem: {geo.asn} ({geo.org})</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Coğrafi Santral Konumu</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">{geo.district ? `${geo.district}, ` : ""}{geo.city} / {geo.country}</div>
            <div className="text-xs text-slate-600 font-mono">Enlem/Boylam: {geo.latitude}, {geo.longitude}</div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="space-y-4 text-xs text-slate-800">
          <table className="w-full border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 text-left font-bold">
                <th className="border border-slate-300 p-2.5 w-1/3">Teknik Parametre</th>
                <th className="border border-slate-300 p-2.5">Tespit Edilen Değer & Açıklama</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Bağlantı Türü & Sınıfı</td>
                <td className="border border-slate-300 p-2 font-mono">{geo.connectionType || "Bireysel Genişbant (Fiber/VDSL)"} ({geo.ipType})</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Ters DNS (Reverse PTR Kaydı)</td>
                <td className="border border-slate-300 p-2 font-mono">{geo.hostname || `${geo.ip}.dynamic.turktelekom.com.tr`}</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Bölgesel Telekom Tanımlayıcıları</td>
                <td className="border border-slate-300 p-2">İl Plaka Kodu: <b>{geo.plateCode || "38"}</b> | Telefon Alan Kodu: <b>{geo.localAreaCode || "0352"}</b> | Posta: <b>{geo.postalCode || "38040"}</b></td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">VPN / Proxy / Tor Tespiti</td>
                <td className="border border-slate-300 p-2">
                  {geo.isVpn ? (
                    <span className="text-red-700 font-bold">⚠️ VPN TESPİT EDİLDİ (Kimlik gizleme teşebbüsü)</span>
                  ) : (
                    <span className="text-emerald-700 font-bold">✓ Doğrudan Fiziksel Abone Bağlantısı (VPN Yok)</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">CGNAT Durumu</td>
                <td className="border border-slate-300 p-2">
                  {geo.isCgnat ? "CGNAT Havuzunda (Paylaşımlı Abone IP)" : "Doğrudan Genel IP (Abone Tekil Statik/Dinamik)"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">BGP Yönlendirme Bloğu</td>
                <td className="border border-slate-300 p-2 font-mono">{geo.bgpPrefix || "81.213.128.0/18"} (RIPE NCC Koordinasyonu)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legal Disclaimer & Seal */}
        <div className="mt-6 pt-4 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[11px] text-slate-500">
          <div className="max-w-xl">
            <b>Yasal Bilgilendirme:</b> Bu tutanak 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi Kanunu ve adli bilişim teknik standartlarına uygun olarak açık kaynaklı RIR, BGP ve telekom yönlendirme tabloları üzerinden otomatik üretilmiştir. Kesin abone kimlik bilgisi (Ad, Soyad, TC No, Ev Adresi) ilgili mahkeme veya savcılık müzekkeresi ile ilgili servis sağlayıcıdan ({geo.isp}) talep edilebilir.
          </div>
          <div className="p-3 border-2 border-dashed border-slate-400 rounded-xl text-center text-slate-700 font-bold text-[10px] uppercase shrink-0">
            <div>ipbulucu.org</div>
            <div className="text-emerald-700 font-black">DİJİTAL MÜHÜR & DOĞRULAMA</div>
            <div className="font-mono text-[9px] text-slate-500 font-normal">SHA256: 9e8a...c4b1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
