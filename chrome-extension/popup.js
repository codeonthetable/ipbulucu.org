document.addEventListener("DOMContentLoaded", async () => {
 const content=document.getElementById("content");
 function add(tag,text,cls){const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;content.appendChild(el);return el;}
 try {
  const response=await fetch('https://ipbulucu.org/api/ip?format=json',{headers:{'X-IPBulucu-Client':'chrome-extension','X-IPBulucu-Action':'user'},cache:'no-store',signal:AbortSignal.timeout(10000)});
  const data=await response.json();if(!response.ok||data.success===false||!data.ip)throw new Error();
  content.replaceChildren();add('div','Genel IP adresiniz','ip-label');add('div',data.ip,'ip-val');
  add('p',[data.city,data.country].filter(Boolean).join(', ')||'Konum bilgisi alınamadı.');add('p',data.isp||'ISS bilgisi alınamadı.');
  add('p','Konum yaklaşık bir tahmindir. Bu sorgu hat hızı, VPN güvenliği veya CGNAT testi yapmaz.');
 }catch{content.replaceChildren();add('p','IP sorgusu tamamlanamadı. Lütfen tekrar deneyin.');}
 const link=add('a','IP Bulucu ağ araçlarını aç →','btn');link.href='https://ipbulucu.org/?utm_source=chrome_extension&utm_medium=referral&utm_campaign=extension';link.target='_blank';link.rel='noopener noreferrer';
});
