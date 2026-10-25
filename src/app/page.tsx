import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { HOME_FAQS } from "@/lib/seo-data";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://ipbulucu.org/",
    languages: { tr: "https://ipbulucu.org/", en: "https://ipbulucu.org/en/" },
  },
};

export default async function HomePage() {
  return <HomePageClient faqs={HOME_FAQS} />;
}

