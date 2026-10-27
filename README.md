# IPBulucu

[Website](https://ipbulucu.org/) · [Türkçe API rehberi](https://ipbulucu.org/api-dokumantasyon/#quickstart) · [English API guide](https://ipbulucu.org/en/api-docs/#quickstart) · [OpenAPI](https://ipbulucu.org/openapi.json)

Turkish and English public IP lookup and network tools. The website is a Next.js static export; PHP endpoints are hosted separately under `/api/`. Distribution folders contain the Chrome extension, Node SDK and Python SDK. Source changes are not automatically deployed or published.

## Result limits

IP geolocation is approximate and supplied by ipwho.is. Missing provider data is explicit (`geoStatus=unavailable`). VPN, CGNAT, connection speed, identity, risk and game latency are not measured by the IP endpoint. IP monitoring runs only in an open browser tab. Server alerts are unavailable.

## Choose an integration

No API key is required. Use the [REST quickstart](https://ipbulucu.org/en/api-docs/#quickstart) for explicit timeouts, HTTP status checks and examples that handle unavailable geolocation. Requests without an IP argument describe the calling machine's public egress address; a backend call does not discover an end user's address.

As checked on **27 October 2026**, npm and PyPI publish **1.0.0**. The **1.0.1** sources in this repository are prepared, not published.

| Client | Published 1.0.0 | Prepared 1.0.1 |
| --- | --- | --- |
| [Node.js SDK](npm-package/README.md) | No built-in timeout or HTTP status check | 10-second timeout and HTTP status checks |
| [Python SDK](python-package/README.md) | 5-second timeout; no HTTP status check | 10-second timeout and HTTP status checks |

Both published SDKs parse JSON on HTTP error responses and do not send the SDK client header added in 1.0.1. Check the returned `success` field and catch request/JSON errors. Use direct REST when you need access to response status and `Retry-After`; do not retry automatically. Package downloads and self-declared client headers do not establish human or AI usage.

## Node.js 18+

```bash
npm install ipbulucu@1.0.0
```

Save as `lookup.cjs`, then run `node lookup.cjs`. This makes one request; the published SDK has no built-in timeout.

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
python -m pip install ipbulucu==1.0.0
```

Save as `lookup.py`, then run `python lookup.py`. This makes one request with the published SDK's five-second timeout.

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
