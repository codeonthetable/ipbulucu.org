import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Building, Globe, Shield, Wifi, ArrowLeft } from "lucide-react";
import { CITIES_DATA } from "@/lib/seo-data";
import IpMap from "@/components/IpMap";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { generateBreadcrumbSchema } from "@/lib/schemas";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CITIES_DATA.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = CITIES_DATA.find((c) => c.slug === slug);
  if (!city) return { title: "Şehir Bulunamadı - IP Bulucu" };

  return {
    title: `${city.name} IP Adresleri & Konum Sorgulama (${city.plate}) | IPBulucu.org`,
    description: `${city.name} iline ait IPv4/IPv6 IP adres blokları, Türk Telekom, Superonline, TurkNet altyapı bilgileri, harita ve coğrafi IP çözümleme rehberi.`,
    keywords: [
      `${city.name.toLowerCase()} ip adresleri`,
      `${city.name.toLowerCase()} ip sorgulama`,
      `${city.name.toLowerCase()} internet sağlayıcıları`,
      `${city.name.toLowerCase()} ip bloğu`,
    ],
    alternates: {
      canonical: `https://ipbulucu.org/sehir/${city.slug}`,
    },
    other: {
      "geo.region": "TR-" + city.plate,
      "geo.placename": city.name,
      "geo.position": `${city.lat};${city.lng}`,
      "ICBM": `${city.lat}, ${city.lng}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = CITIES_DATA.find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Şehir IP Dizinleri", url: "/" },
    { name: `${city.name} IP Adresleri`, url: `/sehir/${city.slug}` },
  ];

  const cityFaqs = [
    {
      question: `${city.name} bölgesinde IP adresim neden farklı bir ilde görünebilir?`,
      answer: `İnternet servis sağlayıcıları (ISP) dinamik IP havuzlarını bölgesel santraller arasında dağıtır. ${city.name} ilinde olsanız dahi operatörünüzün yönlendiricisi (BGP gateway) bazen İstanbul veya Ankara ana omurgası üzerinden çıkış yapabilir.`,
    },
    {
      question: `${city.name} ilinde en hızlı internet servis sağlayıcıları hangileridir?`,
      answer: `${city.name} genelinde ${city.popularIsps.join(", ")} gibi popüler sağlayıcılar hizmet vermektedir. Fiber (FTTH) ve GigaFiber altyapıları en düşük ping ve en yüksek kararlılığı sağlar.`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* Navigation Top */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>
        <span>/</span>
        <span>Şehirler</span>
        <span>/</span>
        <span className="font-bold text-gray-900 dark:text-gray-100">{city.name}</span>
      </div>

      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-transparent border border-blue-100 dark:border-blue-900/30 p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          {city.region} Bölgesi • Plaka Kodu: {city.plate}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {city.name} IP Adresleri & Konum Rehberi
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mt-3 leading-relaxed">
          {city.description}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 text-blue-600 font-bold mb-3">
            <Building className="w-5 h-5" />
            <h3>Aktif Servis Sağlayıcılar</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {city.popularIsps.map((isp, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium rounded-lg">
                {isp}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-3">
            <Globe className="w-5 h-5" />
            <h3>Örnek IP Blokları</h3>
          </div>
          <div className="space-y-1 font-mono text-xs text-gray-700 dark:text-gray-300">
            {city.ipRangesSample.map((range, i) => (
              <div key={i} className="p-1.5 bg-gray-50 dark:bg-gray-800 rounded">
                {range}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 text-purple-600 font-bold mb-3">
            <MapPin className="w-5 h-5" />
            <h3>Coğrafi Bilgiler</h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Enlem / Boylam: <strong className="font-mono text-gray-900 dark:text-white">{city.lat}, {city.lng}</strong>
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Bölge: <strong className="text-gray-900 dark:text-white">{city.region}</strong>
          </p>
        </div>
      </div>

      {/* Map for the City */}
      <IpMap
        lat={city.lat}
        lng={city.lng}
        city={city.name}
        country="Türkiye"
        ip={`${city.name} Bölgesel IP Havuzu`}
      />

      <AdPlaceholder slotId={`city-${city.slug}-banner`} format="leaderboard" />

      {/* City Specific FAQs */}
      <FaqAccordion
        faqs={cityFaqs}
        title={`${city.name} IP ve İnternet Bağlantısı SSS`}
        subtitle={`${city.name} ili ağ parametreleri hakkında sık sorulanlar`}
      />
    </div>
  );
}
