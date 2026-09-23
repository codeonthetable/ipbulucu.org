import { resolveIpDetails } from "@/lib/geo";
import HomePageClient from "./HomePageClient";
import { HOME_FAQS } from "@/lib/seo-data";

export default async function HomePage() {
  const initialGeoData = await resolveIpDetails("81.213.153.20");
  return <HomePageClient initialData={initialGeoData} faqs={HOME_FAQS} />;
}

