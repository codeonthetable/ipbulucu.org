export interface CitySeoData {
  slug: string;
  name: string;
  plate: string;
  region: string;
  lat: number;
  lng: number;
  popularIsps: string[];
  description: string;
  ipRangesSample: string[];
}

export interface IspSeoData {
  slug: string;
  name: string;
  asn: string;
  country: string;
  website: string;
  description: string;
  dnsServers: string[];
  speedTips: string[];
}

export interface AsnSeoData {
  slug: string;
  asn: string;
  name: string;
  org: string;
  country: string;
  allocatedIps: string;
  description: string;
}

export const CITIES_DATA: CitySeoData[] = [
  {
    slug: "istanbul",
    name: "İstanbul",
    plate: "34",
    region: "Marmara",
    lat: 41.0082,
    lng: 28.9784,
    popularIsps: ["Türk Telekom", "Turkcell Superonline", "TurkNet", "Vodafone"],
    description: "İstanbul genelinde kullanılan IPv4/IPv6 IP adres blokları, internet servis sağlayıcıları, santral gecikme süreleri ve IP sorgulama detayları.",
    ipRangesSample: ["212.156.0.0/16", "88.247.0.0/16", "176.240.0.0/16"],
  },
  {
    slug: "ankara",
    name: "Ankara",
    plate: "06",
    region: "İç Anadolu",
    lat: 39.9334,
    lng: 32.8597,
    popularIsps: ["Türk Telekom", "Turkcell Superonline", "Türksat Kablonet", "Vodafone"],
    description: "Ankara ili ve ilçelerinde aktif IP adres blokları, operatör altyapıları, Whois ve DNS sorgulama bilgileri.",
    ipRangesSample: ["85.105.0.0/16", "78.190.0.0/16", "195.175.0.0/16"],
  },
  {
    slug: "izmir",
    name: "İzmir",
    plate: "35",
    region: "Ege",
    lat: 38.4192,
    lng: 27.1287,
    popularIsps: ["Türk Telekom", "Turkcell Superonline", "TurkNet", "Vodafone"],
    description: "İzmir bölgesinde hizmet veren internet sağlayıcıları, IP blokları ve yerel ağ bağlantı analizi.",
    ipRangesSample: ["88.250.0.0/16", "212.174.0.0/16", "176.234.0.0/16"],
  },
  {
    slug: "bursa",
    name: "Bursa",
    plate: "16",
    region: "Marmara",
    lat: 40.1885,
    lng: 29.061,
    popularIsps: ["Türk Telekom", "Turkcell Superonline", "Kablonet"],
    description: "Bursa merkez ve çevre ilçelerinde kullanılan dinamik ve statik IP adresleri sorgulama veritabanı.",
    ipRangesSample: ["85.96.0.0/16", "78.160.0.0/16"],
  },
  {
    slug: "antalya",
    name: "Antalya",
    plate: "07",
    region: "Akdeniz",
    lat: 36.8969,
    lng: 30.7133,
    popularIsps: ["Türk Telekom", "Turkcell Superonline", "Vodafone"],
    description: "Antalya IP adresi sorgulama, turizm ve yerel altyapı operatör IP aralıkları analizi.",
    ipRangesSample: ["88.232.0.0/16", "212.156.120.0/20"],
  },
  {
    slug: "adana",
    name: "Adana",
    plate: "01",
    region: "Akdeniz",
    lat: 37.0,
    lng: 35.3213,
    popularIsps: ["Türk Telekom", "Turkcell Superonline", "Vodafone"],
    description: "Adana ili IP adres aralıkları, ISP bilgileri ve coğrafi IP çözümleme sistemi.",
    ipRangesSample: ["78.188.0.0/16"],
  },
  {
    slug: "konya",
    name: "Konya",
    plate: "42",
    region: "İç Anadolu",
    lat: 37.8667,
    lng: 32.4833,
    popularIsps: ["Türk Telekom", "TurkNet", "Superonline"],
    description: "Konya ili genişbant internet IP aralıkları ve konum doğrulama araçları.",
    ipRangesSample: ["85.108.0.0/16"],
  },
  {
    slug: "gaziantep",
    name: "Gaziantep",
    plate: "27",
    region: "Güneydoğu Anadolu",
    lat: 37.0662,
    lng: 37.3833,
    popularIsps: ["Türk Telekom", "Turkcell Superonline"],
    description: "Gaziantep IP aralıkları, yerel yönlendiriciler ve Whois sorgulama bilgileri.",
    ipRangesSample: ["78.176.0.0/16"],
  },
  {
    slug: "kocaeli",
    name: "Kocaeli",
    plate: "41",
    region: "Marmara",
    lat: 40.8533,
    lng: 29.8815,
    popularIsps: ["Türk Telekom", "TurkNet", "Kablonet", "Superonline"],
    description: "Kocaeli / Gebze sanayi ve ev interneti IP blokları, kurumsal hat IP analizi.",
    ipRangesSample: ["88.241.0.0/16"],
  },
  {
    slug: "eskisehir",
    name: "Eskişehir",
    plate: "26",
    region: "İç Anadolu",
    lat: 39.7767,
    lng: 30.5206,
    popularIsps: ["Türk Telekom", "TurkNet", "Vodafone", "Superonline"],
    description: "Eskişehir ili IP adresi tespiti, öğrenci ve kurum ağları coğrafi IP aralıkları.",
    ipRangesSample: ["193.140.0.0/16"],
  },
];

