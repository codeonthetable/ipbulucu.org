<?php
require_once __DIR__ . '/common.php';
ipb_begin();
$query=ipb_host(ipb_input(['query','domain','host','ip']));
$isIp=filter_var($query,FILTER_VALIDATE_IP)!==false;
if($isIp && !ipb_public_ip($query)) ipb_fail(400,'Enter a public IP address.');
$response=ipb_http('https://rdap.org/'.($isIp?'ip/':'domain/').rawurlencode($query));
$data=$response && $response['status']===200 ? json_decode($response['body'],true) : null;
if(!is_array($data) || empty($data['objectClassName']) || isset($data['errorCode'])) ipb_fail(502,'Registry RDAP data unavailable for this query. No ownership or registration status could be confirmed.');
$registrar='Unknown'; $organization=$isIp && is_string($data['name']??null) ? $data['name'] : 'Unknown';
$registered='Unknown'; $expires='Unknown'; $updated='Unknown'; $nameservers=[];
foreach(($data['entities']??[]) as $entity) {
    $name=null;
    foreach(($entity['vcardArray'][1]??[]) as $property) if(($property[0]??'')==='fn' && is_string($property[3]??null)) $name=$property[3];
    if(!$name) continue;
    if(in_array('registrar',$entity['roles']??[],true)) $registrar=$name;
    if(in_array('registrant',$entity['roles']??[],true)) $organization=$name;
}
foreach(($data['events']??[]) as $event) {
    $date=is_string($event['eventDate']??null) ? strtotime($event['eventDate']) : false;
    if($date===false) continue;
    if(($event['eventAction']??'')==='registration') $registered=gmdate('Y-m-d H:i:s',$date).' UTC';
    elseif(($event['eventAction']??'')==='expiration') $expires=gmdate('Y-m-d H:i:s',$date).' UTC';
    elseif(($event['eventAction']??'')==='last changed') $updated=gmdate('Y-m-d H:i:s',$date).' UTC';
}
foreach(($data['nameservers']??[]) as $ns) if(is_string($ns['ldhName']??null)) $nameservers[]=strtolower(rtrim($ns['ldhName'],'.'));
$statuses=array_values(array_filter($data['status']??[],'is_string'));
$raw=implode("\n",['Domain / IP: '.$query,'Registrar: '.$registrar,'Organization: '.$organization,'Registration: '.$registered,'Expiration: '.$expires,'Updated: '.$updated,'Status: '.($statuses ? implode(', ',$statuses) : 'Unknown'),'Nameservers: '.implode(', ',$nameservers),'Source: '.$response['url'],'This is a summary of registry RDAP fields, not a raw WHOIS response.']);
ipb_json(['success'=>true,'domainOrIp'=>$query,'domain'=>$query,'host'=>$query,'query'=>$query,'registrar'=>$registrar,'organization'=>$organization,'registeredOn'=>$registered,'expiresOn'=>$expires,'updatedOn'=>$updated,'nameServers'=>array_values(array_unique($nameservers)),'status'=>$statuses,'rawText'=>$raw,'raw'=>$raw,'source'=>$response['url'],'isTr'=>(bool)preg_match('/\.tr$/i',$query),'checkedAt'=>gmdate('c')]);
