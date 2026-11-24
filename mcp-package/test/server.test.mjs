import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Client, StreamableHTTPClientTransport, InMemoryTransport } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';
const { createMcpHandler } = await import(process.env.MCP_SERVER_SDK || '@modelcontextprotocol/server');
const { createServer } = await import(process.env.MCP_SERVER_MODULE || '../src/server.mjs');

const reply = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json', ...headers },
});
async function harness(t, options) {
  const handler = createMcpHandler(() => createServer(options));
  const client = new Client({ name: 'ipbulucu-fixture-tests', version: '1.0.0' }, { versionNegotiation: { mode: 'auto' } });
  await client.connect(new StreamableHTTPClientTransport(new URL('http://fixture.invalid/mcp'), {
    fetch: (url, init) => handler.fetch(new Request(url, init)),
  }));
  t.after(async () => { await client.close(); await handler.close(); });
  return client;
}

test('lists five typed, read-only tools without automatic API requests', async t => {
  let calls = 0;
  const c = await harness(t, { fetchImpl: async () => { calls++; throw new Error(); } });
  const { tools } = await c.listTools();
  assert.equal(tools.length, 5);
  for (const tool of tools) {
    assert.equal(tool.annotations.readOnlyHint, true);
    assert.equal(tool.annotations.destructiveHint, false);
    assert.equal(tool.annotations.openWorldHint, true);
    assert.equal(tool.inputSchema.additionalProperties, false);
  }
  assert.equal(calls, 0);
});

test('each tool maps to the fixed HTTPS API with encoded arguments and fixed MCP labels', async t => {
  const requests = [];
  const data = { success: true, partial: true, isClean: null, geoStatus: 'unavailable', checkedCount: 2, totalCount: 4, unavailable: ['fixture'] };
  const c = await harness(t, { fetchImpl: async (url, init) => {
    requests.push({ url: new URL(url), init });
    return reply(data);
  } });
  const cases = [
    ['lookup_ip', { ip: '8.8.8.8' }, '/api/ip', { ip: '8.8.8.8', format: 'json' }],
    ['dns', { domain: 'example.com' }, '/api/dns', { host: 'example.com' }],
    ['tcp_port', { host: 'example.com', port: 443 }, '/api/port', { host: 'example.com', port: '443' }],
    ['blacklist', { ip: '8.8.8.8' }, '/api/blacklist', { ip: '8.8.8.8' }],
    ['subnet', { cidr: '192.0.2.0/24' }, '/api/subnet', { cidr: '192.0.2.0/24' }],
  ];
  for (const [name, args, path, params] of cases) {
    const result = await c.callTool({ name: `ipbulucu_${name}`, arguments: args });
    assert.notEqual(result.isError, true);
    assert.deepEqual(result.structuredContent, { source: 'ipbulucu.org', data });
    assert.deepEqual(JSON.parse(result.content[0].text), result.structuredContent);
    const { url, init } = requests.at(-1);
    assert.equal(url.origin, 'https://ipbulucu.org');
    assert.equal(url.pathname, path);
    assert.deepEqual(Object.fromEntries(url.searchParams), params);
    assert.equal(init.redirect, 'error');
    assert.equal(init.method, 'GET');
    assert.deepEqual(init.headers, { Accept: 'application/json', 'X-IPBulucu-Client': 'mcp', 'X-IPBulucu-Action': 'auto' });
  }
  assert.equal(requests.length, 5);
});

test('rejects invalid, private, ambiguous and object-coerced arguments before API calls', async t => {
  let calls = 0;
  const c = await harness(t, { fetchImpl: async () => { calls++; return reply({ success: true }); } });
  const bad = [
    ['lookup_ip', {}], ['lookup_ip', { ip: {} }], ['lookup_ip', { ip: ['8.8.8.8'] }],
    ...['127.0.0.1', '10.0.0.1', '100.64.0.1', '198.18.0.1', '::1', '::ffff:8.8.8.8', '2001:db8::1', '2002:0808:0808::', '2001::1', 'fe80::1%en0', 'https://example.com', '8.8.8.8&format=text'].map(ip => ['lookup_ip', { ip }]),
    ['dns', { domain: 'localhost' }], ['dns', { domain: 'x.local' }], ['dns', { domain: '1.2.3.999' }], ['dns', { domain: 'https://example.com/a' }], ['dns', { domain: 'example.com', headers: { secret: 'not-forwarded' } }],
    ['tcp_port', { host: 'example.com', port: '443' }], ['tcp_port', { host: 'example.com', port: 65536 }], ['tcp_port', { host: 'example.com', port: 0 }], ['tcp_port', { host: '10.0.0.1', port: 80 }],
    ['blacklist', { ip: '2606:4700:4700::1111' }], ['subnet', { cidr: '192.0.2.0' }], ['subnet', { cidr: '192.0.2.0/33' }],
  ];
  for (const [name, args] of bad) assert.equal((await c.callTool({ name: `ipbulucu_${name}`, arguments: args })).isError, true);
  assert.equal(calls, 0);
});

test('supports public IPv6, Punycode and /0 /31 /32 CIDRs without rewriting inputs', async t => {
  let calls = 0;
  const c = await harness(t, { fetchImpl: async () => { calls++; return reply({ success: true }); } });
  for (const [name, args] of [
    ['lookup_ip', { ip: '2606:4700:4700::1111' }], ['dns', { domain: 'xn--bcher-kva.de' }],
    ...['0', '31', '32'].map(prefix => ['subnet', { cidr: `192.0.2.0/${prefix}` }]),
  ]) assert.notEqual((await c.callTool({ name: `ipbulucu_${name}`, arguments: args })).isError, true);
  assert.equal(calls, 5);
});

