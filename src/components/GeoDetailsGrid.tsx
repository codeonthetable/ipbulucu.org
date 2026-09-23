"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Building,
  Clock,
  Compass,
  Server,
  Shield,
  Radio,
  Copy,
  Check,
  Monitor,
  Laptop,
  Smartphone,
  Wifi,
  Coins,
  ShieldAlert,
  ShieldCheck,
  Globe2,
  Cpu,
} from "lucide-react";
import { IpGeoData, ClientDeviceInfo } from "@/lib/types";

interface GeoDetailsGridProps {
  data: IpGeoData;
}

export default function GeoDetailsGrid({ data }: GeoDetailsGridProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<ClientDeviceInfo | null>(null);

  useEffect(() => {
    // Collect rich client-side browser/device metrics
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      let browser = "Bilinmiyor";
      if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Google Chrome";
      else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Apple Safari";
      else if (ua.includes("Edg")) browser = "Microsoft Edge";
      else if (ua.includes("Firefox")) browser = "Mozilla Firefox";

      let os = "Bilinmiyor";
      if (ua.includes("Macintosh") || ua.includes("Mac OS")) os = "macOS";
      else if (ua.includes("Windows")) os = "Windows";
      else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
      else if (ua.includes("Android")) os = "Android";
      else if (ua.includes("Linux")) os = "Linux";

      const isMobile = /Mobi|Android/i.test(ua);
      const isTablet = /Tablet|iPad/i.test(ua);
      const deviceType = isTablet ? "Tablet" : isMobile ? "Mobil Cihaz" : "Masaüstü / Laptop";

      setDeviceInfo({
        browser,
        os,
        deviceType,
        screenResolution: `${window.screen.width} x ${window.screen.height}`,
        colorDepth: `${window.screen.colorDepth}-bit`,
        language: navigator.language || "tr-TR",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Istanbul",
        onlineStatus: navigator.onLine,
      });
    }
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const details = [
    {
      key: "location",
      title: "Coğrafi Konum",
      value: `${data.city}, ${data.region}`,
      sub: `${data.country} ${data.flagEmoji || "🇹🇷"} (${data.continent || "Avrupa"})`,
      copyText: `${data.city}, ${data.region}, ${data.country}`,
      icon: MapPin,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
      key: "isp",
      title: "İnternet Servis Sağlayıcı (ISP)",
      value: data.isp,
      sub: data.org || "Ana Dağıtım Omurgası",
      copyText: data.isp,
      icon: Building,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
    },
    {
      key: "asn",
      title: "Otonom Sistem (ASN)",
      value: data.asn,
      sub: data.asnOrg || "BGP Yönlendirme",
      copyText: data.asn,
      icon: Server,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
      key: "iptype",
      title: "Bağlantı ve IP Türü",
      value: data.ipType || "Ev / Bireysel (Residential)",
      sub: data.isCgnat ? "CGNAT Havuzunda (Paylaşımlı IP)" : "Doğrudan Genel IP",
      copyText: data.ipType || "Residential",
      icon: Wifi,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      key: "coords",
      title: "Enlem / Boylam Koordinatları",
      value: `${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}`,
      sub: `Posta Kodu: ${data.postalCode || "34000"}`,
      copyText: `${data.latitude}, ${data.longitude}`,
      icon: Compass,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/40",
    },
    {
      key: "timezone",
      title: "Saat Dilimi & Para Birimi",
      value: data.timezone,
      sub: data.currency ? `${data.currency.name} (${data.currency.code})` : "Yerel Saat",
      copyText: data.timezone,
      icon: Clock,
      color: "text-cyan-500",
      bg: "bg-cyan-50 dark:bg-cyan-950/40",
    },
    {
      key: "rdns",
      title: "Ters DNS (rDNS Hostname)",
      value: data.hostname || "Tanımlanmamış",
      sub: "PTR Kayıt Çözümlemesi",
      copyText: data.hostname || data.ip,
      icon: Radio,
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-950/40",
    },
    {
      key: "continent",
      title: "Kıta & Bölge Kodu",
      value: `${data.continent || "Avrupa"} (${data.continentCode || "EU"})`,
      sub: `Ülke Kodu: ${data.countryCode}`,
      copyText: `${data.countryCode} - ${data.continent}`,
      icon: Globe2,
      color: "text-teal-500",
      bg: "bg-teal-50 dark:bg-teal-950/40",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 8-Card Detailed Network Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {details.map((item) => {
          const Icon = item.icon;
          const isCopied = copiedKey === item.key;

          return (
            <div
              key={item.key}
              onClick={() => handleCopy(item.copyText, item.key)}
              title="Kopyalamak için tıklayın"
              className="group cursor-pointer relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className={`p-2.5 rounded-xl ${item.bg} ${item.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <button
                  type="button"
                  className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div>
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  {item.title}
                </span>
                <p className="text-base font-extrabold text-gray-900 dark:text-white truncate mt-0.5">
                  {item.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security & Intelligence Bar with Score Gauge */}
      <div className="rounded-3xl bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-blue-600/30 text-blue-400 border border-blue-500/30 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">IP Güvenlik, Gizlilik ve Tehdit Analizi</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {data.threatLevel || "Güvenli (Düşük)"}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 max-w-xl">
                Bu IP adresinin VPN servisleri, anonim proxy sunucuları, Tor çıkış düğümleri veya kurumsal veri merkezleri ile ilişkisi kontrol edildi.
              </p>
            </div>
          </div>

          {/* Security Score Meter */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl shrink-0">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">
                Güvenilirlik Puanı
              </span>
              <span className="text-3xl font-black text-emerald-400 font-mono">
                %{data.securityScore || 100}
              </span>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="text-xs space-y-1 text-gray-300">
              <div className="flex items-center gap-2">
                <span>VPN:</span>
                <strong className={data.isVpn ? "text-amber-400" : "text-emerald-400"}>
                  {data.isVpn ? "Aktif" : "Yok"}
                </strong>
              </div>
              <div className="flex items-center gap-2">
                <span>Proxy:</span>
                <strong className={data.isProxy ? "text-amber-400" : "text-emerald-400"}>
                  {data.isProxy ? "Aktif" : "Yok"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local Device & Browser Intel Card */}
      {deviceInfo && (
        <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Cihazınız ve Tarayıcı Bilgileri (İstemci Analizi)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 block font-semibold">Tarayıcı</span>
              <span className="font-bold text-gray-900 dark:text-gray-100 mt-0.5 block truncate">
                {deviceInfo.browser}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 block font-semibold">İşletim Sistemi</span>
              <span className="font-bold text-gray-900 dark:text-gray-100 mt-0.5 block truncate">
                {deviceInfo.os}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 block font-semibold">Cihaz Türü</span>
              <span className="font-bold text-gray-900 dark:text-gray-100 mt-0.5 block truncate">
                {deviceInfo.deviceType}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 block font-semibold">Ekran Çözünürlüğü</span>
              <span className="font-bold text-gray-900 dark:text-gray-100 mt-0.5 block truncate">
                {deviceInfo.screenResolution}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 block font-semibold">Renk Derinliği</span>
              <span className="font-bold text-gray-900 dark:text-gray-100 mt-0.5 block truncate">
                {deviceInfo.colorDepth}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 block font-semibold">Bağlantı Durumu</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Çevrimiçi
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
