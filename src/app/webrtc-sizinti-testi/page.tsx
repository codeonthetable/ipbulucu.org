"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Radio,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Globe,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import AdPlaceholder from "@/components/AdPlaceholder";

const WEBRTC_FAQS = [
  {
    question: "WebRTC IP Sızıntısı (WebRTC Leak) nedir?",
    answer: "WebRTC (Web Real-Time Communication), tarayıcıların sesli/görüntülü görüşme yapmasını sağlayan bir teknolojidir. Ancak bazı durumlarda VPN açık olsa bile tarayıcının yerel STUN/TURN sorguları gerçek genel IP adresinizi açığa çıkarabilir.",
  },
  {
    question: "WebRTC sızıntısı nasıl önlenir?",
    answer: "WebRTC sızıntı korumalı kaliteli bir VPN istemcisi kullanarak veya tarayıcınızda 'WebRTC Network Limiter' eklentisi kurarak sızıntıları tamamen engelleyebilirsiniz.",
  },
];

export default function WebRtcLeakPage() {
  const [loading, setLoading] = useState(true);
  const [publicIp, setPublicIp] = useState<string | null>(null);
  const [webrtcIps, setWebrtcIps] = useState<string[]>([]);
  const [isLeaking, setIsLeaking] = useState(false);

  const runTest = async () => {
    setLoading(true);
    setWebrtcIps([]);
    setIsLeaking(false);

    // 1. Fetch public IP
    let fetchedPublicIp = "";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      if (res.ok) {
        const json = await res.json();
        fetchedPublicIp = json.ip;
        setPublicIp(json.ip);
      }
    } catch {
      // ignore
    }

    // 2. Query WebRTC RTCPeerConnection candidates
    const detected: string[] = [];

    try {
      const rtc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      rtc.createDataChannel("");

      rtc.onicecandidate = (e) => {
        if (!e.candidate || !e.candidate.candidate) return;
        const line = e.candidate.candidate;
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
        const matches = line.match(ipRegex);
        if (matches) {
          matches.forEach((ip) => {
            if (!detected.includes(ip) && !ip.startsWith("0.0.0.0")) {
              detected.push(ip);
              setWebrtcIps([...detected]);

              // If candidate contains an IP different from public IP and not local, it might be a leak
              if (
                fetchedPublicIp &&
                ip !== fetchedPublicIp &&
                !ip.startsWith("192.168.") &&
                !ip.startsWith("10.") &&
                !ip.startsWith("172.16.") &&
                !ip.endsWith(".local")
              ) {
                setIsLeaking(true);
              }
            }
          });
        }
      };

      const offer = await rtc.createOffer();
      await rtc.setLocalDescription(offer);

      setTimeout(() => {
        setLoading(false);
      }, 2500);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 mb-3">
          <Radio className="w-3.5 h-3.5" />
          WebRTC Gizlilik & VPN Sızıntı Testi
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          WebRTC IP Sızıntı Kontrolü
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          VPN veya Proxy kullanırken tarayıcınızın WebRTC protokolü üzerinden gerçek IP adresinizi sızdırıp sızdırmadığını canlı test edin.
        </p>
      </div>

      {/* Test Card */}
      <div className="max-w-3xl mx-auto rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-rose-600" />
              WebRTC STUN Bağlantı Testi
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Genel IP Adresiniz: <strong className="font-mono text-blue-600">{publicIp || "Tespit Ediliyor..."}</strong>
            </p>
          </div>

          <button
            onClick={runTest}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white font-bold text-xs shadow transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Test Ediliyor..." : "Testi Yeniden Başlat"}</span>
          </button>
        </div>

        {/* Status Indicator */}
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-center space-y-2">
          {!loading ? (
            !isLeaking ? (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Tebrikler! WebRTC IP Sızıntısı Tespit Edilmedi
                </h3>
                <p className="text-xs text-gray-500 max-w-md">
                  Tarayıcınız WebRTC üzerinden herhangi bir gizli IP adresi sızdırmıyor. Bağlantınız güvenli.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mb-2">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-red-600 dark:text-red-400">
                  DİKKAT: WebRTC IP Sızıntısı Algılandı!
                </h3>
                <p className="text-xs text-gray-500 max-w-md">
                  VPN veya Proxy kullanmanıza rağmen gerçek IP adresiniz WebRTC üzerinden sızdırılıyor.
                </p>
              </div>
            )
          ) : (
            <div className="py-6 flex flex-col items-center gap-2 text-gray-500 text-sm">
              <RefreshCw className="w-6 h-6 animate-spin text-rose-600" />
              <span>WebRTC STUN adayları toplanıyor ve taranıyor...</span>
            </div>
          )}
        </div>

        {/* Discovered Candidates */}
        {webrtcIps.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              WebRTC Tarafından Algılanan IP Adayları (ICE Candidates):
            </h3>
            <div className="space-y-1.5 font-mono text-xs">
              {webrtcIps.map((ip, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="font-bold text-gray-800 dark:text-gray-200">{ip}</span>
                  <span className="text-[10px] text-gray-400 uppercase">
                    {ip.startsWith("192.168.") || ip.startsWith("10.") || ip.endsWith(".local")
                      ? "Yerel Ağ IP'si (Güvenli)"
                      : "Dış IP / STUN Adayı"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AdPlaceholder slotId="webrtc-mid-banner" format="leaderboard" />

      <FaqAccordion
        faqs={WEBRTC_FAQS}
        title="WebRTC Güvenliği Hakkında SSS"
        subtitle="Tarayıcı gizliliği ve IP sızıntı önleme yöntemleri"
      />
    </div>
  );
}
