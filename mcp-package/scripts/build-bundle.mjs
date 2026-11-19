import { mkdtemp, cp, readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(process.argv[2] || join(root, 'dist'));
const pkg = JSON.parse(await readFile(join(root, 'package.json')));
const manifest = JSON.parse(await readFile(join(root, 'manifest.json')));
if (manifest.version !== pkg.version) throw new Error('Manifest/package version mismatch');
const staging = await mkdtemp(join(tmpdir(), 'ipbulucu-mcpb-'));
const run = (command, args, cwd) => {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', shell: false });
  if (result.error || result.status !== 0) throw new Error(`${command} failed`);
};
try {
  await mkdir(output, { recursive: true });
  // Explicit allowlist: no workspace settings, credentials, tests or dev dependencies.
  for (const name of ['bin', 'src', 'package.json', 'npm-shrinkwrap.json', 'README.md', 'LICENSE', 'manifest.json']) {
    await cp(join(root, name), join(staging, name), { recursive: true });
  }
  run('npm', ['ci', '--omit=dev', '--ignore-scripts', '--no-audit', '--no-fund'], staging);
  const filename = `ipbulucu-mcp-${pkg.version}.mcpb`;
  run('npx', ['--yes', '--package=@anthropic-ai/mcpb@2.1.2', '--', 'mcpb', 'pack', staging, join(output, filename)], staging);
  const bytes = await readFile(join(output, filename));
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  await writeFile(join(output, `${filename}.SHA256SUMS`), `${sha256}  ${filename}\n`);
  console.log(JSON.stringify({ filename, bytes: bytes.length, sha256 }));
} finally {
  await rm(staging, { recursive: true, force: true });
}
