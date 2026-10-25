<?php
require_once __DIR__ . '/common.php';
ipb_begin();
$host=ipb_host(ipb_input(['host','domain']),false);
$type=strtoupper(ipb_input(['type'],'A',10));
$results=[]; $resolved=0; $available=0;
foreach ([['google','Google Public DNS','8.8.8.8'],['cloudflare','Cloudflare DNS','1.1.1.1']] as $resolver) {
    $answer=ipb_doh($host,$type,$resolver[0],2500);
    if ($answer['status']==='resolved') $resolved++;
    if ($answer['status']!=='unavailable') $available++;
    $results[]=array_merge($answer,['serverId'=>$resolver[0],'serverName'=>$resolver[1],'serverIp'=>$resolver[2],'location'=>'Anycast; queried from the IPBulucu server']);
}
$same=null;
if ($available===2) {
    $a=$results[0]['records']; $b=$results[1]['records']; sort($a); sort($b);
    $same=$a===$b && $results[0]['status']===$results[1]['status'];
}
ipb_json(['success'=>true,'partial'=>$available<2,'host'=>$host,'domain'=>$host,'type'=>$type,'totalServers'=>2,'resolvedCount'=>$resolved,'availableCount'=>$available,'answersAgree'=>$same,'propagationPercentage'=>null,'results'=>$results,'checkedAt'=>gmdate('c'),'limitations'=>['Two anycast resolvers queried from one server; this is not worldwide propagation coverage.','Duration is the server-side HTTPS query time, not your network ping.']]);
