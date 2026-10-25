"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {Search,Copy,Check,Globe} from "lucide-react";
import {toolFetch,usageEvent} from "@/lib/usage";
import IpMap from "./IpMap";
import IpFormatConverter from "./IpFormatConverter";
type IpResult = {success?:boolean;ip:string;version?:string;geoStatus?:string;country?:string|null;city?:string|null;region?:string|null;isp?:string|null;org?:string|null;asn?:string|null;timezone?:string|null;source?:string|null;latitude?:number|null;longitude?:number|null;error?:string};
export default function PublicIpLookup({lang="tr",title,placeholder,buttonLabel,showDetails=false}:{lang?:"tr"|"en";title?:string;placeholder?:string;buttonLabel?:string;showDetails?:boolean}) {
 const en=lang==="en";
 const [query,setQuery]=useState(""); const [result,setResult]=useState<IpResult|null>(null);
 const [busy,setBusy]=useState(true); const [error,setError]=useState(""); const [copied,setCopied]=useState(false);
 const request=useRef<AbortController|null>(null);
 async function lookup(value="",interaction:"auto"|"user"="user") {
  request.current?.abort(); const controller=new AbortController(); request.current=controller;
  setBusy(true);setError("");setResult(null);setCopied(false);
  try {
   const params=new URLSearchParams({format:"json"}); if(value.trim()) params.set("ip",value.trim());
   const response=await toolFetch(`/api/ip?${params}`,{signal:controller.signal,cache:"no-store"},interaction);
   const data:IpResult=await response.json();
   if(!response.ok || data.success===false || !data.ip) throw new Error("lookup_failed");
   if(!controller.signal.aborted)setResult(data);
  }catch{if(!controller.signal.aborted)setError(en?"Lookup failed. Check the address and try again.":"Sorgu tamamlanamadı. Adresi kontrol edip tekrar deneyin.");}
  finally{if(!controller.signal.aborted)setBusy(false);}
 }
 useEffect(()=>{const initial=new URLSearchParams(window.location.search).get("ip")||"";setQuery(initial);void lookup(initial,"auto");return()=>request.current?.abort();},[]);
 const unknown=en?"Unavailable":"Bilinmiyor";
 const cells=result?[[en?"Approximate location":"Yaklaşık konum",[result.city,result.region,result.country].filter(Boolean).join(", ")],[en?"Internet service provider":"İnternet servis sağlayıcısı",result.isp],["ASN",result.asn],[en?"Organisation":"Kuruluş",result.org],[en?"Time zone":"Saat dilimi",result.timezone],[en?"Data source":"Veri kaynağı",result.source]]:[];
 return <><section className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm space-y-6">
  <div><div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-3"><Globe size={18}/> IPBulucu.org</div><h2 className="text-2xl md:text-3xl font-bold">{title||(en?"What is my IP address?":"IP adresim nedir?")}</h2><p className="text-sm text-slate-500 mt-3">{en?"Find your public IPv4/IPv6 address or look up an IP or domain. Location is approximate.":"Genel IPv4/IPv6 adresinizi görün veya bir IP / alan adı sorgulayın. Konum bilgisi yaklaşık bir tahmindir."}</p></div>
  <form onSubmit={e=>{e.preventDefault();void lookup(query);}} className="flex flex-col sm:flex-row gap-3"><label className="sr-only" htmlFor="public-ip-query">{en?"IP address or domain":"IP adresi veya alan adı"}</label><input id="public-ip-query" value={query} onChange={e=>setQuery(e.target.value)} maxLength={253} spellCheck={false} autoComplete="off" placeholder={placeholder||(en?"IP or domain, e.g. 1.1.1.1":"IP veya alan adı, ör. 1.1.1.1")} className="flex-1 min-w-0 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3"/><button disabled={busy} className="rounded-xl bg-blue-600 text-white px-5 py-3 disabled:opacity-50 flex items-center justify-center gap-2"><Search size={18}/>{busy?(en?"Looking up…":"Sorgulanıyor…"):buttonLabel||(en?"Look up":"Sorgula")}</button><button type="button" disabled={busy} onClick={()=>{setQuery("");void lookup();}} className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3">{en?"My IP":"IP adresim"}</button></form>
  <div aria-live="polite" aria-busy={busy} className="min-h-20">{error&&<p role="alert" className="text-red-600">{error}</p>}{result&&<><div className="flex flex-wrap items-center gap-3"><strong className="text-2xl md:text-3xl font-mono break-all">{result.ip}</strong><span className="text-sm text-slate-500">{result.version}</span><button aria-label={en?"Copy IP":"IP adresini kopyala"} onClick={async()=>{try{await navigator.clipboard.writeText(result.ip);setCopied(true);usageEvent("ip_copy",{language:lang});}catch{setError(en?"Copy failed.":"Kopyalanamadı.");}}} className="p-2 rounded-lg border">{copied?<Check size={18}/>:<Copy size={18}/>}</button></div>{result.geoStatus==="unavailable"&&<p className="text-amber-700 dark:text-amber-300 text-sm mt-3">{en?"IP detected. The location provider is unavailable; no substitute location is shown.":"IP tespit edildi. Konum sağlayıcısına ulaşılamıyor; yerine örnek konum gösterilmiyor."}</p>}<dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">{cells.map(([label,value])=><div key={label} className="rounded-xl bg-slate-50 dark:bg-slate-950 p-4"><dt className="text-xs text-slate-500 mb-2">{label}</dt><dd className="font-semibold break-words">{value||unknown}</dd></div>)}</dl></>}</div>
  <p className="text-sm text-slate-500">{en?"An IP lookup cannot establish a person's identity, street address, connection speed, VPN safety or CGNAT status.":"IP sorgusu bir kişinin kimliğini, ev adresini, hat hızını, VPN güvenliğini veya CGNAT durumunu kesin olarak belirleyemez."}</p><Link href={en?"/en/tools/":"/araclar/"} className="inline-block text-blue-600 font-semibold">{en?"DNS, Whois, SSL and network tools →":"DNS, Whois, SSL ve ağ araçları →"}</Link>
 </section>{showDetails && result && <><IpMap key={result.ip} lat={result.geoStatus==="available"?result.latitude:null} lng={result.geoStatus==="available"?result.longitude:null} city={result.city} country={result.country} source={result.source} lang={lang}/><IpFormatConverter key={result.ip+"-formats"} ip={result.ip} lang={lang}/></>}</>;
}
