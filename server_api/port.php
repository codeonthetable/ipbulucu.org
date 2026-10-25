<?php
require_once __DIR__ . '/common.php';
ipb_begin();
$host=ipb_host(ipb_input(['host','ip']));
$raw=ipb_input(['ports','port'],'80',120); $ports=explode(',',$raw);
if(count($ports)>16) ipb_fail(400,'A maximum of 16 TCP ports is supported.');
foreach($ports as &$port) { if(!ctype_digit($port) || (int)$port<1 || (int)$port>65535) ipb_fail(400,'Enter TCP port numbers between 1 and 65535.'); $port=(int)$port; } unset($port);
$ports=array_values(array_unique($ports));
$ip=ipb_target($host);
if(!ipb_budget('port-minute',20,60)) { header('Retry-After: 60'); ipb_fail(429,'Port-check capacity reached. Please retry later.'); }
$names=[21=>'FTP',22=>'SSH',25=>'SMTP',53=>'DNS (TCP)',80=>'HTTP',110=>'POP3',143=>'IMAP',443=>'HTTPS',465=>'SMTPS',587=>'SMTP Submission',993=>'IMAPS',995=>'POP3S',3306=>'MySQL',3389=>'RDP',5432=>'PostgreSQL',8080=>'HTTP Alternative',8443=>'HTTPS Alternative'];
$deadline=microtime(true)+6; $results=[]; $openCount=0; $attempted=0;
foreach($ports as $port) {
    $remaining=$deadline-microtime(true); $status='unavailable'; $isOpen=null; $ms=null;
    if($remaining>0.05) {
        $start=microtime(true); $errno=0; $errstr=''; $attempted++;
        $socket=@fsockopen(strpos($ip,':')!==false ? '['.$ip.']' : $ip,$port,$errno,$errstr,min(0.8,$remaining));
        $ms=(int)round((microtime(true)-$start)*1000);
        if($socket) { fclose($socket); $status='open'; $isOpen=true; $openCount++; }
        elseif(in_array($errno,[61,111,10061],true)) { $status='closed'; $isOpen=false; }
        else $status='filtered'; // Unreachable/timeout is inconclusive, never proof of a closed port.
    }
    $results[]=['port'=>$port,'service'=>$names[$port]??'TCP','status'=>$status,'isOpen'=>$isOpen,'open'=>$isOpen,'latencyMs'=>$ms,'responseTimeMs'=>$ms,'details'=>$status==='open'?'TCP connection established from the IPBulucu server.':($status==='closed'?'TCP connection refused.':'No conclusive response within the check budget.')];
}
$output=['success'=>true,'ip'=>$ip,'host'=>$host,'ports'=>$results,'results'=>$results,'openCount'=>$openCount,'totalScanned'=>$attempted,'requestedCount'=>count($ports),'partial'=>$attempted<count($ports),'limitations'=>['TCP reachability from this server only; UDP, service identity, firewall rules and security are not verified.']];
if(!isset($_GET['ports'])) $output=array_merge($output,$results[0]);
ipb_json($output);
