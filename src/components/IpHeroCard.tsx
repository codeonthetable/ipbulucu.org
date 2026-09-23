"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Search,
  ShieldCheck,
  ShieldAlert,
  Wifi,
  Globe,
  Sparkles,
} from "lucide-react";
import { IpGeoData } from "@/lib/types";

interface IpHeroCardProps {
  initialData: IpGeoData;
  onSearch?: (ipOrDomain: string) => void;
  isLoading?: boolean;
}

const SAMPLE_QUERIES = ["8.8.8.8", "1.1.1.1", "google.com", "turktelekom.com.tr"];

export default function IpHeroCard({
  initialData,
  onSearch,
  isLoading = false,
}: IpHeroCardProps) {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(initialData.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSampleClick = (sample: string) => {
    setSearchQuery(sample);
    if (onSearch) {
      onSearch(sample);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-900/10 via-white to-white dark:from-blue-950/40 dark:via-gray-900 dark:to-gray-900 border border-blue-100 dark:border-blue-900/40 p-6 sm:p-10 shadow-2xl shadow-blue-500/10 transition-all">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/15 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/15 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm">
            <Globe className="w-3.5 h-3.5" />
            {initialData.version}
          </span>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <span className="text-sm">{initialData.flagEmoji || "🇹🇷"}</span>
            {initialData.city}, {initialData.country}
          </span>

          {initialData.isVpn || initialData.isProxy ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-sm">
              <ShieldAlert className="w-3.5 h-3.5" />
              VPN / Proxy Algılandı
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Doğrudan Ev/İş Ağı
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-xs sm:text-sm uppercase tracking-widest font-black text-gray-500 dark:text-gray-400 mb-2">
          Genel IP Adresiniz (Public IP)
        </h1>

        {/* Big IP Value + Copy Button */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-3 flex-wrap">
          <span
            className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-mono transition-opacity ${
              isLoading ? "opacity-50" : "opacity-100"
            } bg-gradient-to-r from-gray-900 via-blue-900 to-blue-700 dark:from-white dark:via-blue-100 dark:to-blue-400 bg-clip-text text-transparent select-all`}
          >
            {initialData.ip}
          </span>

          <button
            onClick={handleCopy}
            title="IP Adresini Kopyala"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>

        {/* ISP Subtitle */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 font-medium">
          İnternet Sağlayıcınız:{" "}
          <strong className="font-bold text-gray-900 dark:text-white">
            {initialData.isp}
          </strong>{" "}
          <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono">
            {initialData.asn}
          </span>
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-xl mt-8">
          <form onSubmit={handleFormSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Farklı bir IP (örn: 8.8.8.8) veya alan adı sorgula..."
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-md transition-all"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-xs shadow transition-all"
            >
              {isLoading ? "Sorgulanıyor..." : "Sorgula"}
            </button>
          </form>

          {/* Quick Examples */}
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs text-gray-500">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popüler:
            </span>
            {SAMPLE_QUERIES.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => handleSampleClick(sample)}
                className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 text-gray-700 dark:text-gray-300 transition-colors font-mono text-[11px]"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
