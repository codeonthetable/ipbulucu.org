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
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata: Metadata = {
  title: "Tüm Ağ ve DNS Araçları - IPBulucu.org",
  description:
    "IP sorgulama, DNS yayılma kontrolü, Whois, açık port testi, SSL denetimi, HTTP başlıkları, SPF/DMARC ve Subnet hesaplayıcı dahil tüm ücretsiz ağ araçları.",
  alternates: {
    canonical: "https://ipbulucu.org/araclar",
  },
};

export default function AllToolsPage() {
  const toolCategories = [
    {
      category: "DNS & Alan Adı Araçları",
      description: "Alan adınızın DNS kayıtları, küresel yayılma durumu ve yetkili sunucularını analiz edin.",
      tools: [
        {
          name: "Global DNS Yayılma Kontrolü",
          desc: "DNS değişikliklerinin dünya genelindeki 12+ sunucuya yayılma yüzdesini test edin.",
          href: "/dns-yayilma-kontrolu",
          icon: Globe2,
          color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40",
          badge: "Popüler",
        },
        {
          name: "DNS Kayıt Sorgulama",
          desc: "A, AAAA, MX, TXT (SPF/DMARC), NS ve CNAME kayıtlarını anında listeleyin.",
          href: "/dns-sorgulama",
          icon: Server,
          color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40",
        },
        {
          name: "Whois & RDAP Sorgulayıcı",
          desc: ".com, .net ve .tr alan adlarının tescil firması, kayıt ve bitiş tarihlerini öğrenin.",
          href: "/whois",
          icon: Search,
          color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40",
        },
        {
          name: "E-Posta Güvenlik (SPF / DMARC)",
          desc: "E-postalarınızın spama düşmesini engelleyen SPF ve DMARC kayıtlarını test edin.",
          href: "/eposta-guvenlik-kontrolu",
          icon: Mail,
          color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40",
          badge: "Kritik",
        },
      ],
    },
    {
      category: "IP, Ağ & Güvenlik Araçları",
      description: "IP adresi tespiti, açık port taraması, spam listeleri ve ağ gizlilik testleri.",
      tools: [
        {
          name: "IP Adresim & Canlı Konum",
          desc: "Dış IP adresiniz, santral konumu, ISP, ASN ve VPN/Proxy risk puanı.",
          href: "/",
          icon: Globe2,
          color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40",
          badge: "Ana Araç",
        },
        {
          name: "Açık Port Kontrolü (Toplu Tarama)",
          desc: "HTTP (80), HTTPS (443), SSH (22) gibi popüler portların açık/kapalı durumunu test edin.",
          href: "/port-kontrolu",
          icon: Zap,
          color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40",
        },
        {
          name: "Kara Liste & Spam Kontrolü",
          desc: "IP adresinizin Spamhaus, Barracuda gibi 10+ global DNSBL listesinde olup olmadığını kontrol edin.",
          href: "/karaliste-kontrolu",
          icon: ShieldCheck,
          color: "text-red-600 bg-red-50 dark:bg-red-950/40",
        },
        {
          name: "WebRTC IP Sızıntı Testi",
          desc: "VPN açıkken tarayıcınızın WebRTC STUN üzerinden gerçek IP sızdırıp sızdırmadığını canlı test edin.",
          href: "/webrtc-sizinti-testi",
          icon: Radio,
          color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40",
          badge: "Gizlilik",
        },
        {
          name: "IP Değişim & Kara Liste Takipçisi",
          desc: "Ev, ofis veya sunucu IP'niz değiştiğinde Telegram/Discord Webhook ile anında ücretsiz bildirim alın.",
          href: "/ip-takip",
          icon: Zap,
          color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40",
          badge: "Yeni & Özel",
        },
        {
          name: "Subnet & CIDR IP Hesaplayıcı",
          desc: "IPv4 alt ağ maskesi, yayın adresi, kullanılabilir IP aralığı ve ikili (binary) dönüşüm.",
          href: "/subnet-hesaplayici",
          icon: Calculator,
          color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40",
        },
      ],
    },
    {
      category: "Webmaster & Geliştirici Araçları",
      description: "SSL sertifikaları, HTTP başlıkları, güvenlik skorlaması ve şifreleme motorları.",
      tools: [
        {
          name: "SSL / TLS Sertifika Kontrolü",
          desc: "Sertifika geçerlilik süresi, kalan gün sayısı, veren otorite ve TLS sürümü denetimi.",
          href: "/ssl-kontrolu",
          icon: Lock,
          color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40",
        },
        {
          name: "HTTP Headers & Güvenlik Skoru",
          desc: "HSTS, CSP, X-Frame-Options başlıklarını denetleyip sitenize güvenlik notu verin.",
          href: "/header-kontrolu",
          icon: FileCode2,
          color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40",
        },
        {
          name: "SHA-256 & Güçlü Şifre Üretici",
          desc: "Anında SHA-256 hash hesaplama, Base64 dönüştürme ve kırılmaz parola oluşturucu.",
          href: "/hash-olusturucu",
          icon: KeyRound,
          color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40",
        },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 mb-3">
          <Layers className="w-3.5 h-3.5" />
          Eksiksiz Ağ ve Webmaster Araç Kutusu
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Tüm Çevrimiçi Ağ Araçları
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
          Webmasterlar, sistem yöneticileri ve yazılımcılar için hazırlanmış yüksek hızlı, ücretsiz ve güvenli analiz araçları seti.
        </p>
      </div>

      {/* Categories Loop */}
      <div className="space-y-12 max-w-6xl mx-auto">
        {toolCategories.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {cat.category}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.tools.map((tool, tIdx) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tIdx}
                    href={tool.href}
                    className="group relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className={`p-2.5 rounded-xl ${tool.color} shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {tool.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                            {tool.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <span>Aracı Aç</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <AdPlaceholder slotId="all-tools-mid-banner" format="leaderboard" />
    </div>
  );
}
