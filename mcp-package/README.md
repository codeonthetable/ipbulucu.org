# IPBulucu MCP · 1.0.0

A local **stdio MCP server** for five existing IPBulucu tools. No API key is required. It runs on your machine and makes HTTPS calls to `ipbulucu.org`; it is not a hosted MCP URL or an approved AI-directory listing. Requires Node.js 20+ and npm/npx.

## Install / Kurulum

This version is distributed as a versioned **website tarball**, not an npm registry release. `npm install ipbulucu` installs the separate Node SDK, not this MCP server.

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
- This package writes no lookup logs or files. Your MCP client, hosting access logs and upstream providers have separate retention behavior; this is not a blanket zero-log guarantee.
- Each call has a 12-second timeout, a 256 KiB response cap, no redirects and no automatic retries. At most two calls run concurrently in one stdio process. The service's shared limits still apply. HTTP 429 and numeric `Retry-After` are returned to the client.
- Calls declare `X-IPBulucu-Client: mcp` and `X-IPBulucu-Action: auto`. The private aggregate category is `mcp_claimed`, **not verified AI identity, unique users or website hits**.
- For deliberate QA only, set the process environment `IPBULUCU_CONTEXT=operational_qa`. The server then sends the fixed QA label, and private counters classify the request as QA instead of normal MCP use. Other environment values do not add headers.
- Starting the server, listing tools and checking the version perform no API calls. There is no background polling, local file access, shell execution tool, alert service or paid plan.

## Source and verification

The source is in [`mcp-package/`](https://github.com/codeonthetable/ipbulucu.org/tree/mcp-v1.0.0/mcp-package). From that directory, run `npm ci --ignore-scripts` then `npm test`. Tests use official MCP clients with local API fixtures and verify both legacy and current stdio connections; they create no production API traffic.

The official MCP TypeScript SDK implements protocol negotiation and schemas: [stdio](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/serving/stdio.md), [testing](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/testing.md). An installed integration and package downloads do not establish real adoption.
