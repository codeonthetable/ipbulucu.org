export interface CitySeoData {
  slug: string;
  name: string;
  plate: string;
  region: string;
  lat: number;
  lng: number;
}

export interface IspSeoData {
  slug: string;
  name: string;
  asn: string;
  country: string;
  website: string;
  description: string;
  registryHolder: string;
  registryCheckedAt: string;
}

export interface AsnSeoData {
  slug: string;
  asn: string;
  name: string;
  org: string;
  country: string;
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
  },
  {
    slug: "ankara",
    name: "Ankara",
    plate: "06",
    region: "İç Anadolu",
    lat: 39.9334,
    lng: 32.8597,
  },
  {
    slug: "izmir",
    name: "İzmir",
    plate: "35",
    region: "Ege",
    lat: 38.4192,
    lng: 27.1287,
  },
  {
    slug: "bursa",
    name: "Bursa",
    plate: "16",
    region: "Marmara",
    lat: 40.1885,
    lng: 29.061,
  },
  {
    slug: "antalya",
    name: "Antalya",
    plate: "07",
    region: "Akdeniz",
    lat: 36.8969,
    lng: 30.7133,
  },
  {
    slug: "adana",
    name: "Adana",
    plate: "01",
    region: "Akdeniz",
    lat: 37.0,
    lng: 35.3213,
  },
  {
    slug: "konya",
    name: "Konya",
    plate: "42",
    region: "İç Anadolu",
    lat: 37.8667,
    lng: 32.4833,
  },
  {
    slug: "gaziantep",
    name: "Gaziantep",
    plate: "27",
    region: "Güneydoğu Anadolu",
    lat: 37.0662,
    lng: 37.3833,
  },
  {
    slug: "kocaeli",
    name: "Kocaeli",
    plate: "41",
    region: "Marmara",
    lat: 40.8533,
    lng: 29.8815,
  },
  {
    slug: "eskisehir",
    name: "Eskişehir",
    plate: "26",
    region: "İç Anadolu",
    lat: 39.7767,
    lng: 30.5206,
  },
  {
    slug: "mersin",
    name: "Mersin",
    plate: "33",
    region: "Akdeniz",
    lat: 36.8121,
    lng: 34.6415,
  },
  {
    slug: "diyarbakir",
    name: "Diyarbakır",
    plate: "21",
    region: "Güneydoğu Anadolu",
    lat: 37.9144,
    lng: 40.2306,
  },
  {
    slug: "kayseri",
    name: "Kayseri",
    plate: "38",
    region: "İç Anadolu",
    lat: 38.7312,
    lng: 35.4787,
  },
  {
    slug: "samsun",
    name: "Samsun",
    plate: "55",
    region: "Karadeniz",
    lat: 41.2867,
    lng: 36.33,
  },
  {
    slug: "denizli",
    name: "Denizli",
    plate: "20",
    region: "Ege",
    lat: 37.7765,
    lng: 29.0864,
  },
  {
    slug: "sanliurfa",
    name: "Şanlıurfa",
    plate: "63",
    region: "Güneydoğu Anadolu",
    lat: 37.1591,
    lng: 38.7969,
  },
  {
    slug: "sakarya",
    name: "Sakarya",
    plate: "54",
    region: "Marmara",
    lat: 40.7569,
    lng: 30.3783,
  },
  {
    slug: "trabzon",
    name: "Trabzon",
    plate: "61",
    region: "Karadeniz",
    lat: 41.0027,
    lng: 39.7168,
  },
  {
    slug: "manisa",
    name: "Manisa",
    plate: "45",
    region: "Ege",
    lat: 38.6191,
    lng: 27.4289,
  },
  {
    slug: "balikesir",
    name: "Balıkesir",
    plate: "10",
    region: "Marmara",
    lat: 39.6484,
    lng: 27.8826,
  },
  {
    slug: "kahramanmaras",
    name: "Kahramanmaraş",
    plate: "46",
    region: "Akdeniz",
    lat: 37.5858,
    lng: 36.9371,
  },
  {
    slug: "hatay",
    name: "Hatay",
    plate: "31",
    region: "Akdeniz",
    lat: 36.4018,
    lng: 36.3498,
  },
  {
    slug: "aydin",
    name: "Aydın",
    plate: "09",
    region: "Ege",
    lat: 37.856,
    lng: 27.8416,
  },
  {
    slug: "tekirdag",
    name: "Tekirdağ",
    plate: "59",
    region: "Marmara",
    lat: 40.9833,
    lng: 27.5167,
  },
  {
    slug: "mugla",
    name: "Muğla",
    plate: "48",
    region: "Ege",
    lat: 37.2153,
    lng: 28.3636,
  },
  {
    slug: "van",
    name: "Van",
    plate: "65",
    region: "Doğu Anadolu",
    lat: 38.4891,
    lng: 43.4089,
  },
  {
    slug: "malatya",
    name: "Malatya",
    plate: "44",
    region: "Doğu Anadolu",
    lat: 38.3552,
    lng: 38.3095,
  },
  {
    slug: "erzurum",
    name: "Erzurum",
    plate: "25",
    region: "Doğu Anadolu",
    lat: 39.9043,
    lng: 41.2679,
  },
  {
    slug: "sivas",
    name: "Sivas",
    plate: "58",
    region: "İç Anadolu",
    lat: 39.7477,
    lng: 37.0179,
  },
  {
    slug: "ordu",
    name: "Ordu",
    plate: "52",
    region: "Karadeniz",
    lat: 40.9839,
    lng: 37.8764,
  },
];

