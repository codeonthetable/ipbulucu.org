# ipbulucu — Python SDK

Synchronous `requests` client for the [IPBulucu API](https://ipbulucu.org/en/api-docs/): `get_ip`, `get_whois` and `check_port`. It does not provide a CLI or async API.

## Release status

On 25 October 2026 PyPI lists **1.0.0**. This repository contains **1.0.1**, prepared but not published. Published 1.0.0 has a five-second timeout but parses JSON without checking the HTTP status. The prepared 1.0.1 adds status checks, a 10-second timeout and a self-declared SDK header. For explicit timeouts and HTTP checks now, use the [direct REST quickstart](https://ipbulucu.org/en/api-docs/#quickstart).

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
