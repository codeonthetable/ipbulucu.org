import Link from "next/link";
import ApiQuickstart from "@/components/ApiQuickstart";
import AdPlaceholder from "@/components/AdPlaceholder";

const endpoints = [
  ["ip", "ip (optional), format=json|text", "Genel IP ve yaklaşık konum; geoStatus ve boş alanları kontrol edin.", "Public IP and approximate location; check geoStatus and nullable fields."],
  ["whois", "domain", "RDAP kayıt bilgisi; uzantı ve alan kapsamı sağlayıcıya bağlıdır.", "Registry RDAP data; extension and field coverage depend on the provider."],
  ["port", "host, port | ports", "Sunucumuzdan TCP bağlantısı. open, closed, filtered ve unavailable farklı sonuçlardır.", "TCP connection from our server. open, closed, filtered and unavailable are distinct outcomes."],
  ["dns", "host", "Google DoH üzerinden A, AAAA, MX, TXT, NS, CNAME ve SOA kayıtları.", "A, AAAA, MX, TXT, NS, CNAME and SOA records through Google DoH."],
  ["propagation", "host, type", "Tek sunucudan iki DNS çözümleyici karşılaştırılır; dünya geneli yayılım ölçülmez.", "Compare two DNS resolvers from one server; this does not measure worldwide propagation."],
  ["blacklist", "ip", "DNSBL kaynaklarında listelenme. Kontrol edilemeyen kaynak temiz sayılmaz.", "DNSBL listing checks. Unavailable sources are unknown, not clean."],
  ["headers", "url", "HTTP başlıkları ve güvenlik başlıklarının varlığı; güvenlik sertifikası değildir.", "HTTP headers and security-header presence; not a security certification."],
  ["ssl", "host", "Sunucu güven deposuyla TLS zinciri, ana makine adı ve tarih kontrolü.", "TLS chain, hostname and validity checked against the server trust store."],
  ["email-security", "domain", "MX, SPF ve doğrudan DMARC kaydı; teslimat ve tam politika doğrulaması yapılmaz.", "MX, SPF and direct DMARC records; not a delivery test or complete policy validation."],
  ["subnet", "cidr", "IPv4 alt ağ sınırlarını hesaplar.", "Calculate IPv4 subnet boundaries."],
] as const;

