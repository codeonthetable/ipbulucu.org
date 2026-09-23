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
info = ipbulucu.get_ip("81.213.153.20")
print(f"City: {info.get('city')}, ISP: {info.get('isp')}")

# 2. Whois Lookup
whois = ipbulucu.get_whois("turktelekom.com.tr")
print(f"Registrar: {whois.get('registrar')}")
```
