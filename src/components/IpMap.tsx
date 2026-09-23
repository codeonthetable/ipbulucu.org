"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  ExternalLink,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
} from "lucide-react";

interface IpMapProps {
  lat: number;
  lng: number;
  city: string;
  country: string;
  ip: string;
}

export default function IpMap({ lat, lng, city, country, ip }: IpMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard");
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (!mapContainerRef.current) return;

      try {
        const L = (await import("leaflet")).default;

        // Cleanup existing map if re-rendering
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        if (!isMounted || !mapContainerRef.current) return;

        const map = L.map(mapContainerRef.current, {
          center: [lat, lng],
          zoom: 13,
          scrollWheelZoom: false,
          zoomControl: false, // We use our custom UI controls
        });

        const standardUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const standardAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

        const tileLayer = L.tileLayer(standardUrl, {
          attribution: standardAttrib,
          maxZoom: 19,
        }).addTo(map);

        tileLayerRef.current = tileLayer;

        // Custom Glowing Pulse Marker
        const customIcon = L.divIcon({
          className: "custom-leaflet-marker",
          html: `
            <div style="position: relative; width: 36px; height: 36px;">
              <div style="position: absolute; inset: 0; border-radius: 50%; background: #2563eb; opacity: 0.3; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="position: relative; background: #2563eb; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 15px rgba(0,0,0,0.4); color: white;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36],
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
        marker
          .bindPopup(
            `<div style="font-family: system-ui; text-align: center; padding: 4px;">
              <strong style="color: #1e3a8a; font-size: 14px;">${ip}</strong><br/>
              <span style="color: #4b5563; font-size: 12px;">${city}, ${country}</span><br/>
              <span style="color: #6b7280; font-size: 11px;">Enlem: ${lat.toFixed(4)}, Boylam: ${lng.toFixed(4)}</span>
            </div>`
          )
          .openPopup();

        mapInstanceRef.current = map;
        setMapLoaded(true);

        // Invalidate map size after animation/DOM layout
        setTimeout(() => {
          if (map) map.invalidateSize();
        }, 250);
      } catch (err) {
        console.error("Leaflet Map init error:", err);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, city, country, ip]);

  // Handle Layer Toggle (Standard / Satellite)
  const toggleMapType = async () => {
    if (!mapInstanceRef.current) return;
    const L = (await import("leaflet")).default;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    if (mapType === "standard") {
      // Switch to Esri World Imagery (Satellite)
      tileLayerRef.current = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          maxZoom: 18,
        }
      ).addTo(mapInstanceRef.current);
      setMapType("satellite");
    } else {
      // Switch to OpenStreetMap Standard
      tileLayerRef.current = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }
      ).addTo(mapInstanceRef.current);
      setMapType("standard");
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], 13);
    }
  };

  const osmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=13/${lat}/${lng}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md flex flex-col">
      {/* Map Top Bar */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Coğrafi Konum & Canlı Harita
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {city}, {country} (Koordinat: {lat.toFixed(4)}, {lng.toFixed(4)})
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Layer Toggle */}
          <button
            onClick={toggleMapType}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>{mapType === "standard" ? "Uydu Görünümü" : "Harita Görünümü"}</span>
          </button>

          {/* Google Maps Link */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-600 dark:text-blue-400 transition-colors"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Map Canvas Area */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-gray-100 dark:bg-gray-800">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Custom Map Floating Controls */}
        <div className="absolute right-4 top-4 z-[400] flex flex-col gap-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
          <button
            onClick={handleZoomIn}
            title="Yakınlaştır"
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Uzaklaştır"
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="h-px bg-gray-200 dark:bg-gray-800 my-0.5" />
          <button
            onClick={handleRecenter}
            title="Konuma Ortala"
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Loading Spinner */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm z-[500] text-gray-500 text-xs gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span>Harita Yükleniyor...</span>
          </div>
        )}
      </div>

      {/* Map Bottom Bar */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-950/60 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Konum: <strong>{city}, {country}</strong> (Santral/Bölge Dağıtımı)
        </span>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Enlem: <strong>{lat.toFixed(6)}</strong></span>
          <span>Boylam: <strong>{lng.toFixed(6)}</strong></span>
        </div>
      </div>
    </div>
  );
}
