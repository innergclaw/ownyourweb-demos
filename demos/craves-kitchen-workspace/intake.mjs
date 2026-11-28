import { sendToIntake } from "./workspace.mjs?v=3";
import { mountAnimatedFileUpload } from "../../components/ui/animated-file-upload.mjs?v=1";

const form = document.querySelector("#project-intake");
const brief = document.querySelector("#project-brief");
const status = document.querySelector("#intake-status");
const lock = document.querySelector("#lock");
const receipt = document.querySelector("#submission-receipt");
const receiptMeta = document.querySelector("#receipt-meta");
const receiptBrief = document.querySelector("#receipt-brief");
const receiptFiles = document.querySelector("#receipt-files");
const previews = [];
const mib = 1024 * 1024;
const upload = mountAnimatedFileUpload(document.querySelector("#reference-upload"), {
  maxFiles: 5, maxSize: 10 * mib, maxTotalSize: 25 * mib, onChange: () => notice(),
});

function notice(message = "", error = false) {
  status.textContent = message;
  status.dataset.error = String(error);
}

function clearForm() {
  form.reset();
  upload.reset();
}

function clearReceipt() {
  for (const url of previews.splice(0)) URL.revokeObjectURL(url);
  receipt.hidden = true;
  receiptMeta.textContent = "";
  receiptBrief.textContent = "";
  receiptFiles.replaceChildren();
  receiptFiles.hidden = true;
}

function showReceipt(id, details, files) {
  clearReceipt();
  receiptMeta.textContent = `Receipt ${id} · ${files.length} ${files.length === 1 ? "reference" : "references"}`;
  receiptBrief.textContent = details;
  for (const file of files) {
    const item = document.createElement("li");
    if (/^image\/(jpeg|png|webp)$/.test(file.type)) {
      const preview = document.createElement("img");
      preview.alt = "";
      preview.src = URL.createObjectURL(file);
      previews.push(preview.src);
      item.append(preview);
    }
    item.append(document.createTextNode(file.name));
    receiptFiles.append(item);
  }
  receiptFiles.hidden = !files.length;
  receipt.hidden = false;
  document.querySelector("#receipt-title").focus();
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  const details = brief.value.trim();
  const files = upload.getFiles();
  if (!details) { notice("Add a short description of your project.", true); brief.focus(); return; }

  const data = new FormData();
  data.set("brief", details);
  for (const file of files) data.append("references", file, file.name);
  lock.disabled = true;
  for (const control of form.elements) control.disabled = true;
  upload.setDisabled(true);
  form.setAttribute("aria-busy", "true");
  notice(files.length ? "Sending your brief and references…" : "Sending your project brief…");
  try {
    const response = await sendToIntake(data);
    const reply = await response.json();
    if (response.ok && reply.ok && reply.receipt) {
      clearForm();
      showReceipt(reply.receipt, details, files);
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
    upload.setDisabled(false);
    form.setAttribute("aria-busy", "false");
  }
});

lock.addEventListener("click", () => {
  clearForm();
  clearReceipt();
  notice();
});
