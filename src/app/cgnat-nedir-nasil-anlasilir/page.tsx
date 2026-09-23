import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldAlert,
  Router,
  Gamepad2,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Zap,
  Lock,
  ArrowRight,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata: Metadata = {
  title: "CGNAT Nedir? IP Adresimin CGNAT Olduğu Nasıl Anlaşılır? (2026 Testi)",
  description:
    "CGNAT havuzunda mısınız? Port açma, online oyunlarda NAT Type ve kamera erişimi için CGNAT tespiti, modem IP karşılaştırması ve kurtulma yolları.",
  alternates: {
    canonical: "https://ipbulucu.org/cgnat-nedir-nasil-anlasilir",
  },
};

const CGNAT_FAQS = [
  {
    question: "CGNAT (Carrier-Grade NAT) nedir ve neden uygulanır?",
    answer:
      "CGNAT, internet servis sağlayıcılarının (Türk Telekom, Superonline, TurkNet vb.) dünyada tükenen genel IPv4 adreslerini tek bir genel IP üzerinden yüzlerce farklı aboneye paylaştırması teknolojisidir.",
  },
  {
    question: "Modem IP'si ile sitedeki IP neden farklı çıkar?",
    answer:
      "Modem arayüzünüzdeki WAN IP'niz 100.64.0.0 - 100.127.255.255 aralığındayken (RFC 6598), ipbulucu.org üzerinde gördüğünüz IP farklıysa, kesin olarak CGNAT havuzundasınız demektir.",
  },
  {
    question: "CGNAT havuzundan nasıl çıkılır?",
    answer:
      "CGNAT'tan çıkmanın en garantili yolu servis sağlayıcınızdan Statik IP hizmeti kiralamak veya operatörünüzün IPv6 desteğini aktif etmektir.",
  },
];

export default function CgnatGuidePage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Article Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Router className="w-3.5 h-3.5" />
          <span>Ağ Güvenliği & Port Teşhis Rehberi</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          CGNAT Nedir? IP Adresinizin CGNAT Olduğu Nasıl Anlaşılır?
        </h1>
        <p className="text-base md:text-lg text-slate-300 leading-relaxed">
          Online oyunlarda NAT Type hataları (Strict/Type 3), port yönlendirme (Port Forwarding) sorunları ve IP kamera erişim engellerinin temel sebebi olan CGNAT havuzu hakkında bilmeniz gereken her şey.
        </p>
      </div>

      {/* Featured Snippet Definition Box (Google Sıfırıncı Sıra İçin Özel Tasarım) */}
      <div className="rounded-2xl border-2 border-indigo-500/40 bg-slate-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-black text-indigo-400 uppercase tracking-wider">Özet Tanım (Doğrudan Cevap)</div>
            <p className="text-sm md:text-base text-white font-medium leading-relaxed">
              <b>CGNAT (Carrier-Grade Network Address Translation);</b> servis sağlayıcıların IPv4 yetersizliği nedeniyle tek bir genel IP adresini mahallenizdeki yüzlerce farklı aboneye ortak kullandırmasıdır. CGNAT havuzundaki kullanıcılara dışarıdan doğrudan port açılamaz.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step CGNAT Test */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white">CGNAT Testi: 2 Adımda Nasıl Anlaşılır?</h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">1</span>
              <span>Dış Genel IP Adresinizi Öğrenin</span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 pl-8">
              <Link href="/" className="text-cyan-400 font-semibold hover:underline">ipbulucu.org ana sayfasından</Link> gördüğünüz IP adresinizi bir kenara not edin (Örn: 81.213.153.20).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">2</span>
              <span>Modem Arayüzündeki WAN IP ile Karşılaştırın</span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 pl-8">
              Tarayıcınızdan modem arayüzüne (192.168.1.1) girin ve <b>WAN / Durum</b> sekmesindeki IP&#39;ye bakın. Eğer modemdeki IP <b>100.64.x.x - 100.127.x.x</b> ile başlıyorsa veya sitedeki IP ile uyuşmuyorsa, hattınız <b>CGNAT</b> havuzundadır.
            </p>
          </div>
        </div>
      </div>

      <AdPlaceholder slotId="cgnat-mid" format="leaderboard" />

      {/* Impact Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl border border-rose-500/20 bg-slate-900/60 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>CGNAT&#39;ın Olumsuz Etkileri</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li>• Port Yönlendirme (Port Forwarding) çalışmaz.</li>
            <li>• PlayStation / Xbox NAT Type Strict (Tip 3) olur.</li>
            <li>• Evdeki kamera, NAS ve sunucuya uzaktan erişilemez.</li>
            <li>• IP havuzundaki başka biri banlandığında siz de etkilenebilirsiniz.</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl border border-emerald-500/20 bg-slate-900/60 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>CGNAT Çözüm Yolları</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li>• <b>Statik IP Almak:</b> Kesin çözümdür (Aylık cüzi bir ücreti vardır).</li>
            <li>• <b>IPv6 Kullanmak:</b> Doğrudan uçtan uca tekil IP sağlar.</li>
            <li>• <b>Tailscale / ZeroTier:</b> Port açmadan güvenli tünel kurmanızı sağlar.</li>
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <FaqAccordion faqs={CGNAT_FAQS} title="CGNAT Hakkında Sıkça Sorulan Sorular" />
    </div>
  );
}
