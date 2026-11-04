# ipbulucu — Node.js SDK

CommonJS client for the [IPBulucu API](https://ipbulucu.org/en/api-docs/): `getIp`, `getWhois` and `checkPort`. Requires Node.js 18+ with built-in `fetch`.

## Release status

Version **1.0.1** is distributed as an installable archive in the [GitHub release](https://github.com/codeonthetable/ipbulucu.org/releases/tag/v1.0.1). It adds a 10-second timeout, HTTP status checks and a self-declared SDK client header. npm still lists **1.0.0** as checked on 4 November 2026; a plain `npm install ipbulucu` does not install this release.

```bash
npm install https://github.com/codeonthetable/ipbulucu.org/releases/download/v1.0.1/ipbulucu-1.0.1.tgz
```

The release includes SHA256SUMS for artifact verification. No API key is needed. [Direct REST examples](https://ipbulucu.org/en/api-docs/#quickstart) remain available.

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
