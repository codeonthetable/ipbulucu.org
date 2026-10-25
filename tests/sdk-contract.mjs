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
