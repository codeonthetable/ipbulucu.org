import type { Metadata } from "next";
import Link from "next/link";
import AdPlaceholder from "@/components/AdPlaceholder";
import FaqAccordion from "@/components/FaqAccordion";
import PublicIpLookup from "@/components/PublicIpLookup";

const title = "IP adresinden konum nasıl bulunur?";
const description =
  "Bir IP adresinin yaklaşık ülke ve şehir bilgisini sorgulayın. Harita neden farklı bir şehri gösterebilir ve sonuçta hangi bilgileri kontrol edebilirsiniz?";
const url = "https://ipbulucu.org/ip-ile-konum-bulma-nasil-yapilir/";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, locale: "tr_TR", type: "article" },
  twitter: { card: "summary", title, description },
};

const questions = [
  {
    question: "IP adresinden ev adresi bulunur mu?",
    answer:
      "Bu sorgu bir ağ adresini coğrafi veri tabanında arar. Sokak, kapı numarası, abonenin adı veya telefonun GPS konumu sonuçta yer almaz.",
  },
  {
    question: "VPN açınca haritada neden başka bir ülke görünüyor?",
    answer:
      "Sorgulanan genel IP, VPN üzerinden internete çıktığınızda VPN hizmetine ait olabilir. Ülke ve şehir alanları bu çıkış adresine ilişkin tahmini gösterir.",
  },
  {
    question: "Neden şehir veya harita görünmüyor?",
    answer:
      "Bir IP için ülke bilgisi varken şehir veya koordinat bulunmayabilir. Konum servisi de geçici olarak yanıt vermeyebilir. Geçerli koordinat gelmediğinde araç haritada nokta göstermez.",
  },
];

export default function IpLocationGuidePage() {
  return (
    <article className="space-y-10 max-w-4xl mx-auto">
      <header className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-base md:text-lg leading-relaxed">
          Genel IP adresini aşağıya girin. Araç, ipwho.is kaydındaki ülkeyi, varsa şehri ve
          yaklaşık koordinatları gösterir. Haritadaki nokta bir evin, telefonun veya baz
          istasyonunun yerini belirlemez.
        </p>
      </header>
      <PublicIpLookup
        searchFirst
        title="IP adresinin yaklaşık konumunu sorgula"
        placeholder="Genel IP adresi veya alan adı"
        buttonLabel="Konumu sorgula"
      />
      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Harita neden başka bir şehri gösteriyor?</h2>
        <p>
          Örneğin İzmir’de mobil veri kullanırken sorguda İstanbul görebilirsiniz.
          Mobil operatör aynı adres aralığını farklı illerdeki bağlantılar için
          kullanabilir. Şehir, veri sağlayıcısının o IP için tuttuğu tahmindir.
          Haritayı yakınlaştırmak bu tahminin hassasiyetini artırmaz.
        </p>
        <p>
          Kendi bağlantınızda karşılaştırmak için telefonunuz Wi-Fi’ye bağlıyken
          yukarıdaki <strong>IP adresim</strong> düğmesine dokunun. Wi-Fi’yi kapatıp
          mobil veriyle yeniden deneyin. Önce genel IP ile servis sağlayıcısını,
          sonra iki şehir sonucunu karşılaştırın. Aynı yerde dururken farklı şehirler
          görebilirsiniz.
        </p>
        <p>
          Bir alan adı girdiyseniz harita, sitenin bu sorguda çözülen sunucu veya
          CDN adresine aittir. Site sahibinin yaşadığı yeri buradan çıkaramazsınız.
        </p>
      </section>
      <AdPlaceholder slotId="location-mid" format="leaderboard" />
      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Sonucu nasıl doğrulayabilirim?</h2>
        <p>
          Önce sonuçtaki genel IP ve ağ sağlayıcısını kontrol edin.
          <Link className="underline" href="/ip-sorgulama/"> IP sorgulama aracında</Link> aynı
          adresin ağ bilgilerini inceleyebilirsiniz. ASN, adresi duyuran ağı tanımaya
          yardımcı olur. Şehir tahminini tek başına doğrulamaz.
        </p>
        <p>
          Kullandığımız alanların tanımları <a className="underline" href="https://ipwhois.io/documentation">ipwho.is API belgelerinde</a> yer alır.
          IP konumunun mobil bağlantı ve VPN kullanımına göre nasıl değiştiğini
          <a className="underline" href="https://support.maxmind.com/knowledge-base/articles/maxmind-geolocation-accuracy"> MaxMind’ın coğrafi doğruluk açıklamasında</a> da okuyabilirsiniz.
        </p>
        <p>
          Bir tehdit mesajı aldıysanız orijinal mesajı, tarihini ve bağlantısını saklayın.
          Bir IP haritası mesajı kimin gönderdiğini göstermez.
          <Link className="underline" href="/karsi-tarafin-ip-adresini-bulma/"> Mesajlaşmada IP ve gizlilik</Link> veya
          <Link className="underline" href="/ip-den-adres-bulma/"> IP ile adres sorgulamanın sınırları</Link> hakkında okuyabilirsiniz.
        </p>
      </section>
      <FaqAccordion items={questions} title="IP konumu hakkında sorular" subtitle="Ev adresi, VPN ve eksik konum sonuçları" />
    </article>
  );
}
