"use client";

import Link from "next/link";
import { usageEvent } from "@/lib/usage";
import LookupNextSteps from "./LookupNextSteps";

const STORE_URL = "https://chromewebstore.google.com/detail/nifmmckmhnfjmpjfakhkifbeegdnanpb";

export default function ChromeExtensionGuide({ lang }: { lang: "tr" | "en" }) {
  const en = lang === "en";
  return <div className="max-w-5xl mx-auto space-y-8">
    <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-white dark:bg-slate-900 p-6 md:p-8 space-y-5">
      <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">{en ? "IP Bulucu for Chrome" : "Chrome için IP Bulucu"}</p>
      <h1 className="text-3xl md:text-4xl font-bold">{en ? "Check your IP, then get back to work" : "IP adresinizi kontrol edin, işinize dönün"}</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">{en ? "Keep IP Bulucu handy with its Chrome Web Store listing or a browser bookmark. Use the website for IP lookup, port checks, DNS records and mail blocklist checks." : "Chrome mağazasındaki IP Bulucu eklentisi veya bir yer imiyle siteye hızlıca ulaşın. IP sorgusu, port kontrolü, DNS kayıtları ve e-posta kara liste kontrolü için web araçlarını kullanın."}</p>
      <div className="flex flex-wrap gap-3">
        <a href={STORE_URL} target="_blank" rel="noopener noreferrer"
          onClick={() => usageEvent("extension_store_open", { language: lang, entry_point: "chrome_guide" })}
          className="rounded-xl bg-blue-700 text-white px-5 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
          {en ? "View in Chrome Web Store" : "Chrome Web Mağazası'nda incele"}<span className="sr-only">{en ? " (opens a new tab)" : " (yeni sekmede açılır)"}</span>
        </a>
        <Link href={en ? "/en/" : "/"} prefetch={false} className="rounded-xl border border-slate-300 dark:border-slate-600 px-5 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
          {en ? "Look up an IP without installing" : "Kurulum yapmadan IP sorgula"}
        </Link>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{en ? "Check the current version, publisher, permissions and privacy details on the store page before installing. Network checks on this website do not require the extension." : "Kurulumdan önce mağaza sayfasındaki güncel sürümü, yayıncıyı, izinleri ve gizlilik açıklamasını inceleyin. Sitedeki ağ araçlarını kullanmak için eklenti gerekmez."}</p>
    </section>
    <div className="grid md:grid-cols-2 gap-6">
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
        <h2 className="text-xl font-bold mb-4">{en ? "Install and pin in desktop Chrome" : "Masaüstü Chrome'da kurun ve sabitleyin"}</h2>
        <ol className="list-decimal pl-5 space-y-3 text-slate-700 dark:text-slate-300">
          <li>{en ? "Open the store listing above and review its details. If available, choose Add to Chrome and review the confirmation." : "Yukarıdaki mağaza kaydını açıp bilgilerini inceleyin. Kullanılabiliyorsa Chrome'a Ekle seçeneğini seçin ve onay ekranını okuyun."}</li>
          <li>{en ? "Open Chrome's Extensions menu beside the address bar and pin IP Bulucu." : "Adres çubuğunun yanındaki Uzantılar menüsünü açın ve IP Bulucu'yu sabitleyin."}</li>
          <li>{en ? "Use the pinned icon to open the extension. Continue on this website when you need a DNS, port or blocklist check." : "Eklentiyi sabitlenen simgeden açın. DNS, port veya kara liste kontrolü gerektiğinde web sitesindeki araçlarla devam edin."}</li>
        </ol>
      </section>
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 space-y-4">
        <h2 className="text-xl font-bold">{en ? "Prefer a bookmark?" : "Yer imiyle kullanmak ister misiniz?"}</h2>
        <p className="text-slate-700 dark:text-slate-300">{en ? "Open the IP lookup or your preferred tool, then press Ctrl+D on Windows/Linux or Command+D on Mac. Save it to the bookmarks bar for your next visit." : "IP sorgulama sayfasını veya sık kullandığınız aracı açın. Windows/Linux'ta Ctrl+D, Mac'te Command+D ile yer imlerine ekleyin. Sonraki ziyaret için yer imleri çubuğuna kaydedin."}</p>
        <p className="text-slate-700 dark:text-slate-300">{en ? "On mobile, use the browser's bookmark menu. If the store's install button is unavailable, all web tools remain accessible here." : "Telefonda tarayıcının yer imi menüsünü kullanın. Mağazadaki kurulum düğmesi kullanılamıyorsa web araçlarına buradan erişebilirsiniz."}</p>
      </section>
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-300"><a href="https://support.google.com/chrome_webstore/answer/2664769" className="underline underline-offset-4">{en ? "Chrome Help: install and manage extensions" : "Chrome Yardım: eklenti kurma ve yönetme"}</a></p>
    <LookupNextSteps lang={lang} showRetention={false} />
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
      <h2 className="text-xl font-bold">{en ? "What an IP result can tell you" : "IP sonucu neyi söyler?"}</h2>
      <p className="text-slate-700 dark:text-slate-300">{en ? "A public IP is the address seen by a service on the internet; it can differ from the local address in your device's settings. IP location is approximate. An IP result alone cannot confirm your street address, connection speed, VPN safety or CGNAT status." : "Genel IP, internetteki bir hizmetin gördüğü adrestir; cihaz ayarlarındaki yerel IP'den farklı olabilir. IP konumu yaklaşık bir tahmindir. IP sonucu tek başına ev adresini, bağlantı hızını, VPN güvenliğini veya CGNAT durumunu doğrulayamaz."}</p>
      <Link href={en ? "/en/privacy-policy/" : "/gizlilik-politikasi/"} className="inline-block py-2 text-blue-700 dark:text-blue-300 underline">{en ? "Read privacy information" : "Gizlilik açıklamasını okuyun"}</Link>
    </section>
  </div>;
}