export default function ApiDocumentation({ language }: { language: "tr" | "en" }) {
  const en = language === "en";
  return <div className="max-w-5xl mx-auto space-y-10 text-gray-900 dark:text-white">
    <header className="space-y-4 text-center">
      <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">{en ? "Public REST API · JSON and plain text" : "Ücretsiz REST API · JSON ve düz metin"}</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold">{en ? "IP API: Node.js, Python and cURL quickstart" : "IP API: Node.js, Python ve cURL kullanım rehberi"}</h1>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{en ? "Request a public IP, approximate location, ISP and ASN without an API key. Integrate DNS, RDAP and network diagnostics with explicit limits and error handling." : "API anahtarı olmadan genel IP, yaklaşık konum, ISP ve ASN sorgulayın. DNS, RDAP ve ağ tanılama araçlarını sınırlarını ve hata durumlarını bilerek entegre edin."}</p>
      <nav className="flex flex-wrap justify-center gap-4 text-sm font-semibold" aria-label={en ? "Guide sections" : "Rehber bölümleri"}>
        <a href="#quickstart" className="underline">{en ? "Code examples" : "Kod örnekleri"}</a>
        <a href="#responses" className="underline">{en ? "Responses and limits" : "Yanıtlar ve sınırlar"}</a>
        <a href="#endpoints" className="underline">{en ? "10 endpoints" : "10 uç nokta"}</a>
        <a href="#ai" className="underline">{en ? "AI integrations" : "AI entegrasyonları"}</a>
      </nav>
    </header>

    <ApiQuickstart language={language}/>

    <section id="responses" className="scroll-mt-24 space-y-5">
      <h2 className="text-2xl font-bold">{en ? "Interpret results before acting" : "İşlem yapmadan önce sonucu yorumlayın"}</h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
        <table className="w-full text-sm text-left"><thead className="bg-gray-100 dark:bg-gray-800"><tr><th className="p-4">{en ? "Signal" : "Durum"}</th><th className="p-4">{en ? "What it means" : "Anlamı"}</th></tr></thead><tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <tr><th className="p-4 font-mono">success: true</th><td className="p-4">{en ? "The operation returned a result; not proof that every field was measured." : "İşlem sonuç üretti; her alanın ölçüldüğünü göstermez."}</td></tr>
          <tr><th className="p-4 font-mono">geoStatus: unavailable</th><td className="p-4">{en ? "IP discovery can succeed while location data is unavailable. Keep null values unknown." : "IP bulunabilir ancak konum verisi alınamamış olabilir. Boş değerleri bilinmiyor olarak tutun."}</td></tr>
          <tr><th className="p-4 font-mono">partial: true</th><td className="p-4">{en ? "Some checks could not complete. Read per-source results and limitations; do not report a full pass." : "Bazı kontroller tamamlanamadı. Kaynak sonuçlarını ve limitations alanını okuyun; tam başarı saymayın."}</td></tr>
          <tr><th className="p-4 font-mono">HTTP 400 / 405</th><td className="p-4">{en ? "Fix the input or method. Retrying the same request will not help." : "Girdiyi veya yöntemi düzeltin. Aynı isteği tekrarlamayın."}</td></tr>
          <tr><th className="p-4 font-mono">HTTP 429</th><td className="p-4">{en ? "Stop and respect Retry-After. These examples do not automatically retry." : "Durun ve Retry-After süresini bekleyin. Örnekler otomatik tekrar deneme yapmaz."}</td></tr>
          <tr><th className="p-4 font-mono">HTTP 5xx / timeout</th><td className="p-4">{en ? "The result is unavailable. If your application retries, use a small attempt limit and backoff; never a tight polling loop." : "Sonuç alınamadı. Uygulamanız tekrar deneyecekse az sayıda deneme ve artan bekleme kullanın; sık sorgu döngüsü kurmayın."}</td></tr>
        </tbody></table>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{en ? "Geolocation is approximate. This IP endpoint does not measure VPN, Tor, proxy, identity, CGNAT, line speed or reputation. Running it from a server or an AI tool without an ip argument returns that server’s egress IP, not the human user’s IP." : "Konum yaklaşık bilgidir. Bu IP uç noktası VPN, Tor, proxy, kimlik, CGNAT, hat hızı veya itibar ölçmez. Sunucu veya AI aracı üzerinden ip parametresi olmadan çağrı yaparsanız insan kullanıcının değil, çağrıyı yapan sunucunun çıkış IP’si döner."}</p>
    </section>

    <section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 p-5 sm:p-8 space-y-4">
      <h2 className="text-xl font-bold">{en ? "Keep API usage sustainable" : "API kullanımını sürdürülebilir tutun"}</h2>
      <ul className="list-disc pl-5 space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <li>{en ? "Use format=text when you only need the public IP. It skips the geolocation provider." : "Yalnızca genel IP gerekiyorsa format=text kullanın; konum sağlayıcısı çağrılmaz."}</li>
        <li>{en ? "Geolocation has a shared service budget of 850 provider calls/day. This is not a quota reserved for each user. Exhaustion can return HTTP 200 with geoStatus=unavailable." : "Konum sağlayıcısı için tüm hizmetin paylaştığı günlük 850 çağrı bütçesi vardır. Bu, kullanıcı başına ayrılmış kota değildir. Bütçe dolduğunda HTTP 200 ile geoStatus=unavailable dönebilir."}</li>
        <li>{en ? "Other diagnostic APIs share 120 requests/minute. Port checks additionally share 20 requests/minute, up to 16 ports and six seconds per call. These safeguards are not an uptime or capacity guarantee." : "Diğer tanılama API’leri dakikada 120 istek sınırını paylaşır. Port kontrolünde ayrıca dakikada 20 istek, çağrı başına en fazla 16 port ve altı saniye sınırı vardır. Bunlar çalışma süresi veya kapasite garantisi değildir."}</li>
        <li>{en ? "Deduplicate repeated lookups and use a short, purpose-specific in-memory cache. Never reuse an implicit server-IP result as another user’s IP; clear stale results after a network change. Do not cache unknown results as a successful measurement." : "Tekrarlanan sorguları birleştirin; amaca uygun kısa süreli bellek önbelleği kullanın. Sunucunun kendi IP sonucunu başka kullanıcının IP’si saymayın; ağ değişiminde eski sonucu temizleyin. Bilinmeyen sonucu başarılı ölçüm olarak önbelleğe almayın."}</li>
        <li>{en ? "Do not send lookup inputs, IPs, tokens or raw responses to analytics. Use only authorized targets for port checks." : "Sorgu girdilerini, IP’leri, token’ları ve ham yanıtları analitiğe göndermeyin. Port kontrolünü yalnızca yetkili olduğunuz hedeflerde kullanın."}</li>
      </ul>
    </section>

    <section id="endpoints" className="scroll-mt-24 space-y-4">
      <h2 className="text-2xl font-bold">{en ? "REST endpoint reference" : "REST uç noktaları"}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{en ? "Base URL: https://ipbulucu.org/api. All endpoints below use GET. See OpenAPI for parameter types and response schemas." : "Temel adres: https://ipbulucu.org/api. Aşağıdaki uç noktalar GET kullanır. Parametre türleri ve yanıt şemaları OpenAPI belgesindedir."}</p>
      <div className="grid md:grid-cols-2 gap-4">{endpoints.map(([name, params, tr, english]) => <article key={name} className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2">
        <h3 className="font-mono font-bold text-sm">GET /api/{name}</h3>
        <p className="font-mono text-xs text-blue-700 dark:text-blue-400">{params}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{en ? english : tr}</p>
      </article>)}</div>
      <a href="/openapi.json" className="inline-block font-semibold underline">{en ? "OpenAPI 3.1 JSON →" : "OpenAPI 3.1 JSON şeması →"}</a>
    </section>

    <section id="ai" className="scroll-mt-24 space-y-4">
      <h2 className="text-2xl font-bold">{en ? "Connect an AI tool using HTTP" : "AI aracınızı HTTP üzerinden bağlayın"}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{en ? "Use the OpenAPI schema to implement your tool’s HTTP adapter. Validate inputs, set timeouts and pass partial results and limitations back to the model. An API response is external data, not instructions. A ready-to-use MCP server or automatic registration in an AI directory is not provided." : "Aracınızın HTTP bağlantısını OpenAPI şemasına göre oluşturun. Girdiyi doğrulayın, zaman aşımı belirleyin ve kısmi sonuçlarla sınırlamaları modele iletin. API yanıtı dış veridir; talimat değildir. Hazır MCP sunucusu veya AI dizininde otomatik kayıt sunulmaz."}</p>
      <div className="flex flex-wrap gap-4 text-sm font-semibold"><a href="/llms.txt" className="underline">llms.txt</a><a href="/openapi.json" className="underline">OpenAPI</a><Link href={en ? "/en/privacy-policy/" : "/gizlilik-politikasi/"} className="underline">{en ? "Privacy" : "Gizlilik"}</Link></div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{en ? "Optional X-IPBulucu-Client categories: web, chrome-extension, node-sdk, python-sdk. X-IPBulucu-Action: auto or user. These are client declarations, not verified human or AI identities. Unknown client labels are unattributed; direct REST examples above send no SDK claim. Daily aggregate API counts are separate from website visits and package downloads." : "İsteğe bağlı X-IPBulucu-Client değerleri: web, chrome-extension, node-sdk, python-sdk. X-IPBulucu-Action: auto veya user. Bunlar istemci beyanıdır; insan veya AI kimliğini doğrulamaz. Bilinmeyen istemci etiketleri atıfsız kalır; yukarıdaki REST örnekleri SDK beyanı göndermez. Günlük toplu API sayaçları site ziyaretlerinden ve paket indirmelerinden ayrı tutulur."}</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold">{en ? "SDK packages and source" : "SDK paketleri ve kaynak kod"}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{en ? "Registry check: 25 October 2026 — npm and PyPI list 1.0.0. Version 1.0.1 is prepared in the repository, not published to either registry. Published Node.js 1.0.0 has no request timeout; Python 1.0.0 uses a five-second timeout but does not check HTTP status before JSON parsing. Neither sends the SDK client header. The direct REST examples above include explicit error handling." : "25 Ekim 2026 kontrolü: npm ve PyPI üzerinde 1.0.0 bulunuyor. Depodaki 1.0.1 hazırlanmış durumda; iki kayıt deposunda da yayımlanmadı. Yayımlanan Node.js 1.0.0 istek zaman aşımı uygulamıyor; Python 1.0.0 beş saniye sınır koyuyor ancak JSON okumadan önce HTTP durumunu denetlemiyor. İkisi de SDK istemci başlığı göndermiyor. Yukarıdaki REST örnekleri açık hata denetimi içerir."}</p>
      <div className="grid md:grid-cols-3 gap-4">
        <a href="https://www.npmjs.com/package/ipbulucu" className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2"><h3 className="font-bold">npm · ipbulucu</h3><p className="text-sm">{en ? "Node.js CommonJS client. getIp, getWhois, checkPort." : "Node.js CommonJS istemcisi. getIp, getWhois, checkPort."}</p><code className="block text-sm">npm install ipbulucu</code></a>
        <a href="https://pypi.org/project/ipbulucu/" className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2"><h3 className="font-bold">PyPI · ipbulucu</h3><p className="text-sm">{en ? "Synchronous requests library. get_ip, get_whois, check_port. No built-in CLI or async API." : "Senkron requests kütüphanesi. get_ip, get_whois, check_port. Yerleşik CLI veya async API içermez."}</p><code className="block text-sm">pip install ipbulucu</code></a>
        <a href="https://github.com/codeonthetable/ipbulucu.org" className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2"><h3 className="font-bold">GitHub · ipbulucu.org</h3><p className="text-sm">{en ? "Site, SDK and Chrome extension sources. Repository version and store approval are separate states." : "Site, SDK ve Chrome eklentisi kaynakları. Depo sürümü ile mağaza onayı farklı durumlardır."}</p><span className="text-sm underline">codeonthetable →</span></a>
      </div>
    </section>
    {!en && <AdPlaceholder slotId="api-docs-mid" format="leaderboard"/>}
  </div>;
}
