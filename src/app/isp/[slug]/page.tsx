import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Building, Globe, Server, Zap, ArrowLeft, ShieldCheck } from "lucide-react";
import { ISPS_DATA } from "@/lib/seo-data";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { generateBreadcrumbSchema } from "@/lib/schemas";

interface IspPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ISPS_DATA.map((isp) => ({
    slug: isp.slug,
  }));
}

export async function generateMetadata({ params }: IspPageProps): Promise<Metadata> {
  const { slug } = await params;
  const isp = ISPS_DATA.find((item) => item.slug === slug);
  if (!isp) return { title: "Servis Sağlayıcı Bulunamadı - IP Bulucu" };

  return {
    title: `${isp.name} IP Blokları, DNS ve ASN (${isp.asn}) Bilgileri | IPBulucu.org`,
    description: `${isp.name} kullanıcıları için IP adresi sorgulama, resmi DNS sunucu adresleri (${isp.dnsServers.join(", ")}), otonom sistem ${isp.asn} detayları ve hız optimizasyonu.`,
    keywords: [
      `${isp.name.toLowerCase()} ip`,
      `${isp.name.toLowerCase()} dns sunucuları`,
      `${isp.name.toLowerCase()} asn`,
      `${isp.name.toLowerCase()} ip sorgulama`,
    ],
    alternates: {
      canonical: `https://ipbulucu.org/isp/${isp.slug}`,
    },
  };
}

export default async function IspPage({ params }: IspPageProps) {
  const { slug } = await params;
  const isp = ISPS_DATA.find((item) => item.slug === slug);

  if (!isp) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Ana Sayfa", url: "/" },
    { name: "İnternet Sağlayıcılar", url: "/" },
    { name: `${isp.name} (${isp.asn})`, url: `/isp/${isp.slug}` },
  ];

  const ispFaqs = [
    {
      question: `${isp.name} DNS sunucuları hangileridir?`,
      answer: `${isp.name} resmi DNS sunucuları şunlardır: ${isp.dnsServers.join(" ve ")}. Alternatif olarak Google DNS (8.8.8.8) veya Cloudflare DNS (1.1.1.1) kullanabilirsiniz.`,
    },
    {
      question: `${isp.name} üzerinden Statik IP nasıl alınır?`,
      answer: `${isp.name} müşteri hizmetleri veya online işlemler merkezi üzerinden aylık sabit bir ücret karşılığında dinamik IP havuzundan çıkıp adınıza tahsisli Statik IP tanımlatabilirsiniz.`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumbs Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>
        <span>/</span>
        <span>Sağlayıcılar</span>
        <span>/</span>
        <span className="font-bold text-gray-900 dark:text-gray-100">{isp.name}</span>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-transparent border border-blue-100 dark:border-blue-900/30 p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3">
          <Server className="w-3.5 h-3.5" />
          Otonom Sistem Numarası: {isp.asn}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {isp.name} IP Blokları & DNS Bilgileri
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mt-3 leading-relaxed">
          {isp.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold">
            <Server className="w-5 h-5" />
            <h3>Resmi DNS Sunucu IP Adresleri</h3>
          </div>
          <p className="text-xs text-gray-500">
            {isp.name} altyapısında en düşük çözümleme gecikmesi sağlayan varsayılan DNS adresleri:
          </p>
          <div className="space-y-2">
            {isp.dnsServers.map((dns, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 font-mono text-sm font-bold flex items-center justify-between">
                <span>{dns}</span>
                <span className="text-xs text-gray-400 font-normal">DNS #{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 font-bold">
            <Zap className="w-5 h-5" />
            <h3>Hız ve Bağlantı İpuçları</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {isp.speedTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AdPlaceholder slotId={`isp-${isp.slug}-banner`} format="leaderboard" />

      <FaqAccordion
        faqs={ispFaqs}
        title={`${isp.name} Hakkında SSS`}
        subtitle="IP, DNS ve modem ayarları hakkında bilgiler"
      />
    </div>
  );
}
