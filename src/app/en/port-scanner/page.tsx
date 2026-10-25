"use client";
import { toolFetch } from "@/lib/usage";

import { useState } from "react";
import { Zap, ShieldCheck, ShieldAlert, Activity, CheckCircle2, XCircle, Search } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import TroubleshootingGuide from "@/components/TroubleshootingGuide";
import DiagnosticResultSummary from "@/components/DiagnosticResultSummary";
import { portSummary } from "@/lib/diagnostic-summary";

const EN_PORT_FAQS = [
  {
    question: "What is an open port test?",
    answer: "A port scanner attempts to establish TCP socket handshakes with specific port numbers on a server or IP address to determine if associated services (HTTP, HTTPS, SSH, FTP, MySQL) are publicly reachable.",
  },
  {
    question: "Why is open port security important?",
    answer: "Unnecessary open ports can expose internal services to brute-force attacks and exploit vectors. Best practices recommend closing unneeded ports using server firewalls (iptables, UFW, AWS Security Groups).",
  },
];

const COMMON_PORTS = [
  { port: 80, name: "HTTP", desc: "Web Service" },
  { port: 443, name: "HTTPS", desc: "SSL Web Service" },
  { port: 22, name: "SSH", desc: "Secure Shell" },
  { port: 21, name: "FTP", desc: "File Transfer" },
  { port: 25, name: "SMTP", desc: "Mail Server" },
  { port: 3306, name: "MySQL", desc: "Database" },
  { port: 3389, name: "RDP", desc: "Remote Desktop" },
  { port: 53, name: "DNS", desc: "Domain Name System" },
];

export default function EnglishPortScannerPage() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("443");
  const [checkedHost, setCheckedHost] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (targetHost: string, batch = false) => {
    if (!targetHost.trim() || loading) return;
    if (!batch && (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535)) {
      setError("Enter a TCP port between 1 and 65535.");
      return;
    }

    setLoading(true);
    setCheckedHost(targetHost.trim());
    setError(null);
    setResults([]);

    const portList = batch ? COMMON_PORTS.map((p) => p.port).join(",") : port;

    try {
      const res = await toolFetch(`/api/port?host=${encodeURIComponent(targetHost.trim())}&ports=${portList}`, undefined, "user");
      const data = await res.json();
      if (!res.ok || data.success === false || data.error) throw new Error(data.error || "Failed to scan ports.");
      setResults(data.ports || data.results || []);
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred during port scanning.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900 mb-3">
          <Zap className="w-3.5 h-3.5" />
          TCP Reachability Test
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Open Port Checker & Port Forwarding Test
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Check TCP reachability from the IPBulucu server for web, mail and administrative ports you are authorized to test.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Timeouts are inconclusive. This does not test UDP, identify the listening service or establish that a host is secure.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleScan(host);
          }}
          className="space-y-3"
        >
          <label htmlFor="port-host" className="block text-sm font-semibold">Host or public IP</label>
          <input
            id="port-host"
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="Enter a host you own or manage"
            className="w-full px-4 py-3.5 text-sm sm:text-base rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-white"
          />
          <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm font-semibold">TCP port
            <input aria-label="TCP port" type="number" min="1" max="65535" required value={port} onChange={(e) => setPort(e.target.value)} className="block w-28 mt-1 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
          </label>
          <button
            type="submit"
            disabled={loading || !host.trim()}
            className="px-5 py-2.5 text-sm font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check Port"}
          </button>
          <button type="button" disabled={loading || !host.trim()} onClick={() => handleScan(host, true)} className="px-4 py-2.5 text-sm font-semibold rounded-xl border border-gray-300 dark:border-gray-700 disabled:opacity-50">Check 8 common ports</button>
          </div>
        </form>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm font-medium">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
          <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500" />
            Port Scan Results ({checkedHost})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {results.map((r, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border transition-all ${
                  r.isOpen
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200"
                    : "bg-gray-50/50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-400"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-black text-base">Port {r.port}</span>
                  {r.isOpen ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Open
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
                      <XCircle className="w-4 h-4" /> {r.status === "unavailable" ? "Not tested" : r.isOpen === false ? "Refused" : "Inconclusive"}
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 truncate">
                  {r.service}
                </div>
                <div className="text-[11px] font-mono text-gray-400 mt-1">
                  Server connection time: {r.latencyMs === null ? "Not measured" : `${r.latencyMs} ms`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && <DiagnosticResultSummary summary={portSummary(results, "en")} language="en" />}
      <TroubleshootingGuide kind="port" language="en" />

      <div className="max-w-4xl mx-auto pt-8">
        <FaqAccordion items={EN_PORT_FAQS} />
      </div>
    </div>
  );
}
