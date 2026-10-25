import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import ts from 'typescript';
const compiled=ts.transpileModule(fs.readFileSync('src/lib/api-examples.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {apiExamples}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
let checks=0;
const secret='SYNTHETIC_PRIVATE_INPUT';
const cases=[
  {name:'complete',status:200,data:{success:true,ip:secret,geoStatus:'available'},label:'IP and approximate location available'},
  {name:'geo unavailable',status:200,data:{success:true,ip:secret,geoStatus:'unavailable',city:null},label:'IP available; location incomplete or unavailable'},
  {name:'partial',status:200,data:{success:true,ip:secret,geoStatus:'available',partial:true},label:'IP available; location incomplete or unavailable'},
  {name:'missing geo status',status:200,data:{success:true,ip:secret},label:'IP available; location incomplete or unavailable'},
  {name:'429 no retry',status:429,data:{error:secret},fail:true},
  {name:'502 no retry',status:502,data:{error:secret},fail:true},
  {name:'400 no retry',status:400,data:{error:secret},fail:true},
  {name:'application failure',status:200,data:{success:false,error:secret},fail:true},
  {name:'missing IP',status:200,data:{success:true},fail:true},
  {name:'invalid shape',status:200,data:[],fail:true},
  {name:'null body',status:200,data:null,fail:true},
  {name:'invalid JSON',status:200,invalid:true,fail:true},
  {name:'timeout',network:true,fail:true},
];
for(const fixture of cases){
  let calls=0;const logs=[];
  const context=vm.createContext({URL,AbortSignal,process:{},console:{log:x=>logs.push(x),error:x=>logs.push(x)},fetch:async(url,options)=>{
    calls++;assert.equal(url.origin,'https://ipbulucu.org');assert.equal(url.searchParams.get('format'),'json');assert(options.signal instanceof AbortSignal);assert.equal(url.searchParams.has('ip'),false);
    if(fixture.network)throw new Error(secret);
    return {status:fixture.status,ok:fixture.status>=200&&fixture.status<300,json:async()=>{if(fixture.invalid)throw new Error(secret);return fixture.data;}};
  }});
  await vm.runInContext(apiExamples.nodejs,context);
  assert.equal(calls,1,fixture.name);assert.equal(logs.length,1);assert(!logs[0].includes(secret));
  assert.equal(logs[0],fixture.fail?'Lookup failed; no automatic retry':fixture.label);
  assert.equal(context.process.exitCode,fixture.fail?1:undefined);
  checks++;console.log('PASS Node:',fixture.name);
}
let encoded;
const ctx=vm.createContext({URL,AbortSignal,fetch:async url=>{encoded=url;return{status:200,ok:true,json:async()=>({success:true,ip:secret})}}});
vm.runInContext(apiExamples.nodejs.replace(/main\(\);\s*$/,''),ctx);
await ctx.getIp('example.test&format=text');
assert.equal(encoded.searchParams.get('ip'),'example.test&format=text');assert.equal(encoded.searchParams.get('format'),'json');checks++;console.log('PASS Node: input encoding');
const py=`import sys,json,types,io,contextlib
payload=json.load(sys.stdin)
class RequestException(Exception): pass
requests=types.ModuleType('requests'); requests.RequestException=RequestException
sys.modules['requests']=requests
for fixture in payload['cases']:
 calls=[]
 class Response:
  status_code=fixture.get('status',0)
  def json(self):
   if fixture.get('invalid'): raise ValueError('SYNTHETIC_PRIVATE_INPUT')
   return fixture.get('data')
 def get(url,**kwargs):
  calls.append((url,kwargs)); assert kwargs['timeout']==(5,10)
  assert kwargs['params']=={'format':'json'}
  if fixture.get('network'): raise RequestException('SYNTHETIC_PRIVATE_INPUT')
  return Response()
 requests.get=get
 scope={'__name__':'fixture'}; exec(payload['source'],scope)
 out=io.StringIO();code=None
 with contextlib.redirect_stdout(out):
  try: scope['main']()
  except SystemExit as e: code=e.code
 assert len(calls)==1
 assert 'SYNTHETIC_PRIVATE_INPUT' not in out.getvalue()
 assert out.getvalue().strip()==('Lookup failed; no automatic retry' if fixture.get('fail') else fixture['label'])
 assert code==(1 if fixture.get('fail') else None)
 print('PASS Python:',fixture['name'])
requests.get=lambda url,**kwargs: type('Response',(),{'status_code':200,'json':lambda self:{'success':True,'ip':'fixture'}})() if kwargs['params']=={'format':'json','ip':'example.test&format=text'} else (_ for _ in ()).throw(AssertionError('params'))
scope['get_ip']('example.test&format=text');print('PASS Python: encoded params')
`;
const result=spawnSync('python3',['-c',py],{input:JSON.stringify({source:apiExamples.python,cases}),encoding:'utf8'});
assert.equal(result.status,0,result.stderr);process.stdout.write(result.stdout);checks+=cases.length+1;
// Check shell syntax and run with a shell-function curl fixture, never a network call.
assert.equal(spawnSync('bash',['-n'],{input:apiExamples.curl}).status,0);
for(const code of [0,22,28]){
 const stub=`curl() { printf 'SYNTHETIC_PRIVATE_INPUT'; return ${code}; }\n`;
 const result=spawnSync('bash',[],{input:stub+apiExamples.curl,encoding:'utf8'});
 assert(!result.stdout.includes(secret));assert(!result.stderr.includes(secret));
 assert.equal(result.stdout,code===0?'Public IP received.\n':'');
 assert.equal(result.stderr,code===0?'':'Lookup failed; no automatic retry.\n');checks++;
}
console.log('PASS cURL: success, HTTP failure and timeout fixtures');
console.log(JSON.stringify({checks,network:'none',result:'passed'}));
