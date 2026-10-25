const BASE_URL = "https://ipbulucu.org/api";

async function request(url) {
  const response = await fetch(url, {headers: {"X-IPBulucu-Client":"node-sdk"}, signal: AbortSignal.timeout(10000)});
  if (!response.ok) throw new Error(`IPBulucu HTTP ${response.status}`);
  return response;
}

async function getIp(targetIp = "") {
  const url = targetIp ? `${BASE_URL}/ip?ip=${encodeURIComponent(targetIp)}&format=json` : `${BASE_URL}/ip?format=json`;
  const res = await request(url);
  return res.json();
}

async function getWhois(domain) {
  const res = await request(`${BASE_URL}/whois?domain=${encodeURIComponent(domain)}`);
  return res.json();
}

async function checkPort(host, port = 80) {
  const res = await request(`${BASE_URL}/port?host=${encodeURIComponent(host)}&port=${port}`);
  return res.json();
}

module.exports = { getIp, getWhois, checkPort };
