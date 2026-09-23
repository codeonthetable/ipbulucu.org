import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Server, Globe, Shield, ArrowLeft, Database } from "lucide-react";
import { ASNS_DATA } from "@/lib/seo-data";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { generateBreadcrumbSchema } from "@/lib/schemas";

interface AsnPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ASNS_DATA.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: AsnPageProps): Promise<Metadata> {
  const { slug } = await params;
  const asn = ASNS_DATA.find((item) => item.slug === slug);
  if (!asn) return { title: "ASN Bulunamadı - IP Bulucu" };

  return {
    title: `${asn.asn} (${asn.name}) Otonom Sistem & BGP Bilgileri | IPBulucu.org`,
    description: `${asn.asn} numaralı ${asn.org} otonom sistemine ait IP aralıkları, BGP anonsları, peering ve yönlendirme detayları.`,
    alternates: {
      canonical: `https://ipbulucu.org/asn/${asn.slug}`,
    },
  };
}

export default async function AsnPage({ params }: AsnPageProps) {
  const { slug } = await params;
  const asn = ASNS_DATA.find((item) => item.slug === slug);

  if (!asn) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Ana Sayfa", url: "/" },
    { name: "ASN Dizinleri", url: "/" },
    { name: `${asn.asn} (${asn.name})`, url: `/asn/${asn.slug}` },
  ];

  const asnFaqs = [
    {
      question: "ASN (Autonomous System Number) nedir?",
      answer: "ASN, internet üzerinde tek bir idari kuruluş (ISP, üniversite, teknoloji devi) tarafından kontrol edilen ve ortak bir BGP yönlendirme politikasına sahip IP ağlarını tanımlayan global benzersiz numaradır.",
    },
    {
      question: "BGP (Border Gateway Protocol) ile ASN ilişkisi nedir?",
      answer: "BGP, internet omurgasındaki farklı ASN'lerin birbirleri arasında hangi IP bloklarının nereden yönlendirileceğini anons ettiği ana yönlendirme protokolüdür.",
    },
  ];

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>
        <span>/</span>
        <span>ASN Dizinleri</span>
        <span>/</span>
        <span className="font-bold text-gray-900 dark:text-gray-100">{asn.asn}</span>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-purple-900/10 via-blue-900/5 to-transparent border border-purple-100 dark:border-purple-900/30 p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 mb-3">
          <Server className="w-3.5 h-3.5" />
          BGP Otonom Sistem: {asn.asn}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {asn.name}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mt-3 leading-relaxed">
          {asn.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase">Tahsisli IP Hacmi</span>
          <p className="text-2xl font-black text-gray-900 dark:text-white mt-1 font-mono">
            {asn.allocatedIps}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase">Kayıtlı Kuruluş</span>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            {asn.org}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase">Menşei Ülke</span>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            {asn.country}
          </p>
        </div>
      </div>

      <AdPlaceholder slotId={`asn-${asn.slug}-banner`} format="leaderboard" />

      <FaqAccordion
        faqs={asnFaqs}
        title={`${asn.asn} ve BGP Yönlendirme SSS`}
        subtitle="Otonom sistemler ve IP anonsları hakkında bilgiler"
      />
    </div>
  );
}
