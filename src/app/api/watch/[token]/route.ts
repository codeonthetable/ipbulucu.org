import { NextRequest, NextResponse } from "next/server";
import { extractClientIp } from "@/lib/geo";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const clientIp = extractClientIp(req.headers);

  return NextResponse.json({
    success: true,
    token,
    detectedIp: clientIp,
    timestamp: new Date().toISOString(),
    status: "IP kaydedildi ve kontrol edildi.",
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const clientIp = extractClientIp(req.headers);

  return NextResponse.json({
    success: true,
    token,
    detectedIp: clientIp,
    timestamp: new Date().toISOString(),
    status: "IP aktif.",
  });
}
