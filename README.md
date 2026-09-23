# 🌐 IP Bulucu (ipbulucu.org)

[![Website](https://img.shields.io/badge/Website-ipbulucu.org-blue?style=for-the-badge&logo=google-chrome)](https://ipbulucu.org)
[![API Status](https://img.shields.io/badge/API-Online-emerald?style=for-the-badge)](https://ipbulucu.org/api-dokumantasyon)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)
[![Zero Logs](https://img.shields.io/badge/Privacy-Zero%20Logs-green?style=for-the-badge)](https://ipbulucu.org/gizlilik-politikasi)

**IP Bulucu**, modern web standartlarında geliştirilmiş; anlık IP tespiti, ISP/ASN analizi, DNS yayılma kontrolü, port tarama, CGNAT tespiti ve ağ teşhisi sunan yüksek hızlı ve gizlilik odaklı bir ağ analiz ekosistemidir.

---

## ⚡ Ekosistem Bileşenleri

1. **Web Platformu ([ipbulucu.org](https://ipbulucu.org)):**
   - Sıfır CLS, sub-15ms LiteSpeed yanıt süresi, minimalist arayüz.
   - 81 İl POP noktası, ISP & ASN haritası.
   - Gelişmiş Teşhis Araçları: DNS, Port, SSL, WebRTC, Blacklist, Subnet, Header analizi.

2. **Chrome Tarayıcı Eklentisi (`chrome-extension/`):**
   - Manifest V3 standardında, tek tıkla genel IP, ISP ve lokasyon gösteren hafif eklenti.

3. **Geliştirici SDK'ları:**
   - **JavaScript / Node.js:** `npm-package/` (`npm install ipbulucu`)
   - **Python:** `python-package/` (`pip install ipbulucu`)

4. **Yapay Zeka (AI Agent) & LLM Uç Noktaları:**
   - [LLMs Discovery Standard](https://ipbulucu.org/llms.txt) (`/llms.txt`)
   - [OpenAPI 3.1.0 Specification](https://ipbulucu.org/openapi.json) (`/openapi.json`)
   - Custom GPT, LangChain, AutoGPT ve CrewAI entegrasyonuna hazır.

---

## 🚀 Hızlı Başlangıç

### JavaScript / Node.js
```bash
npm install ipbulucu
```

```javascript
import { getMyIP, lookupIP } from 'ipbulucu';

const myInfo = await getMyIP();
console.log(myInfo.ip, myInfo.isp, myInfo.city);
```

### Python
```bash
pip install ipbulucu
```

```python
import ipbulucu

client = ipbulucu.Client()
print(client.get_my_ip())
```

---

## 🔒 Güvenlik & Gizlilik Taahhüdü
- **Sıfır Log (Zero-Log):** Kullanıcıların IP sorgulamaları hiçbir şekilde veritabanına kaydedilmez.
- **Uzak Kod Yoktur:** Eklenti ve SDK'lar tamamen açık kaynaklı ve bağımsızdır.
- Detaylar için: [Gizlilik Politikası](https://ipbulucu.org/gizlilik-politikasi)

---

## 📄 Lisans
Bu proje [MIT Lisansı](LICENSE) altında açık kaynak olarak yayınlanmıştır.