// ASN holder records checked against RIPEstat on 2026-10-25. This is not a list of every network used by each ISP.
export const ISPS_DATA: IspSeoData[] = [
  {
    "slug": "turk-telekom",
    "name": "Türk Telekom",
    "asn": "AS9121",
    "country": "Türkiye",
    "website": "https://www.turktelekom.com.tr",
    "description": "Türk Telekom bağlantınızın genel IP bilgisini sorgulayın; DNS ayarlarını, CGNAT belirtilerini ve AS9121 kayıt bilgisini kaynaklarıyla inceleyin.",
    "registryHolder": "TTNet Turk Telekomunikasyon Anonim Sirketi",
    "registryCheckedAt": "25 Ekim 2026"
  },
  {
    "slug": "turkcell-superonline",
    "name": "Turkcell Superonline",
    "asn": "AS34984",
    "country": "Türkiye",
    "website": "https://www.superonline.net",
    "description": "Turkcell Superonline bağlantınızın genel IP bilgisini sorgulayın; DNS ayarlarını, CGNAT belirtilerini ve AS34984 kayıt bilgisini kaynaklarıyla inceleyin.",
    "registryHolder": "TELLCOM-AS Superonline Iletisim Hizmetleri A.S.",
    "registryCheckedAt": "25 Ekim 2026"
  },
  {
    "slug": "turknet",
    "name": "TurkNet İletişim",
    "asn": "AS12735",
    "country": "Türkiye",
    "website": "https://turk.net",
    "description": "TurkNet İletişim bağlantınızın genel IP bilgisini sorgulayın; DNS ayarlarını, CGNAT belirtilerini ve AS12735 kayıt bilgisini kaynaklarıyla inceleyin.",
    "registryHolder": "ASTurkNet TurkNet Iletisim Hizmetleri A.S.",
    "registryCheckedAt": "25 Ekim 2026"
  },
  {
    "slug": "vodafone-net",
    "name": "Vodafone Net",
    "asn": "AS15924",
    "country": "Türkiye",
    "website": "https://www.vodafone.com.tr",
    "description": "Vodafone Net bağlantınızın genel IP bilgisini sorgulayın; DNS ayarlarını, CGNAT belirtilerini ve AS15924 kayıt bilgisini kaynaklarıyla inceleyin.",
    "registryHolder": "BORUSANTELEKOM-AS Vodafone Net Iletisim Hizmetler AS",
    "registryCheckedAt": "25 Ekim 2026"
  },
  {
    "slug": "turksat-kablonet",
    "name": "Türksat Kablonet",
    "asn": "AS47524",
    "country": "Türkiye",
    "website": "https://www.turksatkablo.com.tr",
    "description": "Türksat Kablonet bağlantınızın genel IP bilgisini sorgulayın; DNS ayarlarını, CGNAT belirtilerini ve AS47524 kayıt bilgisini kaynaklarıyla inceleyin.",
    "registryHolder": "AS-TURKSAT Turksat Uydu Haberlesme Kablo TV ve Isletme A.S.",
    "registryCheckedAt": "25 Ekim 2026"
  },
  {
    "slug": "millenicom",
    "name": "Millenicom",
    "asn": "AS34296",
    "country": "Türkiye",
    "website": "https://www.milleni.com.tr",
    "description": "Millenicom bağlantınızın genel IP bilgisini sorgulayın; DNS ayarlarını, CGNAT belirtilerini ve AS34296 kayıt bilgisini kaynaklarıyla inceleyin.",
    "registryHolder": "MILLENICOM-AS Millenicom Telekomunikasyon Hizmetleri Anonim Sirketi",
    "registryCheckedAt": "25 Ekim 2026"
  },
  {
    "slug": "netspeed",
    "name": "Netspeed",
    "asn": "AS206375",
    "country": "Türkiye",
    "website": "https://www.netspeed.com.tr",
    "description": "Netspeed bağlantınızın genel IP bilgisini sorgulayın; DNS ayarlarını, CGNAT belirtilerini ve AS206375 kayıt bilgisini kaynaklarıyla inceleyin.",
    "registryHolder": "NETSPEED NETSPEED INTERNET A.S.",
    "registryCheckedAt": "25 Ekim 2026"
  },
  {
    "slug": "gibibirnet",
    "name": "GıbırNet (GibirNet)",
    "asn": "AS208972",
    "country": "Türkiye",
    "website": "https://gibir.net.tr",
    "description": "GıbırNet (GibirNet) bağlantınızın genel IP bilgisini sorgulayın; DNS ayarlarını, CGNAT belirtilerini ve AS208972 kayıt bilgisini kaynaklarıyla inceleyin.",
    "registryHolder": "gibirnet-tr GIBIRNET ILETISIM HIZMETLERI SANAYI VE TICARET LIMITED SIRKETI",
    "registryCheckedAt": "25 Ekim 2026"
  },
  {
    "slug": "atlantisnet",
    "name": "AtlantisNet",
    "asn": "AS204457",
    "country": "Türkiye",
    "website": "https://atlantisnet.com.tr",
    "description": "AtlantisNet bağlantınızın genel IP bilgisini sorgulayın; DNS ayarlarını, CGNAT belirtilerini ve AS204457 kayıt bilgisini kaynaklarıyla inceleyin.",
    "registryHolder": "ATLANTIS-CENTRAL Atlantis Telekomunikasyon Bilisim Hizmetleri San. ve Tic. Ltd. Sti.",
    "registryCheckedAt": "25 Ekim 2026"
  }
];

