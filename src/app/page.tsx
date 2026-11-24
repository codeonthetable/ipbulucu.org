import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { HOME_FAQS } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "IP Adresim Nedir? Genel IP Adresimi Öğren | IP Bulucu",
  description: "İnternete hangi IP adresiyle bağlandığınızı görün ve tek dokunuşla kopyalayın. Bağlantınızın sağlayıcısını ve varsa yaklaşık konumunu öğrenin.",
  alternates: {
    canonical: "https://ipbulucu.org/",
    languages: { tr: "https://ipbulucu.org/", en: "https://ipbulucu.org/en/" },
  },
};

export default async function HomePage() {
  return <HomePageClient faqs={HOME_FAQS} />;
}

