"use client";

import Link from "next/link";
import { usageEvent } from "@/lib/usage";

type Step = { title: string; text: string; href?: string; label?: string };
const guides = {
  port: {
    tr: { title: "Port açtım ama çalışmıyor: nereden başlamalıyım?", intro: "Kontrolleri sırayla uygulayın; her değişiklikten sonra yalnızca ilgili portu yeniden deneyin.", steps: [
      { title: "1. Servisi yerel ağda doğrulayın", text: "Uygulama çalışıyor mu, doğru TCP portunu dinliyor mu? Önce aynı ağdaki başka bir cihazdan deneyin. Port numarasının yanındaki servis adı yaygın kullanım etiketidir." },
      { title: "2. WAN adresini genel IPv4 adresiyle karşılaştırın", text: "Modemin İnternet/WAN ekranını kontrol edin. 100.64.0.0/10 paylaşımlı adres alanıdır. Farklı adres NAT veya farklı çıkış gösterebilir; CGNAT durumunu sağlayıcınızla doğrulayın.", href: "/cgnat-nedir-nasil-anlasilir/", label: "CGNAT kontrol rehberi" },
      { title: "3. Yönlendirme ve güvenlik duvarını inceleyin", text: "Kural doğru yerel cihaza ve TCP portuna gitmeli. Cihazın adresi değişmiş olabilir. Yalnızca gereken port için izin verin; bütün güvenlik duvarını kapatmayın." },
      { title: "4. Alan adı doğru hedefe gidiyor mu?", text: "A ve AAAA kayıtlarını inceleyin. DNS değişikliği veya farklı IPv4/IPv6 hedefleri sonucu etkileyebilir. Zaman aşımı tek başına kapalı port anlamına gelmez.", href: "/dns-sorgulama/", label: "DNS kayıtlarını kontrol et" },
    ] },
    en: { title: "Port forwarding not working? Follow these checks", intro: "Work through the steps and retest only the relevant port after each change.", steps: [
      { title: "1. Check the local service", text: "Confirm that the application is running and listening on the intended TCP port. Try it from another device on your LAN. Service names beside port numbers are conventional labels." },
      { title: "2. Compare WAN and public IPv4 addresses", text: "Check the router WAN page. 100.64.0.0/10 is shared address space. A mismatch can indicate NAT or a different exit path; ask your provider to confirm CGNAT.", href: "/en/", label: "Check your public IP" },
      { title: "3. Review forwarding and firewall rules", text: "The rule must point to the correct local device and TCP port. Its address may have changed. Allow only the required service instead of disabling the entire firewall." },
      { title: "4. Check the domain's destination", text: "Review A and AAAA records. DNS changes and different IPv4/IPv6 destinations can affect results. A timeout alone does not prove that a port is closed.", href: "/en/dns-lookup/", label: "Look up DNS records" },
    ] },
  },
  email: {
    tr: { title: "E-postalarım spam'e düşüyor: dört kontrol", intro: "Kayıt varlığı teslimatı garanti etmez. Gönderen alan adını ve gerçek posta sunucusunu esas alın.", steps: [
      { title: "1. DNS kayıtlarını inceleyin", text: "MX, SPF ve doğrudan DMARC kayıtlarını kontrol edin. Eksik veya yinelenen kayıtları e-posta sağlayıcınızın talimatlarıyla değerlendirin.", href: "/eposta-guvenlik-kontrolu/", label: "MX, SPF ve DMARC kontrolü" },
      { title: "2. Gerçek bir iletinin doğrulama sonucunu okuyun", text: "Alınmış bir test iletisinin Authentication-Results başlığında SPF, DKIM ve DMARC sonuçlarını inceleyin. Bu sayfa DKIM veya ileti hizalamasını test etmez; e-posta içeriğini buraya yüklemeniz gerekmez." },
      { title: "3. Gönderici IP adresini kontrol edin", text: "Posta sağlayıcınızdan veya ileti başlığından gerçek çıkış IP adresini öğrenin. Web sitesi IP'si ve MX adresi göndericiyle aynı olmayabilir. DNSBL'de bilinmeyen sonuç, temiz sonuç değildir.", href: "/karaliste-kontrolu/", label: "Gönderici IP için karaliste kontrolü" },
      { title: "4. Değişiklikten sonra tekrar ölçün", text: "DNS önbellekleri ve TTL nedeniyle değişiklikler hemen görünmeyebilir. Kayıtları tekrar kontrol edin; sorun sürerse alıcı sunucunun hata kodunu posta sağlayıcınızla inceleyin.", href: "/dns-yayilma-kontrolu/", label: "DNS yanıtlarını karşılaştır" },
    ] },
    en: { title: "Why are my emails going to spam? Four checks", intro: "Record presence cannot guarantee delivery. Use the sending domain and the actual outbound mail server.", steps: [
      { title: "1. Inspect mail DNS records", text: "Check MX, SPF and the direct DMARC record. Review missing or duplicate entries using your sending provider's instructions.", href: "/en/email-security/", label: "Check MX, SPF and DMARC" },
      { title: "2. Read a real message's authentication results", text: "Inspect SPF, DKIM and DMARC in the Authentication-Results header of a received test message. This page does not test DKIM or message alignment. You do not need to upload the email here." },
      { title: "3. Check the sending IP", text: "Find the outbound IP in message headers or ask your mail provider. Your website IP and MX host may be different. An unavailable DNSBL result is unknown, not clean.", href: "/en/blacklist-check/", label: "Check IP spam blacklist results" },
      { title: "4. Recheck after changes", text: "DNS caches and TTL can delay visible changes. Recheck the records; if delivery still fails, review the receiving server's error code with your mail provider.", href: "/en/dns-propagation/", label: "Compare DNS answers" },
    ] },
  },
};

export default function TroubleshootingGuide({ kind, language = "tr" }: { kind: keyof typeof guides; language?: "tr" | "en" }) {
  const guide = guides[kind][language];
  const sources = kind === "port"
    ? [{ label: "IETF · TCP (RFC 9293)", href: "https://www.rfc-editor.org/rfc/rfc9293" }, { label: "IETF · Shared address space (RFC 6598)", href: "https://www.rfc-editor.org/rfc/rfc6598" }]
    : [{ label: "Google · Email sender guidelines", href: "https://support.google.com/mail/answer/81126" }];
  return <section id="troubleshooting" className="max-w-4xl mx-auto rounded-3xl border border-gray-200 dark:border-gray-800 p-5 sm:p-8 space-y-5">
    <div><h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{guide.title}</h2><p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{guide.intro}</p></div>
    <ol className="grid gap-5 md:grid-cols-2">{(guide.steps as Step[]).map((step, index) => <li key={step.title} className="space-y-2">
      <h3 className="font-semibold text-gray-900 dark:text-white">{step.title}</h3>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{step.text}</p>
      {step.href && <Link href={step.href} onClick={() => usageEvent("diagnostic_next_step", { journey: kind, step: index + 1, language, interaction: "user" })} className="inline-block text-sm font-semibold text-blue-700 dark:text-blue-400 underline underline-offset-4">{step.label} →</Link>}
    </li>)}</ol>
    <p className="text-xs text-gray-500 dark:text-gray-400">{language === "en" ? "References · " : "Kaynaklar · "}{sources.map((source, i) => <span key={source.href}>{i > 0 && " · "}<a href={source.href} className="underline">{source.label}</a></span>)}</p>
  </section>;
}
