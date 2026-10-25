"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { DiagnosticLanguage, DiagnosticSummary, summaryText } from "@/lib/diagnostic-summary";
import { usageEvent } from "@/lib/usage";

export default function DiagnosticResultSummary({ summary, language = "tr" }: { summary: DiagnosticSummary; language?: DiagnosticLanguage }) {
  const en = language === "en";
  const text = summaryText(summary, language);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  useEffect(() => { setCopyState("idle"); }, [text]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
      usageEvent("diagnostic_summary_copy", { tool_name: summary.tool, language, interaction: "user" });
    } catch { setCopyState("failed"); }
  }
  return <section className="max-w-3xl mx-auto rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 p-5 sm:p-7 space-y-4" aria-label={summary.title}>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{summary.title}</h2>
      <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-sm font-semibold">
        {copyState === "copied" ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
        {copyState === "copied" ? (en ? "Copied" : "Kopyalandı") : (en ? "Copy summary" : "Özeti kopyala")}
      </button>
    </div>
    <p className="text-xs text-gray-600 dark:text-gray-400">{en ? "IP addresses, domains and DNS record contents are omitted from this summary." : "Bu özet IP adresi, alan adı ve DNS kayıt içeriklerini içermez."}</p>
    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 dark:text-gray-200">{summary.findings.map((line, i) => <li key={i}>{line}</li>)}</ul>
    <h3 className="font-semibold text-gray-900 dark:text-white">{en ? "What to do next" : "Şimdi ne yapabilirsiniz?"}</h3>
    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">{summary.nextSteps.map((line, i) => <li key={i}>{line}</li>)}</ul>
    <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">{summary.limits}</p>
    {copyState === "failed" && <div role="status" className="space-y-2">
      <p className="text-sm">{en ? "Clipboard unavailable. Select and copy the summary below." : "Panoya erişilemedi. Aşağıdaki özeti seçerek kopyalayabilirsiniz."}</p>
      <textarea readOnly value={text} aria-label={en ? "Summary text" : "Özet metni"} rows={8} className="w-full rounded-xl border p-3 bg-white dark:bg-gray-900 text-sm"/>
    </div>}
  </section>;
}
