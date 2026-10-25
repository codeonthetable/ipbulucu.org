"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import { MapPin, ZoomIn, ZoomOut, RefreshCw, ExternalLink } from "lucide-react";

interface IpMapProps {
  lat?: number | null;
  lng?: number | null;
  city?: string | null;
  country?: string | null;
  source?: string | null;
  mode?: "ip" | "region";
  lang?: "tr" | "en";
}

export default function IpMap({ lat, lng, city, country, source, mode = "ip", lang = "tr" }: IpMapProps) {
  const en = lang === "en";
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [retry, setRetry] = useState(0);
  const valid = typeof lat === "number" && Number.isFinite(lat) && Math.abs(lat) <= 90 && typeof lng === "number" && Number.isFinite(lng) && Math.abs(lng) <= 180;
  const location = [city, country].filter(Boolean).join(", ");

  useEffect(() => {
    if (!valid || !container.current) return;
    let disposed = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    setState("loading");
    async function init() {
      try {
        const L = (await import("leaflet")).default;
        if (disposed || !container.current) return;
        const map = L.map(container.current, { center: [lat!, lng!], zoom: 6, scrollWheelZoom: false, zoomControl: false });
        mapRef.current = map;
        const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 19 });
        let loaded = false;
        tiles.on("tileload", () => { if (!disposed) { loaded = true; clearTimeout(timeout); setState("ready"); } });
        tiles.on("tileerror", () => { if (!disposed && !loaded) setState("error"); });
        // Provider strings are text nodes, never interpolated HTML.
        const popup = document.createElement("div");
        const heading = document.createElement("strong");
        heading.textContent = mode === "region" ? (en ? "City reference point" : "Şehir referans noktası") : (en ? "Approximate provider location" : "Sağlayıcının yaklaşık konumu");
        const detail = document.createElement("p");
        detail.textContent = location || (en ? "Region unavailable" : "Bölge bilgisi yok");
        popup.append(heading, detail);
        L.circleMarker([lat!, lng!], { radius: 9, color: "#2563eb", fillOpacity: 0.5, weight: 3 }).addTo(map).bindPopup(popup);
        timeout = setTimeout(() => { if (!disposed && !loaded) setState("error"); }, 12000);
        tiles.addTo(map);
      } catch { if (!disposed) setState("error"); }
    }
    void init();
    return () => { disposed = true; clearTimeout(timeout); mapRef.current?.remove(); mapRef.current = null; };
  }, [lat, lng, valid, location, en, retry, mode]);

  return <section className="rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
    <div className="p-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3"><MapPin className="text-blue-600" /><div><h2 className="text-xl font-bold">{mode === "region" ? (en ? "City reference map" : "Şehir referans haritası") : (en ? "Approximate IP location" : "IP adresinin yaklaşık konumu")}</h2><p className="text-sm text-gray-500 mt-1">{location || (en ? "Location unavailable" : "Konum bilgisi yok")}{source ? " · " + (en ? "Source" : "Kaynak") + ": " + source : ""}</p></div></div>
      {valid && <a href={"https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 flex items-center gap-2">Google Maps <ExternalLink size={15} /></a>}
    </div>
    <p className="px-6 pb-5 text-sm text-gray-500">{mode === "region" ? (en ? "This static city reference is not the result of an IP lookup and does not locate the visitor." : "Bu sabit şehir referansı IP sorgusu sonucu değildir; ziyaretçinin konumunu göstermez.") : (en ? "This point is the provider's geographic estimate. It does not locate a person, home or device. Zooming in does not improve its accuracy." : "İşaret, sağlayıcının coğrafi tahminidir. Kişinin, evin veya cihazın konumunu göstermez. Yakınlaştırmak tahminin doğruluğunu artırmaz.")}</p>
    {valid ? <div className="relative h-[320px] sm:h-[380px] isolate bg-slate-100 dark:bg-slate-800">
      <div ref={container} className="w-full h-full" aria-label={en ? "Approximate location map" : "Yaklaşık konum haritası"} />
      <div className="absolute top-3 right-3 z-[500] flex gap-1 rounded-xl bg-white dark:bg-gray-900 p-1 shadow">
        <button aria-label={en ? "Zoom in" : "Yakınlaştır"} onClick={() => mapRef.current?.zoomIn()} className="p-2"><ZoomIn size={18} /></button>
        <button aria-label={en ? "Zoom out" : "Uzaklaştır"} onClick={() => mapRef.current?.zoomOut()} className="p-2"><ZoomOut size={18} /></button>
        <button aria-label={en ? "Recenter" : "Konuma ortala"} onClick={() => mapRef.current?.setView([lat!, lng!], 6)} className="p-2"><RefreshCw size={18} /></button>
      </div>
      {state !== "ready" && <div role="status" className="absolute bottom-8 left-3 right-3 z-[500] rounded-xl bg-white/95 dark:bg-gray-900/95 p-4 text-sm shadow">{state === "loading" ? (en ? "Loading map…" : "Harita yükleniyor…") : <>{en ? "Map tiles could not be loaded. The IP result above is still available." : "Harita karoları yüklenemedi. Yukarıdaki IP sonucu kullanılabilir."}<button onClick={() => setRetry(value => value + 1)} className="ml-3 text-blue-600 underline">{en ? "Retry" : "Tekrar dene"}</button></>}</div>}
    </div> : <div className="mx-6 mb-6 rounded-2xl bg-slate-50 dark:bg-slate-950 p-6 text-sm text-slate-500">{en ? "No valid coordinates were returned. No example location is placed on the map." : "Geçerli koordinat bilgisi gelmedi. Haritaya örnek bir konum yerleştirilmez."}</div>}
  </section>;
}
