"use client";

import React, { useState } from "react";
import {
  Bell,
  Send,
  Webhook,
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Activity,
  Radio,
  Clock,
  CheckCircle2,
} from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";

export default function IpTakipPage() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");
  const [alertType, setAlertType] = useState<"both" | "ip_change" | "blacklist">("both");
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedLog, setSimulatedLog] = useState<string | null>(null);

  const handleGenerateTracker = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `tr_${Math.random().toString(36).substring(2, 10)}_${Date.now().toString(36)}`;
    setGeneratedToken(token);
  };

  const curlScript = generatedToken
    ? `curl -s -X POST "https://ipbulucu.org/api/watch/${generatedToken}"`
    : `curl -s -X POST "https://ipbulucu.org/api/watch/YOUR_TOKEN"`;

  const cronExample = `*/15 * * * * ${curlScript} >/dev/null 2>&1`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleSimulateAlert = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedLog(
        `[${new Date().toLocaleTimeString()}] 🚀 Bildirim Gönderildi: IP Değişimi Tespit Edildi! (Eski: 81.213.153.20 ➔ Yeni: 88.241.112.45 - Türk Telekom Kayseri / CGNAT Durumu: Temiz)`
      );
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Activity className="w-3.5 h-3.5" />
          <span>7/24 Otomatik IP & Güvenlik Nöbetçisi</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Canlı IP Değişim & Kara Liste Takipçisi
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
          Ev, ofis veya sunucu IP adresiniz değiştiğinde ya da IP&#39;niz bir spam kara listesine girdiğinde anında Telegram, Discord veya Webhook ile ücretsiz bildirim alın.
        </p>
      </div>

      {/* Main Configuration Card */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <form onSubmit={handleGenerateTracker} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Telegram Chat ID */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Telegram Bot Bildirimi (Opsiyonel):
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Örn: @ipbulucu_bot Chat ID"
                  value={telegramChatId}
                  onChange={(e) => setTelegramChatId(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <Send className="w-4 h-4 text-slate-500 absolute right-4 top-3.5" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Telegram&#39;dan anında uyarı almak için kullanıcı veya grup ID&#39;nizi girin.
              </p>
            </div>

            {/* Discord or Custom Webhook */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Discord / Slack / Özel Webhook URL:
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://discord.com/api/webhooks/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <Webhook className="w-4 h-4 text-slate-500 absolute right-4 top-3.5" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Sunucu veya kanal webhook linkinize JSON formatında anlık bildirim atılır.
              </p>
            </div>
          </div>

          {/* Alert Type Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Hangi Durumlarda Bildirim İstiyorsunuz?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "both", label: "IP Değişimi + Kara Liste (Önerilen)" },
                { id: "ip_change", label: "Sadece IP Adresi Değişince" },
                { id: "blacklist", label: "Sadece Kara Listeye Girince" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAlertType(opt.id as typeof alertType)}
                  className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all ${
                    alertType === opt.id
                      ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all active:scale-[0.99]"
          >
            Ücretsiz Takip Anahtarımı (Webhook Token) Oluştur
          </button>
        </form>

        {/* Generated Integration Box */}
        {generatedToken && (
          <div className="mt-8 pt-8 border-t border-slate-800 space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Takip Anahtarınız Başarıyla Üretildi: <b className="font-mono text-white">{generatedToken}</b></span>
            </div>

            {/* Cron & Script instructions */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>Modem, Sunucu veya Bilgisayarınıza Ekleyeceğiniz Komut (Cron / Bash):</span>
                <button
                  onClick={() => copyToClipboard(cronExample)}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px]"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedScript ? "Kopyalandı!" : "Kopyala"}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                <code>{cronExample}</code>
              </div>
              <p className="text-[11px] text-slate-500">
                Bu komutu Linux sunucunuzda <code className="text-slate-400">crontab -e</code> içine yapıştırarak her 15 dakikada bir otomatik IP kontrolü yaptırabilirsiniz.
              </p>
            </div>

            {/* Test Simulation Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button
                onClick={handleSimulateAlert}
                disabled={isSimulating}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{isSimulating ? "Bildirim Simüle Ediliyor..." : "Test Bildirimi Gönder (Simülasyon)"}</span>
              </button>
            </div>

            {simulatedLog && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                {simulatedLog}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ad Placement */}
      <AdPlaceholder slotId="ip-takip-bottom" format="leaderboard" />

      {/* Feature Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-3">
            <Radio className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Dinamik DNS (DDNS) Yerine</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Ücretli No-IP veya DynDNS servislerine para ödemeden evinizdeki IP kamera ve sunucuların IP değişimini anında takip edin.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 w-fit mb-3">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Spam Kara Liste Uyarısı</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            IP adresiniz Spamhaus, Barracuda veya SORBS gibi küresel kara listelere girdiğinde e-postalarınız spama düşmeden haberdar olun.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-3">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Sıfır Gecikme & Ücretsiz</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Saniyeler içinde tetiklenen Webhook ve Telegram botu altyapısıyla hiçbir ek yazılım kurmadan doğrudan çalışır.
          </p>
        </div>
      </div>
    </div>
  );
}
