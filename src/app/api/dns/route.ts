import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";
import { DnsLookupResult } from "@/lib/types";

export async function GET(request: NextRequest) {
  const host = request.nextUrl.searchParams.get("host")?.trim();

  if (!host) {
    return NextResponse.json(
      { error: "Lütfen geçerli bir domain veya host adı belirtin." },
      { status: 400 }
    );
  }

  const cleanHost = host
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split(":")[0];

  const startTime = Date.now();
  const result: DnsLookupResult = {
    host: cleanHost,
    records: {},
  };

  try {
    const [a, aaaa, mx, txt, ns, cname, soa, caa] = await Promise.allSettled([
      dns.resolve4(cleanHost),
      dns.resolve6(cleanHost),
      dns.resolveMx(cleanHost),
      dns.resolveTxt(cleanHost),
      dns.resolveNs(cleanHost),
      dns.resolveCname(cleanHost),
      dns.resolveSoa(cleanHost),
      dns.resolveCaa(cleanHost),
    ]);

    if (a.status === "fulfilled") result.records.A = a.value;
    if (aaaa.status === "fulfilled") result.records.AAAA = aaaa.value;
    if (mx.status === "fulfilled") result.records.MX = mx.value;
    if (txt.status === "fulfilled") result.records.TXT = txt.value;
    if (ns.status === "fulfilled") result.records.NS = ns.value;
    if (cname.status === "fulfilled") result.records.CNAME = cname.value;
    if (soa.status === "fulfilled") result.records.SOA = soa.value;
    if (caa.status === "fulfilled") result.records.CAA = caa.value;

    result.responseTimeMs = Date.now() - startTime;

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "DNS sorgusu sırasında hata oluştu." },
      { status: 500 }
    );
  }
}
