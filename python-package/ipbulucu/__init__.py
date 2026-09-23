import requests

BASE_URL = "https://ipbulucu.org/api"

def get_ip(ip=None):
    """Retrieve IP intelligence data."""
    params = {"format": "json"}
    if ip:
        params["ip"] = ip
    resp = requests.get(f"{BASE_URL}/ip", params=params, timeout=5)
    return resp.json()

def get_whois(domain):
    """Query TRABIS / Universal Whois."""
    resp = requests.get(f"{BASE_URL}/whois", params={"domain": domain}, timeout=5)
    return resp.json()

def check_port(host, port=80):
    """Test remote port availability."""
    resp = requests.get(f"{BASE_URL}/port", params={"host": host, "port": port}, timeout=5)
    return resp.json()
