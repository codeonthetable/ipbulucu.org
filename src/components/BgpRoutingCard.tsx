import { Server, Share2, Network, Calendar, Shield, Cpu, ArrowUpRight } from "lucide-react";
import { IpGeoData } from "@/lib/types";

interface BgpRoutingCardProps {
  data: IpGeoData;
}

export default function BgpRoutingCard({ data }: BgpRoutingCardProps) {
  return (
    <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              BGP Yönlendirme & Omurga (Routing Intel)
            </h3>
            <p className="text-xs text-gray-500">
              Bu IP adresinin internet omurgasındaki BGP anonsları, transit operatörleri ve değişim noktaları.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-mono text-xs font-bold border border-purple-200 dark:border-purple-800">
            {data.asn}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* BGP Prefix */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            BGP Rota Bloğu (Prefix CIDR)
          </span>
          <p className="text-base font-black text-purple-600 dark:text-purple-400 font-mono mt-1">
            {data.bgpPrefix || "Anons Havuzu"}
          </p>
          <span className="text-[11px] text-gray-500 mt-1 block">BGP Yönlendirme Aralığı</span>
        </div>

        {/* Registry & Allocation */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            RIR Kayıt Kuruluşu
          </span>
          <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
            {data.allocatedRegistry || "RIPE NCC (Avrupa/Orta Doğu)"}
          </p>
          <span className="text-[11px] text-gray-500 mt-1 block">Tahsis: {data.allocatedDate || "2004"}</span>
        </div>

        {/* Upstream Providers */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 lg:col-span-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
            Bağlı Transit & Tier-1 Omurga Sağlayıcıları (Upstreams)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {data.upstreamProviders && data.upstreamProviders.length > 0 ? (
              data.upstreamProviders.map((up, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 flex items-center gap-1"
                >
                  <ArrowUpRight className="w-3 h-3 text-purple-500" /> {up}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">Doğrudan Yerel BGP</span>
            )}
          </div>
        </div>
      </div>

      {/* IXP Peering Points */}
      {data.ixpConnections && data.ixpConnections.length > 0 && (
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Share2 className="w-4 h-4 text-purple-500" />
            <span className="font-semibold">İnternet Değişim Noktaları (IXP Peering):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.ixpConnections.map((ixp, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800"
              >
                {ixp}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
