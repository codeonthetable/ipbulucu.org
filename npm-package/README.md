# ipbulucu — Node.js SDK

CommonJS client for the [IPBulucu API](https://ipbulucu.org/en/api-docs/): `getIp`, `getWhois` and `checkPort`. Requires Node.js 18+ with built-in `fetch`.

## Release status

On 25 October 2026 the npm registry lists **1.0.0**. This repository contains **1.0.1**, prepared but not published. Its 10-second timeout and self-declared SDK header are source changes; do not assume they exist in the installed 1.0.0 package. For a bounded request now, use the [direct REST quickstart](https://ipbulucu.org/en/api-docs/#quickstart).

```bash
npm install ipbulucu
```

## CommonJS example

Save as `lookup.cjs`, then run `node lookup.cjs`. This performs one request, without retries.

```javascript
const { getIp } = require("ipbulucu");

async function main() {
  try {
    // Omit the argument for this server's egress IP, not an end user's IP.
    const result = await getIp();
    if (result.success !== true) throw new Error("Lookup failed");
    console.log(result.geoStatus === "available"
      ? "Approximate location available"
      : "Location unavailable; keep fields unknown");
  } catch {
    console.error("Lookup failed; no automatic retry");
    process.exitCode = 1;
  }
}
main();
```

Location fields can be null. VPN, identity, CGNAT, speed and reputation are not measured. HTTP success does not establish complete data. Respect HTTP 429 and `Retry-After`. Keep lookup inputs and raw responses out of logs and analytics.

For `checkPort(host, port)`, use only authorized targets and read `status` (`open`, `closed`, `filtered`, `unavailable`) and `partial`. A timeout is inconclusive. `getWhois(domain)` returns RDAP data where provider coverage exists.
