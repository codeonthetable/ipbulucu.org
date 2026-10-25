import Link from "next/link";

export default function PrivacyInformation({lang="tr"}:{lang?:"tr"|"en"}) {
  const en=lang==="en";
  const sections=en ? [
    ["IP and network queries", "The service receives your connection's public IP. IP lookup sends the requested IP to ipwho.is to obtain approximate location and network information. DNS, Whois and other diagnostics contact the relevant providers or target server. Do not submit confidential or personal data in query fields."],
    ["Website analytics", "The website uses Google Analytics to measure visits and tool interactions. Tool events contain the tool name, language, action category, result category and duration, without lookup values. Page URLs sent by the site configuration omit lookup parameters and preserve only validated campaign labels. Google Analytics processes usage data under Google's own policies."],
    ["Extension and SDKs", "The Chrome popup calls the IPBulucu API when opened. It does not request browsing-history permission or include a persistent background worker. SDKs call the API when your program invokes them. The requesting IP and any target supplied are needed to perform the query."],
    ["Aggregate counters and server logs", "When enabled by the host, API counters store daily totals by endpoint, declared client type, action and HTTP status class. They do not store raw IP addresses, queried values, raw user-agent strings or unique identifiers. Client labels can be spoofed. Hosting access/error logs and upstream services are separate; this site does not promise that no logs exist."],
    ["Other services and monitoring", "External assets, including Google Fonts and map tiles on pages that display maps, involve requests to their providers. IP change monitoring runs in the open tab; its recent IP and check time are held in browser memory. It does not send Telegram, Discord or background push alerts."],
    ["Contact", "Questions about processing and privacy: iletisim@ipbulucu.org. This page describes technical behavior; hosting retention and provider settings require separate verification."]
  ] : [
    ["IP ve ağ sorguları", "Hizmet bağlantınızın genel IP adresini alır. IP sorgusu, yaklaşık konum ve ağ bilgisi için sorgulanan IP adresini ipwho.is sağlayıcısına iletir. DNS, Whois ve diğer tanılama araçları ilgili sağlayıcılarla veya hedef sunucuyla iletişim kurar. Sorgu alanlarına gizli veya kişisel bilgi girmeyin."],
    ["Site kullanım analizi", "Sitede ziyaretleri ve araç etkileşimlerini ölçmek için Google Analytics kullanılır. Araç olayları; araç adı, dil, işlem türü, sonuç türü ve süreyi içerir; sorgulanan değeri içermez. Site yapılandırmasının Analytics’e gönderdiği sayfa adresinden sorgu girdileri çıkarılır; yalnızca biçimi doğrulanan kampanya etiketleri korunur. Google Analytics kullanım verilerini Google’ın kendi politikaları kapsamında işler."],
    ["Eklenti ve SDK’lar", "Chrome eklentisinin açılır penceresi açıldığında IPBulucu API’sine istek gönderir. Tarama geçmişi izni istemez ve sürekli çalışan arka plan bileşeni içermez. SDK’lar programınız çağırdığında API’ye istek yapar. Bağlantının IP adresi ve varsa girdiğiniz hedef, sorguyu gerçekleştirmek için işlenir."],
    ["Toplu sayaçlar ve sunucu kayıtları", "Sunucuda etkinleştirildiğinde API sayaçları uç nokta, beyan edilen istemci türü, işlem ve HTTP durum sınıfına göre günlük toplamlar saklar. Bu sayaçlar ham IP adresi, sorgu değeri, ham kullanıcı aracısı veya benzersiz kimlik saklamaz. İstemci beyanları taklit edilebilir. Barındırma erişim/hata kayıtları ve üst sağlayıcıların işlemleri ayrıdır; tüm sistem için sıfır kayıt garantisi verilmez."],
    ["Diğer hizmetler ve IP takibi", "Google Fonts ve harita gösteren sayfalardaki harita karoları gibi dış kaynaklar kendi sağlayıcılarına istek oluşturur. IP değişim takibi açık sekmede çalışır; son IP ve kontrol zamanı tarayıcı belleğinde tutulur. Telegram, Discord veya arka plan bildirimi göndermez."],
    ["İletişim", "Veri işleme ve gizlilik soruları: iletisim@ipbulucu.org. Bu sayfa teknik davranışı açıklar; barındırma kayıtlarının saklama süresi ve sağlayıcı ayarları ayrıca doğrulanmalıdır."]
  ];
  return <article className="max-w-3xl mx-auto space-y-8 py-8">
    <Link href={en?"/en/":"/"} className="text-cyan-400">{en?"Back to tools":"Araçlara dön"}</Link>
    <h1 className="text-3xl font-bold">{en?"Privacy and data processing":"Gizlilik ve veri işleme"}</h1>
    <p className="text-sm text-slate-400">{en?"Updated: 25 October 2026":"Güncelleme: 25 Ekim 2026"}</p>
    {sections.map(([title,text])=><section key={title}><h2 className="text-xl font-semibold mb-3">{title}</h2><p className="text-slate-400 leading-relaxed">{text}</p></section>)}
  </article>;
}
