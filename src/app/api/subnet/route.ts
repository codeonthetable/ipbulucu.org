import { NextRequest, NextResponse } from "next/server";

function ipToLong(ip: string): number {
  return (
    ip
      .split(".")
      .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0
  );
}

function longToIp(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255,
  ].join(".");
}

export async function GET(request: NextRequest) {
  const cidrInput = request.nextUrl.searchParams.get("cidr")?.trim();

  if (!cidrInput) {
    return NextResponse.json(
      { error: "Lütfen bir IP ve CIDR belirtin (Örn: 192.168.1.0/24)." },
      { status: 400 }
    );
  }

  const [ipPart, prefixPart] = cidrInput.split("/");
  const prefix = parseInt(prefixPart || "24", 10);

  if (isNaN(prefix) || prefix < 0 || prefix > 32) {
    return NextResponse.json(
      { error: "Geçersiz CIDR öneki (0 - 32 arasında olmalıdır)." },
      { status: 400 }
    );
  }

  const parts = ipPart.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    return NextResponse.json(
      { error: "Geçersiz IPv4 adresi formatı." },
      { status: 400 }
    );
  }

  const ipLong = ipToLong(ipPart);
  const maskLong = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const wildcardLong = ~maskLong >>> 0;

  const networkLong = (ipLong & maskLong) >>> 0;
  const broadcastLong = (networkLong | wildcardLong) >>> 0;

  const totalHosts = Math.pow(2, 32 - prefix);
  const usableHosts = prefix >= 31 ? (prefix === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

  const firstHostLong = prefix >= 31 ? networkLong : (networkLong + 1) >>> 0;
  const lastHostLong = prefix >= 31 ? broadcastLong : (broadcastLong - 1) >>> 0;

  let ipClass = "C";
  if (parts[0] < 128) ipClass = "A";
  else if (parts[0] < 192) ipClass = "B";
  else if (parts[0] < 224) ipClass = "C";
  else if (parts[0] < 240) ipClass = "D (Multicast)";
  else ipClass = "E (Deneysel)";

  const isPrivate =
    parts[0] === 10 ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168);

  return NextResponse.json({
    cidr: `${ipPart}/${prefix}`,
    ipAddress: ipPart,
    prefix,
    netmask: longToIp(maskLong),
    wildcardMask: longToIp(wildcardLong),
    networkAddress: longToIp(networkLong),
    broadcastAddress: longToIp(broadcastLong),
    usableHostRange: `${longToIp(firstHostLong)} - ${longToIp(lastHostLong)}`,
    totalHosts,
    usableHosts,
    ipClass,
    isPrivate,
    ipType: isPrivate ? "Özel Ağ (Private)" : "Genel Ağ (Public)",
    binaryIp: parts.map((p) => p.toString(2).padStart(8, "0")).join("."),
    binaryNetmask: longToIp(maskLong)
      .split(".")
      .map((p) => Number(p).toString(2).padStart(8, "0"))
      .join("."),
  });
}
