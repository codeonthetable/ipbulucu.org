"use client";

import { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Globe,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { BlacklistCheckResult } from "@/lib/types";

const BLACKLIST_FAQS = [
  {
    question: "IP Kara Listesi (DNSBL / RBL) nedir?",
    answer: "DNSBL (DNS-based Blackhole List), spam e-posta gönderen, botnet saldırısına karışan veya kötü amaçlı yazılım yayan IP adreslerinin listelendiği global güvenlik veritabanlarıdır.",
  },
  {
    question: "IP adresim kara listeye girerse ne olur?",
    answer: "IP adresiniz bir kara listede yer alıyorsa, gönderdiğiniz e-postalar karşı tarafın spam kutusuna düşebilir veya sunucu tarafından tamamen reddedilebilir. Ayrıca bazı web sitelerine girişiniz engellenebilir.",
  },
  {
    question: "Kara listeden nasıl çıkılır (Delisting)?",
    answer: "İlgili kara liste sağlayıcısının (örn: Spamhaus, Barracuda) resmi web sitesine girerek 'IP Delist' veya 'Removal Request' formunu doldurmanız gerekir. Öncesinde ağınızdaki virüslü veya spam yayan cihazları temizlediğinizden emin olmalısınız.",
  },
];

const SAMPLE_IPS = ["8.8.8.8", "1.1.1.1", "185.220.101.5", "195.175.39.39"];

export default function BlacklistPage() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BlacklistCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (targetIp: string) => {
    if (!targetIp.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/blacklist?ip=${encodeURIComponent(targetIp.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kara liste kontrolü yapılamadı.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Kontrol sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          10+ Global DNSBL Spam Taraması
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          IP Kara Liste & Spam Kontrolü
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          IP adresinizin veya alan adınızın Spamhaus, Barracuda, SpamCop, SORBS gibi global kara listelerde olup olmadığını anında tarayın.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheck(ip);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="IP adresi veya alan adı girin (Örn: 8.8.8.8)"
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-base shadow-sm"
          />
          <Globe className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
          <button
            type="submit"
            disabled={loading || !ip.trim()}
            className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold text-sm shadow-md transition-all"
          >
            {loading ? "Taranıyor..." : "Kara Liste Testi"}
          </button>
        </form>

        {/* Quick Examples */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs text-gray-500">
          <span className="flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-red-500" /> Popüler:
          </span>
          {SAMPLE_IPS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setIp(item);
                handleCheck(item);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 text-gray-700 dark:text-gray-300 font-mono text-[11px] transition-colors"
            >
              {item}
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
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Hedef IP: <span className="font-mono text-blue-600">{result.ip}</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Toplam {result.totalChecked} global spam veritabanı tarandı.
                </p>
              </div>

              <div>
                {result.listedCount === 0 ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-sm shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    TEMİZ ({result.cleanCount}/{result.totalChecked})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-bold text-sm shadow-sm">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    {result.listedCount} LİSTEDE TESPİT EDİLDİ!
                  </span>
                )}
              </div>
            </div>

            {/* Provider List */}
            <div className="divide-y divide-gray-100 dark:divide-gray-800 mt-4">
              {result.results.map((r, i) => (
                <div key={i} className="py-3.5 flex items-center justify-between text-sm flex-wrap gap-2">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-gray-100 block">
                      {r.name}
                    </span>
                    <span className="font-mono text-xs text-gray-400">
                      {r.host}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {r.listed ? (
                      <>
                        <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-bold text-xs">
                          KARA LİSTEDE
                        </span>
                        {r.delistUrl && (
                          <a
                            href={r.delistUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                          >
                            Delist Talebi <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Temiz (OK)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AdPlaceholder slotId="blacklist-mid-banner" format="leaderboard" />

      <FaqAccordion
        faqs={BLACKLIST_FAQS}
        title="Kara Liste Taraması Hakkında SSS"
        subtitle="Spam listeleri, e-posta teslimatı ve IP güvenliği hakkında merak edilenler"
      />
    </div>
  );
}
