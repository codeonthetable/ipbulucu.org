"use client";
import {useState} from "react";
import Link from "next/link";
import {usageEvent} from "@/lib/usage";

const codes = [
  {code:"5.7.1",tr:"Yetki veya politika nedeniyle ret. Tek başına karaliste kanıtı değildir. Ret mesajında adı verilen listeyi ve gönderici doğrulamasını kontrol edin.",en:"Authorization or policy rejection. This alone does not prove a blacklist entry. Check the named list, if any, and sender authentication."},
  {code:"5.1.1",tr:"Alıcı posta kutusu adresi geçersiz. Önce adresi alıcıyla doğrulayın; karaliste kaldırma işlemi yanlış alıcıyı düzeltmez.",en:"Invalid destination mailbox. Confirm the address with the recipient; delisting cannot correct a wrong recipient."},
  {code:"4.2.2",tr:"Posta kutusu dolu; geçici hata. Alıcının kota durumunu kontrol etmesi gerekir. Sık tekrar gönderim yapmayın.",en:"Mailbox full; temporary failure. The recipient should check quota. Avoid repeated manual sends."},
  {code:"4.7.0",tr:"Geçici güvenlik veya politika sorunu. Sunucunun açıklamasını ve gönderim hızını sağlayıcınızla inceleyin.",en:"Temporary security or policy issue. Review the server explanation and sending rate with your provider."},
];
export default function MailDeliveryHelp({language="tr"}:{language?:"tr"|"en"}) {
  const en=language==="en";const [purpose,setPurpose]=useState("mail");const [code,setCode]=useState("");
  const selected=codes.find(c=>c.code===code);
  const hint=purpose==="mail"?(en?"Use the actual outbound mail server IPv4 from your mail provider or the receiving server's trusted message headers. A website A record or MX record may point elsewhere.":"Posta sağlayıcınızdan veya alıcı sunucunun güvenilir ileti başlıklarından gerçek gönderici posta sunucusunun IPv4 adresini bulun. Web sitesinin A kaydı ya da MX kaydı farklı bir sunucuyu gösterebilir.")
    :purpose==="website"?(en?"A domain lookup checks the resolved website IPv4, not necessarily the server sending email. CDN and shared hosting addresses can differ from outbound mail.":"Alan adı sorgusu çözümlenen web sitesi IPv4 adresini kontrol eder; bu, e-posta gönderen sunucu olmayabilir. CDN ve paylaşımlı hosting çıkışları farklı olabilir.")
    :(en?"Your home IP matters only if mail is sent directly from that connection. With a hosted mail service, ask for its outbound mail IP. A home IP listing does not establish that your device is infected.":"Ev IP'niz, posta doğrudan bu bağlantıdan çıkıyorsa ilgilidir. Barındırılan posta hizmetinde sağlayıcının gönderici IP'sini kullanın. Ev IP'sinin listelenmesi cihazınızda zararlı yazılım olduğunu kanıtlamaz.");
  return <section id="mail-delivery-help" className="scroll-mt-24 max-w-4xl mx-auto rounded-3xl border border-gray-200 dark:border-gray-800 p-5 sm:p-8 space-y-5">
    <h2 className="text-xl sm:text-2xl font-bold">{en?"Which IP should I check for email spam?":"Spam sorunu için hangi IP kontrol edilmeli?"}</h2>
    <div className="flex flex-wrap gap-2">{[{id:"mail",label:en?"Outgoing email":"Gönderilen e-posta"},{id:"website",label:en?"Website / domain":"Web sitesi / alan adı"},{id:"home",label:en?"Home connection":"Ev bağlantısı"}].map(p=><button key={p.id} type="button" aria-pressed={purpose===p.id} onClick={()=>{setPurpose(p.id);usageEvent("blacklist_target_help",{purpose:p.id,language,interaction:"user"});}} className={`rounded-xl border px-3 py-2 text-sm ${purpose===p.id?"border-blue-600 text-blue-700 dark:text-blue-300":"border-gray-300 dark:border-gray-700"}`}>{p.label}</button>)}</div>
    <p role="status" className="text-sm text-gray-600 dark:text-gray-300">{hint}</p>
    <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-4 space-y-3">
      <h3 className="font-bold">{en?"550 5.7.1: is this a blacklist rejection?":"550 5.7.1 hatası: karaliste mi?"}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{en?"Choose the enhanced status code from the bounce message. Do not paste the email, recipient address or full headers. This helper explains a code; it does not inspect a message.":"Dönen hata iletisindeki ayrıntılı durum kodunu seçin. E-posta içeriğini, alıcı adresini veya tam başlıkları buraya yapıştırmanız gerekmez. Bu yardımcı kodu açıklar; iletiyi incelemez."}</p>
      <label className="block text-sm font-semibold">{en?"Mail delivery status code":"E-posta teslimat durum kodu"}<select value={code} onChange={e=>{setCode(e.target.value);if(e.target.value)usageEvent("mail_error_help",{code:e.target.value,language,interaction:"user"});}} className="block w-full sm:w-72 mt-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3"><option value="">{en?"Select a code":"Kodu seçin"}</option>{codes.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select></label>
      {selected&&<p role="status" className="border-l-4 border-blue-500 pl-3 text-sm">{selected[language]}</p>}
      <details className="text-sm"><summary className="cursor-pointer font-semibold">{en?"Read all four code explanations":"Dört kodun açıklamasını göster"}</summary><dl className="mt-3 space-y-3">{codes.map(c=><div key={c.code}><dt className="font-mono font-bold">{c.code}</dt><dd className="text-gray-600 dark:text-gray-300">{c[language]}</dd></div>)}</dl></details>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300">{en?"Automatic checks cover SpamCop and DroneBL when available. Use official checks for the other providers; retrying here does not enable their automatic access.":"Otomatik kontrol, erişilebildiğinde SpamCop ve DroneBL'yi kapsar. Diğer sağlayıcılarda resmi kontrolü kullanın; burada tekrar sorgulamak otomatik erişimi etkinleştirmez."}</p>
    <div className="flex flex-wrap gap-4 text-sm text-blue-600 underline"><a href="https://check.spamhaus.org/">Spamhaus</a><a href="https://www.barracudacentral.org/lookups">Barracuda</a><Link href={en?"/en/email-security/":"/eposta-guvenlik-kontrolu/"}>{en?"Check mail DNS records":"E-posta DNS kayıtlarını kontrol et"}</Link></div>
    <p className="text-xs text-gray-500">{en?"References: ":"Kaynaklar: "}<a className="underline" href="https://www.rfc-editor.org/rfc/rfc3463">RFC 3463</a> · <a className="underline" href="https://support.google.com/mail/answer/81126">Google · {en?"Sender guidelines":"Gönderici kuralları"}</a></p>
  </section>;
}
