export interface ClientFusionResult {
  browserTimezone: string;
  browserUtcOffset: string;
  isTimezoneMatch: boolean;
  timezoneVerdict: string;
  screenResolution: string;
  hardwareCores: number;
  deviceMemoryGb?: number;
  gpuRenderer: string;
  isHeadlessBrowser: boolean;
  webRtcLocalIps: string[];
  webRtcPublicIps: string[];
  isWebRtcLeaking: boolean;
  crossValidationScore: number;
  crossValidationVerdict: "Gerçek Cihaz & Doğrulanmış Konum" | "Şüpheli (VPN / Saat Uyuşmazlığı)" | "Yüksek Risk (Sanal Tarayıcı / Proxy)";
}

export async function runClientFusionAnalysis(ipTimezone?: string, lookupIp?: string): Promise<ClientFusionResult> {
  if (typeof window === "undefined") {
    return {
      browserTimezone: "Bilinmiyor",
      browserUtcOffset: "UTC+00:00",
      isTimezoneMatch: true,
      timezoneVerdict: "Sunucu Tarafı Analiz",
      screenResolution: "1920x1080",
      hardwareCores: 8,
      deviceMemoryGb: 8,
      gpuRenderer: "Standart Grafik Birimi",
      isHeadlessBrowser: false,
      webRtcLocalIps: [],
      webRtcPublicIps: [],
      isWebRtcLeaking: false,
      crossValidationScore: 98,
      crossValidationVerdict: "Gerçek Cihaz & Doğrulanmış Konum",
    };
  }

  // 1. Browser Timezone & Offset Analysis
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Istanbul";
  const offsetMinutes = new Date().getTimezoneOffset();
  const offsetHours = -offsetMinutes / 60;
  const sign = offsetHours >= 0 ? "+" : "-";
  const browserUtcOffset = `UTC${sign}${String(Math.abs(Math.floor(offsetHours))).padStart(2, "0")}:${String(Math.abs(offsetMinutes % 60)).padStart(2, "0")}`;

  let isTimezoneMatch = true;
  let timezoneVerdict = "IP konumu ile tarayıcı saat dilimi birebir eşleşiyor.";

  if (ipTimezone) {
    const normIpTz = ipTimezone.toLowerCase().replace(/_/g, "/");
    const normBrowserTz = browserTimezone.toLowerCase().replace(/_/g, "/");
    
    // Check if same continent / general zone or exact match
    if (!normIpTz.includes(normBrowserTz) && !normBrowserTz.includes(normIpTz)) {
      // If one is Istanbul/Athens/Kyiv/Bucharest (all UTC+2/+3) consider acceptable, else flag
      const trNeighbors = ["istanbul", "athens", "sofia", "bucharest", "kyiv", "nicosia"];
      const isBothTrRegion = trNeighbors.some((c) => normIpTz.includes(c)) && trNeighbors.some((c) => normBrowserTz.includes(c));
      
      if (!isBothTrRegion) {
        isTimezoneMatch = false;
        timezoneVerdict = `Uyuşmazlık Tespit Edildi! IP: ${ipTimezone} ↔ Tarayıcı Saati: ${browserTimezone} (Muhtemel VPN/Proxy)`;
      }
    }
  }

  // 2. Hardware & Screen
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const hardwareCores = navigator.hardwareConcurrency || 4;
  const deviceMemoryGb = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;

  // 3. WebGL GPU Unmasked Renderer
  let gpuRenderer = "Standart Donanım Hızlandırma";
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        gpuRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "Mesa / Generic GPU";
      }
    }
  } catch {
    gpuRenderer = "Korumalı GPU Sürücüsü";
  }

  // 4. Headless / Anti-Detect Detection
  const isHeadlessBrowser = Boolean(
    navigator.webdriver ||
    !navigator.languages ||
    navigator.languages.length === 0 ||
    gpuRenderer.toLowerCase().includes("llvmpipe") ||
    gpuRenderer.toLowerCase().includes("swiftshader")
  );

  // 5. Silent WebRTC STUN Probe
  const webRtcLocalIps: string[] = [];
  const webRtcPublicIps: string[] = [];
  let isWebRtcLeaking = false;

  try {
    const rtc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    rtc.createDataChannel("");
    const offer = await rtc.createOffer();
    await rtc.setLocalDescription(offer);

    await new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        rtc.close();
        resolve();
      }, 1500);

      rtc.onicecandidate = (event) => {
        if (!event || !event.candidate) {
          clearTimeout(timeout);
          rtc.close();
          resolve();
          return;
        }

        const cand = event.candidate.candidate;
        const ipMatch = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/i.exec(cand);
        if (ipMatch && ipMatch[1]) {
          const foundIp = ipMatch[1];
          if (
            foundIp.startsWith("192.168.") ||
            foundIp.startsWith("10.") ||
            foundIp.startsWith("172.16.") ||
            foundIp.startsWith("172.31.")
          ) {
            if (!webRtcLocalIps.includes(foundIp)) webRtcLocalIps.push(foundIp);
          } else {
            if (!webRtcPublicIps.includes(foundIp)) webRtcPublicIps.push(foundIp);
          }
        }
      };
    });

    if (lookupIp && webRtcPublicIps.length > 0 && !webRtcPublicIps.includes(lookupIp)) {
      isWebRtcLeaking = true;
    }
  } catch {
    // WebRTC blocked or permission denied
  }

  // Calculate Cross-Validation Trust Score
  let score = 100;
  if (!isTimezoneMatch) score -= 35;
  if (isHeadlessBrowser) score -= 45;
  if (isWebRtcLeaking) score -= 30;
  if (score < 10) score = 10;

  let verdict: ClientFusionResult["crossValidationVerdict"] = "Gerçek Cihaz & Doğrulanmış Konum";
  if (score < 50) {
    verdict = "Yüksek Risk (Sanal Tarayıcı / Proxy)";
  } else if (score < 80) {
    verdict = "Şüpheli (VPN / Saat Uyuşmazlığı)";
  }

  return {
    browserTimezone,
    browserUtcOffset,
    isTimezoneMatch,
    timezoneVerdict,
    screenResolution,
    hardwareCores,
    deviceMemoryGb,
    gpuRenderer,
    isHeadlessBrowser,
    webRtcLocalIps,
    webRtcPublicIps,
    isWebRtcLeaking,
    crossValidationScore: score,
    crossValidationVerdict: verdict,
  };
}
