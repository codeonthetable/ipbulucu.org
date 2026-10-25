"use client";
import { toolFetch } from "@/lib/usage";

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
import TroubleshootingGuide from "@/components/TroubleshootingGuide";
import DiagnosticResultSummary from "@/components/DiagnosticResultSummary";
import { emailSummary } from "@/lib/diagnostic-summary";

interface EmailSecurityData {
  domain: string;
  score: number;
  statusLabel: string;
  mx: {
    present: boolean;
    records: { exchange: string; priority: number }[];
  };
  spf: {
    count: number;
    present: boolean;
    record: string | null;
    status: string;
  };
  dmarc: {
    count: number;
    present: boolean;
    record: string | null;
    status: string;
  };
}

const EMAIL_FAQS = [
  {
    question: "SPF (Sender Policy Framework) nedir?",
    answer: "SPF, zarf gönderen alan adı için izin verilen posta sunucularını belirten DNS TXT kaydıdır. Tek başına görünen gönderen adresini veya teslimatı doğrulamaz; DKIM ve DMARC ile birlikte değerlendirilir.",
  },
  {
    question: "DMARC kaydı ne işe yarar?",
    answer: "DMARC, görünen gönderen alan adıyla hizalanmış SPF veya DKIM sonucunu değerlendirir ve başarısız iletiler için alan adının politikasını bildirir. DNS'te kayıt bulunması, gerçek bir iletinin DMARC doğrulamasını geçtiğini göstermez.",
  },
  {
    question: "E-postalarım neden spam kutusuna düşüyor?",
    answer: "Kimlik doğrulama, gönderici itibarı, şikâyetler, içerik ve alıcı politikası teslimatı etkileyebilir. Bu araç DNS kayıt varlığını gösterir. Gerçek neden için test iletisinin doğrulama başlığını ve varsa alıcı sunucunun hata kodunu inceleyin.",
  },
];

const SAMPLE_DOMAINS = ["google.com", "microsoft.com", "turktelekom.com.tr", "trendyol.com"];

export default function EmailSecurityPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailSecurityData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const nullMx = result?.mx.records.length === 1 && result.mx.records[0].priority === 0 && result.mx.records[0].exchange === ".";

  const handleCheck = async (targetDomain: string) => {
    if (!targetDomain.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await toolFetch(
        `/api/email-security?domain=${encodeURIComponent(targetDomain.trim())}`, undefined, "user"
      );
      const data = await res.json();
      if (!res.ok || data.success === false || data.error) throw new Error(data.error || "E-posta güvenlik analizi yapılamadı.");
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
          E-Posta DNS Kayıtları
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          MX, SPF ve DMARC Kaydı Kontrolü
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Alan adınızın MX, SPF ve doğrudan _dmarc TXT kayıtlarını inceleyin. Eksik veya birden fazla kaydı görün.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Oran yalnızca MX, tek SPF ve tek DMARC kaydı varlığını gösterir; güvenlik veya teslimat puanı değildir. DKIM, SPF include zinciri, ileti hizalaması ve üst alan adı politikası test edilmez. MX değeri “0 .” posta kabul edilmediğini belirtir.</p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheck(domain);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            aria-label="Alan adı"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Alan adı girin (Örn: firmaniz.com)"
            className="w-full min-w-0 px-5 py-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base shadow-sm"
          />
          <button
            type="submit"
            disabled={loading || !domain.trim()}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold text-sm shadow-md transition-all"
          >
            {loading ? "Test Ediliyor..." : "Kayıtları Kontrol Et"}
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
                  Kayıt Durumu: <strong>{result.statusLabel}</strong>
                </p>
              </div>

              <div className="text-right">
                <span className="text-3xl font-black text-emerald-600 font-mono">
                  %{result.score}
                </span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase">
                  Kayıt Varlığı Oranı
                </span>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              {/* SPF Result */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {result.spf.count === 1 ? (
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
                      result.spf.count === 1
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
                    Bu alan adında SPF kaydı bulunamadı.
                  </p>
                )}
              </div>

              {/* DMARC Result */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {result.dmarc.count === 1 ? (
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
                      result.dmarc.count === 1
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
                    Bu adreste DMARC kaydı bulunamadı. Üst alan adı politikası bu testte incelenmez.
                  </p>
                )}
              </div>

              {/* MX Records */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {result.mx.present && !nullMx ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-bold text-gray-900 dark:text-white text-sm">
                      MX Kayıtları ({result.mx.records.length} kayıt)
                    </span>
                  </div>
                </div>
                {nullMx && <p className="text-sm text-amber-700 dark:text-amber-400 mb-2">Null MX: bu alan adı posta kabul etmediğini bildiriyor.</p>}
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
                  <p className="text-xs text-red-500 mt-1">MX kaydı bulunamadı. Bazı sunucular A/AAAA kaydına geri dönebilir; teslimat test edilmedi.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {result && <DiagnosticResultSummary summary={emailSummary(result, "tr")} />}
      <TroubleshootingGuide kind="email" />

      <AdPlaceholder slotId="email-sec-mid-banner" format="leaderboard" />

      {/* Privacy & Security Tip Card */}
      <div className="max-w-3xl mx-auto rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="text-2xl leading-none select-none">💡</div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Gizlilik & Güvenlik İpucu
            </h3>
            <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
              <strong>Güvenlik İpucu:</strong> Kişisel e-posta adresinizi spam ve veri sızıntılarından korumak için kayıt gerektirmeyen{" "}
              <a
                href="https://gecici.email/"
                target="_blank"
                rel="noopener"
                title="Spam korumalı reklamsız geçici posta ve onay kodu servisi"
                className="font-bold text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500 transition-colors"
              >
                gecici.email
              </a>{" "}
              tek kullanımlık e-posta istasyonunu kullanabilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <FaqAccordion
        faqs={EMAIL_FAQS}
        title="E-Posta Güvenliği Hakkında SSS"
        subtitle="SPF, DMARC ve e-posta spama düşme çözümleri"
      />
    </div>
  );
}
