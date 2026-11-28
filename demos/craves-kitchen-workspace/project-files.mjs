import { requestProjectFiles } from "./workspace.mjs?v=4";
import { formatFileSize } from "../../components/ui/animated-file-upload.mjs?v=1";

const filesView = document.querySelector("#files");
const list = document.querySelector("#project-submissions");
const status = document.querySelector("#project-files-status");
const refresh = document.querySelector("#refresh-project-files");
const more = document.querySelector("#more-project-files");
const dates = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });
const displayed = new Set();
let next = null;
let requestVersion = 0;
let sessionVersion = 0;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

async function download(id, index, file, button) {
  const session = sessionVersion;
  button.disabled = true;
  button.textContent = "Preparing…";
  try {
    const response = await requestProjectFiles("download", { id, index });
    if (!response.ok) throw new Error(response.status === 401 ? "Unlock the workspace again to download files." : "This reference could not be downloaded. Try again.");
    const blob = await response.blob();
    if (session !== sessionVersion) return;
    const url = URL.createObjectURL(blob);
    const link = element("a");
    link.href = url;
    link.download = file.name || "reference";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  } catch (error) {
    if (session === sessionVersion) status.textContent = error instanceof TypeError ? "Check your connection and try again." : error.message;
  } finally {
    button.disabled = false;
    button.textContent = "Download";
  }
}

function render(submission) {
  if (displayed.has(submission.id)) return;
  displayed.add(submission.id);
  const card = element("article", "submission-receipt");
  card.append(element("h2", "", "Project brief"));
  const date = new Date(submission.created_at);
  if (!Number.isNaN(date.valueOf())) {
    const timestamp = element("time", "", dates.format(date));
    timestamp.dateTime = date.toISOString();
    const meta = element("p", "receipt-meta");
    meta.append(timestamp);
    card.append(meta);
  }
  card.append(element("p", "receipt-brief", submission.brief));
  const attachments = element("ul", "receipt-files");
  attachments.setAttribute("aria-label", "Submitted references");
  for (const [index, file] of submission.files.entries()) {
    const row = element("li");
    const info = element("span", "upload-file-details", file.name);
    if (typeof file.size === "number") info.append(element("small", "upload-file-size", formatFileSize(file.size)));
    const button = element("button", "outline", "Download");
    button.type = "button";
    button.setAttribute("aria-label", `Download ${file.name}`);
    button.addEventListener("click", () => download(submission.id, index, file, button));
    row.append(info, button);
    attachments.append(row);
  }
  if (attachments.childElementCount) card.append(attachments);
  list.append(card);
}

async function load(append = false) {
  if (append && next === null) return;
  const version = ++requestVersion;
  refresh.disabled = more.disabled = true;
  status.textContent = "Loading project files…";
  try {
    const response = await requestProjectFiles("list", { offset: append ? next : 0 });
    if (!response.ok) throw new Error(response.status === 401 ? "Unlock the workspace again to see saved files." : "Could not load project files. Select Refresh files to try again.");
    const reply = await response.json();
    if (version !== requestVersion) return;
    if (!append) { list.replaceChildren(); displayed.clear(); }
    for (const submission of reply.submissions) render(submission);
    next = reply.next;
    more.hidden = next === null;
    status.textContent = displayed.size ? "" : "No submissions yet. After you send a brief, it will appear here.";
  } catch (error) {
    if (version === requestVersion) status.textContent = error instanceof TypeError ? "Check your connection, then select Refresh files." : error.message;
  } finally {
    if (version === requestVersion) refresh.disabled = more.disabled = false;
  }
}

refresh.addEventListener("click", () => load());
more.addEventListener("click", () => load(true));
document.addEventListener("project-files-open", () => load());
document.addEventListener("project-files-saved", () => {
  if (!filesView.hidden) load();
});
document.querySelector("#lock").addEventListener("click", () => {
  requestVersion++;
  sessionVersion++;
  next = null;
  displayed.clear();
  list.replaceChildren();
  status.textContent = "";
  more.hidden = true;
  refresh.disabled = more.disabled = false;
});
