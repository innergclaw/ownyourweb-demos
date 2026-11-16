import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");
const script = readFileSync(new URL("./script.js", import.meta.url), "utf8");

test("client and project names stay exact", () => {
  assert.match(html, /Welcome, Anisa\./);
  assert.match(html, /GOAT client workspace/);
  assert.match(html, /GOAT \/ TEXT LOGO/);
  assert.doesNotMatch(html, /®/);
});

test("temporary code opens only this demo workspace", () => {
  assert.match(script, /const ACCESS_CODE = "GOAT-ANISA"/);
  assert.match(script, /sessionStorage/);
  assert.doesNotMatch(script, /localStorage|fetch\(/);
  assert.match(script, /\["localhost", "127\.0\.0\.1"\]\.includes\(location\.hostname\)/);
  assert.match(script, /\["workspace", "files"\]\.includes\(previewView\)/);
  assert.match(html, /not secure account authentication/i);
});

test("empty files state is honest", () => {
  assert.match(html, /0 FILES/);
  assert.match(html, /Your files will show up here\./);
  assert.match(html, /No design files have been posted yet/);
  assert.doesNotMatch(html, /\.pdf|\.png|\.svg|download=/i);
});

test("dashboard and files views have working controls", () => {
  assert.match(html, /data-view="dashboard"/);
  assert.match(html, /data-view="files"/);
  assert.match(html, /data-panel="dashboard"/);
  assert.match(html, /data-panel="files"/);
  assert.match(script, /function showView/);
});

test("confirmed payment and creative direction stay exact", () => {
  assert.match(html, /Payment confirmed/);
  assert.match(html, /\$75 received/);
  assert.match(html, /Discovery call complete/);
  assert.match(html, /Green with Philadelphia influence/);
  assert.match(html, /Cute, bubbly GOAT lettering/);
  assert.match(html, /Three font references from Anisa/);
  assert.match(html, /STATUS: FONT REFERENCES NEXT/);
  assert.match(html, /02 \/ 04 COMPLETE/);
});

test("responsive and reduced motion styles are present", () => {
  assert.match(css, /\[hidden\]\{display:none!important\}/);
  assert.match(css, /@media\(max-width:560px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /\.logout::after/);
});
