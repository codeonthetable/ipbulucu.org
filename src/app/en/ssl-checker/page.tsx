"use client";
import { toolFetch } from "@/lib/usage";

import { useState } from "react";
import { Lock, ShieldCheck, ShieldAlert, Calendar, CheckCircle2, Search, Award } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";

const EN_SSL_FAQS = [
  {
    question: "What is an SSL/TLS Certificate?",
    answer: "An SSL (Secure Sockets Layer) / TLS (Transport Layer Security) certificate encrypts data transferred between a user's web browser and your web server, protecting sensitive information like login credentials and credit card numbers.",
  },
  {
    question: "Why does an SSL certificate expire?",
    answer: "Certificates have limited lifetimes so keys and domain validation can be renewed. The actual expiry date is read from the certificate; lifetimes vary by issuer and current policy.",
  },
];

export default function EnglishSslCheckerPage() {
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (targetHost: string) => {
    if (!targetHost.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await toolFetch(`/api/ssl?host=${encodeURIComponent(targetHost.trim())}`, undefined, "user");
      const data = await res.json();
      if (!res.ok || data.success === false || data.error) throw new Error(data.error || "Failed to inspect SSL certificate.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred during SSL inspection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-900 mb-3">
          <Lock className="w-3.5 h-3.5" />
          TLS 1.3 / 1.2 Cryptographic Verifier
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          SSL Certificate & Expiration Checker
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Verify SSL certificate validity, days remaining until expiry, Certificate Authority (CA), and SAN hostnames.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Chain, hostname and dates are verified against our server trust store. Revocation status, all supported ciphers and browser-specific trust are not tested. This is a one-time check, not an expiry alert service.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheck(host);
          }}
          className="relative flex items-center"
        >
          <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="e.g. google.com or github.com"
            className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-white shadow-lg shadow-gray-100/50 dark:shadow-none transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-500/20 disabled:opacity-50 transition-all"
          >
            {loading ? "Checking..." : "Inspect SSL"}
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
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hostname</span>
              <h2 className="text-2xl font-black font-mono text-gray-900 dark:text-white">
                {result.host || result.domain}
              </h2>
            </div>
            <div>
              {result.authorized && !result.isExpired ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Valid SSL Certificate
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 font-bold text-sm">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  Expired / Untrusted
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-gray-500 block mb-1">Issuer Organization</span>
              <p className="text-base font-bold text-gray-900 dark:text-white truncate">
                {result.issuer}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-gray-500 block mb-1">Days Remaining</span>
              <p className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {result.daysRemaining} Days
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-gray-500 block mb-1">Valid From</span>
              <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
                {result.validFrom}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-gray-500 block mb-1">Expiration Date</span>
              <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
                {result.validTo}
              </p>
            </div>

            <div className="sm:col-span-2 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-gray-500 block mb-1">Subject Alternative Names (SAN)</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {result.san?.map((s: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 font-mono text-xs text-gray-800 dark:text-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto pt-8">
        <FaqAccordion items={EN_SSL_FAQS} />
      </div>
    </div>
  );
}
