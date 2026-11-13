// No lookup values are stored or emitted to analytics by these helpers.
export function isIPv4(value: string): boolean {
  return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(value.trim()) && value.trim().split('.').every(n => Number(n) <= 255 && String(Number(n)) === n);
}
export function blacklistInputError(value: string, confirmed: boolean, language: 'tr'|'en'): string | null {
  const v=value.trim(); const en=language==='en';
  if (!v) return en?'Enter the IPv4 address of the sending server.':'Gönderici sunucunun IPv4 adresini girin.';
  if (isIPv4(v)) return null;
  if (/^[\d.]+$/.test(v) || v.includes(':')) return en?'Enter a valid IPv4 address; IPv6 and URLs are not supported.':'Geçerli bir IPv4 adresi girin; IPv6 ve URL desteklenmiyor.';
  if (v.length>253 || !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(v)) return en?'Enter a hostname without https://, a path or an email address.':'https://, yol veya e-posta adresi içermeyen bir sunucu adı girin.';
  if (!confirmed) return en?'Confirm that you want to check this hostname’s IPv4. A domain does not identify the outbound mail server.':'Bu sunucu adının IPv4 adresini kontrol etmek istediğinizi onaylayın. Alan adı, giden posta sunucusunu belirlemez.';
  return null;
}
export function listenerCommands(value: string): {windows:string;linux:string}|null {
  if (!/^\d+$/.test(value) || Number(value)<1 || Number(value)>65535) return null;
  const port=Number(value);
  return {windows:`Get-NetTCPConnection -State Listen -LocalPort ${port}`,linux:`ss -ltn 'sport = :${port}'`};
}
