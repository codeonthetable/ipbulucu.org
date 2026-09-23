"use client";

import { Activity, Gamepad2, Globe2, Zap, ArrowRight } from "lucide-react";
import { IpGeoData } from "@/lib/types";

interface GlobalLatencyRadarProps {
  data: IpGeoData;
}

export default function GlobalLatencyRadar({ data }: GlobalLatencyRadarProps) {
  const globalPings = data.globalPings || [];
  const gamePings = data.gamePings || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Global Datacenter Latency Radar */}
      <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Küresel Veri Merkezi Gecikme Radarı
              </h3>
              <p className="text-xs text-gray-500">
                Bu IP'nin dünya metropollerindeki sunuculara yaklaşık RTT ping süresi
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {globalPings.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{item.flag}</span>
                <div>
                  <strong className="text-gray-900 dark:text-white block">{item.city}</strong>
                  <span className="text-[10px] text-gray-400">{item.country}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`font-mono font-black text-sm ${
                    item.pingMs < 30
                      ? "text-emerald-600 dark:text-emerald-400"
                      : item.pingMs < 70
                      ? "text-blue-600 dark:text-blue-400"
                      : item.pingMs < 140
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-gray-500"
                  }`}
                >
                  ~{item.pingMs} ms
                </span>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.quality === "Mükemmel"
                      ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300"
                      : item.quality === "İyi"
                      ? "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {item.quality}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Popular Online Games Ping Matrix */}
      <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Popüler Oyun & Sunucu Ping Tahmini
              </h3>
              <p className="text-xs text-gray-500">
                Online oyun sunucularında alacağınız tahmini bağlantı performansı
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {gamePings.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs"
            >
              <div>
                <strong className="text-gray-900 dark:text-white block">{item.game}</strong>
                <span className="text-[10px] text-gray-400 font-mono">Sunucu: {item.server}</span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`font-mono font-black text-sm ${
                    item.pingMs < 20
                      ? "text-emerald-600 dark:text-emerald-400"
                      : item.pingMs < 50
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-amber-600"
                  }`}
                >
                  ~{item.pingMs} ms
                </span>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === "Mükemmel"
                      ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300"
                      : "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
