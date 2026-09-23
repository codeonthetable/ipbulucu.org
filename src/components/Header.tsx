"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe2,
  ShieldCheck,
  Search,
  Server,
  Zap,
  Menu,
  X,
  Moon,
  Sun,
  Terminal,
  Layers,
  Lock,
  Mail,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const navLinks = [
    { name: "IP Sorgula", href: "/", icon: Globe2 },
    { name: "IP Takip", href: "/ip-takip", icon: Zap },
    { name: "DNS Yayılma", href: "/dns-yayilma-kontrolu", icon: Globe2 },
    { name: "Whois", href: "/whois", icon: Search },
    { name: "DNS Kayıtları", href: "/dns-sorgulama", icon: Server },
    { name: "Port Testi", href: "/port-kontrolu", icon: Zap },
    { name: "Tüm Araçlar", href: "/araclar", icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Globe2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-blue-700 dark:from-white dark:via-gray-100 dark:to-blue-400 bg-clip-text text-transparent">
              IPBulucu<span className="text-blue-600 dark:text-blue-400">.org</span>
            </span>
            <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">
              Ağ & DNS Araçları
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
              >
                <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* CLI Info Link */}
          <Link
            href="/api/ip"
            target="_blank"
            title="curl ipbulucu.org API"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:border-blue-500 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-500" />
            <span>curl ipbulucu.org</span>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Karanlık/Aydınlık mod değiştir"
            className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menüyü aç/kapat"
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
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {item.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
            <span className="font-mono">CLI: curl ipbulucu.org</span>
            <Link href="/araclar" className="text-blue-600 dark:text-blue-400 font-bold">
              Tüm 12+ Aracı Gör &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
