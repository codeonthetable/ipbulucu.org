# IPBulucu

[Website](https://ipbulucu.org/) · [Türkçe API rehberi](https://ipbulucu.org/api-dokumantasyon/#quickstart) · [English API guide](https://ipbulucu.org/en/api-docs/#quickstart) · [OpenAPI](https://ipbulucu.org/openapi.json)

Turkish and English public IP lookup and network tools. The website is a Next.js static export; PHP endpoints are hosted separately under `/api/`. Distribution folders contain the Chrome extension, Node SDK and Python SDK. Source changes are not automatically deployed or published.

## Browser lookup and support material

To check the network serving a website, enter its domain in the [browser lookup](https://ipbulucu.org/ip-sorgulama/). For a help desk or classroom, the [Turkish IP address worksheet](docs/ip-adresi-uygulamasi.md) includes a before-and-after connection check, an exercise with an answer key, and wording you can reuse in a support article.

## Result limits

IP geolocation is approximate and supplied by ipwho.is. Missing provider data is explicit (`geoStatus=unavailable`). VPN, CGNAT, connection speed, identity, risk and game latency are not measured by the IP endpoint. IP monitoring runs only in an open browser tab. Server alerts are unavailable.

## Use IP Bulucu in Chrome

[Install IP Bulucu from the Chrome Web Store](https://chromewebstore.google.com/detail/nifmmckmhnfjmpjfakhkifbeegdnanpb) to check your public IP, approximate location and internet provider from the toolbar. For pinning instructions or browser-based DNS, port and blocklist tools, see the [English guide](https://ipbulucu.org/en/chrome-extension/) or [Türkçe kurulum rehberi](https://ipbulucu.org/chrome-eklentisi/).

## Choose an integration

**Ready-to-run MCP:** [IPBulucu MCP 1.0.1](mcp-package/README.md) connects IP, DNS, TCP, DNSBL and subnet tools to a local stdio MCP client. Download the [desktop MCPB bundle](https://github.com/codeonthetable/ipbulucu.org/releases/tag/mcpb-v1.0.1) with its dependencies included, or use the versioned website tarball and npx configuration. Both distributions are separate from the npm SDK. No API key; no automatic queries on startup. MCP-declared requests, QA and website traffic are counted separately.

No API key is required. Use the [REST quickstart](https://ipbulucu.org/en/api-docs/#quickstart) for explicit timeouts, HTTP status checks and examples that handle unavailable geolocation. Requests without an IP argument describe the calling machine's public egress address; a backend call does not discover an end user's address.

Install the [Node.js SDK](https://www.npmjs.com/package/ipbulucu) with `npm install ipbulucu` or the [Python SDK](https://pypi.org/project/ipbulucu/) with `python -m pip install ipbulucu`. Both clients check HTTP status and set a ten-second timeout.

## Node.js 18+

```bash
npm install ipbulucu
```

Save as `lookup.cjs`, then run `node lookup.cjs`. This makes one request with a ten-second timeout and no automatic retry.

```js
const { getIp } = require('ipbulucu');
async function main() {
  try {
    const info = await getIp();
    if (info?.success !== true) throw new Error('Lookup failed');
    console.log(info.geoStatus === 'available'
      ? 'Approximate location available'
      : 'Location unavailable; keep fields unknown');
  } catch {
    console.error('Lookup failed; no automatic retry');
    process.exitCode = 1;
  }
}
main();
```

## Python

```bash
python -m pip install ipbulucu
```

Save as `lookup.py`, then run `python lookup.py`. This makes one request with the published SDK's ten-second timeout.

```python
import ipbulucu
import requests

try:
    info = ipbulucu.get_ip()
    if not isinstance(info, dict) or info.get('success') is not True:
        raise ValueError('Lookup failed')
    print('Approximate location available' if info.get('geoStatus') == 'available'
          else 'Location unavailable; keep fields unknown')
except (requests.RequestException, ValueError):
    print('Lookup failed; no automatic retry')
    raise SystemExit(1)
```

These examples print only a status summary. Keep lookup inputs and raw responses out of logs and analytics. See the linked SDK guides for WHOIS and authorized TCP port checks; see the REST guide for all supported endpoints.

## Development and release

Run `npm ci` then `npm run build`. The `out/` directory contains static pages. A PHP-capable host and rewrite configuration are required for APIs; `next start` cannot serve this static export. Keep credentials outside source control. Build finalization and source checks are in `scripts/` and `tests/`. Hosting release tooling and analytics reports are kept outside the public source history.

## Measurement and privacy

Google Analytics measures website visits and tool events. Optional PHP counters aggregate endpoint, declared client category, action and HTTP status class by UTC day. They do not identify unique humans or authenticate AI agents. They are disabled until a writable `ipbulucu-metrics` directory is provisioned beside the document root, or `IPBULUCU_METRICS_DIR` points to another private directory outside it. No raw IP, query or user-agent string is written by these counters. Hosting access logs and third-party processing must be assessed separately; there is no blanket zero-log guarantee.

[Privacy information](https://ipbulucu.org/gizlilik-politikasi/) · [MIT license](LICENSE)

Network diagnostic endpoints require the private writable budget directory described above; without it they return HTTP 429. Current shared limits are 120 tool requests/minute, 20 port checks/minute, at most 16 TCP ports and six seconds per port batch, and 850 geolocation provider calls/day. Text IP discovery does not consume geolocation calls. DNS comparison uses two resolvers from one server, not worldwide propagation coverage.
