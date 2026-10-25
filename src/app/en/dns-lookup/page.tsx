"use client";
import { toolFetch } from "@/lib/usage";

import { useState } from "react";
import { Server, Globe, CheckCircle, Database, Shield, Zap, Sparkles, Copy, Check } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import { DnsLookupResult } from "@/lib/types";

const EN_DNS_FAQS = [
  {
    question: "What is DNS (Domain Name System)?",
    answer: "DNS is the phonebook of the Internet. It translates human-friendly domain names (e.g. google.com) into computer-routable IP addresses (e.g. 142.250.184.206).",
  },
  {
    question: "What is the difference between A and AAAA records?",
    answer: "An A (Address) record maps a domain to a 32-bit IPv4 address, while an AAAA record maps a domain to a 128-bit IPv6 address.",
  },
  {
    question: "What does an MX record do?",
    answer: "MX (Mail Exchange) records specify the mail servers responsible for receiving emails on behalf of your domain (such as Google Workspace, Microsoft 365, etc.).",
  },
];

const POPULAR_DOMAINS = ["google.com", "cloudflare.com", "github.com", "microsoft.com"];

export default function EnglishDnsLookupPage() {
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DnsLookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (targetHost: string) => {
    if (!targetHost.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await toolFetch(`/api/dns?host=${encodeURIComponent(targetHost.trim())}`, undefined, "user");
      const data = await res.json();
      if (!res.ok || data.success === false || data.error) throw new Error(data.error || "Failed to resolve DNS records.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred during DNS lookup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 mb-3">
          <Server className="w-3.5 h-3.5" />
          Authoritative DNS Parser
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          DNS Records Lookup & Analysis
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Query all A, AAAA, MX, TXT (SPF/DMARC), NS, CNAME, and SOA records for any domain or hostname.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup(host);
          }}
          className="relative flex items-center"
        >
          <Server className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="e.g. google.com or cloudflare.com"
            className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white shadow-lg shadow-gray-100/50 dark:shadow-none transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 disabled:opacity-50 transition-all"
          >
            {loading ? "Resolving..." : "Query DNS"}
          </button>
        </form>

        {/* Popular Domains */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-gray-500">
          <span>Popular:</span>
          {POPULAR_DOMAINS.map((domain) => (
            <button
              key={domain}
              onClick={() => {
                setHost(domain);
                handleLookup(domain);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-mono text-[11px] transition-colors"
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target Domain</span>
              <h2 className="text-xl font-black font-mono text-gray-900 dark:text-white">
                {result.host}
              </h2>
            </div>
            {result.resolvedIp && (
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Resolved IP</span>
                <p className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {result.resolvedIp}
                </p>
              </div>
            )}
          </div>

          {/* Record Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* A Records */}
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  A (IPv4)
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {result.records.A ? result.records.A.length : 0} Records
                </span>
              </div>
              {result.records.A && result.records.A.length > 0 ? (
                <ul className="space-y-1 font-mono text-sm text-gray-800 dark:text-gray-200">
                  {result.records.A.map((ip, i) => (
                    <li key={i} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      {ip}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400">No A record found.</p>
              )}
            </div>

            {/* AAAA Records */}
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  AAAA (IPv6)
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {result.records.AAAA ? result.records.AAAA.length : 0} Records
                </span>
              </div>
              {result.records.AAAA && result.records.AAAA.length > 0 ? (
                <ul className="space-y-1 font-mono text-xs text-gray-800 dark:text-gray-200">
                  {result.records.AAAA.map((ipv6, i) => (
                    <li key={i} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 truncate">
                      {ipv6}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400">No AAAA record found.</p>
              )}
            </div>

            {/* MX Records */}
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  MX (Mail Exchange)
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {result.records.MX ? result.records.MX.length : 0} Servers
                </span>
              </div>
              {result.records.MX && result.records.MX.length > 0 ? (
                <ul className="space-y-1 text-xs text-gray-800 dark:text-gray-200">
                  {result.records.MX.map((mx, i) => (
                    <li key={i} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
                      <span className="font-mono truncate">{mx.exchange}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700">
                        Priority {mx.priority}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400">No MX records configured.</p>
              )}
            </div>

            {/* NS Records */}
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                  NS (Name Servers)
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {result.records.NS ? result.records.NS.length : 0} Nameservers
                </span>
              </div>
              {result.records.NS && result.records.NS.length > 0 ? (
                <ul className="space-y-1 font-mono text-xs text-gray-800 dark:text-gray-200">
                  {result.records.NS.map((ns, i) => (
                    <li key={i} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      {ns}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400">No NS records returned.</p>
              )}
            </div>

            {/* TXT Records */}
            <div className="md:col-span-2 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                  TXT (SPF, DMARC, Verification)
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {result.records.TXT ? result.records.TXT.length : 0} Records
                </span>
              </div>
              {result.records.TXT && result.records.TXT.length > 0 ? (
                <ul className="space-y-1.5 font-mono text-xs text-gray-800 dark:text-gray-200">
                  {result.records.TXT.map((txtArr, i) => (
                    <li key={i} className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 break-all leading-relaxed">
                      {Array.isArray(txtArr) ? txtArr.join(" ") : txtArr}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400">No TXT records found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FAQs */}
      <div className="max-w-4xl mx-auto pt-8">
        <FaqAccordion items={EN_DNS_FAQS} />
      </div>
    </div>
  );
}
