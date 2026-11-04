# ipbulucu — Python SDK

Synchronous `requests` client for the [IPBulucu API](https://ipbulucu.org/en/api-docs/): `get_ip`, `get_whois` and `check_port`. It does not provide a CLI or async API.

## Release status

Version **1.0.1** is distributed as a wheel and source archive in the [GitHub release](https://github.com/codeonthetable/ipbulucu.org/releases/tag/v1.0.1). It adds HTTP status checks, a 10-second timeout and a self-declared SDK client header. PyPI still lists **1.0.0** as checked on 4 November 2026; a plain `pip install ipbulucu` does not install this release.

```bash
python -m pip install https://github.com/codeonthetable/ipbulucu.org/releases/download/v1.0.1/ipbulucu-1.0.1-py3-none-any.whl
```

The release includes SHA256SUMS for artifact verification. No API key is needed. [Direct REST examples](https://ipbulucu.org/en/api-docs/#quickstart) remain available.

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
