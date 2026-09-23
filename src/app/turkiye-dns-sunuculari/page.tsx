import type { Metadata } from "next";
import Link from "next/link";
import {
  Server,
  Zap,
  ShieldCheck,
  Copy,
  Check,
  Globe2,
  Sparkles,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata: Metadata = {
  title: "En Hızlı Türkiye ve Global DNS Sunucuları (2026 Güncel IP Listesi)",
  description:
    "Türk Telekom, Superonline, TurkNet, Cloudflare (1.1.1.1) ve Google (8.8.8.8) en hızlı DNS IP adresleri. DNS değiştirme rehberi ve ping hız testleri.",
  alternates: {
    canonical: "https://ipbulucu.org/turkiye-dns-sunuculari",
  },
};

const DNS_LIST = [
  {
    name: "Cloudflare DNS (En Hızlı & Güvenli)",
    primary: "1.1.1.1",
    secondary: "1.0.0.1",
    ipv6: "2606:4700:4700::1111",
    features: "Sıfır log tutma, en düşük Türkiye pingi, DoH desteği.",
    badge: "Önerilen",
  },
  {
    name: "Google Public DNS",
    primary: "8.8.8.8",
    secondary: "8.8.4.4",
    ipv6: "2001:4860:4860::8888",
    features: "Global kararlılık, yüksek erişilebilirlik.",
  },
  {
    name: "Quad9 DNS (Siber Tehdit Filtrelemeli)",
    primary: "9.9.9.9",
    secondary: "149.112.112.112",
    ipv6: "2620:fe::fe",
    features: "Zararlı yazılım ve phishing sitelerini otomatik engeller.",
  },
  {
    name: "AdGuard DNS (Reklam Engelleyici)",
    primary: "94.140.14.14",
    secondary: "94.140.15.15",
    features: "Web sitelerindeki reklam ve izleyicileri DNS seviyesinde bloklar.",
  },
  {
    name: "Türk Telekom DNS",
    primary: "195.175.39.39",
    secondary: "195.175.39.40",
    features: "Varsayılan yerel servis sağlayıcı DNS sunucusu.",
  },
  {
    name: "Turkcell Superonline DNS",
    primary: "213.74.1.1",
    secondary: "213.74.0.1",
    features: "Superonline fiber altyapısı varsayılan çözümleyicisi.",
  },
];

const DNS_FAQS = [
  {
    question: "DNS değiştirmek internet hızını artırır mı?",
    answer:
      "DNS değişikliği indirme (download) hızınızı artırmaz; ancak web sitelerinin ilk açılış süresini (alan adı çözümleme süresini) 50ms'den 4ms'ye kadar düşürerek gezinmeyi gözle görülür şekilde hızlandırır.",
  },
  {
    question: "Türkiye'de en hızlı DNS hangisidir?",
    answer:
      "İstanbul ve Frankfurt doğrudan peering hatlarına sahip olduğu için Türkiye'de genellikle en hızlı çözümleme süresi Cloudflare (1.1.1.1) ve Google DNS (8.8.8.8) tarafından sağlanır.",
  },
];

export default function TurkiyeDnsPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Server className="w-3.5 h-3.5" />
          <span>Hızlı DNS Rehberi & IP Listesi</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          En Hızlı Türkiye ve Global DNS Sunucuları (2026)
        </h1>
        <p className="text-base md:text-lg text-slate-300 leading-relaxed">
          Web sitelerine daha hızlı bağlanmak, engelleri aşmak ve siber güvenliğinizi artırmak için kullanabileceğiniz en popüler DNS sunucuları.
        </p>
      </div>

      {/* DNS Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DNS_LIST.map((dns, idx) => (
          <div key={idx} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">{dns.name}</h2>
              {dns.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
                  {dns.badge}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Birincil DNS</div>
                <div className="text-sm font-mono font-bold text-cyan-400 mt-0.5">{dns.primary}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500 font-bold uppercase">İkincil DNS</div>
                <div className="text-sm font-mono font-bold text-cyan-400 mt-0.5">{dns.secondary}</div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">{dns.features}</p>
          </div>
        ))}
      </div>

      <AdPlaceholder slotId="dns-list-mid" format="leaderboard" />

      {/* Windows / Mac / Phone Setup instructions */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-bold text-white">DNS Nasıl Değiştirilir? (Hızlı Adımlar)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-white">Windows 11 / 10</div>
            <p className="text-slate-400">Ayarlar ➔ Ağ ve İnternet ➔ Bağdaştırıcı Seçenekleri ➔ IPv4 Özellikleri ➔ DNS adreslerini girin.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-white">Mac (macOS)</div>
            <p className="text-slate-400">Sistem Ayarları ➔ Ağ ➔ Wi-Fi ➔ Ayrıntılar ➔ DNS sekmesinden (+) ile 1.1.1.1 ekleyin.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-white">iPhone & Android</div>
            <p className="text-slate-400">Wi-Fi ayarlarında bağlı olduğunuz ağa tıklayın ➔ DNS&#39;i Yapılandır ➔ Elle (Manual) seçip kaydedin.</p>
          </div>
        </div>
      </div>

      <FaqAccordion faqs={DNS_FAQS} title="DNS Sunucuları Hakkında Sıkça Sorulanlar" />
    </div>
  );
}
