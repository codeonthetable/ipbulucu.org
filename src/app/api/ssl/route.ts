import { NextRequest, NextResponse } from "next/server";
import tls from "tls";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const host = request.nextUrl.searchParams.get("host")?.trim();

  if (!host) {
    return NextResponse.json(
      { error: "Lütfen bir alan adı girin." },
      { status: 400 }
    );
  }

  const cleanHost = host
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split(":")[0];

  return new Promise<NextResponse>((resolve) => {
    const socket = tls.connect(
      {
        host: cleanHost,
        port: 443,
        servername: cleanHost,
        timeout: 4000,
        rejectUnauthorized: false,
      },
      () => {
        const cert = socket.getPeerCertificate(true);
        const protocol = socket.getProtocol();
        const cipher = socket.getCipher();
        const authorized = socket.authorized;
        const authError = socket.authorizationError;

        socket.destroy();

        if (!cert || Object.keys(cert).length === 0) {
          resolve(
            NextResponse.json(
              { error: "Sunucudan geçerli bir SSL sertifikası alınamadı." },
              { status: 500 }
            )
          );
          return;
        }

        const validFrom = new Date(cert.valid_from);
        const validTo = new Date(cert.valid_to);
        const now = new Date();
        const daysRemaining = Math.max(
          0,
          Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        );
        const isExpired = now > validTo;

        resolve(
          NextResponse.json({
            host: cleanHost,
            authorized,
            authError: authError || null,
            subject: cert.subject?.CN || cleanHost,
            issuer: cert.issuer?.O || cert.issuer?.CN || "Bilinmiyor",
            validFrom: cert.valid_from,
            validTo: cert.valid_to,
            daysRemaining,
            isExpired,
            san: cert.subjectaltname ? cert.subjectaltname.split(", ") : [cleanHost],
            serialNumber: cert.serialNumber,
            fingerprint: cert.fingerprint256 || cert.fingerprint,
            tlsProtocol: protocol,
            cipherName: cipher?.name,
          })
        );
      }
    );

    socket.on("timeout", () => {
      socket.destroy();
      resolve(
        NextResponse.json(
          { error: "SSL bağlantısı zaman aşımına uğradı." },
          { status: 504 }
        )
      );
    });

    socket.on("error", (err) => {
      socket.destroy();
      resolve(
        NextResponse.json(
          { error: `SSL bağlantı hatası: ${err.message}` },
          { status: 500 }
        )
      );
    });
  });
}
