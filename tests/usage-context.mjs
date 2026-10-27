import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
function compile(file) { return ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText; }
const mod={exports:{}};vm.runInNewContext(compile('src/lib/analytics-bootstrap.ts'),{exports:mod.exports});const script=mod.exports.analyticsBootstrap;
let tests=0;
function environment(href, {storage=new Map(), denied=false}={}) {
 const listeners={},documentListeners={}, scripts=[];let url=new URL(href);
 const env={URL,URLSearchParams,Date,Headers,Request,Response,performance,console,exports:{},require:()=>({calculateIpFormats:()=>true})};
 env.window=env;
 Object.defineProperty(env,'location',{get:()=>url});
 env.sessionStorage={getItem:key=>{if(denied)throw Error('denied');return storage.get(key)||null;},setItem:(key,value)=>{if(denied)throw Error('denied');storage.set(key,value);}};
 env.history={state:null,pushState(state,unused,next){this.state=state;if(next!=null)url=new URL(next,url);},replaceState(state,unused,next){this.state=state;if(next!=null)url=new URL(next,url);}};
 env.addEventListener=(type,fn)=>listeners[type]=fn;
 env.document={referrer:'https://example.test/?private=DO_NOT_STORE#DO_NOT_STORE',addEventListener:(type,fn)=>documentListeners[type]=fn,createElement:()=>({}),head:{appendChild:tag=>scripts.push(tag)}};
 env.fetch=async(input,init)=>{env.requests.push({input,init});return new Response('{"success":true}',{status:200});};env.requests=[];
 vm.createContext(env);vm.runInContext(script,env);vm.runInContext(compile('src/lib/usage.ts'),env);
 return {env,storage,listeners,documentListeners,scripts,events:()=>env.dataLayer?.map(x=>Array.from(x))||[],navigate:next=>{url=new URL(next,url);listeners.popstate?.();}};
}
async function test(name,fn){await fn();tests++;console.log('PASS',name);}
function result(e){return e.events().filter(x=>x[0]==='event'&&x[1]==='tool_result').at(-1)?.[2];}
function qualifies(fields){return fields.interaction==='user'&&fields.outcome==='success'&&!fields.page_location.includes('utm_medium=internal');}
await test('normal entry is unclassified; no storage write, clean event URL and referrer',async()=>{
 const e=environment('https://ipbulucu.org/en/blacklist-check/?ip=DO_NOT_STORE&utm_source=github#DO_NOT_STORE');
 await e.env.exports.toolFetch('/api/blacklist?ip=DO_NOT_STORE',undefined,'user');
 assert.equal(e.storage.size,0);assert.equal(result(e).usage_context,'unclassified');assert(qualifies(result(e)));
 assert.equal(e.env.requests[0].init.headers.get('X-IPBulucu-Context'),'unclassified');
 assert(!JSON.stringify(e.events()).includes('DO_NOT_STORE'));assert.equal(e.scripts.length,1);
 assert.equal(e.events().find(x=>x[0]==='config')[2].page_referrer,'https://example.test/');
});
await test('internal entry labels first page view, manual result, copy event and API; excludes conversion',async()=>{
 const e=environment('https://ipbulucu.org/?utm_medium=internal');
 await e.env.exports.toolFetch('/api/ip?format=text',undefined,'user');
 e.env.exports.usageEvent('diagnostic_summary_copy',{tool_name:'ip',usage_context:'injected'});
 const defaults=e.events().filter(x=>x[0]==='set').at(-1)[1];assert.equal(defaults.usage_context,'operational_qa');
 assert.equal(e.events().find(x=>x[0]==='config')[2].usage_context,undefined,'target-scoped value must not override later global context');
 assert.equal(e.storage.get('ipbulucu.operational-qa'),'1');assert.equal(result(e).interaction,'user');assert(!qualifies(result(e)));
 assert.equal(e.env.requests[0].init.headers.get('X-IPBulucu-Context'),'operational_qa');
 assert.equal(e.events().at(-1)[2].usage_context,'operational_qa');
});
await test('QA entered mid-session remains event scoped across SPA navigation and reload',async()=>{
 const e=environment('https://ipbulucu.org/');e.env.history.pushState({next:1},'','/?utm_medium=internal');
 e.env.history.pushState({next:2},'','/en/blacklist-check/?ip=DO_NOT_STORE');
 await e.env.exports.toolFetch('/api/blacklist',undefined,'user');assert(!qualifies(result(e)));
 assert.equal(e.env.location.search,'?ip=DO_NOT_STORE&utm_medium=internal');assert.equal(e.env.history.state.next,2);
 const reload=environment('https://ipbulucu.org/en/',{storage:e.storage});assert.equal(reload.env.ipbulucuTelemetry.context(),'operational_qa');
 assert(reload.env.location.search.includes('utm_medium=internal'));
 assert(!JSON.stringify(e.events()).includes('DO_NOT_STORE'));
});
await test('denied storage preserves QA through SPA, reload, back and full-document link',async()=>{
 const e=environment('https://ipbulucu.org/?utm_medium=internal',{denied:true});
 e.env.history.pushState(null,'','/en/');assert.equal(e.env.location.search,'?utm_medium=internal');
 const reloaded=environment(e.env.location.href,{denied:true});assert.equal(reloaded.env.ipbulucuTelemetry.context(),'operational_qa');
 e.navigate('https://ipbulucu.org/port-kontrolu/');assert.equal(e.env.location.search,'?utm_medium=internal');
 const link={href:'https://ipbulucu.org/en/blacklist-check/',hasAttribute:()=>false};e.documentListeners.click({target:{closest:()=>link}});
 assert(link.href.includes('utm_medium=internal'));
 const next=environment(link.href,{denied:true});await next.env.exports.toolFetch('/api/blacklist',undefined,'user');assert(!qualifies(result(next)));
});
await test('normal denied storage, external links, downloads and API links remain functional',async()=>{
 const e=environment('https://ipbulucu.org/',{denied:true});e.env.history.pushState(null,'','/en/');assert.equal(e.env.location.search,'');
 await e.env.exports.toolFetch('/api/blacklist',undefined,'user');assert(qualifies(result(e)));
 const qa=environment('https://ipbulucu.org/?utm_medium=internal');
 for(const [href,download] of [['https://other.example/',false],['mailto:test@example.test',false],['https://ipbulucu.org/api/ip',false],['https://ipbulucu.org/openapi.json',false],['https://ipbulucu.org/download/',true]]){
  const link={href,hasAttribute:()=>download};qa.documentListeners.click({target:{closest:()=>link}});assert.equal(link.href,href);
 }
});
await test('unmarked new tab stays unclassified; arbitrary stored value and campaign cannot assert identity',async()=>{
 for(const href of ['https://ipbulucu.org/','https://ipbulucu.org/?utm_medium=notinternal']){
  const e=environment(href,{storage:new Map([['ipbulucu.operational-qa','DO_NOT_STORE']])});assert.equal(e.env.ipbulucuTelemetry.context(),'unclassified');
 }
});
await test('external requests are untouched; network errors retain fixed QA label',async()=>{
 const e=environment('https://ipbulucu.org/?utm_medium=internal');await e.env.exports.toolFetch('https://other.example/api/ip');assert.equal(e.env.requests[0].init,undefined);
 e.env.fetch=async()=>{throw Error('DO_NOT_STORE');};await assert.rejects(e.env.exports.toolFetch('/api/blacklist',undefined,'user'));
 assert.equal(result(e).outcome,'network_error');assert.equal(result(e).usage_context,'operational_qa');assert(!JSON.stringify(e.events()).includes('DO_NOT_STORE'));
});
await test('nonproduction host does not load Google or collect analytics',async()=>{
 const e=environment('http://localhost:8784/?utm_medium=internal');assert.equal(e.scripts.length,0);e.env.exports.usageEvent('test',{});assert.equal(e.events().length,0);
});
console.log(JSON.stringify({tests,result:'passed',network:'none; deterministic browser and transport fixtures'}));
