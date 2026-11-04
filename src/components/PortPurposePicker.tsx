"use client";
import {useState} from "react";
import {toolFetch,usageEvent} from "@/lib/usage";
import {calculateIpFormats} from "@/lib/ip-formats";

const purposes = [
  {id:"web",port:"443",label:"HTTPS",tr:"Varsayılan HTTPS TCP portu 443'tür. TCP bağlantısı kurulması sertifikanın veya web uygulamasının düzgün çalıştığını doğrulamaz.",en:"HTTPS defaults to TCP 443. A TCP connection does not validate the certificate or web application."},
  {id:"minecraft",port:"25565",label:"Minecraft Java",tr:"Java sunucusunun varsayılan TCP portu 25565'tir; server.properties içindeki server-port değeri farklıysa onu girin. Bedrock'ın UDP erişimi bu araçla test edilmez.",en:"Java servers default to TCP 25565; use server-port from server.properties if different. This tool cannot test Bedrock UDP reachability."},
  {id:"remote",port:"3389",label:"RDP",tr:"RDP'nin varsayılan TCP portu 3389'dur. Dış portu değiştirdiyseniz modem kuralındaki dış portu girin. Açık sonuç oturum açmayı veya UDP erişimini doğrulamaz; uzak erişimi güvendiğiniz kaynaklarla sınırlayın.",en:"RDP defaults to TCP 3389. If translated, enter the external port from the forwarding rule. Open does not validate login or UDP reachability; restrict remote access to trusted sources."},
  {id:"custom",port:"",label:"",tr:"NAS, kamera veya başka bir uygulama için cihazın yapılandırmasındaki TCP portunu bulun. Modemdeki dış port ile cihazın iç portu farklıysa dış portu burada test edin.",en:"For a NAS, camera or another application, find its configured TCP port. If the router translates external to internal ports, test the external port here."},
];
export default function PortPurposePicker({language="tr",onPort,onHost,disabled=false}:{language?:"tr"|"en";onPort:(value:string)=>void;onHost:(value:string)=>void;disabled?:boolean}) {
  const en=language==="en";const [selected,setSelected]=useState("custom");const [busy,setBusy]=useState(false);const [error,setError]=useState("");
  const current=purposes.find(p=>p.id===selected)!;
  async function myIp(){
    setBusy(true);setError("");
    try {const r=await toolFetch("/api/ip?format=text",{cache:"no-store"},"user");const value=(await r.text()).trim();if(!r.ok||!calculateIpFormats(value))throw new Error();onHost(value);}
    catch{setError(en?"Public IP could not be read. Enter it manually.":"Genel IP okunamadı. Elle girebilirsiniz.");}finally{setBusy(false);}
  }
  return <div className="space-y-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-4">
    <p className="font-semibold text-sm">{en?"What are you checking?":"Ne için port kontrolü yapıyorsunuz?"}</p>
    <div className="flex flex-wrap gap-2">{purposes.map(p=><button key={p.id} type="button" disabled={disabled} aria-pressed={selected===p.id} onClick={()=>{setSelected(p.id);if(p.port)onPort(p.port);usageEvent("port_purpose_select",{purpose:p.id,language,interaction:"user"});}} className={`rounded-lg border px-3 py-2 text-sm disabled:opacity-50 ${selected===p.id?"border-blue-600 text-blue-700 dark:text-blue-300":"border-gray-300 dark:border-gray-600"}`}>{p.label||(en?"NAS / camera / custom":"NAS / kamera / özel")}</button>)}</div>
    <p className="text-sm text-gray-600 dark:text-gray-300">{current[language]}</p>
    <p className="text-xs text-gray-500">{en?"Selecting a preset only fills the port. A test starts when you press Check Port.":"Seçim yalnızca port alanını doldurur. Test, Portu Test Et düğmesine bastığınızda başlar."}</p>
    <button type="button" disabled={disabled||busy} onClick={myIp} className="text-sm text-blue-600 underline disabled:opacity-50">{busy?(en?"Reading IP…":"IP okunuyor…"):(en?"Use my public IP":"Genel IP adresimi kullan")}</button>
    <p className="text-xs text-gray-500">{en?"For a remote server, enter its address instead. Your current connection may use a VPN or a different exit.":"Uzak sunucu için onun adresini girin. Mevcut bağlantınız VPN veya farklı bir çıkış kullanıyor olabilir."}</p>
    <p className="text-xs text-gray-500">{en?"Port references: ":"Port kaynakları: "}<a className="underline" href="https://help.minecraft.net/hc/en-us/articles/360058525452">Minecraft</a> · <a className="underline" href="https://learn.microsoft.com/en-us/troubleshoot/windows-server/remote/ports-used-by-rds">Microsoft RDS</a></p>
    {error&&<p role="alert" className="text-sm text-red-600">{error}</p>}
  </div>;
}
