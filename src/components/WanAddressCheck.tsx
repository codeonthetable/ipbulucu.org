"use client";
import { useState } from "react";
import Link from "next/link";
import { compareWan, type WanComparison } from "@/lib/wan-comparison";
import { usageEvent } from "@/lib/usage";

const messages: Record<WanComparison, { tr: string; en: string }> = {
  invalid: {tr:"İki alana da geçerli bir IP adresi girin. Modem kullanıcı adı veya parolası gerekmez.",en:"Enter a valid IP address in both fields. No router username or password is needed."},
  ipv6: {tr:"Bu karşılaştırma IPv4 içindir. Modemdeki WAN IPv4 ile aynı bağlantının genel IPv4 adresini kullanın; IPv6 sonucundan IPv4 CGNAT kararı çıkarılmaz.",en:"This comparison is for IPv4. Use the router WAN IPv4 and the public IPv4 of the same connection. IPv6 does not establish IPv4 CGNAT status."},
  public_required: {tr:"Genel IPv4 alanına yerel, paylaşımlı veya özel amaçlı bir adres girdiniz. IP sorgusundaki genel IPv4 adresini kullanın.",en:"The public IPv4 field contains a private, shared or special-use address. Use the public IPv4 shown by an IP lookup."},
  shared: {tr:"WAN adresi 100.64.0.0–100.127.255.255 paylaşımlı alanında. Bu, operatör NAT'ı ile uyumludur. Sağlayıcınızdan CGNAT ve gelen bağlantı seçeneklerini doğrulayın; modem port kuralı tek başına yeterli olmayabilir.",en:"The WAN address is in shared space (100.64.0.0–100.127.255.255), consistent with carrier NAT. Ask your provider to confirm CGNAT and inbound connectivity options; a router forwarding rule alone may be insufficient."},
  private: {tr:"WAN adresi özel ağ alanında. Önünde başka bir modem/router veya sağlayıcı NAT'ı bulunabilir. Çift NAT'ı ve doğru WAN ekranını kontrol edin; bu sonuç tek başına operatör CGNAT'ını kanıtlamaz.",en:"The WAN address is private. An upstream router or provider NAT may exist. Check for double NAT and the correct WAN interface; this alone does not prove carrier CGNAT."},
  special: {tr:"WAN alanında özel amaçlı bir IPv4 adresi var. Doğru İnternet/WAN arayüzünü ve bağlantı durumunu kontrol edin; bu adresle NAT sonucu çıkarılmadı.",en:"The WAN field contains a special-use IPv4 address. Check the Internet/WAN interface and connection state; no NAT conclusion was drawn."},
  same: {tr:"İki IPv4 adresi aynı. Bu karşılaştırmada adres farkı görülmedi; port erişimi yine servis, güvenlik duvarı ve yönlendirmeye bağlıdır. Yalnızca ihtiyacınız olan TCP portunu test edin.",en:"Both IPv4 addresses match. No address mismatch was observed; reachability still depends on the service, firewall and forwarding. Test only the TCP port you need."},
  different: {tr:"İki genel IPv4 farklı. Aynı bağlantıda ve aynı anda ölçtüğünüzü doğrulayın; VPN, proxy, farklı WAN veya değişen IP sonucu etkileyebilir. Bu fark tek başına CGNAT kanıtı değildir.",en:"The two public IPv4 addresses differ. Check the same connection at the same time; a VPN, proxy, another WAN or changing IP may affect the result. A mismatch alone does not prove CGNAT."},
};

export default function WanAddressCheck({language="tr", provider}:{language?:"tr"|"en";provider?:string}) {
  const en=language==="en";
  const [wan,setWan]=useState(""); const [publicIp,setPublicIp]=useState("");
  const [result,setResult]=useState<WanComparison|null>(null);
  return <section id="wan-check" className="scroll-mt-24 max-w-4xl mx-auto rounded-3xl border border-blue-200 dark:border-blue-900 p-5 sm:p-8 space-y-4">
    <h2 className="text-xl sm:text-2xl font-bold">{en?"Compare router WAN and public IPv4":`${provider ? provider+": " : ""}WAN ve genel IPv4 karşılaştırması`}</h2>
    <p className="text-sm text-gray-600 dark:text-gray-300">{en?"Copy the WAN IPv4 from your router's Internet status page, then the public IPv4 from an IP lookup on the same connection. The LAN gateway (often 192.168.1.1) is not the WAN address.":"Modemin İnternet/WAN durumundaki IPv4 adresini ve aynı bağlantıda IP sorgusunun gösterdiği genel IPv4 adresini girin. Modeme giriş adresi (çoğunlukla 192.168.1.1) WAN adresi değildir."}</p>
    <form onSubmit={e=>{e.preventDefault();const outcome=compareWan(wan,publicIp);setResult(outcome);usageEvent("wan_comparison",{outcome,language,interaction:"user"});}} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-sm font-semibold">{en?"Router WAN IPv4":"Modemin WAN IPv4 adresi"}<input value={wan} onChange={e=>{setWan(e.target.value);setResult(null);}} required maxLength={45} spellCheck={false} autoComplete="off" className="block w-full min-w-0 mt-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent p-3" /></label>
        <label className="text-sm font-semibold">{en?"Public IPv4 on this connection":"Aynı bağlantının genel IPv4 adresi"}<input value={publicIp} onChange={e=>{setPublicIp(e.target.value);setResult(null);}} required maxLength={45} spellCheck={false} autoComplete="off" className="block w-full min-w-0 mt-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent p-3" /></label>
      </div>
      <button className="rounded-xl bg-blue-600 text-white px-5 py-3 font-semibold">{en?"Compare addresses":"Adresleri karşılaştır"}</button>
    </form>
    <p className="text-xs text-gray-500">{en?"Comparison runs in this tab. Entered addresses are not sent by this tool or saved. It cannot confirm CGNAT.":"Karşılaştırma bu sekmede yapılır. Girilen adresler bu araç tarafından gönderilmez veya kaydedilmez. Kesin CGNAT tespiti yapmaz."}</p>
    {result&&<p role="status" className="rounded-xl bg-blue-50 dark:bg-blue-950/40 p-4 text-sm leading-relaxed">{messages[result][language]}</p>}
    <div className="flex flex-wrap gap-4 text-sm text-blue-600 underline">
      <Link href={en?"/en/":"/"}>{en?"Find my public IP":"Genel IP adresimi öğren"}</Link>
      <Link href={en?"/en/port-scanner/":"/port-kontrolu/"}>{en?"Check a TCP port":"TCP portunu kontrol et"}</Link>
      {!en&&<Link href="/cgnat-nedir-nasil-anlasilir/">CGNAT ve çift NAT rehberi</Link>}
    </div>
    <p className="text-xs text-gray-500">{en?"Address ranges: ":"Adres aralıkları: "}<a className="underline" href="https://www.rfc-editor.org/rfc/rfc6598">RFC 6598</a> · <a className="underline" href="https://www.rfc-editor.org/rfc/rfc1918">RFC 1918</a></p>
  </section>;
}
