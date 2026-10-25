"use client";
import { toolFetch } from "@/lib/usage";

import { useState, useEffect } from "react";
import { Calculator, Network, Check, Copy } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";

const EN_SUBNET_FAQS = [
  {
    question: "What is CIDR notation?",
    answer: "CIDR (Classless Inter-Domain Routing) is a compact representation of an IP address and its associated network mask, using a slash followed by the prefix length (e.g. 192.168.1.0/24).",
  },
  {
    question: "What is the difference between Network Address and Broadcast Address?",
    answer: "The Network Address is the first address in a subnet used to identify the network itself, while the Broadcast Address is the last address used to communicate with all hosts simultaneously. Neither can be assigned to individual devices.",
  },
];

export default function EnglishSubnetCalculatorPage() {
  const [cidrInput, setCidrInput] = useState("192.168.1.0/24");
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateSubnet = async (input: string, interaction: "auto" | "user" = "user") => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await toolFetch(`/api/subnet?cidr=${encodeURIComponent(input.trim())}`, undefined, interaction);
      const data = await res.json();
      if (!res.ok || data.success === false || data.error) throw new Error(data.error || "Invalid CIDR format.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Calculation failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateSubnet(cidrInput, "auto");
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-900 mb-3">
          <Calculator className="w-3.5 h-3.5" />
          IPv4 Subnet & CIDR Bitwise Math
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Subnet Calculator & CIDR Range Parser
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Calculate network address, broadcast address, netmask, wildcard mask, and usable host count instantly.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateSubnet(cidrInput);
          }}
          className="relative flex items-center"
        >
          <Network className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={cidrInput}
            onChange={(e) => setCidrInput(e.target.value)}
            placeholder="e.g. 10.0.0.0/16 or 192.168.1.50/24"
            className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white shadow-lg shadow-gray-100/50 dark:shadow-none transition-all font-mono"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-500/20 disabled:opacity-50 transition-all"
          >
            Calculate
          </button>
        </form>
      </div>

      {error && (
        <div className="max-w-xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm font-medium">
          {error}
        </div>
      )}

      {result && (
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">CIDR Block</span>
              <h2 className="text-2xl font-black font-mono text-gray-900 dark:text-white">
                {result.cidr}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Usable Hosts</span>
              <span className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400">
                {result.usableHosts?.toLocaleString()} Hosts
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-gray-500 block mb-1">Network Address</span>
              <p className="text-base font-bold font-mono text-gray-900 dark:text-white">
                {result.networkAddress}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-gray-500 block mb-1">Broadcast Address</span>
              <p className="text-base font-bold font-mono text-gray-900 dark:text-white">
                {result.broadcastAddress}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-gray-500 block mb-1">Subnet Mask</span>
              <p className="text-base font-bold font-mono text-gray-900 dark:text-white">
                {result.netmask}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-gray-500 block mb-1">Wildcard Mask</span>
              <p className="text-base font-bold font-mono text-gray-900 dark:text-white">
                {result.wildcardMask}
              </p>
            </div>

            <div className="sm:col-span-2 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-gray-500 block mb-1">Usable Host IP Range</span>
              <p className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">
                {result.usableHostRange}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto pt-8">
        <FaqAccordion items={EN_SUBNET_FAQS} />
      </div>
    </div>
  );
}
