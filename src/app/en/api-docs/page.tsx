"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Bot,
  Code2,
  Copy,
  Check,
  Zap,
  Globe2,
  Server,
  ShieldCheck,
  Sparkles,
  FileJson,
  Cpu,
  ArrowRight,
} from "lucide-react";

export default function EnglishApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"curl" | "python" | "nodejs" | "ai">("curl");

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeSnippets = {
    curl: `# 1. Get Public IP Address in Plain Text
curl -s https://ipbulucu.org/api/ip

# 2. Get Full JSON Geolocation & Carrier Intel
curl -s "https://ipbulucu.org/api/ip?format=json"

# 3. Query Specific IP or Domain Name
curl -s "https://ipbulucu.org/api/ip?ip=8.8.8.8&format=json"

# 4. Universal Whois & RDAP Query
curl -s "https://ipbulucu.org/api/whois?domain=google.com"

# 5. Open Port Scan
curl -s "https://ipbulucu.org/api/port?host=google.com&port=443"`,

    python: `import requests

# Query IP Geolocation Intelligence
def get_ip_intel(ip=None):
    url = "https://ipbulucu.org/api/ip"
    params = {"format": "json"}
    if ip:
        params["ip"] = ip
    
    response = requests.get(url, params=params, timeout=5)
    return response.json()

# Example Usage
data = get_ip_intel("8.8.8.8")
print(f"IP: {data['ip']} | ISP: {data['org']} | City: {data['city']}, {data['country']}")`,

    nodejs: `// Modern TypeScript / ES Module
async function fetchIpInfo(targetIp?: string) {
  const url = targetIp 
    ? \`https://ipbulucu.org/api/ip?ip=\${targetIp}&format=json\`
    : "https://ipbulucu.org/api/ip?format=json";

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Example Execution
fetchIpInfo("1.1.1.1").then(console.log);`,

    ai: `{
  "name": "ipbulucu_ip_intelligence",
  "description": "Lookup approximate IP geolocation, ISP and ASN. Read geoStatus and limitations.",
  "parameters": {
    "type": "object",
    "properties": {
      "ip": {
        "type": "string",
        "description": "IPv4 or IPv6 address or domain name."
      }
    },
    "required": ["ip"]
  },
  "endpoint": "https://ipbulucu.org/api/ip?ip={ip}&format=json"
}`,
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          <Zap className="w-3.5 h-3.5 text-indigo-500" />
          Public IP and Network REST APIs
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Developer API & Official SDK Documentation
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          High-performance, JSON-formatted IP and network diagnostics APIs for backend services, automation scripts, and LLM Agent integrations.
        </p>
      </div>

      {/* Official SDK Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3 shadow-sm hover:border-red-500 transition-colors group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 font-mono">
              NPM SDK
            </span>
            <a
              href="https://www.npmjs.com/package/ipbulucu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-red-600 hover:underline"
            >
              npm i ipbulucu &rarr;
            </a>
          </div>
          <h2 className="font-bold text-base text-gray-900 dark:text-white">
            Node.js & TypeScript SDK
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Node.js 18+ client for public IP lookup, Whois and TCP port checks.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3 shadow-sm hover:border-blue-500 transition-colors group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 font-mono">
              PyPI SDK
            </span>
            <a
              href="https://pypi.org/project/ipbulucu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              pip install ipbulucu &rarr;
            </a>
          </div>
          <h2 className="font-bold text-base text-gray-900 dark:text-white">
            Python Library & CLI
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Fast Python library with built-in async support for data engineering and cybersecurity intelligence.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3 shadow-sm hover:border-indigo-500 transition-colors group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 font-mono">
              GitHub Repo
            </span>
            <a
              href="https://github.com/codeonthetable/ipbulucu.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              codeonthetable &rarr;
            </a>
          </div>
          <h2 className="font-bold text-base text-gray-900 dark:text-white">
            Open Source Ecosystem
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Explore code examples, Chrome extension source, and community contributions on GitHub.
          </p>
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Integration Code Examples
            </h2>
          </div>

          <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            {(["curl", "python", "nodejs", "ai"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  activeTab === tab
                    ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative group">
          <pre className="p-5 rounded-2xl bg-gray-950 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-gray-800">
            {codeSnippets[activeTab]}
          </pre>
          <button
            onClick={() => copyText(codeSnippets[activeTab], activeTab)}
            className="absolute top-3 right-3 p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            {copiedCode === activeTab ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedCode === activeTab ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
