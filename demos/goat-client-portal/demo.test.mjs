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

test("concept files state is honest", () => {
  assert.match(html, /12 FILES/);
  assert.match(html, /Street lettering variations/);
  assert.doesNotMatch(html, /download=/i);
});

test("street lettering round changes the actual letter forms", () => {
  assert.match(html, /assets\/concepts\/concept-b4-rising-street\.png/);
  assert.match(html, /assets\/concepts\/concept-b5-sharp-street\.png/);
  assert.match(html, /assets\/concepts\/concept-b6-handstyle\.png/);
  assert.match(html, /VARIATION B4/);
  assert.match(html, /VARIATION B5/);
  assert.match(html, /VARIATION B6/);
  assert.match(html, /Choose B4, B5, or B6/);
});

test("three original concept studies are posted", () => {
  assert.match(html, /assets\/concepts\/concept-a-deep-green\.png/);
  assert.match(html, /assets\/concepts\/concept-b-lime-puff\.png/);
  assert.match(html, /assets\/concepts\/concept-c-glossy-green\.png/);
  assert.match(html, /CONCEPT A/);
  assert.match(html, /CONCEPT B/);
  assert.match(html, /CONCEPT C/);
  assert.match(html, /remain on file for project history/i);
});

test("selected concept B has three white treatment variations", () => {
  assert.match(html, /Concept B selected/);
  assert.match(html, /assets\/concepts\/concept-b1-white-border\.png/);
  assert.match(html, /assets\/concepts\/concept-b2-bold-white-border\.png/);
  assert.match(html, /assets\/concepts\/concept-b3-white-badge\.png/);
  assert.match(html, /VARIATION B1/);
  assert.match(html, /VARIATION B2/);
  assert.match(html, /VARIATION B3/);
  assert.match(html, /Border variations/);
});

test("client reference images are present and labeled", () => {
  assert.match(html, /assets\/references\/super-bubbly\.jpg/);
  assert.match(html, /assets\/references\/casual\.jpg/);
  assert.match(html, /assets\/references\/babel-gamee\.jpg/);
  assert.match(html, /Personal Use Free/);
  assert.match(html, /commercial license is required for sold merchandise/i);
});

test("dashboard and files views have working controls", () => {
  assert.match(html, /data-view="dashboard"/);
  assert.match(html, /data-view="files"/);
  assert.match(html, /data-panel="dashboard"/);
  assert.match(html, /data-panel="files"/);
  assert.match(script, /function showView/);
});

test("confirmed payment and discovery status stay exact", () => {
  assert.match(html, /Payment confirmed/);
  assert.match(html, /\$75 received/);
  assert.match(html, /Discovery call complete/);
  assert.match(html, /Green with Philadelphia influence/);
  assert.match(html, /Cute, bubbly lettering/);
  assert.match(html, /Three references received/);
  assert.match(html, /Super Bubbly, Casual, and Babel Gamee/);
  assert.match(html, /STATUS: STREET LETTERING REVIEW/);
  assert.match(html, /02 \/ 04 COMPLETE/);
});

test("responsive and reduced motion styles are present", () => {
  assert.match(css, /\[hidden\]\{display:none!important\}/);
  assert.match(css, /@media\(max-width:560px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /\.logout::after/);
});
