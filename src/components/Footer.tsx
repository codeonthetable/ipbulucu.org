import Link from "next/link";
import { Globe2, Shield, Zap, Terminal, Heart, Layers } from "lucide-react";
import { CITIES_DATA, ISPS_DATA, ASNS_DATA } from "@/lib/seo-data";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950 text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Globe2 className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                IPBulucu<span className="text-blue-600">.org</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              Google SEO uyumlu, Core Web Vitals optimizasyonlu yeni nesil IP adresi, coğrafi konum, DNS yayılma, Whois, SSL, SPF/DMARC ve açık port sorgulama platformu.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2.5 rounded-xl w-fit">
              <Terminal className="w-4 h-4 text-blue-500" />
              <span>curl ipbulucu.org</span>
            </div>
          </div>

          {/* Network Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Ağ & DNS Araçları
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  IP Adresim Nedir?
                </Link>
              </li>
              <li>
                <Link href="/dns-yayilma-kontrolu" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Global DNS Yayılma Testi
                </Link>
              </li>
              <li>
                <Link href="/whois" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Whois & RDAP Sorgulama
                </Link>
              </li>
              <li>
                <Link href="/dns-sorgulama" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  DNS Kayıtları Çözümleme
                </Link>
              </li>
              <li>
                <Link href="/port-kontrolu" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Açık Port Testi (Toplu)
                </Link>
              </li>
              <li>
                <Link href="/karaliste-kontrolu" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  DNSBL Kara Liste / Spam Testi
                </Link>
              </li>
            </ul>
          </div>

          {/* Webmaster & Dev Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Webmaster Araçları
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ssl-kontrolu" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  SSL Sertifika Kontrolü
                </Link>
              </li>
              <li>
                <Link href="/header-kontrolu" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  HTTP & Güvenlik Başlıkları
                </Link>
              </li>
              <li>
                <Link href="/eposta-guvenlik-kontrolu" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  SPF / DMARC E-Posta Testi
                </Link>
              </li>
              <li>
                <Link href="/subnet-hesaplayici" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Subnet & CIDR Hesaplayıcı
                </Link>
              </li>
              <li>
                <Link href="/webrtc-sizinti-testi" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  WebRTC IP Sızıntı Testi
                </Link>
              </li>
              <li>
                <Link href="/api-dokumantasyon" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                  API & Yapay Zeka (AI) Dokümanı &rarr;
                </Link>
              </li>
              <li>
                <Link href="/araclar" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  Tüm Araçlar Dizini &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular ISPs SEO Directory */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              İnternet Sağlayıcılar
            </h3>
            <ul className="space-y-2 text-sm">
              {ISPS_DATA.map((isp) => (
                <li key={isp.slug}>
                  <Link
                    href={`/isp/${isp.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {isp.name} ({isp.asn})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright & privacy */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} IPBulucu.org - Tüm hakları saklıdır. Yüksek Hızlı IP ve Coğrafi Konum Servisi.</p>
          <div className="flex items-center gap-4">
            <Link href="/api/ip" className="hover:underline">
              Geliştirici API
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              Google Bot & Core Web Vitals ile Optimize Edildi <Zap className="w-3.5 h-3.5 text-amber-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
