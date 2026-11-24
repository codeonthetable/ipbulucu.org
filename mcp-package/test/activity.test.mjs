import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { activityBucket } from '../src/activity.mjs';
test('separate processes sharing a profile can reproduce a daily bucket', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ipbulucu-activity-'));
  try {
    const bucket = activityBucket('2026-11-25', dir);
    assert.match(bucket, /^2026-11-25\/[a-f0-9]{4}$/);
    assert.equal(activityBucket('2026-11-25', dir), bucket);
    assert.match(activityBucket('2026-11-26', dir), /^2026-11-26\/[a-f0-9]{4}$/);
    assert.equal(activityBucket('2026-11-25', join(dir,'activity-key-v1','child')), undefined);
  } finally { rmSync(dir, { recursive: true }); }
});
