<?php
require_once __DIR__ . '/common.php';
ipb_begin();
$host=ipb_host(ipb_input(['host','domain','query']),false);
$start=microtime(true); $records=['A'=>[],'AAAA'=>[],'MX'=>[],'TXT'=>[],'NS'=>[],'CNAME'=>[],'SOA'=>null]; $statuses=[];
foreach (array_keys($records) as $type) {
    $answer=ipb_doh($host,$type,'google',max(1,min(1800,(int)((8-(microtime(true)-$start))*1000))));
    $statuses[$type]=$answer['status'];
    if ($answer['status']==='unavailable') ipb_fail(502,'One or more DNS queries are unavailable. Please retry; missing records cannot be inferred from this error.');
    foreach ($answer['records'] as $value) {
        if ($type==='MX') { $parts=preg_split('/\s+/',trim($value),2); if(count($parts)===2 && ctype_digit($parts[0])) $records['MX'][]=['priority'=>(int)$parts[0],'exchange'=>rtrim($parts[1],'.') ?: '.']; }
        elseif ($type==='TXT') $records['TXT'][]=[ipb_txt($value)];
        elseif ($type==='SOA') {
            $s=preg_split('/\s+/',trim($value));
            if(count($s)>=7) $records['SOA']=['nsname'=>rtrim($s[0],'.'),'hostmaster'=>rtrim($s[1],'.'),'primaryNs'=>rtrim($s[0],'.'),'adminEmail'=>rtrim($s[1],'.'),'serial'=>(int)$s[2],'refresh'=>(int)$s[3],'retry'=>(int)$s[4],'expire'=>(int)$s[5],'minttl'=>(int)$s[6]];
        } else $records[$type][]=rtrim($value,'.');
    }
}
ipb_json(['success'=>true,'host'=>$host,'domain'=>$host,'resolvedIp'=>$records['A'][0]??$records['AAAA'][0]??null,'responseTimeMs'=>(int)round((microtime(true)-$start)*1000),'source'=>'Google Public DNS over HTTPS','statuses'=>$statuses,'records'=>$records,'checkedAt'=>gmdate('c')]);
