"use client";
import { toolFetch } from "@/lib/usage";

import { useState } from "react";
import { FileCode2, ShieldCheck, ShieldAlert, Search, CheckCircle2, XCircle } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";

const EN_HEADER_FAQS = [
  {
    question: "What are HTTP Security Headers?",
    answer: "HTTP security headers (like HSTS, Content-Security-Policy, X-Frame-Options) tell web browsers how to protect websites against Clickjacking, Cross-Site Scripting (XSS), and data injection vulnerabilities.",
  },
];

export default function EnglishHttpHeadersPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await toolFetch(`/api/headers?url=${encodeURIComponent(targetUrl.trim())}`, undefined, "user");
      const data = await res.json();
      if (!res.ok || data.success === false || data.error) throw new Error(data.error || "Failed to inspect HTTP headers.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred during header inspection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-900 mb-3">
          <FileCode2 className="w-3.5 h-3.5" />
          HTTP Response Header Checker
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          HTTP Security Headers & Response Analyzer
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Audit HSTS, CSP, X-Frame-Options, and Referrer-Policy with A+ grade cybersecurity ratings.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">The grade counts six headers only. Policy values, HTTP/2 support and vulnerability protection are not verified. Cookie headers are omitted.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAudit(url);
          }}
          className="relative flex items-center"
        >
          <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. https://google.com or github.com"
            className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-white shadow-lg shadow-gray-100/50 dark:shadow-none transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/20 disabled:opacity-50 transition-all"
          >
            {loading ? "Auditing..." : "Audit Headers"}
          </button>
        </form>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm font-medium">
          {error}
        </div>
      )}

      {result && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4 shadow-sm">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Audited URL</span>
              <h2 className="text-xl font-black font-mono text-gray-900 dark:text-white truncate">
                {result.finalUrl || result.url}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Header Presence Grade</span>
                <span className="text-2xl font-black font-mono text-violet-600 dark:text-violet-400">
                  Grade {result.scoreGrade ?? "Unavailable"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Security Headers Audit</h3>
            <div className="space-y-2">
              {result.securityAudit &&
                Object.entries(result.securityAudit).map(([headerName, info]: [string, any], idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      {info.present ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400 shrink-0" />
                      )}
                      <div>
                        <span className="font-mono font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                          {headerName}
                        </span>
                        <p className="text-[11px] text-gray-500">{info.description}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        info.present
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {info.present ? "Present" : "Missing"}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto pt-8">
        <FaqAccordion items={EN_HEADER_FAQS} />
      </div>
    </div>
  );
}
