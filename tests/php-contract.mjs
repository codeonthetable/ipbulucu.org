// Test with WordPress PHP.wasm 3.1.60 (PHP 8.3); provider calls are deterministic fixtures.
// PHP_WASM_MODULES=/path/to/node_modules node tests/php-contract.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const modules=process.env.PHP_WASM_MODULES;
if(!modules) throw new Error('Set PHP_WASM_MODULES to a test-only installation of @php-wasm/node and @php-wasm/universal');
const {PHP}=await import(pathToFileURL(path.join(modules,'@php-wasm/universal/index.js')));
const {loadNodeRuntime}=await import(pathToFileURL(path.join(modules,'@php-wasm/node/index.js')));
const php=new PHP(await loadNodeRuntime('8.3',{emscriptenOptions:{processId:1}}));
let count=0;
try {
 php.mkdir('/www');php.mkdir('/private-metrics');php.mkdir('/www/public-metrics');
 for(const filename of fs.readdirSync('server_api').filter(x=>x.endsWith('.php'))) php.writeFile('/www/'+filename,fs.readFileSync('server_api/'+filename));
 // Namespace mocks intercept only upstream cURL functions; endpoint validation/output are unchanged.
 const mocks=`namespace IPBulucuContract; function curl_init($url){if(getenv('IPB_TEST_NO_PROVIDER')==='1')throw new \\RuntimeException('Unexpected provider call');return $url;} function curl_setopt_array($c,$o){return true;} function curl_exec($c){return getenv('IPB_TEST_PROVIDER');} function curl_getinfo($c,$o){return (int)(getenv('IPB_TEST_STATUS') ?: 200);} function curl_close($c){}`;
 const original=fs.readFileSync('server_api/ip.php','utf8');
 php.writeFile('/www/ip.php',original.replace('<?php','<?php '+mocks));
 async function request(file='ip.php',query='ip=1.1.1.1&format=json',options={}) {
  const {env={},server={},...rest}=options;
  const result=await php.run({scriptPath:'/www/'+file,relativeUri:'/api/'+file+'?'+query,method:'GET',$_SERVER:{DOCUMENT_ROOT:'/www',SCRIPT_FILENAME:'/www/'+file,REMOTE_ADDR:'1.1.1.1',...server},env:{IPB_TEST_PROVIDER:'{"success":false}',IPB_TEST_STATUS:'200',IPBULUCU_METRICS_DIR:'/private-metrics',IPBULUCU_TRUST_PROXY_HEADERS:'0',...env},...rest});
  assert.equal(result.exitCode,0,result.errors);assert.equal(result.errors,'');return result;
 }
 async function test(name,fn){await fn();console.log('PASS',name);count++;}
 await test('public IPv4 returns explicit partial result on provider failure',async()=>{let r=await request();assert.equal(r.httpStatusCode,200);let b=JSON.parse(r.text);assert.equal(b.ip,'1.1.1.1');assert.equal(b.geoStatus,'unavailable');assert.equal(b.city,null);for(let k of ['securityScore','isCgnat','isVpn','lineSpeedTier'])assert.equal(b[k],null);assert.deepEqual(b.globalPings,[]);});
 await test('provider result carries source and approximate values',async()=>{let r=await request('ip.php',undefined,{env:{IPB_TEST_PROVIDER:JSON.stringify({success:true,ip:'1.1.1.1',city:'Fixture City',country:'Fixture Country',latitude:12.5,longitude:20,connection:{asn:13335,isp:'Fixture ISP'}})}});let b=JSON.parse(r.text);assert.equal(b.geoStatus,'available');assert.equal(b.source,'ipwho.is');assert.equal(b.asn,'AS13335');assert.equal(b.city,'Fixture City');assert.equal(b.securityScore,null);});
 await test('provider IP mismatch cannot attach another target location',async()=>{let r=await request('ip.php',undefined,{env:{IPB_TEST_PROVIDER:'{"success":true,"ip":"8.8.8.8","city":"Wrong"}'}});assert.equal(JSON.parse(r.text).city,null);});
 await test('invalid, array, private, loopback and reserved IPs reject',async()=>{for(const q of ['ip=bad!','ip[]=1.1.1.1','ip=127.0.0.1','ip=192.168.1.1','ip=::1','ip=0.0.0.0']){let r=await request('ip.php',q);assert.equal(r.httpStatusCode,400,q);assert.equal(JSON.parse(r.text).success,false);}});
 await test('public IPv6 supported without fabricated provider data',async()=>{let r=await request('ip.php','ip=2606:4700:4700::1111&format=json');assert.equal(JSON.parse(r.text).version,'IPv6');});
 await test('forwarded IP ignored by default',async()=>{let r=await request('ip.php','format=text',{server:{HTTP_CF_CONNECTING_IP:'8.8.8.8'}});assert.equal(r.text,'1.1.1.1\n');});
 await test('configured proxy and text output',async()=>{let r=await request('ip.php','format=text',{env:{IPBULUCU_TRUST_PROXY_HEADERS:'1'},server:{HTTP_CF_CONNECTING_IP:'8.8.8.8'}});assert.equal(r.text,'8.8.8.8\n');});
 await test('monitor text request bypasses geolocation provider',async()=>{let r=await request('ip.php','format=text',{env:{IPB_TEST_NO_PROVIDER:'1'}});assert.equal(r.text,'1.1.1.1\n');assert.equal(r.httpStatusCode,200);});
 await test('method and preflight behavior',async()=>{assert.equal((await request('ip.php','',{method:'POST'})).httpStatusCode,405);assert.equal((await request('ip.php','',{method:'OPTIONS'})).httpStatusCode,204);});
 await test('unavailable watch is not false success; debug inaccessible',async()=>{assert.equal((await request('watch.php')).httpStatusCode,501);assert.equal((await request('debug.php')).httpStatusCode,404);assert.equal((await request('usage.php')).httpStatusCode,404);});
 await test('aggregate counters contain labels only and reject public storage',async()=>{await request('ip.php','format=text&secret=DO_NOT_STORE',{env:{IPBULUCU_METRICS_DIR:'/private-metrics'},server:{HTTP_X_IPBULUCU_CLIENT:'node-sdk',HTTP_X_IPBULUCU_ACTION:'user',HTTP_USER_AGENT:'DO_NOT_STORE'}});const files=php.listFiles('/private-metrics').filter(x=>/^\d{4}-/.test(x));assert.equal(files.length,1);const raw=php.readFileAsText('/private-metrics/'+files[0]);const b=JSON.parse(raw);assert.equal(b.counts['ip|node-sdk_claimed|user|2xx'],1);assert(!raw.includes('1.1.1.1'));assert(!raw.includes('DO_NOT_STORE'));await request('ip.php','format=text',{env:{IPBULUCU_METRICS_DIR:'/www/public-metrics'}});assert.deepEqual(php.listFiles('/www/public-metrics'),[]);});
 // Syntax validation of all source PHP files without executing network endpoints.
 await test('all PHP source files parse',async()=>{for(const name of fs.readdirSync('server_api').filter(x=>x.endsWith('.php'))){const r=await php.run({code:`<?php token_get_all(file_get_contents('/www/${name}'), TOKEN_PARSE);`});assert.equal(r.exitCode,0,name+': '+r.errors);}});
 console.log(JSON.stringify({php:'8.3.33',tests:count,result:'passed',network:'mocked provider; no target traffic'}));
} finally {php.exit();}
