"use client";

import { useState } from "react";
import {
  Mail,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Globe,
  Sparkles,
  Server,
  Lock,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

interface EmailSecurityData {
  domain: string;
  score: number;
  statusLabel: string;
  mx: {
    present: boolean;
    records: { exchange: string; priority: number }[];
  };
  spf: {
    present: boolean;
    record: string | null;
    status: string;
  };
  dmarc: {
    present: boolean;
    record: string | null;
    status: string;
  };
}

const EMAIL_FAQS = [
  {
    question: "SPF (Sender Policy Framework) nedir?",
    answer: "SPF, alan adınız adına hangi IP adreslerinin veya e-posta sunucularının (Google Workspace, Microsoft 365 vb.) e-posta göndermeye yetkili olduğunu belirten bir DNS TXT kaydıdır. Sahte e-posta gönderimini (spoofing) engeller.",
  },
  {
    question: "DMARC kaydı ne işe yarar?",
    answer: "DMARC, SPF ve DKIM doğrulamalarından geçemeyen sahte e-postaların alıcı sunucular (Gmail, Yahoo, Outlook) tarafından nasıl işleneceğini (karantinaya alma veya doğrudan reddetme) belirleyen en üst düzey e-posta güvenlik protokolüdür.",
  },
  {
    question: "E-postalarım neden spam kutusuna düşüyor?",
    answer: "Alan adınızda SPF veya DMARC kayıtları eksik veya hatalıysa, Gmail ve Yahoo gibi büyük sağlayıcılar 2024 sonrası yeni güvenlik kuralları gereğince e-postalarınızı spam kutusuna atar veya tamamen engeller.",
  },
];

const SAMPLE_DOMAINS = ["google.com", "microsoft.com", "turktelekom.com.tr", "trendyol.com"];

export default function EmailSecurityPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailSecurityData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (targetDomain: string) => {
    if (!targetDomain.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `/api/email-security?domain=${encodeURIComponent(targetDomain.trim())}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "E-posta güvenlik analizi yapılamadı.");
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 mb-3">
          <Mail className="w-3.5 h-3.5" />
          E-Posta Teslimat & Sahtecilik Önleme
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          SPF, DMARC & E-Posta Güvenlik Testi
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Alan adınızın SPF, DMARC ve MX kayıtlarını doğrulayarak e-postalarınızın spama düşmesini ve adınıza sahte e-posta gönderilmesini engelleyin.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheck(domain);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Alan adı girin (Örn: firmaniz.com)"
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base shadow-sm"
          />
          <Globe className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
          <button
            type="submit"
            disabled={loading || !domain.trim()}
            className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold text-sm shadow-md transition-all"
          >
            {loading ? "Test Ediliyor..." : "Güvenliği Test Et"}
          </button>
        </form>

        {/* Quick Examples */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Popüler:
          </span>
          {SAMPLE_DOMAINS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => {
                setDomain(d);
                handleCheck(d);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 text-gray-700 dark:text-gray-300 font-mono text-[11px] transition-colors"
            >
              {d}
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Alan Adı: <span className="text-emerald-600 font-mono">{result.domain}</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  E-Posta Teslimat Durumu: <strong>{result.statusLabel}</strong>
                </p>
              </div>

              <div className="text-right">
                <span className="text-3xl font-black text-emerald-600 font-mono">
                  %{result.score}
                </span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase">
                  Teslimat & Güvenlik Puanı
                </span>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              {/* SPF Result */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {result.spf.present ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-bold text-gray-900 dark:text-white text-sm">
                      SPF Kaydı (Sender Policy Framework)
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      result.spf.present
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                    }`}
                  >
                    {result.spf.status}
                  </span>
                </div>
                {result.spf.record ? (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-gray-900 font-mono text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 break-all">
                    {result.spf.record}
                  </div>
                ) : (
                  <p className="text-xs text-red-500 mt-1">
                    Alan adınızda SPF kaydı bulunamadı. E-postalarınızın spama düşme riski yüksektir.
                  </p>
                )}
              </div>

              {/* DMARC Result */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {result.dmarc.present ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-bold text-gray-900 dark:text-white text-sm">
                      DMARC Kaydı (_dmarc.{result.domain})
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      result.dmarc.present
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                    }`}
                  >
                    {result.dmarc.status}
                  </span>
                </div>
                {result.dmarc.record ? (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-gray-900 font-mono text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 break-all">
                    {result.dmarc.record}
                  </div>
                ) : (
                  <p className="text-xs text-red-500 mt-1">
                    DMARC kaydı bulunamadı. Adınıza sahte e-posta gönderimi yapılamaması için DMARC tanımlamanız önerilir.
                  </p>
                )}
              </div>

              {/* MX Records */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {result.mx.present ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-bold text-gray-900 dark:text-white text-sm">
                      MX Kayıtları ({result.mx.records.length} Sunucu)
                    </span>
                  </div>
                </div>
                {result.mx.records.length > 0 ? (
                  <div className="space-y-1.5 mt-2">
                    {result.mx.records.map((mx, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-900 font-mono text-xs border border-gray-100 dark:border-gray-700">
                        <span>{mx.exchange}</span>
                        <span className="text-gray-400">Öncelik: {mx.priority}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-red-500 mt-1">MX kaydı bulunamadı; bu alan adına e-posta gönderilemez.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <AdPlaceholder slotId="email-sec-mid-banner" format="leaderboard" />

      <FaqAccordion
        faqs={EMAIL_FAQS}
        title="E-Posta Güvenliği Hakkında SSS"
        subtitle="SPF, DMARC ve e-posta spama düşme çözümleri"
      />
    </div>
  );
}
