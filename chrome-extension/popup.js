document.addEventListener("DOMContentLoaded", async () => {
  const content = document.getElementById("content");

  try {
    const res = await fetch("https://ipbulucu.org/api/ip?format=json");
    const data = await res.json();

    content.innerHTML = `
      <div class="ip-box">
        <div class="ip-label">Dış Genel IP Adresiniz</div>
        <div class="ip-val">${data.ip}</div>
        <div style="font-size: 11px; color: #34d399; font-weight: 600;">✓ ${data.connectionType || "Genişbant"} • ${data.country}</div>
      </div>

      <div class="grid">
        <div class="card">
          <div class="card-title">Konum / Şehir</div>
          <div class="card-val">${data.city} (${data.plateCode || "TR"})</div>
        </div>
        <div class="card">
          <div class="card-title">Operatör (ISP)</div>
          <div class="card-val" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${data.isp}">${data.isp}</div>
        </div>
        <div class="card">
          <div class="card-title">Güvenlik Skoru</div>
          <div class="card-val" style="color: #34d399;">%${data.securityScore || 100} / 100</div>
        </div>
        <div class="card">
          <div class="card-title">CGNAT Durumu</div>
          <div class="card-val">${data.isCgnat ? "CGNAT Havuzunda" : "Temiz (Genel IP)"}</div>
        </div>
      </div>

      <a href="https://ipbulucu.org" target="_blank" class="btn">
        Detaylı Ağ & Siber İstihbaratı Gör &rarr;
      </a>
    `;
  } catch (err) {
    content.innerHTML = `
      <div class="loading" style="color: #f87171;">
        Bağlantı hatası oluştu.<br>
        <a href="https://ipbulucu.org" target="_blank" class="btn">Web Sitesini Aç</a>
      </div>
    `;
  }
});
