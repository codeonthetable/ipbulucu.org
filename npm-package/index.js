const BASE_URL = "https://ipbulucu.org/api";

async function getIp(targetIp = "") {
  const url = targetIp ? `${BASE_URL}/ip?ip=${encodeURIComponent(targetIp)}&format=json` : `${BASE_URL}/ip?format=json`;
  const res = await fetch(url);
  return res.json();
}

async function getWhois(domain) {
  const res = await fetch(`${BASE_URL}/whois?domain=${encodeURIComponent(domain)}`);
  return res.json();
}

async function checkPort(host, port = 80) {
  const res = await fetch(`${BASE_URL}/port?host=${encodeURIComponent(host)}&port=${port}`);
  return res.json();
}

module.exports = { getIp, getWhois, checkPort };
