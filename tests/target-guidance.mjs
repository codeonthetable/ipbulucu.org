import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync('src/lib/target-guidance.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {blacklistInputError,listenerCommands}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
let checks=0;
for(const language of ['tr','en']) {
 for(const input of ['','256.2.3.4','01.2.3.4','https://example.com','user@example.com','example.com/path','::1','-bad.example','a..example']) {assert.ok(blacklistInputError(input,true,language));checks++;}
 assert.ok(blacklistInputError('mail.example.com',false,language));checks++;
 assert.equal(blacklistInputError('mail.example.com',true,language),null);checks++;
 assert.equal(blacklistInputError(' 1.1.1.1 ',false,language),null);checks++;
}
for(const port of ['0','65536','-1','443;id','443\nwhoami','443.5','']) {assert.equal(listenerCommands(port),null);checks++;}
for(const port of ['1','443','8443','65535']) {const c=listenerCommands(port);assert.ok(c.windows.endsWith(port));assert.ok(c.linux.includes(':'+port));checks++;}
console.log(`PASS ${checks} blacklist target, hostname confirmation and safe local-command cases`);
