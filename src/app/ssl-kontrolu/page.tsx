"use client";

import { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Lock,
  Server,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

interface SslData {
  host: string;
  authorized: boolean;
  authError: string | null;
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  isExpired: boolean;
  san: string[];
  serialNumber: string;
  fingerprint: string;
  tlsProtocol: string;
  cipherName: string;
}

const SSL_FAQS = [
  {
    question: "SSL / TLS Sertifikası nedir?",
    answer: "SSL (Secure Sockets Layer) ve modern halefi TLS (Transport Layer Security), kullanıcının tarayıcısı ile web sunucusu arasındaki veri trafiğini şifreleyerek üçüncü şahısların dinlemesini veya değiştirmesini engelleyen bir güvenlik protokolüdür.",
  },
  {
    question: "SSL sertifikası süresi dolarsa ne olur?",
    answer: "Sertifika süresi dolduğunda tarayıcılar (Chrome, Safari, Edge) kullanıcılara 'Bağlantınız Gizli Değil' uyarısı verir ve sitenize erişimi engeller. Bu durum ziyaretçi ve ciro kaybına neden olur.",
  },
  {
    question: "Let's Encrypt ile ücretli SSL sertifikaları arasındaki fark nedir?",
    answer: "Let's Encrypt ücretsiz 90 günlük sertifikalar sunar ve otomatik yenilenebilir. Ücretli sertifikalar (DigiCert, Sectigo) ise genellikle kurumsal doğrulama (OV/EV), garanti sigortası ve 1 yıllık süre sunar; şifreleme kalitesi açısından ikisi de aynı 256-bit AES şifrelemeyi kullanır.",
  },
];

const SAMPLE_HOSTS = ["google.com", "cloudflare.com", "turktelekom.com.tr", "trendyol.com"];

export default function SslCheckPage() {
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SslData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (targetHost: string) => {
    if (!targetHost.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/ssl?host=${encodeURIComponent(targetHost.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "SSL sertifikası kontrol edilemedi.");
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
          <Lock className="w-3.5 h-3.5" />
          SSL / TLS Güvenlik Doğrulayıcı
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          SSL Sertifika Kontrolü (SSL Checker)
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Web sitenizin SSL sertifikasının geçerliliğini, kalan gün sayısını, yayıncı otoritesini ve TLS şifreleme sürümünü anında test edin.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheck(host);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="Alan adı girin (Örn: google.com veya siteniz.com)"
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base shadow-sm"
          />
          <Globe className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
          <button
            type="submit"
            disabled={loading || !host.trim()}
            className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold text-sm shadow-md transition-all"
          >
            {loading ? "Test Ediliyor..." : "SSL Kontrol Et"}
          </button>
        </form>

        {/* Quick Examples */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Popüler:
          </span>
          {SAMPLE_HOSTS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => {
                setHost(h);
                handleCheck(h);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 text-gray-700 dark:text-gray-300 font-mono text-[11px] transition-colors"
            >
              {h}
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-500" />
                  SSL Sertifikası: <span className="text-emerald-600 font-mono">{result.host}</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Protokol: <strong>{result.tlsProtocol}</strong> • Şifre: <strong>{result.cipherName}</strong>
                </p>
              </div>

              <div>
                {!result.isExpired ? (
                  <div className="px-4 py-2 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-sm text-center shadow-sm">
                    <span className="block text-2xl font-black font-mono">{result.daysRemaining} Gün</span>
                    <span className="text-[11px] uppercase">Geçerlilik Süresi</span>
                  </div>
                ) : (
                  <div className="px-4 py-2 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-bold text-sm text-center shadow-sm">
                    <span className="block text-xl font-black">SÜRESİ DOLMUŞ</span>
                  </div>
                )}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase block">
                  Sertifika Sağlayıcısı (Issuer)
                </span>
                <p className="text-base font-bold text-gray-900 dark:text-white mt-1">
                  {result.issuer}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase block">
                  Sertifika Sahibi (Common Name)
                </span>
                <p className="text-base font-bold text-gray-900 dark:text-white mt-1">
                  {result.subject}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase block">
                  Başlangıç Tarihi
                </span>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-1 font-mono">
                  {new Date(result.validFrom).toLocaleDateString("tr-TR")}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase block">
                  Bitiş Tarihi (Expiration)
                </span>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                  {new Date(result.validTo).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </div>

            {/* SAN Alternative Names */}
            {result.san && result.san.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                  Kapsanan Alan Adları (SAN)
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                  {result.san.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono">
                      {s.replace("DNS:", "")}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <AdPlaceholder slotId="ssl-mid-banner" format="leaderboard" />

      <FaqAccordion
        faqs={SSL_FAQS}
        title="SSL / TLS Güvenliği Hakkında SSS"
        subtitle="Web sitesi şifreleme ve sertifika yönetimi hakkında bilgiler"
      />
    </div>
  );
}