test('QA is explicitly separate from normal MCP usage', async t => {
  const c = await harness(t, { operationalQa: true, fetchImpl: async (_, { headers }) => {
    assert.equal(headers['X-IPBulucu-Context'], 'operational_qa');
    return reply({ success: true });
  } });
  assert.notEqual((await c.callTool({ name: 'ipbulucu_dns', arguments: { domain: 'example.com' } })).isError, true);
});

test('HTTP errors retain status/retry delay, never echo bodies and never retry', async t => {
  let calls = 0;
  const c = await harness(t, { fetchImpl: async () => { calls++; return reply({ error: 'SECRET_FIXTURE' }, 429, { 'Retry-After': '60' }); } });
  const result = await c.callTool({ name: 'ipbulucu_dns', arguments: { domain: 'example.com' } });
  assert.equal(result.isError, true);
  assert.equal(result.structuredContent.httpStatus, 429);
  assert.equal(result.structuredContent.retryAfterSeconds, 60);
  assert(!JSON.stringify(result).includes('SECRET_FIXTURE'));
  assert.equal(calls, 1);
});

test('malformed, false success, oversized and unexpected content types are unavailable', async t => {
  const responses = [
    new Response('SECRET_FIXTURE', { headers: { 'Content-Type': 'application/json' } }),
    reply({ success: false, error: 'SECRET_FIXTURE' }), reply(null), reply([]), reply({}),
    reply({ success: true, raw: 'x'.repeat(270000) }), new Response('SECRET_FIXTURE', { headers: { 'Content-Type': 'text/html' } }),
  ];
  let calls = 0;
  const c = await harness(t, { fetchImpl: async () => responses[calls++] });
  for (let i = 0; i < responses.length; i++) {
    const result = await c.callTool({ name: 'ipbulucu_dns', arguments: { domain: 'example.com' } });
    assert.equal(result.isError, true);
    assert(!JSON.stringify(result).includes('SECRET_FIXTURE'));
  }
  assert.equal(calls, responses.length);
});

test('timeout cancels transport and does not expose target or retry', async t => {
  let calls = 0;
  const c = await harness(t, { timeoutMs: 15, fetchImpl: async (_, { signal }) => {
    calls++;
    return new Promise((_, reject) => signal.addEventListener('abort', () => reject(new Error('SECRET_FIXTURE')), { once: true }));
  } });
  const result = await c.callTool({ name: 'ipbulucu_dns', arguments: { domain: 'example.com' } });
  assert.equal(result.structuredContent.error, 'request_aborted_or_timed_out');
  assert(!JSON.stringify(result).includes('example.com'));
  assert.equal(calls, 1);
});

test('third simultaneous operation is rejected without a third API request', async t => {
  const release = [];
  const server = createServer({ fetchImpl: async () => new Promise(resolve => release.push(() => resolve(reply({ success: true })))) });
  const c = new Client({ name: 'concurrency-fixture', version: '1.0.0' });
  const [clientSide, serverSide] = InMemoryTransport.createLinkedPair();
  await server.connect(serverSide);
  await c.connect(clientSide);
  t.after(async () => { release.forEach(resolve => resolve()); await c.close(); await server.close(); });
  const args = { name: 'ipbulucu_dns', arguments: { domain: 'example.com' } };
  const one = c.callTool(args), two = c.callTool(args);
  const deadline = Date.now() + 2000;
  while (release.length < 2 && Date.now() < deadline) await new Promise(resolve => setTimeout(resolve, 5));
  assert.equal(release.length, 2);
  assert.equal((await c.callTool(args)).structuredContent.error, 'busy');
  assert.equal(release.length, 2);
  release.forEach(resolve => resolve());
  await Promise.all([one, two]);
});

test('installed stdio entry negotiates current and legacy client connections with no stdout noise', async t => {
  for (const options of [{}, { versionNegotiation: { mode: 'auto' } }]) {
    const client = new Client({ name: 'ipbulucu-stdio-test', version: '1.0.0' }, options);
    const transport = new StdioClientTransport({ command: process.execPath, args: [process.env.MCP_BIN || 'bin/ipbulucu-mcp.mjs'], stderr: 'pipe' });
    let errors = '';
    transport.stderr?.on('data', chunk => { errors += chunk; });
    await client.connect(transport);
    assert.equal((await client.listTools()).tools.length, 5);
    await client.close();
    assert.equal(errors, '');
  }
});

test('activity participation requires opt-in and excludes QA', async t => {
  for (const [measureActivity, operationalQa] of [[false,false],[true,false],[true,true]]) {
    const seen = [];
    const c = await harness(t, { measureActivity, operationalQa,
      fetchImpl: async (url, options) => {
        seen.push(new Headers(options.headers).get('X-IPBulucu-Activity'));
        return reply({ success:true });
      }
    });
    await c.listTools();
    assert.equal(seen.length, 0);
    await c.callTool({ name:'ipbulucu_dns', arguments:{domain:'example.com'} });
    assert.equal(seen.length, 1);
    if (measureActivity && !operationalQa) assert.match(seen[0], /^\d{4}-\d{2}-\d{2}\/[0-9a-f]{4}$/);
    else assert.equal(seen[0], null);
  }
});
