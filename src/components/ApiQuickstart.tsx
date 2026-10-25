"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { apiExamples, ApiExample } from "@/lib/api-examples";
import { usageEvent } from "@/lib/usage";

export default function ApiQuickstart({ language }: { language: "tr" | "en" }) {
  const en = language === "en";
  const [active, setActive] = useState<ApiExample>("nodejs");
  const [copyState, setCopyState] = useState<Partial<Record<ApiExample, "copied" | "failed">>>({});
  async function copy(example: ApiExample) {
    try {
      await navigator.clipboard.writeText(apiExamples[example]);
      setCopyState(state => ({ ...state, [example]: "copied" }));
      usageEvent("api_example_copy", { tool_name: "api-docs", example, language, interaction: "user" });
    } catch { setCopyState(state => ({ ...state, [example]: "failed" })); }
  }
  return <section id="quickstart" className="scroll-mt-24 rounded-3xl border border-gray-200 dark:border-gray-800 p-5 sm:p-8 space-y-5">
    <h2 className="text-xl font-bold">{en ? "Start with one request" : "Tek istekle başlayın"}</h2>
    <p className="text-sm text-gray-600 dark:text-gray-300">{en ? "These direct REST examples run independently of the npm and PyPI SDKs. They set timeouts, reject HTTP errors and keep incomplete location results distinct. Copying does not send an API request." : "Bu doğrudan REST örnekleri npm ve PyPI SDK’larından bağımsız çalışır. Zaman aşımı uygular, HTTP hatalarını denetler ve eksik konum sonucunu ayırır. Kopyalama API isteği göndermez."}</p>
    <div className="flex flex-wrap gap-2" aria-label={en ? "Example language" : "Örnek dili"}>
      {(["nodejs", "python", "curl"] as const).map(key => <button key={key} type="button" aria-pressed={active === key} onClick={() => setActive(key)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${active === key ? "bg-blue-700 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>{key === "nodejs" ? "Node.js 18+" : key === "python" ? "Python / requests" : "cURL"}</button>)}
    </div>
    {(Object.keys(apiExamples) as ApiExample[]).map(key => <div key={key} hidden={active !== key}>
      <div className="flex justify-end mb-3">
        <button type="button" onClick={() => copy(key)} className="flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-sm font-semibold">
          {copyState[key] === "copied" ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
          {copyState[key] === "copied" ? (en ? "Copied" : "Kopyalandı") : (en ? "Copy example" : "Örneği kopyala")}
        </button>
      </div>
      <pre className="rounded-2xl bg-gray-950 text-emerald-300 p-4 sm:p-5 overflow-x-auto text-xs leading-relaxed" tabIndex={0}><code>{apiExamples[key]}</code></pre>
      {copyState[key] === "failed" && <p role="status" className="mt-3 text-sm">{en ? "Clipboard unavailable. Select the code above and copy it manually." : "Panoya erişilemedi. Yukarıdaki kodu seçerek kopyalayabilirsiniz."}</p>}
    </div>)}
  </section>;
}
