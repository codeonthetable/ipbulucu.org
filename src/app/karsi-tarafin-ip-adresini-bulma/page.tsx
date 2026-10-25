import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Search,
  AlertTriangle,
  HelpCircle,
  MessageCircle,
  FileWarning,
  Eye,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import InteractiveIpFinder from "@/components/InteractiveIpFinder";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { generateBreadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Karşı Tarafın IP Adresini Bulma - Instagram, WhatsApp, Discord IP Tespiti",
  description:
    "Karşı tarafın IP adresi nasıl bulunur? Instagram, WhatsApp, Discord ve Telegram mesajlarından IP tespit edilir mi? Teknik gerçekler, yasal sınırlar ve siber güvenlik rehberi.",
  keywords: [
    "karşı tarafın ip adresini bulma",
    "instagram ip bulma",
    "instagramdan ip adresi bulma",
    "whatsapp ip bulma",
    "discord ip bulma",
    "mesaj atan kişinin ip adresini bulma",
    "ip bulucu link",
    "karşı tarafın ip si nasıl bulunur",
    "ip kapma linki",
  ],
  alternates: {
    canonical: "https://ipbulucu.org/karsi-tarafin-ip-adresini-bulma",
  },
  openGraph: {
    title: "Karşı Tarafın IP Adresi Nasıl Bulunur? (Sosyal Medya IP Tespiti)",
    description:
      "Instagram, Discord veya WhatsApp üzerinden karşı tarafın IP adresini bulmak mümkün mü? 'IP'ni buldum' tehditleri gerçek mi? Tüm detaylar.",
    url: "https://ipbulucu.org/karsi-tarafin-ip-adresini-bulma",
    siteName: "IPBulucu.org",
    locale: "tr_TR",
    type: "article",
  },
};

const FAQS = [
  {
    question: "Instagram'dan mesaj atan birinin IP adresi doğrudan bulunabilir mi?",
    answer:
      "Hayır. Instagram ve Facebook (Meta) sunucu-istemci mimarisi kullanır. Karşı tarafla mesajlaştığınızda veri paketleri doğrudan iki telefon arasında değil, Meta'nın Amerika ve Avrupa veri merkezleri üzerinden akar. Bu nedenle üçüncü şahıslar yazışma üzerinden doğrudan IP adresinizi göremez.",
  },
  {
    question: "Biri bana 'IP adresini buldum, evini biliyorum' dedi, korkmalı mıyım?",
    answer:
      "Kesinlikle hayır. Bu durum %99.9 oranında siber zorbalık ve korkutma (blöf) amaçlıdır. Birisi IP adresinizi ele geçirmiş olsa dahi, halka açık hiçbir sistem o IP'den sizin adınızı veya evinizi bulamaz. Yalnızca şehrinizi veya servis sağlayıcınızı (Türk Telekom vb.) görebilir.",
  },
  {
    question: "WhatsApp veya Telegram üzerinden IP adresi sızar mı?",
    answer:
      "WhatsApp ve Telegram'da yazışırken IP adresiniz karşı tarafa iletilmez. Ancak WhatsApp veya Telegram üzerinden yapılan birebir sesli/görüntülü aramalarda (P2P bağlantı açıksa) IP sızıntısı teorik olarak mümkündür. WhatsApp Ayarlar > Gizlilik > Gelişmiş menüsünden 'Aramalarda IP Adresini Koru' seçeneğini açarak bunu tamamen engelleyebilirsiniz.",
  },
  {
    question: "Discord üzerinden birinin IP adresi bulunabilir mi?",
    answer:
      "Hayır. Discord tüm ses, metin ve video trafiğini kendi özel sunucuları (voice gateway) üzerinden yönlendirir. Karşı taraf Discord uygulamasının içinden sizin IP adresinizi kesinlikle göremez. Yalnızca harici bir bağlantıya (linke) tıklatırlarsa harici web sunucusunun loglarından IP tespit edilebilir.",
  },
  {
    question: "Sosyal medyada bana hakaret veya şantaj yapıldı, IP nasıl tespit edilir?",
    answer:
      "Hakaret, tehdit veya dolandırıcılık gibi suçlarda doğrudan Cumhuriyet Savcılığı'na başvurmalısınız. Savcılık, ilgili platformdan (Meta, Google, X vb.) şüphelinin giriş yaptığı IP adreslerini ve port numaralarını talep eder, ardından Türk telekom operatörlerinden bu IP'nin kime ait olduğunu yasal olarak ortaya çıkarır.",
  },
];

const BREADCRUMBS = [
  { name: "Anasayfa", url: "/" },
  { name: "Karşı Tarafın IP Adresini Bulma", url: "/karsi-tarafin-ip-adresini-bulma" },
];

