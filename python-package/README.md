# ipbulucu - Official Python SDK

Official Python library for querying [ipbulucu.org](https://ipbulucu.org) Network & IP Intelligence API.

## Installation
```bash
pip install ipbulucu
```

## Quick Example
```python
import ipbulucu

# 1. IP Lookup
info = ipbulucu.get_ip("1.1.1.1")
print(f"City: {info.get('city')}, ISP: {info.get('isp')}")

# 2. Whois Lookup
whois = ipbulucu.get_whois("example.com")
print(f"Registrar: {whois.get('registrar')}")
```

Location fields can be null. Check `geoStatus` before interpreting them. VPN, speed, identity, CGNAT and reputation are not measured. Version 1.0.1 has a 10 second timeout and a self-declared SDK client header.
