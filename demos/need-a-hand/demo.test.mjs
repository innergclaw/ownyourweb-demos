import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalizePhone, requestText, smsLink, OWNER_PHONE } from './sms.mjs';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const script = readFileSync(new URL('./script.js', import.meta.url), 'utf8');
const textFill = readFileSync(new URL('./text-fill.js', import.meta.url), 'utf8');

const example = { firstName: 'Jordan', phone: '267 555 0123', area: 'Germantown', service: 'Move two boxes from storage', dayTime: '2026-10-12T14:30', location: 'Indoor', tools: 'No' };

test('exact recipient and requested fields appear in prepared SMS', () => {
  assert.equal(OWNER_PHONE, '+12674730397');
  const message = requestText(example);
  for (const value of ['Jordan', '+12675550123', 'Germantown', 'Move two boxes from storage', 'Indoor', 'No']) assert.ok(message.includes(value));
  assert.equal(decodeURIComponent(smsLink(message).split('body=')[1]), message);
});

test('phone validation rejects incomplete numbers', () => {
  assert.equal(normalizePhone('267 555 0123'), '+12675550123');
  assert.equal(normalizePhone('267 555'), null);
});

test('form contains all requested fields and no backend submission', () => {
  for (const field of ['firstName', 'phone', 'area', 'service', 'dayTime', 'location', 'tools']) assert.match(html, new RegExp(`name="${field}"`));
  assert.doesNotMatch(html, /<form[^>]+action=/);
  assert.doesNotMatch(script, /fetch\(|localStorage|sessionStorage/);
  assert.match(html, /tap Send/i);
});

test('local anchors exist', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(target), target);
});

test('replacement image closes the page and old flyer is not rendered', () => {
  assert.match(html, /class="closing-image section-wrap"/);
  assert.match(html, /assets\/need-a-hand-home-help\.jpg/);
  assert.doesNotMatch(html, /need-a-hand-flyer\.jpg/);
  assert.ok(html.indexOf('class="closing-image section-wrap"') > html.indexOf('id="request"'));
});

test('hourly pricing does not invent a rate', () => {
  assert.match(html, /Help by the hour\./);
  assert.doesNotMatch(html, /\$\d+/);
});

test('hero has scroll fill hooks with reduced-motion support', () => {
  assert.equal((html.match(/data-text-fill/g) ?? []).length, 2);
  assert.match(html, /text-fill\.js\?v=3/);
  assert.match(textFill, /IntersectionObserver/);
  assert.match(textFill, /prefers-reduced-motion/);
  assert.match(textFill, /screenReaderText/);
});
