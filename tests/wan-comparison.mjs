import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const compile = path => ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const dataUrl = source => 'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
const dep = dataUrl(compile('src/lib/ip-formats.ts'));
const {compareWan} = await import(dataUrl(compile('src/lib/wan-comparison.ts').replace('"./ip-formats"',JSON.stringify(dep))));
const cases = [
 ['100.64.0.0','1.1.1.1','shared'],['100.127.255.255','1.1.1.1','shared'],
 ['100.63.255.255','1.1.1.1','different'],['100.128.0.0','1.1.1.1','different'],
 ['10.0.0.1','1.1.1.1','private'],['172.16.0.1','1.1.1.1','private'],['172.31.255.255','1.1.1.1','private'],['172.32.0.1','1.1.1.1','different'],
 ['192.168.1.1','1.1.1.1','private'],['127.0.0.1','1.1.1.1','special'],['169.254.1.1','1.1.1.1','special'],['198.18.0.1','1.1.1.1','special'],['192.0.2.1','1.1.1.1','special'],
 ['224.0.0.1','1.1.1.1','special'],['0.0.0.0','1.1.1.1','special'],['1.1.1.1','192.168.1.1','public_required'],['1.1.1.1','100.64.0.1','public_required'],
 ['1.1.1.1','1.1.1.1','same'],['1.1.1.1','8.8.8.8','different'],[' 1.1.1.1 ','1.1.1.1','same'],
 ['::1','1.1.1.1','ipv6'],['1.1.1.1','2001:db8::1','ipv6'],['garbage','1.1.1.1','invalid'],['01.1.1.1','1.1.1.1','invalid'],['256.1.1.1','1.1.1.1','invalid'],['','1.1.1.1','invalid'],
];
for(const [wan,publicIp,expected] of cases) assert.equal(compareWan(wan,publicIp),expected);
console.log(`PASS ${cases.length} WAN boundary, validation and unknown-state cases; no network`);
