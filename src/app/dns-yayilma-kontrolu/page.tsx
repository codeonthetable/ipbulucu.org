"use client";

import { useState } from "react";
import {
  Globe2,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Server,
  Layers,
  Search,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

interface ServerResult {
  serverId: string;
  serverName: string;
  location: string;
  serverIp: string;
  status: "resolved" | "no-record" | "timeout";
  records: string[];
  responseTimeMs: number;
}

interface PropagationData {
  host: string;
  type: string;
  totalServers: number;
  resolvedCount: number;
  propagationPercentage: number;
  results: ServerResult[];
}

const RECORD_TYPES = ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA"];
const SAMPLE_DOMAINS = ["google.com", "cloudflare.com", "turktelekom.com.tr", "github.com"];

const PROPAGATION_FAQS = [
  {
    question: "DNS Yayılma (Propagation) nedir?",
    answer: "DNS yayılması, bir alan adının DNS kayıtlarında yapılan bir değişikliğin dünya genelindeki tüm internet servis sağlayıcıları ve DNS sunucuları tarafından güncellenmesi sürecidir.",
  },
  {
    question: "DNS yayılması neden 24-48 saat sürebilir?",
    answer: "Her DNS kaydının bir TTL (Time to Live) süresi vardır. İnternet servis sağlayıcıları eski DNS kayıtlarını bu süre dolana kadar kendi önbelleklerinde (cache) saklar. TTL süresi dolduğunda yeni kayıtlar çekilir.",
  },
  {
    question: "DNS yayılmasını nasıl hızlandırabilirim?",
    answer: "DNS değişikliği yapmadan önce alan adınızın TTL süresini 300 saniye (5 dakika) gibi düşük bir değere indirin. Değişikliği yaptıktan ve doğruladıktan sonra TTL süresini tekrar normal seviyeye (örn: 3600 veya 86400) yükseltebilirsiniz.",
  },
];

export default function DnsPropagationPage() {
  const [host, setHost] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PropagationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (targetHost: string, type: string) => {
    if (!targetHost.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `/api/propagation?host=${encodeURIComponent(targetHost.trim())}&type=${encodeURIComponent(type)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "DNS yayılma testi başarısız oldu.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Tarama sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 mb-3">
          <Globe2 className="w-3.5 h-3.5" />
          Global DNS Yayılma Testi (DNS Checker)
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          DNS Yayılma Kontrolü (Global DNS Propagation)
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          DNS kayıtlarınızın dünya genelindeki 12+ bağımsız kıta ve omurga sunucusuna yayılıp yayılmadığını canlı haritada kontrol edin.
        </p>
      </div>

      {/* Control Bar */}
      <div className="max-w-3xl mx-auto p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="Alan adı girin (Örn: google.com)"
              className="w-full px-4 py-3.5 pl-11 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>

          <div className="w-full sm:w-36">
            <select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold text-blue-600 dark:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {RECORD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t} Kaydı
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handleCheck(host, recordType)}
            disabled={loading || !host.trim()}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-sm shadow-md transition-all shrink-0"
          >
            {loading ? "Taranıyor..." : "Yayılmayı Test Et"}
          </button>
        </div>

        {/* Quick Examples */}
        <div className="flex items-center gap-2 pt-2 text-xs text-gray-500 flex-wrap">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popüler:
          </span>
          {SAMPLE_DOMAINS.map((dom) => (
            <button
              key={dom}
              type="button"
              onClick={() => {
                setHost(dom);
                handleCheck(dom, recordType);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-gray-700 dark:text-gray-300 font-mono text-[11px] transition-colors"
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="max-w-3xl mx-auto p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm text-center">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Progress Banner */}
          <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Hedef: <span className="text-blue-600 font-mono">{result.host}</span> ({result.type} Kaydı)
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {result.resolvedCount} / {result.totalServers} Global DNS Düğümü Doğrulandı.
                </p>
              </div>

              <div className="text-right">
                <span className="text-3xl font-black text-blue-600 font-mono">
                  %{result.propagationPercentage}
                </span>
                <span className="block text-[11px] font-bold text-gray-400 uppercase">
                  Global Yayılma Durumu
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden mt-4">
              <div
                className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${result.propagationPercentage}%` }}
              />
            </div>

            {/* Server Results List */}
            <div className="divide-y divide-gray-100 dark:divide-gray-800 mt-6">
              {result.results.map((server) => (
                <div key={server.serverId} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white block">
                      {server.serverName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {server.location} • <span className="font-mono">{server.serverIp}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {server.status === "resolved" ? (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {server.records.map((r, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold border border-emerald-200 dark:border-emerald-800"
                          >
                            {r}
                          </span>
                        ))}
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      </div>
                    ) : server.status === "no-record" ? (
                      <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Kayıt Yok
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-lg bg-red-100 dark:bg-red-950/40 text-red-600 text-xs font-semibold flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Zaman Aşımı
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AdPlaceholder slotId="propagation-mid-banner" format="leaderboard" />

      <FaqAccordion
        faqs={PROPAGATION_FAQS}
        title="DNS Yayılması Hakkında SSS"
        subtitle="Global DNS güncelleme süreleri ve ipuçları"
      />
    </div>
  );
}
