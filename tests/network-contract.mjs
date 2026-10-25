// Local-only endpoint contracts. DNS, TCP, TLS and HTTPS operations are fixtures.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const modules=process.env.PHP_WASM_MODULES;
const {PHP}=await import(pathToFileURL(path.join(modules,'@php-wasm/universal/index.js')));
const {loadNodeRuntime}=await import(pathToFileURL(path.join(modules,'@php-wasm/node/index.js')));
const php=new PHP(await loadNodeRuntime('8.3',{emscriptenOptions:{processId:2}}));
const mocks=String.raw`
namespace IPBNetworkTest;
function dns_get_record($host,$type) { return [['ip'=>getenv('CASE')==='private-dns' ? '127.0.0.1' : '1.1.1.1']]; }
function curl_init($url) { return (object)['url'=>$url,'options'=>[],'status'=>200]; }
function curl_setopt_array($c,$opts) { $c->options=$opts; return true; }
function curl_getinfo($c,$key) { return $c->status; }
function curl_close($c) {}
function curl_exec($c) {
    $o=$c->options;
    if($o[CURLOPT_SSL_VERIFYPEER]!==true || $o[CURLOPT_SSL_VERIFYHOST]!==2 || $o[CURLOPT_FOLLOWLOCATION]!==false || !$o[CURLOPT_RESOLVE] || $o[CURLOPT_PROXY]!=='') throw new \RuntimeException('Unsafe transport options');
    $case=getenv('CASE');
    if($case==='transport-failure') return false;
    $headers=['HTTP/1.1 200 OK', 'content-security-policy: default-src self', 'set-cookie: SECRET_MUST_NOT_RETURN=1'];
    if($case==='redirect-private') { $c->status=302; $headers=['HTTP/1.1 302 Found','location: http://127.0.0.1/admin']; }
    foreach($headers as $line) $o[CURLOPT_HEADERFUNCTION]($c,$line."\r\n");
    $parts=parse_url($c->url);parse_str($parts['query']??'', $q);
    if(strpos($c->url,'rdap.org')!==false) {
      $body=['objectClassName'=>'domain','entities'=>[['roles'=>['registrar'],'vcardArray'=>['vcard', [['version',[],'text','4.0'],['email',[],'text','ignored@example.test'],['fn',[],'text','Fixture Registrar']]]]],'events'=>[]];
    } else {
      $codes=['A'=>1,'AAAA'=>28,'MX'=>15,'TXT'=>16,'NS'=>2,'CNAME'=>5,'SOA'=>6];$type=$q['type']??'A'; $name=$q['name']??'';
      $values=['A'=>'1.1.1.1','AAAA'=>'2606:4700:4700::1111','MX'=>'10 mail.example.com.','TXT'=>'"v=spf1 " "-all"','NS'=>'ns.example.com.','CNAME'=>'alias.example.com.','SOA'=>'ns.example.com. hostmaster.example.com. 42 3600 600 86400 300'];
      if(strpos($name,'_dmarc.')===0) $values['TXT']='"v=DMARC1; p=none; sp=reject"';
      if($case==='different-resolvers' && ($parts['host']??'')==='cloudflare-dns.com') $values['A']='8.8.8.8';
      $body=['Status'=>0,'Answer'=>[['type'=>$codes[$type]??1,'data'=>$values[$type]??'1.1.1.1']]];
      if($case==='nxdomain') $body=['Status'=>3];
      if($case==='servfail') $body=['Status'=>2];
      if(strpos($name,'bl.spamcop.net')!==false || strpos($name,'dnsbl.dronebl.org')!==false) {
        if(strpos($name,'2.0.0.127.')===0 && $case!=='dnsbl-control-failure') $body=['Status'=>0,'Answer'=>[['type'=>1,'data'=>'127.0.0.2']]];
        elseif($case==='dnsbl-blocked') $body=['Status'=>0,'Answer'=>[['type'=>1,'data'=>'127.255.255.254']]];
        elseif($case==='dnsbl-listed') $body=['Status'=>0,'Answer'=>[['type'=>1,'data'=>'127.0.0.2']]];
        elseif($case==='dnsbl-control-failure') $body=['Status'=>2];
        else $body=['Status'=>3];
      }
    }
    $raw=json_encode($body); $o[CURLOPT_WRITEFUNCTION]($c,$raw); return true;
}
function fsockopen($host,$port,&$errno,&$error,$timeout) {
    if($host!=='1.1.1.1' || $timeout>0.8) throw new \RuntimeException('TCP address not pinned/bounded');
    if($port===443) return fopen('php://memory','r+');
    $errno=$port===80?111:110; $error='fixture';return false;
}
function stream_socket_client($address,&$errno,&$error,$timeout,$flags,$context) {
    $options=\stream_context_get_params($context)['options']['ssl'];
    if($options['verify_peer']!==true || $options['verify_peer_name']!==true || $options['allow_self_signed']!==false || $options['peer_name']!=='example.com' || $address!=='ssl://1.1.1.1:443') throw new \RuntimeException('TLS verification/pinning incorrect');
    if(getenv('CASE')==='tls-failure') return false;
    return fopen('php://memory','r+');
}
function stream_context_get_params($stream) { return ['options'=>['ssl'=>['peer_certificate'=>'fixture']]]; }
function stream_get_meta_data($stream) { return ['crypto'=>['protocol'=>'TLSv1.2','cipher_name'=>'FIXTURE_CIPHER']]; }
function openssl_x509_parse($cert) { return ['validFrom_time_t'=>time()-3600,'validTo_time_t'=>time()+86400*5,'subject'=>['CN'=>'example.com'],'issuer'=>['O'=>'Fixture CA'],'extensions'=>['subjectAltName'=>'DNS:example.com, DNS:www.example.com']]; }
function openssl_x509_fingerprint($cert,$alg) { return 'fixture-fingerprint'; }
`;
let count=0;
try {
 php.mkdir('/www');php.mkdir('/metrics');
 for(const name of fs.readdirSync('server_api').filter(x=>x.endsWith('.php'))) {
  let source=fs.readFileSync('server_api/'+name,'utf8');
  if(name==='common.php') source=source.replace('<?php','<?php '+mocks);
  else if(name!=='usage.php') source=source.replace('<?php','<?php namespace IPBNetworkTest;');
  php.writeFile('/www/'+name,source);
 }
 async function req(endpoint,query,scenario='default',method='GET') {
  const r=await php.run({scriptPath:'/www/'+endpoint+'.php',relativeUri:'/api/'+endpoint+'?'+query,method,$_SERVER:{DOCUMENT_ROOT:'/www',SCRIPT_FILENAME:'/www/'+endpoint+'.php',REMOTE_ADDR:'1.1.1.1'},env:{IPBULUCU_METRICS_DIR:'/metrics',CASE:scenario}});
  assert.equal(r.exitCode,0,r.errors);assert.equal(r.errors,'');
  return {status:r.httpStatusCode,body:r.text?JSON.parse(r.text):null};
 }
 async function test(name,fn){await fn();console.log('PASS',name);count++;}
 await test('input arrays, private/alternate addresses, schemes and ports reject before outbound',async()=>{
  for(const q of ['url[]=https://example.com','url=http://127.0.0.1','url=http://2130706433','url=file:///etc/passwd','url=http://user:pass@example.com','url=https://example.com:5173','url=http://[::ffff:127.0.0.1]','url=http://169.254.169.254','url=http://100.64.0.1']) assert.equal((await req('headers',q)).status,400,q);
  assert.equal((await req('headers','url=https://example.com','private-dns')).status,400);
 });
 await test('redirect targets undergo the same private-address check',async()=>{assert.equal((await req('headers','url=https://example.com','redirect-private')).status,400);});
 await test('transport failures never synthesize HTTP 200',async()=>{assert.equal((await req('headers','url=https://example.com','transport-failure')).status,502);});
 await test('header response uses actual status, presence count and omits cookies',async()=>{const {body:b}=await req('headers','url=https://example.com');assert.equal(b.statusCode,200);assert.equal(b.passedSecurityCount,1);assert(!JSON.stringify(b).includes('SECRET_MUST_NOT_RETURN'));});
 await test('two independent resolver answers and disagreement survive',async()=>{const {body:b}=await req('propagation','host=example.com&type=A','different-resolvers');assert.equal(b.availableCount,2);assert.equal(b.answersAgree,false);assert.notDeepEqual(b.results[0].records,b.results[1].records);assert.equal(b.propagationPercentage,null);});
 await test('DNS SERVFAIL is unavailable, NXDOMAIN is explicit',async()=>{let {body:b}=await req('propagation','host=example.com','servfail');assert.equal(b.availableCount,0);assert.equal(b.partial,true);b=(await req('propagation','host=example.com','nxdomain')).body;assert.equal(b.results[0].status,'nxdomain');assert.equal(b.resolvedCount,0);});
 await test('DNS records preserve TXT chunks, MX priority and SOA names',async()=>{const {body:b}=await req('dns','host=example.com');assert.equal(b.records.TXT[0][0],'v=spf1 -all');assert.equal(b.records.MX[0].priority,10);assert.equal(b.records.SOA.nsname,'ns.example.com');assert.equal(b.records.SOA.serial,42);assert.equal((await req('dns','host=example.com','servfail')).status,502);});
 await test('DNSBL resolver blocks/control failure stay unknown; NXDOMAIN differs from listed',async()=>{
  for(const scenario of ['dnsbl-blocked','dnsbl-control-failure']) {const {body:b}=await req('blacklist','ip=1.1.1.1',scenario);assert.equal(b.listedCount,0);assert.equal(b.cleanCount,0);assert.equal(b.isClean,null);}
  let b=(await req('blacklist','ip=1.1.1.1')).body;assert.equal(b.cleanCount,2);assert.equal(b.unavailableCount,2);assert.equal(b.isClean,null);
  b=(await req('blacklist','ip=1.1.1.1','dnsbl-listed')).body;assert.equal(b.listedCount,2);assert.equal(b.isClean,false);
 });
 await test('TCP open, refused and timeout remain distinct; input is bounded',async()=>{const {body:b}=await req('port','host=1.1.1.1&ports=443,80,22');assert.deepEqual(b.ports.map(p=>p.isOpen),[true,false,null]);assert.deepEqual(b.ports.map(p=>p.status),['open','closed','filtered']);for(const q of ['host=1.1.1.1&port=abc','host=1.1.1.1&ports='+Array(17).fill('80').join(','),'host=127.0.0.1&port=80']) assert.equal((await req('port',q)).status,400);});
 await test('TLS verifies chain/hostname and returns negotiated metadata; failure stays unverified',async()=>{const {body:b}=await req('ssl','host=example.com');assert.equal(b.authorized,true);assert.equal(b.tlsProtocol,'TLSv1.2');assert.equal(b.cipherName,'FIXTURE_CIPHER');assert.equal((await req('ssl','host=example.com','tls-failure')).status,502);});
 await test('RDAP parses vCard by property; unknown dates/status are never invented',async()=>{const {body:b}=await req('whois','domain=example.com');assert.equal(b.registrar,'Fixture Registrar');assert.equal(b.registeredOn,'Unknown');assert.equal(b.organization,'Unknown');assert.deepEqual(b.status,[]);assert(!b.rawText.includes('active / ok'));assert.equal((await req('whois','domain=example.com','transport-failure')).status,502);});
 await test('email record presence is not policy enforcement; DNS failure is no score',async()=>{const {body:b}=await req('email-security','domain=example.com');assert.equal(b.score,100);assert(b.dmarc.record.includes('p=none'));assert(b.dmarc.status.includes('not fully validated'));assert.equal((await req('email-security','domain=example.com','servfail')).status,502);});
 await test('CIDR boundaries /0 /31 /32, malformed prefix and reserved IP classification',async()=>{let b=(await req('subnet','cidr=192.168.1.1/0')).body;assert.equal(b.networkAddress,'0.0.0.0');assert.equal(b.broadcastAddress,'255.255.255.255');assert.equal(b.totalHosts,4294967296);b=(await req('subnet','cidr=192.168.1.1/31')).body;assert.equal(b.usableHosts,2);b=(await req('subnet','cidr=127.0.0.1/32')).body;assert.equal(b.usableHosts,1);assert(b.ipType.includes('Reserved'));assert.equal((await req('subnet','cidr=1.1.1.1/nope')).status,400);});
 await test('GET-only endpoints handle CORS and reject mutations',async()=>{assert.equal((await req('dns','', 'default','POST')).status,405);assert.equal((await req('dns','', 'default','OPTIONS')).status,204);});
 console.log(JSON.stringify({tests:count,network:'fixtures only; no external target requests',result:'passed'}));
} finally {php.exit();}
