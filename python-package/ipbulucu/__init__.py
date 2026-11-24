import re

import requests

BASE_URL = "https://ipbulucu.org/api"

def get_ip(ip=None):
    """Retrieve IP intelligence data."""
    params = {"format": "json"}
    if ip:
        params["ip"] = ip
    resp = requests.get(f"{BASE_URL}/ip", params=params, timeout=10, headers={"X-IPBulucu-Client": "python-sdk"})
    resp.raise_for_status()
    return resp.json()

def get_whois(domain):
    """Query registry RDAP data where supported."""
    resp = requests.get(f"{BASE_URL}/whois", params={"domain": domain}, timeout=10, headers={"X-IPBulucu-Client": "python-sdk"})
    resp.raise_for_status()
    return resp.json()

def check_port(host, port=80):
    """Test remote port availability."""
    resp = requests.get(f"{BASE_URL}/port", params={"host": host, "port": port}, timeout=10, headers={"X-IPBulucu-Client": "python-sdk"})
    resp.raise_for_status()
    return resp.json()

def get_dns(domain):
    """Return records and resolver statuses for a dotted ASCII/Punycode hostname."""
    if not isinstance(domain, str):
        raise TypeError("Expected a domain name as a string.")
    host = domain.strip()
    if host.endswith("."):
        host = host[:-1]
    labels = host.split(".")
    if (len(host) > 253 or len(labels) < 2 or labels[-1].isdigit() or
            not all(re.fullmatch(r"[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?", label)
                    for label in labels)):
        raise ValueError("Expected a DNS domain name in ASCII or Punycode.")
    resp = requests.get(f"{BASE_URL}/dns", params={"host": host.lower()}, timeout=10,
                        headers={"X-IPBulucu-Client": "python-sdk"})
    resp.raise_for_status()
    return resp.json()
