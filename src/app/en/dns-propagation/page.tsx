"use client";
import { toolFetch } from "@/lib/usage";

import { useState } from "react";
import { Globe2, Search, CheckCircle2, Clock, AlertCircle, RefreshCw, Activity } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";

const EN_PROP_FAQS = [
  {
    question: "What is DNS Propagation?",
    answer: "DNS propagation is the timeframe required for updates made to your domain's DNS records (such as nameservers or A records) to propagate and update across ISP recursive caches worldwide.",
  },
  {
    question: "How long does global DNS propagation take?",
    answer: "Typically, DNS changes take between 15 minutes to 24 hours depending on the TTL (Time to Live) setting configured on the record.",
  },
];

const RECORD_TYPES = ["A", "AAAA", "MX", "TXT", "NS", "CNAME"];

export default function EnglishDnsPropagationPage() {
  const [host, setHost] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (targetHost: string, type: string) => {
    if (!targetHost.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await toolFetch(`/api/propagation?host=${encodeURIComponent(targetHost.trim())}&type=${type}`, undefined, "user");
      const data = await res.json();
      if (!res.ok || data.success === false || data.error) throw new Error(data.error || "Failed to check DNS propagation.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred during DNS propagation check.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 mb-3">
          <Globe2 className="w-3.5 h-3.5" />
          DNS-over-HTTPS Resolver Comparison
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          DNS Propagation Checker
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Compare Google and Cloudflare DNS responses from the IPBulucu server. Both providers use anycast.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">This checks two resolvers from one location, not worldwide propagation coverage. Times measure server-side HTTPS queries, not your network ping.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheck(host, recordType);
          }}
          className="flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="e.g. google.com or yourdomain.com"
              className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white shadow-lg shadow-gray-100/50 dark:shadow-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              className="px-4 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              {RECORD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t} Record
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none px-6 py-3.5 text-sm font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all whitespace-nowrap"
            >
              {loading ? "Checking..." : "Compare DNS"}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm font-medium">
          {error}
        </div>
      )}

      {result && (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hostname & Record</span>
              <h2 className="text-2xl font-black font-mono text-gray-900 dark:text-white">
                {result.host} ({result.type})
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">DNS responses received</span>
                <span className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
                  {result.availableCount}/{result.totalServers} resolvers
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.results?.map((resNode: any, i: number) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">
                    {resNode.serverName}
                  </span>
                  {resNode.status === "resolved" ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Resolved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500">
                      <Clock className="w-4 h-4" /> {resNode.status === "no-record" ? "No record" : resNode.status === "nxdomain" ? "NXDOMAIN" : "Unavailable"}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400">{resNode.serverIp} · Server query: {resNode.responseTimeMs} ms</div>
                <div className="pt-2 border-t border-gray-200/60 dark:border-gray-700/60 font-mono text-xs text-blue-600 dark:text-blue-400 truncate">
                  {resNode.records?.length > 0 ? resNode.records.join(", ") : "No answer data"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto pt-8">
        <FaqAccordion items={EN_PROP_FAQS} />
      </div>
    </div>
  );
}
