"use client";

import { useState } from "react";
import { Binary, Copy, Check, Hash, Terminal, ExternalLink } from "lucide-react";
import { IpGeoData } from "@/lib/types";

interface IpFormatConverterProps {
  data: IpGeoData;
}

export default function IpFormatConverter({ data }: IpFormatConverterProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const formats = data.ipFormats;

  if (!formats) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const list = [
    {
      key: "decimal",
      label: "Ondalık (Decimal / Integer IP)",
      value: formats.decimal.toString(),
      desc: "32-bit tamsayı sayısal karşılığı",
    },
    {
      key: "hex",
      label: "Onaltılık (Hexadecimal IP)",
      value: formats.hex,
      desc: "Kompakt Hex gösterimi",
    },
    {
      key: "dotHex",
      label: "Noktalı Hex (Dotted Hex)",
      value: formats.dotHex,
      desc: "Her oktetin 0x formatı",
    },
    {
      key: "octal",
      label: "Sekizli (Octal IP)",
      value: formats.octal,
      desc: "0-tabanlı sekizli gösterim",
    },
    {
      key: "binary",
      label: "İkili (Binary IP)",
      value: formats.binary,
      desc: "32-bit ikili bit deseni",
    },
    {
      key: "integerUrl",
      label: "Integer URL (Tarayıcı Uyumlu)",
      value: formats.integerUrl,
      desc: "Tarayıcı adres çubuğuna yazılabilir doğrudan sayısal adres",
    },
    {
      key: "reversePtr",
      label: "Ters DNS (PTR Kaydı)",
      value: formats.reverseDnsPtr,
      desc: "DNS sorgularındaki ters arama formatı",
    },
  ];

  return (
    <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
            <Binary className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Gelişmiş IP Dönüştürücü & Sayısal Formatlar
            </h3>
            <p className="text-xs text-gray-500">
              Bu IP adresinin ikili (binary), onaltılık (hex), sekizli (octal) ve tamsayı (decimal) karşılıkları.
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-400 font-mono">
          Hedef: <strong className="text-blue-600">{data.ip}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.map((item) => (
          <div
            key={item.key}
            onClick={() => handleCopy(item.value, item.key)}
            className="group cursor-pointer p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  {item.label}
                </span>
                <button
                  type="button"
                  className="text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 p-1 rounded-lg"
                >
                  {copiedKey === item.key ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <p className="font-mono text-xs font-bold text-gray-900 dark:text-white break-all select-all">
                {item.value}
              </p>
            </div>

            <p className="text-[10px] text-gray-400 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
