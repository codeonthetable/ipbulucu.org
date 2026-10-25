<?php
require_once __DIR__ . '/common.php';
ipb_begin();
$host=ipb_host(ipb_input(['host','domain','url','query']));
$ip=ipb_target($host);
$context=stream_context_create(['ssl'=>['capture_peer_cert'=>true,'verify_peer'=>true,'verify_peer_name'=>true,'allow_self_signed'=>false,'SNI_enabled'=>true,'peer_name'=>$host,'disable_compression'=>true]]);
$socket=@stream_socket_client('ssl://'.(strpos($ip,':')!==false?'['.$ip.']':$ip).':443',$errno,$errstr,5,STREAM_CLIENT_CONNECT,$context);
if(!$socket) ipb_fail(502,'TLS verification could not be completed. The connection may be unavailable, or certificate trust/hostname validation may have failed.');
$params=stream_context_get_params($socket); $metadata=stream_get_meta_data($socket); fclose($socket);
$resource=$params['options']['ssl']['peer_certificate']??null;
$cert=$resource ? openssl_x509_parse($resource) : false;
if(!$cert || !isset($cert['validFrom_time_t'],$cert['validTo_time_t'])) ipb_fail(502,'Certificate details unavailable.');
$from=$cert['validFrom_time_t']; $to=$cert['validTo_time_t']; $now=time();
if($from>$now || $to<=$now) ipb_fail(502,'Certificate validity dates could not be verified.');
$san=[];
foreach(explode(',',$cert['extensions']['subjectAltName']??'') as $item) { $item=trim($item); if(preg_match('/^(?:DNS:|IP Address:)(.+)$/',$item,$m)) $san[]=$m[1]; }
$fingerprint=function_exists('openssl_x509_fingerprint') ? openssl_x509_fingerprint($resource,'sha256') : null;
ipb_json(['success'=>true,'host'=>$host,'domain'=>$host,'authorized'=>true,'authError'=>null,'subject'=>$cert['subject']['CN']??'Unknown','issuer'=>$cert['issuer']['O']??$cert['issuer']['CN']??'Unknown','validFrom'=>gmdate('c',$from),'validTo'=>gmdate('c',$to),'daysRemaining'=>(int)floor(($to-$now)/86400),'isExpired'=>false,'san'=>array_values(array_unique($san)),'serialNumber'=>$cert['serialNumberHex']??null,'fingerprint'=>$fingerprint?:null,'tlsProtocol'=>$metadata['crypto']['protocol']??null,'cipherName'=>$metadata['crypto']['cipher_name']??null,'checkedAt'=>gmdate('c'),'limitations'=>['Certificate chain, hostname and dates verified against this server trust store.','Revocation, all supported protocols/ciphers and browser-specific trust are not tested.']]);
