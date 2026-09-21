import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const root = new URL('./', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const css = await readFile(new URL('styles.css', root), 'utf8');
const js = await readFile(new URL('script.js', root), 'utf8');

test('every local navigation target exists', () => {
  const targets = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  for (const target of targets) assert.match(html, new RegExp(`id="${target}"`));
});

test('supplied schedule and venue details remain present', () => {
  for (const expected of ['2026-10-13', '2026-10-14', '2026-10-15', '2026-10-19', '6:30 PM', '216 South Street']) {
    assert.ok(html.includes(expected), `Missing ${expected}`);
  }
});

test('registration remains an explicit no-storage demo', () => {
  assert.match(html, /does not send, save, or share/i);
  assert.match(html, /Complete Demo Signup/i);
  assert.doesNotMatch(html, /Reserve Your Spot/i);
  assert.match(js, /preventDefault/);
  assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|localStorage|sessionStorage/);
});

test('reduced motion keeps the page readable', () => {
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\.reveal\s*\{\s*opacity:\s*1/);
});
