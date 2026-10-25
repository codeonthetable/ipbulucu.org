# ipbulucu - Official Node.js SDK

Zero-dependency Node.js client for [ipbulucu.org](https://ipbulucu.org) Network & IP Intelligence API.

## Installation
```bash
npm install ipbulucu
```

## Quick Start
```javascript
const { getIp, getWhois, checkPort } = require("ipbulucu");

// 1. Get client IP intelligence
const ipInfo = await getIp();
console.log(ipInfo.ip, ipInfo.city, ipInfo.isp);

// 2. Query registry RDAP (coverage varies)
const whois = await getWhois("example.com");
console.log(whois.registrar, whois.expiresOn);

// 3. Test open port
const portStatus = await checkPort("YOUR_AUTHORIZED_HOST", 443);
console.log(portStatus.isOpen, portStatus.responseTimeMs);
```

Requires Node.js 18+ (built-in fetch). Location fields can be null; check `geoStatus`. VPN, CGNAT, speed and reputation are not measured. Requests time out after 10 seconds and send a self-declared SDK client header.
