// Fixed labels only: never include lookup values, IPs, tokens, or webhook URLs.
import { calculateIpFormats } from "./ip-formats";
function usageContext() {
  const telemetry = (window as unknown as {ipbulucuTelemetry?: {context: () => string}}).ipbulucuTelemetry;
  return telemetry?.context() === "operational_qa" || new URLSearchParams(window.location.search).get("utm_medium") === "internal" ? "operational_qa" : "unclassified";
}
export function usageEvent(name: string, fields: Record<string, string | number>) {
  if (typeof window === "undefined" || !["ipbulucu.org", "www.ipbulucu.org"].includes(window.location.hostname)) return;
  (window as unknown as {gtag?: (...args: unknown[]) => void}).gtag?.("event", name, {...fields, usage_context: usageContext()});
}
export async function toolFetch(input: RequestInfo | URL, init?: RequestInit, interaction: "auto" | "user" | "unspecified" = "unspecified") {
  const url = new URL(typeof input === "string" ? input : input instanceof URL ? input.href : input.url, window.location.origin);
  if (url.origin !== window.location.origin || !url.pathname.startsWith("/api/")) return fetch(input, init);
  const tool = url.pathname.split("/")[2]?.replace(/\.php$/, "") || "unknown";
  if (!["ip","dns","whois","ssl","headers","port","blacklist","propagation","email-security","subnet","watch"].includes(tool)) return fetch(input, init);
  const fields = {tool_name:tool,interaction,language:window.location.pathname.startsWith("/en")?"en":"tr"};
  const headers = new Headers(init?.headers); headers.set("X-IPBulucu-Client","web"); headers.set("X-IPBulucu-Action",interaction);
  headers.set("X-IPBulucu-Context", usageContext());
  const start = performance.now(); usageEvent("tool_request",fields);
  try {
    const response = await fetch(input,{...init,headers});
    let outcome = response.ok ? "http_ok" : "http_error";
    try {
      if (tool === "ip" && url.searchParams.get("format") === "text" && response.ok) {
        const ip = (await response.clone().text()).trim();
        outcome = calculateIpFormats(ip) ? "success" : "invalid_response";
      } else {
      const body = await response.clone().json();
      if (body?.success === false || body?.error) outcome="application_error";
      else if (body?.geoStatus === "unavailable" || body?.partial === true) outcome="partial_result";
      else if (body?.success === true) outcome="success";
      }
    } catch {outcome="invalid_response";}
    usageEvent("tool_result",{...fields,outcome,duration_ms:Math.round(performance.now()-start)});
    return response;
  } catch (error) {usageEvent("tool_result",{...fields,outcome:"network_error"}); throw error;}
}
