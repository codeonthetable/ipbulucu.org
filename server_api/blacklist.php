<?php
require_once __DIR__ . '/common.php';
ipb_begin();
$host=ipb_host(ipb_input(['ip','host','domain']));
$ip=ipb_target($host);
if (!filter_var($ip,FILTER_VALIDATE_IP,FILTER_FLAG_IPV4)) ipb_fail(400,'This DNSBL check supports public IPv4 addresses only.');
$reverse=implode('.',array_reverse(explode('.',$ip)));
$providers=[['name'=>'SpamCop','host'=>'bl.spamcop.net','codes'=>[2],'url'=>'https://www.spamcop.net/bl.shtml'],['name'=>'DroneBL','host'=>'dnsbl.dronebl.org','codes'=>[2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,255],'url'=>'https://dronebl.org/lookup']];
$results=[]; $listedCount=0; $cleanCount=0;
foreach($providers as $p) {
    // Positive control catches dead zones and resolver policy blocks; only a valid NXDOMAIN is negative.
    $control=ipb_doh('2.0.0.127.'.$p['host'],'A','google',1400);
    $listed=null; $response=null; $status='unavailable';
    if ($control['status']==='resolved' && in_array('127.0.0.2',$control['records'],true)) {
        $answer=ipb_doh($reverse.'.'.$p['host'],'A','google',1400);
        if($answer['status']==='nxdomain') { $listed=false; $status='not-listed'; $cleanCount++; }
        elseif($answer['status']==='resolved') foreach($answer['records'] as $address) {
            if(preg_match('/^127\.0\.0\.(\d+)$/',$address,$m) && in_array((int)$m[1],$p['codes'],true)) { $listed=true; $status='listed'; $response=$address; break; }
        }
    }
    if($listed===true) $listedCount++;
    $results[]=['host'=>$p['host'],'name'=>$p['name'],'listed'=>$listed,'isListed'=>$listed,'status'=>$status,'response'=>$response,'delistUrl'=>$p['url']];
}
// These providers require access/eligibility arrangements that are not configured here.
foreach([['Spamhaus ZEN','zen.spamhaus.org','https://check.spamhaus.org/'],['Barracuda','b.barracudacentral.org','https://www.barracudacentral.org/lookups']] as $p) $results[]=['host'=>$p[1],'name'=>$p[0],'listed'=>null,'isListed'=>null,'status'=>'not-configured','response'=>null,'delistUrl'=>$p[2]];
$unknown=count($results)-$listedCount-$cleanCount;
ipb_json(['success'=>true,'partial'=>$unknown>0,'ip'=>$ip,'totalChecked'=>$listedCount+$cleanCount,'totalProviders'=>count($results),'listedCount'=>$listedCount,'cleanCount'=>$cleanCount,'unavailableCount'=>$unknown,'isClean'=>$listedCount>0 ? false : ($unknown===0 ? true : null),'results'=>$results,'checkedAt'=>gmdate('c'),'limitations'=>['Unconfigured, timeout and blocked resolver responses are unknown, not clean.','No listing in the checked sources does not establish safety or email deliverability.']]);
