"use client";

import { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Server,
  Globe,
  CheckCircle2,
  XCircle,
  FileCode2,
  Sparkles,
  Award,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

interface HeaderAuditItem {
  name: string;
  header: string;
  present: boolean;
  value: string;
  description: string;
}

interface HeadersData {
  url: string;
  finalUrl: string;
  statusCode: number;
  statusText: string;
  responseTimeMs: number;
  headers: Record<string, string>;
  securityAudit: HeaderAuditItem[];
  scoreGrade: string;
  passedSecurityCount: number;
  totalSecurityHeaders: number;
}

const HEADERS_FAQS = [
  {
    question: "HTTP Güvenlik Başlıkları (Security Headers) neden önemlidir?",
    answer: "Güvenlik başlıkları, web tarayıcılarına sitenizdeki komut dosyalarının, çerezlerin ve kaynakların nasıl işleneceğini söyler. XSS, Clickjacking, MIME sniffing ve SSL stripping gibi web saldırılarını tarayıcı seviyesinde engeller.",
  },
  {
    question: "HSTS (Strict-Transport-Security) nedir?",
    answer: "HSTS, tarayıcının sitenize sonraki tüm ziyaretlerde hiçbir koşulda güvensiz HTTP üzerinden değil, sadece HTTPS üzerinden bağlanmasını zorunlu kılan kritik bir güvenlik başlığıdır.",
  },
  {
    question: "Content-Security-Policy (CSP) nasıl yapılandırılır?",
    answer: "CSP, sitenizde çalışabilecek JavaScript, CSS, resim ve iframe kaynaklarının hangi alan adlarından yüklenebileceğini belirleyen bir beyaz liste başlığıdır.",
  },
];

const SAMPLE_SITES = ["google.com", "github.com", "cloudflare.com", "turktelekom.com.tr"];

export default function HeadersCheckPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HeadersData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/headers?url=${encodeURIComponent(targetUrl.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "HTTP başlıkları analiz edilemedi.");
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 mb-3">
          <FileCode2 className="w-3.5 h-3.5" />
          HTTP Başlıkları & Güvenlik Denetimi
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          HTTP Headers & Güvenlik Başlığı Testi
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Herhangi bir web sitesinin HTTP yanıt başlıklarını, durum kodunu, yanıt süresini ve HSTS, CSP gibi güvenlik başlıklarını test edin.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheck(url);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Web sitesi URL'si girin (Örn: google.com)"
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base shadow-sm"
          />
          <Globe className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold text-sm shadow-md transition-all"
          >
            {loading ? "Taranıyor..." : "Başlıkları İncele"}
          </button>
        </form>

        {/* Quick Examples */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Popüler:
          </span>
          {SAMPLE_SITES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setUrl(s);
                handleCheck(s);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 text-gray-700 dark:text-gray-300 font-mono text-[11px] transition-colors"
            >
              {s}
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
          {/* Top Score Banner */}
          <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Hedef URL: <span className="text-indigo-600 font-mono">{result.finalUrl}</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Durum: <strong className="text-emerald-600 font-mono">{result.statusCode} {result.statusText}</strong> • Yanıt Süresi: <strong className="font-mono">{result.responseTimeMs} ms</strong>
                </p>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">
                    Güvenlik Skoru
                  </span>
                  <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                    {result.scoreGrade}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  <span>{result.passedSecurityCount} / {result.totalSecurityHeaders} Başlık Aktif</span>
                </div>
              </div>
            </div>

            {/* Security Audit Table */}
            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Kritik Güvenlik Başlıkları Denetimi
              </h3>
              {result.securityAudit.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      {item.present ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                      <strong className="text-gray-900 dark:text-white">{item.name}</strong>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </div>

                  <div className="sm:text-right font-mono text-xs max-w-sm truncate">
                    {item.present ? (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold block truncate">
                        {item.value}
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-semibold">
                        Eksik / Yapılandırılmamış
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* All Raw HTTP Headers */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Tüm HTTP Yanıt Başlıkları (Raw Headers)
              </h3>
              <div className="space-y-1.5 font-mono text-xs">
                {Object.entries(result.headers).map(([key, value]) => (
                  <div key={key} className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-1 break-all">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{key}:</span>
                    <span className="text-gray-700 dark:text-gray-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <AdPlaceholder slotId="headers-mid-banner" format="leaderboard" />

      <FaqAccordion
        faqs={HEADERS_FAQS}
        title="HTTP Başlıkları Hakkında SSS"
        subtitle="Web güvenliği ve tarayıcı yönlendirme başlıkları"
      />
    </div>
  );
}
