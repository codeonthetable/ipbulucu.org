"use client";
import {useEffect,useState} from 'react';
import {listenerCommands} from '@/lib/target-guidance';
import {usageEvent} from '@/lib/usage';
export default function PortLocalDiagnostic({port,language='tr'}:{port:string;language?:'tr'|'en'}) {
 const en=language==='en'; const [internalPort,setInternalPort]=useState<string|null>(null); const [observation,setObservation]=useState('');
 const value=internalPort??port;const commands=listenerCommands(value);
 useEffect(()=>setObservation(''),[value]);
 const choices=en?['No listener found','Only 127.0.0.1 or ::1','LAN address, 0.0.0.0 or ::']:['Dinleyen servis bulunamadı','Yalnızca 127.0.0.1 veya ::1','LAN adresi, 0.0.0.0 veya ::'];
 const advice=en?[
  'Start the application and check its configured TCP port. A router rule cannot forward to a service that is not listening. A command failure is not proof that no listener exists.',
  'The service accepts local connections only. Review the application’s listen/bind setting and choose the intended LAN interface; keep access restricted with firewall rules.',
  'Check the TCP forwarding rule: the external port must point to this device and its internal port. Compare WAN and public IP below. An IPv6-only listener does not prove IPv4 reachability.'
 ]:[
  'Uygulamayı başlatın ve yapılandırılmış TCP portunu kontrol edin. Modem kuralı, dinlemeyen bir servise bağlantı sağlayamaz. Komutun hata vermesi tek başına dinleyen servis olmadığı anlamına gelmez.',
  'Servis yalnızca aynı cihazdan bağlantı kabul ediyor. Uygulamanın listen/bind ayarında uygun LAN arayüzünü seçin; erişimi güvenlik duvarı kurallarıyla sınırlı tutun.',
  'TCP yönlendirme kuralında dış portun bu cihaza ve iç porta gittiğini kontrol edin. Aşağıda WAN ve genel IP’yi karşılaştırın. Yalnızca IPv6 dinlenmesi IPv4 erişimini doğrulamaz.'
 ];
 return <section id="local-port-check" className="max-w-3xl mx-auto border-t border-gray-200 dark:border-gray-800 pt-6 space-y-4">
  <h2 className="text-xl font-bold">{en?'Port forwarded, but still closed?':'Port yönlendirdim ama hâlâ kapalı'}</h2>
  <p className="text-sm text-gray-600 dark:text-gray-300">{en?'First check whether the application is listening on the destination device. Run one command there; this page does not run commands or read your network.':'Önce hedef cihazda uygulamanın dinleyip dinlemediğini kontrol edin. Aşağıdaki komutu o cihazda çalıştırın; bu sayfa komut çalıştırmaz veya yerel ağınızı okumaz.'}</p>
  <label className="block text-sm font-semibold">{en?'Internal TCP port on the device':'Cihazdaki iç TCP portu'}<input type="number" min="1" max="65535" value={value} onChange={e=>{setInternalPort(e.target.value);setObservation('');}} className="block mt-2 w-32 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2"/></label>
  <p className="text-xs text-gray-500">{en?'If your router maps external 443 to internal 8443, use 8443 here and 443 in the online test.':'Modemde dış 443 iç 8443’e yönleniyorsa burada 8443, çevrimiçi testte 443 kullanın.'}</p>
  {commands?<div className="space-y-3 text-sm">
   <p>Windows PowerShell</p><pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-3"><code>{commands.windows}</code></pre>
   <p>Linux</p><pre className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-3"><code>{commands.linux}</code></pre>
  </div>:<p role="alert" className="text-sm text-red-600">{en?'Enter a port between 1 and 65535.':'1–65535 arasında bir port girin.'}</p>}
  <fieldset className="space-y-3"><legend className="font-semibold text-sm">{en?'What did the local check show?':'Yerel kontrolde ne gördünüz?'}</legend><div className="flex flex-wrap gap-2">{choices.map((label,i)=><button key={i} type="button" aria-pressed={observation===String(i)} onClick={()=>{setObservation(String(i));usageEvent('port_local_diagnosis',{result:['no_listener','loopback','network_listener'][i],language,interaction:'user'});}} className={`rounded-lg border p-2 text-sm ${observation===String(i)?'border-blue-600 text-blue-700 dark:text-blue-300':'border-gray-300 dark:border-gray-700'}`}>{label}</button>)}</div></fieldset>
  {observation!==''&&<p role="status" className="border-l-4 border-blue-500 pl-4 text-sm leading-relaxed">{advice[Number(observation)]}</p>}
  <p className="text-xs text-gray-500">{en?'Command references: ':'Komut kaynakları: '}<a href="https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection" className="underline">Microsoft</a> · <a href="https://man7.org/linux/man-pages/man8/ss.8.html" className="underline">iproute2 ss</a></p>
 </section>;
}
