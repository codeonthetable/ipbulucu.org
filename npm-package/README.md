# ipbulucu - Official Node.js SDK

High-speed, zero-dependency Node.js client for [ipbulucu.org](https://ipbulucu.org) Network & IP Intelligence API.

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

// 2. Query TRABIS & Universal Whois
const whois = await getWhois("turktelekom.com.tr");
console.log(whois.registrar, whois.expiryDate);

// 3. Test open port
const portStatus = await checkPort("google.com", 443);
console.log(portStatus.isOpen, portStatus.responseTimeMs);
```
