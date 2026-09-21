import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const js = readFileSync(new URL('./app.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
const theme = readFileSync(new URL('./philly-theme.css', import.meta.url), 'utf8');
test('every local navigation target exists', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(target), target);
});
test('both forms start disabled and require local interception', () => {
  assert.equal((html.match(/<fieldset disabled>/g) || []).length, 2);
  assert.ok(js.includes('event.preventDefault()'));
  assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/);
  assert.doesNotMatch(html, /<form[^>]*\baction=/);
});
test('review notice, supplied footer, and pending payment state remain visible', () => {
  assert.ok(html.includes('Paid for by Byrd for Us and authorized by Michael Byrd'));
  assert.ok(html.includes('Payment link pending.'));
  assert.ok(html.includes('noindex,nofollow'));
  assert.ok(html.includes('Sources and review notes.'));
});
test('motion respects reduced-motion preferences', () => {
  assert.ok(css.includes('@media(prefers-reduced-motion:reduce)'));
  assert.ok(js.includes("window.matchMedia('(prefers-reduced-motion: reduce)')"));
});
test('campaign palette uses the three supplied colors', () => {
  assert.match(theme, /--green:#69BE28/);
  assert.match(theme, /--blue:#0061C2/);
  assert.match(theme, /--yellow:#FFEE8C/);
  assert.doesNotMatch(theme, /--red:|--pale-red:/);
  assert.match(html, /name="theme-color" content="#0061C2"/);
});
