"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, Wifi, Server, CheckCircle2, AlertTriangle, ArrowRight, HelpCircle } from "lucide-react";
import { IpGeoData } from "@/lib/types";

interface DnsLeakAndCgnatCardProps {
  data: IpGeoData;
}

export default function DnsLeakAndCgnatCard({ data }: DnsLeakAndCgnatCardProps) {
  const cgnat = data.cgnatDiagnostic;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. CGNAT & Port Açılabilirlik Teşhisi */}
      <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  CGNAT & Port Yönlendirme Teşhisi
                </h3>
                <p className="text-xs text-gray-500">
                  Modeminizde port açıp açamayacağınızın teknik analizi
                </p>
              </div>
            </div>

            {cgnat?.isBehindCgnat ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                CGNAT Havuzunda
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Doğrudan Genel IP
              </span>
            )}
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              {cgnat?.canPortForward ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              <span>
                {cgnat?.canPortForward
                  ? "Port Yönlendirme (Port Forwarding) Mümkün"
                  : "Standart Port Yönlendirme Engelli (CGNAT)"}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {cgnat?.solution}
            </p>
          </div>
        </div>

        <div className="text-[11px] text-gray-500 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span>* Kamera, NAS, Minecraft veya Web sunucuları için gereklidir.</span>
        </div>
      </div>

      {/* 2. IPv6 Çift Yığın (Dual-Stack) & DNS Gizlilik Durumu */}
      <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  IPv6 Uyumluluğu & DNS Gizliliği
                </h3>
                <p className="text-xs text-gray-500">
                  Bağlantınızın yeni nesil protokol ve sızıntı koruma durumu
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
              <div>
                <strong className="text-gray-900 dark:text-white block">Aktif Protokol</strong>
                <span className="text-gray-400">{data.version} Standart Yönlendirme</span>
              </div>
              <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold font-mono">
                {data.version}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
              <div>
                <strong className="text-gray-900 dark:text-white block">ISP DNS Çözümleme Durumu</strong>
                <span className="text-gray-400">Operatör Varsayılan DNS Omurgası</span>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold">
                Güvenli (Doğrudan)
              </span>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-gray-500 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span>* Şifreli DNS için Cloudflare 1.1.1.1 veya Google 8.8.8.8 kullanabilirsiniz.</span>
        </div>
      </div>
    </div>
  );
}
