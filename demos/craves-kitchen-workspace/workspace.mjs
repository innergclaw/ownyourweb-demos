// This check only hides the public Pages content from casual viewing.
const codeDigest = "68bd23cc96dce9f4825c75d6df81821f7df26a005baa4421b5b18631009ca336";
const sessionKey = "craves-kitchen-workspace:open";
const access = document.querySelector("#access");
const workspace = document.querySelector("#workspace");
const form = document.querySelector("#access-form");
const input = document.querySelector("#code");
const error = document.querySelector("#code-error");
const submit = form.querySelector("button");
const tabs = [...document.querySelectorAll("[data-view]")];

function showView(view, focus = true) {
  for (const tab of tabs) {
    const active = tab.dataset.view === view;
    document.getElementById(tab.dataset.view).hidden = !active;
    if (active) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  }
  if (focus) document.getElementById(`${view}-title`).focus();
}

function openWorkspace(focus = true) {
  access.hidden = true;
  workspace.hidden = false;
  showView("dashboard", focus);
}

function explain(message) {
  error.textContent = message;
  error.hidden = false;
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedby", "code-error access-note");
  input.focus();
}

input.addEventListener("input", () => {
  error.hidden = true;
  input.removeAttribute("aria-invalid");
  input.setAttribute("aria-describedby", "access-note");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submit.disabled) return;
  const code = input.value.trim().toUpperCase();
  if (!code) return explain("Enter the workspace code.");
  submit.disabled = true;
  try {
    const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(code));
    const digest = Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
    if (digest !== codeDigest) return explain("That code did not match. Check it and try again.");
    form.reset();
    input.dispatchEvent(new Event("input"));
    try { sessionStorage.setItem(sessionKey, "yes"); } catch { /* Open for this page only. */ }
    openWorkspace();
  } catch {
    explain("The code could not be checked. Open the HTTPS workspace link and try again.");
  } finally {
    submit.disabled = false;
  }
});

for (const tab of tabs) tab.addEventListener("click", () => showView(tab.dataset.view));
for (const button of document.querySelectorAll("[data-open]")) {
  button.addEventListener("click", () => showView(button.dataset.open));
}
document.querySelector("#lock").addEventListener("click", () => {
  try { sessionStorage.removeItem(sessionKey); } catch { /* Nothing to clear. */ }
  workspace.hidden = true;
  access.hidden = false;
  input.focus();
});
try {
  if (sessionStorage.getItem(sessionKey) === "yes") openWorkspace(false);
} catch { /* The access form remains available. */ }
