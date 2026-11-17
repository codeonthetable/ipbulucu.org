"use client";

import { useState } from "react";
import { usageEvent } from "@/lib/usage";

const results = {
  restored: { label: "Site açılmaya başladı", next: "Aynı bağlantıda birkaç farklı siteyi yeniden deneyin. Tek bir sayfanın açılması arızanın kesin olarak DNS kaynaklı olduğunu göstermez. Wi-Fi ve mobil veriyi ayrı değerlendirin." },
  unchanged: { label: "Sonuç değişmedi", next: "Önce eski DNS ayarına dönün. Sorun tek sitedeyse başka bir cihaz ve ağda karşılaştırın; bütün siteler aynı Wi-Fi ağındaki cihazlarda açılmıyorsa modem bağlantısını ve operatörün arıza durumunu kontrol edin." },
  disconnected: { label: "Bağlantı kesildi", next: "Yukarıdaki geri alma adımını uygulayın: önceki ayarınız Otomatik ise yeniden Otomatik seçin; elle girilmiş bir ayarsa not ettiğiniz değeri geri yükleyin. Wi-Fi ağınız giriş sayfası istiyorsa önce bu sayfadan bağlantıyı tamamlayın." },
} as const;

type Result = keyof typeof results;

export default function DnsSetupFeedback({ device }: { device: "android" | "ios" }) {
  const [selected, setSelected] = useState<Result | null>(null);
  function choose(result: Result) {
    if (selected === result) return;
    setSelected(result);
    // A self-report is not a verified tool result or a tool_success conversion.
    // No lookup value, network name, IP, or free-text answer is collected.
    usageEvent("dns_setup_feedback", {
      tool_name: "dns_setup", interaction: "user", language: "tr",
      device, outcome: `self_reported_${result}`,
    });
  }
  return <fieldset className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
    <legend className="px-1 font-semibold">{device === "android" ? "Android" : "iPhone / iPad"} denemesinden sonra ne oldu?</legend>
    <div className="flex flex-wrap gap-2">
      {(Object.keys(results) as Result[]).map(result => <button
        key={result} type="button" aria-pressed={selected === result}
        onClick={() => choose(result)}
        className="min-h-11 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 aria-pressed:bg-blue-100 dark:aria-pressed:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >{results[result].label}</button>)}
    </div>
    <p role="status" className="leading-relaxed">{selected ? results[selected].next : "Sonucunuzu seçerek sonraki kontrol adımını görün."}</p>
  </fieldset>;
}
