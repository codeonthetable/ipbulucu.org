# ipbulucu — Python SDK

Synchronous `requests` client for the [IPBulucu API](https://ipbulucu.org/en/api-docs/): `get_ip`, `get_whois` `check_port` and `get_dns`. It does not provide a CLI or async API.

## Installation

Install the official SDK from PyPI. Requests use a ten-second timeout and check the HTTP status. No API key is required.

```bash
python -m pip install ipbulucu
```

## Example

This performs one request, without retries.

```python
import ipbulucu
import requests

try:
    # Omit the argument for this server's egress IP, not an end user's IP.
    result = ipbulucu.get_ip()
    if result.get("success") is not True:
        raise ValueError("Lookup failed")
    print("Approximate location available" if result.get("geoStatus") == "available"
          else "Location unavailable; keep fields unknown")
except (requests.RequestException, ValueError):
    print("Lookup failed; no automatic retry")
    raise SystemExit(1)
```

Location fields can be null. VPN, identity, CGNAT, speed and reputation are not measured. HTTP success does not establish complete data. Respect HTTP 429 and `Retry-After`. Keep lookup inputs and raw responses out of logs and analytics.

For `check_port(host, port)`, use only authorized targets and read `status` (`open`, `closed`, `filtered`, `unavailable`) and `partial`. A timeout is inconclusive. `get_whois(domain)` returns RDAP data where provider coverage exists.

## DNS lookup

Pass a domain name in ASCII or Punycode. Read the status for each of A, AAAA, MX, TXT, NS, CNAME and SOA alongside its records. The source and UTC check time describe the observation from the IPBulucu server. An HTTP error means the result was unavailable.

```python
from ipbulucu import get_dns

result = get_dns("example.com")
print(result["source"], result["checkedAt"], result["statuses"]["MX"])
```
