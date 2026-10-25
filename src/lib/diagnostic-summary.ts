export type DiagnosticLanguage = "tr" | "en";
export type DiagnosticSummary = {
  tool: "port" | "email-security";
  title: string;
  findings: string[];
  nextSteps: string[];
  limits: string;
};

// Only approved numeric values and fixed labels leave the raw result object.
// Do not include host, IP, DNS records, error text, or arbitrary API strings.
export function portSummary(rows: { port: number; status?: string }[], language: DiagnosticLanguage): DiagnosticSummary {
  const en = language === "en";
  const valid = rows.filter((r) => Number.isInteger(r.port) && r.port >= 1 && r.port <= 65535);
  const labels = en
    ? { open: "TCP connection established", closed: "Connection refused", filtered: "Inconclusive (timeout or network error)", unavailable: "Not tested within the request time budget" }
    : { open: "TCP bağlantısı kuruldu", closed: "Bağlantı reddedildi", filtered: "Belirsiz (zaman aşımı veya ağ hatası)", unavailable: "İstek süresi içinde test edilemedi" };
  const findings = valid.map((r) => `TCP ${r.port}: ${Object.prototype.hasOwnProperty.call(labels, r.status || "") ? labels[r.status as keyof typeof labels] : (en ? "Unknown result" : "Sonuç bilinmiyor")}`);
  const nextSteps: string[] = [];
  if (valid.some((r) => r.status === "open")) nextSteps.push(en
    ? "Confirm that the reachable service is intended. Test the application itself and review its access controls."
    : "Erişilebilen servisin gerekli olduğunu doğrulayın. Uygulamanın kendisini ve erişim izinlerini kontrol edin.");
  if (valid.some((r) => r.status === "closed")) nextSteps.push(en
    ? "Check that the application is listening on the expected TCP port, then review the forwarding destination and firewall rule."
    : "Uygulamanın beklenen TCP portunu dinlediğini, yönlendirmenin doğru cihaza gittiğini ve güvenlik duvarı kuralını kontrol edin.");
  if (valid.some((r) => r.status !== "open" && r.status !== "closed")) nextSteps.push(en
    ? "Retry the relevant port later. Compare the router WAN address with the public address and ask the provider about NAT if they differ."
    : "İlgili portu daha sonra tekrar kontrol edin. Modemin WAN adresi ile genel adresi karşılaştırın; farklıysa sağlayıcınızdan NAT durumunu doğrulayın.");
  return {
    tool: "port", title: en ? "TCP reachability summary" : "TCP erişim özeti", findings, nextSteps,
    limits: en
      ? "One observation from the IPBulucu server. UDP, service identity, security and CGNAT are not verified. A timeout alone proves neither a closed port nor CGNAT."
      : "IPBulucu sunucusundan tek gözlem. UDP, servis kimliği, güvenlik ve CGNAT doğrulanmaz. Zaman aşımı tek başına kapalı port veya CGNAT kanıtı değildir.",
  };
}

type MailRecord = { count?: number; present?: boolean };
export type EmailEvidence = {
  mx?: { records?: { exchange: string; priority: number }[] };
  spf?: MailRecord;
  dmarc?: MailRecord;
};
export function emailSummary(result: EmailEvidence, language: DiagnosticLanguage): DiagnosticSummary {
  const en = language === "en";
  const count = (record?: MailRecord) => Number.isInteger(record?.count) && record!.count! >= 0 ? record!.count! : null;
  const spf = count(result.spf), dmarc = count(result.dmarc);
  const records = Array.isArray(result.mx?.records) ? result.mx.records : null;
  const nullMx = records?.length === 1 && records[0].priority === 0 && records[0].exchange === ".";
  const label = (n: number | null) => n === null ? (en ? "Unknown" : "Bilinmiyor") : n === 0 ? (en ? "No record at this name" : "Bu adreste kayıt bulunamadı") : n === 1 ? (en ? "One record; policy not fully validated" : "Tek kayıt; politika bütünüyle doğrulanmadı") : (en ? `${n} records; review duplicates` : `${n} kayıt; yinelenen kayıtları inceleyin`);
  const findings = [
    `MX: ${nullMx ? (en ? "Null MX: domain declares it does not accept email" : "Null MX: alan adı posta kabul etmediğini bildiriyor") : records === null ? (en ? "Unknown" : "Bilinmiyor") : (en ? `${records.length} records found` : `${records.length} kayıt bulundu`)}`,
    `SPF: ${label(spf)}`, `DMARC: ${label(dmarc)}`,
  ];
  const nextSteps: string[] = [];
  if (nullMx) nextSteps.push(en ? "If incoming mail is expected, review the MX configuration with your mail provider." : "Gelen posta bekleniyorsa MX yapılandırmasını e-posta sağlayıcınızla gözden geçirin.");
  if (spf === 0 || (spf !== null && spf > 1)) nextSteps.push(en ? "Use your sending provider's instructions to review SPF; avoid publishing separate SPF records for each sender." : "Gönderen sağlayıcının talimatlarıyla SPF kaydını düzenleyin; her gönderici için ayrı SPF kaydı yayımlamayın.");
  if (dmarc === 0 || (dmarc !== null && dmarc > 1)) nextSteps.push(en ? "Review the direct DMARC record and the organizational-domain policy. This check does not evaluate inheritance." : "Doğrudan DMARC kaydını ve üst alan adı politikasını inceleyin. Bu test politika devralmayı değerlendirmez.");
  nextSteps.push(en
    ? "Inspect Authentication-Results in a delivered test message for SPF, DKIM and DMARC alignment. Check the actual outbound mail IP if delivery still fails."
    : "Teslim edilmiş bir test iletisinin Authentication-Results başlığında SPF, DKIM ve DMARC hizalamasını inceleyin. Sorun sürerse gerçek gönderici posta IP adresini kontrol edin.");
  return {
    tool: "email-security", title: en ? "Mail DNS summary" : "E-posta DNS özeti", findings, nextSteps,
    limits: en
      ? "DNS record presence only. DKIM, SPF expansion, DMARC inheritance, message authentication and inbox delivery were not tested."
      : "Yalnızca DNS kayıt varlığı. DKIM, SPF zinciri, DMARC devralma, ileti doğrulaması ve gelen kutusuna teslimat test edilmedi.",
  };
}

export function summaryText(summary: DiagnosticSummary, language: DiagnosticLanguage): string {
  const en = language === "en";
  return ["IPBulucu.org — " + summary.title,
    en ? "Target identifiers and DNS record contents omitted." : "Hedef bilgileri ve DNS kayıt içerikleri çıkarılmıştır.",
    "", ...summary.findings.map((line) => "• " + line), "",
    en ? "Next steps:" : "Sonraki adımlar:", ...summary.nextSteps.map((line) => "• " + line), "", summary.limits].join("\n");
}
