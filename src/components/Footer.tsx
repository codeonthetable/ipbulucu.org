"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2, Terminal, Layers } from "lucide-react";
import { CITIES_DATA, ISPS_DATA, ASNS_DATA } from "@/lib/seo-data";
import { TRANSLATIONS } from "@/lib/i18n/translations";

export default function Footer() {
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const t = isEn ? TRANSLATIONS.en.footer : TRANSLATIONS.tr.footer;

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950 text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={isEn ? "/en" : "/"} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Globe2 className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                IPBulucu<span className="text-blue-600">.org</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2.5 rounded-xl w-fit">
              <Terminal className="w-4 h-4 text-blue-500" />
              <span>curl https://ipbulucu.org/api/ip</span>
            </div>
          </div>

          {/* Network Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              {isEn ? "Network Tools" : "Ağ & DNS Araçları"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={isEn ? "/en" : "/"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isEn ? "What is My IP?" : "IP Adresim Nedir?"}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/dns-propagation" : "/dns-yayilma-kontrolu"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isEn ? "DNS Resolver Comparison" : "DNS Çözümleyici Karşılaştırma"}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/whois" : "/whois"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isEn ? "Whois & RDAP Lookup" : "Whois & RDAP Sorgulama"}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/dns-lookup" : "/dns-sorgulama"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isEn ? "DNS Records Lookup" : "DNS Kayıtları Çözümleme"}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/port-scanner" : "/port-kontrolu"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isEn ? "Open Port Check" : "Açık Port Kontrolü"}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/blacklist-check" : "/karaliste-kontrolu"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isEn ? "DNSBL Blacklist & Spam" : "DNSBL Kara Liste / Spam Testi"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Webmaster & Dev Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              {isEn ? "Security & Dev Tools" : "Webmaster Araçları"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={isEn ? "/en/ssl-checker" : "/ssl-kontrolu"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isEn ? "SSL Certificate Checker" : "SSL Sertifika Kontrolü"}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/http-headers" : "/header-kontrolu"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isEn ? "HTTP Security Headers" : "HTTP & Güvenlik Başlıkları"}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/email-security" : "/eposta-guvenlik-kontrolu"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isEn ? "Email Security (SPF/DMARC)" : "SPF / DMARC E-Posta Testi"}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/subnet-calculator" : "/subnet-hesaplayici"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isEn ? "Subnet & CIDR Calculator" : "Subnet & CIDR Hesaplayıcı"}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/webrtc-leak-test" : "/webrtc-sizinti-testi"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {isEn ? "WebRTC IP Leak Test" : "WebRTC IP Sızıntı Testi"}
                </Link>
              </li>
              <li>
                <a
                  href="https://gecici.email/"
                  target="_blank"
                  rel="noopener"
                  title="Spam korumalı reklamsız geçici posta ve onay kodu servisi"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-emerald-600 dark:text-emerald-400"
                >
                  {isEn ? "Temporary Disposable Email (gecici.email)" : "Geçici E-posta İstasyonu (gecici.email)"}
                </a>
              </li>
              <li>
                <Link href={isEn ? "/en/api-docs" : "/api-dokumantasyon"} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                  {isEn ? "Free API Documentation →" : "Ücretsiz API Dokümantasyonu →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Hub Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              {isEn ? "Ecosystem & Guides" : "Rehberler & Kılavuzlar"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={isEn ? "/en/tools" : "/araclar"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
                  <Layers className="w-3.5 h-3.5" />
                  {isEn ? "All 12+ Tools Hub" : "Tüm 12+ Ağ Aracı"}
                </Link>
              </li>
              <li>
                <Link href="/ip-sorgulama" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  IP Sorgulama (Canlı)
                </Link>
              </li>
              <li>
                <Link href="/ip-den-adres-bulma" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  IP&#39;den Adres Bulma
                </Link>
              </li>
              <li>
                <Link href="/karsi-tarafin-ip-adresini-bulma" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Karşı Tarafın IP&#39;sini Bulma
                </Link>
              </li>
              <li>
                <Link href="/ip-tespit-etme" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  IP Tespit Etme & Öğrenme
                </Link>
              </li>
              <li>
                <Link href="/cgnat-nedir-nasil-anlasilir" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  CGNAT Nedir?
                </Link>
              </li>
              <li>
                <Link href="/ip-ile-konum-bulma-nasil-yapilir" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  IP ile Konum Bulma
                </Link>
              </li>
              <li>
                <Link href="/statik-ip-dinamik-ip-farklari" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Statik vs Dinamik IP
                </Link>
              </li>
              <li>
                <Link href="/oyunlarda-ping-dusurme-yollari" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Ping Düşürme Rehberi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Ecosystem & Open Source Authority Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <a
            href="https://chromewebstore.google.com/detail/ip-bulucu-anl%c4%b1k-ip-konum/nifmmckmhnfjmpjfakhkifbeegdnanpb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 hover:border-amber-500 hover:shadow-sm transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
              CWS
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors">
                {isEn ? "Chrome Extension" : "Chrome Eklentisi"}
              </span>
              <span className="text-[11px] text-gray-500">Chrome Web Store</span>
            </div>
          </a>

          <a
            href="https://github.com/codeonthetable/ipbulucu.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 hover:shadow-sm transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
              git
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                GitHub Repository
              </span>
              <span className="text-[11px] text-gray-500">codeonthetable/ipbulucu.org</span>
            </div>
          </a>

          <a
            href="https://www.npmjs.com/package/ipbulucu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 hover:border-red-500 hover:shadow-sm transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-xs">
              npm
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">
                NPM Package
              </span>
              <span className="text-[11px] text-gray-500">npm i ipbulucu</span>
            </div>
          </a>

          <a
            href="https://pypi.org/project/ipbulucu/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:shadow-sm transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
              py
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                PyPI Python SDK
              </span>
              <span className="text-[11px] text-gray-500">pip install ipbulucu</span>
            </div>
          </a>

          <Link
            href={isEn ? "/en/privacy-policy" : "/gizlilik-politikasi"}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 hover:border-emerald-500 hover:shadow-sm transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
              KVKK
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                {t.privacyPolicy}
              </span>
              <span className="text-[11px] text-gray-500">{isEn ? "Data processing information" : "Veri işleme açıklaması"}</span>
            </div>
          </Link>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} IPBulucu.org - {t.allRights}</p>
          <div className="flex items-center gap-4">
            <Link href={isEn ? "/en/privacy-policy" : "/gizlilik-politikasi"} className="hover:text-gray-600 dark:hover:text-gray-300">
              {t.privacyPolicy}
            </Link>
            <span>•</span>
            <Link href={isEn ? "/en/api-docs" : "/api-dokumantasyon"} className="hover:text-gray-600 dark:hover:text-gray-300">
              {t.apiDocs}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
