export type IpFormats = {
  version: "IPv4" | "IPv6";
  decimal: string;
  hex: string;
  binary: string;
  reverseDns: string;
  expanded?: string;
  dottedHex?: string;
  octal?: string;
};

function ipv4Octets(ip: string): number[] | null {
  const parts = ip.split(".");
  if (parts.length !== 4 || parts.some(part => !/^(0|[1-9]\d{0,2})$/.test(part) || Number(part) > 255)) return null;
  return parts.map(Number);
}

// Local arithmetic only. The reverse name is a DNS query name, not a resolved PTR record.
export function calculateIpFormats(ip: string): IpFormats | null {
  const octets = ipv4Octets(ip);
  if (octets) {
    const value = octets.reduce((sum, part) => sum * 256 + part, 0);
    return {
      version: "IPv4",
      decimal: String(value),
      hex: "0x" + value.toString(16).padStart(8, "0"),
      dottedHex: octets.map(part => "0x" + part.toString(16).padStart(2, "0")).join("."),
      octal: octets.map(part => "0" + part.toString(8).padStart(3, "0")).join("."),
      binary: octets.map(part => part.toString(2).padStart(8, "0")).join("."),
      reverseDns: [...octets].reverse().join(".") + ".in-addr.arpa",
    };
  }
  if (!ip.includes(":") || /[^0-9a-f:.]/i.test(ip)) return null;
  let address = ip.toLowerCase();
  // IPv4 can occupy the final 32 bits of IPv6 (for example ::ffff:192.0.2.1).
  if (address.includes(".")) {
    const lastColon = address.lastIndexOf(":");
    const tail = ipv4Octets(address.slice(lastColon + 1));
    if (!tail) return null;
    address = address.slice(0, lastColon + 1) + (tail[0] * 256 + tail[1]).toString(16) + ":" + (tail[2] * 256 + tail[3]).toString(16);
  }
  const halves = address.split("::");
  if (halves.length > 2) return null;
  const left = halves[0] ? halves[0].split(":") : [];
  const right = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const explicit = [...left, ...right];
  if (explicit.some(group => !/^[0-9a-f]{1,4}$/.test(group))) return null;
  if (halves.length === 1 ? left.length !== 8 : explicit.length >= 8) return null;
  const groups = halves.length === 2 ? [...left, ...Array(8 - explicit.length).fill("0"), ...right] : left;
  const expanded = groups.map(group => group.padStart(4, "0")).join(":");
  const hex = expanded.replaceAll(":", "");
  const value = BigInt("0x" + hex);
  return {
    version: "IPv6",
    decimal: value.toString(),
    hex: "0x" + hex,
    expanded,
    binary: groups.map(group => parseInt(group, 16).toString(2).padStart(16, "0")).join(":"),
    reverseDns: [...hex].reverse().join(".") + ".ip6.arpa",
  };
}
