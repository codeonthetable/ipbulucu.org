import {
  Globe,
  Shield,
  Zap,
  Terminal,
  Server,
  Lock,
  Search,
  CheckCircle,
} from "lucide-react";

export default function SeoContentSection() {
  return (
    <article className="my-16 space-y-12 text-gray-700 dark:text-gray-300">
      {/* Intro Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          IP Adresi ve Coğrafi Konum Tespiti Rehberi
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          <strong>IPBulucu.org</strong>, internet bağlantınıza ait dış (genel) IP adresini, coğrafi konumunuzu, servis sağlayıcınızı (ISP) ve ağ güvenlik durumunuzu milisaniyeler içinde tespit eden yeni nesil bir ağ analiz platformudur.
        </p>
      </div>

      {/* 3 Pillars Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            0ms Edge Gecikmesi
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Google Core Web Vitals standartlarına tam uyumlu altyapımız sayesinde IP tespitiniz harici API gecikmesi olmaksızın anında ekrana gelir.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            VPN & Proxy Analizi
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Bağlantınızın arkasında bir VPN tüneli, kurumsal proxy veya Tor çıkış noktası olup olmadığını gerçek zamanlı olarak analiz eder.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Zengin Ağ Araçları
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Yalnızca IP tespiti değil; DNS sorgulama, Whois analizi, açık port kontrolü ve DNSBL spam kara liste testlerini bir arada sunar.
          </p>
        </div>
      </div>

      {/* In-depth Informative Article */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            IP Sorgulama ile Hangi Bilgilere Ulaşılır?
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
            Bir IP adresi sorgulandığında genel açık veritabanları (RIPE, ARIN, APNIC) ve BGP yönlendirme tabloları üzerinden şu kritik bilgiler elde edilir:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <li className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Ülke, İl ve İlçe:</strong> Yaklaşık coğrafi konum</span>
            </li>
            <li className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>İnternet Servis Sağlayıcı (ISP):</strong> Hat operatörü</span>
            </li>
            <li className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>ASN Numarası:</strong> Otonom sistem yönlendiricisi</span>
            </li>
            <li className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Saat Dilimi & Koordinatlar:</strong> Enlem ve boylam</span>
            </li>
          </ul>
        </section>

        {/* Developer CLI Section */}
        <section className="p-6 rounded-3xl bg-gray-900 text-white border border-gray-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold">Yazılımcılar ve Sistem Yöneticileri İçin CLI Desteği</h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-gray-800 text-gray-300 font-mono">
              BASH / CMD / POWERSHELL
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-400">
            Komut satırınızdan herhangi bir tarayıcı açmadan doğrudan IP adresinizi veya JSON çıktısını çekebilirsiniz:
          </p>

          <div className="space-y-2 font-mono text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-black/60 border border-gray-800 flex items-center justify-between">
              <span className="text-emerald-400">$ curl ipbulucu.org</span>
              <span className="text-gray-500"># Yalnızca IP adresini döner</span>
            </div>
            <div className="p-3 rounded-xl bg-black/60 border border-gray-800 flex items-center justify-between">
              <span className="text-blue-400">$ curl ipbulucu.org/api/ip?format=json</span>
              <span className="text-gray-500"># Detaylı JSON verisi döner</span>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
