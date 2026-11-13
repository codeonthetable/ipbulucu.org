"use client";
import {isIPv4} from '@/lib/target-guidance';
export default function BlacklistTargetNotice({value,confirmed,onConfirm,language='tr'}:{value:string;confirmed:boolean;onConfirm:(v:boolean)=>void;language?:'tr'|'en'}) {
  const en=language==='en';
  if(!value.trim() || isIPv4(value)) return <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{en?'Use the outbound IPv4 shown in your mail provider’s sending logs or the recipient’s rejection message. MX records identify incoming mail servers, not necessarily the sender.':'Posta sağlayıcınızın gönderim kaydındaki veya alıcının ret mesajındaki çıkış IPv4 adresini kullanın. MX kaydı gelen posta sunucusudur; gönderici sunucuyla aynı olmak zorunda değildir.'}</p>;
  return <div className="mt-3 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 p-4 space-y-3 text-sm">
    <p id="hostname-explanation">{en?'A hostname check resolves one A record and checks that IPv4. Entering your website domain may test the web server instead of your mail server. This is not a domain reputation or MX check.':'Sunucu adı girildiğinde bir A kaydı çözülür ve o IPv4 kontrol edilir. Web sitenizin alan adı, posta sunucusu yerine web sunucusunu test edebilir. Bu işlem alan adı itibarı veya MX kontrolü değildir.'}</p>
    <label className="flex items-start gap-2 font-medium"><input type="checkbox" checked={confirmed} onChange={e=>onConfirm(e.target.checked)} aria-describedby="hostname-explanation" className="mt-1"/>{en?'Check the IPv4 resolved from this hostname':'Bu sunucu adından çözülen IPv4 adresini kontrol et'}</label>
  </div>;
}
