const message = (key) => chrome.i18n.getMessage(key);
const byId = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", async () => {
  const language = message("language");
  document.documentElement.lang = language;
  byId("version").textContent = "v" + chrome.runtime.getManifest().version;
  byId("loading").textContent = message("loading");
  byId("ip-label").textContent = message("ipLabel");
  byId("copy-ip").textContent = message("copyIp");
  byId("notice").textContent = message("notice");

  const tools = byId("tools");
  const destination = new URL(language === "tr" ? "/" : "/en/", "https://ipbulucu.org");
  destination.search = "utm_source=chrome_extension&utm_medium=referral&utm_campaign=extension";
  tools.href = destination.href;
  tools.textContent = message("openTools");

  try {
    const response = await fetch("https://ipbulucu.org/api/ip?format=json", {
      headers: { "X-IPBulucu-Client": "chrome-extension", "X-IPBulucu-Action": "user" },
      cache: "no-store",
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) throw new Error("Lookup failed");
    const data = await response.json();
    if (data.success === false || typeof data.ip !== "string" || !data.ip.trim()) {
      throw new Error("Missing IP address");
    }

    const address = data.ip.trim();
    byId("ip").textContent = address;
    byId("location").textContent = [data.city, data.country].filter(Boolean).join(", ") || message("noLocation");
    byId("provider").textContent = data.isp || message("noProvider");
    byId("copy-ip").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(address);
        byId("copy-status").textContent = message("copied");
      } catch {
        byId("copy-status").textContent = message("copyFailed");
      }
    });
    byId("result").hidden = false;
    byId("loading").hidden = true;
  } catch {
    byId("loading").textContent = message("lookupError");
  }
});
