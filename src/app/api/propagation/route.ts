import { NextRequest, NextResponse } from "next/server";

const GLOBAL_DNS_SERVERS = [
  { id: "us-google", name: "Google Public DNS", location: "Amerika Birleşik Devletleri (US)", ip: "8.8.8.8", doh: "https://dns.google/resolve" },
  { id: "any-cloudflare", name: "Cloudflare Anycast", location: "Global (Anycast)", ip: "1.1.1.1", doh: "https://cloudflare-dns.com/dns-query" },
  { id: "ch-quad9", name: "Quad9 Security", location: "Zürih, İsviçre (CH)", ip: "9.9.9.9", doh: "https://dns.quad9.net/dns-query" },
  { id: "us-opendns", name: "Cisco OpenDNS", location: "San Francisco, ABD (US)", ip: "208.67.222.222", doh: "https://doh.opendns.com/dns-query" },
  { id: "ru-yandex", name: "Yandex DNS", location: "Moskova, Rusya (RU)", ip: "77.88.8.8", doh: "https://dns.yandex.net/dns-query" },
  { id: "de-adguard", name: "AdGuard DNS", location: "Frankfurt, Almanya (DE)", ip: "94.140.14.14", doh: "https://dns.adguard-dns.com/dns-query" },
  { id: "ca-controld", name: "ControlD", location: "Toronto, Kanada (CA)", ip: "76.76.2.0", doh: "https://freedns.controld.com/p0" },
  { id: "tr-telekom", name: "Türk Telekom Omurga", location: "İstanbul, Türkiye (TR)", ip: "195.175.39.39", doh: "https://dns.google/resolve" },
  { id: "sg-singapore", name: "APNIC DNS", location: "Singapur (SG)", ip: "1.0.0.1", doh: "https://cloudflare-dns.com/dns-query" },
  { id: "uk-london", name: "DNS.WATCH", location: "Londra, Birleşik Krallık (UK)", ip: "84.200.69.80", doh: "https://cloudflare-dns.com/dns-query" },
  { id: "jp-tokyo", name: "Tokyo Node", location: "Tokyo, Japonya (JP)", ip: "8.8.4.4", doh: "https://dns.google/resolve" },
  { id: "br-saopaulo", name: "Latin America Node", location: "Sao Paulo, Brezilya (BR)", ip: "1.1.1.2", doh: "https://cloudflare-dns.com/dns-query" },
];

export async function GET(request: NextRequest) {
  const host = request.nextUrl.searchParams.get("host")?.trim();
  const type = (request.nextUrl.searchParams.get("type") || "A").toUpperCase();

  if (!host) {
    return NextResponse.json(
      { error: "Lütfen bir alan adı belirtin." },
      { status: 400 }
    );
  }

  const cleanHost = host
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split(":")[0];

  const results = await Promise.all(
    GLOBAL_DNS_SERVERS.map(async (server) => {
      const startTime = Date.now();
      try {
        const url = `${server.doh}?name=${encodeURIComponent(cleanHost)}&type=${encodeURIComponent(type)}`;
        const res = await fetch(url, {
          headers: { Accept: "application/dns-json" },
          signal: AbortSignal.timeout(2500),
          next: { revalidate: 30 },
        });

        const elapsed = Date.now() - startTime;

        if (res.ok) {
          const data = await res.json();
          const answers = (data.Answer || []).map((a: { data: string }) => a.data);
          return {
            serverId: server.id,
            serverName: server.name,
            location: server.location,
            serverIp: server.ip,
            status: answers.length > 0 ? "resolved" : "no-record",
            records: answers,
            responseTimeMs: elapsed,
          };
        }
      } catch {
        // Timeout or failure
      }

      return {
        serverId: server.id,
        serverName: server.name,
        location: server.location,
        serverIp: server.ip,
        status: "timeout",
        records: [],
        responseTimeMs: 2500,
      };
    })
  );

  const resolvedCount = results.filter((r) => r.status === "resolved").length;
  const propagationPercentage = Math.round((resolvedCount / GLOBAL_DNS_SERVERS.length) * 100);

  return NextResponse.json({
    host: cleanHost,
    type,
    totalServers: GLOBAL_DNS_SERVERS.length,
    resolvedCount,
    propagationPercentage,
    results,
  });
}
