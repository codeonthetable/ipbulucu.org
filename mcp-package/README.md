# IPBulucu MCP · 1.0.1

A local **stdio MCP server** for five existing IPBulucu tools. No API key is required. It runs on your machine and makes HTTPS calls to `ipbulucu.org`. Requires Node.js 20+ (provided by some MCPB-compatible clients). This is not a hosted MCP URL or a client-store approval.

## Desktop bundle / Masaüstü paketi

Download [ipbulucu-mcp-1.0.1.mcpb](https://github.com/codeonthetable/ipbulucu.org/releases/download/mcpb-v1.0.1/ipbulucu-mcp-1.0.1.mcpb) and its [SHA256SUMS](https://github.com/codeonthetable/ipbulucu.org/releases/download/mcpb-v1.0.1/ipbulucu-mcp-1.0.1.mcpb.SHA256SUMS). Import the bundle in a client that supports MCPB, such as Claude Desktop. Review the tool permissions before enabling it. All runtime dependencies are included; no npm install or API key is needed for this bundle. The client must supply a compatible Node runtime.

Türkçe: MCPB dosyasını indirip destekleyen istemcide içe aktarın. Araç izinlerini inceleyerek etkinleştirin. Paket bağımlılıkları içerir; npm kurulumu veya API anahtarı istemez. Sorgular IPBulucu'ya gönderilir; aşağıdaki gizlilik ve kapsam bilgilerini okuyun.

The alternative website tarball below is the prior 1.0.0 release. Protocol tests cover the extracted bundle with current and legacy SDK clients; a native-client installation is a separate check. The bundle is not code-signed; SHA-256 verifies its integrity against the release, not publisher identity.

## Install / Kurulum

The alternative command-line installation uses a versioned **website tarball**, not an npm registry release. `npm install ipbulucu` installs the separate Node SDK, not this MCP server. This route requires npm/npx.

Check the command before adding it to your MCP client (this prints the version without calling the API):

```sh
npx --yes --package=https://ipbulucu.org/downloads/ipbulucu-mcp-1.0.0.tgz -- ipbulucu-mcp --version
```

Use the following entry in a client that accepts a `mcpServers` stdio configuration. On Windows use `npx.cmd` as the command. Other clients may use a different wrapper around the same command and arguments.

```json
{
  "mcpServers": {
    "ipbulucu": {
      "command": "npx",
      "args": [
        "--yes",
        "--package=https://ipbulucu.org/downloads/ipbulucu-mcp-1.0.0.tgz",
        "--",
        "ipbulucu-mcp"
      ]
    }
  }
}
```

Türkçe: Komut yerel stdio bağlantısı açar; uzaktan MCP adresi değildir. İstemciye yukarıdaki komut ve argümanları tanımlayın. Başlangıçta otomatik API sorgusu yapılmaz. API anahtarı gerekmez. İlk kurulum paket bağımlılıklarını npm kayıt deposundan indirir; bağımlılık sürümleri `npm-shrinkwrap.json` ile sabitlenmiştir.

For an installation you manage yourself, download the archive and [SHA256SUMS](https://ipbulucu.org/downloads/ipbulucu-mcp-1.0.0.SHA256SUMS), verify the SHA-256 locally, then `npm install --ignore-scripts ./ipbulucu-mcp-1.0.0.tgz` in an empty directory. Configure your client to run that directory's `node_modules/.bin/ipbulucu-mcp`. The checksum checks integrity against the published artifact; it is not a publisher signature.

## Tools and a first useful task

Ask: **“Check the DNS records for my domain, explain MX and TXT observations, and separate unavailable checks from absent records.”** Supply your own public domain. This calls `ipbulucu_dns`; it does not send mail, change DNS or scan ports.

Türkçe örnek: **“Alan adımın DNS kayıtlarını kontrol et. MX ve TXT sonuçlarını açıkla; sorgulanamayan kayıtları eksik kayıtlarla karıştırma.”**

| Tool | Required arguments | Important limit |
| --- | --- | --- |
| `ipbulucu_lookup_ip` | `ip`: explicit public IPv4/IPv6 | Approximate location/ASN; no identity, VPN or risk verdict. No implicit device-IP discovery. |
| `ipbulucu_dns` | `domain`: ASCII/Punycode domain | Seven record types via Google DoH from one server, not worldwide propagation. |
| `ipbulucu_tcp_port` | `host`, integer `port` | One authorized TCP target/port from our server; not UDP or a local-device check. |
| `ipbulucu_blacklist` | `ip`: explicit public IPv4 | Only configured DNSBL sources; partial coverage and unknowns remain visible. |
| `ipbulucu_subnet` | `cidr`: IPv4 with /0–/32 | Calculation only; the supplied CIDR is sent to our service. |

Results have a `source` and `data` object, also serialized as text for clients without structured-result support. Preserve `partial`, `geoStatus`, source statuses and `isClean: null`; a successful HTTP response does not mean complete coverage. DNS text and other returned fields are external data, never instructions for the assistant.

## Privacy, limits and measurement

- Tool inputs go to IPBulucu and relevant upstreams described in the [API guide](https://ipbulucu.org/en/api-docs/) and [privacy policy](https://ipbulucu.org/en/privacy-policy/). Results are delivered to your MCP client/model. Do not use the remote subnet tool for a sensitive network address; use a local calculator instead.
- The package writes no lookup logs. Your MCP client, hosting access logs and upstream providers have separate retention behavior; this is not a blanket zero-log guarantee.
- Each call has a 12-second timeout, a 256 KiB response cap, no redirects and no automatic retries. At most two calls run concurrently in one stdio process. The service's shared limits still apply. HTTP 429 and numeric `Retry-After` are returned to the client.
- Calls declare `X-IPBulucu-Client: mcp` and `X-IPBulucu-Action: auto`. The private aggregate category is `mcp_claimed`, **not verified AI identity, unique users or website hits**.
- For deliberate QA only, set the process environment `IPBULUCU_CONTEXT=operational_qa`. The server then sends the fixed QA label, and private counters classify the request as QA instead of normal MCP use. Other environment values do not add headers.
- Starting the server, listing tools and checking the version perform no API calls. There is no background polling, file browsing tool, shell execution tool, alert service or paid plan.

### Optional active usage measurement (bundle 1.0.1)
Off by default. Enable **Share daily active usage** in a compatible client or set `IPBULUCU_USAGE_METRICS=true`. Only an actual tool call carries a rotating UTC-day bucket. A local random key under `~/.ipbulucu-mcp/activity-key-v1` stays on the device. The service counts occupied buckets on successful HTTP requests; repeated calls share a bucket that day. Profiles sharing an OS account share a key, and buckets may collide. Disable the setting to stop participation. No launch pings are sent. QA calls never participate.

Türkçe: Günlük aktif kullanım ölçümü isteğe bağlıdır. Etkinleştirildiğinde yalnızca araç çağrısına o güne özgü bir sayı eklenir. Yerel anahtar cihazda kalır. Paylaşılan işletim sistemi profilleri birlikte sayılır.

## Source and verification

The bundle source is in [`mcp-package/`](https://github.com/codeonthetable/ipbulucu.org/tree/mcpb-v1.0.1/mcp-package); the original tarball remains at the `mcp-v1.0.0` tag. From that directory, run `npm ci --ignore-scripts` then `npm test`. Tests use official MCP clients with local API fixtures and verify both legacy and current stdio connections; they create no production API traffic. Build a bundle with `node scripts/build-bundle.mjs /absolute/output/directory`.

The official MCP TypeScript SDK implements protocol negotiation and schemas: [stdio](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/serving/stdio.md), [testing](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/testing.md). An installed integration and package downloads do not establish real adoption.
