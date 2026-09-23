"use client";

import { useState } from "react";
import { Server, Globe, CheckCircle, Database, Shield, Zap, Sparkles, Copy, Check } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { DnsLookupResult } from "@/lib/types";

const DNS_FAQS = [
  {
    question: "DNS (Domain Name System) nedir?",
    answer: "DNS, internetin telefon rehberidir. İnsanların hatırlayabileceği alan adlarını (örn: google.com), bilgisayarların ve yönlendiricilerin anladığı IP adreslerine (örn: 142.250.184.206) dönüştürür.",
  },
  {
    question: "A ve AAAA kaydı arasındaki fark nedir?",
    answer: "A (Address) kaydı bir alan adını 32-bit IPv4 adresine yönlendirirken; AAAA kaydı 128-bit IPv6 adresine yönlendirir.",
  },
  {
    question: "MX kaydı ne işe yarar?",
    answer: "MX (Mail Exchange) kayıtları, alan adınıza gelen e-postaların hangi e-posta sunucusuna (Google Workspace, Microsoft 365, Yandex Mail vb.) iletileceğini belirler.",
  },
  {
    question: "DNS yayılma (Propagation) süresi ne kadardır?",
    answer: "DNS kayıtlarında yapılan bir değişikliğin dünya genelindeki tüm internet servis sağlayıcılarına ve DNS sunucularına yayılması genellikle 15 dakika ile 48 saat arasında sürer (TTL süresine bağlıdır).",
  },
];

const POPULAR_DOMAINS = ["google.com", "cloudflare.com", "turktelekom.com.tr", "github.com"];

export default function DnsLookupPage() {
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DnsLookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (targetHost: string) => {
    if (!targetHost.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/dns?host=${encodeURIComponent(targetHost.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "DNS kayıtları alınamadı.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "DNS sorgusu sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 mb-3">
          <Server className="w-3.5 h-3.5" />
          DNS Kayıt Çözümleme & NS Sorgulama
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          DNS Sorgulama & Kayıt Kontrolü
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Bir alan adına ait A (IPv4), AAAA (IPv6), MX (Mail), TXT (SPF/DMARC), NS ve CNAME kayıtlarını listeleyin.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup(host);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="Alan adı girin (Örn: cloudflare.com veya google.com)"
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base shadow-sm"
          />
          <Globe className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
          <button
            type="submit"
            disabled={loading || !host.trim()}
            className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold text-sm shadow-md transition-all"
          >
            {loading ? "Çözümleniyor..." : "DNS Sorgula"}
          </button>
        </form>

        {/* Quick Sample Domains */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs text-gray-500">
          <span className="flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Popüler:
          </span>
          {POPULAR_DOMAINS.map((dom) => (
            <button
              key={dom}
              type="button"
              onClick={() => {
                setHost(dom);
                handleLookup(dom);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 text-gray-700 dark:text-gray-300 transition-colors font-mono text-[11px]"
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm text-center">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 flex-wrap gap-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                DNS Kayıtları: <span className="text-indigo-600 font-mono">{result.host}</span>
              </h2>
              {result.responseTimeMs && (
                <span className="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg">
                  Sorgu Süresi: {result.responseTimeMs} ms
                </span>
              )}
            </div>

            {/* A (IPv4) Records */}
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-3">
                A Kayıtları (IPv4 Adresleri)
              </span>
              {result.records.A && result.records.A.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.records.A.map((ip, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-sm">
                      {ip}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-gray-400">Bu alan adına ait A kaydı bulunamadı.</span>
              )}
            </div>

            {/* AAAA (IPv6) Records */}
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-3">
                AAAA Kayıtları (IPv6 Adresleri)
              </span>
              {result.records.AAAA && result.records.AAAA.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.records.AAAA.map((ip6, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-xs font-semibold text-gray-800 dark:text-gray-200 shadow-sm">
                      {ip6}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-gray-400">Bu alan adına ait IPv6 kaydı bulunamadı.</span>
              )}
            </div>

            {/* MX Records */}
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-3">
                MX Kayıtları (Mail Exchange - E-Posta Sunucuları)
              </span>
              {result.records.MX && result.records.MX.length > 0 ? (
                <div className="space-y-2">
                  {result.records.MX.map((mx, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-xs">
                      <span className="font-semibold">{mx.exchange}</span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold">
                        Öncelik: {mx.priority}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-gray-400">MX kaydı tanımlanmamış.</span>
              )}
            </div>

            {/* NS Records */}
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-3">
                NS Kayıtları (Name Servers - Yetkili Alan Adı Sunucuları)
              </span>
              {result.records.NS && result.records.NS.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.records.NS.map((ns, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-xs font-semibold text-gray-800 dark:text-gray-200 shadow-sm">
                      {ns}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-gray-400">NS kaydı bulunamadı.</span>
              )}
            </div>

            {/* TXT Records */}
            {result.records.TXT && result.records.TXT.length > 0 && (
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 block mb-3">
                  TXT / SPF / DKIM / DMARC Kayıtları
                </span>
                <div className="space-y-2">
                  {result.records.TXT.map((txtArr, i) => (
                    <div key={i} className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-xs break-all text-gray-700 dark:text-gray-300">
                      {txtArr.join(" ")}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <AdPlaceholder slotId="dns-mid-banner" format="leaderboard" />

      <FaqAccordion
        faqs={DNS_FAQS}
        title="DNS ve Kayıt Türleri Hakkında SSS"
        subtitle="Domain yönlendirmeleri ve DNS çözümlemesi hakkında detaylar"
      />
    </div>
  );
}
