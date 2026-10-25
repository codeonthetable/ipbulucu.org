"use client";

import { useState } from "react";
import { Binary, Copy, Check } from "lucide-react";
import { calculateIpFormats } from "@/lib/ip-formats";
import { usageEvent } from "@/lib/usage";

export default function IpFormatConverter({ ip, lang = "tr" }: { ip: string; lang?: "tr" | "en" }) {
  const en = lang === "en";
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState(false);
  const formats = calculateIpFormats(ip);
  if (!formats) return null;
  const entries = [
    ["decimal", en ? "Unsigned decimal" : "İşaretsiz ondalık sayı", formats.decimal],
    ["hex", en ? "Hexadecimal" : "Onaltılık gösterim", formats.hex],
    ...(formats.expanded ? [["expanded", en ? "Expanded IPv6" : "Açık IPv6 gösterimi", formats.expanded]] : []),
    ...(formats.dottedHex ? [["dottedHex", en ? "Dotted hexadecimal" : "Noktalı onaltılık", formats.dottedHex]] : []),
    ...(formats.octal ? [["octal", en ? "Octal octets" : "Sekizli oktetler", formats.octal]] : []),
    ["binary", en ? "Binary" : "İkili gösterim", formats.binary],
    ["reverseDns", en ? "Reverse DNS query name" : "Ters DNS sorgu adı", formats.reverseDns],
  ];
  async function copy(value: string, key: string) {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(value);
      setCopied(ip + key);
      usageEvent("ip_format_copy", { format: key, ip_version: formats!.version, language: lang });
    } catch { setCopyError(true); }
  }
  return <section className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-6">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400"><Binary size={24} /></div>
      <div><h2 className="text-xl font-bold">{en ? "IP format converter" : "IP format dönüştürücü"}</h2><p className="text-sm text-gray-500 mt-1">{en ? "Calculated in your browser from the IP shown above." : "Yukarıdaki IP adresinden tarayıcınızda hesaplanır."} {formats.version}</p></div>
    </div>
    <dl className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {entries.map(([key, label, value]) => <div key={key} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 min-w-0">
        <dt className="flex items-center justify-between gap-2 text-xs font-semibold text-gray-500 mb-2">{label}<button type="button" onClick={() => void copy(value, key)} aria-label={label + ": " + (en ? "copy" : "kopyala")} className="p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/40">{copied === ip + key ? <Check size={16} /> : <Copy size={16} />}</button></dt>
        <dd className="font-mono text-sm break-all select-all">{value}</dd>
      </div>)}
    </dl>
    <p className="text-sm text-gray-500">{en ? "The reverse DNS name is generated mathematically; no PTR lookup is performed here. Numeric formats do not test reachability or security." : "Ters DNS adı matematiksel olarak üretilir; burada PTR kaydı sorgulanmaz. Sayısal gösterimler erişilebilirlik veya güvenlik testi değildir."}</p>
    <p role="status" className="text-sm">{copyError ? (en ? "Could not copy. You can select the value manually." : "Kopyalanamadı. Değeri seçerek kopyalayabilirsiniz.") : copied.startsWith(ip) ? (en ? "Copied." : "Kopyalandı.") : ""}</p>
  </section>;
}
