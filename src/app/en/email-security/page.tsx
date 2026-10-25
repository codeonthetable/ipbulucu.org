"use client";
import { toolFetch } from "@/lib/usage";

import { useState } from "react";
import { Mail, ShieldCheck, ShieldAlert, CheckCircle2, XCircle, Search, Award } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import TroubleshootingGuide from "@/components/TroubleshootingGuide";
import DiagnosticResultSummary from "@/components/DiagnosticResultSummary";
import { emailSummary } from "@/lib/diagnostic-summary";

const EN_EMAIL_FAQS = [
  {
    question: "What is SPF (Sender Policy Framework)?",
    answer: "SPF is an email authentication standard that lists the authorized mail servers permitted to send emails on behalf of your domain name.",
  },
  {
    question: "What is DMARC (Domain-based Message Authentication)?",
    answer: "DMARC builds upon SPF and DKIM protocols to specify how receiving email servers (like Gmail or Outlook) should treat unauthenticated emails (none, quarantine, or reject).",
  },
];

export default function EnglishEmailSecurityPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const nullMx = result?.mx?.records?.length === 1 && result.mx.records[0].priority === 0 && result.mx.records[0].exchange === ".";

  const handleCheck = async (targetDomain: string) => {
    if (!targetDomain.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await toolFetch(`/api/email-security?domain=${encodeURIComponent(targetDomain.trim())}`, undefined, "user");
      const data = await res.json();
      if (!res.ok || data.success === false || data.error) throw new Error(data.error || "Failed to audit email security.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred during email security check.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 mb-3">
          <Mail className="w-3.5 h-3.5" />
          Mail DNS Records
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          MX, SPF & DMARC Record Checker
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Inspect MX, SPF and direct _dmarc TXT records, including missing or duplicate records.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">The percentage counts MX, one SPF and one DMARC record. It is not a security or delivery score. DKIM, SPF expansion, organizational-domain fallback and message alignment are not tested. A null MX (0 .) means the domain does not accept email.</p>
      </div>

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
            aria-label="Domain name"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="e.g. google.com or yourcompany.com"
            className="w-full min-w-0 px-4 py-3.5 text-sm sm:text-base rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white shadow-lg shadow-gray-100/50 dark:shadow-none transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 disabled:opacity-50 transition-all"
          >
            {loading ? "Testing..." : "Check Records"}
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
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Domain</span>
              <h2 className="text-2xl font-black font-mono text-gray-900 dark:text-white">
                {result.domain || result.host}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Record Presence</span>
                <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {result.score}/100
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* SPF Card */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  {result.spf?.count === 1 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  SPF (Sender Policy Framework)
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${result.spf?.count === 1 ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300" : "bg-red-100 text-red-700"}`}>
                  {result.spf?.count > 1 ? "Multiple records" : result.spf?.present ? "Record found" : "Missing"}
                </span>
              </div>
              <p className="text-xs font-mono text-gray-600 dark:text-gray-300 break-all">
                {result.spf?.record || "No SPF TXT record detected."}
              </p>
            </div>

            {/* DMARC Card */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  {result.dmarc?.count === 1 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-500" />
                  )}
                  DMARC TXT Record
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${result.dmarc?.count === 1 ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300" : "bg-amber-100 text-amber-700"}`}>
                  {result.dmarc?.count > 1 ? "Multiple records" : result.dmarc?.present ? "Record found" : "No direct record"}
                </span>
              </div>
              <p className="text-xs font-mono text-gray-600 dark:text-gray-300 break-all">
                {result.dmarc?.record || "No _dmarc TXT record detected."}
              </p>
            </div>

            {/* MX Card */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  {result.mx?.present && !nullMx ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  MX Mail Servers
                </span>
                <span className="text-xs font-bold text-gray-500">
                  {result.mx?.records?.length || 0} records
                </span>
              </div>
              {nullMx && <p className="text-sm text-amber-700 dark:text-amber-400">Null MX: this domain declares it does not accept email.</p>}
              <div className="space-y-1 mt-2">
                {result.mx?.records?.map((m: any, i: number) => (
                  <div key={i} className="text-xs font-mono text-gray-700 dark:text-gray-300 flex justify-between p-1.5 bg-white dark:bg-gray-900 rounded-lg">
                    <span>{m.exchange}</span>
                    <span className="text-gray-400">Pri: {m.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {result && <DiagnosticResultSummary summary={emailSummary(result, "en")} language="en" />}
      <TroubleshootingGuide kind="email" language="en" />

      {/* Privacy & Security Tip Card */}
      <div className="max-w-3xl mx-auto rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="text-2xl leading-none select-none">💡</div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Privacy & Security Tip
            </h3>
            <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
              <strong>Security Tip:</strong> To protect your personal email address from spam and data breaches, you can use{" "}
              <a
                href="https://gecici.email/"
                target="_blank"
                rel="noopener"
                title="Spam-protected, ad-free temporary email and verification code service"
                className="font-bold text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500 transition-colors"
              >
                gecici.email
              </a>
              , our zero-registration disposable email station.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto pt-4">
        <FaqAccordion items={EN_EMAIL_FAQS} />
      </div>
    </div>
  );
}