export default function OpponentIpGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const breadcrumbSchema = generateBreadcrumbSchema(BREADCRUMBS);

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb visual */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-cyan-500 transition-colors">
          Anasayfa
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">Karşı Tarafın IP&#39;sini Bulma</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
          <Users className="w-3.5 h-3.5" />
          <span>Siber Güvenlik & Farkındalık Rehberi</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Karşı Tarafın IP Adresini Bulma: Instagram, WhatsApp ve Discord Gerçekleri
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
          Sosyal medyadan ya da oyunlardan mesaj atan kişinin IP adresi nasıl bulunur? &#34;IP&#39;ni buldum&#34; diyen kişiler gerçekten adresinizi görebilir mi? Teknik ve yasal tüm detaylar.
        </p>
      </div>

      {/* Live Tool */}
      <InteractiveIpFinder
        defaultTitle="Elinizdeki Şüpheli IP Adresini Canlı Çözümleyin"
        placeholder="Elinizde bir IP adresi varsa buraya yapıştırın..."
        buttonLabel="Şüpheli IP'yi Çözümle"
      />

      {/* Key Myth Buster Banner */}
      <div className="rounded-3xl border-2 border-cyan-500/40 bg-white dark:bg-slate-900/90 p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Önemli Güvenlik Gerçeği (Korkmanıza Gerek Yok)
            </span>
            <p className="text-sm md:text-base text-gray-900 dark:text-white font-medium leading-relaxed">
              Instagram, Discord veya WhatsApp&#39;tan mesajlaşırken <b>kimse doğrudan uygulamanın içinden IP adresinizi çekemez.</b> Eğer birisi size &#34;IP&#39;ni buldum, evine geleceğim&#34; diyorsa bu %99 ihtimalle sahte bir blöftür. Hatta IP adresinizi bilseler dahi, halka açık hiçbir araç ev veya daire numaranızı veremez.
            </p>
          </div>
        </div>
      </div>

      <AdPlaceholder slotId="opponent-guide-mid" format="leaderboard" />

      {/* Platform Platform Breakdown */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <MessageCircle className="w-6 h-6 text-blue-500" />
          <span>Platformlara Göre IP Tespiti Mümkün mü?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Instagram */}
          <div className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 space-y-3">
            <div className="text-lg font-bold text-rose-500 flex items-center justify-between">
              <span>Instagram & DM</span>
              <XCircle className="w-5 h-5 text-rose-500" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
              <b>Doğrudan IP Bulunamaz.</b> DM üzerinden mesajlaştığınızda veriler Meta&#39;nın şifreli sunucuları üzerinden geçer. Karşı taraf yalnızca harici bir tuzak linke (IP Logger) tıklatabilirse IP&#39;nizi görebilir.
            </p>
          </div>

          {/* Discord */}
          <div className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 space-y-3">
            <div className="text-lg font-bold text-indigo-400 flex items-center justify-between">
              <span>Discord</span>
              <XCircle className="w-5 h-5 text-rose-500" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
              <b>Doğrudan IP Bulunamaz.</b> Discord istemci-istemci (P2P) değil, merkezi sunucu kullanır. Ne ses odalarında ne de özel mesajlarda kullanıcıların IP adresi birbirine iletilmez.
            </p>
          </div>

          {/* WhatsApp */}
          <div className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 space-y-3">
            <div className="text-lg font-bold text-emerald-500 flex items-center justify-between">
              <span>WhatsApp</span>
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
              <b>Yazışmada Gizli, Aramada Dikkat.</b> Metin mesajlarında IP asla görünmez. Ancak sesli aramalarda P2P bağlantı kullanılırsa Wireshark gibi araçlarla tespit edilebilir. Ayarlardan &#34;Aramalarda IP&#39;yi Koru&#34; açılmalıdır.
            </p>
          </div>
        </div>
      </div>

      {/* IP Logger and Link Traps */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <FileWarning className="w-6 h-6 text-amber-400 shrink-0" />
          <h2 className="text-xl font-bold text-white">IP Logger (Tuzak Link) Nedir ve Nasıl Korunulur?</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          İnternette amatör kişilerin karşı tarafın IP adresini bulmak için başvurduğu en yaygın yöntem Grabify, IPLogger gibi sitelerden sahte kısaltılmış linkler (örneğin YouTube veya fotoğraf linki gibi görünen) göndermektir. Siz bu bağlantıya tıkladığınız anda o sunucu IP adresinizi, cihaz modelinizi ve tarayıcınızı kaydeder.
        </p>
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Nasıl Korunursunuz?</span>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li>Sosyal medyada tanımadığınız kişilerden gelen şüpheli kısaltılmış linklere (bit.ly, grabify vb.) asla tıklamayın.</li>
            <li>Bağlantıya tıklamadan önce bağlantı adresini kopyalayarak virustotal veya URL genişletici araçlarla kontrol edin.</li>
            <li>Halka açık Wi-Fi ağlarında veya şüpheli durumlarda güvenilir bir VPN kullanın.</li>
          </ul>
        </div>
      </div>

      {/* Legal Prosecution Section */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-400" />
          <span>Şantaj, Hakaret veya Tehdit Alanlar İçin Resmi Prosedür</span>
        </h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Eğer sahte bir hesap size şantaj yapıyor veya tehdit savuruyorsa, kendiniz hackerlık yapmaya veya IP kapmaya çalışmayın. <b>Türk Ceza Kanunu ve 5651 sayılı kanun gereği</b> bu suçlar Emniyet Siber Suçlar ve Savcılık kanalıyla çözülür. Şüpheli hesap kapansa dahi Instagram/Meta sunucularında son 1 yıla ait tüm IP giriş logları kayıtlıdır ve resmi müzekkere ile temin edilir.
        </p>
        <div className="pt-2">
          <Link
            href="/ip-den-adres-bulma"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <span>IP&#39;den Adres ve Konum Bulma Rehberini Oku</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <FaqAccordion items={FAQS} />
    </div>
  );
}
