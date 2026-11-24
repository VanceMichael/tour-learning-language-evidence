import assert from 'node:assert/strict';
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {test} from 'node:test';
import {pathToFileURL} from 'node:url';
import {readBundle} from '../scripts/inspect.mjs';

test('资料可按声明的主键和字段完整读取', async () => {
  const bundle = await readBundle();
  assert(Object.values(bundle).every(rows => rows.length > 0));
  const {classes, rounds, roster, items, attendance, responses, withdrawals} = bundle;
  assert(attendance.every(row => roster.some(student => student.token === row.token) && rounds.some(round => round.id === row.round)));
  assert(responses.every(row => items.some(item => item.id === row.item) && roster.some(student => student.token === row.token && row.class === student.class)));
  assert(withdrawals.every(row => classes.some(assignment => assignment.id === row.class)));
  assert(rounds.some(row => !row.opened));
});

test('读取资料时拒绝重复主键', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'record-check-'));
  try {
    await writeFile(join(dir, 'manifest.json'), '{"entries":{"fields":["id","value"],"key":["id"]}}');
    await writeFile(join(dir, 'entries.json'), '[{"id":"x","value":1},{"id":"x","value":2}]');
    await assert.rejects(readBundle(pathToFileURL(dir + '/')), /主键/);
  } finally {
    await rm(dir, {recursive: true, force: true});
  }
});
