const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

export function acceptsFile(file, accept) {
  const rules = accept.toLowerCase().split(",").map(rule => rule.trim()).filter(Boolean);
  const name = file.name.toLowerCase();
  const mime = file.type.toLowerCase();
  return !rules.length || rules.some(rule => rule.startsWith(".")
    ? name.endsWith(rule)
    : rule.endsWith("/*") ? mime.startsWith(rule.slice(0, -1)) : mime === rule);
}

const fileKey = file => JSON.stringify([file.name, file.size, file.lastModified]);
const isFileDrag = event => Array.from(event.dataTransfer?.types ?? []).includes("Files");

export function mountAnimatedFileUpload(root, {
  maxFiles = Infinity, maxSize = Infinity, maxTotalSize = Infinity, onChange = () => {},
} = {}) {
  const input = root.querySelector('input[type="file"]');
  const browse = root.querySelector("[data-upload-browse]");
  const label = root.querySelector("[data-upload-label]");
  const list = root.querySelector("[data-upload-list]");
  const error = root.querySelector("[data-upload-error]");
  const announcement = root.querySelector("[data-upload-status]");
  const entries = new Map();
  let dragDepth = 0;
  let disabled = false;

  function setDragging(active) {
    browse.toggleAttribute("data-dragging", active);
    label.textContent = active ? "Drop files here" : "Choose files";
  }

  function announce() {
    announcement.textContent = entries.size === 1 ? "1 file selected." : `${entries.size} files selected.`;
    onChange(Array.from(entries.values(), entry => entry.file));
  }

  function remove(key) {
    const entry = entries.get(key);
    if (!entry) return;
    const { row, button } = entry;
    const otherButtons = Array.from(entries.values(), value => value.button);
    const index = otherButtons.indexOf(button);
    if (document.activeElement === button) (otherButtons[index + 1] || otherButtons[index - 1] || browse).focus();
    entries.delete(key);
    row.inert = true;
    row.setAttribute("aria-hidden", "true");
    if (reducedMotion() || !row.animate) row.remove();
    else row.animate([
      { opacity: 1, transform: "translateX(0)" },
      { opacity: 0, transform: "translateX(12px)" },
    ], { duration: 150, easing: "ease-out", fill: "forwards" }).finished.then(() => row.remove(), () => row.remove());
    error.textContent = "";
    announce();
  }

  function addRow(key, file) {
    const row = document.createElement("li");
    row.className = "upload-file";
    const details = document.createElement("span");
    details.className = "upload-file-details";
    const name = document.createElement("span");
    name.textContent = file.name;
    const size = document.createElement("span");
    size.className = "upload-file-size";
    size.textContent = formatFileSize(file.size);
    details.append(name, size);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "upload-remove";
    button.textContent = "Remove";
    button.setAttribute("aria-label", `Remove ${file.name}`);
    button.addEventListener("click", () => remove(key));
    row.append(details, button);
    list.append(row);
    entries.set(key, { row, button, file });
  }

  function addFiles(files) {
    if (disabled) return;
    const messages = new Set();
    const selected = Array.from(files);
    let total = Array.from(entries.values()).reduce((sum, { file }) => sum + file.size, 0);
    if (!input.multiple) total = 0;
    let added = 0;
    for (const file of selected) {
      if (!acceptsFile(file, input.accept)) { messages.add("Some files were not added because their format is not supported."); continue; }
      if (!file.size) { messages.add("Empty files were not added."); continue; }
      if (file.size > maxSize) { messages.add(`Some files exceed the ${formatFileSize(maxSize)} per-file limit.`); continue; }
      const key = fileKey(file);
      if (entries.has(key)) { messages.add("Some files are already selected."); continue; }
      if (input.multiple && entries.size >= maxFiles) { messages.add(`Choose up to ${maxFiles} files.`); break; }
      if (total + file.size > maxTotalSize) { messages.add(`Files must be ${formatFileSize(maxTotalSize)} or less in total.`); continue; }
      if (!input.multiple) { entries.clear(); list.replaceChildren(); }
      addRow(key, file);
      total += file.size;
      added++;
      if (!input.multiple) break;
    }
    error.textContent = Array.from(messages).join(" ");
    if (added) announce();
  }

  input.hidden = true;
  browse.hidden = false;
  browse.addEventListener("click", () => input.click());
  input.addEventListener("change", () => { addFiles(input.files); input.value = ""; });
  browse.addEventListener("dragenter", event => {
    if (!isFileDrag(event)) return;
    event.preventDefault();
    if (!disabled) { dragDepth++; setDragging(true); }
  });
  browse.addEventListener("dragover", event => {
    if (!isFileDrag(event)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = disabled ? "none" : "copy";
  });
  browse.addEventListener("dragleave", () => {
    dragDepth = Math.max(0, dragDepth - 1);
    if (!dragDepth) setDragging(false);
  });
  browse.addEventListener("drop", event => {
    if (!isFileDrag(event) && !event.dataTransfer?.files.length) return;
    event.preventDefault();
    dragDepth = 0;
    setDragging(false);
    addFiles(event.dataTransfer.files);
  });

  return {
    getFiles: () => Array.from(entries.values(), entry => entry.file),
    reset() {
      entries.clear();
      list.replaceChildren();
      input.value = "";
      error.textContent = "";
      announcement.textContent = "";
      onChange([]);
    },
    setDisabled(value) {
      disabled = value;
      browse.disabled = input.disabled = disabled;
      for (const { button } of entries.values()) button.disabled = disabled;
      dragDepth = 0;
      setDragging(false);
    },
  };
}
