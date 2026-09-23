"use client";

import { useState, useEffect } from "react";
import IpHeroCard from "@/components/IpHeroCard";
import IpOwnershipDossier from "@/components/IpOwnershipDossier";
import EnterpriseIpIntelligence from "@/components/EnterpriseIpIntelligence";
import ClientSideFingerprintFusion from "@/components/ClientSideFingerprintFusion";
import ScamHunterCard from "@/components/ScamHunterCard";
import TurkeyTelecomDpiAnalyzer from "@/components/TurkeyTelecomDpiAnalyzer";
import GameRouteOptimizer from "@/components/GameRouteOptimizer";
import GeoDetailsGrid from "@/components/GeoDetailsGrid";
import IpMap from "@/components/IpMap";
import BgpRoutingCard from "@/components/BgpRoutingCard";
import GlobalLatencyRadar from "@/components/GlobalLatencyRadar";
import DnsLeakAndCgnatCard from "@/components/DnsLeakAndCgnatCard";
import IpFormatConverter from "@/components/IpFormatConverter";
import SeoContentSection from "@/components/SeoContentSection";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";
import { IpGeoData } from "@/lib/types";

interface HomePageClientProps {
  initialData: IpGeoData;
  faqs: { question: string; answer: string }[];
}

export default function HomePageClient({
  initialData,
  faqs,
}: HomePageClientProps) {
  const [data, setData] = useState<IpGeoData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchRealClientIp = async () => {
      try {
        const res = await fetch("/api/ip?format=json");
        if (res.ok) {
          const json = await res.json();
          if (json?.ip) {
            setData(json);
            return;
          }
        }
      } catch {
        // Fallback to client ipify
      }

      try {
        const fallbackRes = await fetch("https://api.ipify.org?format=json", {
          signal: AbortSignal.timeout(3000),
        });
        if (fallbackRes.ok) {
          const json = await fallbackRes.json();
          if (json?.ip) {
            handleSearch(json.ip);
          }
        }
      } catch {
        // Keep initialData
      }
    };

    fetchRealClientIp();
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/ip?ip=${encodeURIComponent(query)}&format=json`);
      if (!res.ok) throw new Error("IP sorgusu gerçekleştirilemedi.");
      const result = await res.json();
      setData(result);
    } catch {
      setErrorMessage("Belirtilen IP veya alan adı çözümlenemedi. Lütfen geçerli bir adres girin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Hero IP Card */}
      <IpHeroCard
        initialData={data}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm text-center font-medium shadow-sm">
          {errorMessage}
        </div>
      )}

      {/* 2. SADE & NET: BU IP KİME VE NEREYE AİT? (Kullanıcı Odaklı Kimlik Raporu) */}
      <IpOwnershipDossier data={data} />

      {/* 2.2 TARAYICI & AĞ ÇAPRAZ PARMAK İZİ FÜZYONU (Özel İstemci Doğrulama) */}
      <ClientSideFingerprintFusion geo={data} />

      {/* 2.5 ÜCRETLİ SERVİS SEVİYESİNDE KURUMSAL İSTİHBARAT (Hat, Hız, Plaka, Telekom & Siber Güvenlik) */}
      <EnterpriseIpIntelligence geo={data} />

      {/* 2.8 DOLANDIRICI & SAHTE PROFİL AVCISI + RESMİ SAVCILIK DELİL RAPORU */}
      <ScamHunterCard geo={data} />

      {/* 3. Canlı Harita (Nokta Atışı İl / İlçe Konumu) */}
      <IpMap
        lat={data.latitude}
        lng={data.longitude}
        city={data.city}
        country={data.country}
        ip={data.ip}
      />

      {/* 3.5 TÜRKİYE SANTRAL (DSLAM), CGNAT & SANSÜR/DPI ANALİZİ */}
      <TurkeyTelecomDpiAnalyzer geo={data} />

      {/* 3.8 OYUN ROTA DARBOĞAZI & PİNG OPTİMİZASYON MOTORU */}
      <GameRouteOptimizer geo={data} />

      {/* Zero CLS Ad Placement #1 */}
      <AdPlaceholder slotId="home-top-banner" format="leaderboard" />

      {/* 4. Ayrıntılı Ağ & Cihaz Analiz Kartları */}
      <GeoDetailsGrid data={data} />

      {/* 5. CGNAT Port Yönlendirme Teşhisi & IPv6 Uyumluluğu */}
      <DnsLeakAndCgnatCard data={data} />

      {/* 6. Küresel Gecikme Radarı & Online Oyun Ping Matrisi */}
      <GlobalLatencyRadar data={data} />

      {/* 7. Derin BGP & Omurga Operatör Kartı */}
      <BgpRoutingCard data={data} />

      {/* 8. Gelişmiş Matematiksel IP Format Dönüştürücü */}
      <IpFormatConverter data={data} />

      {/* Zero CLS Ad Placement #2 */}
      <AdPlaceholder slotId="home-mid-banner" format="leaderboard" />

      {/* 9. SEO Zengin Rehber İçeriği */}
      <SeoContentSection />

      {/* 10. FAQ Accordion with FAQPage Schema */}
      <FaqAccordion
        faqs={faqs}
        title="IP Sahipliği ve Konum Sorgulama Hakkında SSS"
        subtitle="En çok merak edilen pratik sorular ve yanıtları"
      />
    </div>
  );
}
