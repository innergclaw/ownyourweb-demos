const base = "https://zkyhhoxcrjkhywblzehr.supabase.co";
const publishableKey = "sb_publishable_bdi3BexAKWDBaUIh40hJ_A_8CNVdnM_";
const auth = document.querySelector("#intake-auth");
const form = document.querySelector("#project-intake");
const email = document.querySelector("#intake-email");
const brief = document.querySelector("#project-brief");
const input = document.querySelector("#project-references");
const list = document.querySelector("#selected-references");
const status = document.querySelector("#intake-status");
const lock = document.querySelector("#lock");
const mime = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", heic: "image/heic", heif: "image/heif", pdf: "application/pdf" };
const maxBytes = 10 * 1024 * 1024;
let session;
let pending;

function notice(message = "", error = false) {
  status.textContent = message;
  status.dataset.error = String(error);
}

function request(path, options = {}) {
  return fetch(base + path, {
    ...options,
    headers: {
      apikey: publishableKey,
      ...(session ? { Authorization: "Bearer " + session.access_token } : {}),
      ...options.headers,
    },
  });
}

function busy(current, active) {
  lock.disabled = active;
  for (const control of current.elements) control.disabled = active;
  current.setAttribute("aria-busy", String(active));
}

auth.addEventListener("submit", async (event) => {
  event.preventDefault();
  const password = document.querySelector("#intake-password");
  const body = JSON.stringify({ email: email.value.trim(), password: password.value });
  busy(auth, true);
  notice("Signing in…");
  try {
    const response = await request("/auth/v1/token?grant_type=password", {
      method: "POST", headers: { "Content-Type": "application/json" }, body,
    });
    const data = await response.json();
    if (!response.ok || !data.access_token || !data.user?.email_confirmed_at) {
      notice("Sign-in failed. Check your email and password, and confirm your account by email.", true);
      return;
    }
    if (pending && pending.owner !== data.user.id) pending = undefined;
    session = data;
    auth.reset();
    auth.hidden = true;
    form.hidden = false;
    notice();
    brief.focus();
  } catch {
    notice("Could not connect. Check your internet connection and try again.", true);
  } finally {
    password.value = "";
    busy(auth, false);
  }
});

function typeFor(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  return Object.hasOwn(mime, extension) ? mime[extension] : undefined;
}

input.addEventListener("change", () => {
  if (pending) pending = undefined;
  list.replaceChildren(...Array.from(input.files, (file) => {
    const item = document.createElement("li");
    item.textContent = file.name;
    return item;
  }));
  list.hidden = !input.files.length;
  notice();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!session) return;
  const details = brief.value.trim();
  const files = Array.from(input.files);
  if (!details) { notice("Add a short description of your project.", true); brief.focus(); return; }
  if (files.length > 5 || files.some((file) => !typeFor(file) || !file.size || file.size > maxBytes)) {
    notice("Choose up to five supported files, each no larger than 10 MB.", true);
    input.focus();
    return;
  }
  pending ??= { id: crypto.randomUUID(), owner: session.user.id, saved: new Set() };
  const { id, saved } = pending;
  busy(form, true);
  try {
    const attachments = [];
    for (const [index, file] of files.entries()) {
      const extension = file.name.split(".").pop().toLowerCase();
      const path = `${session.user.id}/${id}/${index + 1}.${extension}`;
      const contentType = typeFor(file);
      if (!saved.has(path)) {
        notice(`Uploading reference ${index + 1} of ${files.length}…`);
        const response = await request("/storage/v1/object/craves-kitchen-references/" + path, {
          method: "POST", headers: { "Content-Type": contentType }, body: file,
        });
        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          if (error.error !== "Duplicate" && error.code !== "ResourceAlreadyExists") throw response;
        }
        saved.add(path);
      }
      attachments.push({ name: file.name, path, content_type: contentType, size: file.size });
    }
    notice("Saving your project brief…");
    const response = await request("/rest/v1/craves_kitchen_intakes", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, submitted_by: session.user.id, brief: details, attachments }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      if (data.code !== "23505") throw response;
    }
    pending = undefined;
    form.reset();
    list.replaceChildren();
    list.hidden = true;
    notice("Your project brief and any attached references were received.");
  } catch (error) {
    if (error.status === 401) {
      session = undefined;
      form.hidden = true;
      auth.hidden = false;
      notice("Your sign-in expired. Sign in again to resume your submission.", true);
    } else {
      notice(error.status === 403
        ? "This account cannot submit to Craves Kitchen. Lock the workspace and sign in with the email assigned to this project."
        : "Could not finish sending your brief. Your entries are still here. Try again.", true);
    }
  } finally {
    busy(form, false);
  }
});

lock.addEventListener("click", () => {
  session = undefined;
  pending = undefined;
  auth.reset();
  form.reset();
  form.hidden = true;
  auth.hidden = false;
  list.replaceChildren();
  list.hidden = true;
  notice();
});
