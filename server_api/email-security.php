<?php
require_once __DIR__ . '/common.php';
ipb_begin();
$domain=ipb_host(ipb_input(['domain','host','query']),false);
$mxAnswer=ipb_doh($domain,'MX','google',2000);
$spfAnswer=ipb_doh($domain,'TXT','google',2000);
$dmarcAnswer=ipb_doh('_dmarc.'.$domain,'TXT','google',2000);
foreach ([$mxAnswer,$spfAnswer,$dmarcAnswer] as $answer) if ($answer['status']==='unavailable') ipb_fail(502,'DNS data unavailable; email configuration could not be assessed.');
$mx=[]; $spf=[]; $dmarc=[];
foreach($mxAnswer['records'] as $value) { $parts=preg_split('/\s+/',trim($value),2); if(count($parts)===2 && ctype_digit($parts[0])) $mx[]=['priority'=>(int)$parts[0],'exchange'=>rtrim($parts[1],'.') ?: '.']; }
foreach($spfAnswer['records'] as $value) { $txt=ipb_txt($value); if(preg_match('/^v=spf1(?:\s|$)/i',$txt)) $spf[]=$txt; }
foreach($dmarcAnswer['records'] as $value) { $txt=ipb_txt($value); if(preg_match('/^v=DMARC1\s*(?:;|$)/i',$txt)) $dmarc[]=$txt; }
$score=(int)round(((!empty($mx)?1:0)+(count($spf)===1?1:0)+(count($dmarc)===1?1:0))/3*100);
function ipb_mail_record($records) { return ['present'=>count($records)>0,'count'=>count($records),'record'=>$records ? implode("\n",$records) : null,'status'=>count($records)>1 ? 'Multiple records; review required' : (count($records)===1 ? 'Record found; policy not fully validated' : 'No record at this name')]; }
ipb_json(['success'=>true,'domain'=>$domain,'host'=>$domain,'score'=>$score,'statusLabel'=>'MX / SPF / DMARC record presence','source'=>'Google Public DNS over HTTPS','mx'=>['present'=>!empty($mx),'records'=>$mx],'spf'=>ipb_mail_record($spf),'dmarc'=>ipb_mail_record($dmarc),'limitations'=>['Presence indicator only, not a security or delivery score.','DKIM, SPF expansion, DMARC organizational-domain fallback and message alignment are not tested.','A null MX (0 .) means the domain does not accept email.'],'checkedAt'=>gmdate('c')]);
