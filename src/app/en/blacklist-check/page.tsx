"use client";
import { toolFetch } from "@/lib/usage";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, Search, Activity } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import TroubleshootingGuide from "@/components/TroubleshootingGuide";

const EN_BLACKLIST_FAQS = [
  {
    question: "What is an IP Blacklist (DNSBL)?",
    answer: "DNS-based Blackhole Lists (DNSBL) are real-time databases maintained by security organizations (such as SpamCop and DroneBL) that track IP addresses associated with sending spam, malware distribution, or botnet activity.",
  },
  {
    question: "How do I remove my IP from a blacklist?",
    answer: "If your IP is listed, first ensure your server is secured against open relays and malware. Then, visit the delist URL provided by the specific blacklist authority to submit a removal request.",
  },
];

export default function EnglishBlacklistCheckPage() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (targetIp: string) => {
    if (!targetIp.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await toolFetch(`/api/blacklist?ip=${encodeURIComponent(targetIp.trim())}`, undefined, "user");
      const data = await res.json();
      if (!res.ok || data.success === false || data.error) throw new Error(data.error || "Failed to check IP blacklist.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred during blacklist check.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          DNSBL Results & Provider Availability
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          IP Blacklist & Spam Reputation Check
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Query SpamCop and DroneBL, with official lookup links for Spamhaus and Barracuda.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Provider failures and unconfigured access are unknown, never clean. Absence from checked lists does not establish safety or deliverability.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheck(ip);
          }}
          className="relative flex items-center"
        >
          <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="e.g. 8.8.8.8 or your server IP"
            className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white shadow-lg shadow-gray-100/50 dark:shadow-none transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 disabled:opacity-50 transition-all"
          >
            {loading ? "Checking..." : "Check Blacklist"}
          </button>
        </form>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm font-medium">
          {error}
        </div>
      )}

      {result && (
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target IP</span>
              <h2 className="text-2xl font-black font-mono text-gray-900 dark:text-white">
                {result.ip}
              </h2>
            </div>
            <div>
              {result.isClean === null ? (<span className="text-amber-600 font-semibold">Partial result · {result.unavailableCount} sources unknown</span>) : result.isClean ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Not listed in checked sources (0/{result.totalChecked})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 font-bold text-sm">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  Warning ({result.listedCount} Listed)
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {result.results?.map((bl: any, i: number) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  {bl.listed === null ? (<a className="text-xs text-amber-600 underline" href={bl.delistUrl} target="_blank" rel="noopener noreferrer">Official check</a>) : bl.listed ? (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  <div>
                    <span className="font-bold text-sm text-gray-900 dark:text-white block">
                      {bl.name}
                    </span>
                    <span className="text-xs font-mono text-gray-400">{bl.host}</span>
                  </div>
                </div>

                <div>
                  {bl.listed === null ? (<span className="text-xs text-amber-600">Unknown</span>) : bl.listed ? (
                    <a
                      href={bl.delistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      Delist &rarr;
                    </a>
                  ) : (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      Not listed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <TroubleshootingGuide kind="email" language="en" />

      <div className="max-w-3xl mx-auto pt-8">
        <FaqAccordion items={EN_BLACKLIST_FAQS} />
      </div>
    </div>
  );
}
