// Opt-in profile telemetry. The seed never leaves the device.
import { createHmac, randomBytes } from 'node:crypto';
import { mkdirSync, openSync, closeSync, readFileSync, writeFileSync, linkSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

export function activityBucket(day, directory = join(homedir(), '.ipbulucu-mcp')) {
  const path = join(directory, 'activity-key-v1');
  try {
    mkdirSync(directory, { recursive: true, mode: 0o700 });
    let key;
    try {
      key = readFileSync(path);
    } catch (error) {
      if (error.code !== 'ENOENT') return undefined;
      const temp = join(directory, randomBytes(12).toString('hex'));
      const fd = openSync(temp, 'wx', 0o600);
      try {
        try { writeFileSync(fd, randomBytes(32)); } finally { closeSync(fd); }
        try { linkSync(temp, path); } catch (e) { if (e.code !== 'EEXIST') throw e; }
      } finally { unlinkSync(temp); }
      key = readFileSync(path);
    }
    if (key.length !== 32) return undefined;
    return day + '/' + createHmac('sha256', key).update(day).digest('hex').slice(0, 4);
  } catch { return undefined; }
}
