const endpoint = "https://zkyhhoxcrjkhywblzehr.supabase.co/functions/v1/craves-kitchen-intake";
let workspaceCode = "";
const access = document.querySelector("#access");
const workspace = document.querySelector("#workspace");
const form = document.querySelector("#access-form");
const input = document.querySelector("#code");
const error = document.querySelector("#code-error");
const submit = form.querySelector("button");
const tabs = [...document.querySelectorAll("[data-view]")];

export function sendToIntake(body) {
  return fetch(endpoint, {
    method: "POST", headers: { "x-workspace-code": workspaceCode }, body,
    signal: AbortSignal.timeout(90000),
  });
}

export function requestProjectFiles(action, params = {}) {
  return fetch(endpoint + "?" + new URLSearchParams({ action, ...params }), {
    method: "POST", headers: { "x-workspace-code": workspaceCode }, cache: "no-store",
    signal: AbortSignal.timeout(45000),
  });
}

function showView(view, focus = true) {
  for (const tab of tabs) {
    const active = tab.dataset.view === view;
    document.getElementById(tab.dataset.view).hidden = !active;
    if (active) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  }
  if (focus) document.getElementById(`${view}-title`).focus();
  if (view === "files") document.dispatchEvent(new Event("project-files-open"));
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
    const response = await fetch(endpoint + "?action=check", {
      method: "POST", headers: { "x-workspace-code": code },
      signal: AbortSignal.timeout(12000),
    });
    if (response.status === 401) return explain("That code did not match. Check it and try again.");
    if (!response.ok) throw new Error("Code check unavailable");
    workspaceCode = code;
    form.reset();
    input.dispatchEvent(new Event("input"));
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
  workspaceCode = "";
  workspace.hidden = true;
  access.hidden = false;
  input.focus();
});
