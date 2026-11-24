const { isIP } = require("node:net");
const BASE_URL = "https://ipbulucu.org/api";

async function request(endpoint, params) {
  const url = BASE_URL + "/" + endpoint + "?" + new URLSearchParams(params);
  const response = await fetch(url, {
    headers: { "X-IPBulucu-Client": "node-sdk" },
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error(`IPBulucu HTTP ${response.status}`);
  return response.json();
}

function hostArgument(value, allowUrl) {
  const hint = "Expected an IP address or domain as a string.";
  if (typeof value !== "string") throw new TypeError(hint);
  const input = value.trim();
  if (!input || /[\s\\\x00-\x1f\x7f]/.test(input)) throw new TypeError(hint);
  if (isIP(input)) return input;
  let host = input;
  if (allowUrl) {
    let parsed;
    try {
      parsed = new URL(input.includes("://") ? input : "https://" + input);
    } catch {
      throw new TypeError(hint);
    }
    if (!["https:", "http:"].includes(parsed.protocol) || parsed.username || parsed.password)
      throw new TypeError(hint);
    host = parsed.hostname.replace(/^\[|\]$/g, "");
    if (isIP(host)) return input;
  }
  const labels = host.replace(/\.$/, "").split(".");
  if (host.length > 253 || labels.length < 2 ||
      !labels.every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label)))
    throw new TypeError(hint);
  return input;
}

async function getIp(targetIp = "") {
  const params = { format: "json" };
  if (targetIp !== "") params.ip = hostArgument(targetIp, false);
  return request("ip", params);
}

async function getWhois(domain) {
  return request("whois", { domain: hostArgument(domain, true) });
}

async function checkPort(host, port = 80) {
  const target = hostArgument(host, true);
  const ports = Array.isArray(port) ? port : typeof port === "string" ? port.split(",") : [port];
  if (!ports.length || ports.length > 16 || !ports.every(p =>
    (typeof p === "string" || typeof p === "number") && /^\d+$/.test(String(p)) &&
    Number(p) >= 1 && Number(p) <= 65535))
    throw new TypeError("Expected TCP port numbers between 1 and 65535 (up to 16).");
  return request("port", { host: target, port: ports.map(Number).join(",") });
}

module.exports = { getIp, getWhois, checkPort };
