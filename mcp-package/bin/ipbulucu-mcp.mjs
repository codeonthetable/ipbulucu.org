#!/usr/bin/env node
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { createServer } from '../src/server.mjs';

if (process.argv.includes('--version')) {
  process.stdout.write('ipbulucu-mcp 1.0.1\n');
} else if (process.argv.length > 2) {
  process.stderr.write('Usage: ipbulucu-mcp [--version]\n');
  process.exitCode = 1;
} else {
  const handle = serveStdio(() => createServer({
    measureActivity: process.env.IPBULUCU_USAGE_METRICS === 'true',
    operationalQa: process.env.IPBULUCU_CONTEXT === 'operational_qa',
  }));
  const close = () => { void handle.close(); };
  process.on('SIGINT', close);
  process.on('SIGTERM', close);
}
