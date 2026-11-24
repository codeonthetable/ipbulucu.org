import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sdk=require('../npm-package/index.js');
const seen=[];
globalThis.fetch=async(url,opts)=>{seen.push({url,opts});return {ok:true,json:async()=>({success:true,ip:'1.1.1.1',geoStatus:'unavailable',isVpn:null})};};
const result=await sdk.getIp('2606:4700::1111');
assert.equal(result.geoStatus,'unavailable');assert.equal(result.isVpn,null);
await sdk.getWhois('example.com');await sdk.checkPort('example.com',443);
assert(seen[0].url.includes('2606%3A4700%3A%3A1111'));
for(const x of seen){assert.equal(x.opts.headers['X-IPBulucu-Client'],'node-sdk');assert(x.opts.signal instanceof AbortSignal);}
globalThis.fetch=async()=>({ok:false,status:429});
await assert.rejects(()=>sdk.getIp(),/HTTP 429/);
console.log('PASS Node SDK: input encoding, nullable results, client header, timeout signal, HTTP errors');
const callsBeforeInvalid=seen.length;
globalThis.fetch=async()=>{ throw new Error('Unexpected network request for invalid arguments'); };
for (const value of [null, false, {}, ['host'], 123, 'undefined', '[object Object]', 'bad host'])
  for (const method of [sdk.getIp, sdk.getWhois, sdk.checkPort])
    await assert.rejects(()=>method(value), TypeError);
for (const port of [null, {}, NaN, 0, 65536, '80&other=x', [], [false], '80,'])
  await assert.rejects(()=>sdk.checkPort('example.com',port), /TCP port/);
assert.equal(seen.length,callsBeforeInvalid);
globalThis.fetch=async url=>({ok:true,json:async()=>new URL(url).searchParams});
assert.equal((await sdk.checkPort('https://example.com/path',[80,443])).get('port'),'80,443');
assert.equal((await sdk.getIp()).get('ip'),null);
console.log('PASS invalid arguments rejected locally and supported forms preserved');
let dnsCalls=0;
globalThis.fetch=async(url,options)=>{
  dnsCalls++;
  assert.equal(new URL(url).pathname, '/api/dns');
  assert.equal(new URL(url).searchParams.get('host'), 'xn--bcher-kva.example');
  assert.equal(options.headers['X-IPBulucu-Client'],'node-sdk');
  return {ok:true,json:async()=>({success:true,statuses:{MX:'no-record'},records:{MX:[]}})};
};
assert.deepEqual((await sdk.getDns(' XN--BCHER-KVA.example. ')).records.MX, []);
for (const invalid of [null,{},'', '127.0.0.1','::1','localhost','a..org','https://example.com','x.org/','example.123'])
  await assert.rejects(()=>sdk.getDns(invalid),TypeError);
assert.equal(dnsCalls,1);
globalThis.fetch=async()=>({ok:false,status:502});
await assert.rejects(()=>sdk.getDns('example.com'),/502/);
console.log('PASS DNS normalization, headers, absent records, invalid arguments and HTTP failure');
