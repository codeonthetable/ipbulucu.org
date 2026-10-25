"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe2,
  Search,
  Server,
  Zap,
  Menu,
  X,
  Moon,
  Sun,
  Terminal,
  Layers,
  Languages,
} from "lucide-react";
import { getOppositeRoute } from "@/lib/i18n/routes";
import { TRANSLATIONS } from "@/lib/i18n/translations";

export default function Header() {
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const t = isEn ? TRANSLATIONS.en.nav : TRANSLATIONS.tr.nav;
  const switchTarget = getOppositeRoute(pathname);

  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // The shared root layout survives client navigation between TR and EN.
    document.documentElement.lang = isEn ? "en" : "tr";
  }, [isEn]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navLinks = isEn
    ? [
        { name: "IP Lookup", href: "/en", icon: Globe2 },
        { name: "IP Tracker", href: "/en/ip-tracker", icon: Zap },
        { name: "DNS Propagation", href: "/en/dns-propagation", icon: Globe2 },
        { name: "Whois", href: "/en/whois", icon: Search },
        { name: "DNS Records", href: "/en/dns-lookup", icon: Server },
        { name: "Port Scanner", href: "/en/port-scanner", icon: Zap },
        { name: "All Tools", href: "/en/tools", icon: Layers },
      ]
    : [
        { name: "IP Sorgula", href: "/", icon: Globe2 },
        { name: "IP Takip", href: "/ip-takip", icon: Zap },
        { name: "DNS Yayılma", href: "/dns-yayilma-kontrolu", icon: Globe2 },
        { name: "Whois", href: "/whois", icon: Search },
        { name: "DNS Kayıtları", href: "/dns-sorgulama", icon: Server },
        { name: "Port Testi", href: "/port-kontrolu", icon: Zap },
        { name: "Tüm Araçlar", href: "/araclar", icon: Layers },
      ];

  const homeHref = isEn ? "/en" : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={homeHref} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Globe2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-blue-700 dark:from-white dark:via-gray-100 dark:to-blue-400 bg-clip-text text-transparent">
              IPBulucu<span className="text-blue-600 dark:text-blue-400">.org</span>
            </span>
            <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">
              {t.brandSub}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Chrome Extension Official Store Link */}
          <a
            href="https://chromewebstore.google.com/detail/ip-bulucu-anl%c4%b1k-ip-konum/nifmmckmhnfjmpjfakhkifbeegdnanpb"
            target="_blank"
            rel="noopener noreferrer"
            title={isEn ? "Add to Chrome (Free Extension)" : "Chrome'a Ekle (Ücretsiz Eklenti)"}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:border-emerald-500 hover:bg-emerald-500/20 transition-all shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isEn ? "Chrome Extension" : "Chrome Eklentisi"}</span>
          </a>

          {/* GitHub Official Repo Link */}
          <a
            href="https://github.com/codeonthetable/ipbulucu.org"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub: codeonthetable/ipbulucu.org"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-500" />
            <span>GitHub</span>
          </a>

          {/* Language Switcher Button */}
          <Link
            href={switchTarget.path}
            title={isEn ? "Türkçe'ye geç" : "Switch to English"}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
          >
            <Languages className="w-3.5 h-3.5 text-blue-500" />
            <span>{isEn ? "🇹🇷 TR" : "🇺🇸 EN"}</span>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={t.themeToggle}
            className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {item.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
            <a
              href="https://chromewebstore.google.com/detail/ip-bulucu-anl%c4%b1k-ip-konum/nifmmckmhnfjmpjfakhkifbeegdnanpb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold"
            >
              🧩 {isEn ? "Add Chrome Extension" : "Chrome Eklentisini Kur"}
            </a>
            <a
              href="https://github.com/codeonthetable/ipbulucu.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold"
            >
              ⭐ GitHub Repo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
