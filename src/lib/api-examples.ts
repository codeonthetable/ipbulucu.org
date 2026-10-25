// These exact snippets are executed with local fixtures by tests/api-examples.mjs.
// Direct REST examples are independent of registry SDK release versions.
export const apiExamples = {
  curl: `# One request. Plain text skips the geolocation provider.
# Keep the value in memory; do not put it in analytics or logs.
if public_ip=$(curl --fail --silent --show-error \\
  --connect-timeout 5 --max-time 10 \\
  'https://ipbulucu.org/api/ip?format=text'); then
  printf 'Public IP received.\\n'
else
  printf 'Lookup failed; no automatic retry.\\n' >&2
fi`,
  nodejs: `// Node.js 18+; save as lookup.cjs and run: node lookup.cjs
// No package install required. One request, no automatic retry.
async function getIp(targetIp = "") {
  const url = new URL("https://ipbulucu.org/api/ip");
  url.searchParams.set("format", "json");
  if (targetIp) url.searchParams.set("ip", targetIp);

  let response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  } catch {
    throw new Error("Network request failed or timed out");
  }
  if (response.status === 429) {
    throw new Error("HTTP 429: wait for Retry-After before another request");
  }
  if (!response.ok) throw new Error("HTTP " + response.status);

  let data;
  try { data = await response.json(); }
  catch { throw new Error("Invalid or incomplete JSON response"); }
  if (!data || typeof data !== "object" || Array.isArray(data) ||
      data.success !== true || typeof data.ip !== "string") {
    throw new Error("API did not return a successful IP lookup");
  }
  return data;
}

async function main() {
  try {
    // With no argument this is the server's egress IP, not an end user's IP.
    const data = await getIp();
    // Keep raw fields in your application; log only a fixed status label.
    console.log(data.geoStatus === "available" && data.partial !== true
      ? "IP and approximate location available"
      : "IP available; location incomplete or unavailable");
  } catch {
    // Do not log the URL, input, raw response or error from your own wrapper.
    console.error("Lookup failed; no automatic retry");
    process.exitCode = 1;
  }
}
main();`,
  python: `# Python 3; install dependency: python -m pip install requests
# Save as lookup.py and run: python lookup.py
import requests

def get_ip(target_ip=None):
    params = {"format": "json"}
    if target_ip:
        params["ip"] = target_ip
    try:
        response = requests.get(
            "https://ipbulucu.org/api/ip", params=params, timeout=(5, 10)
        )
    except requests.RequestException:
        raise RuntimeError("Network request failed or timed out") from None
    if response.status_code == 429:
        raise RuntimeError("HTTP 429: wait for Retry-After before another request")
    if not 200 <= response.status_code < 300:
        raise RuntimeError("HTTP " + str(response.status_code))
    try:
        data = response.json()
    except ValueError:
        raise RuntimeError("Invalid JSON response") from None
    if not isinstance(data, dict) or data.get("success") is not True or not isinstance(data.get("ip"), str):
        raise RuntimeError("API did not return a successful IP lookup")
    return data

def main():
    try:
        # No argument: the server's egress IP, not an end user's IP.
        data = get_ip()
        # Fixed labels only; no lookup input or response values in logs.
        if data.get("geoStatus") == "available" and data.get("partial") is not True:
            print("IP and approximate location available")
        else:
            print("IP available; location incomplete or unavailable")
    except RuntimeError:
        print("Lookup failed; no automatic retry")
        raise SystemExit(1)

if __name__ == "__main__":
    main()`,
};

export type ApiExample = keyof typeof apiExamples;
