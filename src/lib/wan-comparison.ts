import { calculateIpFormats } from "./ip-formats";

export type WanComparison = "invalid" | "ipv6" | "public_required" | "shared" | "private" | "special" | "same" | "different";
function scope(ip: string) {
  const [a, b, c] = ip.split(".").map(Number);
  if (a === 100 && b >= 64 && b <= 127) return "shared";
  if (a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) return "private";
  if (a === 0 || a === 127 || a >= 224 || (a === 169 && b === 254) ||
      (a === 192 && b === 0 && (c === 0 || c === 2)) || (a === 192 && b === 88 && c === 99) ||
      (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) ||
      (a === 203 && b === 0 && c === 113)) return "special";
  return "public";
}

// Local comparison only. No network, persistence, address echo or CGNAT verdict.
export function compareWan(wanInput: string, publicInput: string): WanComparison {
  const wan = wanInput.trim(), publicIp = publicInput.trim();
  const w = calculateIpFormats(wan), p = calculateIpFormats(publicIp);
  if (!w || !p) return "invalid";
  if (w.version !== "IPv4" || p.version !== "IPv4") return "ipv6";
  if (scope(publicIp) !== "public") return "public_required";
  const s = scope(wan);
  if (s !== "public") return s;
  return wan === publicIp ? "same" : "different";
}
