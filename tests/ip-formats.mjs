import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import { isIP } from 'node:net';
const source=fs.readFileSync('src/lib/ip-formats.ts','utf8');
const output=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {calculateIpFormats:convert}=await import('data:text/javascript;base64,'+Buffer.from(output).toString('base64'));
let checks=0;
function test(name,fn){fn();checks++;console.log('PASS',name);}
test('IPv4 known values and unsigned maximum',()=>{
 assert.equal(convert('1.1.1.1').decimal,'16843009');
 assert.equal(convert('1.1.1.1').hex,'0x01010101');
 assert.equal(convert('192.0.2.1').reverseDns,'1.2.0.192.in-addr.arpa');
 assert.equal(convert('255.255.255.255').decimal,'4294967295');
 assert.equal(convert('0.0.0.0').decimal,'0');
 assert.equal(convert('255.0.128.1').binary,'11111111.00000000.10000000.00000001');
});
test('IPv6 compression, uppercase, zero and precision',()=>{
 assert.equal(convert('::').decimal,'0');
 assert.equal(convert('::1').decimal,'1');
 assert.equal(convert('2001:DB8::1').expanded,'2001:0db8:0000:0000:0000:0000:0000:0001');
 assert.equal(convert('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff').decimal,'340282366920938463463374607431768211455');
 assert.equal(convert('::ffff:192.0.2.1').expanded,'0000:0000:0000:0000:0000:ffff:c000:0201');
});
test('IPv6 reverse DNS matches RFC 3596 example',()=>{
 assert.equal(convert('4321:0:1:2:3:4:567:89ab').reverseDns,'b.a.9.8.7.6.5.0.4.0.0.0.3.0.0.0.2.0.0.0.1.0.0.0.0.0.0.0.1.2.3.4.ip6.arpa');
});
test('invalid addresses are rejected, not coerced',()=>{
 for(const ip of ['', '1.2.3','1.2.3.256','01.2.3.4','-1.2.3.4','1.2.3.4/24',':::',':1:2:3:4:5:6:7','1:2:3:4:5:6:7:','1:2:3:4:5:6:7:8:9','1:2:3:4:5:6:7::8','::ffff:192.0.2.256','::1::2','fe80::1%en0','[::1]',' ::1','::g','12345::']) assert.equal(convert(ip),null,ip);
});
test('valid address corpus agrees with independent Node parser',()=>{
 for(const ip of ['8.8.8.8','192.0.2.255','::','1::','1:2:3:4:5:6:7:8','::ffff:192.0.2.1','2001:db8::8a2e:370:7334']) assert.equal(convert(ip)?.version,'IPv'+isIP(ip),ip);
});
console.log(JSON.stringify({checks,result:'passed',network:'none'}));

const formatUrl='data:text/javascript;base64,'+Buffer.from(output).toString('base64');
const candidateSource=fs.readFileSync('src/lib/webrtc-candidates.ts','utf8');
const candidateOutput=ts.transpileModule(candidateSource,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText.replace("'./ip-formats'",JSON.stringify(formatUrl));
const {candidateAddress,isPublicCandidate,sameIp}=await import('data:text/javascript;base64,'+Buffer.from(candidateOutput).toString('base64'));
test('WebRTC extracts candidate address, ignores mDNS, handles compressed IPv6',()=>{
 assert.equal(candidateAddress({candidate:'candidate:123 1 udp 2122260223 abc.local 123 typ host'}),null);
 assert.equal(candidateAddress({candidate:'candidate:123 1 udp 2122260223 2606:4700::1111 123 typ srflx'}),'2606:4700::1111');
 assert(sameIp('2606:4700::1111','2606:4700:0:0:0:0:0:1111'));
 assert(!sameIp('1.1.1.1','::ffff:1.1.1.1'));
});
test('WebRTC private and reserved ranges do not become alleged public leaks',()=>{
 for(const ip of ['172.16.1.1','172.31.255.254','100.64.0.1','192.168.1.1','169.254.1.1','2001:0db8::1','::ffff:127.0.0.1','fe80::1','203.0.113.1']) assert.equal(isPublicCandidate(ip),false,ip);
 for(const ip of ['172.15.1.1','172.32.1.1','1.1.1.1','2606:4700::1111']) assert.equal(isPublicCandidate(ip),true,ip);
});
console.log(JSON.stringify({checks,result:'passed',network:'none'}));