export const ISPS_DATA: IspSeoData[] = [
  {
    slug: "turk-telekom",
    name: "Türk Telekom",
    asn: "AS9121",
    country: "Türkiye",
    website: "https://www.turktelekom.com.tr",
    description: "Türkiye'nin en büyük omurga internet servis sağlayıcısı Türk Telekom (TTNET) IP blokları, DNS sunucuları ve ağ analiz bilgileri.",
    dnsServers: ["195.175.39.39", "195.175.39.40"],
    speedTips: ["Modem MTU değerini 1492 olarak ayarlayın", "TTNET DNS'leri yerine Cloudflare 1.1.1.1 veya Google 8.8.8.8 tercih edebilirsiniz"],
  },
  {
    slug: "turkcell-superonline",
    name: "Turkcell Superonline",
    asn: "AS34984",
    country: "Türkiye",
    website: "https://www.superonline.net",
    description: "Turkcell Superonline fiber ve DSL altyapı IP blokları, ASN verileri ve kurumsal bağlantı parametreleri.",
    dnsServers: ["213.74.1.1", "213.74.0.1"],
    speedTips: ["IPv6 desteğini modeminizden etkinleştirin", "Fast path fiber yönlendirme ile düşük ping elde edin"],
  },
  {
    slug: "turknet",
    name: "TurkNet İletişim",
    asn: "AS12735",
    country: "Türkiye",
    website: "https://turk.net",
    description: "TurkNet GigaFiber ve VDSL kullanıcıları için IP adres havuzları, CGNAT tespiti, statik IP avantajları ve ASN ayrıntıları.",
    dnsServers: ["193.192.98.8", "212.154.100.18"],
    speedTips: ["GigaFiber 1000 Mbps simetrik hız için Cat6e kablo kullanın", "CGNAT havuzundan çıkmak için Statik IP tercih edebilirsiniz"],
  },
  {
    slug: "vodafone-net",
    name: "Vodafone Net",
    asn: "AS8385",
    country: "Türkiye",
    website: "https://www.vodafone.com.tr",
    description: "Vodafone Net sabit genişbant ve mobil IP adres blokları, Whois ve ağ güvenliği analizi.",
    dnsServers: ["62.248.130.4", "62.248.130.5"],
    speedTips: ["Mobil bağlantıda APN ayarlarını kontrol edin", "Bölgesel baz istasyonu yoğunluğunu test edin"],
  },
  {
    slug: "turksat-kablonet",
    name: "Türksat Kablonet",
    asn: "AS15924",
    country: "Türkiye",
    website: "https://www.turksatkablo.com.tr",
    description: "Türksat Kablo TV & Kablonet Docsis altyapısı IP aralıkları, DNS yapılandırmaları ve ping değerleri.",
    dnsServers: ["194.27.0.1", "194.27.0.2"],
    speedTips: ["Docsis 3.0/3.1 sinyal seviyelerini modem arayüzünden kontrol edin"],
  },
];

