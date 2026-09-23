import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

export async function GET(request: NextRequest) {
  const domainParam = request.nextUrl.searchParams.get("domain")?.trim();

  if (!domainParam) {
    return NextResponse.json(
      { error: "Lütfen bir alan adı girin." },
      { status: 400 }
    );
  }

  const domain = domainParam
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split(":")[0];

  try {
    const [mxRes, txtRes, dmarcRes] = await Promise.allSettled([
      dns.resolveMx(domain),
      dns.resolveTxt(domain),
      dns.resolveTxt(`_dmarc.${domain}`),
    ]);

    const mxRecords = mxRes.status === "fulfilled" ? mxRes.value : [];
    const txtRecords = txtRes.status === "fulfilled" ? txtRes.value.map((t) => t.join(" ")) : [];
    const dmarcRecords = dmarcRes.status === "fulfilled" ? dmarcRes.value.map((t) => t.join(" ")) : [];

    // Find SPF
    const spfRecord = txtRecords.find((t) => t.startsWith("v=spf1")) || null;
    const dmarcRecord = dmarcRecords.find((t) => t.startsWith("v=DMARC1")) || null;

    let score = 0;
    if (mxRecords.length > 0) score += 30;
    if (spfRecord) score += 35;
    if (dmarcRecord) score += 35;

    let statusLabel = "Zayıf (Spam Riski)";
    if (score >= 90) statusLabel = "Mükemmel (Korumalı)";
    else if (score >= 60) statusLabel = "Orta (Eksik Kayıt)";

    return NextResponse.json({
      domain,
      score,
      statusLabel,
      mx: {
        present: mxRecords.length > 0,
        records: mxRecords,
      },
      spf: {
        present: Boolean(spfRecord),
        record: spfRecord,
        status: spfRecord ? "Geçerli" : "Bulunamadı",
      },
      dmarc: {
        present: Boolean(dmarcRecord),
        record: dmarcRecord,
        status: dmarcRecord ? "Geçerli" : "Bulunamadı",
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "E-posta güvenlik analizi yapılamadı." },
      { status: 500 }
    );
  }
}
