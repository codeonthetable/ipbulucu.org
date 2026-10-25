import { calculateIpFormats } from './ip-formats';

export function candidateAddress(candidate: {address?: string | null; candidate: string}): string | null {
  const address = candidate.address || candidate.candidate.trim().split(/\s+/)[4];
  return address && calculateIpFormats(address) ? address : null;
}

export function isPublicCandidate(address: string): boolean {
  const parsed = calculateIpFormats(address);
  if (!parsed) return false;
  if (address.includes(':')) {
    // Only ordinary global unicast; mapped/local/transition addresses are inconclusive.
    const [first,second] = parsed.expanded!.split(':').map(x=>parseInt(x,16));
    return first >= 0x2000 && first <= 0x3fff && !(first===0x2001 && (second===0 || second===0xdb8)) && first!==0x2002;
  }
  const [a,b,c] = address.split('.').map(Number);
  return a > 0 && a < 224 && a !== 10 && a !== 127 && !(a===169&&b===254) && !(a===172&&b>=16&&b<=31) && !(a===192&&b===168) && !(a===100&&b>=64&&b<=127) && !(a===198&&(b===18||b===19)) && !(a===192&&b===0&&(c===0||c===2)) && !(a===198&&b===51&&c===100) && !(a===203&&b===0&&c===113);
}

export function sameIp(a: string, b: string): boolean {
  const x=calculateIpFormats(a), y=calculateIpFormats(b);
  return !!x && !!y && x.version===y.version && x.decimal===y.decimal;
}