export const ASNS_DATA: AsnSeoData[] = [
  {
    slug: "as9121-turk-telekom",
    asn: "AS9121",
    name: "TTNET Türk Telekomünikasyon A.Ş.",
    org: "Turk Telekom",
    country: "TR",
    allocatedIps: "15,000,000+",
    description: "Türkiye'nin ulusal omurga ağı olan AS9121 Türk Telekom otonom sistem numarası, IP ön ekleri ve BGP anonsları.",
  },
  {
    slug: "as34984-superonline",
    asn: "AS34984",
    name: "Turkcell Superonline",
    org: "Turkcell Iletisim Hizmetleri A.S.",
    country: "TR",
    allocatedIps: "4,500,000+",
    description: "Turkcell Superonline otonom sistemi (AS34984), fiber optik BGP yönlendirmeleri ve IP havuzları.",
  },
  {
    slug: "as12735-turknet",
    asn: "AS12735",
    name: "TurkNet Iletisim Hizmetleri A.S.",
    org: "TurkNet",
    country: "TR",
    allocatedIps: "1,200,000+",
    description: "TurkNet bağımsız omurga ağı AS12735 otonom sistemi ve uluslararası peering bağlantıları.",
  },
  {
    slug: "as15169-google-llc",
    asn: "AS15169",
    name: "Google LLC",
    org: "Google LLC",
    country: "US",
    allocatedIps: "18,000,000+",
    description: "Google'ın global BGP altyapısı, 8.8.8.8 DNS sunucuları ve Cloud omurgasını barındıran AS15169 detayları.",
  },
  {
    slug: "as13335-cloudflare",
    asn: "AS13335",
    name: "Cloudflare, Inc.",
    org: "Cloudflare, Inc.",
    country: "US",
    allocatedIps: "4,000,000+",
    description: "Cloudflare Anycast CDN, 1.1.1.1 DNS ve DDoS koruma ağının omurgasını oluşturan AS13335.",
  },
];

export const HOME_FAQS = [
  {
    question: "IP adresim nedir ve ne işe yarar?",
    answer: "IP (Internet Protocol) adresi, internete veya yerel bir ağa bağlı her cihaza atanan benzersiz bir sayısal tanımlayıcıdır. Tıpkı evinizin posta adresi gibi, internet üzerindeki veri paketlerinin bilgisayarınıza, telefonunuza veya modeminize doğru şekilde ulaşmasını sağlar.",
  },
  {
    question: "IP adresimden ev adresim veya tam konumum bulunur mu?",
    answer: "Hayır. IP adresleri kesin ev adresinizi, sokak veya kapı numaranızı göstermez. IP coğrafi konum tespiti (GeoIP), yalnızca internet servis sağlayıcınızın (ISP) bağlı olduğu santrali, şehri ve yaklaşık bölge koordinatlarını verir. Kesin abone adres bilgisi yalnızca mahkeme kararıyla servis sağlayıcınız tarafından yasal mercilere verilebilir.",
  },
  {
    question: "Dinamik IP ile Statik IP arasındaki fark nedir?",
    answer: "Dinamik IP, modeminizi her yeniden başlattığınızda veya belirli aralıklarla servis sağlayıcınız tarafından otomatik olarak değiştirilen geçici IP adresidir. Statik IP ise hiçbir zaman değişmeyen, genellikle web sunucuları, güvenlik kameraları veya uzaktan erişim sistemleri için kiralanan sabit IP adresidir.",
  },
  {
    question: "IPv4 ve IPv6 arasındaki fark nedir?",
    answer: "IPv4, 32-bit formatında (Örn: 192.168.1.1) yaklaşık 4.3 milyar benzersiz adres üretebilen eski protokoldür. Dünyadaki cihaz sayısının artmasıyla IPv4 adresleri tükendiği için 128-bitlik trilyonlarca benzersiz adres üretebilen daha hızlı ve güvenli IPv6 standardına geçilmektedir.",
  },
  {
    question: "VPN veya Proxy kullanmak IP adresimi gizler mi?",
    answer: "Evet. VPN (Sanal Özel Ağ) veya Proxy kullandığınızda, ziyaret ettiğiniz web siteleri sizin gerçek IP adresiniz yerine bağlandığınız VPN sunucusunun IP adresini ve konumunu görür. Böylece internet servis sağlayıcınız ve web siteleri gerçek IP adresinizi göremez.",
  },
  {
    question: "CGNAT (Carrier-Grade NAT) nedir, IP adresim neden başkalarıyla aynı?",
    answer: "CGNAT, internet servis sağlayıcılarının IPv4 adres yetersizliği nedeniyle tek bir genel IP adresini yüzlerce farklı aboneye paylaştırması teknolojisidir. Bu durumda 'IP Bulucu' üzerinde gördüğünüz IP adresi aslında sizinle birlikte aynı mahalledeki diğer kullanıcılar tarafından da ortak kullanılıyor olabilir.",
  },
];
