"use client";

import { useState } from "react";
import {
  Calculator,
  Network,
  Binary,
  Copy,
  Check,
  Globe,
  Sparkles,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

interface SubnetData {
  cidr: string;
  ipAddress: string;
  prefix: number;
  netmask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  usableHostRange: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  isPrivate: boolean;
  ipType: string;
  binaryIp: string;
  binaryNetmask: string;
}

const SUBNET_FAQS = [
  {
    question: "CIDR (Classless Inter-Domain Routing) nedir?",
    answer: "CIDR, IP adreslerinin sonuna /24 veya /16 gibi bir önek ekleyerek ağın kaç IP adresinden oluştuğunu ve hangi alt ağ maskesini kullandığını belirten modern gösterim biçimidir.",
  },
  {
    question: "/24 alt ağı kaç kullanılabilir IP adresi barındırır?",
    answer: "/24 CIDR önekine sahip bir alt ağda toplam 256 IP adresi vardır. İlk adres Ağ Adresi (Network ID) ve son adres Yayın Adresi (Broadcast) olarak ayrıldığından 254 adet cihaz atanabilir IP bulunur.",
  },
  {
    question: "Özel IP (Private IP) ile Genel IP (Public IP) farkı nedir?",
    answer: "Özel IP adresleri (192.168.x.x, 10.x.x.x, 172.16-31.x.x) yerel ev/ofis ağlarında kullanılır ve internete doğrudan çıkamaz. İnternette yönlendirilebilen tüm diğer adresler ise Genel IP'dir.",
  },
];

const SAMPLE_CIDRS = ["192.168.1.0/24", "10.0.0.0/16", "172.16.0.0/12", "192.168.0.0/20"];

export default function SubnetCalculatorPage() {
  const [cidr, setCidr] = useState("192.168.1.0/24");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubnetData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCalculate = async (inputCidr: string) => {
    if (!inputCidr.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/subnet?cidr=${encodeURIComponent(inputCidr.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Hesaplama yapılamadı.");
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Hesaplama sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900 mb-3">
          <Calculator className="w-3.5 h-3.5" />
          IPv4 Subnet & CIDR Maske Hesaplayıcı
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Subnet & CIDR IP Hesaplama Aracı
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          IPv4 alt ağ maskesi, ağ adresi, yayın adresi, kullanılabilir IP aralığı ve ikili (binary) dönüşümünü anında hesaplayın.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCalculate(cidr);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
            placeholder="Örn: 192.168.1.0/24 veya 10.0.0.0/16"
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-base shadow-sm"
          />
          <Network className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
          <button
            type="submit"
            disabled={loading || !cidr.trim()}
            className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold text-sm shadow-md transition-all"
          >
            {loading ? "Hesaplanıyor..." : "Hesapla"}
          </button>
        </form>

        {/* Quick Examples */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Popüler:
          </span>
          {SAMPLE_CIDRS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCidr(c);
                handleCalculate(c);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 text-gray-700 dark:text-gray-300 font-mono text-[11px] transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm text-center">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  CIDR Bloğu: <span className="text-purple-600 font-mono">{result.cidr}</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Sınıf: <strong>{result.ipClass}</strong> • Tip: <strong>{result.ipType}</strong>
                </p>
              </div>

              <div className="text-right">
                <span className="text-3xl font-black text-purple-600 font-mono">
                  {result.usableHosts.toLocaleString("tr-TR")}
                </span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase">
                  Kullanılabilir Cihaz IP'si
                </span>
              </div>
            </div>

            {/* Calculations Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase block">Alt Ağ Maskesi (Netmask)</span>
                <p className="text-base font-bold text-gray-900 dark:text-white font-mono mt-0.5">
                  {result.netmask}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase block">Wildcard Maskesi</span>
                <p className="text-base font-bold text-gray-900 dark:text-white font-mono mt-0.5">
                  {result.wildcardMask}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase block">Ağ Adresi (Network ID)</span>
                <p className="text-base font-bold text-gray-900 dark:text-white font-mono mt-0.5">
                  {result.networkAddress}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase block">Yayın Adresi (Broadcast)</span>
                <p className="text-base font-bold text-gray-900 dark:text-white font-mono mt-0.5">
                  {result.broadcastAddress}
                </p>
              </div>
            </div>

            {/* Usable Range Box */}
            <div className="mt-4 p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase block">
                  Kullanılabilir Host IP Aralığı:
                </span>
                <span className="text-sm font-mono font-black text-purple-950 dark:text-purple-200 mt-1 block">
                  {result.usableHostRange}
                </span>
              </div>
              <button
                onClick={() => handleCopy(result.usableHostRange, "range")}
                className="p-2 rounded-xl bg-white dark:bg-gray-800 text-purple-600 hover:bg-purple-100 shadow-sm transition-colors"
              >
                {copiedKey === "range" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Binary Details */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-2 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/40">
                <span className="text-gray-400">İkili IP (Binary IP):</span>
                <span className="text-gray-800 dark:text-gray-200 font-bold">{result.binaryIp}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/40">
                <span className="text-gray-400">İkili Maske (Binary Netmask):</span>
                <span className="text-gray-800 dark:text-gray-200 font-bold">{result.binaryNetmask}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <AdPlaceholder slotId="subnet-mid-banner" format="leaderboard" />

      <FaqAccordion
        faqs={SUBNET_FAQS}
        title="Subnet ve IP Hesaplama Hakkında SSS"
        subtitle="Alt ağ maskeleri ve CIDR adreslemesi hakkında temel bilgiler"
      />
    </div>
  );
}
