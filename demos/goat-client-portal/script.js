const ACCESS_CODE = "GOAT-ANISA";
const SESSION_KEY = "goat-client-workspace";

const accessScreen = document.querySelector("#access-screen");
const workspace = document.querySelector("#workspace");
const form = document.querySelector("#access-form");
const codeInput = document.querySelector("#access-code");
const error = document.querySelector("#access-error");
const viewTitle = document.querySelector("#view-title");
const navButtons = [...document.querySelectorAll("[data-view]")];
const panels = [...document.querySelectorAll("[data-panel]")];

function normalizeCode(value) {
  return value.trim().toUpperCase();
}

function openWorkspace(animate = false) {
  if (animate) {
    accessScreen.classList.add("is-opening");
    window.setTimeout(() => {
      accessScreen.hidden = true;
      workspace.hidden = false;
      document.querySelector("#dashboard-title").focus?.();
    }, 420);
    return;
  }
  accessScreen.hidden = true;
  workspace.hidden = false;
}

function showView(name) {
  navButtons.forEach((button) => {
    const active = button.dataset.view === name;
    button.classList.toggle("active", active);
    active ? button.setAttribute("aria-current", "page") : button.removeAttribute("aria-current");
  });
  panels.forEach((panel) => {
    const active = panel.dataset.panel === name;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
    if (active) {
      panel.classList.remove("view-enter");
      requestAnimationFrame(() => panel.classList.add("view-enter"));
    }
  });
  viewTitle.textContent = name === "files" ? "Project files" : "Project dashboard";
  document.querySelector(`[data-panel="${name}"] h1`)?.focus?.();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (normalizeCode(codeInput.value) !== ACCESS_CODE) {
    error.hidden = false;
    codeInput.setAttribute("aria-invalid", "true");
    form.classList.remove("shake");
    requestAnimationFrame(() => form.classList.add("shake"));
    codeInput.focus();
    return;
  }
  error.hidden = true;
  codeInput.removeAttribute("aria-invalid");
  sessionStorage.setItem(SESSION_KEY, "open");
  openWorkspace(true);
});

codeInput.addEventListener("input", () => {
  error.hidden = true;
  codeInput.removeAttribute("aria-invalid");
});

navButtons.forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
document.querySelectorAll("[data-go-files]").forEach((button) => button.addEventListener("click", () => showView("files")));
document.querySelectorAll("[data-go-dashboard]").forEach((button) => button.addEventListener("click", () => showView("dashboard")));
document.querySelector("#logout").addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  workspace.hidden = true;
  accessScreen.hidden = false;
  accessScreen.classList.remove("is-opening");
  form.reset();
  codeInput.focus();
});

const previewView = ["localhost", "127.0.0.1"].includes(location.hostname) ? new URLSearchParams(location.search).get("preview") : null;
if (sessionStorage.getItem(SESSION_KEY) === "open" || ["workspace", "files"].includes(previewView)) {
  openWorkspace();
  if (previewView === "files") showView("files");
}
