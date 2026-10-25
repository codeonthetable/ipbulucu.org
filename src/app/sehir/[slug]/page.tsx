import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Building, Globe, Shield, Wifi, ArrowLeft } from "lucide-react";
import { CITIES_DATA } from "@/lib/seo-data";
import IpMap from "@/components/IpMap";
import InteractiveIpFinder from "@/components/InteractiveIpFinder";
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
    title: `${city.name} IP Konum Sorgulama ve Doğruluk Sınırları | IPBulucu.org`,
    description: `${city.name} için genel IP konum bilgisi nasıl yorumlanır? Yaklaşık şehir konumu, farklı il görünmesi ve IP sorgusunun sınırları.`,
    keywords: [
      `${city.name.toLowerCase()} ip adresleri`,
      `${city.name.toLowerCase()} ip sorgulama`,
      `${city.name.toLowerCase()} internet sağlayıcıları`,
      `${city.name.toLowerCase()} ip bloğu`,
    ],
    alternates: {
      canonical: `https://ipbulucu.org/sehir/${city.slug}/`,
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
      answer: `IP konum veritabanları yaklaşık bir bölge tahmin eder. Mobil ağ, VPN, operatör çıkışı veya güncel olmayan kayıt nedeniyle ${city.name} dışında bir şehir gösterilebilir. Bu sonuç fiziksel adresinizi belirlemez.`,
    },
    {
      question: `${city.name} konumu bir IP adresinden kesin bulunabilir mi?`,
      answer: "Hayır. Bir IP sorgusu kişi, ev veya santral konumunu kesinleştirmez. Şehir haritası yalnız coğrafi bağlam sağlar; abone veya operatör altyapısı haritası değildir.",
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
          {city.name} IP Konum Bilgisi Nasıl Yorumlanır?
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mt-3 leading-relaxed">
          {city.name} için IP sorgusunda görülen şehir adı yaklaşık bir veri sağlayıcı tahminidir. Genel IP bilgisini sorgulayabilir ve aşağıdaki şehir haritasıyla coğrafi bağlamı karşılaştırabilirsiniz.
        </p>
      </div>

      {/* Live Interactive IP Finder for this City */}
      <InteractiveIpFinder
        defaultTitle={`${city.name} için Genel IP Konum Sorgusu`}
        placeholder="Genel IP adresi veya alan adı girin"
        buttonLabel="IP Konumunu Sorgula"
      />

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <h2 className="text-xl font-bold">Sonucu nasıl kontrol edebilirsiniz?</h2>
        <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <li>Wi-Fi ve mobil bağlantıda görülen genel IP ve şehir bilgilerini karşılaştırın. Bağlantı değişikliği farklı bir ağ çıkışı kullanabilir.</li>
          <li>VPN veya kurumsal ağ kullanıyorsanız gösterilen konumun çıkış ağına ait olabileceğini değerlendirin. Şehir adından kişinin yaşadığı yeri çıkarmayın.</li>
          <li>Hatalı görünen kaydı sorgu sonucunda adı belirtilen veri sağlayıcıya bildirin. Bir şehre kesin tahsisli IP blokları veya adres bazında altyapı kapsamı bu sayfadan doğrulanamaz.</li>
        </ol>
        <p className="text-sm">IP konumlandırmasının genel sınırları için <a className="text-blue-600 underline" href="https://www.maxmind.com/en/geoip/ip-geolocation-accuracy">MaxMind’in doğruluk açıklamasını</a> inceleyebilirsiniz. Bu kaynak, sitemizdeki sonuçların MaxMind verisi kullandığı anlamına gelmez; her sorgunun kendi kaynak etiketi esas alınır.</p>
        <Link href="/ip-ile-konum-bulma-nasil-yapilir/" className="inline-block text-blue-600 underline">IP ile konum bulma rehberi →</Link>
      </section>
      <p className="text-sm text-gray-500">Aşağıdaki harita {city.name} şehir bölgesini gösterir; sorgulanan IP’nin veya bir kişinin konumu değildir.</p>

      {/* Map for the City */}
      <IpMap
        lat={city.lat}
        lng={city.lng}
        city={city.name}
        country="Türkiye"
        mode="region"
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
