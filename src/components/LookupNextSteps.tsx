"use client";

import Link from "next/link";
import { usageEvent } from "@/lib/usage";

export default function LookupNextSteps({ lang = "tr", showRetention = true }: { lang?: "tr" | "en"; showRetention?: boolean }) {
  const en = lang === "en";
  const tasks = en ? [
    { tool: "port", href: "/en/port-scanner/", title: "Is my port reachable?", detail: "Check a TCP port after setting up a game server, camera or remote connection." },
    { tool: "blacklist", href: "/en/blacklist-check/", title: "Is my sending IP blocklisted?", detail: "Check the mail server's sending IP. Unavailable lists remain unknown." },
    { tool: "dns", href: "/en/dns-lookup/", title: "Where does my domain point?", detail: "Inspect A, AAAA, MX and TXT records when a website or email stops working." },
  ] : [
    { tool: "port", href: "/port-kontrolu/", title: "Portum dışarıdan erişilebilir mi?", detail: "Oyun sunucusu, kamera veya uzak bağlantı kurduktan sonra TCP portunu kontrol edin." },
    { tool: "blacklist", href: "/karaliste-kontrolu/", title: "E-posta IP adresim kara listede mi?", detail: "Posta sunucusunun gönderim IP'sini kontrol edin. Erişilemeyen listeler bilinmiyor olarak kalır." },
    { tool: "dns", href: "/dns-sorgulama/", title: "Alan adım nereye yönleniyor?", detail: "Site veya e-posta çalışmıyorsa A, AAAA, MX ve TXT kayıtlarını inceleyin." },
  ];
  return <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 space-y-5">
    <div><h2 className="text-xl md:text-2xl font-bold">{en ? "What would you like to check next?" : "Şimdi neyi kontrol etmek istiyorsunuz?"}</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{en ? "Choose your task. Each tool explains the result and the next step." : "İhtiyacınıza uygun aracı seçin. Her araç sonucu ve sonraki adımı açıklar."}</p></div>
    <ul role="list" className="grid md:grid-cols-3 gap-3">
      {tasks.map(task => <li key={task.tool}><Link href={task.href} prefetch={false}
        onClick={() => usageEvent("tool_open", { tool_name: task.tool, language: lang, entry_point: "ip_next_steps" })}
        className="block h-full rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
        <span className="block font-bold text-blue-700 dark:text-blue-300">{task.title}</span>
        <span className="mt-2 block text-sm leading-relaxed text-slate-600 dark:text-slate-300">{task.detail}</span>
      </Link></li>)}
    </ul>
    {showRetention && <div className="border-t border-slate-200 dark:border-slate-700 pt-4 text-sm leading-relaxed">
      <Link href={en ? "/en/chrome-extension/" : "/chrome-eklentisi/"} prefetch={false}
        onClick={() => usageEvent("extension_help_open", { language: lang, entry_point: "ip_next_steps" })}
        className="inline-block py-2 font-semibold text-blue-700 dark:text-blue-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        {en ? "Keep IP Bulucu within reach in Chrome" : "IP Bulucu'yu Chrome'da elinizin altında tutun"}
      </Link>
      <p className="text-slate-600 dark:text-slate-300">{en ? "Extension setup, pinning and a bookmark option for your next check." : "Eklenti kurulumu, sabitleme ve bir sonraki kontrol için yer imi seçeneği."}</p>
    </div>}
  </section>;
}
