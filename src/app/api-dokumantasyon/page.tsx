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
import AdPlaceholder from "@/components/AdPlaceholder";

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"curl" | "python" | "nodejs" | "ai">("curl");

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeSnippets = {
    curl: `# 1. Terminalde Dış IP Adresini Öğrenme (Düz Metin)
curl -s https://ipbulucu.org/api/ip

# 2. Tam JSON İstihbarat Raporu Alma (Konum, Operatör, Hat Sınıfı)
curl -s "https://ipbulucu.org/api/ip?format=json"

# 3. Belirli Bir IP veya Alan Adını Sorgulama
curl -s "https://ipbulucu.org/api/ip?ip=8.8.8.8&format=json"

# 4. TRABIS / Universal Whois Sorgusu
curl -s "https://ipbulucu.org/api/whois?domain=turktelekom.com.tr"

# 5. Açık Port Testi
curl -s "https://ipbulucu.org/api/port?host=google.com&port=443"`,

    python: `import requests

# IP İstihbaratı Sorgulama
def get_ip_intel(ip=None):
    url = "https://ipbulucu.org/api/ip"
    params = {"format": "json"}
    if ip:
        params["ip"] = ip
    
    response = requests.get(url, params=params, timeout=5)
    return response.json()

# Örnek Kullanım
data = get_ip_intel("81.213.153.20")
print(f"Şehir: {data.get('city')}, Operatör: {data.get('isp')}")
print(f"Bağlantı Türü: {data.get('connectionType')}, Hız Sınıfı: {data.get('lineSpeedTier')}")
print(f"Güvenlik Skoru: %{data.get('securityScore')}")`,

    nodejs: `// Node.js (Fetch API)
async function getIpDetails(targetIp = "") {
  const url = targetIp 
    ? \`https://ipbulucu.org/api/ip?ip=\${encodeURIComponent(targetIp)}&format=json\`
    : "https://ipbulucu.org/api/ip?format=json";

  const res = await fetch(url);
  const data = await res.json();
  
  console.log("IP:", data.ip);
  console.log("Konum:", data.city, data.country);
  console.log("ISS:", data.isp, data.asn);
  return data;
}

getIpDetails();`,

    ai: `// OpenAI Custom GPT / LangChain Tool Yapılandırması
// OpenAPI Şeması: https://ipbulucu.org/openapi.json
// AI Standart Manifest: https://ipbulucu.org/llms.txt

{
  "name": "ipbulucu_intelligence",
  "description": "Gerçek zamanlı IP konumu, telekom hat sınıfı, Whois ve port güvenliği sorgulayan araç.",
  "parameters": {
    "type": "object",
    "properties": {
      "ip": {
        "type": "string",
        "description": "Sorgulanacak IPv4 veya IPv6 adresi"
      },
      "format": {
        "type": "string",
        "enum": ["json"],
        "default": "json"
      }
    }
  }
}`,
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Bot className="w-3.5 h-3.5" />
          <span>Yapay Zeka (AI) ve Geliştiriciler İçin Ücretsiz REST API</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Geliştirici & Yapay Zeka Ajanları API Portalı
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
          ChatGPT, Claude, Cursor, LangChain, Python botları ve CLI komutlarınız için 0ms gecikmeli, anahtarsız ve sınırsız IP istihbarat servisleri.
        </p>
      </div>

      {/* AI Agent Quick Integration Banner */}
      <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-purple-950/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>llms.txt & OpenAPI 3.1 Destekli</span>
            </div>
            <h2 className="text-xl font-bold text-white">Yapay Zeka Ajanları İçin Doğrudan Besleme</h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl">
              Model Context Protocol (MCP), Custom GPT veya LangChain projelerinize ipbulucu.org API&#39;lerini tek tıkla entegre edin.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://ipbulucu.org/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all"
            >
              <FileJson className="w-4 h-4 text-cyan-400" />
              <span>llms.txt Belgesi</span>
            </a>
            <a
              href="https://ipbulucu.org/openapi.json"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/25"
            >
              <Cpu className="w-4 h-4" />
              <span>OpenAPI 3.1 JSON</span>
            </a>
          </div>
        </div>
      </div>

      {/* Code Snippets & Playground */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-2 overflow-x-auto">
          {[
            { id: "curl", label: "cURL (Terminal)", icon: Terminal },
            { id: "python", label: "Python", icon: Code2 },
            { id: "nodejs", label: "Node.js (Fetch)", icon: Code2 },
            { id: "ai", label: "Yapay Zeka / GPT Şeması", icon: Bot },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? "bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code Content */}
        <div className="p-6 relative">
          <button
            onClick={() => copyText(codeSnippets[activeTab], activeTab)}
            className="absolute top-8 right-8 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-all z-10"
          >
            {copiedCode === activeTab ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode === activeTab ? "Kopyalandı!" : "Kodu Kopyala"}</span>
          </button>

          <pre className="font-mono text-xs text-slate-200 bg-slate-950 p-5 rounded-2xl overflow-x-auto border border-slate-800/80 leading-relaxed">
            <code>{codeSnippets[activeTab]}</code>
          </pre>
        </div>
      </div>

      {/* Ad Placement */}
      <AdPlaceholder slotId="api-docs-mid" format="leaderboard" />

      {/* API Endpoint Reference Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Tüm Açık API Uç Noktaları (Endpoints)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">GET</span>
              <span className="text-xs text-slate-500 font-mono">/api/ip</span>
            </div>
            <h3 className="text-sm font-bold text-white">IP & Coğrafi Konum İstihbaratı</h3>
            <p className="text-xs text-slate-400">
              IP adresi, şehir, koordinat, operatör (ISP), hat hızı sınıfı ve güvenlik skorunu döner.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">GET</span>
              <span className="text-xs text-slate-500 font-mono">/api/whois</span>
            </div>
            <h3 className="text-sm font-bold text-white">Whois & RDAP (.tr Destekli)</h3>
            <p className="text-xs text-slate-400">
              TRABIS .tr ve global alan adlarının tescil firması, bitiş ve isim sunucu kayıtlarını döner.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">GET</span>
              <span className="text-xs text-slate-500 font-mono">/api/port</span>
            </div>
            <h3 className="text-sm font-bold text-white">Açık Port & Servis Denetimi</h3>
            <p className="text-xs text-slate-400">
              Hedef sunucunun belirtilen portunun açık/kapalı durumunu ve gecikme süresini ölçer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">GET</span>
              <span className="text-xs text-slate-500 font-mono">/api/dns</span>
            </div>
            <h3 className="text-sm font-bold text-white">DNS Kayıtları Çözümleyici</h3>
            <p className="text-xs text-slate-400">
              A, AAAA, MX, TXT, NS, CNAME ve SOA kayıtlarını anlık olarak çözümler.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
