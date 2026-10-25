"use client";
import { useEffect, useRef, useState } from 'react';
import { Radio, RefreshCw } from 'lucide-react';
import { toolFetch, usageEvent } from '@/lib/usage';
import { calculateIpFormats } from '@/lib/ip-formats';
import { candidateAddress, isPublicCandidate, sameIp } from '@/lib/webrtc-candidates';
import FaqAccordion from './FaqAccordion';

export default function WebRtcCheck({lang='tr'}:{lang?:'tr'|'en'}) {
  const en=lang==='en';
  const [running,setRunning]=useState(false);
  const [finished,setFinished]=useState(false);
  const [publicIp,setPublicIp]=useState<string|null>(null);
  const [addresses,setAddresses]=useState<string[]>([]);
  const [failure,setFailure]=useState(false);
  const cleanup=useRef<()=>void>(()=>{});
  useEffect(()=>()=>cleanup.current(),[]);
  const run=async()=>{
    if(running)return;
    cleanup.current(); setRunning(true);setFinished(false);setFailure(false);setAddresses([]);setPublicIp(null);
    const controller=new AbortController(); let rtc:RTCPeerConnection|null=null; let ended=false; let reference:string|null=null; const found=new Set<string>(); const start=performance.now();
    const stop=()=>{if(ended)return;ended=true;clearTimeout(timer);controller.abort();rtc?.close();};
    const done=()=>{if(ended)return;stop();setRunning(false);setFinished(true);usageEvent('tool_result',{tool_name:'webrtc',language:lang,interaction:'user',outcome:reference&&found.size?'candidates_observed':'inconclusive',duration_ms:Math.round(performance.now()-start)});};
    const timer=setTimeout(done,7000);cleanup.current=stop;
    usageEvent('tool_request',{tool_name:'webrtc',language:lang,interaction:'user'});
    try {
      const response=await toolFetch('/api/ip?format=text',{signal:controller.signal},'user');
      const text=(await response.text()).trim();
      if(response.ok&&calculateIpFormats(text)){reference=text;if(!ended)setPublicIp(text);}
    } catch { /* The STUN test can still report observed candidates without a comparison IP. */ }
    if(ended)return;
    try {
      rtc=new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});
      rtc.onicecandidate=(event)=>{
        if(ended)return;
        if(!event.candidate){done();return;}
        const ip=candidateAddress(event.candidate);
        if(ip){found.add(ip);setAddresses([...found]);}
      };
      rtc.createDataChannel('ipbulucu-check');
      await rtc.setLocalDescription(await rtc.createOffer());
    } catch {if(!ended){setFailure(true);done();}}
  };
  const differing=publicIp ? addresses.filter(ip=>isPublicCandidate(ip)&&!sameIp(ip,publicIp)) : [];
  const heading=!finished ? (en?'Ready to check':'Kontrole hazır') : failure||!publicIp||addresses.length===0 ? (en?'Inconclusive result':'Kesin sonuca ulaşılamadı') : differing.length ? (en?'A different public address was observed':'Farklı genel adres görüldü') : (en?'No different public address observed in this check':'Bu kontrolde farklı genel adres görülmedi');
  const faqs=en ? [
    {question:'Does a different address prove a VPN leak?',answer:'No. IPv4/IPv6 differences, split tunneling and network configuration can produce different candidates. Compare with your expected VPN addresses and configuration.'},
    {question:'Does an empty result prove privacy?',answer:'No. Browsers can hide candidates behind mDNS names, restrict WebRTC, or fail to reach STUN. This test cannot certify VPN security.'}
  ] : [
    {question:'Farklı adres VPN sızıntısını kanıtlar mı?',answer:'Hayır. IPv4/IPv6 farkı, bölünmüş tünel veya ağ yapılandırması farklı aday adresler oluşturabilir. Sonucu VPN sağlayıcınızın beklenen adresleri ve yapılandırmasıyla karşılaştırın.'},
    {question:'Boş sonuç gizliliği kanıtlar mı?',answer:'Hayır. Tarayıcı adayları mDNS adıyla gizleyebilir, WebRTC kısıtlanmış olabilir veya STUN bağlantısı kurulamayabilir. Bu test VPN güvenliğini onaylamaz.'}
  ];
  return <div className="max-w-3xl mx-auto space-y-8">
    <header className="text-center space-y-3"><Radio className="w-8 h-8 mx-auto text-rose-500"/><h1 className="text-3xl font-bold">{en?'WebRTC IP Leak Check':'WebRTC IP Sızıntı Kontrolü'}</h1><p className="text-gray-500">{en?'Inspect IP candidates exposed by WebRTC and compare them with your HTTP connection address.':'WebRTC tarafından görülebilen IP adaylarını inceleyin ve HTTP bağlantınızın adresiyle karşılaştırın.'}</p><p className="text-xs text-gray-500">{en?'Starting the check contacts Google STUN and the IPBulucu text IP endpoint. Camera and microphone access are not requested. Addresses stay in this tab and are not included in analytics events.':'Başlattığınızda Google STUN ve IPBulucu metin IP uç noktasına bağlanılır. Kamera ve mikrofon izni istenmez. Adresler bu sekmede kalır, analiz olaylarına eklenmez.'}</p></header>
    <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
      <button onClick={run} disabled={running} className="rounded-xl px-5 py-3 bg-rose-600 text-white font-semibold disabled:opacity-50 inline-flex gap-2 items-center"><RefreshCw className={running?'w-4 h-4 animate-spin':'w-4 h-4'}/>{running?(en?'Checking…':'Kontrol ediliyor…'):(en?'Run WebRTC check':'WebRTC kontrolünü başlat')}</button>
      <h2 className="font-bold text-xl">{running?(en?'Collecting candidates':'Aday adresler toplanıyor'):heading}</h2>
      <dl className="space-y-3"><div><dt className="text-sm text-gray-500">{en?'HTTP public IP':'HTTP genel IP'}</dt><dd className="font-mono break-all">{publicIp||(en?'Not measured':'Ölçülmedi')}</dd></div><div><dt className="text-sm text-gray-500">{en?'Observed WebRTC candidates':'Görülen WebRTC adayları'}</dt><dd className="font-mono break-all">{addresses.length ? addresses.map(ip=><div key={ip}>{ip}</div>) : (en?'No readable IP candidates':'Okunabilir IP adayı yok')}</dd></div></dl>
      <p className="text-sm text-amber-600 dark:text-amber-400">{en?'This is one observation, not a VPN safety certificate. Missing data and different IP families need interpretation.':'Bu tek bir gözlemdir; VPN güvenlik onayı değildir. Eksik veri ve farklı IP aileleri ayrıca değerlendirilmelidir.'}</p>
    </div>
    <FaqAccordion faqs={faqs} title={en?'Understanding the result':'Sonucu yorumlama'}/>
  </div>;
}
