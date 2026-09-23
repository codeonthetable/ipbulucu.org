export interface IpGeoData {
  ip: string;
  version: "IPv4" | "IPv6";
  ipType?: "Ev / Bireysel (Residential)" | "Veri Merkezi / Hosting" | "Mobil (Cellular)" | "Kurumsal (Business)" | "Bilinmiyor";
  country: string;
  countryCode: string;
  flagEmoji?: string;
  city: string;
  region: string;
  regionCode?: string;
  district?: string;
  continent?: string;
  continentCode?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  postalCode?: string;
  isp: string;
  org: string;
  asn: string;
  asnOrg?: string;
  hostname?: string;
  isVpn?: boolean;
  isProxy?: boolean;
  isTor?: boolean;
  isHosting?: boolean;
  isCgnat?: boolean;
  securityScore?: number;
  threatLevel?: "Güvenli (Düşük)" | "Şüpheli (Orta)" | "Yüksek Risk";
  fraudScore?: number;
  currency?: {
    code: string;
    name: string;
  };
  // Enterprise & Paid-Grade Intelligence
  connectionType?: string;
  lineSpeedTier?: string;
  vpnServiceName?: string;
  userPersona?: string;
  localAreaCode?: string;
  plateCode?: string;
  weatherEstimate?: {
    temp: string;
    condition: string;
  };
  utcOffset?: string;
  fraudFactors?: {
    name: string;
    status: "Temiz" | "Şüpheli" | "Riskli";
    detail: string;
  }[];
  exposedServices?: {
    port: number;
    name: string;
    status: "Güvenli (Kapalı)" | "Açık (Erişilebilir)" | "Filtreli";
  }[];
  // BGP & Routing
  bgpPrefix?: string;
  upstreamProviders?: string[];
  ixpConnections?: string[];
  allocatedDate?: string;
  allocatedRegistry?: string;
  // Mathematical representations
  ipFormats?: {
    decimal: number;
    hex: string;
    dotHex: string;
    octal: string;
    binary: string;
    integerUrl: string;
    reverseDnsPtr: string;
  };
  // Gaming & Global Latency Matrix
  globalPings?: {
    city: string;
    country: string;
    flag: string;
    pingMs: number;
    quality: "Mükemmel" | "İyi" | "Orta" | "Uzak";
  }[];
  gamePings?: {
    game: string;
    server: string;
    pingMs: number;
    status: "Mükemmel" | "İyi" | "Orta";
  }[];
  cgnatDiagnostic?: {
    isBehindCgnat: boolean;
    canPortForward: boolean;
    solution: string;
  };
  cachedAt?: string;
}

export interface ClientDeviceInfo {
  browser: string;
  os: string;
  deviceType: string;
  screenResolution: string;
  colorDepth: string;
  language: string;
  timezone: string;
  onlineStatus: boolean;
  pingMs?: number;
}

export interface WhoisRecord {
  domainOrIp: string;
  registrar?: string;
  registrarUrl?: string;
  registeredOn?: string;
  expiresOn?: string;
  updatedOn?: string;
  status?: string[];
  nameServers?: string[];
  rawText?: string;
  organization?: string;
  country?: string;
  dnssec?: string;
  parsedFields?: Record<string, string>;
}

export interface DnsLookupResult {
  host: string;
  resolvedIp?: string;
  responseTimeMs?: number;
  records: {
    A?: string[];
    AAAA?: string[];
    MX?: { exchange: string; priority: number }[];
    TXT?: string[][];
    NS?: string[];
    CNAME?: string[];
    SOA?: {
      nsname: string;
      hostmaster: string;
      serial: number;
      refresh: number;
      retry: number;
      expire: number;
      minttl: number;
    };
    CAA?: { critical: number; issue?: string; issuewild?: string; iodef?: string }[];
  };
}

export interface PortCheckResult {
  ip: string;
  port: number;
  service: string;
  status: "open" | "closed" | "filtered" | "error";
  responseTimeMs?: number;
  details?: string;
}

export interface BlacklistCheckResult {
  ip: string;
  totalChecked: number;
  listedCount: number;
  cleanCount: number;
  results: {
    host: string;
    name: string;
    listed: boolean;
    response?: string;
    delistUrl?: string;
  }[];
}
