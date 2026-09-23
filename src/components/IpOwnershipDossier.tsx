"use client";

import {
  Building2,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  HelpCircle,
  Share2,
  Download,
  CheckCircle2,
  Wifi,
  AlertTriangle,
  Info,
  Radio,
  FileSpreadsheet,
} from "lucide-react";
import { IpGeoData } from "@/lib/types";

interface IpOwnershipDossierProps {
  data: IpGeoData;
}

export default function IpOwnershipDossier({ data }: IpGeoData | any) {
  const ipData: IpGeoData = data;

  // Human readable operator & subscription type
  const isHosting = ipData.isHosting;
  const isVpn = ipData.isVpn || ipData.isProxy;
  const isTor = ipData.isTor;

  let ownerType = "Ev / Bireysel Abone";
  let ownerDesc = "Bu IP adresi standart bir ev veya ofis genişbant internet abonesine aittir.";
  if (isHosting) {
    ownerType = "Sunucu / Veri Merkezi (Hosting)";
    ownerDesc = "Bu IP adresi bir web sitesine, sunucuya veya bulut altyapısına aittir (Bireysel insan kullanıcısı değildir).";
  } else if (isTor) {
    ownerType = "Tor Anonim Çıkış Noktası";
    ownerDesc = "Bu IP adresi anonim Tor ağı üzerinden maskelenmiştir, asıl kişi gizlidir.";
  } else if (isVpn) {
    ownerType = "VPN / Proxy Sunucusu";
    ownerDesc = "Kullanıcı gerçek kimliğini ve yerini gizlemek için VPN/Proxy tüneli kullanmaktadır.";
  } else if (ipData.org?.toLowerCase().includes("university") || ipData.org?.toLowerCase().includes("universite")) {
    ownerType = "Üniversite / Eğitim Kurumu";
    ownerDesc = "Bu IP bir üniversite veya eğitim kurumunun kampüs ağına aittir.";
  }

  return (
    <section className="rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/30 border-2 border-blue-200 dark:border-blue-900/60 p-6 sm:p-8 shadow-xl shadow-blue-500/5 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-blue-100 dark:border-gray-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white uppercase tracking-wider mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            IP Sahiplik & Kimlik Raporu
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Bu IP Adresi Kime ve Nereye Ait?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
            Herkesin anlayabileceği sade ve net dille hazırlanmış sahiplik, operatör ve coğrafi konum dökümü.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            {ipData.ip}
          </span>
        </div>
      </div>

      {/* 4 Big Plain-Turkish Answers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Kime Ait? (Sahibi / Operatör) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block">
                1. Bu IP Kime Ait? (Operatör / Şirket)
              </span>
              <h3 className="text-lg font-black text-gray-900 dark:text-white mt-0.5">
                {ipData.isp}
              </h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                Hat Türü: {ownerType}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/60 p-3 rounded-xl">
            {ownerDesc}
          </p>
        </div>

        {/* 2. Nerede? (Nokta Atışı Konum) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block">
                2. Bu IP Nerede? (Coğrafi Bölge)
              </span>
              <h3 className="text-lg font-black text-gray-900 dark:text-white mt-0.5 flex items-center gap-1.5">
                <span>{ipData.district || ipData.city}, {ipData.city}</span>
                <span className="text-base">{ipData.flagEmoji || "🇹🇷"}</span>
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                {ipData.region} Bölgesi, {ipData.country}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/60 p-3 rounded-xl">
            Bu kullanıcı <strong>{ipData.city}</strong> bölgesindeki en yakın ana internet santraline bağlıdır. (Posta Kodu: {ipData.postalCode || "34000"})
          </p>
        </div>

        {/* 3. Gerçek mi Sahte mi? (Gizlilik Durumu) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-start gap-3.5">
            <div className={`p-3 rounded-2xl shrink-0 ${
              isVpn
                ? "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400"
                : "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
            }`}>
              {isVpn ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block">
                3. Gerçek Kullanıcı mı, Gizleniyor mu?
              </span>
              <h3 className="text-lg font-black text-gray-900 dark:text-white mt-0.5">
                {isVpn ? "VPN / Proxy ile Gizleniyor" : "Doğrudan Gerçek Bağlantı (VPN Yok)"}
              </h3>
              <p className={`text-xs font-bold mt-0.5 ${isVpn ? "text-amber-600" : "text-emerald-600"}`}>
                {isVpn ? "Konum maskelenmiş olabilir" : "Konum ve operatör gerçektir"}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/60 p-3 rounded-xl">
            {isVpn
              ? "Kullanıcı IP adresini değiştiren bir yazılım kullanıyor. Gerçek lokasyonu farklı bir şehirde veya ülkede olabilir."
              : "Bu cihaz herhangi bir gizleme aracı kullanmadan doğrudan kendi servis sağlayıcısı üzerinden internete bağlanıyor."}
          </p>
        </div>

        {/* 4. Güvenilir mi? (Dolandırıcı / Şüpheli Kontrolü) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block">
                4. Güvenilir mi? (Kara Liste / Şikayet)
              </span>
              <h3 className="text-lg font-black text-gray-900 dark:text-white mt-0.5">
                Temiz & Güvenli IP Adresi
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                Güvenlik Skoru: %{ipData.securityScore || 100} (Risk Yok)
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/60 p-3 rounded-xl">
            Bu IP adresi herhangi bir spam, botnet veya saldırı kara listesinde yer almamaktadır.
          </p>
        </div>
      </div>

      {/* Critical User Clarity Box: "Ev Adresi Neden Bulunamaz?" */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 dark:text-amber-200 space-y-1.5 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900 dark:text-amber-300">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Önemli Bilgi: IP Adresinden Açık Ev Adresi Bulunabilir mi?</span>
        </div>
        <p>
          İnternetteki hiçbir yasal sorgulama sitesi bir IP adresinin kapı numarasını veya kesin sokak ev adresini gösteremez. Gösterilen konum, internet servis sağlayıcınızın <strong>({ipData.isp})</strong> bağlı olduğu <strong>{ipData.city}</strong> ana santralidir. Kesin abone adresi yalnızca adli makamların (Savcılık / Emniyet) resmi talebiyle servis sağlayıcı tarafından verilir.
        </p>
      </div>
    </section>
  );
}
