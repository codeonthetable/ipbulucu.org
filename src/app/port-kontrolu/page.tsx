"use client";

import { useState } from "react";
import { Zap, Server, Shield, CheckCircle2, XCircle, AlertCircle, Play, Layers } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { PortCheckResult } from "@/lib/types";

const POPULAR_PORTS = [
  { port: 80, name: "HTTP (Web)" },
  { port: 443, name: "HTTPS (Web SSL)" },
  { port: 22, name: "SSH (Uzak Erişim)" },
  { port: 21, name: "FTP (Dosya Aktarımı)" },
  { port: 25, name: "SMTP (Mail)" },
  { port: 53, name: "DNS Servisi" },
  { port: 3306, name: "MySQL Veritabanı" },
  { port: 3389, name: "RDP (Uzak Masaüstü)" },
  { port: 8080, name: "HTTP-Proxy / Alt" },
  { port: 8443, name: "HTTPS Alt" },
];

const PORT_FAQS = [
  {
    question: "Port kontrolü (Port Checker) nedir?",
    answer: "Port kontrolü, modeminiz veya sunucunuz üzerinde belirli bir ağ portunun (örn: 80, 443, 22) dış internet dünyasına açık olup olmadığını test eden bir güvenlik ve ağ aracıdır.",
  },
  {
    question: "Port yönlendirme (Port Forwarding) neden yapılır?",
    answer: "Ev veya ofis ağınızdaki bir cihaza (kamera sistemi, Minecraft sunucusu, NAS depolama veya web sunucusu) dışarıdan internet üzerinden erişebilmek için modeminizde o porta ait yönlendirme kuralı açılır.",
  },
  {
    question: "Kapalı (Closed) ile Filtreli (Filtered/Stealth) port arasındaki fark nedir?",
    answer: "Kapalı port, sunucunun/cihazın aktif olduğunu ancak o portta hiçbir servisin dinlemediğini belirtir. Filtreli port ise bir güvenlik duvarının (Firewall) veya CGNAT yapısının gelen paketleri tamamen sessizce düşürdüğünü gösterir.",
  },
];

export default function PortCheckPage() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("80");
  const [loading, setLoading] = useState(false);
  const [batchLoading, setBatchLoading] = useState(false);
  const [singleResult, setSingleResult] = useState<PortCheckResult | null>(null);
  const [batchResults, setBatchResults] = useState<
    { port: number; service: string; status: "open" | "closed" | "filtered"; responseTimeMs: number }[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const handleSingleCheck = async (portNumber: string) => {
    if (!host.trim()) {
      setError("Lütfen test edilecek bir IP veya alan adı girin.");
      return;
    }

    setLoading(true);
    setError(null);
    setSingleResult(null);
    setBatchResults(null);

    try {
      const res = await fetch(
        `/api/port?host=${encodeURIComponent(host.trim())}&port=${encodeURIComponent(portNumber)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Port testi başarısız oldu.");
      setSingleResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Port kontrolü sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleBatchScan = async () => {
    if (!host.trim()) {
      setError("Lütfen taranacak bir IP veya alan adı girin.");
      return;
    }

    setBatchLoading(true);
    setError(null);
    setSingleResult(null);
    setBatchResults(null);

    const portListStr = POPULAR_PORTS.map((p) => p.port).join(",");

    try {
      const res = await fetch(
        `/api/port?host=${encodeURIComponent(host.trim())}&ports=${encodeURIComponent(portListStr)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Toplu port taraması başarısız oldu.");
      setBatchResults(data.results);
    } catch (err: unknown) {
      setError((err as Error).message || "Tarama sırasında bir hata oluştu.");
    } finally {
      setBatchLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 mb-3">
          <Zap className="w-3.5 h-3.5" />
          Açık Port Test & Güvenlik Taraması
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Açık Port Kontrolü (Port Scanner)
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Sunucunuzun, modeminizin veya IP adresinizin portlarının dış internete açık olup olmadığını tek tıkla test edin.
        </p>
      </div>

      {/* Control Form */}
      <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Hedef IP veya Alan Adı
            </label>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="Örn: 8.8.8.8 veya google.com"
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Port Numarası
            </label>
            <input
              type="number"
              min="1"
              max="65535"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="80"
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleSingleCheck(port)}
            disabled={loading || batchLoading || !host.trim() || !port.trim()}
            className="py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Test Ediliyor..." : `Portu Test Et (${port})`}
          </button>

          <button
            onClick={handleBatchScan}
            disabled={loading || batchLoading || !host.trim()}
            className="py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {batchLoading ? "Tüm Portlar Taranıyor..." : "Top 10 Portu Tara (Toplu)"}
          </button>
        </div>

        {/* Quick Popular Ports */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs font-semibold text-gray-500 block mb-2">
            Hızlı Popüler Port Seçimi:
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_PORTS.map((p) => (
              <button
                key={p.port}
                type="button"
                onClick={() => {
                  setPort(p.port.toString());
                  if (host.trim()) handleSingleCheck(p.port.toString());
                }}
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-gray-700 dark:text-gray-300 hover:text-emerald-600 text-xs font-medium border border-gray-200 dark:border-gray-700 transition-colors"
              >
                {p.port} ({p.name.split(" ")[0]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm text-center">
          {error}
        </div>
      )}

      {/* Single Port Result */}
      {singleResult && (
        <div className="max-w-2xl mx-auto">
          <div
            className={`rounded-3xl border p-6 sm:p-8 text-center space-y-4 shadow-sm ${
              singleResult.status === "open"
                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900"
                : "bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
            }`}
          >
            <div className="flex items-center justify-center">
              {singleResult.status === "open" ? (
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center">
                  <XCircle className="w-10 h-10" />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Port {singleResult.port} ({singleResult.service}):{" "}
                <span
                  className={
                    singleResult.status === "open"
                      ? "text-emerald-600 dark:text-emerald-400 uppercase"
                      : "text-red-600 dark:text-red-400 uppercase"
                  }
                >
                  {singleResult.status === "open"
                    ? "AÇIK (OPEN)"
                    : singleResult.status === "closed"
                    ? "KAPALI (CLOSED)"
                    : "FİLTRELİ / ZAMAN AŞIMI"}
                </span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Hedef: <strong className="font-mono">{singleResult.ip}</strong> • Yanıt Süresi:{" "}
                <strong className="font-mono">{singleResult.responseTimeMs} ms</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Batch Scan Results */}
      {batchResults && (
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              Toplu Port Tarama Sonuçları: <span className="font-mono text-blue-600">{host}</span>
            </h2>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {batchResults.map((r) => (
                <div key={r.port} className="py-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-gray-900 dark:text-white w-14">
                      {r.port}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                      {r.service}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-mono hidden sm:inline">
                      {r.responseTimeMs} ms
                    </span>
                    {r.status === "open" ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> AÇIK
                      </span>
                    ) : r.status === "closed" ? (
                      <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold text-xs">
                        KAPALI
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold text-xs">
                        FİLTRELİ
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AdPlaceholder slotId="port-mid-banner" format="leaderboard" />

      <FaqAccordion
        faqs={PORT_FAQS}
        title="Port Kontrolü Hakkında SSS"
        subtitle="Ağ portları, modem yönlendirme ve güvenlik duvarı hakkında detaylar"
      />
    </div>
  );
}
