import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get("url")?.trim();

  if (!urlParam) {
    return NextResponse.json(
      { error: "Lütfen bir web sitesi adresi girin." },
      { status: 400 }
    );
  }

  let targetUrl = urlParam;
  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = `https://${targetUrl}`;
  }

  const startTime = Date.now();

  try {
    const res = await fetch(targetUrl, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; IPBulucuBot/1.0; +https://ipbulucu.org)",
        Accept: "*/*",
      },
    });

    const elapsed = Date.now() - startTime;
    const headerObj: Record<string, string> = {};
    res.headers.forEach((val, key) => {
      headerObj[key] = val;
    });

    // Check Security Headers
    const securityAudit = [
      {
        name: "Strict-Transport-Security (HSTS)",
        header: "strict-transport-security",
        present: Boolean(headerObj["strict-transport-security"]),
        value: headerObj["strict-transport-security"] || "Eksik",
        description: "Tüm bağlantıların yalnızca şifrelenmiş HTTPS üzerinden gerçekleşmesini zorunlu kılar.",
      },
      {
        name: "Content-Security-Policy (CSP)",
        header: "content-security-policy",
        present: Boolean(headerObj["content-security-policy"]),
        value: headerObj["content-security-policy"] || "Eksik",
        description: "XSS ve veri enjeksiyonu saldırılarına karşı tarayıcı kaynak yüklemelerini kısıtlar.",
      },
      {
        name: "X-Frame-Options",
        header: "x-frame-options",
        present: Boolean(headerObj["x-frame-options"]),
        value: headerObj["x-frame-options"] || "Eksik",
        description: "Sitenizin iframe içinde açılarak Clickjacking saldırılarına maruz kalmasını önler.",
      },
      {
        name: "X-Content-Type-Options",
        header: "x-content-type-options",
        present: Boolean(headerObj["x-content-type-options"]),
        value: headerObj["x-content-type-options"] || "Eksik",
        description: "MIME type sniffing saldırılarını engeller.",
      },
      {
        name: "Referrer-Policy",
        header: "referrer-policy",
        present: Boolean(headerObj["referrer-policy"]),
        value: headerObj["referrer-policy"] || "Eksik",
        description: "Dış bağlantılara yönlendirilirken referrer bilgilerinin gizliliğini korur.",
      },
      {
        name: "Permissions-Policy",
        header: "permissions-policy",
        present: Boolean(headerObj["permissions-policy"]),
        value: headerObj["permissions-policy"] || "Eksik",
        description: "Kamera, mikrofon gibi tarayıcı donanım erişimlerini yönetir.",
      },
    ];

    const passedCount = securityAudit.filter((s) => s.present).length;
    let scoreGrade = "F";
    if (passedCount >= 5) scoreGrade = "A+";
    else if (passedCount === 4) scoreGrade = "A";
    else if (passedCount === 3) scoreGrade = "B";
    else if (passedCount === 2) scoreGrade = "C";
    else if (passedCount === 1) scoreGrade = "D";

    return NextResponse.json({
      url: targetUrl,
      finalUrl: res.url,
      statusCode: res.status,
      statusText: res.statusText || "OK",
      responseTimeMs: elapsed,
      headers: headerObj,
      securityAudit,
      scoreGrade,
      passedSecurityCount: passedCount,
      totalSecurityHeaders: securityAudit.length,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "HTTP başlıkları alınamadı." },
      { status: 500 }
    );
  }
}
