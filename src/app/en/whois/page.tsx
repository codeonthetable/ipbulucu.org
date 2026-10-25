"use client";
import { toolFetch } from "@/lib/usage";

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
import { WhoisRecord } from "@/lib/types";

const EN_WHOIS_FAQS = [
  {
    question: "What is a Whois lookup?",
    answer: "A Whois lookup queries international Regional Internet Registries (RIRs) and domain registries to find out who owns a domain name or IP block, its registrar, creation date, and expiration date.",
  },
  {
    question: "What is Whois Privacy Protection?",
    answer: "Whois Privacy is a service provided by registrars that replaces the registrant's personal details (such as name, address, email, and phone) with proxy forwarding details to prevent spam and identity harvesting.",
  },
  {
    question: "What is the difference between Domain Whois and IP Whois?",
    answer: "Domain Whois returns information about website ownership and nameservers, while IP Whois (ARIN, RIPE, APNIC) returns network allocation details, Autonomous System Numbers (ASN), and Internet Service Provider (ISP) contacts.",
  },
];

const POPULAR_DOMAINS = ["google.com", "github.com", "cloudflare.com", "amazon.com"];

export default function EnglishWhoisPage() {
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
      const res = await toolFetch(`/api/whois?query=${encodeURIComponent(lookupQuery.trim())}`, undefined, "user");
      const data = await res.json();
      if (!res.ok || data.success === false || data.error) throw new Error(data.error || "Failed to retrieve Whois records.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred during Whois lookup.");
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
          Universal Whois & RDAP Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Domain & IP Whois Lookup
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Lookup registrar, creation date, expiration date, and authoritative nameservers for any domain or IP address.
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
          <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. google.com or 8.8.8.8"
            className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white shadow-lg shadow-gray-100/50 dark:shadow-none transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all"
          >
            {loading ? "Searching..." : "Lookup"}
          </button>
        </form>

        {/* Popular Domain Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-gray-500">
          <span>Popular:</span>
          {POPULAR_DOMAINS.map((domain) => (
            <button
              key={domain}
              onClick={() => {
                setQuery(domain);
                handleLookup(domain);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-mono text-[11px] transition-colors"
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="max-w-3xl mx-auto rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-gray-400">Target Target</span>
              <h2 className="text-2xl font-black font-mono text-gray-900 dark:text-white">
                {result.domainOrIp}
              </h2>
            </div>

            {/* View Tabs */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <button
                onClick={() => setActiveTab("summary")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === "summary"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Summary View
              </button>
              <button
                onClick={() => setActiveTab("raw")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === "raw"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                Raw Output
              </button>
            </div>
          </div>

          {activeTab === "summary" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
                  <Shield className="w-4 h-4 text-blue-500" />
                  Registrar / Sponsoring Organization
                </div>
                <div className="text-base font-bold text-gray-900 dark:text-white">
                  {result.registrar || "Protected / Hidden"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  Registrant Organization
                </div>
                <div className="text-base font-bold text-gray-900 dark:text-white truncate">
                  {result.organization || "Whois Privacy Guard"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  Registration & Creation Date
                </div>
                <div className="text-base font-bold font-mono text-gray-900 dark:text-white">
                  {result.registeredOn || "Unknown"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
                  <Calendar className="w-4 h-4 text-rose-500" />
                  Registry Expiration Date
                </div>
                <div className="text-base font-bold font-mono text-gray-900 dark:text-white">
                  {result.expiresOn || "Unknown"}
                </div>
              </div>

              {/* Nameservers */}
              <div className="sm:col-span-2 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
                  <Server className="w-4 h-4 text-indigo-500" />
                  Authoritative Name Servers (NS)
                </div>
                {result.nameServers && result.nameServers.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.nameServers.map((ns, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-mono font-semibold text-gray-800 dark:text-gray-200"
                      >
                        {ns}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">No name servers returned.</div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={handleCopyRaw}
                className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                {copiedRaw ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedRaw ? "Copied!" : "Copy Raw"}
              </button>
              <pre className="p-4 rounded-2xl bg-gray-950 text-gray-200 font-mono text-xs overflow-x-auto max-h-96 leading-relaxed">
                {result.rawText || "No raw output returned."}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* FAQs */}
      <div className="max-w-3xl mx-auto pt-8">
        <FaqAccordion items={EN_WHOIS_FAQS} />
      </div>
    </div>
  );
}
