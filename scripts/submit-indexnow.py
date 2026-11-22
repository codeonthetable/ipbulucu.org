"""Notify Bing of reviewed content changes, never unchanged daily URL batches.

Default is a dry run. --submit requires a published ownership proof, live canonical
HTML and a local receipt. The receipt stores only URLs and hashes, never the key.
HTTP200 means received, HTTP202 means ownership validation pending, not indexed.
"""
import argparse
from datetime import datetime, timezone
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import urlsplit

import requests

HOST = "https://ipbulucu.org"
ENDPOINT = "https://www.bing.com/indexnow"
PROOF_PATH = "/indexnow-site-verification.txt"


def validate_urls(urls):
    if not isinstance(urls, list) or not 1 <= len(urls) <= 100:
        raise ValueError("Expected1to100reviewed content URLs")
    for url in urls:
        p = urlsplit(url)
        if (p.scheme != "https" or p.netloc != "ipbulucu.org" or p.query or p.fragment
                or not p.path.endswith("/") or p.path.startswith("/api/")
                or not re.fullmatch(r"/[a-z0-9/-]*", p.path)
                or "//" in p.path):
            raise ValueError("Only canonical IPBulucu content URLs without inputs are allowed")
    return list(dict.fromkeys(urls))


class PageMetadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical = None
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href")
        if tag == "meta" and a.get("name", "").lower() in ("robots", "bingbot"):
            self.noindex |= "noindex" in a.get("content", "").lower()


def run(args):
    urls = validate_urls(json.loads(args.urls.read_text()))
    key = args.key_file.read_text().strip()
    if not re.fullmatch(r"[A-Za-z0-9-]{8,128}", key):
        raise ValueError("Invalid proof format")
    session = requests.Session()
    session.headers.update({"User-Agent": "IPBulucu-ReleaseCheck/1.0"})
    proof = session.get(HOST + PROOF_PATH, timeout=20, allow_redirects=False)
    if proof.status_code != 200 or proof.text.strip() != key:
        raise ValueError("Live ownership proof is missing or differs")
    old = json.loads(args.receipt.read_text()) if args.receipt.exists() else {}
    accepted = old.get("accepted_hashes", {})
    pending = {}
    for url in urls:
        page = session.get(url, timeout=20, allow_redirects=False)
        meta = PageMetadata()
        meta.feed(page.text)
        if (page.status_code != 200 or meta.canonical != url or meta.noindex
                or "noindex" in page.headers.get("X-Robots-Tag", "").lower()):
            raise ValueError("Live page must be HTTP200, self-canonical and indexable")
        digest = hashlib.sha256(page.content).hexdigest()
        if accepted.get(url) != digest:
            pending[url] = digest
    report = {"checked_utc": datetime.now(timezone.utc).isoformat(),
              "mode": "submit" if args.submit else "dry_run", "urls": list(pending),
              "unchanged_skipped": len(urls) - len(pending), "received": False,
              "indexing_or_traffic_confirmed": False}
    if args.submit and pending:
        payload = {"host": "ipbulucu.org", "key": key,
                   "keyLocation": HOST + PROOF_PATH, "urlList": list(pending)}
        response = session.post(ENDPOINT, json=payload, timeout=30, allow_redirects=False)
        report["http_status"] = response.status_code
        report["received"] = response.status_code in (200, 202)
        report["ownership_validation_pending"] = response.status_code == 202
        if report["received"]:
            accepted.update(pending)
        report["accepted_hashes"] = accepted
        args.receipt.parent.mkdir(parents=True, exist_ok=True)
        args.receipt.write_text(json.dumps(report, indent=2) + "\n")
        if not report["received"]:
            raise RuntimeError("IndexNow rejected submission; status recorded, no automatic retry")
    return report


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--urls", type=Path, required=True)
    p.add_argument("--key-file", type=Path, required=True)
    p.add_argument("--receipt", type=Path, required=True)
    p.add_argument("--submit", action="store_true")
    try:
        print(json.dumps(run(p.parse_args()), indent=2))
    except (ValueError, RuntimeError, requests.RequestException) as error:
        # Do not include request bodies, keys or provider response bodies in logs.
        print(json.dumps({"completed": False, "error_type": type(error).__name__}))
        raise SystemExit(1)
