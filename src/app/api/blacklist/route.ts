import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";
import { BlacklistCheckResult } from "@/lib/types";

const DNSBL_PROVIDERS = [
  { name: "Spamhaus ZEN", host: "zen.spamhaus.org", delist: "https://check.spamhaus.org/" },
  { name: "Barracuda BRBL", host: "b.barracudacentral.org", delist: "https://www.barracudacentral.org/rbl/removal-request" },
  { name: "SpamCop DNSBL", host: "bl.spamcop.net", delist: "https://www.spamcop.net/bl.shtml" },
  { name: "SORBS Aggregate", host: "dnsbl.sorbs.net", delist: "http://www.sorbs.net/delisting/overview.shtml" },
  { name: "UCEPROTECT Level 1", host: "dnsbl-1.uceprotect.net", delist: "http://www.uceprotect.net/en/rblcheck.php" },
  { name: "UCEPROTECT Level 2", host: "dnsbl-2.uceprotect.net", delist: "http://www.uceprotect.net/en/rblcheck.php" },
  { name: "MailSpike BL", host: "bl.mailspike.net", delist: "https://mailspike.org/iplookup.html" },
  { name: "Abuseat CBL", host: "cbl.abuseat.org", delist: "https://www.abuseat.org/lookup.cgi" },
  { name: "PSBL (Surriel)", host: "psbl.surriel.com", delist: "https://psbl.surriel.com/listing" },
  { name: "DroneBL", host: "dnsbl.dronebl.org", delist: "https://dronebl.org/lookup" },
];

export async function GET(request: NextRequest) {
  const ip = request.nextUrl.searchParams.get("ip")?.trim();

  if (!ip) {
    return NextResponse.json(
      { error: "Lütfen kontrol edilecek bir IPv4 adresi belirtin." },
      { status: 400 }
    );
  }

  // If domain is provided, resolve to IPv4 first
  let targetIp = ip
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split(":")[0];

  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

  if (!ipv4Regex.test(targetIp)) {
    try {
      const addresses = await dns.resolve4(targetIp);
      if (addresses.length > 0) {
        targetIp = addresses[0];
      }
    } catch {
      return NextResponse.json(
        { error: "Belirtilen alan adı veya IP adresi çözümlenemedi." },
        { status: 400 }
      );
    }
  }

  const match = targetIp.match(ipv4Regex);
  if (!match) {
    return NextResponse.json(
      { error: "Geçersiz IPv4 formatı." },
      { status: 400 }
    );
  }

  // Reverse octets: 1.2.3.4 -> 4.3.2.1
  const reversedIp = `${match[4]}.${match[3]}.${match[2]}.${match[1]}`;

  const checks = await Promise.all(
    DNSBL_PROVIDERS.map(async (provider) => {
      const queryHost = `${reversedIp}.${provider.host}`;
      try {
        const addresses = await dns.resolve4(queryHost);
        const isListed = addresses.length > 0 && addresses[0].startsWith("127.");
        return {
          host: provider.host,
          name: provider.name,
          listed: isListed,
          response: addresses.join(", "),
          delistUrl: provider.delist,
        };
      } catch {
        return {
          host: provider.host,
          name: provider.name,
          listed: false,
          delistUrl: provider.delist,
        };
      }
    })
  );

  const listedCount = checks.filter((c) => c.listed).length;

  const result: BlacklistCheckResult = {
    ip: targetIp,
    totalChecked: DNSBL_PROVIDERS.length,
    listedCount,
    cleanCount: DNSBL_PROVIDERS.length - listedCount,
    results: checks,
  };

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
