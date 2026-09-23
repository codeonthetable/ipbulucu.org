import { NextRequest, NextResponse } from "next/server";
import net from "net";

const COMMON_SERVICES: Record<number, string> = {
  21: "FTP (Dosya Aktarımı)",
  22: "SSH (Güvenli Kabuk)",
  23: "Telnet (Terminal)",
  25: "SMTP (Mail Gönderim)",
  53: "DNS (Alan Adı Sunucusu)",
  80: "HTTP (Web Sunucusu)",
  110: "POP3 (Mail Alma)",
  143: "IMAP (Mail Senkronizasyon)",
  443: "HTTPS (Güvenli Web SSL)",
  465: "SMTPS (SSL Mail)",
  587: "SMTP Submission",
  993: "IMAPS (SSL Mail)",
  995: "POP3S (SSL Mail)",
  3306: "MySQL Veritabanı",
  3389: "RDP (Uzak Masaüstü)",
  5432: "PostgreSQL",
  6379: "Redis Cache",
  8080: "HTTP Proxy / Alternatif Web",
  8443: "HTTPS Alternatif Web",
};

function checkSinglePort(
  host: string,
  port: number,
  timeout = 2500
): Promise<{ status: "open" | "closed" | "filtered"; responseTimeMs: number }> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const socket = new net.Socket();

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      const responseTimeMs = Date.now() - startTime;
      socket.destroy();
      resolve({ status: "open", responseTimeMs });
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve({ status: "filtered", responseTimeMs: timeout });
    });

    socket.on("error", (err: unknown) => {
      socket.destroy();
      const code = (err as { code?: string })?.code;
      if (code === "ECONNREFUSED") {
        resolve({ status: "closed", responseTimeMs: Date.now() - startTime });
      } else {
        resolve({ status: "filtered", responseTimeMs: Date.now() - startTime });
      }
    });

    try {
      socket.connect(port, host);
    } catch {
      resolve({ status: "filtered", responseTimeMs: Date.now() - startTime });
    }
  });
}

export async function GET(request: NextRequest) {
  const host = request.nextUrl.searchParams.get("host")?.trim();
  const portParam = request.nextUrl.searchParams.get("port")?.trim();
  const portsParam = request.nextUrl.searchParams.get("ports")?.trim();

  if (!host) {
    return NextResponse.json(
      { error: "Lütfen bir hedef IP adresi veya alan adı belirtin." },
      { status: 400 }
    );
  }

  const cleanHost = host
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split(":")[0];

  // Multi-port scan
  if (portsParam) {
    const portList = portsParam
      .split(",")
      .map((p) => parseInt(p.trim(), 10))
      .filter((p) => !isNaN(p) && p >= 1 && p <= 65535)
      .slice(0, 15); // max 15 ports per batch

    const results = await Promise.all(
      portList.map(async (port) => {
        const res = await checkSinglePort(cleanHost, port, 2000);
        return {
          port,
          service: COMMON_SERVICES[port] || "Özel Port",
          status: res.status,
          responseTimeMs: res.responseTimeMs,
        };
      })
    );

    return NextResponse.json({
      host: cleanHost,
      results,
    });
  }

  // Single port check
  const port = parseInt(portParam || "80", 10);
  if (isNaN(port) || port < 1 || port > 65535) {
    return NextResponse.json(
      { error: "Geçersiz port numarası (1 - 65535 arasında olmalıdır)." },
      { status: 400 }
    );
  }

  const checkResult = await checkSinglePort(cleanHost, port);

  return NextResponse.json({
    ip: cleanHost,
    port,
    service: COMMON_SERVICES[port] || "Özel Port",
    status: checkResult.status,
    responseTimeMs: checkResult.responseTimeMs,
  });
}
