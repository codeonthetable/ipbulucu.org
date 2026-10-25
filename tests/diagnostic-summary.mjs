import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source = fs.readFileSync('src/lib/diagnostic-summary.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const {portSummary, emailSummary, summaryText} = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));
let checks = 0;
function test(name, fn) { fn(); checks++; console.log('PASS', name); }
test('port output excludes target, injected labels and arbitrary response text', () => {
  const rows = [{port:443,status:'open',host:'private-fixture.example',ip:'192.0.2.30',service:'SECRET_SERVICE',details:'SECRET_DETAILS'}, {port:22,status:'SECRET_STATUS'}, {port:'SECRET_PORT',status:'open'}];
  for (const language of ['tr', 'en']) {
    const text = summaryText(portSummary(rows,language),language);
    for (const raw of ['private-fixture.example','192.0.2.30','SECRET_SERVICE','SECRET_DETAILS','SECRET_STATUS','SECRET_PORT']) assert(!text.includes(raw));
    assert(text.includes('443')); assert(text.includes('22'));
  }
});
test('refused, timeout and unattempted ports remain distinguishable', () => {
  const summary = portSummary([{port:80,status:'closed'}, {port:443,status:'filtered'}, {port:25,status:'unavailable'}], 'en');
  assert.match(summary.findings[0], /refused/); assert.match(summary.findings[1], /Inconclusive/); assert.match(summary.findings[2], /Not tested/);
  assert.match(summary.limits, /neither a closed port nor CGNAT/);
});
test('unrecognized statuses cannot resolve to inherited object properties', () => {
  const summary = portSummary([{port:443,status:'constructor'},{port:80,status:'__proto__'}], 'en');
  assert(summary.findings.every(s=>s.includes('Unknown result')));
});
test('null MX is not described as a receiving mail server', () => {
  const result = emailSummary({mx:{records:[{priority:0,exchange:'.'}]},spf:{count:1},dmarc:{count:1}}, 'en');
  assert.match(result.findings[0], /does not accept email/); assert(!result.findings[0].includes('records found'));
  assert(result.nextSteps.some(s=>s.includes('incoming mail')));
});
test('missing evidence remains unknown, not zero or missing', () => {
  const result = emailSummary({}, 'en');
  assert(result.findings.every(s=>s.includes('Unknown')));
});
test('duplicate records are flagged while policy and delivery remain unverified', () => {
  const result = emailSummary({mx:{records:[]},spf:{count:2},dmarc:{count:0}}, 'en');
  assert.match(result.findings[1], /review duplicates/);
  assert.match(result.findings[2], /No record at this name/);
  assert.match(result.limits, /inbox delivery were not tested/);
});
test('mail summaries exclude domains, mailboxes and raw SPF/DMARC/MX values', () => {
  const raw = {domain:'private-fixture.example',mx:{records:[{priority:10,exchange:'private-mx.example'}]},spf:{count:1,record:'v=spf1 ip4:192.0.2.10 -all'},dmarc:{count:1,record:'v=DMARC1; rua=mailto:private@example.test'},error:'SECRET_ERROR'};
  for (const language of ['tr','en']) {
    const text = summaryText(emailSummary(raw,language),language);
    for (const secret of ['private-fixture','private-mx','192.0.2.10','private@example.test','SECRET_ERROR','v=spf1','v=DMARC1']) assert(!text.includes(secret));
    assert(!text.includes('100'));
  }
});
console.log(JSON.stringify({checks,result:'passed',network:'none'}));
