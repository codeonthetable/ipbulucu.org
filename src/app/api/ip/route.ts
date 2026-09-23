import { NextRequest, NextResponse } from "next/server";
import { extractClientIp, resolveIpDetails } from "@/lib/geo";

export async function GET(request: NextRequest) {
  const headers = request.headers;
  const userAgent = headers.get("user-agent") || "";
  const acceptHeader = headers.get("accept") || "";
  const searchParams = request.nextUrl.searchParams;

  const paramIp = searchParams.get("ip");
  const format = searchParams.get("format");
  const clientIp = paramIp || extractClientIp(headers);

  const isCurl =
    userAgent.toLowerCase().includes("curl") ||
    userAgent.toLowerCase().includes("wget") ||
    userAgent.toLowerCase().includes("httpie");

  const wantsJson =
    format === "json" ||
    acceptHeader.includes("application/json") ||
    searchParams.has("json");

  // If user just cURLed without requesting json, return plain text IP
  if (isCurl && !wantsJson) {
    return new NextResponse(`${clientIp}\n`, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }

  // Full IP & Geo Details
  const details = await resolveIpDetails(clientIp, headers);

  return NextResponse.json(details, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
