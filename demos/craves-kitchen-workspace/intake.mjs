import { sendToIntake } from "./workspace.mjs?v=3";

const form = document.querySelector("#project-intake");
const brief = document.querySelector("#project-brief");
const input = document.querySelector("#project-references");
const list = document.querySelector("#selected-references");
const status = document.querySelector("#intake-status");
const lock = document.querySelector("#lock");
const supported = /\.(jpe?g|png|webp|heic|heif|pdf)$/i;
const mib = 1024 * 1024;

function notice(message = "", error = false) {
  status.textContent = message;
  status.dataset.error = String(error);
}

function clearForm() {
  form.reset();
  list.replaceChildren();
  list.hidden = true;
}

input.addEventListener("change", () => {
  list.replaceChildren(...Array.from(input.files, file => {
    const item = document.createElement("li");
    item.textContent = file.name;
    return item;
  }));
  list.hidden = !input.files.length;
  notice();
});

form.addEventListener("submit", async event => {
  event.preventDefault();
  const details = brief.value.trim();
  const files = Array.from(input.files);
  if (!details) { notice("Add a short description of your project.", true); brief.focus(); return; }
  if (files.length > 5 || files.some(file => !supported.test(file.name) || !file.size || file.size > 10 * mib)
      || files.reduce((sum, file) => sum + file.size, 0) > 25 * mib) {
    notice("Choose up to five supported files. Limit: 10 MB each and 25 MB total.", true);
    input.focus();
    return;
  }

  const data = new FormData();
  data.set("brief", details);
  for (const file of files) data.append("references", file, file.name);
  lock.disabled = true;
  for (const control of form.elements) control.disabled = true;
  form.setAttribute("aria-busy", "true");
  notice(files.length ? "Sending your brief and references…" : "Sending your project brief…");
  try {
    const response = await sendToIntake(data);
    const reply = await response.json();
    if (response.ok && reply.ok && reply.receipt) {
      clearForm();
      notice("Your project brief and any attached references were received.");
      return;
    }
    if (response.status === 401) {
      notice("This code is no longer accepted. Copy your brief, lock the workspace, and check your code.", true);
    } else if (response.status === 429) {
      notice("The daily submission limit was reached. Try again tomorrow or contact OwnYourWeb.", true);
    } else if (response.status === 413 || reply.error === "invalid_files") {
      notice("Check that your files are supported and under the stated limits.", true);
    } else {
      notice("Could not confirm delivery. Your entries are still here. Try again.", true);
    }
  } catch {
    notice("Could not confirm delivery. Your entries are still here. Try again.", true);
  } finally {
    lock.disabled = false;
    for (const control of form.elements) control.disabled = false;
    form.setAttribute("aria-busy", "false");
  }
});

lock.addEventListener("click", () => {
  clearForm();
  notice();
});
