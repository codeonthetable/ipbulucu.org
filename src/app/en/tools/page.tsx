import Link from "next/link";
import type { Metadata } from "next";
import {
  Globe2,
  Server,
  ShieldCheck,
  Search,
  Zap,
  Lock,
  FileCode2,
  Mail,
  Calculator,
  Radio,
  KeyRound,
  Terminal,
  Layers,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "All Free Network & DNS Diagnostic Tools - IPBulucu.org",
  description:
    "Explore 12+ free developer and network security tools: IP Lookup, Global DNS Propagation, Whois, Open Port Scanner, SSL Checker, HTTP Headers, SPF/DMARC, and CIDR Subnet Calculator.",
  alternates: {
    canonical: "https://ipbulucu.org/en/tools",
    languages: {
      tr: "https://ipbulucu.org/araclar",
      en: "https://ipbulucu.org/en/tools",
    },
  },
};

export default function EnglishAllToolsPage() {
  const toolCategories = [
    {
      category: "DNS & Domain Intelligence",
      description: "Analyze domain DNS records, global DNS-over-HTTPS propagation status, and authoritative nameservers.",
      tools: [
        {
          name: "Global DNS Propagation Checker",
          desc: "Compare Google and Cloudflare DNS responses from the IPBulucu server.",
          href: "/en/dns-propagation",
          icon: Globe2,
          color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40",
          badge: "Popular",
        },
        {
          name: "DNS Records Lookup",
          desc: "Inspect A, AAAA, MX, TXT (SPF/DMARC), NS, CNAME, and SOA records instantly.",
          href: "/en/dns-lookup",
          icon: Server,
          color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40",
        },
        {
          name: "Whois & RDAP Domain Lookup",
          desc: "Lookup domain registrar, registration date, expiration date, and registry nameservers.",
          href: "/en/whois",
          icon: Search,
          color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40",
        },
        {
          name: "Email Security (SPF / DMARC)",
          desc: "Inspect MX, SPF and direct DMARC record presence, including missing or duplicate records.",
          href: "/en/email-security",
          icon: Mail,
          color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40",
          badge: "Critical",
        },
      ],
    },
    {
      category: "IP, Network & Cybersecurity Tools",
      description: "IP address intelligence, open port testing, spam reputation lists, and privacy leak shields.",
      tools: [
        {
          name: "What Is My IP & Live Geolocation",
          desc: "Look up public IPv4/IPv6, approximate location, ISP and ASN where the provider has data.",
          href: "/en",
          icon: Globe2,
          color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40",
          badge: "Core Tool",
        },
        {
          name: "Open Port Scanner (Batch)",
          desc: "Verify open/closed status for web, database, email, and remote access ports (80, 443, 22, 3306, 3389).",
          href: "/en/port-scanner",
          icon: Zap,
          color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40",
        },
        {
          name: "IP Blacklist & Spam Reputation Check",
          desc: "Query SpamCop and DroneBL; see unavailable sources and official lookup links.",
          href: "/en/blacklist-check",
          icon: ShieldCheck,
          color: "text-red-600 bg-red-50 dark:bg-red-950/40",
        },
        {
          name: "WebRTC IP Leak Shield Test",
          desc: "Test whether your web browser leaks your real IP address over WebRTC STUN when using a VPN.",
          href: "/en/webrtc-leak-test",
          icon: Radio,
          color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40",
          badge: "Privacy",
        },
      ],
    },
    {
      category: "Webmaster & Developer Utilities",
      description: "SSL certificate diagnostics, HTTP security headers scoring, subnet math, and hashing algorithms.",
      tools: [
        {
          name: "SSL Certificate Checker",
          desc: "Verify TLS expiration dates, SSL issuer, SAN hostnames, and SHA-256 fingerprint.",
          href: "/en/ssl-checker",
          icon: Lock,
          color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40",
        },
        {
          name: "HTTP Security Headers Analyzer",
          desc: "Audit HSTS, CSP, X-Frame-Options, and Referrer-Policy with A+ grade security scoring.",
          href: "/en/http-headers",
          icon: FileCode2,
          color: "text-violet-600 bg-violet-50 dark:bg-violet-950/40",
        },
        {
          name: "CIDR & Subnet Mask Calculator",
          desc: "Calculate network address, broadcast address, netmask, wildcard mask, and usable host ranges.",
          href: "/en/subnet-calculator",
          icon: Calculator,
          color: "text-teal-600 bg-teal-50 dark:bg-teal-950/40",
        },
        {
          name: "Cryptographic Hash Generator",
          desc: "Generate instant client-side MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes.",
          href: "/en/hash-generator",
          icon: KeyRound,
          color: "text-orange-600 bg-orange-50 dark:bg-orange-950/40",
        },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 mb-3">
          <Layers className="w-3.5 h-3.5" />
          12+ Free Developer & Cybersecurity Tools
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Network & DNS Diagnostic Hub
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          Free network utilities for administrators, developers and everyday troubleshooting. Provider coverage and request limits apply.
        </p>
      </div>

      {/* Categories & Grid */}
      <div className="space-y-12">
        {toolCategories.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                {cat.category}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {cat.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.tools.map((tool, tIdx) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tIdx}
                    href={tool.href}
                    className="group relative flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className={`p-3 rounded-xl shrink-0 ${tool.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {tool.name}
                        </h3>
                        {tool.badge && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="absolute top-5 right-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal / API Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/20">
            <Terminal className="w-3.5 h-3.5" />
            CLI & Developer SDK Ready
          </div>
          <h2 className="text-2xl font-bold">Query Directly via Terminal or API</h2>
          <p className="text-sm text-blue-200 max-w-xl">
            Integrate our high-speed JSON APIs into your automation scripts or use our official NPM and PyPI packages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/en/api-docs"
            className="px-5 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm"
          >
            Explore API Docs &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
