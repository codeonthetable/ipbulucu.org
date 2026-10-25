# IPBulucu

[Website](https://ipbulucu.org) · [API documentation](https://ipbulucu.org/api-dokumantasyon/) · [OpenAPI](https://ipbulucu.org/openapi.json)

Turkish and English public IP lookup and network tools. The website is a Next.js static export; PHP endpoints are hosted separately under `/api/`. Distribution folders contain the Chrome extension, Node SDK and Python SDK. Source changes are not automatically deployed or published.

## Result limits

IP geolocation is approximate and supplied by ipwho.is. Missing provider data is explicit (`geoStatus=unavailable`). VPN, CGNAT, connection speed, identity, risk and game latency are not measured by the IP endpoint. IP monitoring runs only in an open browser tab. Server alerts are unavailable.

## Node.js 18+

```js
const { getIp, getWhois, checkPort } = require('ipbulucu');
(async () => {
  const info = await getIp('1.1.1.1');
  console.log(info.ip, info.geoStatus, info.isp);
})();
```

## Python

```python
import ipbulucu
info = ipbulucu.get_ip('1.1.1.1')
print(info['ip'], info.get('geoStatus'))
```

## Development and release

Run `npm ci` then `npm run build`. The `out/` directory contains static pages. A PHP-capable host and rewrite configuration are required for APIs; `next start` cannot serve this static export. Keep credentials outside source control. Build finalization and source checks are in `scripts/` and `tests/`. Hosting release tooling and analytics reports are kept outside the public source history.

## Measurement and privacy

Google Analytics measures website visits and tool events. Optional PHP counters aggregate endpoint, declared client category, action and HTTP status class by UTC day. They do not identify unique humans or authenticate AI agents. They are disabled until a writable `ipbulucu-metrics` directory is provisioned beside the document root, or `IPBULUCU_METRICS_DIR` points to another private directory outside it. No raw IP, query or user-agent string is written by these counters. Hosting access logs and third-party processing must be assessed separately; there is no blanket zero-log guarantee.

[Privacy information](https://ipbulucu.org/gizlilik-politikasi/) · [MIT license](LICENSE)

Network diagnostic endpoints require the private writable budget directory described above; without it they return HTTP 429. Current shared limits are 120 tool requests/minute, 20 port checks/minute, at most 16 TCP ports and six seconds per port batch, and 850 geolocation provider calls/day. Text IP discovery does not consume geolocation calls. DNS comparison uses two resolvers from one server, not worldwide propagation coverage.
