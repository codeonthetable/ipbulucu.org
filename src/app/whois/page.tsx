"use client";

import { useState } from "react";
import {
  Search,
  Globe,
  Shield,
  Calendar,
  Server,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  Code,
  Layers,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { WhoisRecord } from "@/lib/types";

const WHOIS_FAQS = [
  {
    question: "Whois sorgulaması nedir?",
    answer: "Whois, bir alan adının (domain) veya IP adres bloğunun kime ait olduğunu, hangi tescil firmasında (registrar) barındığını, kayıt ve bitiş tarihlerini gösteren uluslararası bir veritabanı sorgu protokolüdür.",
  },
  {
    question: ".tr uzantılı domainlerde Whois nasıl çalışır?",
    answer: "Türkiye'nin resmi alan adı otoritesi TRABIS (BTK) tarafından yönetilen .tr, .com.tr, .org.tr uzantıları doğrudan TRABIS veritabanı üzerinden doğrulanır.",
  },
  {
    question: "Whois gizliliği (Whois Privacy) nedir?",
    answer: "Alan adı sahiplerinin kişisel ad, soyad, telefon ve e-posta gibi bilgilerinin kötü niyetli kişiler veya spam göndericiler tarafından görülmesini engellemek amacıyla tescil firmaları tarafından sağlanan gizleme hizmetidir.",
  },
  {
    question: "IP Whois ile Domain Whois arasındaki fark nedir?",
    answer: "Domain Whois sorgusu alan adının sahipliğini gösterirken, IP Whois sorgusu o IP adresinin hangi internet servis sağlayıcısına (ISP) veya şirkete tahsis edildiğini gösterir.",
  },
];

const POPULAR_DOMAINS = ["google.com", "turktelekom.com.tr", "cloudflare.com", "trendyol.com"];

export default function WhoisPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WhoisRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "raw">("summary");
  const [copiedRaw, setCopiedRaw] = useState(false);

  const handleLookup = async (lookupQuery: string) => {
    if (!lookupQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/whois?query=${encodeURIComponent(lookupQuery.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Whois bilgisi alınamadı.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Sorgulama sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRaw = () => {
    if (result?.rawText) {
      navigator.clipboard.writeText(result.rawText);
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 mb-3">
          <Search className="w-3.5 h-3.5" />
          Evrensel Whois & RDAP Analiz Motoru
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Domain & IP Whois Sorgulama
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          .com, .net, .org, .tr, .com.tr ve tüm global TLD alan adlarının tescil firması, kayıt ve bitiş tarihlerini sorgulayın.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup(query);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Alan adı veya IP girin (Örn: turktelekom.com.tr veya google.com)"
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
          />
          <Globe className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold text-sm shadow-md transition-all"
          >
            {loading ? "Sorgulanıyor..." : "Whois Sorgula"}
          </button>
        </form>

        {/* Quick Examples */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs text-gray-500">
          <span>Örnekler:</span>
          {POPULAR_DOMAINS.map((dom) => (
            <button
              key={dom}
              type="button"
              onClick={() => {
                setQuery(dom);
                handleLookup(dom);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 text-gray-700 dark:text-gray-300 font-mono text-[11px] transition-colors"
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
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("summary")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "summary"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Özet Bilgiler
              </button>
              <button
                onClick={() => setActiveTab("raw")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "raw"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                }`}
              >
                <Code className="w-3.5 h-3.5" /> Ham WHOIS Metni
              </button>
            </div>

            {activeTab === "raw" && (
              <button
                onClick={handleCopyRaw}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                {copiedRaw ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedRaw ? "Kopyalandı" : "Metni Kopyala"}
              </button>
            )}
          </div>

          {activeTab === "summary" ? (
            <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 mb-6 flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Whois Sonuçları: <span className="text-blue-600 font-mono">{result.domainOrIp}</span>
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Aktif / Kayıtlı
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block uppercase">
                    Kayıt Firması (Registrar)
                  </span>
                  <p className="text-base font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {result.registrar || "Bilinmiyor"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block uppercase">
                    Kayıtlı Kuruluş / Sahip
                  </span>
                  <p className="text-base font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {result.organization || "Gizli / Whois Korumalı"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block uppercase">
                    Kayıt Tarihi (Created)
                  </span>
                  <p className="text-base font-bold text-gray-900 dark:text-gray-100 mt-1 font-mono">
                    {result.registeredOn}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block uppercase">
                    Bitiş Tarihi (Expires)
                  </span>
                  <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                    {result.expiresOn}
                  </p>
                </div>
              </div>

              {/* Name Servers */}
              {result.nameServers && result.nameServers.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Name Server (NS) Sunucuları
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.nameServers.map((ns, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono text-xs border border-blue-200 dark:border-blue-900 font-semibold"
                      >
                        {ns}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl bg-gray-950 border border-gray-800 p-6 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre-wrap max-h-[500px] leading-relaxed">
              {result.rawText || "Ham metin bulunamadı."}
            </div>
          )}
        </div>
      )}

      <AdPlaceholder slotId="whois-mid-banner" format="leaderboard" />

      <FaqAccordion
        faqs={WHOIS_FAQS}
        title="Whois Sorgulama Hakkında SSS"
        subtitle="Alan adı sahipliği ve tescil kayıtları hakkında bilinmesi gerekenler"
      />
    </div>
  );
}