export const ASNS_DATA: AsnSeoData[] = [
  {
    slug: "as9121-turk-telekom",
    asn: "AS9121",
    name: "TTNET Türk Telekomünikasyon A.Ş.",
    org: "Turk Telekom",
    country: "TR",
    description: "Türkiye'nin ulusal omurga ağı olan AS9121 Türk Telekom otonom sistem numarası, IP ön ekleri ve BGP anonsları.",
  },
  {
    slug: "as34984-superonline",
    asn: "AS34984",
    name: "Turkcell Superonline",
    org: "Turkcell Iletisim Hizmetleri A.S.",
    country: "TR",
    description: "Turkcell Superonline otonom sistemi (AS34984), fiber optik BGP yönlendirmeleri ve IP havuzları.",
  },
  {
    slug: "as12735-turknet",
    asn: "AS12735",
    name: "TurkNet Iletisim Hizmetleri A.S.",
    org: "TurkNet",
    country: "TR",
    description: "TurkNet bağımsız omurga ağı AS12735 otonom sistemi ve uluslararası peering bağlantıları.",
  },
  {
    slug: "as15169-google-llc",
    asn: "AS15169",
    name: "Google LLC",
    org: "Google LLC",
    country: "US",
    description: "Google'ın global BGP altyapısı, 8.8.8.8 DNS sunucuları ve Cloud omurgasını barındıran AS15169 detayları.",
  },
  {
    slug: "as13335-cloudflare",
    asn: "AS13335",
    name: "Cloudflare, Inc.",
    org: "Cloudflare, Inc.",
    country: "US",
    description: "Cloudflare Anycast CDN, 1.1.1.1 DNS ve DDoS koruma ağının omurgasını oluşturan AS13335.",
  },
];

export const HOME_FAQS = [
  {
    question: "IP adresim nedir ve ne işe yarar?",
    answer: "IP adresleri ağ üzerinde veri iletiminde kullanılır. Bu sayfada bağlantınızın dışarıya görünen genel IP adresi gösterilir; bu adres NAT veya CGNAT nedeniyle birden çok cihaz ya da abone tarafından paylaşılabilir. Yerel ağ adresinizle genel IP adresiniz aynı olmak zorunda değildir.",
  },
  {
    question: "IP adresimden ev adresim veya tam konumum bulunur mu?",
    answer: "Bu araç IP adresinden kesin ev adresi, cihaz konumu veya kişi kimliği çıkaramaz. ipwho.is tarafından döndürülen şehir ve koordinatlar yaklaşık bir tahmindir; operatörün yönlendirmesi ve veritabanı nedeniyle bulunduğunuz yerden farklı olabilir. Haritadaki nokta santral tespiti olarak yorumlanmamalıdır.",
  },
  {
    question: "Dinamik IP ile Statik IP arasındaki fark nedir?",
    answer: "Dinamik IP, operatörün adres atama düzenine göre değişebilir; modemi yeniden başlatmak mutlaka yeni IP verileceği anlamına gelmez. Statik IP ise hizmet kapsamında sabit tutulması amaçlanan adrestir. Tek bir sorgudan adresinizin dinamik veya statik olduğu kesin olarak belirlenemez.",
  },
  {
    question: "IPv4 ve IPv6 arasındaki fark nedir?",
    answer: "IPv4 adresleri 32 bit, IPv6 adresleri 128 bittir. IPv6 daha geniş bir adres alanı sunar; tek başına daha hızlı veya daha güvenli bağlantı garantisi değildir. Bu sayfa, isteğinizin ulaştığı bağlantının IP sürümünü gösterir; iki protokolün aynı anda çalıştığını test etmez.",
  },
  {
    question: "VPN veya Proxy kullanmak IP adresimi gizler mi?",
    answer: "VPN veya proxy üzerinden yönlendirilen isteklerde site genellikle çıkış sunucusunun IP adresini görür. İnternet servis sağlayıcınız bağlantınızı bilir; VPN kullanımı tam anonimlik garantisi vermez. Bu IP sorgusu VPN güvenliği veya sızıntı testi yapmaz.",
  },
  {
    question: "CGNAT (Carrier-Grade NAT) nedir, IP adresim neden başkalarıyla aynı?",
    answer: "CGNAT, operatörün bir genel IPv4 adresini birden çok abone arasında paylaşmasına olanak verir. Yalnızca burada görünen genel IP adresi CGNAT durumunu kanıtlamaz. Modeminizin WAN adresini karşılaştırmak ve operatörünüzden bilgi almak gerekebilir; paylaşım aynı mahallede bulunmayı gerektirmez.",
  },
];
